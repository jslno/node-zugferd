import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const lineStatus = [
	{
		value: "1",
		name: "Added",
		description: "The information is to be or has been added.",
		key: "ADDED",
	},
	{
		value: "2",
		name: "Deleted",
		description: "The information is to be or has been deleted.",
		key: "DELETED",
	},
	{
		value: "3",
		name: "Changed",
		description: "The information is to be or has been changed.",
		key: "CHANGED",
	},
	{
		value: "4",
		name: "No action",
		description: "This line item is not affected by the actual message.",
		key: "NO_ACTION",
	},
	{
		value: "5",
		name: "Accepted without amendment",
		description: "This line item is entirely accepted by the seller.",
		key: "ACCEPTED_WITHOUT_AMENDMENT",
	},
	{
		value: "6",
		name: "Accepted with amendment",
		description: "This line item is accepted but amended by the seller.",
		key: "ACCEPTED_WITH_AMENDMENT",
	},
	{
		value: "7",
		name: "Not accepted",
		description: "This line item is not accepted by the seller.",
		key: "NOT_ACCEPTED",
	},
	{
		value: "8",
		name: "Schedule only",
		description: "Code specifying that the message is a schedule only.",
		key: "SCHEDULE_ONLY",
	},
	{
		value: "9",
		name: "Amendments",
		description: "Code specifying that amendments are requested/notified.",
		key: "AMENDMENTS",
	},
	{
		value: "10",
		name: "Not found",
		description: "This line item is not found in the referenced message.",
		key: "NOT_FOUND",
	},
	{
		value: "11",
		name: "Not amended",
		description: "This line is not amended by the buyer.",
		key: "NOT_AMENDED",
	},
	{
		value: "12",
		name: "Line item numbers changed",
		description: "Code specifying that the line item numbers have changed.",
		key: "LINE_ITEM_NUMBERS_CHANGED",
	},
	{
		value: "13",
		name: "Buyer has deducted amount",
		description: "Buyer has deducted amount from payment.",
		key: "BUYER_HAS_DEDUCTED_AMOUNT",
	},
	{
		value: "14",
		name: "Buyer claims against invoice",
		description: "Buyer has a claim against an outstanding invoice.",
		key: "BUYER_CLAIMS_AGAINST_INVOICE",
	},
	{
		value: "15",
		name: "Charge back by seller",
		description:
			"Factor has been requested to charge back the outstanding item.",
		key: "CHARGE_BACK_BY_SELLER",
	},
	{
		value: "16",
		name: "Seller will issue credit note",
		description: "Seller agrees to issue a credit note.",
		key: "SELLER_WILL_ISSUE_CREDIT_NOTE",
	},
	{
		value: "17",
		name: "Terms changed for new terms",
		description: "New settlement terms have been agreed.",
		key: "TERMS_CHANGED_FOR_NEW_TERMS",
	},
	{
		value: "18",
		name: "Abide outcome of negotiations",
		description:
			"Factor agrees to abide by the outcome of negotiations between seller and buyer.",
		key: "ABIDE_OUTCOME_OF_NEGOTIATIONS",
	},
	{
		value: "19",
		name: "Seller rejects dispute",
		description: "Seller does not accept validity of dispute.",
		key: "SELLER_REJECTS_DISPUTE",
	},
	{
		value: "20",
		name: "Settlement",
		description: "The reported situation is settled.",
		key: "SETTLEMENT",
	},
	{
		value: "21",
		name: "No delivery",
		description: "Code indicating that no delivery will be required.",
		key: "NO_DELIVERY",
	},
	{
		value: "22",
		name: "Call-off delivery",
		description:
			"A request for delivery of a particular quantity of goods to be delivered on a particular date (or within a particular period).",
		key: "CALL_OFF_DELIVERY",
	},
	{
		value: "23",
		name: "Proposed amendment",
		description:
			"A code used to indicate an amendment suggested by the sender.",
		key: "PROPOSED_AMENDMENT",
	},
	{
		value: "24",
		name: "Accepted with amendment, no confirmation required",
		description: "Accepted with changes which require no confirmation.",
		key: "ACCEPTED_WITH_AMENDMENT_NO_CONFIRMATION_REQUIRED",
	},
	{
		value: "25",
		name: "Equipment provisionally repaired",
		description: "The equipment or component has been provisionally repaired.",
		key: "EQUIPMENT_PROVISIONALLY_REPAIRED",
	},
	{
		value: "26",
		name: "Included",
		description: "Code indicating that the entity is included.",
		key: "INCLUDED",
	},
	{
		value: "27",
		name: "Upon receipt and verification of documents we shall cover you when due as per your instructions",
		description:
			"Upon receipt and verification of documents we shall cover you when due as per your instructions.",
		key: "UPON_RECEIPT_AND_VERIFICATION_OF_DOCUMENTS_WE_SHALL_COVER_YOU_WHEN_DUE_AS_PER_YOUR_INSTRUCTIONS",
	},
	{
		value: "28",
		name: "Upon receipt and verification of documents we shall authorize you to debit our account with you when due",
		description:
			"Upon receipt and verification of documents we shall authorize you to debit our account with you when due.",
		key: "UPON_RECEIPT_AND_VERIFICATION_OF_DOCUMENTS_WE_SHALL_AUTHORIZE_YOU_TO_DEBIT_OUR_ACCOUNT_WITH_YOU_WHEN_DUE",
	},
	{
		value: "29",
		name: "On receipt of your authenticated advice we shall cover you when due as per your instructions",
		description:
			"On receipt of your authenticated advice we shall cover you when due as per your instructions.",
		key: "ON_RECEIPT_OF_YOUR_AUTHENTICATED_ADVICE_WE_SHALL_COVER_YOU_WHEN_DUE_AS_PER_YOUR_INSTRUCTIONS",
	},
	{
		value: "30",
		name: "On receipt of your authenticated advice we shall authorize you to debit our account with you when due",
		description:
			"On receipt of your authenticated advice we shall authorize you to debit our account with you when due.",
		key: "ON_RECEIPT_OF_YOUR_AUTHENTICATED_ADVICE_WE_SHALL_AUTHORIZE_YOU_TO_DEBIT_OUR_ACCOUNT_WITH_YOU_WHEN_DUE",
	},
	{
		value: "31",
		name: "On receipt of your authenticated advice we shall credit your account with us when due",
		description:
			"On receipt of your authenticated advice we shall credit your account with us when due.",
		key: "ON_RECEIPT_OF_YOUR_AUTHENTICATED_ADVICE_WE_SHALL_CREDIT_YOUR_ACCOUNT_WITH_US_WHEN_DUE",
	},
	{
		value: "32",
		name: "Credit advice requested for direct debit",
		description: "A credit advice is requested for the direct debit.",
		key: "CREDIT_ADVICE_REQUESTED_FOR_DIRECT_DEBIT",
	},
	{
		value: "33",
		name: "Credit advice and acknowledgement for direct debit",
		description:
			"A credit advice and acknowledgement are requested for the direct debit.",
		key: "CREDIT_ADVICE_AND_ACKNOWLEDGEMENT_FOR_DIRECT_DEBIT",
	},
	{
		value: "34",
		name: "Inquiry",
		description: "Request for information.",
		key: "INQUIRY",
	},
	{ value: "35", name: "Checked", description: "Checked.", key: "CHECKED" },
	{
		value: "36",
		name: "Not checked",
		description: "Not checked.",
		key: "NOT_CHECKED",
	},
	{
		value: "37",
		name: "Cancelled",
		description: "Discontinued.",
		key: "CANCELLED",
	},
	{
		value: "38",
		name: "Replaced",
		description: "Provide a replacement.",
		key: "REPLACED",
	},
	{ value: "39", name: "New", description: "Not existing before.", key: "NEW" },
	{ value: "40", name: "Agreed", description: "Consent.", key: "AGREED" },
	{
		value: "41",
		name: "Proposed",
		description: "Put forward for consideration.",
		key: "PROPOSED",
	},
	{
		value: "42",
		name: "Already delivered",
		description: "Delivery has taken place.",
		key: "ALREADY_DELIVERED",
	},
	{
		value: "43",
		name: "Additional subordinate structures will follow",
		description:
			"Additional subordinate structures will follow the current hierarchy level.",
		key: "ADDITIONAL_SUBORDINATE_STRUCTURES_WILL_FOLLOW",
	},
	{
		value: "44",
		name: "Additional subordinate structures will not follow",
		description:
			"No additional subordinate structures will follow the current hierarchy level.",
		key: "ADDITIONAL_SUBORDINATE_STRUCTURES_WILL_NOT_FOLLOW",
	},
	{
		value: "45",
		name: "Result opposed",
		description: "A notification that the result is opposed.",
		key: "RESULT_OPPOSED",
	},
	{
		value: "46",
		name: "Auction held",
		description: "A notification that an auction was held.",
		key: "AUCTION_HELD",
	},
	{
		value: "47",
		name: "Legal action pursued",
		description: "A notification that legal action has been pursued.",
		key: "LEGAL_ACTION_PURSUED",
	},
	{
		value: "48",
		name: "Meeting held",
		description: "A notification that a meeting was held.",
		key: "MEETING_HELD",
	},
	{
		value: "49",
		name: "Result set aside",
		description: "A notification that the result has been set aside.",
		key: "RESULT_SET_ASIDE",
	},
	{
		value: "50",
		name: "Result disputed",
		description: "A notification that the result has been disputed.",
		key: "RESULT_DISPUTED",
	},
	{
		value: "51",
		name: "Countersued",
		description: "A notification that a countersuit has been filed.",
		key: "COUNTERSUED",
	},
	{
		value: "52",
		name: "Pending",
		description: "A notification that an action is awaiting settlement.",
		key: "PENDING",
	},
	{
		value: "53",
		name: "Court action dismissed",
		description: "A notification that a court action will no longer be heard.",
		key: "COURT_ACTION_DISMISSED",
	},
	{
		value: "54",
		name: "Referred item, accepted",
		description: "The item being referred to has been accepted.",
		key: "REFERRED_ITEM_ACCEPTED",
	},
	{
		value: "55",
		name: "Referred item, rejected",
		description: "The item being referred to has been rejected.",
		key: "REFERRED_ITEM_REJECTED",
	},
	{
		value: "56",
		name: "Debit advice statement line",
		description: "Notification that the statement line is a debit advice.",
		key: "DEBIT_ADVICE_STATEMENT_LINE",
	},
	{
		value: "57",
		name: "Credit advice statement line",
		description: "Notification that the statement line is a credit advice.",
		key: "CREDIT_ADVICE_STATEMENT_LINE",
	},
	{
		value: "58",
		name: "Grouped credit advices",
		description: "Notification that the credit advices are grouped.",
		key: "GROUPED_CREDIT_ADVICES",
	},
	{
		value: "59",
		name: "Grouped debit advices",
		description: "Notification that the debit advices are grouped.",
		key: "GROUPED_DEBIT_ADVICES",
	},
	{
		value: "60",
		name: "Registered",
		description: "The name is registered.",
		key: "REGISTERED",
	},
	{
		value: "61",
		name: "Payment denied",
		description: "The payment has been denied.",
		key: "PAYMENT_DENIED",
	},
	{
		value: "62",
		name: "Approved as amended",
		description: "Approved with modifications.",
		key: "APPROVED_AS_AMENDED",
	},
	{
		value: "63",
		name: "Approved as submitted",
		description: "The request has been approved as submitted.",
		key: "APPROVED_AS_SUBMITTED",
	},
	{
		value: "64",
		name: "Cancelled, no activity",
		description: "Cancelled due to the lack of activity.",
		key: "CANCELLED_NO_ACTIVITY",
	},
	{
		value: "65",
		name: "Under investigation",
		description: "Investigation is being done.",
		key: "UNDER_INVESTIGATION",
	},
	{
		value: "66",
		name: "Initial claim received",
		description: "Notification that the initial claim was received.",
		key: "INITIAL_CLAIM_RECEIVED",
	},
	{
		value: "67",
		name: "Not in process",
		description: "Not in process.",
		key: "NOT_IN_PROCESS",
	},
	{
		value: "68",
		name: "Rejected, duplicate",
		description: "Rejected because it is a duplicate.",
		key: "REJECTED_DUPLICATE",
	},
	{
		value: "69",
		name: "Rejected, resubmit with corrections",
		description: "Rejected but may be resubmitted when corrected.",
		key: "REJECTED_RESUBMIT_WITH_CORRECTIONS",
	},
	{
		value: "70",
		name: "Pending, incomplete",
		description: "Pending because of incomplete information.",
		key: "PENDING_INCOMPLETE",
	},
	{
		value: "71",
		name: "Under field office investigation",
		description: "Investigation by the field is being done.",
		key: "UNDER_FIELD_OFFICE_INVESTIGATION",
	},
	{
		value: "72",
		name: "Pending, awaiting additional material",
		description: "Pending awaiting receipt of additional material.",
		key: "PENDING_AWAITING_ADDITIONAL_MATERIAL",
	},
	{
		value: "73",
		name: "Pending, awaiting review",
		description: "Pending while awaiting review.",
		key: "PENDING_AWAITING_REVIEW",
	},
	{
		value: "74",
		name: "Reopened",
		description: "Opened again.",
		key: "REOPENED",
	},
	{
		value: "75",
		name: "Processed by primary, forwarded to additional payer(s)",
		description:
			"This request has been processed by the primary payer and sent to additional payer(s).",
		key: "PROCESSED_BY_PRIMARY_FORWARDED_TO_ADDITIONAL_PAYER_S",
	},
	{
		value: "76",
		name: "Processed by secondary, forwarded to additional payer(s)",
		description:
			"This request has been processed by the secondary payer and sent to additional payer(s).",
		key: "PROCESSED_BY_SECONDARY_FORWARDED_TO_ADDITIONAL_PAYER_S",
	},
	{
		value: "77",
		name: "Processed by tertiary, forwarded to additional payer(s)",
		description:
			"This request has been processed by the tertiary payer and sent to additional payer(s).",
		key: "PROCESSED_BY_TERTIARY_FORWARDED_TO_ADDITIONAL_PAYER_S",
	},
	{
		value: "78",
		name: "Previous payment decision reversed",
		description: "A previous payment decision has been reversed.",
		key: "PREVIOUS_PAYMENT_DECISION_REVERSED",
	},
	{
		value: "79",
		name: "Not our claim, forwarded to another payer(s)",
		description:
			"A request does not belong to this payer but has been forwarded to another payer(s).",
		key: "NOT_OUR_CLAIM_FORWARDED_TO_ANOTHER_PAYER_S",
	},
	{
		value: "80",
		name: "Transferred to correct insurance carrier",
		description:
			"The request has been transferred to the correct insurance carrier for processing.",
		key: "TRANSFERRED_TO_CORRECT_INSURANCE_CARRIER",
	},
	{
		value: "81",
		name: "Not paid, predetermination pricing only",
		description:
			"Payment has not been made and the enclosed response is predetermination pricing only.",
		key: "NOT_PAID_PREDETERMINATION_PRICING_ONLY",
	},
	{
		value: "82",
		name: "Documentation claim",
		description:
			"The claim is for documentation purposes only, no payment required.",
		key: "DOCUMENTATION_CLAIM",
	},
	{ value: "83", name: "Reviewed", description: "Assessed.", key: "REVIEWED" },
	{
		value: "84",
		name: "Repriced",
		description: "This price was changed.",
		key: "REPRICED",
	},
	{
		value: "85",
		name: "Audited",
		description: "An official examination has occurred.",
		key: "AUDITED",
	},
	{
		value: "86",
		name: "Conditionally paid",
		description: "Payment has been conditionally made.",
		key: "CONDITIONALLY_PAID",
	},
	{
		value: "87",
		name: "On appeal",
		description: "Reconsideration of the decision has been applied for.",
		key: "ON_APPEAL",
	},
	{ value: "88", name: "Closed", description: "Shut.", key: "CLOSED" },
	{
		value: "89",
		name: "Reaudited",
		description: "A subsequent official examination has occurred.",
		key: "REAUDITED",
	},
	{
		value: "90",
		name: "Reissued",
		description: "Issued again.",
		key: "REISSUED",
	},
	{
		value: "91",
		name: "Closed after reopening",
		description: "Reopened and then closed.",
		key: "CLOSED_AFTER_REOPENING",
	},
	{
		value: "92",
		name: "Redetermined",
		description: "Determined again or differently.",
		key: "REDETERMINED",
	},
	{
		value: "93",
		name: "Processed as primary",
		description: "Processed as the first.",
		key: "PROCESSED_AS_PRIMARY",
	},
	{
		value: "94",
		name: "Processed as secondary",
		description: "Processed as the second.",
		key: "PROCESSED_AS_SECONDARY",
	},
	{
		value: "95",
		name: "Processed as tertiary",
		description: "Processed as the third.",
		key: "PROCESSED_AS_TERTIARY",
	},
	{
		value: "96",
		name: "Correction of error",
		description:
			"A correction to information previously communicated which contained an error.",
		key: "CORRECTION_OF_ERROR",
	},
	{
		value: "97",
		name: "Single credit item of a group",
		description:
			"Notification that the credit item is a single credit item of a group of credit items.",
		key: "SINGLE_CREDIT_ITEM_OF_A_GROUP",
	},
	{
		value: "98",
		name: "Single debit item of a group",
		description:
			"Notification that the debit item is a single debit item of a group of debit items.",
		key: "SINGLE_DEBIT_ITEM_OF_A_GROUP",
	},
	{
		value: "99",
		name: "Interim response",
		description: "The response is an interim one.",
		key: "INTERIM_RESPONSE",
	},
	{
		value: "100",
		name: "Final response",
		description: "The response is an final one.",
		key: "FINAL_RESPONSE",
	},
	{
		value: "101",
		name: "Debit advice requested",
		description: "A debit advice is requested for the transaction.",
		key: "DEBIT_ADVICE_REQUESTED",
	},
	{
		value: "102",
		name: "Transaction not impacted",
		description: "Advice that the transaction is not impacted.",
		key: "TRANSACTION_NOT_IMPACTED",
	},
	{
		value: "103",
		name: "Patient to be notified",
		description: "The action to take is to notify the patient.",
		key: "PATIENT_TO_BE_NOTIFIED",
	},
	{
		value: "104",
		name: "Healthcare provider to be notified",
		description: "The action to take is to notify the healthcare provider.",
		key: "HEALTHCARE_PROVIDER_TO_BE_NOTIFIED",
	},
	{
		value: "105",
		name: "Usual general practitioner to be notified",
		description:
			"The action to take is to notify the usual general practitioner.",
		key: "USUAL_GENERAL_PRACTITIONER_TO_BE_NOTIFIED",
	},
	{
		value: "106",
		name: "Advice without details",
		description: "An advice without details is requested or notified.",
		key: "ADVICE_WITHOUT_DETAILS",
	},
	{
		value: "107",
		name: "Advice with details",
		description: "An advice with details is requested or notified.",
		key: "ADVICE_WITH_DETAILS",
	},
	{
		value: "108",
		name: "Amendment requested",
		description: "An amendment is requested.",
		key: "AMENDMENT_REQUESTED",
	},
	{
		value: "109",
		name: "For information",
		description: "Included for information only.",
		key: "FOR_INFORMATION",
	},
	{
		value: "110",
		name: "Withdraw",
		description: "A code indicating discontinuance or retraction.",
		key: "WITHDRAW",
	},
	{
		value: "111",
		name: "Delivery date change",
		description: "The action / notiification is a change of the delivery date.",
		key: "DELIVERY_DATE_CHANGE",
	},
	{
		value: "112",
		name: "Quantity change",
		description: "The action / notification is a change of quantity.",
		key: "QUANTITY_CHANGE",
	},
	{
		value: "113",
		name: "Resale and claim",
		description:
			"The identified items have been sold by the distributor to the end customer, and compensation for the loss of inventory value is claimed.",
		key: "RESALE_AND_CLAIM",
	},
	{
		value: "114",
		name: "Resale",
		description:
			"The identified items have been sold by the distributor to the end customer.",
		key: "RESALE",
	},
	{
		value: "115",
		name: "Prior addition",
		description:
			"This existing line item becomes available at an earlier date.",
		key: "PRIOR_ADDITION",
	},
	{
		value: "116",
		name: "Expired",
		description: "This line has expired.",
		key: "EXPIRED",
	},
	{
		value: "117",
		name: "Hold",
		description: "This line is on Hold.",
		key: "HOLD",
	},
	{
		value: "118",
		name: "Open",
		description: "This line is open.",
		key: "OPEN",
	},
	{
		value: "119",
		name: "Observe",
		description: "The object or item is to be or has been observed.",
		key: "OBSERVE",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		lineStatus: typeof lineStatus;
	}
}
registerCodelist("lineStatus", lineStatus);

export default lineStatus;
