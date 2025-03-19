/**
 * @see https://service.unece.org/trade/untdid/d17a/tred/tred3139.htm
 */

export type Untdid3139Definition = {
    code: string;
    name?: string;
    description?: string;
};

export type Untdid1229Code = (typeof UNTDID_3139)[number]["code"];

export const UNTDID_3139_IDENTIFIER = "untdid.3139" as const;


export const UNTDID_3139 = [
    {
        code: "AA",
        name: "Insurance contact",
        description: "Department/person to contact for matters regarding insurance."
    },
    {
        code: "AB",
        name: "Workshop contact",
        description: "Department/person to contact for matters regarding the workshop."
    },
    {
        code: "AC",
        name: "Accepting contact",
        description: "Department/person in charge of accepting incoming goods."
    },
    {
        code: "AD",
        name: "Accounting contact",
        description: "The contact responsible for accounting matters."
    },
    {
        code: "AE",
        name: "Contract contact",
        description: "Department/person to contact for matters regarding contracts."
    },
    {
        code: "AF",
        name: "Land registry contact",
        description: "Department/person to contact for matters regarding land registry."
    },
    {
        code: "AG",
        name: "Agent",
        description: "Department/person of the agent which acts on behalf of another party."
    },
    {
        code: "AH",
        name: "Coordination contact",
        description: "Department/person to contact for matters regarding technical coordination of works."
    },
    {
        code: "AI",
        name: "Project management contact",
        description: "Department/person to contact for matters regarding project management on behalf of the contractor."
    },
    {
        code: "AJ",
        name: "Investment contact",
        description: "Department/person to contact for matters regarding investments."
    },
    {
        code: "AK",
        name: "Works management contact",
        description: "Department/person to contact for matters regarding management of works on behalf of the owner."
    },
    {
        code: "AL",
        name: "Personnel contact",
        description: "Department/person to contact for matters regarding personnel (human resources)."
    },
    {
        code: "AM",
        name: "Claims contact",
        description: "Department/person to contact for matters regarding claims."
    },
    {
        code: "AN",
        name: "Laboratory contact",
        description: "Department/person to contact for laboratory matters."
    },
    {
        code: "AO",
        name: "Plant/equipment contact",
        description: "Department/person to contact for matters regarding plant/equipment."
    },
    {
        code: "AP",
        name: "Accounts payable contact",
        description: "Department/person responsible for the accounts payable function within a corporation."
    },
    {
        code: "AQ",
        name: "Quantity surveyor contact",
        description: "Department/person to contact for matters regarding quantity surveying."
    },
    {
        code: "AR",
        name: "Accounts receivable contact",
        description: "Department/person responsible for the accounts receivable within a corporation."
    },
    {
        code: "AS",
        name: "Public relations contact",
        description: "Department/person to contact for matters regarding public relations."
    },
    {
        code: "AT",
        name: "Technical contact",
        description: "Department/person to contact for matters regarding technical issues."
    },
    {
        code: "AU",
        name: "City works authority contact",
        description: "Department/person to contact for matters regarding city works."
    },
    {
        code: "AV",
        name: "Maintenance contact",
        description: "Department/person to contact for matters regarding maintenance."
    },
    {
        code: "AW",
        name: "Town planning contact",
        description: "Department/person to contact for matters regarding town planning."
    },
    {
        code: "AX",
        name: "Traffic authority contact",
        description: "Department/person to contact for matters regarding traffic."
    },
    {
        code: "AY",
        name: "Electricity supply contact",
        description: "Department/person to contact for matters regarding electricity supply."
    },
    {
        code: "AZ",
        name: "Gas supply contact",
        description: "Department/person to contact for matters regarding gas supply."
    },
    {
        code: "BA",
        name: "Water supply contact",
        description: "Department/person to contact for matters regarding water supply."
    },
    {
        code: "BB",
        name: "Telecommunications network contact",
        description: "Department/person to contact for matters regarding telecommunications network."
    },
    {
        code: "BC",
        name: "Banking contact",
        description: "Contact person for bank."
    },
    {
        code: "BD",
        name: "New developments contact",
        description: "Department/person to contact for matters regarding new developments (e.g. construction)."
    },
    {
        code: "BE",
        name: "Transport infrastructure authority",
        description: "Department/person to contact for matters regarding transport infrastructure."
    },
    {
        code: "BF",
        name: "Service contact",
        description: "Department/person to be contacted in service matters."
    },
    {
        code: "BG",
        name: "Auditing contact",
        description: "Department or person to contact with regard to auditing."
    },
    {
        code: "BH",
        name: "Legal auditing contact",
        description: "Department or person to contact with regard to legal auditing."
    },
    {
        code: "BI",
        name: "Software house contact",
        description: "Department or person to contact with regard to software house."
    },
    {
        code: "BJ",
        name: "Department or person responsible for processing purchase order",
        description: "Identification of the department or person responsible for the processing of purchase orders."
    },
    {
        code: "BK",
        name: "Electronic data interchange coordinator",
        description: "Code specifying a person responsible for the coordination of matters related to the exchange of information in electronic data interchange format."
    },
    {
        code: "BL",
        name: "Waiver contact",
        description: "Code specifying a party knowledgeable about a waiver."
    },
    {
        code: "BM",
        name: "Automated clearing house (ACH) contact",
        description: "Code specifying a person to be contacted at an automated clearing house."
    },
    {
        code: "BN",
        name: "Certification contact",
        description: "Code specifying a contact with knowledge of a certification action."
    },
    {
        code: "BO",
        name: "After business hours contact",
        description: "Department/person to contact after normal working hours."
    },
    {
        code: "BP",
        name: "Company Security Officer's 24-hour contact",
        description: "The round the clock contact of the Company Security Officer who is responsible for the vessel."
    },
    {
        code: "BQ",
        name: "Agent of ship at the intended port of arrival",
        description: "Contact details of the agent of the ship at the intended port of arrival."
    },
    {
        code: "BR",
        name: "Cook",
        description: "Person responsible for cooking."
    },
    {
        code: "BU",
        name: "Ultimate consignee",
        description: "Final recipient of the consignment."
    },
    {
        code: "CA",
        name: "Carrier",
        description: "(3126) Party undertaking or arranging transport of goods between named points."
    },
    {
        code: "CB",
        name: "Changed by",
        description: "Person who made the change."
    },
    {
        code: "CC",
        name: "Responsible person for information production",
        description: "Responsible person to contact for matters regarding the production of information."
    },
    {
        code: "CD",
        name: "Responsible person for information dissemination",
        description: "Responsible person to contact for matters regarding information dissemination."
    },
    {
        code: "CE",
        name: "Head of unit for computer data processing",
        description: "Head of unit to contact for matters regarding computer data processing."
    },
    {
        code: "CF",
        name: "Head of unit for information production",
        description: "Head of unit to contact for matters regarding the production of information."
    },
    {
        code: "CG",
        name: "Head of unit for information dissemination",
        description: "Head of unit to contact for matters regarding dissemination of information."
    },
    {
        code: "CN",
        name: "Consignee",
        description: "(3132) Party to which goods are consigned."
    },
    {
        code: "CO",
        name: "Consignor",
        description: "(3336) Party which, by contract with a carrier, consigns or sends goods with the carrier, or has them conveyed by him. Synonym: shipper/sender."
    },
    {
        code: "CP",
        name: "Responsible person for computer data processing",
        description: "Responsible person to contact for matters regarding computer data processing."
    },
    {
        code: "CR",
        name: "Customer relations",
        description: "Individual responsible for customer relations."
    },
    {
        code: "CW",
        name: "Confirmed with",
        description: "Person with whom the contents of the purchase order has been discussed and agreed (e.g. by telephone) prior to the sending of this message."
    },
    {
        code: "DE",
        name: "Department/employee to execute export procedures",
        description: "Department/employee which/who executes export procedures."
    },
    {
        code: "DI",
        name: "Department/employee to execute import procedures",
        description: "Department/employee which/who executes import procedures."
    },
    {
        code: "CL",
        name: "Delivery contact",
        description: "Department/person responsible for delivery."
    },
    {
        code: "EB",
        name: "Entered by",
        description: "Name of an individual who made the entry."
    },
    {
        code: "EC",
        name: "Education coordinator",
        description: "Person in charge of coordination of education."
    },
    {
        code: "ED",
        name: "Engineering contact",
        description: "Department/person to contact for matters regarding engineering."
    },
    {
        code: "EX",
        name: "Expeditor",
        description: "The contact for expediting."
    },
    {
        code: "GR",
        name: "Goods receiving contact",
        description: "Department/person responsible for receiving the goods at the place of delivery."
    },
    {
        code: "HE",
        name: "Emergency dangerous goods contact",
        description: "[3058] Party who is to be contacted to intervene in case of emergency."
    },
    {
        code: "HG",
        name: "Dangerous goods contact",
        description: "[3060] Department/person to be contacted for details about the transportation of dangerous goods/hazardous material."
    },
    {
        code: "HM",
        name: "Hazardous material contact",
        description: "Department/person responsible for hazardous material control."
    },
    {
        code: "IC",
        name: "Information contact",
        description: "Department/person to contact for questions regarding transactions."
    },
    {
        code: "IN",
        name: "Insurer contact",
        description: "Department/employee to be contacted at the insurer."
    },
    {
        code: "LB",
        name: "Place of delivery contact",
        description: "Department/employee to be contacted at the place of delivery."
    },
    {
        code: "LO",
        name: "Place of collection contact",
        description: "Department/employee to be contacted at the place of collection."
    },
    {
        code: "MC",
        name: "Material control contact",
        description: "Department/person responsible for the controlling/inspection of goods."
    },
    {
        code: "MD",
        name: "Material disposition contact",
        description: "Department/person responsible for the disposition/scheduling of goods."
    },
    {
        code: "MH",
        name: "Material handling contact",
        description: "Department/employee to be contacted for material handling."
    },
    {
        code: "MR",
        name: "Message recipient contact",
        description: "Department/employee to be contacted at the message recipient."
    },
    {
        code: "MS",
        name: "Message sender contact",
        description: "Department/employee to be contacted at the message sender."
    },
    {
        code: "NT",
        name: "Notification contact",
        description: "Department/employee to be notified."
    },
    {
        code: "OC",
        name: "Order contact",
        description: "An individual to contact for questions regarding this order."
    },
    {
        code: "PA",
        name: "Prototype coordinator",
        description: "Department/employee to be contacted as prototype co-ordinator."
    },
    {
        code: "PD",
        name: "Purchasing contact",
        description: "Department/person responsible for issuing this purchase order."
    },
    {
        code: "PE",
        name: "Payee contact",
        description: "Department/employee to be contacted at the payee."
    },
    {
        code: "PM",
        name: "Product management contact",
        description: "Department/person to contact for questions regarding this order."
    },
    {
        code: "QA",
        name: "Quality assurance contact",
        description: "Quality assurance contact within an organization."
    },
    {
        code: "QC",
        name: "Quality coordinator contact",
        description: "Quality coordinator contact within an organization."
    },
    {
        code: "RD",
        name: "Receiving dock contact",
        description: "The receiving dock contact within an organization."
    },
    {
        code: "RP",
        name: "Authorized responsible person",
        description: "Responsible person who is authorized to sign official documents."
    },
    {
        code: "SA",
        name: "Sales administration",
        description: "Name of the sales administration contact within a corporation."
    },
    {
        code: "SC",
        name: "Schedule contact",
        description: "Name of the scheduling contact within a corporation."
    },
    {
        code: "SD",
        name: "Shipping contact",
        description: "The shipping department contact within an organization."
    },
    {
        code: "SR",
        name: "Sales representative or department",
        description: "The sales representative or department contact within an organization."
    },
    {
        code: "SU",
        name: "Supplier contact",
        description: "Department/person to be contacted at the supplier."
    },
    {
        code: "TA",
        name: "Traffic administrator",
        description: "The traffic administrator contact within an organization."
    },
    {
        code: "TD",
        name: "Test contact",
        description: "Department/person responsible for testing contact."
    },
    {
        code: "TI",
        name: "Technical documentation recipient",
        description: "Department/person to receive technical documentation."
    },
    {
        code: "TR",
        name: "Transport contact",
        description: "Department/person in charge of transportation."
    },
    {
        code: "WH",
        name: "Warehouse",
        description: "The warehouse contact within an organization."
    },
    {
        code: "WI",
        name: "Alternate contact",
        description: "Alternate department or person to contact."
    },
    {
        code: "WJ",
        name: "Office Manager",
        description: "An individual responsible for managing the day to day activities of an office."
    },
    {
        code: "WK",
        name: "Chartered accountant contact",
        description: "Code identifying a chartered accountant contact."
    },
    {
        code: "ZZZ",
        name: "Mutually defined",
        description: "A code assigned within a code list to be used on an interim basis and as defined among trading partners until a precise code can be assigned to the code list."
    },
] as const satisfies Untdid3139Definition[]
