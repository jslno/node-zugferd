import { toInput } from "@node-zugferd/parser";
import type { Zugferd, ZugferdOptions } from "node-zugferd";
import { PDFDocument } from "pdf-lib";
import { describe, expect, test } from "vitest";

export const blankPDF = async () => {
	const pdf = await PDFDocument.create();
	pdf.addPage();
	return pdf;
};

export type TestEntry = {
	label: string;
	data: Record<string, any>;
	config?:
		| {
				type: string;
		  }
		| undefined;
};

const DEFAULT_SPECIFICATION_IDENTIFIERS: Record<string, string> = {
	minimum: "urn:factur-x.eu:1p0:minimum",
	"basic-wl": "urn:factur-x.eu:1p0:basicwl",
	basic: "urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:basic",
	"en-16931": "urn:cen.eu:en16931:2017",
	extended: "urn:cen.eu:en16931:2017#conformant#urn:factur-x.eu:1p0:extended",
	xrechnung:
		"urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0",
};

function isBinaryLike(value: unknown): boolean {
	return (
		typeof value === "object" &&
		value != null &&
		(value instanceof Date ||
			value instanceof File ||
			value instanceof Blob ||
			value instanceof ArrayBuffer ||
			ArrayBuffer.isView(value))
	);
}

/** Drop empty plain objects / empty strings that create skips and parse omits. */
function omitEmptyObjects<T>(value: T): T {
	if (Array.isArray(value)) {
		return value.map((item) => omitEmptyObjects(item)) as T;
	}
	if (value == null || typeof value !== "object" || isBinaryLike(value)) {
		return value;
	}

	const out: Record<string, unknown> = {};
	for (const [key, child] of Object.entries(value)) {
		const next = omitEmptyObjects(child);
		if (next === "") {
			continue;
		}
		if (
			next &&
			typeof next === "object" &&
			!isBinaryLike(next) &&
			!Array.isArray(next) &&
			Object.keys(next).length === 0
		) {
			continue;
		}
		out[key] = next;
	}
	return out as T;
}

async function bytesToArray(
	content: Uint8Array | ArrayBuffer | Blob | ArrayBufferView,
): Promise<number[]> {
	if (content instanceof Blob) {
		return Array.from(new Uint8Array(await content.arrayBuffer()));
	}
	if (content instanceof ArrayBuffer) {
		return Array.from(new Uint8Array(content));
	}
	if (ArrayBuffer.isView(content)) {
		return Array.from(
			new Uint8Array(content.buffer, content.byteOffset, content.byteLength),
		);
	}
	return Array.from(content);
}

async function toComparableBinary(value: unknown): Promise<unknown> {
	if (value instanceof File) {
		return {
			filename: value.name,
			mimeType: value.type,
			content: await bytesToArray(new Uint8Array(await value.arrayBuffer())),
		};
	}

	if (
		value &&
		typeof value === "object" &&
		"content" in value &&
		"filename" in value &&
		"mimeType" in value
	) {
		const binary = value as {
			filename: string;
			mimeType: string;
			content: Uint8Array | ArrayBuffer | Blob | ArrayBufferView;
		};

		return {
			filename: binary.filename,
			mimeType: binary.mimeType,
			content: await bytesToArray(binary.content),
		};
	}

	return value;
}

async function toComparableParsedInvoice(
	value: unknown,
	fieldName?: string,
	insideAmount = false,
): Promise<unknown> {
	if (value instanceof File) return toComparableBinary(value);
	if (
		typeof value === "string" &&
		(insideAmount || fieldName?.endsWith("Amount")) &&
		value.trim() !== "" &&
		Number.isFinite(Number(value))
	) {
		return Number(value);
	}
	if (isBinaryLike(value) || value == null || typeof value !== "object") {
		return value;
	}
	if (Array.isArray(value)) {
		return Promise.all(
			value.map((item) =>
				toComparableParsedInvoice(
					item,
					fieldName,
					insideAmount || fieldName?.endsWith("Amount") === true,
				),
			),
		);
	}
	if (
		insideAmount &&
		"value" in value &&
		Object.keys(value).every((key) => key === "value")
	) {
		return toComparableParsedInvoice(value.value, "value", true);
	}
	if ("content" in value && "filename" in value && "mimeType" in value) {
		return toComparableBinary(value);
	}

	const isQuantity = "value" in value && "unitCode" in value;
	const out: Record<string, unknown> = {};
	for (const [key, child] of Object.entries(value)) {
		if (child === "") continue;
		out[key] = await toComparableParsedInvoice(
			child,
			key,
			insideAmount || isQuantity || key.endsWith("Amount"),
		);
	}
	return out;
}

function expectedInvoice(
	profileId: string,
	data: Record<string, any>,
): Record<string, any> {
	return omitEmptyObjects({
		...data,
		processControl: {
			...data.processControl,
			applicationRecommendationInfo: {
				...data.processControl?.applicationRecommendationInfo,
				specificationIdentifier:
					data.processControl?.applicationRecommendationInfo
						?.specificationIdentifier ??
					DEFAULT_SPECIFICATION_IDENTIFIERS[profileId] ??
					DEFAULT_SPECIFICATION_IDENTIFIERS.minimum,
			},
		},
	});
}

export const validInvoiceTestFactory = <const Opts extends ZugferdOptions>(
	zugferd: Zugferd<Opts>,
	profile: Opts["profiles"][number]["id"],
	input: TestEntry[],
	cfg?: {
		skipXSDValidation?: boolean | undefined;
		skipMustangValidation?: boolean | undefined;
	},
) => {
	const invoicer: any = zugferd;

	describe.each(input)(
		"should generate valid $label",
		async ({ data, config }) => {
			const invoice = await invoicer.create(profile, data, config);
			const xml = invoice.toXML();

			test("should not contain object string representation", () => {
				expect(xml).not.toContain("[object Object]");
			});

			test
				.skipIf(cfg?.skipXSDValidation === true)
				.concurrent("should validate against XSD schema", async () => {
					await expect(
						invoicer.xsd.validate(profile, xml),
					).resolves.not.toThrow();
				});

			test
				.skipIf(cfg?.skipMustangValidation === true)
				.concurrent("should validate against Mustang validator", async () => {
					await expect(
						invoicer.mustang.validate(profile, xml),
					).resolves.not.toThrow();
				});
		},
	);
};

export const parseValidInvoiceTestFactory = <const Opts extends ZugferdOptions>(
	zugferd: Zugferd<Opts>,
	profileId: Opts["profiles"][number]["id"],
	input: TestEntry[],
) => {
	const invoicer: any = zugferd;

	describe.each(input)("should parse valid $label", async ({ data }) => {
		const invoice = await invoicer.create(profileId, data);
		const xml = invoice.toXML();
		const pdf = await (await invoice.toPDF(await blankPDF())).save();
		const expected = expectedInvoice(String(profileId), data);

		test("should parse valid XML", async () => {
			const parsed = toInput(await invoicer.parse(profileId, xml));
			await expect(toComparableParsedInvoice(parsed)).resolves.toEqual(
				await toComparableParsedInvoice(expected),
			);
		});

		test("should parse valid PDF", async () => {
			const parsed = toInput(await invoicer.parse(profileId, pdf));
			await expect(toComparableParsedInvoice(parsed)).resolves.toEqual(
				await toComparableParsedInvoice(expected),
			);
		});
	});
};
