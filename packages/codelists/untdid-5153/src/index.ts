import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid5153 = [
	{
		value: "AAA",
		name: "Petroleum tax",
		description: "A tax levied on the volume of petroleum being transacted.",
		key: "PETROLEUM_TAX",
	},
	{
		value: "AAB",
		name: "Provisional countervailing duty cash",
		description:
			"Countervailing duty paid in cash prior to a formal finding of subsidization by Customs.",
		key: "PROVISIONAL_COUNTERVAILING_DUTY_CASH",
	},
	{
		value: "AAC",
		name: "Provisional countervailing duty bond",
		description:
			"Countervailing duty paid by posting a bond during an investigation period prior to a formal decision on subsidization by Customs.",
		key: "PROVISIONAL_COUNTERVAILING_DUTY_BOND",
	},
	{
		value: "AAD",
		name: "Tobacco tax",
		description: "A tax levied on tobacco products.",
		key: "TOBACCO_TAX",
	},
	{
		value: "AAE",
		name: "Energy fee",
		description: "General fee or tax for the use of energy.",
		key: "ENERGY_FEE",
	},
	{
		value: "AAF",
		name: "Coffee tax",
		description: "A tax levied specifically on coffee products.",
		key: "COFFEE_TAX",
	},
	{
		value: "AAG",
		name: "Harmonised sales tax, Canadian",
		description:
			"A harmonized sales tax consisting of a goods and service tax, a Canadian provincial sales tax and, as applicable, a Quebec sales tax which is recoverable.",
		key: "HARMONISED_SALES_TAX_CANADIAN",
	},
	{
		value: "AAH",
		name: "Quebec sales tax",
		description:
			"A sales tax charged within the Canadian province of Quebec which is recoverable.",
		key: "QUEBEC_SALES_TAX",
	},
	{
		value: "AAI",
		name: "Canadian provincial sales tax",
		description:
			"A sales tax charged within Canadian provinces which is non-recoverable.",
		key: "CANADIAN_PROVINCIAL_SALES_TAX",
	},
	{
		value: "AAJ",
		name: "Tax on replacement part",
		description:
			"A tax levied on a replacement part, where the original part is returned.",
		key: "TAX_ON_REPLACEMENT_PART",
	},
	{
		value: "AAK",
		name: "Mineral oil tax",
		description:
			"Tax that is levied specifically on products containing mineral oil.",
		key: "MINERAL_OIL_TAX",
	},
	{
		value: "AAL",
		name: "Special tax",
		description: "To indicate a special type of tax.",
		key: "SPECIAL_TAX",
	},
	{
		value: "AAM",
		name: "Insurance tax",
		description: "A tax levied specifically on insurances.",
		key: "INSURANCE_TAX",
	},
	{
		value: "AAO",
		name: "Provincial Cannabis Tax",
		description: "A tax levied on Cannabis products",
		key: "PROVINCIAL_CANNABIS_TAX",
	},
	{
		value: "AAP",
		name: "Outstanding duty interest",
		description: "Fee levied due to outstanding duties to be paid",
		key: "OUTSTANDING_DUTY_INTEREST",
	},
	{
		value: "ADD",
		name: "Anti-dumping duty",
		description:
			"Duty applied to goods ruled to have been dumped in an import market at a price lower than that in the exporter's domestic market.",
		key: "ANTI_DUMPING_DUTY",
	},
	{
		value: "BOL",
		name: "Stamp duty (Imposta di Bollo)",
		description:
			"Tax required in Italy, which may be fixed or graduated in various circumstances (e.g. VAT exempt documents or bank receipts).",
		key: "STAMP_DUTY_IMPOSTA_DI_BOLLO",
	},
	{
		value: "CAP",
		name: "Agricultural levy",
		description:
			"Levy imposed on agricultural products where there is a difference between the selling price between trading countries.",
		key: "AGRICULTURAL_LEVY",
	},
	{
		value: "CAR",
		name: "Car tax",
		description: "A tax that is levied on the value of the automobile.",
		key: "CAR_TAX",
	},
	{
		value: "COC",
		name: "Paper consortium tax (Italy)",
		description: "Italian Paper consortium tax.",
		key: "PAPER_CONSORTIUM_TAX_ITALY",
	},
	{
		value: "CST",
		name: "Commodity specific tax",
		description:
			"Tax related to a specified commodity, e.g. illuminants, salts.",
		key: "COMMODITY_SPECIFIC_TAX",
	},
	{
		value: "CUD",
		name: "Customs duty",
		description:
			"Duties laid down in the Customs tariff, to which goods are liable on entering or leaving the Customs territory (CCC).",
		key: "CUSTOMS_DUTY",
	},
	{
		value: "CVD",
		name: "Countervailing duty",
		description:
			"A duty on imported goods applied for compensate for subsidies granted to those goods in the exporting country.",
		key: "COUNTERVAILING_DUTY",
	},
	{
		value: "ENV",
		name: "Environmental tax",
		description:
			"Tax assessed for funding or assuring environmental protection or clean-up.",
		key: "ENVIRONMENTAL_TAX",
	},
	{
		value: "EXC",
		name: "Excise duty",
		description:
			"Customs or fiscal authorities code to identify a specific or ad valorem levy on a specific commodity, applied either domestically or at time of importation.",
		key: "EXCISE_DUTY",
	},
	{
		value: "EXP",
		name: "Agricultural export rebate",
		description:
			"Monetary rebate given to the seller in certain circumstances when agricultural products are exported.",
		key: "AGRICULTURAL_EXPORT_REBATE",
	},
	{
		value: "FET",
		name: "Federal excise tax",
		description:
			"Tax levied by the federal government on the manufacture of specific items.",
		key: "FEDERAL_EXCISE_TAX",
	},
	{ value: "FRE", name: "Free", description: "No tax levied.", key: "FREE" },
	{
		value: "GCN",
		name: "General construction tax",
		description: "General tax for construction.",
		key: "GENERAL_CONSTRUCTION_TAX",
	},
	{
		value: "GST",
		name: "Goods and services tax",
		description:
			"Tax levied on the final consumption of goods and services throughout the production and distribution chain.",
		key: "GOODS_AND_SERVICES_TAX",
	},
	{
		value: "ILL",
		name: "Illuminants tax",
		description: "Tax of illuminants.",
		key: "ILLUMINANTS_TAX",
	},
	{
		value: "IMP",
		name: "Import tax",
		description: "Tax assessed on imports.",
		key: "IMPORT_TAX",
	},
	{
		value: "IND",
		name: "Individual tax",
		description: "A tax levied based on an individual's ability to pay.",
		key: "INDIVIDUAL_TAX",
	},
	{
		value: "LAC",
		name: "Business license fee",
		description: "Government assessed charge for permit to do business.",
		key: "BUSINESS_LICENSE_FEE",
	},
	{
		value: "LCN",
		name: "Local construction tax",
		description: "Local tax for construction.",
		key: "LOCAL_CONSTRUCTION_TAX",
	},
	{
		value: "LDP",
		name: "Light dues payable",
		description: "Fee levied on a vessel to pay for port navigation lights.",
		key: "LIGHT_DUES_PAYABLE",
	},
	{
		value: "LOC",
		name: "Local sales tax",
		description:
			"Assessment charges on sale of goods or services by city, borough country or other taxing authorities below state or provincial level.",
		key: "LOCAL_SALES_TAX",
	},
	{
		value: "LST",
		name: "Lust tax",
		description: "Tax imposed for clean-up of leaky underground storage tanks.",
		key: "LUST_TAX",
	},
	{
		value: "MCA",
		name: "Monetary compensatory amount",
		description:
			"Levy on Common Agricultural Policy (European Union) goods used to compensate for fluctuating currencies between member states.",
		key: "MONETARY_COMPENSATORY_AMOUNT",
	},
	{
		value: "MCD",
		name: "Miscellaneous cash deposit",
		description:
			"Duty paid and held on deposit, by Customs, during an investigation period prior to a final decision being made on any aspect related to imported goods (except valuation) by Customs.",
		key: "MISCELLANEOUS_CASH_DEPOSIT",
	},
	{
		value: "OTH",
		name: "Other taxes",
		description: "Unspecified, miscellaneous tax charges.",
		key: "OTHER_TAXES",
	},
	{
		value: "PDB",
		name: "Provisional duty bond",
		description:
			"Anti-dumping duty paid by posting a bond during an investigation period prior to a formal decision on dumping by Customs.",
		key: "PROVISIONAL_DUTY_BOND",
	},
	{
		value: "PDC",
		name: "Provisional duty cash",
		description:
			"Anti-dumping duty paid in cash prior to a formal finding of dumping by Customs.",
		key: "PROVISIONAL_DUTY_CASH",
	},
	{
		value: "PRF",
		name: "Preference duty",
		description:
			"Duties laid down in the Customs tariff, to which goods are liable on entering or leaving the Customs territory falling under a preferential regime such as Generalised System of Preferences (GSP).",
		key: "PREFERENCE_DUTY",
	},
	{
		value: "SCN",
		name: "Special construction tax",
		description: "Special tax for construction.",
		key: "SPECIAL_CONSTRUCTION_TAX",
	},
	{
		value: "SSS",
		name: "Shifted social securities",
		description:
			"Social securities share of the invoice amount to be paid directly to the social securities collector.",
		key: "SHIFTED_SOCIAL_SECURITIES",
	},
	{
		value: "STT",
		name: "State/provincial sales tax",
		description:
			"All applicable sale taxes by authorities at the state or provincial level, below national level.",
		key: "STATE_PROVINCIAL_SALES_TAX",
	},
	{
		value: "SUP",
		name: "Suspended duty",
		description: "Duty suspended or deferred from payment.",
		key: "SUSPENDED_DUTY",
	},
	{
		value: "SUR",
		name: "Surtax",
		description:
			"A tax or duty applied on and in addition to existing duties and taxes.",
		key: "SURTAX",
	},
	{
		value: "SWT",
		name: "Shifted wage tax",
		description:
			"Wage tax share of the invoice amount to be paid directly to the tax collector(s office).",
		key: "SHIFTED_WAGE_TAX",
	},
	{
		value: "TAC",
		name: "Alcohol mark tax",
		description: "A tax levied based on the type of alcohol being obtained.",
		key: "ALCOHOL_MARK_TAX",
	},
	{
		value: "TOT",
		name: "Total",
		description: "The summary amount of all taxes.",
		key: "TOTAL",
	},
	{
		value: "TOX",
		name: "Turnover tax",
		description: "Tax levied on the total sales/turnover of a corporation.",
		key: "TURNOVER_TAX",
	},
	{
		value: "TTA",
		name: "Tonnage taxes",
		description: "Tax levied based on the vessel's net tonnage.",
		key: "TONNAGE_TAXES",
	},
	{
		value: "VAD",
		name: "Valuation deposit",
		description:
			"Duty paid and held on deposit, by Customs, during an investigation period prior to a formal decision on valuation of the goods being made.",
		key: "VALUATION_DEPOSIT",
	},
	{
		value: "VAT",
		name: "Value added tax",
		description:
			"A tax on domestic or imported goods applied to the value added at each stage in the production/distribution cycle.",
		key: "VALUE_ADDED_TAX",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		untdid5153: typeof untdid5153;
	}
}
registerCodelist("untdid5153", untdid5153);

export default untdid5153;
