/**
 * @see https://service.unece.org/trade/untdid/d99b/tred/tred1229.htm
 */

export type Untdid1229Definition = {
	code: string;
	name?: string;
	description?: string;
};

export type Untdid1229Code = (typeof UNTDID_1229)[number]["code"];

export const UNTDID_1229_IDENTIFIER = "untdid.1229" as const;

export const UNTDID_1229 = [
	{
		code: "1",
		name: "Added",
		description: "The information is to be or has been added.",
	},
	{
		code: "2",
		name: "Deleted",
		description: "The information is to be or has been deleted.",
	},
	{
		code: "3",
		name: "Changed",
		description: "The information is to be or has been changed.",
	},
	{
		code: "4",
		name: "No action",
		description: "This line item is not affected by the actual message.",
	},
	{
		code: "5",
		name: "Accepted without amendment",
		description: "This line item is entirely accepted by the seller.",
	},
	{
		code: "6",
		name: "Accepted with amendment",
		description: "This line item is accepted but amended by the seller.",
	},
	{
		code: "7",
		name: "Not accepted",
		description: "This line item is not accepted by the seller.",
	},
	{
		code: "8",
		name: "Schedule only",
		description: "Self explanatory.",
	},
	{
		code: "9",
		name: "Amendments",
		description: "Self explanatory.",
	},
	{
		code: "10",
		name: "Not found",
		description: "This line item is not found in the referenced message.",
	},
	{
		code: "11",
		name: "Not amended",
		description: "This line is not amended by the buyer.",
	},
	{
		code: "12",
		name: "Line item numbers changed",
		description: "Self explanatory.",
	},
	{
		code: "13",
		name: "Buyer has deducted amount",
		description: "Buyer has deducted amount from payment.",
	},
	{
		code: "14",
		name: "Buyer claims against invoice",
		description: "Buyer has a claim against an outstanding invoice.",
	},
	{
		code: "15",
		name: "Charge back by seller",
		description:
			"Factor has been requested to charge back the outstanding item.",
	},
	{
		code: "16",
		name: "Seller will issue credit note",
		description: "Seller agrees to issue a credit note.",
	},
	{
		code: "17",
		name: "Terms changed for new terms",
		description: "New settlement terms have been agreed.",
	},
	{
		code: "18",
		name: "Abide outcome of negotiations",
		description:
			"Factor agrees to abide by the outcome of negotiations between seller and buyer.",
	},
	{
		code: "19",
		name: "Seller rejects dispute",
		description: "Seller does not accept validity of dispute.",
	},
	{
		code: "20",
		name: "Settlement",
		description: "The reported situation is settled.",
	},
	{
		code: "21",
		name: "No delivery",
		description: "Code indicating that no delivery will be required.",
	},
	{
		code: "22",
		name: "Call-off delivery",
		description:
			"A request for delivery of a particular quantity of goods to be delivered on a particular date (or within a particular period).",
	},
	{
		code: "23",
		name: "Proposed amendment",
		description:
			"A code used to indicate an amendment suggested by the sender.",
	},
	{
		code: "24",
		name: "Accepted with amendment, no confirmation required",
		description: "Accepted with changes which require no confirmation.",
	},
	{
		code: "26",
		name: "Included",
		description: "Code indicating that the entity is included.",
	},
	{
		code: "27",
		name: "Upon receipt and verification of documents we shall cover you when due as per your instructions",
		description:
			"Upon receipt and verification of documents we shall cover you when due as per your instructions.",
	},
	{
		code: "28",
		name: "Upon receipt and verification of documents we shall authorize you to debit our account with you when due",
		description:
			"Upon receipt and verification of documents we shall authorize you to debit our account with you when due.",
	},
	{
		code: "29",
		name: "On receipt of your authenticated advice we shall cover you when due as per your instructions",
		description:
			"On receipt of your authenticated advice we shall cover you when due as per your instructions.",
	},
	{
		code: "30",
		name: "On receipt of your authenticated advice we shall authorize you to debit our account with you when due",
		description:
			"On receipt of your authenticated advice we shall authorize you to debit our account with you when due.",
	},
	{
		code: "31",
		name: "On receipt of your authenticated advice we shall credit your account with us when due",
		description:
			"On receipt of your authenticated advice we shall credit your account with us when due.",
	},
	{
		code: "32",
		name: "Credit advice requested for direct debit",
		description: "A credit advice is requested for the direct debit.",
	},
	{
		code: "33",
		name: "Credit advice and acknowledgement for direct debit",
		description:
			"A credit advice and acknowledgement are requested for the direct debit.",
	},
	{
		code: "34",
		name: "Inquiry",
		description: "Request for information.",
	},
	{
		code: "35",
		name: "Checked",
		description: "Checked.",
	},
	{
		code: "36",
		name: "Not checked",
		description: "Not checked.",
	},
	{
		code: "37",
		name: "Cancelled",
		description: "Discontinued.",
	},
	{
		code: "38",
		name: "Replaced",
		description: "Provide a replacement.",
	},
	{
		code: "39",
		name: "New",
		description: "Not existing before.",
	},
	{
		code: "40",
		name: "Agreed",
		description: "Consent.",
	},
	{
		code: "41",
		name: "Proposed",
		description: "Put forward for consideration.",
	},
	{
		code: "42",
		name: "Already delivered",
		description: "Delivery has taken place.",
	},
	{
		code: "43",
		name: "Additional subordinate structures will follow",
		description:
			"Additional subordinate structures will follow the current hierarchy level.",
	},
	{
		code: "44",
		name: "Additional subordinate structures will not follow",
		description:
			"No additional subordinate structures will follow the current hierarchy level.",
	},
	{
		code: "45",
		name: "Result opposed",
		description: "A notification that the result is opposed.",
	},
	{
		code: "46",
		name: "Auction held",
		description: "A notification that an auction was held.",
	},
	{
		code: "47",
		name: "Legal action pursued",
		description: "A notification that legal action has been pursued.",
	},
	{
		code: "48",
		name: "Meeting held",
		description: "A notification that a meeting was held.",
	},
	{
		code: "49",
		name: "Result set aside",
		description: "A notification that the result has been set aside.",
	},
	{
		code: "50",
		name: "Result disputed",
		description: "A notification that the result has been disputed.",
	},
	{
		code: "51",
		name: "Countersued",
		description: "A notification that a countersuit has been filed.",
	},
	{
		code: "52",
		name: "Pending",
		description: "A notification that an action is awaiting settlement.",
	},
	{
		code: "53",
		name: "Court action dismissed",
		description: "A notification that a court action will no longer be heard.",
	},
	{
		code: "54",
		name: "Referred item, accepted",
		description: "The item being referred to has been accepted.",
	},
	{
		code: "55",
		name: "Referred item, rejected",
		description: "The item being referred to has been rejected.",
	},
	{
		code: "56",
		name: "Debit advice statement line",
		description: "Notification that the statement line is a debit advice.",
	},
	{
		code: "57",
		name: "Credit advice statement line",
		description: "Notification that the statement line is a credit advice.",
	},
	{
		code: "58",
		name: "Grouped credit advices",
		description: "Notification that the credit advices are grouped.",
	},
	{
		code: "59",
		name: "Grouped debit advices",
		description: "Notification that the debit advices are grouped.",
	},
	{
		code: "60",
		name: "Registered",
		description: "The name is registered.",
	},
	{
		code: "61",
		name: "Payment denied",
		description: "The payment has been denied.",
	},
	{
		code: "62",
		name: "Approved as amended",
		description: "Approved with modifications.",
	},
	{
		code: "63",
		name: "Approved as submitted",
		description: "The request has been approved as submitted.",
	},
	{
		code: "64",
		name: "Cancelled, no activity",
		description: "Cancelled due to the lack of activity.",
	},
	{
		code: "65",
		name: "Under investigation",
		description: "Investigation is being done.",
	},
	{
		code: "66",
		name: "Initial claim received",
		description: "Notification that the initial claim was received.",
	},
	{
		code: "67",
		name: "Not in process",
		description: "Not in process.",
	},
	{
		code: "68",
		name: "Rejected, duplicate",
		description: "Rejected because it is a duplicate.",
	},
	{
		code: "69",
		name: "Rejected, resubmit with corrections",
		description: "Rejected but may be resubmitted when corrected.",
	},
	{
		code: "70",
		name: "Pending, incomplete",
		description: "Pending because of incomplete information.",
	},
	{
		code: "71",
		name: "Under field office investigation",
		description: "Investigation by the field is being done.",
	},
	{
		code: "72",
		name: "Pending, awaiting additional material",
		description: "Pending awaiting receipt of additional material.",
	},
	{
		code: "73",
		name: "Pending, awaiting review",
		description: "Pending while awaiting review.",
	},
	{
		code: "74",
		name: "Reopened",
		description: "Opened again.",
	},
	{
		code: "75",
		name: "Processed by primary, forwarded to additional payer(s)",
		description:
			"This request has been processed by the primary payer and sent to additional payer(s).",
	},
	{
		code: "76",
		name: "Processed by secondary, forwarded to additional payer(s)",
		description:
			"This request has been processed by the secondary payer and sent to additional payer(s).",
	},
	{
		code: "77",
		name: "Processed by tertiary, forwarded to additional payer(s)",
		description:
			"This request has been processed by the tertiary payer and sent to additional payer(s).",
	},
	{
		code: "78",
		name: "Previous payment decision reversed",
		description: "A previous payment decision has been reversed.",
	},
	{
		code: "79",
		name: "Not our claim, forwarded to another payer(s)",
		description:
			"A request does not belong to this payer but has been forwarded to another payer(s).",
	},
	{
		code: "80",
		name: "Transferred to correct insurance carrier",
		description:
			"The request has been transferred to the correct insurance carrier for processing.",
	},
	{
		code: "81",
		name: "Not paid, predetermination pricing only",
		description:
			"Payment has not been made and the enclosed response is predetermination pricing only.",
	},
	{
		code: "82",
		name: "Documentation claim",
		description:
			"The claim is for documentation purposes only, no payment required.",
	},
	{
		code: "83",
		name: "Reviewed",
		description: "Assessed.",
	},
	{
		code: "84",
		name: "Repriced",
		description: "This price was changed.",
	},
	{
		code: "85",
		name: "Audited",
		description: "An official examination has occurred.",
	},
	{
		code: "86",
		name: "Conditionally paid",
		description: "Payment has been conditionally made.",
	},
	{
		code: "87",
		name: "On appeal",
		description: "Reconsideration of the decision has been applied for.",
	},
	{
		code: "88",
		name: "Closed",
		description: "Shut.",
	},
	{
		code: "89",
		name: "Reaudited",
		description: "A subsequent official examination has occurred.",
	},
	{
		code: "90",
		name: "Reissued",
		description: "Issued again.",
	},
	{
		code: "91",
		name: "Closed after reopening",
		description: "Reopened and then closed.",
	},
	{
		code: "92",
		name: "Redetermined",
		description: "Determined again or differently.",
	},
	{
		code: "93",
		name: "Processed as primary",
		description: "Processed as the first.",
	},
	{
		code: "94",
		name: "Processed as secondary",
		description: "Processed as the second.",
	},
	{
		code: "95",
		name: "Processed as tertiary",
		description: "Processed as the third.",
	},
	{
		code: "96",
		name: "Correction of error",
		description:
			"A correction to information previously communicated which contained an error.",
	},
	{
		code: "97",
		name: "Single credit item of a group",
		description:
			"Notification that the credit item is a single credit item of a group of credit items.",
	},
	{
		code: "98",
		name: "Single debit item of a group",
		description:
			"Notification that the debit item is a single debit item of a group of debit items.",
	},
	{
		code: "99",
		name: "Interim response",
		description: "The response is an interim one.",
	},
	{
		code: "100",
		name: "Final response",
		description: "The response is an final one.",
	},
	{
		code: "101",
		name: "Debit advice requested",
		description: "A debit advice is requested for the transaction.",
	},
	{
		code: "102",
		name: "Transaction not impacted",
		description: "Advice that the transaction is not impacted.",
	},
] as const satisfies Untdid1229Definition[];
