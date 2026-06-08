import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid5305 = [
	{
		value: "S",
		name: "Standard rate",
		semanticModel: "Standard rate",
		key: "STANDARD_RATE",
	},
	{
		value: "Z",
		name: "Zero rated goods",
		semanticModel: "Zero rated goods",
		key: "ZERO_RATED_GOODS",
	},
	{
		value: "E",
		name: "Exempt from tax",
		semanticModel: "Exempt from tax",
		key: "EXEMPT_FROM_TAX",
	},
	{
		value: "AE",
		name: "VAT Reverse charge",
		semanticModel: "VAT reverse charge",
		key: "VAT_REVERSE_CHARGE",
	},
	{
		value: "K",
		name: "VAT exempt for EEA intra-community supply of goods and services",
		semanticModel: "VAT exempt for intra community supply of goods",
		key: "VAT_EXEMPT_FOR_EEA_INTRA_COMMUNITY_SUPPLY_OF_GOODS_AND_SERVICES",
	},
	{
		value: "G",
		name: "Free export item, tax not charged",
		semanticModel: "Free export item, tax not charged",
		key: "FREE_EXPORT_ITEM_TAX_NOT_CHARGED",
	},
	{
		value: "O",
		name: "Service outside scope of tax",
		semanticModel: "Services outside scope of tax",
		key: "SERVICE_OUTSIDE_SCOPE_OF_TAX",
	},
	{
		value: "L",
		name: "Canary Islands general indirect tax",
		semanticModel: "Canary Islands General Indirect Tax",
		key: "CANARY_ISLANDS_GENERAL_INDIRECT_TAX",
	},
	{
		value: "M",
		name: "Tax for production, services and importation in Ceuta and Melilla",
		semanticModel: "Liable for IPSI",
		key: "TAX_FOR_PRODUCTION_SERVICES_AND_IMPORTATION_IN_CEUTA_AND_MELILLA",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		untdid5305: typeof untdid5305;
	}
}
registerCodelist("untdid5305", untdid5305);

export default untdid5305;
