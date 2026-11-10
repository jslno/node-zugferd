import { describe, expect, it } from "vitest";
import { COLOR_PROFILE } from "./color-profile";

describe("COLOR_PROFILE", () => {
	it("is the sRGB IEC 61966-2-1 profile", () => {
		const text = Buffer.from(COLOR_PROFILE).toString("latin1");

		expect(COLOR_PROFILE.length).toBe(3024);
		expect(text).toContain("sRGB2014");
		expect(text).toContain("IEC 61966-2-1");
	});
});
