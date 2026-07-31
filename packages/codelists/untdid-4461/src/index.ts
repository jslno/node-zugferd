import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid4461 = [
	{
		value: "1",
		name: "Instrument not defined",
		description:
			"Not defined legally enforceable agreement between two or more parties (expressing a contractual right or a right to the payment of money).",
		key: "INSTRUMENT_NOT_DEFINED",
	},
	{
		value: "2",
		name: "Automated clearing house credit",
		description:
			"A credit transaction made through the automated clearing house system.",
		key: "AUTOMATED_CLEARING_HOUSE_CREDIT",
	},
	{
		value: "3",
		name: "Automated clearing house debit",
		description:
			"A debit transaction made through the automated clearing house system.",
		key: "AUTOMATED_CLEARING_HOUSE_DEBIT",
	},
	{
		value: "4",
		name: "ACH demand debit reversal",
		description:
			"A request to reverse an ACH debit transaction to a demand deposit account.",
		key: "ACH_DEMAND_DEBIT_REVERSAL",
	},
	{
		value: "5",
		name: "ACH demand credit reversal",
		description:
			"A request to reverse a credit transaction to a demand deposit account.",
		key: "ACH_DEMAND_CREDIT_REVERSAL",
	},
	{
		value: "6",
		name: "ACH demand credit",
		description:
			"A credit transaction made through the ACH system to a demand deposit account.",
		key: "ACH_DEMAND_CREDIT",
	},
	{
		value: "7",
		name: "ACH demand debit",
		description:
			"A debit transaction made through the ACH system to a demand deposit account.",
		key: "ACH_DEMAND_DEBIT",
	},
	{
		value: "8",
		name: "Hold",
		description:
			"Indicates that the bank should hold the payment for collection by the beneficiary or other instructions.",
		key: "HOLD",
	},
	{
		value: "9",
		name: "National or regional clearing",
		description:
			"Indicates that the payment should be made using the national or regional clearing.",
		key: "NATIONAL_OR_REGIONAL_CLEARING",
	},
	{
		value: "10",
		name: "In cash",
		description:
			"Payment by currency (including bills and coins) in circulation, including checking account deposits.",
		key: "IN_CASH",
	},
	{
		value: "11",
		name: "ACH savings credit reversal",
		description:
			"A request to reverse an ACH credit transaction to a savings account.",
		key: "ACH_SAVINGS_CREDIT_REVERSAL",
	},
	{
		value: "12",
		name: "ACH savings debit reversal",
		description:
			"A request to reverse an ACH debit transaction to a savings account.",
		key: "ACH_SAVINGS_DEBIT_REVERSAL",
	},
	{
		value: "13",
		name: "ACH savings credit",
		description:
			"A credit transaction made through the ACH system to a savings account.",
		key: "ACH_SAVINGS_CREDIT",
	},
	{
		value: "14",
		name: "ACH savings debit",
		description:
			"A debit transaction made through the ACH system to a savings account.",
		key: "ACH_SAVINGS_DEBIT",
	},
	{
		value: "15",
		name: "Bookentry credit",
		description:
			"A credit entry between two accounts at the same bank branch. Synonym: house credit.",
		key: "BOOKENTRY_CREDIT",
	},
	{
		value: "16",
		name: "Bookentry debit",
		description:
			"A debit entry between two accounts at the same bank branch. Synonym: house debit.",
		key: "BOOKENTRY_DEBIT",
	},
	{
		value: "17",
		name: "ACH demand cash concentration/disbursement (CCD) credit",
		description:
			"A credit transaction made through the ACH system to a demand deposit account using the CCD payment format.",
		key: "ACH_DEMAND_CASH_CONCENTRATION_DISBURSEMENT_CCD_CREDIT",
	},
	{
		value: "18",
		name: "ACH demand cash concentration/disbursement (CCD) debit",
		description:
			"A debit transaction made through the ACH system to a demand deposit account using the CCD payment format.",
		key: "ACH_DEMAND_CASH_CONCENTRATION_DISBURSEMENT_CCD_DEBIT",
	},
	{
		value: "19",
		name: "ACH demand corporate trade payment (CTP) credit",
		description:
			"A credit transaction made through the ACH system to a demand deposit account using the CTP payment format.",
		key: "ACH_DEMAND_CORPORATE_TRADE_PAYMENT_CTP_CREDIT",
	},
	{
		value: "20",
		name: "Cheque",
		description:
			"Payment by a pre-printed form on which instructions are given to an account holder (a bank or building society) to pay a stated sum to a named recipient.",
		key: "CHEQUE",
	},
	{
		value: "21",
		name: "Banker's draft",
		description: "Issue of a banker's draft in payment of the funds.",
		key: "BANKER_S_DRAFT",
	},
	{
		value: "22",
		name: "Certified banker's draft",
		description:
			"Cheque drawn by a bank on itself or its agent. A person who owes money to another buys the draft from a bank for cash and hands it to the creditor who need have no fear that it might be dishonoured.",
		key: "CERTIFIED_BANKER_S_DRAFT",
	},
	{
		value: "23",
		name: "Bank cheque (issued by a banking or similar establishment)",
		description:
			"Payment by a pre-printed form, which has been completed by a financial institution, on which instructions are given to an account holder (a bank or building society) to pay a stated sum to a named recipient.",
		key: "BANK_CHEQUE_ISSUED_BY_A_BANKING_OR_SIMILAR_ESTABLISHMENT",
	},
	{
		value: "24",
		name: "Bill of exchange awaiting acceptance",
		description:
			"Bill drawn by the creditor on the debtor but not yet accepted by the debtor.",
		key: "BILL_OF_EXCHANGE_AWAITING_ACCEPTANCE",
	},
	{
		value: "25",
		name: "Certified cheque",
		description:
			"Payment by a pre-printed form stamped with the paying bank's certification on which instructions are given to an account holder (a bank or building society) to pay a stated sum to a named recipient .",
		key: "CERTIFIED_CHEQUE",
	},
	{
		value: "26",
		name: "Local cheque",
		description: "Indicates that the cheque is given local to the recipient.",
		key: "LOCAL_CHEQUE",
	},
	{
		value: "27",
		name: "ACH demand corporate trade payment (CTP) debit",
		description:
			"A debit transaction made through the ACH system to a demand deposit account using the CTP payment format.",
		key: "ACH_DEMAND_CORPORATE_TRADE_PAYMENT_CTP_DEBIT",
	},
	{
		value: "28",
		name: "ACH demand corporate trade exchange (CTX) credit",
		description:
			"A credit transaction made through the ACH system to a demand deposit account using the CTX payment format.",
		key: "ACH_DEMAND_CORPORATE_TRADE_EXCHANGE_CTX_CREDIT",
	},
	{
		value: "29",
		name: "ACH demand corporate trade exchange (CTX) debit",
		description:
			"A debit transaction made through the ACH system to a demand account using the CTX payment format.",
		key: "ACH_DEMAND_CORPORATE_TRADE_EXCHANGE_CTX_DEBIT",
	},
	{
		value: "30",
		name: "Credit transfer",
		description:
			"Payment by credit movement of funds from one account to another.",
		key: "CREDIT_TRANSFER",
	},
	{
		value: "31",
		name: "Debit transfer",
		description:
			"Payment by debit movement of funds from one account to another.",
		key: "DEBIT_TRANSFER",
	},
	{
		value: "32",
		name: "ACH demand cash concentration/disbursement plus (CCD+)",
		description:
			"credit A credit transaction made through the ACH system to a demand deposit account using the CCD+ payment format.",
		key: "ACH_DEMAND_CASH_CONCENTRATION_DISBURSEMENT_PLUS_CCD",
	},
	{
		value: "33",
		name: "ACH demand cash concentration/disbursement plus (CCD+)",
		description:
			"debit A debit transaction made through the ACH system to a demand deposit account using the CCD+ payment format.",
		key: "ACH_DEMAND_CASH_CONCENTRATION_DISBURSEMENT_PLUS_CCD",
	},
	{
		value: "34",
		name: "ACH prearranged payment and deposit (PPD)",
		description:
			"A consumer credit transaction made through the ACH system to a demand deposit or savings account.",
		key: "ACH_PREARRANGED_PAYMENT_AND_DEPOSIT_PPD",
	},
	{
		value: "35",
		name: "ACH savings cash concentration/disbursement (CCD) credit",
		description:
			"A credit transaction made through the ACH system to a demand deposit or savings account.",
		key: "ACH_SAVINGS_CASH_CONCENTRATION_DISBURSEMENT_CCD_CREDIT",
	},
	{
		value: "36",
		name: "ACH savings cash concentration/disbursement (CCD) debit",
		description:
			"A debit transaction made through the ACH system to a savings account using the CCD payment format.",
		key: "ACH_SAVINGS_CASH_CONCENTRATION_DISBURSEMENT_CCD_DEBIT",
	},
	{
		value: "37",
		name: "ACH savings corporate trade payment (CTP) credit",
		description:
			"A credit transaction made through the ACH system to a savings account using the CTP payment format.",
		key: "ACH_SAVINGS_CORPORATE_TRADE_PAYMENT_CTP_CREDIT",
	},
	{
		value: "38",
		name: "ACH savings corporate trade payment (CTP) debit",
		description:
			"A debit transaction made through the ACH system to a savings account using the CTP payment format.",
		key: "ACH_SAVINGS_CORPORATE_TRADE_PAYMENT_CTP_DEBIT",
	},
	{
		value: "39",
		name: "ACH savings corporate trade exchange (CTX) credit",
		description:
			"A credit transaction made through the ACH system to a savings account using the CTX payment format.",
		key: "ACH_SAVINGS_CORPORATE_TRADE_EXCHANGE_CTX_CREDIT",
	},
	{
		value: "40",
		name: "ACH savings corporate trade exchange (CTX) debit",
		description:
			"A debit transaction made through the ACH system to a savings account using the CTX payment format.",
		key: "ACH_SAVINGS_CORPORATE_TRADE_EXCHANGE_CTX_DEBIT",
	},
	{
		value: "41",
		name: "ACH savings cash concentration/disbursement plus (CCD+)",
		description:
			"credit A credit transaction made through the ACH system to a savings account using the CCD+ payment format.",
		key: "ACH_SAVINGS_CASH_CONCENTRATION_DISBURSEMENT_PLUS_CCD",
	},
	{
		value: "42",
		name: "Payment to bank account",
		description:
			"Payment by an arrangement for settling debts that is operated by the Post Office.",
		key: "PAYMENT_TO_BANK_ACCOUNT",
	},
	{
		value: "43",
		name: "ACH savings cash concentration/disbursement plus (CCD+)",
		description:
			"debit A debit transaction made through the ACH system to a savings account using the CCD+ payment format.",
		key: "ACH_SAVINGS_CASH_CONCENTRATION_DISBURSEMENT_PLUS_CCD",
	},
	{
		value: "44",
		name: "Accepted bill of exchange",
		description:
			"Bill drawn by the creditor on the debtor and accepted by the debtor.",
		key: "ACCEPTED_BILL_OF_EXCHANGE",
	},
	{
		value: "45",
		name: "Referenced home-banking credit transfer",
		description:
			"A referenced credit transfer initiated through home- banking.",
		key: "REFERENCED_HOME_BANKING_CREDIT_TRANSFER",
	},
	{
		value: "46",
		name: "Interbank debit transfer",
		description: "A debit transfer via interbank means.",
		key: "INTERBANK_DEBIT_TRANSFER",
	},
	{
		value: "47",
		name: "Home-banking debit transfer",
		description: "A debit transfer initiated through home-banking.",
		key: "HOME_BANKING_DEBIT_TRANSFER",
	},
	{
		value: "48",
		name: "Bank card",
		description:
			"Payment by means of a card issued by a bank or other financial institution.",
		key: "BANK_CARD",
	},
	{
		value: "49",
		name: "Direct debit",
		description:
			"The amount is to be, or has been, directly debited to the customer's bank account.",
		key: "DIRECT_DEBIT",
	},
	{
		value: "50",
		name: "Payment by postgiro",
		description:
			"A method for the transmission of funds through the postal system rather than through the banking system.",
		key: "PAYMENT_BY_POSTGIRO",
	},
	{
		value: "51",
		name: "FR, norme 6 97-Telereglement CFONB (French Organisation for",
		description:
			"Banking Standards)  - Option A A French standard procedure that allows a debtor to pay an amount due to a creditor. The creditor will forward it to its bank, which will collect the money on the bank account of the debtor.",
		key: "FR_NORME_6_97_TELEREGLEMENT_CFONB_FRENCH_ORGANISATION_FOR",
	},
	{
		value: "52",
		name: "Urgent commercial payment",
		description:
			"Payment order which requires guaranteed processing by the most appropriate means to ensure it occurs on the requested execution date, provided that it is issued to the ordered bank before the agreed cut-off time.",
		key: "URGENT_COMMERCIAL_PAYMENT",
	},
	{
		value: "53",
		name: "Urgent Treasury Payment",
		description:
			"Payment order or transfer which must be executed, by the most appropriate means, as urgently as possible and before urgent commercial payments.",
		key: "URGENT_TREASURY_PAYMENT",
	},
	{
		value: "54",
		name: "Credit card",
		description: "Payment made by means of credit card.",
		key: "CREDIT_CARD",
	},
	{
		value: "55",
		name: "Debit card",
		description: "Payment made by means of debit card.",
		key: "DEBIT_CARD",
	},
	{
		value: "56",
		name: "Bankgiro",
		description: "Payment will be, or has been, made by bankgiro.",
		key: "BANKGIRO",
	},
	{
		value: "57",
		name: "Standing agreement",
		description:
			"The payment means have been previously agreed between seller and buyer and thus are not stated again.",
		key: "STANDING_AGREEMENT",
	},
	{
		value: "58",
		name: "SEPA credit transfer",
		description:
			"Credit transfer inside the Single Euro Payment Area (SEPA) system.",
		key: "SEPA_CREDIT_TRANSFER",
	},
	{
		value: "59",
		name: "SEPA direct debit",
		description:
			"Direct debit inside the Single Euro Payment Area (SEPA) system.",
		key: "SEPA_DIRECT_DEBIT",
	},
	{
		value: "60",
		name: "Promissory note",
		description:
			"Payment by an unconditional promise in writing made by one person to another, signed by the maker, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
		key: "PROMISSORY_NOTE",
	},
	{
		value: "61",
		name: "Promissory note signed by the debtor",
		description:
			"Payment by an unconditional promise in writing made by the debtor to another person, signed by the debtor, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
		key: "PROMISSORY_NOTE_SIGNED_BY_THE_DEBTOR",
	},
	{
		value: "62",
		name: "Promissory note signed by the debtor and endorsed by a bank",
		description:
			"Payment by an unconditional promise in writing made by the debtor to another person, signed by the debtor and endorsed by a bank, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
		key: "PROMISSORY_NOTE_SIGNED_BY_THE_DEBTOR_AND_ENDORSED_BY_A_BANK",
	},
	{
		value: "63",
		name: "Promissory note signed by the debtor and endorsed by a",
		description:
			"third party Payment by an unconditional promise in writing made by the debtor to another person, signed by the debtor and endorsed by a third party, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
		key: "PROMISSORY_NOTE_SIGNED_BY_THE_DEBTOR_AND_ENDORSED_BY_A",
	},
	{
		value: "64",
		name: "Promissory note signed by a bank",
		description:
			"Payment by an unconditional promise in writing made by the bank to another person, signed by the bank, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
		key: "PROMISSORY_NOTE_SIGNED_BY_A_BANK",
	},
	{
		value: "65",
		name: "Promissory note signed by a bank and endorsed by another",
		description:
			"bank Payment by an unconditional promise in writing made by the bank to another person, signed by the bank and endorsed by another bank, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
		key: "PROMISSORY_NOTE_SIGNED_BY_A_BANK_AND_ENDORSED_BY_ANOTHER",
	},
	{
		value: "66",
		name: "Promissory note signed by a third party",
		description:
			"Payment by an unconditional promise in writing made by a third party to another person, signed by the third party, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
		key: "PROMISSORY_NOTE_SIGNED_BY_A_THIRD_PARTY",
	},
	{
		value: "67",
		name: "Promissory note signed by a third party and endorsed by a",
		description:
			"bank Payment by an unconditional promise in writing made by a third party to another person, signed by the third party and endorsed by a bank, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
		key: "PROMISSORY_NOTE_SIGNED_BY_A_THIRD_PARTY_AND_ENDORSED_BY_A",
	},
	{
		value: "68",
		name: "Online payment service",
		description:
			"Payment will be made or has been made by an online payment service.",
		key: "ONLINE_PAYMENT_SERVICE",
	},
	{
		value: "69",
		name: "Transfer Advice",
		description:
			"Transfer of an amount of money in the books of the account servicer. An advice should be sent back to the account owner.",
		key: "TRANSFER_ADVICE",
	},
	{
		value: "70",
		name: "Bill drawn by the creditor on the debtor",
		description: "Bill drawn by the creditor on the debtor.",
		key: "BILL_DRAWN_BY_THE_CREDITOR_ON_THE_DEBTOR",
	},
	{
		value: "74",
		name: "Bill drawn by the creditor on a bank",
		description: "Bill drawn by the creditor on a bank.",
		key: "BILL_DRAWN_BY_THE_CREDITOR_ON_A_BANK",
	},
	{
		value: "75",
		name: "Bill drawn by the creditor, endorsed by another bank",
		description: "Bill drawn by the creditor, endorsed by another bank.",
		key: "BILL_DRAWN_BY_THE_CREDITOR_ENDORSED_BY_ANOTHER_BANK",
	},
	{
		value: "76",
		name: "Bill drawn by the creditor on a bank and endorsed by a",
		description:
			"third party Bill drawn by the creditor on a bank and endorsed by a third party.",
		key: "BILL_DRAWN_BY_THE_CREDITOR_ON_A_BANK_AND_ENDORSED_BY_A",
	},
	{
		value: "77",
		name: "Bill drawn by the creditor on a third party",
		description: "Bill drawn by the creditor on a third party.",
		key: "BILL_DRAWN_BY_THE_CREDITOR_ON_A_THIRD_PARTY",
	},
	{
		value: "78",
		name: "Bill drawn by creditor on third party, accepted and",
		description:
			"endorsed by bank Bill drawn by creditor on third party, accepted and endorsed by bank.",
		key: "BILL_DRAWN_BY_CREDITOR_ON_THIRD_PARTY_ACCEPTED_AND",
	},
	{
		value: "91",
		name: "Not transferable banker's draft",
		description: "Issue a bankers draft not endorsable.",
		key: "NOT_TRANSFERABLE_BANKER_S_DRAFT",
	},
	{
		value: "92",
		name: "Not transferable local cheque",
		description: "Issue a cheque not endorsable in payment of the funds.",
		key: "NOT_TRANSFERABLE_LOCAL_CHEQUE",
	},
	{
		value: "93",
		name: "Reference giro",
		description:
			"Ordering customer tells the bank to use the payment system 'Reference giro'. Used in the Finnish national banking system.",
		key: "REFERENCE_GIRO",
	},
	{
		value: "94",
		name: "Urgent giro",
		description:
			"Ordering customer tells the bank to use the bank service 'Urgent Giro' when transferring the payment. Used in Finnish national banking system.",
		key: "URGENT_GIRO",
	},
	{
		value: "95",
		name: "Free format giro",
		description:
			"Ordering customer tells the ordering bank to use the bank service 'Free Format Giro' when transferring the payment. Used in Finnish national banking system.",
		key: "FREE_FORMAT_GIRO",
	},
	{
		value: "96",
		name: "Requested method for payment was not used",
		description:
			"If the requested method for payment was or could not be used, this code indicates that.",
		key: "REQUESTED_METHOD_FOR_PAYMENT_WAS_NOT_USED",
	},
	{
		value: "97",
		name: "Clearing between partners",
		description:
			"Amounts which two partners owe to each other to be compensated in order to avoid useless payments.",
		key: "CLEARING_BETWEEN_PARTNERS",
	},
	{
		value: "ZZZ",
		name: "Mutually defined",
		description:
			"A code assigned within a code list to be used on an interim basis and as defined among trading partners until a precise code can be assigned to the code list.",
		key: "MUTUALLY_DEFINED",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		untdid4461: typeof untdid4461;
	}
}
registerCodelist("untdid4461", untdid4461);

export default untdid4461;
