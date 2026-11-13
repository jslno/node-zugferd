import type { ZugferdProfile } from "@node-zugferd/core";
import { date, object, text } from "@node-zugferd/data-types";
import { expectTypeOf, test } from "vitest";
import type { ParserOutput } from "./output";
import { toInput } from "./to-input";

const schema = object({
	issued: date(),
	note: text(),
});

type TestInput = {
	issued: Date;
	note: string;
};

type TestOutput = {
	issued: { format: string; date: Date; value: string };
	note: string;
};

const profile = {
	schema,
	$Infer: {} as { Input: TestInput; Output: TestOutput },
} as unknown as ZugferdProfile & {
	$Infer: { Input: TestInput; Output: TestOutput };
};

test("returns the profile input type", () => {
	const result = toInput({
		profile,
		data: {} as ParserOutput<typeof schema>,
	});

	expectTypeOf(result).toEqualTypeOf<TestInput>();
});
