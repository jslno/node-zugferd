import { describe, expect, it } from "vitest";
import { array, object, text } from "../schemas";
import {
	adaptInputForOption,
	assembleObjectOptionOutput,
	buildCardinalityPlan,
	expandObjectOptionInput,
	getAtPath,
	rehydrateNestedObjectArrays,
	rehydrateNestedObjectArraysAsync,
	setAtPath,
} from "./cardinality";

describe("cardinality", () => {
	const sellerRules = () =>
		buildCardinalityPlan([
			object({ seller: object({ name: text() }) }),
			object({ seller: array(object({ name: text() })) }),
		]);

	it("reads and writes nested paths, including array wildcards", () => {
		const input = { lines: [{ name: "A" }, { name: "B" }] };

		expect(getAtPath(input, ["lines", "*", "name"])).toEqual(["A", "B"]);
		expect(getAtPath(input, ["missing", "name"])).toBeUndefined();
		expect(getAtPath(input, [])).toBe(input);

		setAtPath(input, ["lines", "0", "name"], "C");
		expect(input.lines[0]?.name).toBe("C");
		setAtPath(input, ["meta", "id"], "1");
		expect(input).not.toHaveProperty("meta");
	});

	it("plans where an object field becomes an array", () => {
		expect(sellerRules()).toEqual([
			{
				path: ["seller"],
				mode: "object-to-array",
				objectOptionIndex: 0,
				arrayOptionIndex: 1,
			},
		]);
	});

	it("unwraps a repeated field for the object option and expands one input per item", () => {
		const rules = sellerRules();
		const single = { seller: { name: "Ada" } };
		const repeated = {
			seller: [{ name: "Ada" }, { name: "Bea" }],
		};

		expect(adaptInputForOption(single, 0, rules)).toEqual(single);
		expect(adaptInputForOption(repeated, 0, rules)).toEqual({
			seller: { name: "Ada" },
		});
		expect(adaptInputForOption(repeated, 1, rules)).toEqual(repeated);
		expect(single).toEqual({ seller: { name: "Ada" } });
		expect(expandObjectOptionInput(repeated, 0, rules)).toEqual([
			{ seller: { name: "Ada" } },
			{ seller: { name: "Bea" } },
		]);
		expect(
			assembleObjectOptionOutput(
				repeated,
				[{ seller: { name: "Ada" } }, { seller: { name: "Bea" } }],
				0,
				rules,
			),
		).toEqual(repeated);
	});

	it("unwraps a nested array and rehydrates every element", () => {
		const rules = buildCardinalityPlan([
			object({
				lines: array(object({ discount: object({ amount: text() }) })),
			}),
			object({
				lines: array(object({ discount: array(object({ amount: text() })) })),
			}),
		]);
		const input = {
			lines: [{ discount: [{ amount: "1" }, { amount: "2" }] }],
		};

		expect(rules).toEqual([
			{
				path: ["lines", "*", "discount"],
				mode: "object-to-array",
				objectOptionIndex: 0,
				arrayOptionIndex: 1,
			},
		]);
		expect(adaptInputForOption(input, 0, rules)).toEqual({
			lines: [{ discount: { amount: "1" } }],
		});
		expect(expandObjectOptionInput(input, 0, rules)).toEqual([
			adaptInputForOption(input, 0, rules),
		]);

		const output = { lines: [{ discount: { amount: "1" } }] };
		expect(
			rehydrateNestedObjectArrays(
				input,
				output,
				0,
				rules,
				(adapted) => adapted,
			),
		).toEqual(input);
	});

	it("returns output unchanged when there are no nested rules", async () => {
		const output = { seller: [{ name: "Ada" }] };

		expect(
			rehydrateNestedObjectArrays(output, output, 0, [], () => {
				throw new Error("nested schema should not run");
			}),
		).toBe(output);
		await expect(
			rehydrateNestedObjectArraysAsync(output, output, 0, [], async () => {
				throw new Error("nested schema should not run");
			}),
		).resolves.toBe(output);
	});
});
