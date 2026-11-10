import { describe, expect, it } from "vitest";
import { arrayAsync, nullish, nullishAsync, text } from "../schemas";
import { getDefault } from "./get-default";

describe("getDefault", () => {
	it("reads literal and function defaults", () => {
		expect(getDefault(nullish(text(), "fallback"))).toBe("fallback");
		expect(getDefault(nullish(text(), () => "computed"))).toBe("computed");
		expect(getDefault(text())).toBeUndefined();
		expect(getDefault(nullish(text()))).toBeUndefined();
	});

	it("reads async defaults", async () => {
		await expect(
			getDefault(nullishAsync(arrayAsync(text()), async () => ["later"])),
		).resolves.toEqual(["later"]);
	});
});
