import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const payment = [
	{ value: "1", name: "Instrument not defined", key: "INSTRUMENT_NOT_DEFINED" },
	{
		value: "2",
		name: "Automated clearing house credit",
		key: "AUTOMATED_CLEARING_HOUSE_CREDIT",
	},
	{
		value: "3",
		name: "Automated clearing house debit",
		key: "AUTOMATED_CLEARING_HOUSE_DEBIT",
	},
	{
		value: "4",
		name: "ACH demand debit reversal",
		key: "ACH_DEMAND_DEBIT_REVERSAL",
	},
	{
		value: "5",
		name: "ACH demand credit reversal",
		key: "ACH_DEMAND_CREDIT_REVERSAL",
	},
	{ value: "6", name: "ACH demand credit", key: "ACH_DEMAND_CREDIT" },
	{ value: "7", name: "ACH demand debit", key: "ACH_DEMAND_DEBIT" },
	{ value: "8", name: "Hold", key: "HOLD" },
	{
		value: "9",
		name: "National or regional clearing",
		key: "NATIONAL_OR_REGIONAL_CLEARING",
	},
	{ value: "10", name: "In cash", key: "IN_CASH" },
	{
		value: "11",
		name: "ACH savings credit reversal",
		key: "ACH_SAVINGS_CREDIT_REVERSAL",
	},
	{
		value: "12",
		name: "ACH savings debit reversal",
		key: "ACH_SAVINGS_DEBIT_REVERSAL",
	},
	{ value: "13", name: "ACH savings credit", key: "ACH_SAVINGS_CREDIT" },
	{ value: "14", name: "ACH savings debit", key: "ACH_SAVINGS_DEBIT" },
	{ value: "15", name: "Bookentry credit", key: "BOOKENTRY_CREDIT" },
	{ value: "16", name: "Bookentry debit", key: "BOOKENTRY_DEBIT" },
	{
		value: "17",
		name: "ACH demand cash concentration/disbursement (CCD) credit",
		key: "ACH_DEMAND_CASH_CONCENTRATION_DISBURSEMENT_CCD_CREDIT",
	},
	{
		value: "18",
		name: "ACH demand cash concentration/disbursement (CCD) debit",
		key: "ACH_DEMAND_CASH_CONCENTRATION_DISBURSEMENT_CCD_DEBIT",
	},
	{
		value: "19",
		name: "ACH demand corporate trade payment (CTP) credit",
		key: "ACH_DEMAND_CORPORATE_TRADE_PAYMENT_CTP_CREDIT",
	},
	{ value: "20", name: "Cheque", key: "CHEQUE" },
	{ value: "21", name: "Banker's draft", key: "BANKER_S_DRAFT" },
	{
		value: "22",
		name: "Certified banker's draft",
		key: "CERTIFIED_BANKER_S_DRAFT",
	},
	{
		value: "23",
		name: "Bank cheque (issued by a banking or similar establishment)",
		key: "BANK_CHEQUE_ISSUED_BY_A_BANKING_OR_SIMILAR_ESTABLISHMENT",
	},
	{
		value: "24",
		name: "Bill of exchange awaiting acceptance",
		key: "BILL_OF_EXCHANGE_AWAITING_ACCEPTANCE",
	},
	{ value: "25", name: "Certified cheque", key: "CERTIFIED_CHEQUE" },
	{ value: "26", name: "Local cheque", key: "LOCAL_CHEQUE" },
	{
		value: "27",
		name: "ACH demand corporate trade payment (CTP) debit",
		key: "ACH_DEMAND_CORPORATE_TRADE_PAYMENT_CTP_DEBIT",
	},
	{
		value: "28",
		name: "ACH demand corporate trade exchange (CTX) credit",
		key: "ACH_DEMAND_CORPORATE_TRADE_EXCHANGE_CTX_CREDIT",
	},
	{
		value: "29",
		name: "ACH demand corporate trade exchange (CTX) debit",
		key: "ACH_DEMAND_CORPORATE_TRADE_EXCHANGE_CTX_DEBIT",
	},
	{
		value: "30",
		name: "Credit transfer",
		usage: "non-SEPA",
		key: "CREDIT_TRANSFER",
	},
	{
		value: "31",
		name: "Debit transfer",
		usage: "non-SEPA",
		key: "DEBIT_TRANSFER",
	},
	{
		value: "32",
		name: "ACH demand cash concentration/disbursement plus (CCD+)",
		key: "ACH_DEMAND_CASH_CONCENTRATION_DISBURSEMENT_PLUS_CCD",
	},
	{
		value: "33",
		name: "ACH demand cash concentration/disbursement plus (CCD+)",
		key: "ACH_DEMAND_CASH_CONCENTRATION_DISBURSEMENT_PLUS_CCD",
	},
	{
		value: "34",
		name: "ACH prearranged payment and deposit (PPD)",
		key: "ACH_PREARRANGED_PAYMENT_AND_DEPOSIT_PPD",
	},
	{
		value: "35",
		name: "ACH savings cash concentration/disbursement (CCD) credit",
		key: "ACH_SAVINGS_CASH_CONCENTRATION_DISBURSEMENT_CCD_CREDIT",
	},
	{
		value: "36",
		name: "ACH savings cash concentration/disbursement (CCD) debit",
		key: "ACH_SAVINGS_CASH_CONCENTRATION_DISBURSEMENT_CCD_DEBIT",
	},
	{
		value: "37",
		name: "ACH savings corporate trade payment (CTP) credit",
		key: "ACH_SAVINGS_CORPORATE_TRADE_PAYMENT_CTP_CREDIT",
	},
	{
		value: "38",
		name: "ACH savings corporate trade payment (CTP) debit",
		key: "ACH_SAVINGS_CORPORATE_TRADE_PAYMENT_CTP_DEBIT",
	},
	{
		value: "39",
		name: "ACH savings corporate trade exchange (CTX) credit",
		key: "ACH_SAVINGS_CORPORATE_TRADE_EXCHANGE_CTX_CREDIT",
	},
	{
		value: "40",
		name: "ACH savings corporate trade exchange (CTX) debit",
		key: "ACH_SAVINGS_CORPORATE_TRADE_EXCHANGE_CTX_DEBIT",
	},
	{
		value: "41",
		name: "ACH savings cash concentration/disbursement plus (CCD+)",
		key: "ACH_SAVINGS_CASH_CONCENTRATION_DISBURSEMENT_PLUS_CCD",
	},
	{
		value: "42",
		name: "Payment to bank account",
		key: "PAYMENT_TO_BANK_ACCOUNT",
	},
	{
		value: "43",
		name: "ACH savings cash concentration/disbursement plus (CCD+)",
		key: "ACH_SAVINGS_CASH_CONCENTRATION_DISBURSEMENT_PLUS_CCD",
	},
	{
		value: "44",
		name: "Accepted bill of exchange",
		key: "ACCEPTED_BILL_OF_EXCHANGE",
	},
	{
		value: "45",
		name: "Referenced home-banking credit transfer",
		key: "REFERENCED_HOME_BANKING_CREDIT_TRANSFER",
	},
	{
		value: "46",
		name: "Interbank debit transfer",
		key: "INTERBANK_DEBIT_TRANSFER",
	},
	{
		value: "47",
		name: "Home-banking debit transfer",
		key: "HOME_BANKING_DEBIT_TRANSFER",
	},
	{
		value: "48",
		name: "Bank card",
		usage: "Use for all payment cards",
		key: "BANK_CARD",
	},
	{ value: "49", name: "Direct debit", key: "DIRECT_DEBIT" },
	{ value: "50", name: "Payment by postgiro", key: "PAYMENT_BY_POSTGIRO" },
	{
		value: "51",
		name: "FR, norme 6 97-Telereglement CFONB (French Organisation for",
		key: "FR_NORME_6_97_TELEREGLEMENT_CFONB_FRENCH_ORGANISATION_FOR",
	},
	{
		value: "52",
		name: "Urgent commercial payment",
		key: "URGENT_COMMERCIAL_PAYMENT",
	},
	{
		value: "53",
		name: "Urgent Treasury Payment",
		key: "URGENT_TREASURY_PAYMENT",
	},
	{ value: "54", name: "Credit card", key: "CREDIT_CARD" },
	{ value: "55", name: "Debit card", key: "DEBIT_CARD" },
	{ value: "56", name: "Bankgiro", key: "BANKGIRO" },
	{
		value: "57",
		name: "Standing agreement",
		usage: "Contractual payment means",
		key: "STANDING_AGREEMENT",
	},
	{
		value: "58",
		name: "SEPA credit transfer",
		usage: "SEPA",
		key: "SEPA_CREDIT_TRANSFER",
	},
	{
		value: "59",
		name: "SEPA direct debit",
		usage: "SEPA",
		key: "SEPA_DIRECT_DEBIT",
	},
	{ value: "60", name: "Promissory note", key: "PROMISSORY_NOTE" },
	{
		value: "61",
		name: "Promissory note signed by the debtor",
		key: "PROMISSORY_NOTE_SIGNED_BY_THE_DEBTOR",
	},
	{
		value: "62",
		name: "Promissory note signed by the debtor and endorsed by a bank",
		key: "PROMISSORY_NOTE_SIGNED_BY_THE_DEBTOR_AND_ENDORSED_BY_A_BANK",
	},
	{
		value: "63",
		name: "Promissory note signed by the debtor and endorsed by a",
		key: "PROMISSORY_NOTE_SIGNED_BY_THE_DEBTOR_AND_ENDORSED_BY_A",
	},
	{
		value: "64",
		name: "Promissory note signed by a bank",
		key: "PROMISSORY_NOTE_SIGNED_BY_A_BANK",
	},
	{
		value: "65",
		name: "Promissory note signed by a bank and endorsed by another",
		key: "PROMISSORY_NOTE_SIGNED_BY_A_BANK_AND_ENDORSED_BY_ANOTHER",
	},
	{
		value: "66",
		name: "Promissory note signed by a third party",
		key: "PROMISSORY_NOTE_SIGNED_BY_A_THIRD_PARTY",
	},
	{
		value: "67",
		name: "Promissory note signed by a third party and endorsed by a",
		key: "PROMISSORY_NOTE_SIGNED_BY_A_THIRD_PARTY_AND_ENDORSED_BY_A",
	},
	{
		value: "68",
		name: "Online payment service",
		key: "ONLINE_PAYMENT_SERVICE",
	},
	{ value: "69", name: "Transfer Advice", key: "TRANSFER_ADVICE" },
	{
		value: "70",
		name: "Bill drawn by the creditor on the debtor",
		key: "BILL_DRAWN_BY_THE_CREDITOR_ON_THE_DEBTOR",
	},
	{
		value: "74",
		name: "Bill drawn by the creditor on a bank",
		key: "BILL_DRAWN_BY_THE_CREDITOR_ON_A_BANK",
	},
	{
		value: "75",
		name: "Bill drawn by the creditor, endorsed by another bank",
		key: "BILL_DRAWN_BY_THE_CREDITOR_ENDORSED_BY_ANOTHER_BANK",
	},
	{
		value: "76",
		name: "Bill drawn by the creditor on a bank and endorsed by a",
		key: "BILL_DRAWN_BY_THE_CREDITOR_ON_A_BANK_AND_ENDORSED_BY_A",
	},
	{
		value: "77",
		name: "Bill drawn by the creditor on a third party",
		key: "BILL_DRAWN_BY_THE_CREDITOR_ON_A_THIRD_PARTY",
	},
	{
		value: "78",
		name: "Bill drawn by creditor on third party, accepted and",
		key: "BILL_DRAWN_BY_CREDITOR_ON_THIRD_PARTY_ACCEPTED_AND",
	},
	{
		value: "91",
		name: "Not transferable banker's draft",
		key: "NOT_TRANSFERABLE_BANKER_S_DRAFT",
	},
	{
		value: "92",
		name: "Not transferable local cheque",
		key: "NOT_TRANSFERABLE_LOCAL_CHEQUE",
	},
	{ value: "93", name: "Reference giro", key: "REFERENCE_GIRO" },
	{ value: "94", name: "Urgent giro", key: "URGENT_GIRO" },
	{ value: "95", name: "Free format giro", key: "FREE_FORMAT_GIRO" },
	{
		value: "96",
		name: "Requested method for payment was not used",
		key: "REQUESTED_METHOD_FOR_PAYMENT_WAS_NOT_USED",
	},
	{
		value: "97",
		name: "Clearing between partners",
		key: "CLEARING_BETWEEN_PARTNERS",
	},
	{
		value: "98",
		name: "JP, Electronically Recorded Monetary Claims",
		key: "JP_ELECTRONICALLY_RECORDED_MONETARY_CLAIMS",
	},
	{ value: "ZZZ", name: "Mutually defined", key: "MUTUALLY_DEFINED" },
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		payment: typeof payment;
	}
}
registerCodelist("payment", payment);

export default payment;
