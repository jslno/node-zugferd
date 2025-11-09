import { describe, expect, it } from "vitest";
import type { Schema, StandardSchemaV1 } from "../types";
import { validateSchema } from "./validate-schema";

describe("validateSchema", () => {
	const stringSchema = {
		"~standard": {
			vendor: "node-zugferd",
			version: 1,
			validate(value) {
				if (typeof value !== "string" || value.length === 0) {
					return {
						issues: [{ message: `Expected string but got "${typeof value}"` }],
					};
				}
				return {
					value: value as string,
				};
			},
		},
	} as const satisfies StandardSchemaV1<string>;

	it("should validate required and optional fields correctly", async () => {
		const schema = {
			requiredField: {
				type: stringSchema,
			},
			nonRequiredField: {
				type: stringSchema,
				required: false,
			},
		} as const satisfies Schema;

		await expect(
			validateSchema(schema, { requiredField: "value" }),
		).resolves.toEqual({
			requiredField: "value",
		});
		await expect(
			validateSchema(schema, {
				requiredField: "value",
				nonRequiredField: "value2",
			}),
		).resolves.toEqual({
			requiredField: "value",
			nonRequiredField: "value2",
		});
		await expect(
			validateSchema(schema, {
				nonRequiredField: "value",
			}),
		).rejects.toThrowError();
	});

	it("should validate StandardSchemaV1 fields correctly", async () => {
		const schema = {
			foo: {
				type: stringSchema,
			},
		} as const satisfies Schema;

		await expect(validateSchema(schema, { foo: "bar" })).resolves.toEqual({
			foo: "bar",
		});
		await expect(validateSchema(schema, { foo: 123 })).rejects.toThrowError(
			'Invalid value for field "foo": Expected string but got "number"',
		);
	});

	it("should validate enum fields correctly", async () => {
		const schema = {
			status: {
				type: ["pending", "approved", "rejected"],
			},
		} as const satisfies Schema;

		await expect(
			validateSchema(schema, { status: "approved" }),
		).resolves.toEqual({ status: "approved" });
		await expect(
			validateSchema(schema, {
				// @ts-expect-error
				status: "invalid",
			}),
		).rejects.toThrowError('Invalid value for field "status": "invalid"');
	});

	it("should validate nested object fields correctly", async () => {
		const schema = {
			foo: {
				type: "object",
				shape: {
					bar: {
						type: stringSchema,
					},
					baz: {
						type: "object",
						shape: {
							qux: {
								type: stringSchema,
							},
						},
					},
				},
			},
		} as const satisfies Schema;

		await expect(
			validateSchema(schema, {
				foo: {
					bar: "bar",
					baz: {
						qux: "qux",
					},
				},
			}),
		).resolves.toEqual({
			foo: {
				bar: "bar",
				baz: {
					qux: "qux",
				},
			},
		});
		await expect(
			validateSchema(schema, {
				foo: {
					bar: 123,
					baz: {
						qux: "qux",
					},
				},
			}),
		).rejects.toThrowError(
			'Invalid value for field "foo.bar": Expected string but got "number"',
		);
		await expect(
			validateSchema(schema, {
				foo: {
					bar: "bar",
					baz: {
						qux: 123,
					},
				},
			}),
		).rejects.toThrowError(
			'Invalid value for field "foo.baz.qux": Expected string but got "number"',
		);
	});
});
