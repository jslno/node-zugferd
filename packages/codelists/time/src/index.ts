import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const time = [
	{ value: "5", name: "Date of invoice", key: "DATE_OF_INVOICE" },
	{
		value: "29",
		name: "Date of delivery of goods to establishments/domicile/site",
		key: "DATE_OF_DELIVERY_OF_GOODS_TO_ESTABLISHMENTS_DOMICILE_SITE",
	},
	{ value: "72", name: "Payment date", key: "PAYMENT_DATE" },
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		time: typeof time;
	}
}
registerCodelist("time", time);

export default time;
