import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid3139 = [
	{
		name: "Insurance contact",
		value: "AA",
		description:
			"Department/person to contact for matters regarding insurance.",
		key: "INSURANCE_CONTACT",
	},
	{
		name: "Workshop contact",
		value: "AB",
		description:
			"Department/person to contact for matters regarding the workshop.",
		key: "WORKSHOP_CONTACT",
	},
	{
		name: "Accepting contact",
		value: "AC",
		description: "Department/person in charge of accepting incoming goods.",
		key: "ACCEPTING_CONTACT",
	},
	{
		name: "Accounting contact",
		value: "AD",
		description: "The contact responsible for accounting matters.",
		key: "ACCOUNTING_CONTACT",
	},
	{
		name: "Contract contact",
		value: "AE",
		description:
			"Department/person to contact for matters regarding contracts.",
		key: "CONTRACT_CONTACT",
	},
	{
		name: "Land registry contact",
		value: "AF",
		description:
			"Department/person to contact for matters regarding land registry.",
		key: "LAND_REGISTRY_CONTACT",
	},
	{
		name: "Agent",
		value: "AG",
		description:
			"Department/person of the agent which acts on behalf of another party.",
		key: "AGENT",
	},
	{
		name: "Coordination contact",
		value: "AH",
		description:
			"Department/person to contact for matters regarding technical coordination of works.",
		key: "COORDINATION_CONTACT",
	},
	{
		name: "Project management contact",
		value: "AI",
		description:
			"Department/person to contact for matters regarding project management on behalf of the contractor.",
		key: "PROJECT_MANAGEMENT_CONTACT",
	},
	{
		name: "Investment contact",
		value: "AJ",
		description:
			"Department/person to contact for matters regarding investments.",
		key: "INVESTMENT_CONTACT",
	},
	{
		name: "Works management contact",
		value: "AK",
		description:
			"Department/person to contact for matters regarding management of works on behalf of the owner.",
		key: "WORKS_MANAGEMENT_CONTACT",
	},
	{
		name: "Personnel contact",
		value: "AL",
		description:
			"Department/person to contact for matters regarding personnel (human resources).",
		key: "PERSONNEL_CONTACT",
	},
	{
		name: "Claims contact",
		value: "AM",
		description: "Department/person to contact for matters regarding claims.",
		key: "CLAIMS_CONTACT",
	},
	{
		name: "Laboratory contact",
		value: "AN",
		description: "Department/person to contact for laboratory matters.",
		key: "LABORATORY_CONTACT",
	},
	{
		name: "Plant/equipment contact",
		value: "AO",
		description:
			"Department/person to contact for matters regarding plant/equipment.",
		key: "PLANT_EQUIPMENT_CONTACT",
	},
	{
		name: "Accounts payable contact",
		value: "AP",
		description:
			"Department/person responsible for the accounts payable function within a corporation.",
		key: "ACCOUNTS_PAYABLE_CONTACT",
	},
	{
		name: "Quantity surveyor contact",
		value: "AQ",
		description:
			"Department/person to contact for matters regarding quantity surveying.",
		key: "QUANTITY_SURVEYOR_CONTACT",
	},
	{
		name: "Accounts receivable contact",
		value: "AR",
		description:
			"Department/person responsible for the accounts receivable within a corporation.",
		key: "ACCOUNTS_RECEIVABLE_CONTACT",
	},
	{
		name: "Public relations contact",
		value: "AS",
		description:
			"Department/person to contact for matters regarding public relations.",
		key: "PUBLIC_RELATIONS_CONTACT",
	},
	{
		name: "Technical contact",
		value: "AT",
		description:
			"Department/person to contact for matters regarding technical issues.",
		key: "TECHNICAL_CONTACT",
	},
	{
		name: "City works authority contact",
		value: "AU",
		description:
			"Department/person to contact for matters regarding city works.",
		key: "CITY_WORKS_AUTHORITY_CONTACT",
	},
	{
		name: "Maintenance contact",
		value: "AV",
		description:
			"Department/person to contact for matters regarding maintenance.",
		key: "MAINTENANCE_CONTACT",
	},
	{
		name: "Town planning contact",
		value: "AW",
		description:
			"Department/person to contact for matters regarding town planning.",
		key: "TOWN_PLANNING_CONTACT",
	},
	{
		name: "Traffic authority contact",
		value: "AX",
		description: "Department/person to contact for matters regarding traffic.",
		key: "TRAFFIC_AUTHORITY_CONTACT",
	},
	{
		name: "Electricity supply contact",
		value: "AY",
		description:
			"Department/person to contact for matters regarding electricity supply.",
		key: "ELECTRICITY_SUPPLY_CONTACT",
	},
	{
		name: "Gas supply contact",
		value: "AZ",
		description:
			"Department/person to contact for matters regarding gas supply.",
		key: "GAS_SUPPLY_CONTACT",
	},
	{
		name: "Water supply contact",
		value: "BA",
		description:
			"Department/person to contact for matters regarding water supply.",
		key: "WATER_SUPPLY_CONTACT",
	},
	{
		name: "Telecommunications network contact",
		value: "BB",
		description:
			"Department/person to contact for matters regarding telecommunications network.",
		key: "TELECOMMUNICATIONS_NETWORK_CONTACT",
	},
	{
		name: "Banking contact",
		value: "BC",
		description: "Contact person for bank.",
		key: "BANKING_CONTACT",
	},
	{
		name: "New developments contact",
		value: "BD",
		description:
			"Department/person to contact for matters regarding new developments (e.g. construction).",
		key: "NEW_DEVELOPMENTS_CONTACT",
	},
	{
		name: "Transport infrastructure authority",
		value: "BE",
		description:
			"Department/person to contact for matters regarding transport infrastructure.",
		key: "TRANSPORT_INFRASTRUCTURE_AUTHORITY",
	},
	{
		name: "Service contact",
		value: "BF",
		description: "Department/person to be contacted in service matters.",
		key: "SERVICE_CONTACT",
	},
	{
		name: "Auditing contact",
		value: "BG",
		description: "Department or person to contact with regard to auditing.",
		key: "AUDITING_CONTACT",
	},
	{
		name: "Legal auditing contact",
		value: "BH",
		description:
			"Department or person to contact with regard to legal auditing.",
		key: "LEGAL_AUDITING_CONTACT",
	},
	{
		name: "Software house contact",
		value: "BI",
		description:
			"Department or person to contact with regard to software house.",
		key: "SOFTWARE_HOUSE_CONTACT",
	},
	{
		name: "Department or person responsible for processing purchase",
		value: "BJ",
		description:
			"order Identification of the department or person responsible for the processing of purchase orders.",
		key: "DEPARTMENT_OR_PERSON_RESPONSIBLE_FOR_PROCESSING_PURCHASE",
	},
	{
		name: "Electronic data interchange coordinator",
		value: "BK",
		description:
			"Code specifying a person responsible for the coordination of matters related to the exchange of information in electronic data interchange format.",
		key: "ELECTRONIC_DATA_INTERCHANGE_COORDINATOR",
	},
	{
		name: "Waiver contact",
		value: "BL",
		description: "Code specifying a party knowledgeable about a waiver.",
		key: "WAIVER_CONTACT",
	},
	{
		name: "Automated clearing house (ACH) contact",
		value: "BM",
		description:
			"Code specifying a person to be contacted at an automated clearing house.",
		key: "AUTOMATED_CLEARING_HOUSE_ACH_CONTACT",
	},
	{
		name: "Certification contact",
		value: "BN",
		description:
			"Code specifying a contact with knowledge of a certification action.",
		key: "CERTIFICATION_CONTACT",
	},
	{
		name: "After business hours contact",
		value: "BO",
		description: "Department/person to contact after normal working hours.",
		key: "AFTER_BUSINESS_HOURS_CONTACT",
	},
	{
		name: "Company Security Officer�s 24-hour contact",
		value: "BP",
		description:
			"The round the clock contact of the Company Security Officer who is responsible for the vessel.",
		key: "COMPANY_SECURITY_OFFICER_S_24_HOUR_CONTACT",
	},
	{
		name: "Agent of ship at the intended port of arrival",
		value: "BQ",
		description:
			"Contact details of the agent of the ship at the intended port of arrival.",
		key: "AGENT_OF_SHIP_AT_THE_INTENDED_PORT_OF_ARRIVAL",
	},
	{
		name: "Cook",
		value: "BR",
		description: "Person responsible for cooking.",
		key: "COOK",
	},
	{
		name: "Customer contact",
		value: "BS",
		description: "The main department/person to be contacted at the customer.",
		key: "CUSTOMER_CONTACT",
	},
	{
		name: "Meter access contact",
		value: "BT",
		description:
			"Department/person to contact for matters regarding meter reading, including access to the meter.",
		key: "METER_ACCESS_CONTACT",
	},
	{
		name: "Ultimate consignee",
		value: "BU",
		description: "Final recipient of the consignment.",
		key: "ULTIMATE_CONSIGNEE",
	},
	{
		name: "Carrier",
		value: "CA",
		description:
			"(3126) Party undertaking or arranging transport of goods between named points.",
		key: "CARRIER",
	},
	{
		name: "Changed by",
		value: "CB",
		description: "Person who made the change.",
		key: "CHANGED_BY",
	},
	{
		name: "Responsible person for information production",
		value: "CC",
		description:
			"Responsible person to contact for matters regarding the production of information.",
		key: "RESPONSIBLE_PERSON_FOR_INFORMATION_PRODUCTION",
	},
	{
		name: "Responsible person for information dissemination",
		value: "CD",
		description:
			"Responsible person to contact for matters regarding information dissemination.",
		key: "RESPONSIBLE_PERSON_FOR_INFORMATION_DISSEMINATION",
	},
	{
		name: "Head of unit for computer data processing",
		value: "CE",
		description:
			"Head of unit to contact for matters regarding computer data processing.",
		key: "HEAD_OF_UNIT_FOR_COMPUTER_DATA_PROCESSING",
	},
	{
		name: "Head of unit for information production",
		value: "CF",
		description:
			"Head of unit to contact for matters regarding the production of information.",
		key: "HEAD_OF_UNIT_FOR_INFORMATION_PRODUCTION",
	},
	{
		name: "Head of unit for information dissemination",
		value: "CG",
		description:
			"Head of unit to contact for matters regarding dissemination of information.",
		key: "HEAD_OF_UNIT_FOR_INFORMATION_DISSEMINATION",
	},
	{
		name: "Consignee",
		value: "CN",
		description: "(3132) Party to which goods are consigned.",
		key: "CONSIGNEE",
	},
	{
		name: "Consignor",
		value: "CO",
		description:
			"(3336) Party which, by contract with a carrier, consigns or sends goods with the carrier, or has them conveyed by him. Synonym: shipper/sender.",
		key: "CONSIGNOR",
	},
	{
		name: "Responsible person for computer data processing",
		value: "CP",
		description:
			"Responsible person to contact for matters regarding computer data processing.",
		key: "RESPONSIBLE_PERSON_FOR_COMPUTER_DATA_PROCESSING",
	},
	{
		name: "Customer relations",
		value: "CR",
		description: "Individual responsible for customer relations.",
		key: "CUSTOMER_RELATIONS",
	},
	{
		name: "Confirmed with",
		value: "CW",
		description:
			"Person with whom the contents of the purchase order has been discussed and agreed (e.g. by telephone) prior to the sending of this message.",
		key: "CONFIRMED_WITH",
	},
	{
		name: "Department/employee to execute export procedures",
		value: "DE",
		description: "Department/employee which/who executes export procedures.",
		key: "DEPARTMENT_EMPLOYEE_TO_EXECUTE_EXPORT_PROCEDURES",
	},
	{
		name: "Department/employee to execute import procedures",
		value: "DI",
		description: "Department/employee which/who executes import procedures.",
		key: "DEPARTMENT_EMPLOYEE_TO_EXECUTE_IMPORT_PROCEDURES",
	},
	{
		name: "Delivery contact",
		value: "DL",
		description: "Department/person responsible for delivery.",
		key: "DELIVERY_CONTACT",
	},
	{
		name: "Entered by",
		value: "EB",
		description: "Name of an individual who made the entry.",
		key: "ENTERED_BY",
	},
	{
		name: "Education coordinator",
		value: "EC",
		description: "Person in charge of coordination of education.",
		key: "EDUCATION_COORDINATOR",
	},
	{
		name: "Engineering contact",
		value: "ED",
		description:
			"Department/person to contact for matters regarding engineering.",
		key: "ENGINEERING_CONTACT",
	},
	{
		name: "Expeditor",
		value: "EX",
		description: "The contact for expediting.",
		key: "EXPEDITOR",
	},
	{
		name: "Goods receiving contact",
		value: "GR",
		description:
			"Department/person responsible for receiving the goods at the place of delivery.",
		key: "GOODS_RECEIVING_CONTACT",
	},
	{
		name: "Emergency dangerous goods contact",
		value: "HE",
		description:
			"[3058] Party who is to be contacted to intervene in case of emergency.",
		key: "EMERGENCY_DANGEROUS_GOODS_CONTACT",
	},
	{
		name: "Dangerous goods contact",
		value: "HG",
		description:
			"[3060] Department/person to be contacted for details about the transportation of dangerous goods/hazardous material.",
		key: "DANGEROUS_GOODS_CONTACT",
	},
	{
		name: "Hazardous material contact",
		value: "HM",
		description:
			"Department/person responsible for hazardous material control.",
		key: "HAZARDOUS_MATERIAL_CONTACT",
	},
	{
		name: "Information contact",
		value: "IC",
		description:
			"Department/person to contact for questions regarding transactions.",
		key: "INFORMATION_CONTACT",
	},
	{
		name: "Insurer contact",
		value: "IN",
		description: "Department/employee to be contacted at the insurer.",
		key: "INSURER_CONTACT",
	},
	{
		name: "Place of delivery contact",
		value: "LB",
		description:
			"Department/employee to be contacted at the place of delivery.",
		key: "PLACE_OF_DELIVERY_CONTACT",
	},
	{
		name: "Place of collection contact",
		value: "LO",
		description:
			"Department/employee to be contacted at the place of collection.",
		key: "PLACE_OF_COLLECTION_CONTACT",
	},
	{
		name: "Material control contact",
		value: "MC",
		description:
			"Department/person responsible for the controlling/inspection of goods.",
		key: "MATERIAL_CONTROL_CONTACT",
	},
	{
		name: "Material disposition contact",
		value: "MD",
		description:
			"Department/person responsible for the disposition/scheduling of goods.",
		key: "MATERIAL_DISPOSITION_CONTACT",
	},
	{
		name: "Material handling contact",
		value: "MH",
		description: "Department/employee to be contacted for material handling.",
		key: "MATERIAL_HANDLING_CONTACT",
	},
	{
		name: "Message recipient contact",
		value: "MR",
		description:
			"Department/employee to be contacted at the message recipient.",
		key: "MESSAGE_RECIPIENT_CONTACT",
	},
	{
		name: "Message sender contact",
		value: "MS",
		description: "Department/employee to be contacted at the message sender.",
		key: "MESSAGE_SENDER_CONTACT",
	},
	{
		name: "Notification contact",
		value: "NT",
		description: "Department/employee to be notified.",
		key: "NOTIFICATION_CONTACT",
	},
	{
		name: "Order contact",
		value: "OC",
		description: "An individual to contact for questions regarding this order.",
		key: "ORDER_CONTACT",
	},
	{
		name: "Prototype coordinator",
		value: "PA",
		description:
			"Department/employee to be contacted as prototype co- ordinator.",
		key: "PROTOTYPE_COORDINATOR",
	},
	{
		name: "Purchasing contact",
		value: "PD",
		description:
			"Department/person responsible for issuing this purchase order.",
		key: "PURCHASING_CONTACT",
	},
	{
		name: "Payee contact",
		value: "PE",
		description: "Department/employee to be contacted at the payee.",
		key: "PAYEE_CONTACT",
	},
	{
		name: "Product management contact",
		value: "PM",
		description:
			"Department/person to contact for questions regarding this order.",
		key: "PRODUCT_MANAGEMENT_CONTACT",
	},
	{
		name: "Quality assurance contact",
		value: "QA",
		description: "Quality assurance contact within an organization.",
		key: "QUALITY_ASSURANCE_CONTACT",
	},
	{
		name: "Quality coordinator contact",
		value: "QC",
		description: "Quality coordinator contact within an organization.",
		key: "QUALITY_COORDINATOR_CONTACT",
	},
	{
		name: "Receiving dock contact",
		value: "RD",
		description: "The receiving dock contact within an organization.",
		key: "RECEIVING_DOCK_CONTACT",
	},
	{
		name: "Authorized responsible person",
		value: "RP",
		description:
			"Responsible person who is authorized to sign official documents.",
		key: "AUTHORIZED_RESPONSIBLE_PERSON",
	},
	{
		name: "Sales administration",
		value: "SA",
		description:
			"Name of the sales administration contact within a corporation.",
		key: "SALES_ADMINISTRATION",
	},
	{
		name: "Schedule contact",
		value: "SC",
		description: "Name of the scheduling contact within a corporation.",
		key: "SCHEDULE_CONTACT",
	},
	{
		name: "Shipping contact",
		value: "SD",
		description: "The shipping department contact within an organization.",
		key: "SHIPPING_CONTACT",
	},
	{
		name: "Sales representative or department",
		value: "SR",
		description:
			"The sales representative or department contact within an organization.",
		key: "SALES_REPRESENTATIVE_OR_DEPARTMENT",
	},
	{
		name: "Supplier contact",
		value: "SU",
		description: "Department/person to be contacted at the supplier.",
		key: "SUPPLIER_CONTACT",
	},
	{
		name: "Traffic administrator",
		value: "TA",
		description: "The traffic administrator contact within an organization.",
		key: "TRAFFIC_ADMINISTRATOR",
	},
	{
		name: "Test contact",
		value: "TD",
		description: "Department/person responsible for testing contact.",
		key: "TEST_CONTACT",
	},
	{
		name: "Technical documentation recipient",
		value: "TI",
		description: "Department/person to receive technical documentation.",
		key: "TECHNICAL_DOCUMENTATION_RECIPIENT",
	},
	{
		name: "Transport contact",
		value: "TR",
		description: "Department/person in charge of transportation.",
		key: "TRANSPORT_CONTACT",
	},
	{
		name: "Warehouse",
		value: "WH",
		description: "The warehouse contact within an organization.",
		key: "WAREHOUSE",
	},
	{
		name: "Alternate contact",
		value: "WI",
		description: "Alternate department or person to contact.",
		key: "ALTERNATE_CONTACT",
	},
	{
		name: "Office Manager",
		value: "WJ",
		description:
			"An individual responsible for managing the day to day activities of an office.",
		key: "OFFICE_MANAGER",
	},
	{
		name: "Chartered accountant contact",
		value: "WK",
		description: "Code identifying a chartered accountant contact.",
		key: "CHARTERED_ACCOUNTANT_CONTACT",
	},
	{
		name: "Mutually defined",
		value: "ZZZ",
		description:
			"A code assigned within a code list to be used on an interim basis and as defined among trading partners until a precise code can be assigned to the code list. Data Element Cross Reference DataElement 3139 is used in the following Batch Segments: CTA Copyright United Nations, all rights reserved     UN Economic Commission for Europe Palais des Nations, CH-1211 Geneva 10, Switzerland  Tel: +41-22 917 1366 Fax: +41-22 917 0037  E-mail: TradeMaster@unece.org UN/EDIFACT Directories",
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
