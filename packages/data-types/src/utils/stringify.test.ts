import { describe, expect, it } from "vitest";
import { stringify } from "./stringify";

describe("stringify", () => {
	it("prints primitives, dates, typed arrays, and object names", () => {
		expect(stringify("ab")).toBe('"ab"');
		expect(stringify(1n)).toBe("1");
		expect(stringify(null)).toBe("null");
		expect(stringify(undefined)).toBe("undefined");
		expect(stringify(Number.NaN)).toBe("NaN");
		expect(stringify(new Date("invalid"))).toBe("Date");
		expect(stringify(new Uint8Array([1]))).toBe("Uint8Array");
		expect(stringify({ a: 1 })).toBe("Object");
		expect(stringify(() => undefined)).toBe("Function");
	});
});
