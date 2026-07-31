import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid5189 = [
	{
		value: "1",
		name: "Handling commission",
		description:
			"Fee for the processing of documentary credit, collection and payment which are charged to the customer.",
		key: "HANDLING_COMMISSION",
	},
	{
		value: "2",
		name: "Amendment commission",
		description:
			"Fee for amendments in documentary credit and collection business (not extensions and increases of documentary credits).",
		key: "AMENDMENT_COMMISSION",
	},
	{
		value: "3",
		name: "Acceptance commission",
		description:
			"Fee for the acceptance of draft in documentary credit and collection business which are drawn on us (also to be seen as a kind of 'guarantee commission').",
		key: "ACCEPTANCE_COMMISSION",
	},
	{
		value: "4",
		name: "Commission for obtaining acceptance",
		description:
			"Fee for obtaining an acceptance under collections on the basis of 'documents against acceptance'.",
		key: "COMMISSION_FOR_OBTAINING_ACCEPTANCE",
	},
	{
		value: "5",
		name: "Commission on delivery",
		description: "Fee for delivery of documents without corresponding payment.",
		key: "COMMISSION_ON_DELIVERY",
	},
	{
		value: "6",
		name: "Advising commission",
		description:
			"Fee for advising documentary credits (charged also in case of confirmed credits).",
		key: "ADVISING_COMMISSION",
	},
	{
		value: "7",
		name: "Confirmation commission",
		description: "Fee for confirmation of credit.",
		key: "CONFIRMATION_COMMISSION",
	},
	{
		value: "8",
		name: "Deferred payment commission",
		description:
			"Fee for the deferred payment period under documentary credits confirmed by bank. This fee are charges for the period from presentation of the document until due date of payment.",
		key: "DEFERRED_PAYMENT_COMMISSION",
	},
	{
		value: "9",
		name: "Commission for taking up documents",
		description:
			"Fee charged to the foreign bank for the processing of documentary credit.",
		key: "COMMISSION_FOR_TAKING_UP_DOCUMENTS",
	},
	{
		value: "10",
		name: "Opening commission",
		description: "Fee for opening revocable documentary credit.",
		key: "OPENING_COMMISSION",
	},
	{
		value: "11",
		name: "Fee for payment under reserve",
		description:
			"Fee charged to the customer for discrepancies in credit documents in the case of which the bank have to stipulate payment under reserve.",
		key: "FEE_FOR_PAYMENT_UNDER_RESERVE",
	},
	{
		value: "12",
		name: "Discrepancy fee",
		description:
			"Fee charged to the foreign bank for discrepancies in credit documents.",
		key: "DISCREPANCY_FEE",
	},
	{
		value: "13",
		name: "Domicilation commission",
		description: "Fee for the domicilation of bills with the bank.",
		key: "DOMICILATION_COMMISSION",
	},
	{
		value: "14",
		name: "Commission for release of goods",
		description: "Commission for the release of goods sent to the bank.",
		key: "COMMISSION_FOR_RELEASE_OF_GOODS",
	},
	{
		value: "15",
		name: "Collection commission",
		description:
			"Fee for settling collections on the basis of 'documents against payments'.",
		key: "COLLECTION_COMMISSION",
	},
	{
		value: "16",
		name: "Negotiation commission",
		description:
			"Fee for the purchase of documents under sight credit for the first ten days.",
		key: "NEGOTIATION_COMMISSION",
	},
	{
		value: "17",
		name: "Return commission",
		description:
			"Fee for cheques, bills and collections returned unpaid and/or recalled.",
		key: "RETURN_COMMISSION",
	},
	{
		value: "18",
		name: "B/L splitting charges",
		description: "Fee for the splitting of bills of lading.",
		key: "B_L_SPLITTING_CHARGES",
	},
	{
		value: "19",
		name: "Trust commission",
		description:
			"Fee for the handling on a fiduciary basis of imported goods that have been warehoused.",
		key: "TRUST_COMMISSION",
	},
	{
		value: "20",
		name: "Transfer commission",
		description: "Fee for the transfer of transferable documentary credits.",
		key: "TRANSFER_COMMISSION",
	},
	{
		value: "21",
		name: "Commission for opening irrevocable documentary credits",
		description:
			"Fee for opening irrevocable documentary credits. This fee is a kind of 'Guarantee commission' as compensation for the commitment into which the bank have entered on the customers behalf; similar to confirmation commission, acceptance commission.",
		key: "COMMISSION_FOR_OPENING_IRREVOCABLE_DOCUMENTARY_CREDITS",
	},
	{
		value: "22",
		name: "Pre-advice commission",
		description: "Fee for the pre-advice of a documentary credit.",
		key: "PRE_ADVICE_COMMISSION",
	},
	{
		value: "23",
		name: "Supervisory commission",
		description:
			"Fee for the supervising unconfirmed documentary credits with a deferred payment period.",
		key: "SUPERVISORY_COMMISSION",
	},
	{
		value: "24",
		name: "Model charges",
		description: "Fee for decoding telex messages.",
		key: "MODEL_CHARGES",
	},
	{
		value: "25",
		name: "Risk commission",
		description:
			"Commission in addition to the confirmation commission for documentary credits from sensitive countries.",
		key: "RISK_COMMISSION",
	},
	{
		value: "26",
		name: "Guarantee commission",
		description: "Commission for drawing up guaranties.",
		key: "GUARANTEE_COMMISSION",
	},
	{
		value: "27",
		name: "Reimbursement commission",
		description: "Fee for reimbursement of, for example, documentary credits.",
		key: "REIMBURSEMENT_COMMISSION",
	},
	{
		value: "28",
		name: "Stamp duty",
		description:
			"Tax payable on bills in accordance with national bill of exchange legislation.",
		key: "STAMP_DUTY",
	},
	{
		value: "29",
		name: "Brokerage",
		description:
			"Brokers commission arising, in trade with foreign currencies.",
		key: "BROKERAGE",
	},
	{
		value: "30",
		name: "Bank charges",
		description:
			"Charges deducted/claimed by other banks involved in the transaction.",
		key: "BANK_CHARGES",
	},
	{
		value: "31",
		name: "Bank charges information",
		description:
			"Charges not included in the total charge amount i.e. the charges are for information only.",
		key: "BANK_CHARGES_INFORMATION",
	},
	{
		value: "32",
		name: "Courier fee",
		description: "Fee for use of courier service.",
		key: "COURIER_FEE",
	},
	{
		value: "33",
		name: "Phone fee",
		description: "Fee for use of phone.",
		key: "PHONE_FEE",
	},
	{
		value: "34",
		name: "Postage fee",
		description: "Fee for postage.",
		key: "POSTAGE_FEE",
	},
	{
		value: "35",
		name: "S.W.I.F.T. fee",
		description: "Fee for use of S.W.I.F.T.",
		key: "S_W_I_F_T_FEE",
	},
	{
		value: "36",
		name: "Telex fee",
		description: "Fee for telex.",
		key: "TELEX_FEE",
	},
	{
		value: "37",
		name: "Penalty for late delivery of documents",
		description: "Penalty imposed when documents are delivered late.",
		key: "PENALTY_FOR_LATE_DELIVERY_OF_DOCUMENTS",
	},
	{
		value: "38",
		name: "Penalty for late delivery of valuation of works",
		description: "Penalty imposed when valuation of works is delivered late.",
		key: "PENALTY_FOR_LATE_DELIVERY_OF_VALUATION_OF_WORKS",
	},
	{
		value: "39",
		name: "Penalty for execution of works behind schedule",
		description:
			"Penalty imposed when the execution of works is behind schedule.",
		key: "PENALTY_FOR_EXECUTION_OF_WORKS_BEHIND_SCHEDULE",
	},
	{
		value: "40",
		name: "Other penalties",
		description: "Penalty imposed for other reasons.",
		key: "OTHER_PENALTIES",
	},
	{
		value: "41",
		name: "Bonus for works ahead of schedule",
		description: "Bonus for completing work ahead of schedule.",
		key: "BONUS_FOR_WORKS_AHEAD_OF_SCHEDULE",
	},
	{
		value: "42",
		name: "Other bonus",
		description: "Bonus earned for other reasons.",
		key: "OTHER_BONUS",
	},
	{
		value: "44",
		name: "Project management cost",
		description: "Cost for project management.",
		key: "PROJECT_MANAGEMENT_COST",
	},
	{
		value: "45",
		name: "Pro rata retention",
		description: "Proportional retention charge.",
		key: "PRO_RATA_RETENTION",
	},
	{
		value: "46",
		name: "Contractual retention",
		description: "Contractual retention charge.",
		key: "CONTRACTUAL_RETENTION",
	},
	{
		value: "47",
		name: "Other retentions",
		description: "Retention charge not otherwise specified.",
		key: "OTHER_RETENTIONS",
	},
	{
		value: "48",
		name: "Interest on arrears",
		description: "Interest for late payment.",
		key: "INTEREST_ON_ARREARS",
	},
	{
		value: "49",
		name: "Interest",
		description: "Cost of using money.",
		key: "INTEREST",
	},
	{
		value: "50",
		name: "Charge per credit cover",
		description: "Unit charge per credit cover established.",
		key: "CHARGE_PER_CREDIT_COVER",
	},
	{
		value: "51",
		name: "Charge per unused credit cover",
		description: "Unit charge per unused credit cover.",
		key: "CHARGE_PER_UNUSED_CREDIT_COVER",
	},
	{
		value: "52",
		name: "Minimum commission",
		description: "Minimum commission charge.",
		key: "MINIMUM_COMMISSION",
	},
	{
		value: "53",
		name: "Factoring commission",
		description: "Commission charged for factoring services.",
		key: "FACTORING_COMMISSION",
	},
	{
		value: "54",
		name: "Chamber of commerce charge",
		description: "Identifies the charges from the chamber of commerce.",
		key: "CHAMBER_OF_COMMERCE_CHARGE",
	},
	{
		value: "55",
		name: "Transfer charges",
		description: "Charges for transfer.",
		key: "TRANSFER_CHARGES",
	},
	{
		value: "56",
		name: "Repatriation charges",
		description: "Charges for repatriation.",
		key: "REPATRIATION_CHARGES",
	},
	{
		value: "57",
		name: "Miscellaneous charges",
		description: "Not specifically defined charges.",
		key: "MISCELLANEOUS_CHARGES",
	},
	{
		value: "58",
		name: "Foreign exchange charges",
		description: "Charges for foreign exchange.",
		key: "FOREIGN_EXCHANGE_CHARGES",
	},
	{
		value: "59",
		name: "Agreed debit interest charge",
		description: "Charge for agreed debit interest",
		key: "AGREED_DEBIT_INTEREST_CHARGE",
	},
	{
		value: "60",
		name: "Manufacturer's consumer discount",
		description:
			"A discount given by the manufacturer which should be passed on to the consumer.",
		key: "MANUFACTURER_S_CONSUMER_DISCOUNT",
	},
	{
		value: "61",
		name: "Fax advice charge",
		description: "Charge for fax advice.",
		key: "FAX_ADVICE_CHARGE",
	},
	{
		value: "62",
		name: "Due to military status",
		description: "Allowance granted because of the military status.",
		key: "DUE_TO_MILITARY_STATUS",
	},
	{
		value: "63",
		name: "Due to work accident",
		description: "Allowance granted to a victim of a work accident.",
		key: "DUE_TO_WORK_ACCIDENT",
	},
	{
		value: "64",
		name: "Special agreement",
		description: "An allowance or charge as specified in a special agreement.",
		key: "SPECIAL_AGREEMENT",
	},
	{
		value: "65",
		name: "Production error discount",
		description:
			"A discount given for the purchase of a product with a production error.",
		key: "PRODUCTION_ERROR_DISCOUNT",
	},
	{
		value: "66",
		name: "New outlet discount",
		description:
			"A discount given at the occasion of the opening of a new outlet.",
		key: "NEW_OUTLET_DISCOUNT",
	},
	{
		value: "67",
		name: "Sample discount",
		description: "A discount given for the purchase of a sample of a product.",
		key: "SAMPLE_DISCOUNT",
	},
	{
		value: "68",
		name: "End-of-range discount",
		description:
			"A discount given for the purchase of an end-of-range product.",
		key: "END_OF_RANGE_DISCOUNT",
	},
	{
		value: "69",
		name: "Charge for a customer specific finish",
		description:
			"A charge for the addition of a customer specific finish to a product.",
		key: "CHARGE_FOR_A_CUSTOMER_SPECIFIC_FINISH",
	},
	{
		value: "70",
		name: "Incoterm discount",
		description: "A discount given for a specified Incoterm.",
		key: "INCOTERM_DISCOUNT",
	},
	{
		value: "71",
		name: "Point of sales threshold allowance",
		description:
			"Allowance for reaching or exceeding an agreed sales threshold at the point of sales.",
		key: "POINT_OF_SALES_THRESHOLD_ALLOWANCE",
	},
	{
		value: "72",
		name: "Technical modification costs",
		description: "Costs for technical modifications to a product.",
		key: "TECHNICAL_MODIFICATION_COSTS",
	},
	{
		value: "73",
		name: "Job-order production costs",
		description: "Costs of job-order production.",
		key: "JOB_ORDER_PRODUCTION_COSTS",
	},
	{
		value: "74",
		name: "Off-premises costs",
		description: "Expenses for non-local activities.",
		key: "OFF_PREMISES_COSTS",
	},
	{
		value: "75",
		name: "Additional processing costs",
		description: "Costs of additional processing.",
		key: "ADDITIONAL_PROCESSING_COSTS",
	},
	{
		value: "76",
		name: "Attesting charge",
		description: "Costs of official attestation.",
		key: "ATTESTING_CHARGE",
	},
	{
		value: "77",
		name: "Rush delivery surcharge",
		description: "Charge for increased delivery speed.",
		key: "RUSH_DELIVERY_SURCHARGE",
	},
	{
		value: "78",
		name: "Special construction costs",
		description:
			"Charge for costs incurred as result of special constructions.",
		key: "SPECIAL_CONSTRUCTION_COSTS",
	},
	{
		value: "79",
		name: "Freight charges",
		description:
			"Amount to be paid for moving goods, by whatever means, from one place to another.",
		key: "FREIGHT_CHARGES",
	},
	{
		value: "80",
		name: "Packing charge",
		description: "Charge for packing.",
		key: "PACKING_CHARGE",
	},
	{
		value: "81",
		name: "Repair charge",
		description: "Charge for repair.",
		key: "REPAIR_CHARGE",
	},
	{
		value: "82",
		name: "Loading charge",
		description: "Charge for loading.",
		key: "LOADING_CHARGE",
	},
	{
		value: "83",
		name: "Setup charge",
		description: "Charge for setup.",
		key: "SETUP_CHARGE",
	},
	{
		value: "84",
		name: "Testing charge",
		description: "Charge for testing.",
		key: "TESTING_CHARGE",
	},
	{
		value: "85",
		name: "Warehousing charge",
		description: "Charge for storage and handling.",
		key: "WAREHOUSING_CHARGE",
	},
	{
		value: "86",
		name: "Gold surcharge",
		description:
			"Difference between current price and basic value contained in product price in relation to gold content.",
		key: "GOLD_SURCHARGE",
	},
	{
		value: "87",
		name: "Copper surcharge",
		description:
			"Difference between current price and basic value contained in product price in relation to copper content.",
		key: "COPPER_SURCHARGE",
	},
	{
		value: "88",
		name: "Material surcharge/deduction",
		description:
			"Surcharge/deduction, calculated for higher/ lower material's consumption.",
		key: "MATERIAL_SURCHARGE_DEDUCTION",
	},
	{
		value: "89",
		name: "Lead surcharge",
		description:
			"Difference between current price and basic value contained in product price in relation to lead content.",
		key: "LEAD_SURCHARGE",
	},
	{
		value: "90",
		name: "Price index surcharge",
		description:
			"Higher/lower price, resulting from change in costs between the times of making offer and delivery.",
		key: "PRICE_INDEX_SURCHARGE",
	},
	{
		value: "91",
		name: "Platinum surcharge",
		description:
			"Difference between current price and basic value contained in product price in relation to platinum content.",
		key: "PLATINUM_SURCHARGE",
	},
	{
		value: "92",
		name: "Silver surcharge",
		description:
			"Difference between current price and basic value contained in product price in relation to silver content.",
		key: "SILVER_SURCHARGE",
	},
	{
		value: "93",
		name: "Wolfram surcharge",
		description:
			"Difference between current price and basic value contained in product price in relation to wolfram content.",
		key: "WOLFRAM_SURCHARGE",
	},
	{
		value: "94",
		name: "Aluminum surcharge",
		description:
			"Difference between current price and basic value contained in product price in relation to aluminum content.",
		key: "ALUMINUM_SURCHARGE",
	},
	{
		value: "95",
		name: "Discount",
		description: "A reduction from a usual or list price.",
		key: "DISCOUNT",
	},
	{
		value: "96",
		name: "Insurance",
		description: "Charge for insurance.",
		key: "INSURANCE",
	},
	{
		value: "97",
		name: "Minimum order / minimum billing charge",
		description: "Charge for minimum order or minimum billing.",
		key: "MINIMUM_ORDER_MINIMUM_BILLING_CHARGE",
	},
	{
		value: "98",
		name: "Material surcharge (special materials)",
		description: "Surcharge for (special) materials.",
		key: "MATERIAL_SURCHARGE_SPECIAL_MATERIALS",
	},
	{
		value: "99",
		name: "Surcharge",
		description: "An additional amount added to the usual charge.",
		key: "SURCHARGE",
	},
	{
		value: "100",
		name: "Special rebate",
		description:
			"A return of part of an amount paid for goods or services, serving as a reduction or discount.",
		key: "SPECIAL_REBATE",
	},
	{
		value: "101",
		name: "Carbon footprint charge",
		description:
			"A monetary amount charged for carbon footprint related to a regulatory requirement.",
		key: "CARBON_FOOTPRINT_CHARGE",
	},
	{
		value: "102",
		name: "Fixed long term",
		description: "A fixed long term allowance or charge.",
		key: "FIXED_LONG_TERM",
	},
	{
		value: "103",
		name: "Temporary",
		description: "A temporary allowance or charge.",
		key: "TEMPORARY",
	},
	{
		value: "104",
		name: "Standard",
		description: "The standard available allowance or charge.",
		key: "STANDARD",
	},
	{
		value: "105",
		name: "Yearly turnover",
		description: "An allowance or charge based on yearly turnover.",
		key: "YEARLY_TURNOVER",
	},
	{
		value: "106",
		name: "Withheld taxes and social security contributions",
		description:
			"The amount of taxes and contributions for social security, that is subtracted from the payable amount as it is to be paid separately.",
		key: "WITHHELD_TAXES_AND_SOCIAL_SECURITY_CONTRIBUTIONS",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		untdid5189: typeof untdid5189;
	}
}
registerCodelist("untdid5189", untdid5189);

export default untdid5189;
