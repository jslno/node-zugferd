import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid4451 = [
	{
		value: "AAA",
		name: "Goods item description",
		description:
			"[7002] Plain language description of the nature of a goods item sufficient to identify it for customs, statistical or transport purposes.",
		key: "GOODS_ITEM_DESCRIPTION",
	},
	{
		value: "AAB",
		name: "Payment term",
		description:
			"[4276] Free form description of the conditions of payment between the parties to a transaction.",
		key: "PAYMENT_TERM",
	},
	{
		value: "AAC",
		name: "Dangerous goods additional information",
		description:
			"[7488] Additional information concerning dangerous substances and/or article in a consignment.",
		key: "DANGEROUS_GOODS_ADDITIONAL_INFORMATION",
	},
	{
		value: "AAD",
		name: "Dangerous goods technical name",
		description:
			"[7254] Proper shipping name, supplemented as necessary with the correct technical name, by which a dangerous substance or article may be correctly identified, or which is sufficiently informative to permit identification by reference to generally available literature.",
		key: "DANGEROUS_GOODS_TECHNICAL_NAME",
	},
	{
		value: "AAE",
		name: "Acknowledgement description",
		description: "The content of an acknowledgement.",
		key: "ACKNOWLEDGEMENT_DESCRIPTION",
	},
	{
		value: "AAF",
		name: "Rate additional information",
		description: "Specific details applying to rates.",
		key: "RATE_ADDITIONAL_INFORMATION",
	},
	{
		value: "AAG",
		name: "Party instructions",
		description:
			"Indicates that the segment contains instructions to be passed on to the identified party.",
		key: "PARTY_INSTRUCTIONS",
	},
	{
		value: "AAI",
		name: "General information",
		description: "The text contains general information.",
		key: "GENERAL_INFORMATION",
	},
	{
		value: "AAJ",
		name: "Additional conditions of sale/purchase",
		description: "Additional conditions specific to this order or project.",
		key: "ADDITIONAL_CONDITIONS_OF_SALE_PURCHASE",
	},
	{
		value: "AAK",
		name: "Price conditions",
		description:
			"Information on the price conditions that are expected or given.",
		key: "PRICE_CONDITIONS",
	},
	{
		value: "AAL",
		name: "Goods dimensions in characters",
		description:
			"Expression of a number in characters as length of ten meters.",
		key: "GOODS_DIMENSIONS_IN_CHARACTERS",
	},
	{
		value: "AAM",
		name: "Equipment re-usage restrictions",
		description:
			"Technical or commercial reasons why a piece of equipment may not be re-used after the current transport terminates.",
		key: "EQUIPMENT_RE_USAGE_RESTRICTIONS",
	},
	{
		value: "AAN",
		name: "Handling restriction",
		description:
			"Restrictions in handling depending on the technical characteristics of the piece of equipment or on the nature of the goods.",
		key: "HANDLING_RESTRICTION",
	},
	{
		value: "AAO",
		name: "Error description (free text)",
		description: "Error described by a free text.",
		key: "ERROR_DESCRIPTION_FREE_TEXT",
	},
	{
		value: "AAP",
		name: "Response (free text)",
		description: "Free text of the response to a communication.",
		key: "RESPONSE_FREE_TEXT",
	},
	{
		value: "AAQ",
		name: "Package content's description",
		description: "A description of the contents of a package.",
		key: "PACKAGE_CONTENT_S_DESCRIPTION",
	},
	{
		value: "AAR",
		name: "Terms of delivery",
		description:
			"(4053) Free text of the non Incoterms terms of delivery. For Incoterms, use: 4053.",
		key: "TERMS_OF_DELIVERY",
	},
	{
		value: "AAS",
		name: "Bill of lading remarks",
		description: "The remarks printed or to be printed on a bill of lading.",
		key: "BILL_OF_LADING_REMARKS",
	},
	{
		value: "AAT",
		name: "Mode of settlement information",
		description:
			"Free text information on an IATA Air Waybill to indicate means by which account is to be settled.",
		key: "MODE_OF_SETTLEMENT_INFORMATION",
	},
	{
		value: "AAU",
		name: "Consignment invoice information",
		description:
			"Information pertaining to the invoice covering the consignment.",
		key: "CONSIGNMENT_INVOICE_INFORMATION",
	},
	{
		value: "AAV",
		name: "Clearance invoice information",
		description:
			"Information pertaining to the invoice covering clearance of the cargo.",
		key: "CLEARANCE_INVOICE_INFORMATION",
	},
	{
		value: "AAW",
		name: "Letter of credit information",
		description: "Information pertaining to the letter of credit.",
		key: "LETTER_OF_CREDIT_INFORMATION",
	},
	{
		value: "AAX",
		name: "License information",
		description: "Information pertaining to a license.",
		key: "LICENSE_INFORMATION",
	},
	{
		value: "AAY",
		name: "Certification statements",
		description: "The text contains certification statements.",
		key: "CERTIFICATION_STATEMENTS",
	},
	{
		value: "AAZ",
		name: "Additional export information",
		description: "The text contains additional export information.",
		key: "ADDITIONAL_EXPORT_INFORMATION",
	},
	{
		value: "ABA",
		name: "Tariff statements",
		description: "Description of parameters relating to a tariff.",
		key: "TARIFF_STATEMENTS",
	},
	{
		value: "ABB",
		name: "Medical history",
		description: "Historical details of a patients medical events.",
		key: "MEDICAL_HISTORY",
	},
	{
		value: "ABC",
		name: "Conditions of sale or purchase",
		description:
			"(4490) (4372) Additional information regarding terms and conditions which apply to the transaction.",
		key: "CONDITIONS_OF_SALE_OR_PURCHASE",
	},
	{
		value: "ABD",
		name: "Contract document type",
		description: "[4422] Textual representation of the type of contract.",
		key: "CONTRACT_DOCUMENT_TYPE",
	},
	{
		value: "ABE",
		name: "Additional terms and/or conditions (documentary credit)",
		description:
			"(4260) Additional terms and/or conditions to the documentary credit.",
		key: "ADDITIONAL_TERMS_AND_OR_CONDITIONS_DOCUMENTARY_CREDIT",
	},
	{
		value: "ABF",
		name: "Instructions or information about standby documentary",
		description:
			"credit Instruction or information about a standby documentary credit.",
		key: "INSTRUCTIONS_OR_INFORMATION_ABOUT_STANDBY_DOCUMENTARY",
	},
	{
		value: "ABG",
		name: "Instructions or information about partial shipment(s)",
		description: "Instructions or information about partial shipment(s).",
		key: "INSTRUCTIONS_OR_INFORMATION_ABOUT_PARTIAL_SHIPMENT_S",
	},
	{
		value: "ABH",
		name: "Instructions or information about transhipment(s)",
		description: "Instructions or information about transhipment(s).",
		key: "INSTRUCTIONS_OR_INFORMATION_ABOUT_TRANSHIPMENT_S",
	},
	{
		value: "ABI",
		name: "Additional handling instructions documentary credit",
		description: "Additional handling instructions for a documentary credit.",
		key: "ADDITIONAL_HANDLING_INSTRUCTIONS_DOCUMENTARY_CREDIT",
	},
	{
		value: "ABJ",
		name: "Domestic routing information",
		description: "Information regarding the domestic routing.",
		key: "DOMESTIC_ROUTING_INFORMATION",
	},
	{
		value: "ABK",
		name: "Chargeable category of equipment",
		description:
			"Equipment types are coded by category for financial purposes.",
		key: "CHARGEABLE_CATEGORY_OF_EQUIPMENT",
	},
	{
		value: "ABL",
		name: "Government information",
		description: "Information pertaining to government.",
		key: "GOVERNMENT_INFORMATION",
	},
	{
		value: "ABM",
		name: "Onward routing information",
		description: "The text contains onward routing information.",
		key: "ONWARD_ROUTING_INFORMATION",
	},
	{
		value: "ABN",
		name: "Accounting information",
		description: "[4410] The text contains information related to accounting.",
		key: "ACCOUNTING_INFORMATION",
	},
	{
		value: "ABO",
		name: "Discrepancy information",
		description:
			"Free text or coded information to indicate a specific discrepancy.",
		key: "DISCREPANCY_INFORMATION",
	},
	{
		value: "ABP",
		name: "Confirmation instructions",
		description: "Documentary credit confirmation instructions.",
		key: "CONFIRMATION_INSTRUCTIONS",
	},
	{
		value: "ABQ",
		name: "Method of issuance",
		description: "Method of issuance of documentary credit.",
		key: "METHOD_OF_ISSUANCE",
	},
	{
		value: "ABR",
		name: "Documents delivery instructions",
		description:
			"Delivery instructions for documents required under a documentary credit.",
		key: "DOCUMENTS_DELIVERY_INSTRUCTIONS",
	},
	{
		value: "ABS",
		name: "Additional conditions",
		description:
			"Additional conditions to the issuance of a documentary credit.",
		key: "ADDITIONAL_CONDITIONS",
	},
	{
		value: "ABT",
		name: "Information/instructions about additional amounts covered",
		description: "Additional amounts information/instruction.",
		key: "INFORMATION_INSTRUCTIONS_ABOUT_ADDITIONAL_AMOUNTS_COVERED",
	},
	{
		value: "ABU",
		name: "Deferred payment termed additional",
		description: "Additional terms concerning deferred payment.",
		key: "DEFERRED_PAYMENT_TERMED_ADDITIONAL",
	},
	{
		value: "ABV",
		name: "Acceptance terms additional",
		description: "Additional terms concerning acceptance.",
		key: "ACCEPTANCE_TERMS_ADDITIONAL",
	},
	{
		value: "ABW",
		name: "Negotiation terms additional",
		description: "Additional terms concerning negotiation.",
		key: "NEGOTIATION_TERMS_ADDITIONAL",
	},
	{
		value: "ABX",
		name: "Document name and documentary requirements",
		description: "Document name and documentary requirements.",
		key: "DOCUMENT_NAME_AND_DOCUMENTARY_REQUIREMENTS",
	},
	{
		value: "ABZ",
		name: "Instructions/information about revolving documentary credit",
		description:
			"Instructions/information about a revolving documentary credit.",
		key: "INSTRUCTIONS_INFORMATION_ABOUT_REVOLVING_DOCUMENTARY_CREDIT",
	},
	{
		value: "ACA",
		name: "Documentary requirements",
		description: "Specification of the documentary requirements.",
		key: "DOCUMENTARY_REQUIREMENTS",
	},
	{
		value: "ACB",
		name: "Additional information",
		description: "(4270) The text contains additional information.",
		key: "ADDITIONAL_INFORMATION",
	},
	{
		value: "ACC",
		name: "Factor assignment clause",
		description: "Assignment based on an agreement between seller and factor.",
		key: "FACTOR_ASSIGNMENT_CLAUSE",
	},
	{
		value: "ACD",
		name: "Reason",
		description: "Reason for a request or response.",
		key: "REASON",
	},
	{
		value: "ACE",
		name: "Dispute",
		description:
			"A notice, usually from buyer to seller, that something was found wrong with goods delivered or the services rendered, or with the related invoice.",
		key: "DISPUTE",
	},
	{
		value: "ACF",
		name: "Additional attribute information",
		description:
			"The text refers to information about an additional attribute not otherwise specified.",
		key: "ADDITIONAL_ATTRIBUTE_INFORMATION",
	},
	{
		value: "ACG",
		name: "Absence declaration",
		description: "A declaration on the reason of the absence.",
		key: "ABSENCE_DECLARATION",
	},
	{
		value: "ACH",
		name: "Aggregation statement",
		description:
			"A statement on the way a specific variable or set of variables has been aggregated.",
		key: "AGGREGATION_STATEMENT",
	},
	{
		value: "ACI",
		name: "Compilation statement",
		description:
			"A statement on the compilation status of an array or other set of figures or calculations.",
		key: "COMPILATION_STATEMENT",
	},
	{
		value: "ACJ",
		name: "Definitional exception",
		description:
			"An exception to the agreed definition of a term, concept, formula or other object.",
		key: "DEFINITIONAL_EXCEPTION",
	},
	{
		value: "ACK",
		name: "Privacy statement",
		description:
			"A statement on the privacy or confidential nature of an object.",
		key: "PRIVACY_STATEMENT",
	},
	{
		value: "ACL",
		name: "Quality statement",
		description: "A statement on the quality of an object.",
		key: "QUALITY_STATEMENT",
	},
	{
		value: "ACM",
		name: "Statistical description",
		description:
			"The description of a statistical object such as a value list, concept, or structure definition.",
		key: "STATISTICAL_DESCRIPTION",
	},
	{
		value: "ACN",
		name: "Statistical definition",
		description:
			"The definition of a statistical object such as a value list, concept, or structure definition.",
		key: "STATISTICAL_DEFINITION",
	},
	{
		value: "ACO",
		name: "Statistical name",
		description:
			"The name of a statistical object such as a value list, concept or structure definition.",
		key: "STATISTICAL_NAME",
	},
	{
		value: "ACP",
		name: "Statistical title",
		description:
			"The title of a statistical object such as a value list, concept, or structure definition.",
		key: "STATISTICAL_TITLE",
	},
	{
		value: "ACQ",
		name: "Off-dimension information",
		description:
			"Information relating to differences between the actual transport dimensions and the normally applicable dimensions.",
		key: "OFF_DIMENSION_INFORMATION",
	},
	{
		value: "ACR",
		name: "Unexpected stops information",
		description:
			"Information relating to unexpected stops during a conveyance.",
		key: "UNEXPECTED_STOPS_INFORMATION",
	},
	{
		value: "ACS",
		name: "Principles",
		description:
			"Text subject is principles section of the UN/EDIFACT rules for presentation of standardized message and directories documentation.",
		key: "PRINCIPLES",
	},
	{
		value: "ACT",
		name: "Terms and definition",
		description:
			"Text subject is terms and definition section of the UN/EDIFACT rules for presentation of standardized message and directories documentation.",
		key: "TERMS_AND_DEFINITION",
	},
	{
		value: "ACU",
		name: "Segment name",
		description: "Text subject is segment name.",
		key: "SEGMENT_NAME",
	},
	{
		value: "ACV",
		name: "Simple data element name",
		description: "Text subject is name of simple data element.",
		key: "SIMPLE_DATA_ELEMENT_NAME",
	},
	{
		value: "ACW",
		name: "Scope",
		description:
			"Text subject is scope section of the UN/EDIFACT rules for presentation of standardized message and directories documentation.",
		key: "SCOPE",
	},
	{
		value: "ACX",
		name: "Message type name",
		description: "Text subject is name of message type.",
		key: "MESSAGE_TYPE_NAME",
	},
	{
		value: "ACY",
		name: "Introduction",
		description:
			"Text subject is introduction section of the UN/EDIFACT rules for presentation of standardized message and directories documentation.",
		key: "INTRODUCTION",
	},
	{
		value: "ACZ",
		name: "Glossary",
		description:
			"Text subject is glossary section of the UN/EDIFACT rules for presentation of standardized message and directories documentation.",
		key: "GLOSSARY",
	},
	{
		value: "ADA",
		name: "Functional definition",
		description:
			"Text subject is functional definition section of the UN/EDIFACT rules for presentation of standardized message and directories documentation.",
		key: "FUNCTIONAL_DEFINITION",
	},
	{
		value: "ADB",
		name: "Examples",
		description:
			"Text subject is examples as given in the example(s) section of the UN/EDIFACT rules for presentation of standardized message and directories documentation.",
		key: "EXAMPLES",
	},
	{
		value: "ADC",
		name: "Cover page",
		description:
			"Text subject is cover page of the UN/EDIFACT rules for presentation of standardized message and directories documentation.",
		key: "COVER_PAGE",
	},
	{
		value: "ADD",
		name: "Dependency (syntax) notes",
		description:
			"Denotes that the associated text is a dependency (syntax) note.",
		key: "DEPENDENCY_SYNTAX_NOTES",
	},
	{
		value: "ADE",
		name: "Code value name",
		description: "Text subject is name of code value.",
		key: "CODE_VALUE_NAME",
	},
	{
		value: "ADF",
		name: "Code list name",
		description: "Text subject is name of code list.",
		key: "CODE_LIST_NAME",
	},
	{
		value: "ADG",
		name: "Clarification of usage",
		description:
			"Text subject is an explanation of the intended usage of a segment or segment group.",
		key: "CLARIFICATION_OF_USAGE",
	},
	{
		value: "ADH",
		name: "Composite data element name",
		description: "Text subject is name of composite data element.",
		key: "COMPOSITE_DATA_ELEMENT_NAME",
	},
	{
		value: "ADI",
		name: "Field of application",
		description:
			"Text subject is field of application of the UN/EDIFACT rules for presentation of standardized message and directories documentation.",
		key: "FIELD_OF_APPLICATION",
	},
	{
		value: "ADJ",
		name: "Type of assets and liabilities",
		description: "Information describing the type of assets and liabilities.",
		key: "TYPE_OF_ASSETS_AND_LIABILITIES",
	},
	{
		value: "ADK",
		name: "Promotion information",
		description: "The text contains information about a promotion.",
		key: "PROMOTION_INFORMATION",
	},
	{
		value: "ADL",
		name: "Meter condition",
		description: "Description of the condition of a meter.",
		key: "METER_CONDITION",
	},
	{
		value: "ADM",
		name: "Meter reading information",
		description: "Information related to a particular reading of a meter.",
		key: "METER_READING_INFORMATION",
	},
	{
		value: "ADN",
		name: "Type of transaction reason",
		description:
			"Information describing the type of the reason of transaction.",
		key: "TYPE_OF_TRANSACTION_REASON",
	},
	{
		value: "ADO",
		name: "Type of survey question",
		description: "Type of survey question.",
		key: "TYPE_OF_SURVEY_QUESTION",
	},
	{
		value: "ADP",
		name: "Carrier's agent counter information",
		description: "Information for use at the counter of the carrier's agent.",
		key: "CARRIER_S_AGENT_COUNTER_INFORMATION",
	},
	{
		value: "ADQ",
		name: "Description of work item on equipment",
		description:
			"Description or code for the operation to be executed on the equipment.",
		key: "DESCRIPTION_OF_WORK_ITEM_ON_EQUIPMENT",
	},
	{
		value: "ADR",
		name: "Message definition",
		description: "Text subject is message definition.",
		key: "MESSAGE_DEFINITION",
	},
	{
		value: "ADS",
		name: "Booked item information",
		description: "Information pertaining to a booked item.",
		key: "BOOKED_ITEM_INFORMATION",
	},
	{
		value: "ADT",
		name: "Source of document",
		description: "Text subject is source of document.",
		key: "SOURCE_OF_DOCUMENT",
	},
	{
		value: "ADU",
		name: "Note",
		description: "Text subject is note.",
		key: "NOTE",
	},
	{
		value: "ADV",
		name: "Fixed part of segment clarification text",
		description: "Text subject is fixed part of segment clarification text.",
		key: "FIXED_PART_OF_SEGMENT_CLARIFICATION_TEXT",
	},
	{
		value: "ADW",
		name: "Characteristics of goods",
		description:
			"Description of the characteristic of goods in addition to the description of the goods.",
		key: "CHARACTERISTICS_OF_GOODS",
	},
	{
		value: "ADX",
		name: "Additional discharge instructions",
		description: "Special discharge instructions concerning the goods.",
		key: "ADDITIONAL_DISCHARGE_INSTRUCTIONS",
	},
	{
		value: "ADY",
		name: "Container stripping instructions",
		description: "Instructions regarding the stripping of container(s).",
		key: "CONTAINER_STRIPPING_INSTRUCTIONS",
	},
	{
		value: "ADZ",
		name: "CSC (Container Safety Convention) plate information",
		description:
			"Information on the CSC (Container Safety Convention) plate that is attached to the container.",
		key: "CSC_CONTAINER_SAFETY_CONVENTION_PLATE_INFORMATION",
	},
	{
		value: "AEA",
		name: "Cargo remarks",
		description: "Additional remarks concerning the cargo.",
		key: "CARGO_REMARKS",
	},
	{
		value: "AEB",
		name: "Temperature control instructions",
		description: "Instruction regarding the temperature control of the cargo.",
		key: "TEMPERATURE_CONTROL_INSTRUCTIONS",
	},
	{
		value: "AEC",
		name: "Text refers to expected data",
		description: "Remarks refer to data that was expected.",
		key: "TEXT_REFERS_TO_EXPECTED_DATA",
	},
	{
		value: "AED",
		name: "Text refers to received data",
		description: "Remarks refer to data that was received.",
		key: "TEXT_REFERS_TO_RECEIVED_DATA",
	},
	{
		value: "AEE",
		name: "Section clarification text",
		description: "Text subject is section clarification text.",
		key: "SECTION_CLARIFICATION_TEXT",
	},
	{
		value: "AEF",
		name: "Information to the beneficiary",
		description: "Information given to the beneficiary.",
		key: "INFORMATION_TO_THE_BENEFICIARY",
	},
	{
		value: "AEG",
		name: "Information to the applicant",
		description: "Information given to the applicant.",
		key: "INFORMATION_TO_THE_APPLICANT",
	},
	{
		value: "AEH",
		name: "Instructions to the beneficiary",
		description: "Instructions made to the beneficiary.",
		key: "INSTRUCTIONS_TO_THE_BENEFICIARY",
	},
	{
		value: "AEI",
		name: "Instructions to the applicant",
		description: "Instructions given to the applicant.",
		key: "INSTRUCTIONS_TO_THE_APPLICANT",
	},
	{
		value: "AEJ",
		name: "Controlled atmosphere",
		description: "Information about the controlled atmosphere.",
		key: "CONTROLLED_ATMOSPHERE",
	},
	{
		value: "AEK",
		name: "Take off annotation",
		description:
			"Additional information in plain text to support a take off annotation. Taking off is the process of assessing the quantity work from extracting the measurement from construction documentation.",
		key: "TAKE_OFF_ANNOTATION",
	},
	{
		value: "AEL",
		name: "Price variation narrative",
		description:
			"Additional information in plain language to support a price variation.",
		key: "PRICE_VARIATION_NARRATIVE",
	},
	{
		value: "AEM",
		name: "Documentary credit amendment instructions",
		description: "Documentary credit amendment instructions.",
		key: "DOCUMENTARY_CREDIT_AMENDMENT_INSTRUCTIONS",
	},
	{
		value: "AEN",
		name: "Standard method narrative",
		description:
			"Additional information in plain language to support a standard method.",
		key: "STANDARD_METHOD_NARRATIVE",
	},
	{
		value: "AEO",
		name: "Project narrative",
		description:
			"Additional information in plain language to support the project.",
		key: "PROJECT_NARRATIVE",
	},
	{
		value: "AEP",
		name: "Radioactive goods, additional information",
		description: "Additional information related to radioactive goods.",
		key: "RADIOACTIVE_GOODS_ADDITIONAL_INFORMATION",
	},
	{
		value: "AEQ",
		name: "Bank-to-bank information",
		description: "Information given from one bank to another.",
		key: "BANK_TO_BANK_INFORMATION",
	},
	{
		value: "AER",
		name: "Reimbursement instructions",
		description: "Instructions given for reimbursement purposes.",
		key: "REIMBURSEMENT_INSTRUCTIONS",
	},
	{
		value: "AES",
		name: "Reason for amending a message",
		description: "Identification of the reason for amending a message.",
		key: "REASON_FOR_AMENDING_A_MESSAGE",
	},
	{
		value: "AET",
		name: "Instructions to the paying and/or accepting and/or",
		description:
			"negotiating bank Instructions to the paying and/or accepting and/or negotiating bank.",
		key: "INSTRUCTIONS_TO_THE_PAYING_AND_OR_ACCEPTING_AND_OR",
	},
	{
		value: "AEU",
		name: "Interest instructions",
		description: "Instructions given about the interest.",
		key: "INTEREST_INSTRUCTIONS",
	},
	{
		value: "AEV",
		name: "Agent commission",
		description: "Instructions about agent commission.",
		key: "AGENT_COMMISSION",
	},
	{
		value: "AEW",
		name: "Remitting bank instructions",
		description: "Instructions to the remitting bank.",
		key: "REMITTING_BANK_INSTRUCTIONS",
	},
	{
		value: "AEX",
		name: "Instructions to the collecting bank",
		description:
			"Instructions to the bank, other than the remitting bank, involved in processing the collection.",
		key: "INSTRUCTIONS_TO_THE_COLLECTING_BANK",
	},
	{
		value: "AEY",
		name: "Collection amount instructions",
		description: "Instructions about the collection amount.",
		key: "COLLECTION_AMOUNT_INSTRUCTIONS",
	},
	{
		value: "AEZ",
		name: "Internal auditing information",
		description: "Text relating to internal auditing information.",
		key: "INTERNAL_AUDITING_INFORMATION",
	},
	{
		value: "AFA",
		name: "Constraint",
		description: "Denotes that the associated text is a constraint.",
		key: "CONSTRAINT",
	},
	{
		value: "AFB",
		name: "Comment",
		description: "Denotes that the associated text is a comment.",
		key: "COMMENT",
	},
	{
		value: "AFC",
		name: "Semantic note",
		description: "Denotes that the associated text is a semantic note.",
		key: "SEMANTIC_NOTE",
	},
	{
		value: "AFD",
		name: "Help text",
		description: "Denotes that the associated text is an item of help text.",
		key: "HELP_TEXT",
	},
	{
		value: "AFE",
		name: "Legend",
		description: "Denotes that the associated text is a legend.",
		key: "LEGEND",
	},
	{
		value: "AFF",
		name: "Batch code structure",
		description: "A description of the structure of a batch code.",
		key: "BATCH_CODE_STRUCTURE",
	},
	{
		value: "AFG",
		name: "Product application",
		description: "A general description of the application of a product.",
		key: "PRODUCT_APPLICATION",
	},
	{
		value: "AFH",
		name: "Customer complaint",
		description: "Complaint of customer.",
		key: "CUSTOMER_COMPLAINT",
	},
	{
		value: "AFI",
		name: "Probable cause of fault",
		description: "The probable cause of fault.",
		key: "PROBABLE_CAUSE_OF_FAULT",
	},
	{
		value: "AFJ",
		name: "Defect description",
		description: "Description of the defect.",
		key: "DEFECT_DESCRIPTION",
	},
	{
		value: "AFK",
		name: "Repair description",
		description: "The description of the work performed during the repair.",
		key: "REPAIR_DESCRIPTION",
	},
	{
		value: "AFL",
		name: "Review comments",
		description: "Comments relevant to a review.",
		key: "REVIEW_COMMENTS",
	},
	{
		value: "AFM",
		name: "Title",
		description: "Denotes that the associated text is a title.",
		key: "TITLE",
	},
	{
		value: "AFN",
		name: "Description of amount",
		description: "An amount description in clear text.",
		key: "DESCRIPTION_OF_AMOUNT",
	},
	{
		value: "AFO",
		name: "Responsibilities",
		description: "Information describing the responsibilities.",
		key: "RESPONSIBILITIES",
	},
	{
		value: "AFP",
		name: "Supplier",
		description: "Information concerning suppliers.",
		key: "SUPPLIER",
	},
	{
		value: "AFQ",
		name: "Purchase region",
		description:
			"Information concerning the region(s) where purchases are made.",
		key: "PURCHASE_REGION",
	},
	{
		value: "AFR",
		name: "Affiliation",
		description:
			"Information concerning an association of one party with another party(ies).",
		key: "AFFILIATION",
	},
	{
		value: "AFS",
		name: "Borrower",
		description: "Information concerning the borrower.",
		key: "BORROWER",
	},
	{
		value: "AFT",
		name: "Line of business",
		description: "Information concerning an entity's line of business.",
		key: "LINE_OF_BUSINESS",
	},
	{
		value: "AFU",
		name: "Financial institution",
		description: "Description of financial institution(s) used by an entity.",
		key: "FINANCIAL_INSTITUTION",
	},
	{
		value: "AFV",
		name: "Business founder",
		description: "Information about the business founder.",
		key: "BUSINESS_FOUNDER",
	},
	{
		value: "AFW",
		name: "Business history",
		description: "Description of the business history.",
		key: "BUSINESS_HISTORY",
	},
	{
		value: "AFX",
		name: "Banking arrangements",
		description: "Information concerning the general banking arrangements.",
		key: "BANKING_ARRANGEMENTS",
	},
	{
		value: "AFY",
		name: "Business origin",
		description: "Description of the business origin.",
		key: "BUSINESS_ORIGIN",
	},
	{
		value: "AFZ",
		name: "Brand names' description",
		description: "Description of the entity's brands.",
		key: "BRAND_NAMES_DESCRIPTION",
	},
	{
		value: "AGA",
		name: "Business financing details",
		description: "Details about the financing of the business.",
		key: "BUSINESS_FINANCING_DETAILS",
	},
	{
		value: "AGB",
		name: "Competition",
		description: "Information concerning an entity's competition.",
		key: "COMPETITION",
	},
	{
		value: "AGC",
		name: "Construction process details",
		description: "Details about the construction process.",
		key: "CONSTRUCTION_PROCESS_DETAILS",
	},
	{
		value: "AGD",
		name: "Construction specialty",
		description:
			"Information concerning the line of business of a construction entity.",
		key: "CONSTRUCTION_SPECIALTY",
	},
	{
		value: "AGE",
		name: "Contract information",
		description: "Details about contract(s).",
		key: "CONTRACT_INFORMATION",
	},
	{
		value: "AGF",
		name: "Corporate filing",
		description: "Details about a corporate filing.",
		key: "CORPORATE_FILING",
	},
	{
		value: "AGG",
		name: "Customer information",
		description: "Description of customers.",
		key: "CUSTOMER_INFORMATION",
	},
	{
		value: "AGH",
		name: "Copyright notice",
		description: "Information concerning the copyright notice.",
		key: "COPYRIGHT_NOTICE",
	},
	{
		value: "AGI",
		name: "Contingent debt",
		description: "Details about the contingent debt.",
		key: "CONTINGENT_DEBT",
	},
	{
		value: "AGJ",
		name: "Conviction details",
		description:
			"Details about the law or penal codes that resulted in conviction.",
		key: "CONVICTION_DETAILS",
	},
	{
		value: "AGK",
		name: "Equipment",
		description: "Description of equipment.",
		key: "EQUIPMENT",
	},
	{
		value: "AGL",
		name: "Workforce description",
		description: "Comments about the workforce.",
		key: "WORKFORCE_DESCRIPTION",
	},
	{
		value: "AGM",
		name: "Exemption",
		description: "Description about exemptions.",
		key: "EXEMPTION",
	},
	{
		value: "AGN",
		name: "Future plans",
		description: "Information on future plans.",
		key: "FUTURE_PLANS",
	},
	{
		value: "AGO",
		name: "Interviewee conversation information",
		description: "Information concerning the interviewee conversation.",
		key: "INTERVIEWEE_CONVERSATION_INFORMATION",
	},
	{
		value: "AGP",
		name: "Intangible asset",
		description: "Description of intangible asset(s).",
		key: "INTANGIBLE_ASSET",
	},
	{
		value: "AGQ",
		name: "Inventory",
		description: "Description of the inventory.",
		key: "INVENTORY",
	},
	{
		value: "AGR",
		name: "Investment",
		description: "Description of the investments.",
		key: "INVESTMENT",
	},
	{
		value: "AGS",
		name: "Intercompany relations information",
		description: "Description of the intercompany relations.",
		key: "INTERCOMPANY_RELATIONS_INFORMATION",
	},
	{
		value: "AGT",
		name: "Joint venture",
		description: "Description of the joint venture.",
		key: "JOINT_VENTURE",
	},
	{
		value: "AGU",
		name: "Loan",
		description: "Description of a loan.",
		key: "LOAN",
	},
	{
		value: "AGV",
		name: "Long term debt",
		description: "Description of the long term debt.",
		key: "LONG_TERM_DEBT",
	},
	{
		value: "AGW",
		name: "Location",
		description: "Description of a location.",
		key: "LOCATION",
	},
	{
		value: "AGX",
		name: "Current legal structure",
		description: "Details on the current legal structure.",
		key: "CURRENT_LEGAL_STRUCTURE",
	},
	{
		value: "AGY",
		name: "Marital contract",
		description: "Details on a marital contract.",
		key: "MARITAL_CONTRACT",
	},
	{
		value: "AGZ",
		name: "Marketing activities",
		description: "Information concerning marketing activities.",
		key: "MARKETING_ACTIVITIES",
	},
	{
		value: "AHA",
		name: "Merger",
		description: "Description of a merger.",
		key: "MERGER",
	},
	{
		value: "AHB",
		name: "Marketable securities",
		description: "Description of the marketable securities.",
		key: "MARKETABLE_SECURITIES",
	},
	{
		value: "AHC",
		name: "Business debt",
		description: "Description of the business debt(s).",
		key: "BUSINESS_DEBT",
	},
	{
		value: "AHD",
		name: "Original legal structure",
		description: "Information concerning the original legal structure.",
		key: "ORIGINAL_LEGAL_STRUCTURE",
	},
	{
		value: "AHE",
		name: "Employee sharing arrangements",
		description:
			"Information describing how a company uses employees from another company.",
		key: "EMPLOYEE_SHARING_ARRANGEMENTS",
	},
	{
		value: "AHF",
		name: "Organization details",
		description: "Description about the organization of a company.",
		key: "ORGANIZATION_DETAILS",
	},
	{
		value: "AHG",
		name: "Public record details",
		description: "Information concerning public records.",
		key: "PUBLIC_RECORD_DETAILS",
	},
	{
		value: "AHH",
		name: "Price range",
		description:
			"Information concerning the price range of products made or sold.",
		key: "PRICE_RANGE",
	},
	{
		value: "AHI",
		name: "Qualifications",
		description:
			"Information on the accomplishments fitting a party for a position.",
		key: "QUALIFICATIONS",
	},
	{
		value: "AHJ",
		name: "Registered activity",
		description: "Information concerning the registered activity.",
		key: "REGISTERED_ACTIVITY",
	},
	{
		value: "AHK",
		name: "Criminal sentence",
		description:
			"Description of the sentence imposed in a criminal proceeding.",
		key: "CRIMINAL_SENTENCE",
	},
	{
		value: "AHL",
		name: "Sales method",
		description: "Description of the selling means.",
		key: "SALES_METHOD",
	},
	{
		value: "AHM",
		name: "Educational institution information",
		description: "Free form description relating to the school(s) attended.",
		key: "EDUCATIONAL_INSTITUTION_INFORMATION",
	},
	{
		value: "AHN",
		name: "Status details",
		description: "Describes the status details.",
		key: "STATUS_DETAILS",
	},
	{
		value: "AHO",
		name: "Sales",
		description: "Description of the sales.",
		key: "SALES",
	},
	{
		value: "AHP",
		name: "Spouse information",
		description: "Information about the spouse.",
		key: "SPOUSE_INFORMATION",
	},
	{
		value: "AHQ",
		name: "Educational degree information",
		description: "Details about the educational degree received from a school.",
		key: "EDUCATIONAL_DEGREE_INFORMATION",
	},
	{
		value: "AHR",
		name: "Shareholding information",
		description: "General description of shareholding.",
		key: "SHAREHOLDING_INFORMATION",
	},
	{
		value: "AHS",
		name: "Sales territory",
		description: "Information on the sales territory.",
		key: "SALES_TERRITORY",
	},
	{
		value: "AHT",
		name: "Accountant's comments",
		description:
			"Comments made by an accountant regarding a financial statement.",
		key: "ACCOUNTANT_S_COMMENTS",
	},
	{
		value: "AHU",
		name: "Exemption law location",
		description:
			"Description of the exemption provided to a location by a law.",
		key: "EXEMPTION_LAW_LOCATION",
	},
	{
		value: "AHV",
		name: "Share classifications",
		description: "Information about the classes or categories of shares.",
		key: "SHARE_CLASSIFICATIONS",
	},
	{
		value: "AHW",
		name: "Forecast",
		description: "Description of a prediction.",
		key: "FORECAST",
	},
	{
		value: "AHX",
		name: "Event location",
		description: "Description of the location of an event.",
		key: "EVENT_LOCATION",
	},
	{
		value: "AHY",
		name: "Facility occupancy",
		description: "Information related to occupancy of a facility.",
		key: "FACILITY_OCCUPANCY",
	},
	{
		value: "AHZ",
		name: "Import and export details",
		description:
			"Specific information provided about the importation and exportation of goods.",
		key: "IMPORT_AND_EXPORT_DETAILS",
	},
	{
		value: "AIA",
		name: "Additional facility information",
		description: "Additional information about a facility.",
		key: "ADDITIONAL_FACILITY_INFORMATION",
	},
	{
		value: "AIB",
		name: "Inventory value",
		description: "Description of the value of inventory.",
		key: "INVENTORY_VALUE",
	},
	{
		value: "AIC",
		name: "Education",
		description: "Description of the education of a person.",
		key: "EDUCATION",
	},
	{
		value: "AID",
		name: "Event",
		description: "Description of a thing that happens or takes place.",
		key: "EVENT",
	},
	{
		value: "AIE",
		name: "Agent",
		description: "Information about agents the entity uses.",
		key: "AGENT",
	},
	{
		value: "AIF",
		name: "Domestically agreed financial statement details",
		description: "Details of domestically agreed financial statement.",
		key: "DOMESTICALLY_AGREED_FINANCIAL_STATEMENT_DETAILS",
	},
	{
		value: "AIG",
		name: "Other current asset description",
		description: "Description of other current asset.",
		key: "OTHER_CURRENT_ASSET_DESCRIPTION",
	},
	{
		value: "AIH",
		name: "Other current liability description",
		description: "Description of other current liability.",
		key: "OTHER_CURRENT_LIABILITY_DESCRIPTION",
	},
	{
		value: "AII",
		name: "Former business activity",
		description: "Description of the former line of business.",
		key: "FORMER_BUSINESS_ACTIVITY",
	},
	{
		value: "AIJ",
		name: "Trade name use",
		description: "Description of how a trading name is used.",
		key: "TRADE_NAME_USE",
	},
	{
		value: "AIK",
		name: "Signing authority",
		description: "Description of the authorized signatory.",
		key: "SIGNING_AUTHORITY",
	},
	{
		value: "AIL",
		name: "Guarantee",
		description: "[4376] Description of guarantee.",
		key: "GUARANTEE",
	},
	{
		value: "AIM",
		name: "Holding company operation",
		description: "Description of the operation of a holding company.",
		key: "HOLDING_COMPANY_OPERATION",
	},
	{
		value: "AIN",
		name: "Consignment routing",
		description: "Information on routing of the consignment.",
		key: "CONSIGNMENT_ROUTING",
	},
	{
		value: "AIO",
		name: "Letter of protest",
		description: "A letter citing any condition in dispute.",
		key: "LETTER_OF_PROTEST",
	},
	{
		value: "AIP",
		name: "Question",
		description: "A free text question.",
		key: "QUESTION",
	},
	{
		value: "AIQ",
		name: "Party information",
		description: "Free text information related to a party.",
		key: "PARTY_INFORMATION",
	},
	{
		value: "AIR",
		name: "Area boundaries description",
		description: "Description of the boundaries of a geographical area.",
		key: "AREA_BOUNDARIES_DESCRIPTION",
	},
	{
		value: "AIS",
		name: "Advertisement information",
		description: "The free text contains advertisement information.",
		key: "ADVERTISEMENT_INFORMATION",
	},
	{
		value: "AIT",
		name: "Financial statement details",
		description: "Details regarding the financial statement in free text.",
		key: "FINANCIAL_STATEMENT_DETAILS",
	},
	{
		value: "AIU",
		name: "Access instructions",
		description: "Description of how to access an entity.",
		key: "ACCESS_INSTRUCTIONS",
	},
	{
		value: "AIV",
		name: "Liquidity",
		description: "Description of an entity's liquidity.",
		key: "LIQUIDITY",
	},
	{
		value: "AIW",
		name: "Credit line",
		description: "Description of the line of credit available to an entity.",
		key: "CREDIT_LINE",
	},
	{
		value: "AIX",
		name: "Warranty terms",
		description:
			"Text describing the terms of warranty which apply to a product or service.",
		key: "WARRANTY_TERMS",
	},
	{
		value: "AIY",
		name: "Division description",
		description: "Plain language description of a division of an entity.",
		key: "DIVISION_DESCRIPTION",
	},
	{
		value: "AIZ",
		name: "Reporting instruction",
		description: "Instruction on how to report.",
		key: "REPORTING_INSTRUCTION",
	},
	{
		value: "AJA",
		name: "Examination result",
		description: "The result of an examination.",
		key: "EXAMINATION_RESULT",
	},
	{
		value: "AJB",
		name: "Laboratory result",
		description: "The result of a laboratory investigation.",
		key: "LABORATORY_RESULT",
	},
	{
		value: "ALC",
		name: "Allowance/charge information",
		description: "Information referring to allowance/charge.",
		key: "ALLOWANCE_CHARGE_INFORMATION",
	},
	{
		value: "ALD",
		name: "X-ray result",
		description: "The result of an X-ray examination.",
		key: "X_RAY_RESULT",
	},
	{
		value: "ALE",
		name: "Pathology result",
		description: "The result of a pathology investigation.",
		key: "PATHOLOGY_RESULT",
	},
	{
		value: "ALF",
		name: "Intervention description",
		description: "Details of an intervention.",
		key: "INTERVENTION_DESCRIPTION",
	},
	{
		value: "ALG",
		name: "Summary of admittance",
		description: "Summary description of admittance.",
		key: "SUMMARY_OF_ADMITTANCE",
	},
	{
		value: "ALH",
		name: "Medical treatment course detail",
		description: "Details of a course of medical treatment.",
		key: "MEDICAL_TREATMENT_COURSE_DETAIL",
	},
	{
		value: "ALI",
		name: "Prognosis",
		description: "Details of a prognosis.",
		key: "PROGNOSIS",
	},
	{
		value: "ALJ",
		name: "Instruction to patient",
		description: "Instruction given to a patient.",
		key: "INSTRUCTION_TO_PATIENT",
	},
	{
		value: "ALK",
		name: "Instruction to physician",
		description: "Instruction given to a physician.",
		key: "INSTRUCTION_TO_PHYSICIAN",
	},
	{
		value: "ALL",
		name: "All documents",
		description: "The note implies to all documents.",
		key: "ALL_DOCUMENTS",
	},
	{
		value: "ALM",
		name: "Medicine treatment",
		description: "Details of medicine treatment.",
		key: "MEDICINE_TREATMENT",
	},
	{
		value: "ALN",
		name: "Medicine dosage and administration",
		description: "Details of medicine dosage and method of administration.",
		key: "MEDICINE_DOSAGE_AND_ADMINISTRATION",
	},
	{
		value: "ALO",
		name: "Availability of patient",
		description: "Details of when and/or where the patient is available.",
		key: "AVAILABILITY_OF_PATIENT",
	},
	{
		value: "ALP",
		name: "Reason for service request",
		description: "Details of the reason for a requested service.",
		key: "REASON_FOR_SERVICE_REQUEST",
	},
	{
		value: "ALQ",
		name: "Purpose of service",
		description: "Details of the purpose of a service.",
		key: "PURPOSE_OF_SERVICE",
	},
	{
		value: "ARR",
		name: "Arrival conditions",
		description: "Conditions under which arrival takes place.",
		key: "ARRIVAL_CONDITIONS",
	},
	{
		value: "ARS",
		name: "Service requester's comment",
		description: "Comment by the requester of a service.",
		key: "SERVICE_REQUESTER_S_COMMENT",
	},
	{
		value: "AUT",
		name: "Authentication",
		description:
			"(4130) (4136) (4426) Name, code, password etc. given for authentication purposes.",
		key: "AUTHENTICATION",
	},
	{
		value: "AUU",
		name: "Requested location description",
		description: "The description of the location requested.",
		key: "REQUESTED_LOCATION_DESCRIPTION",
	},
	{
		value: "AUV",
		name: "Medicine administration condition",
		description:
			"The event or condition that initiates the administration of a single dose of medicine or a period of treatment.",
		key: "MEDICINE_ADMINISTRATION_CONDITION",
	},
	{
		value: "AUW",
		name: "Patient information",
		description: "Information concerning a patient.",
		key: "PATIENT_INFORMATION",
	},
	{
		value: "AUX",
		name: "Precautionary measure",
		description: "Action to be taken to avert possible harmful affects.",
		key: "PRECAUTIONARY_MEASURE",
	},
	{
		value: "AUY",
		name: "Service characteristic",
		description:
			"Free text description is related to a service characteristic.",
		key: "SERVICE_CHARACTERISTIC",
	},
	{
		value: "AUZ",
		name: "Planned event comment",
		description: "Comment about an event that is planned.",
		key: "PLANNED_EVENT_COMMENT",
	},
	{
		value: "AVA",
		name: "Expected delay comment",
		description: "Comment about the expected delay.",
		key: "EXPECTED_DELAY_COMMENT",
	},
	{
		value: "AVB",
		name: "Transport requirements comment",
		description: "Comment about the requirements for transport.",
		key: "TRANSPORT_REQUIREMENTS_COMMENT",
	},
	{
		value: "AVC",
		name: "Temporary approval condition",
		description: "The condition under which the approval is considered.",
		key: "TEMPORARY_APPROVAL_CONDITION",
	},
	{
		value: "AVD",
		name: "Customs Valuation Information",
		description:
			"Information provided in this category will be used by the trader to make certain declarations in relation to Customs Valuation.",
		key: "CUSTOMS_VALUATION_INFORMATION",
	},
	{
		value: "AVE",
		name: "Value Added Tax (VAT) margin scheme",
		description: "Description of the VAT margin scheme applied.",
		key: "VALUE_ADDED_TAX_VAT_MARGIN_SCHEME",
	},
	{
		value: "AVF",
		name: "Maritime Declaration of Health",
		description: "Information about Maritime Declaration of Health.",
		key: "MARITIME_DECLARATION_OF_HEALTH",
	},
	{
		value: "BAG",
		name: "Passenger baggage information",
		description:
			"Information related to baggage tendered by a passenger, such as odd size indication, tag.",
		key: "PASSENGER_BAGGAGE_INFORMATION",
	},
	{
		value: "BAH",
		name: "Maritime Declaration of Health",
		description: "Information about Maritime Declaration of Health.",
		key: "MARITIME_DECLARATION_OF_HEALTH",
	},
	{
		value: "BAI",
		name: "Additional product information address",
		description:
			"Address at which additional information on the product can be found.",
		key: "ADDITIONAL_PRODUCT_INFORMATION_ADDRESS",
	},
	{
		value: "BAJ",
		name: "Information to be printed on despatch advice",
		description:
			"Specification of free text information which is to be printed on a despatch advice.",
		key: "INFORMATION_TO_BE_PRINTED_ON_DESPATCH_ADVICE",
	},
	{
		value: "BAK",
		name: "Missing goods remarks",
		description: "Remarks concerning missing goods.",
		key: "MISSING_GOODS_REMARKS",
	},
	{
		value: "BAL",
		name: "Non-acceptance information",
		description:
			"Information related to the non-acceptance of an order, goods or a consignment.",
		key: "NON_ACCEPTANCE_INFORMATION",
	},
	{
		value: "BAM",
		name: "Returns information",
		description: "Information related to the return of items.",
		key: "RETURNS_INFORMATION",
	},
	{
		value: "BAN",
		name: "Sub-line item information",
		description: "Note contains information related to sub-line item data.",
		key: "SUB_LINE_ITEM_INFORMATION",
	},
	{
		value: "BAO",
		name: "Test information",
		description: "Information related to a test.",
		key: "TEST_INFORMATION",
	},
	{
		value: "BAP",
		name: "External link",
		description: "The external link to a digital document (e.g.: URL).",
		key: "EXTERNAL_LINK",
	},
	{
		value: "BAQ",
		name: "VAT exemption reason",
		description: "Reason for Value Added Tax (VAT) exemption.",
		key: "VAT_EXEMPTION_REASON",
	},
	{
		value: "BAR",
		name: "Processing Instructions",
		description: "Instructions for processing.",
		key: "PROCESSING_INSTRUCTIONS",
	},
	{
		value: "BAS",
		name: "Relay Instructions",
		description: "Instructions for relaying.",
		key: "RELAY_INSTRUCTIONS",
	},
	{
		value: "BAT",
		name: "SIMA applicable",
		description: "Identifies that Special Import Measures Act applies",
		key: "SIMA_APPLICABLE",
	},
	{
		value: "BAU",
		name: "Appeals program code",
		description: "Identifies information related to an appeals program.",
		key: "APPEALS_PROGRAM_CODE",
	},
	{
		value: "BAV",
		name: "SIMA subject",
		description:
			"Identifies if the goods are subject to a Special Import Measures Act measure.",
		key: "SIMA_SUBJECT",
	},
	{
		value: "BAW",
		name: "Surtax applicable",
		description: "Identifies that surtax applies",
		key: "SURTAX_APPLICABLE",
	},
	{
		value: "BAX",
		name: "SIMA security bond",
		description:
			"Identifies that there is a security bond in hand that could theoretically be used to cover Special Import Measures Act charges",
		key: "SIMA_SECURITY_BOND",
	},
	{
		value: "BAY",
		name: "Surtax subject",
		description: "Identifies if the goods are subject to a surtax measure",
		key: "SURTAX_SUBJECT",
	},
	{
		value: "BAZ",
		name: "Safeguard applicable",
		description: "Identifies safeguard applies",
		key: "SAFEGUARD_APPLICABLE",
	},
	{
		value: "BBA",
		name: "Safeguard applicable",
		description: "Identifies safeguard applies",
		key: "SAFEGUARD_APPLICABLE",
	},
	{
		value: "BBB",
		name: "Safeguard subject",
		description: "Identifies if the goods are subject to a safeguard measure",
		key: "SAFEGUARD_SUBJECT",
	},
	{
		value: "BLC",
		name: "Transport contract document clause",
		description:
			"[4180] Clause on a transport document regarding the cargo being consigned. Synonym: Bill of Lading clause.",
		key: "TRANSPORT_CONTRACT_DOCUMENT_CLAUSE",
	},
	{
		value: "BLD",
		name: "Instruction to prepare the patient",
		description: "Instruction with the purpose of preparing the patient.",
		key: "INSTRUCTION_TO_PREPARE_THE_PATIENT",
	},
	{
		value: "BLE",
		name: "Medicine treatment comment",
		description: "Comment about treatment with medicine.",
		key: "MEDICINE_TREATMENT_COMMENT",
	},
	{
		value: "BLF",
		name: "Examination result comment",
		description: "Comment about the result of an examination.",
		key: "EXAMINATION_RESULT_COMMENT",
	},
	{
		value: "BLG",
		name: "Service request comment",
		description: "Comment about the requested service.",
		key: "SERVICE_REQUEST_COMMENT",
	},
	{
		value: "BLH",
		name: "Prescription reason",
		description: "Details of the reason for a prescription.",
		key: "PRESCRIPTION_REASON",
	},
	{
		value: "BLI",
		name: "Prescription comment",
		description: "Comment concerning a specified prescription.",
		key: "PRESCRIPTION_COMMENT",
	},
	{
		value: "BLJ",
		name: "Clinical investigation comment",
		description: "Comment concerning a clinical investigation.",
		key: "CLINICAL_INVESTIGATION_COMMENT",
	},
	{
		value: "BLK",
		name: "Medicinal specification comment",
		description: "Comment concerning the specification of a medicinal product.",
		key: "MEDICINAL_SPECIFICATION_COMMENT",
	},
	{
		value: "BLL",
		name: "Economic contribution comment",
		description: "Comment concerning economic contribution.",
		key: "ECONOMIC_CONTRIBUTION_COMMENT",
	},
	{
		value: "BLM",
		name: "Status of a plan",
		description: "Comment about the status of a plan.",
		key: "STATUS_OF_A_PLAN",
	},
	{
		value: "BLN",
		name: "Random sample test information",
		description: "Information regarding a random sample test.",
		key: "RANDOM_SAMPLE_TEST_INFORMATION",
	},
	{
		value: "BLO",
		name: "Period of time",
		description: "Text subject is a period of time.",
		key: "PERIOD_OF_TIME",
	},
	{
		value: "BLP",
		name: "Legislation",
		description: "Information about legislation.",
		key: "LEGISLATION",
	},
	{
		value: "BLQ",
		name: "Security measures requested",
		description:
			"Text describing security measures that are requested to be executed (e.g. access controls, supervision of ship's stores).",
		key: "SECURITY_MEASURES_REQUESTED",
	},
	{
		value: "BLR",
		name: "Transport contract document remark",
		description:
			"[4244] Remarks concerning the complete consignment to be printed on the transport document. Synonym: Bill of Lading remark.",
		key: "TRANSPORT_CONTRACT_DOCUMENT_REMARK",
	},
	{
		value: "BLS",
		name: "Previous port of call security information",
		description:
			"Text describing the security information as applicable at the port facility in the previous port where a ship/port interface was conducted.",
		key: "PREVIOUS_PORT_OF_CALL_SECURITY_INFORMATION",
	},
	{
		value: "BLT",
		name: "Security information",
		description:
			"Text describing security related information (e.g security measures currently in force on a vessel).",
		key: "SECURITY_INFORMATION",
	},
	{
		value: "BLU",
		name: "Waste information",
		description: "Text describing waste related information.",
		key: "WASTE_INFORMATION",
	},
	{
		value: "BLV",
		name: "B2C marketing information, short description",
		description: "Consumer marketing information, short description.",
		key: "B2_C_MARKETING_INFORMATION_SHORT_DESCRIPTION",
	},
	{
		value: "BLW",
		name: "B2B marketing information, long description",
		description: "Trading partner marketing information, long description.",
		key: "B2_B_MARKETING_INFORMATION_LONG_DESCRIPTION",
	},
	{
		value: "BLX",
		name: "B2C marketing information, long description",
		description: "Consumer marketing information, long description.",
		key: "B2_C_MARKETING_INFORMATION_LONG_DESCRIPTION",
	},
	{
		value: "BLY",
		name: "Product ingredients",
		description: "Information on the ingredient make up of the product.",
		key: "PRODUCT_INGREDIENTS",
	},
	{
		value: "BLZ",
		name: "Location short name",
		description:
			"Short name of a location e.g. for display or printing purposes.",
		key: "LOCATION_SHORT_NAME",
	},
	{
		value: "BMA",
		name: "Packaging material information",
		description:
			"The text contains a description of the material used for packaging.",
		key: "PACKAGING_MATERIAL_INFORMATION",
	},
	{
		value: "BMB",
		name: "Filler material information",
		description: "Text contains information on the material used for stuffing.",
		key: "FILLER_MATERIAL_INFORMATION",
	},
	{
		value: "BMC",
		name: "Ship-to-ship activity information",
		description: "Text contains information on ship-to-ship activities.",
		key: "SHIP_TO_SHIP_ACTIVITY_INFORMATION",
	},
	{
		value: "BMD",
		name: "Package material description",
		description:
			"A description of the type of material for packaging beyond the level covered by standards such as UN Recommendation 21.",
		key: "PACKAGE_MATERIAL_DESCRIPTION",
	},
	{
		value: "BME",
		name: "Consumer level package marking",
		description:
			"Textual representation of the markings on a consumer level package.",
		key: "CONSUMER_LEVEL_PACKAGE_MARKING",
	},
	{
		value: "BMF",
		name: "SIMA measure in force",
		description:
			"Identifies the specific Special Import Measures Act measure related to the goods",
		key: "SIMA_MEASURE_IN_FORCE",
	},
	{
		value: "BMG",
		name: "Pre-CARM",
		description:
			"Identifiication of how the transmission should be processed regarding submissions transmitted prior to implementation of Canada Border Services Agency�s Assessment and Revenue Management (CARM) project",
		key: "PRE_CARM",
	},
	{
		value: "BMH",
		name: "SIMA measure type",
		description:
			"Identification of the type of Special Import Measures Act measure",
		key: "SIMA_MEASURE_TYPE",
	},
	{
		value: "CCI",
		name: "Customs clearance instructions",
		description:
			"Any coded or clear instruction agreed by customer and carrier regarding the declaration of the goods.",
		key: "CUSTOMS_CLEARANCE_INSTRUCTIONS",
	},
	{
		value: "CCJ",
		name: "Sub Type Code",
		description: "Code which identifies a secondary form type",
		key: "SUB_TYPE_CODE",
	},
	{
		value: "CCK",
		name: "SIMA information",
		description:
			"Additional information detailing Special Import Measures Act information",
		key: "SIMA_INFORMATION",
	},
	{
		value: "CCL",
		name: "Time limit end",
		description: "The date the goods exited the economy or warehouse",
		key: "TIME_LIMIT_END",
	},
	{
		value: "CCM",
		name: "Time limit start",
		description: "The date the goods entered the economy or warehouse",
		key: "TIME_LIMIT_START",
	},
	{
		value: "CCN",
		name: "Warehouse time limit",
		description: "The amount of time goods may remain in the warehouse",
		key: "WAREHOUSE_TIME_LIMIT",
	},
	{
		value: "CCO",
		name: "Value for duty information",
		description:
			"Additional information detailing the basis on which the value for duty was determined",
		key: "VALUE_FOR_DUTY_INFORMATION",
	},
	{
		value: "CEX",
		name: "Customs clearance instructions export",
		description:
			"Any coded or clear instruction agreed by customer and carrier regarding the export declaration of the goods.",
		key: "CUSTOMS_CLEARANCE_INSTRUCTIONS_EXPORT",
	},
	{
		value: "CHG",
		name: "Change information",
		description: "Note contains change information.",
		key: "CHANGE_INFORMATION",
	},
	{
		value: "CIP",
		name: "Customs clearance instruction import",
		description:
			"Any coded or clear instruction agreed by customer and carrier regarding the import declaration of the goods.",
		key: "CUSTOMS_CLEARANCE_INSTRUCTION_IMPORT",
	},
	{
		value: "CLP",
		name: "Clearance place requested",
		description:
			"Name of the place where Customs clearance is asked to be executed as requested by the consignee/consignor.",
		key: "CLEARANCE_PLACE_REQUESTED",
	},
	{
		value: "CLR",
		name: "Loading remarks",
		description: "Instructions concerning the loading of the container.",
		key: "LOADING_REMARKS",
	},
	{
		value: "COI",
		name: "Order information",
		description: "Additional information related to an order.",
		key: "ORDER_INFORMATION",
	},
	{
		value: "CUR",
		name: "Customer remarks",
		description: "Remarks from or for a supplier of goods or services.",
		key: "CUSTOMER_REMARKS",
	},
	{
		value: "CUS",
		name: "Customs declaration information",
		description: "(4034) Note contains customs declaration information.",
		key: "CUSTOMS_DECLARATION_INFORMATION",
	},
	{
		value: "DAR",
		name: "Damage remarks",
		description: "Remarks concerning damage on the cargo.",
		key: "DAMAGE_REMARKS",
	},
	{
		value: "DCL",
		name: "Document issuer declaration",
		description:
			"[4020] Text of a declaration made by the issuer of a document.",
		key: "DOCUMENT_ISSUER_DECLARATION",
	},
	{
		value: "DEL",
		name: "Delivery information",
		description: "Information about delivery.",
		key: "DELIVERY_INFORMATION",
	},
	{
		value: "DIN",
		name: "Delivery instructions",
		description: "[4492] Instructions regarding the delivery of the cargo.",
		key: "DELIVERY_INSTRUCTIONS",
	},
	{
		value: "DOC",
		name: "Documentation instructions",
		description: "Instructions pertaining to the documentation.",
		key: "DOCUMENTATION_INSTRUCTIONS",
	},
	{
		value: "DUT",
		name: "Duty declaration",
		description:
			"The text contains a statement constituting a duty declaration.",
		key: "DUTY_DECLARATION",
	},
	{
		value: "EUR",
		name: "Effective used routing",
		description:
			"Physical route effectively used for the movement of the means of transport.",
		key: "EFFECTIVE_USED_ROUTING",
	},
	{
		value: "FBC",
		name: "First block to be printed on the transport contract",
		description:
			"The first block of text to be printed on the transport contract.",
		key: "FIRST_BLOCK_TO_BE_PRINTED_ON_THE_TRANSPORT_CONTRACT",
	},
	{
		value: "GBL",
		name: "Government bill of lading information",
		description:
			"Free text information on a transport document to indicate payment information by Government Bill of Lading.",
		key: "GOVERNMENT_BILL_OF_LADING_INFORMATION",
	},
	{
		value: "GEN",
		name: "Entire transaction set",
		description:
			"Note is general in nature, applies to entire transaction segment.",
		key: "ENTIRE_TRANSACTION_SET",
	},
	{
		value: "GS7",
		name: "Further information concerning GGVS par. 7",
		description:
			"Special permission for road transport of certain goods in the German dangerous goods regulation for road transport.",
		key: "FURTHER_INFORMATION_CONCERNING_GGVS_PAR_7",
	},
	{
		value: "HAN",
		name: "Consignment handling instruction",
		description:
			"[4078] Free form description of a set of handling instructions. For example how specified goods, packages or transport equipment (container) should be handled.",
		key: "CONSIGNMENT_HANDLING_INSTRUCTION",
	},
	{
		value: "HAZ",
		name: "Hazard information",
		description: "Information pertaining to a hazard.",
		key: "HAZARD_INFORMATION",
	},
	{
		value: "ICN",
		name: "Consignment information for consignee",
		description:
			"[4070] Any remarks given for the information of the consignee.",
		key: "CONSIGNMENT_INFORMATION_FOR_CONSIGNEE",
	},
	{
		value: "IIN",
		name: "Insurance instructions",
		description: "(4112) Instructions regarding the cargo insurance.",
		key: "INSURANCE_INSTRUCTIONS",
	},
	{
		value: "IMI",
		name: "Invoice mailing instructions",
		description:
			"Instructions as to which freight and charges components have to be mailed to whom.",
		key: "INVOICE_MAILING_INSTRUCTIONS",
	},
	{
		value: "IND",
		name: "Commercial invoice item description",
		description: "Free text describing goods on a commercial invoice line.",
		key: "COMMERCIAL_INVOICE_ITEM_DESCRIPTION",
	},
	{
		value: "INS",
		name: "Insurance information",
		description: "Specific note contains insurance information.",
		key: "INSURANCE_INFORMATION",
	},
	{
		value: "INV",
		name: "Invoice instruction",
		description: "Note contains invoice instructions.",
		key: "INVOICE_INSTRUCTION",
	},
	{
		value: "IRP",
		name: "Information for railway purpose",
		description:
			"Data entered by railway stations when required, e.g. specified trains, additional sheets for freight calculations, special measures, etc.",
		key: "INFORMATION_FOR_RAILWAY_PURPOSE",
	},
	{
		value: "ITR",
		name: "Inland transport details",
		description:
			"Information concerning the pre-carriage to the port of discharge if by other means than a vessel.",
		key: "INLAND_TRANSPORT_DETAILS",
	},
	{
		value: "ITS",
		name: "Testing instructions",
		description:
			"Instructions regarding the testing that is required to be carried out on the items in the transaction.",
		key: "TESTING_INSTRUCTIONS",
	},
	{
		value: "LAN",
		name: "Location Alias",
		description: "Alternative name for a location.",
		key: "LOCATION_ALIAS",
	},
	{
		value: "LIN",
		name: "Line item",
		description: "Note contains line item information.",
		key: "LINE_ITEM",
	},
	{
		value: "LOI",
		name: "Loading instruction",
		description:
			"[4080] Instructions where specified packages or containers are to be loaded on a means of transport.",
		key: "LOADING_INSTRUCTION",
	},
	{
		value: "MCO",
		name: "Miscellaneous charge order",
		description:
			"Free text accounting information on an IATA Air Waybill to indicate payment information by Miscellaneous charge order.",
		key: "MISCELLANEOUS_CHARGE_ORDER",
	},
	{
		value: "MDH",
		name: "Maritime Declaration of Health",
		description: "Information about Maritime Declaration of Health.",
		key: "MARITIME_DECLARATION_OF_HEALTH",
	},
	{
		value: "MKS",
		name: "Additional marks/numbers information",
		description: "Additional information regarding the marks and numbers.",
		key: "ADDITIONAL_MARKS_NUMBERS_INFORMATION",
	},
	{
		value: "ORI",
		name: "Order instruction",
		description: "Free text contains order instructions.",
		key: "ORDER_INSTRUCTION",
	},
	{
		value: "OSI",
		name: "Other service information",
		description:
			"General information created by the sender of general or specific value.",
		key: "OTHER_SERVICE_INFORMATION",
	},
	{
		value: "PAC",
		name: "Packing/marking information",
		description: "Information regarding the packaging and/or marking of goods.",
		key: "PACKING_MARKING_INFORMATION",
	},
	{
		value: "PAI",
		name: "Payment instructions information",
		description:
			"The free text contains payment instructions information relevant to the message.",
		key: "PAYMENT_INSTRUCTIONS_INFORMATION",
	},
	{
		value: "PAY",
		name: "Payables information",
		description: "Note contains payables information.",
		key: "PAYABLES_INFORMATION",
	},
	{
		value: "PKG",
		name: "Packaging information",
		description: "Note contains packaging information.",
		key: "PACKAGING_INFORMATION",
	},
	{
		value: "PKT",
		name: "Packaging terms information",
		description: "The text contains packaging terms information.",
		key: "PACKAGING_TERMS_INFORMATION",
	},
	{
		value: "PMD",
		name: "Payment detail/remittance information",
		description: "The free text contains payment details.",
		key: "PAYMENT_DETAIL_REMITTANCE_INFORMATION",
	},
	{
		value: "PMT",
		name: "Payment information",
		description: "(4438) Note contains payments information.",
		key: "PAYMENT_INFORMATION",
	},
	{
		value: "PRD",
		name: "Product information",
		description: "The text contains product information.",
		key: "PRODUCT_INFORMATION",
	},
	{
		value: "PRF",
		name: "Price calculation formula",
		description:
			"Additional information regarding the price formula used for calculating the item price.",
		key: "PRICE_CALCULATION_FORMULA",
	},
	{
		value: "PRI",
		name: "Priority information",
		description: "(4218) Note contains priority information.",
		key: "PRIORITY_INFORMATION",
	},
	{
		value: "PUR",
		name: "Purchasing information",
		description: "Note contains purchasing information.",
		key: "PURCHASING_INFORMATION",
	},
	{
		value: "QIN",
		name: "Quarantine instructions",
		description:
			"Instructions regarding quarantine, i.e. the period during which an arriving vessel, including its equipment, cargo, crew or passengers, suspected to carry or carrying a contagious disease is detained in strict isolation to prevent the spread of such a disease.",
		key: "QUARANTINE_INSTRUCTIONS",
	},
	{
		value: "QQD",
		name: "Quality demands/requirements",
		description:
			"Specification of the quality/performance expectations or standards to which the items must conform.",
		key: "QUALITY_DEMANDS_REQUIREMENTS",
	},
	{
		value: "QUT",
		name: "Quotation instruction/information",
		description: "Note contains quotation information.",
		key: "QUOTATION_INSTRUCTION_INFORMATION",
	},
	{
		value: "RAH",
		name: "Risk and handling information",
		description:
			"Information concerning risks induced by the goods and/or handling instruction.",
		key: "RISK_AND_HANDLING_INFORMATION",
	},
	{
		value: "REG",
		name: "Regulatory information",
		description: "The free text contains information for regulatory authority.",
		key: "REGULATORY_INFORMATION",
	},
	{
		value: "RET",
		name: "Return to origin information",
		description:
			"Free text information on an IATA Air Waybill to indicate consignment returned because of non delivery.",
		key: "RETURN_TO_ORIGIN_INFORMATION",
	},
	{
		value: "REV",
		name: "Receivables",
		description: "The text contains receivables information.",
		key: "RECEIVABLES",
	},
	{
		value: "RQR",
		name: "Consignment route",
		description:
			"[3050] Description of a route to be used for the transport of goods.",
		key: "CONSIGNMENT_ROUTE",
	},
	{
		value: "SAF",
		name: "Safety information",
		description: "The text contains safety information.",
		key: "SAFETY_INFORMATION",
	},
	{
		value: "SIC",
		name: "Consignment documentary instruction",
		description:
			"[4284] Instructions given and declarations made by the sender to the carrier concerning Customs, insurance, and other formalities.",
		key: "CONSIGNMENT_DOCUMENTARY_INSTRUCTION",
	},
	{
		value: "SIN",
		name: "Special instructions",
		description:
			"Special instructions like licence no, high value, handle with care, glass.",
		key: "SPECIAL_INSTRUCTIONS",
	},
	{
		value: "SLR",
		name: "Ship line requested",
		description:
			"Shipping line requested to be used for traffic between European continent and U.K. for Ireland.",
		key: "SHIP_LINE_REQUESTED",
	},
	{
		value: "SPA",
		name: "Special permission for transport, generally",
		description:
			"Statement that a special permission has been obtained for the transport (and/or routing) in general, and reference to such permission.",
		key: "SPECIAL_PERMISSION_FOR_TRANSPORT_GENERALLY",
	},
	{
		value: "SPG",
		name: "Special permission concerning the goods to be transported",
		description:
			"Statement that a special permission has been obtained for the transport (and/or routing) of the goods specified, and reference to such permission.",
		key: "SPECIAL_PERMISSION_CONCERNING_THE_GOODS_TO_BE_TRANSPORTED",
	},
	{
		value: "SPH",
		name: "Special handling",
		description: "Note contains special handling information.",
		key: "SPECIAL_HANDLING",
	},
	{
		value: "SPP",
		name: "Special permission concerning package",
		description:
			"Statement that a special permission has been obtained for the packaging, and reference to such permission.",
		key: "SPECIAL_PERMISSION_CONCERNING_PACKAGE",
	},
	{
		value: "SPT",
		name: "Special permission concerning transport means",
		description:
			"Statement that a special permission has been obtained for the use of the means transport, and reference to such permission.",
		key: "SPECIAL_PERMISSION_CONCERNING_TRANSPORT_MEANS",
	},
	{
		value: "SRN",
		name: "Subsidiary risk number (IATA/DGR)",
		description:
			"Number(s) of subsidiary risks, induced by the goods, according to the valid classification.",
		key: "SUBSIDIARY_RISK_NUMBER_IATA_DGR",
	},
	{
		value: "SSR",
		name: "Special service request",
		description:
			"Request for a special service concerning the transport of the goods.",
		key: "SPECIAL_SERVICE_REQUEST",
	},
	{
		value: "SUR",
		name: "Supplier remarks",
		description: "Remarks from or for a supplier of goods or services.",
		key: "SUPPLIER_REMARKS",
	},
	{
		value: "TCA",
		name: "Consignment tariff",
		description:
			"[5430] Free text specification of tariff applied to a consignment.",
		key: "CONSIGNMENT_TARIFF",
	},
	{
		value: "TDT",
		name: "Consignment transport",
		description:
			"[8012] Transport information for commercial purposes (generic term).",
		key: "CONSIGNMENT_TRANSPORT",
	},
	{
		value: "TRA",
		name: "Transportation information",
		description: "General information regarding the transport of the cargo.",
		key: "TRANSPORTATION_INFORMATION",
	},
	{
		value: "TRR",
		name: "Requested tariff",
		description:
			"Stipulation of the tariffs to be applied showing, where applicable, special agreement numbers or references.",
		key: "REQUESTED_TARIFF",
	},
	{
		value: "TXD",
		name: "Tax declaration",
		description:
			"The text contains a statement constituting a tax declaration.",
		key: "TAX_DECLARATION",
	},
	{
		value: "WHI",
		name: "Warehouse instruction/information",
		description: "Note contains warehouse information.",
		key: "WAREHOUSE_INSTRUCTION_INFORMATION",
	},
	{
		value: "ZZZ",
		name: "Mutually defined",
		description:
			"Note contains information mutually defined by trading partners.",
		key: "MUTUALLY_DEFINED",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		untdid4451: typeof untdid4451;
	}
}
registerCodelist("untdid4451", untdid4451);

export default untdid4451;
