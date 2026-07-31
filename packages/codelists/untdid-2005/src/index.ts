import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid2005 = [
	{
		value: "1",
		name: "Service completion date/time, actual",
		description: "Actual date/time on which the service was completed.",
		key: "SERVICE_COMPLETION_DATE_TIME_ACTUAL",
	},
	{
		value: "2",
		name: "Delivery date/time, requested",
		description: "(2105) Date on which buyer requests goods to be delivered.",
		key: "DELIVERY_DATE_TIME_REQUESTED",
	},
	{
		value: "3",
		name: "Invoice document issue date time",
		description: "[2377] Date of issue of an invoice.",
		key: "INVOICE_DOCUMENT_ISSUE_DATE_TIME",
	},
	{
		value: "4",
		name: "Order document issue date time",
		description: "[2011] Date of order.",
		key: "ORDER_DOCUMENT_ISSUE_DATE_TIME",
	},
	{
		value: "5",
		name: "Saleable stock demand cover period, expected",
		description:
			"A period of time when saleable stocks are expected to cover demand for a product.",
		key: "SALEABLE_STOCK_DEMAND_COVER_PERIOD_EXPECTED",
	},
	{
		value: "6",
		name: "Moved from location date",
		description: "The date an entity moved from a location.",
		key: "MOVED_FROM_LOCATION_DATE",
	},
	{
		value: "7",
		name: "Effective from date/time",
		description:
			"(2069) Date and/or time at which specified event or document becomes effective.",
		key: "EFFECTIVE_FROM_DATE_TIME",
	},
	{
		value: "8",
		name: "Order received date/time",
		description: "Date/time when the purchase order is received by the seller.",
		key: "ORDER_RECEIVED_DATE_TIME",
	},
	{
		value: "9",
		name: "Processing date/time",
		description: "Date/time of processing.",
		key: "PROCESSING_DATE_TIME",
	},
	{
		value: "10",
		name: "Shipment date/time, requested",
		description:
			"Date on which goods should be shipped or despatched by the supplier.",
		key: "SHIPMENT_DATE_TIME_REQUESTED",
	},
	{
		value: "11",
		name: "Despatch date and or time",
		description:
			"[2171] Date/time on which the goods are or are expected to be despatched or shipped.",
		key: "DESPATCH_DATE_AND_OR_TIME",
	},
	{
		value: "12",
		name: "Terms discount due date/time",
		description:
			"Date by which payment should be made if discount terms are to apply.",
		key: "TERMS_DISCOUNT_DUE_DATE_TIME",
	},
	{
		value: "13",
		name: "Terms net due date",
		description: "Date by which payment must be made.",
		key: "TERMS_NET_DUE_DATE",
	},
	{
		value: "14",
		name: "Payment date/time, deferred",
		description: "Date/time when instalments are due.",
		key: "PAYMENT_DATE_TIME_DEFERRED",
	},
	{
		value: "15",
		name: "Promotion start date/time",
		description: "Date/time when promotion activities begin.",
		key: "PROMOTION_START_DATE_TIME",
	},
	{
		value: "16",
		name: "Promotion end date/time",
		description: "Date/time when promotion activities end.",
		key: "PROMOTION_END_DATE_TIME",
	},
	{
		value: "17",
		name: "Delivery date/time, estimated",
		description:
			"(2109) Date and/or time when the shipper of the goods expects delivery will take place.",
		key: "DELIVERY_DATE_TIME_ESTIMATED",
	},
	{
		value: "18",
		name: "Installation date/time/period",
		description:
			"The date/time/period of the act, or an instance of installing something or someone.",
		key: "INSTALLATION_DATE_TIME_PERIOD",
	},
	{
		value: "19",
		name: "Meat ageing period",
		description:
			"Period of time between slaughter and delivery during which meat is ageing.",
		key: "MEAT_AGEING_PERIOD",
	},
	{
		value: "20",
		name: "Cheque date/time",
		description: "Date/time when cheque is issued.",
		key: "CHEQUE_DATE_TIME",
	},
	{
		value: "21",
		name: "Charge back date/time",
		description: "The date/time of the charge back.",
		key: "CHARGE_BACK_DATE_TIME",
	},
	{
		value: "22",
		name: "Freight bill date/time",
		description: "Date/time when freight bill is issued.",
		key: "FREIGHT_BILL_DATE_TIME",
	},
	{
		value: "23",
		name: "Equipment reconditioning date/time, actual",
		description:
			"Actual date/time of the reconditioning of a piece of equipment.",
		key: "EQUIPMENT_RECONDITIONING_DATE_TIME_ACTUAL",
	},
	{
		value: "24",
		name: "Transfer note acceptance date and time",
		description:
			"Date and time when a transfer note (transfer document for transport exclusively using containers as equipment) is recognised as being valid by the carrier.",
		key: "TRANSFER_NOTE_ACCEPTANCE_DATE_AND_TIME",
	},
	{
		value: "35",
		name: "Delivery date/time, actual",
		description:
			"Date/time on which goods or consignment are delivered at their destination.",
		key: "DELIVERY_DATE_TIME_ACTUAL",
	},
	{
		value: "36",
		name: "Expiry date",
		description:
			"Date of expiry of the validity of a referenced document, price information or any other referenced data element with a limited validity period.",
		key: "EXPIRY_DATE",
	},
	{
		value: "37",
		name: "Ship not before date/time",
		description: "Goods should not be shipped before given date/time.",
		key: "SHIP_NOT_BEFORE_DATE_TIME",
	},
	{
		value: "38",
		name: "Ship not later than date/time",
		description: "Date/time by which the goods should have been shipped.",
		key: "SHIP_NOT_LATER_THAN_DATE_TIME",
	},
	{
		value: "39",
		name: "Ship week of date",
		description:
			"Date identifying the week during which goods should be shipped.",
		key: "SHIP_WEEK_OF_DATE",
	},
	{
		value: "40",
		name: "Clinical information issue date and/or time",
		description: "Date and/or time when clinical information is issued.",
		key: "CLINICAL_INFORMATION_ISSUE_DATE_AND_OR_TIME",
	},
	{
		value: "41",
		name: "Event duration, expected",
		description: "The expected duration of an event.",
		key: "EVENT_DURATION_EXPECTED",
	},
	{
		value: "42",
		name: "Superseded date/time",
		description: "Date/time being overlaid by a date given elsewhere.",
		key: "SUPERSEDED_DATE_TIME",
	},
	{
		value: "43",
		name: "Event duration, intended",
		description: "The intended duration of an event.",
		key: "EVENT_DURATION_INTENDED",
	},
	{
		value: "44",
		name: "Availability",
		description: "Date/time when received item is available.",
		key: "AVAILABILITY",
	},
	{
		value: "45",
		name: "Compilation date and time",
		description: "Date and time of the compilation.",
		key: "COMPILATION_DATE_AND_TIME",
	},
	{
		value: "46",
		name: "Cancellation date",
		description:
			"[2095] Date on which a document or message has been cancelled.",
		key: "CANCELLATION_DATE",
	},
	{
		value: "47",
		name: "Statistical time series date",
		description: "Date for statistical time series purposes.",
		key: "STATISTICAL_TIME_SERIES_DATE",
	},
	{ value: "48", name: "Duration", description: "Duration.", key: "DURATION" },
	{
		value: "49",
		name: "Deliver not before and not after dates",
		description: "Deliver not before and not after a specific date range.",
		key: "DELIVER_NOT_BEFORE_AND_NOT_AFTER_DATES",
	},
	{
		value: "50",
		name: "Goods receipt date/time",
		description:
			"Date/time upon which the goods were received by a given party.",
		key: "GOODS_RECEIPT_DATE_TIME",
	},
	{
		value: "51",
		name: "Cumulative quantity start date",
		description: "First Date for accumulation of delivery quantities.",
		key: "CUMULATIVE_QUANTITY_START_DATE",
	},
	{
		value: "52",
		name: "Cumulative quantity end date",
		description: "Last Date for accumulation of delivery quantities.",
		key: "CUMULATIVE_QUANTITY_END_DATE",
	},
	{
		value: "53",
		name: "Buyer's local time",
		description: "Time at the buyer's location.",
		key: "BUYER_S_LOCAL_TIME",
	},
	{
		value: "54",
		name: "Seller's local time",
		description: "Time at the seller's location.",
		key: "SELLER_S_LOCAL_TIME",
	},
	{
		value: "55",
		name: "Confirmed date/time",
		description: "Date/time which has been confirmed.",
		key: "CONFIRMED_DATE_TIME",
	},
	{
		value: "56",
		name: "Original authorisation date and/or time",
		description: "Date and/or time when original authorisation was issued.",
		key: "ORIGINAL_AUTHORISATION_DATE_AND_OR_TIME",
	},
	{
		value: "57",
		name: "Precaution relevant period",
		description: "The period when a precaution is relevant.",
		key: "PRECAUTION_RELEVANT_PERIOD",
	},
	{
		value: "58",
		name: "Clearance date (Customs)",
		description:
			"Date on which Customs formalities necessary to allow goods to be exported, to enter home use, or to be placed under another Customs procedure has been accomplished (CCC).",
		key: "CLEARANCE_DATE_CUSTOMS",
	},
	{
		value: "59",
		name: "Inbound movement authorization date",
		description: "Inland movement authorization date.",
		key: "INBOUND_MOVEMENT_AUTHORIZATION_DATE",
	},
	{
		value: "60",
		name: "Engineering change level date",
		description: "Date the engineering level of goods is changed.",
		key: "ENGINEERING_CHANGE_LEVEL_DATE",
	},
	{
		value: "61",
		name: "Cancel if not delivered by this date",
		description:
			"The date on which cancellation should take place, if delivery has not occurred.",
		key: "CANCEL_IF_NOT_DELIVERED_BY_THIS_DATE",
	},
	{
		value: "62",
		name: "Excluded date",
		description: "Date excluded from a period of time.",
		key: "EXCLUDED_DATE",
	},
	{
		value: "63",
		name: "Delivery date time, last",
		description: "[2025] Last date, and optionally time of a delivery.",
		key: "DELIVERY_DATE_TIME_LAST",
	},
	{
		value: "64",
		name: "Delivery date/time, earliest",
		description:
			"[2091] Date identifying a point in time before which the goods shall not be delivered.",
		key: "DELIVERY_DATE_TIME_EARLIEST",
	},
	{
		value: "65",
		name: "Delivery date/time, 1st schedule",
		description: "The first scheduled date/time for delivery.",
		key: "DELIVERY_DATE_TIME_1ST_SCHEDULE",
	},
	{
		value: "66",
		name: "Excluded period",
		description: "An interval of time excluded from a period of time.",
		key: "EXCLUDED_PERIOD",
	},
	{
		value: "67",
		name: "Delivery date/time, current schedule",
		description: "Delivery Date deriving from actual schedule.",
		key: "DELIVERY_DATE_TIME_CURRENT_SCHEDULE",
	},
	{
		value: "68",
		name: "Additional period",
		description: "An interval of time added to a period of time.",
		key: "ADDITIONAL_PERIOD",
	},
	{
		value: "69",
		name: "Delivery date time, promised before",
		description:
			"[2139] Date and optionally time by which the merchandise should be delivered to the buyer, as agreed between the seller and the buyer (generic term).",
		key: "DELIVERY_DATE_TIME_PROMISED_BEFORE",
	},
	{
		value: "70",
		name: "Additional date",
		description: "Date added to a period of time.",
		key: "ADDITIONAL_DATE",
	},
	{
		value: "71",
		name: "Delivery date/time, requested for (after and including)",
		description: "Delivery is requested to happen after or on given date.",
		key: "DELIVERY_DATE_TIME_REQUESTED_FOR_AFTER_AND_INCLUDING",
	},
	{
		value: "72",
		name: "Delivery date/time, promised for (after and including)",
		description: "Delivery might take place earliest at given date.",
		key: "DELIVERY_DATE_TIME_PROMISED_FOR_AFTER_AND_INCLUDING",
	},
	{
		value: "73",
		name: "Guarantee period",
		description: "The period for which the guarantee is or will be granted.",
		key: "GUARANTEE_PERIOD",
	},
	{
		value: "74",
		name: "Delivery date/time, requested for (prior to and including)",
		description:
			"Delivery is requested to happen prior to or including the given date.",
		key: "DELIVERY_DATE_TIME_REQUESTED_FOR_PRIOR_TO_AND_INCLUDING",
	},
	{
		value: "75",
		name: "Delivery date/time, promised for (prior to and including)",
		description: "Delivery might take place latest at given date.",
		key: "DELIVERY_DATE_TIME_PROMISED_FOR_PRIOR_TO_AND_INCLUDING",
	},
	{
		value: "76",
		name: "Delivery date/time, scheduled for",
		description: "The date/time for which delivery is scheduled.",
		key: "DELIVERY_DATE_TIME_SCHEDULED_FOR",
	},
	{
		value: "77",
		name: "Specification revision date",
		description: "Date of revision to a specification.",
		key: "SPECIFICATION_REVISION_DATE",
	},
	{
		value: "78",
		name: "Event date/time/period, actual",
		description: "[2193] The actual date/time/period an event occurred.",
		key: "EVENT_DATE_TIME_PERIOD_ACTUAL",
	},
	{
		value: "79",
		name: "Shipment date/time, promised for",
		description: "Shipment might happen at given date/time.",
		key: "SHIPMENT_DATE_TIME_PROMISED_FOR",
	},
	{
		value: "80",
		name: "Planning end date and/or time, actual",
		description: "The actual date and/or time the planning ended.",
		key: "PLANNING_END_DATE_AND_OR_TIME_ACTUAL",
	},
	{
		value: "81",
		name: "Shipment date/time, requested for (after and including)",
		description: "Shipment should happen earliest at given date.",
		key: "SHIPMENT_DATE_TIME_REQUESTED_FOR_AFTER_AND_INCLUDING",
	},
	{
		value: "82",
		name: "Medicine administration time",
		description: "Designated time of day for the administration of medicine.",
		key: "MEDICINE_ADMINISTRATION_TIME",
	},
	{
		value: "83",
		name: "Dispensing interval, minimum",
		description:
			"The shortest interval allowed between one dispensing of an item and the next dispensing of the same item.",
		key: "DISPENSING_INTERVAL_MINIMUM",
	},
	{
		value: "84",
		name: "Shipment date/time, requested for (prior to and including)",
		description: "Shipment should take place latest at given date.",
		key: "SHIPMENT_DATE_TIME_REQUESTED_FOR_PRIOR_TO_AND_INCLUDING",
	},
	{
		value: "85",
		name: "Shipment date/time, promised for (prior to and including)",
		description: "Shipment might take place latest at given date.",
		key: "SHIPMENT_DATE_TIME_PROMISED_FOR_PRIOR_TO_AND_INCLUDING",
	},
	{
		value: "86",
		name: "Medication date/time, start",
		description: "Date and/or time when medication was started.",
		key: "MEDICATION_DATE_TIME_START",
	},
	{
		value: "87",
		name: "Travel service connection time",
		description:
			"Time elapsing between the arrival of a travel service and the departure of a connecting travel service.",
		key: "TRAVEL_SERVICE_CONNECTION_TIME",
	},
	{
		value: "88",
		name: "Summer time, start",
		description: "Date/time at which the summer time starts.",
		key: "SUMMER_TIME_START",
	},
	{
		value: "89",
		name: "Inquiry date",
		description: "The date on which an inquiry is made.",
		key: "INQUIRY_DATE",
	},
	{
		value: "90",
		name: "Report start date",
		description: "The date on which a report is to begin.",
		key: "REPORT_START_DATE",
	},
	{
		value: "91",
		name: "Report end date",
		description: "The date on which a report is to end.",
		key: "REPORT_END_DATE",
	},
	{
		value: "92",
		name: "Contract effective date",
		description: "Date when a contract becomes valid.",
		key: "CONTRACT_EFFECTIVE_DATE",
	},
	{
		value: "93",
		name: "Contract expiry date",
		description: "Date when a contract expires.",
		key: "CONTRACT_EXPIRY_DATE",
	},
	{
		value: "94",
		name: "Production/manufacture date",
		description: "Date on which goods are produced.",
		key: "PRODUCTION_MANUFACTURE_DATE",
	},
	{
		value: "95",
		name: "Bill of lading date",
		description: "Date as specified on the bill of lading.",
		key: "BILL_OF_LADING_DATE",
	},
	{
		value: "96",
		name: "Discharge date/time",
		description:
			"Date/time when goods should, might or have been discharged from the means of transport.",
		key: "DISCHARGE_DATE_TIME",
	},
	{
		value: "97",
		name: "Transaction creation date",
		description:
			"The date on which a transaction was originated or brought into being.",
		key: "TRANSACTION_CREATION_DATE",
	},
	{
		value: "98",
		name: "Winter time, start",
		description: "Date/time at which the winter time starts.",
		key: "WINTER_TIME_START",
	},
	{
		value: "99",
		name: "Quotation opening date",
		description: "The date on which the quotation has been or may be opened.",
		key: "QUOTATION_OPENING_DATE",
	},
	{
		value: "100",
		name: "Product ageing period before delivery",
		description:
			"Period of time before delivery during which the product is ageing.",
		key: "PRODUCT_AGEING_PERIOD_BEFORE_DELIVERY",
	},
	{
		value: "101",
		name: "Production date, no schedule established as of",
		description: "Date as of there is no valid production schedule.",
		key: "PRODUCTION_DATE_NO_SCHEDULE_ESTABLISHED_AS_OF",
	},
	{
		value: "102",
		name: "Health problem period",
		description: "Period of time of health problem.",
		key: "HEALTH_PROBLEM_PERIOD",
	},
	{
		value: "103",
		name: "Closing date/time for breakbulk STORO",
		description:
			"Date/time on which delivering period for breakbulk STORO cargo ends (STORO = Stowing on Roll on-Roll off vessel).",
		key: "CLOSING_DATE_TIME_FOR_BREAKBULK_STORO",
	},
	{
		value: "104",
		name: "Closing date/time for container RO-RO",
		description:
			"Date/time on which delivering period for container Roll on-Roll off (RO-RO) cargo ends.",
		key: "CLOSING_DATE_TIME_FOR_CONTAINER_RO_RO",
	},
	{
		value: "105",
		name: "Starting date/time for breakbulk STORO",
		description:
			"Date/time on which delivering period for breakbulk STORO cargo starts (STORO = Stowing on Roll on-Roll off vessel).",
		key: "STARTING_DATE_TIME_FOR_BREAKBULK_STORO",
	},
	{
		value: "106",
		name: "Starting date/time for container RO-RO",
		description:
			"Date/time on which delivering period for container Roll on-Roll off (RO-RO) cargo starts.",
		key: "STARTING_DATE_TIME_FOR_CONTAINER_RO_RO",
	},
	{
		value: "107",
		name: "Deposit date/time",
		description: "The date/time on which a deposit was made.",
		key: "DEPOSIT_DATE_TIME",
	},
	{
		value: "108",
		name: "Postmark date/time",
		description:
			"An official mark stamped on a letter identifying date/time of dispatch or arrival.",
		key: "POSTMARK_DATE_TIME",
	},
	{
		value: "109",
		name: "Receive at lockbox date",
		description:
			"The date on which a financial institution, serving as collection agency for a company located in another part of the country, collects an amount of money on behalf of that company.",
		key: "RECEIVE_AT_LOCKBOX_DATE",
	},
	{
		value: "110",
		name: "Ship date, originally scheduled",
		description:
			"The date on which the shipment of goods was originally scheduled.",
		key: "SHIP_DATE_ORIGINALLY_SCHEDULED",
	},
	{
		value: "111",
		name: "Manifest/ship notice date",
		description: "The date of issuance of a manifest or ship notice.",
		key: "MANIFEST_SHIP_NOTICE_DATE",
	},
	{
		value: "112",
		name: "First interest-bearing date",
		description: "The first date from which interest is borne.",
		key: "FIRST_INTEREST_BEARING_DATE",
	},
	{
		value: "113",
		name: "Sample required date",
		description: "Date as of a sample has to be available customer defined.",
		key: "SAMPLE_REQUIRED_DATE",
	},
	{
		value: "114",
		name: "Tooling required date",
		description: "Date as of a tool has to be available customer defined.",
		key: "TOOLING_REQUIRED_DATE",
	},
	{
		value: "115",
		name: "Sample available date",
		description: "Date as of a sample will be available seller defined.",
		key: "SAMPLE_AVAILABLE_DATE",
	},
	{
		value: "116",
		name: "Equipment return period, expected",
		description: "Period until which equipment is expected to be hired.",
		key: "EQUIPMENT_RETURN_PERIOD_EXPECTED",
	},
	{
		value: "117",
		name: "Delivery date/time, first",
		description: "First possible date/time for delivery.",
		key: "DELIVERY_DATE_TIME_FIRST",
	},
	{
		value: "118",
		name: "Cargo booking confirmed date/time",
		description:
			"Date/time at which the cargo booking has been accepted by the carrier.",
		key: "CARGO_BOOKING_CONFIRMED_DATE_TIME",
	},
	{
		value: "119",
		name: "Test completion date",
		description: "Date when a test has been completed.",
		key: "TEST_COMPLETION_DATE",
	},
	{
		value: "120",
		name: "Last interest-bearing date",
		description: "The last date from which interest is borne.",
		key: "LAST_INTEREST_BEARING_DATE",
	},
	{
		value: "121",
		name: "Entry date",
		description: "Date of entry.",
		key: "ENTRY_DATE",
	},
	{
		value: "122",
		name: "Contract completion date",
		description: "The date a contract is completed.",
		key: "CONTRACT_COMPLETION_DATE",
	},
	{
		value: "123",
		name: "Documentary credit expiry date/time",
		description:
			"(2211) The latest date/time for presentation of the documents to the bank where the credit expires.",
		key: "DOCUMENTARY_CREDIT_EXPIRY_DATE_TIME",
	},
	{
		value: "124",
		name: "Despatch note document issue date time",
		description: "[2219] Issue date of a despatch note.",
		key: "DESPATCH_NOTE_DOCUMENT_ISSUE_DATE_TIME",
	},
	{
		value: "125",
		name: "Import permit issue date time",
		description: "[2293] Date of issue of an import licence.",
		key: "IMPORT_PERMIT_ISSUE_DATE_TIME",
	},
	{
		value: "126",
		name: "Contract document issue date time",
		description: "[2327] Date on which a contract is issued.",
		key: "CONTRACT_DOCUMENT_ISSUE_DATE_TIME",
	},
	{
		value: "127",
		name: "Previous report date",
		description: "Date of the previous report.",
		key: "PREVIOUS_REPORT_DATE",
	},
	{
		value: "128",
		name: "Delivery date/time, last",
		description:
			"Date when the last delivery should be or has been accomplished.",
		key: "DELIVERY_DATE_TIME_LAST",
	},
	{
		value: "129",
		name: "Exportation date",
		description:
			"[2043] Date when the imported vessel/merchandise last left the country of export for the country of import.",
		key: "EXPORTATION_DATE",
	},
	{
		value: "130",
		name: "Current report date",
		description: "Date of the current report.",
		key: "CURRENT_REPORT_DATE",
	},
	{
		value: "131",
		name: "Tax point date time",
		description: "[2221] Date on which tax is due or calculated.",
		key: "TAX_POINT_DATE_TIME",
	},
	{
		value: "132",
		name: "Transport means arrival date time, estimated",
		description:
			"[2349] Date and or time of the estimated arrival of means of transport.",
		key: "TRANSPORT_MEANS_ARRIVAL_DATE_TIME_ESTIMATED",
	},
	{
		value: "133",
		name: "Transport means departure date/time, estimated",
		description:
			"(2195) Date/time when carrier estimates that a means of transport should depart at the place of departure.",
		key: "TRANSPORT_MEANS_DEPARTURE_DATE_TIME_ESTIMATED",
	},
	{
		value: "134",
		name: "Rate of exchange date/time",
		description: "Date/time on which the exchange rate was fixed.",
		key: "RATE_OF_EXCHANGE_DATE_TIME",
	},
	{
		value: "135",
		name: "Telex date",
		description: "Date identifying when a telex message was sent.",
		key: "TELEX_DATE",
	},
	{
		value: "136",
		name: "Transport means departure date time, actual",
		description:
			"[2281] Date and or time of the departure of a means of transport.",
		key: "TRANSPORT_MEANS_DEPARTURE_DATE_TIME_ACTUAL",
	},
	{
		value: "137",
		name: "Document issue date time",
		description:
			"[2007] Date that a document was issued and when appropriate, signed or otherwise authenticated.",
		key: "DOCUMENT_ISSUE_DATE_TIME",
	},
	{
		value: "138",
		name: "Payment availability date time",
		description:
			"[2035] Date that an amount due becomes available to a creditor under the terms of payment.",
		key: "PAYMENT_AVAILABILITY_DATE_TIME",
	},
	{
		value: "139",
		name: "Property mortgage date, start",
		description: "The date the mortgage on a piece of property begins.",
		key: "PROPERTY_MORTGAGE_DATE_START",
	},
	{
		value: "140",
		name: "Payment due date",
		description: "[2481] Date/time at which funds should be made available.",
		key: "PAYMENT_DUE_DATE",
	},
	{
		value: "141",
		name: "Customs declaration document lodgement date time",
		description: "[2033] Presentation date of a declaration to customs.",
		key: "CUSTOMS_DECLARATION_DOCUMENT_LODGEMENT_DATE_TIME",
	},
	{
		value: "142",
		name: "Labour wage determination date",
		description: "The date a labour wage is determined.",
		key: "LABOUR_WAGE_DETERMINATION_DATE",
	},
	{
		value: "143",
		name: "Consignment acceptance date time, actual",
		description:
			"[2127] Actual date and optionally time when a consignment of goods is taken over by the carrier at the place of acceptance.",
		key: "CONSIGNMENT_ACCEPTANCE_DATE_TIME_ACTUAL",
	},
	{
		value: "144",
		name: "Quota date",
		description: "Date that the quota applies to.",
		key: "QUOTA_DATE",
	},
	{
		value: "145",
		name: "Event date",
		description: "A date specifying an event.",
		key: "EVENT_DATE",
	},
	{
		value: "146",
		name: "Entry date, estimated (Customs)",
		description:
			"Date on which the official date of Customs entry is anticipated.",
		key: "ENTRY_DATE_ESTIMATED_CUSTOMS",
	},
	{
		value: "147",
		name: "Export permit effective end date time",
		description: "[2079] Date on which an export licence expires.",
		key: "EXPORT_PERMIT_EFFECTIVE_END_DATE_TIME",
	},
	{
		value: "148",
		name: "Goods declaration document acceptance date time",
		description:
			"[2037] Date on which a Goods declaration has been or will be accepted by Customs in accordance with Customs legislation.",
		key: "GOODS_DECLARATION_DOCUMENT_ACCEPTANCE_DATE_TIME",
	},
	{
		value: "149",
		name: "Invoice date, required",
		description: "Date required for invoice issue.",
		key: "INVOICE_DATE_REQUIRED",
	},
	{
		value: "150",
		name: "Declaration/presentation date",
		description: "Date when item has been or has to be declared/presented.",
		key: "DECLARATION_PRESENTATION_DATE",
	},
	{
		value: "151",
		name: "Importation date",
		description:
			"Date on which goods are imported, as determined by the governing Customs administration.",
		key: "IMPORTATION_DATE",
	},
	{
		value: "152",
		name: "Exportation date for textiles",
		description:
			"Date when imported textiles last left the country of origin for the country of importation.",
		key: "EXPORTATION_DATE_FOR_TEXTILES",
	},
	{
		value: "153",
		name: "Cancellation date/time, latest",
		description:
			"The latest date/time on which cancellation of the payment order may be requested.",
		key: "CANCELLATION_DATE_TIME_LATEST",
	},
	{
		value: "154",
		name: "Acceptance date of document",
		description: "[2097] The date on which a document was accepted.",
		key: "ACCEPTANCE_DATE_OF_DOCUMENT",
	},
	{
		value: "155",
		name: "Accounting period start date",
		description: "The first date of an accounting period.",
		key: "ACCOUNTING_PERIOD_START_DATE",
	},
	{
		value: "156",
		name: "Accounting period end date",
		description: "The last date of an accounting period.",
		key: "ACCOUNTING_PERIOD_END_DATE",
	},
	{
		value: "157",
		name: "Validity start date",
		description: "The first date of a period for which something is valid.",
		key: "VALIDITY_START_DATE",
	},
	{
		value: "158",
		name: "Horizon start date",
		description: "The first date of a period forming a horizon.",
		key: "HORIZON_START_DATE",
	},
	{
		value: "159",
		name: "Horizon end date",
		description: "The last date of a period forming a horizon.",
		key: "HORIZON_END_DATE",
	},
	{
		value: "160",
		name: "Authorization date",
		description: "Date when an authorization was given.",
		key: "AUTHORIZATION_DATE",
	},
	{
		value: "161",
		name: "Release date of customer",
		description: "Date the customer authorised the goods' release.",
		key: "RELEASE_DATE_OF_CUSTOMER",
	},
	{
		value: "162",
		name: "Release date of supplier",
		description: "Date when the supplier released goods.",
		key: "RELEASE_DATE_OF_SUPPLIER",
	},
	{
		value: "163",
		name: "Processing start date/time",
		description: "Date/Time when a specific process starts.",
		key: "PROCESSING_START_DATE_TIME",
	},
	{
		value: "164",
		name: "Processing end date/time",
		description: "Date/Time when a specific process ends.",
		key: "PROCESSING_END_DATE_TIME",
	},
	{
		value: "165",
		name: "Tax period start date",
		description: "Date when a tax period begins.",
		key: "TAX_PERIOD_START_DATE",
	},
	{
		value: "166",
		name: "Tax period end date",
		description: "Date when a tax period ends.",
		key: "TAX_PERIOD_END_DATE",
	},
	{
		value: "167",
		name: "Charge period start date",
		description: "The charge period's first date.",
		key: "CHARGE_PERIOD_START_DATE",
	},
	{
		value: "168",
		name: "Charge period end date",
		description: "The charge period's last date.",
		key: "CHARGE_PERIOD_END_DATE",
	},
	{
		value: "169",
		name: "Lead time",
		description:
			"Time required between order entry till earliest goods delivery.",
		key: "LEAD_TIME",
	},
	{
		value: "170",
		name: "Settlement due date",
		description:
			"More generic than 'payment due date' and therefore more apt for reinsurance/insurance business.",
		key: "SETTLEMENT_DUE_DATE",
	},
	{
		value: "171",
		name: "Reference date/time",
		description: "Date/time on which the reference was issued.",
		key: "REFERENCE_DATE_TIME",
	},
	{
		value: "172",
		name: "Hired from date",
		description: "Date from which an item has been or will be hired.",
		key: "HIRED_FROM_DATE",
	},
	{
		value: "173",
		name: "Hired until date",
		description: "Date until which an item has been or will be hired.",
		key: "HIRED_UNTIL_DATE",
	},
	{
		value: "174",
		name: "Advise after date/time",
		description:
			"The information must be advised after the date/time indicated.",
		key: "ADVISE_AFTER_DATE_TIME",
	},
	{
		value: "175",
		name: "Advise before date/time",
		description:
			"The information must be advised before the date/time indicated.",
		key: "ADVISE_BEFORE_DATE_TIME",
	},
	{
		value: "176",
		name: "Advise completed date/time",
		description: "The advise has been completed at the date indicated.",
		key: "ADVISE_COMPLETED_DATE_TIME",
	},
	{
		value: "177",
		name: "Advise on date/time",
		description: "The information must be advised on the date/time indicated.",
		key: "ADVISE_ON_DATE_TIME",
	},
	{
		value: "178",
		name: "Transport means arrival date time, actual",
		description:
			"[2107] Date and or time of the arrival of means of transport.",
		key: "TRANSPORT_MEANS_ARRIVAL_DATE_TIME_ACTUAL",
	},
	{
		value: "179",
		name: "Booking date/time",
		description: "Date at which the booking was made.",
		key: "BOOKING_DATE_TIME",
	},
	{
		value: "180",
		name: "Closing date/time",
		description: "Final date for delivering cargo to a liner ship.",
		key: "CLOSING_DATE_TIME",
	},
	{
		value: "181",
		name: "Positioning date/time of equipment",
		description: "Date/time when equipment is positioned.",
		key: "POSITIONING_DATE_TIME_OF_EQUIPMENT",
	},
	{
		value: "182",
		name: "Issue date",
		description: "Date when a document/message has been or will be issued.",
		key: "ISSUE_DATE",
	},
	{
		value: "183",
		name: "Date, as at",
		description: "Date related to a given context.",
		key: "DATE_AS_AT",
	},
	{
		value: "184",
		name: "Notification date/time",
		description: "Date/time of notification.",
		key: "NOTIFICATION_DATE_TIME",
	},
	{
		value: "185",
		name: "Commenced tank cleaning date/time",
		description: "The date/and or time tank cleaning was started.",
		key: "COMMENCED_TANK_CLEANING_DATE_TIME",
	},
	{
		value: "186",
		name: "Transport means departure date/time, actual",
		description: "(2280) Date (and time) of departure of means of transport.",
		key: "TRANSPORT_MEANS_DEPARTURE_DATE_TIME_ACTUAL",
	},
	{
		value: "187",
		name: "Authentication date/time of document",
		description:
			"Date/time when the document is signed or otherwise authenticated.",
		key: "AUTHENTICATION_DATE_TIME_OF_DOCUMENT",
	},
	{
		value: "188",
		name: "Previous current account date",
		description: "Date of the previous current account.",
		key: "PREVIOUS_CURRENT_ACCOUNT_DATE",
	},
	{
		value: "189",
		name: "Transport means departure date/time, scheduled",
		description:
			"Date (and time) of scheduled departure of means of transport.",
		key: "TRANSPORT_MEANS_DEPARTURE_DATE_TIME_SCHEDULED",
	},
	{
		value: "190",
		name: "Transhipment date/time",
		description:
			"Date and time of the transfer of the goods from one means of transport to another.",
		key: "TRANSHIPMENT_DATE_TIME",
	},
	{
		value: "191",
		name: "Delivery date/time, expected",
		description: "Date/time on which goods are expected to be delivered.",
		key: "DELIVERY_DATE_TIME_EXPECTED",
	},
	{
		value: "192",
		name: "Expiration date/time of customs document",
		description: "Date on which validity of a customs document expires.",
		key: "EXPIRATION_DATE_TIME_OF_CUSTOMS_DOCUMENT",
	},
	{
		value: "193",
		name: "Execution date",
		description: "The date when ordered bank initiated the transaction.",
		key: "EXECUTION_DATE",
	},
	{
		value: "194",
		name: "Start date/time",
		description: "Date/time on which a period starts.",
		key: "START_DATE_TIME",
	},
	{
		value: "195",
		name: "Import permit effective end date time",
		description:
			"[2273] Date on which the validity of an import licence expires.",
		key: "IMPORT_PERMIT_EFFECTIVE_END_DATE_TIME",
	},
	{
		value: "196",
		name: "Transport means departure date/time, earliest",
		description: "Date/time of earliest departure of means of transport.",
		key: "TRANSPORT_MEANS_DEPARTURE_DATE_TIME_EARLIEST",
	},
	{
		value: "197",
		name: "Lay-time first day",
		description:
			"First of a number of days allowed in a charter party of the loading and discharging of cargo.",
		key: "LAY_TIME_FIRST_DAY",
	},
	{
		value: "198",
		name: "Lay-time last day",
		description:
			"Last of a number of days allowed in a charter party for the loading and discharging of cargo.",
		key: "LAY_TIME_LAST_DAY",
	},
	{
		value: "199",
		name: "Positioning date/time of goods",
		description:
			"The date and/or time the goods have to be or have been positioned.",
		key: "POSITIONING_DATE_TIME_OF_GOODS",
	},
	{
		value: "200",
		name: "Cargo pick-up date / time",
		description:
			"Date/time at which the cargo is picked up. Synonym: collected.",
		key: "CARGO_PICK_UP_DATE_TIME",
	},
	{
		value: "201",
		name: "Equipment pick-up date / time",
		description: "Date/time at which the equipment is picked up.",
		key: "EQUIPMENT_PICK_UP_DATE_TIME",
	},
	{
		value: "202",
		name: "Posting date",
		description: "The date when an entry is posted to an account.",
		key: "POSTING_DATE",
	},
	{
		value: "203",
		name: "Execution date/time, requested",
		description:
			"The date/time on which the ordered bank is requested to initiate the payment order, as specified by the originator (e.g. the date of the debit).",
		key: "EXECUTION_DATE_TIME_REQUESTED",
	},
	{
		value: "204",
		name: "Release date (Customs)",
		description:
			"(2135) Date on which Customs releases merchandise to the carrier or importer.",
		key: "RELEASE_DATE_CUSTOMS",
	},
	{
		value: "205",
		name: "Settlement date",
		description:
			"Date for settlement of financial transaction e.g. foreign exchange securities.",
		key: "SETTLEMENT_DATE",
	},
	{
		value: "206",
		name: "End date/time",
		description: "Date/time on which a period (from - to) ends.",
		key: "END_DATE_TIME",
	},
	{
		value: "207",
		name: "Commenced pumping ballast date/time",
		description:
			"Date/time on which the intake of materials to be carried to improve the trim and the stability of the means of transport, was commenced.",
		key: "COMMENCED_PUMPING_BALLAST_DATE_TIME",
	},
	{
		value: "208",
		name: "Transport means departure date/time, ultimate",
		description:
			"Date/time at which a means of transport has to depart ultimately.",
		key: "TRANSPORT_MEANS_DEPARTURE_DATE_TIME_ULTIMATE",
	},
	{
		value: "209",
		name: "Value date",
		description:
			"Date on which the funds are at the disposal of the beneficiary or cease to be at the disposal of the ordering customer.",
		key: "VALUE_DATE",
	},
	{
		value: "210",
		name: "Reinsurance current account period",
		description: "The date of the current reinsurance account.",
		key: "REINSURANCE_CURRENT_ACCOUNT_PERIOD",
	},
	{
		value: "211",
		name: "360/30",
		description: "Calculation is based on year of 360 days, month of 30 days.",
		key: "360_30",
	},
	{
		value: "212",
		name: "360/28-31",
		description:
			"Calculation is based on year of 360 days, month of 28-31 days.",
		key: "360_28_31",
	},
	{
		value: "213",
		name: "365-6/30",
		description:
			"Calculation is based on year of 365-6 days, month of 30 days.",
		key: "365_6_30",
	},
	{
		value: "214",
		name: "365-6/28-31",
		description:
			"Calculation is based on year of 365-6 days, month of 28- 31 days.",
		key: "365_6_28_31",
	},
	{
		value: "215",
		name: "365/28-31",
		description:
			"Calculation is based on year of 365 days, month of 28-31 days.",
		key: "365_28_31",
	},
	{
		value: "216",
		name: "365/30",
		description: "Calculation is based on year of 365 days, month of 30 days.",
		key: "365_30",
	},
	{
		value: "217",
		name: "From date of award to latest delivery",
		description:
			"Lead time to determine the latest date a delivery can be made based on the date an award is made.",
		key: "FROM_DATE_OF_AWARD_TO_LATEST_DELIVERY",
	},
	{
		value: "218",
		name: "Authentication/validation date/time",
		description: "The date/time of authentication and/or validation.",
		key: "AUTHENTICATION_VALIDATION_DATE_TIME",
	},
	{
		value: "219",
		name: "Crossborder date/time",
		description:
			"Date/time at which goods are transferred across a country border.",
		key: "CROSSBORDER_DATE_TIME",
	},
	{
		value: "220",
		name: "Property mortgage scheduled date, end",
		description:
			"The date the mortgage on a piece of property is scheduled to end.",
		key: "PROPERTY_MORTGAGE_SCHEDULED_DATE_END",
	},
	{
		value: "221",
		name: "Interest period",
		description: "Number of days used for the calculation of interests.",
		key: "INTEREST_PERIOD",
	},
	{
		value: "222",
		name: "Presentation date, latest",
		description: "Latest date for presentation of a document.",
		key: "PRESENTATION_DATE_LATEST",
	},
	{
		value: "223",
		name: "Delivery date/time, deferred",
		description:
			"New date and time of delivery calculated on basis of a consignee's requirement (chargeable).",
		key: "DELIVERY_DATE_TIME_DEFERRED",
	},
	{
		value: "224",
		name: "Permit to admit date",
		description:
			"Date on which permission was granted to move merchandise into a bonded warehouse or free trade zone.",
		key: "PERMIT_TO_ADMIT_DATE",
	},
	{
		value: "225",
		name: "Certification of weight date/time",
		description:
			"Date/time at which the carrier proceeds to the weighting of the goods.",
		key: "CERTIFICATION_OF_WEIGHT_DATE_TIME",
	},
	{
		value: "226",
		name: "Discrepancy date/time",
		description: "Date/time at which a discrepancy has been found.",
		key: "DISCREPANCY_DATE_TIME",
	},
	{
		value: "227",
		name: "Beneficiary's banks due date",
		description:
			"Date on which funds should be made available to the beneficiary's bank.",
		key: "BENEFICIARY_S_BANKS_DUE_DATE",
	},
	{
		value: "228",
		name: "Debit value date, requested",
		description:
			"Date on which the account owner wants the debit value to his account.",
		key: "DEBIT_VALUE_DATE_REQUESTED",
	},
	{
		value: "229",
		name: "Hoses connected date/time",
		description: "The date and/or time hoses were connected.",
		key: "HOSES_CONNECTED_DATE_TIME",
	},
	{
		value: "230",
		name: "Hoses disconnected date/time",
		description: "The date and/or time hoses were disconnected.",
		key: "HOSES_DISCONNECTED_DATE_TIME",
	},
	{
		value: "231",
		name: "Transport means arrival date/time, earliest",
		description: "Date/time of earliest arrival of means of transport.",
		key: "TRANSPORT_MEANS_ARRIVAL_DATE_TIME_EARLIEST",
	},
	{
		value: "232",
		name: "Transport means arrival date/time, scheduled",
		description: "Date (and time) of scheduled arrival of means of transport.",
		key: "TRANSPORT_MEANS_ARRIVAL_DATE_TIME_SCHEDULED",
	},
	{
		value: "233",
		name: "Transport means arrival date/time, ultimate",
		description: "Date (and time) of ultimate arrival of means of transport.",
		key: "TRANSPORT_MEANS_ARRIVAL_DATE_TIME_ULTIMATE",
	},
	{
		value: "234",
		name: "Collection date/time, earliest",
		description:
			"The transport order may be issued before the goods are ready for picking up. This date/time indicates from when on the carrier can have access to the consignment.",
		key: "COLLECTION_DATE_TIME_EARLIEST",
	},
	{
		value: "235",
		name: "Collection date/time, latest",
		description:
			"In relation with the arrangements agreed between buyer and seller or between sender and main transport it may be necessary to specify the latest collection date/time.",
		key: "COLLECTION_DATE_TIME_LATEST",
	},
	{
		value: "236",
		name: "Completed pumping ballast date/time",
		description:
			"Date/time at which the intake of materials, to be carried to improve the trim and the stability of the means of transport, was completed.",
		key: "COMPLETED_PUMPING_BALLAST_DATE_TIME",
	},
	{
		value: "237",
		name: "Completed tank cleaning date/time",
		description: "The date and/or time tank cleaning was completed.",
		key: "COMPLETED_TANK_CLEANING_DATE_TIME",
	},
	{
		value: "238",
		name: "Tanks accepted date/time",
		description:
			"The date and/or time the tanks are to be or have been accepted.",
		key: "TANKS_ACCEPTED_DATE_TIME",
	},
	{
		value: "239",
		name: "Tanks inspected date/time",
		description:
			"The date and/or time the tanks are to be or have been inspected.",
		key: "TANKS_INSPECTED_DATE_TIME",
	},
	{
		value: "240",
		name: "Reinsurance accounting period",
		description:
			'To identify a reinsurance account period via start and end dates. Note: 1. This period is not the same as "reinsurance current account period".',
		key: "REINSURANCE_ACCOUNTING_PERIOD",
	},
	{
		value: "241",
		name: "From date of award to earliest delivery",
		description:
			"Lead time to determine the earliest date a delivery can be made based on the date an award is made.",
		key: "FROM_DATE_OF_AWARD_TO_EARLIEST_DELIVERY",
	},
	{
		value: "242",
		name: "Preparation date/time of document",
		description: "Date and/or time that the document was prepared.",
		key: "PREPARATION_DATE_TIME_OF_DOCUMENT",
	},
	{
		value: "243",
		name: "Transmission date/time of document",
		description: "The date/time at which a document was transmitted.",
		key: "TRANSMISSION_DATE_TIME_OF_DOCUMENT",
	},
	{
		value: "244",
		name: "Settlement date, planned",
		description: "The date for which settlement is planned.",
		key: "SETTLEMENT_DATE_PLANNED",
	},
	{
		value: "245",
		name: "Underwriting year",
		description: "Year in which the treaty was commenced.",
		key: "UNDERWRITING_YEAR",
	},
	{
		value: "246",
		name: "Accounting year",
		description:
			"Year considered for accounting of the treaty or portion of the treaty.",
		key: "ACCOUNTING_YEAR",
	},
	{
		value: "247",
		name: "Year of occurrence",
		description: "Year in which a specific event (e.g. a loss) took place.",
		key: "YEAR_OF_OCCURRENCE",
	},
	{
		value: "248",
		name: "Loss",
		description: "Date, time, period on which a referenced loss occurred.",
		key: "LOSS",
	},
	{
		value: "249",
		name: "Cash call date",
		description:
			"Date on which a cash call was made for a loss suffered and covered.",
		key: "CASH_CALL_DATE",
	},
	{
		value: "250",
		name: "Re-exportation date",
		description: "Date of re-exportation.",
		key: "RE_EXPORTATION_DATE",
	},
	{
		value: "251",
		name: "Re-importation date",
		description: "Date of re-importation.",
		key: "RE_IMPORTATION_DATE",
	},
	{
		value: "252",
		name: "Arrival date/time at initial port",
		description:
			"Date/time that the conveyance arrives at the initial port in the country of destination.",
		key: "ARRIVAL_DATE_TIME_AT_INITIAL_PORT",
	},
	{
		value: "253",
		name: "Departure date/time from last port of call",
		description:
			"Date/time that conveyance departed from the last foreign port of call.",
		key: "DEPARTURE_DATE_TIME_FROM_LAST_PORT_OF_CALL",
	},
	{
		value: "254",
		name: "Registration date of previous Customs declaration",
		description:
			"Registration date of the Customs declaration for the previous Customs procedure either in the same or another country.",
		key: "REGISTRATION_DATE_OF_PREVIOUS_CUSTOMS_DECLARATION",
	},
	{
		value: "255",
		name: "Availability due date",
		description:
			"Date when ordered items should be available at a specified location.",
		key: "AVAILABILITY_DUE_DATE",
	},
	{
		value: "256",
		name: "From date of award to completion",
		description:
			"Lead time to determine the completion date of an effort based on the date an award is made.",
		key: "FROM_DATE_OF_AWARD_TO_COMPLETION",
	},
	{
		value: "257",
		name: "Calculation date time",
		description: "[2253] Date on which the calculation was made.",
		key: "CALCULATION_DATE_TIME",
	},
	{
		value: "258",
		name: "Guarantee date",
		description: "Date when a guarantee is placed.",
		key: "GUARANTEE_DATE",
	},
	{
		value: "259",
		name: "Conveyance registration date",
		description:
			"[2063] Date when a vessel, vehicle or other means of transport was registered by a competent authority.",
		key: "CONVEYANCE_REGISTRATION_DATE",
	},
	{
		value: "260",
		name: "Valuation date (Customs)",
		description: "Date when Customs valuation was made.",
		key: "VALUATION_DATE_CUSTOMS",
	},
	{
		value: "261",
		name: "Release date/time",
		description:
			"Date/time assigned to identify the release of a set of rules, conditions, conventions, productions, etc.",
		key: "RELEASE_DATE_TIME",
	},
	{
		value: "262",
		name: "Closure date/time/period",
		description: "Date/time/period when an enterprise is closed.",
		key: "CLOSURE_DATE_TIME_PERIOD",
	},
	{
		value: "263",
		name: "Invoicing period",
		description: "Period for which an invoice is issued.",
		key: "INVOICING_PERIOD",
	},
	{
		value: "264",
		name: "Release frequency",
		description: "Frequency of a release.",
		key: "RELEASE_FREQUENCY",
	},
	{
		value: "265",
		name: "Due date",
		description: "The date on which some action should occur.",
		key: "DUE_DATE",
	},
	{
		value: "266",
		name: "Validation date",
		description:
			"The date on which something was made valid, ratified or confirmed.",
		key: "VALIDATION_DATE",
	},
	{
		value: "267",
		name: "Rate/price date/time",
		description: "Date/time on which a rate/price is determined.",
		key: "RATE_PRICE_DATE_TIME",
	},
	{
		value: "268",
		name: "Transit time/limits",
		description: "The time to go over a distance.",
		key: "TRANSIT_TIME_LIMITS",
	},
	{
		value: "269",
		name: "Discharge date/time, started",
		description: "Date/time when discharge operations were started.",
		key: "DISCHARGE_DATE_TIME_STARTED",
	},
	{
		value: "270",
		name: "Ship during date",
		description:
			"The date identifying the period during or in which the goods should be shipped.",
		key: "SHIP_DURING_DATE",
	},
	{
		value: "271",
		name: "Ship on or about date",
		description: "Date on or about which goods should be shipped.",
		key: "SHIP_ON_OR_ABOUT_DATE",
	},
	{
		value: "272",
		name: "Documentary credit presentation period",
		description:
			"[2060] The specification of the period of time, expressed in number of days, after the date of issuance of the transport document(s) within which the documents must be presented.",
		key: "DOCUMENTARY_CREDIT_PRESENTATION_PERIOD",
	},
	{
		value: "273",
		name: "Validity period",
		description: "Dates (from/to)/period referenced documents are valid.",
		key: "VALIDITY_PERIOD",
	},
	{
		value: "274",
		name: "From date of order receipt to sample ready",
		description: "Lead time is the defined timespan.",
		key: "FROM_DATE_OF_ORDER_RECEIPT_TO_SAMPLE_READY",
	},
	{
		value: "275",
		name: "From date of tooling authorization to sample ready",
		description: "Lead time is the defined timespan.",
		key: "FROM_DATE_OF_TOOLING_AUTHORIZATION_TO_SAMPLE_READY",
	},
	{
		value: "276",
		name: "From date of receipt of tooling aids to sample ready",
		description: "Lead time is the defined timespan.",
		key: "FROM_DATE_OF_RECEIPT_OF_TOOLING_AIDS_TO_SAMPLE_READY",
	},
	{
		value: "277",
		name: "From date of sample approval to first product shipment",
		description: "Lead time is the defined timespan.",
		key: "FROM_DATE_OF_SAMPLE_APPROVAL_TO_FIRST_PRODUCT_SHIPMENT",
	},
	{
		value: "278",
		name: "From date of order receipt to shipment",
		description: "Lead time is the defined timespan.",
		key: "FROM_DATE_OF_ORDER_RECEIPT_TO_SHIPMENT",
	},
	{
		value: "279",
		name: "From date of order receipt to delivery",
		description: "Lead time is the defined timespan.",
		key: "FROM_DATE_OF_ORDER_RECEIPT_TO_DELIVERY",
	},
	{
		value: "280",
		name: "From last booked order to delivery",
		description: "Lead time is the defined timespan.",
		key: "FROM_LAST_BOOKED_ORDER_TO_DELIVERY",
	},
	{
		value: "281",
		name: "Date of order lead time",
		description: "Lead time is referenced to the date of order.",
		key: "DATE_OF_ORDER_LEAD_TIME",
	},
	{
		value: "282",
		name: "Confirmation date lead time",
		description: "Lead time is referenced to the date of confirmation.",
		key: "CONFIRMATION_DATE_LEAD_TIME",
	},
	{
		value: "283",
		name: "Arrival date/time of transport lead time",
		description:
			"Lead time is referenced to the date a transport will arrive or has arrived.",
		key: "ARRIVAL_DATE_TIME_OF_TRANSPORT_LEAD_TIME",
	},
	{
		value: "284",
		name: "Before inventory is replenished based on stock check lead",
		description: "time Lead time is the defined timespan.",
		key: "BEFORE_INVENTORY_IS_REPLENISHED_BASED_ON_STOCK_CHECK_LEAD",
	},
	{
		value: "285",
		name: "Invitation to tender date/time",
		description:
			"Date/time on which the invitation to tender has been made available to relevant parties.",
		key: "INVITATION_TO_TENDER_DATE_TIME",
	},
	{
		value: "286",
		name: "Tender submission date/time",
		description: "Date/time on which the tender was submitted.",
		key: "TENDER_SUBMISSION_DATE_TIME",
	},
	{
		value: "287",
		name: "Contract award date/time",
		description: "Date/time on which the contract is awarded to a tenderer.",
		key: "CONTRACT_AWARD_DATE_TIME",
	},
	{
		value: "288",
		name: "Price base date/time",
		description: "Base date/time of prices.",
		key: "PRICE_BASE_DATE_TIME",
	},
	{
		value: "289",
		name: "Interest rate validity period",
		description: "Validity period of the interest rate.",
		key: "INTEREST_RATE_VALIDITY_PERIOD",
	},
	{
		value: "290",
		name: "Contractual start date/time",
		description:
			"Date/time on which activities stated in the contract must start.",
		key: "CONTRACTUAL_START_DATE_TIME",
	},
	{
		value: "291",
		name: "Start date/time, planned",
		description:
			"The date/time for which something is planned to begin or commence.",
		key: "START_DATE_TIME_PLANNED",
	},
	{
		value: "292",
		name: "Works completion date/time, planned",
		description:
			"The date/time for the completion of building or repair operations is planned.",
		key: "WORKS_COMPLETION_DATE_TIME_PLANNED",
	},
	{
		value: "293",
		name: "Works completion date/time, actual",
		description:
			"The actual date/time for the completion of building or repair operations.",
		key: "WORKS_COMPLETION_DATE_TIME_ACTUAL",
	},
	{
		value: "294",
		name: "Hand over date/time, planned",
		description:
			"Date/time on which hand over (i.e. the transfer of responsibility for an object or activity such as documentation, system etc. from one party to another) is planned to take place.",
		key: "HAND_OVER_DATE_TIME_PLANNED",
	},
	{
		value: "295",
		name: "Hand over date/time, actual",
		description:
			"Date/time on which hand over (i.e. the transfer of responsibility for an object or activity such as documentation, system etc. from one party to another) actually takes place.",
		key: "HAND_OVER_DATE_TIME_ACTUAL",
	},
	{
		value: "296",
		name: "Retention release date/time",
		description: "Date/time on which the retention is released.",
		key: "RETENTION_RELEASE_DATE_TIME",
	},
	{
		value: "297",
		name: "Retention release date/time, partial",
		description: "Date/time on which the retention is partially released.",
		key: "RETENTION_RELEASE_DATE_TIME_PARTIAL",
	},
	{
		value: "298",
		name: "Goods pick-up date / time, planned",
		description:
			"Date/time at which goods can be picked up, according to a plan.",
		key: "GOODS_PICK_UP_DATE_TIME_PLANNED",
	},
	{
		value: "299",
		name: "Price adjustment start date",
		description:
			"Value date of the indexes appearing as denominators in a price adjustment formula.",
		key: "PRICE_ADJUSTMENT_START_DATE",
	},
	{
		value: "300",
		name: "Price adjustment limit date",
		description:
			"Limit value date of indexes used as numerators in a price adjustment formula.",
		key: "PRICE_ADJUSTMENT_LIMIT_DATE",
	},
	{
		value: "301",
		name: "Value date of index",
		description: "Date of validity of index values.",
		key: "VALUE_DATE_OF_INDEX",
	},
	{
		value: "302",
		name: "Publication date",
		description: "The date of the act of making something publicly known.",
		key: "PUBLICATION_DATE",
	},
	{
		value: "303",
		name: "Escalation date",
		description:
			"Value date of indexes appearing as numerators in an escalation formula.",
		key: "ESCALATION_DATE",
	},
	{
		value: "304",
		name: "Price adjustment date",
		description:
			"Value date of indexes appearing as numerators in a price adjustment formula.",
		key: "PRICE_ADJUSTMENT_DATE",
	},
	{
		value: "305",
		name: "Latest price adjustment date",
		description: "Date on which the latest price adjustment took place.",
		key: "LATEST_PRICE_ADJUSTMENT_DATE",
	},
	{
		value: "306",
		name: "Work period",
		description: "Period of execution of works.",
		key: "WORK_PERIOD",
	},
	{
		value: "307",
		name: "Payment instruction date/time",
		description: "Date/time on which a payment instruction was given.",
		key: "PAYMENT_INSTRUCTION_DATE_TIME",
	},
	{
		value: "308",
		name: "Payment valuation presentation date/time",
		description: "Date/time on which the payment valuation is presented.",
		key: "PAYMENT_VALUATION_PRESENTATION_DATE_TIME",
	},
	{
		value: "309",
		name: "Banks' value date",
		description:
			"Date on which the funds are at the disposal of the receiving bank or cease to be at the disposal of the sending bank.",
		key: "BANKS_VALUE_DATE",
	},
	{
		value: "310",
		name: "Received date/time",
		description: "Date/time of receipt.",
		key: "RECEIVED_DATE_TIME",
	},
	{
		value: "311",
		name: "On",
		description: "Fixed maturity day for deferred payment or time draft(s).",
		key: "ON",
	},
	{
		value: "312",
		name: "Ship not before and not after date/time",
		description:
			"Shipment(s) of goods is/are to be made not before the first specified date/time and not after the second specified date/time.",
		key: "SHIP_NOT_BEFORE_AND_NOT_AFTER_DATE_TIME",
	},
	{
		value: "313",
		name: "Order to proceed date",
		description: "Issue date of an instruction to start work.",
		key: "ORDER_TO_PROCEED_DATE",
	},
	{
		value: "314",
		name: "Planned duration of works",
		description:
			"The period of time planned for the completion of building or repair operations.",
		key: "PLANNED_DURATION_OF_WORKS",
	},
	{
		value: "315",
		name: "Agreement to pay date",
		description: "Date on which the debtor agreed to pay.",
		key: "AGREEMENT_TO_PAY_DATE",
	},
	{
		value: "316",
		name: "Valuation date/time",
		description: "Date/time of valuation.",
		key: "VALUATION_DATE_TIME",
	},
	{
		value: "317",
		name: "Reply date",
		description: "The date to answer or to respond in word or action.",
		key: "REPLY_DATE",
	},
	{
		value: "318",
		name: "Request date",
		description: "The date on which something was asked for.",
		key: "REQUEST_DATE",
	},
	{
		value: "319",
		name: "Customer value date",
		description:
			"Date at which funds are taken into account for interest calculation (in debit or credit).",
		key: "CUSTOMER_VALUE_DATE",
	},
	{
		value: "320",
		name: "Declaration reference period",
		description:
			"Reference period of a set of items reported on the same declaration.",
		key: "DECLARATION_REFERENCE_PERIOD",
	},
	{
		value: "321",
		name: "Promotion date/period",
		description: "Date/period relevant for specific promotion activities.",
		key: "PROMOTION_DATE_PERIOD",
	},
	{
		value: "322",
		name: "Accounting period",
		description:
			"A period of time for the recording of financial transactions for accounting.",
		key: "ACCOUNTING_PERIOD",
	},
	{
		value: "323",
		name: "Horizon period",
		description: "Period forming a (planning) horizon.",
		key: "HORIZON_PERIOD",
	},
	{
		value: "324",
		name: "Processing date/period",
		description: "Date/period a specific process happened/will happen.",
		key: "PROCESSING_DATE_PERIOD",
	},
	{
		value: "325",
		name: "Tax period",
		description: "Period a tax rate/tax amount etc. is applicable.",
		key: "TAX_PERIOD",
	},
	{
		value: "326",
		name: "Charge period",
		description: "Period a specified charge is valid for.",
		key: "CHARGE_PERIOD",
	},
	{
		value: "327",
		name: "Instalment payment due date",
		description: "Date on which an instalment payment is due.",
		key: "INSTALMENT_PAYMENT_DUE_DATE",
	},
	{
		value: "328",
		name: "Payroll deduction date/time",
		description:
			"Date/time of a monetary deduction made from the salary of a person on a payroll.",
		key: "PAYROLL_DEDUCTION_DATE_TIME",
	},
	{
		value: "329",
		name: "Person birth date time",
		description: "[2491] (2051) Date on which an individual is or was born.",
		key: "PERSON_BIRTH_DATE_TIME",
	},
	{
		value: "330",
		name: "Joined employer date",
		description: "Date when a person joins an employer.",
		key: "JOINED_EMPLOYER_DATE",
	},
	{
		value: "331",
		name: "Contributions ceasing date/time",
		description: "Date/time when contributions cease.",
		key: "CONTRIBUTIONS_CEASING_DATE_TIME",
	},
	{
		value: "332",
		name: "Contribution period end date/time",
		description: "Date/time when a contribution period ends.",
		key: "CONTRIBUTION_PERIOD_END_DATE_TIME",
	},
	{
		value: "333",
		name: "Part-time working change date/time",
		description: "Date/time when the proportion of part-time work changes.",
		key: "PART_TIME_WORKING_CHANGE_DATE_TIME",
	},
	{
		value: "334",
		name: "Status change date/time",
		description: "Date/time when a status changes.",
		key: "STATUS_CHANGE_DATE_TIME",
	},
	{
		value: "335",
		name: "Contribution period start date/time",
		description: "Date/time when a contribution period commences.",
		key: "CONTRIBUTION_PERIOD_START_DATE_TIME",
	},
	{
		value: "336",
		name: "Salary change effective date",
		description: "Date when a change in salary becomes effective.",
		key: "SALARY_CHANGE_EFFECTIVE_DATE",
	},
	{
		value: "337",
		name: "Left employer date",
		description: "Date when a person leaves an employer.",
		key: "LEFT_EMPLOYER_DATE",
	},
	{
		value: "338",
		name: "Benefit change date/time",
		description:
			"Date/time when a benefit provided by a service provider is changed.",
		key: "BENEFIT_CHANGE_DATE_TIME",
	},
	{
		value: "339",
		name: "Category change date/time",
		description: "Date/time when a change of category is made.",
		key: "CATEGORY_CHANGE_DATE_TIME",
	},
	{
		value: "340",
		name: "Joined fund date/time",
		description: "Date/time when a person joins a fund.",
		key: "JOINED_FUND_DATE_TIME",
	},
	{
		value: "341",
		name: "Waiting time",
		description:
			"The period of time between the moment at which one wants an activity to begin and the moment at which this activity can actually begin.",
		key: "WAITING_TIME",
	},
	{
		value: "342",
		name: "Consignment loading date time",
		description:
			"[2347] Date and optionally time when a consignment is to be or has been loaded onto a means of transport.",
		key: "CONSIGNMENT_LOADING_DATE_TIME",
	},
	{
		value: "343",
		name: "Date/time of discount termination",
		description: "Date/time when the deduction from an amount comes to an end.",
		key: "DATE_TIME_OF_DISCOUNT_TERMINATION",
	},
	{
		value: "344",
		name: "Date/time of interest due",
		description: "Date/time when the interest has to be paid.",
		key: "DATE_TIME_OF_INTEREST_DUE",
	},
	{
		value: "345",
		name: "Days of operation",
		description: "Week days of operation.",
		key: "DAYS_OF_OPERATION",
	},
	{
		value: "346",
		name: "Latest check-in time",
		description: "Latest time of check-in.",
		key: "LATEST_CHECK_IN_TIME",
	},
	{
		value: "347",
		name: "Slaughtering start date",
		description: "Date on which slaughtering commenced.",
		key: "SLAUGHTERING_START_DATE",
	},
	{
		value: "348",
		name: "Packing start date",
		description: "Date on which packing commenced.",
		key: "PACKING_START_DATE",
	},
	{
		value: "349",
		name: "Packing end date",
		description: "Date on which packing completed.",
		key: "PACKING_END_DATE",
	},
	{
		value: "350",
		name: "Test start date",
		description: "Date when a test has been started.",
		key: "TEST_START_DATE",
	},
	{
		value: "351",
		name: "Inspection date",
		description: "Date of inspection.",
		key: "INSPECTION_DATE",
	},
	{
		value: "352",
		name: "Slaughtering end date",
		description: "Date on which slaughtering completed.",
		key: "SLAUGHTERING_END_DATE",
	},
	{
		value: "353",
		name: "Accounting transaction date",
		description: "Date to which an accounting transaction refers.",
		key: "ACCOUNTING_TRANSACTION_DATE",
	},
	{
		value: "354",
		name: "Activity period date range",
		description: "A specific date range associated with an activity.",
		key: "ACTIVITY_PERIOD_DATE_RANGE",
	},
	{
		value: "355",
		name: "Contractual delivery date",
		description: "The date of delivery contractually agreed between parties.",
		key: "CONTRACTUAL_DELIVERY_DATE",
	},
	{
		value: "356",
		name: "Sales date, and or time, and or period",
		description:
			"The date, and or time, and or period on which a sale took place.",
		key: "SALES_DATE_AND_OR_TIME_AND_OR_PERIOD",
	},
	{
		value: "357",
		name: "Cancel if not published by this date",
		description: "Cancel if not published by this date.",
		key: "CANCEL_IF_NOT_PUBLISHED_BY_THIS_DATE",
	},
	{
		value: "358",
		name: "Scheduled for delivery on or after",
		description:
			"Scheduled for delivery on or after the specified date, and or time.",
		key: "SCHEDULED_FOR_DELIVERY_ON_OR_AFTER",
	},
	{
		value: "359",
		name: "Scheduled for delivery on or before",
		description:
			"Scheduled for delivery on or before specified date and or time.",
		key: "SCHEDULED_FOR_DELIVERY_ON_OR_BEFORE",
	},
	{
		value: "360",
		name: "Sell by date",
		description: "The date by which a product should be sold.",
		key: "SELL_BY_DATE",
	},
	{
		value: "361",
		name: "Product best before date time",
		description:
			"[2497] Indication that freshness of goods is limited in time to the date shown.",
		key: "PRODUCT_BEST_BEFORE_DATE_TIME",
	},
	{
		value: "362",
		name: "End availability date",
		description: "The end date of availability.",
		key: "END_AVAILABILITY_DATE",
	},
	{
		value: "363",
		name: "Total shelf life period",
		description: "A period indicating the total shelf life of a product.",
		key: "TOTAL_SHELF_LIFE_PERIOD",
	},
	{
		value: "364",
		name: "Minimum shelf life remaining at time of despatch period",
		description:
			"Period indicating the minimum shelf life remaining for a product at the time of leaving the supplier.",
		key: "MINIMUM_SHELF_LIFE_REMAINING_AT_TIME_OF_DESPATCH_PERIOD",
	},
	{
		value: "365",
		name: "Packaging date",
		description: "The date on which the packaging of a product took place.",
		key: "PACKAGING_DATE",
	},
	{
		value: "366",
		name: "Inventory report date",
		description: "Date on which a inventory report is made.",
		key: "INVENTORY_REPORT_DATE",
	},
	{
		value: "367",
		name: "Meter reading date, previous",
		description: "Date on which the previous reading of a meter took place.",
		key: "METER_READING_DATE_PREVIOUS",
	},
	{
		value: "368",
		name: "Meter reading date, latest",
		description: "Date on which the latest reading of a meter took place.",
		key: "METER_READING_DATE_LATEST",
	},
	{
		value: "369",
		name: "Date and or time of handling, estimated",
		description:
			"The date and or time when the handling action is estimated to take place.",
		key: "DATE_AND_OR_TIME_OF_HANDLING_ESTIMATED",
	},
	{
		value: "370",
		name: "Date when container equipment becomes domestic",
		description:
			"The date on which foreign-built container equipment has entered into the commerce of another country and has become domestic equipment.",
		key: "DATE_WHEN_CONTAINER_EQUIPMENT_BECOMES_DOMESTIC",
	},
	{
		value: "371",
		name: "Hydrotest date",
		description: "The date equipment has been hydrotested.",
		key: "HYDROTEST_DATE",
	},
	{
		value: "372",
		name: "Equipment pre-trip date",
		description: "The date on which equipment is pre-tripped.",
		key: "EQUIPMENT_PRE_TRIP_DATE",
	},
	{
		value: "373",
		name: "Mooring, date and time",
		description: "Date and time of mooring.",
		key: "MOORING_DATE_AND_TIME",
	},
	{
		value: "374",
		name: "Road fund tax expiry date",
		description: "The date of expiry of the road fund tax.",
		key: "ROAD_FUND_TAX_EXPIRY_DATE",
	},
	{
		value: "375",
		name: "Date of first registration",
		description: "Date of first registration.",
		key: "DATE_OF_FIRST_REGISTRATION",
	},
	{
		value: "376",
		name: "Biannual terminal inspection date",
		description:
			"The date on which a biannual inspection of a terminal has taken or will take place.",
		key: "BIANNUAL_TERMINAL_INSPECTION_DATE",
	},
	{
		value: "377",
		name: "Federal HighWay Administration (FHWA) inspection date",
		description:
			"The date on which container equipment is to be or has been inspected in accordance with the requirements of the U.S. Federal Highway Administration.",
		key: "FEDERAL_HIGH_WAY_ADMINISTRATION_FHWA_INSPECTION_DATE",
	},
	{
		value: "378",
		name: "Container Safety Convention (CSC) inspection date",
		description:
			"The date on which container equipment is to be or has been inspected as per the Container Safety Convention (CSC).",
		key: "CONTAINER_SAFETY_CONVENTION_CSC_INSPECTION_DATE",
	},
	{
		value: "379",
		name: "Periodic inspection date",
		description: "The date on which a periodic inspection has to take place.",
		key: "PERIODIC_INSPECTION_DATE",
	},
	{
		value: "380",
		name: "Drawing revision date",
		description: "Date the drawing revision has been allocated to a design.",
		key: "DRAWING_REVISION_DATE",
	},
	{
		value: "381",
		name: "Product lifespan at time of production",
		description:
			"The total lifespan of a product at the time of its production.",
		key: "PRODUCT_LIFESPAN_AT_TIME_OF_PRODUCTION",
	},
	{
		value: "382",
		name: "Earliest sale date",
		description:
			"The earliest date on which the product may be made available for sale.",
		key: "EARLIEST_SALE_DATE",
	},
	{
		value: "383",
		name: "Cancel if not shipped by this date",
		description: "Cancel the order if goods not shipped by this date.",
		key: "CANCEL_IF_NOT_SHIPPED_BY_THIS_DATE",
	},
	{
		value: "384",
		name: "Previous invoice date",
		description:
			"Indicates the date which was allocated to a previous invoice.",
		key: "PREVIOUS_INVOICE_DATE",
	},
	{
		value: "385",
		name: "Payment cancelled, violation of agreement",
		description:
			"Date/time when a payment is cancelled due to the fact that the transaction does not comply with the agreement.",
		key: "PAYMENT_CANCELLED_VIOLATION_OF_AGREEMENT",
	},
	{
		value: "386",
		name: "Payment cancelled due to administrative error",
		description:
			"Date/time when a payment is cancelled due to an administrative error.",
		key: "PAYMENT_CANCELLED_DUE_TO_ADMINISTRATIVE_ERROR",
	},
	{
		value: "387",
		name: "Repair turnaround time",
		description:
			"Provides the period of time necessary to turnaround a given repair.",
		key: "REPAIR_TURNAROUND_TIME",
	},
	{
		value: "388",
		name: "Order amendment binding date",
		description:
			"The date when an order amendment becomes binding for both parties.",
		key: "ORDER_AMENDMENT_BINDING_DATE",
	},
	{
		value: "389",
		name: "Cure time",
		description:
			"Specifies the length of time that an article was or should be cured.",
		key: "CURE_TIME",
	},
	{
		value: "390",
		name: "From date of award to delivery",
		description:
			"Lead time to determine the delivery date based on the date an award is made.",
		key: "FROM_DATE_OF_AWARD_TO_DELIVERY",
	},
	{
		value: "391",
		name: "From date of receipt of item to approval",
		description:
			"Lead time to determine the date an item will be approved based on the date the item was received.",
		key: "FROM_DATE_OF_RECEIPT_OF_ITEM_TO_APPROVAL",
	},
	{
		value: "392",
		name: "Equipment pick-up date / time, earliest",
		description:
			"[2125] Earliest date/time at which the equipment can be picked up.",
		key: "EQUIPMENT_PICK_UP_DATE_TIME_EARLIEST",
	},
	{
		value: "393",
		name: "Equipment pick-up date / time, planned",
		description:
			"Date/time at which equipment can be picked up, either full or empty, according to a plan.",
		key: "EQUIPMENT_PICK_UP_DATE_TIME_PLANNED",
	},
	{
		value: "394",
		name: "Equipment positioning date/time, actual",
		description:
			"Date/time on which equipment was actually positioned (delivered).",
		key: "EQUIPMENT_POSITIONING_DATE_TIME_ACTUAL",
	},
	{
		value: "395",
		name: "Equipment positioning date/time, estimated",
		description:
			"Date/time on which equipment is estimated to be positioned (delivered).",
		key: "EQUIPMENT_POSITIONING_DATE_TIME_ESTIMATED",
	},
	{
		value: "396",
		name: "Equipment positioning date/time, requested",
		description:
			"Date/time on which equipment is requested to be positioned (delivered).",
		key: "EQUIPMENT_POSITIONING_DATE_TIME_REQUESTED",
	},
	{
		value: "397",
		name: "Equipment positioning date/time, ultimate",
		description:
			"Date/time on which equipment should be positioned (delivered) at the latest.",
		key: "EQUIPMENT_POSITIONING_DATE_TIME_ULTIMATE",
	},
	{
		value: "398",
		name: "Goods collection or pick-up date/time, planned",
		description:
			"Date/time at which goods can be picked up, according to a planning.",
		key: "GOODS_COLLECTION_OR_PICK_UP_DATE_TIME_PLANNED",
	},
	{
		value: "399",
		name: "Goods positioning date/time, expected",
		description: "Date/time on which goods are expected to be positioned.",
		key: "GOODS_POSITIONING_DATE_TIME_EXPECTED",
	},
	{
		value: "400",
		name: "Cargo release date/time, ultimate",
		description:
			"Ultimate date/time at which goods or equipment should be released.",
		key: "CARGO_RELEASE_DATE_TIME_ULTIMATE",
	},
	{
		value: "401",
		name: "Container Safety Convention (CSC) plate expiration date",
		description:
			"Date on which the validity of a Container Safety Convention (CSC) plate expires.",
		key: "CONTAINER_SAFETY_CONVENTION_CSC_PLATE_EXPIRATION_DATE",
	},
	{
		value: "402",
		name: "Document received date/time",
		description: "Date/time on which the document was actually received.",
		key: "DOCUMENT_RECEIVED_DATE_TIME",
	},
	{
		value: "403",
		name: "Discharge date/time, actual",
		description:
			"Date/time when the specified goods or transport equipment has or have been discharged from the means of transport.",
		key: "DISCHARGE_DATE_TIME_ACTUAL",
	},
	{
		value: "404",
		name: "Transport means loading date/time, actual",
		description:
			"Date/time when the specified goods or transport equipment has or have been loaded in or on the means of transport.",
		key: "TRANSPORT_MEANS_LOADING_DATE_TIME_ACTUAL",
	},
	{
		value: "405",
		name: "Equipment pick-up date / time, actual",
		description:
			"[2123] Date/time on which the equipment was actually collected.",
		key: "EQUIPMENT_PICK_UP_DATE_TIME_ACTUAL",
	},
	{
		value: "406",
		name: "Goods positioning date/time, planned",
		description:
			"The date/time on which the goods will be positioned according to a planning.",
		key: "GOODS_POSITIONING_DATE_TIME_PLANNED",
	},
	{
		value: "407",
		name: "Document requested date/time",
		description: "Date/time on which the document is requested by a party.",
		key: "DOCUMENT_REQUESTED_DATE_TIME",
	},
	{
		value: "408",
		name: "Expected container hire from date/time",
		description:
			"Estimated date and time when the containers are expected to go on-hire.",
		key: "EXPECTED_CONTAINER_HIRE_FROM_DATE_TIME",
	},
	{
		value: "409",
		name: "Order completion date/time, ultimate",
		description:
			"Date/time on which the order should be completed at the latest.",
		key: "ORDER_COMPLETION_DATE_TIME_ULTIMATE",
	},
	{
		value: "410",
		name: "Equipment repair ready date/time, ultimate",
		description:
			"Ultimate date/time on which a piece of equipment must be repaired.",
		key: "EQUIPMENT_REPAIR_READY_DATE_TIME_ULTIMATE",
	},
	{
		value: "411",
		name: "Container stuffing date/time, ultimate",
		description:
			"Date/time on which the container stuffing should be completed at the latest.",
		key: "CONTAINER_STUFFING_DATE_TIME_ULTIMATE",
	},
	{
		value: "412",
		name: "Container stripping date/time, ultimate",
		description:
			"Date/time on which the container stripping should be completed at the latest.",
		key: "CONTAINER_STRIPPING_DATE_TIME_ULTIMATE",
	},
	{
		value: "413",
		name: "Discharge and loading completed date/time",
		description:
			"Date/time when all discharge and loading operations on the transport means have been completed.",
		key: "DISCHARGE_AND_LOADING_COMPLETED_DATE_TIME",
	},
	{
		value: "414",
		name: "Equipment stock check date/time",
		description:
			"Date/time on which equipment has been ascertained as being in stock.",
		key: "EQUIPMENT_STOCK_CHECK_DATE_TIME",
	},
	{
		value: "415",
		name: "Activity reporting date",
		description: "The date applicable to the activity being reported.",
		key: "ACTIVITY_REPORTING_DATE",
	},
	{
		value: "416",
		name: "Submission date",
		description: "The date of a submission.",
		key: "SUBMISSION_DATE",
	},
	{
		value: "417",
		name: "Previous booking date/time",
		description: "Date/time at which the previous booking was made.",
		key: "PREVIOUS_BOOKING_DATE_TIME",
	},
	{
		value: "418",
		name: "Minimum shelf life remaining at time of receipt",
		description: "The minimum shelf life remaining at the time of receipt.",
		key: "MINIMUM_SHELF_LIFE_REMAINING_AT_TIME_OF_RECEIPT",
	},
	{
		value: "419",
		name: "Forecast period",
		description: "A period for which a forecast applies.",
		key: "FORECAST_PERIOD",
	},
	{
		value: "420",
		name: "Unloaded, date and time",
		description:
			"To report the date and time that an unloading action occurred.",
		key: "UNLOADED_DATE_AND_TIME",
	},
	{
		value: "421",
		name: "Estimated acceptance date",
		description: "To estimate the date of acceptance.",
		key: "ESTIMATED_ACCEPTANCE_DATE",
	},
	{
		value: "422",
		name: "Documentary credit issue date",
		description: "The date the documentary credit has been issued.",
		key: "DOCUMENTARY_CREDIT_ISSUE_DATE",
	},
	{
		value: "423",
		name: "First date of ordering",
		description: "The first date on which ordering may take place.",
		key: "FIRST_DATE_OF_ORDERING",
	},
	{
		value: "424",
		name: "Last date of ordering",
		description: "The last date on which ordering may take place.",
		key: "LAST_DATE_OF_ORDERING",
	},
	{
		value: "425",
		name: "Original posting date",
		description: "Date when the entry was originally posted.",
		key: "ORIGINAL_POSTING_DATE",
	},
	{
		value: "426",
		name: "Reinsurance payment frequency",
		description: "The frequency of payments of reinsurance premiums.",
		key: "REINSURANCE_PAYMENT_FREQUENCY",
	},
	{
		value: "427",
		name: "Adjusted age",
		description: "The adjusted age used for purposes of calculation.",
		key: "ADJUSTED_AGE",
	},
	{
		value: "428",
		name: "Original issue age",
		description: "The original issue age.",
		key: "ORIGINAL_ISSUE_AGE",
	},
	{
		value: "429",
		name: "Coverage duration",
		description: "The period coverage has been in force.",
		key: "COVERAGE_DURATION",
	},
	{
		value: "430",
		name: "Coverage issue date",
		description: "Date from which the anniversary coverage is measured.",
		key: "COVERAGE_ISSUE_DATE",
	},
	{
		value: "431",
		name: "Flat extra period",
		description: "Period for charging the additional extra.",
		key: "FLAT_EXTRA_PERIOD",
	},
	{
		value: "432",
		name: "Paid to date",
		description: "Date to which payments have been paid.",
		key: "PAID_TO_DATE",
	},
	{
		value: "433",
		name: "Reinsurance coverage duration",
		description: "The period for which reinsurance coverage has been in force.",
		key: "REINSURANCE_COVERAGE_DURATION",
	},
	{
		value: "434",
		name: "Maturity date",
		description: "Date at which maturity occurs.",
		key: "MATURITY_DATE",
	},
	{
		value: "435",
		name: "Reinsurance issue age",
		description: "The actual or equivalent age at time of issue.",
		key: "REINSURANCE_ISSUE_AGE",
	},
	{
		value: "436",
		name: "Reinsurance paid-up date",
		description: "The date up to which the reinsurance has been paid.",
		key: "REINSURANCE_PAID_UP_DATE",
	},
	{
		value: "437",
		name: "Benefit period",
		description: "The period of time for which benefits are provided.",
		key: "BENEFIT_PERIOD",
	},
	{
		value: "438",
		name: "Disability wait period",
		description:
			"The period of time the insured must be disabled before reinsurance coverage becomes effective.",
		key: "DISABILITY_WAIT_PERIOD",
	},
	{
		value: "439",
		name: "Deferred Period",
		description: "The period of time for which an activity has been postponed.",
		key: "DEFERRED_PERIOD",
	},
	{
		value: "440",
		name: "Documentary credit amendment date",
		description: "Date of amendment of a documentary credit.",
		key: "DOCUMENTARY_CREDIT_AMENDMENT_DATE",
	},
	{
		value: "441",
		name: "Last on hire date",
		description: "Date the item was last placed on hire.",
		key: "LAST_ON_HIRE_DATE",
	},
	{
		value: "442",
		name: "Last off hire date",
		description: "Date the item was last returned from hire.",
		key: "LAST_OFF_HIRE_DATE",
	},
	{
		value: "443",
		name: "Direct interchange date",
		description: "Date the item was directly interchanged.",
		key: "DIRECT_INTERCHANGE_DATE",
	},
	{
		value: "444",
		name: "Approval date",
		description: "Date of approval.",
		key: "APPROVAL_DATE",
	},
	{
		value: "445",
		name: "Original estimate date",
		description: "The date of the original estimate.",
		key: "ORIGINAL_ESTIMATE_DATE",
	},
	{
		value: "446",
		name: "Revised estimate date",
		description: "The date the estimate was revised.",
		key: "REVISED_ESTIMATE_DATE",
	},
	{
		value: "447",
		name: "Creditor's requested value date",
		description: "Date on which the creditor requests to be credited.",
		key: "CREDITOR_S_REQUESTED_VALUE_DATE",
	},
	{
		value: "448",
		name: "Referenced item creation date",
		description: "Creation date of referenced item.",
		key: "REFERENCED_ITEM_CREATION_DATE",
	},
	{
		value: "449",
		name: "Date for the last update",
		description: "Date for the last update.",
		key: "DATE_FOR_THE_LAST_UPDATE",
	},
	{
		value: "450",
		name: "Opening date",
		description: "Date of opening.",
		key: "OPENING_DATE",
	},
	{
		value: "451",
		name: "Source document capture date",
		description:
			"Date source document data is entered into a business application.",
		key: "SOURCE_DOCUMENT_CAPTURE_DATE",
	},
	{
		value: "452",
		name: "Trial balance period",
		description: "Period covered by the trial balance.",
		key: "TRIAL_BALANCE_PERIOD",
	},
	{
		value: "453",
		name: "Date of source document",
		description: "The date of the source document.",
		key: "DATE_OF_SOURCE_DOCUMENT",
	},
	{
		value: "454",
		name: "Accounting value date",
		description: "Date against which the entry has to be legally allocated.",
		key: "ACCOUNTING_VALUE_DATE",
	},
	{
		value: "455",
		name: "Expected value date",
		description:
			"Date on which the funds are expected to be at the disposal of the beneficiary.",
		key: "EXPECTED_VALUE_DATE",
	},
	{
		value: "456",
		name: "Chart of account period",
		description: "Period covered by the chart of account.",
		key: "CHART_OF_ACCOUNT_PERIOD",
	},
	{
		value: "457",
		name: "Date of separation",
		description: "Date of marital separation.",
		key: "DATE_OF_SEPARATION",
	},
	{
		value: "458",
		name: "Date of divorce",
		description: "Date when two married persons are officially divorced.",
		key: "DATE_OF_DIVORCE",
	},
	{
		value: "459",
		name: "Date of marriage",
		description: "Date when two persons are married.",
		key: "DATE_OF_MARRIAGE",
	},
	{
		value: "460",
		name: "Wage period, start date",
		description: "Date when a period of wage begins.",
		key: "WAGE_PERIOD_START_DATE",
	},
	{
		value: "461",
		name: "Wage period, end date",
		description: "Date when a period of wage ends.",
		key: "WAGE_PERIOD_END_DATE",
	},
	{
		value: "462",
		name: "Working period, start date",
		description: "Date when a period of work begins.",
		key: "WORKING_PERIOD_START_DATE",
	},
	{
		value: "463",
		name: "Working period, end date",
		description: "Date when a period of work ends.",
		key: "WORKING_PERIOD_END_DATE",
	},
	{
		value: "464",
		name: "Embarkation date and time",
		description: "Date and time at which crew and/or passengers board.",
		key: "EMBARKATION_DATE_AND_TIME",
	},
	{
		value: "465",
		name: "Disembarkation date and time",
		description: "Date and time at which crew and/or passengers disembark.",
		key: "DISEMBARKATION_DATE_AND_TIME",
	},
	{
		value: "466",
		name: "Time now date",
		description: "A time now date used for planning and scheduling purposes.",
		key: "TIME_NOW_DATE",
	},
	{
		value: "467",
		name: "Holiday",
		description: "A date or period that is a break from work.",
		key: "HOLIDAY",
	},
	{
		value: "468",
		name: "Non working",
		description: "To specify a non working date or period.",
		key: "NON_WORKING",
	},
	{
		value: "469",
		name: "Start date or time, earliest",
		description: "The earliest date or time for starting.",
		key: "START_DATE_OR_TIME_EARLIEST",
	},
	{
		value: "470",
		name: "Start date or time, latest",
		description: "The latest date or time for starting.",
		key: "START_DATE_OR_TIME_LATEST",
	},
	{
		value: "471",
		name: "Finish date or time, earliest",
		description: "The earliest date or time for finishing.",
		key: "FINISH_DATE_OR_TIME_EARLIEST",
	},
	{
		value: "472",
		name: "Finish date or time, latest",
		description: "The latest date or time for finishing.",
		key: "FINISH_DATE_OR_TIME_LATEST",
	},
	{
		value: "473",
		name: "Start date or time, mandatory",
		description: "The mandatory date or time for starting.",
		key: "START_DATE_OR_TIME_MANDATORY",
	},
	{
		value: "474",
		name: "Finish date or time, mandatory",
		description: "The mandatory date or time for finishing.",
		key: "FINISH_DATE_OR_TIME_MANDATORY",
	},
	{
		value: "475",
		name: "Start date or time, actual",
		description: "The actual date or time for starting.",
		key: "START_DATE_OR_TIME_ACTUAL",
	},
	{
		value: "476",
		name: "Start date or time, estimated",
		description: "The estimated date or time for starting.",
		key: "START_DATE_OR_TIME_ESTIMATED",
	},
	{
		value: "477",
		name: "Completion date or time, estimated",
		description: "The estimated date or time for completion.",
		key: "COMPLETION_DATE_OR_TIME_ESTIMATED",
	},
	{
		value: "478",
		name: "Start date or time, scheduled",
		description: "The scheduled date or time for starting.",
		key: "START_DATE_OR_TIME_SCHEDULED",
	},
	{
		value: "479",
		name: "Completion date or time, scheduled",
		description: "The scheduled date or time for completion.",
		key: "COMPLETION_DATE_OR_TIME_SCHEDULED",
	},
	{
		value: "480",
		name: "Start date or time, not before",
		description: "The not before date or time for starting.",
		key: "START_DATE_OR_TIME_NOT_BEFORE",
	},
	{
		value: "481",
		name: "Start date or time, not after",
		description: "The not after date or time for starting.",
		key: "START_DATE_OR_TIME_NOT_AFTER",
	},
	{
		value: "482",
		name: "Completion date or time, not before",
		description: "The not before date or time for completion.",
		key: "COMPLETION_DATE_OR_TIME_NOT_BEFORE",
	},
	{
		value: "483",
		name: "Completion date or time, not after",
		description: "The not after date or time for completion.",
		key: "COMPLETION_DATE_OR_TIME_NOT_AFTER",
	},
	{
		value: "484",
		name: "Illness recovery date, expected",
		description: "Date when a person is expected to recover from illness.",
		key: "ILLNESS_RECOVERY_DATE_EXPECTED",
	},
	{
		value: "485",
		name: "Period of illness, start date",
		description: "Date when a period of illness began.",
		key: "PERIOD_OF_ILLNESS_START_DATE",
	},
	{
		value: "486",
		name: "Period of illness, end date",
		description: "Date when a period of illness ends.",
		key: "PERIOD_OF_ILLNESS_END_DATE",
	},
	{
		value: "487",
		name: "Decease date",
		description: "Date when a person died.",
		key: "DECEASE_DATE",
	},
	{
		value: "488",
		name: "Benefit period, start date",
		description: "Date when a period of benefit begins.",
		key: "BENEFIT_PERIOD_START_DATE",
	},
	{
		value: "489",
		name: "Benefit period, end date",
		description: "Date when a period of benefit ends.",
		key: "BENEFIT_PERIOD_END_DATE",
	},
	{
		value: "490",
		name: "Selection period, start date",
		description: "Date when a period of selection begins.",
		key: "SELECTION_PERIOD_START_DATE",
	},
	{
		value: "491",
		name: "Selection period, end date",
		description: "Date when a period of selection ends.",
		key: "SELECTION_PERIOD_END_DATE",
	},
	{
		value: "492",
		name: "Balance date/time/period",
		description: "The date/time/period of a balance.",
		key: "BALANCE_DATE_TIME_PERIOD",
	},
	{
		value: "493",
		name: "Benefit payments termination date",
		description: "To identify the date on which benefit payments have ceased.",
		key: "BENEFIT_PAYMENTS_TERMINATION_DATE",
	},
	{
		value: "494",
		name: "Covered income period",
		description:
			"To identify the period over which covered income is measured.",
		key: "COVERED_INCOME_PERIOD",
	},
	{
		value: "495",
		name: "Current income period",
		description:
			"To identify the period over which current income is measured.",
		key: "CURRENT_INCOME_PERIOD",
	},
	{
		value: "496",
		name: "Reinstatement date",
		description: "Identifies the date of reinstatement.",
		key: "REINSTATEMENT_DATE",
	},
	{
		value: "497",
		name: "Definition of disability duration",
		description:
			"To identify the period for which the definition of disability applies.",
		key: "DEFINITION_OF_DISABILITY_DURATION",
	},
	{
		value: "498",
		name: "Previous termination date",
		description: "Identifies the date of the previous termination.",
		key: "PREVIOUS_TERMINATION_DATE",
	},
	{
		value: "499",
		name: "Premium change period",
		description: "To identify the period of the premium change.",
		key: "PREMIUM_CHANGE_PERIOD",
	},
	{
		value: "500",
		name: "Off-hire survey date",
		description:
			"Date on which the equipment was surveyed at the end of the current leasing period.",
		key: "OFF_HIRE_SURVEY_DATE",
	},
	{
		value: "501",
		name: "In service survey date",
		description: "Date of survey of equipment while in use.",
		key: "IN_SERVICE_SURVEY_DATE",
	},
	{
		value: "502",
		name: "On hire survey date",
		description:
			"Date on which the equipment was surveyed at the beginning of the current leasing period.",
		key: "ON_HIRE_SURVEY_DATE",
	},
	{
		value: "503",
		name: "Production inspection date",
		description: "Date of production inspection.",
		key: "PRODUCTION_INSPECTION_DATE",
	},
	{
		value: "504",
		name: "Overtime, start date",
		description: "Date when a period of overtime begins.",
		key: "OVERTIME_START_DATE",
	},
	{
		value: "505",
		name: "Overtime, end date",
		description: "Date when a period of overtime ends.",
		key: "OVERTIME_END_DATE",
	},
	{
		value: "506",
		name: "Back order delivery date/time/period",
		description:
			"The date/time/period during which the delivery of a back order will take, or has taken, place.",
		key: "BACK_ORDER_DELIVERY_DATE_TIME_PERIOD",
	},
	{
		value: "507",
		name: "Negotiations start date",
		description: "The date on which negotiations started.",
		key: "NEGOTIATIONS_START_DATE",
	},
	{
		value: "508",
		name: "Work effective start date",
		description: "The date on which work will effectively start.",
		key: "WORK_EFFECTIVE_START_DATE",
	},
	{
		value: "510",
		name: "Notification time limit",
		description:
			"The time limit which has been set for a notification to take place.",
		key: "NOTIFICATION_TIME_LIMIT",
	},
	{
		value: "511",
		name: "Time limit",
		description: "The time limit in which an event must take place.",
		key: "TIME_LIMIT",
	},
	{
		value: "512",
		name: "Attendance date and or time and or period",
		description: "Date and or time and or period of attendance.",
		key: "ATTENDANCE_DATE_AND_OR_TIME_AND_OR_PERIOD",
	},
	{
		value: "513",
		name: "Accident date and or time",
		description: "Date and or time when an accident occurred.",
		key: "ACCIDENT_DATE_AND_OR_TIME",
	},
	{
		value: "514",
		name: "Adoption date, actual",
		description: "Actual date when adoption occurs.",
		key: "ADOPTION_DATE_ACTUAL",
	},
	{
		value: "515",
		name: "Reimbursement claim issue date and or time",
		description: "Date and or time when a reimbursement claim is issued.",
		key: "REIMBURSEMENT_CLAIM_ISSUE_DATE_AND_OR_TIME",
	},
	{
		value: "516",
		name: "Hospital admission date and or time",
		description: "Date and or time of admission to a hospital.",
		key: "HOSPITAL_ADMISSION_DATE_AND_OR_TIME",
	},
	{
		value: "517",
		name: "Hospital discharge date and or time",
		description: "Date and or time of discharge from a hospital.",
		key: "HOSPITAL_DISCHARGE_DATE_AND_OR_TIME",
	},
	{
		value: "518",
		name: "Period of care start date and or time",
		description: "Date and or time when a period of care starts.",
		key: "PERIOD_OF_CARE_START_DATE_AND_OR_TIME",
	},
	{
		value: "519",
		name: "Period of care end date and or time",
		description: "Date and or time when a period of care ends.",
		key: "PERIOD_OF_CARE_END_DATE_AND_OR_TIME",
	},
	{
		value: "520",
		name: "Department admission date and or time",
		description: "Date and or time of admission to a department.",
		key: "DEPARTMENT_ADMISSION_DATE_AND_OR_TIME",
	},
	{
		value: "521",
		name: "Department discharge date and or time",
		description: "Date and or time of discharge from a department.",
		key: "DEPARTMENT_DISCHARGE_DATE_AND_OR_TIME",
	},
	{
		value: "522",
		name: "Childbirth date and or time, actual",
		description: "Actual date and or time of childbirth.",
		key: "CHILDBIRTH_DATE_AND_OR_TIME_ACTUAL",
	},
	{
		value: "523",
		name: "Prescription issue date and or time",
		description: "Date and or time when a prescription was issued.",
		key: "PRESCRIPTION_ISSUE_DATE_AND_OR_TIME",
	},
	{
		value: "524",
		name: "Prescription dispensing date and or time",
		description: "Date and or time when a prescription was dispensed.",
		key: "PRESCRIPTION_DISPENSING_DATE_AND_OR_TIME",
	},
	{
		value: "525",
		name: "Clinical examination date and or time",
		description: "Date and or time of clinical examination.",
		key: "CLINICAL_EXAMINATION_DATE_AND_OR_TIME",
	},
	{
		value: "526",
		name: "Death date and or time",
		description: "Date and or time of death.",
		key: "DEATH_DATE_AND_OR_TIME",
	},
	{
		value: "527",
		name: "Childbirth date, estimated",
		description: "Estimated date of childbirth.",
		key: "CHILDBIRTH_DATE_ESTIMATED",
	},
	{
		value: "528",
		name: "Last menstrual cycle, start date",
		description: "Date when the last menstrual cycle started.",
		key: "LAST_MENSTRUAL_CYCLE_START_DATE",
	},
	{
		value: "529",
		name: "Pregnancy duration, actual",
		description: "Actual duration of pregnancy.",
		key: "PREGNANCY_DURATION_ACTUAL",
	},
	{
		value: "530",
		name: "Fumigation date and/or time",
		description:
			"The date/or time on which fumigation is to occur or has taken place.",
		key: "FUMIGATION_DATE_AND_OR_TIME",
	},
	{
		value: "531",
		name: "Payment period",
		description:
			"A period of time in which a payment has been or will be made.",
		key: "PAYMENT_PERIOD",
	},
	{
		value: "532",
		name: "Average delivery delay",
		description: "The average delay between deliveries.",
		key: "AVERAGE_DELIVERY_DELAY",
	},
	{
		value: "533",
		name: "Budget line application date",
		description:
			"The date on which something has been applied to a budget line.",
		key: "BUDGET_LINE_APPLICATION_DATE",
	},
	{
		value: "534",
		name: "Date of repair or service",
		description: "The date of a repair or service.",
		key: "DATE_OF_REPAIR_OR_SERVICE",
	},
	{
		value: "535",
		name: "Date of product failure",
		description: "The date the product failed.",
		key: "DATE_OF_PRODUCT_FAILURE",
	},
	{
		value: "536",
		name: "Review date",
		description: "Date the item was or will be reviewed.",
		key: "REVIEW_DATE",
	},
	{
		value: "537",
		name: "International review cycle start date",
		description: "Date the international review cycle starts.",
		key: "INTERNATIONAL_REVIEW_CYCLE_START_DATE",
	},
	{
		value: "538",
		name: "International assessment approval for publication date",
		description:
			"Date the Data Maintenance Request (DMR) was approved for publication after completing international review.",
		key: "INTERNATIONAL_ASSESSMENT_APPROVAL_FOR_PUBLICATION_DATE",
	},
	{
		value: "539",
		name: "Status assignment date",
		description: "Date a status was assigned.",
		key: "STATUS_ASSIGNMENT_DATE",
	},
	{
		value: "540",
		name: "Instruction's original execution date",
		description: "Original execution date for the instruction.",
		key: "INSTRUCTION_S_ORIGINAL_EXECUTION_DATE",
	},
	{
		value: "541",
		name: "First published date",
		description: "Date when material was first published.",
		key: "FIRST_PUBLISHED_DATE",
	},
	{
		value: "542",
		name: "Last published date",
		description: "Date when material was last published.",
		key: "LAST_PUBLISHED_DATE",
	},
	{
		value: "543",
		name: "Balance sheet date, latest",
		description: "Date of the latest balance sheet.",
		key: "BALANCE_SHEET_DATE_LATEST",
	},
	{
		value: "544",
		name: "Security share price as of given date",
		description: "Date of the security share price.",
		key: "SECURITY_SHARE_PRICE_AS_OF_GIVEN_DATE",
	},
	{
		value: "545",
		name: "Assigned date",
		description: "Date when assigned.",
		key: "ASSIGNED_DATE",
	},
	{
		value: "546",
		name: "Business opened date",
		description: "Date opened for business.",
		key: "BUSINESS_OPENED_DATE",
	},
	{
		value: "547",
		name: "Initial financial accounts filed date",
		description: "Date when the initial financial accounts were filed.",
		key: "INITIAL_FINANCIAL_ACCOUNTS_FILED_DATE",
	},
	{
		value: "548",
		name: "Stop work as of given date",
		description: "Date work stopped or will stop.",
		key: "STOP_WORK_AS_OF_GIVEN_DATE",
	},
	{
		value: "549",
		name: "Completion date",
		description: "Date of completion.",
		key: "COMPLETION_DATE",
	},
	{
		value: "550",
		name: "Lease term, start date",
		description: "Start date of the lease term.",
		key: "LEASE_TERM_START_DATE",
	},
	{
		value: "551",
		name: "Lease term, end date",
		description: "End date of the lease term.",
		key: "LEASE_TERM_END_DATE",
	},
	{
		value: "552",
		name: "Start date, actual",
		description: "Actual date of start.",
		key: "START_DATE_ACTUAL",
	},
	{
		value: "553",
		name: "Start date, estimated",
		description: "Date of estimated start.",
		key: "START_DATE_ESTIMATED",
	},
	{
		value: "554",
		name: "Filed date",
		description: "Date when filed.",
		key: "FILED_DATE",
	},
	{
		value: "555",
		name: "Return to work date",
		description: "Date of return to work.",
		key: "RETURN_TO_WORK_DATE",
	},
	{
		value: "556",
		name: "Purchased date",
		description: "Date of purchase.",
		key: "PURCHASED_DATE",
	},
	{
		value: "557",
		name: "Returned date",
		description: "Date return takes place.",
		key: "RETURNED_DATE",
	},
	{
		value: "558",
		name: "Changed date",
		description: "Date change takes place.",
		key: "CHANGED_DATE",
	},
	{
		value: "559",
		name: "Terminated date",
		description: "Date termination takes place.",
		key: "TERMINATED_DATE",
	},
	{
		value: "560",
		name: "Evaluation date",
		description: "Date evaluation takes place.",
		key: "EVALUATION_DATE",
	},
	{
		value: "561",
		name: "Business termination date",
		description: "Date the business terminates.",
		key: "BUSINESS_TERMINATION_DATE",
	},
	{
		value: "562",
		name: "Release from bankruptcy date",
		description: "Date when an entity is released from bankruptcy status.",
		key: "RELEASE_FROM_BANKRUPTCY_DATE",
	},
	{
		value: "563",
		name: "Placement date, initial",
		description: "Date of initial placement.",
		key: "PLACEMENT_DATE_INITIAL",
	},
	{
		value: "564",
		name: "Signature date",
		description: "Date of signature.",
		key: "SIGNATURE_DATE",
	},
	{
		value: "565",
		name: "Bankruptcy filed date",
		description: "Date when bankruptcy was filed.",
		key: "BANKRUPTCY_FILED_DATE",
	},
	{
		value: "566",
		name: "End date, scheduled",
		description: "Date when activity is scheduled to end.",
		key: "END_DATE_SCHEDULED",
	},
	{
		value: "567",
		name: "Report period",
		description: "Period covered by the report.",
		key: "REPORT_PERIOD",
	},
	{
		value: "568",
		name: "Suspended date",
		description: "Date of suspension.",
		key: "SUSPENDED_DATE",
	},
	{
		value: "569",
		name: "Renewal date",
		description: "Date of renewal.",
		key: "RENEWAL_DATE",
	},
	{
		value: "570",
		name: "Reported date",
		description: "Date when reported.",
		key: "REPORTED_DATE",
	},
	{
		value: "571",
		name: "Checked date",
		description: "Date when checked.",
		key: "CHECKED_DATE",
	},
	{
		value: "572",
		name: "Present residence, start date",
		description: "The beginning date of residence at present location.",
		key: "PRESENT_RESIDENCE_START_DATE",
	},
	{
		value: "573",
		name: "Employment position, start date",
		description: "The start date of employment in a particular position.",
		key: "EMPLOYMENT_POSITION_START_DATE",
	},
	{
		value: "574",
		name: "Account closed date",
		description: "Date when account was closed.",
		key: "ACCOUNT_CLOSED_DATE",
	},
	{
		value: "575",
		name: "Construction date, actual",
		description: "Date of actual construction.",
		key: "CONSTRUCTION_DATE_ACTUAL",
	},
	{
		value: "576",
		name: "Employment profession start date",
		description: "Start date of employment in a particular profession.",
		key: "EMPLOYMENT_PROFESSION_START_DATE",
	},
	{
		value: "577",
		name: "Next review date",
		description: "Date of next review.",
		key: "NEXT_REVIEW_DATE",
	},
	{
		value: "578",
		name: "Meeting date",
		description: "Date of the meeting.",
		key: "MEETING_DATE",
	},
	{
		value: "579",
		name: "Administrator ordered date",
		description: "Date when an administrator is ordered for a company.",
		key: "ADMINISTRATOR_ORDERED_DATE",
	},
	{
		value: "580",
		name: "Last date to file a claim",
		description: "Date after which no claim can be filed.",
		key: "LAST_DATE_TO_FILE_A_CLAIM",
	},
	{
		value: "581",
		name: "Convicted date",
		description: "Date when convicted.",
		key: "CONVICTED_DATE",
	},
	{
		value: "582",
		name: "Interviewed date",
		description: "Date of an interview.",
		key: "INTERVIEWED_DATE",
	},
	{
		value: "583",
		name: "Last visit date",
		description: "Date of last visit.",
		key: "LAST_VISIT_DATE",
	},
	{
		value: "584",
		name: "Future period",
		description: "Period in the future.",
		key: "FUTURE_PERIOD",
	},
	{
		value: "585",
		name: "Preceding period",
		description: "Period preceding current period.",
		key: "PRECEDING_PERIOD",
	},
	{
		value: "586",
		name: "Expected problem resolution date",
		description: "Date when problem is expected to be resolved.",
		key: "EXPECTED_PROBLEM_RESOLUTION_DATE",
	},
	{
		value: "587",
		name: "Action date",
		description: "Date of action.",
		key: "ACTION_DATE",
	},
	{
		value: "588",
		name: "Accountant's opinion date",
		description: "Date of an accountant's opinion.",
		key: "ACCOUNTANT_S_OPINION_DATE",
	},
	{
		value: "589",
		name: "Last activity date",
		description: "Date of last activity.",
		key: "LAST_ACTIVITY_DATE",
	},
	{
		value: "590",
		name: "Resolved date",
		description: "Date when resolved.",
		key: "RESOLVED_DATE",
	},
	{
		value: "591",
		name: "Recorded date",
		description: "Date when recorded.",
		key: "RECORDED_DATE",
	},
	{
		value: "592",
		name: "Date of birth, estimated",
		description: "The estimated date of birth.",
		key: "DATE_OF_BIRTH_ESTIMATED",
	},
	{
		value: "593",
		name: "Last annual report date",
		description: "Date of the last annual report.",
		key: "LAST_ANNUAL_REPORT_DATE",
	},
	{
		value: "594",
		name: "Net worth date",
		description: "Date of net worth.",
		key: "NET_WORTH_DATE",
	},
	{
		value: "595",
		name: "Payment cancellation rejected",
		description:
			"Date/time when a cancellation of a payment is rejected due to the fact that the payment is already done.",
		key: "PAYMENT_CANCELLATION_REJECTED",
	},
	{
		value: "596",
		name: "Profit period",
		description: "Period over which profit was earned.",
		key: "PROFIT_PERIOD",
	},
	{
		value: "597",
		name: "Registration date",
		description: "Date when registered.",
		key: "REGISTRATION_DATE",
	},
	{
		value: "598",
		name: "Consolidation date",
		description: "Date when consolidation occurred.",
		key: "CONSOLIDATION_DATE",
	},
	{
		value: "599",
		name: "Board of directors not authorised as of given date",
		description: "As of this date the board of directors is not authorised.",
		key: "BOARD_OF_DIRECTORS_NOT_AUTHORISED_AS_OF_GIVEN_DATE",
	},
	{
		value: "600",
		name: "Board of directors not complete as of given date",
		description: "As of this date the board of directors is not fully filled.",
		key: "BOARD_OF_DIRECTORS_NOT_COMPLETE_AS_OF_GIVEN_DATE",
	},
	{
		value: "601",
		name: "Manager not registered as of given date",
		description: "As of this date the manager is not registered.",
		key: "MANAGER_NOT_REGISTERED_AS_OF_GIVEN_DATE",
	},
	{
		value: "602",
		name: "Citizenship change date",
		description: "Date of citizenship change.",
		key: "CITIZENSHIP_CHANGE_DATE",
	},
	{
		value: "603",
		name: "Participation date",
		description: "Date of participation.",
		key: "PARTICIPATION_DATE",
	},
	{
		value: "604",
		name: "Capitalisation date",
		description: "Date of capitalisation.",
		key: "CAPITALISATION_DATE",
	},
	{
		value: "605",
		name: "Board of directors registration date",
		description: "Date when the board of directors was registered.",
		key: "BOARD_OF_DIRECTORS_REGISTRATION_DATE",
	},
	{
		value: "606",
		name: "Operations ceased date",
		description: "Date when operations ceased.",
		key: "OPERATIONS_CEASED_DATE",
	},
	{
		value: "607",
		name: "Satisfaction date",
		description: "Date when satisfaction was obtained.",
		key: "SATISFACTION_DATE",
	},
	{
		value: "608",
		name: "Legal settlement terms met date",
		description: "Date when terms specified in the legal settlement were met.",
		key: "LEGAL_SETTLEMENT_TERMS_MET_DATE",
	},
	{
		value: "609",
		name: "Business control change date",
		description: "Date when a new authority took control.",
		key: "BUSINESS_CONTROL_CHANGE_DATE",
	},
	{
		value: "610",
		name: "Court registration date",
		description: "Date of registration in the court.",
		key: "COURT_REGISTRATION_DATE",
	},
	{
		value: "611",
		name: "Annual report due date",
		description: "Date when annual report is due.",
		key: "ANNUAL_REPORT_DUE_DATE",
	},
	{
		value: "612",
		name: "Asset and liability schedule date",
		description: "Date of the asset and liability schedule.",
		key: "ASSET_AND_LIABILITY_SCHEDULE_DATE",
	},
	{
		value: "613",
		name: "Annual report mailing date",
		description: "Date when the annual report was mailed.",
		key: "ANNUAL_REPORT_MAILING_DATE",
	},
	{
		value: "614",
		name: "Annual report filing date",
		description: "Date when the annual report was filed.",
		key: "ANNUAL_REPORT_FILING_DATE",
	},
	{
		value: "615",
		name: "Annual report delinquent on date",
		description: "Date when annual report was considered delinquent.",
		key: "ANNUAL_REPORT_DELINQUENT_ON_DATE",
	},
	{
		value: "616",
		name: "Accounting methodology change date",
		description: "Date when accounting methodology was changed.",
		key: "ACCOUNTING_METHODOLOGY_CHANGE_DATE",
	},
	{
		value: "617",
		name: "Closed until date",
		description: "Date when again open.",
		key: "CLOSED_UNTIL_DATE",
	},
	{
		value: "618",
		name: "Conversion into holding company date",
		description: "Date business was converted into a holding company.",
		key: "CONVERSION_INTO_HOLDING_COMPANY_DATE",
	},
	{
		value: "619",
		name: "Deed not available as of given date",
		description: "Date when deed was not available.",
		key: "DEED_NOT_AVAILABLE_AS_OF_GIVEN_DATE",
	},
	{
		value: "620",
		name: "Detrimental information receipt date",
		description: "Date when detrimental information was received.",
		key: "DETRIMENTAL_INFORMATION_RECEIPT_DATE",
	},
	{
		value: "621",
		name: "Construction date, estimated",
		description: "Estimated date of construction.",
		key: "CONSTRUCTION_DATE_ESTIMATED",
	},
	{
		value: "622",
		name: "Financial information date",
		description: "Date of the financial information.",
		key: "FINANCIAL_INFORMATION_DATE",
	},
	{
		value: "623",
		name: "Graduation date",
		description: "Date when graduation occurs.",
		key: "GRADUATION_DATE",
	},
	{
		value: "624",
		name: "Insolvency discharge granted date",
		description: "Date when insolvency discharge was granted.",
		key: "INSOLVENCY_DISCHARGE_GRANTED_DATE",
	},
	{
		value: "625",
		name: "Incorporation date",
		description: "Date of incorporation.",
		key: "INCORPORATION_DATE",
	},
	{
		value: "626",
		name: "Inactivity end date",
		description: "Date when inactivity ends.",
		key: "INACTIVITY_END_DATE",
	},
	{
		value: "627",
		name: "Last check for balance sheet update date",
		description:
			"Date balance sheet was last checked to determine if update had taken place.",
		key: "LAST_CHECK_FOR_BALANCE_SHEET_UPDATE_DATE",
	},
	{
		value: "628",
		name: "Last capital change date",
		description: "Date of last capital change.",
		key: "LAST_CAPITAL_CHANGE_DATE",
	},
	{
		value: "629",
		name: "Letter of agreement date",
		description: "Date of a letter of agreement.",
		key: "LETTER_OF_AGREEMENT_DATE",
	},
	{
		value: "630",
		name: "Letter of liability date",
		description: "Date of a letter of liability.",
		key: "LETTER_OF_LIABILITY_DATE",
	},
	{
		value: "631",
		name: "Liquidation date",
		description: "Date of liquidation.",
		key: "LIQUIDATION_DATE",
	},
	{
		value: "632",
		name: "Lowest activity period",
		description: "Period of lowest activity.",
		key: "LOWEST_ACTIVITY_PERIOD",
	},
	{
		value: "633",
		name: "Legal structure change date",
		description: "Date when legal structure was changed.",
		key: "LEGAL_STRUCTURE_CHANGE_DATE",
	},
	{
		value: "634",
		name: "Current name effective date",
		description: "Date when current name became effective.",
		key: "CURRENT_NAME_EFFECTIVE_DATE",
	},
	{
		value: "635",
		name: "Not registered as of given date",
		description: "Date when not yet registered.",
		key: "NOT_REGISTERED_AS_OF_GIVEN_DATE",
	},
	{
		value: "636",
		name: "Current authority control start date",
		description: "Date when current authority took control.",
		key: "CURRENT_AUTHORITY_CONTROL_START_DATE",
	},
	{
		value: "637",
		name: "Privilege details verification date",
		description: "Date when privilege details were verified.",
		key: "PRIVILEGE_DETAILS_VERIFICATION_DATE",
	},
	{
		value: "638",
		name: "Current legal structure effective date",
		description: "Date when current legal structure became effective.",
		key: "CURRENT_LEGAL_STRUCTURE_EFFECTIVE_DATE",
	},
	{
		value: "639",
		name: "Peak activity period",
		description: "Period of peak activity.",
		key: "PEAK_ACTIVITY_PERIOD",
	},
	{
		value: "640",
		name: "Presentation to bankruptcy receivers date",
		description: "Date when presented to the bankruptcy receivers.",
		key: "PRESENTATION_TO_BANKRUPTCY_RECEIVERS_DATE",
	},
	{
		value: "641",
		name: "Resignation date",
		description: "Date of resignation.",
		key: "RESIGNATION_DATE",
	},
	{
		value: "642",
		name: "Legal action closed date",
		description: "Date when the legal action was closed.",
		key: "LEGAL_ACTION_CLOSED_DATE",
	},
	{
		value: "643",
		name: "Mail receipt date",
		description: "Date mail was received.",
		key: "MAIL_RECEIPT_DATE",
	},
	{
		value: "644",
		name: "Social security claims verification date",
		description: "Date when social security claims were verified.",
		key: "SOCIAL_SECURITY_CLAIMS_VERIFICATION_DATE",
	},
	{
		value: "645",
		name: "Sole directorship registration date",
		description: "Date when sole directorship was registered.",
		key: "SOLE_DIRECTORSHIP_REGISTRATION_DATE",
	},
	{
		value: "646",
		name: "Trade style registration date",
		description: "Date when trade style was registered.",
		key: "TRADE_STYLE_REGISTRATION_DATE",
	},
	{
		value: "647",
		name: "Trial start date, scheduled",
		description: "Date when a trial is scheduled to begin.",
		key: "TRIAL_START_DATE_SCHEDULED",
	},
	{
		value: "648",
		name: "Trial start date, actual",
		description: "Date when the trial actually started.",
		key: "TRIAL_START_DATE_ACTUAL",
	},
	{
		value: "649",
		name: "Value Added Tax (VAT) claims verification date",
		description: "Date when the Value Added Tax (VAT) claims were verified.",
		key: "VALUE_ADDED_TAX_VAT_CLAIMS_VERIFICATION_DATE",
	},
	{
		value: "650",
		name: "Receivership result date",
		description: "Date when the result of the receivership occurs.",
		key: "RECEIVERSHIP_RESULT_DATE",
	},
	{
		value: "651",
		name: "Investigation end date",
		description: "The date when an investigation ended.",
		key: "INVESTIGATION_END_DATE",
	},
	{
		value: "652",
		name: "Employee temporary laid-off period end date",
		description:
			"The ending date of a period in which employees were temporarily placed out of work.",
		key: "EMPLOYEE_TEMPORARY_LAID_OFF_PERIOD_END_DATE",
	},
	{
		value: "653",
		name: "Investigation start date",
		description: "The date when an investigation began.",
		key: "INVESTIGATION_START_DATE",
	},
	{
		value: "654",
		name: "Income period",
		description: "The period of time in which income is earned.",
		key: "INCOME_PERIOD",
	},
	{
		value: "655",
		name: "Criminal sentence duration",
		description: "The period of time over which a criminal sentence applies.",
		key: "CRIMINAL_SENTENCE_DURATION",
	},
	{
		value: "656",
		name: "Age",
		description:
			"Length of time that a person or animal has lived or a thing has existed.",
		key: "AGE",
	},
	{
		value: "657",
		name: "Receivables collection period",
		description:
			"The period of time over which receivable accounts are collected.",
		key: "RECEIVABLES_COLLECTION_PERIOD",
	},
	{
		value: "658",
		name: "Comparison period",
		description: "The time period covered in a comparison.",
		key: "COMPARISON_PERIOD",
	},
	{
		value: "659",
		name: "Adjournment",
		description: "The period of time over which an adjournment is in effect.",
		key: "ADJOURNMENT",
	},
	{
		value: "660",
		name: "Court dismissal date",
		description: "The date on which a court refused further hearing of a case.",
		key: "COURT_DISMISSAL_DATE",
	},
	{
		value: "661",
		name: "Insufficient assets judgement date",
		description: "The date on which assets were judged to be insufficient.",
		key: "INSUFFICIENT_ASSETS_JUDGEMENT_DATE",
	},
	{
		value: "662",
		name: "Average payment period",
		description: "The average period of time over which money has been paid.",
		key: "AVERAGE_PAYMENT_PERIOD",
	},
	{
		value: "663",
		name: "Forecast period start",
		description: "The beginning of a forecast period.",
		key: "FORECAST_PERIOD_START",
	},
	{
		value: "664",
		name: "Period extended",
		description:
			"Number of time units added to the original end date/time/period.",
		key: "PERIOD_EXTENDED",
	},
	{
		value: "665",
		name: "Employee temporary laid-off period start date",
		description:
			"The start date of a period in which employees were temporarily placed out of work.",
		key: "EMPLOYEE_TEMPORARY_LAID_OFF_PERIOD_START_DATE",
	},
	{
		value: "666",
		name: "Management available date",
		description: "Date when management is available.",
		key: "MANAGEMENT_AVAILABLE_DATE",
	},
	{
		value: "667",
		name: "Withdrawn date",
		description: "The date when something was retracted.",
		key: "WITHDRAWN_DATE",
	},
	{
		value: "668",
		name: "Claim incurred date",
		description: "The date that the claim was incurred.",
		key: "CLAIM_INCURRED_DATE",
	},
	{
		value: "669",
		name: "Financial coverage period",
		description: "The period of time for which financial coverage applies.",
		key: "FINANCIAL_COVERAGE_PERIOD",
	},
	{
		value: "670",
		name: "Claim made date",
		description: "The date on which a claim was made.",
		key: "CLAIM_MADE_DATE",
	},
	{
		value: "671",
		name: "Stop distribution date",
		description: "The date on which distribution is to stop.",
		key: "STOP_DISTRIBUTION_DATE",
	},
	{
		value: "672",
		name: "Period assigned",
		description: "The period assigned.",
		key: "PERIOD_ASSIGNED",
	},
	{
		value: "673",
		name: "Lease period",
		description: "The period associated with a lease.",
		key: "LEASE_PERIOD",
	},
	{
		value: "674",
		name: "Forecast period end date",
		description: "The ending date of a forecast period.",
		key: "FORECAST_PERIOD_END_DATE",
	},
	{
		value: "675",
		name: "Judgement date",
		description:
			"The date on which a decision from a court of law was rendered.",
		key: "JUDGEMENT_DATE",
	},
	{
		value: "676",
		name: "Period worked for the company",
		description: "Period of time that was worked for the company.",
		key: "PERIOD_WORKED_FOR_THE_COMPANY",
	},
	{
		value: "677",
		name: "Transport equipment stuffing date and/or time",
		description:
			"(2045) The date and/or time on which the stuffing of transport equipment is to or has taken place.",
		key: "TRANSPORT_EQUIPMENT_STUFFING_DATE_AND_OR_TIME",
	},
	{
		value: "678",
		name: "Transport equipment stripping date and/or time",
		description:
			"The date and/or time on which the stripping of a transport equipment is to or has taken place.",
		key: "TRANSPORT_EQUIPMENT_STRIPPING_DATE_AND_OR_TIME",
	},
	{
		value: "679",
		name: "Initial request date",
		description: "Date of an initial request.",
		key: "INITIAL_REQUEST_DATE",
	},
	{
		value: "680",
		name: "Period overdue",
		description: "The period by which an event is overdue.",
		key: "PERIOD_OVERDUE",
	},
	{
		value: "681",
		name: "Implementation date/time/period",
		description:
			"A date/time/period within which an implementation is to take place.",
		key: "IMPLEMENTATION_DATE_TIME_PERIOD",
	},
	{
		value: "682",
		name: "Refusal period",
		description: "The period within which a refusal can be made.",
		key: "REFUSAL_PERIOD",
	},
	{
		value: "683",
		name: "Suspension period",
		description: "The period for which something is suspended.",
		key: "SUSPENSION_PERIOD",
	},
	{
		value: "684",
		name: "Deletion date",
		description: "The date on which deletion occurs.",
		key: "DELETION_DATE",
	},
	{
		value: "685",
		name: "First sale date and/or time and/or period",
		description:
			"The first date, and/or time, and/or period a product was sold.",
		key: "FIRST_SALE_DATE_AND_OR_TIME_AND_OR_PERIOD",
	},
	{
		value: "686",
		name: "Last sale date and/or time and/or period",
		description:
			"The last date, and/or time, and/or period a product was sold.",
		key: "LAST_SALE_DATE_AND_OR_TIME_AND_OR_PERIOD",
	},
	{
		value: "687",
		name: "Date ready for collection",
		description: "A date on which an object is ready for collection.",
		key: "DATE_READY_FOR_COLLECTION",
	},
	{
		value: "688",
		name: "Shipping date, no schedule established as of",
		description:
			"As at this date no valid shipping schedule has been established.",
		key: "SHIPPING_DATE_NO_SCHEDULE_ESTABLISHED_AS_OF",
	},
	{
		value: "689",
		name: "Shipping date and/or time, current schedule",
		description: "Shipping date and/or time as currently scheduled.",
		key: "SHIPPING_DATE_AND_OR_TIME_CURRENT_SCHEDULE",
	},
	{
		value: "690",
		name: "Suppliers' average credit period",
		description:
			"The average period of time that credit is extended by suppliers.",
		key: "SUPPLIERS_AVERAGE_CREDIT_PERIOD",
	},
	{
		value: "691",
		name: "Advising date",
		description: "Date of advice.",
		key: "ADVISING_DATE",
	},
	{
		value: "692",
		name: "Project over target baseline date",
		description:
			"The date an over target baseline was implemented for a project.",
		key: "PROJECT_OVER_TARGET_BASELINE_DATE",
	},
	{
		value: "693",
		name: "Established date",
		description: "Date when an entity was established or created.",
		key: "ESTABLISHED_DATE",
	},
	{
		value: "694",
		name: "Latest filing period",
		description: "Latest period for which a filing may be made.",
		key: "LATEST_FILING_PERIOD",
	},
	{
		value: "695",
		name: "Mailing date",
		description: "Date when an item may be mailed.",
		key: "MAILING_DATE",
	},
	{
		value: "696",
		name: "Date/time of latest accounts filing at public registry",
		description:
			"The latest date/time when financial accounts were filed at public registry.",
		key: "DATE_TIME_OF_LATEST_ACCOUNTS_FILING_AT_PUBLIC_REGISTRY",
	},
	{
		value: "697",
		name: "Date placed in disfavour",
		description: "Date when placed in a disfavoured category or status.",
		key: "DATE_PLACED_IN_DISFAVOUR",
	},
	{
		value: "698",
		name: "Employment position start date, estimated",
		description: "Estimated start date of employment in a particular position.",
		key: "EMPLOYMENT_POSITION_START_DATE_ESTIMATED",
	},
	{
		value: "699",
		name: "Registered contractor number assignment date, original",
		description:
			"Date when a registered contractor number was originally assigned.",
		key: "REGISTERED_CONTRACTOR_NUMBER_ASSIGNMENT_DATE_ORIGINAL",
	},
	{
		value: "700",
		name: "Ownership change date",
		description: "Date when ownership changes.",
		key: "OWNERSHIP_CHANGE_DATE",
	},
	{
		value: "701",
		name: "Original duration",
		description: "Original length of time.",
		key: "ORIGINAL_DURATION",
	},
	{
		value: "702",
		name: "Period between changes",
		description: "The period of time between changes.",
		key: "PERIOD_BETWEEN_CHANGES",
	},
	{
		value: "703",
		name: "From date of notice to proceed to commencement of",
		description:
			"performance Period of time from notice to proceed until performance commencement.",
		key: "FROM_DATE_OF_NOTICE_TO_PROCEED_TO_COMMENCEMENT_OF",
	},
	{
		value: "704",
		name: "From date of notice to proceed to completion",
		description:
			"Period of time from date of notice to proceed until completion.",
		key: "FROM_DATE_OF_NOTICE_TO_PROCEED_TO_COMPLETION",
	},
	{
		value: "705",
		name: "Period an event is late due to customer",
		description:
			"The period of time an event is late due to the actions of a customer.",
		key: "PERIOD_AN_EVENT_IS_LATE_DUE_TO_CUSTOMER",
	},
	{
		value: "706",
		name: "File generation date and/or time",
		description: "Date and, or time of file generation.",
		key: "FILE_GENERATION_DATE_AND_OR_TIME",
	},
	{
		value: "707",
		name: "Endorsed certificate issue date",
		description:
			"Date on which a certificate, endorsed by signature or other agreed means, is issued.",
		key: "ENDORSED_CERTIFICATE_ISSUE_DATE",
	},
	{
		value: "708",
		name: "Patient first visit for condition",
		description:
			"The date of the first visit by a patient to a healthcare provider for this condition.",
		key: "PATIENT_FIRST_VISIT_FOR_CONDITION",
	},
	{
		value: "709",
		name: "Admission date and/or time, expected",
		description: "Expected date and/or time of admission.",
		key: "ADMISSION_DATE_AND_OR_TIME_EXPECTED",
	},
	{
		value: "710",
		name: "Symptoms onset, patient alleged",
		description:
			"Date and/or time of onset of symptoms according to the patient.",
		key: "SYMPTOMS_ONSET_PATIENT_ALLEGED",
	},
	{
		value: "711",
		name: "Accident benefit period",
		description:
			"To identify the period of time for which benefits are provided in the event of an accident.",
		key: "ACCIDENT_BENEFIT_PERIOD",
	},
	{
		value: "712",
		name: "Accident benefit age limit",
		description:
			"To identify the age to which benefits are provided to the insured in the event of an accident.",
		key: "ACCIDENT_BENEFIT_AGE_LIMIT",
	},
	{
		value: "713",
		name: "Accident lifetime benefit qualification age",
		description:
			"To identify the qualification age for lifetime benefits provided to the insured in the event of an accident.",
		key: "ACCIDENT_LIFETIME_BENEFIT_QUALIFICATION_AGE",
	},
	{
		value: "714",
		name: "Sickness benefit period",
		description:
			"To identify the period of time for which benefits are provided in the event of sickness.",
		key: "SICKNESS_BENEFIT_PERIOD",
	},
	{
		value: "715",
		name: "Sickness benefit age limit",
		description:
			"To identify the age to which benefits are provided to the insured in the event of sickness.",
		key: "SICKNESS_BENEFIT_AGE_LIMIT",
	},
	{
		value: "716",
		name: "Sickness lifetime benefit qualification age",
		description:
			"To identify the qualification age for lifetime benefits provided to the insured in the event of sickness.",
		key: "SICKNESS_LIFETIME_BENEFIT_QUALIFICATION_AGE",
	},
	{
		value: "717",
		name: "Accident insurance elimination period",
		description:
			"To identify the period of time the insured must be disabled in the event of an accident for benefits to be payable by the ceding company.",
		key: "ACCIDENT_INSURANCE_ELIMINATION_PERIOD",
	},
	{
		value: "718",
		name: "Sickness insurance elimination period",
		description:
			"The period of time the insured must be disabled in the event of sickness for benefits to be payable by the ceding company.",
		key: "SICKNESS_INSURANCE_ELIMINATION_PERIOD",
	},
	{
		value: "719",
		name: "Provider signature date",
		description: "Date when the provider signed.",
		key: "PROVIDER_SIGNATURE_DATE",
	},
	{
		value: "720",
		name: "Condition initial treatment date",
		description: "Date when initially treated for this condition.",
		key: "CONDITION_INITIAL_TREATMENT_DATE",
	},
	{
		value: "721",
		name: "Information release authorization date",
		description: "Date when the information was authorized to be released.",
		key: "INFORMATION_RELEASE_AUTHORIZATION_DATE",
	},
	{
		value: "722",
		name: "Benefit release authorization date",
		description: "Date when a benefit is authorized for release.",
		key: "BENEFIT_RELEASE_AUTHORIZATION_DATE",
	},
	{
		value: "723",
		name: "Last seen date",
		description: "The date when last seen.",
		key: "LAST_SEEN_DATE",
	},
	{
		value: "724",
		name: "Acute manifestation date",
		description:
			"The date the symptoms manifested themselves in an acute form.",
		key: "ACUTE_MANIFESTATION_DATE",
	},
	{
		value: "725",
		name: "Similar illness onset date",
		description:
			"The date of the onset of an illness similar to the illness currently being treated.",
		key: "SIMILAR_ILLNESS_ONSET_DATE",
	},
	{
		value: "726",
		name: "Last X-ray date",
		description: "The date the last X-ray was taken.",
		key: "LAST_X_RAY_DATE",
	},
	{
		value: "727",
		name: "Placement date, previous",
		description: "The date something was previously placed.",
		key: "PLACEMENT_DATE_PREVIOUS",
	},
	{
		value: "728",
		name: "Placement date",
		description: "The date something is placed.",
		key: "PLACEMENT_DATE",
	},
	{
		value: "729",
		name: "Temporary prosthesis date",
		description: "The date a temporary prosthetic device was provided.",
		key: "TEMPORARY_PROSTHESIS_DATE",
	},
	{
		value: "730",
		name: "Orthodontic treatment period, remaining",
		description:
			"The period of time that the orthodontic treatment has remaining.",
		key: "ORTHODONTIC_TREATMENT_PERIOD_REMAINING",
	},
	{
		value: "731",
		name: "Orthodontic treatment period, total",
		description: "The period of orthodontic treatment from beginning to end.",
		key: "ORTHODONTIC_TREATMENT_PERIOD_TOTAL",
	},
	{
		value: "732",
		name: "Maximum credit granted date",
		description: "Date on which the highest credit was granted.",
		key: "MAXIMUM_CREDIT_GRANTED_DATE",
	},
	{
		value: "733",
		name: "Last date of accounts filed at public register",
		description:
			"Date on which accounts were last filed at the public register.",
		key: "LAST_DATE_OF_ACCOUNTS_FILED_AT_PUBLIC_REGISTER",
	},
	{
		value: "734",
		name: "Allowed renewal duration period",
		description: "The period of time a company can renew its duration period.",
		key: "ALLOWED_RENEWAL_DURATION_PERIOD",
	},
	{
		value: "735",
		name: "Offset from Coordinated Universal Time (UTC)",
		description:
			"Number of hour's offset from Coordinated Universal Time (UTC).",
		key: "OFFSET_FROM_COORDINATED_UNIVERSAL_TIME_UTC",
	},
	{
		value: "736",
		name: "Appointment expiry date",
		description: "Date when an appointment will expire.",
		key: "APPOINTMENT_EXPIRY_DATE",
	},
	{
		value: "737",
		name: "Earliest filing period",
		description: "Earliest period for which a filing is made.",
		key: "EARLIEST_FILING_PERIOD",
	},
	{
		value: "738",
		name: "Original name change date",
		description: "Date when the original name was changed.",
		key: "ORIGINAL_NAME_CHANGE_DATE",
	},
	{
		value: "739",
		name: "Education start date",
		description: "Date education begins at an educational institution.",
		key: "EDUCATION_START_DATE",
	},
	{
		value: "740",
		name: "Education end date",
		description: "Date education is completed at an educational institution.",
		key: "EDUCATION_END_DATE",
	},
	{
		value: "741",
		name: "Receivership period",
		description: "Period of time a receivership lasts.",
		key: "RECEIVERSHIP_PERIOD",
	},
	{
		value: "742",
		name: "Financial information submission date/time",
		description: "Date/time when financial information is submitted.",
		key: "FINANCIAL_INFORMATION_SUBMISSION_DATE_TIME",
	},
	{
		value: "743",
		name: "Purchase order latest possible change date",
		description:
			"Date identifying a point of time after which a purchase order cannot be changed.",
		key: "PURCHASE_ORDER_LATEST_POSSIBLE_CHANGE_DATE",
	},
	{
		value: "744",
		name: "Investment number allocation date",
		description: "The date that an investment number was allocated.",
		key: "INVESTMENT_NUMBER_ALLOCATION_DATE",
	},
	{
		value: "745",
		name: "Payment impossible",
		description: "Date/time when a payment is recorded as being impossible.",
		key: "PAYMENT_IMPOSSIBLE",
	},
	{
		value: "746",
		name: "Record extraction period",
		description: "The period for extraction of records.",
		key: "RECORD_EXTRACTION_PERIOD",
	},
	{
		value: "747",
		name: "Cost accounting value date",
		description:
			"Code identifying the value date of cost accounting. Value date is the date at which the entry is to effect a balance of the account.",
		key: "COST_ACCOUNTING_VALUE_DATE",
	},
	{
		value: "748",
		name: "Open period",
		description:
			"Code identifying the period during which something is, was or will be open.",
		key: "OPEN_PERIOD",
	},
	{
		value: "749",
		name: "Period between issue date and maturity date",
		description:
			"Interval of time between the date when the transaction was initiated and the date when the funds need to be collected.",
		key: "PERIOD_BETWEEN_ISSUE_DATE_AND_MATURITY_DATE",
	},
	{
		value: "750",
		name: "Before date",
		description: "The specified before date.",
		key: "BEFORE_DATE",
	},
	{
		value: "751",
		name: "After date",
		description: "The specified after date.",
		key: "AFTER_DATE",
	},
	{
		value: "752",
		name: "Meter reading date, next scheduled",
		description:
			"Date on which the next reading of a meter is scheduled to take place.",
		key: "METER_READING_DATE_NEXT_SCHEDULED",
	},
	{
		value: "753",
		name: "Maturity date, optimal",
		description: "Date at which optimal maturity occurs.",
		key: "MATURITY_DATE_OPTIMAL",
	},
	{
		value: "754",
		name: "Product ageing duration, maximum",
		description: "Maximum period of time during which the product is ageing.",
		key: "PRODUCT_AGEING_DURATION_MAXIMUM",
	},
	{
		value: "755",
		name: "Product ageing duration, minimum",
		description: "Minimum period of time during which the product is ageing.",
		key: "PRODUCT_AGEING_DURATION_MINIMUM",
	},
	{
		value: "756",
		name: "Ultimate documentation date/time for 24-hour rule",
		description:
			"regulation of CBP (United States Customs and Border Protection) Ultimate date/time by which the documentation must be submitted in compliance with the 4-hour rule of United States Custom of Border Protection.",
		key: "ULTIMATE_DOCUMENTATION_DATE_TIME_FOR_24_HOUR_RULE",
	},
	{
		value: "757",
		name: "Departure date/time from place of loading",
		description:
			"Date/time of the departure of the goods from the place of loading.",
		key: "DEPARTURE_DATE_TIME_FROM_PLACE_OF_LOADING",
	},
	{
		value: "758",
		name: "Trade item ship date/time, earliest possible",
		description: "The earliest date/time that the trade item can be shipped.",
		key: "TRADE_ITEM_SHIP_DATE_TIME_EARLIEST_POSSIBLE",
	},
	{
		value: "759",
		name: "Trade item ship date/time, latest possible",
		description: "The latest date/time that the trade item can be shipped.",
		key: "TRADE_ITEM_SHIP_DATE_TIME_LATEST_POSSIBLE",
	},
	{
		value: "760",
		name: "Start date/time, maximum buying quantity",
		description:
			"The date/time from which the maximum buying quantity may be purchased.",
		key: "START_DATE_TIME_MAXIMUM_BUYING_QUANTITY",
	},
	{
		value: "761",
		name: "Start date/time, minimum buying quantity",
		description:
			"The date/time from which the minimum buying quantity may be purchased.",
		key: "START_DATE_TIME_MINIMUM_BUYING_QUANTITY",
	},
	{
		value: "762",
		name: "Marketing campaign end date/time, suggested",
		description:
			"The date and or time suggested for the marketing campaign to end.",
		key: "MARKETING_CAMPAIGN_END_DATE_TIME_SUGGESTED",
	},
	{
		value: "763",
		name: "Marketing campaign start date/time, suggested",
		description:
			"The date and or time suggested for the marketing campaign to start.",
		key: "MARKETING_CAMPAIGN_START_DATE_TIME_SUGGESTED",
	},
	{
		value: "764",
		name: "Start availability date",
		description: "The start date of availability.",
		key: "START_AVAILABILITY_DATE",
	},
	{
		value: "765",
		name: "Seasonal availabilty calendar year",
		description:
			"The calendar year of the season in which the trade item is available.",
		key: "SEASONAL_AVAILABILTY_CALENDAR_YEAR",
	},
	{
		value: "766",
		name: "Goods pickup lead time",
		description:
			"Minimum time required between order entry and goods release for pick-up.",
		key: "GOODS_PICKUP_LEAD_TIME",
	},
	{
		value: "767",
		name: "Change date/time, latest",
		description:
			"Most recent date and/or time that the information has been changed.",
		key: "CHANGE_DATE_TIME_LATEST",
	},
	{
		value: "768",
		name: "End date/time, maximum buying quantity",
		description:
			"The date and/or time until which the maximum buying quantity may be purchased.",
		key: "END_DATE_TIME_MAXIMUM_BUYING_QUANTITY",
	},
	{
		value: "769",
		name: "End dat/time, minimum buying quantity",
		description:
			"The date and/or time until which the minimum buying quantity may be purchased.",
		key: "END_DAT_TIME_MINIMUM_BUYING_QUANTITY",
	},
	{
		value: "770",
		name: "End date/time of exclusivity",
		description: "The date and/or time until which a product is exclusive.",
		key: "END_DATE_TIME_OF_EXCLUSIVITY",
	},
	{
		value: "771",
		name: "Data release date",
		description: "The date at which the data is released.",
		key: "DATA_RELEASE_DATE",
	},
	{
		value: "772",
		name: "Handling start date and/or time, actual",
		description:
			"The actual date and/or time when the start of the handling action takes place.",
		key: "HANDLING_START_DATE_AND_OR_TIME_ACTUAL",
	},
	{
		value: "773",
		name: "Handling end date and/or time, estimated",
		description:
			"The date and/or time when the end of the handling action is estimated to take place.",
		key: "HANDLING_END_DATE_AND_OR_TIME_ESTIMATED",
	},
	{
		value: "774",
		name: "Handling end date and/or time, actual",
		description:
			"The actual date and/or time when the end of the handling action takes place.",
		key: "HANDLING_END_DATE_AND_OR_TIME_ACTUAL",
	},
	{
		value: "775",
		name: "Minimum product lifespan for consumer",
		description:
			'The minimum life span of the product remaining after selling it to the consumer, i.e. between the "sell by date" and the "use by date" of the product.',
		key: "MINIMUM_PRODUCT_LIFESPAN_FOR_CONSUMER",
	},
	{
		value: "776",
		name: "Entry date, elected",
		description:
			"Date used at the discretion of the filer for duty calculation of non-quota goods when there is no immediate transport entry date (related to immediate delivery).",
		key: "ENTRY_DATE_ELECTED",
	},
	{
		value: "777",
		name: "Arrival date/time at initial port with the intent to unload",
		description:
			"Date/ time that the conveyance arrives at the initial port in the country of destination.",
		key: "ARRIVAL_DATE_TIME_AT_INITIAL_PORT_WITH_THE_INTENT_TO_UNLOAD",
	},
	{
		value: "778",
		name: "Conveyance port activity date/ time",
		description:
			"The date and time of conveyance activity, including cargo loading or unloading, fuelling etc.",
		key: "CONVEYANCE_PORT_ACTIVITY_DATE_TIME",
	},
	{
		value: "779",
		name: "Date and time of importation into port limits",
		description:
			"Date and time on which the conveyance transporting the goods from the foreign country arrived within the limits of the port of destination.",
		key: "DATE_AND_TIME_OF_IMPORTATION_INTO_PORT_LIMITS",
	},
	{
		value: "780",
		name: "Free trade zone commodity status assignment date",
		description:
			"The filing date that corresponds to the current status of the commodity in the free trade zone.",
		key: "FREE_TRADE_ZONE_COMMODITY_STATUS_ASSIGNMENT_DATE",
	},
	{
		value: "781",
		name: "Jurisdiction entry date/time, actual",
		description:
			"Actual date/time at which the conveyance or goods enter an agency's jurisdiction.",
		key: "JURISDICTION_ENTRY_DATE_TIME_ACTUAL",
	},
	{
		value: "782",
		name: "Inspection start date/time",
		description: "Date/time at which an inspection begins.",
		key: "INSPECTION_START_DATE_TIME",
	},
	{
		value: "783",
		name: "Inspection end date/time",
		description: "Date/time at which an inspection is completed.",
		key: "INSPECTION_END_DATE_TIME",
	},
	{
		value: "784",
		name: "Document/message rejection date/time",
		description: "Date/time at which the document/message was rejected.",
		key: "DOCUMENT_MESSAGE_REJECTION_DATE_TIME",
	},
	{
		value: "785",
		name: "Government service date/time, requested",
		description:
			"The date/time at which the government service is requested to be executed.",
		key: "GOVERNMENT_SERVICE_DATE_TIME_REQUESTED",
	},
	{
		value: "786",
		name: "Crop year",
		description: "The year that the crops were grown.",
		key: "CROP_YEAR",
	},
	{
		value: "787",
		name: "Date of original manufacture",
		description: "Date that the item was originally manufactured.",
		key: "DATE_OF_ORIGINAL_MANUFACTURE",
	},
	{
		value: "788",
		name: "Model year",
		description: "The model year of the item.",
		key: "MODEL_YEAR",
	},
	{
		value: "789",
		name: "Opened trade item life span",
		description:
			"The number of days the trade item that has been opened can remain on the shelf before it must be removed.",
		key: "OPENED_TRADE_ITEM_LIFE_SPAN",
	},
	{
		value: "790",
		name: "Unmooring, date and time",
		description: "Date and time of unmooring.",
		key: "UNMOORING_DATE_AND_TIME",
	},
	{
		value: "791",
		name: "First crane lift",
		description: "Date and time of the first crane lift.",
		key: "FIRST_CRANE_LIFT",
	},
	{
		value: "792",
		name: "Last crane lift",
		description: "Date and time of the last crane lift.",
		key: "LAST_CRANE_LIFT",
	},
	{
		value: "793",
		name: "Reprocessing date/time",
		description:
			"Date/time on which goods previously produced are re- processed.",
		key: "REPROCESSING_DATE_TIME",
	},
	{
		value: "794",
		name: "First returnable date/time",
		description: "The first date/time on or after which items can be returned.",
		key: "FIRST_RETURNABLE_DATE_TIME",
	},
	{
		value: "795",
		name: "Community visibility date/time",
		description:
			"The date/time from which information becomes visible to the target community.",
		key: "COMMUNITY_VISIBILITY_DATE_TIME",
	},
	{
		value: "796",
		name: "Catch date/time",
		description: "Date/time of catch.",
		key: "CATCH_DATE_TIME",
	},
	{
		value: "797",
		name: "First freezing date",
		description: "Date on which a product was first frozen.",
		key: "FIRST_FREEZING_DATE",
	},
	{
		value: "798",
		name: "Verified gross mass determination date/time",
		description:
			"Date/Time when a gross mass (weight) of a packed container was obtained according to SOLAS Chapter VI, Regulation 2, paragraphs 4-6.",
		key: "VERIFIED_GROSS_MASS_DETERMINATION_DATE_TIME",
	},
	{
		value: "799",
		name: "Validity end date",
		description: "The last date of a period for which something is valid.",
		key: "VALIDITY_END_DATE",
	},
	{
		value: "800",
		name: "Next status report date",
		description: "Date of the next status report.",
		key: "NEXT_STATUS_REPORT_DATE",
	},
	{
		value: "801",
		name: "Service connection date/time, actual",
		description:
			"The date/time on which a service was connected, e.g. telephone, water, etc.",
		key: "SERVICE_CONNECTION_DATE_TIME_ACTUAL",
	},
	{
		value: "802",
		name: "Service disconnection date/time, actual",
		description:
			"The date/time on which a service was disconnected, e.g. telephone, water, etc.",
		key: "SERVICE_DISCONNECTION_DATE_TIME_ACTUAL",
	},
	{
		value: "803",
		name: "Empty equipment required date/time/period",
		description: "Date/time/period on which empty equipment is required.",
		key: "EMPTY_EQUIPMENT_REQUIRED_DATE_TIME_PERIOD",
	},
	{
		value: "804",
		name: "Product sterilisation date",
		description: "Date on which a product was sterilised.",
		key: "PRODUCT_STERILISATION_DATE",
	},
	{
		value: "805",
		name: "Stock demand cover period, expected",
		description:
			"A period of time when all stocks are expected to cover demand for a product.",
		key: "STOCK_DEMAND_COVER_PERIOD_EXPECTED",
	},
	{
		value: "806",
		name: "Shipment date/time, expected",
		description: "Date and/or time when shipment is expected.",
		key: "SHIPMENT_DATE_TIME_EXPECTED",
	},
	{
		value: "807",
		name: "Slaughtering date/time",
		description: "Date/time of slaughtering.",
		key: "SLAUGHTERING_DATE_TIME",
	},
	{
		value: "808",
		name: "Animal birth date/time",
		description: "Date/time when an animal was born.",
		key: "ANIMAL_BIRTH_DATE_TIME",
	},
	{
		value: "809",
		name: "Seasonal availability end date",
		description:
			"Indicates the end date of the trade item's seasonal availability.",
		key: "SEASONAL_AVAILABILITY_END_DATE",
	},
	{
		value: "810",
		name: "Verified gross mass cut-off date/time",
		description:
			"Latest date/time by which the verified gross mass (such as VGM as per SOLAS) details must be provided to the carrier or to the terminal operator in order to enable loading of the transport equipment on the booked means of transport.",
		key: "VERIFIED_GROSS_MASS_CUT_OFF_DATE_TIME",
	},
	{
		value: "811",
		name: "Dangerous goods acceptance cut-off date/time",
		description:
			"Latest date/time after which no more Dangerous Goods cargo deliveries will be accepted at this location for loading on a particular booked means of transport.",
		key: "DANGEROUS_GOODS_ACCEPTANCE_CUT_OFF_DATE_TIME",
	},
	{
		value: "812",
		name: "Out of gauge or break bulk acceptance cut-off date/time",
		description:
			"Latest date/time after which no more Break Bulk cargo or Out Of Gauge transport equipment deliveries will be accepted at this location for loading on a booked means of transport.",
		key: "OUT_OF_GAUGE_OR_BREAK_BULK_ACCEPTANCE_CUT_OFF_DATE_TIME",
	},
	{
		value: "813",
		name: "Reefer acceptance cut-off date/time",
		description:
			"Latest date/time after which no more Temperature Controlled cargo deliveries will be accepted at this location for loading on a booked means of transport.",
		key: "REEFER_ACCEPTANCE_CUT_OFF_DATE_TIME",
	},
	{
		value: "814",
		name: "Laden transport equipment acceptance cut-off date/time",
		description:
			"Latest date/time after which no more laden transport equipment, such as FCL container, deliveries will be accepted at this location for loading on a booked means of transport.",
		key: "LADEN_TRANSPORT_EQUIPMENT_ACCEPTANCE_CUT_OFF_DATE_TIME",
	},
	{
		value: "815",
		name: "Transshipment booking acceptance cut-off date/time",
		description:
			"Date/time after which no more bookings for transshipment cargo will be accepted at this location for re-loading on a particular means of transport.",
		key: "TRANSSHIPMENT_BOOKING_ACCEPTANCE_CUT_OFF_DATE_TIME",
	},
	{
		value: "816",
		name: "Ordered labour team start time",
		description:
			"The date/time at which a party has ordered a labour team to be ready, e.g. for loading/unloading operations.",
		key: "ORDERED_LABOUR_TEAM_START_TIME",
	},
	{
		value: "817",
		name: "Ordered labour team end time",
		description:
			"The date/time until which a party has ordered a labour team to be ready, e.g. for loading/unloading operations.",
		key: "ORDERED_LABOUR_TEAM_END_TIME",
	},
	{
		value: "818",
		name: "Means of transport ready for cargo operations date/time",
		description:
			"Date/time when the means of transport is, or will be, ready for cargo operations.",
		key: "MEANS_OF_TRANSPORT_READY_FOR_CARGO_OPERATIONS_DATE_TIME",
	},
	{
		value: "819",
		name: "Means of transport ready for departure date/time",
		description:
			"Date/time when the means of transport is, or will be, ready for departure.",
		key: "MEANS_OF_TRANSPORT_READY_FOR_DEPARTURE_DATE_TIME",
	},
	{
		value: "820",
		name: "Vessel arrival at pilot area date/time, estimated",
		description: "Estimated date/time of vessel arrival at the pilot area.",
		key: "VESSEL_ARRIVAL_AT_PILOT_AREA_DATE_TIME_ESTIMATED",
	},
	{
		value: "821",
		name: "Vessel arrival at pilot area date/time, actual",
		description: "Actual date/time of vessel arrival at the pilot area.",
		key: "VESSEL_ARRIVAL_AT_PILOT_AREA_DATE_TIME_ACTUAL",
	},
	{
		value: "822",
		name: "Delivery place booking date/time",
		description: "Date/time at which a booking was made at the delivery place.",
		key: "DELIVERY_PLACE_BOOKING_DATE_TIME",
	},
	{
		value: "823",
		name: "Pickup place booking date/time",
		description: "Date/time at which a booking was made at the pickup place.",
		key: "PICKUP_PLACE_BOOKING_DATE_TIME",
	},
	{
		value: "824",
		name: "Discharge date/time, ended",
		description: "Date/time when discharge operations were ended",
		key: "DISCHARGE_DATE_TIME_ENDED",
	},
	{
		value: "825",
		name: "Loading date/time, ended",
		description: "Date/time when loading operations were ended",
		key: "LOADING_DATE_TIME_ENDED",
	},
	{
		value: "826",
		name: "Loading date/time, started",
		description: "Date/time when loading operations were started",
		key: "LOADING_DATE_TIME_STARTED",
	},
	{
		value: "ZZZ",
		name: "Mutually defined",
		description:
			"A code assigned within a code list to be used on an interim basis and as defined among trading partners until a precise code can be assigned to the code list.",
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
