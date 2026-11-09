import { describe, expect, it } from "vitest";
import { remainingPlugins, remainingProfiles } from "./configured";
import { catalogIdsFromSource, patchConfig } from "./patch-config";
import { PLUGINS } from "./plugins";
import { PROFILES } from "./profiles";

const basic = PROFILES.get("basic")!;
const parser = PLUGINS.get("parser")!;

const devInvoicer = `import { defaultTemplate } from "@node-zugferd/default-template";
import { minimum } from "@node-zugferd/minimum";
import { templates } from "@node-zugferd/templates";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [minimum],
	plugins: [
		templates({
			templates: {
				default: defaultTemplate(),
			},
			defaultTemplate: "default",
		}),
	],
});
`;

describe("catalogIdsFromSource", () => {
	it("reads catalog ids from the zugferd() call", () => {
		expect(catalogIdsFromSource(devInvoicer)).toEqual({
			profiles: ["minimum"],
			plugins: ["templates"],
		});
	});

	it("leaves profiles and plugins that are not in the file", () => {
		const ids = catalogIdsFromSource(devInvoicer);
		expect(
			remainingProfiles({
				profiles: ids.profiles.map((id) => ({ id })),
			}).map((profile) => profile.id),
		).not.toContain("minimum");
		expect(
			remainingPlugins({
				plugins: ids.plugins.map((id) => ({ id })),
			}).map((plugin) => plugin.id),
		).toEqual(
			expect.arrayContaining(["parser", "xsd", "mustang", "magic-bytes"]),
		);
		expect(
			remainingPlugins({
				plugins: ids.plugins.map((id) => ({ id })),
			}).map((plugin) => plugin.id),
		).not.toContain("templates");
	});
});

describe("patchConfig", () => {
	it("adds a profile and a plugin call without rewriting existing plugin arguments", async () => {
		const source = `import { minimum } from "@node-zugferd/minimum";
import { mustang } from "@node-zugferd/validator-mustang";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [minimum],
	plugins: [
		mustang({
			autoRun: false,
		}),
	],
});
`;

		const result = await patchConfig(source, {
			profiles: [basic],
			plugins: [parser],
			imports: [...(basic.imports ?? []), ...(parser.imports ?? [])],
		});

		expect(result.match(/mustang\(/g)).toHaveLength(1);
		expect(result).toContain("autoRun: false");
		expect(result.match(/parser\(/g)).toHaveLength(1);
		expect(result).toContain("basic");
		expect(result).toContain('from "@node-zugferd/basic"');
		expect(result).toContain('from "@node-zugferd/parser"');
	});

	it("creates a plugins array when the property is missing", async () => {
		const source = `import { minimum } from "@node-zugferd/minimum";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [minimum],
});
`;

		const result = await patchConfig(source, {
			plugins: [parser],
			imports: parser.imports,
		});

		expect(result).toContain("plugins:");
		expect(result).toContain("parser()");
		expect(result).toContain("profiles:");
	});

	it("merges a named import into an existing import from the same module", async () => {
		const source = `import { documentParser } from "@node-zugferd/parser";
import { minimum } from "@node-zugferd/minimum";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [minimum],
	plugins: [],
});
`;

		const result = await patchConfig(source, {
			plugins: [parser],
			imports: parser.imports,
		});

		expect(result.match(/from "@node-zugferd\/parser"/g)).toHaveLength(1);
		expect(result).toMatch(
			/documentParser[\s\S]*parser|parser[\s\S]*documentParser/,
		);
		expect(result).toContain("parser()");
	});

	it("throws when zugferd() is not called with an object literal and leaves the source unchanged", async () => {
		const source = `import { zugferd } from "node-zugferd";
const options = { profiles: [] };
export const invoicer = zugferd(options);
`;

		await expect(
			patchConfig(source, {
				profiles: [basic],
				imports: basic.imports,
			}),
		).rejects.toThrow(/object literal/);
		expect(source).toContain("zugferd(options)");
	});

	it("appends to an existing templates() call without rewriting its arguments", async () => {
		const result = await patchConfig(devInvoicer, {
			profiles: [basic],
			plugins: [parser],
			imports: [...(basic.imports ?? []), ...(parser.imports ?? [])],
		});

		expect(result).toContain('defaultTemplate: "default"');
		expect(result.match(/templates\(/g)?.length).toBeGreaterThan(0);
		expect(result).toContain("parser()");
		expect(result).toContain("basic");
	});
});
