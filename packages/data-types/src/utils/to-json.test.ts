import { beforeAll, describe, expect, it } from "vitest";
import { metadata } from "../actions/metadata";
import { pipe } from "../methods/pipe";
import { amount } from "../schemas/amount";
import { array } from "../schemas/array";
import { asArray } from "../schemas/as-array";
import { binaryObject } from "../schemas/binary-object";
import { boolean } from "../schemas/boolean";
import { code } from "../schemas/code";
import { date } from "../schemas/date";
import { identifier } from "../schemas/identifier";
import { literal } from "../schemas/literal";
import { nullish } from "../schemas/nullish";
import { object } from "../schemas/object";
import { percentage } from "../schemas/percentage";
import { quantity } from "../schemas/quantity";
import { text } from "../schemas/string";
import { union } from "../schemas/union";
import { unitPriceAmount } from "../schemas/unit-price-amount";
import { registerCodelist } from "../storages";

function inputSchema(schema: unknown) {
	const standard = (
		schema as {
			"~standard": {
				jsonSchema: {
					input: (options: { target: "draft-2020-12" }) => unknown;
				};
			};
		}
	)["~standard"];
	return standard.jsonSchema.input({
		target: "draft-2020-12",
	});
}

describe("JSON Schema", () => {
	beforeAll(() => {
		registerCodelist("currency", [
			{ key: "EUR", value: "EUR" },
			{ key: "USD", value: "USD" },
		]);
		registerCodelist("unit", [
			{ key: "H87", value: "H87" },
			{ key: "C62", value: "C62" },
		]);
	});

	it("converts primitive and composite schemas", () => {
		expect(inputSchema(text())).toMatchObject({ type: "string" });
		expect(inputSchema(boolean())).toMatchObject({ type: "boolean" });
		expect(inputSchema(literal("a"))).toMatchObject({
			const: "a",
		});
		expect(inputSchema(array(text()))).toMatchObject({
			type: "array",
			items: { type: "string" },
		});
		expect(inputSchema(asArray(text()))).toMatchObject({
			type: "array",
			items: { type: "string" },
		});
		expect(inputSchema(union([literal("a"), literal("b")]))).toMatchObject({
			anyOf: expect.any(Array),
		});
	});

	it("converts objects and optional entries", () => {
		expect(
			inputSchema(
				object({
					name: text(),
					note: nullish(text()),
				}),
			),
		).toMatchObject({
			type: "object",
			properties: {
				name: { type: "string" },
				note: { anyOf: expect.any(Array) },
			},
			required: ["name"],
		});
	});

	it("preserves all JSON serializable metadata fields", () => {
		const result = inputSchema(
			pipe(
				text(),
				metadata({
					description: "Invoice document number",
					id: "invoice-number",
					title: "Invoice number",
					examples: ["INV-1", "INV-2"],
					label: "Number",
					custom: {
						group: "header",
						required: true,
					},
					ignoredFunction: () => undefined,
					ignoredBigInt: 1n,
				}),
			),
		) as Record<string, unknown>;

		expect(result).toMatchObject({
			type: "string",
			description: "Invoice document number",
			id: "invoice-number",
			title: "Invoice number",
			examples: ["INV-1", "INV-2"],
			label: "Number",
			custom: {
				group: "header",
				required: true,
			},
		});
		expect(result).not.toHaveProperty("ignoredFunction");
		expect(result).not.toHaveProperty("ignoredBigInt");

		expect(
			inputSchema(
				object({
					identifier: pipe(
						text(),
						metadata({
							description: "Supplier identifier",
							id: "supplier-identifier",
						}),
					),
				}),
			),
		).toMatchObject({
			type: "object",
			properties: {
				identifier: {
					type: "string",
					description: "Supplier identifier",
					id: "supplier-identifier",
				},
			},
		});
	});

	it("converts domain schemas", () => {
		expect(inputSchema(amount())).toMatchObject({
			anyOf: expect.any(Array),
		});
		expect(inputSchema(quantity())).toMatchObject({
			anyOf: expect.any(Array),
		});
		expect(inputSchema(percentage())).toMatchObject({
			type: "number",
			minimum: 0,
			maximum: 100,
		});
		expect(inputSchema(unitPriceAmount())).toMatchObject({
			type: "number",
		});
		expect(inputSchema(date())).toMatchObject({
			anyOf: expect.any(Array),
		});
		expect(inputSchema(code("currency"))).toMatchObject({
			type: "string",
			enum: ["EUR", "USD"],
		});
		expect(inputSchema(identifier())).toMatchObject({
			anyOf: expect.any(Array),
		});
		expect(inputSchema(binaryObject())).toMatchObject({
			type: "object",
			required: ["content", "mimeType", "filename"],
		});
	});
});
