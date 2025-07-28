/**
 * @see https://service.unece.org/trade/untdid/d99b/tred/tred1229.htm
 */

import { createEnum } from "..";

export type Untdid1229Definition = {
	key: string;
	code: string;
	name?: string;
	description?: string;
};

export type Untdid1229Code = (typeof UNTDID_1229)[number]["code"];

export const UNTDID_1229_IDENTIFIER = "untdid.1229" as const;

export const UNTDID_1229 = [
	{
		key: "ADDED",
		name: "Added",
		code: "1",
		description: "The information is to be or has been added.",
	},
	{
		key: "DELETED",
		name: "Deleted",
		code: "2",
		description: "The information is to be or has been deleted.",
	},
	{
		key: "CHANGED",
		name: "Changed",
		code: "3",
		description: "The information is to be or has been changed.",
	},
	{
		key: "NO_ACTION",
		name: "No action",
		code: "4",
		description: "This line item is not affected by the actual message.",
	},
	{
		key: "ACCEPTED_WITHOUT_AMENDMENT",
		name: "Accepted without amendment",
		code: "5",
		description: "This line item is entirely accepted by the seller.",
	},
	{
		key: "ACCEPTED_WITH_AMENDMENT",
		name: "Accepted with amendment",
		code: "6",
		description: "This line item is accepted but amended by the seller.",
	},
	{
		key: "NOT_ACCEPTED",
		name: "Not accepted",
		code: "7",
		description: "This line item is not accepted by the seller.",
	},
	{
		key: "SCHEDULE_ONLY",
		name: "Schedule only",
		code: "8",
		description: "Self explanatory.",
	},
	{
		key: "AMENDMENTS",
		name: "Amendments",
		code: "9",
		description: "Self explanatory.",
	},
	{
		key: "NOT_FOUND",
		name: "Not found",
		code: "10",
		description: "This line item is not found in the referenced message.",
	},
	{
		key: "NOT_AMENDED",
		name: "Not amended",
		code: "11",
		description: "This line is not amended by the buyer.",
	},
	{
		key: "LINE_ITEM_NUMBERS_CHANGED",
		name: "Line item numbers changed",
		code: "12",
		description: "Self explanatory.",
	},
	{
		key: "BUYER_HAS_DEDUCTED_AMOUNT",
		name: "Buyer has deducted amount",
		code: "13",
		description: "Buyer has deducted amount from payment.",
	},
	{
		key: "BUYER_CLAIMS_AGAINST_INVOICE",
		name: "Buyer claims against invoice",
		code: "14",
		description: "Buyer has a claim against an outstanding invoice.",
	},
	{
		key: "CHARGE_BACK_BY_SELLER",
		name: "Charge back by seller",
		code: "15",
		description:
			"Factor has been requested to charge back the outstanding item.",
	},
	{
		key: "SELLER_WILL_ISSUE_CREDIT_NOTE",
		name: "Seller will issue credit note",
		code: "16",
		description: "Seller agrees to issue a credit note.",
	},
	{
		key: "TERMS_CHANGED_FOR_NEW_TERMS",
		name: "Terms changed for new terms",
		code: "17",
		description: "New settlement terms have been agreed.",
	},
	{
		key: "ABIDE_OUTCOME_OF_NEGOTIATIONS",
		name: "Abide outcome of negotiations",
		code: "18",
		description:
			"Factor agrees to abide by the outcome of negotiations between seller and buyer.",
	},
	{
		key: "SELLER_REJECTS_DISPUTE",
		name: "Seller rejects dispute",
		code: "19",
		description: "Seller does not accept validity of dispute.",
	},
	{
		key: "SETTLEMENT",
		name: "Settlement",
		code: "20",
		description: "The reported situation is settled.",
	},
	{
		key: "NO_DELIVERY",
		name: "No delivery",
		code: "21",
		description: "Code indicating that no delivery will be required.",
	},
	{
		key: "CALL_OFF_DELIVERY",
		name: "Call-off delivery",
		code: "22",
		description:
			"A request for delivery of a particular quantity of goods to be delivered on a particular date (or within a particular period).",
	},
	{
		key: "PROPOSED_AMENDMENT",
		name: "Proposed amendment",
		code: "23",
		description:
			"A code used to indicate an amendment suggested by the sender.",
	},
	{
		key: "ACCEPTED_WITH_AMENDMENT_NO_CONFIRMATION_REQUIRED",
		name: "Accepted with amendment, no confirmation required",
		code: "24",
		description: "Accepted with changes which require no confirmation.",
	},
	{
		key: "INCLUDED",
		name: "Included",
		code: "26",
		description: "Code indicating that the entity is included.",
	},
	{
		key: "UPON_RECEIPT_AND_VERIFICATION_OF_DOCUMENTS_WE_SHALL_COVER_YOU_WHEN_DUE_AS_PER_YOUR_INSTRUCTIONS",
		name: "Upon receipt and verification of documents we shall cover you when due as per your instructions",
		code: "27",
		description:
			"Upon receipt and verification of documents we shall cover you when due as per your instructions.",
	},
	{
		key: "UPON_RECEIPT_AND_VERIFICATION_OF_DOCUMENTS_WE_SHALL_AUTHORIZE_YOU_TO_DEBIT_OUR_ACCOUNT_WITH_YOU_WHEN_DUE",
		name: "Upon receipt and verification of documents we shall authorize you to debit our account with you when due",
		code: "28",
		description:
			"Upon receipt and verification of documents we shall authorize you to debit our account with you when due.",
	},
	{
		key: "ON_RECEIPT_OF_YOUR_AUTHENTICATED_ADVICE_WE_SHALL_COVER_YOU_WHEN_DUE_AS_PER_YOUR_INSTRUCTIONS",
		name: "On receipt of your authenticated advice we shall cover you when due as per your instructions",
		code: "29",
		description:
			"On receipt of your authenticated advice we shall cover you when due as per your instructions.",
	},
	{
		key: "ON_RECEIPT_OF_YOUR_AUTHENTICATED_ADVICE_WE_SHALL_AUTHORIZE_YOU_TO_DEBIT_OUR_ACCOUNT_WITH_YOU_WHEN_DUE",
		name: "On receipt of your authenticated advice we shall authorize you to debit our account with you when due",
		code: "30",
		description:
			"On receipt of your authenticated advice we shall authorize you to debit our account with you when due.",
	},
	{
		key: "ON_RECEIPT_OF_YOUR_AUTHENTICATED_ADVICE_WE_SHALL_CREDIT_YOUR_ACCOUNT_WITH_US_WHEN_DUE",
		name: "On receipt of your authenticated advice we shall credit your account with us when due",
		code: "31",
		description:
			"On receipt of your authenticated advice we shall credit your account with us when due.",
	},
	{
		key: "CREDIT_ADVICE_REQUESTED_FOR_DIRECT_DEBIT",
		name: "Credit advice requested for direct debit",
		code: "32",
		description: "A credit advice is requested for the direct debit.",
	},
	{
		key: "CREDIT_ADVICE_AND_ACKNOWLEDGEMENT_FOR_DIRECT_DEBIT",
		name: "Credit advice and acknowledgement for direct debit",
		code: "33",
		description:
			"A credit advice and acknowledgement are requested for the direct debit.",
	},
	{
		key: "INQUIRY",
		name: "Inquiry",
		code: "34",
		description: "Request for information.",
	},
	{
		key: "CHECKED",
		name: "Checked",
		code: "35",
		description: "Checked.",
	},
	{
		key: "NOT_CHECKED",
		name: "Not checked",
		code: "36",
		description: "Not checked.",
	},
	{
		key: "CANCELLED",
		name: "Cancelled",
		code: "37",
		description: "Discontinued.",
	},
	{
		key: "REPLACED",
		name: "Replaced",
		code: "38",
		description: "Provide a replacement.",
	},
	{
		key: "NEW",
		name: "New",
		code: "39",
		description: "Not existing before.",
	},
	{
		key: "AGREED",
		name: "Agreed",
		code: "40",
		description: "Consent.",
	},
	{
		key: "PROPOSED",
		name: "Proposed",
		code: "41",
		description: "Put forward for consideration.",
	},
	{
		key: "ALREADY_DELIVERED",
		name: "Already delivered",
		code: "42",
		description: "Delivery has taken place.",
	},
	{
		key: "ADDITIONAL_SUBORDINATE_STRUCTURES_WILL_FOLLOW",
		name: "Additional subordinate structures will follow",
		code: "43",
		description:
			"Additional subordinate structures will follow the current hierarchy level.",
	},
	{
		key: "ADDITIONAL_SUBORDINATE_STRUCTURES_WILL_NOT_FOLLOW",
		name: "Additional subordinate structures will not follow",
		code: "44",
		description:
			"No additional subordinate structures will follow the current hierarchy level.",
	},
	{
		key: "RESULT_OPPOSED",
		name: "Result opposed",
		code: "45",
		description: "A notification that the result is opposed.",
	},
	{
		key: "AUCTION_HELD",
		name: "Auction held",
		code: "46",
		description: "A notification that an auction was held.",
	},
	{
		key: "LEGAL_ACTION_PURSUED",
		name: "Legal action pursued",
		code: "47",
		description: "A notification that legal action has been pursued.",
	},
	{
		key: "MEETING_HELD",
		name: "Meeting held",
		code: "48",
		description: "A notification that a meeting was held.",
	},
	{
		key: "RESULT_SET_ASIDE",
		name: "Result set aside",
		code: "49",
		description: "A notification that the result has been set aside.",
	},
	{
		key: "RESULT_DISPUTED",
		name: "Result disputed",
		code: "50",
		description: "A notification that the result has been disputed.",
	},
	{
		key: "COUNTERSUED",
		name: "Countersued",
		code: "51",
		description: "A notification that a countersuit has been filed.",
	},
	{
		key: "PENDING",
		name: "Pending",
		code: "52",
		description: "A notification that an action is awaiting settlement.",
	},
	{
		key: "COURT_ACTION_DISMISSED",
		name: "Court action dismissed",
		code: "53",
		description: "A notification that a court action will no longer be heard.",
	},
	{
		key: "REFERRED_ITEM_ACCEPTED",
		name: "Referred item, accepted",
		code: "54",
		description: "The item being referred to has been accepted.",
	},
	{
		key: "REFERRED_ITEM_REJECTED",
		name: "Referred item, rejected",
		code: "55",
		description: "The item being referred to has been rejected.",
	},
	{
		key: "DEBIT_ADVICE_STATEMENT_LINE",
		name: "Debit advice statement line",
		code: "56",
		description: "Notification that the statement line is a debit advice.",
	},
	{
		key: "CREDIT_ADVICE_STATEMENT_LINE",
		name: "Credit advice statement line",
		code: "57",
		description: "Notification that the statement line is a credit advice.",
	},
	{
		key: "GROUPED_CREDIT_ADVICES",
		name: "Grouped credit advices",
		code: "58",
		description: "Notification that the credit advices are grouped.",
	},
	{
		key: "GROUPED_DEBIT_ADVICES",
		name: "Grouped debit advices",
		code: "59",
		description: "Notification that the debit advices are grouped.",
	},
	{
		key: "REGISTERED",
		name: "Registered",
		code: "60",
		description: "The name is registered.",
	},
	{
		key: "PAYMENT_DENIED",
		name: "Payment denied",
		code: "61",
		description: "The payment has been denied.",
	},
	{
		key: "APPROVED_AS_AMENDED",
		name: "Approved as amended",
		code: "62",
		description: "Approved with modifications.",
	},
	{
		key: "APPROVED_AS_SUBMITTED",
		name: "Approved as submitted",
		code: "63",
		description: "The request has been approved as submitted.",
	},
	{
		key: "CANCELLED_NO_ACTIVITY",
		name: "Cancelled, no activity",
		code: "64",
		description: "Cancelled due to the lack of activity.",
	},
	{
		key: "UNDER_INVESTIGATION",
		name: "Under investigation",
		code: "65",
		description: "Investigation is being done.",
	},
	{
		key: "INITIAL_CLAIM_RECEIVED",
		name: "Initial claim received",
		code: "66",
		description: "Notification that the initial claim was received.",
	},
	{
		key: "NOT_IN_PROCESS",
		name: "Not in process",
		code: "67",
		description: "Not in process.",
	},
	{
		key: "REJECTED_DUPLICATE",
		name: "Rejected, duplicate",
		code: "68",
		description: "Rejected because it is a duplicate.",
	},
	{
		key: "REJECTED_RESUBMIT_WITH_CORRECTIONS",
		name: "Rejected, resubmit with corrections",
		code: "69",
		description: "Rejected but may be resubmitted when corrected.",
	},
	{
		key: "PENDING_INCOMPLETE",
		name: "Pending, incomplete",
		code: "70",
		description: "Pending because of incomplete information.",
	},
	{
		key: "UNDER_FIELD_OFFICE_INVESTIGATION",
		name: "Under field office investigation",
		code: "71",
		description: "Investigation by the field is being done.",
	},
	{
		key: "PENDING_AWAITING_ADDITIONAL_MATERIAL",
		name: "Pending, awaiting additional material",
		code: "72",
		description: "Pending awaiting receipt of additional material.",
	},
	{
		key: "PENDING_AWAITING_REVIEW",
		name: "Pending, awaiting review",
		code: "73",
		description: "Pending while awaiting review.",
	},
	{
		key: "REOPENED",
		name: "Reopened",
		code: "74",
		description: "Opened again.",
	},
	{
		key: "PROCESSED_BY_PRIMARY_FORWARDED_TO_ADDITIONAL_PAYERS",
		name: "Processed by primary, forwarded to additional payer(s)",
		code: "75",
		description:
			"This request has been processed by the primary payer and sent to additional payer(s).",
	},
	{
		key: "PROCESSED_BY_SECONDARY_FORWARDED_TO_ADDITIONAL_PAYERS",
		name: "Processed by secondary, forwarded to additional payer(s)",
		code: "76",
		description:
			"This request has been processed by the secondary payer and sent to additional payer(s).",
	},
	{
		key: "PROCESSED_BY_TERTIARY_FORWARDED_TO_ADDITIONAL_PAYERS",
		name: "Processed by tertiary, forwarded to additional payer(s)",
		code: "77",
		description:
			"This request has been processed by the tertiary payer and sent to additional payer(s).",
	},
	{
		key: "PREVIOUS_PAYMENT_DECISION_REVERSED",
		name: "Previous payment decision reversed",
		code: "78",
		description: "A previous payment decision has been reversed.",
	},
	{
		key: "NOT_OUR_CLAIM_FORWARDED_TO_ANOTHER_PAYERS",
		name: "Not our claim, forwarded to another payer(s)",
		code: "79",
		description:
			"A request does not belong to this payer but has been forwarded to another payer(s).",
	},
	{
		key: "TRANSFERRED_TO_CORRECT_INSURANCE_CARRIER",
		name: "Transferred to correct insurance carrier",
		code: "80",
		description:
			"The request has been transferred to the correct insurance carrier for processing.",
	},
	{
		key: "NOT_PAID_PREDETERMINATION_PRICING_ONLY",
		name: "Not paid, predetermination pricing only",
		code: "81",
		description:
			"Payment has not been made and the enclosed response is predetermination pricing only.",
	},
	{
		key: "DOCUMENTATION_CLAIM",
		name: "Documentation claim",
		code: "82",
		description:
			"The claim is for documentation purposes only, no payment required.",
	},
	{
		key: "REVIEWED",
		name: "Reviewed",
		code: "83",
		description: "Assessed.",
	},
	{
		key: "REPRICED",
		name: "Repriced",
		code: "84",
		description: "This price was changed.",
	},
	{
		key: "AUDITED",
		name: "Audited",
		code: "85",
		description: "An official examination has occurred.",
	},
	{
		key: "CONDITIONALLY_PAID",
		name: "Conditionally paid",
		code: "86",
		description: "Payment has been conditionally made.",
	},
	{
		key: "ON_APPEAL",
		name: "On appeal",
		code: "87",
		description: "Reconsideration of the decision has been applied for.",
	},
	{
		key: "CLOSED",
		name: "Closed",
		code: "88",
		description: "Shut.",
	},
	{
		key: "REAUDITED",
		name: "Reaudited",
		code: "89",
		description: "A subsequent official examination has occurred.",
	},
	{
		key: "REISSUED",
		name: "Reissued",
		code: "90",
		description: "Issued again.",
	},
	{
		key: "CLOSED_AFTER_REOPENING",
		name: "Closed after reopening",
		code: "91",
		description: "Reopened and then closed.",
	},
	{
		key: "REDETERMINED",
		name: "Redetermined",
		code: "92",
		description: "Determined again or differently.",
	},
	{
		key: "PROCESSED_AS_PRIMARY",
		name: "Processed as primary",
		code: "93",
		description: "Processed as the first.",
	},
	{
		key: "PROCESSED_AS_SECONDARY",
		name: "Processed as secondary",
		code: "94",
		description: "Processed as the second.",
	},
	{
		key: "PROCESSED_AS_TERTIARY",
		name: "Processed as tertiary",
		code: "95",
		description: "Processed as the third.",
	},
	{
		key: "CORRECTION_OF_ERROR",
		name: "Correction of error",
		code: "96",
		description:
			"A correction to information previously communicated which contained an error.",
	},
	{
		key: "SINGLE_CREDIT_ITEM_OF_A_GROUP",
		name: "Single credit item of a group",
		code: "97",
		description:
			"Notification that the credit item is a single credit item of a group of credit items.",
	},
	{
		key: "SINGLE_DEBIT_ITEM_OF_A_GROUP",
		name: "Single debit item of a group",
		code: "98",
		description:
			"Notification that the debit item is a single debit item of a group of debit items.",
	},
	{
		key: "INTERIM_RESPONSE",
		name: "Interim response",
		code: "99",
		description: "The response is an interim one.",
	},
	{
		key: "FINAL_RESPONSE",
		name: "Final response",
		code: "100",
		description: "The response is an final one.",
	},
	{
		key: "DEBIT_ADVICE_REQUESTED",
		name: "Debit advice requested",
		code: "101",
		description: "A debit advice is requested for the transaction.",
	},
	{
		key: "TRANSACTION_NOT_IMPACTED",
		name: "Transaction not impacted",
		code: "102",
		description: "Advice that the transaction is not impacted.",
	},
] as const satisfies Untdid1229Definition[];

export const Untdid1229 = createEnum(UNTDID_1229, {
	keyProp: "key",
	valueProp: "code",
});
