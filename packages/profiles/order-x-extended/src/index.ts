import { orderX } from "@node-zugferd/order-x";
import { defineProfile } from "@node-zugferd/utils";
import { schema } from "./schema";

export const orderXExtended = defineProfile({
	id: "order-x-extended",
	dataRelationship: ["Data", "Source", "Alternative"],
	extensionSchema: {
		type: ["ORDER", "ORDER_RESPONSE", "ORDER_CHANGE"],
		version: "1.0",
		conformanceLevel: "EXTENDED",
		fileName: "order-x.xml",
	},
	use: [orderX],
	schema,
	build(data, ctx) {},
	rules(data, ctx) {},
});
