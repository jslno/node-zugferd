import { en16931 } from "@node-zugferd/en-16931";
import { defineProfile } from "@node-zugferd/utils";
import { schema } from "./schema";

export const xrechnung = defineProfile({
	id: "xrechnung",
	dataRelationship: "Alternative",
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "XRECHNUNG",
		fileName: "xrechnung.xml",
		version: "1.0",
	},
	use: [en16931],
	schema,
	build(data, ctx) {},
	rules(data, ctx) {},
});
