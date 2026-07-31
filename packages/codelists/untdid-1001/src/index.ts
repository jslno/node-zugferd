import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid1001 = [
	{
		value: "71",
		name: "Request for payment",
		description:
			"Document/message issued by a creditor to a debtor to request payment of one or more invoices past due.",
		interpretation: "Invoice",
		key: "REQUEST_FOR_PAYMENT",
	},
	{
		value: "80",
		name: "Debit note related to goods or services",
		description:
			"Debit information related to a transaction for goods or services to the relevant party.",
		interpretation: "Invoice",
		key: "DEBIT_NOTE_RELATED_TO_GOODS_OR_SERVICES",
	},
	{
		value: "81",
		name: "Credit note related to goods or services",
		description:
			"Document message used to provide credit information related to a transaction for goods or services to the relevant party.",
		interpretation: "Credit Note",
		key: "CREDIT_NOTE_RELATED_TO_GOODS_OR_SERVICES",
	},
	{
		value: "82",
		name: "Metered services invoice",
		description:
			"Document/message claiming payment for the supply of metered services (e.g., gas, electricity, etc.) supplied to a fixed meter whose consumption is measured over a period of time.",
		interpretation: "Invoice",
		key: "METERED_SERVICES_INVOICE",
	},
	{
		value: "83",
		name: "Credit note related to financial adjustments",
		description:
			"Document message for providing credit information related to financial adjustments to the relevant party, e.g., bonuses.",
		interpretation: "Credit Note",
		key: "CREDIT_NOTE_RELATED_TO_FINANCIAL_ADJUSTMENTS",
	},
	{
		value: "84",
		name: "Debit note related to financial adjustments",
		description:
			"Document/message for providing debit information related to financial adjustments to the relevant party.",
		interpretation: "Invoice",
		key: "DEBIT_NOTE_RELATED_TO_FINANCIAL_ADJUSTMENTS",
	},
	{
		value: "102",
		name: "Tax notification",
		description: "Used to specify that the message is a tax notification.",
		interpretation: "Invoice",
		key: "TAX_NOTIFICATION",
	},
	{
		value: "130",
		name: "Invoicing data sheet",
		description:
			"Document/message issued within an enterprise containing data about goods sold, to be used as the basis for the preparation of an invoice.",
		interpretation: "Invoice",
		key: "INVOICING_DATA_SHEET",
	},
	{
		value: "202",
		name: "Direct payment valuation",
		description:
			"Document/message addressed, for instance, by a general contractor to the owner, in order that a direct payment be made to a subcontractor.",
		interpretation: "Invoice",
		key: "DIRECT_PAYMENT_VALUATION",
	},
	{
		value: "203",
		name: "Provisional payment valuation",
		description:
			"Document/message establishing a provisional payment valuation.",
		interpretation: "Invoice",
		key: "PROVISIONAL_PAYMENT_VALUATION",
	},
	{
		value: "204",
		name: "Payment valuation",
		description:
			"Document/message establishing the financial elements of a situation of works.",
		interpretation: "Invoice",
		key: "PAYMENT_VALUATION",
	},
	{
		value: "211",
		name: "Interim application for payment",
		description:
			"Document/message containing a provisional assessment in support of a request for payment for completed work for a construction contract.",
		interpretation: "Invoice",
		key: "INTERIM_APPLICATION_FOR_PAYMENT",
	},
	{
		value: "218",
		name: "Final payment request based on completion of work",
		description:
			"The final payment request of a series of payment requests submitted upon completion of all the work.",
		interpretation: "Invoice",
		key: "FINAL_PAYMENT_REQUEST_BASED_ON_COMPLETION_OF_WORK",
	},
	{
		value: "219",
		name: "Payment request for completed units",
		description: "A request for payment for completed units.",
		interpretation: "Invoice",
		key: "PAYMENT_REQUEST_FOR_COMPLETED_UNITS",
	},
	{
		value: "261",
		name: "Self billed credit note",
		description:
			"A document which indicates that the customer is claiming credit in a self billing environment.",
		interpretation: "Credit Note",
		key: "SELF_BILLED_CREDIT_NOTE",
	},
	{
		value: "262",
		name: "Consolidated credit note - goods and services",
		description:
			"Credit note for goods and services that covers multiple transactions involving more than one invoice.",
		interpretation: "Credit Note",
		key: "CONSOLIDATED_CREDIT_NOTE_GOODS_AND_SERVICES",
	},
	{
		value: "295",
		name: "Price variation invoice",
		description:
			"An invoice which requests payment for the difference in price between an original invoice and the result of the application of a price variation formula.",
		interpretation: "Invoice",
		key: "PRICE_VARIATION_INVOICE",
	},
	{
		value: "296",
		name: "Credit note for price variation",
		description:
			"A credit note which is issued against a price variation invoice.",
		interpretation: "Credit Note",
		key: "CREDIT_NOTE_FOR_PRICE_VARIATION",
	},
	{
		value: "308",
		name: "Delcredere credit note",
		description:
			"A credit note sent to the party paying on behalf of a number of buyers.",
		interpretation: "Credit Note",
		key: "DELCREDERE_CREDIT_NOTE",
	},
	{
		value: "325",
		name: "Proforma invoice",
		description:
			"Document/message serving as a preliminary invoice, containing - on the whole - the same information as the final invoice, but not actually claiming payment.",
		interpretation: "Invoice",
		key: "PROFORMA_INVOICE",
	},
	{
		value: "326",
		name: "Partial invoice",
		description:
			"Document/message specifying details of an incomplete invoice.",
		interpretation: "Invoice",
		key: "PARTIAL_INVOICE",
	},
	{
		value: "331",
		name: "Commercial invoice which includes a packing list",
		description:
			"Commercial transaction (invoice) will include a packing list.",
		interpretation: "Invoice",
		key: "COMMERCIAL_INVOICE_WHICH_INCLUDES_A_PACKING_LIST",
	},
	{
		value: "380",
		name: "Commercial invoice",
		description:
			"(1334) Document/message claiming payment for goods or services supplied under conditions agreed between seller and buyer.",
		interpretation: "Invoice",
		key: "COMMERCIAL_INVOICE",
	},
	{
		value: "381",
		name: "Credit note",
		description:
			"(1113) Document/message for providing credit information to the relevant party.",
		interpretation: "Credit Note",
		key: "CREDIT_NOTE",
	},
	{
		value: "382",
		name: "Commission note",
		description:
			"(1111) Document/message in which a seller specifies the amount of commission, the percentage of the invoice amount, or some other basis for the calculation of the commission to which a sales agent is entitled.",
		interpretation: "Invoice",
		key: "COMMISSION_NOTE",
	},
	{
		value: "383",
		name: "Debit note",
		description:
			"Document/message for providing debit information to the relevant party.",
		interpretation: "Invoice",
		key: "DEBIT_NOTE",
	},
	{
		value: "384",
		name: "Corrected invoice",
		description:
			"Commercial invoice that includes revised information differing from an earlier submission of the same invoice.",
		interpretation: "Invoice",
		key: "CORRECTED_INVOICE",
	},
	{
		value: "385",
		name: "Consolidated invoice",
		description:
			"Commercial invoice that covers multiple transactions involving more than one vendor.",
		interpretation: "Invoice",
		key: "CONSOLIDATED_INVOICE",
	},
	{
		value: "386",
		name: "Prepayment invoice",
		description:
			"An invoice to pay amounts for goods and services in advance; these amounts will be subtracted from the final invoice.",
		interpretation: "Invoice",
		key: "PREPAYMENT_INVOICE",
	},
	{
		value: "387",
		name: "Hire invoice",
		description:
			"Document/message for invoicing the hiring of human resources or renting goods or equipment.",
		interpretation: "Invoice",
		key: "HIRE_INVOICE",
	},
	{
		value: "388",
		name: "Tax invoice",
		description: "An invoice for tax purposes.",
		interpretation: "Invoice",
		key: "TAX_INVOICE",
	},
	{
		value: "389",
		name: "Self-billed invoice",
		description: "An invoice the invoicee is producing instead of the seller.",
		interpretation: "Invoice",
		key: "SELF_BILLED_INVOICE",
	},
	{
		value: "390",
		name: "Delcredere invoice",
		description: "An invoice sent to the party paying for a number of buyers.",
		interpretation: "Invoice",
		key: "DELCREDERE_INVOICE",
	},
	{
		value: "393",
		name: "Factored invoice",
		description: "Invoice assigned to a third party for collection.",
		interpretation: "Invoice",
		key: "FACTORED_INVOICE",
	},
	{
		value: "394",
		name: "Lease invoice",
		description: "Usage of INVOIC-message for goods in leasing contracts.",
		interpretation: "Invoice",
		key: "LEASE_INVOICE",
	},
	{
		value: "395",
		name: "Consignment invoice",
		description:
			"Commercial invoice that covers a transaction other than one involving a sale.",
		interpretation: "Invoice",
		key: "CONSIGNMENT_INVOICE",
	},
	{
		value: "396",
		name: "Factored credit note",
		description: "Credit note related to assigned invoice(s).",
		interpretation: "Credit Note",
		key: "FACTORED_CREDIT_NOTE",
	},
	{
		value: "420",
		name: "Optical Character Reading (OCR) payment credit note",
		description:
			"Payment credit note effected by an Optical Character Reading (OCR) document.",
		interpretation: "Credit Note",
		key: "OPTICAL_CHARACTER_READING_OCR_PAYMENT_CREDIT_NOTE",
	},
	{
		value: "456",
		name: "Debit advice",
		description: "Advice on a debit.",
		interpretation: "Invoice",
		key: "DEBIT_ADVICE",
	},
	{
		value: "457",
		name: "Reversal of debit",
		description: "Reversal of debit accounting entry by bank.",
		interpretation: "Invoice",
		key: "REVERSAL_OF_DEBIT",
	},
	{
		value: "458",
		name: "Reversal of credit",
		description: "Reversal of credit accounting entry by bank.",
		interpretation: "Credit Note",
		key: "REVERSAL_OF_CREDIT",
	},
	{
		value: "471",
		name: " Self-billed corrective invoice, invoice type, Corrected",
		interpretation: "Invoice",
		key: "SELF_BILLED_CORRECTIVE_INVOICE_INVOICE_TYPE_CORRECTED",
	},
	{
		value: "472",
		name: " Factored Corrective Invoice, invoice type, Corrected",
		interpretation: "Invoice",
		key: "FACTORED_CORRECTIVE_INVOICE_INVOICE_TYPE_CORRECTED",
	},
	{
		value: "473",
		name: " Self billed Factored corrective invoice, invoice type, Corrected",
		interpretation: "Invoice",
		key: "SELF_BILLED_FACTORED_CORRECTIVE_INVOICE_INVOICE_TYPE_CORRECTED",
	},
	{
		value: "500",
		name: " Self Prepayment invoice, invoice type, Original",
		interpretation: "Invoice",
		key: "SELF_PREPAYMENT_INVOICE_INVOICE_TYPE_ORIGINAL",
	},
	{
		value: "501",
		name: " Self billed factored invoice, invoice type, Original",
		interpretation: "Invoice",
		key: "SELF_BILLED_FACTORED_INVOICE_INVOICE_TYPE_ORIGINAL",
	},
	{
		value: "502",
		name: " Self billet factored Credit Note, Credit note type, Corrected",
		interpretation: "Credit Note",
		key: "SELF_BILLET_FACTORED_CREDIT_NOTE_CREDIT_NOTE_TYPE_CORRECTED",
	},
	{
		value: "503",
		name: " Prepayment credit note, credit note type, Corrected",
		interpretation: "Credit Note",
		key: "PREPAYMENT_CREDIT_NOTE_CREDIT_NOTE_TYPE_CORRECTED",
	},
	{
		value: "527",
		name: "Self billed debit note",
		description:
			"A document which indicates that the customer is claiming debit in a self billing environment.",
		interpretation: "Invoice",
		key: "SELF_BILLED_DEBIT_NOTE",
	},
	{
		value: "532",
		name: "Forwarder's credit note",
		description:
			"Document/message for providing credit information to the relevant party.",
		interpretation: "Credit Note",
		key: "FORWARDER_S_CREDIT_NOTE",
	},
	{
		value: "553",
		name: "Forwarder's invoice discrepancy report",
		description:
			"Document/message reporting invoice discrepancies indentified by the forwarder.",
		interpretation: "Invoice",
		key: "FORWARDER_S_INVOICE_DISCREPANCY_REPORT",
	},
	{
		value: "575",
		name: "Insurer's invoice",
		description:
			"Document/message issued by an insurer specifying the cost of an insurance which has been effected and claiming payment therefore.",
		interpretation: "Invoice",
		key: "INSURER_S_INVOICE",
	},
	{
		value: "623",
		name: "Forwarder's invoice",
		description:
			"Invoice issued by a freight forwarder specifying services rendered and costs incurred and claiming payment therefore.",
		interpretation: "Invoice",
		key: "FORWARDER_S_INVOICE",
	},
	{
		value: "633",
		name: "Port charges documents",
		description:
			"Documents/messages specifying services rendered, storage and handling costs, demurrage and other charges due to the owner of goods described therein.",
		interpretation: "Invoice",
		key: "PORT_CHARGES_DOCUMENTS",
	},
	{
		value: "751",
		name: "Invoice information for accounting purposes",
		description:
			"A document / message containing accounting related information such as monetary summations, seller id and VAT information. This may not be a complete invoice according to legal requirements. For instance the line item information might be excluded.",
		interpretation: "Invoice",
		key: "INVOICE_INFORMATION_FOR_ACCOUNTING_PURPOSES",
	},
	{
		value: "780",
		name: "Freight invoice",
		description:
			"Document/message issued by a transport operation specifying freight costs and charges incurred for a transport operation and stating conditions of payment.",
		interpretation: "Invoice",
		key: "FREIGHT_INVOICE",
	},
	{
		value: "817",
		name: "Claim notification",
		description: "Document notifying a claim.",
		interpretation: "Invoice",
		key: "CLAIM_NOTIFICATION",
	},
	{
		value: "870",
		name: "Consular invoice",
		description:
			"Document/message to be prepared by an exporter in his country and presented to a diplomatic representation of the importing country for endorsement and subsequently to be presented by the importer in connection with the import of the goods described therein.",
		interpretation: "Invoice",
		key: "CONSULAR_INVOICE",
	},
	{
		value: "875",
		name: "Partial construction invoice",
		description:
			"Partial invoice in the context of a specific construction project.",
		interpretation: "Invoice",
		key: "PARTIAL_CONSTRUCTION_INVOICE",
	},
	{
		value: "876",
		name: "Partial final construction invoice",
		description:
			"Invoice concluding all previous partial construction invoices of a completed partial rendered service in the context of a specific construction project.",
		interpretation: "Invoice",
		key: "PARTIAL_FINAL_CONSTRUCTION_INVOICE",
	},
	{
		value: "877",
		name: "Final construction invoice",
		description:
			"Invoice concluding all previous partial invoices and partial final construction invoices in the context of a specific construction project.",
		interpretation: "Invoice",
		key: "FINAL_CONSTRUCTION_INVOICE",
	},
	{
		value: "935",
		name: "Customs invoice",
		description:
			"Document/message required by the Customs in an importing country in which an exporter states the invoice or other price (e.g. selling price, price of identical goods), and specifies costs for freight, insurance and packing, etc., terms of delivery and payment, for the purpose of determining the Customs value in the importing country of goods consigned to that country.",
		interpretation: "Invoice",
		key: "CUSTOMS_INVOICE",
	},
	{
		value: "1",
		name: "Certificate of analysis",
		description: "Certificate providing the values of an analysis.",
		key: "CERTIFICATE_OF_ANALYSIS",
	},
	{
		value: "2",
		name: "Certificate of conformity",
		description:
			"Certificate certifying the conformity to predefined definitions.",
		key: "CERTIFICATE_OF_CONFORMITY",
	},
	{
		value: "3",
		name: "Certificate of quality",
		description: "Certificate certifying the quality of goods, services etc.",
		key: "CERTIFICATE_OF_QUALITY",
	},
	{
		value: "4",
		name: "Test report",
		description: "Report providing the results of a test session.",
		key: "TEST_REPORT",
	},
	{
		value: "5",
		name: "Product performance report",
		description: "Report specifying the performance values of products.",
		key: "PRODUCT_PERFORMANCE_REPORT",
	},
	{
		value: "6",
		name: "Product specification report",
		description: "Report providing specification values of products.",
		key: "PRODUCT_SPECIFICATION_REPORT",
	},
	{
		value: "7",
		name: "Process data report",
		description: "Reports on events during production process.",
		key: "PROCESS_DATA_REPORT",
	},
	{
		value: "8",
		name: "First sample test report",
		description:
			"Document/message describes the test report of the first sample.",
		key: "FIRST_SAMPLE_TEST_REPORT",
	},
	{
		value: "9",
		name: "Price/sales catalogue",
		description:
			"A document/message to enable the transmission of information regarding pricing and catalogue details for goods and services offered by a seller to a buyer.",
		key: "PRICE_SALES_CATALOGUE",
	},
	{
		value: "10",
		name: "Party information",
		description: "Document/message providing basic data concerning a party.",
		key: "PARTY_INFORMATION",
	},
	{
		value: "11",
		name: "Federal label approval",
		description:
			"A pre-approved document relating to federal label approval requirements.",
		key: "FEDERAL_LABEL_APPROVAL",
	},
	{
		value: "12",
		name: "Mill certificate",
		description:
			"Certificate certifying a specific quality of agricultural products.",
		key: "MILL_CERTIFICATE",
	},
	{
		value: "13",
		name: "Post receipt",
		description:
			"Document/message which evidences the transport of goods by post (e.g. mail, parcel, etc.).",
		key: "POST_RECEIPT",
	},
	{
		value: "14",
		name: "Weight certificate",
		description: "Certificate certifying the weight of goods.",
		key: "WEIGHT_CERTIFICATE",
	},
	{
		value: "15",
		name: "Weight list",
		description: "Document/message specifying the weight of goods.",
		key: "WEIGHT_LIST",
	},
	{
		value: "16",
		name: "Certificate",
		description:
			"Document by means of which the documentary credit applicant specifies the conditions for the certificate and by whom the certificate is to be issued.",
		key: "CERTIFICATE",
	},
	{
		value: "17",
		name: "Combined certificate of value and origin",
		description:
			"Document identifying goods in which the issuing authority expressly certifies that the goods originate in a specific country or part of, or group of countries. It also states the price and/or cost of the goods with the purpose of determining the customs origin.",
		key: "COMBINED_CERTIFICATE_OF_VALUE_AND_ORIGIN",
	},
	{
		value: "18",
		name: "Movement certificate A.TR.1",
		description:
			"Specific form of transit declaration issued by the exporter (movement certificate).",
		key: "MOVEMENT_CERTIFICATE_A_TR_1",
	},
	{
		value: "19",
		name: "Certificate of quantity",
		description: "Certificate certifying the quantity of goods, services etc.",
		key: "CERTIFICATE_OF_QUANTITY",
	},
	{
		value: "20",
		name: "Quality data message",
		description: "Usage of QALITY-message.",
		key: "QUALITY_DATA_MESSAGE",
	},
	{
		value: "21",
		name: "Query",
		description: "Request information based on defined criteria.",
		key: "QUERY",
	},
	{
		value: "22",
		name: "Response to query",
		description: "Document/message returned as an answer to a question.",
		key: "RESPONSE_TO_QUERY",
	},
	{
		value: "23",
		name: "Status information",
		description: "Information regarding the status of a related message.",
		key: "STATUS_INFORMATION",
	},
	{
		value: "24",
		name: "Restow",
		description:
			"Message/document identifying containers that have been unloaded and then reloaded onto the same means of transport.",
		key: "RESTOW",
	},
	{
		value: "25",
		name: "Container discharge list",
		description:
			"Message/document itemising containers to be discharged from vessel.",
		key: "CONTAINER_DISCHARGE_LIST",
	},
	{
		value: "26",
		name: "Corporate superannuation contributions advice",
		description:
			"Document/message providing contributions advice used for corporate superannuation schemes.",
		key: "CORPORATE_SUPERANNUATION_CONTRIBUTIONS_ADVICE",
	},
	{
		value: "27",
		name: "Industry superannuation contributions advice",
		description:
			"Document/message providing contributions advice used for superannuation schemes which are industry wide.",
		key: "INDUSTRY_SUPERANNUATION_CONTRIBUTIONS_ADVICE",
	},
	{
		value: "28",
		name: "Corporate superannuation member maintenance message",
		description:
			"Member maintenance message used for corporate superannuation schemes.",
		key: "CORPORATE_SUPERANNUATION_MEMBER_MAINTENANCE_MESSAGE",
	},
	{
		value: "29",
		name: "Industry superannuation member maintenance message",
		description:
			"Member maintenance message used for industry wide superannuation schemes.",
		key: "INDUSTRY_SUPERANNUATION_MEMBER_MAINTENANCE_MESSAGE",
	},
	{
		value: "30",
		name: "Life insurance payroll deductions advice",
		description:
			"Payroll deductions advice used in the life insurance industry.",
		key: "LIFE_INSURANCE_PAYROLL_DEDUCTIONS_ADVICE",
	},
	{
		value: "31",
		name: "Underbond request",
		description:
			"A Message/document requesting to move cargo from one Customs control point to another.",
		key: "UNDERBOND_REQUEST",
	},
	{
		value: "32",
		name: "Underbond approval",
		description:
			"A message/document issuing Customs approval to move cargo from one Customs control point to another.",
		key: "UNDERBOND_APPROVAL",
	},
	{
		value: "33",
		name: "Certificate of sealing of export meat lockers",
		description:
			"Document / message issued by the authority in the exporting country evidencing the sealing of export meat lockers.",
		key: "CERTIFICATE_OF_SEALING_OF_EXPORT_MEAT_LOCKERS",
	},
	{
		value: "34",
		name: "Cargo status",
		description: "Message identifying the status of cargo.",
		key: "CARGO_STATUS",
	},
	{
		value: "35",
		name: "Inventory report",
		description:
			"A message specifying information relating to held inventories.",
		key: "INVENTORY_REPORT",
	},
	{
		value: "36",
		name: "Identity card",
		description: "Official document to identify a person.",
		key: "IDENTITY_CARD",
	},
	{
		value: "37",
		name: "Response to a trade statistics message",
		description:
			"Document/message in which the competent national authorities provide a declarant with an acceptance or a rejection about a received declaration for European statistical purposes.",
		key: "RESPONSE_TO_A_TRADE_STATISTICS_MESSAGE",
	},
	{
		value: "38",
		name: "Vaccination certificate",
		description:
			"Official document proving immunisation against certain diseases.",
		key: "VACCINATION_CERTIFICATE",
	},
	{
		value: "39",
		name: "Passport",
		description:
			"An official document giving permission to travel in foreign countries.",
		key: "PASSPORT",
	},
	{
		value: "40",
		name: "Driving licence (national)",
		description:
			"An official document giving permission to drive a vehicle in a given country.",
		key: "DRIVING_LICENCE_NATIONAL",
	},
	{
		value: "41",
		name: "Driving licence (international)",
		description:
			"An official document giving a native of one country permission to drive a vehicle in certain other countries.",
		key: "DRIVING_LICENCE_INTERNATIONAL",
	},
	{
		value: "42",
		name: "Free pass",
		description: "A document giving free access to a service.",
		key: "FREE_PASS",
	},
	{
		value: "43",
		name: "Season ticket",
		description:
			"A document giving access to a service for a determined period of time.",
		key: "SEASON_TICKET",
	},
	{
		value: "44",
		name: "Transport status report",
		description:
			"(1125) A message to report the transport status and/or change in the transport status (i.e. event) between agreed parties.",
		key: "TRANSPORT_STATUS_REPORT",
	},
	{
		value: "45",
		name: "Transport status request",
		description:
			"(1127) A message to request a transport status report (e.g. through the national multimodal status report message IFSTA).",
		key: "TRANSPORT_STATUS_REQUEST",
	},
	{
		value: "46",
		name: "Banking status",
		description: "A banking status document and/or message.",
		key: "BANKING_STATUS",
	},
	{
		value: "47",
		name: "Extra-Community trade statistical declaration",
		description:
			"Document/message in which a declarant provides information about extra-Community trade of goods required by the body responsible for the collection of trade statistics. Trade by a country in the European Union with a country outside the European Union.",
		key: "EXTRA_COMMUNITY_TRADE_STATISTICAL_DECLARATION",
	},
	{
		value: "48",
		name: "Written instructions in conformance with ADR article number",
		description:
			"10385 Written instructions relating to dangerous goods and defined in the European Agreement of Dangerous Transport by Road known as ADR (Accord europeen relatif au transport international des marchandises Dangereuses par Route).",
		key: "WRITTEN_INSTRUCTIONS_IN_CONFORMANCE_WITH_ADR_ARTICLE_NUMBER",
	},
	{
		value: "49",
		name: "Damage certification",
		description:
			"Official certification that damages to the goods to be transported have been discovered.",
		key: "DAMAGE_CERTIFICATION",
	},
	{
		value: "50",
		name: "Validated priced tender",
		description: "A validated priced tender.",
		key: "VALIDATED_PRICED_TENDER",
	},
	{
		value: "51",
		name: "Price/sales catalogue response",
		description:
			"A document providing a response to a previously sent price/sales catalogue.",
		key: "PRICE_SALES_CATALOGUE_RESPONSE",
	},
	{
		value: "52",
		name: "Price negotiation result",
		description: "A document providing the result of price negotiations.",
		key: "PRICE_NEGOTIATION_RESULT",
	},
	{
		value: "53",
		name: "Safety and hazard data sheet",
		description:
			"Document or message to supply advice on a dangerous or hazardous material to industrial customers so as to enable them to take measures to protect their employees and the environment from any potential harmful effects from these material.",
		key: "SAFETY_AND_HAZARD_DATA_SHEET",
	},
	{
		value: "54",
		name: "Legal statement of an account",
		description:
			"A statement of an account containing the booked items as in the ledger of the account servicing financial institution.",
		key: "LEGAL_STATEMENT_OF_AN_ACCOUNT",
	},
	{
		value: "55",
		name: "Listing statement of an account",
		description:
			"A statement from the account servicing financial institution containing items pending to be booked.",
		key: "LISTING_STATEMENT_OF_AN_ACCOUNT",
	},
	{
		value: "56",
		name: "Closing statement of an account",
		description:
			"Last statement of a period containing the interest calculation and the final balance of the last entry date.",
		key: "CLOSING_STATEMENT_OF_AN_ACCOUNT",
	},
	{
		value: "57",
		name: "Transport equipment on-hire report",
		description:
			"Report on the movement of containers or other items of transport equipment to record physical movement activity and establish the beginning of a rental period.",
		key: "TRANSPORT_EQUIPMENT_ON_HIRE_REPORT",
	},
	{
		value: "58",
		name: "Transport equipment off-hire report",
		description:
			"Report on the movement of containers or other items of transport equipment to record physical movement activity and establish the end of a rental period.",
		key: "TRANSPORT_EQUIPMENT_OFF_HIRE_REPORT",
	},
	{
		value: "59",
		name: "Treatment - nil outturn",
		description:
			"No shortage, surplus or damaged outturn resulting from container vessel unpacking.",
		key: "TREATMENT_NIL_OUTTURN",
	},
	{
		value: "60",
		name: "Treatment - time-up underbond",
		description:
			"Movement type indicator: goods are moved under customs control for warehousing due to being time-up.",
		key: "TREATMENT_TIME_UP_UNDERBOND",
	},
	{
		value: "61",
		name: "Treatment - underbond by sea",
		description:
			"Movement type indicator: goods are to move by sea under customs control to a customs office where formalities will be completed.",
		key: "TREATMENT_UNDERBOND_BY_SEA",
	},
	{
		value: "62",
		name: "Treatment - personal effect",
		description: "Cargo consists of personal effects.",
		key: "TREATMENT_PERSONAL_EFFECT",
	},
	{
		value: "63",
		name: "Treatment - timber",
		description: "Cargo consists of timber.",
		key: "TREATMENT_TIMBER",
	},
	{
		value: "64",
		name: "Preliminary credit assessment",
		description:
			"Document/message issued either by a factor to indicate his preliminary credit assessment on a buyer, or by a seller to request a factor's preliminary credit assessment on a buyer.",
		key: "PRELIMINARY_CREDIT_ASSESSMENT",
	},
	{
		value: "65",
		name: "Credit cover",
		description:
			"Document/message issued either by a factor to give a credit cover on a buyer, or by a seller to request a factor's credit cover.",
		key: "CREDIT_COVER",
	},
	{
		value: "66",
		name: "Current account",
		description:
			"Document/message issued by a factor to indicate the money movements of a seller's or another factor's account with him.",
		key: "CURRENT_ACCOUNT",
	},
	{
		value: "67",
		name: "Commercial dispute",
		description:
			"Document/message issued by a party (usually the buyer) to indicate that one or more invoices or one or more credit notes are disputed for payment.",
		key: "COMMERCIAL_DISPUTE",
	},
	{
		value: "68",
		name: "Chargeback",
		description:
			"Document/message issued by a factor to a seller or to another factor to indicate that the rest of the amounts of one or more invoices uncollectable from buyers are charged back to clear the invoice(s) off the ledger.",
		key: "CHARGEBACK",
	},
	{
		value: "69",
		name: "Reassignment",
		description:
			"Document/message issued by a factor to a seller or to another factor to reassign an invoice or credit note previously assigned to him.",
		key: "REASSIGNMENT",
	},
	{
		value: "70",
		name: "Collateral account",
		description:
			"Document message issued by a factor to indicate the movements of invoices, credit notes and payments of a seller's account.",
		key: "COLLATERAL_ACCOUNT",
	},
	{
		value: "72",
		name: "Unship permit",
		description: "A message or document issuing permission to unship cargo.",
		key: "UNSHIP_PERMIT",
	},
	{
		value: "73",
		name: "Statistical definitions",
		description: "Transmission of one or more statistical definitions.",
		key: "STATISTICAL_DEFINITIONS",
	},
	{
		value: "74",
		name: "Statistical data",
		description: "Transmission of one or more items of data or data sets.",
		key: "STATISTICAL_DATA",
	},
	{
		value: "75",
		name: "Request for statistical data",
		description:
			"Request for one or more items or data sets of statistical data.",
		key: "REQUEST_FOR_STATISTICAL_DATA",
	},
	{
		value: "76",
		name: "Call-off delivery",
		description:
			"Document/message to provide split quantities and delivery dates referring to a previous delivery instruction.",
		key: "CALL_OFF_DELIVERY",
	},
	{
		value: "77",
		name: "Consignment status report",
		description: "Message covers information about the consignment status.",
		key: "CONSIGNMENT_STATUS_REPORT",
	},
	{
		value: "78",
		name: "Inventory movement advice",
		description: "Advice of inventory movements.",
		key: "INVENTORY_MOVEMENT_ADVICE",
	},
	{
		value: "79",
		name: "Inventory status advice",
		description: "Advice of stock on hand.",
		key: "INVENTORY_STATUS_ADVICE",
	},
	{
		value: "85",
		name: "Customs manifest",
		description:
			"Message/document identifying a customs manifest. The document itemises a list of cargo prepared by shipping companies from bills of landing and presented to customs for formal report of cargo.",
		key: "CUSTOMS_MANIFEST",
	},
	{
		value: "86",
		name: "Vessel unpack report",
		description:
			"A document code to indicate that the message being transmitted identifies all short and surplus cargoes off-loaded from a vessel at a specified discharging port.",
		key: "VESSEL_UNPACK_REPORT",
	},
	{
		value: "87",
		name: "General cargo summary manifest report",
		description:
			"A document code to indicate that the message being transmitted is summary manifest information for general cargo.",
		key: "GENERAL_CARGO_SUMMARY_MANIFEST_REPORT",
	},
	{
		value: "88",
		name: "Consignment unpack report",
		description:
			"A document code to indicate that the message being transmitted is a consignment unpack report only.",
		key: "CONSIGNMENT_UNPACK_REPORT",
	},
	{
		value: "89",
		name: "Meat and meat by-products sanitary certificate",
		description:
			"Document or message issued by the competent authority in the exporting country evidencing that meat or meat by- products comply with the requirements set by the importing country.",
		key: "MEAT_AND_MEAT_BY_PRODUCTS_SANITARY_CERTIFICATE",
	},
	{
		value: "90",
		name: "Meat food products sanitary certificate",
		description:
			"Document or message issued by the competent authority in the exporting country evidencing that meat food products comply with the requirements set by the importing country.",
		key: "MEAT_FOOD_PRODUCTS_SANITARY_CERTIFICATE",
	},
	{
		value: "91",
		name: "Poultry sanitary certificate",
		description:
			"Document or message issued by the competent authority in the exporting country evidencing that poultry products comply with the requirements set by the importing country.",
		key: "POULTRY_SANITARY_CERTIFICATE",
	},
	{
		value: "92",
		name: "Horsemeat sanitary certificate",
		description:
			"Document or message issued by the competent authority in the exporting country evidencing that horsemeat products comply with the requirements set by the importing country.",
		key: "HORSEMEAT_SANITARY_CERTIFICATE",
	},
	{
		value: "93",
		name: "Casing sanitary certificate",
		description:
			"Document or message issued by the competent authority in the exporting country evidencing that casing products comply with the requirements set by the importing country.",
		key: "CASING_SANITARY_CERTIFICATE",
	},
	{
		value: "94",
		name: "Pharmaceutical sanitary certificate",
		description:
			"Document or message issued by the competent authority in the exporting country evidencing that pharmaceutical products comply with the requirements set by the importing country.",
		key: "PHARMACEUTICAL_SANITARY_CERTIFICATE",
	},
	{
		value: "95",
		name: "Inedible sanitary certificate",
		description:
			"Document or message issued by the competent authority in the exporting country evidencing that inedible products comply with the requirements set by the importing country.",
		key: "INEDIBLE_SANITARY_CERTIFICATE",
	},
	{
		value: "96",
		name: "Impending arrival",
		description: "Notification of impending arrival details for vessel.",
		key: "IMPENDING_ARRIVAL",
	},
	{
		value: "97",
		name: "Means of transport advice",
		description:
			"Message reporting the means of transport used to carry goods or cargo.",
		key: "MEANS_OF_TRANSPORT_ADVICE",
	},
	{
		value: "98",
		name: "Arrival information",
		description: "Message reporting the arrival details of goods or cargo.",
		key: "ARRIVAL_INFORMATION",
	},
	{
		value: "99",
		name: "Cargo release notification",
		description:
			"Message/document sent by the cargo handler indicating that the cargo has moved from a Customs controlled premise.",
		key: "CARGO_RELEASE_NOTIFICATION",
	},
	{
		value: "100",
		name: "Excise certificate",
		description:
			"Certificate asserting that the goods have been submitted to the excise authorities before departure from the exporting country or before delivery in case of import traffic.",
		key: "EXCISE_CERTIFICATE",
	},
	{
		value: "101",
		name: "Registration document",
		description: "An official document providing registration details.",
		key: "REGISTRATION_DOCUMENT",
	},
	{
		value: "103",
		name: "Transport equipment direct interchange report",
		description:
			"Report on the movement of containers or other items of transport equipment being exchanged, establishing relevant rental periods.",
		key: "TRANSPORT_EQUIPMENT_DIRECT_INTERCHANGE_REPORT",
	},
	{
		value: "104",
		name: "Transport equipment impending arrival advice",
		description:
			"Advice that containers or other items of transport equipment may be expected to be delivered to a certain location.",
		key: "TRANSPORT_EQUIPMENT_IMPENDING_ARRIVAL_ADVICE",
	},
	{
		value: "105",
		name: "Purchase order",
		description:
			"Document/message issued within an enterprise to initiate the purchase of articles, materials or services required for the production or manufacture of goods to be offered for sale or otherwise supplied to customers.",
		key: "PURCHASE_ORDER",
	},
	{
		value: "106",
		name: "Transport equipment damage report",
		description:
			"Report of damaged items of transport equipment that have been returned.",
		key: "TRANSPORT_EQUIPMENT_DAMAGE_REPORT",
	},
	{
		value: "107",
		name: "Transport equipment maintenance and repair work estimate",
		description:
			"advice Advice providing estimates of transport equipment maintenance and repair costs.",
		key: "TRANSPORT_EQUIPMENT_MAINTENANCE_AND_REPAIR_WORK_ESTIMATE",
	},
	{
		value: "108",
		name: "Transport equipment empty release instruction",
		description:
			"Instruction to release an item of empty transport equipment to a specified party or parties.",
		key: "TRANSPORT_EQUIPMENT_EMPTY_RELEASE_INSTRUCTION",
	},
	{
		value: "109",
		name: "Transport movement gate in report",
		description:
			"Report on the inward movement of cargo, containers or other items of transport equipment which have been delivered to a facility by an inland carrier.",
		key: "TRANSPORT_MOVEMENT_GATE_IN_REPORT",
	},
	{
		value: "110",
		name: "Manufacturing instructions",
		description:
			"Document/message issued within an enterprise to initiate the manufacture of goods to be offered for sale.",
		key: "MANUFACTURING_INSTRUCTIONS",
	},
	{
		value: "111",
		name: "Transport movement gate out report",
		description:
			"Report on the outward movement of cargo, containers or other items of transport equipment (either full or empty) which have been picked up by an inland carrier.",
		key: "TRANSPORT_MOVEMENT_GATE_OUT_REPORT",
	},
	{
		value: "112",
		name: "Transport equipment unpacking instruction",
		description:
			"Instruction to unpack specified cargo from specified containers or other items of transport equipment.",
		key: "TRANSPORT_EQUIPMENT_UNPACKING_INSTRUCTION",
	},
	{
		value: "113",
		name: "Transport equipment unpacking report",
		description:
			"Report on the completion of unpacking specified containers or other items of transport equipment.",
		key: "TRANSPORT_EQUIPMENT_UNPACKING_REPORT",
	},
	{
		value: "114",
		name: "Transport equipment pick-up availability request",
		description:
			"Request for confirmation that an item of transport equipment will be available for collection.",
		key: "TRANSPORT_EQUIPMENT_PICK_UP_AVAILABILITY_REQUEST",
	},
	{
		value: "115",
		name: "Transport equipment pick-up availability confirmation",
		description:
			"Confirmation that an item of transport equipment is available for collection.",
		key: "TRANSPORT_EQUIPMENT_PICK_UP_AVAILABILITY_CONFIRMATION",
	},
	{
		value: "116",
		name: "Transport equipment pick-up report",
		description:
			"Report that an item of transport equipment has been collected.",
		key: "TRANSPORT_EQUIPMENT_PICK_UP_REPORT",
	},
	{
		value: "117",
		name: "Transport equipment shift report",
		description:
			"Report on the movement of containers or other items of transport within a facility.",
		key: "TRANSPORT_EQUIPMENT_SHIFT_REPORT",
	},
	{
		value: "118",
		name: "Transport discharge instruction",
		description:
			"Instruction to unload specified cargo, containers or transport equipment from a means of transport.",
		key: "TRANSPORT_DISCHARGE_INSTRUCTION",
	},
	{
		value: "119",
		name: "Transport discharge report",
		description:
			"Report on cargo, containers or transport equipment unloaded from a particular means of transport.",
		key: "TRANSPORT_DISCHARGE_REPORT",
	},
	{
		value: "120",
		name: "Stores requisition",
		description:
			"Document/message issued within an enterprise ordering the taking out of stock of goods.",
		key: "STORES_REQUISITION",
	},
	{
		value: "121",
		name: "Transport loading instruction",
		description:
			"Instruction to load cargo, containers or transport equipment onto a means of transport.",
		key: "TRANSPORT_LOADING_INSTRUCTION",
	},
	{
		value: "122",
		name: "Transport loading report",
		description:
			"Report on completion of loading cargo, containers or other transport equipment onto a means of transport.",
		key: "TRANSPORT_LOADING_REPORT",
	},
	{
		value: "123",
		name: "Transport equipment maintenance and repair work",
		description:
			"authorisation Authorisation to have transport equipment repaired or to have maintenance performed.",
		key: "TRANSPORT_EQUIPMENT_MAINTENANCE_AND_REPAIR_WORK",
	},
	{
		value: "124",
		name: "Transport departure report",
		description:
			"Report of the departure of a means of transport from a particular facility.",
		key: "TRANSPORT_DEPARTURE_REPORT",
	},
	{
		value: "125",
		name: "Transport empty equipment advice",
		description:
			"Advice that an item or items of empty transport equipment are available for return.",
		key: "TRANSPORT_EMPTY_EQUIPMENT_ADVICE",
	},
	{
		value: "126",
		name: "Transport equipment acceptance order",
		description:
			"Order to accept items of transport equipment which are to be delivered by an inland carrier (rail, road or barge) to a specified facility.",
		key: "TRANSPORT_EQUIPMENT_ACCEPTANCE_ORDER",
	},
	{
		value: "127",
		name: "Transport equipment special service instruction",
		description:
			"Instruction to perform a specified service or services on an item or items of transport equipment.",
		key: "TRANSPORT_EQUIPMENT_SPECIAL_SERVICE_INSTRUCTION",
	},
	{
		value: "128",
		name: "Transport equipment stock report",
		description:
			"Report on the number of items of transport equipment stored at one or more locations.",
		key: "TRANSPORT_EQUIPMENT_STOCK_REPORT",
	},
	{
		value: "129",
		name: "Transport cargo release order",
		description:
			"Order to release cargo or items of transport equipment to a specified party.",
		key: "TRANSPORT_CARGO_RELEASE_ORDER",
	},
	{
		value: "131",
		name: "Transport equipment packing instruction",
		description:
			"Instruction to pack cargo into a container or other item of transport equipment.",
		key: "TRANSPORT_EQUIPMENT_PACKING_INSTRUCTION",
	},
	{
		value: "132",
		name: "Customs clearance notice",
		description:
			"Notification of customs clearance of cargo or items of transport equipment.",
		key: "CUSTOMS_CLEARANCE_NOTICE",
	},
	{
		value: "133",
		name: "Customs documents expiration notice",
		description:
			"Notice specifying expiration of Customs documents relating to cargo or items of transport equipment.",
		key: "CUSTOMS_DOCUMENTS_EXPIRATION_NOTICE",
	},
	{
		value: "134",
		name: "Transport equipment on-hire request",
		description:
			"Request for transport equipment to be made available for hire.",
		key: "TRANSPORT_EQUIPMENT_ON_HIRE_REQUEST",
	},
	{
		value: "135",
		name: "Transport equipment on-hire order",
		description:
			"Order to release empty items of transport equipment for on-hire to a lessee, and authorising collection by or on behalf of a specified party.",
		key: "TRANSPORT_EQUIPMENT_ON_HIRE_ORDER",
	},
	{
		value: "136",
		name: "Transport equipment off-hire request",
		description:
			"Request to terminate the lease on an item of transport equipment at a specified time.",
		key: "TRANSPORT_EQUIPMENT_OFF_HIRE_REQUEST",
	},
	{
		value: "137",
		name: "Transport equipment survey order",
		description:
			"Order to perform a survey on specified items of transport equipment.",
		key: "TRANSPORT_EQUIPMENT_SURVEY_ORDER",
	},
	{
		value: "138",
		name: "Transport equipment survey order response",
		description:
			"Response to an order to conduct a survey of transport equipment.",
		key: "TRANSPORT_EQUIPMENT_SURVEY_ORDER_RESPONSE",
	},
	{
		value: "139",
		name: "Transport equipment survey report",
		description: "Survey report of specified items of transport equipment.",
		key: "TRANSPORT_EQUIPMENT_SURVEY_REPORT",
	},
	{
		value: "140",
		name: "Packing instructions",
		description:
			"Document/message within an enterprise giving instructions on how goods are to be packed.",
		key: "PACKING_INSTRUCTIONS",
	},
	{
		value: "141",
		name: "Advising items to be booked to a financial account",
		description:
			"A document and/or message advising of items which have to be booked to a financial account.",
		key: "ADVISING_ITEMS_TO_BE_BOOKED_TO_A_FINANCIAL_ACCOUNT",
	},
	{
		value: "142",
		name: "Transport equipment maintenance and repair work estimate",
		description:
			"order Order to draw up an estimate of the costs of maintenance or repair of transport equipment.",
		key: "TRANSPORT_EQUIPMENT_MAINTENANCE_AND_REPAIR_WORK_ESTIMATE",
	},
	{
		value: "143",
		name: "Transport equipment maintenance and repair notice",
		description:
			"Report of transport equipment which has been repaired or has had maintenance performed.",
		key: "TRANSPORT_EQUIPMENT_MAINTENANCE_AND_REPAIR_NOTICE",
	},
	{
		value: "144",
		name: "Empty container disposition order",
		description: "Order to make available empty containers.",
		key: "EMPTY_CONTAINER_DISPOSITION_ORDER",
	},
	{
		value: "145",
		name: "Cargo vessel discharge order",
		description:
			"Order that the containers or cargo specified are to be discharged from a vessel.",
		key: "CARGO_VESSEL_DISCHARGE_ORDER",
	},
	{
		value: "146",
		name: "Cargo vessel loading order",
		description:
			"Order that specified cargo, containers or groups of containers are to be loaded in or on a vessel.",
		key: "CARGO_VESSEL_LOADING_ORDER",
	},
	{
		value: "147",
		name: "Multidrop order",
		description:
			"One purchase order that contains the orders of two or more vendors and the associated delivery points for each.",
		key: "MULTIDROP_ORDER",
	},
	{
		value: "148",
		name: "Bailment contract",
		description: "A document authorizing the bailing of goods.",
		key: "BAILMENT_CONTRACT",
	},
	{
		value: "149",
		name: "Basic agreement",
		description:
			"A document indicating an agreement containing basic terms and conditions applicable to future contracts between two parties.",
		key: "BASIC_AGREEMENT",
	},
	{
		value: "150",
		name: "Internal transport order",
		description:
			"Document/message giving instructions about the transport of goods within an enterprise.",
		key: "INTERNAL_TRANSPORT_ORDER",
	},
	{
		value: "151",
		name: "Grant",
		description: "A document indicating the granting of funds.",
		key: "GRANT",
	},
	{
		value: "152",
		name: "Indefinite delivery indefinite quantity contract",
		description:
			"A document indicating a contract calling for the indefinite deliveries of indefinite quantities of goods.",
		key: "INDEFINITE_DELIVERY_INDEFINITE_QUANTITY_CONTRACT",
	},
	{
		value: "153",
		name: "Indefinite delivery definite quantity contract",
		description:
			"A document indicating a contract calling for indefinite deliveries of definite quantities.",
		key: "INDEFINITE_DELIVERY_DEFINITE_QUANTITY_CONTRACT",
	},
	{
		value: "154",
		name: "Requirements contract",
		description:
			"A document indicating a requirements contract that authorizes the filling of all purchase requirements during a specified contract period.",
		key: "REQUIREMENTS_CONTRACT",
	},
	{
		value: "155",
		name: "Task order",
		description:
			"A document indicating an order that tasks a contractor to perform a specified function.",
		key: "TASK_ORDER",
	},
	{
		value: "156",
		name: "Make or buy plan",
		description:
			"A document indicating a plan that identifies which items will be made and which items will be bought.",
		key: "MAKE_OR_BUY_PLAN",
	},
	{
		value: "157",
		name: "Subcontractor plan",
		description:
			"A document indicating a plan that identifies the manufacturer's subcontracting strategy for a specific contract.",
		key: "SUBCONTRACTOR_PLAN",
	},
	{
		value: "158",
		name: "Cost data summary",
		description: "A document indicating a summary of cost data.",
		key: "COST_DATA_SUMMARY",
	},
	{
		value: "159",
		name: "Certified cost and price data",
		description:
			"A document indicating cost and price data whose accuracy has been certified.",
		key: "CERTIFIED_COST_AND_PRICE_DATA",
	},
	{
		value: "160",
		name: "Wage determination",
		description:
			"A document indicating a determination of the wages to be paid.",
		key: "WAGE_DETERMINATION",
	},
	{
		value: "161",
		name: "Contract Funds Status Report (CFSR)",
		description:
			"A report to provide the status of funds applicable to the contract.",
		key: "CONTRACT_FUNDS_STATUS_REPORT_CFSR",
	},
	{
		value: "162",
		name: "Certified inspection and test results",
		description:
			"A certification as to the accuracy of inspection and test results.",
		key: "CERTIFIED_INSPECTION_AND_TEST_RESULTS",
	},
	{
		value: "163",
		name: "Material inspection and receiving report",
		description:
			"A report that is both an inspection report for materials and a receiving document.",
		key: "MATERIAL_INSPECTION_AND_RECEIVING_REPORT",
	},
	{
		value: "164",
		name: "Purchasing specification",
		description:
			"A document indicating a specification used to purchase an item.",
		key: "PURCHASING_SPECIFICATION",
	},
	{
		value: "165",
		name: "Payment or performance bond",
		description:
			"A document indicating a bond that guarantees the payment of monies or a performance.",
		key: "PAYMENT_OR_PERFORMANCE_BOND",
	},
	{
		value: "166",
		name: "Contract security classification specification",
		description:
			"A document that indicates the specification contains the security and classification requirements for a contract.",
		key: "CONTRACT_SECURITY_CLASSIFICATION_SPECIFICATION",
	},
	{
		value: "167",
		name: "Manufacturing specification",
		description:
			"A document indicating the specification of how an item is to be manufactured.",
		key: "MANUFACTURING_SPECIFICATION",
	},
	{
		value: "168",
		name: "Buy America certificate of compliance",
		description:
			"A document certifying that more than 50 percent of the cost of an item is attributed to US origin.",
		key: "BUY_AMERICA_CERTIFICATE_OF_COMPLIANCE",
	},
	{
		value: "169",
		name: "Container off-hire notice",
		description: "Notice to return leased containers.",
		key: "CONTAINER_OFF_HIRE_NOTICE",
	},
	{
		value: "170",
		name: "Cargo acceptance order",
		description: "Order to accept cargo to be delivered by a carrier.",
		key: "CARGO_ACCEPTANCE_ORDER",
	},
	{
		value: "171",
		name: "Pick-up notice",
		description:
			"Notice specifying the pick-up of released cargo or containers from a certain address.",
		key: "PICK_UP_NOTICE",
	},
	{
		value: "172",
		name: "Authorisation to plan and suggest orders",
		description:
			"Document or message that authorises receiver to plan orders, based on information in this message, and send these orders as suggestions to the sender.",
		key: "AUTHORISATION_TO_PLAN_AND_SUGGEST_ORDERS",
	},
	{
		value: "173",
		name: "Authorisation to plan and ship orders",
		description:
			"Document or message that authorises receiver to plan and ship orders based on information in this message.",
		key: "AUTHORISATION_TO_PLAN_AND_SHIP_ORDERS",
	},
	{
		value: "174",
		name: "Drawing",
		description: "The document or message is a drawing.",
		key: "DRAWING",
	},
	{
		value: "175",
		name: "Cost Performance Report (CPR) format 2",
		description:
			"A report identifying the cost performance on a contract at specified levels of the work breakdown structure (format 2 - organizational categories).",
		key: "COST_PERFORMANCE_REPORT_CPR_FORMAT_2",
	},
	{
		value: "176",
		name: "Cost Schedule Status Report (CSSR)",
		description:
			"A report providing the status of the cost and schedule applicable to a contract.",
		key: "COST_SCHEDULE_STATUS_REPORT_CSSR",
	},
	{
		value: "177",
		name: "Cost Performance Report (CPR) format 1",
		description:
			"A report identifying the cost performance on a contract including the current month's values at specified levels of the work breakdown structure (format 1 - work breakdown structure).",
		key: "COST_PERFORMANCE_REPORT_CPR_FORMAT_1",
	},
	{
		value: "178",
		name: "Cost Performance Report (CPR) format 3",
		description:
			"A report identifying the cost performance on a contract that summarizes changes to a contract over a given reporting period with beginning and ending values (format 3 - baseline).",
		key: "COST_PERFORMANCE_REPORT_CPR_FORMAT_3",
	},
	{
		value: "179",
		name: "Cost Performance Report (CPR) format 4",
		description:
			"A report identifying the cost performance on a contract including forecasts of labour requirements for the remaining portion of the contract (format 4 - staffing).",
		key: "COST_PERFORMANCE_REPORT_CPR_FORMAT_4",
	},
	{
		value: "180",
		name: "Cost Performance Report (CPR) format 5",
		description:
			"A report identifying the cost performance on a contract that summarizes cost or schedule variances (format 5 - explanations and problem analysis).",
		key: "COST_PERFORMANCE_REPORT_CPR_FORMAT_5",
	},
	{
		value: "181",
		name: "Progressive discharge report",
		description:
			"Document or message progressively issued by the container terminal operator in charge of discharging a vessel identifying containers that have been discharged from a specific vessel at that point in time.",
		key: "PROGRESSIVE_DISCHARGE_REPORT",
	},
	{
		value: "182",
		name: "Balance confirmation",
		description: "Confirmation of a balance at an entry date.",
		key: "BALANCE_CONFIRMATION",
	},
	{
		value: "183",
		name: "Container stripping order",
		description: "Order to unload goods from a container.",
		key: "CONTAINER_STRIPPING_ORDER",
	},
	{
		value: "184",
		name: "Container stuffing order",
		description:
			"Order to stuff specified goods or consignments in a container.",
		key: "CONTAINER_STUFFING_ORDER",
	},
	{
		value: "185",
		name: "Conveyance declaration (arrival)",
		description:
			"Declaration to the public authority upon arrival of the conveyance.",
		key: "CONVEYANCE_DECLARATION_ARRIVAL",
	},
	{
		value: "186",
		name: "Conveyance declaration (departure)",
		description:
			"Declaration to the public authority upon departure of the conveyance.",
		key: "CONVEYANCE_DECLARATION_DEPARTURE",
	},
	{
		value: "187",
		name: "Conveyance declaration (combined)",
		description:
			"Combined declaration of arrival and departure to the public authority.",
		key: "CONVEYANCE_DECLARATION_COMBINED",
	},
	{
		value: "188",
		name: "Project recovery plan",
		description:
			"A project plan for recovery after a delay or problem resolution.",
		key: "PROJECT_RECOVERY_PLAN",
	},
	{
		value: "189",
		name: "Project production plan",
		description: "A project plan for the production of goods.",
		key: "PROJECT_PRODUCTION_PLAN",
	},
	{
		value: "190",
		name: "Statistical and other administrative internal documents",
		description:
			"Documents/messages issued within an enterprise for the for the purpose of collection of production and other internal statistics, and for other administration purposes.",
		key: "STATISTICAL_AND_OTHER_ADMINISTRATIVE_INTERNAL_DOCUMENTS",
	},
	{
		value: "191",
		name: "Project master schedule",
		description:
			"A high level, all encompassing master schedule of activities to complete a project.",
		key: "PROJECT_MASTER_SCHEDULE",
	},
	{
		value: "192",
		name: "Priced alternate tender bill of quantity",
		description: "A priced tender based upon an alternate specification.",
		key: "PRICED_ALTERNATE_TENDER_BILL_OF_QUANTITY",
	},
	{
		value: "193",
		name: "Estimated priced bill of quantity",
		description:
			"An estimate based upon a detailed, quantity based specification (bill of quantity).",
		key: "ESTIMATED_PRICED_BILL_OF_QUANTITY",
	},
	{
		value: "194",
		name: "Draft bill of quantity",
		description:
			"Document/message providing a draft bill of quantity, issued in an unpriced form.",
		key: "DRAFT_BILL_OF_QUANTITY",
	},
	{
		value: "195",
		name: "Documentary credit collection instruction",
		description: "Instruction for the collection of the documentary credit.",
		key: "DOCUMENTARY_CREDIT_COLLECTION_INSTRUCTION",
	},
	{
		value: "196",
		name: "Request for an amendment of a documentary credit",
		description: "Request for an amendment of a documentary credit.",
		key: "REQUEST_FOR_AN_AMENDMENT_OF_A_DOCUMENTARY_CREDIT",
	},
	{
		value: "197",
		name: "Documentary credit amendment information",
		description: "Documentary credit amendment information.",
		key: "DOCUMENTARY_CREDIT_AMENDMENT_INFORMATION",
	},
	{
		value: "198",
		name: "Advice of an amendment of a documentary credit",
		description: "Advice of an amendment of a documentary credit.",
		key: "ADVICE_OF_AN_AMENDMENT_OF_A_DOCUMENTARY_CREDIT",
	},
	{
		value: "199",
		name: "Response to an amendment of a documentary credit",
		description: "Response to an amendment of a documentary credit.",
		key: "RESPONSE_TO_AN_AMENDMENT_OF_A_DOCUMENTARY_CREDIT",
	},
	{
		value: "200",
		name: "Documentary credit issuance information",
		description: "Provides information on documentary credit issuance.",
		key: "DOCUMENTARY_CREDIT_ISSUANCE_INFORMATION",
	},
	{
		value: "201",
		name: "Direct payment valuation request",
		description: "Request to establish a direct payment valuation.",
		key: "DIRECT_PAYMENT_VALUATION_REQUEST",
	},
	{
		value: "205",
		name: "Quantity valuation",
		description:
			"Document/message providing a confirmed assessment, by quantity, of the completed work for a construction contract.",
		key: "QUANTITY_VALUATION",
	},
	{
		value: "206",
		name: "Quantity valuation request",
		description:
			"Document/message providing an initial assessment, by quantity, of the completed work for a construction contract.",
		key: "QUANTITY_VALUATION_REQUEST",
	},
	{
		value: "207",
		name: "Contract bill of quantities - BOQ",
		description:
			"Document/message providing a formal specification identifying quantities and prices that are the basis of a contract for a construction project. BOQ means: Bill of quantity.",
		key: "CONTRACT_BILL_OF_QUANTITIES_BOQ",
	},
	{
		value: "208",
		name: "Unpriced bill of quantity",
		description:
			"Document/message providing a detailed, quantity based specification, issued in an unpriced form to invite tender prices.",
		key: "UNPRICED_BILL_OF_QUANTITY",
	},
	{
		value: "209",
		name: "Priced tender BOQ",
		description:
			"Document/message providing a detailed, quantity based specification, updated with prices to form a tender submission for a construction contract. BOQ means: Bill of quantity.",
		key: "PRICED_TENDER_BOQ",
	},
	{
		value: "210",
		name: "Enquiry",
		description:
			"Document/message issued by a party interested in the purchase of goods specified therein and indicating particular, desirable conditions regarding delivery terms, etc., addressed to a prospective supplier with a view to obtaining an offer.",
		key: "ENQUIRY",
	},
	{
		value: "212",
		name: "Agreement to pay",
		description:
			"Document/message in which the debtor expresses the intention to pay.",
		key: "AGREEMENT_TO_PAY",
	},
	{
		value: "213",
		name: "Request for financial cancellation",
		description: "The message is a request for financial cancellation.",
		key: "REQUEST_FOR_FINANCIAL_CANCELLATION",
	},
	{
		value: "214",
		name: "Pre-authorised direct debit(s)",
		description: "The message contains pre-authorised direct debit(s).",
		key: "PRE_AUTHORISED_DIRECT_DEBIT_S",
	},
	{
		value: "215",
		name: "Letter of intent",
		description:
			"Document/message by means of which a buyer informs a seller that the buyer intends to enter into contractual negotiations.",
		key: "LETTER_OF_INTENT",
	},
	{
		value: "216",
		name: "Approved unpriced bill of quantity",
		description:
			"Document/message providing an approved detailed, quantity based specification (bill of quantity), in an unpriced form.",
		key: "APPROVED_UNPRICED_BILL_OF_QUANTITY",
	},
	{
		value: "217",
		name: "Payment valuation for unscheduled items",
		description: "A payment valuation for unscheduled items.",
		key: "PAYMENT_VALUATION_FOR_UNSCHEDULED_ITEMS",
	},
	{
		value: "220",
		name: "Order",
		description:
			"Document/message by means of which a buyer initiates a transaction with a seller involving the supply of goods or services as specified, according to conditions set out in an offer, or otherwise known to the buyer.",
		key: "ORDER",
	},
	{
		value: "221",
		name: "Blanket order",
		description:
			"Usage of document/message for general order purposes with later split into quantities and delivery dates and maybe delivery locations.",
		key: "BLANKET_ORDER",
	},
	{
		value: "222",
		name: "Spot order",
		description:
			"Document/message ordering the remainder of a production's batch.",
		key: "SPOT_ORDER",
	},
	{
		value: "223",
		name: "Lease order",
		description: "Document/message for goods in leasing contracts.",
		key: "LEASE_ORDER",
	},
	{
		value: "224",
		name: "Rush order",
		description: "Document/message for urgent ordering.",
		key: "RUSH_ORDER",
	},
	{
		value: "225",
		name: "Repair order",
		description: "Document/message to order repair of goods.",
		key: "REPAIR_ORDER",
	},
	{
		value: "226",
		name: "Call off order",
		description:
			"Document/message to provide split quantities and delivery dates referring to a previous blanket order.",
		key: "CALL_OFF_ORDER",
	},
	{
		value: "227",
		name: "Consignment order",
		description:
			"Order to deliver goods into stock with agreement on payment when goods are sold out of this stock.",
		key: "CONSIGNMENT_ORDER",
	},
	{
		value: "228",
		name: "Sample order",
		description: "Document/message to order samples.",
		key: "SAMPLE_ORDER",
	},
	{
		value: "229",
		name: "Swap order",
		description:
			"Document/message informing buyer or seller of the replacement of goods previously ordered.",
		key: "SWAP_ORDER",
	},
	{
		value: "230",
		name: "Purchase order change request",
		description: "Change to an purchase order already sent.",
		key: "PURCHASE_ORDER_CHANGE_REQUEST",
	},
	{
		value: "231",
		name: "Purchase order response",
		description: "Response to an purchase order already received.",
		key: "PURCHASE_ORDER_RESPONSE",
	},
	{
		value: "232",
		name: "Hire order",
		description:
			"Document/message for hiring human resources or renting goods or equipment.",
		key: "HIRE_ORDER",
	},
	{
		value: "233",
		name: "Spare parts order",
		description: "Document/message to order spare parts.",
		key: "SPARE_PARTS_ORDER",
	},
	{
		value: "234",
		name: "Campaign price/sales catalogue",
		description:
			"A price/sales catalogue containing special prices which are valid only for a specified period or under specified conditions.",
		key: "CAMPAIGN_PRICE_SALES_CATALOGUE",
	},
	{
		value: "235",
		name: "Container list",
		description:
			"Document or message issued by party identifying the containers for which they are responsible.",
		key: "CONTAINER_LIST",
	},
	{
		value: "236",
		name: "Delivery forecast",
		description:
			"A message which enables the transmission of delivery or product forecasting requirements.",
		key: "DELIVERY_FORECAST",
	},
	{
		value: "237",
		name: "Cross docking services order",
		description: "A document or message to order cross docking services.",
		key: "CROSS_DOCKING_SERVICES_ORDER",
	},
	{
		value: "238",
		name: "Non-pre-authorised direct debit(s)",
		description: "The message contains non-pre-authorised direct debit(s).",
		key: "NON_PRE_AUTHORISED_DIRECT_DEBIT_S",
	},
	{
		value: "239",
		name: "Rejected direct debit(s)",
		description: "The message contains rejected direct debit(s).",
		key: "REJECTED_DIRECT_DEBIT_S",
	},
	{
		value: "240",
		name: "Delivery instructions",
		description:
			"(1174) Document/message giving instruction regarding the delivery of goods.",
		key: "DELIVERY_INSTRUCTIONS",
	},
	{
		value: "241",
		name: "Delivery schedule",
		description: "Usage of DELFOR-message.",
		key: "DELIVERY_SCHEDULE",
	},
	{
		value: "242",
		name: "Delivery just-in-time",
		description: "Usage of DELJIT-message.",
		key: "DELIVERY_JUST_IN_TIME",
	},
	{
		value: "243",
		name: "Pre-authorised direct debit request(s)",
		description: "The message contains pre-authorised direct debit request(s).",
		key: "PRE_AUTHORISED_DIRECT_DEBIT_REQUEST_S",
	},
	{
		value: "244",
		name: "Non-pre-authorised direct debit request(s)",
		description:
			"The message contains non-pre-authorised direct debit request(s).",
		key: "NON_PRE_AUTHORISED_DIRECT_DEBIT_REQUEST_S",
	},
	{
		value: "245",
		name: "Delivery release",
		description:
			"Document/message issued by a buyer releasing the despatch of goods after receipt of the Ready for despatch advice from the seller.",
		key: "DELIVERY_RELEASE",
	},
	{
		value: "246",
		name: "Settlement of a letter of credit",
		description: "Settlement of a letter of credit.",
		key: "SETTLEMENT_OF_A_LETTER_OF_CREDIT",
	},
	{
		value: "247",
		name: "Bank to bank funds transfer",
		description: "The message is a bank to bank funds transfer.",
		key: "BANK_TO_BANK_FUNDS_TRANSFER",
	},
	{
		value: "248",
		name: "Customer payment order(s)",
		description: "The message contains customer payment order(s).",
		key: "CUSTOMER_PAYMENT_ORDER_S",
	},
	{
		value: "249",
		name: "Low value payment order(s)",
		description: "The message contains low value payment order(s) only.",
		key: "LOW_VALUE_PAYMENT_ORDER_S",
	},
	{
		value: "250",
		name: "Crew list declaration",
		description: "Declaration regarding crew members aboard the conveyance.",
		key: "CREW_LIST_DECLARATION",
	},
	{
		value: "251",
		name: "Inquiry",
		description: "This is a request for information.",
		key: "INQUIRY",
	},
	{
		value: "252",
		name: "Response to previous banking status message",
		description: "A response to a previously sent banking status message.",
		key: "RESPONSE_TO_PREVIOUS_BANKING_STATUS_MESSAGE",
	},
	{
		value: "253",
		name: "Project master plan",
		description:
			"A high level, all encompassing master plan to complete a project.",
		key: "PROJECT_MASTER_PLAN",
	},
	{
		value: "254",
		name: "Project plan",
		description: "A plan for project work to be completed.",
		key: "PROJECT_PLAN",
	},
	{
		value: "255",
		name: "Project schedule",
		description: "A schedule of project activities to be completed.",
		key: "PROJECT_SCHEDULE",
	},
	{
		value: "256",
		name: "Project planning available resources",
		description: "Available resources for project planning purposes.",
		key: "PROJECT_PLANNING_AVAILABLE_RESOURCES",
	},
	{
		value: "257",
		name: "Project planning calendar",
		description: "Work calendar information for project planning purposes.",
		key: "PROJECT_PLANNING_CALENDAR",
	},
	{
		value: "258",
		name: "Standing order",
		description:
			"An order to supply fixed quantities of products at fixed regular intervals.",
		key: "STANDING_ORDER",
	},
	{
		value: "259",
		name: "Cargo movement event log",
		description:
			"A document detailing times and dates of events pertaining to a cargo movement.",
		key: "CARGO_MOVEMENT_EVENT_LOG",
	},
	{
		value: "260",
		name: "Cargo analysis voyage report",
		description: "An analysis of the cargo for a voyage.",
		key: "CARGO_ANALYSIS_VOYAGE_REPORT",
	},
	{
		value: "263",
		name: "Inventory adjustment status report",
		description:
			"A message detailing statuses related to the adjustment of inventory.",
		key: "INVENTORY_ADJUSTMENT_STATUS_REPORT",
	},
	{
		value: "264",
		name: "Transport equipment movement instruction",
		description:
			"Instruction to perform one or more different movements of transport equipment.",
		key: "TRANSPORT_EQUIPMENT_MOVEMENT_INSTRUCTION",
	},
	{
		value: "265",
		name: "Transport equipment movement report",
		description:
			"Report on one or more different movements of transport equipment.",
		key: "TRANSPORT_EQUIPMENT_MOVEMENT_REPORT",
	},
	{
		value: "266",
		name: "Transport equipment status change report",
		description:
			"Report on one or more changes of status associated with an item or items of transport equipment.",
		key: "TRANSPORT_EQUIPMENT_STATUS_CHANGE_REPORT",
	},
	{
		value: "267",
		name: "Fumigation certificate",
		description: "Certificate attesting that fumigation has been performed.",
		key: "FUMIGATION_CERTIFICATE",
	},
	{
		value: "268",
		name: "Wine certificate",
		description:
			"Certificate attesting to the quality, origin or appellation of wine.",
		key: "WINE_CERTIFICATE",
	},
	{
		value: "269",
		name: "Wool health certificate",
		description:
			"Certificate attesting that wool is free from specified risks to human or animal health.",
		key: "WOOL_HEALTH_CERTIFICATE",
	},
	{
		value: "270",
		name: "Delivery note",
		description:
			"Paper document attached to a consignment informing the receiving party about contents of this consignment.",
		key: "DELIVERY_NOTE",
	},
	{
		value: "271",
		name: "Packing list",
		description:
			"Document/message specifying the distribution of goods in individual packages (in trade environment the despatch advice message is used for the packing list).",
		key: "PACKING_LIST",
	},
	{
		value: "272",
		name: "New code request",
		description: "Requesting a new code.",
		key: "NEW_CODE_REQUEST",
	},
	{
		value: "273",
		name: "Code change request",
		description: "Request a change to an existing code.",
		key: "CODE_CHANGE_REQUEST",
	},
	{
		value: "274",
		name: "Simple data element request",
		description: "Requesting a new simple data element.",
		key: "SIMPLE_DATA_ELEMENT_REQUEST",
	},
	{
		value: "275",
		name: "Simple data element change request",
		description: "Request a change to an existing simple data element.",
		key: "SIMPLE_DATA_ELEMENT_CHANGE_REQUEST",
	},
	{
		value: "276",
		name: "Composite data element request",
		description: "Requesting a new composite data element.",
		key: "COMPOSITE_DATA_ELEMENT_REQUEST",
	},
	{
		value: "277",
		name: "Composite data element change request",
		description: "Request a change to an existing composite data element.",
		key: "COMPOSITE_DATA_ELEMENT_CHANGE_REQUEST",
	},
	{
		value: "278",
		name: "Segment request",
		description: "Request a new segment.",
		key: "SEGMENT_REQUEST",
	},
	{
		value: "279",
		name: "Segment change request",
		description: "Requesting a change to an existing segment.",
		key: "SEGMENT_CHANGE_REQUEST",
	},
	{
		value: "280",
		name: "New message request",
		description: "Request for a new message (NMR).",
		key: "NEW_MESSAGE_REQUEST",
	},
	{
		value: "281",
		name: "Message in development request",
		description: "Requesting a Message in Development (MiD).",
		key: "MESSAGE_IN_DEVELOPMENT_REQUEST",
	},
	{
		value: "282",
		name: "Modification of existing message",
		description: "Requesting a change to an existing message.",
		key: "MODIFICATION_OF_EXISTING_MESSAGE",
	},
	{
		value: "283",
		name: "Tracking number assignment report",
		description: "Report of assigned tracking numbers.",
		key: "TRACKING_NUMBER_ASSIGNMENT_REPORT",
	},
	{
		value: "284",
		name: "User directory definition",
		description:
			"Document/message defining the contents of a user directory set or parts thereof.",
		key: "USER_DIRECTORY_DEFINITION",
	},
	{
		value: "285",
		name: "United Nations standard message request",
		description: "Requesting a United Nations Standard Message (UNSM).",
		key: "UNITED_NATIONS_STANDARD_MESSAGE_REQUEST",
	},
	{
		value: "286",
		name: "Service directory definition",
		description:
			"Document/message defining the contents of a service directory set or parts thereof.",
		key: "SERVICE_DIRECTORY_DEFINITION",
	},
	{
		value: "287",
		name: "Status report",
		description: "Message covers information about the status.",
		key: "STATUS_REPORT",
	},
	{
		value: "288",
		name: "Kanban schedule",
		description: "Message to describe a Kanban schedule.",
		key: "KANBAN_SCHEDULE",
	},
	{
		value: "289",
		name: "Product data message",
		description:
			"A message to submit master data, a set of data that is rarely changed, to identify and describe products a supplier offers to their (potential) customer or buyer.",
		key: "PRODUCT_DATA_MESSAGE",
	},
	{
		value: "290",
		name: "A claim for parts and/or labour charges",
		description: "A claim for parts and/or labour charges incurred .",
		key: "A_CLAIM_FOR_PARTS_AND_OR_LABOUR_CHARGES",
	},
	{
		value: "291",
		name: "Delivery schedule response",
		description:
			"A message providing a response to a previously transmitted delivery schedule.",
		key: "DELIVERY_SCHEDULE_RESPONSE",
	},
	{
		value: "292",
		name: "Inspection request",
		description: "A message requesting a party to inspect items.",
		key: "INSPECTION_REQUEST",
	},
	{
		value: "293",
		name: "Inspection report",
		description: "A message informing a party of the results of an inspection.",
		key: "INSPECTION_REPORT",
	},
	{
		value: "294",
		name: "Application acknowledgement and error report",
		description:
			"A message used by an application to acknowledge reception of a message and/or to report any errors.",
		key: "APPLICATION_ACKNOWLEDGEMENT_AND_ERROR_REPORT",
	},
	{
		value: "297",
		name: "Instruction to collect",
		description: "A message instructing a party to collect goods.",
		key: "INSTRUCTION_TO_COLLECT",
	},
	{
		value: "298",
		name: "Dangerous goods list",
		description: "Listing of all details of dangerous goods carried.",
		key: "DANGEROUS_GOODS_LIST",
	},
	{
		value: "299",
		name: "Registration renewal",
		description:
			"Code specifying the continued validity of previously submitted registration information.",
		key: "REGISTRATION_RENEWAL",
	},
	{
		value: "300",
		name: "Registration change",
		description:
			"Code specifying the modification of previously submitted registration information.",
		key: "REGISTRATION_CHANGE",
	},
	{
		value: "301",
		name: "Response to registration",
		description:
			"Code specifying a response to an occurrence of a registration message.",
		key: "RESPONSE_TO_REGISTRATION",
	},
	{
		value: "302",
		name: "Implementation guideline",
		description:
			"A document specifying the criterion and format for exchanging information in an electronic data interchange syntax.",
		key: "IMPLEMENTATION_GUIDELINE",
	},
	{
		value: "303",
		name: "Request for transfer",
		description: "Document/message is a request for transfer.",
		key: "REQUEST_FOR_TRANSFER",
	},
	{
		value: "304",
		name: "Cost performance report",
		description:
			"A report to convey cost performance data for a project or contract.",
		key: "COST_PERFORMANCE_REPORT",
	},
	{
		value: "305",
		name: "Application error and acknowledgement",
		description:
			"A message to inform a message issuer that a previously sent message has been received by the addressee's application, or that a previously sent message has been rejected by the addressee's application.",
		key: "APPLICATION_ERROR_AND_ACKNOWLEDGEMENT",
	},
	{
		value: "306",
		name: "Cash pool financial statement",
		description: "A financial statement for a cash pool.",
		key: "CASH_POOL_FINANCIAL_STATEMENT",
	},
	{
		value: "307",
		name: "Sequenced delivery schedule",
		description: "Message to describe a sequence of product delivery.",
		key: "SEQUENCED_DELIVERY_SCHEDULE",
	},
	{
		value: "309",
		name: "Healthcare discharge report, final",
		description: "Final discharge report by healthcare provider.",
		key: "HEALTHCARE_DISCHARGE_REPORT_FINAL",
	},
	{
		value: "310",
		name: "Offer / quotation",
		description:
			"(1332) Document/message which, with a view to concluding a contract, sets out the conditions under which the goods are offered.",
		key: "OFFER_QUOTATION",
	},
	{
		value: "311",
		name: "Request for quote",
		description:
			"Document/message requesting a quote on specified goods or services.",
		key: "REQUEST_FOR_QUOTE",
	},
	{
		value: "312",
		name: "Acknowledgement message",
		description:
			"Message providing acknowledgement information at the business application level concerning the processing of a message.",
		key: "ACKNOWLEDGEMENT_MESSAGE",
	},
	{
		value: "313",
		name: "Application error message",
		description:
			"Message indicating that a message was rejected due to errors encountered at the application level.",
		key: "APPLICATION_ERROR_MESSAGE",
	},
	{
		value: "314",
		name: "Cargo movement voyage summary",
		description:
			"A consolidated voyage summary which contains the information in a certificate of analysis, a voyage analysis and a cargo movement time log for a voyage.",
		key: "CARGO_MOVEMENT_VOYAGE_SUMMARY",
	},
	{
		value: "315",
		name: "Contract",
		description:
			"(1296) Document/message evidencing an agreement between the seller and the buyer for the supply of goods or services; its effects are equivalent to those of an order followed by an acknowledgement of order.",
		key: "CONTRACT",
	},
	{
		value: "316",
		name: "Application for usage of berth or mooring facilities",
		description: "Document to apply for usage of berth or mooring facilities.",
		key: "APPLICATION_FOR_USAGE_OF_BERTH_OR_MOORING_FACILITIES",
	},
	{
		value: "317",
		name: "Application for designation of berthing places",
		description: "Document to apply for designation of berthing places.",
		key: "APPLICATION_FOR_DESIGNATION_OF_BERTHING_PLACES",
	},
	{
		value: "318",
		name: "Application for shifting from the designated place in port",
		description:
			"Document to apply for shifting from the designated place in port.",
		key: "APPLICATION_FOR_SHIFTING_FROM_THE_DESIGNATED_PLACE_IN_PORT",
	},
	{
		value: "319",
		name: "Supplementary document for application for cargo operation",
		description:
			"of dangerous goods Supplementary document to apply for cargo operation of dangerous goods.",
		key: "SUPPLEMENTARY_DOCUMENT_FOR_APPLICATION_FOR_CARGO_OPERATION",
	},
	{
		value: "320",
		name: "Acknowledgement of order",
		description:
			"Document/message acknowledging an undertaking to fulfil an order and confirming conditions or acceptance of conditions.",
		key: "ACKNOWLEDGEMENT_OF_ORDER",
	},
	{
		value: "321",
		name: "Supplementary document for application for transport of",
		description:
			"dangerous goods Supplementary document to apply for transport of dangerous goods.",
		key: "SUPPLEMENTARY_DOCUMENT_FOR_APPLICATION_FOR_TRANSPORT_OF",
	},
	{
		value: "322",
		name: "Optical Character Reading (OCR) payment",
		description:
			"Payment effected by an Optical Character Reading (OCR) document.",
		key: "OPTICAL_CHARACTER_READING_OCR_PAYMENT",
	},
	{
		value: "323",
		name: "Preliminary sales report",
		description:
			"Preliminary sales report sent before all the information is available.",
		key: "PRELIMINARY_SALES_REPORT",
	},
	{
		value: "324",
		name: "Transport emergency card",
		description:
			"Official document specifying, for a given dangerous goods item, information such as nature of hazard, protective devices, actions to be taken in case of accident, spillage or fire and first aid to be given.",
		key: "TRANSPORT_EMERGENCY_CARD",
	},
	{
		value: "327",
		name: "Operating instructions",
		description: "Document/message describing instructions for operation.",
		key: "OPERATING_INSTRUCTIONS",
	},
	{
		value: "328",
		name: "Name/product plate",
		description: "Plates on goods identifying and describing an article.",
		key: "NAME_PRODUCT_PLATE",
	},
	{
		value: "329",
		name: "Co-insurance ceding bordereau",
		description:
			"The document or message contains a bordereau describing co-insurance ceding information.",
		key: "CO_INSURANCE_CEDING_BORDEREAU",
	},
	{
		value: "330",
		name: "Request for delivery instructions",
		description:
			"Document/message issued by a supplier requesting instructions from the buyer regarding the details of the delivery of goods ordered.",
		key: "REQUEST_FOR_DELIVERY_INSTRUCTIONS",
	},
	{
		value: "332",
		name: "Trade data",
		description: "Document/message is for trade data.",
		key: "TRADE_DATA",
	},
	{
		value: "333",
		name: "Customs declaration for cargo examination",
		description: "Declaration provided to customs for cargo examination.",
		key: "CUSTOMS_DECLARATION_FOR_CARGO_EXAMINATION",
	},
	{
		value: "334",
		name: "Customs declaration for cargo examination, alternate",
		description:
			"Alternate declaration provided to customs for cargo examination.",
		key: "CUSTOMS_DECLARATION_FOR_CARGO_EXAMINATION_ALTERNATE",
	},
	{
		value: "335",
		name: "Booking request",
		description:
			"Document/message issued by a supplier to a carrier requesting space to be reserved for a specified consignment, indicating desirable conveyance, despatch time, etc.",
		key: "BOOKING_REQUEST",
	},
	{
		value: "336",
		name: "Customs crew and conveyance",
		description:
			"Document/message contains information regarding the crew list and conveyance.",
		key: "CUSTOMS_CREW_AND_CONVEYANCE",
	},
	{
		value: "337",
		name: "Customs summary declaration with commercial detail,",
		description:
			"alternate Alternate Customs declaration summary with commercial transaction details.",
		key: "CUSTOMS_SUMMARY_DECLARATION_WITH_COMMERCIAL_DETAIL",
	},
	{
		value: "338",
		name: "Items booked to a financial account report",
		description:
			"A message reporting items which have been booked to a financial account.",
		key: "ITEMS_BOOKED_TO_A_FINANCIAL_ACCOUNT_REPORT",
	},
	{
		value: "339",
		name: "Report of transactions which need further information from",
		description:
			"the receiver A message reporting transactions which need further information from the receiver.",
		key: "REPORT_OF_TRANSACTIONS_WHICH_NEED_FURTHER_INFORMATION_FROM",
	},
	{
		value: "340",
		name: "Shipping instructions",
		description:
			"(1121) Document/message advising details of cargo and exporter's requirements for its physical movement.",
		key: "SHIPPING_INSTRUCTIONS",
	},
	{
		value: "341",
		name: "Shipper's letter of instructions (air)",
		description:
			"Document/message issued by a consignor in which he gives details of a consignment of goods that enables an airline or its agent to prepare an air waybill.",
		key: "SHIPPER_S_LETTER_OF_INSTRUCTIONS_AIR",
	},
	{
		value: "342",
		name: "Report of transactions for information only",
		description: "A message reporting transactions for information only.",
		key: "REPORT_OF_TRANSACTIONS_FOR_INFORMATION_ONLY",
	},
	{
		value: "343",
		name: "Cartage order (local transport)",
		description:
			"Document/message giving instructions regarding local transport of goods, e.g. from the premises of an enterprise to those of a carrier undertaking further transport.",
		key: "CARTAGE_ORDER_LOCAL_TRANSPORT",
	},
	{
		value: "344",
		name: "EDI associated object administration message",
		description:
			"A message giving additional information about the exchange of an EDI associated object.",
		key: "EDI_ASSOCIATED_OBJECT_ADMINISTRATION_MESSAGE",
	},
	{
		value: "345",
		name: "Ready for despatch advice",
		description:
			"Document/message issued by a supplier informing a buyer that goods ordered are ready for despatch.",
		key: "READY_FOR_DESPATCH_ADVICE",
	},
	{
		value: "346",
		name: "Summary sales report",
		description:
			"Sales report containing summaries for several earlier sent sales reports.",
		key: "SUMMARY_SALES_REPORT",
	},
	{
		value: "347",
		name: "Order status enquiry",
		description: "A message enquiring the status of previously sent orders.",
		key: "ORDER_STATUS_ENQUIRY",
	},
	{
		value: "348",
		name: "Order status report",
		description: "A message reporting the status of previously sent orders.",
		key: "ORDER_STATUS_REPORT",
	},
	{
		value: "349",
		name: "Declaration regarding the inward and outward movement of",
		description:
			"vessel Document to declare inward and outward movement of a vessel.",
		key: "DECLARATION_REGARDING_THE_INWARD_AND_OUTWARD_MOVEMENT_OF",
	},
	{
		value: "350",
		name: "Despatch order",
		description:
			"Document/message issued by a supplier initiating the despatch of goods to a buyer (consignee).",
		key: "DESPATCH_ORDER",
	},
	{
		value: "351",
		name: "Despatch advice",
		description:
			"Document/message by means of which the seller or consignor informs the consignee about the despatch of goods.",
		key: "DESPATCH_ADVICE",
	},
	{
		value: "352",
		name: "Notification of usage of berth or mooring facilities",
		description: "Document to notify usage of berth or mooring facilities.",
		key: "NOTIFICATION_OF_USAGE_OF_BERTH_OR_MOORING_FACILITIES",
	},
	{
		value: "353",
		name: "Application for vessel's entering into port area in night-",
		description:
			"time Document to apply for vessel's entering into port area in night-time.",
		key: "APPLICATION_FOR_VESSEL_S_ENTERING_INTO_PORT_AREA_IN_NIGHT",
	},
	{
		value: "354",
		name: "Notification of emergency shifting from the designated",
		description:
			"place in port Document to notify shifting from designated place in port once secured at the designated place.",
		key: "NOTIFICATION_OF_EMERGENCY_SHIFTING_FROM_THE_DESIGNATED",
	},
	{
		value: "355",
		name: "Customs summary declaration without commercial detail,",
		description:
			"alternate Alternate Customs declaration summary without any commercial transaction details.",
		key: "CUSTOMS_SUMMARY_DECLARATION_WITHOUT_COMMERCIAL_DETAIL",
	},
	{
		value: "356",
		name: "Performance bond",
		description: "A document that guarantees performance.",
		key: "PERFORMANCE_BOND",
	},
	{
		value: "357",
		name: "Payment bond",
		description: "A document that guarantees the payment of monies.",
		key: "PAYMENT_BOND",
	},
	{
		value: "358",
		name: "Healthcare discharge report, preliminary",
		description: "Preliminary discharge report by healthcare provider.",
		key: "HEALTHCARE_DISCHARGE_REPORT_PRELIMINARY",
	},
	{
		value: "359",
		name: "Request for provision of a health service",
		description:
			"Document containing request for provision of a health service.",
		key: "REQUEST_FOR_PROVISION_OF_A_HEALTH_SERVICE",
	},
	{
		value: "360",
		name: "Request for price quote",
		description:
			"Document/message requesting price conditions under which goods are offered.",
		key: "REQUEST_FOR_PRICE_QUOTE",
	},
	{
		value: "361",
		name: "Price quote",
		description:
			"Document/message confirming price conditions under which goods are offered.",
		key: "PRICE_QUOTE",
	},
	{
		value: "362",
		name: "Delivery quote",
		description:
			"Document/message confirming delivery conditions under which goods are offered.",
		key: "DELIVERY_QUOTE",
	},
	{
		value: "363",
		name: "Price and delivery quote",
		description:
			"Document/message confirming price and delivery conditions under which goods are offered.",
		key: "PRICE_AND_DELIVERY_QUOTE",
	},
	{
		value: "364",
		name: "Contract price quote",
		description:
			"Document/message confirming contractual price conditions under which goods are offered.",
		key: "CONTRACT_PRICE_QUOTE",
	},
	{
		value: "365",
		name: "Contract price and delivery quote",
		description:
			"Document/message confirming contractual price conditions and contractual delivery conditions under which goods are offered.",
		key: "CONTRACT_PRICE_AND_DELIVERY_QUOTE",
	},
	{
		value: "366",
		name: "Price quote, specified end-customer",
		description:
			"Document/message confirming price conditions under which goods are offered, provided that they are sold to the end-customer specified on the quote.",
		key: "PRICE_QUOTE_SPECIFIED_END_CUSTOMER",
	},
	{
		value: "367",
		name: "Price and delivery quote, specified end-customer",
		description:
			"Document/message confirming price conditions and delivery conditions under which goods are offered, provided that they are sold to the end-customer specified on the quote.",
		key: "PRICE_AND_DELIVERY_QUOTE_SPECIFIED_END_CUSTOMER",
	},
	{
		value: "368",
		name: "Price quote, ship and debit",
		description:
			"Document/message from a supplier to a distributor confirming price conditions under which goods can be sold by a distributor to the end-customer specified on the quote with compensation for loss of inventory value.",
		key: "PRICE_QUOTE_SHIP_AND_DEBIT",
	},
	{
		value: "369",
		name: "Price and delivery quote, ship and debit",
		description:
			"Document/message from a supplier to a distributor confirming price conditions and delivery conditions under which goods can be sold by a distributor to the end-customer specified on the quote with compensation for loss of inventory value.",
		key: "PRICE_AND_DELIVERY_QUOTE_SHIP_AND_DEBIT",
	},
	{
		value: "370",
		name: "Advice of distribution of documents",
		description:
			"Document/message in which the party responsible for the issue of a set of trade documents specifies the various recipients of originals and copies of these documents, with an indication of the number of copies distributed to each of them.",
		key: "ADVICE_OF_DISTRIBUTION_OF_DOCUMENTS",
	},
	{
		value: "371",
		name: "Plan for provision of health service",
		description: "Document containing a plan for provision of health service.",
		key: "PLAN_FOR_PROVISION_OF_HEALTH_SERVICE",
	},
	{
		value: "372",
		name: "Prescription",
		description:
			"Instructions for the dispensing and use of medicine or remedy.",
		key: "PRESCRIPTION",
	},
	{
		value: "373",
		name: "Prescription request",
		description: "Request to issue a prescription for medicine or remedy.",
		key: "PRESCRIPTION_REQUEST",
	},
	{
		value: "374",
		name: "Prescription dispensing report",
		description:
			"Document containing information of products dispensed according to a prescription.",
		key: "PRESCRIPTION_DISPENSING_REPORT",
	},
	{
		value: "375",
		name: "Certificate of shipment",
		description:
			"(1109) Certificate providing confirmation that a consignment has been shipped.",
		key: "CERTIFICATE_OF_SHIPMENT",
	},
	{
		value: "376",
		name: "Standing inquiry on product information",
		description: "A product inquiry which stands until it is cancelled.",
		key: "STANDING_INQUIRY_ON_PRODUCT_INFORMATION",
	},
	{
		value: "377",
		name: "Party credit information",
		description:
			"Document/message providing data concerning the credit information of a party.",
		key: "PARTY_CREDIT_INFORMATION",
	},
	{
		value: "378",
		name: "Party payment behaviour information",
		description:
			"Document/message providing data concerning the payment behaviour of a party.",
		key: "PARTY_PAYMENT_BEHAVIOUR_INFORMATION",
	},
	{
		value: "379",
		name: "Request for metering point information",
		description: "Message to request information about a metering point.",
		key: "REQUEST_FOR_METERING_POINT_INFORMATION",
	},
	{
		value: "391",
		name: "Metering point information response",
		description:
			"Response to a request for information about a metering point.",
		key: "METERING_POINT_INFORMATION_RESPONSE",
	},
	{
		value: "392",
		name: "Notification of change of supplier",
		description: "A notification of a change of supplier.",
		key: "NOTIFICATION_OF_CHANGE_OF_SUPPLIER",
	},
	{
		value: "397",
		name: "Commercial account summary response",
		description:
			"A document providing a response to a previously sent commercial account summary message.",
		key: "COMMERCIAL_ACCOUNT_SUMMARY_RESPONSE",
	},
	{
		value: "398",
		name: "Cross docking despatch advice",
		description:
			"Document by means of which the supplier or consignor informs the buyer, consignee or the distribution centre about the despatch of goods for cross docking.",
		key: "CROSS_DOCKING_DESPATCH_ADVICE",
	},
	{
		value: "399",
		name: "Transshipment despatch advice",
		description:
			"Document by means of which the supplier or consignor informs the buyer, consignee or the distribution centre about the despatch of goods for transshipment.",
		key: "TRANSSHIPMENT_DESPATCH_ADVICE",
	},
	{
		value: "400",
		name: "Exceptional order",
		description: "An order which falls outside the framework of an agreement.",
		key: "EXCEPTIONAL_ORDER",
	},
	{
		value: "401",
		name: "Pre-packed cross docking order",
		description:
			"An order requesting the supply of products packed according to the final delivery point which will be moved across a dock in a distribution centre without further handling.",
		key: "PRE_PACKED_CROSS_DOCKING_ORDER",
	},
	{
		value: "402",
		name: "Intermediate handling cross docking order",
		description:
			"An order requesting the supply of products which will be moved across a dock, de-consolidated and re-consolidated according to the final delivery location requirements.",
		key: "INTERMEDIATE_HANDLING_CROSS_DOCKING_ORDER",
	},
	{
		value: "403",
		name: "Means of transportation availability information",
		description:
			"Information giving the various availabilities of a means of transportation.",
		key: "MEANS_OF_TRANSPORTATION_AVAILABILITY_INFORMATION",
	},
	{
		value: "404",
		name: "Means of transportation schedule information",
		description:
			"Information giving the various schedules of a means of transportation.",
		key: "MEANS_OF_TRANSPORTATION_SCHEDULE_INFORMATION",
	},
	{
		value: "405",
		name: "Transport equipment delivery notice",
		description: "Notification regarding the delivery of transport equipment.",
		key: "TRANSPORT_EQUIPMENT_DELIVERY_NOTICE",
	},
	{
		value: "406",
		name: "Notification to supplier of contract termination",
		description:
			"Notification to the supplier regarding the termination of a contract.",
		key: "NOTIFICATION_TO_SUPPLIER_OF_CONTRACT_TERMINATION",
	},
	{
		value: "407",
		name: "Notification to supplier of metering point changes",
		description:
			"Notification to the supplier about changes regarding a metering point.",
		key: "NOTIFICATION_TO_SUPPLIER_OF_METERING_POINT_CHANGES",
	},
	{
		value: "408",
		name: "Notification of meter change",
		description: "Notification about the change of a meter.",
		key: "NOTIFICATION_OF_METER_CHANGE",
	},
	{
		value: "409",
		name: "Instructions for bank transfer",
		description:
			"Document/message containing instructions from a customer to his bank to pay an amount in a specified currency to a nominated party in another country by a method either specified (e.g. teletransmission, air mail) or left to the discretion of the bank.",
		key: "INSTRUCTIONS_FOR_BANK_TRANSFER",
	},
	{
		value: "410",
		name: "Notification of metering point identification change",
		description: "Notification of the change of metering point identification.",
		key: "NOTIFICATION_OF_METERING_POINT_IDENTIFICATION_CHANGE",
	},
	{
		value: "411",
		name: "Utilities time series message",
		description:
			"The Utilities time series message is sent between responsible parties in a utilities infrastructure for the purpose of reporting time series and connected technical and/or administrative information.",
		key: "UTILITIES_TIME_SERIES_MESSAGE",
	},
	{
		value: "412",
		name: "Application for banker's draft",
		description:
			"Application by a customer to his bank to issue a banker's draft stating the amount and currency of the draft, the name of the payee and the place and country of payment.",
		key: "APPLICATION_FOR_BANKER_S_DRAFT",
	},
	{
		value: "413",
		name: "Infrastructure condition",
		description: "Information about components in an infrastructure.",
		key: "INFRASTRUCTURE_CONDITION",
	},
	{
		value: "414",
		name: "Acknowledgement of change of supplier",
		description: "Acknowledgement of the change of supplier.",
		key: "ACKNOWLEDGEMENT_OF_CHANGE_OF_SUPPLIER",
	},
	{
		value: "415",
		name: "Data Plot Sheet",
		description:
			"Document/Message providing technical description and information of the crop production.",
		key: "DATA_PLOT_SHEET",
	},
	{
		value: "416",
		name: "Soil analysis",
		description: "Soil analysis document.",
		key: "SOIL_ANALYSIS",
	},
	{
		value: "417",
		name: "Farmyard manure analysis",
		description: "Farmyard manure analysis document.",
		key: "FARMYARD_MANURE_ANALYSIS",
	},
	{
		value: "418",
		name: "WCO Cargo Report Export, Rail or Road",
		description:
			"Declaration, in accordance with the WCO Customs Data Model, to Customs concerning the export of cargo carried by commercial means of transport over land, e.g. truck or train.",
		key: "WCO_CARGO_REPORT_EXPORT_RAIL_OR_ROAD",
	},
	{
		value: "419",
		name: "WCO Cargo Report Export, Air or Maritime",
		description:
			"Declaration, in accordance with the WCO Customs Data Model, to Customs concerning the export of cargo carried by commercial means of transport over water or through the air, e.g. vessel or aircraft.",
		key: "WCO_CARGO_REPORT_EXPORT_AIR_OR_MARITIME",
	},
	{
		value: "421",
		name: "WCO Cargo Report Import, Rail or Road",
		description:
			"Declaration, in accordance with the WCO Customs Data Model, to Customs concerning the import of cargo carried by commercial means of transport over land, e.g. truck or train.",
		key: "WCO_CARGO_REPORT_IMPORT_RAIL_OR_ROAD",
	},
	{
		value: "422",
		name: "WCO Cargo Report Import, Air or Maritime",
		description:
			"Declaration, in accordance with the WCO Customs Data Model, to Customs concerning the import of cargo carried by commercial means of transport over water or through the air, e.g. vessel or aircraft.",
		key: "WCO_CARGO_REPORT_IMPORT_AIR_OR_MARITIME",
	},
	{
		value: "423",
		name: "WCO one-step export declaration",
		description:
			"Single step declaration, in accordance with the WCO Customs Data Model, to Customs by which goods are declared for a Customs export procedure based on the 1999 Kyoto Convention.",
		key: "WCO_ONE_STEP_EXPORT_DECLARATION",
	},
	{
		value: "424",
		name: "WCO first step of two-step export declaration",
		description:
			"First part of a simplified declaration, in accordance with the WCO Customs Data Model, to Customs by which goods are declared for Customs export procedure based on the 1999 Kyoto Convention.",
		key: "WCO_FIRST_STEP_OF_TWO_STEP_EXPORT_DECLARATION",
	},
	{
		value: "425",
		name: "Collection payment advice",
		description:
			"Document/message whereby a bank advises that a collection has been paid, giving details and methods of funds disposal.",
		key: "COLLECTION_PAYMENT_ADVICE",
	},
	{
		value: "426",
		name: "Documentary credit payment advice",
		description:
			"Document/message whereby a bank advises payment under a documentary credit.",
		key: "DOCUMENTARY_CREDIT_PAYMENT_ADVICE",
	},
	{
		value: "427",
		name: "Documentary credit acceptance advice",
		description:
			"Document/message whereby a bank advises acceptance under a documentary credit.",
		key: "DOCUMENTARY_CREDIT_ACCEPTANCE_ADVICE",
	},
	{
		value: "428",
		name: "Documentary credit negotiation advice",
		description:
			"Document/message whereby a bank advises negotiation under a documentary credit.",
		key: "DOCUMENTARY_CREDIT_NEGOTIATION_ADVICE",
	},
	{
		value: "429",
		name: "Application for banker's guarantee",
		description:
			"Document/message whereby a customer requests his bank to issue a guarantee in favour of a nominated party in another country, stating the amount and currency and the specific conditions of the guarantee.",
		key: "APPLICATION_FOR_BANKER_S_GUARANTEE",
	},
	{
		value: "430",
		name: "Banker's guarantee",
		description:
			"Document/message in which a bank undertakes to pay out a limited amount of money to a designated party, on conditions stated therein (other than those laid down in the Uniform Customs Practice).",
		key: "BANKER_S_GUARANTEE",
	},
	{
		value: "431",
		name: "Documentary credit letter of indemnity",
		description:
			"Document/message in which a beneficiary of a documentary credit accepts responsibility for non-compliance with the terms and conditions of the credit, and undertakes to refund the money received under the credit, with interest and charges accrued.",
		key: "DOCUMENTARY_CREDIT_LETTER_OF_INDEMNITY",
	},
	{
		value: "432",
		name: "Notification to grid operator of contract termination",
		description:
			"Notification to the grid operator regarding the termination of a contract.",
		key: "NOTIFICATION_TO_GRID_OPERATOR_OF_CONTRACT_TERMINATION",
	},
	{
		value: "433",
		name: "Notification to grid operator of metering point changes",
		description:
			"Notification to the grid operator about changes regarding a metering point.",
		key: "NOTIFICATION_TO_GRID_OPERATOR_OF_METERING_POINT_CHANGES",
	},
	{
		value: "434",
		name: "Notification of balance responsible entity change",
		description: "Notification of a change of balance responsible entity.",
		key: "NOTIFICATION_OF_BALANCE_RESPONSIBLE_ENTITY_CHANGE",
	},
	{
		value: "435",
		name: "Preadvice of a credit",
		description: "Preadvice indicating a credit to happen in the future.",
		key: "PREADVICE_OF_A_CREDIT",
	},
	{
		value: "436",
		name: "Transport equipment profile report",
		description: "Report on the profile of transport equipment.",
		key: "TRANSPORT_EQUIPMENT_PROFILE_REPORT",
	},
	{
		value: "437",
		name: "Request for price and delivery quote, specified end-user",
		description:
			"Document/message requesting price conditions and delivery conditions under which goods are offered, provided that they are sold to the end-customer specified on the request for quote.",
		key: "REQUEST_FOR_PRICE_AND_DELIVERY_QUOTE_SPECIFIED_END_USER",
	},
	{
		value: "438",
		name: "Request for price quote, ship and debit",
		description:
			"Document/message from a distributor to a supplier requesting price conditions under which goods can be sold by the distributor to the end-customer specified on the request for quote with compensation for loss of inventory value.",
		key: "REQUEST_FOR_PRICE_QUOTE_SHIP_AND_DEBIT",
	},
	{
		value: "439",
		name: "Request for price and delivery quote, ship and debit",
		description:
			"Document/message from a distributor to a supplier requesting price conditions and delivery conditions under which goods can be sold by the distributor to the end-customer specified on the request for quote with compensation for loss of inventory value.",
		key: "REQUEST_FOR_PRICE_AND_DELIVERY_QUOTE_SHIP_AND_DEBIT",
	},
	{
		value: "440",
		name: "Delivery point list.",
		description: "A list of delivery point addresses.",
		key: "DELIVERY_POINT_LIST",
	},
	{
		value: "441",
		name: "Transport routing information",
		description:
			"Document specifying the routes for transport between locations.",
		key: "TRANSPORT_ROUTING_INFORMATION",
	},
	{
		value: "442",
		name: "Request for delivery quote",
		description:
			"Document/message requesting delivery conditions under which goods are offered.",
		key: "REQUEST_FOR_DELIVERY_QUOTE",
	},
	{
		value: "443",
		name: "Request for price and delivery quote",
		description:
			"Document/message requesting price and delivery conditions under which goods are offered.",
		key: "REQUEST_FOR_PRICE_AND_DELIVERY_QUOTE",
	},
	{
		value: "444",
		name: "Request for contract price quote",
		description:
			"Document/message requesting contractual price conditions under which goods are offered.",
		key: "REQUEST_FOR_CONTRACT_PRICE_QUOTE",
	},
	{
		value: "445",
		name: "Request for contract price and delivery quote",
		description:
			"Document/message requesting contractual price conditions and contractual delivery conditions under which goods are offered.",
		key: "REQUEST_FOR_CONTRACT_PRICE_AND_DELIVERY_QUOTE",
	},
	{
		value: "446",
		name: "Request for price quote, specified end-customer",
		description:
			"Document/message requesting price conditions under which goods are offered, provided that they are sold to the end-customer specified on the request for quote.",
		key: "REQUEST_FOR_PRICE_QUOTE_SPECIFIED_END_CUSTOMER",
	},
	{
		value: "447",
		name: "Collection order",
		description:
			"Document/message whereby a bank is instructed (or requested) to handle financial and/or commercial documents in order to obtain acceptance and/or payment, or to deliver documents on such other terms and conditions as may be specified.",
		key: "COLLECTION_ORDER",
	},
	{
		value: "448",
		name: "Documents presentation form",
		description:
			"Document/message whereby a draft or similar instrument and/or commercial documents are presented to a bank for acceptance, discounting, negotiation, payment or collection, whether or not against a documentary credit.",
		key: "DOCUMENTS_PRESENTATION_FORM",
	},
	{
		value: "449",
		name: "Identification match",
		description:
			"Message related to conducting a search for an identification match.",
		key: "IDENTIFICATION_MATCH",
	},
	{
		value: "450",
		name: "Payment order",
		description:
			"Document/message containing information needed to initiate the payment. It may cover the financial settlement for one or more commercial trade transactions. A payment order is an instruction to the ordered bank to arrange for the payment of one specified amount to the beneficiary.",
		key: "PAYMENT_ORDER",
	},
	{
		value: "451",
		name: "Extended payment order",
		description:
			"Document/message containing information needed to initiate the payment. It may cover the financial settlement for several commercial trade transactions, which it is possible to specify in a special payments detail part. It is an instruction to the ordered bank to arrange for the payment of one specified amount to the beneficiary.",
		key: "EXTENDED_PAYMENT_ORDER",
	},
	{
		value: "452",
		name: "Multiple payment order",
		description:
			"Document/message containing a payment order to debit one or more accounts and to credit one or more beneficiaries.",
		key: "MULTIPLE_PAYMENT_ORDER",
	},
	{
		value: "453",
		name: "Notice that circumstances prevent payment of delivered",
		description:
			"goods Message used to inform a supplier that delivered goods cannot be paid due to circumstances which prevent payment.",
		key: "NOTICE_THAT_CIRCUMSTANCES_PREVENT_PAYMENT_OF_DELIVERED",
	},
	{
		value: "454",
		name: "Credit advice",
		description:
			"Document/message sent by an account servicing institution to one of its account owners, to inform the account owner of an entry which has been or will be credited to its account for a specified amount on the date indicated.",
		key: "CREDIT_ADVICE",
	},
	{
		value: "455",
		name: "Extended credit advice",
		description:
			"Document/message sent by an account servicing institution to one of its account owners, to inform the account owner of an entry that has been or will be credited to its account for a specified amount on the date indicated. It provides extended commercial information concerning the relevant remittance advice.",
		key: "EXTENDED_CREDIT_ADVICE",
	},
	{
		value: "459",
		name: "Travel ticket",
		description: "The document is a ticket giving access to a travel service.",
		key: "TRAVEL_TICKET",
	},
	{
		value: "460",
		name: "Documentary credit application",
		description:
			"Document/message whereby a bank is requested to issue a documentary credit on the conditions specified therein.",
		key: "DOCUMENTARY_CREDIT_APPLICATION",
	},
	{
		value: "461",
		name: "Payment card",
		description: "The document is a credit, guarantee or charge card.",
		key: "PAYMENT_CARD",
	},
	{
		value: "462",
		name: "Ready for transshipment despatch advice",
		description:
			"Document to advise that the goods ordered are ready for transshipment.",
		key: "READY_FOR_TRANSSHIPMENT_DESPATCH_ADVICE",
	},
	{
		value: "463",
		name: "Pre-packed cross docking despatch advice",
		description:
			"Document by means of which the supplier or consignor informs the buyer, consignee or distribution centre about the despatch of products packed according to the final delivery point requirements which will be moved across a dock in a distribution centre without further handling.",
		key: "PRE_PACKED_CROSS_DOCKING_DESPATCH_ADVICE",
	},
	{
		value: "464",
		name: "Intermediate handling cross docking despatch advice",
		description:
			"Document by means of which the supplier or consignor informs the buyer, consignee or the distribution centre about the despatch of products which will be moved across a dock, de-consolidated and re-consolidated according to final delivery location requirements.",
		key: "INTERMEDIATE_HANDLING_CROSS_DOCKING_DESPATCH_ADVICE",
	},
	{
		value: "465",
		name: "Documentary credit",
		description:
			"Document/message in which a bank states that it has issued a documentary credit under which the beneficiary is to obtain payment, acceptance or negotiation on compliance with certain terms and conditions and against presentation of stipulated documents and such drafts as may be specified. The credit may or may not be confirmed by another bank.",
		key: "DOCUMENTARY_CREDIT",
	},
	{
		value: "466",
		name: "Documentary credit notification",
		description:
			"Document/message issued by an advising bank in order to transmit a documentary credit to a beneficiary, or to another advising bank.",
		key: "DOCUMENTARY_CREDIT_NOTIFICATION",
	},
	{
		value: "467",
		name: "Documentary credit transfer advice",
		description:
			"Document/message whereby a bank advises that (part of) a documentary credit is being or has been transferred in favour of a second beneficiary.",
		key: "DOCUMENTARY_CREDIT_TRANSFER_ADVICE",
	},
	{
		value: "468",
		name: "Documentary credit amendment notification",
		description:
			"Document/message whereby a bank advises that the terms and conditions of a documentary credit have been amended.",
		key: "DOCUMENTARY_CREDIT_AMENDMENT_NOTIFICATION",
	},
	{
		value: "469",
		name: "Documentary credit amendment",
		description:
			"Document/message whereby a bank notifies a beneficiary of the details of an amendment to the terms and conditions of a documentary credit.",
		key: "DOCUMENTARY_CREDIT_AMENDMENT",
	},
	{
		value: "470",
		name: "Waste disposal report",
		description:
			"Document/message sent by a shipping agent to an authority for reporting information on waste disposal.",
		key: "WASTE_DISPOSAL_REPORT",
	},
	{
		value: "481",
		name: "Remittance advice",
		description: "Document/message advising of the remittance of payment.",
		key: "REMITTANCE_ADVICE",
	},
	{
		value: "482",
		name: "Port authority waste disposal report",
		description:
			"Document/message sent by a port authority to another port authority for reporting information on waste disposal.",
		key: "PORT_AUTHORITY_WASTE_DISPOSAL_REPORT",
	},
	{
		value: "483",
		name: "Visa",
		description:
			"An endorsement on a passport or any other recognised travel document indicating that it has been examined and found correct, especially as permitting the holder to enter or leave a country.",
		key: "VISA",
	},
	{
		value: "484",
		name: "Multiple direct debit request",
		description:
			"Document/message containing a direct debit request to credit one or more accounts and to debit one or more debtors.",
		key: "MULTIPLE_DIRECT_DEBIT_REQUEST",
	},
	{
		value: "485",
		name: "Banker's draft",
		description:
			"Draft drawn in favour of a third party either by one bank on another bank, or by a branch of a bank on its head office (or vice versa) or upon another branch of the same bank. In either case, the draft should comply with the specifications laid down for cheques in the country in which it is to be payable.",
		key: "BANKER_S_DRAFT",
	},
	{
		value: "486",
		name: "Multiple direct debit",
		description:
			"Document/message containing a direct debit to credit one or more accounts and to debit one or more debtors.",
		key: "MULTIPLE_DIRECT_DEBIT",
	},
	{
		value: "487",
		name: "Certificate of disembarkation permission",
		description: "Document or message issuing permission to disembark.",
		key: "CERTIFICATE_OF_DISEMBARKATION_PERMISSION",
	},
	{
		value: "488",
		name: "Deratting exemption certificate",
		description:
			"Document certifying that the object was free of rats when inspected and that it is exempt from a deratting statement.",
		key: "DERATTING_EXEMPTION_CERTIFICATE",
	},
	{
		value: "489",
		name: "Reefer connection order",
		description: "Order to connect a reefer container to a reefer point.",
		key: "REEFER_CONNECTION_ORDER",
	},
	{
		value: "490",
		name: "Bill of exchange",
		description:
			"Document/message, issued and signed in conformity with the applicable legislation, which contains an unconditional order whereby the drawer directs the drawee to pay a definite sum of money to the payee or to his order, on demand or at a definite time, against the surrender of the document itself.",
		key: "BILL_OF_EXCHANGE",
	},
	{
		value: "491",
		name: "Promissory note",
		description:
			"Document/message, issued and signed in conformity with the applicable legislation, which contains an unconditional promise whereby the maker undertakes to pay a definite sum of money to the payee or to his order, on demand or at a definite time, against the surrender of the document itself.",
		key: "PROMISSORY_NOTE",
	},
	{
		value: "493",
		name: "Statement of account message",
		description: "Usage of STATAC-message.",
		key: "STATEMENT_OF_ACCOUNT_MESSAGE",
	},
	{
		value: "494",
		name: "Direct delivery (transport)",
		description:
			"Document/message ordering the direct delivery of goods/consignment from one means of transport into another means of transport in one movement.",
		key: "DIRECT_DELIVERY_TRANSPORT",
	},
	{
		value: "495",
		name: "WCO second step of two-step export declaration",
		description:
			"Second part of a simplified declaration, in accordance with the WCO Customs Data Model, to Customs by which goods are declared for Customs export procedure based on the 1999 Kyoto Convention.",
		key: "WCO_SECOND_STEP_OF_TWO_STEP_EXPORT_DECLARATION",
	},
	{
		value: "496",
		name: "WCO one-step import declaration",
		description:
			"Single step declaration, in accordance with the WCO Customs Data Model, to Customs by which goods are declared for Customs import procedure based on the 1999 Kyoto Convention.",
		key: "WCO_ONE_STEP_IMPORT_DECLARATION",
	},
	{
		value: "497",
		name: "WCO first step of two-step import declaration",
		description:
			"First part of a simplified declaration, in accordance with the WCO Customs Data Model, to Customs by which goods are declared for Customs import procedure based on the 1999 Kyoto Convention.",
		key: "WCO_FIRST_STEP_OF_TWO_STEP_IMPORT_DECLARATION",
	},
	{
		value: "498",
		name: "WCO second step of two-step import declaration",
		description:
			"Second part of a simplified declaration, in accordance with the WCO Customs Data Model, to Customs by which goods are declared for Customs import procedure based on the 1999 Kyoto Convention.",
		key: "WCO_SECOND_STEP_OF_TWO_STEP_IMPORT_DECLARATION",
	},
	{
		value: "499",
		name: "Previous transport document",
		description: "Identification of the previous transport document.",
		key: "PREVIOUS_TRANSPORT_DOCUMENT",
	},
	{
		value: "520",
		name: "Insurance certificate",
		description:
			"Document/message issued to the insured certifying that insurance has been effected and that a policy has been issued. Such a certificate for a particular cargo is primarily used when good are insured under the terms of a floating or an open policy; at the request of the insured it can be exchanged for a policy.",
		key: "INSURANCE_CERTIFICATE",
	},
	{
		value: "521",
		name: "Special requirements permit related to the transport of",
		description:
			"cargo A permit related to a transport document granting the transport of cargo under the conditions as specifically required.",
		key: "SPECIAL_REQUIREMENTS_PERMIT_RELATED_TO_THE_TRANSPORT_OF",
	},
	{
		value: "522",
		name: "Dangerous Goods Notification for Tanker vessel",
		description:
			"Dangerous Goods Notification for a vessel carrying liquid cargo in bulk.",
		key: "DANGEROUS_GOODS_NOTIFICATION_FOR_TANKER_VESSEL",
	},
	{
		value: "523",
		name: "Dangerous Goods Notification for non-tanker vessel",
		description:
			"Dangerous Goods Notification for a vessel carrying cargo other than bulk liquid cargo.",
		key: "DANGEROUS_GOODS_NOTIFICATION_FOR_NON_TANKER_VESSEL",
	},
	{
		value: "524",
		name: "WCO Conveyance Arrival Report",
		description:
			"Declaration, in accordance with the WCO Customs Data Model, to Customs regarding the conveyance arriving in a Customs territory.",
		key: "WCO_CONVEYANCE_ARRIVAL_REPORT",
	},
	{
		value: "525",
		name: "WCO Conveyance Departure Report",
		description:
			"Declaration, in accordance with the WCO Customs Data Model, to Customs regarding the conveyance departing a Customs territory.",
		key: "WCO_CONVEYANCE_DEPARTURE_REPORT",
	},
	{
		value: "526",
		name: "Accounting voucher",
		description: "A document/message justifying an accounting entry.",
		key: "ACCOUNTING_VOUCHER",
	},
	{
		value: "528",
		name: "Military Identification Card",
		description:
			"The official document used for military personnel on travel orders, substituting a passport.",
		key: "MILITARY_IDENTIFICATION_CARD",
	},
	{
		value: "529",
		name: "Re-Entry Permit",
		description: "A permit to re-enter a country.",
		key: "RE_ENTRY_PERMIT",
	},
	{
		value: "530",
		name: "Insurance policy",
		description:
			"Document/message issued by the insurer evidencing an agreement to insure and containing the conditions of the agreement concluded whereby the insurer undertakes for a specific fee to indemnify the insured for the losses arising out of the perils and accidents specified in the contract.",
		key: "INSURANCE_POLICY",
	},
	{
		value: "531",
		name: "Refugee Permit",
		description: "Document identifying a refugee recognized by a country.",
		key: "REFUGEE_PERMIT",
	},
	{
		value: "533",
		name: "Original accounting voucher",
		description:
			"To indicate that the document/message justifying an accounting entry is original.",
		key: "ORIGINAL_ACCOUNTING_VOUCHER",
	},
	{
		value: "534",
		name: "Copy accounting voucher",
		description:
			"To indicate that the document/message justifying an accounting entry is a copy.",
		key: "COPY_ACCOUNTING_VOUCHER",
	},
	{
		value: "535",
		name: "Pro-forma accounting voucher",
		description:
			"To indicate that the document/message justifying an accounting entry is pro-forma.",
		key: "PRO_FORMA_ACCOUNTING_VOUCHER",
	},
	{
		value: "536",
		name: "International Ship Security Certificate",
		description:
			"A certificate on ship security issued based on the International code for the Security of Ships and of Port facilities (ISPS code).",
		key: "INTERNATIONAL_SHIP_SECURITY_CERTIFICATE",
	},
	{
		value: "537",
		name: "Interim International Ship Security Certificate",
		description:
			"An interim certificate on ship security issued basis under the International code for the Security of Ships and of Port facilities (ISPS code).",
		key: "INTERIM_INTERNATIONAL_SHIP_SECURITY_CERTIFICATE",
	},
	{
		value: "538",
		name: "Good Manufacturing Practice (GMP) Certificate",
		description:
			"Certificate that guarantees quality manufacturing and processing of food products, medications, cosmetics, etc.",
		key: "GOOD_MANUFACTURING_PRACTICE_GMP_CERTIFICATE",
	},
	{
		value: "539",
		name: "Framework Agreement",
		description:
			"An agreement between one or more contracting authorities and one or more economic operators, the purpose of which is to establish the terms governing contracts to be awarded during a given period, in particular with regard to price and, where appropriate, the quantity envisaged.",
		key: "FRAMEWORK_AGREEMENT",
	},
	{
		value: "550",
		name: "Insurance declaration sheet (bordereau)",
		description:
			"A document/message used when an insured reports to his insurer details of individual shipments which are covered by an insurance contract - an open cover or a floating policy - between the parties.",
		key: "INSURANCE_DECLARATION_SHEET_BORDEREAU",
	},
	{
		value: "551",
		name: "Transport capacity offer",
		description:
			"Offering of capacity for the transport of goods for a date and a route.",
		key: "TRANSPORT_CAPACITY_OFFER",
	},
	{
		value: "552",
		name: "Ship Security Plan",
		description:
			"Ship Security Plan (SSP) is a document prepared in terms of the ISPS Code to contribute to the prevention of illegal acts against the ship and its crew.",
		key: "SHIP_SECURITY_PLAN",
	},
	{
		value: "554",
		name: "Storage capacity offer",
		description: "Offering of capacity to store goods.",
		key: "STORAGE_CAPACITY_OFFER",
	},
	{
		value: "576",
		name: "Storage capacity request",
		description: "Request for capacity to store goods.",
		key: "STORAGE_CAPACITY_REQUEST",
	},
	{
		value: "577",
		name: "Transport capacity request",
		description:
			"Request for capacity for the transport of goods for a date and a route.",
		key: "TRANSPORT_CAPACITY_REQUEST",
	},
	{
		value: "578",
		name: "EU Customs declaration for External Community Transit (T1)",
		description:
			'Customs declaration for goods under the external Community/common transit procedure. This applies to "non-Community goods" ("T1" under EU legislation and EC- EFTA "Transit Convention").',
		key: "EU_CUSTOMS_DECLARATION_FOR_EXTERNAL_COMMUNITY_TRANSIT_T1",
	},
	{
		value: "579",
		name: "EU Customs declaration for internal Community Transit (T2)",
		description:
			'Customs declaration for goods under the internal Community/common transit procedure. This applies to "Community goods" ("T2" under EU legislation and EC-EFTA "Transit Convention").',
		key: "EU_CUSTOMS_DECLARATION_FOR_INTERNAL_COMMUNITY_TRANSIT_T2",
	},
	{
		value: "580",
		name: "Cover note",
		description:
			"Document/message issued by an insurer (insurance broker, agent, etc.) to notify the insured that his insurance have been carried out.",
		key: "COVER_NOTE",
	},
	{
		value: "581",
		name: "EU Customs declaration for non-fiscal area internal",
		description:
			'Community Transit (T2F) Declaration for goods under the internal Community transit procedure in the context of trade between the "VAT" territory of EU Member States and EU territories where the VAT rules do not apply, such as Canary islands, some French overseas territories, the Channel islands and the Aaland islands, and between those territories. ("T2F" under EU Legislation).',
		key: "EU_CUSTOMS_DECLARATION_FOR_NON_FISCAL_AREA_INTERNAL",
	},
	{
		value: "582",
		name: "EU Customs declaration for internal transit to San Marino",
		description:
			'(T2SM) Customs declaration for goods under the internal Community transit procedure between the Community and San Marino. ("T2SM" under EU Legislation).',
		key: "EU_CUSTOMS_DECLARATION_FOR_INTERNAL_TRANSIT_TO_SAN_MARINO",
	},
	{
		value: "583",
		name: "EU Customs declaration for mixed consignments (T)",
		description:
			'Customs declaration for goods under the Community/common transit procedure for mixed consignments (i.e. consignments that comprise goods of different statuses, like "T1" and "T2") ("T" under EU Legislation).',
		key: "EU_CUSTOMS_DECLARATION_FOR_MIXED_CONSIGNMENTS_T",
	},
	{
		value: "584",
		name: "EU Document for establishing the Community status of goods",
		description:
			'(T2L) Form establishing the Community status of goods ("T2L" under EU Legislation).',
		key: "EU_DOCUMENT_FOR_ESTABLISHING_THE_COMMUNITY_STATUS_OF_GOODS",
	},
	{
		value: "585",
		name: "EU Document for establishing the Community status of goods",
		description:
			'for certain fiscal purposes (T2LF) Form establishing the Community status of goods in the context of trade between the "VAT" territory of EU Member States and EU territories where the VAT rules do not apply, such as Canary islands, some French overseas territories, the Channel islands and the Aaland islands, and between those territories ("T2LF" under EU Legislation).',
		key: "EU_DOCUMENT_FOR_ESTABLISHING_THE_COMMUNITY_STATUS_OF_GOODS",
	},
	{
		value: "586",
		name: "Document for establishing the Customs Status of goods for",
		description:
			'San Marino (T2LSM) Form establishing the Community status of goods ("T2L" under European Legislation) in the context of trade between the EU and San Marino. ("T2LSM" under EU Legislation).',
		key: "DOCUMENT_FOR_ESTABLISHING_THE_CUSTOMS_STATUS_OF_GOODS_FOR",
	},
	{
		value: "587",
		name: "Customs declaration for TIR Carnet goods",
		description:
			"A Customs declaration in which goods move under cover of TIR Carnets.",
		key: "CUSTOMS_DECLARATION_FOR_TIR_CARNET_GOODS",
	},
	{
		value: "588",
		name: "Transport Means Security Report",
		description:
			"A document reporting the security status and related information of a means of transport.",
		key: "TRANSPORT_MEANS_SECURITY_REPORT",
	},
	{
		value: "589",
		name: "Halal Slaughtering Certificate",
		description:
			"A certificate verifying that meat has been produced from slaughter in accordance with Islamic laws and practices.",
		key: "HALAL_SLAUGHTERING_CERTIFICATE",
	},
	{
		value: "610",
		name: "Forwarding instructions",
		description:
			"Document/message issued to a freight forwarder, giving instructions regarding the action to be taken by the forwarder for the forwarding of goods described therein.",
		key: "FORWARDING_INSTRUCTIONS",
	},
	{
		value: "621",
		name: "Forwarder's advice to import agent",
		description:
			"Document/message issued by a freight forwarder in an exporting country advising his counterpart in an importing country about the forwarding of goods described therein.",
		key: "FORWARDER_S_ADVICE_TO_IMPORT_AGENT",
	},
	{
		value: "622",
		name: "Forwarder's advice to exporter",
		description:
			"Document/message issued by a freight forwarder informing an exporter of the action taken in fulfillment of instructions received.",
		key: "FORWARDER_S_ADVICE_TO_EXPORTER",
	},
	{
		value: "624",
		name: "Forwarder's certificate of receipt",
		description:
			"Non-negotiable document issued by a forwarder to certify that he has assumed control of a specified consignment, with irrevocable instructions to send it to the consignee indicated in the document or to hold it at his disposal. E.g. FIATA-FCR.",
		key: "FORWARDER_S_CERTIFICATE_OF_RECEIPT",
	},
	{
		value: "625",
		name: "Heat Treatment Certificate",
		description:
			"A certificate verifying the heat treatment of the product is in conformance with international standards to ensure the product�s healthiness and/or shows the mode of heat treatment indicating the temperature and the amount of time the product or raw material used in the product was treated (such as milk).",
		key: "HEAT_TREATMENT_CERTIFICATE",
	},
	{
		value: "626",
		name: "Convention on International Trade in Endangered Species of",
		description:
			"Wild Fauna and Flora (CITES) Certificate A certificate used in the trade of endangered species in accordance with the CITES convention.",
		key: "CONVENTION_ON_INTERNATIONAL_TRADE_IN_ENDANGERED_SPECIES_OF",
	},
	{
		value: "627",
		name: "Free Sale Certificate in the Country of Origin",
		description:
			"A certificate confirming that a specified product is free for sale in the country of origin.",
		key: "FREE_SALE_CERTIFICATE_IN_THE_COUNTRY_OF_ORIGIN",
	},
	{
		value: "628",
		name: "Transit license",
		description:
			"Document/message issued by the competent body in accordance with transit regulations in force, by which authorization is granted to a party to move articles under customs procedure.",
		key: "TRANSIT_LICENSE",
	},
	{
		value: "629",
		name: "Veterinary quarantine certificate",
		description:
			"A certification that livestock or animal products, that are either imported or entering free zones, are kept under health supervision for a time period determined by veterinary quarantine instructions.",
		key: "VETERINARY_QUARANTINE_CERTIFICATE",
	},
	{
		value: "630",
		name: "Shipping note",
		description:
			"(1123) Document/message provided by the shipper or his agent to the carrier, multimodal transport operator, terminal or other receiving authority, giving information about export consignments offered for transport, and providing for the necessary receipts and declarations of liability. Sometimes a multipurpose cargo handling document also fulfilling the functions of document 632, 633, 650 and 655.",
		key: "SHIPPING_NOTE",
	},
	{
		value: "631",
		name: "Forwarder's warehouse receipt",
		description:
			"Document/message issued by a forwarder acting as Warehouse Keeper acknowledging receipt of goods placed in a warehouse, and stating or referring to the conditions which govern the warehousing and the release of goods. The document contains detailed provisions regarding the rights of holders-by-endorsement, transfer of ownership, etc. E.g. FIATA-FWR.",
		key: "FORWARDER_S_WAREHOUSE_RECEIPT",
	},
	{
		value: "632",
		name: "Goods receipt",
		description:
			"Document/message to acknowledge the receipt of goods and in addition may indicate receiving conditions.",
		key: "GOODS_RECEIPT",
	},
	{
		value: "634",
		name: "Certified list of ingredients",
		description:
			"A document legalized from a competent authority that shows the components of the product (food additive, detergent, disinfectant and sanitizer).",
		key: "CERTIFIED_LIST_OF_INGREDIENTS",
	},
	{
		value: "635",
		name: "Warehouse warrant",
		description:
			"Negotiable receipt document, issued by a Warehouse Keeper to a person placing goods in a warehouse and conferring title to the goods stored.",
		key: "WAREHOUSE_WARRANT",
	},
	{
		value: "636",
		name: "Health certificate",
		description:
			"A document legalized from a competent authority that shows that the product has been tested microbiologically and is free from any pathogens and fit for human consumption and/or declares that the product is in compliance with sanitary and phytosanitary measures.",
		key: "HEALTH_CERTIFICATE",
	},
	{
		value: "637",
		name: "Food grade certificate",
		description:
			"A document that shows that the product (food additive, detergent, disinfectant and sanitizer) is suitable to be used in the food industry.",
		key: "FOOD_GRADE_CERTIFICATE",
	},
	{
		value: "638",
		name: "Certificate of suitability for transport of grains and",
		description:
			"legumes Certificate of inspection for the vessel stating its readiness and suitability for transporting grains and legumes.",
		key: "CERTIFICATE_OF_SUITABILITY_FOR_TRANSPORT_OF_GRAINS_AND",
	},
	{
		value: "639",
		name: "Certificate of refrigerated transport equipment inspection",
		description:
			"Inspection document shows that the container, the cooling devices and measured temperature is in good working condition.",
		key: "CERTIFICATE_OF_REFRIGERATED_TRANSPORT_EQUIPMENT_INSPECTION",
	},
	{
		value: "640",
		name: "Delivery order",
		description:
			"Document/message issued by a party entitled to authorize the release of goods specified therein to a named consignee, to be retained by the custodian of the goods.",
		key: "DELIVERY_ORDER",
	},
	{
		value: "641",
		name: "Thermographic reading report",
		description: "A report of temperature readings over a period.",
		key: "THERMOGRAPHIC_READING_REPORT",
	},
	{
		value: "642",
		name: "Certificate of food item transport readiness",
		description:
			"A certificate to verify readiness of a transport or transport area such as a reservoir or hold to transport food items.",
		key: "CERTIFICATE_OF_FOOD_ITEM_TRANSPORT_READINESS",
	},
	{
		value: "643",
		name: "Food packaging contact certificate",
		description:
			"A document legalized from a competent authority that shows that the food packaging product is safe to come into contact with food.",
		key: "FOOD_PACKAGING_CONTACT_CERTIFICATE",
	},
	{
		value: "644",
		name: "Packaging material composition report",
		description:
			"A document that shows the main structure that composes the packaging material.",
		key: "PACKAGING_MATERIAL_COMPOSITION_REPORT",
	},
	{
		value: "645",
		name: "Export price certificate",
		description:
			"A certification executed by the competent authority from country of exportation stating the export price of the goods.",
		key: "EXPORT_PRICE_CERTIFICATE",
	},
	{
		value: "646",
		name: "Public price certificate",
		description:
			"A certification executed by the competent authority from country of production stating the price of the goods to the general public.",
		key: "PUBLIC_PRICE_CERTIFICATE",
	},
	{
		value: "647",
		name: "Drug shelf life study report",
		description:
			"A document containing results from the study which determines the shelf life, namely the time period of storage at a specified condition within which a drug substance or drug product still meets its established specifications; its identity, strength, quality and purity.",
		key: "DRUG_SHELF_LIFE_STUDY_REPORT",
	},
	{
		value: "648",
		name: "Certificate of compliance with standards of the World",
		description:
			"Organization for Animal Health (OIE) A certification that the products have been treated in a way consistent with the standards set by the World Organization for Animal Health (OIE).",
		key: "CERTIFICATE_OF_COMPLIANCE_WITH_STANDARDS_OF_THE_WORLD",
	},
	{
		value: "649",
		name: "Production facility license",
		description:
			"A license granted by a competent authority to a production facility for manufacturing specific products.",
		key: "PRODUCTION_FACILITY_LICENSE",
	},
	{
		value: "650",
		name: "Handling order",
		description:
			"Document/message issued by a cargo handling organization (port administration, terminal operator, etc.) for the removal or other handling of goods under their care.",
		key: "HANDLING_ORDER",
	},
	{
		value: "651",
		name: "Manufacturing license",
		description:
			"A license granted by a competent authority to a manufacturer for production of specific products.",
		key: "MANUFACTURING_LICENSE",
	},
	{
		value: "652",
		name: "Low risk country formal letter",
		description:
			"An official letter issued by an import authority granted to the importer of goods from a low risk country which allows the importer to place its products in the local market with certain favorable considerations.",
		key: "LOW_RISK_COUNTRY_FORMAL_LETTER",
	},
	{
		value: "653",
		name: "Previous correspondence",
		description: "Correspondence previously exchanged.",
		key: "PREVIOUS_CORRESPONDENCE",
	},
	{
		value: "654",
		name: "Declaration for radioactive material",
		description:
			"A declaration to be presented to the competent authority when radioactive material moves cross-border.",
		key: "DECLARATION_FOR_RADIOACTIVE_MATERIAL",
	},
	{
		value: "655",
		name: "Gate pass",
		description:
			"Document/message authorizing goods specified therein to be brought out of a fenced-in port or terminal area.",
		key: "GATE_PASS",
	},
	{
		value: "656",
		name: "Resale information",
		description: "Document/message providing information on a resale.",
		key: "RESALE_INFORMATION",
	},
	{
		value: "657",
		name: "Phytosanitary Re-export Certificate",
		description:
			"A message/document consistent with the model for re- export phytosanitary certificates of the IPPC, attesting that a consignment meets phytosanitary import requirements.",
		key: "PHYTOSANITARY_RE_EXPORT_CERTIFICATE",
	},
	{
		value: "658",
		name: "Bayplan/stowage plan, full",
		description:
			"A full bayplan containing all occupied and/or blocked stowage locations.",
		key: "BAYPLAN_STOWAGE_PLAN_FULL",
	},
	{
		value: "659",
		name: "Bayplan/stowage plan, partial",
		description:
			"A partial bayplan. containing only a selected part of the available stowage locations.",
		key: "BAYPLAN_STOWAGE_PLAN_PARTIAL",
	},
	{
		value: "700",
		name: "Waybill",
		description:
			"Non-negotiable document evidencing the contract for the transport of cargo.",
		key: "WAYBILL",
	},
	{
		value: "701",
		name: "Universal (multipurpose) transport document",
		description:
			"Document/message evidencing a contract of carriage covering the movement of goods by any mode of transport, or combination of modes, for national as well as international transport, under any applicable international convention or national law and under the conditions of carriage of any carrier or transport operator undertaking or arranging the transport referred to in the document.",
		key: "UNIVERSAL_MULTIPURPOSE_TRANSPORT_DOCUMENT",
	},
	{
		value: "702",
		name: "Goods receipt, carriage",
		description:
			"Document/message issued by a carrier or a carrier's agent, acknowledging receipt for carriage of goods specified therein on conditions stated or referred to in the document, enabling the carrier to issue a transport document.",
		key: "GOODS_RECEIPT_CARRIAGE",
	},
	{
		value: "703",
		name: "House waybill",
		description:
			"The document made out by an agent/consolidator which evidences the contract between the shipper and the agent/consolidator for the arrangement of carriage of goods.",
		key: "HOUSE_WAYBILL",
	},
	{
		value: "704",
		name: "Master bill of lading",
		description:
			"A bill of lading issued by the master of a vessel (in actuality the owner or charterer of the vessel). It could cover a number of house bills.",
		key: "MASTER_BILL_OF_LADING",
	},
	{
		value: "705",
		name: "Bill of lading",
		description:
			"Negotiable document/message which evidences a contract of carriage by sea and the taking over or loading of goods by carrier, and by which carrier undertakes to deliver goods against surrender of the document. A provision in the document that goods are to be delivered to the order of a named person, or to order, or to bearer, constitutes such an undertaking.",
		key: "BILL_OF_LADING",
	},
	{
		value: "706",
		name: "Bill of lading original",
		description:
			"The original of the bill of lading issued by a transport company. When issued by the maritime industry it could signify ownership of the cargo.",
		key: "BILL_OF_LADING_ORIGINAL",
	},
	{
		value: "707",
		name: "Bill of lading copy",
		description: "A copy of the bill of lading issued by a transport company.",
		key: "BILL_OF_LADING_COPY",
	},
	{
		value: "708",
		name: "Empty container bill",
		description: "Bill of lading indicating an empty container.",
		key: "EMPTY_CONTAINER_BILL",
	},
	{
		value: "709",
		name: "Tanker bill of lading",
		description: "Document which evidences a transport of liquid bulk cargo.",
		key: "TANKER_BILL_OF_LADING",
	},
	{
		value: "710",
		name: "Sea waybill",
		description:
			"Non-negotiable document which evidences a contract for the carriage of goods by sea and the taking over of the goods by the carrier, and by which the carrier undertakes to deliver the goods to the consignee named in the document.",
		key: "SEA_WAYBILL",
	},
	{
		value: "711",
		name: "Inland waterway bill of lading",
		description:
			"Negotiable transport document made out to a named person, to order or to bearer, signed by the carrier and handed to the sender after receipt of the goods.",
		key: "INLAND_WATERWAY_BILL_OF_LADING",
	},
	{
		value: "712",
		name: "Non-negotiable maritime transport document (generic)",
		description:
			'Non-negotiable document which evidences a contract for the carriage of goods by sea and the taking over or loading of the goods by the carrier, and by which the carrier undertakes to deliver the goods to the consignee named in the document. E.g. Sea waybill. Remark: Synonymous with "straight" or "non-negotiable Bill of lading" used in certain countries, e.g. Canada.',
		key: "NON_NEGOTIABLE_MARITIME_TRANSPORT_DOCUMENT_GENERIC",
	},
	{
		value: "713",
		name: "Mate's receipt",
		description:
			"Document/message issued by a ship's officer to acknowledge that a specified consignment has been received on board a vessel, and the apparent condition of the goods; enabling the carrier to issue a Bill of lading.",
		key: "MATE_S_RECEIPT",
	},
	{
		value: "714",
		name: "House bill of lading",
		description:
			"The bill of lading issued not by the carrier but by the freight forwarder/consolidator known by the carrier.",
		key: "HOUSE_BILL_OF_LADING",
	},
	{
		value: "715",
		name: "Letter of indemnity for non-surrender of bill of lading",
		description:
			"Document/message issued by a commercial party or a bank of an insurance company accepting responsibility to the beneficiary of the indemnity in accordance with the terms thereof.",
		key: "LETTER_OF_INDEMNITY_FOR_NON_SURRENDER_OF_BILL_OF_LADING",
	},
	{
		value: "716",
		name: "Forwarder's bill of lading",
		description:
			"Non-negotiable document issued by a freight forwarder evidencing a contract for the carriage of goods by sea and the taking over or loading of the goods by the freight forwarder, and by which the freight forwarder undertakes to deliver the goods to the consignee named in the document.",
		key: "FORWARDER_S_BILL_OF_LADING",
	},
	{
		value: "717",
		name: "Residence permit",
		description: "A document authorizing residence.",
		key: "RESIDENCE_PERMIT",
	},
	{
		value: "718",
		name: "Seaman�s book",
		description:
			"A national identity document issued to professional seamen that contains a record of their rank and service career.",
		key: "SEAMAN_S_BOOK",
	},
	{
		value: "719",
		name: "General message",
		description: "Document/message providing agreed textual information.",
		key: "GENERAL_MESSAGE",
	},
	{
		value: "720",
		name: "Rail consignment note (generic term)",
		description:
			"Transport document constituting a contract for the carriage of goods between the sender and the carrier (the railway). For international rail traffic, this document must conform to the model prescribed by the international conventions concerning carriage of goods by rail, e.g. CIM Convention, SMGS Convention.",
		key: "RAIL_CONSIGNMENT_NOTE_GENERIC_TERM",
	},
	{
		value: "721",
		name: "Product data response",
		description:
			"Document/message responding to a previously received Product Data document/message.",
		key: "PRODUCT_DATA_RESPONSE",
	},
	{
		value: "722",
		name: "Road list-SMGS",
		description:
			"Accounting document, one copy of which is drawn up for each consignment note; it accompanies the consignment over the whole route and is a rail transport document.",
		key: "ROAD_LIST_SMGS",
	},
	{
		value: "723",
		name: "Escort official recognition",
		description:
			"Document/message which gives right to the owner to exert all functions normally transferred to a guard in a train by which an escorted consignment is transported.",
		key: "ESCORT_OFFICIAL_RECOGNITION",
	},
	{
		value: "724",
		name: "Recharging document",
		description:
			"Fictitious transport document regarding a previous transport, enabling a carrier's agent to give to another carrier's agent (in a different country) the possibility to collect charges relating to the original transport (rail environment).",
		key: "RECHARGING_DOCUMENT",
	},
	{
		value: "725",
		name: "Manufacturer raised order",
		description:
			"Document/message providing details of an order which has been raised by a manufacturer.",
		key: "MANUFACTURER_RAISED_ORDER",
	},
	{
		value: "726",
		name: "Manufacturer raised consignment order",
		description:
			"Document/message providing details of a consignment order which has been raised by a manufacturer.",
		key: "MANUFACTURER_RAISED_CONSIGNMENT_ORDER",
	},
	{
		value: "727",
		name: "Price/sales catalogue not containing commercial information",
		description:
			"A price/sales catalogue message containing no commercial information, such as prices, terms or conditions.",
		key: "PRICE_SALES_CATALOGUE_NOT_CONTAINING_COMMERCIAL_INFORMATION",
	},
	{
		value: "728",
		name: "Price/sales catalogue containing commercial information",
		description:
			"A price/sales catalogue message containing only commercial terms or conditions data.",
		key: "PRICE_SALES_CATALOGUE_CONTAINING_COMMERCIAL_INFORMATION",
	},
	{
		value: "729",
		name: "Returns advice",
		description:
			"Document/message by means of which the buyer informs the seller about the despatch of returned goods.",
		key: "RETURNS_ADVICE",
	},
	{
		value: "730",
		name: "Road consignment note",
		description:
			"Transport document/message which evidences a contract between a carrier and a sender for the carriage of goods by road (generic term). Remark: For international road traffic, this document must contain at least the particulars prescribed by the convention on the contract for the international carriage of goods by road (CMR).",
		key: "ROAD_CONSIGNMENT_NOTE",
	},
	{
		value: "731",
		name: "Commercial account summary",
		description:
			"A message enabling the transmission of commercial data concerning payments made and outstanding items on an account over a period of time.",
		key: "COMMERCIAL_ACCOUNT_SUMMARY",
	},
	{
		value: "732",
		name: "Announcement for returns",
		description:
			"A message by which a party announces to another party details of goods for return due to specified reasons (e.g. returns for repair, returns because of damage, etc).",
		key: "ANNOUNCEMENT_FOR_RETURNS",
	},
	{
		value: "733",
		name: "Instruction for returns",
		description:
			"A message by which a party informs another party whether and how goods shall be returned.",
		key: "INSTRUCTION_FOR_RETURNS",
	},
	{
		value: "734",
		name: "Sales forecast report",
		description:
			"A message enabling companies to exchange or report electronically, basic sales forecast data related to products or services, including the corresponding location, time period, product identification, pricing and quantity information. It enables the recip.",
		key: "SALES_FORECAST_REPORT",
	},
	{
		value: "735",
		name: "Sales data report",
		description:
			"A message enabling companies to exchange or report electronically, basic sales data related to products or services, including the corresponding location, time period, product identification, pricing and quantity information. It enables the recipient to p.",
		key: "SALES_DATA_REPORT",
	},
	{
		value: "736",
		name: "Standing inquiry on complete product information",
		description:
			"A product inquiry which stands until it is cancelled. It requests not only the updates since last time, but always the complete product information of a data supplier. This means that within the standing request every time a complete download of the respe.",
		key: "STANDING_INQUIRY_ON_COMPLETE_PRODUCT_INFORMATION",
	},
	{
		value: "737",
		name: "Proof of delivery",
		description:
			"A message by which a consignee provides for a carrier proof of delivery of a consignment.",
		key: "PROOF_OF_DELIVERY",
	},
	{
		value: "738",
		name: "Cargo/goods handling and movement message",
		description:
			"A message from a party to a warehouse, distribution centre, or logistics service provider identifying the handling services and where required the movement of specified goods, limited to warehouses within the jurisdiction of the distribution centre or log.",
		key: "CARGO_GOODS_HANDLING_AND_MOVEMENT_MESSAGE",
	},
	{
		value: "739",
		name: "Metered services consumption report supporting an invoice",
		description:
			"Document/message providing metered consumption details supporiting an invoice.",
		key: "METERED_SERVICES_CONSUMPTION_REPORT_SUPPORTING_AN_INVOICE",
	},
	{
		value: "740",
		name: "Air waybill",
		description:
			"Document/message made out by or on behalf of the shipper which evidences the contract between the shipper and carrier(s) for carriage of goods over routes of the carrier(s) and which is identified by the airline prefix issuing the document plus a serial (IATA).",
		key: "AIR_WAYBILL",
	},
	{
		value: "741",
		name: "Master air waybill",
		description:
			"Document/message made out by or on behalf of the agent/consolidator which evidences the contract between the agent/consolidator and carrier(s) for carriage of goods over routes of the carrier(s) for a consignment consisting of goods originated by more than one shipper (IATA).",
		key: "MASTER_AIR_WAYBILL",
	},
	{
		value: "742",
		name: "Metered services consumption report",
		description: "Document/message providing metered consumption details.",
		key: "METERED_SERVICES_CONSUMPTION_REPORT",
	},
	{
		value: "743",
		name: "Substitute air waybill",
		description:
			"A temporary air waybill which contains only limited information because of the absence of the original.",
		key: "SUBSTITUTE_AIR_WAYBILL",
	},
	{
		value: "744",
		name: "Crew's effects declaration",
		description:
			"Declaration to Customs regarding the personal effects of crew members aboard the conveyance; equivalent to IMO FAL 4.",
		key: "CREW_S_EFFECTS_DECLARATION",
	},
	{
		value: "745",
		name: "Passenger list",
		description:
			"Declaration to Customs regarding passengers aboard the conveyance; equivalent to IMO FAL 6.",
		key: "PASSENGER_LIST",
	},
	{
		value: "746",
		name: "Delivery notice (rail transport)",
		description:
			"Document/message created by the consignor or by the departure station, joined to the transport or sent to the consignee, giving the possibility to the consignee or the arrival station to attest the delivery of the goods. The document must be returned to the consignor or to the departure station.",
		key: "DELIVERY_NOTICE_RAIL_TRANSPORT",
	},
	{
		value: "747",
		name: "Payroll deductions advice",
		description:
			"A message sent by a party (usually an employer or its representative) to a service providing organisation, to detail payroll deductions paid on behalf of its employees to the service providing organisation.",
		key: "PAYROLL_DEDUCTIONS_ADVICE",
	},
	{
		value: "748",
		name: "Consignment despatch advice",
		description:
			"Document/message by means of which the supplier informs the buyer about the despatch of goods ordered on consignment (goods to be delivered into stock with agreement on payment when goods are sold out of this stock).",
		key: "CONSIGNMENT_DESPATCH_ADVICE",
	},
	{
		value: "749",
		name: "Transport equipment gross mass verification message",
		description:
			"Message containing information regarding gross mass verification of transport equipment.",
		key: "TRANSPORT_EQUIPMENT_GROSS_MASS_VERIFICATION_MESSAGE",
	},
	{
		value: "750",
		name: "Despatch note (post parcels)",
		description:
			'Document/message which, according to Article 106 of the "Agreement concerning Postal Parcels" under the UPU convention, is to accompany post parcels.',
		key: "DESPATCH_NOTE_POST_PARCELS",
	},
	{
		value: "752",
		name: "Plant Passport",
		description:
			"Document/message issued by a competent body certifying the phytosanitary status of plants or plant products for international trade.",
		key: "PLANT_PASSPORT",
	},
	{
		value: "753",
		name: "Certificate of sustainability",
		description:
			"Document/message issued by a competent body certifying sustainability.",
		key: "CERTIFICATE_OF_SUSTAINABILITY",
	},
	{
		value: "754",
		name: "Call for tender",
		description:
			"A document/message used by a buyer to define the procurement procedure and request suppliers to participate.",
		key: "CALL_FOR_TENDER",
	},
	{
		value: "755",
		name: "Invitation to tender",
		description:
			"A document/message used by a buyer to define the procurement procedure and request specific suppliers to participate.",
		key: "INVITATION_TO_TENDER",
	},
	{
		value: "756",
		name: "European Single Procurement Document request",
		description:
			"A document/message requesting a self-declaration from the supplier, providing preliminary evidence during the tendering phase.",
		key: "EUROPEAN_SINGLE_PROCUREMENT_DOCUMENT_REQUEST",
	},
	{
		value: "757",
		name: "Tendering price/sales catalogue request",
		description:
			"A document/message requesting information regarding pricing and catalogue details for goods and/or services to be offered as part of a tender.",
		key: "TENDERING_PRICE_SALES_CATALOGUE_REQUEST",
	},
	{
		value: "758",
		name: "Tender",
		description:
			"A document/message used by a supplier to bid in a procurement procedure.",
		key: "TENDER",
	},
	{
		value: "759",
		name: "European Single Procurement Document",
		description:
			"A document/message containing a self-declaration by the supplier, providing preliminary evidence during the tendering phase.",
		key: "EUROPEAN_SINGLE_PROCUREMENT_DOCUMENT",
	},
	{
		value: "760",
		name: "Multimodal/combined transport document (generic)",
		description:
			"A transport document used when more than one mode of transportation is involved in the movement of cargo. It is a contract of carriage and receipt of the cargo for a multimodal transport. It indicates the place where the responsible transport company in the move takes responsibility for the cargo, the place where the responsibility of this transport company in the move ends and the conveyances involved.",
		key: "MULTIMODAL_COMBINED_TRANSPORT_DOCUMENT_GENERIC",
	},
	{
		value: "761",
		name: "Through bill of lading",
		description:
			"Bill of lading which evidences a contract of carriage from one place to another in separate stages of which at least one stage is a sea transit, and by which the issuing carrier accepts responsibility for the carriage as set forth in the through bill of lading.",
		key: "THROUGH_BILL_OF_LADING",
	},
	{
		value: "762",
		name: "Tendering price/sales catalogue",
		description:
			"A document/message providing information regarding pricing and catalogue details for goods and/or services to be offered as part of a tender.",
		key: "TENDERING_PRICE_SALES_CATALOGUE",
	},
	{
		value: "763",
		name: "Forwarder's certificate of transport",
		description:
			"Negotiable document/message issued by a forwarder to certify that he has taken charge of a specified consignment for despatch and delivery in accordance with the consignor's instructions, as indicated in the document, and that he accepts responsibility for delivery of the goods to the holder of the document through the intermediary of a delivery agent of his choice. E.g. FIATA-FCT.",
		key: "FORWARDER_S_CERTIFICATE_OF_TRANSPORT",
	},
	{
		value: "764",
		name: "Combined transport document (generic)",
		description:
			'Negotiable or non-negotiable document evidencing a contract for the performance and/or procurement of performance of combined transport of goods and bearing on its face either the heading "Negotiable combined transport document issued subject to Uniform Rules for a Combined Transport Document (ICC Brochure No. 298)" or the heading "Non-negotiable Combined Transport Document issued subject to Uniform Rules for a Combined Transport Document (ICC Brochure No. 298)".',
		key: "COMBINED_TRANSPORT_DOCUMENT_GENERIC",
	},
	{
		value: "765",
		name: "Multimodal transport document (generic)",
		description:
			"Document/message which evidences a multimodal transport contract, the taking in charge of the goods by the multimodal transport operator, and an undertaking by him to deliver the goods in accordance with the terms of the contract. (International Convention on Multimodal Transport of Goods).",
		key: "MULTIMODAL_TRANSPORT_DOCUMENT_GENERIC",
	},
	{
		value: "766",
		name: "Combined transport bill of lading/multimodal bill of lading",
		description:
			"Document which evidences a multimodal transport contract, the taking in charge of the goods by the multimodal transport operator, and an undertaking by him to deliver the goods in accordance with the terms of the contract.",
		key: "COMBINED_TRANSPORT_BILL_OF_LADING_MULTIMODAL_BILL_OF_LADING",
	},
	{
		value: "767",
		name: "Acknowledgment of receipt",
		description: "Document/message confirming a receipt to the sending party.",
		key: "ACKNOWLEDGMENT_OF_RECEIPT",
	},
	{
		value: "768",
		name: "Civil status document",
		description: "Document which confirms the civil status of a person.",
		key: "CIVIL_STATUS_DOCUMENT",
	},
	{
		value: "769",
		name: "Advice report",
		description: "Document reporting advice.",
		key: "ADVICE_REPORT",
	},
	{
		value: "770",
		name: "Booking confirmation",
		description:
			"Document/message issued by a carrier to confirm that space has been reserved for a consignment in means of transport.",
		key: "BOOKING_CONFIRMATION",
	},
	{
		value: "771",
		name: "Binding offer",
		description: "Document which is a binding offer from one party to another.",
		key: "BINDING_OFFER",
	},
	{
		value: "772",
		name: "Binding customer agreement for contract",
		description:
			"Document which is a binding agreement from the customer for a contract, such as an insurance contract.",
		key: "BINDING_CUSTOMER_AGREEMENT_FOR_CONTRACT",
	},
	{
		value: "773",
		name: "Coverage confirmation note",
		description: "Document confirming that insurance coverage is granted.",
		key: "COVERAGE_CONFIRMATION_NOTE",
	},
	{
		value: "774",
		name: "General terms and conditions",
		description: "Document specifying general terms and conditions.",
		key: "GENERAL_TERMS_AND_CONDITIONS",
	},
	{
		value: "775",
		name: "Calling forward notice",
		description: "Instructions for release or delivery of goods.",
		key: "CALLING_FORWARD_NOTICE",
	},
	{
		value: "776",
		name: "Contract clauses",
		description: "Document specifying the clauses applying to a contract.",
		key: "CONTRACT_CLAUSES",
	},
	{
		value: "777",
		name: "Specific contract conditions",
		description:
			"Document specifying the individual conditions or clauses applying to a specific contract.",
		key: "SPECIFIC_CONTRACT_CONDITIONS",
	},
	{
		value: "778",
		name: "Group insurance rules",
		description: "Document stating the rules of a group insurance contract.",
		key: "GROUP_INSURANCE_RULES",
	},
	{
		value: "779",
		name: "Questionnaire",
		description: "Document consisting of a series of questions.",
		key: "QUESTIONNAIRE",
	},
	{
		value: "781",
		name: "Arrival notice (goods)",
		description:
			"Notification from the carrier to the consignee in writing, by telephone or by any other means (express letter, message, telegram, etc.) informing him that a consignment addressed to him is being or will shortly be held at his disposal at a specified point in the place of destination.",
		key: "ARRIVAL_NOTICE_GOODS",
	},
	{
		value: "782",
		name: "Notice of circumstances preventing delivery (goods)",
		description:
			"Request made by the carrier to the sender, or, as the case may be, the consignee, for instructions as to the disposal of the consignment when circumstances prevent delivery and the return of the goods has not been requested by the consignor in the transport document.",
		key: "NOTICE_OF_CIRCUMSTANCES_PREVENTING_DELIVERY_GOODS",
	},
	{
		value: "783",
		name: "Notice of circumstances preventing transport (goods)",
		description:
			"Request made by the carrier to the sender, or, the consignee as the case may be, for instructions as to the disposal of the goods when circumstances prevent transport before departure or en route, after acceptance of the consignment concerned.",
		key: "NOTICE_OF_CIRCUMSTANCES_PREVENTING_TRANSPORT_GOODS",
	},
	{
		value: "784",
		name: "Delivery notice (goods)",
		description:
			"Notification in writing, sent by the carrier to the sender, to inform him at his request of the actual date of delivery of the goods.",
		key: "DELIVERY_NOTICE_GOODS",
	},
	{
		value: "785",
		name: "Cargo manifest",
		description:
			"Listing of goods comprising the cargo carried in a means of transport or in a transport-unit. The cargo manifest gives the commercial particulars of the goods, such as transport document numbers, consignors, consignees, shipping marks, number and kind of packages and descriptions and quantities of the goods.",
		key: "CARGO_MANIFEST",
	},
	{
		value: "786",
		name: "Freight manifest",
		description:
			"Document/message containing the same information as a cargo manifest, and additional details on freight amounts, charges, etc.",
		key: "FREIGHT_MANIFEST",
	},
	{
		value: "787",
		name: "Bordereau",
		description:
			"Document/message used in road transport, listing the cargo carried on a road vehicle, often referring to appended copies of Road consignment note.",
		key: "BORDEREAU",
	},
	{
		value: "788",
		name: "Container manifest (unit packing list)",
		description:
			"Document/message specifying the contents of particular freight containers or other transport units, prepared by the party responsible for their loading into the container or unit.",
		key: "CONTAINER_MANIFEST_UNIT_PACKING_LIST",
	},
	{
		value: "789",
		name: "Charges note",
		description:
			"Document used by the rail organization to indicate freight charges or additional charges in each case where the departure station is not able to calculate the charges for the total voyage (e.g. tariff not yet updated, part of voyage not covered by the tariff). This document must be considered as joined to the transport.",
		key: "CHARGES_NOTE",
	},
	{
		value: "790",
		name: "Advice of collection",
		description:
			"(1030) Document that is joined to the transport or sent by separate means, giving to the departure rail organization the proof that the cash-on delivery amount has been encashed by the arrival rail organization before reimbursement of the consignor.",
		key: "ADVICE_OF_COLLECTION",
	},
	{
		value: "791",
		name: "Safety of ship certificate",
		description: "Document certifying a ship's safety to a specified date.",
		key: "SAFETY_OF_SHIP_CERTIFICATE",
	},
	{
		value: "792",
		name: "Safety of radio certificate",
		description:
			"Document certifying the safety of a ship's radio facilities to a specified date.",
		key: "SAFETY_OF_RADIO_CERTIFICATE",
	},
	{
		value: "793",
		name: "Safety of equipment certificate",
		description:
			"Document certifying the safety of a ship's equipment to a specified date.",
		key: "SAFETY_OF_EQUIPMENT_CERTIFICATE",
	},
	{
		value: "794",
		name: "Civil liability for oil certificate",
		description:
			"Document declaring a ship owner's liability for oil propelling or carried on a vessel.",
		key: "CIVIL_LIABILITY_FOR_OIL_CERTIFICATE",
	},
	{
		value: "795",
		name: "Loadline document",
		description:
			"Document specifying the limit of a ship's legal submersion under various conditions.",
		key: "LOADLINE_DOCUMENT",
	},
	{
		value: "796",
		name: "Derat document",
		description:
			"Document certifying that a ship is free of rats, valid to a specified date.",
		key: "DERAT_DOCUMENT",
	},
	{
		value: "797",
		name: "Maritime declaration of health",
		description:
			"Document certifying the health condition on board a vessel, valid to a specified date.",
		key: "MARITIME_DECLARATION_OF_HEALTH",
	},
	{
		value: "798",
		name: "Certificate of registry",
		description: "Official certificate stating the vessel's registry.",
		key: "CERTIFICATE_OF_REGISTRY",
	},
	{
		value: "799",
		name: "Ship's stores declaration",
		description:
			"Declaration to Customs regarding the contents of the ship's stores (equivalent to IMO FAL 3) i.e. goods intended for consumption by passengers/crew on board vessels, aircraft or trains, whether or not sold or landed; goods necessary for operation/maintenance of conveyance, including fuel/lubricants, excluding spare parts/equipment (IMO).",
		key: "SHIP_S_STORES_DECLARATION",
	},
	{
		value: "810",
		name: "Export licence, application for",
		description:
			"Application for a permit issued by a government authority permitting exportation of a specified commodity subject to specified conditions as quantity, country of destination, etc.",
		key: "EXPORT_LICENCE_APPLICATION_FOR",
	},
	{
		value: "811",
		name: "Export licence",
		description:
			"Permit issued by a government authority permitting exportation of a specified commodity subject to specified conditions as quantity, country of destination, etc. Synonym: Embargo permit.",
		key: "EXPORT_LICENCE",
	},
	{
		value: "812",
		name: "Exchange control declaration, export",
		description:
			"Document/message completed by an exporter/seller as a means whereby the competent body may control that the amount of foreign exchange accrued from a trade transaction is repatriated in accordance with the conditions of payment and exchange control regulations in force.",
		key: "EXCHANGE_CONTROL_DECLARATION_EXPORT",
	},
	{
		value: "813",
		name: "Declaration of final beneficiary",
		description:
			"Declaration document to identify the final beneficiary of an asset.",
		key: "DECLARATION_OF_FINAL_BENEFICIARY",
	},
	{
		value: "814",
		name: "US, FATCA statement",
		description:
			"Statement regarding the Foreign Account Tax Compliance Act (FATCA) of the United States of America.",
		key: "US_FATCA_STATEMENT",
	},
	{
		value: "815",
		name: "Insured status report",
		description:
			"Document reporting (e.g. annually) to the insured the actual details of an insurance contract.",
		key: "INSURED_STATUS_REPORT",
	},
	{
		value: "816",
		name: "Group pension commitment information",
		description:
			"Information document for the group pension commitment to an individual person.",
		key: "GROUP_PENSION_COMMITMENT_INFORMATION",
	},
	{
		value: "818",
		name: "Assessment report",
		description: "Document reporting an assessment.",
		key: "ASSESSMENT_REPORT",
	},
	{
		value: "819",
		name: "Loss statement",
		description: "Document specifying the value of a loss.",
		key: "LOSS_STATEMENT",
	},
	{
		value: "820",
		name: "Despatch note model T",
		description: "European community transit declaration.",
		key: "DESPATCH_NOTE_MODEL_T",
	},
	{
		value: "821",
		name: "Despatch note model T1",
		description:
			"Transit declaration for goods circulating under internal community transit procedures (between European Union (EU) countries).",
		key: "DESPATCH_NOTE_MODEL_T1",
	},
	{
		value: "822",
		name: "Despatch note model T2",
		description:
			"Ascertainment that the declared goods were originally produced in an European Union (EU) country.",
		key: "DESPATCH_NOTE_MODEL_T2",
	},
	{
		value: "823",
		name: "Control document T5",
		description:
			"Control document (export declaration) used particularly in case of re-sending without use with only VAT collection, refusal, unconformity with contract etc.",
		key: "CONTROL_DOCUMENT_T5",
	},
	{
		value: "824",
		name: "Re-sending consignment note",
		description:
			"Rail consignment note prepared by the consignor for the facilitation of an eventual return to the origin of the goods.",
		key: "RE_SENDING_CONSIGNMENT_NOTE",
	},
	{
		value: "825",
		name: "Despatch note model T2L",
		description:
			"Ascertainment that the declared goods were originally produced in an European Union (EU) country. May only be used for goods that are loaded on one single means of transport in one single departure point for one single delivery point.",
		key: "DESPATCH_NOTE_MODEL_T2_L",
	},
	{
		value: "826",
		name: "Guarantee of cost acceptance",
		description:
			"Document certifying the guarantee of the document issuer that he will pay for costs of the addressee, e.g. the costs for repairing a vehicle.",
		key: "GUARANTEE_OF_COST_ACCEPTANCE",
	},
	{
		value: "827",
		name: "Close of claim",
		description: "Document reporting the closing of a claim file.",
		key: "CLOSE_OF_CLAIM",
	},
	{
		value: "828",
		name: "Refusal of claim",
		description: "Document stating the refusal of a claim.",
		key: "REFUSAL_OF_CLAIM",
	},
	{
		value: "829",
		name: "Valuation report",
		description: "Document reporting a valuation.",
		key: "VALUATION_REPORT",
	},
	{
		value: "830",
		name: "Goods declaration for exportation",
		description:
			'Document/message by which goods are declared for export Customs clearance, conforming to the layout key set out at Appendix I to Annex C.1 concerning outright exportation to the Kyoto convention (CCC). Within a Customs union, "for despatch" may have the same meaning as "for exportation".',
		key: "GOODS_DECLARATION_FOR_EXPORTATION",
	},
	{
		value: "831",
		name: "Claim history certificate",
		description: "Document which certifies the history of claims.",
		key: "CLAIM_HISTORY_CERTIFICATE",
	},
	{
		value: "832",
		name: "Accounting statement",
		description: "Document specifying an accounting statement.",
		key: "ACCOUNTING_STATEMENT",
	},
	{
		value: "833",
		name: "Cargo declaration (departure)",
		description:
			"Generic term, sometimes referred to as Freight declaration, applied to the documents providing the particulars required by the Customs concerning the cargo (freight) carried by commercial means of transport (CCC).",
		key: "CARGO_DECLARATION_DEPARTURE",
	},
	{
		value: "834",
		name: "Payment receipt confirmation",
		description: "Document confirming the receipt of a payment.",
		key: "PAYMENT_RECEIPT_CONFIRMATION",
	},
	{
		value: "835",
		name: "Certificate of paid insurance premium",
		description: "Document certifying the payment of the insurance premium.",
		key: "CERTIFICATE_OF_PAID_INSURANCE_PREMIUM",
	},
	{
		value: "836",
		name: "Insured party payment report",
		description: "Report about payments done towards an insured party.",
		key: "INSURED_PARTY_PAYMENT_REPORT",
	},
	{
		value: "837",
		name: "Third party payment report",
		description: "Report about payments done towards a third party.",
		key: "THIRD_PARTY_PAYMENT_REPORT",
	},
	{
		value: "838",
		name: "Direct debit authorisation",
		description:
			"Document giving the addressee the right to debit from an account of the authorizing party.",
		key: "DIRECT_DEBIT_AUTHORISATION",
	},
	{
		value: "839",
		name: "Physician report",
		description: "Report issued by a medical doctor.",
		key: "PHYSICIAN_REPORT",
	},
	{
		value: "840",
		name: "Application for goods control certificate",
		description:
			"Document/message submitted to a competent body by party requesting a Goods control certificate to be issued in accordance with national or international standards, or conforming to legislation in the importing country, or as specified in the contract.",
		key: "APPLICATION_FOR_GOODS_CONTROL_CERTIFICATE",
	},
	{
		value: "841",
		name: "Goods control certificate",
		description:
			"Document/message issued by a competent body evidencing the quality of the goods described therein, in accordance with national or international standards, or conforming to legislation in the importing country, or as specified in the contract.",
		key: "GOODS_CONTROL_CERTIFICATE",
	},
	{
		value: "842",
		name: "Medical certificate",
		description: "Document certifying a medical condition.",
		key: "MEDICAL_CERTIFICATE",
	},
	{
		value: "843",
		name: "Witness report",
		description: "Document containing a report of a witness.",
		key: "WITNESS_REPORT",
	},
	{
		value: "844",
		name: "Calculation note",
		description:
			"Document detailing a calculation, such as an invoice calculation or a costs calculation.",
		key: "CALCULATION_NOTE",
	},
	{
		value: "845",
		name: "Communication from opposite party",
		description:
			"Document containing a communication from the opposite party, such as in legal action.",
		key: "COMMUNICATION_FROM_OPPOSITE_PARTY",
	},
	{
		value: "846",
		name: "Amicable agreement",
		description: "Document specifying an amicable agreement.",
		key: "AMICABLE_AGREEMENT",
	},
	{
		value: "847",
		name: "Out of court settlement",
		description: "Document which specifies an out of court settlement.",
		key: "OUT_OF_COURT_SETTLEMENT",
	},
	{
		value: "848",
		name: "Legal action",
		description: "Document specifying a legal action at court.",
		key: "LEGAL_ACTION",
	},
	{
		value: "849",
		name: "Summons",
		description: "Document specifying a summons to court.",
		key: "SUMMONS",
	},
	{
		value: "850",
		name: "Application for phytosanitary certificate",
		description:
			"Document/message submitted to a competent body by party requesting a Phytosanitary certificate to be issued.",
		key: "APPLICATION_FOR_PHYTOSANITARY_CERTIFICATE",
	},
	{
		value: "851",
		name: "Phytosanitary certificate",
		description:
			"A message/doucment consistent with the model for certificates of the IPPC, attesting that a consignment meets phytosanitary import requirements.",
		key: "PHYTOSANITARY_CERTIFICATE",
	},
	{
		value: "852",
		name: "Sanitary certificate",
		description:
			"Document/message issued by the competent authority in the exporting country evidencing that alimentary and animal products, including dead animals, are fit for human consumption, and giving details, when relevant, of controls undertaken.",
		key: "SANITARY_CERTIFICATE",
	},
	{
		value: "853",
		name: "Veterinary certificate",
		description:
			"Document/message issued by the competent authority in the exporting country evidencing that live animals or birds are not infested or infected with disease, and giving details regarding their provenance, and of vaccinations and other treatment to which they have been subjected.",
		key: "VETERINARY_CERTIFICATE",
	},
	{
		value: "854",
		name: "Court judgment",
		description: "Document specifying a judgment of a court.",
		key: "COURT_JUDGMENT",
	},
	{
		value: "855",
		name: "Application for inspection certificate",
		description:
			"Document/message submitted to a competent body by a party requesting an Inspection certificate to be issued in accordance with national or international standards, or conforming to legislation in the country in which it is required, or as specified in the contract.",
		key: "APPLICATION_FOR_INSPECTION_CERTIFICATE",
	},
	{
		value: "856",
		name: "Inspection certificate",
		description:
			"Document/message issued by a competent body evidencing that the goods described therein have been inspected in accordance with national or international standards, in conformity with legislation in the country in which the inspection is required, or as specified in the contract.",
		key: "INSPECTION_CERTIFICATE",
	},
	{
		value: "857",
		name: "Vehicle aboard document",
		description: "Document which must be aboard the vehicle.",
		key: "VEHICLE_ABOARD_DOCUMENT",
	},
	{
		value: "858",
		name: "Image",
		description: "Document consisting of an image.",
		key: "IMAGE",
	},
	{
		value: "859",
		name: "Audio",
		description:
			"Document consisting of an audio recording (e.g. a telephone conversation or alike).",
		key: "AUDIO",
	},
	{
		value: "860",
		name: "Certificate of origin, application for",
		description:
			"Document/message submitted to a competent body by an interested party requesting a Certificate of origin to be issued in accordance with relevant criteria, and on the basis of evidence of the origin of the goods.",
		key: "CERTIFICATE_OF_ORIGIN_APPLICATION_FOR",
	},
	{
		value: "861",
		name: "Certificate of origin",
		description:
			'Document/message identifying goods, in which the authority or body authorized to issue it certifies expressly that the goods to which the certificate relates originate in a specific country. The word "country" may include a group of countries, a region or a part of a country. This certificate may also include a declaration by the manufacturer, producer, supplier, exporter or other competent person.',
		key: "CERTIFICATE_OF_ORIGIN",
	},
	{
		value: "862",
		name: "Declaration of origin",
		description:
			"Appropriate statement as to the origin of the goods, made in connection with their exportation by the manufacturer, producer, supplier, exporter or other competent person on the Commercial invoice or any other document relating to the goods (CCC).",
		key: "DECLARATION_OF_ORIGIN",
	},
	{
		value: "863",
		name: "Regional appellation certificate",
		description:
			"Certificate drawn up in accordance with the rules laid down by an authority or approved body, certifying that the goods described therein qualify for a designation specific to the given region (e.g. champagne, port wine, Parmesan cheese).",
		key: "REGIONAL_APPELLATION_CERTIFICATE",
	},
	{
		value: "864",
		name: "Preference certificate of origin",
		description:
			"Document/message describing a certificate of origin meeting the requirements for preferential treatment.",
		key: "PREFERENCE_CERTIFICATE_OF_ORIGIN",
	},
	{
		value: "865",
		name: "Certificate of origin form GSP",
		description:
			"Specific form of certificate of origin for goods qualifying for preferential treatment under the generalized system of preferences (includes a combined declaration of origin and certificate, form A).",
		key: "CERTIFICATE_OF_ORIGIN_FORM_GSP",
	},
	{
		value: "866",
		name: "Video",
		description: "Document consisting of a video.",
		key: "VIDEO",
	},
	{
		value: "867",
		name: "Introductory letter",
		description:
			"A letter of introduction attached to, or accompanying another document such as an insurance policy.",
		key: "INTRODUCTORY_LETTER",
	},
	{
		value: "868",
		name: "Data protection regulations statement",
		description:
			"Document specifying the terms of data protection regulations.",
		key: "DATA_PROTECTION_REGULATIONS_STATEMENT",
	},
	{
		value: "869",
		name: "Exclusive brokerage mandate",
		description:
			"Document expressing the mandate of a client for a service only by the mandated broker.",
		key: "EXCLUSIVE_BROKERAGE_MANDATE",
	},
	{
		value: "871",
		name: "Inquiry mandate",
		description:
			"Document expressing the mandate of a client for an inquiry service by the mandated provider.",
		key: "INQUIRY_MANDATE",
	},
	{
		value: "872",
		name: "Risk analysis",
		description: "Document specifying the analysis of risks.",
		key: "RISK_ANALYSIS",
	},
	{
		value: "873",
		name: "Transport equipment movement report, partial",
		description:
			"A partial transport equipment movement report, containing only a selected part of the movements of transport equipment for a vessel in a port.",
		key: "TRANSPORT_EQUIPMENT_MOVEMENT_REPORT_PARTIAL",
	},
	{
		value: "874",
		name: "Conveyance declaration",
		description: "Declaration of the conveyance to a public authority.",
		key: "CONVEYANCE_DECLARATION",
	},
	{
		value: "878",
		name: "AEO Certificate of Security and/or Safety",
		description:
			"Certificate issued to business that fulfils specified criteria applied to the security and safety of the logistics chain in the flow of foreign trade operations by a national AEO recognized program (e.g. AEO-Security and Safety (AEOS) - Regulation (EU) No 952/2013).",
		key: "AEO_CERTIFICATE_OF_SECURITY_AND_OR_SAFETY",
	},
	{
		value: "879",
		name: "AEO Certificate of Conformity or Compliance",
		description:
			"Certificate issued to business that fulfils specified criteria for compliance with tax and customs obligations, as well as financial solvency by a national AEO recognized program (e.g. AEO-Customs Simplifications (AEOC) - Regulation (EU) No 952/2013).",
		key: "AEO_CERTIFICATE_OF_CONFORMITY_OR_COMPLIANCE",
	},
	{
		value: "890",
		name: "Dangerous goods declaration",
		description:
			"(1115) Document/message issued by a consignor in accordance with applicable conventions or regulations, describing hazardous goods or materials for transport purposes, and stating that the latter have been packed and labelled in accordance with the provisions of the relevant conventions or regulations.",
		key: "DANGEROUS_GOODS_DECLARATION",
	},
	{
		value: "891",
		name: "AEO Certificate Full",
		description:
			"Certificate issued to business that fulfils specified criteria to both AEO Certificate of Security and/or Safety and AEO Certificate of Conformity or Compliance by a national AEO recognized program (e.g. AEO-Customs Simplifications/Security and Safety (AEOC/AEOS) - Regulation(EU) No 952/2013).",
		key: "AEO_CERTIFICATE_FULL",
	},
	{
		value: "892",
		name: "Purchase Order Financing Request",
		description:
			"Document enabling the Financing Requestor to initiate the financing process by the First Agent.",
		key: "PURCHASE_ORDER_FINANCING_REQUEST",
	},
	{
		value: "893",
		name: "Purchase Order Financing Request Status",
		description:
			"Document enabling the First Agent to notify the Financing Requestor of the status of a purchase order financing request or the status of a purchase order financing cancellation request previously sent by the Financial Requestor itself.",
		key: "PURCHASE_ORDER_FINANCING_REQUEST_STATUS",
	},
	{
		value: "894",
		name: "Purchase Order Financing Request Cancellation",
		description:
			"Document enabling the Financing Requestor to request the First Agent to cancel a previously sent purchase order financing request.",
		key: "PURCHASE_ORDER_FINANCING_REQUEST_CANCELLATION",
	},
	{
		value: "895",
		name: "Statistical document, export",
		description:
			"Document/message in which an exporter provides information about exported goods required by the body responsible for the collection of international trade statistics.",
		key: "STATISTICAL_DOCUMENT_EXPORT",
	},
	{
		value: "896",
		name: "INTRASTAT declaration",
		description:
			"Document/message in which a declarant provides information about goods required by the body responsible for the collection of trade statistics. |    897   Transit certificate of approval Certificate of approval for vehicles and containers used to transit goods under customs seals.",
		key: "INTRASTAT_DECLARATION",
	},
	{
		value: "898",
		name: "Pre-packed cross docking consignment order",
		description:
			"A consignment order requesting the supply of products packed according to the final delivery point which will be moved across a dock in a distribution centre without further handling.",
		key: "PRE_PACKED_CROSS_DOCKING_CONSIGNMENT_ORDER",
	},
	{
		value: "899",
		name: "Traceability event declaration",
		description: "Document/message declaring a traceability event.",
		key: "TRACEABILITY_EVENT_DECLARATION",
	},
	{
		value: "900",
		name: "Sustainability data request",
		description:
			"Document/message requesting information based on defined criteria regarding sustainability.",
		key: "SUSTAINABILITY_DATA_REQUEST",
	},
	{
		value: "901",
		name: "Delivery verification certificate",
		description:
			"Document/message whereby an official authority (Customs or governmental) certifies that goods have been delivered.",
		key: "DELIVERY_VERIFICATION_CERTIFICATE",
	},
	{
		value: "902",
		name: "Sustainability data response",
		description:
			"Document/Message returned as an answer to a question regarding sustainability.",
		key: "SUSTAINABILITY_DATA_RESPONSE",
	},
	{
		value: "903",
		name: "Sustainability Inspection request",
		description: "Document/message requesting a sustainability inspection.",
		key: "SUSTAINABILITY_INSPECTION_REQUEST",
	},
	{
		value: "904",
		name: "Sustainability Inspection response",
		description:
			"Document/message reporting the results of a sustainability inspection. +    905   Transport Means Forecast Information Message Message to provide the forecast information about ships, trains, vehicles and aircrafts arrival at the destination. +    906   Transport Means Actual Information Message Message to provide the actual information about ships, trains, vehicles and aircrafts arrival at the destination. +    907   Arrival Report Message Message to provide the arrival information of transport means and goods. +    908   Tally Message Message to provide the information of goods tallying. +    909   Goods Loading Message Message to provide the information of goods loading.",
		key: "SUSTAINABILITY_INSPECTION_RESPONSE",
	},
	{
		value: "910",
		name: "Import licence, application for",
		description:
			"Document/message in which an interested party applies to the competent body for authorization to import either a limited quantity of articles subject to import restrictions, or an unlimited quantity of such articles during a limited period, and specifies the kind of articles, their origin and value, etc.",
		key: "IMPORT_LICENCE_APPLICATION_FOR",
	},
	{
		value: "911",
		name: "Import licence",
		description:
			"Document/message issued by the competent body in accordance with import regulations in force, by which authorization is granted to a named party to import either a limited quantity of designated articles or an unlimited quantity of such articles during a limited period, under conditions specified in the document. +    912   Transport Means and Goods Release Message. Message to provide the releasing information of transport means and goods.",
		key: "IMPORT_LICENCE",
	},
	{
		value: "913",
		name: "Customs declaration without commercial detail",
		description:
			"CUSDEC transmission that does not include data from the commercial detail section of the message.",
		key: "CUSTOMS_DECLARATION_WITHOUT_COMMERCIAL_DETAIL",
	},
	{
		value: "914",
		name: "Customs declaration with commercial and item detail",
		description:
			"CUSDEC transmission that includes data from both the commercial detail and item detail sections of the message.",
		key: "CUSTOMS_DECLARATION_WITH_COMMERCIAL_AND_ITEM_DETAIL",
	},
	{
		value: "915",
		name: "Customs declaration without item detail",
		description:
			"CUSDEC transmission that does not include data from the item detail section of the message.",
		key: "CUSTOMS_DECLARATION_WITHOUT_ITEM_DETAIL",
	},
	{
		value: "916",
		name: "Related document",
		description:
			"Document that has a relationship with the stated document/message.",
		key: "RELATED_DOCUMENT",
	},
	{
		value: "917",
		name: "Receipt (Customs)",
		description: "Receipt for Customs duty/tax/fee paid.",
		key: "RECEIPT_CUSTOMS",
	},
	{
		value: "925",
		name: "Application for exchange allocation",
		description:
			"Document/message whereby an importer/buyer requests the competent body to allocate an amount of foreign exchange to be transferred to an exporter/seller in payment for goods.",
		key: "APPLICATION_FOR_EXCHANGE_ALLOCATION",
	},
	{
		value: "926",
		name: "Foreign exchange permit",
		description:
			"Document/message issued by the competent body authorizing an importer/buyer to transfer an amount of foreign exchange to an exporter/seller in payment for goods.",
		key: "FOREIGN_EXCHANGE_PERMIT",
	},
	{
		value: "927",
		name: "Exchange control declaration (import)",
		description:
			"Document/message completed by an importer/buyer as a means for the competent body to control that a trade transaction for which foreign exchange has been allocated has been executed and that money has been transferred in accordance with the conditions of payment and the exchange control regulations in force.",
		key: "EXCHANGE_CONTROL_DECLARATION_IMPORT",
	},
	{
		value: "929",
		name: "Goods declaration for importation",
		description:
			"Document/message by which goods are declared for import Customs clearance [sister entry of 830].",
		key: "GOODS_DECLARATION_FOR_IMPORTATION",
	},
	{
		value: "930",
		name: "Goods declaration for home use",
		description:
			"Document/message by which goods are declared for import Customs clearance according to Annex B.1 (concerning clearance for home use) to the Kyoto convention (CCC).",
		key: "GOODS_DECLARATION_FOR_HOME_USE",
	},
	{
		value: "931",
		name: "Customs immediate release declaration",
		description:
			"Document/message issued by an importer notifying Customs that goods have been removed from an importing means of transport to the importer's premises under a Customs- approved arrangement for immediate release, or requesting authorization to do so.",
		key: "CUSTOMS_IMMEDIATE_RELEASE_DECLARATION",
	},
	{
		value: "932",
		name: "Customs delivery note",
		description:
			"Document/message whereby a Customs authority releases goods under its control to be placed at the disposal of the party concerned. Synonym: Customs release note.",
		key: "CUSTOMS_DELIVERY_NOTE",
	},
	{
		value: "933",
		name: "Cargo declaration (arrival)",
		description:
			"Generic term, sometimes referred to as Freight declaration, applied to the documents providing the particulars required by the Customs concerning the cargo (freight) carried by commercial means of transport (CCC).",
		key: "CARGO_DECLARATION_ARRIVAL",
	},
	{
		value: "934",
		name: "Value declaration",
		description:
			"Document/message in which a declarant (importer) states the invoice or other price (e.g. selling price, price of identical goods), and specifies costs for freight, insurance and packing, etc., terms of delivery and payment, any relationship with the trading partner, etc., for the purpose of determining the Customs value of goods imported.",
		key: "VALUE_DECLARATION",
	},
	{
		value: "936",
		name: "Customs declaration (post parcels)",
		description:
			'Document/message which, according to Article 106 of the "Agreement concerning Postal Parcels" under the UPU Convention, must accompany post parcels and in which the contents of such parcels are specified.',
		key: "CUSTOMS_DECLARATION_POST_PARCELS",
	},
	{
		value: "937",
		name: "Tax declaration (value added tax)",
		description:
			"Document/message in which an importer states the pertinent information required by the competent body for assessment of value-added tax.",
		key: "TAX_DECLARATION_VALUE_ADDED_TAX",
	},
	{
		value: "938",
		name: "Tax declaration (general)",
		description: "Document/message containing a general tax declaration.",
		key: "TAX_DECLARATION_GENERAL",
	},
	{
		value: "940",
		name: "Tax demand",
		description: "Document/message containing the demand of tax.",
		key: "TAX_DEMAND",
	},
	{
		value: "941",
		name: "Embargo permit",
		description:
			"Document/message giving the permission to export specified goods.",
		key: "EMBARGO_PERMIT",
	},
	{
		value: "950",
		name: "Goods declaration for Customs transit",
		description:
			"Document/message by which the sender declares goods for Customs transit according to Annex E.1 (concerning Customs transit) to the Kyoto convention (CCC).",
		key: "GOODS_DECLARATION_FOR_CUSTOMS_TRANSIT",
	},
	{
		value: "951",
		name: "TIF form",
		description:
			"International Customs transit document by which the sender declares goods for carriage by rail in accordance with the provisions of the 1952 International Convention to facilitate the crossing of frontiers for goods carried by rail (TIF Convention of UIC).",
		key: "TIF_FORM",
	},
	{
		value: "952",
		name: "TIR carnet",
		description:
			"International Customs document (International Transit by Road), issued by a guaranteeing association approved by the Customs authorities, under the cover of which goods are carried, in most cases under Customs seal, in road vehicles and/or containers in compliance with the requirements of the Customs TIR Convention of the International Transport of Goods under cover of TIR Carnets (UN/ECE).",
		key: "TIR_CARNET",
	},
	{
		value: "953",
		name: "EC carnet",
		description:
			"EC customs transit document issued by EC customs authorities for transit and/or temporary user of goods within the EC.",
		key: "EC_CARNET",
	},
	{
		value: "954",
		name: "EUR 1 certificate of origin",
		description:
			"Customs certificate used in preferential goods interchanges between EC countries and EC external countries.",
		key: "EUR_1_CERTIFICATE_OF_ORIGIN",
	},
	{
		value: "955",
		name: "ATA carnet",
		description:
			"International Customs document (Admission Temporaire / Temporary Admission) which, issued under the terms of the ATA Convention (1961), incorporates an internationally valid guarantee and may be used, in lieu of national Customs documents and as security for import duties and taxes, to cover the temporary admission of goods and, where appropriate, the transit of goods. If accepted for controlling the temporary export and reimport of goods, international guarantee does not apply (CCC).",
		key: "ATA_CARNET",
	},
	{
		value: "960",
		name: "Single administrative document",
		description:
			"A set of documents, replacing the various (national) forms for Customs declaration within the EC, implemented on 01-01-1988.",
		key: "SINGLE_ADMINISTRATIVE_DOCUMENT",
	},
	{
		value: "961",
		name: "General response (Customs)",
		description:
			"General response message to permit the transfer of data from Customs to the transmitter of the previous message.",
		key: "GENERAL_RESPONSE_CUSTOMS",
	},
	{
		value: "962",
		name: "Document response (Customs)",
		description:
			"Document response message to permit the transfer of data from Customs to the transmitter of the previous message.",
		key: "DOCUMENT_RESPONSE_CUSTOMS",
	},
	{
		value: "963",
		name: "Error response (Customs)",
		description:
			"Error response message to permit the transfer of data from Customs to the transmitter of the previous message.",
		key: "ERROR_RESPONSE_CUSTOMS",
	},
	{
		value: "964",
		name: "Package response (Customs)",
		description:
			"Package response message to permit the transfer of data from Customs to the transmitter of the previous message.",
		key: "PACKAGE_RESPONSE_CUSTOMS",
	},
	{
		value: "965",
		name: "Tax calculation/confirmation response (Customs)",
		description:
			"Tax calculation/confirmation response message to permit the transfer of data from Customs to the transmitter of the previous message.",
		key: "TAX_CALCULATION_CONFIRMATION_RESPONSE_CUSTOMS",
	},
	{
		value: "966",
		name: "Quota prior allocation certificate",
		description:
			"Document/message issued by the competent body for prior allocation of a quota.",
		key: "QUOTA_PRIOR_ALLOCATION_CERTIFICATE",
	},
	{
		value: "970",
		name: "Wagon report",
		description:
			"Document which contains consignment information concerning the wagons and their lading in a case of a multiple wagon consignment.",
		key: "WAGON_REPORT",
	},
	{
		value: "971",
		name: "Transit Conveyor Document",
		description:
			"Document for a course of transit used for a carrier who is neither the carrier at the beginning nor the arrival. The transit carrier can directly invoice the expenses for its part of the transport.",
		key: "TRANSIT_CONVEYOR_DOCUMENT",
	},
	{
		value: "972",
		name: "Rail consignment note forwarder copy",
		description:
			"Document which is a copy of the rail consignment note printed especially for the need of the forwarder.",
		key: "RAIL_CONSIGNMENT_NOTE_FORWARDER_COPY",
	},
	{
		value: "974",
		name: "Duty suspended goods",
		description:
			"Document giving details for the carriage of excisable goods on a duty-suspended basis.",
		key: "DUTY_SUSPENDED_GOODS",
	},
	{
		value: "975",
		name: "Proof of transit declaration",
		description:
			"A document providing proof that a transit declaration has been accepted.",
		key: "PROOF_OF_TRANSIT_DECLARATION",
	},
	{
		value: "976",
		name: "Container transfer note",
		description: "Document for the carriage of containers. Syn: transfer note.",
		key: "CONTAINER_TRANSFER_NOTE",
	},
	{
		value: "977",
		name: "NATO transit document",
		description:
			"Customs transit document for the carriage of shipments of the NATO armed forces under Customs supervision.",
		key: "NATO_TRANSIT_DOCUMENT",
	},
	{
		value: "978",
		name: "Transfrontier waste shipment authorization",
		description:
			"Document containing the authorization from the relevant authority for the international carriage of waste. Syn: Transfrontier waste shipment permit.",
		key: "TRANSFRONTIER_WASTE_SHIPMENT_AUTHORIZATION",
	},
	{
		value: "979",
		name: "Transfrontier waste shipment movement document",
		description:
			"Document certified by the carriers and the consignee to be used for the international carriage of waste.",
		key: "TRANSFRONTIER_WASTE_SHIPMENT_MOVEMENT_DOCUMENT",
	},
	{
		value: "990",
		name: "End use authorization",
		description:
			"Document issued by Customs granting the end-use Customs procedure.",
		key: "END_USE_AUTHORIZATION",
	},
	{
		value: "991",
		name: "Government contract",
		description:
			"Document/message describing a contract with a government authority.",
		key: "GOVERNMENT_CONTRACT",
	},
	{
		value: "995",
		name: "Statistical document, import",
		description:
			"Document/message describing an import document that is used for statistical purposes.",
		key: "STATISTICAL_DOCUMENT_IMPORT",
	},
	{
		value: "996",
		name: "Application for documentary credit",
		description:
			"Message with application for opening of a documentary credit.",
		key: "APPLICATION_FOR_DOCUMENTARY_CREDIT",
	},
	{
		value: "998",
		name: "Previous Customs document/message",
		description:
			"Indication of the previous Customs document/message concerning the same transaction.",
		key: "PREVIOUS_CUSTOMS_DOCUMENT_MESSAGE",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		untdid1001: typeof untdid1001;
	}
}
registerCodelist("untdid1001", untdid1001);

export default untdid1001;
