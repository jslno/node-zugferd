import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid1225 = [
	{
		value: "1",
		name: "Cancellation",
		description:
			"Message cancelling a previous transmission for a given transaction.",
		key: "CANCELLATION",
	},
	{
		value: "2",
		name: "Addition",
		description: "Message containing items to be added.",
		key: "ADDITION",
	},
	{
		value: "3",
		name: "Deletion",
		description: "Message containing items to be deleted.",
		key: "DELETION",
	},
	{
		value: "4",
		name: "Change",
		description: "Message containing items to be changed.",
		key: "CHANGE",
	},
	{
		value: "5",
		name: "Replace",
		description: "Message replacing a previous message.",
		key: "REPLACE",
	},
	{
		value: "6",
		name: "Confirmation",
		description:
			"Message confirming the details of a previous transmission where such confirmation is required or recommended under the terms of a trading partner agreement.",
		key: "CONFIRMATION",
	},
	{
		value: "7",
		name: "Duplicate",
		description:
			"The message is a duplicate of a previously generated message.",
		key: "DUPLICATE",
	},
	{
		value: "8",
		name: "Status",
		description: "Code indicating that the referenced message is a status.",
		key: "STATUS",
	},
	{
		value: "9",
		name: "Original",
		description: "Initial transmission related to a given transaction.",
		key: "ORIGINAL",
	},
	{
		value: "10",
		name: "Not found",
		description: "Message whose reference number is not filed.",
		key: "NOT_FOUND",
	},
	{
		value: "11",
		name: "Response",
		description: "Message responding to a previous message or document.",
		key: "RESPONSE",
	},
	{
		value: "12",
		name: "Not processed",
		description:
			"Message indicating that the referenced message was received but not yet processed.",
		key: "NOT_PROCESSED",
	},
	{
		value: "13",
		name: "Request",
		description: "Code indicating that the referenced message is a request.",
		key: "REQUEST",
	},
	{
		value: "14",
		name: "Advance notification",
		description:
			"Code indicating that the information contained in the message is an advance notification of information to follow.",
		key: "ADVANCE_NOTIFICATION",
	},
	{
		value: "15",
		name: "Reminder",
		description: "Repeated message transmission for reminding purposes.",
		key: "REMINDER",
	},
	{
		value: "16",
		name: "Proposal",
		description: "Message content is a proposal.",
		key: "PROPOSAL",
	},
	{
		value: "17",
		name: "Cancel, to be reissued",
		description:
			"Referenced transaction cancelled, reissued message will follow.",
		key: "CANCEL_TO_BE_REISSUED",
	},
	{
		value: "18",
		name: "Reissue",
		description: "New issue of a previous message (maybe cancelled).",
		key: "REISSUE",
	},
	{
		value: "19",
		name: "Seller initiated change",
		description:
			"Change information submitted by buyer but initiated by seller.",
		key: "SELLER_INITIATED_CHANGE",
	},
	{
		value: "20",
		name: "Replace heading section only",
		description: "Message to replace the heading of a previous message.",
		key: "REPLACE_HEADING_SECTION_ONLY",
	},
	{
		value: "21",
		name: "Replace item detail and summary only",
		description:
			"Message to replace item detail and summary of a previous message.",
		key: "REPLACE_ITEM_DETAIL_AND_SUMMARY_ONLY",
	},
	{
		value: "22",
		name: "Final transmission",
		description:
			"Final message in a related series of messages together making up a commercial, administrative or transport transaction.",
		key: "FINAL_TRANSMISSION",
	},
	{
		value: "23",
		name: "Transaction on hold",
		description:
			"Message not to be processed until further release information.",
		key: "TRANSACTION_ON_HOLD",
	},
	{
		value: "24",
		name: "Delivery instruction",
		description:
			"Delivery schedule message only used to transmit short- term delivery instructions.",
		key: "DELIVERY_INSTRUCTION",
	},
	{
		value: "25",
		name: "Forecast",
		description:
			"Delivery schedule message only used to transmit long- term schedule information.",
		key: "FORECAST",
	},
	{
		value: "26",
		name: "Delivery instruction and forecast",
		description: "Combination of codes '24' and '25'.",
		key: "DELIVERY_INSTRUCTION_AND_FORECAST",
	},
	{
		value: "27",
		name: "Not accepted",
		description:
			"Message to inform that the referenced message is not accepted by the recipient.",
		key: "NOT_ACCEPTED",
	},
	{
		value: "28",
		name: "Accepted, with amendment in heading section",
		description: "Message accepted but amended in heading section.",
		key: "ACCEPTED_WITH_AMENDMENT_IN_HEADING_SECTION",
	},
	{
		value: "29",
		name: "Accepted without amendment",
		description: "Referenced message is entirely accepted.",
		key: "ACCEPTED_WITHOUT_AMENDMENT",
	},
	{
		value: "30",
		name: "Accepted, with amendment in detail section",
		description:
			"Referenced message is accepted but amended in detail section.",
		key: "ACCEPTED_WITH_AMENDMENT_IN_DETAIL_SECTION",
	},
	{
		value: "31",
		name: "Copy",
		description:
			"Indicates that the message is a copy of an original message that has been sent, e.g. for action or information.",
		key: "COPY",
	},
	{
		value: "32",
		name: "Approval",
		description:
			"A message releasing an existing referenced message for action to the receiver.",
		key: "APPROVAL",
	},
	{
		value: "33",
		name: "Change in heading section",
		description: "Message changing the referenced message heading section.",
		key: "CHANGE_IN_HEADING_SECTION",
	},
	{
		value: "34",
		name: "Accepted with amendment",
		description: "The referenced message is accepted but amended.",
		key: "ACCEPTED_WITH_AMENDMENT",
	},
	{
		value: "35",
		name: "Retransmission",
		description: "Change-free transmission of a message previously sent.",
		key: "RETRANSMISSION",
	},
	{
		value: "36",
		name: "Change in detail section",
		description: "Message changing referenced detail section.",
		key: "CHANGE_IN_DETAIL_SECTION",
	},
	{
		value: "37",
		name: "Reversal of a debit",
		description: "Reversal of a previously posted debit.",
		key: "REVERSAL_OF_A_DEBIT",
	},
	{
		value: "38",
		name: "Reversal of a credit",
		description: "Reversal of a previously posted credit.",
		key: "REVERSAL_OF_A_CREDIT",
	},
	{
		value: "39",
		name: "Reversal for cancellation",
		description:
			"Code indicating that the referenced message is reversing a cancellation of a previous transmission for a given transaction.",
		key: "REVERSAL_FOR_CANCELLATION",
	},
	{
		value: "40",
		name: "Request for deletion",
		description:
			"The message is given to inform the recipient to delete the referenced transaction.",
		key: "REQUEST_FOR_DELETION",
	},
	{
		value: "41",
		name: "Finishing/closing order",
		description: "Last of series of call-offs.",
		key: "FINISHING_CLOSING_ORDER",
	},
	{
		value: "42",
		name: "Confirmation via specific means",
		description:
			"Message confirming a transaction previously agreed via other means (e.g. phone).",
		key: "CONFIRMATION_VIA_SPECIFIC_MEANS",
	},
	{
		value: "43",
		name: "Additional transmission",
		description:
			"Message already transmitted via another communication channel. This transmission is to provide electronically processable data only.",
		key: "ADDITIONAL_TRANSMISSION",
	},
	{
		value: "44",
		name: "Accepted without reserves",
		description: "Message accepted without reserves.",
		key: "ACCEPTED_WITHOUT_RESERVES",
	},
	{
		value: "45",
		name: "Accepted with reserves",
		description: "Message accepted with reserves.",
		key: "ACCEPTED_WITH_RESERVES",
	},
	{
		value: "46",
		name: "Provisional",
		description: "Message content is provisional.",
		key: "PROVISIONAL",
	},
	{
		value: "47",
		name: "Definitive",
		description: "Message content is definitive.",
		key: "DEFINITIVE",
	},
	{
		value: "48",
		name: "Accepted, contents rejected",
		description:
			"Message to inform that the previous message is received, but it cannot be processed due to regulations, laws, etc.",
		key: "ACCEPTED_CONTENTS_REJECTED",
	},
	{
		value: "49",
		name: "Settled dispute",
		description: "The reported dispute is settled.",
		key: "SETTLED_DISPUTE",
	},
	{
		value: "50",
		name: "Withdraw",
		description: "Message withdrawing a previously approved message.",
		key: "WITHDRAW",
	},
	{
		value: "51",
		name: "Authorisation",
		description: "Message authorising a message or transaction(s).",
		key: "AUTHORISATION",
	},
	{
		value: "52",
		name: "Proposed amendment",
		description:
			"A code used to indicate an amendment suggested by the sender.",
		key: "PROPOSED_AMENDMENT",
	},
	{
		value: "53",
		name: "Test",
		description: "Code indicating the message is to be considered as a test.",
		key: "TEST",
	},
	{
		value: "54",
		name: "Extract",
		description: "A subset of the original.",
		key: "EXTRACT",
	},
	{
		value: "55",
		name: "Notification only",
		description:
			"The receiver may use the notification information for analysis only.",
		key: "NOTIFICATION_ONLY",
	},
	{
		value: "56",
		name: "Advice of ledger booked items",
		description: "An advice that items have been booked in the ledger.",
		key: "ADVICE_OF_LEDGER_BOOKED_ITEMS",
	},
	{
		value: "57",
		name: "Advice of items pending to be booked in the ledger",
		description: "An advice that items are pending to be booked in the ledger.",
		key: "ADVICE_OF_ITEMS_PENDING_TO_BE_BOOKED_IN_THE_LEDGER",
	},
	{
		value: "58",
		name: "Pre-advice of items requiring further information",
		description: "A pre-advice that items require further information.",
		key: "PRE_ADVICE_OF_ITEMS_REQUIRING_FURTHER_INFORMATION",
	},
	{
		value: "59",
		name: "Pre-adviced items",
		description: "A pre-advice of items.",
		key: "PRE_ADVICED_ITEMS",
	},
	{
		value: "60",
		name: "No action since last message",
		description:
			"Code indicating the fact that no action has taken place since the last message.",
		key: "NO_ACTION_SINCE_LAST_MESSAGE",
	},
	{
		value: "61",
		name: "Complete schedule",
		description: "The message function is a complete schedule.",
		key: "COMPLETE_SCHEDULE",
	},
	{
		value: "62",
		name: "Update schedule",
		description: "The message function is an update to a schedule.",
		key: "UPDATE_SCHEDULE",
	},
	{
		value: "63",
		name: "Not accepted, provisional",
		description: "Not accepted, subject to confirmation.",
		key: "NOT_ACCEPTED_PROVISIONAL",
	},
	{
		value: "64",
		name: "Verification",
		description: "The message is transmitted to verify information.",
		key: "VERIFICATION",
	},
	{
		value: "65",
		name: "Unsettled dispute",
		description: "To report an unsettled dispute.",
		key: "UNSETTLED_DISPUTE",
	},
	{
		value: "66",
		name: "Discharge of operation guarantee",
		description:
			"A message related to a guarantee containing information about the discharge of an operation.",
		key: "DISCHARGE_OF_OPERATION_GUARANTEE",
	},
	{
		value: "67",
		name: "Termination of operation guarantee",
		description:
			"A message related to a guarantee containing information about the termination of an operation.",
		key: "TERMINATION_OF_OPERATION_GUARANTEE",
	},
	{
		value: "68",
		name: "Start of operation guarantee",
		description:
			"A message related to a guarantee containing information about the start of an operation. #|   69    New declaration data A message related to a guarantee containing new declaration data. +    70    Amended declaration data A message related to the amendment of declaration data. +    71    Refusal to start operation guarantee A message related to a guarantee containing information about the refusal to start of an operation. +    72    Seals information (Start) A message related to a guarantee containing information about the seals during the start of an operation. +    73    Seals information (Terminate) A message related to a guarantee containing information about the seals during the termination of an operation.",
		key: "START_OF_OPERATION_GUARANTEE",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		untdid1225: typeof untdid1225;
	}
}
registerCodelist("untdid1225", untdid1225);

export default untdid1225;
