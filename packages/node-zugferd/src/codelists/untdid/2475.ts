import { createEnum } from "..";

/**
 * @see https://unece.org/fileadmin/DAM/trade/untdid/d18a/tred/tred2475.htm
 */
export type Untdid2475Definition = {
	key: string;
	code: string;
	name?: string;
	description?: string;
};

export type Untdid2475Code = (typeof UNTDID_2475)[number]["code"];

export const UNTDID_2475_IDENTIFIER = "untdid.2475" as const;

export const UNTDID_2475 = [
	{
		key: "DATE_OF_ORDER",
		name: "Date of order",
		code: "1",
		description: "Payment time reference is date of order.",
	},
	{
		key: "DATE_OF_CONFIRMATION",
		name: "Date of confirmation",
		code: "2",
		description: "Payment time reference is date of confirmation.",
	},
	{
		key: "DATE_OF_CONTRACT",
		name: "Date of contract",
		code: "3",
		description: "Payment time reference is date of contract.",
	},
	{
		key: "DATE_OF_SIGNATURE_OF_CONTRACT",
		name: "Date of signature of contract",
		code: "4",
		description: "Payment time reference is date of signature of contract.",
	},
	{
		key: "DATE_OF_INVOICE",
		name: "Date of invoice",
		code: "5",
		description: "Payment time reference is date of invoice.",
	},
	{
		key: "DATE_OF_CREDIT_NOTE",
		name: "Date of credit note",
		code: "6",
		description: "Payment time reference is date of credit note.",
	},
	{
		key: "DATE_OF_PRESENT_DOCUMENT",
		name: "Date of present document",
		code: "7",
		description: "Payment time reference is date of present document.",
	},
	{
		key: "DATE_OF_CONFIRMATION_OF_ORDER_RECEIVED",
		name: "Date of confirmation of order received",
		code: "8",
		description: "Payment time reference is date of confirmation received.",
	},
	{
		key: "DATE_INVOICE_RECEIVED",
		name: "Date invoice received",
		code: "9",
		description: "Payment time reference is date of invoice received.",
	},
	{
		key: "LATEST_DATETIME_FOR_BID_RECEPTION",
		name: "Latest date/time for bid reception",
		code: "10",
		description:
			"The date when, at the latest, the bids have to be submitted. This date is required for each call for tender, either in public or private sector.",
	},
	{
		key: "DATE_CREDIT_NOTE_RECEIVED",
		name: "Date credit note received",
		code: "11",
		description: "Payment time reference is date of credit note received.",
	},
	{
		key: "DATE_PRESENT_DOCUMENT_RECEIVED",
		name: "Date present document received",
		code: "12",
		description: "Payment time reference is date of present document received.",
	},
	{
		key: "DATE_OF_RESALE_BY_BUYER",
		name: "Date of resale by buyer",
		code: "13",
		description: "Payment time reference is date of resale by the buyer.",
	},
	{
		key: "DATE_PROCEEDS_OF_RESALE_COLLECTED_BY_BUYER",
		name: "Date proceeds of resale collected by buyer",
		code: "14",
		description:
			'Payment time reference is date of resale proceeds are collected by buyer. "buyer" is a retailer. Retailer will pay his supplier when having sold goods and money received.',
	},
	{
		key: "DATE_GOODS_RECEIVED_BY_BUYER",
		name: "Date goods received by buyer",
		code: "21",
		description:
			"Payment time reference is date when goods are received by buyer.",
	},
	{
		key: "DATE_GOODS_RECEIVED_BY_BUYERS_AGENT",
		name: "Date goods received by buyer's agent",
		code: "22",
		description:
			"Payment time reference is date when goods are received by buyer's agent.",
	},
	{
		key: "DATE_GOODS_RECEIVED_BY_CARRIER",
		name: "Date goods received by carrier",
		code: "23",
		description:
			"Payment time reference is date when goods are received by carrier.",
	},
	{
		key: "DATE_EX_WORKS",
		name: "Date ex-works",
		code: "24",
		description:
			"Payment time reference is date when goods are leaving the seller's factory.",
	},
	{
		key: "DATE_GOODS_HANDED_OVER_FOR_SHIPMENT_BY_SELLER_OR_AGENT",
		name: "Date goods handed over for shipment by seller or agent",
		code: "25",
		description:
			"Payment time reference is the date when goods are handed over for shipment by the seller or his agent.",
	},
	{
		key: "DATE_OF_ARRIVAL_OF_TRANSPORT",
		name: "Date of arrival of transport",
		code: "26",
		description: "Date the transport arrived at the agreed destination.",
	},
	{
		key: "DATE_OF_OUTWARD_FRONTIER_CROSSING",
		name: "Date of outward frontier crossing",
		code: "27",
		description:
			"Date the goods are crossing the border of the exporters country.",
	},
	{
		key: "DATE_OF_INWARD_FRONTIER_CROSSING",
		name: "Date of inward frontier crossing",
		code: "28",
		description:
			"Date the goods are crossing the border of the importers country.",
	},
	{
		key: "DATE_OF_DELIVERY_OF_GOODS_TO_ESTABLISHMENTSDOMICILESITE",
		name: "Date of delivery of goods to establishments/domicile/site",
		code: "29",
		description: "Date the goods are delivered at agreed place of destination.",
	},
	{
		key: "STIPULATED_DATE_FOR_PAYMENT_OF_DOCUMENTARY_CREDIT",
		name: "Stipulated date for payment of documentary credit",
		code: "31",
		description:
			"Date as per agreement when documentary credit is due for payment.",
	},
	{
		key: "STIPULATED_DATE_FOR_ACCEPTANCE_OF_DOCUMENTARY_CREDIT",
		name: "Stipulated date for acceptance of documentary credit",
		code: "32",
		description: "Date as per agreement when documentary credit is accepted.",
	},
	{
		key: "STIPULATED_DATE_FOR_NEGOTIATION_OF_DOCUMENTARY_CREDIT",
		name: "Stipulated date for negotiation of documentary credit",
		code: "33",
		description: "Date as per agreement when documentary credit is negotiated.",
	},
	{
		key: "DATE_OF_DELIVERY_TO_BUYER_OF_DOCUMENTS_REPRESENTING_GOODS",
		name: "Date of delivery to buyer of documents representing goods",
		code: "41",
		description:
			"Date when documents representing goods are received by buyer.",
	},
	{
		key: "DATE_OF_DELIVERY_TO_BUYERS_AGENT_OF_DOCUMENTS_REPRESENTING_GOODS",
		name: "Date of delivery to buyer's agent of documents representing goods",
		code: "42",
		description:
			"Date when documents representing goods are received by buyer's agent.",
	},
	{
		key: "DATE_OF_DELIVERY_TO_CARRIER_OF_DOCUMENTS_REPRESENTING_GOODS",
		name: "Date of delivery to carrier of documents representing goods",
		code: "43",
		description:
			"Date when documents representing goods are received by carrier.",
	},
	{
		key: "DATE_OF_DELIVERY_TO_INTERMEDIARY_BANK_OF_DOCUMENTS_REPRESENTING_GOODS",
		name: "Date of delivery to intermediary bank of documents representing goods",
		code: "44",
		description:
			"Date when documents representing goods are received by intermediary bank.",
	},
	{
		key: "DATE_OF_BILL_OF_LADING_CONSIGNMENT_NOTE_OR_OTHER_TRANSPORT_DOCUMENT",
		name: "Date of bill of lading, consignment note or other transport document",
		code: "45",
		description:
			"The date of issuance of a bill of lading, consignment note or similar transport document.",
	},
	{
		key: "DATE_OF_RECEIPT_FOR_LOADING_MATES_RECEIPT",
		name: "Date of receipt for loading (mate's receipt)",
		code: "46",
		description:
			"Date when goods are expedited to a ship confirmed by mate's received.",
	},
	{
		key: "DATE_OF_NEGOTIABLE_INSTRUMENT_DRAFT_PROMISSORY_NOTE_BANK",
		name: "Date of negotiable instrument (draft, promissory note, bank)",
		code: "47",
		description:
			"Payment time reference is the date of the negotiable instrument.",
	},
	{
		key: "DATE_OF_RECEIPT_OF_TOOL_DEPENDENT_INITIAL_SAMPLES_PLUS_UNLIMITED_ABSOLUTE_BANK_GUARANTEE_PLUS_VALUE_ADDED_TAX",
		name: "Date of receipt of tool dependent initial samples plus unlimited absolute bank guarantee plus value added tax",
		code: "48",
		description:
			"Payment time reference is date of receipt of tool dependent initial samples and unlimited absolute bank guarantee of a third party, who is liable to the full amount of the tooling (which is owned by the customer).",
	},
	{
		key: "DUE_DATE_OF_NEGOTIABLE_INSTRUMENT",
		name: "Due date of negotiable instrument",
		code: "52",
		description: "Date when the negotiable instrument is due for payment.",
	},
	{
		key: "DATE_OF_PRESENTATION_OF_NEGOTIABLE_INSTRUMENT",
		name: "Date of presentation of negotiable instrument",
		code: "53",
		description:
			"Date when the negotiable instrument is presented or will be presented to drawee.",
	},
	{
		key: "DATE_OF_ACCEPTANCE_OF_NEGOTIABLE_INSTRUMENT",
		name: "Date of acceptance of negotiable instrument",
		code: "54",
		description:
			"Date when the negotiable instrument is accepted or will be accepted by drawee.",
	},
	{
		key: "DATE_OF_ACCEPTANCE_OF_TOOLING",
		name: "Date of acceptance of tooling",
		code: "55",
		description:
			"Payment time reference is date of acceptance of tooling or set of tooling.",
	},
	{
		key: "DATE_OF_RECEIPT_OF_TOOLING",
		name: "Date of receipt of tooling",
		code: "56",
		description:
			"Payment time reference is date of receipt of tooling or set of tooling.",
	},
	{
		key: "DATE_OF_ACCEPTANCE_OF_FIRST_SAMPLES_PRODUCED_UNDER_PRODUCTION_CONDITIONS",
		name: "Date of acceptance of first samples produced under production conditions",
		code: "57",
		description:
			"Payment time reference is date of acceptance of first samples produced under production conditions.",
	},
	{
		key: "DATE_OF_START_OF_WORK",
		name: "Date of start of work",
		code: "60",
		description: "Payment time reference is the date when work begins.",
	},
	{
		key: "DATE_OF_END_OF_WORK",
		name: "Date of end of work",
		code: "61",
		description: "Payment time reference is the date when work ends.",
	},
	{
		key: "DATE_OF_PROVISIONAL_RECEPTION_OF_WORK",
		name: "Date of provisional reception of work",
		code: "62",
		description:
			"Date of temporary acceptance of work until final reception will take place.",
	},
	{
		key: "DATE_OF_FINAL_ACCEPTANCE_OF_WORK",
		name: "Date of final acceptance of work",
		code: "63",
		description:
			"Payment time reference is the date of final acceptance of work.",
	},
	{
		key: "DATE_OF_CERTIFICATE_OF_PRELIMINARY_ACCEPTANCE",
		name: "Date of certificate of preliminary acceptance",
		code: "64",
		description:
			"Date of certificate of temporary acceptance of work until final reception will take place.",
	},
	{
		key: "DATE_OF_CERTIFICATE_OF_FINAL_ACCEPTANCE",
		name: "Date of certificate of final acceptance",
		code: "65",
		description:
			"Payment time reference is the date of the certificate of final acceptance.",
	},
	{
		key: "SPECIFIED_DATE",
		name: "Specified date",
		code: "66",
		description: "Date specified elsewhere.",
	},
	{
		key: "ANTICIPATED_DELIVERY_DATE",
		name: "Anticipated delivery date",
		code: "67",
		description: "The date on which delivery is anticipated to take place.",
	},
	{
		key: "EFFECTIVE_DATE",
		name: "Effective date",
		code: "68",
		description: "The date on which an action or event becomes effective.",
	},
	{
		key: "INVOICE_TRANSMISSION_DATE",
		name: "Invoice transmission date",
		code: "69",
		description: "Payment time reference is the date of invoice transmission.",
	},
	{
		key: "DATE_OF_ISSUE_OF_TRANSPORT_DOCUMENTS",
		name: "Date of issue of transport document(s)",
		code: "70",
		description: "The date on which a transport document(s) is issued.",
	},
	{
		key: "DATE_OF_PRESENTATION_OF_DOCUMENTS",
		name: "Date of presentation of documents",
		code: "71",
		description:
			"Payment time reference is the date when documents are presented.",
	},
	{
		key: "PAYMENT_DATE",
		name: "Payment date",
		code: "72",
		description: "Date when a payment was made.",
	},
	{
		key: "DRAFTS_AT__DAYS_SIGHT",
		name: "Draft(s) at ... days sight",
		code: "73",
		description:
			"Draft(s) is/are due after a specific number of days after sight.",
	},
	{
		key: "DRAFTS_AT__DAYS_DATE",
		name: "Draft(s) at ... days date",
		code: "74",
		description:
			"Draft(s) is/are due after a specific number of days after date.",
	},
	{
		key: "DRAFTS_AT__DAYS_AFTER_DATE_OF_ISSUANCE_OF_TRANSPORT_DOCUMENTS",
		name: "Draft(s) at ... days after date of issuance of transport document(s)",
		code: "75",
		description:
			"Draft(s) is/are due after a specific number of days after date of issuance of transport document(s).",
	},
	{
		key: "DRAFTS_AT__DAYS_AFTER_DATE_OF_PRESENTATION_OF_DOCUMENTS",
		name: "Draft(s) at ... days after date of presentation of documents",
		code: "76",
		description:
			"Draft(s) is/are due after a specific number of days after date of presentation of documents.",
	},
	{
		key: "SPECIFIED_DRAFT_DATE",
		name: "Specified draft date",
		code: "77",
		description: "Draft at specified date.",
	},
	{
		key: "CUSTOMS_CLEARANCE_DATE_IMPORT",
		name: "Customs clearance date (import)",
		code: "78",
		description: "Date when goods clear Customs in the importing country.",
	},
	{
		key: "CUSTOMS_CLEARANCE_DATE_EXPORT",
		name: "Customs clearance date (export)",
		code: "79",
		description: "Date when goods clear Customs in the exporting country.",
	},
	{
		key: "DATE_OF_SALARY_PAYMENT",
		name: "Date of salary payment",
		code: "80",
		description: "Date when a salary payment was made.",
	},
	{
		key: "DATE_OF_SHIPMENT_AS_EVIDENCED_BY_THE_TRANSPORT_DOCUMENTS",
		name: "Date of shipment as evidenced by the transport document(s)",
		code: "81",
		description: "Date of shipment as evidenced by the transport document(s).",
	},
	{
		key: "PAYMENT_DUE_DATE",
		name: "Payment due date",
		code: "82",
		description: "Date on which a payment is due.",
	},
	{
		key: "REQUESTED_DATE_OF_DELIVERY",
		name: "Requested date of delivery",
		code: "83",
		description: "Payment terms apply from the requested date of delivery.",
	},
	{
		key: "OTHER_REFERENCE_DATE_AGREED_UPON_BETWEEN_THE_PARTIES",
		name: "Other reference date agreed upon between the parties",
		code: "ZZZ",
		description:
			"A code assigned within a code list to be used on an interim basis and as defined among trading partners until a precise code can be assigned to the code list.",
	},
] as const satisfies Untdid2475Definition[];

export const Untdid2475 = createEnum(UNTDID_2475, {
	keyProp: "key",
	valueProp: "code",
});
