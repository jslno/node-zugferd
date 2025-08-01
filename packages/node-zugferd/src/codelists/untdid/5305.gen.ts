/**
 * Generated by `scripts/untdid/update.js` on Mon, 28 Jul 2025 12:38:41 GMT
 *
 * @see https://www.xrepository.de/details/urn:xoev-de:kosit:codeliste:untdid.5305
 */

import { createEnum } from "..";

export type Untdid5305Definition = {
	key: string;
	code: string;
	name?: string;
	description?: string;
};

export type Untdid5305Code = (typeof UNTDID_5305)[number]["code"];

export const UNTDID_5305_IDENTIFIER =
	"urn:xoev-de:kosit:codeliste:untdid.5305" as const;
export const UNTDID_5305_VERSION = "3" as const;

export const UNTDID_5305 = [
	{
		key: "MIXED_TAX_RATE",
		code: "A",
		name: "Mixed tax rate",
		description: "Code specifying that the rate is based on mixed tax.",
	},
	{
		key: "LOWER_RATE",
		code: "AA",
		name: "Lower rate",
		description: "Tax rate is lower than standard rate.",
	},
	{
		key: "EXEMPT_FOR_RESALE",
		code: "AB",
		name: "Exempt for resale",
		description:
			"A tax category code indicating the item is tax exempt when the item is bought for future resale.",
	},
	{
		key: "VALUE_ADDED_TAX_VAT_NOT_NOW_DUE_FOR_PAYMENT",
		code: "AC",
		name: "Value Added Tax (VAT) not now due for payment",
		description:
			"A code to indicate that the Value Added Tax (VAT) amount which is due on the current invoice is to be paid on receipt of a separate VAT payment request.",
	},
	{
		key: "VALUE_ADDED_TAX_VAT_DUE_FROM_A_PREVIOUS_INVOICE",
		code: "AD",
		name: "Value Added Tax (VAT) due from a previous invoice",
		description:
			"A code to indicate that the Value Added Tax (VAT) amount of a previous invoice is to be paid.",
	},
	{
		key: "VAT_REVERSE_CHARGE",
		code: "AE",
		name: "VAT Reverse Charge",
		description:
			"Code specifying that the standard VAT rate is levied from the invoicee.",
	},
	{
		key: "TRANSFERRED_VAT",
		code: "B",
		name: "Transferred (VAT)",
		description:
			"VAT not to be paid to the issuer of the invoice but directly to relevant tax authority.",
	},
	{
		key: "DUTY_PAID_BY_SUPPLIER",
		code: "C",
		name: "Duty paid by supplier",
		description:
			"Duty associated with shipment of goods is paid by the supplier; customer receives goods with duty paid.",
	},
	{
		key: "VALUE_ADDED_TAX_VAT_MARGIN_SCHEME_TRAVEL_AGENTS",
		code: "D",
		name: "Value Added Tax (VAT) margin scheme - travel agents",
		description:
			"Indication that the VAT margin scheme for travel agents is applied.",
	},
	{
		key: "EXEMPT_FROM_TAX",
		code: "E",
		name: "Exempt from tax",
		description: "Code specifying that taxes are not applicable.",
	},
	{
		key: "VALUE_ADDED_TAX_VAT_MARGIN_SCHEME_SECOND_HAND_GOODS",
		code: "F",
		name: "Value Added Tax (VAT) margin scheme - second-hand goods",
		description:
			"Indication that the VAT margin scheme for second-hand goods is applied.",
	},
	{
		key: "FREE_EXPORT_ITEM_TAX_NOT_CHARGED",
		code: "G",
		name: "Free export item, tax not charged",
		description:
			"Code specifying that the item is free export and taxes are not charged.",
	},
	{
		key: "HIGHER_RATE",
		code: "H",
		name: "Higher rate",
		description: "Code specifying a higher rate of duty or tax or fee.",
	},
	{
		key: "VALUE_ADDED_TAX_VAT_MARGIN_SCHEME_WORKS_OF_ART_MARGIN_SCHEME__WORKS_OF_ART",
		code: "I",
		name: "Value Added Tax (VAT) margin scheme - works of art Margin scheme — Works of art",
		description:
			"Indication that the VAT margin scheme for works of art is applied.",
	},
	{
		key: "VALUE_ADDED_TAX_VAT_MARGIN_SCHEME_COLLECTORS_ITEMS_AND_ANTIQUES",
		code: "J",
		name: "Value Added Tax (VAT) margin scheme - collector’s items and antiques",
		description:
			"Indication that the VAT margin scheme for collector’s items and antiques is applied.",
	},
	{
		key: "VAT_EXEMPT_FOR_EEA_INTRA_COMMUNITY_SUPPLY_OF_GOODS_AND_SERVICES",
		code: "K",
		name: "VAT exempt for EEA intra-community supply of goods and services",
		description:
			"A tax category code indicating the item is VAT exempt due to an intra-community supply in the European Economic Area.",
	},
	{
		key: "CANARY_ISLANDS_GENERAL_INDIRECT_TAX",
		code: "L",
		name: "Canary Islands general indirect tax",
		description:
			"Impuesto General Indirecto Canario (IGIC) is an indirect tax levied on goods and services supplied in the Canary Islands (Spain) by traders and professionals, as well as on import of goods.",
	},
	{
		key: "TAX_FOR_PRODUCTION_SERVICES_AND_IMPORTATION_IN_CEUTA_AND_MELILLA",
		code: "M",
		name: "Tax for production, services and importation in Ceuta and Melilla",
		description:
			"Impuesto sobre la Producción, los Servicios y la Importación (IPSI) is an indirect municipal tax, levied on the production, processing and import of all kinds of movable tangible property, the supply of services and the transfer of immovable property located in the cities of Ceuta and Melilla.",
	},
	{
		key: "SERVICES_OUTSIDE_SCOPE_OF_TAX",
		code: "O",
		name: "Services outside scope of tax",
		description:
			"Code specifying that taxes are not applicable to the services.",
	},
	{
		key: "STANDARD_RATE",
		code: "S",
		name: "Standard rate",
		description: "Code specifying the standard rate.",
	},
	{
		key: "ZERO_RATED_GOODS",
		code: "Z",
		name: "Zero rated goods",
		description: "Code specifying that the goods are at a zero rate.",
	},
] as const satisfies Untdid5305Definition[];

export const Untdid5305 = createEnum(UNTDID_5305, {
	keyProp: "key",
	valueProp: "code",
});
