import type { DateFormat } from "@node-zugferd/data-types";
import {
	ARRAY_PATH_WILDCARD,
	formatDate,
	unwrapSchema,
	walkSchema,
} from "@node-zugferd/data-types";
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

function setAtPath(
	target: Record<string, any>,
	path: readonly string[],
	indexes: readonly number[],
	value: unknown,
) {
	let current: any = target;
	let indexCursor = 0;

	for (let i = 0; i < path.length; i++) {
		const segment = path[i]!;
		const isLeaf = i === path.length - 1;

		if (segment === ARRAY_PATH_WILDCARD) {
			const index = indexes[indexCursor++];
			if (index === undefined || !Array.isArray(current)) return;
			if (isLeaf) {
				current[index] = value;
				return;
			}
			current = current[index];
			continue;
		}

		if (isLeaf) {
			current[segment] = value;
			return;
		}

		current = current[segment];
		if (current == null) return;
	}
}

function getAtPath(
	target: Record<string, any>,
	path: readonly string[],
	indexes: readonly number[],
): unknown {
	let current: any = target;
	let indexCursor = 0;

	for (const segment of path) {
		if (current == null) return undefined;
		if (segment === ARRAY_PATH_WILDCARD) {
			const index = indexes[indexCursor++];
			if (index === undefined) return undefined;
			current = current[index];
		} else {
			current = current[segment];
		}
	}

	return current;
}

/**
 * Align fixture Input with parser output:
 * - amounts: bare number/string → `{ value: number }`
 * - quantities: `{ value: "20.0000", unitCode }` → `{ value: 20, unitCode }`
 * - unit-price-amount / percentage: string → number
 * - dates: `Date` → `{ format, value: Date }`
 */
function normalizeParsedLeaves(schema: unknown, data: Record<string, any>) {
	const result = structuredClone(data);

	walkSchema(
		schema as never,
		({ schema: fieldSchema, path, indexes }) => {
			const unwrapped = unwrapSchema(fieldSchema as never);
			if (unwrapped.kind !== "schema") return;

			const current = getAtPath(result, path, indexes);

			if (unwrapped.type === "amount") {
				if (typeof current === "number" || typeof current === "string") {
					setAtPath(result, path, indexes, { value: Number(current) });
				}
				return;
			}

			if (unwrapped.type === "quantity") {
				if (
					current &&
					typeof current === "object" &&
					"value" in current &&
					(typeof (current as { value: unknown }).value === "string" ||
						typeof (current as { value: unknown }).value === "number")
				) {
					const quantity = current as {
						value: string | number;
						unitCode?: string;
					};
					setAtPath(result, path, indexes, {
						...quantity,
						value: Number(quantity.value),
					});
				}
				return;
			}

			if (
				(unwrapped.type === "unit-price-amount" ||
					unwrapped.type === "percentage") &&
				(typeof current === "number" || typeof current === "string")
			) {
				setAtPath(result, path, indexes, Number(current));
				return;
			}

			if (unwrapped.type === "date" && current instanceof Date) {
				const config = (
					unwrapped as {
						config?: {
							outputFormat?: string;
							inputFormats?: readonly string[];
						};
					}
				).config;
				const format = (config?.outputFormat ??
					config?.inputFormats?.[0] ??
					"102") as DateFormat;
				setAtPath(result, path, indexes, {
					format,
					value: current,
					raw: formatDate(current, format),
				});
				return;
			}

			if (unwrapped.type === "binary_object" && current) {
				setAtPath(result, path, indexes, current);
			}
		},
		{
			resolveArrayLength: (arrayPath, indexes) => {
				const value = getAtPath(result, arrayPath, indexes);
				return Array.isArray(value) ? value.length : 0;
			},
		},
	);

	return result;
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

async function toComparableParsedInvoice(value: unknown): Promise<unknown> {
	if (value instanceof File) return toComparableBinary(value);
	if (isBinaryLike(value) || value == null || typeof value !== "object") {
		return value;
	}
	if (Array.isArray(value)) {
		return Promise.all(value.map((item) => toComparableParsedInvoice(item)));
	}
	if ("content" in value && "filename" in value && "mimeType" in value) {
		return toComparableBinary(value);
	}

	const out: Record<string, unknown> = {};
	for (const [key, child] of Object.entries(value)) {
		if (child === "") continue;
		out[key] = await toComparableParsedInvoice(child);
	}
	return out;
}

function expectedParsedInvoice(
	profileId: string,
	schema: unknown,
	data: Record<string, any>,
): Record<string, any> {
	return omitEmptyObjects(
		normalizeParsedLeaves(schema, {
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
		}),
	);
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
		const profile = invoicer.$context.getProfile(profileId, { throw: true });
		const expected = expectedParsedInvoice(
			String(profileId),
			profile.schema,
			data,
		);

		test("should parse valid XML", async () => {
			const parsed = await invoicer.parse(profileId, xml);
			await expect(toComparableParsedInvoice(parsed)).resolves.toEqual(
				await toComparableParsedInvoice(expected),
			);
		});

		test("should parse valid PDF", async () => {
			const parsed = await invoicer.parse(profileId, pdf);
			await expect(toComparableParsedInvoice(parsed)).resolves.toEqual(
				await toComparableParsedInvoice(expected),
			);
		});
	});
};
