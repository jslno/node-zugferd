import { describe, expect, it } from "vitest";
import { base64 } from "./base64";

describe("base64", () => {
	it("encodes standard text and byte vectors", () => {
		expect(base64.encode("")).toBe("");
		expect(base64.encode(new Uint8Array())).toBe("");
		expect(base64.encode("f")).toBe("Zg==");
		expect(base64.encode("fo")).toBe("Zm8=");
		expect(base64.encode("foo")).toBe("Zm9v");
		expect(base64.encode("food")).toBe("Zm9vZA==");
		expect(base64.encode("foods")).toBe("Zm9vZHM=");
		expect(base64.encode("foobar")).toBe("Zm9vYmFy");
		expect(base64.encode("hello")).toBe("aGVsbG8=");
		expect(base64.encode("ü")).toBe("w7w=");
		expect(base64.encode("€")).toBe("4oKs");
		expect(base64.encode("😀")).toBe("8J+YgA==");
		expect(base64.encode(Uint8Array.from([0xff]))).toBe("/w==");
		expect(base64.encode(Uint8Array.from([0xfb]))).toBe("+w==");
		expect(base64.encode(Uint8Array.from([0x00, 0xff]))).toBe("AP8=");
	});

	it("encodes a string as its UTF-8 bytes", () => {
		const text = "für € 😀";

		expect(base64.encode(text)).toBe(
			base64.encode(new TextEncoder().encode(text)),
		);
		expect(new TextDecoder().decode(base64.decode(base64.encode(text)))).toBe(
			text,
		);
	});

	it("encodes only the bytes visible to a view", () => {
		const bytes = Uint8Array.from([1, 2, 3, 4]);

		expect(base64.encode(bytes.subarray(1, 3))).toBe(
			base64.encode(Uint8Array.from([2, 3])),
		);
	});

	it("decodes to the original bytes", () => {
		expect(base64.decode("")).toEqual(new Uint8Array());
		expect(base64.decode("Zm9vYmFy")).toEqual(
			Uint8Array.from([0x66, 0x6f, 0x6f, 0x62, 0x61, 0x72]),
		);
		expect(base64.decode(base64.encode("%PDF-"))).toEqual(
			Uint8Array.from([0x25, 0x50, 0x44, 0x46, 0x2d]),
		);
		expect(base64.decode("/w==")).toEqual(Uint8Array.from([0xff]));
		expect(base64.decode("8J+YgA==")).toEqual(
			Uint8Array.from([0xf0, 0x9f, 0x98, 0x80]),
		);
	});

	it("round-trips every byte without inserting line breaks", () => {
		const bytes = Uint8Array.from({ length: 256 }, (_, index) => index);
		const encoded = base64.encode(bytes);

		expect(encoded.includes("\n")).toBe(false);
		expect(base64.decode(encoded)).toEqual(bytes);
	});

	it("rejects input outside the base64 alphabet", () => {
		expect(() => base64.decode("****")).toThrow(DOMException);
		expect(() => base64.decode("YQ=")).toThrow(DOMException);
		expect(() => base64.decode("-_")).toThrow(DOMException);
	});
});
