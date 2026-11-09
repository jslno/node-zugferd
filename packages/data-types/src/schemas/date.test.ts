import { describe, expect, it } from "vitest";
import { parse, safeParse } from "../methods";
import { date, detectDateFormat, formatDate } from "./date";

describe("date", () => {
	it("parses a format 102 calendar date as UTC midnight", () => {
		const output = parse(date(), "20200305");

		expect(output.date.toISOString()).toBe("2020-03-05T00:00:00.000Z");
		expect(output.format).toBe("102");
		expect(output.value).toBe(formatDate(output.date, "102"));
		expect(detectDateFormat("20200305")).toBe("102");
	});

	it("parses a Date and a timestamp", () => {
		const input = new Date(Date.UTC(2020, 2, 5));

		expect(parse(date(), input).date).toEqual(input);
		expect(parse(date(), input.getTime()).date).toEqual(input);
	});

	it("parses and formats a format 203 timestamp", () => {
		const output = parse(
			date({ inputFormats: ["102", "203"], outputFormat: "203" }),
			"202003051430",
		);

		expect(output.format).toBe("203");
		expect(output.value).toBe("202003051430");
		expect(output.date.getFullYear()).toBe(2020);
		expect(output.date.getHours()).toBe(14);
		expect(detectDateFormat("202003051430")).toBe("203");
	});

	it("rejects an unparseable value and a disallowed format", () => {
		expect(safeParse(date(), "not-a-date").issues?.[0]).toMatchObject({
			received: '"Invalid Date"',
		});
		expect(safeParse(date(), true).issues?.[0]?.expected).toBe(
			"(Date | number | string)",
		);
		expect(safeParse(date(), "202003051430").success).toBe(false);
		expect(detectDateFormat("nope")).toBeNull();
	});
});
