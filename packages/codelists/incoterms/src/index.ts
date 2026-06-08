import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const incoterms = [
	{
		value: "1",
		name: "Delivery arranged by supplier",
		key: "DELIVERY_ARRANGED_BY_SUPPLIER",
	},
	{
		value: "2",
		name: "Delivery arranged by logistic service provider",
		key: "DELIVERY_ARRANGED_BY_LOGISTIC_SERVICE_PROVIDER",
	},
	{ value: "CFR", name: "Cost and Freight", key: "COST_AND_FREIGHT" },
	{
		value: "CIF",
		name: "Cost, Insurance and Freight",
		key: "COST_INSURANCE_AND_FREIGHT",
	},
	{
		value: "CIP",
		name: "Carriage and Insurance Paid to (insert named place of destination)",
		key: "CARRIAGE_AND_INSURANCE_PAID_TO_INSERT_NAMED_PLACE_OF_DESTINATION",
	},
	{
		value: "CPT",
		name: "Carriage Paid To (insert named place of destination)",
		key: "CARRIAGE_PAID_TO_INSERT_NAMED_PLACE_OF_DESTINATION",
	},
	{
		value: "DAP",
		name: "Delivered At Place (insert named place of destination)",
		key: "DELIVERED_AT_PLACE_INSERT_NAMED_PLACE_OF_DESTINATION",
	},
	{
		value: "DDP",
		name: "Delivered Duty Paid (insert named place of destination)",
		key: "DELIVERED_DUTY_PAID_INSERT_NAMED_PLACE_OF_DESTINATION",
	},
	{
		value: "DPU",
		name: "Delivered At Place Unloaded (insert named place of unloading)",
		key: "DELIVERED_AT_PLACE_UNLOADED_INSERT_NAMED_PLACE_OF_UNLOADING",
	},
	{
		value: "EXW",
		name: "Ex Works (insert named place of delivery)",
		key: "EX_WORKS_INSERT_NAMED_PLACE_OF_DELIVERY",
	},
	{
		value: "FAS",
		name: "Free Alongside Ship (insert named port of shipment)",
		key: "FREE_ALONGSIDE_SHIP_INSERT_NAMED_PORT_OF_SHIPMENT",
	},
	{
		value: "FCA",
		name: "Free Carrier (insert named place of delivery)",
		key: "FREE_CARRIER_INSERT_NAMED_PLACE_OF_DELIVERY",
	},
	{
		value: "FOB",
		name: " Free On Board (insert named port of shipment)",
		key: "FREE_ON_BOARD_INSERT_NAMED_PORT_OF_SHIPMENT",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		incoterms: typeof incoterms;
	}
}
registerCodelist("incoterms", incoterms);

export default incoterms;
