import type { ZugferdProfile } from "@node-zugferd/core";
import {
	amount,
	array,
	date,
	object,
	percentage,
	quantity,
	text,
} from "@node-zugferd/data-types";
import { describe, expect, it } from "vitest";
import { toInput } from "./to-input";

const issued = new Date("2024-06-01T00:00:00.000Z");

const schema = object({
	issued: date(),
	total: amount({ requireCurrency: "never" }),
	priced: amount(),
	qty: quantity(),
	bareQty: quantity({ requireUnitCode: "never" }),
	rate: percentage(),
	note: text(),
	lines: array(
		object({
			net: amount({ requireCurrency: "never" }),
		}),
	),
});

describe("toInput", () => {
	it("turns parser leaves back into create() input", () => {
		const parsed = {
			profile: {
				schema,
			} as ZugferdProfile,
			data: {
				issued: { format: "102", date: issued, value: "20240601" },
				total: { value: 10 },
				priced: { value: 10, currency: "EUR" },
				qty: { value: 20, unitCode: "C62" },
				bareQty: { value: 3 },
				rate: 19,
				note: "hello",
				lines: [{ net: { value: 5 } }],
			},
		};

		expect(toInput(parsed)).toEqual({
			issued,
			total: 10,
			priced: { value: 10, currency: "EUR" },
			qty: { value: 20, unitCode: "C62" },
			bareQty: 3,
			rate: 19,
			note: "hello",
			lines: [{ net: 5 }],
		});
		expect(parsed.data.issued).toEqual({
			format: "102",
			date: issued,
			value: "20240601",
		});
	});
});
