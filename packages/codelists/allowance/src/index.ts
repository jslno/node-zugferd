import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const allowance = [
	{
		value: "41",
		name: "Bonus for works ahead of schedule",
		key: "BONUS_FOR_WORKS_AHEAD_OF_SCHEDULE",
	},
	{ value: "42", name: "Other bonus", key: "OTHER_BONUS" },
	{
		value: "60",
		name: "Manufacturer’s consumer discount",
		key: "MANUFACTURER_S_CONSUMER_DISCOUNT",
	},
	{
		value: "62",
		name: "Due to military status",
		key: "DUE_TO_MILITARY_STATUS",
	},
	{ value: "63", name: "Due to work accident", key: "DUE_TO_WORK_ACCIDENT" },
	{ value: "64", name: "Special agreement", key: "SPECIAL_AGREEMENT" },
	{
		value: "65",
		name: "Production error discount",
		key: "PRODUCTION_ERROR_DISCOUNT",
	},
	{ value: "66", name: "New outlet discount", key: "NEW_OUTLET_DISCOUNT" },
	{ value: "67", name: "Sample discount", key: "SAMPLE_DISCOUNT" },
	{ value: "68", name: "End-of-range discount", key: "END_OF_RANGE_DISCOUNT" },
	{ value: "70", name: "Incoterm discount", key: "INCOTERM_DISCOUNT" },
	{
		value: "71",
		name: "Point of sales threshold allowance",
		key: "POINT_OF_SALES_THRESHOLD_ALLOWANCE",
	},
	{
		value: "88",
		name: "Material surcharge/deduction",
		key: "MATERIAL_SURCHARGE_DEDUCTION",
	},
	{ value: "95", name: "Discount", key: "DISCOUNT" },
	{ value: "100", name: "Special rebate", key: "SPECIAL_REBATE" },
	{ value: "102", name: "Fixed long term", key: "FIXED_LONG_TERM" },
	{ value: "103", name: "Temporary", key: "TEMPORARY" },
	{ value: "104", name: "Standard", key: "STANDARD" },
	{ value: "105", name: "Yearly turnover", key: "YEARLY_TURNOVER" },
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		allowance: typeof allowance;
	}
}
registerCodelist("allowance", allowance);

export default allowance;
