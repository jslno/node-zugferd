import { describe, expect, it } from "vitest";
import { toBlob } from "./utils";

describe("toBlob", () => {
	it("preserves Blob inputs and converts strings, bytes, and ArrayBuffers", async () => {
		const original = new Blob(["original"], { type: "text/plain" });
		expect(toBlob(original)).toBe(original);
		expect(await toBlob("text").text()).toBe("text");
		expect(await toBlob(new Uint8Array([65, 66])).text()).toBe("AB");
		expect(await toBlob(new Uint8Array([67, 68]).buffer).text()).toBe("CD");
	});

	it("base64-decodes strings when requested", async () => {
		expect(await toBlob("SGVsbG8=", { base64DecodeString: true }).text()).toBe(
			"Hello",
		);
	});
});
