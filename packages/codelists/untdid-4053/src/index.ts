import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid4053 = [
	{
		value: "1",
		name: "Delivery arranged by the supplier",
		description:
			"Indicates that the supplier will arrange delivery of the goods.",
		key: "DELIVERY_ARRANGED_BY_THE_SUPPLIER",
	},
	{
		value: "2",
		name: "Delivery arranged by logistic service provider",
		description:
			"Code indicating that the logistic service provider has arranged the delivery of goods.",
		key: "DELIVERY_ARRANGED_BY_LOGISTIC_SERVICE_PROVIDER",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		untdid4053: typeof untdid4053;
	}
}
registerCodelist("untdid4053", untdid4053);

export default untdid4053;
