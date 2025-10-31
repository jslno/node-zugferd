import { describe, expect, it } from "vitest";
import { z } from "zod";
import type { Schema } from "../types";
import { mergeSchema } from "./merge-schema";

describe("mergeSchema", () => {
	it("should merge flat schemas with overrides", () => {
		const a = {
			foo: {
				type: z.string(),
			},
			bar: {
				key: "some-key",
				type: z.number(),
			},
		} as const satisfies Schema;
		const b = {
			bar: {
				key: "new-key",
				type: z.date(),
			},
			baz: {
				type: z.string(),
				required: false,
			},
		} as const satisfies Schema;

		const result = mergeSchema(a, b);

		expect(result).toMatchInlineSnapshot(`
			{
			  "bar": {
			    "key": "new-key",
			    "type": ZodDate {
			      "_def": {
			        "checks": [],
			        "coerce": false,
			        "typeName": "ZodDate",
			      },
			      "and": [Function],
			      "array": [Function],
			      "brand": [Function],
			      "catch": [Function],
			      "default": [Function],
			      "describe": [Function],
			      "isNullable": [Function],
			      "isOptional": [Function],
			      "nullable": [Function],
			      "nullish": [Function],
			      "optional": [Function],
			      "or": [Function],
			      "parse": [Function],
			      "parseAsync": [Function],
			      "pipe": [Function],
			      "promise": [Function],
			      "readonly": [Function],
			      "refine": [Function],
			      "refinement": [Function],
			      "safeParse": [Function],
			      "safeParseAsync": [Function],
			      "spa": [Function],
			      "superRefine": [Function],
			      "transform": [Function],
			      "~standard": {
			        "validate": [Function],
			        "vendor": "zod",
			        "version": 1,
			      },
			    },
			  },
			  "baz": {
			    "required": false,
			    "type": ZodString {
			      "_def": {
			        "checks": [],
			        "coerce": false,
			        "typeName": "ZodString",
			      },
			      "and": [Function],
			      "array": [Function],
			      "brand": [Function],
			      "catch": [Function],
			      "default": [Function],
			      "describe": [Function],
			      "isNullable": [Function],
			      "isOptional": [Function],
			      "nullable": [Function],
			      "nullish": [Function],
			      "optional": [Function],
			      "or": [Function],
			      "parse": [Function],
			      "parseAsync": [Function],
			      "pipe": [Function],
			      "promise": [Function],
			      "readonly": [Function],
			      "refine": [Function],
			      "refinement": [Function],
			      "safeParse": [Function],
			      "safeParseAsync": [Function],
			      "spa": [Function],
			      "superRefine": [Function],
			      "transform": [Function],
			      "~standard": {
			        "validate": [Function],
			        "vendor": "zod",
			        "version": 1,
			      },
			    },
			  },
			  "foo": {
			    "type": ZodString {
			      "_def": {
			        "checks": [],
			        "coerce": false,
			        "typeName": "ZodString",
			      },
			      "and": [Function],
			      "array": [Function],
			      "brand": [Function],
			      "catch": [Function],
			      "default": [Function],
			      "describe": [Function],
			      "isNullable": [Function],
			      "isOptional": [Function],
			      "nullable": [Function],
			      "nullish": [Function],
			      "optional": [Function],
			      "or": [Function],
			      "parse": [Function],
			      "parseAsync": [Function],
			      "pipe": [Function],
			      "promise": [Function],
			      "readonly": [Function],
			      "refine": [Function],
			      "refinement": [Function],
			      "safeParse": [Function],
			      "safeParseAsync": [Function],
			      "spa": [Function],
			      "superRefine": [Function],
			      "transform": [Function],
			      "~standard": {
			        "validate": [Function],
			        "vendor": "zod",
			        "version": 1,
			      },
			    },
			  },
			}
		`);
	});

	it("should merge nested object schemas recursively", () => {
		const a = {
			foo: {
				type: "object",
				shape: {
					bar: {
						type: z.string(),
					},
					baz: {
						key: "some-key",
						type: z.string(),
					},
				},
			},
		} as const satisfies Schema;
		const b = {
			foo: {
				type: "object",
				shape: {
					baz: {
						key: "new-key",
						type: z.date(),
					},
					qux: {
						type: z.string(),
					},
				},
			},
		} as const satisfies Schema;

		const result = mergeSchema(a, b);

		expect(result).toMatchInlineSnapshot(`
			{
			  "foo": {
			    "shape": {
			      "bar": {
			        "type": ZodString {
			          "_def": {
			            "checks": [],
			            "coerce": false,
			            "typeName": "ZodString",
			          },
			          "and": [Function],
			          "array": [Function],
			          "brand": [Function],
			          "catch": [Function],
			          "default": [Function],
			          "describe": [Function],
			          "isNullable": [Function],
			          "isOptional": [Function],
			          "nullable": [Function],
			          "nullish": [Function],
			          "optional": [Function],
			          "or": [Function],
			          "parse": [Function],
			          "parseAsync": [Function],
			          "pipe": [Function],
			          "promise": [Function],
			          "readonly": [Function],
			          "refine": [Function],
			          "refinement": [Function],
			          "safeParse": [Function],
			          "safeParseAsync": [Function],
			          "spa": [Function],
			          "superRefine": [Function],
			          "transform": [Function],
			          "~standard": {
			            "validate": [Function],
			            "vendor": "zod",
			            "version": 1,
			          },
			        },
			      },
			      "baz": {
			        "key": "new-key",
			        "type": ZodDate {
			          "_def": {
			            "checks": [],
			            "coerce": false,
			            "typeName": "ZodDate",
			          },
			          "and": [Function],
			          "array": [Function],
			          "brand": [Function],
			          "catch": [Function],
			          "default": [Function],
			          "describe": [Function],
			          "isNullable": [Function],
			          "isOptional": [Function],
			          "nullable": [Function],
			          "nullish": [Function],
			          "optional": [Function],
			          "or": [Function],
			          "parse": [Function],
			          "parseAsync": [Function],
			          "pipe": [Function],
			          "promise": [Function],
			          "readonly": [Function],
			          "refine": [Function],
			          "refinement": [Function],
			          "safeParse": [Function],
			          "safeParseAsync": [Function],
			          "spa": [Function],
			          "superRefine": [Function],
			          "transform": [Function],
			          "~standard": {
			            "validate": [Function],
			            "vendor": "zod",
			            "version": 1,
			          },
			        },
			      },
			      "qux": {
			        "type": ZodString {
			          "_def": {
			            "checks": [],
			            "coerce": false,
			            "typeName": "ZodString",
			          },
			          "and": [Function],
			          "array": [Function],
			          "brand": [Function],
			          "catch": [Function],
			          "default": [Function],
			          "describe": [Function],
			          "isNullable": [Function],
			          "isOptional": [Function],
			          "nullable": [Function],
			          "nullish": [Function],
			          "optional": [Function],
			          "or": [Function],
			          "parse": [Function],
			          "parseAsync": [Function],
			          "pipe": [Function],
			          "promise": [Function],
			          "readonly": [Function],
			          "refine": [Function],
			          "refinement": [Function],
			          "safeParse": [Function],
			          "safeParseAsync": [Function],
			          "spa": [Function],
			          "superRefine": [Function],
			          "transform": [Function],
			          "~standard": {
			            "validate": [Function],
			            "vendor": "zod",
			            "version": 1,
			          },
			        },
			      },
			    },
			    "type": "object",
			  },
			}
		`);
	});

	it("should merge array object schemas", () => {
		const a = {
			foo: {
				type: "object[]",
				shape: {
					bar: {
						type: z.string(),
					},
					baz: {
						type: z.number(),
					},
				},
			},
		} as const satisfies Schema;
		const b = {
			foo: {
				type: "object[]",
				shape: {
					baz: {
						type: z.date(),
					},
					qux: {
						type: z.string(),
						required: false,
					},
				},
			},
		} as const satisfies Schema;

		const result = mergeSchema(a, b);

		expect(result).toMatchInlineSnapshot(`
			{
			  "foo": {
			    "shape": {
			      "bar": {
			        "type": ZodString {
			          "_def": {
			            "checks": [],
			            "coerce": false,
			            "typeName": "ZodString",
			          },
			          "and": [Function],
			          "array": [Function],
			          "brand": [Function],
			          "catch": [Function],
			          "default": [Function],
			          "describe": [Function],
			          "isNullable": [Function],
			          "isOptional": [Function],
			          "nullable": [Function],
			          "nullish": [Function],
			          "optional": [Function],
			          "or": [Function],
			          "parse": [Function],
			          "parseAsync": [Function],
			          "pipe": [Function],
			          "promise": [Function],
			          "readonly": [Function],
			          "refine": [Function],
			          "refinement": [Function],
			          "safeParse": [Function],
			          "safeParseAsync": [Function],
			          "spa": [Function],
			          "superRefine": [Function],
			          "transform": [Function],
			          "~standard": {
			            "validate": [Function],
			            "vendor": "zod",
			            "version": 1,
			          },
			        },
			      },
			      "baz": {
			        "type": ZodDate {
			          "_def": {
			            "checks": [],
			            "coerce": false,
			            "typeName": "ZodDate",
			          },
			          "and": [Function],
			          "array": [Function],
			          "brand": [Function],
			          "catch": [Function],
			          "default": [Function],
			          "describe": [Function],
			          "isNullable": [Function],
			          "isOptional": [Function],
			          "nullable": [Function],
			          "nullish": [Function],
			          "optional": [Function],
			          "or": [Function],
			          "parse": [Function],
			          "parseAsync": [Function],
			          "pipe": [Function],
			          "promise": [Function],
			          "readonly": [Function],
			          "refine": [Function],
			          "refinement": [Function],
			          "safeParse": [Function],
			          "safeParseAsync": [Function],
			          "spa": [Function],
			          "superRefine": [Function],
			          "transform": [Function],
			          "~standard": {
			            "validate": [Function],
			            "vendor": "zod",
			            "version": 1,
			          },
			        },
			      },
			      "qux": {
			        "required": false,
			        "type": ZodString {
			          "_def": {
			            "checks": [],
			            "coerce": false,
			            "typeName": "ZodString",
			          },
			          "and": [Function],
			          "array": [Function],
			          "brand": [Function],
			          "catch": [Function],
			          "default": [Function],
			          "describe": [Function],
			          "isNullable": [Function],
			          "isOptional": [Function],
			          "nullable": [Function],
			          "nullish": [Function],
			          "optional": [Function],
			          "or": [Function],
			          "parse": [Function],
			          "parseAsync": [Function],
			          "pipe": [Function],
			          "promise": [Function],
			          "readonly": [Function],
			          "refine": [Function],
			          "refinement": [Function],
			          "safeParse": [Function],
			          "safeParseAsync": [Function],
			          "spa": [Function],
			          "superRefine": [Function],
			          "transform": [Function],
			          "~standard": {
			            "validate": [Function],
			            "vendor": "zod",
			            "version": 1,
			          },
			        },
			      },
			    },
			    "type": "object[]",
			  },
			}
		`);
	});

	it("should merge deeply nested schemas", () => {
		const a = {
			foo: {
				type: "object",
				shape: {
					bar: {
						type: "object",
						shape: {
							baz: {
								key: "some-key",
								type: z.string(),
							},
							qux: {
								type: z.string(),
							},
						},
					},
				},
			},
		} as const satisfies Schema;
		const b = {
			foo: {
				type: "object",
				shape: {
					bar: {
						type: "object",
						shape: {
							baz: {
								key: "new-key",
								type: z.date(),
							},
							quux: {
								type: z.number(),
							},
						},
					},
				},
			},
		} as const satisfies Schema;

		const result = mergeSchema(a, b);

		expect(result).toMatchInlineSnapshot(`
			{
			  "foo": {
			    "shape": {
			      "bar": {
			        "shape": {
			          "baz": {
			            "key": "new-key",
			            "type": ZodDate {
			              "_def": {
			                "checks": [],
			                "coerce": false,
			                "typeName": "ZodDate",
			              },
			              "and": [Function],
			              "array": [Function],
			              "brand": [Function],
			              "catch": [Function],
			              "default": [Function],
			              "describe": [Function],
			              "isNullable": [Function],
			              "isOptional": [Function],
			              "nullable": [Function],
			              "nullish": [Function],
			              "optional": [Function],
			              "or": [Function],
			              "parse": [Function],
			              "parseAsync": [Function],
			              "pipe": [Function],
			              "promise": [Function],
			              "readonly": [Function],
			              "refine": [Function],
			              "refinement": [Function],
			              "safeParse": [Function],
			              "safeParseAsync": [Function],
			              "spa": [Function],
			              "superRefine": [Function],
			              "transform": [Function],
			              "~standard": {
			                "validate": [Function],
			                "vendor": "zod",
			                "version": 1,
			              },
			            },
			          },
			          "quux": {
			            "type": ZodNumber {
			              "_def": {
			                "checks": [],
			                "coerce": false,
			                "typeName": "ZodNumber",
			              },
			              "and": [Function],
			              "array": [Function],
			              "brand": [Function],
			              "catch": [Function],
			              "default": [Function],
			              "describe": [Function],
			              "isNullable": [Function],
			              "isOptional": [Function],
			              "max": [Function],
			              "min": [Function],
			              "nullable": [Function],
			              "nullish": [Function],
			              "optional": [Function],
			              "or": [Function],
			              "parse": [Function],
			              "parseAsync": [Function],
			              "pipe": [Function],
			              "promise": [Function],
			              "readonly": [Function],
			              "refine": [Function],
			              "refinement": [Function],
			              "safeParse": [Function],
			              "safeParseAsync": [Function],
			              "spa": [Function],
			              "step": [Function],
			              "superRefine": [Function],
			              "transform": [Function],
			              "~standard": {
			                "validate": [Function],
			                "vendor": "zod",
			                "version": 1,
			              },
			            },
			          },
			          "qux": {
			            "type": ZodString {
			              "_def": {
			                "checks": [],
			                "coerce": false,
			                "typeName": "ZodString",
			              },
			              "and": [Function],
			              "array": [Function],
			              "brand": [Function],
			              "catch": [Function],
			              "default": [Function],
			              "describe": [Function],
			              "isNullable": [Function],
			              "isOptional": [Function],
			              "nullable": [Function],
			              "nullish": [Function],
			              "optional": [Function],
			              "or": [Function],
			              "parse": [Function],
			              "parseAsync": [Function],
			              "pipe": [Function],
			              "promise": [Function],
			              "readonly": [Function],
			              "refine": [Function],
			              "refinement": [Function],
			              "safeParse": [Function],
			              "safeParseAsync": [Function],
			              "spa": [Function],
			              "superRefine": [Function],
			              "transform": [Function],
			              "~standard": {
			                "validate": [Function],
			                "vendor": "zod",
			                "version": 1,
			              },
			            },
			          },
			        },
			        "type": "object",
			      },
			    },
			    "type": "object",
			  },
			}
		`);
	});
});
