import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid2005 = [
	{
		name: "Service completion date/time, actual",
		value: "1",
		description: "Actual date/time on which the service was completed.",
		key: "SERVICE_COMPLETION_DATE_TIME_ACTUAL",
	},
	{
		name: "Delivery date/time, requested",
		value: "2",
		description: "(2105) Date on which buyer requests goods to be delivered.",
		key: "DELIVERY_DATE_TIME_REQUESTED",
	},
	{
		name: "Invoice document issue date time",
		value: "3",
		description: "[2377] Date of issue of an invoice.",
		key: "INVOICE_DOCUMENT_ISSUE_DATE_TIME",
	},
	{
		name: "Order document issue date time",
		value: "4",
		description: "[2011] Date of order.",
		key: "ORDER_DOCUMENT_ISSUE_DATE_TIME",
	},
	{
		name: "Saleable stock demand cover period, expected",
		value: "5",
		description:
			"A period of time when saleable stocks are expected to cover demand for a product.",
		key: "SALEABLE_STOCK_DEMAND_COVER_PERIOD_EXPECTED",
	},
	{
		name: "Moved from location date",
		value: "6",
		description: "The date an entity moved from a location.",
		key: "MOVED_FROM_LOCATION_DATE",
	},
	{
		name: "Effective from date/time",
		value: "7",
		description:
			"(2069) Date and/or time at which specified event or document becomes effective.",
		key: "EFFECTIVE_FROM_DATE_TIME",
	},
	{
		name: "Order received date/time",
		value: "8",
		description: "Date/time when the purchase order is received by the seller.",
		key: "ORDER_RECEIVED_DATE_TIME",
	},
	{
		name: "Processing date/time",
		value: "9",
		description: "Date/time of processing.",
		key: "PROCESSING_DATE_TIME",
	},
	{
		name: "Shipment date/time, requested",
		value: "10",
		description:
			"Date on which goods should be shipped or despatched by the supplier.",
		key: "SHIPMENT_DATE_TIME_REQUESTED",
	},
	{
		name: "Despatch date and or time",
		value: "11",
		description:
			"[2171] Date/time on which the goods are or are expected to be despatched or shipped.",
		key: "DESPATCH_DATE_AND_OR_TIME",
	},
	{
		name: "Terms discount due date/time",
		value: "12",
		description:
			"Date by which payment should be made if discount terms are to apply.",
		key: "TERMS_DISCOUNT_DUE_DATE_TIME",
	},
	{
		name: "Terms net due date",
		value: "13",
		description: "Date by which payment must be made.",
		key: "TERMS_NET_DUE_DATE",
	},
	{
		name: "Payment date/time, deferred",
		value: "14",
		description: "Date/time when instalments are due.",
		key: "PAYMENT_DATE_TIME_DEFERRED",
	},
	{
		name: "Promotion start date/time",
		value: "15",
		description: "Date/time when promotion activities begin.",
		key: "PROMOTION_START_DATE_TIME",
	},
	{
		name: "Promotion end date/time",
		value: "16",
		description: "Date/time when promotion activities end.",
		key: "PROMOTION_END_DATE_TIME",
	},
	{
		name: "Delivery date/time, estimated",
		value: "17",
		description:
			"(2109) Date and/or time when the shipper of the goods expects delivery will take place.",
		key: "DELIVERY_DATE_TIME_ESTIMATED",
	},
	{
		name: "Installation date/time/period",
		value: "18",
		description:
			"The date/time/period of the act, or an instance of installing something or someone.",
		key: "INSTALLATION_DATE_TIME_PERIOD",
	},
	{
		name: "Meat ageing period",
		value: "19",
		description:
			"Period of time between slaughter and delivery during which meat is ageing.",
		key: "MEAT_AGEING_PERIOD",
	},
	{
		name: "Cheque date/time",
		value: "20",
		description: "Date/time when cheque is issued.",
		key: "CHEQUE_DATE_TIME",
	},
	{
		name: "Charge back date/time",
		value: "21",
		description: "The date/time of the charge back.",
		key: "CHARGE_BACK_DATE_TIME",
	},
	{
		name: "Freight bill date/time",
		value: "22",
		description: "Date/time when freight bill is issued.",
		key: "FREIGHT_BILL_DATE_TIME",
	},
	{
		name: "Equipment reconditioning date/time, actual",
		value: "23",
		description:
			"Actual date/time of the reconditioning of a piece of equipment.",
		key: "EQUIPMENT_RECONDITIONING_DATE_TIME_ACTUAL",
	},
	{
		name: "Transfer note acceptance date and time",
		value: "24",
		description:
			"Date and time when a transfer note (transfer document for transport exclusively using containers as equipment) is recognised as being valid by the carrier.",
		key: "TRANSFER_NOTE_ACCEPTANCE_DATE_AND_TIME",
	},
	{
		name: "Delivery date/time, actual",
		value: "35",
		description:
			"Date/time on which goods or consignment are delivered at their destination.",
		key: "DELIVERY_DATE_TIME_ACTUAL",
	},
	{
		name: "Expiry date",
		value: "36",
		description:
			"Date of expiry of the validity of a referenced document, price information or any other referenced data element with a limited validity period.",
		key: "EXPIRY_DATE",
	},
	{
		name: "Ship not before date/time",
		value: "37",
		description: "Goods should not be shipped before given date/time.",
		key: "SHIP_NOT_BEFORE_DATE_TIME",
	},
	{
		name: "Ship not later than date/time",
		value: "38",
		description: "Date/time by which the goods should have been shipped.",
		key: "SHIP_NOT_LATER_THAN_DATE_TIME",
	},
	{
		name: "Ship week of date",
		value: "39",
		description:
			"Date identifying the week during which goods should be shipped.",
		key: "SHIP_WEEK_OF_DATE",
	},
	{
		name: "Clinical information issue date and/or time",
		value: "40",
		description: "Date and/or time when clinical information is issued.",
		key: "CLINICAL_INFORMATION_ISSUE_DATE_AND_OR_TIME",
	},
	{
		name: "Event duration, expected",
		value: "41",
		description: "The expected duration of an event.",
		key: "EVENT_DURATION_EXPECTED",
	},
	{
		name: "Superseded date/time",
		value: "42",
		description: "Date/time being overlaid by a date given elsewhere.",
		key: "SUPERSEDED_DATE_TIME",
	},
	{
		name: "Event duration, intended",
		value: "43",
		description: "The intended duration of an event.",
		key: "EVENT_DURATION_INTENDED",
	},
	{
		name: "Availability",
		value: "44",
		description: "Date/time when received item is available.",
		key: "AVAILABILITY",
	},
	{
		name: "Compilation date and time",
		value: "45",
		description: "Date and time of the compilation.",
		key: "COMPILATION_DATE_AND_TIME",
	},
	{
		name: "Cancellation date",
		value: "46",
		description:
			"[2095] Date on which a document or message has been cancelled.",
		key: "CANCELLATION_DATE",
	},
	{
		name: "Statistical time series date",
		value: "47",
		description: "Date for statistical time series purposes.",
		key: "STATISTICAL_TIME_SERIES_DATE",
	},
	{ name: "Duration", value: "48", description: "Duration.", key: "DURATION" },
	{
		name: "Deliver not before and not after dates",
		value: "49",
		description: "Deliver not before and not after a specific date range.",
		key: "DELIVER_NOT_BEFORE_AND_NOT_AFTER_DATES",
	},
	{
		name: "Goods receipt date/time",
		value: "50",
		description:
			"Date/time upon which the goods were received by a given party.",
		key: "GOODS_RECEIPT_DATE_TIME",
	},
	{
		name: "Cumulative quantity start date",
		value: "51",
		description: "First Date for accumulation of delivery quantities.",
		key: "CUMULATIVE_QUANTITY_START_DATE",
	},
	{
		name: "Cumulative quantity end date",
		value: "52",
		description: "Last Date for accumulation of delivery quantities.",
		key: "CUMULATIVE_QUANTITY_END_DATE",
	},
	{
		name: "Buyer's local time",
		value: "53",
		description: "Time at the buyer's location.",
		key: "BUYER_S_LOCAL_TIME",
	},
	{
		name: "Seller's local time",
		value: "54",
		description: "Time at the seller's location.",
		key: "SELLER_S_LOCAL_TIME",
	},
	{
		name: "Confirmed date/time",
		value: "55",
		description: "Date/time which has been confirmed.",
		key: "CONFIRMED_DATE_TIME",
	},
	{
		name: "Original authorisation date and/or time",
		value: "56",
		description: "Date and/or time when original authorisation was issued.",
		key: "ORIGINAL_AUTHORISATION_DATE_AND_OR_TIME",
	},
	{
		name: "Precaution relevant period",
		value: "57",
		description: "The period when a precaution is relevant.",
		key: "PRECAUTION_RELEVANT_PERIOD",
	},
	{
		name: "Clearance date (Customs)",
		value: "58",
		description:
			"Date on which Customs formalities necessary to allow goods to be exported, to enter home use, or to be placed under another Customs procedure has been accomplished (CCC).",
		key: "CLEARANCE_DATE_CUSTOMS",
	},
	{
		name: "Inbound movement authorization date",
		value: "59",
		description: "Inland movement authorization date.",
		key: "INBOUND_MOVEMENT_AUTHORIZATION_DATE",
	},
	{
		name: "Engineering change level date",
		value: "60",
		description: "Date the engineering level of goods is changed.",
		key: "ENGINEERING_CHANGE_LEVEL_DATE",
	},
	{
		name: "Cancel if not delivered by this date",
		value: "61",
		description:
			"The date on which cancellation should take place, if delivery has not occurred.",
		key: "CANCEL_IF_NOT_DELIVERED_BY_THIS_DATE",
	},
	{
		name: "Excluded date",
		value: "62",
		description: "Date excluded from a period of time.",
		key: "EXCLUDED_DATE",
	},
	{
		name: "Delivery date time, last",
		value: "63",
		description: "[2025] Last date, and optionally time of a delivery.",
		key: "DELIVERY_DATE_TIME_LAST",
	},
	{
		name: "Delivery date/time, earliest",
		value: "64",
		description:
			"[2091] Date identifying a point in time before which the goods shall not be delivered.",
		key: "DELIVERY_DATE_TIME_EARLIEST",
	},
	{
		name: "Delivery date/time, 1st schedule",
		value: "65",
		description: "The first scheduled date/time for delivery.",
		key: "DELIVERY_DATE_TIME_1ST_SCHEDULE",
	},
	{
		name: "Excluded period",
		value: "66",
		description: "An interval of time excluded from a period of time.",
		key: "EXCLUDED_PERIOD",
	},
	{
		name: "Delivery date/time, current schedule",
		value: "67",
		description: "Delivery Date deriving from actual schedule.",
		key: "DELIVERY_DATE_TIME_CURRENT_SCHEDULE",
	},
	{
		name: "Additional period",
		value: "68",
		description: "An interval of time added to a period of time.",
		key: "ADDITIONAL_PERIOD",
	},
	{
		name: "Delivery date time, promised before",
		value: "69",
		description:
			"[2139] Date and optionally time by which the merchandise should be delivered to the buyer, as agreed between the seller and the buyer (generic term).",
		key: "DELIVERY_DATE_TIME_PROMISED_BEFORE",
	},
	{
		name: "Additional date",
		value: "70",
		description: "Date added to a period of time.",
		key: "ADDITIONAL_DATE",
	},
	{
		name: "Delivery date/time, requested for (after and including)",
		value: "71",
		description: "Delivery is requested to happen after or on given date.",
		key: "DELIVERY_DATE_TIME_REQUESTED_FOR_AFTER_AND_INCLUDING",
	},
	{
		name: "Delivery date/time, promised for (after and including)",
		value: "72",
		description: "Delivery might take place earliest at given date.",
		key: "DELIVERY_DATE_TIME_PROMISED_FOR_AFTER_AND_INCLUDING",
	},
	{
		name: "Guarantee period",
		value: "73",
		description: "The period for which the guarantee is or will be granted.",
		key: "GUARANTEE_PERIOD",
	},
	{
		name: "Delivery date/time, requested for (prior to and including)",
		value: "74",
		description:
			"Delivery is requested to happen prior to or including the given date.",
		key: "DELIVERY_DATE_TIME_REQUESTED_FOR_PRIOR_TO_AND_INCLUDING",
	},
	{
		name: "Delivery date/time, promised for (prior to and including)",
		value: "75",
		description: "Delivery might take place latest at given date.",
		key: "DELIVERY_DATE_TIME_PROMISED_FOR_PRIOR_TO_AND_INCLUDING",
	},
	{
		name: "Delivery date/time, scheduled for",
		value: "76",
		description: "The date/time for which delivery is scheduled.",
		key: "DELIVERY_DATE_TIME_SCHEDULED_FOR",
	},
	{
		name: "Specification revision date",
		value: "77",
		description: "Date of revision to a specification.",
		key: "SPECIFICATION_REVISION_DATE",
	},
	{
		name: "Event date/time/period, actual",
		value: "78",
		description: "[2193] The actual date/time/period an event occurred.",
		key: "EVENT_DATE_TIME_PERIOD_ACTUAL",
	},
	{
		name: "Shipment date/time, promised for",
		value: "79",
		description: "Shipment might happen at given date/time.",
		key: "SHIPMENT_DATE_TIME_PROMISED_FOR",
	},
	{
		name: "Planning end date and/or time, actual",
		value: "80",
		description: "The actual date and/or time the planning ended.",
		key: "PLANNING_END_DATE_AND_OR_TIME_ACTUAL",
	},
	{
		name: "Shipment date/time, requested for (after and including)",
		value: "81",
		description: "Shipment should happen earliest at given date.",
		key: "SHIPMENT_DATE_TIME_REQUESTED_FOR_AFTER_AND_INCLUDING",
	},
	{
		name: "Medicine administration time",
		value: "82",
		description: "Designated time of day for the administration of medicine.",
		key: "MEDICINE_ADMINISTRATION_TIME",
	},
	{
		name: "Dispensing interval, minimum",
		value: "83",
		description:
			"The shortest interval allowed between one dispensing of an item and the next dispensing of the same item.",
		key: "DISPENSING_INTERVAL_MINIMUM",
	},
	{
		name: "Shipment date/time, requested for (prior to and including)",
		value: "84",
		description: "Shipment should take place latest at given date.",
		key: "SHIPMENT_DATE_TIME_REQUESTED_FOR_PRIOR_TO_AND_INCLUDING",
	},
	{
		name: "Shipment date/time, promised for (prior to and including)",
		value: "85",
		description: "Shipment might take place latest at given date.",
		key: "SHIPMENT_DATE_TIME_PROMISED_FOR_PRIOR_TO_AND_INCLUDING",
	},
	{
		name: "Medication date/time, start",
		value: "86",
		description: "Date and/or time when medication was started.",
		key: "MEDICATION_DATE_TIME_START",
	},
	{
		name: "Travel service connection time",
		value: "87",
		description:
			"Time elapsing between the arrival of a travel service and the departure of a connecting travel service.",
		key: "TRAVEL_SERVICE_CONNECTION_TIME",
	},
	{
		name: "Summer time, start",
		value: "88",
		description: "Date/time at which the summer time starts.",
		key: "SUMMER_TIME_START",
	},
	{
		name: "Inquiry date",
		value: "89",
		description: "The date on which an inquiry is made.",
		key: "INQUIRY_DATE",
	},
	{
		name: "Report start date",
		value: "90",
		description: "The date on which a report is to begin.",
		key: "REPORT_START_DATE",
	},
	{
		name: "Report end date",
		value: "91",
		description: "The date on which a report is to end.",
		key: "REPORT_END_DATE",
	},
	{
		name: "Contract effective date",
		value: "92",
		description: "Date when a contract becomes valid.",
		key: "CONTRACT_EFFECTIVE_DATE",
	},
	{
		name: "Contract expiry date",
		value: "93",
		description: "Date when a contract expires.",
		key: "CONTRACT_EXPIRY_DATE",
	},
	{
		name: "Production/manufacture date",
		value: "94",
		description: "Date on which goods are produced.",
		key: "PRODUCTION_MANUFACTURE_DATE",
	},
	{
		name: "Bill of lading date",
		value: "95",
		description: "Date as specified on the bill of lading.",
		key: "BILL_OF_LADING_DATE",
	},
	{
		name: "Discharge date/time",
		value: "96",
		description:
			"Date/time when goods should, might or have been discharged from the means of transport.",
		key: "DISCHARGE_DATE_TIME",
	},
	{
		name: "Transaction creation date",
		value: "97",
		description:
			"The date on which a transaction was originated or brought into being.",
		key: "TRANSACTION_CREATION_DATE",
	},
	{
		name: "Winter time, start",
		value: "98",
		description: "Date/time at which the winter time starts.",
		key: "WINTER_TIME_START",
	},
	{
		name: "Quotation opening date",
		value: "99",
		description: "The date on which the quotation has been or may be opened.",
		key: "QUOTATION_OPENING_DATE",
	},
	{
		name: "Product ageing period before delivery",
		value: "100",
		description:
			"Period of time before delivery during which the product is ageing.",
		key: "PRODUCT_AGEING_PERIOD_BEFORE_DELIVERY",
	},
	{
		name: "Production date, no schedule established as of",
		value: "101",
		description: "Date as of there is no valid production schedule.",
		key: "PRODUCTION_DATE_NO_SCHEDULE_ESTABLISHED_AS_OF",
	},
	{
		name: "Health problem period",
		value: "102",
		description: "Period of time of health problem.",
		key: "HEALTH_PROBLEM_PERIOD",
	},
	{
		name: "Closing date/time for breakbulk STORO",
		value: "103",
		description:
			"Date/time on which delivering period for breakbulk STORO cargo ends (STORO = Stowing on Roll on-Roll off vessel).",
		key: "CLOSING_DATE_TIME_FOR_BREAKBULK_STORO",
	},
	{
		name: "Closing date/time for container RO-RO",
		value: "104",
		description:
			"Date/time on which delivering period for container Roll on-Roll off (RO-RO) cargo ends.",
		key: "CLOSING_DATE_TIME_FOR_CONTAINER_RO_RO",
	},
	{
		name: "Starting date/time for breakbulk STORO",
		value: "105",
		description:
			"Date/time on which delivering period for breakbulk STORO cargo starts (STORO = Stowing on Roll on-Roll off vessel).",
		key: "STARTING_DATE_TIME_FOR_BREAKBULK_STORO",
	},
	{
		name: "Starting date/time for container RO-RO",
		value: "106",
		description:
			"Date/time on which delivering period for container Roll on-Roll off (RO-RO) cargo starts.",
		key: "STARTING_DATE_TIME_FOR_CONTAINER_RO_RO",
	},
	{
		name: "Deposit date/time",
		value: "107",
		description: "The date/time on which a deposit was made.",
		key: "DEPOSIT_DATE_TIME",
	},
	{
		name: "Postmark date/time",
		value: "108",
		description:
			"An official mark stamped on a letter identifying date/time of dispatch or arrival.",
		key: "POSTMARK_DATE_TIME",
	},
	{
		name: "Receive at lockbox date",
		value: "109",
		description:
			"The date on which a financial institution, serving as collection agency for a company located in another part of the country, collects an amount of money on behalf of that company.",
		key: "RECEIVE_AT_LOCKBOX_DATE",
	},
	{
		name: "Ship date, originally scheduled",
		value: "110",
		description:
			"The date on which the shipment of goods was originally scheduled.",
		key: "SHIP_DATE_ORIGINALLY_SCHEDULED",
	},
	{
		name: "Manifest/ship notice date",
		value: "111",
		description: "The date of issuance of a manifest or ship notice.",
		key: "MANIFEST_SHIP_NOTICE_DATE",
	},
	{
		name: "First interest-bearing date",
		value: "112",
		description: "The first date from which interest is borne.",
		key: "FIRST_INTEREST_BEARING_DATE",
	},
	{
		name: "Sample required date",
		value: "113",
		description: "Date as of a sample has to be available customer defined.",
		key: "SAMPLE_REQUIRED_DATE",
	},
	{
		name: "Tooling required date",
		value: "114",
		description: "Date as of a tool has to be available customer defined.",
		key: "TOOLING_REQUIRED_DATE",
	},
	{
		name: "Sample available date",
		value: "115",
		description: "Date as of a sample will be available seller defined.",
		key: "SAMPLE_AVAILABLE_DATE",
	},
	{
		name: "Equipment return period, expected",
		value: "116",
		description: "Period until which equipment is expected to be hired.",
		key: "EQUIPMENT_RETURN_PERIOD_EXPECTED",
	},
	{
		name: "Delivery date/time, first",
		value: "117",
		description: "First possible date/time for delivery.",
		key: "DELIVERY_DATE_TIME_FIRST",
	},
	{
		name: "Cargo booking confirmed date/time",
		value: "118",
		description:
			"Date/time at which the cargo booking has been accepted by the carrier.",
		key: "CARGO_BOOKING_CONFIRMED_DATE_TIME",
	},
	{
		name: "Test completion date",
		value: "119",
		description: "Date when a test has been completed.",
		key: "TEST_COMPLETION_DATE",
	},
	{
		name: "Last interest-bearing date",
		value: "120",
		description: "The last date from which interest is borne.",
		key: "LAST_INTEREST_BEARING_DATE",
	},
	{
		name: "Entry date",
		value: "121",
		description: "Date of entry.",
		key: "ENTRY_DATE",
	},
	{
		name: "Contract completion date",
		value: "122",
		description: "The date a contract is completed.",
		key: "CONTRACT_COMPLETION_DATE",
	},
	{
		name: "Documentary credit expiry date/time",
		value: "123",
		description:
			"(2211) The latest date/time for presentation of the documents to the bank where the credit expires.",
		key: "DOCUMENTARY_CREDIT_EXPIRY_DATE_TIME",
	},
	{
		name: "Despatch note document issue date time",
		value: "124",
		description: "[2219] Issue date of a despatch note.",
		key: "DESPATCH_NOTE_DOCUMENT_ISSUE_DATE_TIME",
	},
	{
		name: "Import permit issue date time",
		value: "125",
		description: "[2293] Date of issue of an import licence.",
		key: "IMPORT_PERMIT_ISSUE_DATE_TIME",
	},
	{
		name: "Contract document issue date time",
		value: "126",
		description: "[2327] Date on which a contract is issued.",
		key: "CONTRACT_DOCUMENT_ISSUE_DATE_TIME",
	},
	{
		name: "Previous report date",
		value: "127",
		description: "Date of the previous report.",
		key: "PREVIOUS_REPORT_DATE",
	},
	{
		name: "Delivery date/time, last",
		value: "128",
		description:
			"Date when the last delivery should be or has been accomplished.",
		key: "DELIVERY_DATE_TIME_LAST",
	},
	{
		name: "Exportation date",
		value: "129",
		description:
			"[2043] Date when the imported vessel/merchandise last left the country of export for the country of import.",
		key: "EXPORTATION_DATE",
	},
	{
		name: "Current report date",
		value: "130",
		description: "Date of the current report.",
		key: "CURRENT_REPORT_DATE",
	},
	{
		name: "Tax point date time",
		value: "131",
		description: "[2221] Date on which tax is due or calculated.",
		key: "TAX_POINT_DATE_TIME",
	},
	{
		name: "Transport means arrival date time, estimated",
		value: "132",
		description:
			"[2349] Date and or time of the estimated arrival of means of transport.",
		key: "TRANSPORT_MEANS_ARRIVAL_DATE_TIME_ESTIMATED",
	},
	{
		name: "Transport means departure date/time, estimated",
		value: "133",
		description:
			"(2195) Date/time when carrier estimates that a means of transport should depart at the place of departure.",
		key: "TRANSPORT_MEANS_DEPARTURE_DATE_TIME_ESTIMATED",
	},
	{
		name: "Rate of exchange date/time",
		value: "134",
		description: "Date/time on which the exchange rate was fixed.",
		key: "RATE_OF_EXCHANGE_DATE_TIME",
	},
	{
		name: "Telex date",
		value: "135",
		description: "Date identifying when a telex message was sent.",
		key: "TELEX_DATE",
	},
	{
		name: "Transport means departure date time, actual",
		value: "136",
		description:
			"[2281] Date and or time of the departure of a means of transport.",
		key: "TRANSPORT_MEANS_DEPARTURE_DATE_TIME_ACTUAL",
	},
	{
		name: "Document issue date time",
		value: "137",
		description:
			"[2007] Date that a document was issued and when appropriate, signed or otherwise authenticated.",
		key: "DOCUMENT_ISSUE_DATE_TIME",
	},
	{
		name: "Payment availability date time",
		value: "138",
		description:
			"[2035] Date that an amount due becomes available to a creditor under the terms of payment.",
		key: "PAYMENT_AVAILABILITY_DATE_TIME",
	},
	{
		name: "Property mortgage date, start",
		value: "139",
		description: "The date the mortgage on a piece of property begins.",
		key: "PROPERTY_MORTGAGE_DATE_START",
	},
	{
		name: "Payment due date",
		value: "140",
		description: "[2481] Date/time at which funds should be made available.",
		key: "PAYMENT_DUE_DATE",
	},
	{
		name: "Customs declaration document lodgement date time",
		value: "141",
		description: "[2033] Presentation date of a declaration to customs.",
		key: "CUSTOMS_DECLARATION_DOCUMENT_LODGEMENT_DATE_TIME",
	},
	{
		name: "Labour wage determination date",
		value: "142",
		description: "The date a labour wage is determined.",
		key: "LABOUR_WAGE_DETERMINATION_DATE",
	},
	{
		name: "Consignment acceptance date time, actual",
		value: "143",
		description:
			"[2127] Actual date and optionally time when a consignment of goods is taken over by the carrier at the place of acceptance.",
		key: "CONSIGNMENT_ACCEPTANCE_DATE_TIME_ACTUAL",
	},
	{
		name: "Quota date",
		value: "144",
		description: "Date that the quota applies to.",
		key: "QUOTA_DATE",
	},
	{
		name: "Event date",
		value: "145",
		description: "A date specifying an event.",
		key: "EVENT_DATE",
	},
	{
		name: "Entry date, estimated (Customs)",
		value: "146",
		description:
			"Date on which the official date of Customs entry is anticipated.",
		key: "ENTRY_DATE_ESTIMATED_CUSTOMS",
	},
	{
		name: "Export permit effective end date time",
		value: "147",
		description: "[2079] Date on which an export licence expires.",
		key: "EXPORT_PERMIT_EFFECTIVE_END_DATE_TIME",
	},
	{
		name: "Goods declaration document acceptance date time",
		value: "148",
		description:
			"[2037] Date on which a Goods declaration has been or will be accepted by Customs in accordance with Customs legislation.",
		key: "GOODS_DECLARATION_DOCUMENT_ACCEPTANCE_DATE_TIME",
	},
	{
		name: "Invoice date, required",
		value: "149",
		description: "Date required for invoice issue.",
		key: "INVOICE_DATE_REQUIRED",
	},
	{
		name: "Declaration/presentation date",
		value: "150",
		description: "Date when item has been or has to be declared/presented.",
		key: "DECLARATION_PRESENTATION_DATE",
	},
	{
		name: "Importation date",
		value: "151",
		description:
			"Date on which goods are imported, as determined by the governing Customs administration.",
		key: "IMPORTATION_DATE",
	},
	{
		name: "Exportation date for textiles",
		value: "152",
		description:
			"Date when imported textiles last left the country of origin for the country of importation.",
		key: "EXPORTATION_DATE_FOR_TEXTILES",
	},
	{
		name: "Cancellation date/time, latest",
		value: "153",
		description:
			"The latest date/time on which cancellation of the payment order may be requested.",
		key: "CANCELLATION_DATE_TIME_LATEST",
	},
	{
		name: "Acceptance date of document",
		value: "154",
		description: "[2097] The date on which a document was accepted.",
		key: "ACCEPTANCE_DATE_OF_DOCUMENT",
	},
	{
		name: "Accounting period start date",
		value: "155",
		description: "The first date of an accounting period.",
		key: "ACCOUNTING_PERIOD_START_DATE",
	},
	{
		name: "Accounting period end date",
		value: "156",
		description: "The last date of an accounting period.",
		key: "ACCOUNTING_PERIOD_END_DATE",
	},
	{
		name: "Validity start date",
		value: "157",
		description: "The first date of a period for which something is valid.",
		key: "VALIDITY_START_DATE",
	},
	{
		name: "Horizon start date",
		value: "158",
		description: "The first date of a period forming a horizon.",
		key: "HORIZON_START_DATE",
	},
	{
		name: "Horizon end date",
		value: "159",
		description: "The last date of a period forming a horizon.",
		key: "HORIZON_END_DATE",
	},
	{
		name: "Authorization date",
		value: "160",
		description: "Date when an authorization was given.",
		key: "AUTHORIZATION_DATE",
	},
	{
		name: "Release date of customer",
		value: "161",
		description: "Date the customer authorised the goods' release.",
		key: "RELEASE_DATE_OF_CUSTOMER",
	},
	{
		name: "Release date of supplier",
		value: "162",
		description: "Date when the supplier released goods.",
		key: "RELEASE_DATE_OF_SUPPLIER",
	},
	{
		name: "Processing start date/time",
		value: "163",
		description: "Date/Time when a specific process starts.",
		key: "PROCESSING_START_DATE_TIME",
	},
	{
		name: "Processing end date/time",
		value: "164",
		description: "Date/Time when a specific process ends.",
		key: "PROCESSING_END_DATE_TIME",
	},
	{
		name: "Tax period start date",
		value: "165",
		description: "Date when a tax period begins.",
		key: "TAX_PERIOD_START_DATE",
	},
	{
		name: "Tax period end date",
		value: "166",
		description: "Date when a tax period ends.",
		key: "TAX_PERIOD_END_DATE",
	},
	{
		name: "Charge period start date",
		value: "167",
		description: "The charge period's first date.",
		key: "CHARGE_PERIOD_START_DATE",
	},
	{
		name: "Charge period end date",
		value: "168",
		description: "The charge period's last date.",
		key: "CHARGE_PERIOD_END_DATE",
	},
	{
		name: "Lead time",
		value: "169",
		description:
			"Time required between order entry till earliest goods delivery.",
		key: "LEAD_TIME",
	},
	{
		name: "Settlement due date",
		value: "170",
		description:
			"More generic than 'payment due date' and therefore more apt for reinsurance/insurance business.",
		key: "SETTLEMENT_DUE_DATE",
	},
	{
		name: "Reference date/time",
		value: "171",
		description: "Date/time on which the reference was issued.",
		key: "REFERENCE_DATE_TIME",
	},
	{
		name: "Hired from date",
		value: "172",
		description: "Date from which an item has been or will be hired.",
		key: "HIRED_FROM_DATE",
	},
	{
		name: "Hired until date",
		value: "173",
		description: "Date until which an item has been or will be hired.",
		key: "HIRED_UNTIL_DATE",
	},
	{
		name: "Advise after date/time",
		value: "174",
		description:
			"The information must be advised after the date/time indicated.",
		key: "ADVISE_AFTER_DATE_TIME",
	},
	{
		name: "Advise before date/time",
		value: "175",
		description:
			"The information must be advised before the date/time indicated.",
		key: "ADVISE_BEFORE_DATE_TIME",
	},
	{
		name: "Advise completed date/time",
		value: "176",
		description: "The advise has been completed at the date indicated.",
		key: "ADVISE_COMPLETED_DATE_TIME",
	},
	{
		name: "Advise on date/time",
		value: "177",
		description: "The information must be advised on the date/time indicated.",
		key: "ADVISE_ON_DATE_TIME",
	},
	{
		name: "Transport means arrival date time, actual",
		value: "178",
		description:
			"[2107] Date and or time of the arrival of means of transport.",
		key: "TRANSPORT_MEANS_ARRIVAL_DATE_TIME_ACTUAL",
	},
	{
		name: "Booking date/time",
		value: "179",
		description: "Date at which the booking was made.",
		key: "BOOKING_DATE_TIME",
	},
	{
		name: "Closing date/time",
		value: "180",
		description: "Final date for delivering cargo to a liner ship.",
		key: "CLOSING_DATE_TIME",
	},
	{
		name: "Positioning date/time of equipment",
		value: "181",
		description: "Date/time when equipment is positioned.",
		key: "POSITIONING_DATE_TIME_OF_EQUIPMENT",
	},
	{
		name: "Issue date",
		value: "182",
		description: "Date when a document/message has been or will be issued.",
		key: "ISSUE_DATE",
	},
	{
		name: "Date, as at",
		value: "183",
		description: "Date related to a given context.",
		key: "DATE_AS_AT",
	},
	{
		name: "Notification date/time",
		value: "184",
		description: "Date/time of notification.",
		key: "NOTIFICATION_DATE_TIME",
	},
	{
		name: "Commenced tank cleaning date/time",
		value: "185",
		description: "The date/and or time tank cleaning was started.",
		key: "COMMENCED_TANK_CLEANING_DATE_TIME",
	},
	{
		name: "Transport means departure date/time, actual",
		value: "186",
		description: "(2280) Date (and time) of departure of means of transport.",
		key: "TRANSPORT_MEANS_DEPARTURE_DATE_TIME_ACTUAL",
	},
	{
		name: "Authentication date/time of document",
		value: "187",
		description:
			"Date/time when the document is signed or otherwise authenticated.",
		key: "AUTHENTICATION_DATE_TIME_OF_DOCUMENT",
	},
	{
		name: "Previous current account date",
		value: "188",
		description: "Date of the previous current account.",
		key: "PREVIOUS_CURRENT_ACCOUNT_DATE",
	},
	{
		name: "Transport means departure date/time, scheduled",
		value: "189",
		description:
			"Date (and time) of scheduled departure of means of transport.",
		key: "TRANSPORT_MEANS_DEPARTURE_DATE_TIME_SCHEDULED",
	},
	{
		name: "Transhipment date/time",
		value: "190",
		description:
			"Date and time of the transfer of the goods from one means of transport to another.",
		key: "TRANSHIPMENT_DATE_TIME",
	},
	{
		name: "Delivery date/time, expected",
		value: "191",
		description: "Date/time on which goods are expected to be delivered.",
		key: "DELIVERY_DATE_TIME_EXPECTED",
	},
	{
		name: "Expiration date/time of customs document",
		value: "192",
		description: "Date on which validity of a customs document expires.",
		key: "EXPIRATION_DATE_TIME_OF_CUSTOMS_DOCUMENT",
	},
	{
		name: "Execution date",
		value: "193",
		description: "The date when ordered bank initiated the transaction.",
		key: "EXECUTION_DATE",
	},
	{
		name: "Start date/time",
		value: "194",
		description: "Date/time on which a period starts.",
		key: "START_DATE_TIME",
	},
	{
		name: "Import permit effective end date time",
		value: "195",
		description:
			"[2273] Date on which the validity of an import licence expires.",
		key: "IMPORT_PERMIT_EFFECTIVE_END_DATE_TIME",
	},
	{
		name: "Transport means departure date/time, earliest",
		value: "196",
		description: "Date/time of earliest departure of means of transport.",
		key: "TRANSPORT_MEANS_DEPARTURE_DATE_TIME_EARLIEST",
	},
	{
		name: "Lay-time first day",
		value: "197",
		description:
			"First of a number of days allowed in a charter party of the loading and discharging of cargo.",
		key: "LAY_TIME_FIRST_DAY",
	},
	{
		name: "Lay-time last day",
		value: "198",
		description:
			"Last of a number of days allowed in a charter party for the loading and discharging of cargo.",
		key: "LAY_TIME_LAST_DAY",
	},
	{
		name: "Positioning date/time of goods",
		value: "199",
		description:
			"The date and/or time the goods have to be or have been positioned.",
		key: "POSITIONING_DATE_TIME_OF_GOODS",
	},
	{
		name: "Cargo pick-up date / time",
		value: "200",
		description:
			"Date/time at which the cargo is picked up. Synonym: collected.",
		key: "CARGO_PICK_UP_DATE_TIME",
	},
	{
		name: "Equipment pick-up date / time",
		value: "201",
		description: "Date/time at which the equipment is picked up.",
		key: "EQUIPMENT_PICK_UP_DATE_TIME",
	},
	{
		name: "Posting date",
		value: "202",
		description: "The date when an entry is posted to an account.",
		key: "POSTING_DATE",
	},
	{
		name: "Execution date/time, requested",
		value: "203",
		description:
			"The date/time on which the ordered bank is requested to initiate the payment order, as specified by the originator (e.g. the date of the debit).",
		key: "EXECUTION_DATE_TIME_REQUESTED",
	},
	{
		name: "Release date (Customs)",
		value: "204",
		description:
			"(2135) Date on which Customs releases merchandise to the carrier or importer.",
		key: "RELEASE_DATE_CUSTOMS",
	},
	{
		name: "Settlement date",
		value: "205",
		description:
			"Date for settlement of financial transaction e.g. foreign exchange securities.",
		key: "SETTLEMENT_DATE",
	},
	{
		name: "End date/time",
		value: "206",
		description: "Date/time on which a period (from - to) ends.",
		key: "END_DATE_TIME",
	},
	{
		name: "Commenced pumping ballast date/time",
		value: "207",
		description:
			"Date/time on which the intake of materials to be carried to improve the trim and the stability of the means of transport, was commenced.",
		key: "COMMENCED_PUMPING_BALLAST_DATE_TIME",
	},
	{
		name: "Transport means departure date/time, ultimate",
		value: "208",
		description:
			"Date/time at which a means of transport has to depart ultimately.",
		key: "TRANSPORT_MEANS_DEPARTURE_DATE_TIME_ULTIMATE",
	},
	{
		name: "Value date",
		value: "209",
		description:
			"Date on which the funds are at the disposal of the beneficiary or cease to be at the disposal of the ordering customer.",
		key: "VALUE_DATE",
	},
	{
		name: "Reinsurance current account period",
		value: "210",
		description: "The date of the current reinsurance account.",
		key: "REINSURANCE_CURRENT_ACCOUNT_PERIOD",
	},
	{
		name: "360/30",
		value: "211",
		description: "Calculation is based on year of 360 days, month of 30 days.",
		key: "360_30",
	},
	{
		name: "360/28-31",
		value: "212",
		description:
			"Calculation is based on year of 360 days, month of 28-31 days.",
		key: "360_28_31",
	},
	{
		name: "365-6/30",
		value: "213",
		description:
			"Calculation is based on year of 365-6 days, month of 30 days.",
		key: "365_6_30",
	},
	{
		name: "365-6/28-31",
		value: "214",
		description:
			"Calculation is based on year of 365-6 days, month of 28- 31 days.",
		key: "365_6_28_31",
	},
	{
		name: "365/28-31",
		value: "215",
		description:
			"Calculation is based on year of 365 days, month of 28-31 days.",
		key: "365_28_31",
	},
	{
		name: "365/30",
		value: "216",
		description: "Calculation is based on year of 365 days, month of 30 days.",
		key: "365_30",
	},
	{
		name: "From date of award to latest delivery",
		value: "217",
		description:
			"Lead time to determine the latest date a delivery can be made based on the date an award is made.",
		key: "FROM_DATE_OF_AWARD_TO_LATEST_DELIVERY",
	},
	{
		name: "Authentication/validation date/time",
		value: "218",
		description: "The date/time of authentication and/or validation.",
		key: "AUTHENTICATION_VALIDATION_DATE_TIME",
	},
	{
		name: "Crossborder date/time",
		value: "219",
		description:
			"Date/time at which goods are transferred across a country border.",
		key: "CROSSBORDER_DATE_TIME",
	},
	{
		name: "Property mortgage scheduled date, end",
		value: "220",
		description:
			"The date the mortgage on a piece of property is scheduled to end.",
		key: "PROPERTY_MORTGAGE_SCHEDULED_DATE_END",
	},
	{
		name: "Interest period",
		value: "221",
		description: "Number of days used for the calculation of interests.",
		key: "INTEREST_PERIOD",
	},
	{
		name: "Presentation date, latest",
		value: "222",
		description: "Latest date for presentation of a document.",
		key: "PRESENTATION_DATE_LATEST",
	},
	{
		name: "Delivery date/time, deferred",
		value: "223",
		description:
			"New date and time of delivery calculated on basis of a consignee's requirement (chargeable).",
		key: "DELIVERY_DATE_TIME_DEFERRED",
	},
	{
		name: "Permit to admit date",
		value: "224",
		description:
			"Date on which permission was granted to move merchandise into a bonded warehouse or free trade zone.",
		key: "PERMIT_TO_ADMIT_DATE",
	},
	{
		name: "Certification of weight date/time",
		value: "225",
		description:
			"Date/time at which the carrier proceeds to the weighting of the goods.",
		key: "CERTIFICATION_OF_WEIGHT_DATE_TIME",
	},
	{
		name: "Discrepancy date/time",
		value: "226",
		description: "Date/time at which a discrepancy has been found.",
		key: "DISCREPANCY_DATE_TIME",
	},
	{
		name: "Beneficiary's banks due date",
		value: "227",
		description:
			"Date on which funds should be made available to the beneficiary's bank.",
		key: "BENEFICIARY_S_BANKS_DUE_DATE",
	},
	{
		name: "Debit value date, requested",
		value: "228",
		description:
			"Date on which the account owner wants the debit value to his account.",
		key: "DEBIT_VALUE_DATE_REQUESTED",
	},
	{
		name: "Hoses connected date/time",
		value: "229",
		description: "The date and/or time hoses were connected.",
		key: "HOSES_CONNECTED_DATE_TIME",
	},
	{
		name: "Hoses disconnected date/time",
		value: "230",
		description: "The date and/or time hoses were disconnected.",
		key: "HOSES_DISCONNECTED_DATE_TIME",
	},
	{
		name: "Transport means arrival date/time, earliest",
		value: "231",
		description: "Date/time of earliest arrival of means of transport.",
		key: "TRANSPORT_MEANS_ARRIVAL_DATE_TIME_EARLIEST",
	},
	{
		name: "Transport means arrival date/time, scheduled",
		value: "232",
		description: "Date (and time) of scheduled arrival of means of transport.",
		key: "TRANSPORT_MEANS_ARRIVAL_DATE_TIME_SCHEDULED",
	},
	{
		name: "Transport means arrival date/time, ultimate",
		value: "233",
		description: "Date (and time) of ultimate arrival of means of transport.",
		key: "TRANSPORT_MEANS_ARRIVAL_DATE_TIME_ULTIMATE",
	},
	{
		name: "Collection date/time, earliest",
		value: "234",
		description:
			"The transport order may be issued before the goods are ready for picking up. This date/time indicates from when on the carrier can have access to the consignment.",
		key: "COLLECTION_DATE_TIME_EARLIEST",
	},
	{
		name: "Collection date/time, latest",
		value: "235",
		description:
			"In relation with the arrangements agreed between buyer and seller or between sender and main transport it may be necessary to specify the latest collection date/time.",
		key: "COLLECTION_DATE_TIME_LATEST",
	},
	{
		name: "Completed pumping ballast date/time",
		value: "236",
		description:
			"Date/time at which the intake of materials, to be carried to improve the trim and the stability of the means of transport, was completed.",
		key: "COMPLETED_PUMPING_BALLAST_DATE_TIME",
	},
	{
		name: "Completed tank cleaning date/time",
		value: "237",
		description: "The date and/or time tank cleaning was completed.",
		key: "COMPLETED_TANK_CLEANING_DATE_TIME",
	},
	{
		name: "Tanks accepted date/time",
		value: "238",
		description:
			"The date and/or time the tanks are to be or have been accepted.",
		key: "TANKS_ACCEPTED_DATE_TIME",
	},
	{
		name: "Tanks inspected date/time",
		value: "239",
		description:
			"The date and/or time the tanks are to be or have been inspected.",
		key: "TANKS_INSPECTED_DATE_TIME",
	},
	{
		name: "Reinsurance accounting period",
		value: "240",
		description:
			'To identify a reinsurance account period via start and end dates. Note: 1. This period is not the same as "reinsurance current account period".',
		key: "REINSURANCE_ACCOUNTING_PERIOD",
	},
	{
		name: "From date of award to earliest delivery",
		value: "241",
		description:
			"Lead time to determine the earliest date a delivery can be made based on the date an award is made.",
		key: "FROM_DATE_OF_AWARD_TO_EARLIEST_DELIVERY",
	},
	{
		name: "Preparation date/time of document",
		value: "242",
		description: "Date and/or time that the document was prepared.",
		key: "PREPARATION_DATE_TIME_OF_DOCUMENT",
	},
	{
		name: "Transmission date/time of document",
		value: "243",
		description: "The date/time at which a document was transmitted.",
		key: "TRANSMISSION_DATE_TIME_OF_DOCUMENT",
	},
	{
		name: "Settlement date, planned",
		value: "244",
		description: "The date for which settlement is planned.",
		key: "SETTLEMENT_DATE_PLANNED",
	},
	{
		name: "Underwriting year",
		value: "245",
		description: "Year in which the treaty was commenced.",
		key: "UNDERWRITING_YEAR",
	},
	{
		name: "Accounting year",
		value: "246",
		description:
			"Year considered for accounting of the treaty or portion of the treaty.",
		key: "ACCOUNTING_YEAR",
	},
	{
		name: "Year of occurrence",
		value: "247",
		description: "Year in which a specific event (e.g. a loss) took place.",
		key: "YEAR_OF_OCCURRENCE",
	},
	{
		name: "Loss",
		value: "248",
		description: "Date, time, period on which a referenced loss occurred.",
		key: "LOSS",
	},
	{
		name: "Cash call date",
		value: "249",
		description:
			"Date on which a cash call was made for a loss suffered and covered.",
		key: "CASH_CALL_DATE",
	},
	{
		name: "Re-exportation date",
		value: "250",
		description: "Date of re-exportation.",
		key: "RE_EXPORTATION_DATE",
	},
	{
		name: "Re-importation date",
		value: "251",
		description: "Date of re-importation.",
		key: "RE_IMPORTATION_DATE",
	},
	{
		name: "Arrival date/time at initial port",
		value: "252",
		description:
			"Date/time that the conveyance arrives at the initial port in the country of destination.",
		key: "ARRIVAL_DATE_TIME_AT_INITIAL_PORT",
	},
	{
		name: "Departure date/time from last port of call",
		value: "253",
		description:
			"Date/time that conveyance departed from the last foreign port of call.",
		key: "DEPARTURE_DATE_TIME_FROM_LAST_PORT_OF_CALL",
	},
	{
		name: "Registration date of previous Customs declaration",
		value: "254",
		description:
			"Registration date of the Customs declaration for the previous Customs procedure either in the same or another country.",
		key: "REGISTRATION_DATE_OF_PREVIOUS_CUSTOMS_DECLARATION",
	},
	{
		name: "Availability due date",
		value: "255",
		description:
			"Date when ordered items should be available at a specified location.",
		key: "AVAILABILITY_DUE_DATE",
	},
	{
		name: "From date of award to completion",
		value: "256",
		description:
			"Lead time to determine the completion date of an effort based on the date an award is made.",
		key: "FROM_DATE_OF_AWARD_TO_COMPLETION",
	},
	{
		name: "Calculation date time",
		value: "257",
		description: "[2253] Date on which the calculation was made.",
		key: "CALCULATION_DATE_TIME",
	},
	{
		name: "Guarantee date",
		value: "258",
		description: "Date when a guarantee is placed.",
		key: "GUARANTEE_DATE",
	},
	{
		name: "Conveyance registration date",
		value: "259",
		description:
			"[2063] Date when a vessel, vehicle or other means of transport was registered by a competent authority.",
		key: "CONVEYANCE_REGISTRATION_DATE",
	},
	{
		name: "Valuation date (Customs)",
		value: "260",
		description: "Date when Customs valuation was made.",
		key: "VALUATION_DATE_CUSTOMS",
	},
	{
		name: "Release date/time",
		value: "261",
		description:
			"Date/time assigned to identify the release of a set of rules, conditions, conventions, productions, etc.",
		key: "RELEASE_DATE_TIME",
	},
	{
		name: "Closure date/time/period",
		value: "262",
		description: "Date/time/period when an enterprise is closed.",
		key: "CLOSURE_DATE_TIME_PERIOD",
	},
	{
		name: "Invoicing period",
		value: "263",
		description: "Period for which an invoice is issued.",
		key: "INVOICING_PERIOD",
	},
	{
		name: "Release frequency",
		value: "264",
		description: "Frequency of a release.",
		key: "RELEASE_FREQUENCY",
	},
	{
		name: "Due date",
		value: "265",
		description: "The date on which some action should occur.",
		key: "DUE_DATE",
	},
	{
		name: "Validation date",
		value: "266",
		description:
			"The date on which something was made valid, ratified or confirmed.",
		key: "VALIDATION_DATE",
	},
	{
		name: "Rate/price date/time",
		value: "267",
		description: "Date/time on which a rate/price is determined.",
		key: "RATE_PRICE_DATE_TIME",
	},
	{
		name: "Transit time/limits",
		value: "268",
		description: "The time to go over a distance.",
		key: "TRANSIT_TIME_LIMITS",
	},
	{
		name: "Discharge date/time, started",
		value: "269",
		description: "Date/time when discharge operations were started.",
		key: "DISCHARGE_DATE_TIME_STARTED",
	},
	{
		name: "Ship during date",
		value: "270",
		description:
			"The date identifying the period during or in which the goods should be shipped.",
		key: "SHIP_DURING_DATE",
	},
	{
		name: "Ship on or about date",
		value: "271",
		description: "Date on or about which goods should be shipped.",
		key: "SHIP_ON_OR_ABOUT_DATE",
	},
	{
		name: "Documentary credit presentation period",
		value: "272",
		description:
			"[2060] The specification of the period of time, expressed in number of days, after the date of issuance of the transport document(s) within which the documents must be presented.",
		key: "DOCUMENTARY_CREDIT_PRESENTATION_PERIOD",
	},
	{
		name: "Validity period",
		value: "273",
		description: "Dates (from/to)/period referenced documents are valid.",
		key: "VALIDITY_PERIOD",
	},
	{
		name: "From date of order receipt to sample ready",
		value: "274",
		description: "Lead time is the defined timespan.",
		key: "FROM_DATE_OF_ORDER_RECEIPT_TO_SAMPLE_READY",
	},
	{
		name: "From date of tooling authorization to sample ready",
		value: "275",
		description: "Lead time is the defined timespan.",
		key: "FROM_DATE_OF_TOOLING_AUTHORIZATION_TO_SAMPLE_READY",
	},
	{
		name: "From date of receipt of tooling aids to sample ready",
		value: "276",
		description: "Lead time is the defined timespan.",
		key: "FROM_DATE_OF_RECEIPT_OF_TOOLING_AIDS_TO_SAMPLE_READY",
	},
	{
		name: "From date of sample approval to first product shipment",
		value: "277",
		description: "Lead time is the defined timespan.",
		key: "FROM_DATE_OF_SAMPLE_APPROVAL_TO_FIRST_PRODUCT_SHIPMENT",
	},
	{
		name: "From date of order receipt to shipment",
		value: "278",
		description: "Lead time is the defined timespan.",
		key: "FROM_DATE_OF_ORDER_RECEIPT_TO_SHIPMENT",
	},
	{
		name: "From date of order receipt to delivery",
		value: "279",
		description: "Lead time is the defined timespan.",
		key: "FROM_DATE_OF_ORDER_RECEIPT_TO_DELIVERY",
	},
	{
		name: "From last booked order to delivery",
		value: "280",
		description: "Lead time is the defined timespan.",
		key: "FROM_LAST_BOOKED_ORDER_TO_DELIVERY",
	},
	{
		name: "Date of order lead time",
		value: "281",
		description: "Lead time is referenced to the date of order.",
		key: "DATE_OF_ORDER_LEAD_TIME",
	},
	{
		name: "Confirmation date lead time",
		value: "282",
		description: "Lead time is referenced to the date of confirmation.",
		key: "CONFIRMATION_DATE_LEAD_TIME",
	},
	{
		name: "Arrival date/time of transport lead time",
		value: "283",
		description:
			"Lead time is referenced to the date a transport will arrive or has arrived.",
		key: "ARRIVAL_DATE_TIME_OF_TRANSPORT_LEAD_TIME",
	},
	{
		name: "Before inventory is replenished based on stock check lead",
		value: "284",
		description: "time Lead time is the defined timespan.",
		key: "BEFORE_INVENTORY_IS_REPLENISHED_BASED_ON_STOCK_CHECK_LEAD",
	},
	{
		name: "Invitation to tender date/time",
		value: "285",
		description:
			"Date/time on which the invitation to tender has been made available to relevant parties.",
		key: "INVITATION_TO_TENDER_DATE_TIME",
	},
	{
		name: "Tender submission date/time",
		value: "286",
		description: "Date/time on which the tender was submitted.",
		key: "TENDER_SUBMISSION_DATE_TIME",
	},
	{
		name: "Contract award date/time",
		value: "287",
		description: "Date/time on which the contract is awarded to a tenderer.",
		key: "CONTRACT_AWARD_DATE_TIME",
	},
	{
		name: "Price base date/time",
		value: "288",
		description: "Base date/time of prices.",
		key: "PRICE_BASE_DATE_TIME",
	},
	{
		name: "Interest rate validity period",
		value: "289",
		description: "Validity period of the interest rate.",
		key: "INTEREST_RATE_VALIDITY_PERIOD",
	},
	{
		name: "Contractual start date/time",
		value: "290",
		description:
			"Date/time on which activities stated in the contract must start.",
		key: "CONTRACTUAL_START_DATE_TIME",
	},
	{
		name: "Start date/time, planned",
		value: "291",
		description:
			"The date/time for which something is planned to begin or commence.",
		key: "START_DATE_TIME_PLANNED",
	},
	{
		name: "Works completion date/time, planned",
		value: "292",
		description:
			"The date/time for the completion of building or repair operations is planned.",
		key: "WORKS_COMPLETION_DATE_TIME_PLANNED",
	},
	{
		name: "Works completion date/time, actual",
		value: "293",
		description:
			"The actual date/time for the completion of building or repair operations.",
		key: "WORKS_COMPLETION_DATE_TIME_ACTUAL",
	},
	{
		name: "Hand over date/time, planned",
		value: "294",
		description:
			"Date/time on which hand over (i.e. the transfer of responsibility for an object or activity such as documentation, system etc. from one party to another) is planned to take place.",
		key: "HAND_OVER_DATE_TIME_PLANNED",
	},
	{
		name: "Hand over date/time, actual",
		value: "295",
		description:
			"Date/time on which hand over (i.e. the transfer of responsibility for an object or activity such as documentation, system etc. from one party to another) actually takes place.",
		key: "HAND_OVER_DATE_TIME_ACTUAL",
	},
	{
		name: "Retention release date/time",
		value: "296",
		description: "Date/time on which the retention is released.",
		key: "RETENTION_RELEASE_DATE_TIME",
	},
	{
		name: "Retention release date/time, partial",
		value: "297",
		description: "Date/time on which the retention is partially released.",
		key: "RETENTION_RELEASE_DATE_TIME_PARTIAL",
	},
	{
		name: "Goods pick-up date / time, planned",
		value: "298",
		description:
			"Date/time at which goods can be picked up, according to a plan.",
		key: "GOODS_PICK_UP_DATE_TIME_PLANNED",
	},
	{
		name: "Price adjustment start date",
		value: "299",
		description:
			"Value date of the indexes appearing as denominators in a price adjustment formula.",
		key: "PRICE_ADJUSTMENT_START_DATE",
	},
	{
		name: "Price adjustment limit date",
		value: "300",
		description:
			"Limit value date of indexes used as numerators in a price adjustment formula.",
		key: "PRICE_ADJUSTMENT_LIMIT_DATE",
	},
	{
		name: "Value date of index",
		value: "301",
		description: "Date of validity of index values.",
		key: "VALUE_DATE_OF_INDEX",
	},
	{
		name: "Publication date",
		value: "302",
		description: "The date of the act of making something publicly known.",
		key: "PUBLICATION_DATE",
	},
	{
		name: "Escalation date",
		value: "303",
		description:
			"Value date of indexes appearing as numerators in an escalation formula.",
		key: "ESCALATION_DATE",
	},
	{
		name: "Price adjustment date",
		value: "304",
		description:
			"Value date of indexes appearing as numerators in a price adjustment formula.",
		key: "PRICE_ADJUSTMENT_DATE",
	},
	{
		name: "Latest price adjustment date",
		value: "305",
		description: "Date on which the latest price adjustment took place.",
		key: "LATEST_PRICE_ADJUSTMENT_DATE",
	},
	{
		name: "Work period",
		value: "306",
		description: "Period of execution of works.",
		key: "WORK_PERIOD",
	},
	{
		name: "Payment instruction date/time",
		value: "307",
		description: "Date/time on which a payment instruction was given.",
		key: "PAYMENT_INSTRUCTION_DATE_TIME",
	},
	{
		name: "Payment valuation presentation date/time",
		value: "308",
		description: "Date/time on which the payment valuation is presented.",
		key: "PAYMENT_VALUATION_PRESENTATION_DATE_TIME",
	},
	{
		name: "Banks' value date",
		value: "309",
		description:
			"Date on which the funds are at the disposal of the receiving bank or cease to be at the disposal of the sending bank.",
		key: "BANKS_VALUE_DATE",
	},
	{
		name: "Received date/time",
		value: "310",
		description: "Date/time of receipt.",
		key: "RECEIVED_DATE_TIME",
	},
	{
		name: "On",
		value: "311",
		description: "Fixed maturity day for deferred payment or time draft(s).",
		key: "ON",
	},
	{
		name: "Ship not before and not after date/time",
		value: "312",
		description:
			"Shipment(s) of goods is/are to be made not before the first specified date/time and not after the second specified date/time.",
		key: "SHIP_NOT_BEFORE_AND_NOT_AFTER_DATE_TIME",
	},
	{
		name: "Order to proceed date",
		value: "313",
		description: "Issue date of an instruction to start work.",
		key: "ORDER_TO_PROCEED_DATE",
	},
	{
		name: "Planned duration of works",
		value: "314",
		description:
			"The period of time planned for the completion of building or repair operations.",
		key: "PLANNED_DURATION_OF_WORKS",
	},
	{
		name: "Agreement to pay date",
		value: "315",
		description: "Date on which the debtor agreed to pay.",
		key: "AGREEMENT_TO_PAY_DATE",
	},
	{
		name: "Valuation date/time",
		value: "316",
		description: "Date/time of valuation.",
		key: "VALUATION_DATE_TIME",
	},
	{
		name: "Reply date",
		value: "317",
		description: "The date to answer or to respond in word or action.",
		key: "REPLY_DATE",
	},
	{
		name: "Request date",
		value: "318",
		description: "The date on which something was asked for.",
		key: "REQUEST_DATE",
	},
	{
		name: "Customer value date",
		value: "319",
		description:
			"Date at which funds are taken into account for interest calculation (in debit or credit).",
		key: "CUSTOMER_VALUE_DATE",
	},
	{
		name: "Declaration reference period",
		value: "320",
		description:
			"Reference period of a set of items reported on the same declaration.",
		key: "DECLARATION_REFERENCE_PERIOD",
	},
	{
		name: "Promotion date/period",
		value: "321",
		description: "Date/period relevant for specific promotion activities.",
		key: "PROMOTION_DATE_PERIOD",
	},
	{
		name: "Accounting period",
		value: "322",
		description:
			"A period of time for the recording of financial transactions for accounting.",
		key: "ACCOUNTING_PERIOD",
	},
	{
		name: "Horizon period",
		value: "323",
		description: "Period forming a (planning) horizon.",
		key: "HORIZON_PERIOD",
	},
	{
		name: "Processing date/period",
		value: "324",
		description: "Date/period a specific process happened/will happen.",
		key: "PROCESSING_DATE_PERIOD",
	},
	{
		name: "Tax period",
		value: "325",
		description: "Period a tax rate/tax amount etc. is applicable.",
		key: "TAX_PERIOD",
	},
	{
		name: "Charge period",
		value: "326",
		description: "Period a specified charge is valid for.",
		key: "CHARGE_PERIOD",
	},
	{
		name: "Instalment payment due date",
		value: "327",
		description: "Date on which an instalment payment is due.",
		key: "INSTALMENT_PAYMENT_DUE_DATE",
	},
	{
		name: "Payroll deduction date/time",
		value: "328",
		description:
			"Date/time of a monetary deduction made from the salary of a person on a payroll.",
		key: "PAYROLL_DEDUCTION_DATE_TIME",
	},
	{
		name: "Person birth date time",
		value: "329",
		description: "[2491] (2051) Date on which an individual is or was born.",
		key: "PERSON_BIRTH_DATE_TIME",
	},
	{
		name: "Joined employer date",
		value: "330",
		description: "Date when a person joins an employer.",
		key: "JOINED_EMPLOYER_DATE",
	},
	{
		name: "Contributions ceasing date/time",
		value: "331",
		description: "Date/time when contributions cease.",
		key: "CONTRIBUTIONS_CEASING_DATE_TIME",
	},
	{
		name: "Contribution period end date/time",
		value: "332",
		description: "Date/time when a contribution period ends.",
		key: "CONTRIBUTION_PERIOD_END_DATE_TIME",
	},
	{
		name: "Part-time working change date/time",
		value: "333",
		description: "Date/time when the proportion of part-time work changes.",
		key: "PART_TIME_WORKING_CHANGE_DATE_TIME",
	},
	{
		name: "Status change date/time",
		value: "334",
		description: "Date/time when a status changes.",
		key: "STATUS_CHANGE_DATE_TIME",
	},
	{
		name: "Contribution period start date/time",
		value: "335",
		description: "Date/time when a contribution period commences.",
		key: "CONTRIBUTION_PERIOD_START_DATE_TIME",
	},
	{
		name: "Salary change effective date",
		value: "336",
		description: "Date when a change in salary becomes effective.",
		key: "SALARY_CHANGE_EFFECTIVE_DATE",
	},
	{
		name: "Left employer date",
		value: "337",
		description: "Date when a person leaves an employer.",
		key: "LEFT_EMPLOYER_DATE",
	},
	{
		name: "Benefit change date/time",
		value: "338",
		description:
			"Date/time when a benefit provided by a service provider is changed.",
		key: "BENEFIT_CHANGE_DATE_TIME",
	},
	{
		name: "Category change date/time",
		value: "339",
		description: "Date/time when a change of category is made.",
		key: "CATEGORY_CHANGE_DATE_TIME",
	},
	{
		name: "Joined fund date/time",
		value: "340",
		description: "Date/time when a person joins a fund.",
		key: "JOINED_FUND_DATE_TIME",
	},
	{
		name: "Waiting time",
		value: "341",
		description:
			"The period of time between the moment at which one wants an activity to begin and the moment at which this activity can actually begin.",
		key: "WAITING_TIME",
	},
	{
		name: "Consignment loading date time",
		value: "342",
		description:
			"[2347] Date and optionally time when a consignment is to be or has been loaded onto a means of transport.",
		key: "CONSIGNMENT_LOADING_DATE_TIME",
	},
	{
		name: "Date/time of discount termination",
		value: "343",
		description: "Date/time when the deduction from an amount comes to an end.",
		key: "DATE_TIME_OF_DISCOUNT_TERMINATION",
	},
	{
		name: "Date/time of interest due",
		value: "344",
		description: "Date/time when the interest has to be paid.",
		key: "DATE_TIME_OF_INTEREST_DUE",
	},
	{
		name: "Days of operation",
		value: "345",
		description: "Week days of operation.",
		key: "DAYS_OF_OPERATION",
	},
	{
		name: "Latest check-in time",
		value: "346",
		description: "Latest time of check-in.",
		key: "LATEST_CHECK_IN_TIME",
	},
	{
		name: "Slaughtering start date",
		value: "347",
		description: "Date on which slaughtering commenced.",
		key: "SLAUGHTERING_START_DATE",
	},
	{
		name: "Packing start date",
		value: "348",
		description: "Date on which packing commenced.",
		key: "PACKING_START_DATE",
	},
	{
		name: "Packing end date",
		value: "349",
		description: "Date on which packing completed.",
		key: "PACKING_END_DATE",
	},
	{
		name: "Test start date",
		value: "350",
		description: "Date when a test has been started.",
		key: "TEST_START_DATE",
	},
	{
		name: "Inspection date",
		value: "351",
		description: "Date of inspection.",
		key: "INSPECTION_DATE",
	},
	{
		name: "Slaughtering end date",
		value: "352",
		description: "Date on which slaughtering completed.",
		key: "SLAUGHTERING_END_DATE",
	},
	{
		name: "Accounting transaction date",
		value: "353",
		description: "Date to which an accounting transaction refers.",
		key: "ACCOUNTING_TRANSACTION_DATE",
	},
	{
		name: "Activity period date range",
		value: "354",
		description: "A specific date range associated with an activity.",
		key: "ACTIVITY_PERIOD_DATE_RANGE",
	},
	{
		name: "Contractual delivery date",
		value: "355",
		description: "The date of delivery contractually agreed between parties.",
		key: "CONTRACTUAL_DELIVERY_DATE",
	},
	{
		name: "Sales date, and or time, and or period",
		value: "356",
		description:
			"The date, and or time, and or period on which a sale took place.",
		key: "SALES_DATE_AND_OR_TIME_AND_OR_PERIOD",
	},
	{
		name: "Cancel if not published by this date",
		value: "357",
		description: "Cancel if not published by this date.",
		key: "CANCEL_IF_NOT_PUBLISHED_BY_THIS_DATE",
	},
	{
		name: "Scheduled for delivery on or after",
		value: "358",
		description:
			"Scheduled for delivery on or after the specified date, and or time.",
		key: "SCHEDULED_FOR_DELIVERY_ON_OR_AFTER",
	},
	{
		name: "Scheduled for delivery on or before",
		value: "359",
		description:
			"Scheduled for delivery on or before specified date and or time.",
		key: "SCHEDULED_FOR_DELIVERY_ON_OR_BEFORE",
	},
	{
		name: "Sell by date",
		value: "360",
		description: "The date by which a product should be sold.",
		key: "SELL_BY_DATE",
	},
	{
		name: "Product best before date time",
		value: "361",
		description:
			"[2497] Indication that freshness of goods is limited in time to the date shown.",
		key: "PRODUCT_BEST_BEFORE_DATE_TIME",
	},
	{
		name: "End availability date",
		value: "362",
		description: "The end date of availability.",
		key: "END_AVAILABILITY_DATE",
	},
	{
		name: "Total shelf life period",
		value: "363",
		description: "A period indicating the total shelf life of a product.",
		key: "TOTAL_SHELF_LIFE_PERIOD",
	},
	{
		name: "Minimum shelf life remaining at time of despatch period",
		value: "364",
		description:
			"Period indicating the minimum shelf life remaining for a product at the time of leaving the supplier.",
		key: "MINIMUM_SHELF_LIFE_REMAINING_AT_TIME_OF_DESPATCH_PERIOD",
	},
	{
		name: "Packaging date",
		value: "365",
		description: "The date on which the packaging of a product took place.",
		key: "PACKAGING_DATE",
	},
	{
		name: "Inventory report date",
		value: "366",
		description: "Date on which a inventory report is made.",
		key: "INVENTORY_REPORT_DATE",
	},
	{
		name: "Meter reading date, previous",
		value: "367",
		description: "Date on which the previous reading of a meter took place.",
		key: "METER_READING_DATE_PREVIOUS",
	},
	{
		name: "Meter reading date, latest",
		value: "368",
		description: "Date on which the latest reading of a meter took place.",
		key: "METER_READING_DATE_LATEST",
	},
	{
		name: "Date and or time of handling, estimated",
		value: "369",
		description:
			"The date and or time when the handling action is estimated to take place.",
		key: "DATE_AND_OR_TIME_OF_HANDLING_ESTIMATED",
	},
	{
		name: "Date when container equipment becomes domestic",
		value: "370",
		description:
			"The date on which foreign-built container equipment has entered into the commerce of another country and has become domestic equipment.",
		key: "DATE_WHEN_CONTAINER_EQUIPMENT_BECOMES_DOMESTIC",
	},
	{
		name: "Hydrotest date",
		value: "371",
		description: "The date equipment has been hydrotested.",
		key: "HYDROTEST_DATE",
	},
	{
		name: "Equipment pre-trip date",
		value: "372",
		description: "The date on which equipment is pre-tripped.",
		key: "EQUIPMENT_PRE_TRIP_DATE",
	},
	{
		name: "Mooring, date and time",
		value: "373",
		description: "Date and time of mooring.",
		key: "MOORING_DATE_AND_TIME",
	},
	{
		name: "Road fund tax expiry date",
		value: "374",
		description: "The date of expiry of the road fund tax.",
		key: "ROAD_FUND_TAX_EXPIRY_DATE",
	},
	{
		name: "Date of first registration",
		value: "375",
		description: "Date of first registration.",
		key: "DATE_OF_FIRST_REGISTRATION",
	},
	{
		name: "Biannual terminal inspection date",
		value: "376",
		description:
			"The date on which a biannual inspection of a terminal has taken or will take place.",
		key: "BIANNUAL_TERMINAL_INSPECTION_DATE",
	},
	{
		name: "Federal HighWay Administration (FHWA) inspection date",
		value: "377",
		description:
			"The date on which container equipment is to be or has been inspected in accordance with the requirements of the U.S. Federal Highway Administration.",
		key: "FEDERAL_HIGH_WAY_ADMINISTRATION_FHWA_INSPECTION_DATE",
	},
	{
		name: "Container Safety Convention (CSC) inspection date",
		value: "378",
		description:
			"The date on which container equipment is to be or has been inspected as per the Container Safety Convention (CSC).",
		key: "CONTAINER_SAFETY_CONVENTION_CSC_INSPECTION_DATE",
	},
	{
		name: "Periodic inspection date",
		value: "379",
		description: "The date on which a periodic inspection has to take place.",
		key: "PERIODIC_INSPECTION_DATE",
	},
	{
		name: "Drawing revision date",
		value: "380",
		description: "Date the drawing revision has been allocated to a design.",
		key: "DRAWING_REVISION_DATE",
	},
	{
		name: "Product lifespan at time of production",
		value: "381",
		description:
			"The total lifespan of a product at the time of its production.",
		key: "PRODUCT_LIFESPAN_AT_TIME_OF_PRODUCTION",
	},
	{
		name: "Earliest sale date",
		value: "382",
		description:
			"The earliest date on which the product may be made available for sale.",
		key: "EARLIEST_SALE_DATE",
	},
	{
		name: "Cancel if not shipped by this date",
		value: "383",
		description: "Cancel the order if goods not shipped by this date.",
		key: "CANCEL_IF_NOT_SHIPPED_BY_THIS_DATE",
	},
	{
		name: "Previous invoice date",
		value: "384",
		description:
			"Indicates the date which was allocated to a previous invoice.",
		key: "PREVIOUS_INVOICE_DATE",
	},
	{
		name: "Payment cancelled, violation of agreement",
		value: "385",
		description:
			"Date/time when a payment is cancelled due to the fact that the transaction does not comply with the agreement.",
		key: "PAYMENT_CANCELLED_VIOLATION_OF_AGREEMENT",
	},
	{
		name: "Payment cancelled due to administrative error",
		value: "386",
		description:
			"Date/time when a payment is cancelled due to an administrative error.",
		key: "PAYMENT_CANCELLED_DUE_TO_ADMINISTRATIVE_ERROR",
	},
	{
		name: "Repair turnaround time",
		value: "387",
		description:
			"Provides the period of time necessary to turnaround a given repair.",
		key: "REPAIR_TURNAROUND_TIME",
	},
	{
		name: "Order amendment binding date",
		value: "388",
		description:
			"The date when an order amendment becomes binding for both parties.",
		key: "ORDER_AMENDMENT_BINDING_DATE",
	},
	{
		name: "Cure time",
		value: "389",
		description:
			"Specifies the length of time that an article was or should be cured.",
		key: "CURE_TIME",
	},
	{
		name: "From date of award to delivery",
		value: "390",
		description:
			"Lead time to determine the delivery date based on the date an award is made.",
		key: "FROM_DATE_OF_AWARD_TO_DELIVERY",
	},
	{
		name: "From date of receipt of item to approval",
		value: "391",
		description:
			"Lead time to determine the date an item will be approved based on the date the item was received.",
		key: "FROM_DATE_OF_RECEIPT_OF_ITEM_TO_APPROVAL",
	},
	{
		name: "Equipment pick-up date / time, earliest",
		value: "392",
		description:
			"[2125] Earliest date/time at which the equipment can be picked up.",
		key: "EQUIPMENT_PICK_UP_DATE_TIME_EARLIEST",
	},
	{
		name: "Equipment pick-up date / time, planned",
		value: "393",
		description:
			"Date/time at which equipment can be picked up, either full or empty, according to a plan.",
		key: "EQUIPMENT_PICK_UP_DATE_TIME_PLANNED",
	},
	{
		name: "Equipment positioning date/time, actual",
		value: "394",
		description:
			"Date/time on which equipment was actually positioned (delivered).",
		key: "EQUIPMENT_POSITIONING_DATE_TIME_ACTUAL",
	},
	{
		name: "Equipment positioning date/time, estimated",
		value: "395",
		description:
			"Date/time on which equipment is estimated to be positioned (delivered).",
		key: "EQUIPMENT_POSITIONING_DATE_TIME_ESTIMATED",
	},
	{
		name: "Equipment positioning date/time, requested",
		value: "396",
		description:
			"Date/time on which equipment is requested to be positioned (delivered).",
		key: "EQUIPMENT_POSITIONING_DATE_TIME_REQUESTED",
	},
	{
		name: "Equipment positioning date/time, ultimate",
		value: "397",
		description:
			"Date/time on which equipment should be positioned (delivered) at the latest.",
		key: "EQUIPMENT_POSITIONING_DATE_TIME_ULTIMATE",
	},
	{
		name: "Goods collection or pick-up date/time, planned",
		value: "398",
		description:
			"Date/time at which goods can be picked up, according to a planning.",
		key: "GOODS_COLLECTION_OR_PICK_UP_DATE_TIME_PLANNED",
	},
	{
		name: "Goods positioning date/time, expected",
		value: "399",
		description: "Date/time on which goods are expected to be positioned.",
		key: "GOODS_POSITIONING_DATE_TIME_EXPECTED",
	},
	{
		name: "Cargo release date/time, ultimate",
		value: "400",
		description:
			"Ultimate date/time at which goods or equipment should be released.",
		key: "CARGO_RELEASE_DATE_TIME_ULTIMATE",
	},
	{
		name: "Container Safety Convention (CSC) plate expiration date",
		value: "401",
		description:
			"Date on which the validity of a Container Safety Convention (CSC) plate expires.",
		key: "CONTAINER_SAFETY_CONVENTION_CSC_PLATE_EXPIRATION_DATE",
	},
	{
		name: "Document received date/time",
		value: "402",
		description: "Date/time on which the document was actually received.",
		key: "DOCUMENT_RECEIVED_DATE_TIME",
	},
	{
		name: "Discharge date/time, actual",
		value: "403",
		description:
			"Date/time when the specified goods or transport equipment has or have been discharged from the means of transport.",
		key: "DISCHARGE_DATE_TIME_ACTUAL",
	},
	{
		name: "Transport means loading date/time, actual",
		value: "404",
		description:
			"Date/time when the specified goods or transport equipment has or have been loaded in or on the means of transport.",
		key: "TRANSPORT_MEANS_LOADING_DATE_TIME_ACTUAL",
	},
	{
		name: "Equipment pick-up date / time, actual",
		value: "405",
		description:
			"[2123] Date/time on which the equipment was actually collected.",
		key: "EQUIPMENT_PICK_UP_DATE_TIME_ACTUAL",
	},
	{
		name: "Goods positioning date/time, planned",
		value: "406",
		description:
			"The date/time on which the goods will be positioned according to a planning.",
		key: "GOODS_POSITIONING_DATE_TIME_PLANNED",
	},
	{
		name: "Document requested date/time",
		value: "407",
		description: "Date/time on which the document is requested by a party.",
		key: "DOCUMENT_REQUESTED_DATE_TIME",
	},
	{
		name: "Expected container hire from date/time",
		value: "408",
		description:
			"Estimated date and time when the containers are expected to go on-hire.",
		key: "EXPECTED_CONTAINER_HIRE_FROM_DATE_TIME",
	},
	{
		name: "Order completion date/time, ultimate",
		value: "409",
		description:
			"Date/time on which the order should be completed at the latest.",
		key: "ORDER_COMPLETION_DATE_TIME_ULTIMATE",
	},
	{
		name: "Equipment repair ready date/time, ultimate",
		value: "410",
		description:
			"Ultimate date/time on which a piece of equipment must be repaired.",
		key: "EQUIPMENT_REPAIR_READY_DATE_TIME_ULTIMATE",
	},
	{
		name: "Container stuffing date/time, ultimate",
		value: "411",
		description:
			"Date/time on which the container stuffing should be completed at the latest.",
		key: "CONTAINER_STUFFING_DATE_TIME_ULTIMATE",
	},
	{
		name: "Container stripping date/time, ultimate",
		value: "412",
		description:
			"Date/time on which the container stripping should be completed at the latest.",
		key: "CONTAINER_STRIPPING_DATE_TIME_ULTIMATE",
	},
	{
		name: "Discharge and loading completed date/time",
		value: "413",
		description:
			"Date/time when all discharge and loading operations on the transport means have been completed.",
		key: "DISCHARGE_AND_LOADING_COMPLETED_DATE_TIME",
	},
	{
		name: "Equipment stock check date/time",
		value: "414",
		description:
			"Date/time on which equipment has been ascertained as being in stock.",
		key: "EQUIPMENT_STOCK_CHECK_DATE_TIME",
	},
	{
		name: "Activity reporting date",
		value: "415",
		description: "The date applicable to the activity being reported.",
		key: "ACTIVITY_REPORTING_DATE",
	},
	{
		name: "Submission date",
		value: "416",
		description: "The date of a submission.",
		key: "SUBMISSION_DATE",
	},
	{
		name: "Previous booking date/time",
		value: "417",
		description: "Date/time at which the previous booking was made.",
		key: "PREVIOUS_BOOKING_DATE_TIME",
	},
	{
		name: "Minimum shelf life remaining at time of receipt",
		value: "418",
		description: "The minimum shelf life remaining at the time of receipt.",
		key: "MINIMUM_SHELF_LIFE_REMAINING_AT_TIME_OF_RECEIPT",
	},
	{
		name: "Forecast period",
		value: "419",
		description: "A period for which a forecast applies.",
		key: "FORECAST_PERIOD",
	},
	{
		name: "Unloaded, date and time",
		value: "420",
		description:
			"To report the date and time that an unloading action occurred.",
		key: "UNLOADED_DATE_AND_TIME",
	},
	{
		name: "Estimated acceptance date",
		value: "421",
		description: "To estimate the date of acceptance.",
		key: "ESTIMATED_ACCEPTANCE_DATE",
	},
	{
		name: "Documentary credit issue date",
		value: "422",
		description: "The date the documentary credit has been issued.",
		key: "DOCUMENTARY_CREDIT_ISSUE_DATE",
	},
	{
		name: "First date of ordering",
		value: "423",
		description: "The first date on which ordering may take place.",
		key: "FIRST_DATE_OF_ORDERING",
	},
	{
		name: "Last date of ordering",
		value: "424",
		description: "The last date on which ordering may take place.",
		key: "LAST_DATE_OF_ORDERING",
	},
	{
		name: "Original posting date",
		value: "425",
		description: "Date when the entry was originally posted.",
		key: "ORIGINAL_POSTING_DATE",
	},
	{
		name: "Reinsurance payment frequency",
		value: "426",
		description: "The frequency of payments of reinsurance premiums.",
		key: "REINSURANCE_PAYMENT_FREQUENCY",
	},
	{
		name: "Adjusted age",
		value: "427",
		description: "The adjusted age used for purposes of calculation.",
		key: "ADJUSTED_AGE",
	},
	{
		name: "Original issue age",
		value: "428",
		description: "The original issue age.",
		key: "ORIGINAL_ISSUE_AGE",
	},
	{
		name: "Coverage duration",
		value: "429",
		description: "The period coverage has been in force.",
		key: "COVERAGE_DURATION",
	},
	{
		name: "Coverage issue date",
		value: "430",
		description: "Date from which the anniversary coverage is measured.",
		key: "COVERAGE_ISSUE_DATE",
	},
	{
		name: "Flat extra period",
		value: "431",
		description: "Period for charging the additional extra.",
		key: "FLAT_EXTRA_PERIOD",
	},
	{
		name: "Paid to date",
		value: "432",
		description: "Date to which payments have been paid.",
		key: "PAID_TO_DATE",
	},
	{
		name: "Reinsurance coverage duration",
		value: "433",
		description: "The period for which reinsurance coverage has been in force.",
		key: "REINSURANCE_COVERAGE_DURATION",
	},
	{
		name: "Maturity date",
		value: "434",
		description: "Date at which maturity occurs.",
		key: "MATURITY_DATE",
	},
	{
		name: "Reinsurance issue age",
		value: "435",
		description: "The actual or equivalent age at time of issue.",
		key: "REINSURANCE_ISSUE_AGE",
	},
	{
		name: "Reinsurance paid-up date",
		value: "436",
		description: "The date up to which the reinsurance has been paid.",
		key: "REINSURANCE_PAID_UP_DATE",
	},
	{
		name: "Benefit period",
		value: "437",
		description: "The period of time for which benefits are provided.",
		key: "BENEFIT_PERIOD",
	},
	{
		name: "Disability wait period",
		value: "438",
		description:
			"The period of time the insured must be disabled before reinsurance coverage becomes effective.",
		key: "DISABILITY_WAIT_PERIOD",
	},
	{
		name: "Deferred Period",
		value: "439",
		description: "The period of time for which an activity has been postponed.",
		key: "DEFERRED_PERIOD",
	},
	{
		name: "Documentary credit amendment date",
		value: "440",
		description: "Date of amendment of a documentary credit.",
		key: "DOCUMENTARY_CREDIT_AMENDMENT_DATE",
	},
	{
		name: "Last on hire date",
		value: "441",
		description: "Date the item was last placed on hire.",
		key: "LAST_ON_HIRE_DATE",
	},
	{
		name: "Last off hire date",
		value: "442",
		description: "Date the item was last returned from hire.",
		key: "LAST_OFF_HIRE_DATE",
	},
	{
		name: "Direct interchange date",
		value: "443",
		description: "Date the item was directly interchanged.",
		key: "DIRECT_INTERCHANGE_DATE",
	},
	{
		name: "Approval date",
		value: "444",
		description: "Date of approval.",
		key: "APPROVAL_DATE",
	},
	{
		name: "Original estimate date",
		value: "445",
		description: "The date of the original estimate.",
		key: "ORIGINAL_ESTIMATE_DATE",
	},
	{
		name: "Revised estimate date",
		value: "446",
		description: "The date the estimate was revised.",
		key: "REVISED_ESTIMATE_DATE",
	},
	{
		name: "Creditor's requested value date",
		value: "447",
		description: "Date on which the creditor requests to be credited.",
		key: "CREDITOR_S_REQUESTED_VALUE_DATE",
	},
	{
		name: "Referenced item creation date",
		value: "448",
		description: "Creation date of referenced item.",
		key: "REFERENCED_ITEM_CREATION_DATE",
	},
	{
		name: "Date for the last update",
		value: "449",
		description: "Date for the last update.",
		key: "DATE_FOR_THE_LAST_UPDATE",
	},
	{
		name: "Opening date",
		value: "450",
		description: "Date of opening.",
		key: "OPENING_DATE",
	},
	{
		name: "Source document capture date",
		value: "451",
		description:
			"Date source document data is entered into a business application.",
		key: "SOURCE_DOCUMENT_CAPTURE_DATE",
	},
	{
		name: "Trial balance period",
		value: "452",
		description: "Period covered by the trial balance.",
		key: "TRIAL_BALANCE_PERIOD",
	},
	{
		name: "Date of source document",
		value: "453",
		description: "The date of the source document.",
		key: "DATE_OF_SOURCE_DOCUMENT",
	},
	{
		name: "Accounting value date",
		value: "454",
		description: "Date against which the entry has to be legally allocated.",
		key: "ACCOUNTING_VALUE_DATE",
	},
	{
		name: "Expected value date",
		value: "455",
		description:
			"Date on which the funds are expected to be at the disposal of the beneficiary.",
		key: "EXPECTED_VALUE_DATE",
	},
	{
		name: "Chart of account period",
		value: "456",
		description: "Period covered by the chart of account.",
		key: "CHART_OF_ACCOUNT_PERIOD",
	},
	{
		name: "Date of separation",
		value: "457",
		description: "Date of marital separation.",
		key: "DATE_OF_SEPARATION",
	},
	{
		name: "Date of divorce",
		value: "458",
		description: "Date when two married persons are officially divorced.",
		key: "DATE_OF_DIVORCE",
	},
	{
		name: "Date of marriage",
		value: "459",
		description: "Date when two persons are married.",
		key: "DATE_OF_MARRIAGE",
	},
	{
		name: "Wage period, start date",
		value: "460",
		description: "Date when a period of wage begins.",
		key: "WAGE_PERIOD_START_DATE",
	},
	{
		name: "Wage period, end date",
		value: "461",
		description: "Date when a period of wage ends.",
		key: "WAGE_PERIOD_END_DATE",
	},
	{
		name: "Working period, start date",
		value: "462",
		description: "Date when a period of work begins.",
		key: "WORKING_PERIOD_START_DATE",
	},
	{
		name: "Working period, end date",
		value: "463",
		description: "Date when a period of work ends.",
		key: "WORKING_PERIOD_END_DATE",
	},
	{
		name: "Embarkation date and time",
		value: "464",
		description: "Date and time at which crew and/or passengers board.",
		key: "EMBARKATION_DATE_AND_TIME",
	},
	{
		name: "Disembarkation date and time",
		value: "465",
		description: "Date and time at which crew and/or passengers disembark.",
		key: "DISEMBARKATION_DATE_AND_TIME",
	},
	{
		name: "Time now date",
		value: "466",
		description: "A time now date used for planning and scheduling purposes.",
		key: "TIME_NOW_DATE",
	},
	{
		name: "Holiday",
		value: "467",
		description: "A date or period that is a break from work.",
		key: "HOLIDAY",
	},
	{
		name: "Non working",
		value: "468",
		description: "To specify a non working date or period.",
		key: "NON_WORKING",
	},
	{
		name: "Start date or time, earliest",
		value: "469",
		description: "The earliest date or time for starting.",
		key: "START_DATE_OR_TIME_EARLIEST",
	},
	{
		name: "Start date or time, latest",
		value: "470",
		description: "The latest date or time for starting.",
		key: "START_DATE_OR_TIME_LATEST",
	},
	{
		name: "Finish date or time, earliest",
		value: "471",
		description: "The earliest date or time for finishing.",
		key: "FINISH_DATE_OR_TIME_EARLIEST",
	},
	{
		name: "Finish date or time, latest",
		value: "472",
		description: "The latest date or time for finishing.",
		key: "FINISH_DATE_OR_TIME_LATEST",
	},
	{
		name: "Start date or time, mandatory",
		value: "473",
		description: "The mandatory date or time for starting.",
		key: "START_DATE_OR_TIME_MANDATORY",
	},
	{
		name: "Finish date or time, mandatory",
		value: "474",
		description: "The mandatory date or time for finishing.",
		key: "FINISH_DATE_OR_TIME_MANDATORY",
	},
	{
		name: "Start date or time, actual",
		value: "475",
		description: "The actual date or time for starting.",
		key: "START_DATE_OR_TIME_ACTUAL",
	},
	{
		name: "Start date or time, estimated",
		value: "476",
		description: "The estimated date or time for starting.",
		key: "START_DATE_OR_TIME_ESTIMATED",
	},
	{
		name: "Completion date or time, estimated",
		value: "477",
		description: "The estimated date or time for completion.",
		key: "COMPLETION_DATE_OR_TIME_ESTIMATED",
	},
	{
		name: "Start date or time, scheduled",
		value: "478",
		description: "The scheduled date or time for starting.",
		key: "START_DATE_OR_TIME_SCHEDULED",
	},
	{
		name: "Completion date or time, scheduled",
		value: "479",
		description: "The scheduled date or time for completion.",
		key: "COMPLETION_DATE_OR_TIME_SCHEDULED",
	},
	{
		name: "Start date or time, not before",
		value: "480",
		description: "The not before date or time for starting.",
		key: "START_DATE_OR_TIME_NOT_BEFORE",
	},
	{
		name: "Start date or time, not after",
		value: "481",
		description: "The not after date or time for starting.",
		key: "START_DATE_OR_TIME_NOT_AFTER",
	},
	{
		name: "Completion date or time, not before",
		value: "482",
		description: "The not before date or time for completion.",
		key: "COMPLETION_DATE_OR_TIME_NOT_BEFORE",
	},
	{
		name: "Completion date or time, not after",
		value: "483",
		description: "The not after date or time for completion.",
		key: "COMPLETION_DATE_OR_TIME_NOT_AFTER",
	},
	{
		name: "Illness recovery date, expected",
		value: "484",
		description: "Date when a person is expected to recover from illness.",
		key: "ILLNESS_RECOVERY_DATE_EXPECTED",
	},
	{
		name: "Period of illness, start date",
		value: "485",
		description: "Date when a period of illness began.",
		key: "PERIOD_OF_ILLNESS_START_DATE",
	},
	{
		name: "Period of illness, end date",
		value: "486",
		description: "Date when a period of illness ends.",
		key: "PERIOD_OF_ILLNESS_END_DATE",
	},
	{
		name: "Decease date",
		value: "487",
		description: "Date when a person died.",
		key: "DECEASE_DATE",
	},
	{
		name: "Benefit period, start date",
		value: "488",
		description: "Date when a period of benefit begins.",
		key: "BENEFIT_PERIOD_START_DATE",
	},
	{
		name: "Benefit period, end date",
		value: "489",
		description: "Date when a period of benefit ends.",
		key: "BENEFIT_PERIOD_END_DATE",
	},
	{
		name: "Selection period, start date",
		value: "490",
		description: "Date when a period of selection begins.",
		key: "SELECTION_PERIOD_START_DATE",
	},
	{
		name: "Selection period, end date",
		value: "491",
		description: "Date when a period of selection ends.",
		key: "SELECTION_PERIOD_END_DATE",
	},
	{
		name: "Balance date/time/period",
		value: "492",
		description: "The date/time/period of a balance.",
		key: "BALANCE_DATE_TIME_PERIOD",
	},
	{
		name: "Benefit payments termination date",
		value: "493",
		description: "To identify the date on which benefit payments have ceased.",
		key: "BENEFIT_PAYMENTS_TERMINATION_DATE",
	},
	{
		name: "Covered income period",
		value: "494",
		description:
			"To identify the period over which covered income is measured.",
		key: "COVERED_INCOME_PERIOD",
	},
	{
		name: "Current income period",
		value: "495",
		description:
			"To identify the period over which current income is measured.",
		key: "CURRENT_INCOME_PERIOD",
	},
	{
		name: "Reinstatement date",
		value: "496",
		description: "Identifies the date of reinstatement.",
		key: "REINSTATEMENT_DATE",
	},
	{
		name: "Definition of disability duration",
		value: "497",
		description:
			"To identify the period for which the definition of disability applies.",
		key: "DEFINITION_OF_DISABILITY_DURATION",
	},
	{
		name: "Previous termination date",
		value: "498",
		description: "Identifies the date of the previous termination.",
		key: "PREVIOUS_TERMINATION_DATE",
	},
	{
		name: "Premium change period",
		value: "499",
		description: "To identify the period of the premium change.",
		key: "PREMIUM_CHANGE_PERIOD",
	},
	{
		name: "Off-hire survey date",
		value: "500",
		description:
			"Date on which the equipment was surveyed at the end of the current leasing period.",
		key: "OFF_HIRE_SURVEY_DATE",
	},
	{
		name: "In service survey date",
		value: "501",
		description: "Date of survey of equipment while in use.",
		key: "IN_SERVICE_SURVEY_DATE",
	},
	{
		name: "On hire survey date",
		value: "502",
		description:
			"Date on which the equipment was surveyed at the beginning of the current leasing period.",
		key: "ON_HIRE_SURVEY_DATE",
	},
	{
		name: "Production inspection date",
		value: "503",
		description: "Date of production inspection.",
		key: "PRODUCTION_INSPECTION_DATE",
	},
	{
		name: "Overtime, start date",
		value: "504",
		description: "Date when a period of overtime begins.",
		key: "OVERTIME_START_DATE",
	},
	{
		name: "Overtime, end date",
		value: "505",
		description: "Date when a period of overtime ends.",
		key: "OVERTIME_END_DATE",
	},
	{
		name: "Back order delivery date/time/period",
		value: "506",
		description:
			"The date/time/period during which the delivery of a back order will take, or has taken, place.",
		key: "BACK_ORDER_DELIVERY_DATE_TIME_PERIOD",
	},
	{
		name: "Negotiations start date",
		value: "507",
		description: "The date on which negotiations started.",
		key: "NEGOTIATIONS_START_DATE",
	},
	{
		name: "Work effective start date",
		value: "508",
		description: "The date on which work will effectively start.",
		key: "WORK_EFFECTIVE_START_DATE",
	},
	{
		name: "Notification time limit",
		value: "510",
		description:
			"The time limit which has been set for a notification to take place.",
		key: "NOTIFICATION_TIME_LIMIT",
	},
	{
		name: "Time limit",
		value: "511",
		description: "The time limit in which an event must take place.",
		key: "TIME_LIMIT",
	},
	{
		name: "Attendance date and or time and or period",
		value: "512",
		description: "Date and or time and or period of attendance.",
		key: "ATTENDANCE_DATE_AND_OR_TIME_AND_OR_PERIOD",
	},
	{
		name: "Accident date and or time",
		value: "513",
		description: "Date and or time when an accident occurred.",
		key: "ACCIDENT_DATE_AND_OR_TIME",
	},
	{
		name: "Adoption date, actual",
		value: "514",
		description: "Actual date when adoption occurs.",
		key: "ADOPTION_DATE_ACTUAL",
	},
	{
		name: "Reimbursement claim issue date and or time",
		value: "515",
		description: "Date and or time when a reimbursement claim is issued.",
		key: "REIMBURSEMENT_CLAIM_ISSUE_DATE_AND_OR_TIME",
	},
	{
		name: "Hospital admission date and or time",
		value: "516",
		description: "Date and or time of admission to a hospital.",
		key: "HOSPITAL_ADMISSION_DATE_AND_OR_TIME",
	},
	{
		name: "Hospital discharge date and or time",
		value: "517",
		description: "Date and or time of discharge from a hospital.",
		key: "HOSPITAL_DISCHARGE_DATE_AND_OR_TIME",
	},
	{
		name: "Period of care start date and or time",
		value: "518",
		description: "Date and or time when a period of care starts.",
		key: "PERIOD_OF_CARE_START_DATE_AND_OR_TIME",
	},
	{
		name: "Period of care end date and or time",
		value: "519",
		description: "Date and or time when a period of care ends.",
		key: "PERIOD_OF_CARE_END_DATE_AND_OR_TIME",
	},
	{
		name: "Department admission date and or time",
		value: "520",
		description: "Date and or time of admission to a department.",
		key: "DEPARTMENT_ADMISSION_DATE_AND_OR_TIME",
	},
	{
		name: "Department discharge date and or time",
		value: "521",
		description: "Date and or time of discharge from a department.",
		key: "DEPARTMENT_DISCHARGE_DATE_AND_OR_TIME",
	},
	{
		name: "Childbirth date and or time, actual",
		value: "522",
		description: "Actual date and or time of childbirth.",
		key: "CHILDBIRTH_DATE_AND_OR_TIME_ACTUAL",
	},
	{
		name: "Prescription issue date and or time",
		value: "523",
		description: "Date and or time when a prescription was issued.",
		key: "PRESCRIPTION_ISSUE_DATE_AND_OR_TIME",
	},
	{
		name: "Prescription dispensing date and or time",
		value: "524",
		description: "Date and or time when a prescription was dispensed.",
		key: "PRESCRIPTION_DISPENSING_DATE_AND_OR_TIME",
	},
	{
		name: "Clinical examination date and or time",
		value: "525",
		description: "Date and or time of clinical examination.",
		key: "CLINICAL_EXAMINATION_DATE_AND_OR_TIME",
	},
	{
		name: "Death date and or time",
		value: "526",
		description: "Date and or time of death.",
		key: "DEATH_DATE_AND_OR_TIME",
	},
	{
		name: "Childbirth date, estimated",
		value: "527",
		description: "Estimated date of childbirth.",
		key: "CHILDBIRTH_DATE_ESTIMATED",
	},
	{
		name: "Last menstrual cycle, start date",
		value: "528",
		description: "Date when the last menstrual cycle started.",
		key: "LAST_MENSTRUAL_CYCLE_START_DATE",
	},
	{
		name: "Pregnancy duration, actual",
		value: "529",
		description: "Actual duration of pregnancy.",
		key: "PREGNANCY_DURATION_ACTUAL",
	},
	{
		name: "Fumigation date and/or time",
		value: "530",
		description:
			"The date/or time on which fumigation is to occur or has taken place.",
		key: "FUMIGATION_DATE_AND_OR_TIME",
	},
	{
		name: "Payment period",
		value: "531",
		description:
			"A period of time in which a payment has been or will be made.",
		key: "PAYMENT_PERIOD",
	},
	{
		name: "Average delivery delay",
		value: "532",
		description: "The average delay between deliveries.",
		key: "AVERAGE_DELIVERY_DELAY",
	},
	{
		name: "Budget line application date",
		value: "533",
		description:
			"The date on which something has been applied to a budget line.",
		key: "BUDGET_LINE_APPLICATION_DATE",
	},
	{
		name: "Date of repair or service",
		value: "534",
		description: "The date of a repair or service.",
		key: "DATE_OF_REPAIR_OR_SERVICE",
	},
	{
		name: "Date of product failure",
		value: "535",
		description: "The date the product failed.",
		key: "DATE_OF_PRODUCT_FAILURE",
	},
	{
		name: "Review date",
		value: "536",
		description: "Date the item was or will be reviewed.",
		key: "REVIEW_DATE",
	},
	{
		name: "International review cycle start date",
		value: "537",
		description: "Date the international review cycle starts.",
		key: "INTERNATIONAL_REVIEW_CYCLE_START_DATE",
	},
	{
		name: "International assessment approval for publication date",
		value: "538",
		description:
			"Date the Data Maintenance Request (DMR) was approved for publication after completing international review.",
		key: "INTERNATIONAL_ASSESSMENT_APPROVAL_FOR_PUBLICATION_DATE",
	},
	{
		name: "Status assignment date",
		value: "539",
		description: "Date a status was assigned.",
		key: "STATUS_ASSIGNMENT_DATE",
	},
	{
		name: "Instruction's original execution date",
		value: "540",
		description: "Original execution date for the instruction.",
		key: "INSTRUCTION_S_ORIGINAL_EXECUTION_DATE",
	},
	{
		name: "First published date",
		value: "541",
		description: "Date when material was first published.",
		key: "FIRST_PUBLISHED_DATE",
	},
	{
		name: "Last published date",
		value: "542",
		description: "Date when material was last published.",
		key: "LAST_PUBLISHED_DATE",
	},
	{
		name: "Balance sheet date, latest",
		value: "543",
		description: "Date of the latest balance sheet.",
		key: "BALANCE_SHEET_DATE_LATEST",
	},
	{
		name: "Security share price as of given date",
		value: "544",
		description: "Date of the security share price.",
		key: "SECURITY_SHARE_PRICE_AS_OF_GIVEN_DATE",
	},
	{
		name: "Assigned date",
		value: "545",
		description: "Date when assigned.",
		key: "ASSIGNED_DATE",
	},
	{
		name: "Business opened date",
		value: "546",
		description: "Date opened for business.",
		key: "BUSINESS_OPENED_DATE",
	},
	{
		name: "Initial financial accounts filed date",
		value: "547",
		description: "Date when the initial financial accounts were filed.",
		key: "INITIAL_FINANCIAL_ACCOUNTS_FILED_DATE",
	},
	{
		name: "Stop work as of given date",
		value: "548",
		description: "Date work stopped or will stop.",
		key: "STOP_WORK_AS_OF_GIVEN_DATE",
	},
	{
		name: "Completion date",
		value: "549",
		description: "Date of completion.",
		key: "COMPLETION_DATE",
	},
	{
		name: "Lease term, start date",
		value: "550",
		description: "Start date of the lease term.",
		key: "LEASE_TERM_START_DATE",
	},
	{
		name: "Lease term, end date",
		value: "551",
		description: "End date of the lease term.",
		key: "LEASE_TERM_END_DATE",
	},
	{
		name: "Start date, actual",
		value: "552",
		description: "Actual date of start.",
		key: "START_DATE_ACTUAL",
	},
	{
		name: "Start date, estimated",
		value: "553",
		description: "Date of estimated start.",
		key: "START_DATE_ESTIMATED",
	},
	{
		name: "Filed date",
		value: "554",
		description: "Date when filed.",
		key: "FILED_DATE",
	},
	{
		name: "Return to work date",
		value: "555",
		description: "Date of return to work.",
		key: "RETURN_TO_WORK_DATE",
	},
	{
		name: "Purchased date",
		value: "556",
		description: "Date of purchase.",
		key: "PURCHASED_DATE",
	},
	{
		name: "Returned date",
		value: "557",
		description: "Date return takes place.",
		key: "RETURNED_DATE",
	},
	{
		name: "Changed date",
		value: "558",
		description: "Date change takes place.",
		key: "CHANGED_DATE",
	},
	{
		name: "Terminated date",
		value: "559",
		description: "Date termination takes place.",
		key: "TERMINATED_DATE",
	},
	{
		name: "Evaluation date",
		value: "560",
		description: "Date evaluation takes place.",
		key: "EVALUATION_DATE",
	},
	{
		name: "Business termination date",
		value: "561",
		description: "Date the business terminates.",
		key: "BUSINESS_TERMINATION_DATE",
	},
	{
		name: "Release from bankruptcy date",
		value: "562",
		description: "Date when an entity is released from bankruptcy status.",
		key: "RELEASE_FROM_BANKRUPTCY_DATE",
	},
	{
		name: "Placement date, initial",
		value: "563",
		description: "Date of initial placement.",
		key: "PLACEMENT_DATE_INITIAL",
	},
	{
		name: "Signature date",
		value: "564",
		description: "Date of signature.",
		key: "SIGNATURE_DATE",
	},
	{
		name: "Bankruptcy filed date",
		value: "565",
		description: "Date when bankruptcy was filed.",
		key: "BANKRUPTCY_FILED_DATE",
	},
	{
		name: "End date, scheduled",
		value: "566",
		description: "Date when activity is scheduled to end.",
		key: "END_DATE_SCHEDULED",
	},
	{
		name: "Report period",
		value: "567",
		description: "Period covered by the report.",
		key: "REPORT_PERIOD",
	},
	{
		name: "Suspended date",
		value: "568",
		description: "Date of suspension.",
		key: "SUSPENDED_DATE",
	},
	{
		name: "Renewal date",
		value: "569",
		description: "Date of renewal.",
		key: "RENEWAL_DATE",
	},
	{
		name: "Reported date",
		value: "570",
		description: "Date when reported.",
		key: "REPORTED_DATE",
	},
	{
		name: "Checked date",
		value: "571",
		description: "Date when checked.",
		key: "CHECKED_DATE",
	},
	{
		name: "Present residence, start date",
		value: "572",
		description: "The beginning date of residence at present location.",
		key: "PRESENT_RESIDENCE_START_DATE",
	},
	{
		name: "Employment position, start date",
		value: "573",
		description: "The start date of employment in a particular position.",
		key: "EMPLOYMENT_POSITION_START_DATE",
	},
	{
		name: "Account closed date",
		value: "574",
		description: "Date when account was closed.",
		key: "ACCOUNT_CLOSED_DATE",
	},
	{
		name: "Construction date, actual",
		value: "575",
		description: "Date of actual construction.",
		key: "CONSTRUCTION_DATE_ACTUAL",
	},
	{
		name: "Employment profession start date",
		value: "576",
		description: "Start date of employment in a particular profession.",
		key: "EMPLOYMENT_PROFESSION_START_DATE",
	},
	{
		name: "Next review date",
		value: "577",
		description: "Date of next review.",
		key: "NEXT_REVIEW_DATE",
	},
	{
		name: "Meeting date",
		value: "578",
		description: "Date of the meeting.",
		key: "MEETING_DATE",
	},
	{
		name: "Administrator ordered date",
		value: "579",
		description: "Date when an administrator is ordered for a company.",
		key: "ADMINISTRATOR_ORDERED_DATE",
	},
	{
		name: "Last date to file a claim",
		value: "580",
		description: "Date after which no claim can be filed.",
		key: "LAST_DATE_TO_FILE_A_CLAIM",
	},
	{
		name: "Convicted date",
		value: "581",
		description: "Date when convicted.",
		key: "CONVICTED_DATE",
	},
	{
		name: "Interviewed date",
		value: "582",
		description: "Date of an interview.",
		key: "INTERVIEWED_DATE",
	},
	{
		name: "Last visit date",
		value: "583",
		description: "Date of last visit.",
		key: "LAST_VISIT_DATE",
	},
	{
		name: "Future period",
		value: "584",
		description: "Period in the future.",
		key: "FUTURE_PERIOD",
	},
	{
		name: "Preceding period",
		value: "585",
		description: "Period preceding current period.",
		key: "PRECEDING_PERIOD",
	},
	{
		name: "Expected problem resolution date",
		value: "586",
		description: "Date when problem is expected to be resolved.",
		key: "EXPECTED_PROBLEM_RESOLUTION_DATE",
	},
	{
		name: "Action date",
		value: "587",
		description: "Date of action.",
		key: "ACTION_DATE",
	},
	{
		name: "Accountant's opinion date",
		value: "588",
		description: "Date of an accountant's opinion.",
		key: "ACCOUNTANT_S_OPINION_DATE",
	},
	{
		name: "Last activity date",
		value: "589",
		description: "Date of last activity.",
		key: "LAST_ACTIVITY_DATE",
	},
	{
		name: "Resolved date",
		value: "590",
		description: "Date when resolved.",
		key: "RESOLVED_DATE",
	},
	{
		name: "Recorded date",
		value: "591",
		description: "Date when recorded.",
		key: "RECORDED_DATE",
	},
	{
		name: "Date of birth, estimated",
		value: "592",
		description: "The estimated date of birth.",
		key: "DATE_OF_BIRTH_ESTIMATED",
	},
	{
		name: "Last annual report date",
		value: "593",
		description: "Date of the last annual report.",
		key: "LAST_ANNUAL_REPORT_DATE",
	},
	{
		name: "Net worth date",
		value: "594",
		description: "Date of net worth.",
		key: "NET_WORTH_DATE",
	},
	{
		name: "Payment cancellation rejected",
		value: "595",
		description:
			"Date/time when a cancellation of a payment is rejected due to the fact that the payment is already done.",
		key: "PAYMENT_CANCELLATION_REJECTED",
	},
	{
		name: "Profit period",
		value: "596",
		description: "Period over which profit was earned.",
		key: "PROFIT_PERIOD",
	},
	{
		name: "Registration date",
		value: "597",
		description: "Date when registered.",
		key: "REGISTRATION_DATE",
	},
	{
		name: "Consolidation date",
		value: "598",
		description: "Date when consolidation occurred.",
		key: "CONSOLIDATION_DATE",
	},
	{
		name: "Board of directors not authorised as of given date",
		value: "599",
		description: "As of this date the board of directors is not authorised.",
		key: "BOARD_OF_DIRECTORS_NOT_AUTHORISED_AS_OF_GIVEN_DATE",
	},
	{
		name: "Board of directors not complete as of given date",
		value: "600",
		description: "As of this date the board of directors is not fully filled.",
		key: "BOARD_OF_DIRECTORS_NOT_COMPLETE_AS_OF_GIVEN_DATE",
	},
	{
		name: "Manager not registered as of given date",
		value: "601",
		description: "As of this date the manager is not registered.",
		key: "MANAGER_NOT_REGISTERED_AS_OF_GIVEN_DATE",
	},
	{
		name: "Citizenship change date",
		value: "602",
		description: "Date of citizenship change.",
		key: "CITIZENSHIP_CHANGE_DATE",
	},
	{
		name: "Participation date",
		value: "603",
		description: "Date of participation.",
		key: "PARTICIPATION_DATE",
	},
	{
		name: "Capitalisation date",
		value: "604",
		description: "Date of capitalisation.",
		key: "CAPITALISATION_DATE",
	},
	{
		name: "Board of directors registration date",
		value: "605",
		description: "Date when the board of directors was registered.",
		key: "BOARD_OF_DIRECTORS_REGISTRATION_DATE",
	},
	{
		name: "Operations ceased date",
		value: "606",
		description: "Date when operations ceased.",
		key: "OPERATIONS_CEASED_DATE",
	},
	{
		name: "Satisfaction date",
		value: "607",
		description: "Date when satisfaction was obtained.",
		key: "SATISFACTION_DATE",
	},
	{
		name: "Legal settlement terms met date",
		value: "608",
		description: "Date when terms specified in the legal settlement were met.",
		key: "LEGAL_SETTLEMENT_TERMS_MET_DATE",
	},
	{
		name: "Business control change date",
		value: "609",
		description: "Date when a new authority took control.",
		key: "BUSINESS_CONTROL_CHANGE_DATE",
	},
	{
		name: "Court registration date",
		value: "610",
		description: "Date of registration in the court.",
		key: "COURT_REGISTRATION_DATE",
	},
	{
		name: "Annual report due date",
		value: "611",
		description: "Date when annual report is due.",
		key: "ANNUAL_REPORT_DUE_DATE",
	},
	{
		name: "Asset and liability schedule date",
		value: "612",
		description: "Date of the asset and liability schedule.",
		key: "ASSET_AND_LIABILITY_SCHEDULE_DATE",
	},
	{
		name: "Annual report mailing date",
		value: "613",
		description: "Date when the annual report was mailed.",
		key: "ANNUAL_REPORT_MAILING_DATE",
	},
	{
		name: "Annual report filing date",
		value: "614",
		description: "Date when the annual report was filed.",
		key: "ANNUAL_REPORT_FILING_DATE",
	},
	{
		name: "Annual report delinquent on date",
		value: "615",
		description: "Date when annual report was considered delinquent.",
		key: "ANNUAL_REPORT_DELINQUENT_ON_DATE",
	},
	{
		name: "Accounting methodology change date",
		value: "616",
		description: "Date when accounting methodology was changed.",
		key: "ACCOUNTING_METHODOLOGY_CHANGE_DATE",
	},
	{
		name: "Closed until date",
		value: "617",
		description: "Date when again open.",
		key: "CLOSED_UNTIL_DATE",
	},
	{
		name: "Conversion into holding company date",
		value: "618",
		description: "Date business was converted into a holding company.",
		key: "CONVERSION_INTO_HOLDING_COMPANY_DATE",
	},
	{
		name: "Deed not available as of given date",
		value: "619",
		description: "Date when deed was not available.",
		key: "DEED_NOT_AVAILABLE_AS_OF_GIVEN_DATE",
	},
	{
		name: "Detrimental information receipt date",
		value: "620",
		description: "Date when detrimental information was received.",
		key: "DETRIMENTAL_INFORMATION_RECEIPT_DATE",
	},
	{
		name: "Construction date, estimated",
		value: "621",
		description: "Estimated date of construction.",
		key: "CONSTRUCTION_DATE_ESTIMATED",
	},
	{
		name: "Financial information date",
		value: "622",
		description: "Date of the financial information.",
		key: "FINANCIAL_INFORMATION_DATE",
	},
	{
		name: "Graduation date",
		value: "623",
		description: "Date when graduation occurs.",
		key: "GRADUATION_DATE",
	},
	{
		name: "Insolvency discharge granted date",
		value: "624",
		description: "Date when insolvency discharge was granted.",
		key: "INSOLVENCY_DISCHARGE_GRANTED_DATE",
	},
	{
		name: "Incorporation date",
		value: "625",
		description: "Date of incorporation.",
		key: "INCORPORATION_DATE",
	},
	{
		name: "Inactivity end date",
		value: "626",
		description: "Date when inactivity ends.",
		key: "INACTIVITY_END_DATE",
	},
	{
		name: "Last check for balance sheet update date",
		value: "627",
		description:
			"Date balance sheet was last checked to determine if update had taken place.",
		key: "LAST_CHECK_FOR_BALANCE_SHEET_UPDATE_DATE",
	},
	{
		name: "Last capital change date",
		value: "628",
		description: "Date of last capital change.",
		key: "LAST_CAPITAL_CHANGE_DATE",
	},
	{
		name: "Letter of agreement date",
		value: "629",
		description: "Date of a letter of agreement.",
		key: "LETTER_OF_AGREEMENT_DATE",
	},
	{
		name: "Letter of liability date",
		value: "630",
		description: "Date of a letter of liability.",
		key: "LETTER_OF_LIABILITY_DATE",
	},
	{
		name: "Liquidation date",
		value: "631",
		description: "Date of liquidation.",
		key: "LIQUIDATION_DATE",
	},
	{
		name: "Lowest activity period",
		value: "632",
		description: "Period of lowest activity.",
		key: "LOWEST_ACTIVITY_PERIOD",
	},
	{
		name: "Legal structure change date",
		value: "633",
		description: "Date when legal structure was changed.",
		key: "LEGAL_STRUCTURE_CHANGE_DATE",
	},
	{
		name: "Current name effective date",
		value: "634",
		description: "Date when current name became effective.",
		key: "CURRENT_NAME_EFFECTIVE_DATE",
	},
	{
		name: "Not registered as of given date",
		value: "635",
		description: "Date when not yet registered.",
		key: "NOT_REGISTERED_AS_OF_GIVEN_DATE",
	},
	{
		name: "Current authority control start date",
		value: "636",
		description: "Date when current authority took control.",
		key: "CURRENT_AUTHORITY_CONTROL_START_DATE",
	},
	{
		name: "Privilege details verification date",
		value: "637",
		description: "Date when privilege details were verified.",
		key: "PRIVILEGE_DETAILS_VERIFICATION_DATE",
	},
	{
		name: "Current legal structure effective date",
		value: "638",
		description: "Date when current legal structure became effective.",
		key: "CURRENT_LEGAL_STRUCTURE_EFFECTIVE_DATE",
	},
	{
		name: "Peak activity period",
		value: "639",
		description: "Period of peak activity.",
		key: "PEAK_ACTIVITY_PERIOD",
	},
	{
		name: "Presentation to bankruptcy receivers date",
		value: "640",
		description: "Date when presented to the bankruptcy receivers.",
		key: "PRESENTATION_TO_BANKRUPTCY_RECEIVERS_DATE",
	},
	{
		name: "Resignation date",
		value: "641",
		description: "Date of resignation.",
		key: "RESIGNATION_DATE",
	},
	{
		name: "Legal action closed date",
		value: "642",
		description: "Date when the legal action was closed.",
		key: "LEGAL_ACTION_CLOSED_DATE",
	},
	{
		name: "Mail receipt date",
		value: "643",
		description: "Date mail was received.",
		key: "MAIL_RECEIPT_DATE",
	},
	{
		name: "Social security claims verification date",
		value: "644",
		description: "Date when social security claims were verified.",
		key: "SOCIAL_SECURITY_CLAIMS_VERIFICATION_DATE",
	},
	{
		name: "Sole directorship registration date",
		value: "645",
		description: "Date when sole directorship was registered.",
		key: "SOLE_DIRECTORSHIP_REGISTRATION_DATE",
	},
	{
		name: "Trade style registration date",
		value: "646",
		description: "Date when trade style was registered.",
		key: "TRADE_STYLE_REGISTRATION_DATE",
	},
	{
		name: "Trial start date, scheduled",
		value: "647",
		description: "Date when a trial is scheduled to begin.",
		key: "TRIAL_START_DATE_SCHEDULED",
	},
	{
		name: "Trial start date, actual",
		value: "648",
		description: "Date when the trial actually started.",
		key: "TRIAL_START_DATE_ACTUAL",
	},
	{
		name: "Value Added Tax (VAT) claims verification date",
		value: "649",
		description: "Date when the Value Added Tax (VAT) claims were verified.",
		key: "VALUE_ADDED_TAX_VAT_CLAIMS_VERIFICATION_DATE",
	},
	{
		name: "Receivership result date",
		value: "650",
		description: "Date when the result of the receivership occurs.",
		key: "RECEIVERSHIP_RESULT_DATE",
	},
	{
		name: "Investigation end date",
		value: "651",
		description: "The date when an investigation ended.",
		key: "INVESTIGATION_END_DATE",
	},
	{
		name: "Employee temporary laid-off period end date",
		value: "652",
		description:
			"The ending date of a period in which employees were temporarily placed out of work.",
		key: "EMPLOYEE_TEMPORARY_LAID_OFF_PERIOD_END_DATE",
	},
	{
		name: "Investigation start date",
		value: "653",
		description: "The date when an investigation began.",
		key: "INVESTIGATION_START_DATE",
	},
	{
		name: "Income period",
		value: "654",
		description: "The period of time in which income is earned.",
		key: "INCOME_PERIOD",
	},
	{
		name: "Criminal sentence duration",
		value: "655",
		description: "The period of time over which a criminal sentence applies.",
		key: "CRIMINAL_SENTENCE_DURATION",
	},
	{
		name: "Age",
		value: "656",
		description:
			"Length of time that a person or animal has lived or a thing has existed.",
		key: "AGE",
	},
	{
		name: "Receivables collection period",
		value: "657",
		description:
			"The period of time over which receivable accounts are collected.",
		key: "RECEIVABLES_COLLECTION_PERIOD",
	},
	{
		name: "Comparison period",
		value: "658",
		description: "The time period covered in a comparison.",
		key: "COMPARISON_PERIOD",
	},
	{
		name: "Adjournment",
		value: "659",
		description: "The period of time over which an adjournment is in effect.",
		key: "ADJOURNMENT",
	},
	{
		name: "Court dismissal date",
		value: "660",
		description: "The date on which a court refused further hearing of a case.",
		key: "COURT_DISMISSAL_DATE",
	},
	{
		name: "Insufficient assets judgement date",
		value: "661",
		description: "The date on which assets were judged to be insufficient.",
		key: "INSUFFICIENT_ASSETS_JUDGEMENT_DATE",
	},
	{
		name: "Average payment period",
		value: "662",
		description: "The average period of time over which money has been paid.",
		key: "AVERAGE_PAYMENT_PERIOD",
	},
	{
		name: "Forecast period start",
		value: "663",
		description: "The beginning of a forecast period.",
		key: "FORECAST_PERIOD_START",
	},
	{
		name: "Period extended",
		value: "664",
		description:
			"Number of time units added to the original end date/time/period.",
		key: "PERIOD_EXTENDED",
	},
	{
		name: "Employee temporary laid-off period start date",
		value: "665",
		description:
			"The start date of a period in which employees were temporarily placed out of work.",
		key: "EMPLOYEE_TEMPORARY_LAID_OFF_PERIOD_START_DATE",
	},
	{
		name: "Management available date",
		value: "666",
		description: "Date when management is available.",
		key: "MANAGEMENT_AVAILABLE_DATE",
	},
	{
		name: "Withdrawn date",
		value: "667",
		description: "The date when something was retracted.",
		key: "WITHDRAWN_DATE",
	},
	{
		name: "Claim incurred date",
		value: "668",
		description: "The date that the claim was incurred.",
		key: "CLAIM_INCURRED_DATE",
	},
	{
		name: "Financial coverage period",
		value: "669",
		description: "The period of time for which financial coverage applies.",
		key: "FINANCIAL_COVERAGE_PERIOD",
	},
	{
		name: "Claim made date",
		value: "670",
		description: "The date on which a claim was made.",
		key: "CLAIM_MADE_DATE",
	},
	{
		name: "Stop distribution date",
		value: "671",
		description: "The date on which distribution is to stop.",
		key: "STOP_DISTRIBUTION_DATE",
	},
	{
		name: "Period assigned",
		value: "672",
		description: "The period assigned.",
		key: "PERIOD_ASSIGNED",
	},
	{
		name: "Lease period",
		value: "673",
		description: "The period associated with a lease.",
		key: "LEASE_PERIOD",
	},
	{
		name: "Forecast period end date",
		value: "674",
		description: "The ending date of a forecast period.",
		key: "FORECAST_PERIOD_END_DATE",
	},
	{
		name: "Judgement date",
		value: "675",
		description:
			"The date on which a decision from a court of law was rendered.",
		key: "JUDGEMENT_DATE",
	},
	{
		name: "Period worked for the company",
		value: "676",
		description: "Period of time that was worked for the company.",
		key: "PERIOD_WORKED_FOR_THE_COMPANY",
	},
	{
		name: "Transport equipment stuffing date and/or time",
		value: "677",
		description:
			"(2045) The date and/or time on which the stuffing of transport equipment is to or has taken place.",
		key: "TRANSPORT_EQUIPMENT_STUFFING_DATE_AND_OR_TIME",
	},
	{
		name: "Transport equipment stripping date and/or time",
		value: "678",
		description:
			"The date and/or time on which the stripping of a transport equipment is to or has taken place.",
		key: "TRANSPORT_EQUIPMENT_STRIPPING_DATE_AND_OR_TIME",
	},
	{
		name: "Initial request date",
		value: "679",
		description: "Date of an initial request.",
		key: "INITIAL_REQUEST_DATE",
	},
	{
		name: "Period overdue",
		value: "680",
		description: "The period by which an event is overdue.",
		key: "PERIOD_OVERDUE",
	},
	{
		name: "Implementation date/time/period",
		value: "681",
		description:
			"A date/time/period within which an implementation is to take place.",
		key: "IMPLEMENTATION_DATE_TIME_PERIOD",
	},
	{
		name: "Refusal period",
		value: "682",
		description: "The period within which a refusal can be made.",
		key: "REFUSAL_PERIOD",
	},
	{
		name: "Suspension period",
		value: "683",
		description: "The period for which something is suspended.",
		key: "SUSPENSION_PERIOD",
	},
	{
		name: "Deletion date",
		value: "684",
		description: "The date on which deletion occurs.",
		key: "DELETION_DATE",
	},
	{
		name: "First sale date and/or time and/or period",
		value: "685",
		description:
			"The first date, and/or time, and/or period a product was sold.",
		key: "FIRST_SALE_DATE_AND_OR_TIME_AND_OR_PERIOD",
	},
	{
		name: "Last sale date and/or time and/or period",
		value: "686",
		description:
			"The last date, and/or time, and/or period a product was sold.",
		key: "LAST_SALE_DATE_AND_OR_TIME_AND_OR_PERIOD",
	},
	{
		name: "Date ready for collection",
		value: "687",
		description: "A date on which an object is ready for collection.",
		key: "DATE_READY_FOR_COLLECTION",
	},
	{
		name: "Shipping date, no schedule established as of",
		value: "688",
		description:
			"As at this date no valid shipping schedule has been established.",
		key: "SHIPPING_DATE_NO_SCHEDULE_ESTABLISHED_AS_OF",
	},
	{
		name: "Shipping date and/or time, current schedule",
		value: "689",
		description: "Shipping date and/or time as currently scheduled.",
		key: "SHIPPING_DATE_AND_OR_TIME_CURRENT_SCHEDULE",
	},
	{
		name: "Suppliers' average credit period",
		value: "690",
		description:
			"The average period of time that credit is extended by suppliers.",
		key: "SUPPLIERS_AVERAGE_CREDIT_PERIOD",
	},
	{
		name: "Advising date",
		value: "691",
		description: "Date of advice.",
		key: "ADVISING_DATE",
	},
	{
		name: "Project over target baseline date",
		value: "692",
		description:
			"The date an over target baseline was implemented for a project.",
		key: "PROJECT_OVER_TARGET_BASELINE_DATE",
	},
	{
		name: "Established date",
		value: "693",
		description: "Date when an entity was established or created.",
		key: "ESTABLISHED_DATE",
	},
	{
		name: "Latest filing period",
		value: "694",
		description: "Latest period for which a filing may be made.",
		key: "LATEST_FILING_PERIOD",
	},
	{
		name: "Mailing date",
		value: "695",
		description: "Date when an item may be mailed.",
		key: "MAILING_DATE",
	},
	{
		name: "Date/time of latest accounts filing at public registry",
		value: "696",
		description:
			"The latest date/time when financial accounts were filed at public registry.",
		key: "DATE_TIME_OF_LATEST_ACCOUNTS_FILING_AT_PUBLIC_REGISTRY",
	},
	{
		name: "Date placed in disfavour",
		value: "697",
		description: "Date when placed in a disfavoured category or status.",
		key: "DATE_PLACED_IN_DISFAVOUR",
	},
	{
		name: "Employment position start date, estimated",
		value: "698",
		description: "Estimated start date of employment in a particular position.",
		key: "EMPLOYMENT_POSITION_START_DATE_ESTIMATED",
	},
	{
		name: "Registered contractor number assignment date, original",
		value: "699",
		description:
			"Date when a registered contractor number was originally assigned.",
		key: "REGISTERED_CONTRACTOR_NUMBER_ASSIGNMENT_DATE_ORIGINAL",
	},
	{
		name: "Ownership change date",
		value: "700",
		description: "Date when ownership changes.",
		key: "OWNERSHIP_CHANGE_DATE",
	},
	{
		name: "Original duration",
		value: "701",
		description: "Original length of time.",
		key: "ORIGINAL_DURATION",
	},
	{
		name: "Period between changes",
		value: "702",
		description: "The period of time between changes.",
		key: "PERIOD_BETWEEN_CHANGES",
	},
	{
		name: "From date of notice to proceed to commencement of",
		value: "703",
		description:
			"performance Period of time from notice to proceed until performance commencement.",
		key: "FROM_DATE_OF_NOTICE_TO_PROCEED_TO_COMMENCEMENT_OF",
	},
	{
		name: "From date of notice to proceed to completion",
		value: "704",
		description:
			"Period of time from date of notice to proceed until completion.",
		key: "FROM_DATE_OF_NOTICE_TO_PROCEED_TO_COMPLETION",
	},
	{
		name: "Period an event is late due to customer",
		value: "705",
		description:
			"The period of time an event is late due to the actions of a customer.",
		key: "PERIOD_AN_EVENT_IS_LATE_DUE_TO_CUSTOMER",
	},
	{
		name: "File generation date and/or time",
		value: "706",
		description: "Date and, or time of file generation.",
		key: "FILE_GENERATION_DATE_AND_OR_TIME",
	},
	{
		name: "Endorsed certificate issue date",
		value: "707",
		description:
			"Date on which a certificate, endorsed by signature or other agreed means, is issued.",
		key: "ENDORSED_CERTIFICATE_ISSUE_DATE",
	},
	{
		name: "Patient first visit for condition",
		value: "708",
		description:
			"The date of the first visit by a patient to a healthcare provider for this condition.",
		key: "PATIENT_FIRST_VISIT_FOR_CONDITION",
	},
	{
		name: "Admission date and/or time, expected",
		value: "709",
		description: "Expected date and/or time of admission.",
		key: "ADMISSION_DATE_AND_OR_TIME_EXPECTED",
	},
	{
		name: "Symptoms onset, patient alleged",
		value: "710",
		description:
			"Date and/or time of onset of symptoms according to the patient.",
		key: "SYMPTOMS_ONSET_PATIENT_ALLEGED",
	},
	{
		name: "Accident benefit period",
		value: "711",
		description:
			"To identify the period of time for which benefits are provided in the event of an accident.",
		key: "ACCIDENT_BENEFIT_PERIOD",
	},
	{
		name: "Accident benefit age limit",
		value: "712",
		description:
			"To identify the age to which benefits are provided to the insured in the event of an accident.",
		key: "ACCIDENT_BENEFIT_AGE_LIMIT",
	},
	{
		name: "Accident lifetime benefit qualification age",
		value: "713",
		description:
			"To identify the qualification age for lifetime benefits provided to the insured in the event of an accident.",
		key: "ACCIDENT_LIFETIME_BENEFIT_QUALIFICATION_AGE",
	},
	{
		name: "Sickness benefit period",
		value: "714",
		description:
			"To identify the period of time for which benefits are provided in the event of sickness.",
		key: "SICKNESS_BENEFIT_PERIOD",
	},
	{
		name: "Sickness benefit age limit",
		value: "715",
		description:
			"To identify the age to which benefits are provided to the insured in the event of sickness.",
		key: "SICKNESS_BENEFIT_AGE_LIMIT",
	},
	{
		name: "Sickness lifetime benefit qualification age",
		value: "716",
		description:
			"To identify the qualification age for lifetime benefits provided to the insured in the event of sickness.",
		key: "SICKNESS_LIFETIME_BENEFIT_QUALIFICATION_AGE",
	},
	{
		name: "Accident insurance elimination period",
		value: "717",
		description:
			"To identify the period of time the insured must be disabled in the event of an accident for benefits to be payable by the ceding company.",
		key: "ACCIDENT_INSURANCE_ELIMINATION_PERIOD",
	},
	{
		name: "Sickness insurance elimination period",
		value: "718",
		description:
			"The period of time the insured must be disabled in the event of sickness for benefits to be payable by the ceding company.",
		key: "SICKNESS_INSURANCE_ELIMINATION_PERIOD",
	},
	{
		name: "Provider signature date",
		value: "719",
		description: "Date when the provider signed.",
		key: "PROVIDER_SIGNATURE_DATE",
	},
	{
		name: "Condition initial treatment date",
		value: "720",
		description: "Date when initially treated for this condition.",
		key: "CONDITION_INITIAL_TREATMENT_DATE",
	},
	{
		name: "Information release authorization date",
		value: "721",
		description: "Date when the information was authorized to be released.",
		key: "INFORMATION_RELEASE_AUTHORIZATION_DATE",
	},
	{
		name: "Benefit release authorization date",
		value: "722",
		description: "Date when a benefit is authorized for release.",
		key: "BENEFIT_RELEASE_AUTHORIZATION_DATE",
	},
	{
		name: "Last seen date",
		value: "723",
		description: "The date when last seen.",
		key: "LAST_SEEN_DATE",
	},
	{
		name: "Acute manifestation date",
		value: "724",
		description:
			"The date the symptoms manifested themselves in an acute form.",
		key: "ACUTE_MANIFESTATION_DATE",
	},
	{
		name: "Similar illness onset date",
		value: "725",
		description:
			"The date of the onset of an illness similar to the illness currently being treated.",
		key: "SIMILAR_ILLNESS_ONSET_DATE",
	},
	{
		name: "Last X-ray date",
		value: "726",
		description: "The date the last X-ray was taken.",
		key: "LAST_X_RAY_DATE",
	},
	{
		name: "Placement date, previous",
		value: "727",
		description: "The date something was previously placed.",
		key: "PLACEMENT_DATE_PREVIOUS",
	},
	{
		name: "Placement date",
		value: "728",
		description: "The date something is placed.",
		key: "PLACEMENT_DATE",
	},
	{
		name: "Temporary prosthesis date",
		value: "729",
		description: "The date a temporary prosthetic device was provided.",
		key: "TEMPORARY_PROSTHESIS_DATE",
	},
	{
		name: "Orthodontic treatment period, remaining",
		value: "730",
		description:
			"The period of time that the orthodontic treatment has remaining.",
		key: "ORTHODONTIC_TREATMENT_PERIOD_REMAINING",
	},
	{
		name: "Orthodontic treatment period, total",
		value: "731",
		description: "The period of orthodontic treatment from beginning to end.",
		key: "ORTHODONTIC_TREATMENT_PERIOD_TOTAL",
	},
	{
		name: "Maximum credit granted date",
		value: "732",
		description: "Date on which the highest credit was granted.",
		key: "MAXIMUM_CREDIT_GRANTED_DATE",
	},
	{
		name: "Last date of accounts filed at public register",
		value: "733",
		description:
			"Date on which accounts were last filed at the public register.",
		key: "LAST_DATE_OF_ACCOUNTS_FILED_AT_PUBLIC_REGISTER",
	},
	{
		name: "Allowed renewal duration period",
		value: "734",
		description: "The period of time a company can renew its duration period.",
		key: "ALLOWED_RENEWAL_DURATION_PERIOD",
	},
	{
		name: "Offset from Coordinated Universal Time (UTC)",
		value: "735",
		description:
			"Number of hour's offset from Coordinated Universal Time (UTC).",
		key: "OFFSET_FROM_COORDINATED_UNIVERSAL_TIME_UTC",
	},
	{
		name: "Appointment expiry date",
		value: "736",
		description: "Date when an appointment will expire.",
		key: "APPOINTMENT_EXPIRY_DATE",
	},
	{
		name: "Earliest filing period",
		value: "737",
		description: "Earliest period for which a filing is made.",
		key: "EARLIEST_FILING_PERIOD",
	},
	{
		name: "Original name change date",
		value: "738",
		description: "Date when the original name was changed.",
		key: "ORIGINAL_NAME_CHANGE_DATE",
	},
	{
		name: "Education start date",
		value: "739",
		description: "Date education begins at an educational institution.",
		key: "EDUCATION_START_DATE",
	},
	{
		name: "Education end date",
		value: "740",
		description: "Date education is completed at an educational institution.",
		key: "EDUCATION_END_DATE",
	},
	{
		name: "Receivership period",
		value: "741",
		description: "Period of time a receivership lasts.",
		key: "RECEIVERSHIP_PERIOD",
	},
	{
		name: "Financial information submission date/time",
		value: "742",
		description: "Date/time when financial information is submitted.",
		key: "FINANCIAL_INFORMATION_SUBMISSION_DATE_TIME",
	},
	{
		name: "Purchase order latest possible change date",
		value: "743",
		description:
			"Date identifying a point of time after which a purchase order cannot be changed.",
		key: "PURCHASE_ORDER_LATEST_POSSIBLE_CHANGE_DATE",
	},
	{
		name: "Investment number allocation date",
		value: "744",
		description: "The date that an investment number was allocated.",
		key: "INVESTMENT_NUMBER_ALLOCATION_DATE",
	},
	{
		name: "Payment impossible",
		value: "745",
		description: "Date/time when a payment is recorded as being impossible.",
		key: "PAYMENT_IMPOSSIBLE",
	},
	{
		name: "Record extraction period",
		value: "746",
		description: "The period for extraction of records.",
		key: "RECORD_EXTRACTION_PERIOD",
	},
	{
		name: "Cost accounting value date",
		value: "747",
		description:
			"Code identifying the value date of cost accounting. Value date is the date at which the entry is to effect a balance of the account.",
		key: "COST_ACCOUNTING_VALUE_DATE",
	},
	{
		name: "Open period",
		value: "748",
		description:
			"Code identifying the period during which something is, was or will be open.",
		key: "OPEN_PERIOD",
	},
	{
		name: "Period between issue date and maturity date",
		value: "749",
		description:
			"Interval of time between the date when the transaction was initiated and the date when the funds need to be collected.",
		key: "PERIOD_BETWEEN_ISSUE_DATE_AND_MATURITY_DATE",
	},
	{
		name: "Before date",
		value: "750",
		description: "The specified before date.",
		key: "BEFORE_DATE",
	},
	{
		name: "After date",
		value: "751",
		description: "The specified after date.",
		key: "AFTER_DATE",
	},
	{
		name: "Meter reading date, next scheduled",
		value: "752",
		description:
			"Date on which the next reading of a meter is scheduled to take place.",
		key: "METER_READING_DATE_NEXT_SCHEDULED",
	},
	{
		name: "Maturity date, optimal",
		value: "753",
		description: "Date at which optimal maturity occurs.",
		key: "MATURITY_DATE_OPTIMAL",
	},
	{
		name: "Product ageing duration, maximum",
		value: "754",
		description: "Maximum period of time during which the product is ageing.",
		key: "PRODUCT_AGEING_DURATION_MAXIMUM",
	},
	{
		name: "Product ageing duration, minimum",
		value: "755",
		description: "Minimum period of time during which the product is ageing.",
		key: "PRODUCT_AGEING_DURATION_MINIMUM",
	},
	{
		name: "Ultimate documentation date/time for 24-hour rule",
		value: "756",
		description:
			"regulation of CBP (United States Customs and Border Protection) Ultimate date/time by which the documentation must be submitted in compliance with the 4-hour rule of United States Custom of Border Protection.",
		key: "ULTIMATE_DOCUMENTATION_DATE_TIME_FOR_24_HOUR_RULE",
	},
	{
		name: "Departure date/time from place of loading",
		value: "757",
		description:
			"Date/time of the departure of the goods from the place of loading.",
		key: "DEPARTURE_DATE_TIME_FROM_PLACE_OF_LOADING",
	},
	{
		name: "Trade item ship date/time, earliest possible",
		value: "758",
		description: "The earliest date/time that the trade item can be shipped.",
		key: "TRADE_ITEM_SHIP_DATE_TIME_EARLIEST_POSSIBLE",
	},
	{
		name: "Trade item ship date/time, latest possible",
		value: "759",
		description: "The latest date/time that the trade item can be shipped.",
		key: "TRADE_ITEM_SHIP_DATE_TIME_LATEST_POSSIBLE",
	},
	{
		name: "Start date/time, maximum buying quantity",
		value: "760",
		description:
			"The date/time from which the maximum buying quantity may be purchased.",
		key: "START_DATE_TIME_MAXIMUM_BUYING_QUANTITY",
	},
	{
		name: "Start date/time, minimum buying quantity",
		value: "761",
		description:
			"The date/time from which the minimum buying quantity may be purchased.",
		key: "START_DATE_TIME_MINIMUM_BUYING_QUANTITY",
	},
	{
		name: "Marketing campaign end date/time, suggested",
		value: "762",
		description:
			"The date and or time suggested for the marketing campaign to end.",
		key: "MARKETING_CAMPAIGN_END_DATE_TIME_SUGGESTED",
	},
	{
		name: "Marketing campaign start date/time, suggested",
		value: "763",
		description:
			"The date and or time suggested for the marketing campaign to start.",
		key: "MARKETING_CAMPAIGN_START_DATE_TIME_SUGGESTED",
	},
	{
		name: "Start availability date",
		value: "764",
		description: "The start date of availability.",
		key: "START_AVAILABILITY_DATE",
	},
	{
		name: "Seasonal availabilty calendar year",
		value: "765",
		description:
			"The calendar year of the season in which the trade item is available.",
		key: "SEASONAL_AVAILABILTY_CALENDAR_YEAR",
	},
	{
		name: "Goods pickup lead time",
		value: "766",
		description:
			"Minimum time required between order entry and goods release for pick-up.",
		key: "GOODS_PICKUP_LEAD_TIME",
	},
	{
		name: "Change date/time, latest",
		value: "767",
		description:
			"Most recent date and/or time that the information has been changed.",
		key: "CHANGE_DATE_TIME_LATEST",
	},
	{
		name: "End date/time, maximum buying quantity",
		value: "768",
		description:
			"The date and/or time until which the maximum buying quantity may be purchased.",
		key: "END_DATE_TIME_MAXIMUM_BUYING_QUANTITY",
	},
	{
		name: "End dat/time, minimum buying quantity",
		value: "769",
		description:
			"The date and/or time until which the minimum buying quantity may be purchased.",
		key: "END_DAT_TIME_MINIMUM_BUYING_QUANTITY",
	},
	{
		name: "End date/time of exclusivity",
		value: "770",
		description: "The date and/or time until which a product is exclusive.",
		key: "END_DATE_TIME_OF_EXCLUSIVITY",
	},
	{
		name: "Data release date",
		value: "771",
		description: "The date at which the data is released.",
		key: "DATA_RELEASE_DATE",
	},
	{
		name: "Handling start date and/or time, actual",
		value: "772",
		description:
			"The actual date and/or time when the start of the handling action takes place.",
		key: "HANDLING_START_DATE_AND_OR_TIME_ACTUAL",
	},
	{
		name: "Handling end date and/or time, estimated",
		value: "773",
		description:
			"The date and/or time when the end of the handling action is estimated to take place.",
		key: "HANDLING_END_DATE_AND_OR_TIME_ESTIMATED",
	},
	{
		name: "Handling end date and/or time, actual",
		value: "774",
		description:
			"The actual date and/or time when the end of the handling action takes place.",
		key: "HANDLING_END_DATE_AND_OR_TIME_ACTUAL",
	},
	{
		name: "Minimum product lifespan for consumer",
		value: "775",
		description:
			'The minimum life span of the product remaining after selling it to the consumer, i.e. between the "sell by date" and the "use by date" of the product.',
		key: "MINIMUM_PRODUCT_LIFESPAN_FOR_CONSUMER",
	},
	{
		name: "Entry date, elected",
		value: "776",
		description:
			"Date used at the discretion of the filer for duty calculation of non-quota goods when there is no immediate transport entry date (related to immediate delivery).",
		key: "ENTRY_DATE_ELECTED",
	},
	{
		name: "Arrival date/time at initial port with the intent to unload",
		value: "777",
		description:
			"Date/ time that the conveyance arrives at the initial port in the country of destination.",
		key: "ARRIVAL_DATE_TIME_AT_INITIAL_PORT_WITH_THE_INTENT_TO_UNLOAD",
	},
	{
		name: "Conveyance port activity date/ time",
		value: "778",
		description:
			"The date and time of conveyance activity, including cargo loading or unloading, fuelling etc.",
		key: "CONVEYANCE_PORT_ACTIVITY_DATE_TIME",
	},
	{
		name: "Date and time of importation into port limits",
		value: "779",
		description:
			"Date and time on which the conveyance transporting the goods from the foreign country arrived within the limits of the port of destination.",
		key: "DATE_AND_TIME_OF_IMPORTATION_INTO_PORT_LIMITS",
	},
	{
		name: "Free trade zone commodity status assignment date",
		value: "780",
		description:
			"The filing date that corresponds to the current status of the commodity in the free trade zone.",
		key: "FREE_TRADE_ZONE_COMMODITY_STATUS_ASSIGNMENT_DATE",
	},
	{
		name: "Jurisdiction entry date/time, actual",
		value: "781",
		description:
			"Actual date/time at which the conveyance or goods enter an agency's jurisdiction.",
		key: "JURISDICTION_ENTRY_DATE_TIME_ACTUAL",
	},
	{
		name: "Inspection start date/time",
		value: "782",
		description: "Date/time at which an inspection begins.",
		key: "INSPECTION_START_DATE_TIME",
	},
	{
		name: "Inspection end date/time",
		value: "783",
		description: "Date/time at which an inspection is completed.",
		key: "INSPECTION_END_DATE_TIME",
	},
	{
		name: "Document/message rejection date/time",
		value: "784",
		description: "Date/time at which the document/message was rejected.",
		key: "DOCUMENT_MESSAGE_REJECTION_DATE_TIME",
	},
	{
		name: "Government service date/time, requested",
		value: "785",
		description:
			"The date/time at which the government service is requested to be executed.",
		key: "GOVERNMENT_SERVICE_DATE_TIME_REQUESTED",
	},
	{
		name: "Crop year",
		value: "786",
		description: "The year that the crops were grown.",
		key: "CROP_YEAR",
	},
	{
		name: "Date of original manufacture",
		value: "787",
		description: "Date that the item was originally manufactured.",
		key: "DATE_OF_ORIGINAL_MANUFACTURE",
	},
	{
		name: "Model year",
		value: "788",
		description: "The model year of the item.",
		key: "MODEL_YEAR",
	},
	{
		name: "Opened trade item life span",
		value: "789",
		description:
			"The number of days the trade item that has been opened can remain on the shelf before it must be removed.",
		key: "OPENED_TRADE_ITEM_LIFE_SPAN",
	},
	{
		name: "Unmooring, date and time",
		value: "790",
		description: "Date and time of unmooring.",
		key: "UNMOORING_DATE_AND_TIME",
	},
	{
		name: "First crane lift",
		value: "791",
		description: "Date and time of the first crane lift.",
		key: "FIRST_CRANE_LIFT",
	},
	{
		name: "Last crane lift",
		value: "792",
		description: "Date and time of the last crane lift.",
		key: "LAST_CRANE_LIFT",
	},
	{
		name: "Reprocessing date/time",
		value: "793",
		description:
			"Date/time on which goods previously produced are re- processed.",
		key: "REPROCESSING_DATE_TIME",
	},
	{
		name: "First returnable date/time",
		value: "794",
		description: "The first date/time on or after which items can be returned.",
		key: "FIRST_RETURNABLE_DATE_TIME",
	},
	{
		name: "Community visibility date/time",
		value: "795",
		description:
			"The date/time from which information becomes visible to the target community.",
		key: "COMMUNITY_VISIBILITY_DATE_TIME",
	},
	{
		name: "Catch date/time",
		value: "796",
		description: "Date/time of catch.",
		key: "CATCH_DATE_TIME",
	},
	{
		name: "First freezing date",
		value: "797",
		description: "Date on which a product was first frozen.",
		key: "FIRST_FREEZING_DATE",
	},
	{
		name: "Verified gross mass determination date/time",
		value: "798",
		description:
			"Date/Time when a gross mass (weight) of a packed container was obtained according to SOLAS Chapter VI, Regulation 2, paragraphs 4-6.",
		key: "VERIFIED_GROSS_MASS_DETERMINATION_DATE_TIME",
	},
	{
		name: "Validity end date",
		value: "799",
		description: "The last date of a period for which something is valid.",
		key: "VALIDITY_END_DATE",
	},
	{
		name: "Next status report date",
		value: "800",
		description: "Date of the next status report.",
		key: "NEXT_STATUS_REPORT_DATE",
	},
	{
		name: "Service connection date/time, actual",
		value: "801",
		description:
			"The date/time on which a service was connected, e.g. telephone, water, etc.",
		key: "SERVICE_CONNECTION_DATE_TIME_ACTUAL",
	},
	{
		name: "Service disconnection date/time, actual",
		value: "802",
		description:
			"The date/time on which a service was disconnected, e.g. telephone, water, etc.",
		key: "SERVICE_DISCONNECTION_DATE_TIME_ACTUAL",
	},
	{
		name: "Empty equipment required date/time/period",
		value: "803",
		description: "Date/time/period on which empty equipment is required.",
		key: "EMPTY_EQUIPMENT_REQUIRED_DATE_TIME_PERIOD",
	},
	{
		name: "Product sterilisation date",
		value: "804",
		description: "Date on which a product was sterilised.",
		key: "PRODUCT_STERILISATION_DATE",
	},
	{
		name: "Stock demand cover period, expected",
		value: "805",
		description:
			"A period of time when all stocks are expected to cover demand for a product.",
		key: "STOCK_DEMAND_COVER_PERIOD_EXPECTED",
	},
	{
		name: "Shipment date/time, expected",
		value: "806",
		description: "Date and/or time when shipment is expected.",
		key: "SHIPMENT_DATE_TIME_EXPECTED",
	},
	{
		name: "Slaughtering date/time",
		value: "807",
		description: "Date/time of slaughtering.",
		key: "SLAUGHTERING_DATE_TIME",
	},
	{
		name: "Animal birth date/time",
		value: "808",
		description: "Date/time when an animal was born.",
		key: "ANIMAL_BIRTH_DATE_TIME",
	},
	{
		name: "Seasonal availability end date",
		value: "809",
		description:
			"Indicates the end date of the trade item's seasonal availability.",
		key: "SEASONAL_AVAILABILITY_END_DATE",
	},
	{
		name: "Verified gross mass cut-off date/time",
		value: "810",
		description:
			"Latest date/time by which the verified gross mass (such as VGM as per SOLAS) details must be provided to the carrier or to the terminal operator in order to enable loading of the transport equipment on the booked means of transport.",
		key: "VERIFIED_GROSS_MASS_CUT_OFF_DATE_TIME",
	},
	{
		name: "Dangerous goods acceptance cut-off date/time",
		value: "811",
		description:
			"Latest date/time after which no more Dangerous Goods cargo deliveries will be accepted at this location for loading on a particular booked means of transport.",
		key: "DANGEROUS_GOODS_ACCEPTANCE_CUT_OFF_DATE_TIME",
	},
	{
		name: "Out of gauge or break bulk acceptance cut-off date/time",
		value: "812",
		description:
			"Latest date/time after which no more Break Bulk cargo or Out Of Gauge transport equipment deliveries will be accepted at this location for loading on a booked means of transport.",
		key: "OUT_OF_GAUGE_OR_BREAK_BULK_ACCEPTANCE_CUT_OFF_DATE_TIME",
	},
	{
		name: "Reefer acceptance cut-off date/time",
		value: "813",
		description:
			"Latest date/time after which no more Temperature Controlled cargo deliveries will be accepted at this location for loading on a booked means of transport.",
		key: "REEFER_ACCEPTANCE_CUT_OFF_DATE_TIME",
	},
	{
		name: "Laden transport equipment acceptance cut-off date/time",
		value: "814",
		description:
			"Latest date/time after which no more laden transport equipment, such as FCL container, deliveries will be accepted at this location for loading on a booked means of transport.",
		key: "LADEN_TRANSPORT_EQUIPMENT_ACCEPTANCE_CUT_OFF_DATE_TIME",
	},
	{
		name: "Transshipment booking acceptance cut-off date/time",
		value: "815",
		description:
			"Date/time after which no more bookings for transshipment cargo will be accepted at this location for re-loading on a particular means of transport.",
		key: "TRANSSHIPMENT_BOOKING_ACCEPTANCE_CUT_OFF_DATE_TIME",
	},
	{
		name: "Ordered labour team start time",
		value: "816",
		description:
			"The date/time at which a party has ordered a labour team to be ready, e.g. for loading/unloading operations.",
		key: "ORDERED_LABOUR_TEAM_START_TIME",
	},
	{
		name: "Ordered labour team end time",
		value: "817",
		description:
			"The date/time until which a party has ordered a labour team to be ready, e.g. for loading/unloading operations.",
		key: "ORDERED_LABOUR_TEAM_END_TIME",
	},
	{
		name: "Means of transport ready for cargo operations date/time",
		value: "818",
		description:
			"Date/time when the means of transport is, or will be, ready for cargo operations.",
		key: "MEANS_OF_TRANSPORT_READY_FOR_CARGO_OPERATIONS_DATE_TIME",
	},
	{
		name: "Means of transport ready for departure date/time",
		value: "819",
		description:
			"Date/time when the means of transport is, or will be, ready for departure.",
		key: "MEANS_OF_TRANSPORT_READY_FOR_DEPARTURE_DATE_TIME",
	},
	{
		name: "Vessel arrival at pilot area date/time, estimated",
		value: "820",
		description: "Estimated date/time of vessel arrival at the pilot area.",
		key: "VESSEL_ARRIVAL_AT_PILOT_AREA_DATE_TIME_ESTIMATED",
	},
	{
		name: "Vessel arrival at pilot area date/time, actual",
		value: "821",
		description: "Actual date/time of vessel arrival at the pilot area.",
		key: "VESSEL_ARRIVAL_AT_PILOT_AREA_DATE_TIME_ACTUAL",
	},
	{
		name: "Delivery place booking date/time",
		value: "822",
		description: "Date/time at which a booking was made at the delivery place.",
		key: "DELIVERY_PLACE_BOOKING_DATE_TIME",
	},
	{
		name: "Pickup place booking date/time",
		value: "823",
		description: "Date/time at which a booking was made at the pickup place.",
		key: "PICKUP_PLACE_BOOKING_DATE_TIME",
	},
	{
		name: "Discharge date/time, ended",
		value: "824",
		description: "Date/time when discharge operations were ended",
		key: "DISCHARGE_DATE_TIME_ENDED",
	},
	{
		name: "Loading date/time, ended",
		value: "825",
		description: "Date/time when loading operations were ended",
		key: "LOADING_DATE_TIME_ENDED",
	},
	{
		name: "Loading date/time, started",
		value: "826",
		description: "Date/time when loading operations were started",
		key: "LOADING_DATE_TIME_STARTED",
	},
	{
		name: "Mutually defined",
		value: "ZZZ",
		description:
			"A code assigned within a code list to be used on an interim basis and as defined among trading partners until a precise code can be assigned to the code list. Data Element Cross Reference DataElement 2005 is used in the following Batch Composite Elements: C507 DataElement 2005 is used in the following Interactive Composite Elements: E013    E507 Copyright United Nations, all rights reserved     UN Economic Commission for Europe Palais des Nations, CH-1211 Geneva 10, Switzerland  Tel: +41-22 917 1366 Fax: +41-22 917 0037  E-mail: TradeMaster@unece.org UN/EDIFACT Directories",
		key: "MUTUALLY_DEFINED",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		untdid2005: typeof untdid2005;
	}
}
registerCodelist("untdid2005", untdid2005);

export default untdid2005;
