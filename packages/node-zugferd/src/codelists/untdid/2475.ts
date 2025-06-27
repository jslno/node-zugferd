/**
 * @see https://unece.org/fileadmin/DAM/trade/untdid/d18a/tred/tred2475.htm
 */
export type Untdid2475Definition = {
	code: string;
	name?: string;
	description?: string;
};

export type Untdid2475Code = (typeof UNTDID_2475)[number]["code"];

export const UNTDID_2475_IDENTIFIER = "untdid.2475" as const;

export const UNTDID_2475 = [
	{
		code: "1",
		name: "Date of order",
		description: "Payment time reference is date of order.",
	},
	{
		code: "2",
		name: "Date of confirmation",
		description: "Payment time reference is date of confirmation.",
	},
	{
		code: "3",
		name: "Date of contract",
		description: "Payment time reference is date of contract.",
	},
	{
		code: "4",
		name: "Date of signature of contract",
		description: "Payment time reference is date of signature of contract.",
	},
	{
		code: "5",
		name: "Date of invoice",
		description: "Payment time reference is date of invoice.",
	},
	{
		code: "6",
		name: "Date of credit note",
		description: "Payment time reference is date of credit note.",
	},
	{
		code: "7",
		name: "Date of present document",
		description: "Payment time reference is date of present document.",
	},
	{
		code: "8",
		name: "Date of confirmation of order received",
		description: "Payment time reference is date of confirmation received.",
	},
	{
		code: "9",
		name: "Date invoice received",
		description: "Payment time reference is date of invoice received.",
	},
	{
		code: "10",
		name: "Latest date/time for bid reception",
		description:
			"The date when, at the latest, the bids have to be submitted. This date is required for each call for tender, either in public or private sector.",
	},
	{
		code: "11",
		name: "Date credit note received",
		description: "Payment time reference is date of credit note received.",
	},
	{
		code: "12",
		name: "Date present document received",
		description: "Payment time reference is date of present document received.",
	},
	{
		code: "13",
		name: "Date of resale by buyer",
		description: "Payment time reference is date of resale by the buyer.",
	},
	{
		code: "14",
		name: "Date proceeds of resale collected by buyer",
		description:
			'Payment time reference is date of resale proceeds are collected by buyer. "buyer" is a retailer. Retailer will pay his supplier when having sold goods and money received.',
	},
	{
		code: "21",
		name: "Date goods received by buyer",
		description:
			"Payment time reference is date when goods are received by buyer.",
	},
	{
		code: "22",
		name: "Date goods received by buyer's agent",
		description:
			"Payment time reference is date when goods are received by buyer's agent.",
	},
	{
		code: "23",
		name: "Date goods received by carrier",
		description:
			"Payment time reference is date when goods are received by carrier.",
	},
	{
		code: "24",
		name: "Date ex-works",
		description:
			"Payment time reference is date when goods are leaving the seller's factory.",
	},
	{
		code: "25",
		name: "Date goods handed over for shipment by seller or agent",
		description:
			"Payment time reference is the date when goods are handed over for shipment by the seller or his agent.",
	},
	{
		code: "26",
		name: "Date of arrival of transport",
		description: "Date the transport arrived at the agreed destination.",
	},
	{
		code: "27",
		name: "Date of outward frontier crossing",
		description:
			"Date the goods are crossing the border of the exporters country.",
	},
	{
		code: "28",
		name: "Date of inward frontier crossing",
		description:
			"Date the goods are crossing the border of the importers country.",
	},
	{
		code: "29",
		name: "Date of delivery of goods to establishments/domicile/site",
		description: "Date the goods are delivered at agreed place of destination.",
	},
	{
		code: "31",
		name: "Stipulated date for payment of documentary credit",
		description:
			"Date as per agreement when documentary credit is due for payment.",
	},
	{
		code: "32",
		name: "Stipulated date for acceptance of documentary credit",
		description: "Date as per agreement when documentary credit is accepted.",
	},
	{
		code: "33",
		name: "Stipulated date for negotiation of documentary credit",
		description: "Date as per agreement when documentary credit is negotiated.",
	},
	{
		code: "41",
		name: "Date of delivery to buyer of documents representing goods",
		description:
			"Date when documents representing goods are received by buyer.",
	},
	{
		code: "42",
		name: "Date of delivery to buyer's agent of documents representing goods",
		description:
			"Date when documents representing goods are received by buyer's agent.",
	},
	{
		code: "43",
		name: "Date of delivery to carrier of documents representing goods",
		description:
			"Date when documents representing goods are received by carrier.",
	},
	{
		code: "44",
		name: "Date of delivery to intermediary bank of documents representing goods",
		description:
			"Date when documents representing goods are received by intermediary bank.",
	},
	{
		code: "45",
		name: "Date of bill of lading, consignment note or other transport document",
		description:
			"The date of issuance of a bill of lading, consignment note or similar transport document.",
	},
	{
		code: "46",
		name: "Date of receipt for loading (mate's receipt)",
		description:
			"Date when goods are expedited to a ship confirmed by mate's received.",
	},
	{
		code: "47",
		name: "Date of negotiable instrument (draft, promissory note, bank)",
		description:
			"Payment time reference is the date of the negotiable instrument.",
	},
	{
		code: "48",
		name: "Date of receipt of tool dependent initial samples plus unlimited absolute bank guarantee plus value added tax",
		description:
			"Payment time reference is date of receipt of tool dependent initial samples and unlimited absolute bank guarantee of a third party, who is liable to the full amount of the tooling (which is owned by the customer).",
	},
	{
		code: "52",
		name: "Due date of negotiable instrument",
		description: "Date when the negotiable instrument is due for payment.",
	},
	{
		code: "53",
		name: "Date of presentation of negotiable instrument",
		description:
			"Date when the negotiable instrument is presented or will be presented to drawee.",
	},
	{
		code: "54",
		name: "Date of acceptance of negotiable instrument",
		description:
			"Date when the negotiable instrument is accepted or will be accepted by drawee.",
	},
	{
		code: "55",
		name: "Date of acceptance of tooling",
		description:
			"Payment time reference is date of acceptance of tooling or set of tooling.",
	},
	{
		code: "56",
		name: "Date of receipt of tooling",
		description:
			"Payment time reference is date of receipt of tooling or set of tooling.",
	},
	{
		code: "57",
		name: "Date of acceptance of first samples produced under production conditions",
		description:
			"Payment time reference is date of acceptance of first samples produced under production conditions.",
	},
	{
		code: "60",
		name: "Date of start of work",
		description: "Payment time reference is the date when work begins.",
	},
	{
		code: "61",
		name: "Date of end of work",
		description: "Payment time reference is the date when work ends.",
	},
	{
		code: "62",
		name: "Date of provisional reception of work",
		description:
			"Date of temporary acceptance of work until final reception will take place.",
	},
	{
		code: "63",
		name: "Date of final acceptance of work",
		description:
			"Payment time reference is the date of final acceptance of work.",
	},
	{
		code: "64",
		name: "Date of certificate of preliminary acceptance",
		description:
			"Date of certificate of temporary acceptance of work until final reception will take place.",
	},
	{
		code: "65",
		name: "Date of certificate of final acceptance",
		description:
			"Payment time reference is the date of the certificate of final acceptance.",
	},
	{
		code: "66",
		name: "Specified date",
		description: "Date specified elsewhere.",
	},
	{
		code: "67",
		name: "Anticipated delivery date",
		description: "The date on which delivery is anticipated to take place.",
	},
	{
		code: "68",
		name: "Effective date",
		description: "The date on which an action or event becomes effective.",
	},
	{
		code: "69",
		name: "Invoice transmission date",
		description: "Payment time reference is the date of invoice transmission.",
	},
	{
		code: "70",
		name: "Date of issue of transport document(s)",
		description: "The date on which a transport document(s) is issued.",
	},
	{
		code: "71",
		name: "Date of presentation of documents",
		description:
			"Payment time reference is the date when documents are presented.",
	},
	{
		code: "72",
		name: "Payment date",
		description: "Date when a payment was made.",
	},
	{
		code: "73",
		name: "Draft(s) at ... days sight",
		description:
			"Draft(s) is/are due after a specific number of days after sight.",
	},
	{
		code: "74",
		name: "Draft(s) at ... days date",
		description:
			"Draft(s) is/are due after a specific number of days after date.",
	},
	{
		code: "75",
		name: "Draft(s) at ... days after date of issuance of transport document(s)",
		description:
			"Draft(s) is/are due after a specific number of days after date of issuance of transport document(s).",
	},
	{
		code: "76",
		name: "Draft(s) at ... days after date of presentation of documents",
		description:
			"Draft(s) is/are due after a specific number of days after date of presentation of documents.",
	},
	{
		code: "77",
		name: "Specified draft date",
		description: "Draft at specified date.",
	},
	{
		code: "78",
		name: "Customs clearance date (import)",
		description: "Date when goods clear Customs in the importing country.",
	},
	{
		code: "79",
		name: "Customs clearance date (export)",
		description: "Date when goods clear Customs in the exporting country.",
	},
	{
		code: "80",
		name: "Date of salary payment",
		description: "Date when a salary payment was made.",
	},
	{
		code: "81",
		name: "Date of shipment as evidenced by the transport document(s)",
		description: "Date of shipment as evidenced by the transport document(s).",
	},
	{
		code: "82",
		name: "Payment due date",
		description: "Date on which a payment is due.",
	},
	{
		code: "83",
		name: "Requested date of delivery",
		description: "Payment terms apply from the requested date of delivery.",
	},
	{
		code: "ZZZ",
		name: "Other reference date agreed upon between the parties",
		description:
			"A code assigned within a code list to be used on an interim basis and as defined among trading partners until a precise code can be assigned to the code list.",
	},
] satisfies Untdid2475Definition[];
