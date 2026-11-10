import { describe, expect, it } from "vitest";
import { readZugferdOptions } from "./get-config";

const options = {
	profiles: [{ id: "minimum" }],
	plugins: [{ id: "~create" }, { id: "parser" }],
};

describe("readZugferdOptions", () => {
	it("reads profiles and plugins from $context.options", () => {
		expect(
			readZugferdOptions({
				invoicer: { $context: { options } },
				options: { prettyPrint: true },
			}),
		).toBe(options);
	});

	it("falls back to options when $context is missing", () => {
		const legacy = { profiles: [{ id: "basic" }] };
		expect(readZugferdOptions({ invoicer: { options: legacy } })).toBe(legacy);
	});

	it("reads a default export and a module that is the instance", () => {
		expect(
			readZugferdOptions({
				default: { $context: { options } },
			}),
		).toBe(options);
		expect(readZugferdOptions({ $context: { options } })).toBe(options);
	});

	it("returns null when options has no profiles array", () => {
		expect(readZugferdOptions({ options: { prettyPrint: true } })).toBeNull();
		expect(readZugferdOptions(null)).toBeNull();
	});
});
