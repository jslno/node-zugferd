import type { StandardSchemaV1 } from "@standard-schema/spec";
import { describe, expectTypeOf, it } from "vitest";
import type { MergeSchema } from "./merge-schema";

describe("MergeSchema", () => {
	it("should merge flat schemas with overrides", () => {
		type A = {
			foo: {
				type: StandardSchemaV1<string>;
			};
			bar: {
				key: "some-key";
				type: StandardSchemaV1<number>;
			};
		};
		type B = {
			bar: {
				key: "new-key";
				type: StandardSchemaV1<boolean>;
			};
			baz: {
				type: StandardSchemaV1<string | undefined>;
			};
		};

		type Result = MergeSchema<A, B>;

		type Expected = {
			foo: {
				type: StandardSchemaV1<string>;
			};
			bar: {
				key: "new-key";
				type: StandardSchemaV1<boolean>;
			};
			baz: {
				type: StandardSchemaV1<string | undefined>;
			};
		};

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});

	it("should merge nested object schemas recursively", () => {
		type A = {
			foo: {
				type: "object";
				shape: {
					bar: {
						type: StandardSchemaV1<string>;
					};
					baz: {
						key: "some-key";
						type: StandardSchemaV1<number>;
					};
				};
			};
		};
		type B = {
			foo: {
				type: "object";
				shape: {
					baz: {
						key: "new-key";
						type: StandardSchemaV1<string>;
					};
					qux: {
						type: StandardSchemaV1<boolean>;
					};
				};
			};
		};

		type Result = MergeSchema<A, B>;

		type Expected = {
			foo: {
				type: "object";
				shape: {
					bar: {
						type: StandardSchemaV1<string>;
					};
					baz: {
						key: "new-key";
						type: StandardSchemaV1<string>;
					};
					qux: {
						type: StandardSchemaV1<boolean>;
					};
				};
			};
		};

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});

	it("should merge array object schemas", () => {
		type A = {
			foo: {
				type: "object[]";
				shape: {
					bar: {
						type: StandardSchemaV1<string>;
					};
					baz: {
						type: StandardSchemaV1<number>;
					};
				};
			};
		};
		type B = {
			foo: {
				type: "object[]";
				shape: {
					baz: {
						type: StandardSchemaV1<boolean>;
					};
					qux: {
						type: StandardSchemaV1<string | undefined>;
					};
				};
			};
		};

		type Result = MergeSchema<A, B>;

		type Expected = {
			foo: {
				type: "object[]";
				shape: {
					bar: {
						type: StandardSchemaV1<string>;
					};
					baz: {
						type: StandardSchemaV1<boolean>;
					};
					qux: {
						type: StandardSchemaV1<string | undefined>;
					};
				};
			};
		};

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});

	it("should merge deeply nested schemas", () => {
		type A = {
			foo: {
				type: "object";
				shape: {
					bar: {
						type: "object";
						shape: {
							baz: {
								key: "some-key";
								type: StandardSchemaV1<string>;
							};
							qux: {
								type: StandardSchemaV1<string>;
							};
						};
					};
				};
			};
		};
		type B = {
			foo: {
				type: "object";
				shape: {
					bar: {
						type: "object";
						shape: {
							baz: {
								key: "new-key";
								type: StandardSchemaV1<boolean>;
							};
							quux: {
								type: StandardSchemaV1<number>;
							};
						};
					};
				};
			};
		};

		type Result = MergeSchema<A, B>;

		type Expected = {
			foo: {
				type: "object";
				shape: {
					bar: {
						type: "object";
						shape: {
							baz: {
								key: "new-key";
								type: StandardSchemaV1<boolean>;
							};
							qux: {
								type: StandardSchemaV1<string>;
							};
							quux: {
								type: StandardSchemaV1<number>;
							};
						};
					};
				};
			};
		};

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});

	it("should handle type change from `object` to `object[]` correctly", () => {
		type A = {
			foo: {
				type: "object";
				shape: {
					bar: {
						type: StandardSchemaV1<string>;
					};
					baz: {
						type: StandardSchemaV1<number>;
					};
				};
			};
		};
		type B = {
			foo: {
				type: "object[]";
				shape: {
					baz: {
						type: StandardSchemaV1<boolean>;
					};
					qux: {
						type: StandardSchemaV1<string | undefined>;
					};
				};
			};
		};

		type Result = MergeSchema<A, B>;

		type Expected = {
			foo: {
				type: "object[]";
				shape: {
					bar: {
						type: StandardSchemaV1<string>;
					};
					baz: {
						type: StandardSchemaV1<boolean>;
					};
					qux: {
						type: StandardSchemaV1<string | undefined>;
					};
				};
			};
		};

		expectTypeOf<Result>().toEqualTypeOf<Expected>();
	});
});
