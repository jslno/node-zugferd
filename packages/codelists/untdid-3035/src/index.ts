import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid3035 = [
	{
		name: "Party to be billed (AAR Accounting rule 11)",
		value: "AA",
		description:
			"Party to be billed in accordance with AAR Accounting rule 11.",
		key: "PARTY_TO_BE_BILLED_AAR_ACCOUNTING_RULE_11",
	},
	{
		name: "Buyer's agent/representative",
		value: "AB",
		description:
			"Third party who arranged the purchase of merchandise on behalf of the actual buyer.",
		key: "BUYER_S_AGENT_REPRESENTATIVE",
	},
	{
		name: "Declarant's agent/representative",
		value: "AE",
		description:
			"Any natural or legal person who makes a declaration to an official body on behalf of another natural or legal person, where legally permitted (CCC).",
		key: "DECLARANT_S_AGENT_REPRESENTATIVE",
	},
	{
		name: "Transit principal",
		value: "AF",
		description:
			"Natural or legal person responsible for the satisfactory performance of a Customs transit operation. Source: CCC.",
		key: "TRANSIT_PRINCIPAL",
	},
	{
		name: "Agent",
		value: "AG",
		description:
			"(3196) Party authorized to act on behalf of another party. Synonym: Representative.",
		key: "AGENT",
	},
	{
		name: "Transit principal's agent/representative",
		value: "AH",
		description: "Agent acting on behalf of the transit principal (CCC).",
		key: "TRANSIT_PRINCIPAL_S_AGENT_REPRESENTATIVE",
	},
	{
		name: "Successful job applicant",
		value: "AI",
		description: "Person who has been chosen for a job.",
		key: "SUCCESSFUL_JOB_APPLICANT",
	},
	{
		name: "Party issuing mutually agreed codes",
		value: "AJ",
		description:
			"The party which has issued all mutually agreed codes used in the message.",
		key: "PARTY_ISSUING_MUTUALLY_AGREED_CODES",
	},
	{
		name: "Acknowledgement recipient",
		value: "AK",
		description: "Party to whom acknowledgement should be sent.",
		key: "ACKNOWLEDGEMENT_RECIPIENT",
	},
	{
		name: "Principal responsible party",
		value: "AL",
		description:
			"(3340) Party accepting liability for goods held or moving (e.g. transit) under a Customs authorization and - when applicable - a guarantee.",
		key: "PRINCIPAL_RESPONSIBLE_PARTY",
	},
	{
		name: "Authorized official",
		value: "AM",
		description:
			"Employee of a company or firm authorized to act on behalf of that company or firm e.g. to make a Customs declaration.",
		key: "AUTHORIZED_OFFICIAL",
	},
	{
		name: "Approved importer",
		value: "AN",
		description:
			"Person or company which is authorised by the relevant Customs authority to import goods without payment all taxes or specific taxes at the point of entry into the country.",
		key: "APPROVED_IMPORTER",
	},
	{
		name: "Account of",
		value: "AO",
		description: "Party account is assigned to.",
		key: "ACCOUNT_OF",
	},
	{
		name: "Accepting party",
		value: "AP",
		description: "(3336) Party accepting goods, products, services, etc.",
		key: "ACCEPTING_PARTY",
	},
	{
		name: "Approved consignor",
		value: "AQ",
		description:
			"Person or company approved by the relevant authority in the country to pack and export specific goods under Customs supervision.",
		key: "APPROVED_CONSIGNOR",
	},
	{
		name: "Authorized exporter",
		value: "AR",
		description:
			"Exporter authorized/approved by Customs for special Customs procedures e.g. simplified procedure.",
		key: "AUTHORIZED_EXPORTER",
	},
	{
		name: "Account servicing financial institution",
		value: "AS",
		description:
			"Identifies the financial institution servicing the account(s).",
		key: "ACCOUNT_SERVICING_FINANCIAL_INSTITUTION",
	},
	{
		name: "Authorized importer",
		value: "AT",
		description:
			"Importer authorized/approved by Customs for special Customs procedures e.g. simplified procedure.",
		key: "AUTHORIZED_IMPORTER",
	},
	{
		name: "Authorized trader (transit)",
		value: "AU",
		description:
			"Trader authorized/approved by Customs for special transit procedures e.g. simplified procedure.",
		key: "AUTHORIZED_TRADER_TRANSIT",
	},
	{
		name: "Authorizing official",
		value: "AV",
		description:
			"Party that has delegated the authority to take a certain action on behalf of a company or agency.",
		key: "AUTHORIZING_OFFICIAL",
	},
	{
		name: "Applicant's bank",
		value: "AW",
		description:
			"(3234) Financial institution which is requested to issue the documentary credit.",
		key: "APPLICANT_S_BANK",
	},
	{
		name: "Authenticating party",
		value: "AX",
		description: "Party which certifies that a document is authentic.",
		key: "AUTHENTICATING_PARTY",
	},
	{
		name: "Animal being investigated",
		value: "AY",
		description: "Animal being investigated.",
		key: "ANIMAL_BEING_INVESTIGATED",
	},
	{
		name: "Issuing bank",
		value: "AZ",
		description:
			"[3320] Financial institution which issues the documentary credit, if the applicant's bank is not acting as the issuing bank.",
		key: "ISSUING_BANK",
	},
	{
		name: "Contact bank 1",
		value: "B1",
		description:
			"Identifies an additional bank which must be informed of certain aspects of the message.",
		key: "CONTACT_BANK_1",
	},
	{
		name: "Contact bank 2",
		value: "B2",
		description:
			"Identifies an additional bank which must be informed of certain aspects of the message.",
		key: "CONTACT_BANK_2",
	},
	{
		name: "Booking agent",
		value: "BA",
		description:
			"Party acting as a booking office for transport and forwarding services.",
		key: "BOOKING_AGENT",
	},
	{
		name: "Buyer bank identification",
		value: "BB",
		description:
			"[3421]To identify a bank employed by the buyer to make a payment.",
		key: "BUYER_BANK_IDENTIFICATION",
	},
	{
		name: "Negotiating bank",
		value: "BC",
		description:
			"Financial institution to whom a negotiable documentary credit is directed.",
		key: "NEGOTIATING_BANK",
	},
	{
		name: "Documentary credit reimbursing bank",
		value: "BD",
		description:
			"[3350] A financial institution which reimburses documentary credit.",
		key: "DOCUMENTARY_CREDIT_REIMBURSING_BANK",
	},
	{
		name: "Beneficiary",
		value: "BE",
		description:
			"(3260) The ultimate recipient of the funds. Normally the account owner who is reimbursed by the payer.",
		key: "BENEFICIARY",
	},
	{
		name: "Beneficiary's bank",
		value: "BF",
		description:
			"(3422) Identifies the account servicer for the beneficiary or the payee.",
		key: "BENEFICIARY_S_BANK",
	},
	{
		name: "Employer",
		value: "BG",
		description: "A party that keeps a person in service for payment.",
		key: "EMPLOYER",
	},
	{
		name: "Previous employer",
		value: "BH",
		description: "Previous employer of a person(s).",
		key: "PREVIOUS_EMPLOYER",
	},
	{
		name: "Buyer's financial institution",
		value: "BI",
		description: "Financial institution designated by buyer to make payment.",
		key: "BUYER_S_FINANCIAL_INSTITUTION",
	},
	{
		name: "Release to party",
		value: "BJ",
		description:
			"Party to which the goods or container(s) is (are) to be released.",
		key: "RELEASE_TO_PARTY",
	},
	{
		name: "Financial institution",
		value: "BK",
		description: "Party acting as financial institution.",
		key: "FINANCIAL_INSTITUTION",
	},
	{
		name: "Bill of lading recipient",
		value: "BL",
		description: "Party to receive B/L.",
		key: "BILL_OF_LADING_RECIPIENT",
	},
	{
		name: "Insured",
		value: "BM",
		description: "[3136] Party which is the object of an insurance contract.",
		key: "INSURED",
	},
	{
		name: "Insurance beneficiary",
		value: "BN",
		description: "Party which benefits from insurance coverage.",
		key: "INSURANCE_BENEFICIARY",
	},
	{
		name: "Broker or sales office",
		value: "BO",
		description:
			"Party acting in the name of the seller as broker or as sales office.",
		key: "BROKER_OR_SALES_OFFICE",
	},
	{
		name: "Building site purchaser",
		value: "BP",
		description:
			"Party at the building site responsible for the purchasing of goods and services for that particular site.",
		key: "BUILDING_SITE_PURCHASER",
	},
	{
		name: "Cheque drawn bank",
		value: "BQ",
		description:
			"Identifies the bank on which the cheque should be drawn, as instructed by the ordering customer.",
		key: "CHEQUE_DRAWN_BANK",
	},
	{
		name: "Bill and ship to",
		value: "BS",
		description: "Party receiving goods and relevant invoice.",
		key: "BILL_AND_SHIP_TO",
	},
	{
		name: "Party to be billed for other than freight (bill to)",
		value: "BT",
		description: "Party receiving invoice excluding freight costs.",
		key: "PARTY_TO_BE_BILLED_FOR_OTHER_THAN_FREIGHT_BILL_TO",
	},
	{
		name: "Service bureau",
		value: "BU",
		description:
			"Party carrying out service bureau processing work, (e.g. a payroll bureau).",
		key: "SERVICE_BUREAU",
	},
	{
		name: "Member",
		value: "BV",
		description:
			"Member of a group (e.g. of a group of persons or a service scheme).",
		key: "MEMBER",
	},
	{
		name: "Borrower",
		value: "BW",
		description:
			"A person who acquires something temporarily with the promise or intention of returning.",
		key: "BORROWER",
	},
	{
		name: "Building site engineer",
		value: "BX",
		description:
			"Party at the building site responsible for engineering matters for that particular site.",
		key: "BUILDING_SITE_ENGINEER",
	},
	{
		name: "Buyer",
		value: "BY",
		description: "[3002] Party to which merchandise or services are sold.",
		key: "BUYER",
	},
	{
		name: "Building site forwarder",
		value: "BZ",
		description:
			"Party at the building site responsible for forwarding the received goods on that particular site.",
		key: "BUILDING_SITE_FORWARDER",
	},
	{
		name: "In care of party no. 1",
		value: "C1",
		description: "A person taking responsibility on behalf of party no. 1.",
		key: "IN_CARE_OF_PARTY_NO_1",
	},
	{
		name: "In care of party no. 2",
		value: "C2",
		description: "A person taking responsibility on behalf of party no. 2.",
		key: "IN_CARE_OF_PARTY_NO_2",
	},
	{
		name: "Carrier",
		value: "CA",
		description:
			"[3126] Party undertaking or arranging transport of goods between named points.",
		key: "CARRIER",
	},
	{
		name: "Customs broker",
		value: "CB",
		description:
			"Agent or representative or a professional Customs clearing agent who deals directly with Customs on behalf of the importer or exporter (CCC).",
		key: "CUSTOMS_BROKER",
	},
	{
		name: "Claimant",
		value: "CC",
		description: "Party who claims goods or insurance.",
		key: "CLAIMANT",
	},
	{
		name: "Agent's bank",
		value: "CD",
		description: "Bank of the agent.",
		key: "AGENT_S_BANK",
	},
	{
		name: "Ceding company",
		value: "CE",
		description: "Company which cedes something to someone.",
		key: "CEDING_COMPANY",
	},
	{
		name: "Container operator/lessee",
		value: "CF",
		description:
			"Party to whom the possession of specified property (e.g. container) has been conveyed for a period of time in return for rental payments.",
		key: "CONTAINER_OPERATOR_LESSEE",
	},
	{
		name: "Carrier's agent",
		value: "CG",
		description: "[3052] Party authorized to act for or on behalf of carrier.",
		key: "CARRIER_S_AGENT",
	},
	{
		name: "Connecting carrier",
		value: "CH",
		description:
			"Owner or operator of a transportation conveyance to which goods in a given transaction will be transferred.",
		key: "CONNECTING_CARRIER",
	},
	{
		name: "Commission processor",
		value: "CI",
		description:
			"Party who provides extra treatment to goods on commission base.",
		key: "COMMISSION_PROCESSOR",
	},
	{
		name: "Previous member",
		value: "CJ",
		description: "Previous member of a group of persons or a service scheme.",
		key: "PREVIOUS_MEMBER",
	},
	{
		name: "Empty equipment despatch party",
		value: "CK",
		description:
			"Party from whose premises empty equipment will be or has been despatched.",
		key: "EMPTY_EQUIPMENT_DESPATCH_PARTY",
	},
	{
		name: "Container location party",
		value: "CL",
		description:
			"Party from whose premises container will be or has been despatched.",
		key: "CONTAINER_LOCATION_PARTY",
	},
	{
		name: "Customs",
		value: "CM",
		description:
			"Identification of customs authority relevant to the transaction or shipment.",
		key: "CUSTOMS",
	},
	{
		name: "Consignee",
		value: "CN",
		description: "[3132] Party to which goods are consigned.",
		key: "CONSIGNEE",
	},
	{
		name: "Cash pool top account servicing financial institution",
		value: "CNX",
		description:
			"Identification of a financial institution servicing the top account of a cash pool.",
		key: "CASH_POOL_TOP_ACCOUNT_SERVICING_FINANCIAL_INSTITUTION",
	},
	{
		name: "Cash pool level account servicing financial institution",
		value: "CNY",
		description:
			"Identification of a financial institution servicing the level account of a cash pool.",
		key: "CASH_POOL_LEVEL_ACCOUNT_SERVICING_FINANCIAL_INSTITUTION",
	},
	{
		name: "Cash pool sub-account servicing financial institution",
		value: "CNZ",
		description:
			"Identification of a financial institution servicing the sub-account of a cash pool.",
		key: "CASH_POOL_SUB_ACCOUNT_SERVICING_FINANCIAL_INSTITUTION",
	},
	{
		name: "Corporate office",
		value: "CO",
		description: "Identification of the Head Office within a company.",
		key: "CORPORATE_OFFICE",
	},
	{
		name: "Entity in which a financial interest is held",
		value: "COA",
		description: "Business in which a financial interest is held.",
		key: "ENTITY_IN_WHICH_A_FINANCIAL_INTEREST_IS_HELD",
	},
	{
		name: "Intermediate level parent company",
		value: "COB",
		description: "Identifies an intermediate parent company.",
		key: "INTERMEDIATE_LEVEL_PARENT_COMPANY",
	},
	{
		name: "Transshipment party",
		value: "COC",
		description: "A party responsible for transshipment.",
		key: "TRANSSHIPMENT_PARTY",
	},
	{
		name: "Quotation requesting party",
		value: "COD",
		description: "Party sending a request for a quotation.",
		key: "QUOTATION_REQUESTING_PARTY",
	},
	{
		name: "Party maintaining the codes used in the message",
		value: "COE",
		description: "The party which maintains the codes used in the message.",
		key: "PARTY_MAINTAINING_THE_CODES_USED_IN_THE_MESSAGE",
	},
	{
		name: "Party maintaining the identifiers used in the message",
		value: "COF",
		description:
			"The party which maintains the identifiers used in the message.",
		key: "PARTY_MAINTAINING_THE_IDENTIFIERS_USED_IN_THE_MESSAGE",
	},
	{
		name: "Dispatcher",
		value: "COG",
		description:
			"An individual responsible for sending something to a destination.",
		key: "DISPATCHER",
	},
	{
		name: "Submitter of sample",
		value: "COH",
		description: "An entity responsible for the submission of a sample.",
		key: "SUBMITTER_OF_SAMPLE",
	},
	{
		name: "Institutional provider",
		value: "COI",
		description: "The institution providing the service.",
		key: "INSTITUTIONAL_PROVIDER",
	},
	{
		name: "Primary health care provider",
		value: "COJ",
		description:
			"Health care provider that has primary responsibility for patient.",
		key: "PRIMARY_HEALTH_CARE_PROVIDER",
	},
	{
		name: "Assistant surgeon",
		value: "COK",
		description: "Physician assisting in surgery.",
		key: "ASSISTANT_SURGEON",
	},
	{
		name: "Admitting health care provider",
		value: "COL",
		description: "Health care provider that admitted the patient.",
		key: "ADMITTING_HEALTH_CARE_PROVIDER",
	},
	{
		name: "Referring health care provider",
		value: "COM",
		description:
			"Health care provider that referred patient to current provider of services.",
		key: "REFERRING_HEALTH_CARE_PROVIDER",
	},
	{
		name: "Supervising health care provider",
		value: "CON",
		description:
			"Health care provider that supervised the rendering of a service.",
		key: "SUPERVISING_HEALTH_CARE_PROVIDER",
	},
	{
		name: "Party providing financing",
		value: "COO",
		description: "Identifies the party providing the financing.",
		key: "PARTY_PROVIDING_FINANCING",
	},
	{
		name: "Convoying party",
		value: "COP",
		description: "Party designated to escort the transported goods.",
		key: "CONVOYING_PARTY",
	},
	{
		name: "Nominated bank",
		value: "COQ",
		description: "Identifies the nominated bank.",
		key: "NOMINATED_BANK",
	},
	{
		name: "Family member",
		value: "COR",
		description: "Identifies a family member.",
		key: "FAMILY_MEMBER",
	},
	{
		name: "Co-participant",
		value: "COS",
		description: "Identifies another party who participates in an activity.",
		key: "CO_PARTICIPANT",
	},
	{
		name: "Involved party",
		value: "COT",
		description: "Party which is involved in an activity.",
		key: "INVOLVED_PARTY",
	},
	{
		name: "Assigner",
		value: "COU",
		description: "Identifies the entity who assigns.",
		key: "ASSIGNER",
	},
	{
		name: "Registered principal",
		value: "COV",
		description:
			"An individual who is registered as a principal for an entity.",
		key: "REGISTERED_PRINCIPAL",
	},
	{
		name: "Freight payer on behalf of the consignor",
		value: "COW",
		description:
			"(3470) Freight payer is a third party acting on behalf of the consignor.",
		key: "FREIGHT_PAYER_ON_BEHALF_OF_THE_CONSIGNOR",
	},
	{
		name: "Freight payer on behalf of the consignee",
		value: "COX",
		description:
			"(3470) Freight payer is a third party acting on behalf of the consignee.",
		key: "FREIGHT_PAYER_ON_BEHALF_OF_THE_CONSIGNEE",
	},
	{
		name: "Party responsible for disinfection",
		value: "COY",
		description: "Party responsible for performing disinfection operations.",
		key: "PARTY_RESPONSIBLE_FOR_DISINFECTION",
	},
	{
		name: "Party responsible for refueling",
		value: "COZ",
		description: "Party responsible for performing refueling operations.",
		key: "PARTY_RESPONSIBLE_FOR_REFUELING",
	},
	{
		name: "Party to receive certificate of compliance",
		value: "CP",
		description:
			"Party acting for or on behalf of seller in matters concerning compliance.",
		key: "PARTY_TO_RECEIVE_CERTIFICATE_OF_COMPLIANCE",
	},
	{
		name: "Advising bank",
		value: "CPA",
		description:
			"[3190] Identifies the financial institution used by the issuing bank to advise the documentary credit.",
		key: "ADVISING_BANK",
	},
	{
		name: "Reimbursing bank",
		value: "CPB",
		description:
			"Identifies the financial institution through which the reimbursement is to be effected.",
		key: "REIMBURSING_BANK",
	},
	{
		name: "Advise through bank",
		value: "CPC",
		description:
			"Identifies the financial institution through which the advising bank is to advise.",
		key: "ADVISE_THROUGH_BANK",
	},
	{
		name: "Charges payer at destination",
		value: "CPD",
		description:
			"Party, other than the ordering party, which has to pay the charges concerning the destination operations.",
		key: "CHARGES_PAYER_AT_DESTINATION",
	},
	{
		name: "Transport means master name",
		value: "CPE",
		description:
			"[3408] Name of the Master of a means of transport such as vessel.",
		key: "TRANSPORT_MEANS_MASTER_NAME",
	},
	{
		name: "Means of transport charterer",
		value: "CPF",
		description: "Charterer of the means of transport.",
		key: "MEANS_OF_TRANSPORT_CHARTERER",
	},
	{
		name: "Excise party",
		value: "CPG",
		description: "Party to whom excise must be paid.",
		key: "EXCISE_PARTY",
	},
	{
		name: "Copy report to",
		value: "CPH",
		description: "Party receiving a copy of a report.",
		key: "COPY_REPORT_TO",
	},
	{
		name: "Related healthcare party",
		value: "CPI",
		description: "A healthcare party related to the subject.",
		key: "RELATED_HEALTHCARE_PARTY",
	},
	{
		name: "Clinical information provider",
		value: "CPJ",
		description: "Party providing clinical information.",
		key: "CLINICAL_INFORMATION_PROVIDER",
	},
	{
		name: "Service requester",
		value: "CPK",
		description: "Party requesting a service.",
		key: "SERVICE_REQUESTER",
	},
	{
		name: "Patient admitted by",
		value: "CPL",
		description: "Party who admitted a patient.",
		key: "PATIENT_ADMITTED_BY",
	},
	{
		name: "Patient discharged to",
		value: "CPM",
		description: "The party who receives the discharged patient.",
		key: "PATIENT_DISCHARGED_TO",
	},
	{
		name: "Patient hosted by",
		value: "CPN",
		description: "The party hosting the patient.",
		key: "PATIENT_HOSTED_BY",
	},
	{
		name: "Prescriber's contact person",
		value: "CPO",
		description: "Contact person for the prescriber.",
		key: "PRESCRIBER_S_CONTACT_PERSON",
	},
	{
		name: "Cheque order",
		value: "CQ",
		description:
			"Party to which the cheque will be ordered, when different from the beneficiary.",
		key: "CHEQUE_ORDER",
	},
	{
		name: "Empty equipment return party",
		value: "CR",
		description:
			"Party to whose premises empty equipment will be or has been returned.",
		key: "EMPTY_EQUIPMENT_RETURN_PARTY",
	},
	{
		name: "Consolidator",
		value: "CS",
		description: "Party consolidating various consignments, payments etc.",
		key: "CONSOLIDATOR",
	},
	{
		name: "Consignee to be specified",
		value: "CT",
		description: "The party to be identified at a later time as the consignee.",
		key: "CONSIGNEE_TO_BE_SPECIFIED",
	},
	{
		name: "Container return company",
		value: "CU",
		description: "The company to which containers have to be returned.",
		key: "CONTAINER_RETURN_COMPANY",
	},
	{
		name: "Consignee of vessel",
		value: "CV",
		description: "Party to which the vessel shall be delivered.",
		key: "CONSIGNEE_OF_VESSEL",
	},
	{
		name: "Equipment owner",
		value: "CW",
		description: "Owner of equipment (container, etc.).",
		key: "EQUIPMENT_OWNER",
	},
	{
		name: "Consignee's agent",
		value: "CX",
		description: "Party authorized to act on behalf of the consignee.",
		key: "CONSIGNEE_S_AGENT",
	},
	{
		name: "Commissionable agent",
		value: "CY",
		description: "IATA cargo agent entitled to commission.",
		key: "COMMISSIONABLE_AGENT",
	},
	{
		name: "Consignor",
		value: "CZ",
		description:
			"[3336] Party which, by contract with a carrier, consigns or sends goods with the carrier, or has them conveyed by him. Synonym: shipper, sender.",
		key: "CONSIGNOR",
	},
	{
		name: "Available with bank (documentary credits)",
		value: "DA",
		description:
			"Financial institution with whom the documentary credit is available.",
		key: "AVAILABLE_WITH_BANK_DOCUMENTARY_CREDITS",
	},
	{
		name: "Distributor branch",
		value: "DB",
		description: "The affiliate of a retailer or distributor.",
		key: "DISTRIBUTOR_BRANCH",
	},
	{
		name: "Deconsolidator",
		value: "DC",
		description:
			"Party that splits up a large consignment composed of separate consignments of goods. The smaller consignments of goods were grouped together into that large consignment for carriage as a larger unit in order to obtain a reduced rate.",
		key: "DECONSOLIDATOR",
	},
	{
		name: "Despatch charge payer",
		value: "DCP",
		description:
			"Party, other than the ordering party, which has to pay the charges concerning the despatch operations.",
		key: "DESPATCH_CHARGE_PAYER",
	},
	{
		name: "Prescription database owner",
		value: "DCQ",
		description: "Organisation or person owning a prescription database.",
		key: "PRESCRIPTION_DATABASE_OWNER",
	},
	{
		name: "Original prescriber",
		value: "DCR",
		description: "The doctor who issued the original prescription.",
		key: "ORIGINAL_PRESCRIBER",
	},
	{
		name: "Temporary employee",
		value: "DCS",
		description: "A person employed on a temporary basis.",
		key: "TEMPORARY_EMPLOYEE",
	},
	{
		name: "Designer",
		value: "DCT",
		description: "A party who designs.",
		key: "DESIGNER",
	},
	{
		name: "Quotation delivered to",
		value: "DCU",
		description: "Party to whom the quotation is to be or has been delivered.",
		key: "QUOTATION_DELIVERED_TO",
	},
	{
		name: "Developer",
		value: "DCV",
		description: "A party who develops.",
		key: "DEVELOPER",
	},
	{
		name: "Test execution party",
		value: "DCW",
		description: "The party performing a test.",
		key: "TEST_EXECUTION_PARTY",
	},
	{
		name: "Party to receive refund",
		value: "DCX",
		description: "Party to whom a refund is given.",
		key: "PARTY_TO_RECEIVE_REFUND",
	},
	{
		name: "Authorised issuer of prescription",
		value: "DCY",
		description: "Party authorised to issue a prescription.",
		key: "AUTHORISED_ISSUER_OF_PRESCRIPTION",
	},
	{
		name: "Authorised dispenser of medicine",
		value: "DCZ",
		description: "Organisation or person authorised to dispense medicine.",
		key: "AUTHORISED_DISPENSER_OF_MEDICINE",
	},
	{
		name: "Documentary credit account party's bank",
		value: "DD",
		description: "Bank of the documentary credit account party.",
		key: "DOCUMENTARY_CREDIT_ACCOUNT_PARTY_S_BANK",
	},
	{
		name: "Report responsible party",
		value: "DDA",
		description: "The party or person taking responsibility for a report.",
		key: "REPORT_RESPONSIBLE_PARTY",
	},
	{
		name: "Initial sender",
		value: "DDB",
		description: "The party who does the initial sending.",
		key: "INITIAL_SENDER",
	},
	{
		name: "The party authorising the original prescription",
		value: "DDC",
		description:
			"The party authorising the issuer of the original prescription.",
		key: "THE_PARTY_AUTHORISING_THE_ORIGINAL_PRESCRIPTION",
	},
	{
		name: "Applicant",
		value: "DDD",
		description: "A party who applies for something.",
		key: "APPLICANT",
	},
	{
		name: "Meter reader",
		value: "DDE",
		description: "A party physically reading the meter.",
		key: "METER_READER",
	},
	{
		name: "Primary electronic business contact",
		value: "DDF",
		description:
			"Code specifying a party who serves as a business entity's primary contact for matters related to electronic business.",
		key: "PRIMARY_ELECTRONIC_BUSINESS_CONTACT",
	},
	{
		name: "Alternate electronic business contact",
		value: "DDG",
		description:
			"Code specifying a party who serves as a business entity's alternate contact for matters related to electronic business.",
		key: "ALTERNATE_ELECTRONIC_BUSINESS_CONTACT",
	},
	{
		name: "Primary government business contact",
		value: "DDH",
		description:
			"Code specifying a party who serves as a business entity's primary contact for matters related to doing business with the government.",
		key: "PRIMARY_GOVERNMENT_BUSINESS_CONTACT",
	},
	{
		name: "Alternate government business contact",
		value: "DDI",
		description:
			"Code specifying a party who serves as a business entity's alternate contact for matters related to doing business with the government.",
		key: "ALTERNATE_GOVERNMENT_BUSINESS_CONTACT",
	},
	{
		name: "Past performance contact",
		value: "DDJ",
		description:
			"Code specifying a party who serves as a business entity's contact for matters related to the past performance of that entity.",
		key: "PAST_PERFORMANCE_CONTACT",
	},
	{
		name: "Balance responsible party",
		value: "DDK",
		description: "A party responsible for balancing supply and consumption.",
		key: "BALANCE_RESPONSIBLE_PARTY",
	},
	{
		name: "Group of passengers",
		value: "DDL",
		description:
			"A group of persons conveyed by a means of transport, other than the crew.",
		key: "GROUP_OF_PASSENGERS",
	},
	{
		name: "Grid operator",
		value: "DDM",
		description: "A party operating a grid.",
		key: "GRID_OPERATOR",
	},
	{
		name: "First financial institution in the transaction chain",
		value: "DDN",
		description:
			"Identifies the financial institution that is the point of entry into the interbank transaction chain.",
		key: "FIRST_FINANCIAL_INSTITUTION_IN_THE_TRANSACTION_CHAIN",
	},
	{
		name: "Location manager",
		value: "DDO",
		description: "Party responsible for the management of the location.",
		key: "LOCATION_MANAGER",
	},
	{
		name: "Group leader",
		value: "DDP",
		description: "Party responsible for leading the group.",
		key: "GROUP_LEADER",
	},
	{
		name: "Energy Supplier",
		value: "DDQ",
		description:
			"A party supplying energy to a party connected to the grid at an accounting point. In case of a surplus, the energy supplier may also take back energy.",
		key: "ENERGY_SUPPLIER",
	},
	{
		name: "Consignor's freight forwarder",
		value: "DDR",
		description:
			"Identification of freight forwarder giving services to the consignor.",
		key: "CONSIGNOR_S_FREIGHT_FORWARDER",
	},
	{
		name: "Consignee's freight forwarder",
		value: "DDS",
		description:
			"Identification of freight forwarder giving services to the consignee.",
		key: "CONSIGNEE_S_FREIGHT_FORWARDER",
	},
	{
		name: "In transit crew member",
		value: "DDT",
		description:
			"The movement of a crew member from one country to another via the territory of an intermediate country for which no entry is intended.",
		key: "IN_TRANSIT_CREW_MEMBER",
	},
	{
		name: "In transit passenger",
		value: "DDU",
		description:
			"The movement of a passenger from one country to another via the territory of an intermediate country for which no entry is intended.",
		key: "IN_TRANSIT_PASSENGER",
	},
	{
		name: "Energy consumption imbalance responsible party",
		value: "DDV",
		description:
			"A party who can be brought to rights, legally and financially, for any imbalance between energy bought and consumed for all associated metering points.",
		key: "ENERGY_CONSUMPTION_IMBALANCE_RESPONSIBLE_PARTY",
	},
	{
		name: "Energy production imbalance responsible party",
		value: "DDW",
		description:
			"A party who can be brought to rights, legally and financially, for any imbalance between energy sold and produced for all associated metering points.",
		key: "ENERGY_PRODUCTION_IMBALANCE_RESPONSIBLE_PARTY",
	},
	{
		name: "Imbalance settlement responsible party",
		value: "DDX",
		description:
			"A party that is responsible for settlement of the difference between planned and realised quantities.",
		key: "IMBALANCE_SETTLEMENT_RESPONSIBLE_PARTY",
	},
	{
		name: "Transmission capacity allocator",
		value: "DDY",
		description: "A party managing the allocation of transmission capacity.",
		key: "TRANSMISSION_CAPACITY_ALLOCATOR",
	},
	{
		name: "Metering point administrator",
		value: "DDZ",
		description:
			"A party responsible for registering the technical specifications of metering points and the parties linked to them.",
		key: "METERING_POINT_ADMINISTRATOR",
	},
	{
		name: "Depositor",
		value: "DE",
		description: "Party depositing goods, financial payments or documents.",
		key: "DEPOSITOR",
	},
	{
		name: "Metered data aggregator",
		value: "DEA",
		description: "A party responsible for aggregation of metered data.",
		key: "METERED_DATA_AGGREGATOR",
	},
	{
		name: "Meter operator",
		value: "DEB",
		description:
			"A party responsible for the operation of a meter, including installing  maintaining, testing, certifying and decommissioning.",
		key: "METER_OPERATOR",
	},
	{
		name: "Party connected to grid",
		value: "DEC",
		description:
			"A party that contracts for the right to consume or produce electricity at a metering point.",
		key: "PARTY_CONNECTED_TO_GRID",
	},
	{
		name: "Profile maintenance party",
		value: "DED",
		description: "A party that maintains profiles.",
		key: "PROFILE_MAINTENANCE_PARTY",
	},
	{
		name: "Stowaway",
		value: "DEE",
		description:
			"A person who hides on a conveyance in order to obtain free passage.",
		key: "STOWAWAY",
	},
	{
		name: "Meat cutter",
		value: "DEF",
		description: "Person whose job is to cut up and/or mince meat.",
		key: "MEAT_CUTTER",
	},
	{
		name: "Consortium Carrier (maritime)",
		value: "DEG",
		description:
			"A marine carrier that transports goods for more than one shipping line between named points.",
		key: "CONSORTIUM_CARRIER_MARITIME",
	},
	{
		name: "Non-vessel operating carrier",
		value: "DEH",
		description: "A carrier that does not operate the vessel.",
		key: "NON_VESSEL_OPERATING_CARRIER",
	},
	{
		name: "Means of transport operator",
		value: "DEI",
		description:
			"The operator of a means of transport, e.g. the captain of a vessel.",
		key: "MEANS_OF_TRANSPORT_OPERATOR",
	},
	{
		name: "Stuffing address",
		value: "DEJ",
		description:
			"Address where cargo is loaded into the transport equipment e.g. container. Synonyms; vanning address / place of vanning.",
		key: "STUFFING_ADDRESS",
	},
	{
		name: "Mooring service provider",
		value: "DEK",
		description:
			"Party responsible for mooring the vessel at the berth in the port. Synonym: Boatmen.",
		key: "MOORING_SERVICE_PROVIDER",
	},
	{
		name: "Pilotage service provider",
		value: "DEL",
		description: "Party responsible for the pilotage of the vessel.",
		key: "PILOTAGE_SERVICE_PROVIDER",
	},
	{
		name: "Berth towage service provider",
		value: "DEM",
		description:
			"Party responsible for towing the vessel to/from the berth in the port.",
		key: "BERTH_TOWAGE_SERVICE_PROVIDER",
	},
	{
		name: "Agent/representative, direct representation",
		value: "DEN",
		description:
			"Party authorised to act in the name and on behalf of another person.",
		key: "AGENT_REPRESENTATIVE_DIRECT_REPRESENTATION",
	},
	{
		name: "Agent/representative, indirect representation",
		value: "DEO",
		description:
			"Party authorised to act in its own name but on behalf of another person.",
		key: "AGENT_REPRESENTATIVE_INDIRECT_REPRESENTATION",
	},
	{
		name: "Stevedore",
		value: "DEP",
		description:
			"A party which handles the loading and unloading of marine vessels from several terminals.",
		key: "STEVEDORE",
	},
	{
		name: "Shipper",
		value: "DEQ",
		description: "Party responsible for the shipment of goods.",
		key: "SHIPPER",
	},
	{
		name: "Source data pool",
		value: "DER",
		description:
			"A data pool that supports the functionality required by a data source such as data loading, publication, notification, registration, etc.",
		key: "SOURCE_DATA_POOL",
	},
	{
		name: "Brand owner",
		value: "DES",
		description: "The owner of a brand.",
		key: "BRAND_OWNER",
	},
	{
		name: "Cockpit crew",
		value: "DET",
		description: "Cockpit crew and personnel inside cockpit.",
		key: "COCKPIT_CREW",
	},
	{
		name: "Cabin crew",
		value: "DEU",
		description: "Crew members operating in passenger cabin.",
		key: "CABIN_CREW",
	},
	{
		name: "Airline operations management, not in cockpit",
		value: "DEV",
		description:
			"Personnel of the airline operations management department positioned outside the cockpit.",
		key: "AIRLINE_OPERATIONS_MANAGEMENT_NOT_IN_COCKPIT",
	},
	{
		name: "Cargo non-cockpit crew and/or non-crew personnel",
		value: "DEW",
		description:
			"Employees of the carrier, cargo groomers, or special cargo handlers, that are not authorized to ride in the cockpit.",
		key: "CARGO_NON_COCKPIT_CREW_AND_OR_NON_CREW_PERSONNEL",
	},
	{
		name: "Pilots seated outside cockpit",
		value: "DEX",
		description:
			"Pilots currently not in charge of flying the aircraft and not present in the cockpit.",
		key: "PILOTS_SEATED_OUTSIDE_COCKPIT",
	},
	{
		name: "Commercial verifier",
		value: "DEY",
		description:
			"A party recognized under relevant legislation to undertake official verification.",
		key: "COMMERCIAL_VERIFIER",
	},
	{
		name: "Authorized issuer",
		value: "DEZ",
		description:
			"A person authorized under relevant legislation for the purpose of issuing official assurances.",
		key: "AUTHORIZED_ISSUER",
	},
	{
		name: "Documentary credit applicant",
		value: "DF",
		description:
			"[3198] Party at whose request the applicant's bank/issuing bank is to issue a documentary credit.",
		key: "DOCUMENTARY_CREDIT_APPLICANT",
	},
	{
		name: "Bank for deposit of duties/taxes/fees",
		value: "DFA",
		description:
			"Bank that is authorized to receive the deposit for duties, taxes, and fees.",
		key: "BANK_FOR_DEPOSIT_OF_DUTIES_TAXES_FEES",
	},
	{
		name: "Company security officer (IMO Circular MSC 1130)",
		value: "DFB",
		description:
			"The company security officer as described in IMO Circular MSC 1130.",
		key: "COMPANY_SECURITY_OFFICER_IMO_CIRCULAR_MSC_1130",
	},
	{
		name: "Distiller",
		value: "DFC",
		description: "The party providing distillation services.",
		key: "DISTILLER",
	},
	{
		name: "Drayman/lighterman",
		value: "DFD",
		description:
			"The bonded (insured) party that moves goods within port limits.",
		key: "DRAYMAN_LIGHTERMAN",
	},
	{
		name: "Exhibitor",
		value: "DFE",
		description: "The party who offers items for exhibit or show.",
		key: "EXHIBITOR",
	},
	{
		name: "Feedlot",
		value: "DFF",
		description: "A commercial establishment that feeds livestock.",
		key: "FEEDLOT",
	},
	{
		name: "Government official",
		value: "DFG",
		description:
			"A person appointed to some position of responsibility or authority in the government.",
		key: "GOVERNMENT_OFFICIAL",
	},
	{
		name: "Government service requestor",
		value: "DFH",
		description:
			"The party requesting inspection, grading, or other government service.",
		key: "GOVERNMENT_SERVICE_REQUESTOR",
	},
	{
		name: "Crop grower",
		value: "DFI",
		description: "The party who grows crops.",
		key: "CROP_GROWER",
	},
	{
		name: "ISPS Responsible Party",
		value: "DFJ",
		description:
			"The responsible party as identified and defined in the International Ship and Port Facility Security Code (ISPS).",
		key: "ISPS_RESPONSIBLE_PARTY",
	},
	{
		name: "LPCO authorized party",
		value: "DFK",
		description:
			"The party to whom the License, Permit, Certificate, or Other required document (LPCO) is issued.",
		key: "LPCO_AUTHORIZED_PARTY",
	},
	{
		name: "Operator of property, registered",
		value: "DFL",
		description: "The registered operator of the property.",
		key: "OPERATOR_OF_PROPERTY_REGISTERED",
	},
	{
		name: "Organic growth certifier, accredited",
		value: "DFM",
		description:
			"An organization that is accredited to certify organic growth processes.",
		key: "ORGANIC_GROWTH_CERTIFIER_ACCREDITED",
	},
	{
		name: "Party holding Certificate of Financial Responsibility",
		value: "DFN",
		description:
			"The party holding the Certificate of Financial Responsibility (COFR).",
		key: "PARTY_HOLDING_CERTIFICATE_OF_FINANCIAL_RESPONSIBILITY",
	},
	{
		name: "Port facility security officer",
		value: "DFO",
		description:
			"The individual (person) designated as the port facility security officer responsible for port security requirements.",
		key: "PORT_FACILITY_SECURITY_OFFICER",
	},
	{
		name: "Vehicle owner",
		value: "DFP",
		description: "The owner of the vehicle.",
		key: "VEHICLE_OWNER",
	},
	{
		name: "Security certificate issuer, recognized",
		value: "DFQ",
		description: "Organization recogized for issuing security certificates.",
		key: "SECURITY_CERTIFICATE_ISSUER_RECOGNIZED",
	},
	{
		name: "Ship Security Officer",
		value: "DFR",
		description: "The person who is appointed as Ship Security Officer (SSO).",
		key: "SHIP_SECURITY_OFFICER",
	},
	{
		name: "Certificate issuer, veterinary",
		value: "DFS",
		description: "The person who issues veterinary certificates.",
		key: "CERTIFICATE_ISSUER_VETERINARY",
	},
	{
		name: "Assembler",
		value: "DFT",
		description:
			"The party putting together various components or parts into a product or commodity.",
		key: "ASSEMBLER",
	},
	{
		name: "Competitor",
		value: "DFU",
		description: "The party is a competitor.",
		key: "COMPETITOR",
	},
	{
		name: "Right holder",
		value: "DFV",
		description:
			"Party holding exclusive rights to a protected intellectual property.",
		key: "RIGHT_HOLDER",
	},
	{
		name: "Authorised Economic Operator (AEO)",
		value: "DFW",
		description:
			"Party approved by Customs as complying with WCO or equivalent supply-chain security standards.",
		key: "AUTHORISED_ECONOMIC_OPERATOR_AEO",
	},
	{
		name: "Manufacturer of equipment",
		value: "DFX",
		description: "Party who manufactures equipment.",
		key: "MANUFACTURER_OF_EQUIPMENT",
	},
	{
		name: "Crew other ship",
		value: "DFY",
		description: "Crew for another vessel.",
		key: "CREW_OTHER_SHIP",
	},
	{
		name: "Article information responsible party",
		value: "DFZ",
		description: "The party responsible for article information.",
		key: "ARTICLE_INFORMATION_RESPONSIBLE_PARTY",
	},
	{
		name: "Documentary credit beneficiary",
		value: "DG",
		description:
			"Party in whose favour the documentary credit is to be issued and the party that must comply with the credit's terms and conditions.",
		key: "DOCUMENTARY_CREDIT_BENEFICIARY",
	},
	{
		name: "Price information responsible party",
		value: "DGA",
		description: "The party responsible for price information.",
		key: "PRICE_INFORMATION_RESPONSIBLE_PARTY",
	},
	{
		name: "Invoice processing party",
		value: "DGB",
		description:
			"Party to whom the invoice is sent and who processes the invoice on behalf of the invoicee. Note, the invoicee is legally responsible for the invoice and can be different to the processing party.",
		key: "INVOICE_PROCESSING_PARTY",
	},
	{
		name: "Logistic service provider",
		value: "DGC",
		description:
			"A party providing logistic services for another party (e.g re-packing suppliers products).",
		key: "LOGISTIC_SERVICE_PROVIDER",
	},
	{
		name: "Fattener",
		value: "DGD",
		description: "Party which provides fattening service.",
		key: "FATTENER",
	},
	{
		name: "Breeder",
		value: "DGE",
		description: "Party which provides breeding service.",
		key: "BREEDER",
	},
	{
		name: "Calorific Value Responsible",
		value: "DGF",
		description:
			"A party responsible for establishing the calorific value for a set of Metering points.",
		key: "CALORIFIC_VALUE_RESPONSIBLE",
	},
	{
		name: "Balancing Service Provider",
		value: "DGG",
		description:
			"A party with reserve-providing units or reserve- providing groups able to provide balancing services to one or more LFC Operators.",
		key: "BALANCING_SERVICE_PROVIDER",
	},
	{
		name: "Consent Administrator",
		value: "DGH",
		description:
			"A party responsible for keeping a register of consents for a domain. The Consent Administrator makes this information available on request for entitled parties in the sector.",
		key: "CONSENT_ADMINISTRATOR",
	},
	{
		name: "Energy Service Company (ESCO)",
		value: "DGI",
		description:
			"A party offering energy-related services to the Party Connected to Grid, but not directly active in the energy value chain or the physical infrastructure itself. The ESCO may provide insight services as well as energy management services.",
		key: "ENERGY_SERVICE_COMPANY_ESCO",
	},
	{
		name: "Resource Aggregator",
		value: "DGJ",
		description:
			"A party that aggregates resources for usage by a service provider for energy market services.",
		key: "RESOURCE_AGGREGATOR",
	},
	{
		name: "Resource Provider",
		value: "DGK",
		description:
			"A role that manages a resource and provides production/consumption schedules for it, if required.",
		key: "RESOURCE_PROVIDER",
	},
	{
		name: "Metered Data Administrator",
		value: "DGL",
		description:
			"A party responsible for storing and distributing validated measured data.",
		key: "METERED_DATA_ADMINISTRATOR",
	},
	{
		name: "Consumer",
		value: "DGM",
		description:
			"The person who purchases goods and services for personal use.",
		key: "CONSUMER",
	},
	{
		name: "Farmer",
		value: "DGN",
		description:
			"The party engaged in agriculture business, field crop growing, cattle rearing and other productions (hides, milk, wool, etc).",
		key: "FARMER",
	},
	{
		name: "Recycler",
		value: "DGO",
		description:
			"The party who collects waste in�order�to�produce�materials�that can be used again.",
		key: "RECYCLER",
	},
	{
		name: "Retailer",
		value: "DGP",
		description:
			"The party who sells goods to the public in relatively small quantities for use or consumption rather than for resale.",
		key: "RETAILER",
	},
	{
		name: "Second Party",
		value: "DGQ",
		description: "The party related to another party.",
		key: "SECOND_PARTY",
	},
	{
		name: "Waste Disposal Provider",
		value: "DGR",
		description: "The party providing waste disposal services.",
		key: "WASTE_DISPOSAL_PROVIDER",
	},
	{
		name: "Tanner",
		value: "DGS",
		description: "The party who processes animals skins with tanning agents.",
		key: "TANNER",
	},
	{
		name: "Service Provider",
		value: "DGT",
		description: "The party who provides a service.",
		key: "SERVICE_PROVIDER",
	},
	{
		name: "Ginner",
		value: "DGU",
		description:
			"The party who uses a machine in order to clean cotton fibre, flax fibre etc.",
		key: "GINNER",
	},
	{
		name: "Spinner",
		value: "DGV",
		description: "The party who makes thread by spinning.",
		key: "SPINNER",
	},
	{
		name: "Weaver",
		value: "DGW",
		description: "The party who weaves fabric.",
		key: "WEAVER",
	},
	{
		name: "Documentary credit account party",
		value: "DH",
		description:
			"Party which is responsible for the payment settlement of the documentary credit with the applicant's bank/issuing bank, if different from the documentary credit applicant.",
		key: "DOCUMENTARY_CREDIT_ACCOUNT_PARTY",
	},
	{
		name: "Documentary credit second beneficiary",
		value: "DI",
		description: "Party to whom the documentary credit can be transferred.",
		key: "DOCUMENTARY_CREDIT_SECOND_BENEFICIARY",
	},
	{
		name: "Party according to documentary credit transaction",
		value: "DJ",
		description: "Party related to documentary credit transaction.",
		key: "PARTY_ACCORDING_TO_DOCUMENTARY_CREDIT_TRANSACTION",
	},
	{
		name: "Documentary credit beneficiary's bank",
		value: "DK",
		description:
			"Financial institution with which the beneficiary of the documentary credit maintains an account.",
		key: "DOCUMENTARY_CREDIT_BENEFICIARY_S_BANK",
	},
	{
		name: "Factor",
		value: "DL",
		description:
			"Company offering a financial service whereby a firm sells or transfers title to its accounts receivable to the factoring company.",
		key: "FACTOR",
	},
	{
		name: "Party to whom documents are to be presented",
		value: "DM",
		description: "Party to whom documents are to be presented.",
		key: "PARTY_TO_WHOM_DOCUMENTS_ARE_TO_BE_PRESENTED",
	},
	{
		name: "Owner of operation",
		value: "DN",
		description: "Owner of the operation.",
		key: "OWNER_OF_OPERATION",
	},
	{
		name: "Document recipient",
		value: "DO",
		description: "[1370] Party which should receive a specified document.",
		key: "DOCUMENT_RECIPIENT",
	},
	{
		name: "Delivery party",
		value: "DP",
		description:
			"[3144] Party to which goods should be delivered, if not identical with consignee, such as the place where a container is to be, or has been, positioned.",
		key: "DELIVERY_PARTY",
	},
	{
		name: "Owner's agent",
		value: "DQ",
		description: "Person acting on delegation of powers of the owner.",
		key: "OWNER_S_AGENT",
	},
	{
		name: "Driver",
		value: "DR",
		description: "Person who drives a means of transport.",
		key: "DRIVER",
	},
	{
		name: "Distributor",
		value: "DS",
		description: "Party distributing goods, financial payments or documents.",
		key: "DISTRIBUTOR",
	},
	{
		name: "Declarant",
		value: "DT",
		description:
			"[3140] Party which makes a declaration to an official body or - where legally permitted - in whose name, or on whose behalf, a declaration to an official body is made.",
		key: "DECLARANT",
	},
	{
		name: "Owner's representative",
		value: "DU",
		description:
			"Person commissioned by the owner to represent him in certain circumstances.",
		key: "OWNER_S_REPRESENTATIVE",
	},
	{
		name: "Project management office",
		value: "DV",
		description:
			"Party commissioned by the owner to follow through the execution of all works.",
		key: "PROJECT_MANAGEMENT_OFFICE",
	},
	{
		name: "Drawee",
		value: "DW",
		description: "(3290) Party on whom drafts must be drawn.",
		key: "DRAWEE",
	},
	{
		name: "Engineer (construction)",
		value: "DX",
		description:
			"Party representing the contractor to advise and supervise engineering aspects of the works.",
		key: "ENGINEER_CONSTRUCTION",
	},
	{
		name: "Engineer, resident (construction)",
		value: "DY",
		description:
			"Party commissioned by the owner to advise and supervise engineering aspects of the works.",
		key: "ENGINEER_RESIDENT_CONSTRUCTION",
	},
	{
		name: "Architect",
		value: "DZ",
		description:
			"A designer who prepares plans for buildings, ships, etc. and supervises their construction.",
		key: "ARCHITECT",
	},
	{
		name: "Architect-designer",
		value: "EA",
		description: "Designer of the construction project.",
		key: "ARCHITECT_DESIGNER",
	},
	{
		name: "Building inspectorate",
		value: "EB",
		description:
			"Party controlling the conformity of works to legal and regulation rules.",
		key: "BUILDING_INSPECTORATE",
	},
	{
		name: "Exchanger",
		value: "EC",
		description: "Party exchanging currencies or goods.",
		key: "EXCHANGER",
	},
	{
		name: "Engineer, consultant",
		value: "ED",
		description: "Party providing professional engineering services.",
		key: "ENGINEER_CONSULTANT",
	},
	{
		name: "Location of goods for customs examination before clearance",
		value: "EE",
		description:
			"The location where the goods are examined by customs before clearance.",
		key: "LOCATION_OF_GOODS_FOR_CUSTOMS_EXAMINATION_BEFORE_CLEARANCE",
	},
	{
		name: "Project coordination office",
		value: "EF",
		description: "Party responsible for technical coordination of works.",
		key: "PROJECT_COORDINATION_OFFICE",
	},
	{
		name: "Surveyor, topographical",
		value: "EG",
		description: "Party responsible for topographical measurements.",
		key: "SURVEYOR_TOPOGRAPHICAL",
	},
	{
		name: "Engineer, measurement",
		value: "EH",
		description: "Party responsible for quantity measurements.",
		key: "ENGINEER_MEASUREMENT",
	},
	{
		name: "Controller, quality",
		value: "EI",
		description:
			"Party controlling the quality of goods and workmanship for the project.",
		key: "CONTROLLER_QUALITY",
	},
	{
		name: "Surveyor, quantity",
		value: "EJ",
		description:
			"Party responsible for the quantification and valuation of the works on behalf of the contractor.",
		key: "SURVEYOR_QUANTITY",
	},
	{
		name: "Surveyor (professional), quantity",
		value: "EK",
		description:
			"Party responsible to the owner for the quantification and valuation of the works.",
		key: "SURVEYOR_PROFESSIONAL_QUANTITY",
	},
	{
		name: "Project",
		value: "EL",
		description:
			"Party responsible for a project, e.g. a construction project.",
		key: "PROJECT",
	},
	{
		name: "Party to receive electronic memo of invoice",
		value: "EM",
		description: "Party being informed about invoice issue (via EDI).",
		key: "PARTY_TO_RECEIVE_ELECTRONIC_MEMO_OF_INVOICE",
	},
	{
		name: "Tenderer",
		value: "EN",
		description: "Firm answering an invitation to tender.",
		key: "TENDERER",
	},
	{
		name: "Owner of equipment",
		value: "EO",
		description: "Party who owns equipment.",
		key: "OWNER_OF_EQUIPMENT",
	},
	{
		name: "Equipment drop-off party",
		value: "EP",
		description: "The party which drops off equipment.",
		key: "EQUIPMENT_DROP_OFF_PARTY",
	},
	{
		name: "Empty container responsible party",
		value: "EQ",
		description: "Party responsible for the empty container.",
		key: "EMPTY_CONTAINER_RESPONSIBLE_PARTY",
	},
	{
		name: "Empty container return agent",
		value: "ER",
		description:
			"Party, designated by owner of containers, responsible for their collection as agreed between the owner and customer/ consignee.",
		key: "EMPTY_CONTAINER_RETURN_AGENT",
	},
	{
		name: "Contractor, lead",
		value: "ES",
		description: "Leader representing a grouping of co-contractors.",
		key: "CONTRACTOR_LEAD",
	},
	{
		name: "Co-contractor",
		value: "ET",
		description: "Member of a grouping of co-contractors.",
		key: "CO_CONTRACTOR",
	},
	{
		name: "Contractor, general",
		value: "EU",
		description:
			"Single contractor for the whole construction project, working by his own or with subcontractors.",
		key: "CONTRACTOR_GENERAL",
	},
	{
		name: "Subcontractor",
		value: "EV",
		description: "Firm carrying out a part of the works for a contractor.",
		key: "SUBCONTRACTOR",
	},
	{
		name: "Subcontractor with direct payment",
		value: "EW",
		description: "Subcontractor benefiting from direct payments.",
		key: "SUBCONTRACTOR_WITH_DIRECT_PAYMENT",
	},
	{
		name: "Exporter",
		value: "EX",
		description:
			"[3030] Party who makes, or on whose behalf the export declaration is made, and who is the owner of the goods or has similar rights of disposal over them at the time when the declaration is accepted.",
		key: "EXPORTER",
	},
	{
		name: "Subcontractor, nominated",
		value: "EY",
		description:
			"Subcontractor authorized by the owner after having been proposed.",
		key: "SUBCONTRACTOR_NOMINATED",
	},
	{
		name: "Operator, essential services",
		value: "EZ",
		description:
			"Operator of essential services e.g. water, sewerage system, power.",
		key: "OPERATOR_ESSENTIAL_SERVICES",
	},
	{
		name: "Operator, communication channel",
		value: "FA",
		description: "Operator of a communication channel.",
		key: "OPERATOR_COMMUNICATION_CHANNEL",
	},
	{
		name: "Nominated freight company",
		value: "FB",
		description:
			"Party nominated to act as transport company or carrier for the goods.",
		key: "NOMINATED_FREIGHT_COMPANY",
	},
	{
		name: "Contractor, main",
		value: "FC",
		description:
			"Firm or grouping of co-contractors which has been awarded the contract.",
		key: "CONTRACTOR_MAIN",
	},
	{
		name: "Buyer's parent company",
		value: "FD",
		description: "Parent company, e.g. holding company.",
		key: "BUYER_S_PARENT_COMPANY",
	},
	{
		name: "Credit rating agency",
		value: "FE",
		description: "A party which evaluates another party for credit rating.",
		key: "CREDIT_RATING_AGENCY",
	},
	{
		name: "Factor, correspondent",
		value: "FF",
		description:
			"Factoring company engaged by another factoring company to assist the letter with the services provided to the clients (sellers).",
		key: "FACTOR_CORRESPONDENT",
	},
	{
		name: "Buyer as officially registered",
		value: "FG",
		description: "Buying party as officially registered with government.",
		key: "BUYER_AS_OFFICIALLY_REGISTERED",
	},
	{
		name: "Seller as officially registered",
		value: "FH",
		description: "Selling party as officially registered with government.",
		key: "SELLER_AS_OFFICIALLY_REGISTERED",
	},
	{
		name: "Copy message to",
		value: "FI",
		description: "Party that is to receive a copy of a message.",
		key: "COPY_MESSAGE_TO",
	},
	{
		name: "Trade Union",
		value: "FJ",
		description: "Organisation representing employees.",
		key: "TRADE_UNION",
	},
	{
		name: "Previous Trade Union",
		value: "FK",
		description:
			"Employee organisation who previously represented an employee .",
		key: "PREVIOUS_TRADE_UNION",
	},
	{
		name: "Passenger",
		value: "FL",
		description:
			"A person conveyed by a means of transport, other than the crew.",
		key: "PASSENGER",
	},
	{
		name: "Crew member",
		value: "FM",
		description: "A person manning a means of transport.",
		key: "CREW_MEMBER",
	},
	{
		name: "Tariff issuer",
		value: "FN",
		description: "[3363] The issuer of a tariff, e.g. a freight tariff.",
		key: "TARIFF_ISSUER",
	},
	{
		name: "Party performing inspection",
		value: "FO",
		description: "A party which inspects something.",
		key: "PARTY_PERFORMING_INSPECTION",
	},
	{
		name: "Freight/charges payer",
		value: "FP",
		description: "Party responsible for the payment of freight.",
		key: "FREIGHT_CHARGES_PAYER",
	},
	{
		name: "Container survey agent",
		value: "FQ",
		description: "The container survey agency that will survey the containers.",
		key: "CONTAINER_SURVEY_AGENT",
	},
	{
		name: "Message from",
		value: "FR",
		description: "Party where the message comes from.",
		key: "MESSAGE_FROM",
	},
	{
		name: "Party authorized to make definite a contract action",
		value: "FS",
		description:
			"Party who has the authority to make definite a contract action.",
		key: "PARTY_AUTHORIZED_TO_MAKE_DEFINITE_A_CONTRACT_ACTION",
	},
	{
		name: "Financial settlement party",
		value: "FT",
		description:
			"[3450] Party responsible for either the transfer or repatriation of the funds relating to a transaction.",
		key: "FINANCIAL_SETTLEMENT_PARTY",
	},
	{
		name: "Hazardous material office",
		value: "FU",
		description:
			"The office responsible for providing information regarding hazardous material.",
		key: "HAZARDOUS_MATERIAL_OFFICE",
	},
	{
		name: "Party providing government furnished property",
		value: "FV",
		description:
			"The party responsible for providing government furnished property.",
		key: "PARTY_PROVIDING_GOVERNMENT_FURNISHED_PROPERTY",
	},
	{
		name: "Freight forwarder",
		value: "FW",
		description: "[3170] Party arranging forwarding of goods.",
		key: "FREIGHT_FORWARDER",
	},
	{
		name: "Current receiver",
		value: "FX",
		description:
			"Current receiver of the goods in a multi-step transportation process (indirect flow) involving at least one grouping centre.",
		key: "CURRENT_RECEIVER",
	},
	{
		name: "Current sender",
		value: "FY",
		description:
			"Current sender of the goods in a multi-step transportation process (indirect flow) involving at least one grouping centre.",
		key: "CURRENT_SENDER",
	},
	{
		name: "Grouping centre",
		value: "FZ",
		description:
			"A party in charge of groupage, including degroupage and regroupage.",
		key: "GROUPING_CENTRE",
	},
	{
		name: "Road carrier",
		value: "GA",
		description: "A road carrier moving cargo.",
		key: "ROAD_CARRIER",
	},
	{
		name: "Chamber of commerce",
		value: "GB",
		description:
			"Name of the Chamber of Commerce of the town where the company is registered.",
		key: "CHAMBER_OF_COMMERCE",
	},
	{
		name: "Goods custodian",
		value: "GC",
		description: "[3024] Party responsible for the keeping of goods.",
		key: "GOODS_CUSTODIAN",
	},
	{
		name: "Producer",
		value: "GD",
		description: "Party or person who has produced the produce.",
		key: "PRODUCER",
	},
	{
		name: "Registration tribunal",
		value: "GE",
		description: "Name of the tribunal where the company is registered.",
		key: "REGISTRATION_TRIBUNAL",
	},
	{
		name: "Slot charter party",
		value: "GF",
		description:
			"An identification code of a participant or user that books slots (space) on a ship, more likely on a long term basis on a series of sailings. He pays for the space whether he uses it or not.",
		key: "SLOT_CHARTER_PARTY",
	},
	{
		name: "Applicant for job",
		value: "GH",
		description: "A person who applied for a job.",
		key: "APPLICANT_FOR_JOB",
	},
	{
		name: "Spouse",
		value: "GI",
		description: "Person is a spouse.",
		key: "SPOUSE",
	},
	{
		name: "Mother",
		value: "GJ",
		description: "Person is a mother.",
		key: "MOTHER",
	},
	{
		name: "Father",
		value: "GK",
		description: "Person is a father.",
		key: "FATHER",
	},
	{
		name: "Socially insured person",
		value: "GL",
		description: "A person who is registered in a social security scheme.",
		key: "SOCIALLY_INSURED_PERSON",
	},
	{
		name: "Inventory controller",
		value: "GM",
		description:
			"To specifically identify the party in charge of inventory control.",
		key: "INVENTORY_CONTROLLER",
	},
	{
		name: "Processor",
		value: "GN",
		description: "Party or person who has or will apply a process.",
		key: "PROCESSOR",
	},
	{
		name: "Goods owner",
		value: "GO",
		description: "The party which owns the goods.",
		key: "GOODS_OWNER",
	},
	{
		name: "Packer",
		value: "GP",
		description:
			"Party or person who has undertaken or will undertake packing.",
		key: "PACKER",
	},
	{
		name: "Slaughterer",
		value: "GQ",
		description:
			"Party or person who has undertaken or will undertake a slaughter.",
		key: "SLAUGHTERER",
	},
	{
		name: "Goods releasing party",
		value: "GR",
		description:
			"[3026] Party entitled to authorize release of goods from custodian.",
		key: "GOODS_RELEASING_PARTY",
	},
	{
		name: "Consignor's representative",
		value: "GS",
		description: "Party authorised to represent the consignor.",
		key: "CONSIGNOR_S_REPRESENTATIVE",
	},
	{
		name: "Rail carrier",
		value: "GT",
		description: "A carrier moving cargo, including containers, via rail.",
		key: "RAIL_CARRIER",
	},
	{
		name: "Originator of article number",
		value: "GU",
		description:
			"A code identifying the party which created a specific article number.",
		key: "ORIGINATOR_OF_ARTICLE_NUMBER",
	},
	{
		name: "Procurement responsibility for order",
		value: "GV",
		description:
			"A code used to identify the organization which is responsible for the procurement.",
		key: "PROCUREMENT_RESPONSIBILITY_FOR_ORDER",
	},
	{
		name: "Party fulfilling all operations",
		value: "GW",
		description:
			"Code indicating the fact that the party identified carries out all operations within that company's activities.",
		key: "PARTY_FULFILLING_ALL_OPERATIONS",
	},
	{
		name: "Central catalogue party",
		value: "GX",
		description: "Party controlling a central catalogue.",
		key: "CENTRAL_CATALOGUE_PARTY",
	},
	{
		name: "Inventory reporting party",
		value: "GY",
		description: "Party reporting inventory information.",
		key: "INVENTORY_REPORTING_PARTY",
	},
	{
		name: "Substitute supplier",
		value: "GZ",
		description:
			"Party which may be in a position to supply products or services should the main usual supplier be unable to do so.",
		key: "SUBSTITUTE_SUPPLIER",
	},
	{
		name: "Party which delivers consignments to the terminal",
		value: "HA",
		description: "Party which delivers consignments to a terminal.",
		key: "PARTY_WHICH_DELIVERS_CONSIGNMENTS_TO_THE_TERMINAL",
	},
	{
		name: "Party which picks up consignments from the terminal",
		value: "HB",
		description: "Party which picks up consignments from a terminal.",
		key: "PARTY_WHICH_PICKS_UP_CONSIGNMENTS_FROM_THE_TERMINAL",
	},
	{
		name: "Transit freight forwarder",
		value: "HC",
		description:
			"Freight forwarder to whom transit consignments are addressed, and from whom they are to be on-forwarded.",
		key: "TRANSIT_FREIGHT_FORWARDER",
	},
	{
		name: "Inspection and acceptance party",
		value: "HD",
		description: "The party who will perform inspection and acceptance.",
		key: "INSPECTION_AND_ACCEPTANCE_PARTY",
	},
	{
		name: "Transportation office",
		value: "HE",
		description: "The office that provides transportation information.",
		key: "TRANSPORTATION_OFFICE",
	},
	{
		name: "Contract administration office",
		value: "HF",
		description: "The office responsible for the administration of a contract.",
		key: "CONTRACT_ADMINISTRATION_OFFICE",
	},
	{
		name: "Investigator",
		value: "HG",
		description: "A party who conducts investigations.",
		key: "INVESTIGATOR",
	},
	{
		name: "Audit office",
		value: "HH",
		description: "The office responsible for conducting audits.",
		key: "AUDIT_OFFICE",
	},
	{
		name: "Requestor",
		value: "HI",
		description: "The party requesting an action.",
		key: "REQUESTOR",
	},
	{
		name: "Foreign disclosure information office",
		value: "HJ",
		description:
			"The office that reviews sensitive information for foreign disclosure.",
		key: "FOREIGN_DISCLOSURE_INFORMATION_OFFICE",
	},
	{
		name: "Mark-for party",
		value: "HK",
		description:
			"The party within an organization for whom the material is marked to be delivered.",
		key: "MARK_FOR_PARTY",
	},
	{
		name: "Party to receive reports",
		value: "HL",
		description: "The party to whom reports are to be submitted.",
		key: "PARTY_TO_RECEIVE_REPORTS",
	},
	{
		name: "Alternative manufacturer",
		value: "HM",
		description:
			"Party identification of an alternative manufacturer for a product.",
		key: "ALTERNATIVE_MANUFACTURER",
	},
	{
		name: "Service performer",
		value: "HN",
		description: "The party who is performing a service.",
		key: "SERVICE_PERFORMER",
	},
	{
		name: "Shipper's association",
		value: "HO",
		description: "An association of shippers.",
		key: "SHIPPER_S_ASSOCIATION",
	},
	{
		name: "Final message recipient",
		value: "HP",
		description: "To identify the final recipient of the message.",
		key: "FINAL_MESSAGE_RECIPIENT",
	},
	{
		name: "Account owner",
		value: "HQ",
		description: "Identifies the owner of the account.",
		key: "ACCOUNT_OWNER",
	},
	{
		name: "Shipping line service",
		value: "HR",
		description: "Identifies the shipping line service organization.",
		key: "SHIPPING_LINE_SERVICE",
	},
	{
		name: "Creditor",
		value: "HS",
		description: "Party to whom payment is due.",
		key: "CREDITOR",
	},
	{
		name: "Clearing house",
		value: "HT",
		description: "Institution through which funds will be paid.",
		key: "CLEARING_HOUSE",
	},
	{
		name: "Ordering bank",
		value: "HU",
		description:
			"Bank which instructed the sender to act on the transaction(s).",
		key: "ORDERING_BANK",
	},
	{
		name: "Receiver of funds",
		value: "HV",
		description: "Identifies the financial party that receives the funds.",
		key: "RECEIVER_OF_FUNDS",
	},
	{
		name: "Sender of funds",
		value: "HW",
		description: "Identifies the party that sends the funds.",
		key: "SENDER_OF_FUNDS",
	},
	{
		name: "Debtor",
		value: "HX",
		description: "Party from whom payment is due.",
		key: "DEBTOR",
	},
	{
		name: "Presenting bank",
		value: "HY",
		description: "The bank which presents documents to the drawee.",
		key: "PRESENTING_BANK",
	},
	{
		name: "Work team",
		value: "HZ",
		description: "Team responsible for performing work.",
		key: "WORK_TEAM",
	},
	{
		name: "Intermediary bank 1",
		value: "I1",
		description:
			"A financial institution between the ordered bank and the beneficiary's bank.",
		key: "INTERMEDIARY_BANK_1",
	},
	{
		name: "Intermediary bank 2",
		value: "I2",
		description:
			"A financial institution between the ordered bank and the beneficiary's bank.",
		key: "INTERMEDIARY_BANK_2",
	},
	{
		name: "Intermediary/broker",
		value: "IB",
		description:
			"A person intervening between parties to produce agreement or reconciliation.",
		key: "INTERMEDIARY_BROKER",
	},
	{
		name: "Intermediate consignee",
		value: "IC",
		description: "The intermediate consignee.",
		key: "INTERMEDIATE_CONSIGNEE",
	},
	{
		name: "Replacing manufacturer",
		value: "ID",
		description:
			"A code used to identify a party who replaces the previous party for the manufacture of an article.",
		key: "REPLACING_MANUFACTURER",
	},
	{
		name: "Non-resident third party company with whom financial",
		value: "IE",
		description:
			"account is held Identifies the non-resident third party company with whom the financial account is held.",
		key: "NON_RESIDENT_THIRD_PARTY_COMPANY_WITH_WHOM_FINANCIAL",
	},
	{
		name: "Non-resident group company with whom financial account is",
		value: "IF",
		description:
			"held Identifies the non-resident group company with whom the financial account is held.",
		key: "NON_RESIDENT_GROUP_COMPANY_WITH_WHOM_FINANCIAL_ACCOUNT_IS",
	},
	{
		name: "Non-resident beneficiary",
		value: "IG",
		description:
			"The ultimate non-resident recipient of the funds. Normally the account owner who is reimbursed by the payer.",
		key: "NON_RESIDENT_BENEFICIARY",
	},
	{
		name: "Resident beneficiary",
		value: "IH",
		description:
			"The ultimate resident recipient of the funds. Normally the account owner who is reimbursed by the payer.",
		key: "RESIDENT_BENEFICIARY",
	},
	{
		name: "Invoice issuer",
		value: "II",
		description: "[3028] Party issuing an invoice.",
		key: "INVOICE_ISSUER",
	},
	{
		name: "Non-resident instructing party",
		value: "IJ",
		description:
			"Identifies the non-resident party originating the instruction.",
		key: "NON_RESIDENT_INSTRUCTING_PARTY",
	},
	{
		name: "Resident instructing party",
		value: "IL",
		description: "Identifies the resident party originating the instruction.",
		key: "RESIDENT_INSTRUCTING_PARTY",
	},
	{
		name: "Importer",
		value: "IM",
		description:
			"[3020] Party who makes - or on whose behalf a Customs clearing agent or other authorized person makes - an import declaration. This may include a person who has possession of the goods or to whom the goods are consigned.",
		key: "IMPORTER",
	},
	{
		name: "Insurer",
		value: "IN",
		description:
			"[3070] A person or company offering insurance policies for premiums.",
		key: "INSURER",
	},
	{
		name: "Insurance company",
		value: "IO",
		description: "A company engaged in the business of insurance.",
		key: "INSURANCE_COMPANY",
	},
	{
		name: "Insurance claim adjuster",
		value: "IP",
		description: "[3360] A party which adjusts losses on behalf of an insurer.",
		key: "INSURANCE_CLAIM_ADJUSTER",
	},
	{
		name: "Domestic financial institution",
		value: "IQ",
		description: "Domestic party acting as financial institution.",
		key: "DOMESTIC_FINANCIAL_INSTITUTION",
	},
	{
		name: "Non-domestic financial institution",
		value: "IR",
		description: "Non-domestic party acting as financial institution.",
		key: "NON_DOMESTIC_FINANCIAL_INSTITUTION",
	},
	{
		name: "Party to receive certified inspection report",
		value: "IS",
		description: "Party (at buyer) to receive certified inspection report.",
		key: "PARTY_TO_RECEIVE_CERTIFIED_INSPECTION_REPORT",
	},
	{
		name: "Installation on site",
		value: "IT",
		description:
			"A party who possesses the site on which an installation shall be made.",
		key: "INSTALLATION_ON_SITE",
	},
	{
		name: "Non-resident debtor",
		value: "IU",
		description:
			"Non-resident party who makes the payment or against whom a claim exists.",
		key: "NON_RESIDENT_DEBTOR",
	},
	{
		name: "Invoicee",
		value: "IV",
		description: "[3006] Party to whom an invoice is issued.",
		key: "INVOICEE",
	},
	{
		name: "Non-resident creditor",
		value: "IW",
		description:
			"Non-resident party receiving the payment or against whom a liability exists.",
		key: "NON_RESIDENT_CREDITOR",
	},
	{
		name: "Supplier work team",
		value: "IX",
		description: "The supplier's team responsible for performing the work.",
		key: "SUPPLIER_WORK_TEAM",
	},
	{
		name: "Tenant manager",
		value: "IY",
		description:
			"A code to identify the party who rents the rights to use the goodwill and facilities of an enterprise.",
		key: "TENANT_MANAGER",
	},
	{
		name: "Party mandated to liquidate an enterprise",
		value: "IZ",
		description:
			"A code to identify the party who has been legally mandated to sell off an enterprise.",
		key: "PARTY_MANDATED_TO_LIQUIDATE_AN_ENTERPRISE",
	},
	{
		name: "Certified accountant",
		value: "JA",
		description: "Code identifying the party as a certified accountant.",
		key: "CERTIFIED_ACCOUNTANT",
	},
	{
		name: "Goods collection party",
		value: "JB",
		description: "Party that will collect or has collected the goods.",
		key: "GOODS_COLLECTION_PARTY",
	},
	{
		name: "Party at final place of positioning",
		value: "JC",
		description: "Identifies the party at the final place of positioning.",
		key: "PARTY_AT_FINAL_PLACE_OF_POSITIONING",
	},
	{
		name: "Customs office of clearance",
		value: "JD",
		description:
			"Identifies the office where customs clearance procedures take place.",
		key: "CUSTOMS_OFFICE_OF_CLEARANCE",
	},
	{
		name: "Party from whom customs documents are to be picked up",
		value: "JE",
		description:
			"Identification of the party from whom customs documents are to be picked up.",
		key: "PARTY_FROM_WHOM_CUSTOMS_DOCUMENTS_ARE_TO_BE_PICKED_UP",
	},
	{
		name: "Party from whom non-customs documents are to be picked up",
		value: "JF",
		description:
			"Identification of the party from whom non-customs documents are to be picked up.",
		key: "PARTY_FROM_WHOM_NON_CUSTOMS_DOCUMENTS_ARE_TO_BE_PICKED_UP",
	},
	{
		name: "Party to receive customs documents",
		value: "JG",
		description:
			"Identification of the party to whom customs documents are to be delivered.",
		key: "PARTY_TO_RECEIVE_CUSTOMS_DOCUMENTS",
	},
	{
		name: "Party to receive non-customs documents",
		value: "JH",
		description:
			"Identification of the party to whom non-customs documents are to be delivered.",
		key: "PARTY_TO_RECEIVE_NON_CUSTOMS_DOCUMENTS",
	},
	{
		name: "Party designated to provide living animal care",
		value: "LA",
		description:
			"Party responsible to take care of transported living animals.",
		key: "PARTY_DESIGNATED_TO_PROVIDE_LIVING_ANIMAL_CARE",
	},
	{
		name: "Co-producer",
		value: "LB",
		description:
			"A code used to identify a party who participates in production.",
		key: "CO_PRODUCER",
	},
	{
		name: "Party declaring the Value Added Tax (VAT)",
		value: "LC",
		description:
			"A code to identify the party who is responsible for declaring the Value Added Tax (VAT) on the sale of goods or services.",
		key: "PARTY_DECLARING_THE_VALUE_ADDED_TAX_VAT",
	},
	{
		name: "Party recovering the Value Added Tax (VAT)",
		value: "LD",
		description:
			"A code to identify the party who is eligible to recover the Value Added Tax (VAT) on the sale of goods or services.",
		key: "PARTY_RECOVERING_THE_VALUE_ADDED_TAX_VAT",
	},
	{
		name: "Person on claim",
		value: "LE",
		description: "To identify the person who is the subject of the claim.",
		key: "PERSON_ON_CLAIM",
	},
	{
		name: "Buyer's corporate office",
		value: "LF",
		description: "The identification of the buyer's corporate office.",
		key: "BUYER_S_CORPORATE_OFFICE",
	},
	{
		name: "Supplier's corporate office",
		value: "LG",
		description: "The identification of the supplier's corporate office.",
		key: "SUPPLIER_S_CORPORATE_OFFICE",
	},
	{
		name: "Liquidator",
		value: "LH",
		description: "The party responsible for settling or paying a debt.",
		key: "LIQUIDATOR",
	},
	{
		name: "Account coordinator",
		value: "LI",
		description:
			"An individual with coordination responsibilities for a specific account.",
		key: "ACCOUNT_COORDINATOR",
	},
	{
		name: "Inspection leader",
		value: "LJ",
		description: "An individual responsible for an inspection team.",
		key: "INSPECTION_LEADER",
	},
	{
		name: "Patient",
		value: "LK",
		description:
			"A person receiving or registered to receive medical treatment.",
		key: "PATIENT",
	},
	{
		name: "Patient companion",
		value: "LL",
		description: "Person accompanying the patient.",
		key: "PATIENT_COMPANION",
	},
	{
		name: "Medical treatment executant",
		value: "LM",
		description: "The party who executes a medical treatment.",
		key: "MEDICAL_TREATMENT_EXECUTANT",
	},
	{
		name: "Lender",
		value: "LN",
		description: "Party lending goods or equipment.",
		key: "LENDER",
	},
	{
		name: "Medical treatment prescriber",
		value: "LO",
		description: "The party who prescribes a medical treatment.",
		key: "MEDICAL_TREATMENT_PRESCRIBER",
	},
	{
		name: "Loading party",
		value: "LP",
		description: "Party responsible for the loading when other than carrier.",
		key: "LOADING_PARTY",
	},
	{
		name: "Debt payment authorisation party",
		value: "LQ",
		description: "A party which authorises the payment of a debt.",
		key: "DEBT_PAYMENT_AUTHORISATION_PARTY",
	},
	{
		name: "Administration centre",
		value: "LR",
		description: "Identification of an administration centre.",
		key: "ADMINISTRATION_CENTRE",
	},
	{
		name: "Product services and repairs centre",
		value: "LS",
		description: "A centre which services and repairs products.",
		key: "PRODUCT_SERVICES_AND_REPAIRS_CENTRE",
	},
	{
		name: "Secretariat",
		value: "LT",
		description: "Party is a secretariat.",
		key: "SECRETARIAT",
	},
	{
		name: "Entry point technical assessment group",
		value: "LU",
		description: "Party acts as an entry point for technical assessment.",
		key: "ENTRY_POINT_TECHNICAL_ASSESSMENT_GROUP",
	},
	{
		name: "Party assigning a status",
		value: "LV",
		description: "Party responsible for assigning a status.",
		key: "PARTY_ASSIGNING_A_STATUS",
	},
	{
		name: "Party for whom item is ultimately intended",
		value: "MA",
		description: "Party for whom item is ultimately intended.",
		key: "PARTY_FOR_WHOM_ITEM_IS_ULTIMATELY_INTENDED",
	},
	{
		name: "Meter administrator",
		value: "MAD",
		description:
			"A party responsible for keeping a register of meters and related characteristics.",
		key: "METER_ADMINISTRATOR",
	},
	{
		name: "Metered data responsible",
		value: "MDR",
		description:
			"A party responsible for the establishment and validation of metered data received from the Metered Data Collector.",
		key: "METERED_DATA_RESPONSIBLE",
	},
	{
		name: "Manufacturer of goods",
		value: "MF",
		description: "[3513] Party who manufactures the goods.",
		key: "MANUFACTURER_OF_GOODS",
	},
	{
		name: "Party designated to execute re-icing",
		value: "MG",
		description:
			"Party designated to execute re-icing, selected in the official list of mandatories competent for this kind of operation.",
		key: "PARTY_DESIGNATED_TO_EXECUTE_RE_ICING",
	},
	{
		name: "Planning schedule/material release issuer",
		value: "MI",
		description: "A party issuing a planning schedule/material release.",
		key: "PLANNING_SCHEDULE_MATERIAL_RELEASE_ISSUER",
	},
	{
		name: "Market operator",
		value: "MOP",
		description:
			"Operator of a market, e.g . In the utilities sector, the unique power exchange of trades for the actual delivery of energy that can also establish area prices for settlement and reconciliation.",
		key: "MARKET_OPERATOR",
	},
	{
		name: "Manufacturing unit",
		value: "MP",
		description:
			"A party acting as a particular production unit of a manufacturer.",
		key: "MANUFACTURING_UNIT",
	},
	{
		name: "Message recipient",
		value: "MR",
		description: "A party to receive a message or messages.",
		key: "MESSAGE_RECIPIENT",
	},
	{
		name: "Document/message issuer/sender",
		value: "MS",
		description: "[3522] Issuer of a document and/or sender of a message.",
		key: "DOCUMENT_MESSAGE_ISSUER_SENDER",
	},
	{
		name: "Party designated to execute sanitary procedures",
		value: "MT",
		description: "A party which is designated to execute sanitary procedures.",
		key: "PARTY_DESIGNATED_TO_EXECUTE_SANITARY_PROCEDURES",
	},
	{
		name: "Notify party no. 2",
		value: "N2",
		description: "[3376] The second party which is to be notified.",
		key: "NOTIFY_PARTY_NO_2",
	},
	{
		name: "Notify party",
		value: "NI",
		description: "[3180] Party to be notified. Synonym: Notify party No. 1.",
		key: "NOTIFY_PARTY",
	},
	{
		name: "Break bulk berth operator",
		value: "OA",
		description:
			"Party who offers facilities for berthing of vessels, handling and storage of break bulk cargo.",
		key: "BREAK_BULK_BERTH_OPERATOR",
	},
	{
		name: "Ordered by",
		value: "OB",
		description: "Party who issued an order.",
		key: "ORDERED_BY",
	},
	{
		name: "Party data responsible party",
		value: "OC",
		description: "The party responsible for all party data.",
		key: "PARTY_DATA_RESPONSIBLE_PARTY",
	},
	{
		name: "Equipment repair party",
		value: "OD",
		description: "A party making repairs to equipment.",
		key: "EQUIPMENT_REPAIR_PARTY",
	},
	{
		name: "Owner of property",
		value: "OE",
		description: "Party owning a property.",
		key: "OWNER_OF_PROPERTY",
	},
	{
		name: "On behalf of",
		value: "OF",
		description: "Party on behalf of which an action is executed.",
		key: "ON_BEHALF_OF",
	},
	{
		name: "Owner or lessor's surveyor",
		value: "OG",
		description: "Surveyor hired by the owner or lessor of the item.",
		key: "OWNER_OR_LESSOR_S_SURVEYOR",
	},
	{
		name: "Lessee's surveyor",
		value: "OH",
		description: "Surveyor hired by the lessee of the item.",
		key: "LESSEE_S_SURVEYOR",
	},
	{
		name: "Outside inspection agency",
		value: "OI",
		description: "Third party inspecting goods or equipment.",
		key: "OUTSIDE_INSPECTION_AGENCY",
	},
	{
		name: "Third party",
		value: "OJ",
		description: "Another party besides the two principals.",
		key: "THIRD_PARTY",
	},
	{
		name: "Receiver's sub-entity",
		value: "OK",
		description: "Identifies a sub-entity within the receiver's organization.",
		key: "RECEIVER_S_SUB_ENTITY",
	},
	{
		name: "Case of need party",
		value: "OL",
		description: "Party to be approached in case of difficulty.",
		key: "CASE_OF_NEED_PARTY",
	},
	{
		name: "Collecting bank",
		value: "OM",
		description:
			"Any bank, other than the remitting bank, involved in processing the collection.",
		key: "COLLECTING_BANK",
	},
	{
		name: "Remitting bank",
		value: "ON",
		description:
			"The bank to which the principal has entrusted the handling of a collection.",
		key: "REMITTING_BANK",
	},
	{
		name: "Order of the shipper party",
		value: "OO",
		description:
			"The owner of goods under consignment which are moving under a negotiable transport document and will only be released upon receipt of the original transport document.",
		key: "ORDER_OF_THE_SHIPPER_PARTY",
	},
	{
		name: "Operator of property or equipment",
		value: "OP",
		description:
			"(3174) The party which operates property or a unit of equipment.",
		key: "OPERATOR_OF_PROPERTY_OR_EQUIPMENT",
	},
	{
		name: "Collection principal",
		value: "OQ",
		description: "The party entrusting the handling of a collection to a bank.",
		key: "COLLECTION_PRINCIPAL",
	},
	{
		name: "Ordered bank",
		value: "OR",
		description:
			"Identifies the bank servicing the account for the ordering customer or payer.",
		key: "ORDERED_BANK",
	},
	{
		name: "Original shipper",
		value: "OS",
		description: "The original supplier of the goods.",
		key: "ORIGINAL_SHIPPER",
	},
	{
		name: "Outside test agency",
		value: "OT",
		description: "Third party testing goods, equipment or services.",
		key: "OUTSIDE_TEST_AGENCY",
	},
	{
		name: "Account owner's servicing bank on the sending side",
		value: "OU",
		description:
			"Identifies the financial institution on the sending side which services the account owner's bank account(s).",
		key: "ACCOUNT_OWNER_S_SERVICING_BANK_ON_THE_SENDING_SIDE",
	},
	{
		name: "Transport means owner",
		value: "OV",
		description:
			"Party owning the means of transport. No synonym of carrier (= CA).",
		key: "TRANSPORT_MEANS_OWNER",
	},
	{
		name: "Account owner's servicing bank on the receiving side",
		value: "OW",
		description:
			"Identifies the financial institution on the receiving side which services the account owner's bank account(s).",
		key: "ACCOUNT_OWNER_S_SERVICING_BANK_ON_THE_RECEIVING_SIDE",
	},
	{
		name: "Sender's correspondent bank",
		value: "OX",
		description:
			"The account, or branch of the sender, or another financial institution, through which the sender will reimburse the receiver.",
		key: "SENDER_S_CORRESPONDENT_BANK",
	},
	{
		name: "Ordering customer",
		value: "OY",
		description: "Identifies the originator of the instruction.",
		key: "ORDERING_CUSTOMER",
	},
	{
		name: "Receiver's correspondent bank",
		value: "OZ",
		description:
			"The branch of the receiver, or another financial institution, at which the funds will be made available to the receiver.",
		key: "RECEIVER_S_CORRESPONDENT_BANK",
	},
	{
		name: "Contact party 1",
		value: "P1",
		description: "First party to contact.",
		key: "CONTACT_PARTY_1",
	},
	{
		name: "Contact party 2",
		value: "P2",
		description: "Second party to contact.",
		key: "CONTACT_PARTY_2",
	},
	{
		name: "Contact party 3",
		value: "P3",
		description: "Third party to contact.",
		key: "CONTACT_PARTY_3",
	},
	{
		name: "Contact party 4",
		value: "P4",
		description: "Fourth party to contact.",
		key: "CONTACT_PARTY_4",
	},
	{
		name: "Party to receive inspection report",
		value: "PA",
		description: "Party to whom the inspection report should be sent.",
		key: "PARTY_TO_RECEIVE_INSPECTION_REPORT",
	},
	{
		name: "Party Administrator",
		value: "PAD",
		description: "A party responsible for maintaining party information.",
		key: "PARTY_ADMINISTRATOR",
	},
	{
		name: "Paying financial institution",
		value: "PB",
		description: "Financial institution designated to make payment.",
		key: "PAYING_FINANCIAL_INSTITUTION",
	},
	{
		name: "Actual purchaser's customer",
		value: "PC",
		description:
			"Party the purchaser within the actual message is selling the ordered goods or services to.",
		key: "ACTUAL_PURCHASER_S_CUSTOMER",
	},
	{
		name: "Purchaser's department buyer",
		value: "PD",
		description: "Purchasing department of buyer.",
		key: "PURCHASER_S_DEPARTMENT_BUYER",
	},
	{
		name: "Payee",
		value: "PE",
		description: "Identifies the credit party when other than the beneficiary.",
		key: "PAYEE",
	},
	{
		name: "Party to receive freight bill",
		value: "PF",
		description: "Party to whom the freight bill should be sent.",
		key: "PARTY_TO_RECEIVE_FREIGHT_BILL",
	},
	{
		name: "Prime contractor",
		value: "PG",
		description:
			"Party responsible for the whole project if other than the buyer.",
		key: "PRIME_CONTRACTOR",
	},
	{
		name: "Payer's financial institution",
		value: "PH",
		description:
			"Institution chosen by the payer to execute financial transactions on his behalf.",
		key: "PAYER_S_FINANCIAL_INSTITUTION",
	},
	{
		name: "Payee's company name/ID",
		value: "PI",
		description: "Receiving company name/ID (ACH transfers).",
		key: "PAYEE_S_COMPANY_NAME_ID",
	},
	{
		name: "Party to receive correspondence",
		value: "PJ",
		description:
			"Second party designated by a first party to receive certain correspondence in lieu of it being mailed directly to this first party.",
		key: "PARTY_TO_RECEIVE_CORRESPONDENCE",
	},
	{
		name: "Contact party",
		value: "PK",
		description: "Party to contact.",
		key: "CONTACT_PARTY",
	},
	{
		name: "Party to receive paper memo of invoice",
		value: "PM",
		description: "Party being informed about invoice issue (via paper).",
		key: "PARTY_TO_RECEIVE_PAPER_MEMO_OF_INVOICE",
	},
	{
		name: "Party to receive shipping notice",
		value: "PN",
		description: "The party is to be the recipient of the shipping notice.",
		key: "PARTY_TO_RECEIVE_SHIPPING_NOTICE",
	},
	{
		name: "Ordering party",
		value: "PO",
		description:
			"To be used only if ordering party and buyer are not identical.",
		key: "ORDERING_PARTY",
	},
	{
		name: "Port Authority",
		value: "POA",
		description:
			"A governmental commission in charge of the traffic and regulations of a port.",
		key: "PORT_AUTHORITY",
	},
	{
		name: "Certifying party",
		value: "PQ",
		description: "A party which certifies something.",
		key: "CERTIFYING_PARTY",
	},
	{
		name: "Payer",
		value: "PR",
		description: "[3308] Party responsible for making a payment.",
		key: "PAYER",
	},
	{
		name: "Payer's company name/ID (Check, Draft or Wire)",
		value: "PS",
		description: "Party to send cheque, draft or wire for payment.",
		key: "PAYER_S_COMPANY_NAME_ID_CHECK_DRAFT_OR_WIRE",
	},
	{
		name: "Party to receive test report",
		value: "PT",
		description: "A party which is named to be the recipient of test reports.",
		key: "PARTY_TO_RECEIVE_TEST_REPORT",
	},
	{
		name: "Despatch party",
		value: "PW",
		description:
			"[3282] Party where goods are to be, or have been, taken over by a carrier such as the place where a container is picked-up.",
		key: "DESPATCH_PARTY",
	},
	{
		name: "Party to receive all documents",
		value: "PX",
		description: "A party which is named to be the recipient of all documents.",
		key: "PARTY_TO_RECEIVE_ALL_DOCUMENTS",
	},
	{
		name: "Checking party",
		value: "PY",
		description:
			"Party or contact designated on behalf of carrier or his agent to establish the actual figures for quantities, weight, volume and/or (cube) measurements of goods or containers which are to appear in the transport contract and on which charges will be based.",
		key: "CHECKING_PARTY",
	},
	{
		name: "Party to print some document",
		value: "PZ",
		description: "The party that is to print a specific document.",
		key: "PARTY_TO_PRINT_SOME_DOCUMENT",
	},
	{
		name: "Central bank or regulatory authority",
		value: "RA",
		description:
			"Identifies central bank or regulatory authority which must be informed of certain aspects of a message.",
		key: "CENTRAL_BANK_OR_REGULATORY_AUTHORITY",
	},
	{
		name: "Receiving financial institution",
		value: "RB",
		description: "Financial institution designated to receive payment.",
		key: "RECEIVING_FINANCIAL_INSTITUTION",
	},
	{
		name: "Reconciliation accountable",
		value: "RCA",
		description:
			"A party that is financially accountable for reconciliation, e.g. for the reconciled volume of energy products for a profiled accounting point.",
		key: "RECONCILIATION_ACCOUNTABLE",
	},
	{
		name: "Reconciliation responsible",
		value: "RCR",
		description:
			"A party that is responsible for reconciliation, e.g. reconciling volumes within a metering grid area.",
		key: "RECONCILIATION_RESPONSIBLE",
	},
	{
		name: "Party to receive commercial invoice remittance",
		value: "RE",
		description:
			"Party to whom payment for a commercial invoice or bill should be remitted.",
		key: "PARTY_TO_RECEIVE_COMMERCIAL_INVOICE_REMITTANCE",
	},
	{
		name: "Received from",
		value: "RF",
		description:
			"Name of a person or department which actually delivers the goods.",
		key: "RECEIVED_FROM",
	},
	{
		name: "Seller's financial institution",
		value: "RH",
		description:
			"Financial institution designated by seller to receive payment. RDFI (ACH transfers).",
		key: "SELLER_S_FINANCIAL_INSTITUTION",
	},
	{
		name: "Reinsurance intermediary/broker",
		value: "RI",
		description: "Intermediary party between ceding company and reinsurance.",
		key: "REINSURANCE_INTERMEDIARY_BROKER",
	},
	{
		name: "Reporting carrier (Customs)",
		value: "RL",
		description: "Party who makes the cargo report to Customs.",
		key: "REPORTING_CARRIER_CUSTOMS",
	},
	{
		name: "Reporting carrier's nominated agent/representative",
		value: "RM",
		description:
			"(Customs) Agent who formally makes a cargo report to Customs on behalf of the carrier.",
		key: "REPORTING_CARRIER_S_NOMINATED_AGENT_REPRESENTATIVE",
	},
	{
		name: "Routing party",
		value: "RP",
		description: "Party responsible for the selection of the carrier(s).",
		key: "ROUTING_PARTY",
	},
	{
		name: "Party to receive statement of account",
		value: "RS",
		description: "Party to whom the statement of account should be sent.",
		key: "PARTY_TO_RECEIVE_STATEMENT_OF_ACCOUNT",
	},
	{
		name: "Receiver of cheque",
		value: "RV",
		description:
			"Identifies the party which is to receive the actual cheque, when different from the receiver of funds.",
		key: "RECEIVER_OF_CHEQUE",
	},
	{
		name: "Issuer of waybill",
		value: "RW",
		description: "Party issuing the contract (waybill) for carriage.",
		key: "ISSUER_OF_WAYBILL",
	},
	{
		name: "Sales responsibility",
		value: "SB",
		description: "A party being responsible for sales.",
		key: "SALES_RESPONSIBILITY",
	},
	{
		name: "Seller",
		value: "SE",
		description: "[3346] Party selling merchandise or services to a buyer.",
		key: "SELLER",
	},
	{
		name: "Ship from",
		value: "SF",
		description:
			"Identification of the party from where goods will be or have been shipped.",
		key: "SHIP_FROM",
	},
	{
		name: "Store group",
		value: "SG",
		description: "A chain of shops or stores.",
		key: "STORE_GROUP",
	},
	{
		name: "Shipping schedule issuer",
		value: "SI",
		description: "The party which issues a shipping schedule.",
		key: "SHIPPING_SCHEDULE_ISSUER",
	},
	{
		name: "Store keeper",
		value: "SN",
		description: "A party keeping a shop or store.",
		key: "STORE_KEEPER",
	},
	{
		name: "Sold to if different than bill to",
		value: "SO",
		description:
			"Party to whom the goods have been sold, if different to the bill to party.",
		key: "SOLD_TO_IF_DIFFERENT_THAN_BILL_TO",
	},
	{
		name: "SOLAS verified gross mass responsible party",
		value: "SPC",
		description:
			"Party responsible for declaration of the verified gross mass (weight) of a packed transport equipment according to SOLAS Chapter VI, Regulation 2, paragraphs 4-6.",
		key: "SOLAS_VERIFIED_GROSS_MASS_RESPONSIBLE_PARTY",
	},
	{
		name: "Seller agent",
		value: "SR",
		description:
			"[3254] Party representing the seller for the purpose of a trade transaction.",
		key: "SELLER_AGENT",
	},
	{
		name: "Social securities collector's office",
		value: "SS",
		description: "Party collecting social securities premiums.",
		key: "SOCIAL_SECURITIES_COLLECTOR_S_OFFICE",
	},
	{
		name: "Ship to",
		value: "ST",
		description:
			"Identification of the party to where goods will be or have been shipped.",
		key: "SHIP_TO",
	},
	{
		name: "Supplier",
		value: "SU",
		description: "Party who supplies goods and or services.",
		key: "SUPPLIER",
	},
	{
		name: "Surety for additions",
		value: "SX",
		description:
			"Natural of legal person (generally a bank of insurance company) who accepts responsibility in due legal form for the financial guarantee to Customs of the payment of additional duties or fees that become due against a particular shipment, which have not previously been covered by surety.",
		key: "SURETY_FOR_ADDITIONS",
	},
	{
		name: "Surety",
		value: "SY",
		description:
			"Natural or legal person (generally a bank or insurance company) who accepts responsibility in due legal form for the financial consequences of non-fulfillment of another's obligations to the Customs (CCC).",
		key: "SURETY",
	},
	{
		name: "Surety for antidumping/countervailing duty",
		value: "SZ",
		description:
			"Natural or legal person that has been contracted by the importer to guarantee to Customs the payment of antidumping and/or countervailing duties that become due against a particular shipment.",
		key: "SURETY_FOR_ANTIDUMPING_COUNTERVAILING_DUTY",
	},
	{
		name: "Legal receiver",
		value: "TA",
		description: "The party responsible for a receivership.",
		key: "LEGAL_RECEIVER",
	},
	{
		name: "Submitter",
		value: "TB",
		description: "To specify that the party is a submitter.",
		key: "SUBMITTER",
	},
	{
		name: "Tax collector's office",
		value: "TC",
		description: "Party collecting taxes.",
		key: "TAX_COLLECTOR_S_OFFICE",
	},
	{
		name: "Transit charge payer",
		value: "TCP",
		description:
			"Party, other than the ordering party, which has to pay the charges concerning the transit operations.",
		key: "TRANSIT_CHARGE_PAYER",
	},
	{
		name: "Transport capacity responsible party",
		value: "TCR",
		description: "Party responsible for transport capacity.",
		key: "TRANSPORT_CAPACITY_RESPONSIBLE_PARTY",
	},
	{
		name: "Party to receive technical documentation",
		value: "TD",
		description: "Party to whom technical documentation should be sent.",
		key: "PARTY_TO_RECEIVE_TECHNICAL_DOCUMENTATION",
	},
	{
		name: "Bankruptcy referee",
		value: "TE",
		description: "To specify that the party is a referee in a bankruptcy case.",
		key: "BANKRUPTCY_REFEREE",
	},
	{
		name: "Source of information",
		value: "TF",
		description: "To specify that the party is the source of information.",
		key: "SOURCE_OF_INFORMATION",
	},
	{
		name: "Judge",
		value: "TG",
		description: "To specify that the party is a judge.",
		key: "JUDGE",
	},
	{
		name: "Attorney",
		value: "TH",
		description: "To specify that the party is an attorney.",
		key: "ATTORNEY",
	},
	{
		name: "Law firm",
		value: "TI",
		description: "To specify that the party is a law firm.",
		key: "LAW_FIRM",
	},
	{
		name: "Trustee",
		value: "TJ",
		description: "To specify that the party is a trustee.",
		key: "TRUSTEE",
	},
	{
		name: "Signatory",
		value: "TK",
		description: "To specify that the party is a signatory.",
		key: "SIGNATORY",
	},
	{
		name: "Occupant",
		value: "TL",
		description: "The party is an occupant.",
		key: "OCCUPANT",
	},
	{
		name: "Co-occupant",
		value: "TM",
		description: "The party is a co-occupant.",
		key: "CO_OCCUPANT",
	},
	{
		name: "Subject of inquiry",
		value: "TN",
		description: "The party is the subject of an inquiry.",
		key: "SUBJECT_OF_INQUIRY",
	},
	{
		name: "Lessor",
		value: "TO",
		description: "The party is a lessor.",
		key: "LESSOR",
	},
	{
		name: "Owner of residence",
		value: "TP",
		description: "Identifies the owner of a residence.",
		key: "OWNER_OF_RESIDENCE",
	},
	{
		name: "Founder",
		value: "TQ",
		description: "Identifies the founder.",
		key: "FOUNDER",
	},
	{
		name: "Terminal operator",
		value: "TR",
		description:
			"A party which handles the loading and unloading of means of transport.",
		key: "TERMINAL_OPERATOR",
	},
	{
		name: "Party to receive certified test results",
		value: "TS",
		description: "Party to whom the certified test results should be sent.",
		key: "PARTY_TO_RECEIVE_CERTIFIED_TEST_RESULTS",
	},
	{
		name: "Transfer to",
		value: "TT",
		description: "The party which is the recipient of a transfer.",
		key: "TRANSFER_TO",
	},
	{
		name: "President",
		value: "TU",
		description: "Identifies the president.",
		key: "PRESIDENT",
	},
	{
		name: "Chairperson",
		value: "TV",
		description: "Identifies the chairperson.",
		key: "CHAIRPERSON",
	},
	{
		name: "Legal title holder",
		value: "TW",
		description: "Identifies the legal title holder.",
		key: "LEGAL_TITLE_HOLDER",
	},
	{
		name: "Shareholder",
		value: "TX",
		description: "Identifies a shareholder.",
		key: "SHAREHOLDER",
	},
	{
		name: "Provider",
		value: "TY",
		description: "Identifies the provider.",
		key: "PROVIDER",
	},
	{
		name: "Military branch",
		value: "TZ",
		description: "Identifies the branch of the military.",
		key: "MILITARY_BRANCH",
	},
	{
		name: "Educational institution",
		value: "UA",
		description: "Identifies a university, college or school.",
		key: "EDUCATIONAL_INSTITUTION",
	},
	{
		name: "Assignor",
		value: "UB",
		description: "Identifies the assignor.",
		key: "ASSIGNOR",
	},
	{
		name: "Ultimate consignee",
		value: "UC",
		description:
			"Party who has been designated on the invoice or packing list as the final recipient of the stated merchandise.",
		key: "ULTIMATE_CONSIGNEE",
	},
	{
		name: "Ultimate customer",
		value: "UD",
		description: "The final recipient of goods.",
		key: "ULTIMATE_CUSTOMER",
	},
	{
		name: "Advisor",
		value: "UE",
		description: "Identifies the advisor.",
		key: "ADVISOR",
	},
	{
		name: "Co-defendant",
		value: "UF",
		description: "Identifies the co-defendant.",
		key: "CO_DEFENDANT",
	},
	{
		name: "Merged company with retained identity",
		value: "UG",
		description: "Company whose identity has been retained from a merger.",
		key: "MERGED_COMPANY_WITH_RETAINED_IDENTITY",
	},
	{
		name: "Party represented",
		value: "UH",
		description: "Identifies the party represented.",
		key: "PARTY_REPRESENTED",
	},
	{
		name: "Unexpected handling party",
		value: "UHP",
		description:
			"Party authorized (during a voyage) to apply unexpected handling procedures or party having applied these procedures.",
		key: "UNEXPECTED_HANDLING_PARTY",
	},
	{
		name: "Assignee",
		value: "UI",
		description: "Identifies the assignee.",
		key: "ASSIGNEE",
	},
	{
		name: "Key person",
		value: "UJ",
		description: "Identifies the key person.",
		key: "KEY_PERSON",
	},
	{
		name: "Author",
		value: "UK",
		description: "Identifies the author.",
		key: "AUTHOR",
	},
	{
		name: "Ultimate parent company",
		value: "UL",
		description: "Identifies the ultimate parent company.",
		key: "ULTIMATE_PARENT_COMPANY",
	},
	{
		name: "Party not to be confused with",
		value: "UM",
		description: "Identifies a party not to be confused with another party.",
		key: "PARTY_NOT_TO_BE_CONFUSED_WITH",
	},
	{
		name: "Accountant",
		value: "UN",
		description: "Identifies the accountant.",
		key: "ACCOUNTANT",
	},
	{
		name: "Plaintiff",
		value: "UO",
		description: "Identifies the plaintiff.",
		key: "PLAINTIFF",
	},
	{
		name: "Unloading party",
		value: "UP",
		description: "A party to unload the goods.",
		key: "UNLOADING_PARTY",
	},
	{
		name: "Parent company",
		value: "UQ",
		description: "Identifies the parent company.",
		key: "PARENT_COMPANY",
	},
	{
		name: "Affiliated company",
		value: "UR",
		description: "Identifies the affiliated company.",
		key: "AFFILIATED_COMPANY",
	},
	{
		name: "Bailiff",
		value: "US",
		description: "Identifies the bailiff.",
		key: "BAILIFF",
	},
	{
		name: "Merged company",
		value: "UT",
		description: "Identifies the company involved in a merger.",
		key: "MERGED_COMPANY",
	},
	{
		name: "Defendant",
		value: "UU",
		description: "Identifies the defendant.",
		key: "DEFENDANT",
	},
	{
		name: "Petitioning creditor",
		value: "UV",
		description: "Identifies the petitioning creditor.",
		key: "PETITIONING_CREDITOR",
	},
	{
		name: "Guarantee agency",
		value: "UW",
		description: "Identifies the guarantee agency.",
		key: "GUARANTEE_AGENCY",
	},
	{
		name: "Organization group",
		value: "UX",
		description: "Identifies the organization group.",
		key: "ORGANIZATION_GROUP",
	},
	{
		name: "Subsidiary",
		value: "UY",
		description: "Identifies the subsidiary.",
		key: "SUBSIDIARY",
	},
	{
		name: "Industry association",
		value: "UZ",
		description: "Identifies the industry association.",
		key: "INDUSTRY_ASSOCIATION",
	},
	{
		name: "Joint owner",
		value: "VA",
		description: "Identifies the joint owner.",
		key: "JOINT_OWNER",
	},
	{
		name: "Joint venture",
		value: "VB",
		description: "Identifies the joint venture.",
		key: "JOINT_VENTURE",
	},
	{
		name: "Filing office",
		value: "VC",
		description: "Identifies the filing office.",
		key: "FILING_OFFICE",
	},
	{
		name: "Court",
		value: "VE",
		description: "Identifies the court.",
		key: "COURT",
	},
	{
		name: "Liability holder",
		value: "VF",
		description: "Identifies the liability holder.",
		key: "LIABILITY_HOLDER",
	},
	{
		name: "Local government sponsor",
		value: "VG",
		description: "Identifies the local government sponsor.",
		key: "LOCAL_GOVERNMENT_SPONSOR",
	},
	{
		name: "Mortgage company",
		value: "VH",
		description: "Identifies the mortgage company.",
		key: "MORTGAGE_COMPANY",
	},
	{
		name: "Notary public",
		value: "VI",
		description: "Identifies the notary public.",
		key: "NOTARY_PUBLIC",
	},
	{
		name: "Officer",
		value: "VJ",
		description: "Identifies the officer.",
		key: "OFFICER",
	},
	{
		name: "Publisher",
		value: "VK",
		description: "Identifies the publisher.",
		key: "PUBLISHER",
	},
	{
		name: "Party manufactured for",
		value: "VL",
		description:
			"Identifies the party for whom manufacturing of goods is done.",
		key: "PARTY_MANUFACTURED_FOR",
	},
	{
		name: "Previous owner",
		value: "VM",
		description: "Identifies the previous owner.",
		key: "PREVIOUS_OWNER",
	},
	{
		name: "Vendor",
		value: "VN",
		description: "Party vending goods or services.",
		key: "VENDOR",
	},
	{
		name: "Purchased company",
		value: "VO",
		description: "Identifies the purchased company.",
		key: "PURCHASED_COMPANY",
	},
	{
		name: "Receiver manager",
		value: "VP",
		description:
			"Manager of a business which is in receivership status and which will not be liquidated.",
		key: "RECEIVER_MANAGER",
	},
	{
		name: "Responsible government agency",
		value: "VQ",
		description: "Identifies the responsible government agency.",
		key: "RESPONSIBLE_GOVERNMENT_AGENCY",
	},
	{
		name: "Sole proprietor",
		value: "VR",
		description: "Identifies the sole proprietor.",
		key: "SOLE_PROPRIETOR",
	},
	{
		name: "Auctioneer",
		value: "VS",
		description: "Identifies the auctioneer.",
		key: "AUCTIONEER",
	},
	{
		name: "Branch",
		value: "VT",
		description: "Identifies the branch.",
		key: "BRANCH",
	},
	{
		name: "Business",
		value: "VU",
		description: "Identifies the business.",
		key: "BUSINESS",
	},
	{
		name: "Ultimate same country parent company",
		value: "VV",
		description:
			"Identifies the highest level parent company in the same country.",
		key: "ULTIMATE_SAME_COUNTRY_PARENT_COMPANY",
	},
	{
		name: "Responsible party",
		value: "VW",
		description: "Identifies the party that can be called to account.",
		key: "RESPONSIBLE_PARTY",
	},
	{
		name: "Secured party",
		value: "VX",
		description: "Identifies a party that is guaranteed against loss.",
		key: "SECURED_PARTY",
	},
	{
		name: "Other related party",
		value: "VY",
		description: "Identifies an entity as an unspecified but related party.",
		key: "OTHER_RELATED_PARTY",
	},
	{
		name: "Co-debtor",
		value: "VZ",
		description: "Identifies an entity as a joint or mutual debtor.",
		key: "CO_DEBTOR",
	},
	{
		name: "Company which holds financial interest",
		value: "WA",
		description:
			"Identifies a company which holds any financial stake in an undertaking or organization.",
		key: "COMPANY_WHICH_HOLDS_FINANCIAL_INTEREST",
	},
	{
		name: "Rating organization",
		value: "WB",
		description:
			"Identifies an organization responsible for assigning a classification or rating.",
		key: "RATING_ORGANIZATION",
	},
	{
		name: "Information reference agency",
		value: "WC",
		description: "The agency responsible for the reference of information.",
		key: "INFORMATION_REFERENCE_AGENCY",
	},
	{
		name: "Warehouse depositor",
		value: "WD",
		description: "[3004] Party depositing goods in a warehouse.",
		key: "WAREHOUSE_DEPOSITOR",
	},
	{
		name: "Compilation agency",
		value: "WE",
		description: "The agency responsible for the compilation of information.",
		key: "COMPILATION_AGENCY",
	},
	{
		name: "Information maintenance agency",
		value: "WF",
		description: "The agency responsible for the maintenance of information.",
		key: "INFORMATION_MAINTENANCE_AGENCY",
	},
	{
		name: "Information dissemination agency",
		value: "WG",
		description: "The agency responsible for the dissemination of information.",
		key: "INFORMATION_DISSEMINATION_AGENCY",
	},
	{
		name: "Warehouse keeper",
		value: "WH",
		description:
			"[3022] Party taking responsibility for goods entered into a warehouse.",
		key: "WAREHOUSE_KEEPER",
	},
	{
		name: "Inspection address",
		value: "WI",
		description: "Specifies the address for an inspection.",
		key: "INSPECTION_ADDRESS",
	},
	{
		name: "Refusal party",
		value: "WJ",
		description: "Identification of the party responsible for a refusal.",
		key: "REFUSAL_PARTY",
	},
	{
		name: "Value added network provider",
		value: "WK",
		description:
			"A party that provides telecommunications interconnectivity services in an electronic data interchange environment.",
		key: "VALUE_ADDED_NETWORK_PROVIDER",
	},
	{
		name: "Agency",
		value: "WL",
		description: "The business or establishment of an agent.",
		key: "AGENCY",
	},
	{
		name: "Works manager",
		value: "WM",
		description: "A party managing works.",
		key: "WORKS_MANAGER",
	},
	{
		name: "Party to receive order to supply",
		value: "WN",
		description:
			"Party designated by the registering party to receive a binding direction to supply something.",
		key: "PARTY_TO_RECEIVE_ORDER_TO_SUPPLY",
	},
	{
		name: "Party to receive invitation to offer",
		value: "WO",
		description: "An entity to receive an invitation to offer.",
		key: "PARTY_TO_RECEIVE_INVITATION_TO_OFFER",
	},
	{
		name: "Sub-entity",
		value: "WP",
		description: "A part into which an entity has been divided.",
		key: "SUB_ENTITY",
	},
	{
		name: "Weighting party",
		value: "WPA",
		description: "Party designated (legally accepted) to ascertain the weight.",
		key: "WEIGHTING_PARTY",
	},
	{
		name: "Doing business as",
		value: "WQ",
		description: "The name under which business is conducted.",
		key: "DOING_BUSINESS_AS",
	},
	{
		name: "Party submitting quote",
		value: "WR",
		description: "The party stating the price of something to be purchased.",
		key: "PARTY_SUBMITTING_QUOTE",
	},
	{
		name: "Wholesaler",
		value: "WS",
		description:
			"Seller of articles, often in large quantities, to be retailed by others.",
		key: "WHOLESALER",
	},
	{
		name: "Affiliated party",
		value: "WT",
		description: "A party attached or connected to another party.",
		key: "AFFILIATED_PARTY",
	},
	{
		name: "Previous name",
		value: "WU",
		description: "Name of an entity used before the current name.",
		key: "PREVIOUS_NAME",
	},
	{
		name: "Party performing task",
		value: "WV",
		description:
			"An entity responsible for performing a task to be undertaken.",
		key: "PARTY_PERFORMING_TASK",
	},
	{
		name: "Registering party",
		value: "WW",
		description: "Party performing the registration.",
		key: "REGISTERING_PARTY",
	},
	{
		name: "Inland clearance depot operator",
		value: "WX",
		description:
			"Party that offers the facility for the goods or container(s) to be cleared by customs authorities or other governmental authorities in the interior of a country.",
		key: "INLAND_CLEARANCE_DEPOT_OPERATOR",
	},
	{
		name: "Destination terminal operator",
		value: "WY",
		description:
			"Party that operates a terminal to which goods or containers are destined.",
		key: "DESTINATION_TERMINAL_OPERATOR",
	},
	{
		name: "Departure terminal operator",
		value: "WZ",
		description:
			"Party that operates a terminal from which goods or containers have departed or will depart.",
		key: "DEPARTURE_TERMINAL_OPERATOR",
	},
	{
		name: "Mutually defined",
		value: "ZZZ",
		description:
			"Party specification mutually agreed between interchanging parties. Data Element Cross Reference DataElement 3035 is used in the following Batch Segments:",
		key: "MUTUALLY_DEFINED",
	},
	{
		name: "NAD    PNA    USE",
		value: "FII",
		description:
			"DataElement 3035 is used in the following Interactive Segments:",
		key: "NAD_PNA_USE",
	},
	{
		name: "PRT",
		value: "NAA",
		description:
			"DataElement 3035 is used in the following Interactive Composite Elements: E012    E032    E966    E985    E986 Copyright United Nations, all rights reserved     UN Economic Commission for Europe Palais des Nations, CH-1211 Geneva 10, Switzerland  Tel: +41-22 917 1366 Fax: +41-22 917 0037  E-mail: TradeMaster@unece.org UN/EDIFACT Directories",
		key: "PRT",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		untdid3035: typeof untdid3035;
	}
}
registerCodelist("untdid3035", untdid3035);

export default untdid3035;
