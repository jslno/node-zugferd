import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid1373 = [
	{
		value: "1",
		name: "Accepted",
		description: "The specified document is accepted.",
		key: "ACCEPTED",
	},
	{
		value: "2",
		name: "Accompanying goods",
		description:
			"Notice that a specific document will be accompanying the goods.",
		key: "ACCOMPANYING_GOODS",
	},
	{
		value: "3",
		name: "Conditionally accepted",
		description: "The specified document is conditionally accepted.",
		key: "CONDITIONALLY_ACCEPTED",
	},
	{
		value: "4",
		name: "To arrive by separate EDI message",
		description:
			"Notice that a specific document/message will be transmitted via a separate EDI message.",
		key: "TO_ARRIVE_BY_SEPARATE_EDI_MESSAGE",
	},
	{
		value: "5",
		name: "Information only",
		description:
			"Notice that the specific document or message is for information only.",
		key: "INFORMATION_ONLY",
	},
	{
		value: "6",
		name: "To arrive by manual means",
		description:
			"Notice that a specific document or message will not be sent via EDI.",
		key: "TO_ARRIVE_BY_MANUAL_MEANS",
	},
	{
		value: "7",
		name: "To be raised and sent",
		description:
			"Request for a specific message to be formatted and transmitted or a request for a specific document to be raised and sent.",
		key: "TO_BE_RAISED_AND_SENT",
	},
	{
		value: "8",
		name: "Rejected",
		description: "The specified document is rejected.",
		key: "REJECTED",
	},
	{
		value: "9",
		name: "To be printed",
		description: "The document or message is to be printed.",
		key: "TO_BE_PRINTED",
	},
	{
		value: "10",
		name: "Document currently valid",
		description: "Specific document is currently valid.",
		key: "DOCUMENT_CURRENTLY_VALID",
	},
	{
		value: "11",
		name: "Document not available",
		description: "Specified document is not available.",
		key: "DOCUMENT_NOT_AVAILABLE",
	},
	{
		value: "12",
		name: "Document exhausted by declaration and attached",
		description:
			"Customs declaration to which the document is related completed or exhaust the allowance stated on the document. The document is attached to the Customs declaration.",
		key: "DOCUMENT_EXHAUSTED_BY_DECLARATION_AND_ATTACHED",
	},
	{
		value: "13",
		name: "Document not exhausted by declaration and attached",
		description:
			"Customs declaration to which the document is related does not complete or exhaust the allowance stated on the document . The document is not attached to the declaration but has already been lodged in the Customs station.",
		key: "DOCUMENT_NOT_EXHAUSTED_BY_DECLARATION_AND_ATTACHED",
	},
	{
		value: "14",
		name: "Document exhausted by declaration and previously lodged",
		description:
			"Customs declaration to which the document is related completed or exhaust the allowance stated on the document. The usage of the document is complete. The document is not attached to the declaration but has already been lodged in the Customs station.",
		key: "DOCUMENT_EXHAUSTED_BY_DECLARATION_AND_PREVIOUSLY_LODGED",
	},
	{
		value: "15",
		name: "Document not exhausted by declaration and previously lodged",
		description:
			"Customs declaration to which the document is related does not complete or exhaust the allowance stated on the document. The document can continue to be used for future declarations until the allowance is exhausted. The document is not attached to the declaration but has already been lodged in the Customs station.",
		key: "DOCUMENT_NOT_EXHAUSTED_BY_DECLARATION_AND_PREVIOUSLY_LODGED",
	},
	{
		value: "16",
		name: "Document not attached",
		description: "Specified document is not or cannot be attached.",
		key: "DOCUMENT_NOT_ATTACHED",
	},
	{
		value: "17",
		name: "Document with the goods",
		description:
			"Document not attached to the Customs declaration but is attached to the goods.",
		key: "DOCUMENT_WITH_THE_GOODS",
	},
	{
		value: "18",
		name: "Document attached, to be returned after endorsement",
		description:
			"Specified document is attached to the Customs declaration and will be required to be returned to the declarant after Customs endorsement.",
		key: "DOCUMENT_ATTACHED_TO_BE_RETURNED_AFTER_ENDORSEMENT",
	},
	{
		value: "19",
		name: "Document applied for",
		description: "Application has been submitted for that document.",
		key: "DOCUMENT_APPLIED_FOR",
	},
	{
		value: "20",
		name: "Received for shipment",
		description:
			"Indicates that the document has legal validity from the date of receival of the cargo.",
		key: "RECEIVED_FOR_SHIPMENT",
	},
	{
		value: "21",
		name: "Shipped on board",
		description:
			"Indicates that the document has legal validity from the date that cargo is loaded on board a vessel.",
		key: "SHIPPED_ON_BOARD",
	},
	{
		value: "22",
		name: "Status 0",
		description: "Message is at status 0.",
		key: "STATUS_0",
	},
	{
		value: "23",
		name: "Status 1",
		description: "Message is at status 1.",
		key: "STATUS_1",
	},
	{
		value: "24",
		name: "Status 2",
		description: "Message is at status 2.",
		key: "STATUS_2",
	},
	{
		value: "25",
		name: "Message under development",
		description: "Message is under development.",
		key: "MESSAGE_UNDER_DEVELOPMENT",
	},
	{
		value: "26",
		name: "Document not freighted",
		description: "Document not to include freight figures.",
		key: "DOCUMENT_NOT_FREIGHTED",
	},
	{
		value: "27",
		name: "Document freighted",
		description: "Document to include freight figures.",
		key: "DOCUMENT_FREIGHTED",
	},
	{
		value: "28",
		name: "Archived",
		description: "The document or message has been archived.",
		key: "ARCHIVED",
	},
	{
		value: "29",
		name: "Provisional",
		description: "The document or message has no official status.",
		key: "PROVISIONAL",
	},
	{
		value: "30",
		name: "Documents enclosed in the first transmission",
		description: "The documents are enclosed in the first transmission.",
		key: "DOCUMENTS_ENCLOSED_IN_THE_FIRST_TRANSMISSION",
	},
	{
		value: "31",
		name: "Documents enclosed in the second transmission",
		description: "The documents are enclosed in the second transmission.",
		key: "DOCUMENTS_ENCLOSED_IN_THE_SECOND_TRANSMISSION",
	},
	{
		value: "32",
		name: "Document not required, waiver issued",
		description:
			"The document is not required, waiver of requirement has been issued.",
		key: "DOCUMENT_NOT_REQUIRED_WAIVER_ISSUED",
	},
	{
		value: "33",
		name: "Already on file with receiver of this message",
		description:
			"The document is already on file with the party receiving the message.",
		key: "ALREADY_ON_FILE_WITH_RECEIVER_OF_THIS_MESSAGE",
	},
	{
		value: "34",
		name: "Retained by sender of this message, or by sender's agent or",
		description:
			"representative The document is in the possession of the sender or sender's agent or representative.",
		key: "RETAINED_BY_SENDER_OF_THIS_MESSAGE_OR_BY_SENDER_S_AGENT_OR",
	},
	{
		value: "35",
		name: "Document incomplete",
		description: "The document is incomplete.",
		key: "DOCUMENT_INCOMPLETE",
	},
	{
		value: "36",
		name: "Document previously submitted",
		description: "The document has already been submitted.",
		key: "DOCUMENT_PREVIOUSLY_SUBMITTED",
	},
	{
		value: "37",
		name: "Document complete",
		description: "The document is complete.",
		key: "DOCUMENT_COMPLETE",
	},
	{
		value: "38",
		name: "Final",
		description: "The document has been finalised.",
		key: "FINAL",
	},
	{
		value: "39",
		name: "On hold",
		description:
			"The document or message will not be processed until further release information.",
		key: "ON_HOLD",
	},
	{
		value: "40",
		name: "Validity suspended",
		description: "The validity of the document is or has been suspended.",
		key: "VALIDITY_SUSPENDED",
	},
	{
		value: "41",
		name: "Validity revoked",
		description: "The validity of the document is or has been revoked.",
		key: "VALIDITY_REVOKED",
	},
	{
		value: "42",
		name: "In error",
		description: "The specified document is in error.",
		key: "IN_ERROR",
	},
	{
		value: "43",
		name: "Received",
		description: "The document is received.",
		key: "RECEIVED",
	},
	{
		value: "44",
		name: "Accepted with warnings",
		description:
			"The document is accepted, but has generated warnings. +    45    In process Indicates that the document is being processed. +    46    Under query Indicates that the document has been halted pending response to a query. +    47    Paid Indicates that the document has been paid. +    48    Acknowledged Indicates that the document is acknowledged as understood and submitted for further processing. +    49    Conditionally accepted Indicates that the document is accepted under conditions stated and proceeded accordingly unless disputed. +    50    Rejected, no further processing Indicates that the document has been rejected, and a clarification or reason is required.",
		key: "ACCEPTED_WITH_WARNINGS",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		untdid1373: typeof untdid1373;
	}
}
registerCodelist("untdid1373", untdid1373);

export default untdid1373;
