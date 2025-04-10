/**
 * Generated by `scripts/untdid/update.js` on Wed, 19 Mar 2025 17:12:23 GMT
 * 
 * @see https://www.xrepository.de/details/urn:xoev-de:xrechnung:codeliste:untdid.4461
 */

export type Untdid4461Definition = {
	code: string;
	name?: string;
	description?: string;
};

export type Untdid4461Code = (typeof UNTDID_4461)[number]["code"];

export const UNTDID_4461_IDENTIFIER = "urn:xoev-de:xrechnung:codeliste:untdid.4461" as const;
export const UNTDID_4461_VERSION = "3" as const;

export const UNTDID_4461 = [
	{
		code: "1",
		name: "Instrument not defined",
		description:
			"Not defined legally enforceable agreement between two or more parties (expressing a contractual right or a right to the payment of money).",
	},
	{
		code: "2",
		name: "Automated clearing house credit",
		description:
			"A credit transaction made through the automated clearing house system.",
	},
	{
		code: "3",
		name: "Automated clearing house debit",
		description:
			"A debit transaction made through the automated clearing house system.",
	},
	{
		code: "4",
		name: "ACH demand debit reversal",
		description:
			"A request to reverse an ACH debit transaction to a demand deposit account.",
	},
	{
		code: "5",
		name: "ACH demand credit reversal",
		description:
			"A request to reverse a credit transaction to a demand deposit account.",
	},
	{
		code: "6",
		name: "ACH demand credit",
		description:
			"A credit transaction made through the ACH system to a demand deposit account.",
	},
	{
		code: "7",
		name: "ACH demand debit",
		description:
			"A debit transaction made through the ACH system to a demand deposit account.",
	},
	{
		code: "8",
		name: "Hold",
		description:
			"Indicates that the bank should hold the payment for collection by the beneficiary or other instructions.",
	},
	{
		code: "9",
		name: "National or regional clearing",
		description:
			"Indicates that the payment should be made using the national or regional clearing.",
	},
	{
		code: "10",
		name: "In cash",
		description:
			"Payment by currency (including bills and coins) in circulation, including checking account deposits.",
	},
	{
		code: "11",
		name: "ACH savings credit reversal",
		description:
			"A request to reverse an ACH credit transaction to a savings account.",
	},
	{
		code: "12",
		name: "ACH savings debit reversal",
		description:
			"A request to reverse an ACH debit transaction to a savings account.",
	},
	{
		code: "13",
		name: "ACH savings credit",
		description:
			"A credit transaction made through the ACH system to a savings account.",
	},
	{
		code: "14",
		name: "ACH savings debit",
		description:
			"A debit transaction made through the ACH system to a savings account.",
	},
	{
		code: "15",
		name: "Bookentry credit",
		description:
			"A credit entry between two accounts at the same bank branch. Synonym: house credit.",
	},
	{
		code: "16",
		name: "Bookentry debit",
		description:
			"A debit entry between two accounts at the same bank branch. Synonym: house debit.",
	},
	{
		code: "17",
		name: "ACH demand cash concentration/disbursement (CCD) credit",
		description:
			"A credit transaction made through the ACH system to a demand deposit account using the CCD payment format.",
	},
	{
		code: "18",
		name: "ACH demand cash concentration/disbursement (CCD) debit",
		description:
			"A debit transaction made through the ACH system to a demand deposit account using the CCD payment format.",
	},
	{
		code: "19",
		name: "ACH demand corporate trade payment (CTP) credit",
		description:
			"A credit transaction made through the ACH system to a demand deposit account using the CTP payment format.",
	},
	{
		code: "20",
		name: "Cheque",
		description:
			"Payment by a pre-printed form on which instructions are given to an account holder (a bank or building society) to pay a stated sum to a named recipient.",
	},
	{
		code: "21",
		name: "Banker's draft",
		description: "Issue of a banker's draft in payment of the funds.",
	},
	{
		code: "22",
		name: "Certified banker's draft",
		description:
			"Cheque drawn by a bank on itself or its agent. A person who owes money to another buys the draft from a bank for cash and hands it to the creditor who need have no fear that it might be dishonoured.",
	},
	{
		code: "23",
		name: "Bank cheque (issued by a banking or similar establishment)",
		description:
			"Payment by a pre-printed form, which has been completed by a financial institution, on which instructions are given to an account holder (a bank or building society) to pay a stated sum to a named recipient.",
	},
	{
		code: "24",
		name: "Bill of exchange awaiting acceptance",
		description:
			"Bill drawn by the creditor on the debtor but not yet accepted by the debtor.",
	},
	{
		code: "25",
		name: "Certified cheque",
		description:
			"Payment by a pre-printed form stamped with the paying bank's certification on which instructions are given to an account holder (a bank or building society) to pay a stated sum to a named recipient .",
	},
	{
		code: "26",
		name: "Local cheque",
		description: "Indicates that the cheque is given local to the recipient.",
	},
	{
		code: "27",
		name: "ACH demand corporate trade payment (CTP) debit",
		description:
			"A debit transaction made through the ACH system to a demand deposit account using the CTP payment format.",
	},
	{
		code: "28",
		name: "ACH demand corporate trade exchange (CTX) credit",
		description:
			"A credit transaction made through the ACH system to a demand deposit account using the CTX payment format.",
	},
	{
		code: "29",
		name: "ACH demand corporate trade exchange (CTX) debit",
		description:
			"A debit transaction made through the ACH system to a demand account using the CTX payment format.",
	},
	{
		code: "30",
		name: "Credit transfer",
		description:
			"Payment by credit movement of funds from one account to another.",
	},
	{
		code: "31",
		name: "Debit transfer",
		description:
			"Payment by debit movement of funds from one account to another.",
	},
	{
		code: "32",
		name: "ACH demand cash concentration/disbursement plus (CCD+) credit",
		description:
			"A credit transaction made through the ACH system to a demand deposit account using the CCD+ payment format.",
	},
	{
		code: "33",
		name: "ACH demand cash concentration/disbursement plus (CCD+) debit",
		description:
			"A debit transaction made through the ACH system to a demand deposit account using the CCD+ payment format.",
	},
	{
		code: "34",
		name: "ACH prearranged payment and deposit (PPD)",
		description:
			"A consumer credit transaction made through the ACH system to a demand deposit or savings account.",
	},
	{
		code: "35",
		name: "ACH savings cash concentration/disbursement (CCD) credit",
		description:
			"A credit transaction made through the ACH system to a demand deposit or savings account.",
	},
	{
		code: "36",
		name: "ACH savings cash concentration/disbursement (CCD) debit",
		description:
			"A debit transaction made through the ACH system to a savings account using the CCD payment format.",
	},
	{
		code: "37",
		name: "ACH savings corporate trade payment (CTP) credit",
		description:
			"A credit transaction made through the ACH system to a savings account using the CTP payment format.",
	},
	{
		code: "38",
		name: "ACH savings corporate trade payment (CTP) debit",
		description:
			"A debit transaction made through the ACH system to a savings account using the CTP payment format.",
	},
	{
		code: "39",
		name: "ACH savings corporate trade exchange (CTX) credit",
		description:
			"A credit transaction made through the ACH system to a savings account using the CTX payment format.",
	},
	{
		code: "40",
		name: "ACH savings corporate trade exchange (CTX) debit",
		description:
			"A debit transaction made through the ACH system to a savings account using the CTX payment format.",
	},
	{
		code: "41",
		name: "ACH savings cash concentration/disbursement plus (CCD+) credit",
		description:
			"A credit transaction made through the ACH system to a savings account using the CCD+ payment format.",
	},
	{
		code: "42",
		name: "Payment to bank account",
		description:
			"Payment by an arrangement for settling debts that is operated by the Post Office.",
	},
	{
		code: "43",
		name: "ACH savings cash concentration/disbursement plus (CCD+) debit",
		description:
			"A debit transaction made through the ACH system to a savings account using the CCD+ payment format.",
	},
	{
		code: "44",
		name: "Accepted bill of exchange",
		description:
			"Bill drawn by the creditor on the debtor and accepted by the debtor.",
	},
	{
		code: "45",
		name: "Referenced home-banking credit transfer",
		description: "A referenced credit transfer initiated through home-banking.",
	},
	{
		code: "46",
		name: "Interbank debit transfer",
		description: "A debit transfer via interbank means.",
	},
	{
		code: "47",
		name: "Home-banking debit transfer",
		description: "A debit transfer initiated through home-banking.",
	},
	{
		code: "48",
		name: "Bank card",
		description:
			"Payment by means of a card issued by a bank or other financial institution.",
	},
	{
		code: "49",
		name: "Direct debit",
		description:
			"The amount is to be, or has been, directly debited to the customer's bank account.",
	},
	{
		code: "50",
		name: "Payment by postgiro",
		description:
			"A method for the transmission of funds through the postal system rather than through the banking system.",
	},
	{
		code: "51",
		name:
			"FR, norme 6 97-Telereglement CFONB (French Organisation for Banking Standards) - Option A",
		description:
			"A French standard procedure that allows a debtor to pay an amount due to a creditor. The creditor will forward it to its bank, which will collect the money on the bank account of the debtor.",
	},
	{
		code: "52",
		name: "Urgent commercial payment",
		description:
			"Payment order which requires guaranteed processing by the most appropriate means to ensure it occurs on the requested execution date, provided that it is issued to the ordered bank before the agreed cut-off time.",
	},
	{
		code: "53",
		name: "Urgent Treasury Payment",
		description:
			"Payment order or transfer which must be executed, by the most appropriate means, as urgently as possible and before urgent commercial payments.",
	},
	{
		code: "54",
		name: "Credit card",
		description: "Payment made by means of credit card.",
	},
	{
		code: "55",
		name: "Debit card",
		description: "Payment made by means of debit card.",
	},
	{
		code: "56",
		name: "Bankgiro",
		description: "Payment will be, or has been, made by bankgiro.",
	},
	{
		code: "57",
		name: "Standing agreement",
		description:
			"The payment means have been previously agreed between seller and buyer and thus are not stated again.",
	},
	{
		code: "58",
		name: "SEPA credit transfer",
		description:
			"Credit transfer inside the Single Euro Payment Area (SEPA) system.",
	},
	{
		code: "59",
		name: "SEPA direct debit",
		description:
			"Direct debit inside the Single Euro Payment Area (SEPA) system.",
	},
	{
		code: "60",
		name: "Promissory note",
		description:
			"Payment by an unconditional promise in writing made by one person to another, signed by the maker, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
	},
	{
		code: "61",
		name: "Promissory note signed by the debtor",
		description:
			"Payment by an unconditional promise in writing made by the debtor to another person, signed by the debtor, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
	},
	{
		code: "62",
		name: "Promissory note signed by the debtor and endorsed by a bank",
		description:
			"Payment by an unconditional promise in writing made by the debtor to another person, signed by the debtor and endorsed by a bank, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
	},
	{
		code: "63",
		name: "Promissory note signed by the debtor and endorsed by a third party",
		description:
			"Payment by an unconditional promise in writing made by the debtor to another person, signed by the debtor and endorsed by a third party, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
	},
	{
		code: "64",
		name: "Promissory note signed by a bank",
		description:
			"Payment by an unconditional promise in writing made by the bank to another person, signed by the bank, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
	},
	{
		code: "65",
		name: "Promissory note signed by a bank and endorsed by another bank",
		description:
			"Payment by an unconditional promise in writing made by the bank to another person, signed by the bank and endorsed by another bank, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
	},
	{
		code: "66",
		name: "Promissory note signed by a third party",
		description:
			"Payment by an unconditional promise in writing made by a third party to another person, signed by the third party, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
	},
	{
		code: "67",
		name: "Promissory note signed by a third party and endorsed by a bank",
		description:
			"Payment by an unconditional promise in writing made by a third party to another person, signed by the third party and endorsed by a bank, engaging to pay on demand or at a fixed or determinable future time a sum certain in money, to order or to bearer.",
	},
	{
		code: "68",
		name: "Online payment service",
		description:
			"Payment will be made or has been made by an online payment service.",
	},
	{
		code: "69",
		name: "Transfer Advice",
		description:
			"Transfer of an amount of money in the books of the account servicer. An advice should be sent back to the account owner.",
	},
	{
		code: "70",
		name: "Bill drawn by the creditor on the debtor",
		description: "Bill drawn by the creditor on the debtor.",
	},
	{
		code: "74",
		name: "Bill drawn by the creditor on a bank",
		description: "Bill drawn by the creditor on a bank.",
	},
	{
		code: "75",
		name: "Bill drawn by the creditor, endorsed by another bank",
		description: "Bill drawn by the creditor, endorsed by another bank.",
	},
	{
		code: "76",
		name: "Bill drawn by the creditor on a bank and endorsed by a third party",
		description:
			"Bill drawn by the creditor on a bank and endorsed by a third party.",
	},
	{
		code: "77",
		name: "Bill drawn by the creditor on a third party",
		description: "Bill drawn by the creditor on a third party.",
	},
	{
		code: "78",
		name: "Bill drawn by creditor on third party, accepted and endorsed by bank",
		description:
			"Bill drawn by creditor on third party, accepted and endorsed by bank.",
	},
	{
		code: "91",
		name: "Not transferable banker's draft",
		description: "Issue a bankers draft not endorsable.",
	},
	{
		code: "92",
		name: "Not transferable local cheque",
		description: "Issue a cheque not endorsable in payment of the funds.",
	},
	{
		code: "93",
		name: "Reference giro",
		description:
			"Ordering customer tells the bank to use the payment system 'Reference giro'. Used in the Finnish national banking system.",
	},
	{
		code: "94",
		name: "Urgent giro",
		description:
			"Ordering customer tells the bank to use the bank service 'Urgent Giro' when transferring the payment. Used in Finnish national banking system.",
	},
	{
		code: "95",
		name: "Free format giro",
		description:
			"Ordering customer tells the ordering bank to use the bank service 'Free Format Giro' when transferring the payment. Used in Finnish national banking system.",
	},
	{
		code: "96",
		name: "Requested method for payment was not used",
		description:
			"If the requested method for payment was or could not be used, this code indicates that.",
	},
	{
		code: "97",
		name: "Clearing between partners",
		description:
			"Amounts which two partners owe to each other to be compensated in order to avoid useless payments.",
	},
	{
		code: "ZZZ",
		name: "Mutually defined",
		description:
			"A code assigned within a code list to be used on an interim basis and as defined among trading partners until a precise code can be assigned to the code list.",
	},
] as const satisfies Untdid4461Definition[];
