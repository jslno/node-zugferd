import { describe, expect, it } from "vitest";
import type { InferInput } from "../index";
import {
	array,
	asArray,
	intersect,
	nullish,
	object,
	parse,
	text,
} from "../index";

type AssertTrue<T extends true> = T;
describe("intersect cardinality upgrade", () => {
	const baseType = object({
		foo: text(),
	});

	const schema = intersect([
		object({
			a: baseType,
		}),
		object({
			a: asArray(baseType),
		}),
	]);

	type Input = InferInput<typeof schema>;

	it("infers array input when child upgrades object cardinality", () => {
		const input: Input = {
			a: [{ foo: "bar" }],
		};

		expect(input.a).toEqual([{ foo: "bar" }]);
	});

	it("accepts array input and merges to the array shape", () => {
		const output = parse(schema, {
			a: [{ foo: "bar" }],
		});

		expect(output).toEqual({
			a: [{ foo: "bar" }],
		});
	});

	it("rejects scalar input when child requires an array", () => {
		expect(() =>
			parse(schema, {
				a: { foo: "bar" },
			}),
		).toThrow();
	});

	it("accepts undefined on nullish upgraded paths", () => {
		const nullishSchema = intersect([
			object({
				a: nullish(baseType),
			}),
			object({
				a: nullish(asArray(baseType)),
			}),
		]);

		expect(parse(nullishSchema, {})).toEqual({});
		expect(parse(nullishSchema, { a: [{ foo: "bar" }] })).toEqual({
			a: [{ foo: "bar" }],
		});
	});

	it("adapts parent validation to the first array element", () => {
		const output = parse(schema, {
			a: [{ foo: "first" }, { foo: "second" }],
		});

		expect(output).toEqual({
			a: [{ foo: "first" }, { foo: "second" }],
		});
	});

	it("merges extended object fields when child upgrades cardinality", () => {
		const extendedBase = object({
			...baseType.entries,
			c: text(),
		});
		const extendedSchema = intersect([
			object({
				a: baseType,
			}),
			object({
				a: asArray(extendedBase),
			}),
		]);

		type ExtendedInput = InferInput<typeof extendedSchema>;

		const input: ExtendedInput = {
			a: [{ foo: "bar", c: "baz" }],
		};

		expect(parse(extendedSchema, input)).toEqual({
			a: [{ foo: "bar", c: "baz" }],
		});
	});

	it("merges three flat intersect options", () => {
		const schema = intersect([
			object({
				a: text(),
			}),
			object({
				b: text(),
			}),
			object({
				c: text(),
			}),
		]);

		type Input = InferInput<typeof schema>;

		const input: Input = {
			a: "a",
			b: "b",
			c: "c",
		};

		expect(parse(schema, input)).toEqual(input);
	});

	it("merges nested intersect options the same as flat options", () => {
		const base = object({
			item: object({
				x: text(),
			}),
		});
		const mid = object({
			item: object({
				y: text(),
			}),
		});
		const extended = object({
			item: asArray(
				object({
					z: text(),
				}),
			),
		});

		const nestedSchema = intersect([intersect([base, mid]), extended]);

		type NestedInput = InferInput<typeof nestedSchema>;

		const input: NestedInput = {
			item: [{ x: "x", y: "y", z: "z" }],
		};

		expect(parse(nestedSchema, input)).toEqual({
			item: [{ x: "x", y: "y", z: "z" }],
		});
	});

	it("collects cardinality rules through nested intersect parents", () => {
		const parent = intersect([
			object({
				a: object({
					b: text(),
				}),
			}),
			object({
				a: object({
					c: text(),
				}),
			}),
		]);
		const schema = intersect([
			parent,
			object({
				a: asArray(
					object({
						b: text(),
						c: text(),
						d: text(),
					}),
				),
			}),
		]);

		type Input = InferInput<typeof schema>;

		const input: Input = {
			a: [{ b: "b", c: "c", d: "d" }],
		};

		expect(parse(schema, input)).toEqual({
			a: [{ b: "b", c: "c", d: "d" }],
		});
	});

	it("preserves array type when parent has object and child uses asArray", () => {
		const bwlPaymentTerms = object({
			paymentTerms: nullish(
				object({
					description: text(),
					dueDate: text(),
				}),
			),
		});
		const extendedPaymentTerms = object({
			paymentTerms: nullish(
				asArray(
					object({
						partialPaymentAmount: text(),
						dueDate: text(),
					}),
				),
			),
		});
		const paymentTermsSchema = intersect([
			bwlPaymentTerms,
			extendedPaymentTerms,
		]);

		type Input = InferInput<typeof paymentTermsSchema>;

		const input: Input = {
			paymentTerms: [
				{
					description: "terms",
					dueDate: "2025-12-31",
					partialPaymentAmount: "100",
				},
			],
		};

		expect(parse(paymentTermsSchema, input)).toEqual({
			paymentTerms: [
				{
					description: "terms",
					dueDate: "2025-12-31",
					partialPaymentAmount: "100",
				},
			],
		});
	});

	it("preserves array type across three profile-like folds", () => {
		const paymentTermsSchema = intersect([
			object({
				paymentTerms: nullish(
					object({
						description: text(),
					}),
				),
			}),
			object({
				paymentTerms: nullish(
					object({
						dueDate: text(),
					}),
				),
			}),
			object({
				paymentTerms: nullish(
					asArray(
						object({
							partialPaymentAmount: text(),
						}),
					),
				),
			}),
		]);

		type Input = InferInput<typeof paymentTermsSchema>;

		const input: Input = {
			paymentTerms: [
				{
					description: "terms",
					dueDate: "2025-12-31",
					partialPaymentAmount: "100",
				},
			],
		};

		expect(parse(paymentTermsSchema, input)).toEqual(input);
	});

	it("strips parent nullish when child makes the field required", () => {
		const schema = intersect([
			object({
				paymentTerms: nullish(
					object({
						description: text(),
					}),
				),
			}),
			object({
				paymentTerms: object({
					description: text(),
					dueDate: text(),
				}),
			}),
		]);

		type Input = InferInput<typeof schema>;

		type _isRequired = AssertTrue<
			{} extends Pick<Input, "paymentTerms"> ? false : true
		>;
		type _rejectsNull = AssertTrue<
			null extends Input["paymentTerms"] ? false : true
		>;
		type _rejectsUndefined = AssertTrue<
			undefined extends Input["paymentTerms"] ? false : true
		>;

		const input: Input = {
			paymentTerms: {
				description: "terms",
				dueDate: "2025-12-31",
			},
		};

		expect(parse(schema, input)).toEqual(input);
		expect(() => parse(schema, { paymentTerms: null })).toThrow();
		expect(() => parse(schema, {})).toThrow();
	});

	it("adapts object-to-array upgrades inside array items", () => {
		const parent = object({
			transaction: object({
				line: array(
					object({
						billing: object({
							vatBreakdown: object({
								typeCode: text(),
							}),
						}),
					}),
				),
			}),
		});
		const child = object({
			transaction: object({
				line: array(
					object({
						billing: object({
							vatBreakdown: asArray(
								object({
									typeCode: text(),
									extra: text(),
								}),
							),
						}),
					}),
				),
			}),
		});
		const schema = intersect([parent, child]);

		const input = {
			transaction: {
				line: [
					{
						billing: {
							vatBreakdown: [{ typeCode: "VAT", extra: "x" }],
						},
					},
					{
						billing: {
							vatBreakdown: [{ typeCode: "VAT", extra: "y" }],
						},
					},
				],
			},
		};

		expect(parse(schema, input)).toEqual(input);
	});

	it("adapts nullish object-to-array upgrades inside array items", () => {
		const parent = object({
			transaction: object({
				line: array(
					object({
						billing: nullish(
							object({
								vatBreakdown: nullish(
									object({
										typeCode: text(),
									}),
								),
							}),
						),
					}),
				),
			}),
		});
		const child = object({
			transaction: object({
				line: array(
					object({
						billing: nullish(
							object({
								vatBreakdown: nullish(
									asArray(
										object({
											typeCode: text(),
											extra: text(),
										}),
									),
								),
							}),
						),
					}),
				),
			}),
		});
		const schema = intersect([parent, child]);

		expect(
			parse(schema, {
				transaction: {
					line: [
						{
							billing: {
								vatBreakdown: [{ typeCode: "VAT", extra: "x" }],
							},
						},
					],
				},
			}),
		).toEqual({
			transaction: {
				line: [
					{
						billing: {
							vatBreakdown: [{ typeCode: "VAT", extra: "x" }],
						},
					},
				],
			},
		});
	});

	it("keeps unrelated keys merged normally", () => {
		const mergedSchema = intersect([
			object({
				a: baseType,
				b: text(),
			}),
			object({
				a: asArray(baseType),
			}),
		]);

		expect(
			parse(mergedSchema, {
				a: [{ foo: "bar" }],
				b: "ok",
			}),
		).toEqual({
			a: [{ foo: "bar" }],
			b: "ok",
		});
	});
});
