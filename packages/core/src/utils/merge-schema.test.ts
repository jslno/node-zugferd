import { describe, expect, it } from "vitest";
import type { Schema } from "../types";
import { t } from "@node-zugferd/shared";
import { mergeSchema } from "./merge-schema";

describe("mergeSchema", () => {
	it("should merge flat schemas with overrides", () => {
		const a = {
			foo: {
				type: t.Text,
			},
			bar: {
				key: "some-key",
				type: t.Amount,
			},
		} as const satisfies Schema;
		const b = {
			bar: {
				key: "new-key",
				type: t.Date,
			},
			baz: {
				type: t.Text,
				required: false,
			},
		} as const satisfies Schema;

		const result = mergeSchema(a, b);

		expect(result).toEqual({
			foo: {
				type: t.Text,
			},
			bar: {
				key: "new-key",
				type: t.Date,
			},
			baz: {
				type: t.Text,
				required: false,
			},
		});
	});

	it("should merge nested object schemas recursively", () => {
		const a = {
			foo: {
				type: "object",
				shape: {
					bar: {
						type: t.Text,
					},
					baz: {
						key: "some-key",
						type: t.Amount,
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
						type: t.Date,
					},
					qux: {
						type: t.Text,
					},
				},
			},
		} as const satisfies Schema;

		const result = mergeSchema(a, b);

		expect(result).toEqual({
			foo: {
				type: "object",
				shape: {
					bar: {
						type: t.Text,
					},
					baz: {
						key: "new-key",
						type: t.Date,
					},
					qux: {
						type: t.Text,
					},
				},
			},
		});
	});

	it("should merge array object schemas", () => {
		const a = {
			foo: {
				type: "object[]",
				shape: {
					bar: {
						type: t.Text,
					},
					baz: {
						type: t.Amount,
					},
				},
			},
		} as const satisfies Schema;
		const b = {
			foo: {
				type: "object[]",
				shape: {
					baz: {
						type: t.Date,
					},
					qux: {
						type: t.Text,
						required: false,
					},
				},
			},
		} as const satisfies Schema;

		const result = mergeSchema(a, b);

		expect(result).toEqual({
			foo: {
				type: "object[]",
				shape: {
					bar: {
						type: t.Text,
					},
					baz: {
						type: t.Date,
					},
					qux: {
						type: t.Text,
						required: false,
					},
				},
			},
		});
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
								type: t.Text,
							},
							qux: {
								type: t.Text,
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
								type: t.Date,
							},
							quux: {
								type: t.Amount,
							},
						},
					},
				},
			},
		} as const satisfies Schema;

		const result = mergeSchema(a, b);

		expect(result).toEqual({
			foo: {
				type: "object",
				shape: {
					bar: {
						type: "object",
						shape: {
							baz: {
								key: "new-key",
								type: t.Date,
							},
							qux: {
								type: t.Text,
							},
							quux: {
								type: t.Amount,
							},
						},
					},
				},
			},
		});
	});
});
