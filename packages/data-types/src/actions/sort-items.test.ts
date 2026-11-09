import { describe, expect, it } from "vitest";
import { parse, pipe } from "../methods";
import { array, text } from "../schemas";
import { sortItems } from "./sort-items";

describe("sortItems", () => {
	it("sorts with the default string comparison", () => {
		const schema = pipe(array(text()), sortItems());

		expect(sortItems()).toMatchObject({
			kind: "transformation",
			type: "sort_items",
			operation: undefined,
		});
		expect(parse(schema, ["b", "a", "c"])).toEqual(["a", "b", "c"]);
	});

	it("sorts with a custom operation", () => {
		const schema = pipe(
			array(text()),
			sortItems((a, b) => b.localeCompare(a)),
		);

		expect(parse(schema, ["b", "a", "c"])).toEqual(["c", "b", "a"]);
	});
});
