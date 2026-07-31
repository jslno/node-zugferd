import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid4055 = [
	{
		value: "1",
		name: "Price condition",
		description:
			"Specifies a condition related to the price which a seller must fulfil before the buyer will complete a purchase.",
		key: "PRICE_CONDITION",
	},
	{
		value: "2",
		name: "Despatch condition",
		description:
			"Condition requested by the customer under which the supplier shall deliver: Extent of freight costs, means of transport.",
		key: "DESPATCH_CONDITION",
	},
	{
		value: "3",
		name: "Price and despatch condition",
		description:
			"Condition related to price and despatch that the seller must complete before the customer will agree payment.",
		key: "PRICE_AND_DESPATCH_CONDITION",
	},
	{
		value: "4",
		name: "Collected by customer",
		description:
			"Indicates that the customer will pick up the goods at the supplier. He will take care of the means of transport.",
		key: "COLLECTED_BY_CUSTOMER",
	},
	{
		value: "5",
		name: "Transport condition",
		description:
			"Specifies the conditions under which the transport takes place under the responsibility of the carrier.",
		key: "TRANSPORT_CONDITION",
	},
	{
		value: "6",
		name: "Delivery condition",
		description:
			"Specifies the conditions under which the goods must be delivered to the consignee.",
		key: "DELIVERY_CONDITION",
	},
	{
		value: "7",
		name: "Delivered by supplier",
		description:
			"Indicates that the supplier will arrange the delivery of goods. He will take care of the means of transport.",
		key: "DELIVERED_BY_SUPPLIER",
	},
	{
		value: "8",
		name: "Delivery arranged by logistic service provider",
		description:
			"Code indicating that the logistic service provider will arrange the delivery of goods.",
		key: "DELIVERY_ARRANGED_BY_LOGISTIC_SERVICE_PROVIDER",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		untdid4055: typeof untdid4055;
	}
}
registerCodelist("untdid4055", untdid4055);

export default untdid4055;
