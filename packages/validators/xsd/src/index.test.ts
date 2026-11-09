import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { ZugferdContext } from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { xsd } from ".";

const validator = vi.hoisted(() => ({
	create: vi.fn(),
	real: null as
		| ((
				rootXsd: string,
				loader?: (filename: string) => string | Promise<string>,
		  ) => Promise<{ validateOrThrow(xml: string): boolean }>)
		| null,
}));

vi.mock("@zugferd/xsd-validator", async (importOriginal) => {
	const actual =
		await importOriginal<typeof import("@zugferd/xsd-validator")>();
	validator.real = (rootXsd, loader) =>
		actual.XsdValidator.create(rootXsd, loader);
	validator.create.mockImplementation((rootXsd, loader) =>
		validator.real?.(rootXsd, loader),
	);
	return {
		...actual,
		XsdValidator: {
			create: validator.create,
		},
	};
});

const bundledSchemas = {
	minimum: "FACTUR-X_MINIMUM.xsd",
	"basic-wl": "FACTUR-X_BASICWL.xsd",
	basic: "FACTUR-X_BASIC.xsd",
	"en-16931": "FACTUR-X_EN16931.xsd",
	extended: "FACTUR-X_EXTENDED.xsd",
} as const;

const context = () => {
	const afterXMLBuild = vi.fn();
	return {
		afterXMLBuild,
		ctx: {
			logger: { warn: vi.fn() },
			options: { hooks: { afterXMLBuild } },
		} as unknown as ZugferdContext,
	};
};

const validate = (
	plugin: ReturnType<typeof xsd>,
	ctx: ZugferdContext,
	profile: string,
	xml: string,
) => plugin.actions(ctx).xsd.validate(profile as never, xml);

describe("xsd", () => {
	let directory: string;

	beforeEach(async () => {
		directory = await mkdtemp(join(tmpdir(), "xsd-test-"));
		validator.create.mockImplementation((rootXsd, loader) =>
			validator.real?.(rootXsd, loader),
		);
	});

	afterEach(async () => {
		await rm(directory, { recursive: true, force: true });
	});

	it("exposes the plugin id, version, and bundled schemas", () => {
		const plugin = xsd();

		expect(plugin.id).toBe("xsd");
		expect(plugin.version).toBe(NODE_ZUGFERD_VERSION);
		expect(plugin.options.autoRun).toBe(true);
		for (const [profile, fileName] of Object.entries(bundledSchemas)) {
			const schema =
				plugin.options.schemaMap[
					profile as keyof typeof plugin.options.schemaMap
				];
			expect(schema?.path.endsWith(fileName)).toBe(true);
			expect(schema?.dir?.endsWith("schemas")).toBe(true);
		}
		expect(xsd({ autoRun: false }).options.autoRun).toBe(false);
	});

	it("keeps bundled schemas when a custom map overrides or adds one", async () => {
		const path = await writeSchema(
			directory,
			"custom.xsd",
			selfContainedSchema,
		);
		const plugin = xsd({
			schemaMap: {
				minimum: { path },
				extra: { path, dir: directory },
			},
		});

		expect(plugin.options.schemaMap.minimum).toEqual({ path });
		expect(plugin.options.schemaMap.extra).toEqual({ path, dir: directory });
		expect(
			plugin.options.schemaMap.extended?.path.endsWith(bundledSchemas.extended),
		).toBe(true);
	});

	it("loads each bundled schema, including its imports, and rejects a document that does not match", async () => {
		const { ctx } = context();
		const plugin = xsd();

		for (const profile of Object.keys(bundledSchemas)) {
			await expect(
				validate(plugin, ctx, profile, "<NotAnInvoice/>"),
			).rejects.toThrow(ZugferdError);
		}

		const minimumCall = validator.create.mock.calls.find(([content]) =>
			String(content).includes('name="CrossIndustryInvoice"'),
		);
		const loader = minimumCall?.[1] as
			| ((filename: string) => Promise<string>)
			| undefined;
		expect(loader).toEqual(expect.any(Function));
		expect(
			loader?.(
				"Factur-X_1.09_MINIMUM_urn_un_unece_uncefact_data_standard_QualifiedDataType_100.xsd",
			),
		).toContain("QualifiedDataType");
	});

	it("validates XML against a schema that imports another file", async () => {
		await writeSchema(directory, "types.xsd", importedSchema);
		const path = await writeSchema(directory, "invoice.xsd", importingSchema);
		const { ctx } = context();
		const plugin = xsd({
			schemaMap: { invoice: { path, dir: directory } },
		});

		await expect(
			validate(
				plugin,
				ctx,
				"invoice",
				'<Invoice xmlns="urn:test:invoice" xmlns:t="urn:test:types"><t:Id>4711</t:Id></Invoice>',
			),
		).resolves.toBeUndefined();
		await expect(
			validate(plugin, ctx, "invoice", '<Invoice xmlns="urn:test:invoice"/>'),
		).rejects.toThrow(ZugferdError);
	});

	it("validates a self-contained schema without a directory loader", async () => {
		const path = await writeSchema(directory, "note.xsd", selfContainedSchema);
		const { ctx } = context();
		const plugin = xsd({ schemaMap: { note: { path } } });

		await expect(
			validate(plugin, ctx, "note", "<Note>Hello</Note>"),
		).resolves.toBeUndefined();
		expect(validator.create).toHaveBeenCalledWith(
			expect.stringContaining('name="Note"'),
			undefined,
		);
		await expect(
			validate(plugin, ctx, "note", "<Note><Extra/></Note>"),
		).rejects.toThrow(ZugferdError);
	});

	it("accepts a profile object and rejects an unknown profile", async () => {
		const path = await writeSchema(directory, "note.xsd", selfContainedSchema);
		const { ctx } = context();
		const actions = xsd({ schemaMap: { note: { path } } }).actions(ctx).xsd;

		await expect(
			actions.validate({ id: "note" } as never, "<Note>Hello</Note>"),
		).resolves.toBeUndefined();
		await expect(
			validate(xsd(), ctx, "xrechnung", "<Invoice/>"),
		).rejects.toThrow(
			new ZugferdError(
				'No XSD schema found for profile "xrechnung". Please provide a custom schema file name in the plugin options.',
			),
		);
	});

	it("rethrows a non-Error failure from the validator", async () => {
		const path = await writeSchema(directory, "note.xsd", selfContainedSchema);
		const { ctx } = context();
		validator.create.mockResolvedValue({
			validateOrThrow: () => {
				throw "validator crashed";
			},
		});
		const plugin = xsd({ schemaMap: { note: { path } } });

		await expect(
			validate(plugin, ctx, "note", "<Note>Hello</Note>"),
		).rejects.toBe("validator crashed");
	});

	it("validates built XML when autoRun is enabled and leaves it to the caller otherwise", async () => {
		const path = await writeSchema(directory, "note.xsd", selfContainedSchema);
		const manual = context();
		expect(
			xsd({ autoRun: false, schemaMap: { note: { path } } }).init(manual.ctx),
		).toBeUndefined();

		const failing = context();
		const failingHooks = xsd({ schemaMap: { note: { path } } }).init(
			failing.ctx,
		)?.options.hooks;
		await expect(
			failingHooks?.afterXMLBuild?.({
				profile: { id: "note" },
				xml: "<NotANote/>",
				context: failing.ctx,
			} as never),
		).rejects.toThrow(ZugferdError);
		expect(failing.afterXMLBuild).not.toHaveBeenCalled();

		const passing = context();
		const passingHooks = xsd({ schemaMap: { note: { path } } }).init(
			passing.ctx,
		)?.options.hooks;
		await passingHooks?.afterXMLBuild?.({
			profile: { id: "note" },
			xml: "<Note>Hello</Note>",
			context: passing.ctx,
		} as never);
		expect(passing.afterXMLBuild).toHaveBeenCalledOnce();

		const skipped = context();
		const skippedHooks = xsd().init(skipped.ctx)?.options.hooks;
		validator.create.mockClear();
		await skippedHooks?.afterXMLBuild?.({
			profile: { id: "xrechnung" },
			xml: "<Invoice/>",
			context: skipped.ctx,
		} as never);
		expect(validator.create).not.toHaveBeenCalled();
		expect(skipped.afterXMLBuild).toHaveBeenCalledOnce();
	});
});

const writeSchema = async (
	directory: string,
	name: string,
	content: string,
) => {
	const path = join(directory, name);
	await writeFile(path, content, "utf-8");
	return path;
};

const selfContainedSchema = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="Note" type="xs:string"/>
</xs:schema>
`;

const importedSchema = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" targetNamespace="urn:test:types" elementFormDefault="qualified">
  <xs:element name="Id" type="xs:string"/>
</xs:schema>
`;

const importingSchema = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:t="urn:test:types" targetNamespace="urn:test:invoice" elementFormDefault="qualified">
  <xs:import namespace="urn:test:types" schemaLocation="types.xsd"/>
  <xs:element name="Invoice">
    <xs:complexType>
      <xs:sequence>
        <xs:element ref="t:Id"/>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>
`;
