/**
 * Generated by `scripts/untdid/update.js` on Tue, 18 Mar 2025 19:54:02 GMT
 * 
 * @see https://www.xrepository.de/details/urn:xoev-de:kosit:codeliste:untdid.5305
 */

export type Untdid5305Definition = {
	code: string;
	name?: string;
	description?: string;
};

export type Untdid5305Code = (typeof UNTDID_5305)[number]["code"];

export const UNTDID_5305_IDENTIFIER = "urn:xoev-de:kosit:codeliste:untdid.5305" as const;
export const UNTDID_5305_VERSION = "3" as const;

export const UNTDID_5305 = [
	{
		code: "A",
		name: "Mixed tax rate",
		description: "Code specifying that the rate is based on mixed tax.",
	},
	{
		code: "AA",
		name: "Lower rate",
		description: "Tax rate is lower than standard rate.",
	},
	{
		code: "AB",
		name: "Exempt for resale",
		description:
			"A tax category code indicating the item is tax exempt when the item is bought for future resale.",
	},
	{
		code: "AC",
		name: "Value Added Tax (VAT) not now due for payment",
		description:
			"A code to indicate that the Value Added Tax (VAT) amount which is due on the current invoice is to be paid on receipt of a separate VAT payment request.",
	},
	{
		code: "AD",
		name: "Value Added Tax (VAT) due from a previous invoice",
		description:
			"A code to indicate that the Value Added Tax (VAT) amount of a previous invoice is to be paid.",
	},
	{
		code: "AE",
		name: "VAT Reverse Charge",
		description:
			"Code specifying that the standard VAT rate is levied from the invoicee.",
	},
	{
		code: "B",
		name: "Transferred (VAT)",
		description:
			"VAT not to be paid to the issuer of the invoice but directly to relevant tax authority.",
	},
	{
		code: "C",
		name: "Duty paid by supplier",
		description:
			"Duty associated with shipment of goods is paid by the supplier; customer receives goods with duty paid.",
	},
	{
		code: "D",
		name: "Value Added Tax (VAT) margin scheme - travel agents",
		description:
			"Indication that the VAT margin scheme for travel agents is applied.",
	},
	{
		code: "E",
		name: "Exempt from tax",
		description: "Code specifying that taxes are not applicable.",
	},
	{
		code: "F",
		name: "Value Added Tax (VAT) margin scheme - second-hand goods",
		description:
			"Indication that the VAT margin scheme for second-hand goods is applied.",
	},
	{
		code: "G",
		name: "Free export item, tax not charged",
		description:
			"Code specifying that the item is free export and taxes are not charged.",
	},
	{
		code: "H",
		name: "Higher rate",
		description: "Code specifying a higher rate of duty or tax or fee.",
	},
	{
		code: "I",
		name:
			"Value Added Tax (VAT) margin scheme - works of art Margin scheme — Works of art",
		description:
			"Indication that the VAT margin scheme for works of art is applied.",
	},
	{
		code: "J",
		name: "Value Added Tax (VAT) margin scheme - collector’s items and antiques",
		description:
			"Indication that the VAT margin scheme for collector’s items and antiques is applied.",
	},
	{
		code: "K",
		name: "VAT exempt for EEA intra-community supply of goods and services",
		description:
			"A tax category code indicating the item is VAT exempt due to an intra-community supply in the European Economic Area.",
	},
	{
		code: "L",
		name: "Canary Islands general indirect tax",
		description:
			"Impuesto General Indirecto Canario (IGIC) is an indirect tax levied on goods and services supplied in the Canary Islands (Spain) by traders and professionals, as well as on import of goods.",
	},
	{
		code: "M",
		name: "Tax for production, services and importation in Ceuta and Melilla",
		description:
			"Impuesto sobre la Producción, los Servicios y la Importación (IPSI) is an indirect municipal tax, levied on the production, processing and import of all kinds of movable tangible property, the supply of services and the transfer of immovable property located in the cities of Ceuta and Melilla.",
	},
	{
		code: "O",
		name: "Services outside scope of tax",
		description: "Code specifying that taxes are not applicable to the services.",
	},
	{
		code: "S",
		name: "Standard rate",
		description: "Code specifying the standard rate.",
	},
	{
		code: "Z",
		name: "Zero rated goods",
		description: "Code specifying that the goods are at a zero rate.",
	},
] as const satisfies Untdid5305Definition[];
