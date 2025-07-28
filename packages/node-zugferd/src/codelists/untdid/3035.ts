/**
 * @see https://service.unece.org/trade/untdid/d00a/tred/tred3035.htm
 */

export type Untdid3035Definition = {
	key: string;
	code: string;
	name?: string;
	description?: string;
};

export type Untdid3035Code = (typeof UNTDID_3035)[number]["code"];

export const UNTDID_3035_IDENTIFIER = "untdid.3035" as const;

export const UNTDID_3035 = [
	{
		key: "PARTY_TO_BE_BILLED_AAR_ACCOUNTING_RULE_11",
		name: "Party to be billed (AAR Accounting rule 11)",
		code: "AA",
		description:
			"Party to be billed in accordance with AAR Accounting rule 11.",
	},
	{
		key: "BUYERS_AGENTREPRESENTATIVE",
		name: "Buyer's agent/representative",
		code: "AB",
		description:
			"Third party who arranged the purchase of merchandise on behalf of the actual buyer.",
	},
	{
		key: "DECLARANTS_AGENTREPRESENTATIVE",
		name: "Declarant's agent/representative",
		code: "AE",
		description:
			"Any natural or legal person who makes a declaration to an official body on behalf of another natural or legal person, where legally permitted (CCC).",
	},
	{
		key: "TRANSIT_PRINCIPAL",
		name: "Transit principal",
		code: "AF",
		description:
			"Natural or legal person responsible for the satisfactory performance of a Customs transit operation. Source: CCC.",
	},
	{
		key: "AGENTREPRESENTATIVE",
		name: "Agent/representative",
		code: "AG",
		description: "(3196) Party authorized to act on behalf of another party.",
	},
	{
		key: "TRANSIT_PRINCIPALS_AGENTREPRESENTATIVE",
		name: "Transit principal's agent/representative",
		code: "AH",
		description: "Agent acting on behalf of the transit principal (CCC).",
	},
	{
		key: "SUCCESSFUL_JOB_APPLICANT",
		name: "Successful job applicant",
		code: "AI",
		description: "Person who has been chosen for a job.",
	},
	{
		key: "PARTY_ISSUING_MUTUALLY_AGREED_CODES",
		name: "Party issuing mutually agreed codes",
		code: "AJ",
		description:
			"The party which has issued all mutually agreed codes used in the message.",
	},
	{
		key: "ACKNOWLEDGEMENT_RECIPIENT",
		name: "Acknowledgement recipient",
		code: "AK",
		description: "Party to whom acknowledgement should be sent.",
	},
	{
		key: "PRINCIPAL",
		name: "Principal",
		code: "AL",
		description:
			"(3340) Party accepting liability for goods held or moving (e.g. transit) under a Customs authorization and - when applicable - a guarantee.",
	},
	{
		key: "AUTHORIZED_OFFICIAL",
		name: "Authorized official",
		code: "AM",
		description:
			"Employee of a company or firm authorized to act on behalf of that company or firm e.g. to make a Customs declaration.",
	},
	{
		key: "APPROVED_IMPORTER",
		name: "Approved importer",
		code: "AN",
		description:
			"Person or company which is authorised by the relevant Customs authority to import goods without payment all taxes or specific taxes at the point of entry into the country.",
	},
	{
		key: "ACCOUNT_OF",
		name: "Account of",
		code: "AO",
		description: "Party account is assigned to.",
	},
	{
		key: "ACCEPTING_PARTY",
		name: "Accepting party",
		code: "AP",
		description: "(3352) Party accepting goods, products, services etc.",
	},
	{
		key: "APPROVED_CONSIGNOR",
		name: "Approved consignor",
		code: "AQ",
		description:
			"Person or company approved by the relevant authority in the country to pack and export specific goods under Customs supervision.",
	},
	{
		key: "AUTHORIZED_EXPORTER",
		name: "Authorized exporter",
		code: "AR",
		description:
			"Exporter authorized/approved by Customs for special Customs procedures e.g. simplified procedure.",
	},
	{
		key: "ACCOUNT_SERVICING_FINANCIAL_INSTITUTION",
		name: "Account servicing financial institution",
		code: "AS",
		description:
			"Identifies the financial institution servicing the account(s).",
	},
	{
		key: "AUTHORIZED_IMPORTER",
		name: "Authorized importer",
		code: "AT",
		description:
			"Importer authorized/approved by Customs for special Customs procedures e.g. simplified procedure.",
	},
	{
		key: "AUTHORIZED_TRADER_TRANSIT",
		name: "Authorized trader (transit)",
		code: "AU",
		description:
			"Trader authorized/approved by Customs for special transit procedures e.g. simplified procedure.",
	},
	{
		key: "AUTHORIZING_OFFICIAL",
		name: "Authorizing official",
		code: "AV",
		description:
			"Party that has delegated the authority to take a certain action on behalf of a company or agency.",
	},
	{
		key: "APPLICANTS_BANK",
		name: "Applicant's bank",
		code: "AW",
		description:
			"Financial institution which is requested to issue the documentary credit.",
	},
	{
		key: "AUTHENTICATING_PARTY",
		name: "Authenticating party",
		code: "AX",
		description: "Party which certifies that a document is authentic.",
	},
	{
		key: "ANIMAL_BEING_INVESTIGATED",
		name: "Animal being investigated",
		code: "AY",
		description: "Animal being investigated.",
	},
	{
		key: "ISSUING_BANK",
		name: "Issuing bank",
		code: "AZ",
		description:
			"Financial institution which issues the documentary credit, if the applicant's bank is not acting as the issuing bank.",
	},
	{
		key: "CONTACT_BANK_1",
		name: "Contact bank 1",
		code: "B1",
		description:
			"Identifies an additional bank which must be informed of certain aspects of the message.",
	},
	{
		key: "CONTACT_BANK_2",
		name: "Contact bank 2",
		code: "B2",
		description:
			"Identifies an additional bank which must be informed of certain aspects of the message.",
	},
	{
		key: "BOOKING_AGENT",
		name: "Booking agent",
		code: "BA",
		description:
			"Party acting as a booking office for transport and forwarding services.",
	},
	{
		key: "BUYERS_BANK",
		name: "Buyer's bank",
		code: "BB",
		description: "[3420] Bank employed by the buyer to make payment.",
	},
	{
		key: "NEGOTIATING_BANK",
		name: "Negotiating bank",
		code: "BC",
		description:
			"Financial institution to whom a negotiable documentary credit is directed.",
	},
	{
		key: "DOCUMENTARY_CREDIT_REIMBURSING_BANK",
		name: "Documentary credit reimbursing bank",
		code: "BD",
		description: "Self-explanatory.",
	},
	{
		key: "BENEFICIARY",
		name: "Beneficiary",
		code: "BE",
		description:
			"The ultimate recipient of the funds. Normally the account owner who is reimbursed by the payor.",
	},
	{
		key: "BENEFICIARYS_BANK",
		name: "Beneficiary's bank",
		code: "BF",
		description:
			"Identifies the account servicer for the beneficiary or the payee.",
	},
	{
		key: "EMPLOYER",
		name: "Employer",
		code: "BG",
		description: "Self-explanatory.",
	},
	{
		key: "PREVIOUS_EMPLOYER",
		name: "Previous employer",
		code: "BH",
		description: "Previous employer of a person(s).",
	},
	{
		key: "BUYERS_FINANCIAL_INSTITUTION",
		name: "Buyer's financial institution",
		code: "BI",
		description: "Financial institution designated by buyer to make payment.",
	},
	{
		key: "RELEASE_TO_PARTY",
		name: "Release to party",
		code: "BJ",
		description:
			"Party to which the goods or container(s) is (are) to be released.",
	},
	{
		key: "FINANCIAL_INSTITUTION",
		name: "Financial institution",
		code: "BK",
		description: "Party acting as financial institution.",
	},
	{
		key: "BILL_OF_LADING_RECIPIENT",
		name: "Bill of lading recipient",
		code: "BL",
		description: "Party to receive B/L.",
	},
	{
		key: "INSURED",
		name: "Insured",
		code: "BM",
		description: "Party which is the object of an insurance contract.",
	},
	{
		key: "INSURANCE_BENEFICIARY",
		name: "Insurance beneficiary",
		code: "BN",
		description: "Party which benefits from insurance coverage.",
	},
	{
		key: "BROKER_OR_SALES_OFFICE",
		name: "Broker or sales office",
		code: "BO",
		description:
			"Party acting in the name of the seller as broker or as sales office.",
	},
	{
		key: "BUILDING_SITE_PURCHASER",
		name: "Building site purchaser",
		code: "BP",
		description:
			"Party at the building site responsible for the purchasing of goods and services for that particular site.",
	},
	{
		key: "CHEQUE_DRAWN_BANK",
		name: "Cheque drawn bank",
		code: "BQ",
		description:
			"Identifies the bank on which the cheque should be drawn, as instructed by the ordering customer.",
	},
	{
		key: "BILL_AND_SHIP_TO",
		name: "Bill and ship to",
		code: "BS",
		description: "Party receiving goods and relevant invoice.",
	},
	{
		key: "PARTY_TO_BE_BILLED_FOR_OTHER_THAN_FREIGHT_BILL_TO",
		name: "Party to be billed for other than freight (bill to)",
		code: "BT",
		description: "Party receiving invoice excluding freight costs.",
	},
	{
		key: "SERVICE_BUREAU",
		name: "Service bureau",
		code: "BU",
		description:
			"Party carrying out service bureau processing work, (e.g. a payroll bureau).",
	},
	{
		key: "MEMBER",
		name: "Member",
		code: "BV",
		description:
			"Member of a group (e.g. of a group of persons or a service scheme).",
	},
	{
		key: "BORROWER",
		name: "Borrower",
		code: "BW",
		description: "Self explanatory.",
	},
	{
		key: "BUILDING_SITE_ENGINEER",
		name: "Building site engineer",
		code: "BX",
		description:
			"Party at the building site responsible for engineering matters for that particular site.",
	},
	{
		key: "BUYER",
		name: "Buyer",
		code: "BY",
		description: "Party to whom merchandise and/or service is sold.",
	},
	{
		key: "BUILDING_SITE_FORWARDER",
		name: "Building site forwarder",
		code: "BZ",
		description:
			"Party at the building site responsible for forwarding the received goods on that particular site.",
	},
	{
		key: "IN_CARE_OF_PARTY_NO_1",
		name: "In care of party no. 1",
		code: "C1",
		description: "Description to be provided.",
	},
	{
		key: "IN_CARE_OF_PARTY_NO_2",
		name: "In care of party no. 2",
		code: "C2",
		description: "Description to be provided.",
	},
	{
		key: "CARRIER",
		name: "Carrier",
		code: "CA",
		description:
			"(3126) Party undertaking or arranging transport of goods between named points.",
	},
	{
		key: "CUSTOMS_BROKER",
		name: "Customs broker",
		code: "CB",
		description:
			"Agent or representative or a professional Customs clearing agent who deals directly with Customs on behalf of the importer or exporter (CCC).",
	},
	{
		key: "CLAIMANT",
		name: "Claimant",
		code: "CC",
		description: "Party who claims goods or insurance.",
	},
	{
		key: "AGENTS_BANK",
		name: "Agent's bank",
		code: "CD",
		description: "Bank of the agent.",
	},
	{
		key: "CEDING_COMPANY",
		name: "Ceding company",
		code: "CE",
		description: "Description to be provided.",
	},
	{
		key: "CONTAINER_OPERATORLESSEE",
		name: "Container operator/lessee",
		code: "CF",
		description:
			" Party to whom the possession of specified property (e.g. container) has been conveyed for a period of time in return for rental payments.",
	},
	{
		key: "CARRIERS_AGENT",
		name: "Carrier's agent",
		code: "CG",
		description: "Party authorized to act for or on behalf of carrier.",
	},
	{
		key: "CONNECTING_CARRIER",
		name: "Connecting carrier",
		code: "CH",
		description:
			"Owner or operator of a transportation conveyance to which goods in a given transaction will be transferred.",
	},
	{
		key: "COMMISSION_PROCESSOR",
		name: "Commission processor",
		code: "CI",
		description:
			"Party who provides extra treatment to goods on commission base.",
	},
	{
		key: "PREVIOUS_MEMBER",
		name: "Previous member",
		code: "CJ",
		description: "Previous member of a group of persons or a service scheme.",
	},
	{
		key: "EMPTY_EQUIPMENT_DESPATCH_PARTY",
		name: "Empty equipment despatch party",
		code: "CK",
		description:
			"Party from whose premises empty equipment will be or has been despatched.",
	},
	{
		key: "CONTAINER_LOCATION_PARTY",
		name: "Container location party",
		code: "CL",
		description:
			"Party from whose premises container will be or has been despatched.",
	},
	{
		key: "CUSTOMS",
		name: "Customs",
		code: "CM",
		description:
			"Identification of customs authority relevant to the transaction or shipment.",
	},
	{
		key: "CONSIGNEE",
		name: "Consignee",
		code: "CN",
		description: "(3132) Party to which goods are consigned.",
	},
	{
		key: "CASH_POOL_TOP_ACCOUNT_SERVICING_FINANCIAL_INSTITUTION",
		name: "Cash pool top account servicing financial institution",
		code: "CNX",
		description:
			"Identification of a financial institution servicing the top account of a cash pool.",
	},
	{
		key: "CASH_POOL_LEVEL_ACCOUNT_SERVICING_FINANCIAL_INSTITUTION",
		name: "Cash pool level account servicing financial institution",
		code: "CNY",
		description:
			"Identification of a financial institution servicing the level account of a cash pool.",
	},
	{
		key: "CASH_POOL_SUB_ACCOUNT_SERVICING_FINANCIAL_INSTITUTION",
		name: "Cash pool sub-account servicing financial institution",
		code: "CNZ",
		description:
			"Identification of a financial institution servicing the sub-account of a cash pool.",
	},
	{
		key: "CORPORATE_OFFICE",
		name: "Corporate office",
		code: "CO",
		description: "Identification of the Head Office within a company.",
	},
	{
		key: "ENTITY_IN_WHICH_A_FINANCIAL_INTEREST_IS_HELD",
		name: "Entity in which a financial interest is held",
		code: "COA",
		description: "Business in which a financial interest is held.",
	},
	{
		key: "INTERMEDIATE_LEVEL_PARENT_COMPANY",
		name: "Intermediate level parent company",
		code: "COB",
		description: "Identifies an intermediate parent company.",
	},
	{
		key: "TRANSSHIPMENT_PARTY",
		name: "Transshipment party",
		code: "COC",
		description: "A party responsible for transshipment.",
	},
	{
		key: "QUOTATION_REQUESTING_PARTY",
		name: "Quotation requesting party",
		code: "COD",
		description: "Party sending a request for a quotation.",
	},
	{
		key: "PARTY_MAINTAINING_THE_CODES_USED_IN_THE_MESSAGE",
		name: "Party maintaining the codes used in the message",
		code: "COE",
		description: "The party which maintains the codes used in the message.",
	},
	{
		key: "PARTY_MAINTAINING_THE_IDENTIFIERS_USED_IN_THE_MESSAGE",
		name: "Party maintaining the identifiers used in the message",
		code: "COF",
		description:
			"The party which maintains the identifiers used in the message.",
	},
	{
		key: "DISPATCHER",
		name: "Dispatcher",
		code: "COG",
		description:
			"An individual responsible for sending something to a destination.",
	},
	{
		key: "SUBMITTER_OF_SAMPLE",
		name: "Submitter of sample",
		code: "COH",
		description: "An entity responsible for the submission of a sample.",
	},
	{
		key: "INSTITUTIONAL_PROVIDER",
		name: "Institutional provider",
		code: "COI",
		description: "The institution providing the service.",
	},
	{
		key: "PRIMARY_HEALTH_CARE_PROVIDER",
		name: "Primary health care provider",
		code: "COJ",
		description:
			"Health care provider that has primary responsibility for patient.",
	},
	{
		key: "ASSISTANT_SURGEON",
		name: "Assistant surgeon",
		code: "COK",
		description: "Physician assisting in surgery.",
	},
	{
		key: "ADMITTING_HEALTH_CARE_PROVIDER",
		name: "Admitting health care provider",
		code: "COL",
		description: "Health care provider that admitted the patient.",
	},
	{
		key: "REFERRING_HEALTH_CARE_PROVIDER",
		name: "Referring health care provider",
		code: "COM",
		description:
			"Health care provider that referred patient to current provider of services.",
	},
	{
		key: "SUPERVISING_HEALTH_CARE_PROVIDER",
		name: "Supervising health care provider",
		code: "CON",
		description:
			"Health care provider that supervised the rendering of a service.",
	},
	{
		key: "PARTY_PROVIDING_FINANCING",
		name: "Party providing financing",
		code: "COO",
		description: "Identifies the party providing the financing.",
	},
	{
		key: "CONVOYING_PARTY",
		name: "Convoying party",
		code: "COP",
		description: "Party designated to escort the transported goods.",
	},
	{
		key: "NOMINATED_BANK",
		name: "Nominated bank",
		code: "COQ",
		description: "Identifies the nominated bank.",
	},
	{
		key: "FAMILY_MEMBER",
		name: "Family member",
		code: "COR",
		description: "Identifies a family member.",
	},
	{
		key: "CO_PARTICIPANT",
		name: "Co-participant",
		code: "COS",
		description: "Identifies another party who participates in an activity.",
	},
	{
		key: "INVOLVED_PARTY",
		name: "Involved party",
		code: "COT",
		description: "Party which is involved in an activity.",
	},
	{
		key: "ASSIGNER",
		name: "Assigner",
		code: "COU",
		description: "Identifies the entity who assigns.",
	},
	{
		key: "REGISTERED_PRINCIPAL",
		name: "Registered principal",
		code: "COV",
		description:
			"An individual who is registered as a principal for an entity.",
	},
	{
		key: "FREIGHT_PAYER_ON_BEHALF_OF_THE_CONSIGNOR",
		name: "Freight payer on behalf of the consignor",
		code: "COW",
		description:
			"Freight payer is a third party acting on behalf of the consignor.",
	},
	{
		key: "FREIGHT_PAYER_ON_BEHALF_OF_THE_CONSIGNEE",
		name: "Freight payer on behalf of the consignee",
		code: "COX",
		description:
			"Freight payer is a third party acting on behalf of the consignee.",
	},
	{
		key: "PARTY_RESPONSIBLE_FOR_DISINFECTION",
		name: "Party responsible for disinfection",
		code: "COY",
		description: "Party responsible for performing disinfection operations.",
	},
	{
		key: "PARTY_RESPONSIBLE_FOR_REFUELING",
		name: "Party responsible for refueling",
		code: "COZ",
		description: "Party responsible for performing refueling operations.",
	},
	{
		key: "PARTY_TO_RECEIVE_CERTIFICATE_OF_COMPLIANCE",
		name: "Party to receive certificate of compliance",
		code: "CP",
		description:
			"Party acting for or on behalf of seller in matters concerning compliance.",
	},
	{
		key: "ADVISING_BANK",
		name: "Advising bank",
		code: "CPA",
		description:
			"Identifies the financial institution used by the issuing bank to advise the documentary credit.",
	},
	{
		key: "REIMBURSING_BANK",
		name: "Reimbursing bank",
		code: "CPB",
		description:
			"Identifies the financial institution through which the reimbursement is to be effected.",
	},
	{
		key: "ADVISE_THROUGH_BANK",
		name: "Advise through bank",
		code: "CPC",
		description:
			"Identifies the financial institution through which the advising bank is to advise.",
	},
	{
		key: "CHARGES_PAYER_AT_DESTINATION",
		name: "Charges payer at destination",
		code: "CPD",
		description:
			"Party, other than the ordering party, which has to pay the charges concerning the destination operations.",
	},
	{
		key: "VESSEL_MASTER",
		name: "Vessel master",
		code: "CPE",
		description: "Master of the conveyance.",
	},
	{
		key: "MEANS_OF_TRANSPORT_CHARTERER",
		name: "Means of transport charterer",
		code: "CPF",
		description: "Charterer of the means of transport.",
	},
	{
		key: "EXCISE_PARTY",
		name: "Excise party",
		code: "CPG",
		description: "Party to whom excise must be paid.",
	},
	{
		key: "CHEQUE_ORDER",
		name: "Cheque order",
		code: "CQ",
		description:
			"Party to which the cheque will be ordered, when different from the beneficiary.",
	},
	{
		key: "EMPTY_EQUIPMENT_RETURN_PARTY",
		name: "Empty equipment return party",
		code: "CR",
		description:
			"Party to whose premises empty equipment will be or has been returned.",
	},
	{
		key: "CONSOLIDATOR",
		name: "Consolidator",
		code: "CS",
		description: "Party consolidating various consignments, payments etc.",
	},
	{
		key: "CONSIGNEE_TO_BE_SPECIFIED",
		name: "Consignee to be specified",
		code: "CT",
		description: "The party to be identified at a later time as the consignee.",
	},
	{
		key: "CONTAINER_RETURN_COMPANY",
		name: "Container return company",
		code: "CU",
		description: "The company to which containers have to be returned.",
	},
	{
		key: "CONSIGNEE_OF_VESSEL",
		name: "Consignee of vessel",
		code: "CV",
		description: "Description to be provided.",
	},
	{
		key: "EQUIPMENT_OWNER",
		name: "Equipment owner",
		code: "CW",
		description: "Owner of equipment (container, etc.).",
	},
	{
		key: "CONSIGNEES_AGENT",
		name: "Consignee's agent",
		code: "CX",
		description: "Party authorized to act on behalf of the consignee.",
	},
	{
		key: "COMMISSIONABLE_AGENT",
		name: "Commissionable agent",
		code: "CY",
		description: "IATA cargo agent entitled to commission.",
	},
	{
		key: "CONSIGNOR",
		name: "Consignor",
		code: "CZ",
		description:
			"(3336) Party which, by contract with a carrier, consigns or sends goods with the carrier, or has them conveyed by him. Synonym: shipper, sender.",
	},
	{
		key: "AVAILABLE_WITH_BANK_DOCUMENTARY_CREDITS",
		name: "Available with bank (documentary credits)",
		code: "DA",
		description:
			"Financial institution with whom the documentary credit is available.",
	},
	{
		key: "DISTRIBUTOR_BRANCH",
		name: "Distributor branch",
		code: "DB",
		description: "The affiliate of a retailer or distributor.",
	},
	{
		key: "DECONSOLIDATOR",
		name: "Deconsolidator",
		code: "DC",
		description:
			"Party that splits up a large consignment composed of separate consignments of goods. The smaller consignments of goods were grouped together into that large consignment for carriage as a larger unit in order to obtain a reduced rate.",
	},
	{
		key: "DESPATCH_CHARGE_PAYER",
		name: "Despatch charge payer",
		code: "DCP",
		description:
			"Party, other than the ordering party, which has to pay the charges concerning the despatch operations.",
	},
	{
		key: "DOCUMENTARY_CREDIT_ACCOUNT_PARTYS_BANK",
		name: "Documentary credit account party's bank",
		code: "DD",
		description: "Bank of the documentary credit account party.",
	},
	{
		key: "DEPOSITOR",
		name: "Depositor",
		code: "DE",
		description: "Party depositing goods, financial payments or documents.",
	},
	{
		key: "DOCUMENTARY_CREDIT_APPLICANT",
		name: "Documentary credit applicant",
		code: "DF",
		description:
			"Party at whose request the applicant's bank/issuing bank is to issue a documentary credit.",
	},
	{
		key: "DOCUMENTARY_CREDIT_BENEFICIARY",
		name: "Documentary credit beneficiary",
		code: "DG",
		description:
			"Party in whose favour the documentary credit is to be issued and the party that must comply with the credit's terms and conditions.",
	},
	{
		key: "DOCUMENTARY_CREDIT_ACCOUNT_PARTY",
		name: "Documentary credit account party",
		code: "DH",
		description:
			"Party which is responsible for the payment settlement of the documentary credit with the applicant's bank/issuing bank, if different from the documentary credit applicant.",
	},
	{
		key: "DOCUMENTARY_CREDIT_SECOND_BENEFICIARY",
		name: "Documentary credit second beneficiary",
		code: "DI",
		description: "Party to whom the documentary credit can be transferred.",
	},
	{
		key: "PARTY_ACCORDING_TO_DOCUMENTARY_CREDIT_TRANSACTION",
		name: "Party according to documentary credit transaction",
		code: "DJ",
		description: "Party related to documentary credit transaction.",
	},
	{
		key: "DOCUMENTARY_CREDIT_BENEFICIARYS_BANK",
		name: "Documentary credit beneficiary's bank",
		code: "DK",
		description:
			"Financial institution with which the beneficiary of the documentary credit maintains an account.",
	},
	{
		key: "FACTOR",
		name: "Factor",
		code: "DL",
		description:
			"Company offering a financial service whereby a firm sells or transfers title to its accounts receivable to the factoring company.",
	},
	{
		key: "PARTY_TO_WHOM_DOCUMENTS_ARE_TO_BE_PRESENTED",
		name: "Party to whom documents are to be presented",
		code: "DM",
		description: "Self explanatory.",
	},
	{
		key: "OWNER_OF_OPERATION",
		name: "Owner of operation",
		code: "DN",
		description: "Owner of the operation.",
	},
	{
		key: "DOCUMENT_RECIPIENT",
		name: "Document recipient",
		code: "DO",
		description: "(1370) Party which should receive a specified document.",
	},
	{
		key: "DELIVERY_PARTY",
		name: "Delivery party",
		code: "DP",
		description:
			"(3144) Party to which goods should be delivered, if not identical with consignee.",
	},
	{
		key: "OWNERS_AGENT",
		name: "Owner's agent",
		code: "DQ",
		description: "Person acting on delegation of powers of the owner.",
	},
	{
		key: "DRIVER",
		name: "Driver",
		code: "DR",
		description: "Person who drives a means of transport.",
	},
	{
		key: "DISTRIBUTOR",
		name: "Distributor",
		code: "DS",
		description: "Party distributing goods, financial payments or documents.",
	},
	{
		key: "DECLARANT",
		name: "Declarant",
		code: "DT",
		description:
			"(3140) Party who makes a declaration to an official body or - where legally permitted - in whose name, or on whose behalf, a declaration to an official body is made.",
	},
	{
		key: "OWNERS_REPRESENTATIVE",
		name: "Owner's representative",
		code: "DU",
		description:
			"Person commissioned by the owner to represent him in certain circumstances.",
	},
	{
		key: "PROJECT_MANAGEMENT_OFFICE",
		name: "Project management office",
		code: "DV",
		description:
			"Party commissioned by the owner to follow through the execution of all works.",
	},
	{
		key: "DRAWEE",
		name: "Drawee",
		code: "DW",
		description: "Party on whom drafts must be drawn.",
	},
	{
		key: "ENGINEER_CONSTRUCTION",
		name: "Engineer (construction)",
		code: "DX",
		description:
			"Party representing the contractor to advise and supervise engineering aspects of the works.",
	},
	{
		key: "ENGINEER_RESIDENT_CONSTRUCTION",
		name: "Engineer, resident (construction)",
		code: "DY",
		description:
			"Party commissioned by the owner to advise and supervise engineering aspects of the works.",
	},
	{
		key: "ARCHITECT",
		name: "Architect",
		code: "DZ",
		description: "Self explanatory.",
	},
	{
		key: "ARCHITECT_DESIGNER",
		name: "Architect-designer",
		code: "EA",
		description: "Designer of the construction project.",
	},
	{
		key: "BUILDING_INSPECTORATE",
		name: "Building inspectorate",
		code: "EB",
		description:
			"Party controlling the conformity of works to legal and regulation rules.",
	},
	{
		key: "EXCHANGER",
		name: "Exchanger",
		code: "EC",
		description: "Party exchanging currencies or goods.",
	},
	{
		key: "ENGINEER_CONSULTANT",
		name: "Engineer, consultant",
		code: "ED",
		description: "Party providing professional engineering services.",
	},
	{
		key: "LOCATION_OF_GOODS_FOR_CUSTOMS_EXAMINATION_BEFORE_CLEARANCE",
		name: "Location of goods for customs examination before clearance",
		code: "EE",
		description: "SE.",
	},
	{
		key: "PROJECT_COORDINATION_OFFICE",
		name: "Project coordination office",
		code: "EF",
		description: "Party responsible for technical coordination of works.",
	},
	{
		key: "SURVEYOR_TOPOGRAPHICAL",
		name: "Surveyor, topographical",
		code: "EG",
		description: "Party responsible for topographical measurements.",
	},
	{
		key: "ENGINEER_MEASUREMENT",
		name: "Engineer, measurement",
		code: "EH",
		description: "Party responsible for quantity measurements.",
	},
	{
		key: "CONTROLLER_QUALITY",
		name: "Controller, quality",
		code: "EI",
		description:
			"Party controlling the quality of goods and workmanship for the project.",
	},
	{
		key: "SURVEYOR_QUANTITY",
		name: "Surveyor, quantity",
		code: "EJ",
		description:
			"Party responsible for the quantification and valuation of the works on behalf of the contractor.",
	},
	{
		key: "SURVEYOR_PROFESSIONAL_QUANTITY",
		name: "Surveyor (professional), quantity",
		code: "EK",
		description:
			"Party responsible to the owner for the quantification and valuation of the works.",
	},
	{
		key: "PROJECT",
		name: "Project",
		code: "EL",
		description:
			"Party responsible for a project, e.g. a construction project.",
	},
	{
		key: "PARTY_TO_RECEIVE_ELECTRONIC_MEMO_OF_INVOICE",
		name: "Party to receive electronic memo of invoice",
		code: "EM",
		description: "Party being informed about invoice issue (via EDI).",
	},
	{
		key: "TENDERER",
		name: "Tenderer",
		code: "EN",
		description: "Firm answering an invitation to tender.",
	},
	{
		key: "OWNER_OF_EQUIPMENT",
		name: "Owner of equipment",
		code: "EO",
		description: "Party who owns equipment.",
	},
	{
		key: "EQUIPMENT_DROP_OFF_PARTY",
		name: "Equipment drop-off party",
		code: "EP",
		description: "The party which drops off equipment.",
	},
	{
		key: "EMPTY_CONTAINER_RESPONSIBLE_PARTY",
		name: "Empty container responsible party",
		code: "EQ",
		description: "Party responsible for the empty container.",
	},
	{
		key: "EMPTY_CONTAINER_RETURN_AGENT",
		name: "Empty container return agent",
		code: "ER",
		description:
			"Party, designated by owner of containers, responsible for their collection as agreed between the owner and customer/ consignee.",
	},
	{
		key: "CONTRACTOR_LEAD",
		name: "Contractor, lead",
		code: "ES",
		description: "Leader representing a grouping of co-contractors.",
	},
	{
		key: "CO_CONTRACTOR",
		name: "Co-contractor",
		code: "ET",
		description: "Member of a grouping of co-contractors.",
	},
	{
		key: "CONTRACTOR_GENERAL",
		name: "Contractor, general",
		code: "EU",
		description:
			"Single contractor for the whole construction project, working by his own or with subcontractors.",
	},
	{
		key: "SUBCONTRACTOR",
		name: "Subcontractor",
		code: "EV",
		description: "Firm carrying out a part of the works for a contractor.",
	},
	{
		key: "SUBCONTRACTOR_WITH_DIRECT_PAYMENT",
		name: "Subcontractor with direct payment",
		code: "EW",
		description: "Subcontractor benefiting from direct payments.",
	},
	{
		key: "EXPORTER",
		name: "Exporter",
		code: "EX",
		description:
			"(3030) Party who makes - or on whose behalf a Customs clearing agent or other authorized person makes - an export declaration. This may include a manufacturer, seller or other person. Within a Customs union, consignor may have the same meaning as exporter.",
	},
	{
		key: "SUBCONTRACTOR_NOMINATED",
		name: "Subcontractor, nominated",
		code: "EY",
		description:
			"Subcontractor authorized by the owner after having been proposed.",
	},
	{
		key: "OPERATOR_ESSENTIAL_SERVICES",
		name: "Operator, essential services",
		code: "EZ",
		description:
			"Operator of essential services e.g. water, sewerage system, power.",
	},
	{
		key: "OPERATOR_COMMUNICATION_CHANNEL",
		name: "Operator, communication channel",
		code: "FA",
		description: "Operator of a communication channel.",
	},
	{
		key: "NOMINATED_FREIGHT_COMPANY",
		name: "Nominated freight company",
		code: "FB",
		description:
			"Party nominated to act as transport company or carrier for the goods.",
	},
	{
		key: "CONTRACTOR_MAIN",
		name: "Contractor, main",
		code: "FC",
		description:
			"Firm or grouping of co-contractors which has been awarded the contract.",
	},
	{
		key: "BUYERS_PARENT_COMPANY",
		name: "Buyer's parent company",
		code: "FD",
		description: "Parent company, e.g. holding company.",
	},
	{
		key: "CREDIT_RATING_AGENCY",
		name: "Credit rating agency",
		code: "FE",
		description: "Self explanatory.",
	},
	{
		key: "FACTOR_CORRESPONDENT",
		name: "Factor, correspondent",
		code: "FF",
		description:
			"Factoring company engaged by another factoring company to assist the letter with the services provided to the clients (sellers).",
	},
	{
		key: "BUYER_AS_OFFICIALLY_REGISTERED",
		name: "Buyer as officially registered",
		code: "FG",
		description: "Buying party as officially registered with government.",
	},
	{
		key: "SELLER_AS_OFFICIALLY_REGISTERED",
		name: "Seller as officially registered",
		code: "FH",
		description: "Selling party as officially registered with government.",
	},
	{
		key: "COPY_MESSAGE_TO",
		name: "Copy message to",
		code: "FI",
		description: "Party that is to receive a copy of a message.",
	},
	{
		key: "TRADE_UNION",
		name: "Trade Union",
		code: "FJ",
		description: "Organisation representing employees.",
	},
	{
		key: "PREVIOUS_TRADE_UNION",
		name: "Previous Trade Union",
		code: "FK",
		description:
			"Employee organisation who previously represented an employee .",
	},
	{
		key: "PASSENGER",
		name: "Passenger",
		code: "FL",
		description:
			"A person conveyed by a means of transport, other than the crew.",
	},
	{
		key: "CREW_MEMBER",
		name: "Crew member",
		code: "FM",
		description: "A person manning a means of transport.",
	},
	{
		key: "TARIFF_ISSUER",
		name: "Tariff issuer",
		code: "FN",
		description: "The issuer of a tariff, e.g. a freight tariff.",
	},
	{
		key: "PARTY_PERFORMING_INSPECTION",
		name: "Party performing inspection",
		code: "FO",
		description: "Self explanatory.",
	},
	{
		key: "FREIGHTCHARGES_PAYER",
		name: "Freight/charges payer",
		code: "FP",
		description: "Party responsible for the payment of freight.",
	},
	{
		key: "CONTAINER_SURVEY_AGENT",
		name: "Container survey agent",
		code: "FQ",
		description: "The container survey agency that will survey the containers.",
	},
	{
		key: "MESSAGE_FROM",
		name: "Message from",
		code: "FR",
		description: "Party where the message comes from.",
	},
	{
		key: "PARTY_AUTHORIZED_TO_MAKE_DEFINITE_A_CONTRACT_ACTION",
		name: "Party authorized to make definite a contract action",
		code: "FS",
		description:
			"Party who has the authority to make definite a contract action.",
	},
	{
		key: "PARTY_RESPONSIBLE_FOR_FINANCIAL_SETTLEMENT",
		name: "Party responsible for financial settlement",
		code: "FT",
		description:
			"(3450) Party responsible for either the transfer or repatriation of the funds relating to a transaction.",
	},
	{
		key: "HAZARDOUS_MATERIAL_OFFICE",
		name: "Hazardous material office",
		code: "FU",
		description:
			"The office responsible for providing information regarding hazardous material.",
	},
	{
		key: "PARTY_PROVIDING_GOVERNMENT_FURNISHED_PROPERTY",
		name: "Party providing government furnished property",
		code: "FV",
		description:
			"The party responsible for providing government furnished property.",
	},
	{
		key: "FREIGHT_FORWARDER",
		name: "Freight forwarder",
		code: "FW",
		description: "Party arranging forwarding of goods.",
	},
	{
		key: "CURRENT_RECEIVER",
		name: "Current receiver",
		code: "FX",
		description:
			"Current receiver of the goods in a multi-step transportation process (indirect flow) involving at least one grouping centre.",
	},
	{
		key: "CURRENT_SENDER",
		name: "Current sender",
		code: "FY",
		description:
			"Current sender of the goods in a multi-step transportation process (indirect flow) involving at least one grouping centre.",
	},
	{
		key: "GROUPING_CENTRE",
		name: "Grouping centre",
		code: "FZ",
		description:
			"A party in charge of groupage, including degroupage and regroupage.",
	},
	{
		key: "ROAD_CARRIER",
		name: "Road carrier",
		code: "GA",
		description: "A road carrier moving cargo.",
	},
	{
		key: "CHAMBER_OF_COMMERCE",
		name: "Chamber of commerce",
		code: "GB",
		description:
			"Name of the Chamber of Commerce of the town where the company is registered.",
	},
	{
		key: "GOODS_CUSTODIAN",
		name: "Goods custodian",
		code: "GC",
		description: "(3024) Party responsible for the keeping of goods.",
	},
	{
		key: "PRODUCER",
		name: "Producer",
		code: "GD",
		description: "Party or person who has produced the produce.",
	},
	{
		key: "REGISTRATION_TRIBUNAL",
		name: "Registration tribunal",
		code: "GE",
		description: "Name of the tribunal where the company is registered.",
	},
	{
		key: "SLOT_CHARTER_PARTY",
		name: "Slot charter party",
		code: "GF",
		description:
			"An identification code of a participant or user that books slots (space) on a ship, more likely on a long term basis on a series of sailings. He pays for the space whether he uses it or not.",
	},
	{
		key: "WAREHOUSE",
		name: "Warehouse",
		code: "GG",
		description: "The name of the warehouse where product is held.",
	},
	{
		key: "APPLICANT_FOR_JOB",
		name: "Applicant for job",
		code: "GH",
		description: "A person who applied for a job.",
	},
	{
		key: "SPOUSE",
		name: "Spouse",
		code: "GI",
		description: "Person is a spouse.",
	},
	{
		key: "MOTHER",
		name: "Mother",
		code: "GJ",
		description: "Person is a mother.",
	},
	{
		key: "FATHER",
		name: "Father",
		code: "GK",
		description: "Person is a father.",
	},
	{
		key: "SOCIALLY_INSURED_PERSON",
		name: "Socially insured person",
		code: "GL",
		description: "A person who is registered in a social security scheme.",
	},
	{
		key: "INVENTORY_CONTROLLER",
		name: "Inventory controller",
		code: "GM",
		description:
			"To specifically identify the party in charge of inventory control.",
	},
	{
		key: "PROCESSOR",
		name: "Processor",
		code: "GN",
		description: "Party or person who has or will apply a process.",
	},
	{
		key: "GOODS_OWNER",
		name: "Goods owner",
		code: "GO",
		description: "The party which owns the goods.",
	},
	{
		key: "PACKER",
		name: "Packer",
		code: "GP",
		description:
			"Party or person who has undertaken or will undertake packing.",
	},
	{
		key: "SLAUGHTERER",
		name: "Slaughterer",
		code: "GQ",
		description:
			"Party or person who has undertaken or will undertake a slaughter.",
	},
	{
		key: "GOODS_RELEASER",
		name: "Goods releaser",
		code: "GR",
		description:
			"(3026) Party entitled to authorize release of goods from custodian.",
	},
	{
		key: "CONSIGNORS_REPRESENTATIVE",
		name: "Consignor's representative",
		code: "GS",
		description: "Party authorised to represent the consignor.",
	},
	{
		key: "RAIL_CARRIER",
		name: "Rail carrier",
		code: "GT",
		description: "A carrier moving cargo, including containers, via rail.",
	},
	{
		key: "ORIGINATOR_OF_ARTICLE_NUMBER",
		name: "Originator of article number",
		code: "GU",
		description:
			"A code identifying the party which created a specific article number.",
	},
	{
		key: "PROCUREMENT_RESPONSIBILITY_FOR_ORDER",
		name: "Procurement responsibility for order",
		code: "GV",
		description:
			"A code used to identify the organization which is responsible for the procurement.",
	},
	{
		key: "PARTY_FULFILLING_ALL_OPERATIONS",
		name: "Party fulfilling all operations",
		code: "GW",
		description:
			"Code indicating the fact that the party identified carries out all operations within that company's activities.",
	},
	{
		key: "CENTRAL_CATALOGUE_PARTY",
		name: "Central catalogue party",
		code: "GX",
		description: "Party controlling a central catalogue.",
	},
	{
		key: "INVENTORY_REPORTING_PARTY",
		name: "Inventory reporting party",
		code: "GY",
		description: "Party reporting inventory information.",
	},
	{
		key: "SUBSTITUTE_SUPPLIER",
		name: "Substitute supplier",
		code: "GZ",
		description:
			"Party which may be in a position to supply products or services should the main usual supplier be unable to do so.",
	},
	{
		key: "PARTY_WHICH_DELIVERS_CONSIGNMENTS_TO_THE_TERMINAL",
		name: "Party which delivers consignments to the terminal",
		code: "HA",
		description: "Party which delivers consignments to a terminal.",
	},
	{
		key: "PARTY_WHICH_PICKS_UP_CONSIGNMENTS_FROM_THE_TERMINAL",
		name: "Party which picks up consignments from the terminal",
		code: "HB",
		description: "Party which picks up consignments from a terminal.",
	},
	{
		key: "TRANSIT_FREIGHT_FORWARDER",
		name: "Transit freight forwarder",
		code: "HC",
		description:
			"Freight forwarder to whom transit consignments are addressed, and from whom they are to be on-forwarded.",
	},
	{
		key: "INSPECTION_AND_ACCEPTANCE_PARTY",
		name: "Inspection and acceptance party",
		code: "HD",
		description: "The party who will perform inspection and acceptance.",
	},
	{
		key: "TRANSPORTATION_OFFICE",
		name: "Transportation office",
		code: "HE",
		description: "The office that provides transportation information.",
	},
	{
		key: "CONTRACT_ADMINISTRATION_OFFICE",
		name: "Contract administration office",
		code: "HF",
		description: "The office responsible for the administration of a contract.",
	},
	{
		key: "INVESTIGATOR",
		name: "Investigator",
		code: "HG",
		description: "A party who conducts investigations.",
	},
	{
		key: "AUDIT_OFFICE",
		name: "Audit office",
		code: "HH",
		description: "The office responsible for conducting audits.",
	},
	{
		key: "REQUESTOR",
		name: "Requestor",
		code: "HI",
		description: "The party requesting an action.",
	},
	{
		key: "FOREIGN_DISCLOSURE_INFORMATION_OFFICE",
		name: "Foreign disclosure information office",
		code: "HJ",
		description:
			"The office that reviews sensitive information for foreign disclosure.",
	},
	{
		key: "MARK_FOR_PARTY",
		name: "Mark-for party",
		code: "HK",
		description:
			"The party within an organization for whom the material is marked to be delivered.",
	},
	{
		key: "PARTY_TO_RECEIVE_REPORTS",
		name: "Party to receive reports",
		code: "HL",
		description: "The party to whom reports are to be submitted.",
	},
	{
		key: "ALTERNATIVE_MANUFACTURER",
		name: "Alternative manufacturer",
		code: "HM",
		description:
			"Party identification of an alternative manufacturer for a product.",
	},
	{
		key: "SERVICE_PERFORMER",
		name: "Service performer",
		code: "HN",
		description: "The party who is performing a service.",
	},
	{
		key: "SHIPPERS_ASSOCIATION",
		name: "Shipper's association",
		code: "HO",
		description: "An association of shippers.",
	},
	{
		key: "FINAL_MESSAGE_RECIPIENT",
		name: "Final message recipient",
		code: "HP",
		description: "To identify the final recipient of the message.",
	},
	{
		key: "ACCOUNT_OWNER",
		name: "Account owner",
		code: "HQ",
		description: "Identifies the owner of the account.",
	},
	{
		key: "SHIPPING_LINE_SERVICE",
		name: "Shipping line service",
		code: "HR",
		description: "Identifies the shipping line service organization.",
	},
	{
		key: "CREDITOR",
		name: "Creditor",
		code: "HS",
		description: "Party to whom payment is due.",
	},
	{
		key: "CLEARING_HOUSE",
		name: "Clearing house",
		code: "HT",
		description: "Institution through which funds will be paid.",
	},
	{
		key: "ORDERING_BANK",
		name: "Ordering bank",
		code: "HU",
		description:
			"Bank which instructed the sender to act on the transaction(s).",
	},
	{
		key: "RECEIVER_OF_FUNDS",
		name: "Receiver of funds",
		code: "HV",
		description: "Identifies the party that receives the funds.",
	},
	{
		key: "SENDER_OF_FUNDS",
		name: "Sender of funds",
		code: "HW",
		description: "Identifies the party that sends the funds.",
	},
	{
		key: "DEBTOR",
		name: "Debtor",
		code: "HX",
		description: "Party from whom payment is due.",
	},
	{
		key: "PRESENTING_BANK",
		name: "Presenting bank",
		code: "HY",
		description: "The bank which presents documents to the drawee.",
	},
	{
		key: "WORK_TEAM",
		name: "Work team",
		code: "HZ",
		description: "Team responsible for performing work.",
	},
	{
		key: "INTERMEDIARY_BANK_1",
		name: "Intermediary bank 1",
		code: "I1",
		description:
			"A financial institution between the ordered bank and the beneficiary's bank.",
	},
	{
		key: "INTERMEDIARY_BANK_2",
		name: "Intermediary bank 2",
		code: "I2",
		description:
			"A financial institution between the ordered bank and the beneficiary's bank.",
	},
	{
		key: "INTERMEDIARYBROKER",
		name: "Intermediary/broker",
		code: "IB",
		description: "Description to be provided.",
	},
	{
		key: "INTERMEDIATE_CONSIGNEE",
		name: "Intermediate consignee",
		code: "IC",
		description: "The intermediate consignee.",
	},
	{
		key: "REPLACING_MANUFACTURER",
		name: "Replacing manufacturer",
		code: "ID",
		description:
			"A code used to identify a party who replaces the previous party for the manufacture of an article.",
	},
	{
		key: "NON_RESIDENT_THIRD_PARTY_COMPANY_WITH_WHOM_FINANCIAL_ACCOUNT_IS_HELD",
		name: "Non-resident third party company with whom financial account is held",
		code: "IE",
		description:
			"Identifies the non-resident third party company with whom the financial account is held.",
	},
	{
		key: "NON_RESIDENT_GROUP_COMPANY_WITH_WHOM_FINANCIAL_ACCOUNT_IS_HELD",
		name: "Non-resident group company with whom financial account is held",
		code: "IF",
		description:
			"Identifies the non-resident group company with whom the financial account is held.",
	},
	{
		key: "NON_RESIDENT_BENEFICIARY",
		name: "Non-resident beneficiary",
		code: "IG",
		description:
			"The ultimate non-resident recipient of the funds. Normally the account owner who is reimbursed by the payor.",
	},
	{
		key: "RESIDENT_BENEFICIARY",
		name: "Resident beneficiary",
		code: "IH",
		description:
			"The ultimate resident recipient of the funds. Normally the account owner who is reimbursed by the payor.",
	},
	{
		key: "ISSUER_OF_INVOICE",
		name: "Issuer of invoice",
		code: "II",
		description: "(3028) Party issuing an invoice.",
	},
	{
		key: "NON_RESIDENT_INSTRUCTING_PARTY",
		name: "Non-resident instructing party",
		code: "IJ",
		description:
			"Identifies the non-resident party originating the instruction.",
	},
	{
		key: "RESIDENT_INSTRUCTING_PARTY",
		name: "Resident instructing party",
		code: "IL",
		description: "Identifies the resident party originating the instruction.",
	},
	{
		key: "IMPORTER",
		name: "Importer",
		code: "IM",
		description:
			"(3020) Party who makes - or on whose behalf a Customs clearing agent or other authorized person makes - an import declaration. This may include a person who has possession of the goods or to whom the goods are consigned.",
	},
	{
		key: "INSURER",
		name: "Insurer",
		code: "IN",
		description: "Description to be provided.",
	},
	{
		key: "INSURANCE_COMPANY",
		name: "Insurance company",
		code: "IO",
		description: "Description to be provided.",
	},
	{
		key: "INSURANCE_CLAIM_ADJUSTER",
		name: "Insurance claim adjuster",
		code: "IP",
		description: "Description to be provided.",
	},
	{
		key: "DOMESTIC_FINANCIAL_INSTITUTION",
		name: "Domestic financial institution",
		code: "IQ",
		description: "Domestic party acting as financial institution.",
	},
	{
		key: "NON_DOMESTIC_FINANCIAL_INSTITUTION",
		name: "Non-domestic financial institution",
		code: "IR",
		description: "Non-domestic party acting as financial institution.",
	},
	{
		key: "PARTY_TO_RECEIVE_CERTIFIED_INSPECTION_REPORT",
		name: "Party to receive certified inspection report",
		code: "IS",
		description: "Party (at buyer) to receive certified inspection report.",
	},
	{
		key: "INSTALLATION_ON_SITE",
		name: "Installation on site",
		code: "IT",
		description: "Description to be provided.",
	},
	{
		key: "NON_RESIDENT_DEBTOR",
		name: "Non-resident debtor",
		code: "IU",
		description:
			"Non-resident party who makes the payment or against whom a claim exists.",
	},
	{
		key: "INVOICEE",
		name: "Invoicee",
		code: "IV",
		description: "(3006) Party to whom an invoice is issued.",
	},
	{
		key: "NON_RESIDENT_CREDITOR",
		name: "Non-resident creditor",
		code: "IW",
		description:
			"Non-resident party receiving the payment or against whom a liability exists.",
	},
	{
		key: "SUPPLIER_WORK_TEAM",
		name: "Supplier work team",
		code: "IX",
		description: "The supplier's team responsible for performing the work.",
	},
	{
		key: "TENANT_MANAGER",
		name: "Tenant manager",
		code: "IY",
		description:
			"A code to identify the party who rents the rights to use the goodwill and facilities of an enterprise.",
	},
	{
		key: "PARTY_MANDATED_TO_LIQUIDATE_AN_ENTERPRISE",
		name: "Party mandated to liquidate an enterprise",
		code: "IZ",
		description:
			"A code to identify the party who has been legally mandated to sell off an enterprise.",
	},
	{
		key: "CERTIFIED_ACCOUNTANT",
		name: "Certified accountant",
		code: "JA",
		description: "Code identifying the party as a certified accountant.",
	},
	{
		key: "GOODS_COLLECTION_PARTY",
		name: "Goods collection party",
		code: "JB",
		description: "Party that will collect or has collected the goods.",
	},
	{
		key: "PARTY_AT_FINAL_PLACE_OF_POSITIONING",
		name: "Party at final place of positioning",
		code: "JC",
		description: "Identifies the party at the final place of positioning.",
	},
	{
		key: "CUSTOMS_OFFICE_OF_CLEARANCE",
		name: "Customs office of clearance",
		code: "JD",
		description:
			"Identifies the office where customs clearance procedures take place.",
	},
	{
		key: "PARTY_FROM_WHOM_CUSTOMS_DOCUMENTS_ARE_TO_BE_PICKED_UP",
		name: "Party from whom customs documents are to be picked up",
		code: "JE",
		description:
			"Identification of the party from whom customs documents are to be picked up.",
	},
	{
		key: "PARTY_FROM_WHOM_NON_CUSTOMS_DOCUMENTS_ARE_TO_BE_PICKED_UP",
		name: "Party from whom non-customs documents are to be picked up",
		code: "JF",
		description:
			"Identification of the party from whom non-customs documents are to be picked up.",
	},
	{
		key: "PARTY_TO_RECEIVE_CUSTOMS_DOCUMENTS",
		name: "Party to receive customs documents",
		code: "JG",
		description:
			"Identification of the party to whom customs documents are to be delivered.",
	},
	{
		key: "PARTY_TO_RECEIVE_NON_CUSTOMS_DOCUMENTS",
		name: "Party to receive non-customs documents",
		code: "JH",
		description:
			"Identification of the party to whom non-customs documents are to be delivered.",
	},
	{
		key: "PARTY_DESIGNATED_TO_PROVIDE_LIVING_ANIMAL_CARE",
		name: "Party designated to provide living animal care",
		code: "LA",
		description:
			"Party responsible to take care of transported living animals.",
	},
	{
		key: "CO_PRODUCER",
		name: "Co-producer",
		code: "LB",
		description:
			"A code used to identify a party who participates in production.",
	},
	{
		key: "PARTY_DECLARING_THE_VALUE_ADDED_TAX_VAT",
		name: "Party declaring the Value Added Tax (VAT)",
		code: "LC",
		description:
			"A code to identify the party who is responsible for declaring the Value Added Tax (VAT) on the sale of goods or services.",
	},
	{
		key: "PARTY_RECOVERING_THE_VALUE_ADDED_TAX_VAT",
		name: "Party recovering the Value Added Tax (VAT)",
		code: "LD",
		description:
			"A code to identify the party who is eligible to recover the Value Added Tax (VAT) on the sale of goods or services.",
	},
	{
		key: "PERSON_ON_CLAIM",
		name: "Person on claim",
		code: "LE",
		description: "To identify the person who is the subject of the claim.",
	},
	{
		key: "BUYERS_CORPORATE_OFFICE",
		name: "Buyer's corporate office",
		code: "LF",
		description: "The identification of the buyer's corporate office.",
	},
	{
		key: "SUPPLIERS_CORPORATE_OFFICE",
		name: "Supplier's corporate office",
		code: "LG",
		description: "The identification of the supplier's corporate office.",
	},
	{
		key: "LIQUIDATOR",
		name: "Liquidator",
		code: "LH",
		description: "The party responsible for settling or paying a debt.",
	},
	{
		key: "ACCOUNT_COORDINATOR",
		name: "Account coordinator",
		code: "LI",
		description:
			"An individual with coordination responsibilities for a specific account.",
	},
	{
		key: "INSPECTION_LEADER",
		name: "Inspection leader",
		code: "LJ",
		description: "An individual responsible for an inspection team.",
	},
	{
		key: "PATIENT",
		name: "Patient",
		code: "LK",
		description:
			"A person receiving or registered to receive medical treatment.",
	},
	{
		key: "PATIENT_COMPANION",
		name: "Patient companion",
		code: "LL",
		description: "Person accompanying the patient.",
	},
	{
		key: "MEDICAL_TREATMENT_EXECUTANT",
		name: "Medical treatment executant",
		code: "LM",
		description: "The party who executes a medical treatment.",
	},
	{
		key: "LENDER",
		name: "Lender",
		code: "LN",
		description: "Party lending goods or equipment.",
	},
	{
		key: "MEDICAL_TREATMENT_PRESCRIBER",
		name: "Medical treatment prescriber",
		code: "LO",
		description: "The party who prescribes a medical treatment.",
	},
	{
		key: "LOADING_PARTY",
		name: "Loading party",
		code: "LP",
		description: "Party responsible for the loading when other than carrier.",
	},
	{
		key: "DEBT_PAYMENT_AUTHORISATION_PARTY",
		name: "Debt payment authorisation party",
		code: "LQ",
		description: "A party which authorises the payment of a debt.",
	},
	{
		key: "ADMINISTRATION_CENTRE",
		name: "Administration centre",
		code: "LR",
		description: "Identification of an administration centre.",
	},
	{
		key: "PRODUCT_SERVICES_AND_REPAIRS_CENTRE",
		name: "Product services and repairs centre",
		code: "LS",
		description: "A centre which services and repairs products.",
	},
	{
		key: "SECRETARIAT",
		name: "Secretariat",
		code: "LT",
		description: "Party is a secretariat.",
	},
	{
		key: "ENTRY_POINT_TECHNICAL_ASSESSMENT_GROUP",
		name: "Entry point technical assessment group",
		code: "LU",
		description: "Party acts as an entry point for technical assessment.",
	},
	{
		key: "PARTY_ASSIGNING_A_STATUS",
		name: "Party assigning a status",
		code: "LV",
		description: "Party responsible for assigning a status.",
	},
	{
		key: "PARTY_FOR_WHOM_ITEM_IS_ULTIMATELY_INTENDED",
		name: "Party for whom item is ultimately intended",
		code: "MA",
		description: "Self explanatory.",
	},
	{
		key: "MANUFACTURER_OF_GOODS",
		name: "Manufacturer of goods",
		code: "MF",
		description: "Party who manufactures the goods.",
	},
	{
		key: "PARTY_DESIGNATED_TO_EXECUTE_RE_ICING",
		name: "Party designated to execute re-icing",
		code: "MG",
		description:
			"Party designated to execute re-icing, selected in the official list of mandatories competent for this kind of operation.",
	},
	{
		key: "PLANNING_SCHEDULEMATERIAL_RELEASE_ISSUER",
		name: "Planning schedule/material release issuer",
		code: "MI",
		description: "Self explanatory.",
	},
	{
		key: "MANUFACTURING_PLANT",
		name: "Manufacturing plant",
		code: "MP",
		description: "Self explanatory.",
	},
	{
		key: "MESSAGE_RECIPIENT",
		name: "Message recipient",
		code: "MR",
		description: "Self explanatory.",
	},
	{
		key: "DOCUMENTMESSAGE_ISSUERSENDER",
		name: "Document/message issuer/sender",
		code: "MS",
		description: "Issuer of a document and/or sender of a message.",
	},
	{
		key: "PARTY_DESIGNATED_TO_EXECUTE_SANITARY_PROCEDURES",
		name: "Party designated to execute sanitary procedures",
		code: "MT",
		description: "Self explanatory.",
	},
	{
		key: "NOTIFY_PARTY_NO_1",
		name: "Notify party no. 1",
		code: "N1",
		description: "The first party which is to be notified.",
	},
	{
		key: "NOTIFY_PARTY_NO_2",
		name: "Notify party no. 2",
		code: "N2",
		description: "The second party which is to be notified.",
	},
	{
		key: "NOTIFY_PARTY",
		name: "Notify party",
		code: "NI",
		description: "(3180) Party to be notified of arrival of goods.",
	},
	{
		key: "BREAK_BULK_BERTH_OPERATOR",
		name: "Break bulk berth operator",
		code: "OA",
		description:
			"Party who offers facilities for berthing of vessels, handling and storage of break bulk cargo.",
	},
	{
		key: "ORDERED_BY",
		name: "Ordered by",
		code: "OB",
		description: "Party who issued an order.",
	},
	{
		key: "PARTY_DATA_RESPONSIBLE_PARTY",
		name: "Party data responsible party",
		code: "OC",
		description: "The party responsible for all party data.",
	},
	{
		key: "EQUIPMENT_REPAIR_PARTY",
		name: "Equipment repair party",
		code: "OD",
		description: "A party making repairs to equipment.",
	},
	{
		key: "OWNER_OF_PROPERTY",
		name: "Owner of property",
		code: "OE",
		description: "Party owning a property.",
	},
	{
		key: "ON_BEHALF_OF",
		name: "On behalf of",
		code: "OF",
		description: "Party on behalf of which an action is executed.",
	},
	{
		key: "OWNER_OR_LESSORS_SURVEYOR",
		name: "Owner or lessor's surveyor",
		code: "OG",
		description: "Surveyor hired by the owner or lessor of the item.",
	},
	{
		key: "LESSEES_SURVEYOR",
		name: "Lessee's surveyor",
		code: "OH",
		description: "Surveyor hired by the lessee of the item.",
	},
	{
		key: "OUTSIDE_INSPECTION_AGENCY",
		name: "Outside inspection agency",
		code: "OI",
		description: "Third party inspecting goods or equipment.",
	},
	{
		key: "THIRD_PARTY",
		name: "Third party",
		code: "OJ",
		description: "Another party besides the two principals.",
	},
	{
		key: "RECEIVERS_SUB_ENTITY",
		name: "Receiver's sub-entity",
		code: "OK",
		description: "Identifies a sub-entity within the receiver's organization.",
	},
	{
		key: "CASE_OF_NEED_PARTY",
		name: "Case of need party",
		code: "OL",
		description: "Party to be approached in case of difficulty.",
	},
	{
		key: "COLLECTING_BANK",
		name: "Collecting bank",
		code: "OM",
		description:
			"Any bank, other than the remitting bank, involved in processing the collection.",
	},
	{
		key: "REMITTING_BANK",
		name: "Remitting bank",
		code: "ON",
		description:
			"The bank to which the principal has entrusted the handling of a collection.",
	},
	{
		key: "ORDER_OF_THE_SHIPPER_PARTY",
		name: "Order of the shipper party",
		code: "OO",
		description:
			"The owner of goods under consignment which are moving under a negotiable transport document and will only be released upon receipt of the original transport document.",
	},
	{
		key: "OPERATOR_OF_PROPERTY_OR_EQUIPMENT",
		name: "Operator of property or equipment",
		code: "OP",
		description: "The party which operates property or a unit of equipment.",
	},
	{
		key: "COLLECTION_PRINCIPAL",
		name: "Collection principal",
		code: "OQ",
		description: "The party entrusting the handling of a collection to a bank.",
	},
	{
		key: "ORDERED_BANK",
		name: "Ordered bank",
		code: "OR",
		description:
			"Identifies the account servicer for the ordering customer or payor.",
	},
	{
		key: "ORIGINAL_SHIPPER",
		name: "Original shipper",
		code: "OS",
		description: "The original supplier of the goods.",
	},
	{
		key: "OUTSIDE_TEST_AGENCY",
		name: "Outside test agency",
		code: "OT",
		description: "Third party testing goods, equipment or services.",
	},
	{
		key: "ACCOUNT_OWNERS_SERVICING_BANK_ON_THE_SENDING_SIDE",
		name: "Account owner's servicing bank on the sending side",
		code: "OU",
		description:
			"Identifies the financial institution on the sending side which services the account owner's bank account(s).",
	},
	{
		key: "OWNER_OF_MEANS_OF_TRANSPORT",
		name: "Owner of means of transport",
		code: "OV",
		description:
			"(3126) Party owning the means of transport. No synonym of carrier = CA.",
	},
	{
		key: "ACCOUNT_OWNERS_SERVICING_BANK_ON_THE_RECEIVING_SIDE",
		name: "Account owner's servicing bank on the receiving side",
		code: "OW",
		description:
			"Identifies the financial institution on the receiving side which services the account owner's bank account(s).",
	},
	{
		key: "SENDERS_CORRESPONDENT_BANK",
		name: "Sender's correspondent bank",
		code: "OX",
		description:
			"The account, or branch of the sender, or another financial institution, through which the sender will reimburse the receiver.",
	},
	{
		key: "ORDERING_CUSTOMER",
		name: "Ordering customer",
		code: "OY",
		description: "Identifies the originator of the instruction.",
	},
	{
		key: "RECEIVERS_CORRESPONDENT_BANK",
		name: "Receiver's correspondent bank",
		code: "OZ",
		description:
			"The branch of the receiver, or another financial institution, at which the funds will be made available to the receiver.",
	},
	{
		key: "CONTACT_PARTY_1",
		name: "Contact party 1",
		code: "P1",
		description: "First party to contact.",
	},
	{
		key: "CONTACT_PARTY_2",
		name: "Contact party 2",
		code: "P2",
		description: "Second party to contact.",
	},
	{
		key: "CONTACT_PARTY_3",
		name: "Contact party 3",
		code: "P3",
		description: "Third party to contact.",
	},
	{
		key: "CONTACT_PARTY_4",
		name: "Contact party 4",
		code: "P4",
		description: "Fourth party to contact.",
	},
	{
		key: "PARTY_TO_RECEIVE_INSPECTION_REPORT",
		name: "Party to receive inspection report",
		code: "PA",
		description: "Party to whom the inspection report should be sent.",
	},
	{
		key: "PAYING_FINANCIAL_INSTITUTION",
		name: "Paying financial institution",
		code: "PB",
		description: "Financial institution designated to make payment.",
	},
	{
		key: "ACTUAL_PURCHASERS_CUSTOMER",
		name: "Actual purchaser's customer",
		code: "PC",
		description:
			"Party the purchaser within the actual message is selling the ordered goods or services to.",
	},
	{
		key: "PURCHASERS_DEPARTMENT_BUYER",
		name: "Purchaser's department buyer",
		code: "PD",
		description: "Purchasing department of buyer.",
	},
	{
		key: "PAYEE",
		name: "Payee",
		code: "PE",
		description: "Identifies the credit party when other than the beneficiary.",
	},
	{
		key: "PARTY_TO_RECEIVE_FREIGHT_BILL",
		name: "Party to receive freight bill",
		code: "PF",
		description: "Party to whom the freight bill should be sent.",
	},
	{
		key: "PRIME_CONTRACTOR",
		name: "Prime contractor",
		code: "PG",
		description:
			"Party responsible for the whole project if other than the buyer.",
	},
	{
		key: "PAYERS_FINANCIAL_INSTITUTION",
		name: "Payer's financial institution",
		code: "PH",
		description: "Self explanatory.",
	},
	{
		key: "PAYEES_COMPANY_NAMEID",
		name: "Payee's company name/ID",
		code: "PI",
		description: "Receiving company name/ID (ACH transfers).",
	},
	{
		key: "PARTY_TO_RECEIVE_CORRESPONDENCE",
		name: "Party to receive correspondence",
		code: "PJ",
		description:
			"Second party designated by a first party to receive certain correspondence in lieu of it being mailed directly to this first party.",
	},
	{
		key: "CONTACT_PARTY",
		name: "Contact party",
		code: "PK",
		description: "Party to contact.",
	},
	{
		key: "PAYOR",
		name: "Payor",
		code: "PL",
		description:
			"Identifies the debit party when other than the ordering customer (for banking purposes).",
	},
	{
		key: "PARTY_TO_RECEIVE_PAPER_MEMO_OF_INVOICE",
		name: "Party to receive paper memo of invoice",
		code: "PM",
		description: "Party being informed about invoice issue (via paper).",
	},
	{
		key: "PARTY_TO_RECEIVE_SHIPPING_NOTICE",
		name: "Party to receive shipping notice",
		code: "PN",
		description: "The party is to be the recipient of the shipping notice.",
	},
	{
		key: "ORDERING_PARTY",
		name: "Ordering party",
		code: "PO",
		description:
			"To be used only if ordering party and buyer are not identical.",
	},
	{
		key: "CERTIFYING_PARTY",
		name: "Certifying party",
		code: "PQ",
		description: "Self explanatory.",
	},
	{
		key: "PAYER",
		name: "Payer",
		code: "PR",
		description: "(3308) Party initiating payment.",
	},
	{
		key: "PAYERS_COMPANY_NAMEID_CHECK_DRAFT_OR_WIRE",
		name: "Payer's company name/ID (Check, Draft or Wire)",
		code: "PS",
		description: "Self explanatory.",
	},
	{
		key: "PARTY_TO_RECEIVE_TEST_REPORT",
		name: "Party to receive test report",
		code: "PT",
		description: "Self explanatory.",
	},
	{
		key: "DESPATCH_PARTY",
		name: "Despatch party",
		code: "PW",
		description:
			"(3282) Party where goods are collected or taken over by the carrier (i.e. if other than consignor).",
	},
	{
		key: "PARTY_TO_RECEIVE_ALL_DOCUMENTS",
		name: "Party to receive all documents",
		code: "PX",
		description: "Self explanatory.",
	},
	{
		key: "CHECKING_PARTY",
		name: "Checking party",
		code: "PY",
		description:
			"Party or contact designated on behalf of carrier or his agent to establish the actual figures for quantities, weight, volume and/or (cube) measurements of goods or containers which are to appear in the transport contract and on which charges will be based.",
	},
	{
		key: "PARTY_TO_PRINT_SOME_DOCUMENT",
		name: "Party to print some document",
		code: "PZ",
		description: "The party that is to print a specific document.",
	},
	{
		key: "CENTRAL_BANK_OR_REGULATORY_AUTHORITY",
		name: "Central bank or regulatory authority",
		code: "RA",
		description:
			"Identifies central bank or regulatory authority which must be informed of certain aspects of a message.",
	},
	{
		key: "RECEIVING_FINANCIAL_INSTITUTION",
		name: "Receiving financial institution",
		code: "RB",
		description: "Financial institution designated to receive payment.",
	},
	{
		key: "PARTY_TO_RECEIVE_COMMERCIAL_INVOICE_REMITTANCE",
		name: "Party to receive commercial invoice remittance",
		code: "RE",
		description:
			"Party to whom payment for a commercial invoice or bill should be remitted.",
	},
	{
		key: "RECEIVED_FROM",
		name: "Received from",
		code: "RF",
		description:
			"Name of a person or department which actually delivers the goods.",
	},
	{
		key: "SELLERS_FINANCIAL_INSTITUTION",
		name: "Seller's financial institution",
		code: "RH",
		description:
			"Financial institution designated by seller to receive payment. RDFI (ACH transfers).",
	},
	{
		key: "REINSURANCE_INTERMEDIARYBROKER",
		name: "Reinsurance intermediary/broker",
		code: "RI",
		description: "Intermediary party between ceding company and reinsurance.",
	},
	{
		key: "REPORTING_CARRIER_CUSTOMS",
		name: "Reporting carrier (Customs)",
		code: "RL",
		description: "Party who makes the cargo report to Customs.",
	},
	{
		key: "REPORTING_CARRIERS_NOMINATED_AGENTREPRESENTATIVE_CUSTOMS",
		name: "Reporting carrier's nominated agent/representative (Customs)",
		code: "RM",
		description:
			"Agent who formally makes a cargo report to Customs on behalf of the carrier.",
	},
	{
		key: "ROUTING_PARTY",
		name: "Routing party",
		code: "RP",
		description: "Party responsible for the selection of the carrier(s).",
	},
	{
		key: "PARTY_TO_RECEIVE_STATEMENT_OF_ACCOUNT",
		name: "Party to receive statement of account",
		code: "RS",
		description: "Party to whom the statement of account should be sent.",
	},
	{
		key: "RECEIVER_OF_CHEQUE",
		name: "Receiver of cheque",
		code: "RV",
		description:
			"Identifies the party which is to receive the actual cheque, when different from the receiver of funds.",
	},
	{
		key: "ISSUER_OF_WAYBILL",
		name: "Issuer of waybill",
		code: "RW",
		description: "Party issuing the contract (waybill) for carriage.",
	},
	{
		key: "SALES_RESPONSIBILITY",
		name: "Sales responsibility",
		code: "SB",
		description: "Description to be provided.",
	},
	{
		key: "SELLER",
		name: "Seller",
		code: "SE",
		description: "(3346) Party selling merchandise to a buyer.",
	},
	{
		key: "SHIP_FROM",
		name: "Ship from",
		code: "SF",
		description:
			"Identification of the party from where goods will be or have been shipped.",
	},
	{
		key: "STORE_GROUP",
		name: "Store group",
		code: "SG",
		description: "Description to be provided.",
	},
	{
		key: "SHIPPING_SCHEDULE_ISSUER",
		name: "Shipping schedule issuer",
		code: "SI",
		description: "The party which issues a shipping schedule.",
	},
	{
		key: "PLANT",
		name: "Plant",
		code: "SK",
		description: "Self explanatory.",
	},
	{
		key: "STORE_KEEPER",
		name: "Store keeper",
		code: "SN",
		description: "Self explanatory.",
	},
	{
		key: "SOLD_TO_IF_DIFFERENT_THAN_BILL_TO",
		name: "Sold to if different than bill to",
		code: "SO",
		description: "Self explanatory.",
	},
	{
		key: "SELLERS_AGENTREPRESENTATIVE",
		name: "Seller's agent/representative",
		code: "SR",
		description:
			"(3254) Party representing the seller for the purpose of the trade transaction.",
	},
	{
		key: "SOCIAL_SECURITIES_COLLECTORS_OFFICE",
		name: "Social securities collector's office",
		code: "SS",
		description: "Party collecting social securities premiums.",
	},
	{
		key: "SHIP_TO",
		name: "Ship to",
		code: "ST",
		description:
			"Identification of the party to where goods will be or have been shipped.",
	},
	{
		key: "SUPPLIER",
		name: "Supplier",
		code: "SU",
		description: "Party who supplies goods and/or services.",
	},
	{
		key: "SURETY_FOR_ADDITIONS",
		name: "Surety for additions",
		code: "SX",
		description:
			"Natural of legal person (generally a bank of insurance company) who accepts responsibility in due legal form for the financial guarantee to Customs of the payment of additional duties or fees that become due against a particular shipment, which have not previously been covered by surety.",
	},
	{
		key: "SURETY",
		name: "Surety",
		code: "SY",
		description:
			"Natural or legal person (generally a bank or insurance company) who accepts responsibility in due legal form for the financial consequences of non-fulfillment of another's obligations to the Customs (CCC).",
	},
	{
		key: "SURETY_FOR_ANTIDUMPINGCOUNTERVAILING_DUTY",
		name: "Surety for antidumping/countervailing duty",
		code: "SZ",
		description:
			"Natural or legal person that has been contracted by the importer to guarantee to Customs the payment of antidumping and/or countervailing duties that become due against a particular shipment.",
	},
	{
		key: "LEGAL_RECEIVER",
		name: "Legal receiver",
		code: "TA",
		description: "The party responsible for a receivership.",
	},
	{
		key: "SUBMITTER",
		name: "Submitter",
		code: "TB",
		description: "To specify that the party is a submitter.",
	},
	{
		key: "TAX_COLLECTORS_OFFICE",
		name: "Tax collector's office",
		code: "TC",
		description: "Party collecting taxes.",
	},
	{
		key: "TRANSIT_CHARGE_PAYER",
		name: "Transit charge payer",
		code: "TCP",
		description:
			"Party, other than the ordering party, which has to pay the charges concerning the transit operations.",
	},
	{
		key: "PARTY_TO_RECEIVE_TECHNICAL_DOCUMENTATION",
		name: "Party to receive technical documentation",
		code: "TD",
		description: "Party to whom technical documentation should be sent.",
	},
	{
		key: "BANKRUPTCY_REFEREE",
		name: "Bankruptcy referee",
		code: "TE",
		description: "To specify that the party is a referee in a bankruptcy case.",
	},
	{
		key: "SOURCE_OF_INFORMATION",
		name: "Source of information",
		code: "TF",
		description: "To specify that the party is the source of information.",
	},
	{
		key: "JUDGE",
		name: "Judge",
		code: "TG",
		description: "To specify that the party is a judge.",
	},
	{
		key: "ATTORNEY",
		name: "Attorney",
		code: "TH",
		description: "To specify that the party is an attorney.",
	},
	{
		key: "LAW_FIRM",
		name: "Law firm",
		code: "TI",
		description: "To specify that the party is a law firm.",
	},
	{
		key: "TRUSTEE",
		name: "Trustee",
		code: "TJ",
		description: "To specify that the party is a trustee.",
	},
	{
		key: "SIGNATORY",
		name: "Signatory",
		code: "TK",
		description: "To specify that the party is a signatory.",
	},
	{
		key: "OCCUPANT",
		name: "Occupant",
		code: "TL",
		description: "The party is an occupant.",
	},
	{
		key: "CO_OCCUPANT",
		name: "Co-occupant",
		code: "TM",
		description: "The party is a co-occupant.",
	},
	{
		key: "SUBJECT_OF_INQUIRY",
		name: "Subject of inquiry",
		code: "TN",
		description: "The party is the subject of an inquiry.",
	},
	{
		key: "LESSOR",
		name: "Lessor",
		code: "TO",
		description: "The party is a lessor.",
	},
	{
		key: "OWNER_OF_RESIDENCE",
		name: "Owner of residence",
		code: "TP",
		description: "Identifies the owner of a residence.",
	},
	{
		key: "FOUNDER",
		name: "Founder",
		code: "TQ",
		description: "Identifies the founder.",
	},
	{
		key: "TERMINAL_OPERATOR",
		name: "Terminal operator",
		code: "TR",
		description:
			"A party which handles the loading and unloading of marine vessels.",
	},
	{
		key: "PARTY_TO_RECEIVE_CERTIFIED_TEST_RESULTS",
		name: "Party to receive certified test results",
		code: "TS",
		description: "Party to whom the certified test results should be sent.",
	},
	{
		key: "TRANSFER_TO",
		name: "Transfer to",
		code: "TT",
		description: "The party which is the recipient of a transfer.",
	},
	{
		key: "PRESIDENT",
		name: "President",
		code: "TU",
		description: "Identifies the president.",
	},
	{
		key: "CHAIRPERSON",
		name: "Chairperson",
		code: "TV",
		description: "Identifies the chairperson.",
	},
	{
		key: "LEGAL_TITLE_HOLDER",
		name: "Legal title holder",
		code: "TW",
		description: "Identifies the legal title holder.",
	},
	{
		key: "SHAREHOLDER",
		name: "Shareholder",
		code: "TX",
		description: "Identifies a shareholder.",
	},
	{
		key: "PROVIDER",
		name: "Provider",
		code: "TY",
		description: "Identifies the provider.",
	},
	{
		key: "MILITARY_BRANCH",
		name: "Military branch",
		code: "TZ",
		description: "Identifies the branch of the military.",
	},
	{
		key: "EDUCATIONAL_INSTITUTION",
		name: "Educational institution",
		code: "UA",
		description: "Identifies a university, college or school.",
	},
	{
		key: "ASSIGNOR",
		name: "Assignor",
		code: "UB",
		description: "Identifies the assignor.",
	},
	{
		key: "ULTIMATE_CONSIGNEE",
		name: "Ultimate consignee",
		code: "UC",
		description:
			"Party who has been designated on the invoice or packing list as the final recipient of the stated merchandise.",
	},
	{
		key: "ULTIMATE_CUSTOMER",
		name: "Ultimate customer",
		code: "UD",
		description: "The final recipient of goods.",
	},
	{
		key: "ADVISOR",
		name: "Advisor",
		code: "UE",
		description: "Identifies the advisor.",
	},
	{
		key: "CO_DEFENDANT",
		name: "Co-defendant",
		code: "UF",
		description: "Identifies the co-defendant.",
	},
	{
		key: "MERGED_COMPANY_WITH_RETAINED_IDENTITY",
		name: "Merged company with retained identity",
		code: "UG",
		description: "Company whose identity has been retained from a merger.",
	},
	{
		key: "PARTY_REPRESENTED",
		name: "Party represented",
		code: "UH",
		description: "Identifies the party represented.",
	},
	{
		key: "UNEXPECTED_HANDLING_PARTY",
		name: "Unexpected handling party",
		code: "UHP",
		description:
			"Party authorized (during a voyage) to apply unexpected handling procedures or party having applied these procedures.",
	},
	{
		key: "ASSIGNEE",
		name: "Assignee",
		code: "UI",
		description: "Identifies the assignee.",
	},
	{
		key: "KEY_PERSON",
		name: "Key person",
		code: "UJ",
		description: "Identifies the key person.",
	},
	{
		key: "AUTHOR",
		name: "Author",
		code: "UK",
		description: "Identifies the author.",
	},
	{
		key: "ULTIMATE_PARENT_COMPANY",
		name: "Ultimate parent company",
		code: "UL",
		description: "Identifies the ultimate parent company.",
	},
	{
		key: "PARTY_NOT_TO_BE_CONFUSED_WITH",
		name: "Party not to be confused with",
		code: "UM",
		description: "Identifies a party not to be confused with another party.",
	},
	{
		key: "ACCOUNTANT",
		name: "Accountant",
		code: "UN",
		description: "Identifies the accountant.",
	},
	{
		key: "PLAINTIFF",
		name: "Plaintiff",
		code: "UO",
		description: "Identifies the plaintiff.",
	},
	{
		key: "UNLOADING_PARTY",
		name: "Unloading party",
		code: "UP",
		description: "Description to be provided.",
	},
	{
		key: "PARENT_COMPANY",
		name: "Parent company",
		code: "UQ",
		description: "Identifies the parent company.",
	},
	{
		key: "AFFILIATED_COMPANY",
		name: "Affiliated company",
		code: "UR",
		description: "Identifies the affiliated company.",
	},
	{
		key: "BAILIFF",
		name: "Bailiff",
		code: "US",
		description: "Identifies the bailiff.",
	},
	{
		key: "MERGED_COMPANY",
		name: "Merged company",
		code: "UT",
		description: "Identifies the company involved in a merger.",
	},
	{
		key: "DEFENDANT",
		name: "Defendant",
		code: "UU",
		description: "Identifies the defendant.",
	},
	{
		key: "PETITIONING_CREDITOR",
		name: "Petitioning creditor",
		code: "UV",
		description: "Identifies the petitioning creditor.",
	},
	{
		key: "GUARANTEE_AGENCY",
		name: "Guarantee agency",
		code: "UW",
		description: "Identifies the guarantee agency.",
	},
	{
		key: "ORGANIZATION_GROUP",
		name: "Organization group",
		code: "UX",
		description: "Identifies the organization group.",
	},
	{
		key: "SUBSIDIARY",
		name: "Subsidiary",
		code: "UY",
		description: "Identifies the subsidiary.",
	},
	{
		key: "INDUSTRY_ASSOCIATION",
		name: "Industry association",
		code: "UZ",
		description: "Identifies the industry association.",
	},
	{
		key: "JOINT_OWNER",
		name: "Joint owner",
		code: "VA",
		description: "Identifies the joint owner.",
	},
	{
		key: "JOINT_VENTURE",
		name: "Joint venture",
		code: "VB",
		description: "Identifies the joint venture.",
	},
	{
		key: "FILING_OFFICE",
		name: "Filing office",
		code: "VC",
		description: "Identifies the filing office.",
	},
	{
		key: "COURT",
		name: "Court",
		code: "VE",
		description: "Identifies the court.",
	},
	{
		key: "LIABILITY_HOLDER",
		name: "Liability holder",
		code: "VF",
		description: "Identifies the liability holder.",
	},
	{
		key: "LOCAL_GOVERNMENT_SPONSOR",
		name: "Local government sponsor",
		code: "VG",
		description: "Identifies the local government sponsor.",
	},
	{
		key: "MORTGAGE_COMPANY",
		name: "Mortgage company",
		code: "VH",
		description: "Identifies the mortgage company.",
	},
	{
		key: "NOTARY_PUBLIC",
		name: "Notary public",
		code: "VI",
		description: "Identifies the notary public.",
	},
	{
		key: "OFFICER",
		name: "Officer",
		code: "VJ",
		description: "Identifies the officer.",
	},
	{
		key: "PUBLISHER",
		name: "Publisher",
		code: "VK",
		description: "Identifies the publisher.",
	},
	{
		key: "PARTY_MANUFACTURED_FOR",
		name: "Party manufactured for",
		code: "VL",
		description:
			"Identifies the party for whom manufacturing of goods is done.",
	},
	{
		key: "PREVIOUS_OWNER",
		name: "Previous owner",
		code: "VM",
		description: "Identifies the previous owner.",
	},
	{
		key: "VENDOR",
		name: "Vendor",
		code: "VN",
		description: "Party vending goods or services.",
	},
	{
		key: "PURCHASED_COMPANY",
		name: "Purchased company",
		code: "VO",
		description: "Identifies the purchased company.",
	},
	{
		key: "RECEIVER_MANAGER",
		name: "Receiver manager",
		code: "VP",
		description:
			"Manager of a business which is in receivership status and which will not be liquidated.",
	},
	{
		key: "RESPONSIBLE_GOVERNMENT_AGENCY",
		name: "Responsible government agency",
		code: "VQ",
		description: "Identifies the responsible government agency.",
	},
	{
		key: "SOLE_PROPRIETOR",
		name: "Sole proprietor",
		code: "VR",
		description: "Identifies the sole proprietor.",
	},
	{
		key: "AUCTIONEER",
		name: "Auctioneer",
		code: "VS",
		description: "Identifies the auctioneer.",
	},
	{
		key: "BRANCH",
		name: "Branch",
		code: "VT",
		description: "Identifies the branch.",
	},
	{
		key: "BUSINESS",
		name: "Business",
		code: "VU",
		description: "Identifies the business.",
	},
	{
		key: "ULTIMATE_SAME_COUNTRY_PARENT_COMPANY",
		name: "Ultimate same country parent company",
		code: "VV",
		description:
			"Identifies the highest level parent company in the same country.",
	},
	{
		key: "RESPONSIBLE_PARTY",
		name: "Responsible party",
		code: "VW",
		description: "Identifies the party that can be called to account.",
	},
	{
		key: "SECURED_PARTY",
		name: "Secured party",
		code: "VX",
		description: "Identifies a party that is guaranteed against loss.",
	},
	{
		key: "OTHER_RELATED_PARTY",
		name: "Other related party",
		code: "VY",
		description: "Identifies an entity as an unspecified but related party.",
	},
	{
		key: "CO_DEBTOR",
		name: "Co-debtor",
		code: "VZ",
		description: "Identifies an entity as a joint or mutual debtor.",
	},
	{
		key: "COMPANY_WHICH_HOLDS_FINANCIAL_INTEREST",
		name: "Company which holds financial interest",
		code: "WA",
		description:
			"Identifies a company which holds any financial stake in an undertaking or organization.",
	},
	{
		key: "RATING_ORGANIZATION",
		name: "Rating organization",
		code: "WB",
		description:
			"Identifies an organization responsible for assigning a classification or rating.",
	},
	{
		key: "INFORMATION_REFERENCE_AGENCY",
		name: "Information reference agency",
		code: "WC",
		description: "The agency responsible for the reference of information.",
	},
	{
		key: "WAREHOUSE_DEPOSITOR",
		name: "Warehouse depositor",
		code: "WD",
		description: "(3004) Party depositing goods in a warehouse.",
	},
	{
		key: "COMPILATION_AGENCY",
		name: "Compilation agency",
		code: "WE",
		description: "The agency responsible for the compilation of information.",
	},
	{
		key: "INFORMATION_MAINTENANCE_AGENCY",
		name: "Information maintenance agency",
		code: "WF",
		description: "The agency responsible for the maintenance of information.",
	},
	{
		key: "INFORMATION_DISSEMINATION_AGENCY",
		name: "Information dissemination agency",
		code: "WG",
		description: "The agency responsible for the dissemination of information.",
	},
	{
		key: "WAREHOUSE_KEEPER",
		name: "Warehouse keeper",
		code: "WH",
		description:
			"(3022) Party taking responsibility for goods entered into a warehouse.",
	},
	{
		key: "INSPECTION_ADDRESS",
		name: "Inspection address",
		code: "WI",
		description: "Specifies the address for an inspection.",
	},
	{
		key: "REFUSAL_PARTY",
		name: "Refusal party",
		code: "WJ",
		description: "Identification of the party responsible for a refusal.",
	},
	{
		key: "VALUE_ADDED_NETWORK_PROVIDER",
		name: "Value added network provider",
		code: "WK",
		description:
			"A party that provides telecommunications interconnectivity services in an electronic data interchange environment.",
	},
	{
		key: "AGENCY",
		name: "Agency",
		code: "WL",
		description: "The business or establishment of an agent.",
	},
	{
		key: "WORKS_MANAGER",
		name: "Works manager",
		code: "WM",
		description: "Self explanatory.",
	},
	{
		key: "PARTY_TO_RECEIVE_ORDER_TO_SUPPLY",
		name: "Party to receive order to supply",
		code: "WN",
		description:
			"Party designated by the registering party to receive a binding direction to supply something.",
	},
	{
		key: "PARTY_TO_RECEIVE_INVITATION_TO_OFFER",
		name: "Party to receive invitation to offer",
		code: "WO",
		description: "An entity to receive an invitation to offer.",
	},
	{
		key: "SUB_ENTITY",
		name: "Sub-entity",
		code: "WP",
		description: "A part into which an entity has been divided.",
	},
	{
		key: "WEIGHTING_PARTY",
		name: "Weighting party",
		code: "WPA",
		description: "Party designated (legally accepted) to ascertain the weight.",
	},
	{
		key: "DOING_BUSINESS_AS",
		name: "Doing business as",
		code: "WQ",
		description: "The name under which business is conducted.",
	},
	{
		key: "PARTY_SUBMITTING_QUOTE",
		name: "Party submitting quote",
		code: "WR",
		description: "The party stating the price of something to be purchased.",
	},
	{
		key: "WHOLESALER",
		name: "Wholesaler",
		code: "WS",
		description:
			"Seller of articles, often in large quantities, to be retailed by others.",
	},
	{
		key: "AFFILIATED_PARTY",
		name: "Affiliated party",
		code: "WT",
		description: "A party attached or connected to another party.",
	},
	{
		key: "PREVIOUS_NAME",
		name: "Previous name",
		code: "WU",
		description: "Name of an entity used before the current name.",
	},
	{
		key: "PARTY_PERFORMING_TASK",
		name: "Party performing task",
		code: "WV",
		description:
			"An entity responsible for performing a task to be undertaken.",
	},
	{
		key: "REGISTERING_PARTY",
		name: "Registering party",
		code: "WW",
		description: "Party performing the registration.",
	},
	{
		key: "NO_HEADING",
		name: "No heading",
		code: "XX",
		description: "Description to be provided.",
	},
	{
		key: "MUTUALLY_DEFINED",
		name: "Mutually defined",
		code: "ZZZ",
		description:
			"Party specification mutually agreed between interchanging parties.",
	},
] as const satisfies Untdid3035Definition[];
