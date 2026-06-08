import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid4053 = [
	{
		name: "Delivery arranged by the supplier",
		value: "1",
		description:
			"Indicates that the supplier will arrange delivery of the goods.",
		key: "DELIVERY_ARRANGED_BY_THE_SUPPLIER",
	},
	{
		name: "Delivery arranged by logistic service provider",
		value: "2",
		description:
			"Code indicating that the logistic service provider has arranged the delivery of goods. Data Element Cross Reference DataElement 4053 is used in the following Batch Composite Elements: C100 Copyright United Nations, all rights reserved     UN Economic Commission for Europe Palais des Nations, CH-1211 Geneva 10, Switzerland  Tel: +41-22 917 1366 Fax: +41-22 917 0037  E-mail: TradeMaster@unece.org UN/EDIFACT Directories",
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
