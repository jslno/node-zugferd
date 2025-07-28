/**
 * @see https://service.unece.org/trade/untdid/d17a/tred/tred3139.htm
 */

import { createEnum } from "..";

export type Untdid3139Definition = {
	key: string;
	code: string;
	name?: string;
	description?: string;
};

export type Untdid3139Code = (typeof UNTDID_3139)[number]["code"];

export const UNTDID_3139_IDENTIFIER = "untdid.3139" as const;

export const UNTDID_3139 = [
	{
		key: "INSURANCE_CONTACT",
		name: "Insurance contact",
		code: "AA",
		description:
			"Department/person to contact for matters regarding insurance.",
	},
	{
		key: "WORKSHOP_CONTACT",
		name: "Workshop contact",
		code: "AB",
		description:
			"Department/person to contact for matters regarding the workshop.",
	},
	{
		key: "ACCEPTING_CONTACT",
		name: "Accepting contact",
		code: "AC",
		description: "Department/person in charge of accepting incoming goods.",
	},
	{
		key: "ACCOUNTING_CONTACT",
		name: "Accounting contact",
		code: "AD",
		description: "The contact responsible for accounting matters.",
	},
	{
		key: "CONTRACT_CONTACT",
		name: "Contract contact",
		code: "AE",
		description:
			"Department/person to contact for matters regarding contracts.",
	},
	{
		key: "LAND_REGISTRY_CONTACT",
		name: "Land registry contact",
		code: "AF",
		description:
			"Department/person to contact for matters regarding land registry.",
	},
	{
		key: "AGENT",
		name: "Agent",
		code: "AG",
		description:
			"Department/person of the agent which acts on behalf of another party.",
	},
	{
		key: "COORDINATION_CONTACT",
		name: "Coordination contact",
		code: "AH",
		description:
			"Department/person to contact for matters regarding technical coordination of works.",
	},
	{
		key: "PROJECT_MANAGEMENT_CONTACT",
		name: "Project management contact",
		code: "AI",
		description:
			"Department/person to contact for matters regarding project management on behalf of the contractor.",
	},
	{
		key: "INVESTMENT_CONTACT",
		name: "Investment contact",
		code: "AJ",
		description:
			"Department/person to contact for matters regarding investments.",
	},
	{
		key: "WORKS_MANAGEMENT_CONTACT",
		name: "Works management contact",
		code: "AK",
		description:
			"Department/person to contact for matters regarding management of works on behalf of the owner.",
	},
	{
		key: "PERSONNEL_CONTACT",
		name: "Personnel contact",
		code: "AL",
		description:
			"Department/person to contact for matters regarding personnel (human resources).",
	},
	{
		key: "CLAIMS_CONTACT",
		name: "Claims contact",
		code: "AM",
		description: "Department/person to contact for matters regarding claims.",
	},
	{
		key: "LABORATORY_CONTACT",
		name: "Laboratory contact",
		code: "AN",
		description: "Department/person to contact for laboratory matters.",
	},
	{
		key: "PLANTEQUIPMENT_CONTACT",
		name: "Plant/equipment contact",
		code: "AO",
		description:
			"Department/person to contact for matters regarding plant/equipment.",
	},
	{
		key: "ACCOUNTS_PAYABLE_CONTACT",
		name: "Accounts payable contact",
		code: "AP",
		description:
			"Department/person responsible for the accounts payable function within a corporation.",
	},
	{
		key: "QUANTITY_SURVEYOR_CONTACT",
		name: "Quantity surveyor contact",
		code: "AQ",
		description:
			"Department/person to contact for matters regarding quantity surveying.",
	},
	{
		key: "ACCOUNTS_RECEIVABLE_CONTACT",
		name: "Accounts receivable contact",
		code: "AR",
		description:
			"Department/person responsible for the accounts receivable within a corporation.",
	},
	{
		key: "PUBLIC_RELATIONS_CONTACT",
		name: "Public relations contact",
		code: "AS",
		description:
			"Department/person to contact for matters regarding public relations.",
	},
	{
		key: "TECHNICAL_CONTACT",
		name: "Technical contact",
		code: "AT",
		description:
			"Department/person to contact for matters regarding technical issues.",
	},
	{
		key: "CITY_WORKS_AUTHORITY_CONTACT",
		name: "City works authority contact",
		code: "AU",
		description:
			"Department/person to contact for matters regarding city works.",
	},
	{
		key: "MAINTENANCE_CONTACT",
		name: "Maintenance contact",
		code: "AV",
		description:
			"Department/person to contact for matters regarding maintenance.",
	},
	{
		key: "TOWN_PLANNING_CONTACT",
		name: "Town planning contact",
		code: "AW",
		description:
			"Department/person to contact for matters regarding town planning.",
	},
	{
		key: "TRAFFIC_AUTHORITY_CONTACT",
		name: "Traffic authority contact",
		code: "AX",
		description: "Department/person to contact for matters regarding traffic.",
	},
	{
		key: "ELECTRICITY_SUPPLY_CONTACT",
		name: "Electricity supply contact",
		code: "AY",
		description:
			"Department/person to contact for matters regarding electricity supply.",
	},
	{
		key: "GAS_SUPPLY_CONTACT",
		name: "Gas supply contact",
		code: "AZ",
		description:
			"Department/person to contact for matters regarding gas supply.",
	},
	{
		key: "WATER_SUPPLY_CONTACT",
		name: "Water supply contact",
		code: "BA",
		description:
			"Department/person to contact for matters regarding water supply.",
	},
	{
		key: "TELECOMMUNICATIONS_NETWORK_CONTACT",
		name: "Telecommunications network contact",
		code: "BB",
		description:
			"Department/person to contact for matters regarding telecommunications network.",
	},
	{
		key: "BANKING_CONTACT",
		name: "Banking contact",
		code: "BC",
		description: "Contact person for bank.",
	},
	{
		key: "NEW_DEVELOPMENTS_CONTACT",
		name: "New developments contact",
		code: "BD",
		description:
			"Department/person to contact for matters regarding new developments (e.g. construction).",
	},
	{
		key: "TRANSPORT_INFRASTRUCTURE_AUTHORITY",
		name: "Transport infrastructure authority",
		code: "BE",
		description:
			"Department/person to contact for matters regarding transport infrastructure.",
	},
	{
		key: "SERVICE_CONTACT",
		name: "Service contact",
		code: "BF",
		description: "Department/person to be contacted in service matters.",
	},
	{
		key: "AUDITING_CONTACT",
		name: "Auditing contact",
		code: "BG",
		description: "Department or person to contact with regard to auditing.",
	},
	{
		key: "LEGAL_AUDITING_CONTACT",
		name: "Legal auditing contact",
		code: "BH",
		description:
			"Department or person to contact with regard to legal auditing.",
	},
	{
		key: "SOFTWARE_HOUSE_CONTACT",
		name: "Software house contact",
		code: "BI",
		description:
			"Department or person to contact with regard to software house.",
	},
	{
		key: "DEPARTMENT_OR_PERSON_RESPONSIBLE_FOR_PROCESSING_PURCHASE_ORDER",
		name: "Department or person responsible for processing purchase order",
		code: "BJ",
		description:
			"Identification of the department or person responsible for the processing of purchase orders.",
	},
	{
		key: "ELECTRONIC_DATA_INTERCHANGE_COORDINATOR",
		name: "Electronic data interchange coordinator",
		code: "BK",
		description:
			"Code specifying a person responsible for the coordination of matters related to the exchange of information in electronic data interchange format.",
	},
	{
		key: "WAIVER_CONTACT",
		name: "Waiver contact",
		code: "BL",
		description: "Code specifying a party knowledgeable about a waiver.",
	},
	{
		key: "AUTOMATED_CLEARING_HOUSE_ACH_CONTACT",
		name: "Automated clearing house (ACH) contact",
		code: "BM",
		description:
			"Code specifying a person to be contacted at an automated clearing house.",
	},
	{
		key: "CERTIFICATION_CONTACT",
		name: "Certification contact",
		code: "BN",
		description:
			"Code specifying a contact with knowledge of a certification action.",
	},
	{
		key: "AFTER_BUSINESS_HOURS_CONTACT",
		name: "After business hours contact",
		code: "BO",
		description: "Department/person to contact after normal working hours.",
	},
	{
		key: "COMPANY_SECURITY_OFFICERS_24_HOUR_CONTACT",
		name: "Company Security Officer's 24-hour contact",
		code: "BP",
		description:
			"The round the clock contact of the Company Security Officer who is responsible for the vessel.",
	},
	{
		key: "AGENT_OF_SHIP_AT_THE_INTENDED_PORT_OF_ARRIVAL",
		name: "Agent of ship at the intended port of arrival",
		code: "BQ",
		description:
			"Contact details of the agent of the ship at the intended port of arrival.",
	},
	{
		key: "COOK",
		name: "Cook",
		code: "BR",
		description: "Person responsible for cooking.",
	},
	{
		key: "ULTIMATE_CONSIGNEE",
		name: "Ultimate consignee",
		code: "BU",
		description: "Final recipient of the consignment.",
	},
	{
		key: "CARRIER",
		name: "Carrier",
		code: "CA",
		description:
			"(3126) Party undertaking or arranging transport of goods between named points.",
	},
	{
		key: "CHANGED_BY",
		name: "Changed by",
		code: "CB",
		description: "Person who made the change.",
	},
	{
		key: "RESPONSIBLE_PERSON_FOR_INFORMATION_PRODUCTION",
		name: "Responsible person for information production",
		code: "CC",
		description:
			"Responsible person to contact for matters regarding the production of information.",
	},
	{
		key: "RESPONSIBLE_PERSON_FOR_INFORMATION_DISSEMINATION",
		name: "Responsible person for information dissemination",
		code: "CD",
		description:
			"Responsible person to contact for matters regarding information dissemination.",
	},
	{
		key: "HEAD_OF_UNIT_FOR_COMPUTER_DATA_PROCESSING",
		name: "Head of unit for computer data processing",
		code: "CE",
		description:
			"Head of unit to contact for matters regarding computer data processing.",
	},
	{
		key: "HEAD_OF_UNIT_FOR_INFORMATION_PRODUCTION",
		name: "Head of unit for information production",
		code: "CF",
		description:
			"Head of unit to contact for matters regarding the production of information.",
	},
	{
		key: "HEAD_OF_UNIT_FOR_INFORMATION_DISSEMINATION",
		name: "Head of unit for information dissemination",
		code: "CG",
		description:
			"Head of unit to contact for matters regarding dissemination of information.",
	},
	{
		key: "CONSIGNEE",
		name: "Consignee",
		code: "CN",
		description: "(3132) Party to which goods are consigned.",
	},
	{
		key: "CONSIGNOR",
		name: "Consignor",
		code: "CO",
		description:
			"(3336) Party which, by contract with a carrier, consigns or sends goods with the carrier, or has them conveyed by him. Synonym: shipper/sender.",
	},
	{
		key: "RESPONSIBLE_PERSON_FOR_COMPUTER_DATA_PROCESSING",
		name: "Responsible person for computer data processing",
		code: "CP",
		description:
			"Responsible person to contact for matters regarding computer data processing.",
	},
	{
		key: "CUSTOMER_RELATIONS",
		name: "Customer relations",
		code: "CR",
		description: "Individual responsible for customer relations.",
	},
	{
		key: "CONFIRMED_WITH",
		name: "Confirmed with",
		code: "CW",
		description:
			"Person with whom the contents of the purchase order has been discussed and agreed (e.g. by telephone) prior to the sending of this message.",
	},
	{
		key: "DEPARTMENTEMPLOYEE_TO_EXECUTE_EXPORT_PROCEDURES",
		name: "Department/employee to execute export procedures",
		code: "DE",
		description: "Department/employee which/who executes export procedures.",
	},
	{
		key: "DEPARTMENTEMPLOYEE_TO_EXECUTE_IMPORT_PROCEDURES",
		name: "Department/employee to execute import procedures",
		code: "DI",
		description: "Department/employee which/who executes import procedures.",
	},
	{
		key: "DELIVERY_CONTACT",
		name: "Delivery contact",
		code: "CL",
		description: "Department/person responsible for delivery.",
	},
	{
		key: "ENTERED_BY",
		name: "Entered by",
		code: "EB",
		description: "Name of an individual who made the entry.",
	},
	{
		key: "EDUCATION_COORDINATOR",
		name: "Education coordinator",
		code: "EC",
		description: "Person in charge of coordination of education.",
	},
	{
		key: "ENGINEERING_CONTACT",
		name: "Engineering contact",
		code: "ED",
		description:
			"Department/person to contact for matters regarding engineering.",
	},
	{
		key: "EXPEDITOR",
		name: "Expeditor",
		code: "EX",
		description: "The contact for expediting.",
	},
	{
		key: "GOODS_RECEIVING_CONTACT",
		name: "Goods receiving contact",
		code: "GR",
		description:
			"Department/person responsible for receiving the goods at the place of delivery.",
	},
	{
		key: "EMERGENCY_DANGEROUS_GOODS_CONTACT",
		name: "Emergency dangerous goods contact",
		code: "HE",
		description:
			"[3058] Party who is to be contacted to intervene in case of emergency.",
	},
	{
		key: "DANGEROUS_GOODS_CONTACT",
		name: "Dangerous goods contact",
		code: "HG",
		description:
			"[3060] Department/person to be contacted for details about the transportation of dangerous goods/hazardous material.",
	},
	{
		key: "HAZARDOUS_MATERIAL_CONTACT",
		name: "Hazardous material contact",
		code: "HM",
		description:
			"Department/person responsible for hazardous material control.",
	},
	{
		key: "INFORMATION_CONTACT",
		name: "Information contact",
		code: "IC",
		description:
			"Department/person to contact for questions regarding transactions.",
	},
	{
		key: "INSURER_CONTACT",
		name: "Insurer contact",
		code: "IN",
		description: "Department/employee to be contacted at the insurer.",
	},
	{
		key: "PLACE_OF_DELIVERY_CONTACT",
		name: "Place of delivery contact",
		code: "LB",
		description:
			"Department/employee to be contacted at the place of delivery.",
	},
	{
		key: "PLACE_OF_COLLECTION_CONTACT",
		name: "Place of collection contact",
		code: "LO",
		description:
			"Department/employee to be contacted at the place of collection.",
	},
	{
		key: "MATERIAL_CONTROL_CONTACT",
		name: "Material control contact",
		code: "MC",
		description:
			"Department/person responsible for the controlling/inspection of goods.",
	},
	{
		key: "MATERIAL_DISPOSITION_CONTACT",
		name: "Material disposition contact",
		code: "MD",
		description:
			"Department/person responsible for the disposition/scheduling of goods.",
	},
	{
		key: "MATERIAL_HANDLING_CONTACT",
		name: "Material handling contact",
		code: "MH",
		description: "Department/employee to be contacted for material handling.",
	},
	{
		key: "MESSAGE_RECIPIENT_CONTACT",
		name: "Message recipient contact",
		code: "MR",
		description:
			"Department/employee to be contacted at the message recipient.",
	},
	{
		key: "MESSAGE_SENDER_CONTACT",
		name: "Message sender contact",
		code: "MS",
		description: "Department/employee to be contacted at the message sender.",
	},
	{
		key: "NOTIFICATION_CONTACT",
		name: "Notification contact",
		code: "NT",
		description: "Department/employee to be notified.",
	},
	{
		key: "ORDER_CONTACT",
		name: "Order contact",
		code: "OC",
		description: "An individual to contact for questions regarding this order.",
	},
	{
		key: "PROTOTYPE_COORDINATOR",
		name: "Prototype coordinator",
		code: "PA",
		description:
			"Department/employee to be contacted as prototype co-ordinator.",
	},
	{
		key: "PURCHASING_CONTACT",
		name: "Purchasing contact",
		code: "PD",
		description:
			"Department/person responsible for issuing this purchase order.",
	},
	{
		key: "PAYEE_CONTACT",
		name: "Payee contact",
		code: "PE",
		description: "Department/employee to be contacted at the payee.",
	},
	{
		key: "PRODUCT_MANAGEMENT_CONTACT",
		name: "Product management contact",
		code: "PM",
		description:
			"Department/person to contact for questions regarding this order.",
	},
	{
		key: "QUALITY_ASSURANCE_CONTACT",
		name: "Quality assurance contact",
		code: "QA",
		description: "Quality assurance contact within an organization.",
	},
	{
		key: "QUALITY_COORDINATOR_CONTACT",
		name: "Quality coordinator contact",
		code: "QC",
		description: "Quality coordinator contact within an organization.",
	},
	{
		key: "RECEIVING_DOCK_CONTACT",
		name: "Receiving dock contact",
		code: "RD",
		description: "The receiving dock contact within an organization.",
	},
	{
		key: "AUTHORIZED_RESPONSIBLE_PERSON",
		name: "Authorized responsible person",
		code: "RP",
		description:
			"Responsible person who is authorized to sign official documents.",
	},
	{
		key: "SALES_ADMINISTRATION",
		name: "Sales administration",
		code: "SA",
		description:
			"Name of the sales administration contact within a corporation.",
	},
	{
		key: "SCHEDULE_CONTACT",
		name: "Schedule contact",
		code: "SC",
		description: "Name of the scheduling contact within a corporation.",
	},
	{
		key: "SHIPPING_CONTACT",
		name: "Shipping contact",
		code: "SD",
		description: "The shipping department contact within an organization.",
	},
	{
		key: "SALES_REPRESENTATIVE_OR_DEPARTMENT",
		name: "Sales representative or department",
		code: "SR",
		description:
			"The sales representative or department contact within an organization.",
	},
	{
		key: "SUPPLIER_CONTACT",
		name: "Supplier contact",
		code: "SU",
		description: "Department/person to be contacted at the supplier.",
	},
	{
		key: "TRAFFIC_ADMINISTRATOR",
		name: "Traffic administrator",
		code: "TA",
		description: "The traffic administrator contact within an organization.",
	},
	{
		key: "TEST_CONTACT",
		name: "Test contact",
		code: "TD",
		description: "Department/person responsible for testing contact.",
	},
	{
		key: "TECHNICAL_DOCUMENTATION_RECIPIENT",
		name: "Technical documentation recipient",
		code: "TI",
		description: "Department/person to receive technical documentation.",
	},
	{
		key: "TRANSPORT_CONTACT",
		name: "Transport contact",
		code: "TR",
		description: "Department/person in charge of transportation.",
	},
	{
		key: "WAREHOUSE",
		name: "Warehouse",
		code: "WH",
		description: "The warehouse contact within an organization.",
	},
	{
		key: "ALTERNATE_CONTACT",
		name: "Alternate contact",
		code: "WI",
		description: "Alternate department or person to contact.",
	},
	{
		key: "OFFICE_MANAGER",
		name: "Office Manager",
		code: "WJ",
		description:
			"An individual responsible for managing the day to day activities of an office.",
	},
	{
		key: "CHARTERED_ACCOUNTANT_CONTACT",
		name: "Chartered accountant contact",
		code: "WK",
		description: "Code identifying a chartered accountant contact.",
	},
	{
		key: "MUTUALLY_DEFINED",
		name: "Mutually defined",
		code: "ZZZ",
		description:
			"A code assigned within a code list to be used on an interim basis and as defined among trading partners until a precise code can be assigned to the code list.",
	},
] as const satisfies Untdid3139Definition[];

export const Untdid3139 = createEnum(UNTDID_3139, {
	keyProp: "key",
	valueProp: "code",
});
