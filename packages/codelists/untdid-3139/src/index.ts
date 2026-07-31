import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid3139 = [
	{
		value: "AA",
		name: "Insurance contact",
		description:
			"Department/person to contact for matters regarding insurance.",
		key: "INSURANCE_CONTACT",
	},
	{
		value: "AB",
		name: "Workshop contact",
		description:
			"Department/person to contact for matters regarding the workshop.",
		key: "WORKSHOP_CONTACT",
	},
	{
		value: "AC",
		name: "Accepting contact",
		description: "Department/person in charge of accepting incoming goods.",
		key: "ACCEPTING_CONTACT",
	},
	{
		value: "AD",
		name: "Accounting contact",
		description: "The contact responsible for accounting matters.",
		key: "ACCOUNTING_CONTACT",
	},
	{
		value: "AE",
		name: "Contract contact",
		description:
			"Department/person to contact for matters regarding contracts.",
		key: "CONTRACT_CONTACT",
	},
	{
		value: "AF",
		name: "Land registry contact",
		description:
			"Department/person to contact for matters regarding land registry.",
		key: "LAND_REGISTRY_CONTACT",
	},
	{
		value: "AG",
		name: "Agent",
		description:
			"Department/person of the agent which acts on behalf of another party.",
		key: "AGENT",
	},
	{
		value: "AH",
		name: "Coordination contact",
		description:
			"Department/person to contact for matters regarding technical coordination of works.",
		key: "COORDINATION_CONTACT",
	},
	{
		value: "AI",
		name: "Project management contact",
		description:
			"Department/person to contact for matters regarding project management on behalf of the contractor.",
		key: "PROJECT_MANAGEMENT_CONTACT",
	},
	{
		value: "AJ",
		name: "Investment contact",
		description:
			"Department/person to contact for matters regarding investments.",
		key: "INVESTMENT_CONTACT",
	},
	{
		value: "AK",
		name: "Works management contact",
		description:
			"Department/person to contact for matters regarding management of works on behalf of the owner.",
		key: "WORKS_MANAGEMENT_CONTACT",
	},
	{
		value: "AL",
		name: "Personnel contact",
		description:
			"Department/person to contact for matters regarding personnel (human resources).",
		key: "PERSONNEL_CONTACT",
	},
	{
		value: "AM",
		name: "Claims contact",
		description: "Department/person to contact for matters regarding claims.",
		key: "CLAIMS_CONTACT",
	},
	{
		value: "AN",
		name: "Laboratory contact",
		description: "Department/person to contact for laboratory matters.",
		key: "LABORATORY_CONTACT",
	},
	{
		value: "AO",
		name: "Plant/equipment contact",
		description:
			"Department/person to contact for matters regarding plant/equipment.",
		key: "PLANT_EQUIPMENT_CONTACT",
	},
	{
		value: "AP",
		name: "Accounts payable contact",
		description:
			"Department/person responsible for the accounts payable function within a corporation.",
		key: "ACCOUNTS_PAYABLE_CONTACT",
	},
	{
		value: "AQ",
		name: "Quantity surveyor contact",
		description:
			"Department/person to contact for matters regarding quantity surveying.",
		key: "QUANTITY_SURVEYOR_CONTACT",
	},
	{
		value: "AR",
		name: "Accounts receivable contact",
		description:
			"Department/person responsible for the accounts receivable within a corporation.",
		key: "ACCOUNTS_RECEIVABLE_CONTACT",
	},
	{
		value: "AS",
		name: "Public relations contact",
		description:
			"Department/person to contact for matters regarding public relations.",
		key: "PUBLIC_RELATIONS_CONTACT",
	},
	{
		value: "AT",
		name: "Technical contact",
		description:
			"Department/person to contact for matters regarding technical issues.",
		key: "TECHNICAL_CONTACT",
	},
	{
		value: "AU",
		name: "City works authority contact",
		description:
			"Department/person to contact for matters regarding city works.",
		key: "CITY_WORKS_AUTHORITY_CONTACT",
	},
	{
		value: "AV",
		name: "Maintenance contact",
		description:
			"Department/person to contact for matters regarding maintenance.",
		key: "MAINTENANCE_CONTACT",
	},
	{
		value: "AW",
		name: "Town planning contact",
		description:
			"Department/person to contact for matters regarding town planning.",
		key: "TOWN_PLANNING_CONTACT",
	},
	{
		value: "AX",
		name: "Traffic authority contact",
		description: "Department/person to contact for matters regarding traffic.",
		key: "TRAFFIC_AUTHORITY_CONTACT",
	},
	{
		value: "AY",
		name: "Electricity supply contact",
		description:
			"Department/person to contact for matters regarding electricity supply.",
		key: "ELECTRICITY_SUPPLY_CONTACT",
	},
	{
		value: "AZ",
		name: "Gas supply contact",
		description:
			"Department/person to contact for matters regarding gas supply.",
		key: "GAS_SUPPLY_CONTACT",
	},
	{
		value: "BA",
		name: "Water supply contact",
		description:
			"Department/person to contact for matters regarding water supply.",
		key: "WATER_SUPPLY_CONTACT",
	},
	{
		value: "BB",
		name: "Telecommunications network contact",
		description:
			"Department/person to contact for matters regarding telecommunications network.",
		key: "TELECOMMUNICATIONS_NETWORK_CONTACT",
	},
	{
		value: "BC",
		name: "Banking contact",
		description: "Contact person for bank.",
		key: "BANKING_CONTACT",
	},
	{
		value: "BD",
		name: "New developments contact",
		description:
			"Department/person to contact for matters regarding new developments (e.g. construction).",
		key: "NEW_DEVELOPMENTS_CONTACT",
	},
	{
		value: "BE",
		name: "Transport infrastructure authority",
		description:
			"Department/person to contact for matters regarding transport infrastructure.",
		key: "TRANSPORT_INFRASTRUCTURE_AUTHORITY",
	},
	{
		value: "BF",
		name: "Service contact",
		description: "Department/person to be contacted in service matters.",
		key: "SERVICE_CONTACT",
	},
	{
		value: "BG",
		name: "Auditing contact",
		description: "Department or person to contact with regard to auditing.",
		key: "AUDITING_CONTACT",
	},
	{
		value: "BH",
		name: "Legal auditing contact",
		description:
			"Department or person to contact with regard to legal auditing.",
		key: "LEGAL_AUDITING_CONTACT",
	},
	{
		value: "BI",
		name: "Software house contact",
		description:
			"Department or person to contact with regard to software house.",
		key: "SOFTWARE_HOUSE_CONTACT",
	},
	{
		value: "BJ",
		name: "Department or person responsible for processing purchase",
		description:
			"order Identification of the department or person responsible for the processing of purchase orders.",
		key: "DEPARTMENT_OR_PERSON_RESPONSIBLE_FOR_PROCESSING_PURCHASE",
	},
	{
		value: "BK",
		name: "Electronic data interchange coordinator",
		description:
			"Code specifying a person responsible for the coordination of matters related to the exchange of information in electronic data interchange format.",
		key: "ELECTRONIC_DATA_INTERCHANGE_COORDINATOR",
	},
	{
		value: "BL",
		name: "Waiver contact",
		description: "Code specifying a party knowledgeable about a waiver.",
		key: "WAIVER_CONTACT",
	},
	{
		value: "BM",
		name: "Automated clearing house (ACH) contact",
		description:
			"Code specifying a person to be contacted at an automated clearing house.",
		key: "AUTOMATED_CLEARING_HOUSE_ACH_CONTACT",
	},
	{
		value: "BN",
		name: "Certification contact",
		description:
			"Code specifying a contact with knowledge of a certification action.",
		key: "CERTIFICATION_CONTACT",
	},
	{
		value: "BO",
		name: "After business hours contact",
		description: "Department/person to contact after normal working hours.",
		key: "AFTER_BUSINESS_HOURS_CONTACT",
	},
	{
		value: "BP",
		name: "Company Security Officer�s 24-hour contact",
		description:
			"The round the clock contact of the Company Security Officer who is responsible for the vessel.",
		key: "COMPANY_SECURITY_OFFICER_S_24_HOUR_CONTACT",
	},
	{
		value: "BQ",
		name: "Agent of ship at the intended port of arrival",
		description:
			"Contact details of the agent of the ship at the intended port of arrival.",
		key: "AGENT_OF_SHIP_AT_THE_INTENDED_PORT_OF_ARRIVAL",
	},
	{
		value: "BR",
		name: "Cook",
		description: "Person responsible for cooking.",
		key: "COOK",
	},
	{
		value: "BS",
		name: "Customer contact",
		description: "The main department/person to be contacted at the customer.",
		key: "CUSTOMER_CONTACT",
	},
	{
		value: "BT",
		name: "Meter access contact",
		description:
			"Department/person to contact for matters regarding meter reading, including access to the meter.",
		key: "METER_ACCESS_CONTACT",
	},
	{
		value: "BU",
		name: "Ultimate consignee",
		description: "Final recipient of the consignment.",
		key: "ULTIMATE_CONSIGNEE",
	},
	{
		value: "CA",
		name: "Carrier",
		description:
			"(3126) Party undertaking or arranging transport of goods between named points.",
		key: "CARRIER",
	},
	{
		value: "CB",
		name: "Changed by",
		description: "Person who made the change.",
		key: "CHANGED_BY",
	},
	{
		value: "CC",
		name: "Responsible person for information production",
		description:
			"Responsible person to contact for matters regarding the production of information.",
		key: "RESPONSIBLE_PERSON_FOR_INFORMATION_PRODUCTION",
	},
	{
		value: "CD",
		name: "Responsible person for information dissemination",
		description:
			"Responsible person to contact for matters regarding information dissemination.",
		key: "RESPONSIBLE_PERSON_FOR_INFORMATION_DISSEMINATION",
	},
	{
		value: "CE",
		name: "Head of unit for computer data processing",
		description:
			"Head of unit to contact for matters regarding computer data processing.",
		key: "HEAD_OF_UNIT_FOR_COMPUTER_DATA_PROCESSING",
	},
	{
		value: "CF",
		name: "Head of unit for information production",
		description:
			"Head of unit to contact for matters regarding the production of information.",
		key: "HEAD_OF_UNIT_FOR_INFORMATION_PRODUCTION",
	},
	{
		value: "CG",
		name: "Head of unit for information dissemination",
		description:
			"Head of unit to contact for matters regarding dissemination of information.",
		key: "HEAD_OF_UNIT_FOR_INFORMATION_DISSEMINATION",
	},
	{
		value: "CN",
		name: "Consignee",
		description: "(3132) Party to which goods are consigned.",
		key: "CONSIGNEE",
	},
	{
		value: "CO",
		name: "Consignor",
		description:
			"(3336) Party which, by contract with a carrier, consigns or sends goods with the carrier, or has them conveyed by him. Synonym: shipper/sender.",
		key: "CONSIGNOR",
	},
	{
		value: "CP",
		name: "Responsible person for computer data processing",
		description:
			"Responsible person to contact for matters regarding computer data processing.",
		key: "RESPONSIBLE_PERSON_FOR_COMPUTER_DATA_PROCESSING",
	},
	{
		value: "CR",
		name: "Customer relations",
		description: "Individual responsible for customer relations.",
		key: "CUSTOMER_RELATIONS",
	},
	{
		value: "CW",
		name: "Confirmed with",
		description:
			"Person with whom the contents of the purchase order has been discussed and agreed (e.g. by telephone) prior to the sending of this message.",
		key: "CONFIRMED_WITH",
	},
	{
		value: "DE",
		name: "Department/employee to execute export procedures",
		description: "Department/employee which/who executes export procedures.",
		key: "DEPARTMENT_EMPLOYEE_TO_EXECUTE_EXPORT_PROCEDURES",
	},
	{
		value: "DI",
		name: "Department/employee to execute import procedures",
		description: "Department/employee which/who executes import procedures.",
		key: "DEPARTMENT_EMPLOYEE_TO_EXECUTE_IMPORT_PROCEDURES",
	},
	{
		value: "DL",
		name: "Delivery contact",
		description: "Department/person responsible for delivery.",
		key: "DELIVERY_CONTACT",
	},
	{
		value: "EB",
		name: "Entered by",
		description: "Name of an individual who made the entry.",
		key: "ENTERED_BY",
	},
	{
		value: "EC",
		name: "Education coordinator",
		description: "Person in charge of coordination of education.",
		key: "EDUCATION_COORDINATOR",
	},
	{
		value: "ED",
		name: "Engineering contact",
		description:
			"Department/person to contact for matters regarding engineering.",
		key: "ENGINEERING_CONTACT",
	},
	{
		value: "EX",
		name: "Expeditor",
		description: "The contact for expediting.",
		key: "EXPEDITOR",
	},
	{
		value: "GR",
		name: "Goods receiving contact",
		description:
			"Department/person responsible for receiving the goods at the place of delivery.",
		key: "GOODS_RECEIVING_CONTACT",
	},
	{
		value: "HE",
		name: "Emergency dangerous goods contact",
		description:
			"[3058] Party who is to be contacted to intervene in case of emergency.",
		key: "EMERGENCY_DANGEROUS_GOODS_CONTACT",
	},
	{
		value: "HG",
		name: "Dangerous goods contact",
		description:
			"[3060] Department/person to be contacted for details about the transportation of dangerous goods/hazardous material.",
		key: "DANGEROUS_GOODS_CONTACT",
	},
	{
		value: "HM",
		name: "Hazardous material contact",
		description:
			"Department/person responsible for hazardous material control.",
		key: "HAZARDOUS_MATERIAL_CONTACT",
	},
	{
		value: "IC",
		name: "Information contact",
		description:
			"Department/person to contact for questions regarding transactions.",
		key: "INFORMATION_CONTACT",
	},
	{
		value: "IN",
		name: "Insurer contact",
		description: "Department/employee to be contacted at the insurer.",
		key: "INSURER_CONTACT",
	},
	{
		value: "LB",
		name: "Place of delivery contact",
		description:
			"Department/employee to be contacted at the place of delivery.",
		key: "PLACE_OF_DELIVERY_CONTACT",
	},
	{
		value: "LO",
		name: "Place of collection contact",
		description:
			"Department/employee to be contacted at the place of collection.",
		key: "PLACE_OF_COLLECTION_CONTACT",
	},
	{
		value: "MC",
		name: "Material control contact",
		description:
			"Department/person responsible for the controlling/inspection of goods.",
		key: "MATERIAL_CONTROL_CONTACT",
	},
	{
		value: "MD",
		name: "Material disposition contact",
		description:
			"Department/person responsible for the disposition/scheduling of goods.",
		key: "MATERIAL_DISPOSITION_CONTACT",
	},
	{
		value: "MH",
		name: "Material handling contact",
		description: "Department/employee to be contacted for material handling.",
		key: "MATERIAL_HANDLING_CONTACT",
	},
	{
		value: "MR",
		name: "Message recipient contact",
		description:
			"Department/employee to be contacted at the message recipient.",
		key: "MESSAGE_RECIPIENT_CONTACT",
	},
	{
		value: "MS",
		name: "Message sender contact",
		description: "Department/employee to be contacted at the message sender.",
		key: "MESSAGE_SENDER_CONTACT",
	},
	{
		value: "NT",
		name: "Notification contact",
		description: "Department/employee to be notified.",
		key: "NOTIFICATION_CONTACT",
	},
	{
		value: "OC",
		name: "Order contact",
		description: "An individual to contact for questions regarding this order.",
		key: "ORDER_CONTACT",
	},
	{
		value: "PA",
		name: "Prototype coordinator",
		description:
			"Department/employee to be contacted as prototype co- ordinator.",
		key: "PROTOTYPE_COORDINATOR",
	},
	{
		value: "PD",
		name: "Purchasing contact",
		description:
			"Department/person responsible for issuing this purchase order.",
		key: "PURCHASING_CONTACT",
	},
	{
		value: "PE",
		name: "Payee contact",
		description: "Department/employee to be contacted at the payee.",
		key: "PAYEE_CONTACT",
	},
	{
		value: "PM",
		name: "Product management contact",
		description:
			"Department/person to contact for questions regarding this order.",
		key: "PRODUCT_MANAGEMENT_CONTACT",
	},
	{
		value: "QA",
		name: "Quality assurance contact",
		description: "Quality assurance contact within an organization.",
		key: "QUALITY_ASSURANCE_CONTACT",
	},
	{
		value: "QC",
		name: "Quality coordinator contact",
		description: "Quality coordinator contact within an organization.",
		key: "QUALITY_COORDINATOR_CONTACT",
	},
	{
		value: "RD",
		name: "Receiving dock contact",
		description: "The receiving dock contact within an organization.",
		key: "RECEIVING_DOCK_CONTACT",
	},
	{
		value: "RP",
		name: "Authorized responsible person",
		description:
			"Responsible person who is authorized to sign official documents.",
		key: "AUTHORIZED_RESPONSIBLE_PERSON",
	},
	{
		value: "SA",
		name: "Sales administration",
		description:
			"Name of the sales administration contact within a corporation.",
		key: "SALES_ADMINISTRATION",
	},
	{
		value: "SC",
		name: "Schedule contact",
		description: "Name of the scheduling contact within a corporation.",
		key: "SCHEDULE_CONTACT",
	},
	{
		value: "SD",
		name: "Shipping contact",
		description: "The shipping department contact within an organization.",
		key: "SHIPPING_CONTACT",
	},
	{
		value: "SR",
		name: "Sales representative or department",
		description:
			"The sales representative or department contact within an organization.",
		key: "SALES_REPRESENTATIVE_OR_DEPARTMENT",
	},
	{
		value: "SU",
		name: "Supplier contact",
		description: "Department/person to be contacted at the supplier.",
		key: "SUPPLIER_CONTACT",
	},
	{
		value: "TA",
		name: "Traffic administrator",
		description: "The traffic administrator contact within an organization.",
		key: "TRAFFIC_ADMINISTRATOR",
	},
	{
		value: "TD",
		name: "Test contact",
		description: "Department/person responsible for testing contact.",
		key: "TEST_CONTACT",
	},
	{
		value: "TI",
		name: "Technical documentation recipient",
		description: "Department/person to receive technical documentation.",
		key: "TECHNICAL_DOCUMENTATION_RECIPIENT",
	},
	{
		value: "TR",
		name: "Transport contact",
		description: "Department/person in charge of transportation.",
		key: "TRANSPORT_CONTACT",
	},
	{
		value: "WH",
		name: "Warehouse",
		description: "The warehouse contact within an organization.",
		key: "WAREHOUSE",
	},
	{
		value: "WI",
		name: "Alternate contact",
		description: "Alternate department or person to contact.",
		key: "ALTERNATE_CONTACT",
	},
	{
		value: "WJ",
		name: "Office Manager",
		description:
			"An individual responsible for managing the day to day activities of an office.",
		key: "OFFICE_MANAGER",
	},
	{
		value: "WK",
		name: "Chartered accountant contact",
		description: "Code identifying a chartered accountant contact.",
		key: "CHARTERED_ACCOUNTANT_CONTACT",
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
		untdid3139: typeof untdid3139;
	}
}
registerCodelist("untdid3139", untdid3139);

export default untdid3139;
