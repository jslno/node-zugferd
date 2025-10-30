import type { StandardSchemaV1 } from "@standard-schema/spec";
import { describe, expectTypeOf, it } from "vitest";
import type { InferSchema } from "./schema";

describe("InferSchema", () => {
	it("infers simple flat schema", () => {
		type Schema = {
			foo: {
				type: StandardSchemaV1<string>;
			};
			bar: {
				type: StandardSchemaV1<number | undefined>;
			};
			baz: {
				type: StandardSchemaV1<boolean>;
				required: false;
			};
		};

		type Result = InferSchema<Schema>;

		type Expected = {
			foo: string;
			bar?: number | undefined;
			baz?: boolean | undefined;
		};

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});

	it("infers nested object schema", () => {
		type Schema = {
			foo: {
				type: "object";
				shape: {
					bar: {
						type: StandardSchemaV1<string>;
					};
					baz: {
						type: StandardSchemaV1<number | undefined>;
					};
					qux: {
						type: StandardSchemaV1<boolean>;
						required: false;
					};
				};
			};
		};

		type Result = InferSchema<Schema>;

		type Expected = {
			foo: {
				bar: string;
				baz?: number | undefined;
				qux?: boolean | undefined;
			};
		};

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});

	it("infers array object schema", () => {
		type Schema = {
			items: {
				type: "object[]";
				shape: {
					foo: {
						type: StandardSchemaV1<string>;
					};
					bar: {
						type: StandardSchemaV1<number | undefined>;
					};
				};
			};
		};

		type Result = InferSchema<Schema>;

		type Expected = {
			items: {
				foo: string;
				bar?: number | undefined;
			}[];
		};

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});

	it("handles optional and required fields correctly", () => {
		type Schema = {
			foo: {
				type: "object";
				shape: {
					bar: {
						type: StandardSchemaV1<string>;
					};
					baz: {
						type: StandardSchemaV1<number | undefined>;
					};
				};
			};
			qux: {
				type: "object";
				shape: {
					quux: {
						type: StandardSchemaV1<string | undefined>;
					};
					corge: {
						type: StandardSchemaV1<number>;
						required: false;
					};
				};
			};
			grault: {
				type: "object[]";
				shape: {
					garply: {
						type: StandardSchemaV1<string>;
					};
					waldo: {
						type: StandardSchemaV1<number | undefined>;
					};
				};
			};
		};

		type Result = InferSchema<Schema>;

		type Expected = {
			foo: {
				bar: string;
				baz?: number | undefined;
			};
			qux?:
				| {
						quux?: string | undefined;
						corge?: number | undefined;
				  }
				| undefined;
			grault: {
				garply: string;
				waldo?: number | undefined;
			}[];
		};

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});
});
