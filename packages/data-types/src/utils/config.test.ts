import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG } from "./config";

describe("config", () => {
	it("starts with unset message and abortEarly", () => {
		expect(DEFAULT_CONFIG).toEqual({
			message: undefined,
			abortEarly: undefined,
		});
	});
});
