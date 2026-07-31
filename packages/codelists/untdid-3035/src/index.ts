import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid3035 = [
	{
		value: "AA",
		name: "Party to be billed (AAR Accounting rule 11)",
		description:
			"Party to be billed in accordance with AAR Accounting rule 11.",
		key: "PARTY_TO_BE_BILLED_AAR_ACCOUNTING_RULE_11",
	},
	{
		value: "AB",
		name: "Buyer's agent/representative",
		description:
			"Third party who arranged the purchase of merchandise on behalf of the actual buyer.",
		key: "BUYER_S_AGENT_REPRESENTATIVE",
	},
	{
		value: "AE",
		name: "Declarant's agent/representative",
		description:
			"Any natural or legal person who makes a declaration to an official body on behalf of another natural or legal person, where legally permitted (CCC).",
		key: "DECLARANT_S_AGENT_REPRESENTATIVE",
	},
	{
		value: "AF",
		name: "Transit principal",
		description:
			"Natural or legal person responsible for the satisfactory performance of a Customs transit operation. Source: CCC.",
		key: "TRANSIT_PRINCIPAL",
	},
	{
		value: "AG",
		name: "Agent",
		description:
			"(3196) Party authorized to act on behalf of another party. Synonym: Representative.",
		key: "AGENT",
	},
	{
		value: "AH",
		name: "Transit principal's agent/representative",
		description: "Agent acting on behalf of the transit principal (CCC).",
		key: "TRANSIT_PRINCIPAL_S_AGENT_REPRESENTATIVE",
	},
	{
		value: "AI",
		name: "Successful job applicant",
		description: "Person who has been chosen for a job.",
		key: "SUCCESSFUL_JOB_APPLICANT",
	},
	{
		value: "AJ",
		name: "Party issuing mutually agreed codes",
		description:
			"The party which has issued all mutually agreed codes used in the message.",
		key: "PARTY_ISSUING_MUTUALLY_AGREED_CODES",
	},
	{
		value: "AK",
		name: "Acknowledgement recipient",
		description: "Party to whom acknowledgement should be sent.",
		key: "ACKNOWLEDGEMENT_RECIPIENT",
	},
	{
		value: "AL",
		name: "Principal responsible party",
		description:
			"(3340) Party accepting liability for goods held or moving (e.g. transit) under a Customs authorization and - when applicable - a guarantee.",
		key: "PRINCIPAL_RESPONSIBLE_PARTY",
	},
	{
		value: "AM",
		name: "Authorized official",
		description:
			"Employee of a company or firm authorized to act on behalf of that company or firm e.g. to make a Customs declaration.",
		key: "AUTHORIZED_OFFICIAL",
	},
	{
		value: "AN",
		name: "Approved importer",
		description:
			"Person or company which is authorised by the relevant Customs authority to import goods without payment all taxes or specific taxes at the point of entry into the country.",
		key: "APPROVED_IMPORTER",
	},
	{
		value: "AO",
		name: "Account of",
		description: "Party account is assigned to.",
		key: "ACCOUNT_OF",
	},
	{
		value: "AP",
		name: "Accepting party",
		description: "(3336) Party accepting goods, products, services, etc.",
		key: "ACCEPTING_PARTY",
	},
	{
		value: "AQ",
		name: "Approved consignor",
		description:
			"Person or company approved by the relevant authority in the country to pack and export specific goods under Customs supervision.",
		key: "APPROVED_CONSIGNOR",
	},
	{
		value: "AR",
		name: "Authorized exporter",
		description:
			"Exporter authorized/approved by Customs for special Customs procedures e.g. simplified procedure.",
		key: "AUTHORIZED_EXPORTER",
	},
	{
		value: "AS",
		name: "Account servicing financial institution",
		description:
			"Identifies the financial institution servicing the account(s).",
		key: "ACCOUNT_SERVICING_FINANCIAL_INSTITUTION",
	},
	{
		value: "AT",
		name: "Authorized importer",
		description:
			"Importer authorized/approved by Customs for special Customs procedures e.g. simplified procedure.",
		key: "AUTHORIZED_IMPORTER",
	},
	{
		value: "AU",
		name: "Authorized trader (transit)",
		description:
			"Trader authorized/approved by Customs for special transit procedures e.g. simplified procedure.",
		key: "AUTHORIZED_TRADER_TRANSIT",
	},
	{
		value: "AV",
		name: "Authorizing official",
		description:
			"Party that has delegated the authority to take a certain action on behalf of a company or agency.",
		key: "AUTHORIZING_OFFICIAL",
	},
	{
		value: "AW",
		name: "Applicant's bank",
		description:
			"(3234) Financial institution which is requested to issue the documentary credit.",
		key: "APPLICANT_S_BANK",
	},
	{
		value: "AX",
		name: "Authenticating party",
		description: "Party which certifies that a document is authentic.",
		key: "AUTHENTICATING_PARTY",
	},
	{
		value: "AY",
		name: "Animal being investigated",
		description: "Animal being investigated.",
		key: "ANIMAL_BEING_INVESTIGATED",
	},
	{
		value: "AZ",
		name: "Issuing bank",
		description:
			"[3320] Financial institution which issues the documentary credit, if the applicant's bank is not acting as the issuing bank.",
		key: "ISSUING_BANK",
	},
	{
		value: "B1",
		name: "Contact bank 1",
		description:
			"Identifies an additional bank which must be informed of certain aspects of the message.",
		key: "CONTACT_BANK_1",
	},
	{
		value: "B2",
		name: "Contact bank 2",
		description:
			"Identifies an additional bank which must be informed of certain aspects of the message.",
		key: "CONTACT_BANK_2",
	},
	{
		value: "BA",
		name: "Booking agent",
		description:
			"Party acting as a booking office for transport and forwarding services.",
		key: "BOOKING_AGENT",
	},
	{
		value: "BB",
		name: "Buyer bank identification",
		description:
			"[3421]To identify a bank employed by the buyer to make a payment.",
		key: "BUYER_BANK_IDENTIFICATION",
	},
	{
		value: "BC",
		name: "Negotiating bank",
		description:
			"Financial institution to whom a negotiable documentary credit is directed.",
		key: "NEGOTIATING_BANK",
	},
	{
		value: "BD",
		name: "Documentary credit reimbursing bank",
		description:
			"[3350] A financial institution which reimburses documentary credit.",
		key: "DOCUMENTARY_CREDIT_REIMBURSING_BANK",
	},
	{
		value: "BE",
		name: "Beneficiary",
		description:
			"(3260) The ultimate recipient of the funds. Normally the account owner who is reimbursed by the payer.",
		key: "BENEFICIARY",
	},
	{
		value: "BF",
		name: "Beneficiary's bank",
		description:
			"(3422) Identifies the account servicer for the beneficiary or the payee.",
		key: "BENEFICIARY_S_BANK",
	},
	{
		value: "BG",
		name: "Employer",
		description: "A party that keeps a person in service for payment.",
		key: "EMPLOYER",
	},
	{
		value: "BH",
		name: "Previous employer",
		description: "Previous employer of a person(s).",
		key: "PREVIOUS_EMPLOYER",
	},
	{
		value: "BI",
		name: "Buyer's financial institution",
		description: "Financial institution designated by buyer to make payment.",
		key: "BUYER_S_FINANCIAL_INSTITUTION",
	},
	{
		value: "BJ",
		name: "Release to party",
		description:
			"Party to which the goods or container(s) is (are) to be released.",
		key: "RELEASE_TO_PARTY",
	},
	{
		value: "BK",
		name: "Financial institution",
		description: "Party acting as financial institution.",
		key: "FINANCIAL_INSTITUTION",
	},
	{
		value: "BL",
		name: "Bill of lading recipient",
		description: "Party to receive B/L.",
		key: "BILL_OF_LADING_RECIPIENT",
	},
	{
		value: "BM",
		name: "Insured",
		description: "[3136] Party which is the object of an insurance contract.",
		key: "INSURED",
	},
	{
		value: "BN",
		name: "Insurance beneficiary",
		description: "Party which benefits from insurance coverage.",
		key: "INSURANCE_BENEFICIARY",
	},
	{
		value: "BO",
		name: "Broker or sales office",
		description:
			"Party acting in the name of the seller as broker or as sales office.",
		key: "BROKER_OR_SALES_OFFICE",
	},
	{
		value: "BP",
		name: "Building site purchaser",
		description:
			"Party at the building site responsible for the purchasing of goods and services for that particular site.",
		key: "BUILDING_SITE_PURCHASER",
	},
	{
		value: "BQ",
		name: "Cheque drawn bank",
		description:
			"Identifies the bank on which the cheque should be drawn, as instructed by the ordering customer.",
		key: "CHEQUE_DRAWN_BANK",
	},
	{
		value: "BS",
		name: "Bill and ship to",
		description: "Party receiving goods and relevant invoice.",
		key: "BILL_AND_SHIP_TO",
	},
	{
		value: "BT",
		name: "Party to be billed for other than freight (bill to)",
		description: "Party receiving invoice excluding freight costs.",
		key: "PARTY_TO_BE_BILLED_FOR_OTHER_THAN_FREIGHT_BILL_TO",
	},
	{
		value: "BU",
		name: "Service bureau",
		description:
			"Party carrying out service bureau processing work, (e.g. a payroll bureau).",
		key: "SERVICE_BUREAU",
	},
	{
		value: "BV",
		name: "Member",
		description:
			"Member of a group (e.g. of a group of persons or a service scheme).",
		key: "MEMBER",
	},
	{
		value: "BW",
		name: "Borrower",
		description:
			"A person who acquires something temporarily with the promise or intention of returning.",
		key: "BORROWER",
	},
	{
		value: "BX",
		name: "Building site engineer",
		description:
			"Party at the building site responsible for engineering matters for that particular site.",
		key: "BUILDING_SITE_ENGINEER",
	},
	{
		value: "BY",
		name: "Buyer",
		description: "[3002] Party to which merchandise or services are sold.",
		key: "BUYER",
	},
	{
		value: "BZ",
		name: "Building site forwarder",
		description:
			"Party at the building site responsible for forwarding the received goods on that particular site.",
		key: "BUILDING_SITE_FORWARDER",
	},
	{
		value: "C1",
		name: "In care of party no. 1",
		description: "A person taking responsibility on behalf of party no. 1.",
		key: "IN_CARE_OF_PARTY_NO_1",
	},
	{
		value: "C2",
		name: "In care of party no. 2",
		description: "A person taking responsibility on behalf of party no. 2.",
		key: "IN_CARE_OF_PARTY_NO_2",
	},
	{
		value: "CA",
		name: "Carrier",
		description:
			"[3126] Party undertaking or arranging transport of goods between named points.",
		key: "CARRIER",
	},
	{
		value: "CB",
		name: "Customs broker",
		description:
			"Agent or representative or a professional Customs clearing agent who deals directly with Customs on behalf of the importer or exporter (CCC).",
		key: "CUSTOMS_BROKER",
	},
	{
		value: "CC",
		name: "Claimant",
		description: "Party who claims goods or insurance.",
		key: "CLAIMANT",
	},
	{
		value: "CD",
		name: "Agent's bank",
		description: "Bank of the agent.",
		key: "AGENT_S_BANK",
	},
	{
		value: "CE",
		name: "Ceding company",
		description: "Company which cedes something to someone.",
		key: "CEDING_COMPANY",
	},
	{
		value: "CF",
		name: "Container operator/lessee",
		description:
			"Party to whom the possession of specified property (e.g. container) has been conveyed for a period of time in return for rental payments.",
		key: "CONTAINER_OPERATOR_LESSEE",
	},
	{
		value: "CG",
		name: "Carrier's agent",
		description: "[3052] Party authorized to act for or on behalf of carrier.",
		key: "CARRIER_S_AGENT",
	},
	{
		value: "CH",
		name: "Connecting carrier",
		description:
			"Owner or operator of a transportation conveyance to which goods in a given transaction will be transferred.",
		key: "CONNECTING_CARRIER",
	},
	{
		value: "CI",
		name: "Commission processor",
		description:
			"Party who provides extra treatment to goods on commission base.",
		key: "COMMISSION_PROCESSOR",
	},
	{
		value: "CJ",
		name: "Previous member",
		description: "Previous member of a group of persons or a service scheme.",
		key: "PREVIOUS_MEMBER",
	},
	{
		value: "CK",
		name: "Empty equipment despatch party",
		description:
			"Party from whose premises empty equipment will be or has been despatched.",
		key: "EMPTY_EQUIPMENT_DESPATCH_PARTY",
	},
	{
		value: "CL",
		name: "Container location party",
		description:
			"Party from whose premises container will be or has been despatched.",
		key: "CONTAINER_LOCATION_PARTY",
	},
	{
		value: "CM",
		name: "Customs",
		description:
			"Identification of customs authority relevant to the transaction or shipment.",
		key: "CUSTOMS",
	},
	{
		value: "CN",
		name: "Consignee",
		description: "[3132] Party to which goods are consigned.",
		key: "CONSIGNEE",
	},
	{
		value: "CNX",
		name: "Cash pool top account servicing financial institution",
		description:
			"Identification of a financial institution servicing the top account of a cash pool.",
		key: "CASH_POOL_TOP_ACCOUNT_SERVICING_FINANCIAL_INSTITUTION",
	},
	{
		value: "CNY",
		name: "Cash pool level account servicing financial institution",
		description:
			"Identification of a financial institution servicing the level account of a cash pool.",
		key: "CASH_POOL_LEVEL_ACCOUNT_SERVICING_FINANCIAL_INSTITUTION",
	},
	{
		value: "CNZ",
		name: "Cash pool sub-account servicing financial institution",
		description:
			"Identification of a financial institution servicing the sub-account of a cash pool.",
		key: "CASH_POOL_SUB_ACCOUNT_SERVICING_FINANCIAL_INSTITUTION",
	},
	{
		value: "CO",
		name: "Corporate office",
		description: "Identification of the Head Office within a company.",
		key: "CORPORATE_OFFICE",
	},
	{
		value: "COA",
		name: "Entity in which a financial interest is held",
		description: "Business in which a financial interest is held.",
		key: "ENTITY_IN_WHICH_A_FINANCIAL_INTEREST_IS_HELD",
	},
	{
		value: "COB",
		name: "Intermediate level parent company",
		description: "Identifies an intermediate parent company.",
		key: "INTERMEDIATE_LEVEL_PARENT_COMPANY",
	},
	{
		value: "COC",
		name: "Transshipment party",
		description: "A party responsible for transshipment.",
		key: "TRANSSHIPMENT_PARTY",
	},
	{
		value: "COD",
		name: "Quotation requesting party",
		description: "Party sending a request for a quotation.",
		key: "QUOTATION_REQUESTING_PARTY",
	},
	{
		value: "COE",
		name: "Party maintaining the codes used in the message",
		description: "The party which maintains the codes used in the message.",
		key: "PARTY_MAINTAINING_THE_CODES_USED_IN_THE_MESSAGE",
	},
	{
		value: "COF",
		name: "Party maintaining the identifiers used in the message",
		description:
			"The party which maintains the identifiers used in the message.",
		key: "PARTY_MAINTAINING_THE_IDENTIFIERS_USED_IN_THE_MESSAGE",
	},
	{
		value: "COG",
		name: "Dispatcher",
		description:
			"An individual responsible for sending something to a destination.",
		key: "DISPATCHER",
	},
	{
		value: "COH",
		name: "Submitter of sample",
		description: "An entity responsible for the submission of a sample.",
		key: "SUBMITTER_OF_SAMPLE",
	},
	{
		value: "COI",
		name: "Institutional provider",
		description: "The institution providing the service.",
		key: "INSTITUTIONAL_PROVIDER",
	},
	{
		value: "COJ",
		name: "Primary health care provider",
		description:
			"Health care provider that has primary responsibility for patient.",
		key: "PRIMARY_HEALTH_CARE_PROVIDER",
	},
	{
		value: "COK",
		name: "Assistant surgeon",
		description: "Physician assisting in surgery.",
		key: "ASSISTANT_SURGEON",
	},
	{
		value: "COL",
		name: "Admitting health care provider",
		description: "Health care provider that admitted the patient.",
		key: "ADMITTING_HEALTH_CARE_PROVIDER",
	},
	{
		value: "COM",
		name: "Referring health care provider",
		description:
			"Health care provider that referred patient to current provider of services.",
		key: "REFERRING_HEALTH_CARE_PROVIDER",
	},
	{
		value: "CON",
		name: "Supervising health care provider",
		description:
			"Health care provider that supervised the rendering of a service.",
		key: "SUPERVISING_HEALTH_CARE_PROVIDER",
	},
	{
		value: "COO",
		name: "Party providing financing",
		description: "Identifies the party providing the financing.",
		key: "PARTY_PROVIDING_FINANCING",
	},
	{
		value: "COP",
		name: "Convoying party",
		description: "Party designated to escort the transported goods.",
		key: "CONVOYING_PARTY",
	},
	{
		value: "COQ",
		name: "Nominated bank",
		description: "Identifies the nominated bank.",
		key: "NOMINATED_BANK",
	},
	{
		value: "COR",
		name: "Family member",
		description: "Identifies a family member.",
		key: "FAMILY_MEMBER",
	},
	{
		value: "COS",
		name: "Co-participant",
		description: "Identifies another party who participates in an activity.",
		key: "CO_PARTICIPANT",
	},
	{
		value: "COT",
		name: "Involved party",
		description: "Party which is involved in an activity.",
		key: "INVOLVED_PARTY",
	},
	{
		value: "COU",
		name: "Assigner",
		description: "Identifies the entity who assigns.",
		key: "ASSIGNER",
	},
	{
		value: "COV",
		name: "Registered principal",
		description:
			"An individual who is registered as a principal for an entity.",
		key: "REGISTERED_PRINCIPAL",
	},
	{
		value: "COW",
		name: "Freight payer on behalf of the consignor",
		description:
			"(3470) Freight payer is a third party acting on behalf of the consignor.",
		key: "FREIGHT_PAYER_ON_BEHALF_OF_THE_CONSIGNOR",
	},
	{
		value: "COX",
		name: "Freight payer on behalf of the consignee",
		description:
			"(3470) Freight payer is a third party acting on behalf of the consignee.",
		key: "FREIGHT_PAYER_ON_BEHALF_OF_THE_CONSIGNEE",
	},
	{
		value: "COY",
		name: "Party responsible for disinfection",
		description: "Party responsible for performing disinfection operations.",
		key: "PARTY_RESPONSIBLE_FOR_DISINFECTION",
	},
	{
		value: "COZ",
		name: "Party responsible for refueling",
		description: "Party responsible for performing refueling operations.",
		key: "PARTY_RESPONSIBLE_FOR_REFUELING",
	},
	{
		value: "CP",
		name: "Party to receive certificate of compliance",
		description:
			"Party acting for or on behalf of seller in matters concerning compliance.",
		key: "PARTY_TO_RECEIVE_CERTIFICATE_OF_COMPLIANCE",
	},
	{
		value: "CPA",
		name: "Advising bank",
		description:
			"[3190] Identifies the financial institution used by the issuing bank to advise the documentary credit.",
		key: "ADVISING_BANK",
	},
	{
		value: "CPB",
		name: "Reimbursing bank",
		description:
			"Identifies the financial institution through which the reimbursement is to be effected.",
		key: "REIMBURSING_BANK",
	},
	{
		value: "CPC",
		name: "Advise through bank",
		description:
			"Identifies the financial institution through which the advising bank is to advise.",
		key: "ADVISE_THROUGH_BANK",
	},
	{
		value: "CPD",
		name: "Charges payer at destination",
		description:
			"Party, other than the ordering party, which has to pay the charges concerning the destination operations.",
		key: "CHARGES_PAYER_AT_DESTINATION",
	},
	{
		value: "CPE",
		name: "Transport means master name",
		description:
			"[3408] Name of the Master of a means of transport such as vessel.",
		key: "TRANSPORT_MEANS_MASTER_NAME",
	},
	{
		value: "CPF",
		name: "Means of transport charterer",
		description: "Charterer of the means of transport.",
		key: "MEANS_OF_TRANSPORT_CHARTERER",
	},
	{
		value: "CPG",
		name: "Excise party",
		description: "Party to whom excise must be paid.",
		key: "EXCISE_PARTY",
	},
	{
		value: "CPH",
		name: "Copy report to",
		description: "Party receiving a copy of a report.",
		key: "COPY_REPORT_TO",
	},
	{
		value: "CPI",
		name: "Related healthcare party",
		description: "A healthcare party related to the subject.",
		key: "RELATED_HEALTHCARE_PARTY",
	},
	{
		value: "CPJ",
		name: "Clinical information provider",
		description: "Party providing clinical information.",
		key: "CLINICAL_INFORMATION_PROVIDER",
	},
	{
		value: "CPK",
		name: "Service requester",
		description: "Party requesting a service.",
		key: "SERVICE_REQUESTER",
	},
	{
		value: "CPL",
		name: "Patient admitted by",
		description: "Party who admitted a patient.",
		key: "PATIENT_ADMITTED_BY",
	},
	{
		value: "CPM",
		name: "Patient discharged to",
		description: "The party who receives the discharged patient.",
		key: "PATIENT_DISCHARGED_TO",
	},
	{
		value: "CPN",
		name: "Patient hosted by",
		description: "The party hosting the patient.",
		key: "PATIENT_HOSTED_BY",
	},
	{
		value: "CPO",
		name: "Prescriber's contact person",
		description: "Contact person for the prescriber.",
		key: "PRESCRIBER_S_CONTACT_PERSON",
	},
	{
		value: "CQ",
		name: "Cheque order",
		description:
			"Party to which the cheque will be ordered, when different from the beneficiary.",
		key: "CHEQUE_ORDER",
	},
	{
		value: "CR",
		name: "Empty equipment return party",
		description:
			"Party to whose premises empty equipment will be or has been returned.",
		key: "EMPTY_EQUIPMENT_RETURN_PARTY",
	},
	{
		value: "CS",
		name: "Consolidator",
		description: "Party consolidating various consignments, payments etc.",
		key: "CONSOLIDATOR",
	},
	{
		value: "CT",
		name: "Consignee to be specified",
		description: "The party to be identified at a later time as the consignee.",
		key: "CONSIGNEE_TO_BE_SPECIFIED",
	},
	{
		value: "CU",
		name: "Container return company",
		description: "The company to which containers have to be returned.",
		key: "CONTAINER_RETURN_COMPANY",
	},
	{
		value: "CV",
		name: "Consignee of vessel",
		description: "Party to which the vessel shall be delivered.",
		key: "CONSIGNEE_OF_VESSEL",
	},
	{
		value: "CW",
		name: "Equipment owner",
		description: "Owner of equipment (container, etc.).",
		key: "EQUIPMENT_OWNER",
	},
	{
		value: "CX",
		name: "Consignee's agent",
		description: "Party authorized to act on behalf of the consignee.",
		key: "CONSIGNEE_S_AGENT",
	},
	{
		value: "CY",
		name: "Commissionable agent",
		description: "IATA cargo agent entitled to commission.",
		key: "COMMISSIONABLE_AGENT",
	},
	{
		value: "CZ",
		name: "Consignor",
		description:
			"[3336] Party which, by contract with a carrier, consigns or sends goods with the carrier, or has them conveyed by him. Synonym: shipper, sender.",
		key: "CONSIGNOR",
	},
	{
		value: "DA",
		name: "Available with bank (documentary credits)",
		description:
			"Financial institution with whom the documentary credit is available.",
		key: "AVAILABLE_WITH_BANK_DOCUMENTARY_CREDITS",
	},
	{
		value: "DB",
		name: "Distributor branch",
		description: "The affiliate of a retailer or distributor.",
		key: "DISTRIBUTOR_BRANCH",
	},
	{
		value: "DC",
		name: "Deconsolidator",
		description:
			"Party that splits up a large consignment composed of separate consignments of goods. The smaller consignments of goods were grouped together into that large consignment for carriage as a larger unit in order to obtain a reduced rate.",
		key: "DECONSOLIDATOR",
	},
	{
		value: "DCP",
		name: "Despatch charge payer",
		description:
			"Party, other than the ordering party, which has to pay the charges concerning the despatch operations.",
		key: "DESPATCH_CHARGE_PAYER",
	},
	{
		value: "DCQ",
		name: "Prescription database owner",
		description: "Organisation or person owning a prescription database.",
		key: "PRESCRIPTION_DATABASE_OWNER",
	},
	{
		value: "DCR",
		name: "Original prescriber",
		description: "The doctor who issued the original prescription.",
		key: "ORIGINAL_PRESCRIBER",
	},
	{
		value: "DCS",
		name: "Temporary employee",
		description: "A person employed on a temporary basis.",
		key: "TEMPORARY_EMPLOYEE",
	},
	{
		value: "DCT",
		name: "Designer",
		description: "A party who designs.",
		key: "DESIGNER",
	},
	{
		value: "DCU",
		name: "Quotation delivered to",
		description: "Party to whom the quotation is to be or has been delivered.",
		key: "QUOTATION_DELIVERED_TO",
	},
	{
		value: "DCV",
		name: "Developer",
		description: "A party who develops.",
		key: "DEVELOPER",
	},
	{
		value: "DCW",
		name: "Test execution party",
		description: "The party performing a test.",
		key: "TEST_EXECUTION_PARTY",
	},
	{
		value: "DCX",
		name: "Party to receive refund",
		description: "Party to whom a refund is given.",
		key: "PARTY_TO_RECEIVE_REFUND",
	},
	{
		value: "DCY",
		name: "Authorised issuer of prescription",
		description: "Party authorised to issue a prescription.",
		key: "AUTHORISED_ISSUER_OF_PRESCRIPTION",
	},
	{
		value: "DCZ",
		name: "Authorised dispenser of medicine",
		description: "Organisation or person authorised to dispense medicine.",
		key: "AUTHORISED_DISPENSER_OF_MEDICINE",
	},
	{
		value: "DD",
		name: "Documentary credit account party's bank",
		description: "Bank of the documentary credit account party.",
		key: "DOCUMENTARY_CREDIT_ACCOUNT_PARTY_S_BANK",
	},
	{
		value: "DDA",
		name: "Report responsible party",
		description: "The party or person taking responsibility for a report.",
		key: "REPORT_RESPONSIBLE_PARTY",
	},
	{
		value: "DDB",
		name: "Initial sender",
		description: "The party who does the initial sending.",
		key: "INITIAL_SENDER",
	},
	{
		value: "DDC",
		name: "The party authorising the original prescription",
		description:
			"The party authorising the issuer of the original prescription.",
		key: "THE_PARTY_AUTHORISING_THE_ORIGINAL_PRESCRIPTION",
	},
	{
		value: "DDD",
		name: "Applicant",
		description: "A party who applies for something.",
		key: "APPLICANT",
	},
	{
		value: "DDE",
		name: "Meter reader",
		description: "A party physically reading the meter.",
		key: "METER_READER",
	},
	{
		value: "DDF",
		name: "Primary electronic business contact",
		description:
			"Code specifying a party who serves as a business entity's primary contact for matters related to electronic business.",
		key: "PRIMARY_ELECTRONIC_BUSINESS_CONTACT",
	},
	{
		value: "DDG",
		name: "Alternate electronic business contact",
		description:
			"Code specifying a party who serves as a business entity's alternate contact for matters related to electronic business.",
		key: "ALTERNATE_ELECTRONIC_BUSINESS_CONTACT",
	},
	{
		value: "DDH",
		name: "Primary government business contact",
		description:
			"Code specifying a party who serves as a business entity's primary contact for matters related to doing business with the government.",
		key: "PRIMARY_GOVERNMENT_BUSINESS_CONTACT",
	},
	{
		value: "DDI",
		name: "Alternate government business contact",
		description:
			"Code specifying a party who serves as a business entity's alternate contact for matters related to doing business with the government.",
		key: "ALTERNATE_GOVERNMENT_BUSINESS_CONTACT",
	},
	{
		value: "DDJ",
		name: "Past performance contact",
		description:
			"Code specifying a party who serves as a business entity's contact for matters related to the past performance of that entity.",
		key: "PAST_PERFORMANCE_CONTACT",
	},
	{
		value: "DDK",
		name: "Balance responsible party",
		description: "A party responsible for balancing supply and consumption.",
		key: "BALANCE_RESPONSIBLE_PARTY",
	},
	{
		value: "DDL",
		name: "Group of passengers",
		description:
			"A group of persons conveyed by a means of transport, other than the crew.",
		key: "GROUP_OF_PASSENGERS",
	},
	{
		value: "DDM",
		name: "Grid operator",
		description: "A party operating a grid.",
		key: "GRID_OPERATOR",
	},
	{
		value: "DDN",
		name: "First financial institution in the transaction chain",
		description:
			"Identifies the financial institution that is the point of entry into the interbank transaction chain.",
		key: "FIRST_FINANCIAL_INSTITUTION_IN_THE_TRANSACTION_CHAIN",
	},
	{
		value: "DDO",
		name: "Location manager",
		description: "Party responsible for the management of the location.",
		key: "LOCATION_MANAGER",
	},
	{
		value: "DDP",
		name: "Group leader",
		description: "Party responsible for leading the group.",
		key: "GROUP_LEADER",
	},
	{
		value: "DDQ",
		name: "Energy Supplier",
		description:
			"A party supplying energy to a party connected to the grid at an accounting point. In case of a surplus, the energy supplier may also take back energy.",
		key: "ENERGY_SUPPLIER",
	},
	{
		value: "DDR",
		name: "Consignor's freight forwarder",
		description:
			"Identification of freight forwarder giving services to the consignor.",
		key: "CONSIGNOR_S_FREIGHT_FORWARDER",
	},
	{
		value: "DDS",
		name: "Consignee's freight forwarder",
		description:
			"Identification of freight forwarder giving services to the consignee.",
		key: "CONSIGNEE_S_FREIGHT_FORWARDER",
	},
	{
		value: "DDT",
		name: "In transit crew member",
		description:
			"The movement of a crew member from one country to another via the territory of an intermediate country for which no entry is intended.",
		key: "IN_TRANSIT_CREW_MEMBER",
	},
	{
		value: "DDU",
		name: "In transit passenger",
		description:
			"The movement of a passenger from one country to another via the territory of an intermediate country for which no entry is intended.",
		key: "IN_TRANSIT_PASSENGER",
	},
	{
		value: "DDV",
		name: "Energy consumption imbalance responsible party",
		description:
			"A party who can be brought to rights, legally and financially, for any imbalance between energy bought and consumed for all associated metering points.",
		key: "ENERGY_CONSUMPTION_IMBALANCE_RESPONSIBLE_PARTY",
	},
	{
		value: "DDW",
		name: "Energy production imbalance responsible party",
		description:
			"A party who can be brought to rights, legally and financially, for any imbalance between energy sold and produced for all associated metering points.",
		key: "ENERGY_PRODUCTION_IMBALANCE_RESPONSIBLE_PARTY",
	},
	{
		value: "DDX",
		name: "Imbalance settlement responsible party",
		description:
			"A party that is responsible for settlement of the difference between planned and realised quantities.",
		key: "IMBALANCE_SETTLEMENT_RESPONSIBLE_PARTY",
	},
	{
		value: "DDY",
		name: "Transmission capacity allocator",
		description: "A party managing the allocation of transmission capacity.",
		key: "TRANSMISSION_CAPACITY_ALLOCATOR",
	},
	{
		value: "DDZ",
		name: "Metering point administrator",
		description:
			"A party responsible for registering the technical specifications of metering points and the parties linked to them.",
		key: "METERING_POINT_ADMINISTRATOR",
	},
	{
		value: "DE",
		name: "Depositor",
		description: "Party depositing goods, financial payments or documents.",
		key: "DEPOSITOR",
	},
	{
		value: "DEA",
		name: "Metered data aggregator",
		description: "A party responsible for aggregation of metered data.",
		key: "METERED_DATA_AGGREGATOR",
	},
	{
		value: "DEB",
		name: "Meter operator",
		description:
			"A party responsible for the operation of a meter, including installing  maintaining, testing, certifying and decommissioning.",
		key: "METER_OPERATOR",
	},
	{
		value: "DEC",
		name: "Party connected to grid",
		description:
			"A party that contracts for the right to consume or produce electricity at a metering point.",
		key: "PARTY_CONNECTED_TO_GRID",
	},
	{
		value: "DED",
		name: "Profile maintenance party",
		description: "A party that maintains profiles.",
		key: "PROFILE_MAINTENANCE_PARTY",
	},
	{
		value: "DEE",
		name: "Stowaway",
		description:
			"A person who hides on a conveyance in order to obtain free passage.",
		key: "STOWAWAY",
	},
	{
		value: "DEF",
		name: "Meat cutter",
		description: "Person whose job is to cut up and/or mince meat.",
		key: "MEAT_CUTTER",
	},
	{
		value: "DEG",
		name: "Consortium Carrier (maritime)",
		description:
			"A marine carrier that transports goods for more than one shipping line between named points.",
		key: "CONSORTIUM_CARRIER_MARITIME",
	},
	{
		value: "DEH",
		name: "Non-vessel operating carrier",
		description: "A carrier that does not operate the vessel.",
		key: "NON_VESSEL_OPERATING_CARRIER",
	},
	{
		value: "DEI",
		name: "Means of transport operator",
		description:
			"The operator of a means of transport, e.g. the captain of a vessel.",
		key: "MEANS_OF_TRANSPORT_OPERATOR",
	},
	{
		value: "DEJ",
		name: "Stuffing address",
		description:
			"Address where cargo is loaded into the transport equipment e.g. container. Synonyms; vanning address / place of vanning.",
		key: "STUFFING_ADDRESS",
	},
	{
		value: "DEK",
		name: "Mooring service provider",
		description:
			"Party responsible for mooring the vessel at the berth in the port. Synonym: Boatmen.",
		key: "MOORING_SERVICE_PROVIDER",
	},
	{
		value: "DEL",
		name: "Pilotage service provider",
		description: "Party responsible for the pilotage of the vessel.",
		key: "PILOTAGE_SERVICE_PROVIDER",
	},
	{
		value: "DEM",
		name: "Berth towage service provider",
		description:
			"Party responsible for towing the vessel to/from the berth in the port.",
		key: "BERTH_TOWAGE_SERVICE_PROVIDER",
	},
	{
		value: "DEN",
		name: "Agent/representative, direct representation",
		description:
			"Party authorised to act in the name and on behalf of another person.",
		key: "AGENT_REPRESENTATIVE_DIRECT_REPRESENTATION",
	},
	{
		value: "DEO",
		name: "Agent/representative, indirect representation",
		description:
			"Party authorised to act in its own name but on behalf of another person.",
		key: "AGENT_REPRESENTATIVE_INDIRECT_REPRESENTATION",
	},
	{
		value: "DEP",
		name: "Stevedore",
		description:
			"A party which handles the loading and unloading of marine vessels from several terminals.",
		key: "STEVEDORE",
	},
	{
		value: "DEQ",
		name: "Shipper",
		description: "Party responsible for the shipment of goods.",
		key: "SHIPPER",
	},
	{
		value: "DER",
		name: "Source data pool",
		description:
			"A data pool that supports the functionality required by a data source such as data loading, publication, notification, registration, etc.",
		key: "SOURCE_DATA_POOL",
	},
	{
		value: "DES",
		name: "Brand owner",
		description: "The owner of a brand.",
		key: "BRAND_OWNER",
	},
	{
		value: "DET",
		name: "Cockpit crew",
		description: "Cockpit crew and personnel inside cockpit.",
		key: "COCKPIT_CREW",
	},
	{
		value: "DEU",
		name: "Cabin crew",
		description: "Crew members operating in passenger cabin.",
		key: "CABIN_CREW",
	},
	{
		value: "DEV",
		name: "Airline operations management, not in cockpit",
		description:
			"Personnel of the airline operations management department positioned outside the cockpit.",
		key: "AIRLINE_OPERATIONS_MANAGEMENT_NOT_IN_COCKPIT",
	},
	{
		value: "DEW",
		name: "Cargo non-cockpit crew and/or non-crew personnel",
		description:
			"Employees of the carrier, cargo groomers, or special cargo handlers, that are not authorized to ride in the cockpit.",
		key: "CARGO_NON_COCKPIT_CREW_AND_OR_NON_CREW_PERSONNEL",
	},
	{
		value: "DEX",
		name: "Pilots seated outside cockpit",
		description:
			"Pilots currently not in charge of flying the aircraft and not present in the cockpit.",
		key: "PILOTS_SEATED_OUTSIDE_COCKPIT",
	},
	{
		value: "DEY",
		name: "Commercial verifier",
		description:
			"A party recognized under relevant legislation to undertake official verification.",
		key: "COMMERCIAL_VERIFIER",
	},
	{
		value: "DEZ",
		name: "Authorized issuer",
		description:
			"A person authorized under relevant legislation for the purpose of issuing official assurances.",
		key: "AUTHORIZED_ISSUER",
	},
	{
		value: "DF",
		name: "Documentary credit applicant",
		description:
			"[3198] Party at whose request the applicant's bank/issuing bank is to issue a documentary credit.",
		key: "DOCUMENTARY_CREDIT_APPLICANT",
	},
	{
		value: "DFA",
		name: "Bank for deposit of duties/taxes/fees",
		description:
			"Bank that is authorized to receive the deposit for duties, taxes, and fees.",
		key: "BANK_FOR_DEPOSIT_OF_DUTIES_TAXES_FEES",
	},
	{
		value: "DFB",
		name: "Company security officer (IMO Circular MSC 1130)",
		description:
			"The company security officer as described in IMO Circular MSC 1130.",
		key: "COMPANY_SECURITY_OFFICER_IMO_CIRCULAR_MSC_1130",
	},
	{
		value: "DFC",
		name: "Distiller",
		description: "The party providing distillation services.",
		key: "DISTILLER",
	},
	{
		value: "DFD",
		name: "Drayman/lighterman",
		description:
			"The bonded (insured) party that moves goods within port limits.",
		key: "DRAYMAN_LIGHTERMAN",
	},
	{
		value: "DFE",
		name: "Exhibitor",
		description: "The party who offers items for exhibit or show.",
		key: "EXHIBITOR",
	},
	{
		value: "DFF",
		name: "Feedlot",
		description: "A commercial establishment that feeds livestock.",
		key: "FEEDLOT",
	},
	{
		value: "DFG",
		name: "Government official",
		description:
			"A person appointed to some position of responsibility or authority in the government.",
		key: "GOVERNMENT_OFFICIAL",
	},
	{
		value: "DFH",
		name: "Government service requestor",
		description:
			"The party requesting inspection, grading, or other government service.",
		key: "GOVERNMENT_SERVICE_REQUESTOR",
	},
	{
		value: "DFI",
		name: "Crop grower",
		description: "The party who grows crops.",
		key: "CROP_GROWER",
	},
	{
		value: "DFJ",
		name: "ISPS Responsible Party",
		description:
			"The responsible party as identified and defined in the International Ship and Port Facility Security Code (ISPS).",
		key: "ISPS_RESPONSIBLE_PARTY",
	},
	{
		value: "DFK",
		name: "LPCO authorized party",
		description:
			"The party to whom the License, Permit, Certificate, or Other required document (LPCO) is issued.",
		key: "LPCO_AUTHORIZED_PARTY",
	},
	{
		value: "DFL",
		name: "Operator of property, registered",
		description: "The registered operator of the property.",
		key: "OPERATOR_OF_PROPERTY_REGISTERED",
	},
	{
		value: "DFM",
		name: "Organic growth certifier, accredited",
		description:
			"An organization that is accredited to certify organic growth processes.",
		key: "ORGANIC_GROWTH_CERTIFIER_ACCREDITED",
	},
	{
		value: "DFN",
		name: "Party holding Certificate of Financial Responsibility",
		description:
			"The party holding the Certificate of Financial Responsibility (COFR).",
		key: "PARTY_HOLDING_CERTIFICATE_OF_FINANCIAL_RESPONSIBILITY",
	},
	{
		value: "DFO",
		name: "Port facility security officer",
		description:
			"The individual (person) designated as the port facility security officer responsible for port security requirements.",
		key: "PORT_FACILITY_SECURITY_OFFICER",
	},
	{
		value: "DFP",
		name: "Vehicle owner",
		description: "The owner of the vehicle.",
		key: "VEHICLE_OWNER",
	},
	{
		value: "DFQ",
		name: "Security certificate issuer, recognized",
		description: "Organization recogized for issuing security certificates.",
		key: "SECURITY_CERTIFICATE_ISSUER_RECOGNIZED",
	},
	{
		value: "DFR",
		name: "Ship Security Officer",
		description: "The person who is appointed as Ship Security Officer (SSO).",
		key: "SHIP_SECURITY_OFFICER",
	},
	{
		value: "DFS",
		name: "Certificate issuer, veterinary",
		description: "The person who issues veterinary certificates.",
		key: "CERTIFICATE_ISSUER_VETERINARY",
	},
	{
		value: "DFT",
		name: "Assembler",
		description:
			"The party putting together various components or parts into a product or commodity.",
		key: "ASSEMBLER",
	},
	{
		value: "DFU",
		name: "Competitor",
		description: "The party is a competitor.",
		key: "COMPETITOR",
	},
	{
		value: "DFV",
		name: "Right holder",
		description:
			"Party holding exclusive rights to a protected intellectual property.",
		key: "RIGHT_HOLDER",
	},
	{
		value: "DFW",
		name: "Authorised Economic Operator (AEO)",
		description:
			"Party approved by Customs as complying with WCO or equivalent supply-chain security standards.",
		key: "AUTHORISED_ECONOMIC_OPERATOR_AEO",
	},
	{
		value: "DFX",
		name: "Manufacturer of equipment",
		description: "Party who manufactures equipment.",
		key: "MANUFACTURER_OF_EQUIPMENT",
	},
	{
		value: "DFY",
		name: "Crew other ship",
		description: "Crew for another vessel.",
		key: "CREW_OTHER_SHIP",
	},
	{
		value: "DFZ",
		name: "Article information responsible party",
		description: "The party responsible for article information.",
		key: "ARTICLE_INFORMATION_RESPONSIBLE_PARTY",
	},
	{
		value: "DG",
		name: "Documentary credit beneficiary",
		description:
			"Party in whose favour the documentary credit is to be issued and the party that must comply with the credit's terms and conditions.",
		key: "DOCUMENTARY_CREDIT_BENEFICIARY",
	},
	{
		value: "DGA",
		name: "Price information responsible party",
		description: "The party responsible for price information.",
		key: "PRICE_INFORMATION_RESPONSIBLE_PARTY",
	},
	{
		value: "DGB",
		name: "Invoice processing party",
		description:
			"Party to whom the invoice is sent and who processes the invoice on behalf of the invoicee. Note, the invoicee is legally responsible for the invoice and can be different to the processing party.",
		key: "INVOICE_PROCESSING_PARTY",
	},
	{
		value: "DGC",
		name: "Logistic service provider",
		description:
			"A party providing logistic services for another party (e.g re-packing suppliers products).",
		key: "LOGISTIC_SERVICE_PROVIDER",
	},
	{
		value: "DGD",
		name: "Fattener",
		description: "Party which provides fattening service.",
		key: "FATTENER",
	},
	{
		value: "DGE",
		name: "Breeder",
		description: "Party which provides breeding service.",
		key: "BREEDER",
	},
	{
		value: "DGF",
		name: "Calorific Value Responsible",
		description:
			"A party responsible for establishing the calorific value for a set of Metering points.",
		key: "CALORIFIC_VALUE_RESPONSIBLE",
	},
	{
		value: "DGG",
		name: "Balancing Service Provider",
		description:
			"A party with reserve-providing units or reserve- providing groups able to provide balancing services to one or more LFC Operators.",
		key: "BALANCING_SERVICE_PROVIDER",
	},
	{
		value: "DGH",
		name: "Consent Administrator",
		description:
			"A party responsible for keeping a register of consents for a domain. The Consent Administrator makes this information available on request for entitled parties in the sector.",
		key: "CONSENT_ADMINISTRATOR",
	},
	{
		value: "DGI",
		name: "Energy Service Company (ESCO)",
		description:
			"A party offering energy-related services to the Party Connected to Grid, but not directly active in the energy value chain or the physical infrastructure itself. The ESCO may provide insight services as well as energy management services.",
		key: "ENERGY_SERVICE_COMPANY_ESCO",
	},
	{
		value: "DGJ",
		name: "Resource Aggregator",
		description:
			"A party that aggregates resources for usage by a service provider for energy market services.",
		key: "RESOURCE_AGGREGATOR",
	},
	{
		value: "DGK",
		name: "Resource Provider",
		description:
			"A role that manages a resource and provides production/consumption schedules for it, if required.",
		key: "RESOURCE_PROVIDER",
	},
	{
		value: "DGL",
		name: "Metered Data Administrator",
		description:
			"A party responsible for storing and distributing validated measured data.",
		key: "METERED_DATA_ADMINISTRATOR",
	},
	{
		value: "DGM",
		name: "Consumer",
		description:
			"The person who purchases goods and services for personal use.",
		key: "CONSUMER",
	},
	{
		value: "DGN",
		name: "Farmer",
		description:
			"The party engaged in agriculture business, field crop growing, cattle rearing and other productions (hides, milk, wool, etc).",
		key: "FARMER",
	},
	{
		value: "DGO",
		name: "Recycler",
		description:
			"The party who collects waste in�order�to�produce�materials�that can be used again.",
		key: "RECYCLER",
	},
	{
		value: "DGP",
		name: "Retailer",
		description:
			"The party who sells goods to the public in relatively small quantities for use or consumption rather than for resale.",
		key: "RETAILER",
	},
	{
		value: "DGQ",
		name: "Second Party",
		description: "The party related to another party.",
		key: "SECOND_PARTY",
	},
	{
		value: "DGR",
		name: "Waste Disposal Provider",
		description: "The party providing waste disposal services.",
		key: "WASTE_DISPOSAL_PROVIDER",
	},
	{
		value: "DGS",
		name: "Tanner",
		description: "The party who processes animals skins with tanning agents.",
		key: "TANNER",
	},
	{
		value: "DGT",
		name: "Service Provider",
		description: "The party who provides a service.",
		key: "SERVICE_PROVIDER",
	},
	{
		value: "DGU",
		name: "Ginner",
		description:
			"The party who uses a machine in order to clean cotton fibre, flax fibre etc.",
		key: "GINNER",
	},
	{
		value: "DGV",
		name: "Spinner",
		description: "The party who makes thread by spinning.",
		key: "SPINNER",
	},
	{
		value: "DGW",
		name: "Weaver",
		description: "The party who weaves fabric.",
		key: "WEAVER",
	},
	{
		value: "DH",
		name: "Documentary credit account party",
		description:
			"Party which is responsible for the payment settlement of the documentary credit with the applicant's bank/issuing bank, if different from the documentary credit applicant.",
		key: "DOCUMENTARY_CREDIT_ACCOUNT_PARTY",
	},
	{
		value: "DI",
		name: "Documentary credit second beneficiary",
		description: "Party to whom the documentary credit can be transferred.",
		key: "DOCUMENTARY_CREDIT_SECOND_BENEFICIARY",
	},
	{
		value: "DJ",
		name: "Party according to documentary credit transaction",
		description: "Party related to documentary credit transaction.",
		key: "PARTY_ACCORDING_TO_DOCUMENTARY_CREDIT_TRANSACTION",
	},
	{
		value: "DK",
		name: "Documentary credit beneficiary's bank",
		description:
			"Financial institution with which the beneficiary of the documentary credit maintains an account.",
		key: "DOCUMENTARY_CREDIT_BENEFICIARY_S_BANK",
	},
	{
		value: "DL",
		name: "Factor",
		description:
			"Company offering a financial service whereby a firm sells or transfers title to its accounts receivable to the factoring company.",
		key: "FACTOR",
	},
	{
		value: "DM",
		name: "Party to whom documents are to be presented",
		description: "Party to whom documents are to be presented.",
		key: "PARTY_TO_WHOM_DOCUMENTS_ARE_TO_BE_PRESENTED",
	},
	{
		value: "DN",
		name: "Owner of operation",
		description: "Owner of the operation.",
		key: "OWNER_OF_OPERATION",
	},
	{
		value: "DO",
		name: "Document recipient",
		description: "[1370] Party which should receive a specified document.",
		key: "DOCUMENT_RECIPIENT",
	},
	{
		value: "DP",
		name: "Delivery party",
		description:
			"[3144] Party to which goods should be delivered, if not identical with consignee, such as the place where a container is to be, or has been, positioned.",
		key: "DELIVERY_PARTY",
	},
	{
		value: "DQ",
		name: "Owner's agent",
		description: "Person acting on delegation of powers of the owner.",
		key: "OWNER_S_AGENT",
	},
	{
		value: "DR",
		name: "Driver",
		description: "Person who drives a means of transport.",
		key: "DRIVER",
	},
	{
		value: "DS",
		name: "Distributor",
		description: "Party distributing goods, financial payments or documents.",
		key: "DISTRIBUTOR",
	},
	{
		value: "DT",
		name: "Declarant",
		description:
			"[3140] Party which makes a declaration to an official body or - where legally permitted - in whose name, or on whose behalf, a declaration to an official body is made.",
		key: "DECLARANT",
	},
	{
		value: "DU",
		name: "Owner's representative",
		description:
			"Person commissioned by the owner to represent him in certain circumstances.",
		key: "OWNER_S_REPRESENTATIVE",
	},
	{
		value: "DV",
		name: "Project management office",
		description:
			"Party commissioned by the owner to follow through the execution of all works.",
		key: "PROJECT_MANAGEMENT_OFFICE",
	},
	{
		value: "DW",
		name: "Drawee",
		description: "(3290) Party on whom drafts must be drawn.",
		key: "DRAWEE",
	},
	{
		value: "DX",
		name: "Engineer (construction)",
		description:
			"Party representing the contractor to advise and supervise engineering aspects of the works.",
		key: "ENGINEER_CONSTRUCTION",
	},
	{
		value: "DY",
		name: "Engineer, resident (construction)",
		description:
			"Party commissioned by the owner to advise and supervise engineering aspects of the works.",
		key: "ENGINEER_RESIDENT_CONSTRUCTION",
	},
	{
		value: "DZ",
		name: "Architect",
		description:
			"A designer who prepares plans for buildings, ships, etc. and supervises their construction.",
		key: "ARCHITECT",
	},
	{
		value: "EA",
		name: "Architect-designer",
		description: "Designer of the construction project.",
		key: "ARCHITECT_DESIGNER",
	},
	{
		value: "EB",
		name: "Building inspectorate",
		description:
			"Party controlling the conformity of works to legal and regulation rules.",
		key: "BUILDING_INSPECTORATE",
	},
	{
		value: "EC",
		name: "Exchanger",
		description: "Party exchanging currencies or goods.",
		key: "EXCHANGER",
	},
	{
		value: "ED",
		name: "Engineer, consultant",
		description: "Party providing professional engineering services.",
		key: "ENGINEER_CONSULTANT",
	},
	{
		value: "EE",
		name: "Location of goods for customs examination before clearance",
		description:
			"The location where the goods are examined by customs before clearance.",
		key: "LOCATION_OF_GOODS_FOR_CUSTOMS_EXAMINATION_BEFORE_CLEARANCE",
	},
	{
		value: "EF",
		name: "Project coordination office",
		description: "Party responsible for technical coordination of works.",
		key: "PROJECT_COORDINATION_OFFICE",
	},
	{
		value: "EG",
		name: "Surveyor, topographical",
		description: "Party responsible for topographical measurements.",
		key: "SURVEYOR_TOPOGRAPHICAL",
	},
	{
		value: "EH",
		name: "Engineer, measurement",
		description: "Party responsible for quantity measurements.",
		key: "ENGINEER_MEASUREMENT",
	},
	{
		value: "EI",
		name: "Controller, quality",
		description:
			"Party controlling the quality of goods and workmanship for the project.",
		key: "CONTROLLER_QUALITY",
	},
	{
		value: "EJ",
		name: "Surveyor, quantity",
		description:
			"Party responsible for the quantification and valuation of the works on behalf of the contractor.",
		key: "SURVEYOR_QUANTITY",
	},
	{
		value: "EK",
		name: "Surveyor (professional), quantity",
		description:
			"Party responsible to the owner for the quantification and valuation of the works.",
		key: "SURVEYOR_PROFESSIONAL_QUANTITY",
	},
	{
		value: "EL",
		name: "Project",
		description:
			"Party responsible for a project, e.g. a construction project.",
		key: "PROJECT",
	},
	{
		value: "EM",
		name: "Party to receive electronic memo of invoice",
		description: "Party being informed about invoice issue (via EDI).",
		key: "PARTY_TO_RECEIVE_ELECTRONIC_MEMO_OF_INVOICE",
	},
	{
		value: "EN",
		name: "Tenderer",
		description: "Firm answering an invitation to tender.",
		key: "TENDERER",
	},
	{
		value: "EO",
		name: "Owner of equipment",
		description: "Party who owns equipment.",
		key: "OWNER_OF_EQUIPMENT",
	},
	{
		value: "EP",
		name: "Equipment drop-off party",
		description: "The party which drops off equipment.",
		key: "EQUIPMENT_DROP_OFF_PARTY",
	},
	{
		value: "EQ",
		name: "Empty container responsible party",
		description: "Party responsible for the empty container.",
		key: "EMPTY_CONTAINER_RESPONSIBLE_PARTY",
	},
	{
		value: "ER",
		name: "Empty container return agent",
		description:
			"Party, designated by owner of containers, responsible for their collection as agreed between the owner and customer/ consignee.",
		key: "EMPTY_CONTAINER_RETURN_AGENT",
	},
	{
		value: "ES",
		name: "Contractor, lead",
		description: "Leader representing a grouping of co-contractors.",
		key: "CONTRACTOR_LEAD",
	},
	{
		value: "ET",
		name: "Co-contractor",
		description: "Member of a grouping of co-contractors.",
		key: "CO_CONTRACTOR",
	},
	{
		value: "EU",
		name: "Contractor, general",
		description:
			"Single contractor for the whole construction project, working by his own or with subcontractors.",
		key: "CONTRACTOR_GENERAL",
	},
	{
		value: "EV",
		name: "Subcontractor",
		description: "Firm carrying out a part of the works for a contractor.",
		key: "SUBCONTRACTOR",
	},
	{
		value: "EW",
		name: "Subcontractor with direct payment",
		description: "Subcontractor benefiting from direct payments.",
		key: "SUBCONTRACTOR_WITH_DIRECT_PAYMENT",
	},
	{
		value: "EX",
		name: "Exporter",
		description:
			"[3030] Party who makes, or on whose behalf the export declaration is made, and who is the owner of the goods or has similar rights of disposal over them at the time when the declaration is accepted.",
		key: "EXPORTER",
	},
	{
		value: "EY",
		name: "Subcontractor, nominated",
		description:
			"Subcontractor authorized by the owner after having been proposed.",
		key: "SUBCONTRACTOR_NOMINATED",
	},
	{
		value: "EZ",
		name: "Operator, essential services",
		description:
			"Operator of essential services e.g. water, sewerage system, power.",
		key: "OPERATOR_ESSENTIAL_SERVICES",
	},
	{
		value: "FA",
		name: "Operator, communication channel",
		description: "Operator of a communication channel.",
		key: "OPERATOR_COMMUNICATION_CHANNEL",
	},
	{
		value: "FB",
		name: "Nominated freight company",
		description:
			"Party nominated to act as transport company or carrier for the goods.",
		key: "NOMINATED_FREIGHT_COMPANY",
	},
	{
		value: "FC",
		name: "Contractor, main",
		description:
			"Firm or grouping of co-contractors which has been awarded the contract.",
		key: "CONTRACTOR_MAIN",
	},
	{
		value: "FD",
		name: "Buyer's parent company",
		description: "Parent company, e.g. holding company.",
		key: "BUYER_S_PARENT_COMPANY",
	},
	{
		value: "FE",
		name: "Credit rating agency",
		description: "A party which evaluates another party for credit rating.",
		key: "CREDIT_RATING_AGENCY",
	},
	{
		value: "FF",
		name: "Factor, correspondent",
		description:
			"Factoring company engaged by another factoring company to assist the letter with the services provided to the clients (sellers).",
		key: "FACTOR_CORRESPONDENT",
	},
	{
		value: "FG",
		name: "Buyer as officially registered",
		description: "Buying party as officially registered with government.",
		key: "BUYER_AS_OFFICIALLY_REGISTERED",
	},
	{
		value: "FH",
		name: "Seller as officially registered",
		description: "Selling party as officially registered with government.",
		key: "SELLER_AS_OFFICIALLY_REGISTERED",
	},
	{
		value: "FI",
		name: "Copy message to",
		description: "Party that is to receive a copy of a message.",
		key: "COPY_MESSAGE_TO",
	},
	{
		value: "FJ",
		name: "Trade Union",
		description: "Organisation representing employees.",
		key: "TRADE_UNION",
	},
	{
		value: "FK",
		name: "Previous Trade Union",
		description:
			"Employee organisation who previously represented an employee .",
		key: "PREVIOUS_TRADE_UNION",
	},
	{
		value: "FL",
		name: "Passenger",
		description:
			"A person conveyed by a means of transport, other than the crew.",
		key: "PASSENGER",
	},
	{
		value: "FM",
		name: "Crew member",
		description: "A person manning a means of transport.",
		key: "CREW_MEMBER",
	},
	{
		value: "FN",
		name: "Tariff issuer",
		description: "[3363] The issuer of a tariff, e.g. a freight tariff.",
		key: "TARIFF_ISSUER",
	},
	{
		value: "FO",
		name: "Party performing inspection",
		description: "A party which inspects something.",
		key: "PARTY_PERFORMING_INSPECTION",
	},
	{
		value: "FP",
		name: "Freight/charges payer",
		description: "Party responsible for the payment of freight.",
		key: "FREIGHT_CHARGES_PAYER",
	},
	{
		value: "FQ",
		name: "Container survey agent",
		description: "The container survey agency that will survey the containers.",
		key: "CONTAINER_SURVEY_AGENT",
	},
	{
		value: "FR",
		name: "Message from",
		description: "Party where the message comes from.",
		key: "MESSAGE_FROM",
	},
	{
		value: "FS",
		name: "Party authorized to make definite a contract action",
		description:
			"Party who has the authority to make definite a contract action.",
		key: "PARTY_AUTHORIZED_TO_MAKE_DEFINITE_A_CONTRACT_ACTION",
	},
	{
		value: "FT",
		name: "Financial settlement party",
		description:
			"[3450] Party responsible for either the transfer or repatriation of the funds relating to a transaction.",
		key: "FINANCIAL_SETTLEMENT_PARTY",
	},
	{
		value: "FU",
		name: "Hazardous material office",
		description:
			"The office responsible for providing information regarding hazardous material.",
		key: "HAZARDOUS_MATERIAL_OFFICE",
	},
	{
		value: "FV",
		name: "Party providing government furnished property",
		description:
			"The party responsible for providing government furnished property.",
		key: "PARTY_PROVIDING_GOVERNMENT_FURNISHED_PROPERTY",
	},
	{
		value: "FW",
		name: "Freight forwarder",
		description: "[3170] Party arranging forwarding of goods.",
		key: "FREIGHT_FORWARDER",
	},
	{
		value: "FX",
		name: "Current receiver",
		description:
			"Current receiver of the goods in a multi-step transportation process (indirect flow) involving at least one grouping centre.",
		key: "CURRENT_RECEIVER",
	},
	{
		value: "FY",
		name: "Current sender",
		description:
			"Current sender of the goods in a multi-step transportation process (indirect flow) involving at least one grouping centre.",
		key: "CURRENT_SENDER",
	},
	{
		value: "FZ",
		name: "Grouping centre",
		description:
			"A party in charge of groupage, including degroupage and regroupage.",
		key: "GROUPING_CENTRE",
	},
	{
		value: "GA",
		name: "Road carrier",
		description: "A road carrier moving cargo.",
		key: "ROAD_CARRIER",
	},
	{
		value: "GB",
		name: "Chamber of commerce",
		description:
			"Name of the Chamber of Commerce of the town where the company is registered.",
		key: "CHAMBER_OF_COMMERCE",
	},
	{
		value: "GC",
		name: "Goods custodian",
		description: "[3024] Party responsible for the keeping of goods.",
		key: "GOODS_CUSTODIAN",
	},
	{
		value: "GD",
		name: "Producer",
		description: "Party or person who has produced the produce.",
		key: "PRODUCER",
	},
	{
		value: "GE",
		name: "Registration tribunal",
		description: "Name of the tribunal where the company is registered.",
		key: "REGISTRATION_TRIBUNAL",
	},
	{
		value: "GF",
		name: "Slot charter party",
		description:
			"An identification code of a participant or user that books slots (space) on a ship, more likely on a long term basis on a series of sailings. He pays for the space whether he uses it or not.",
		key: "SLOT_CHARTER_PARTY",
	},
	{
		value: "GH",
		name: "Applicant for job",
		description: "A person who applied for a job.",
		key: "APPLICANT_FOR_JOB",
	},
	{
		value: "GI",
		name: "Spouse",
		description: "Person is a spouse.",
		key: "SPOUSE",
	},
	{
		value: "GJ",
		name: "Mother",
		description: "Person is a mother.",
		key: "MOTHER",
	},
	{
		value: "GK",
		name: "Father",
		description: "Person is a father.",
		key: "FATHER",
	},
	{
		value: "GL",
		name: "Socially insured person",
		description: "A person who is registered in a social security scheme.",
		key: "SOCIALLY_INSURED_PERSON",
	},
	{
		value: "GM",
		name: "Inventory controller",
		description:
			"To specifically identify the party in charge of inventory control.",
		key: "INVENTORY_CONTROLLER",
	},
	{
		value: "GN",
		name: "Processor",
		description: "Party or person who has or will apply a process.",
		key: "PROCESSOR",
	},
	{
		value: "GO",
		name: "Goods owner",
		description: "The party which owns the goods.",
		key: "GOODS_OWNER",
	},
	{
		value: "GP",
		name: "Packer",
		description:
			"Party or person who has undertaken or will undertake packing.",
		key: "PACKER",
	},
	{
		value: "GQ",
		name: "Slaughterer",
		description:
			"Party or person who has undertaken or will undertake a slaughter.",
		key: "SLAUGHTERER",
	},
	{
		value: "GR",
		name: "Goods releasing party",
		description:
			"[3026] Party entitled to authorize release of goods from custodian.",
		key: "GOODS_RELEASING_PARTY",
	},
	{
		value: "GS",
		name: "Consignor's representative",
		description: "Party authorised to represent the consignor.",
		key: "CONSIGNOR_S_REPRESENTATIVE",
	},
	{
		value: "GT",
		name: "Rail carrier",
		description: "A carrier moving cargo, including containers, via rail.",
		key: "RAIL_CARRIER",
	},
	{
		value: "GU",
		name: "Originator of article number",
		description:
			"A code identifying the party which created a specific article number.",
		key: "ORIGINATOR_OF_ARTICLE_NUMBER",
	},
	{
		value: "GV",
		name: "Procurement responsibility for order",
		description:
			"A code used to identify the organization which is responsible for the procurement.",
		key: "PROCUREMENT_RESPONSIBILITY_FOR_ORDER",
	},
	{
		value: "GW",
		name: "Party fulfilling all operations",
		description:
			"Code indicating the fact that the party identified carries out all operations within that company's activities.",
		key: "PARTY_FULFILLING_ALL_OPERATIONS",
	},
	{
		value: "GX",
		name: "Central catalogue party",
		description: "Party controlling a central catalogue.",
		key: "CENTRAL_CATALOGUE_PARTY",
	},
	{
		value: "GY",
		name: "Inventory reporting party",
		description: "Party reporting inventory information.",
		key: "INVENTORY_REPORTING_PARTY",
	},
	{
		value: "GZ",
		name: "Substitute supplier",
		description:
			"Party which may be in a position to supply products or services should the main usual supplier be unable to do so.",
		key: "SUBSTITUTE_SUPPLIER",
	},
	{
		value: "HA",
		name: "Party which delivers consignments to the terminal",
		description: "Party which delivers consignments to a terminal.",
		key: "PARTY_WHICH_DELIVERS_CONSIGNMENTS_TO_THE_TERMINAL",
	},
	{
		value: "HB",
		name: "Party which picks up consignments from the terminal",
		description: "Party which picks up consignments from a terminal.",
		key: "PARTY_WHICH_PICKS_UP_CONSIGNMENTS_FROM_THE_TERMINAL",
	},
	{
		value: "HC",
		name: "Transit freight forwarder",
		description:
			"Freight forwarder to whom transit consignments are addressed, and from whom they are to be on-forwarded.",
		key: "TRANSIT_FREIGHT_FORWARDER",
	},
	{
		value: "HD",
		name: "Inspection and acceptance party",
		description: "The party who will perform inspection and acceptance.",
		key: "INSPECTION_AND_ACCEPTANCE_PARTY",
	},
	{
		value: "HE",
		name: "Transportation office",
		description: "The office that provides transportation information.",
		key: "TRANSPORTATION_OFFICE",
	},
	{
		value: "HF",
		name: "Contract administration office",
		description: "The office responsible for the administration of a contract.",
		key: "CONTRACT_ADMINISTRATION_OFFICE",
	},
	{
		value: "HG",
		name: "Investigator",
		description: "A party who conducts investigations.",
		key: "INVESTIGATOR",
	},
	{
		value: "HH",
		name: "Audit office",
		description: "The office responsible for conducting audits.",
		key: "AUDIT_OFFICE",
	},
	{
		value: "HI",
		name: "Requestor",
		description: "The party requesting an action.",
		key: "REQUESTOR",
	},
	{
		value: "HJ",
		name: "Foreign disclosure information office",
		description:
			"The office that reviews sensitive information for foreign disclosure.",
		key: "FOREIGN_DISCLOSURE_INFORMATION_OFFICE",
	},
	{
		value: "HK",
		name: "Mark-for party",
		description:
			"The party within an organization for whom the material is marked to be delivered.",
		key: "MARK_FOR_PARTY",
	},
	{
		value: "HL",
		name: "Party to receive reports",
		description: "The party to whom reports are to be submitted.",
		key: "PARTY_TO_RECEIVE_REPORTS",
	},
	{
		value: "HM",
		name: "Alternative manufacturer",
		description:
			"Party identification of an alternative manufacturer for a product.",
		key: "ALTERNATIVE_MANUFACTURER",
	},
	{
		value: "HN",
		name: "Service performer",
		description: "The party who is performing a service.",
		key: "SERVICE_PERFORMER",
	},
	{
		value: "HO",
		name: "Shipper's association",
		description: "An association of shippers.",
		key: "SHIPPER_S_ASSOCIATION",
	},
	{
		value: "HP",
		name: "Final message recipient",
		description: "To identify the final recipient of the message.",
		key: "FINAL_MESSAGE_RECIPIENT",
	},
	{
		value: "HQ",
		name: "Account owner",
		description: "Identifies the owner of the account.",
		key: "ACCOUNT_OWNER",
	},
	{
		value: "HR",
		name: "Shipping line service",
		description: "Identifies the shipping line service organization.",
		key: "SHIPPING_LINE_SERVICE",
	},
	{
		value: "HS",
		name: "Creditor",
		description: "Party to whom payment is due.",
		key: "CREDITOR",
	},
	{
		value: "HT",
		name: "Clearing house",
		description: "Institution through which funds will be paid.",
		key: "CLEARING_HOUSE",
	},
	{
		value: "HU",
		name: "Ordering bank",
		description:
			"Bank which instructed the sender to act on the transaction(s).",
		key: "ORDERING_BANK",
	},
	{
		value: "HV",
		name: "Receiver of funds",
		description: "Identifies the financial party that receives the funds.",
		key: "RECEIVER_OF_FUNDS",
	},
	{
		value: "HW",
		name: "Sender of funds",
		description: "Identifies the party that sends the funds.",
		key: "SENDER_OF_FUNDS",
	},
	{
		value: "HX",
		name: "Debtor",
		description: "Party from whom payment is due.",
		key: "DEBTOR",
	},
	{
		value: "HY",
		name: "Presenting bank",
		description: "The bank which presents documents to the drawee.",
		key: "PRESENTING_BANK",
	},
	{
		value: "HZ",
		name: "Work team",
		description: "Team responsible for performing work.",
		key: "WORK_TEAM",
	},
	{
		value: "I1",
		name: "Intermediary bank 1",
		description:
			"A financial institution between the ordered bank and the beneficiary's bank.",
		key: "INTERMEDIARY_BANK_1",
	},
	{
		value: "I2",
		name: "Intermediary bank 2",
		description:
			"A financial institution between the ordered bank and the beneficiary's bank.",
		key: "INTERMEDIARY_BANK_2",
	},
	{
		value: "IB",
		name: "Intermediary/broker",
		description:
			"A person intervening between parties to produce agreement or reconciliation.",
		key: "INTERMEDIARY_BROKER",
	},
	{
		value: "IC",
		name: "Intermediate consignee",
		description: "The intermediate consignee.",
		key: "INTERMEDIATE_CONSIGNEE",
	},
	{
		value: "ID",
		name: "Replacing manufacturer",
		description:
			"A code used to identify a party who replaces the previous party for the manufacture of an article.",
		key: "REPLACING_MANUFACTURER",
	},
	{
		value: "IE",
		name: "Non-resident third party company with whom financial",
		description:
			"account is held Identifies the non-resident third party company with whom the financial account is held.",
		key: "NON_RESIDENT_THIRD_PARTY_COMPANY_WITH_WHOM_FINANCIAL",
	},
	{
		value: "IF",
		name: "Non-resident group company with whom financial account is",
		description:
			"held Identifies the non-resident group company with whom the financial account is held.",
		key: "NON_RESIDENT_GROUP_COMPANY_WITH_WHOM_FINANCIAL_ACCOUNT_IS",
	},
	{
		value: "IG",
		name: "Non-resident beneficiary",
		description:
			"The ultimate non-resident recipient of the funds. Normally the account owner who is reimbursed by the payer.",
		key: "NON_RESIDENT_BENEFICIARY",
	},
	{
		value: "IH",
		name: "Resident beneficiary",
		description:
			"The ultimate resident recipient of the funds. Normally the account owner who is reimbursed by the payer.",
		key: "RESIDENT_BENEFICIARY",
	},
	{
		value: "II",
		name: "Invoice issuer",
		description: "[3028] Party issuing an invoice.",
		key: "INVOICE_ISSUER",
	},
	{
		value: "IJ",
		name: "Non-resident instructing party",
		description:
			"Identifies the non-resident party originating the instruction.",
		key: "NON_RESIDENT_INSTRUCTING_PARTY",
	},
	{
		value: "IL",
		name: "Resident instructing party",
		description: "Identifies the resident party originating the instruction.",
		key: "RESIDENT_INSTRUCTING_PARTY",
	},
	{
		value: "IM",
		name: "Importer",
		description:
			"[3020] Party who makes - or on whose behalf a Customs clearing agent or other authorized person makes - an import declaration. This may include a person who has possession of the goods or to whom the goods are consigned.",
		key: "IMPORTER",
	},
	{
		value: "IN",
		name: "Insurer",
		description:
			"[3070] A person or company offering insurance policies for premiums.",
		key: "INSURER",
	},
	{
		value: "IO",
		name: "Insurance company",
		description: "A company engaged in the business of insurance.",
		key: "INSURANCE_COMPANY",
	},
	{
		value: "IP",
		name: "Insurance claim adjuster",
		description: "[3360] A party which adjusts losses on behalf of an insurer.",
		key: "INSURANCE_CLAIM_ADJUSTER",
	},
	{
		value: "IQ",
		name: "Domestic financial institution",
		description: "Domestic party acting as financial institution.",
		key: "DOMESTIC_FINANCIAL_INSTITUTION",
	},
	{
		value: "IR",
		name: "Non-domestic financial institution",
		description: "Non-domestic party acting as financial institution.",
		key: "NON_DOMESTIC_FINANCIAL_INSTITUTION",
	},
	{
		value: "IS",
		name: "Party to receive certified inspection report",
		description: "Party (at buyer) to receive certified inspection report.",
		key: "PARTY_TO_RECEIVE_CERTIFIED_INSPECTION_REPORT",
	},
	{
		value: "IT",
		name: "Installation on site",
		description:
			"A party who possesses the site on which an installation shall be made.",
		key: "INSTALLATION_ON_SITE",
	},
	{
		value: "IU",
		name: "Non-resident debtor",
		description:
			"Non-resident party who makes the payment or against whom a claim exists.",
		key: "NON_RESIDENT_DEBTOR",
	},
	{
		value: "IV",
		name: "Invoicee",
		description: "[3006] Party to whom an invoice is issued.",
		key: "INVOICEE",
	},
	{
		value: "IW",
		name: "Non-resident creditor",
		description:
			"Non-resident party receiving the payment or against whom a liability exists.",
		key: "NON_RESIDENT_CREDITOR",
	},
	{
		value: "IX",
		name: "Supplier work team",
		description: "The supplier's team responsible for performing the work.",
		key: "SUPPLIER_WORK_TEAM",
	},
	{
		value: "IY",
		name: "Tenant manager",
		description:
			"A code to identify the party who rents the rights to use the goodwill and facilities of an enterprise.",
		key: "TENANT_MANAGER",
	},
	{
		value: "IZ",
		name: "Party mandated to liquidate an enterprise",
		description:
			"A code to identify the party who has been legally mandated to sell off an enterprise.",
		key: "PARTY_MANDATED_TO_LIQUIDATE_AN_ENTERPRISE",
	},
	{
		value: "JA",
		name: "Certified accountant",
		description: "Code identifying the party as a certified accountant.",
		key: "CERTIFIED_ACCOUNTANT",
	},
	{
		value: "JB",
		name: "Goods collection party",
		description: "Party that will collect or has collected the goods.",
		key: "GOODS_COLLECTION_PARTY",
	},
	{
		value: "JC",
		name: "Party at final place of positioning",
		description: "Identifies the party at the final place of positioning.",
		key: "PARTY_AT_FINAL_PLACE_OF_POSITIONING",
	},
	{
		value: "JD",
		name: "Customs office of clearance",
		description:
			"Identifies the office where customs clearance procedures take place.",
		key: "CUSTOMS_OFFICE_OF_CLEARANCE",
	},
	{
		value: "JE",
		name: "Party from whom customs documents are to be picked up",
		description:
			"Identification of the party from whom customs documents are to be picked up.",
		key: "PARTY_FROM_WHOM_CUSTOMS_DOCUMENTS_ARE_TO_BE_PICKED_UP",
	},
	{
		value: "JF",
		name: "Party from whom non-customs documents are to be picked up",
		description:
			"Identification of the party from whom non-customs documents are to be picked up.",
		key: "PARTY_FROM_WHOM_NON_CUSTOMS_DOCUMENTS_ARE_TO_BE_PICKED_UP",
	},
	{
		value: "JG",
		name: "Party to receive customs documents",
		description:
			"Identification of the party to whom customs documents are to be delivered.",
		key: "PARTY_TO_RECEIVE_CUSTOMS_DOCUMENTS",
	},
	{
		value: "JH",
		name: "Party to receive non-customs documents",
		description:
			"Identification of the party to whom non-customs documents are to be delivered.",
		key: "PARTY_TO_RECEIVE_NON_CUSTOMS_DOCUMENTS",
	},
	{
		value: "LA",
		name: "Party designated to provide living animal care",
		description:
			"Party responsible to take care of transported living animals.",
		key: "PARTY_DESIGNATED_TO_PROVIDE_LIVING_ANIMAL_CARE",
	},
	{
		value: "LB",
		name: "Co-producer",
		description:
			"A code used to identify a party who participates in production.",
		key: "CO_PRODUCER",
	},
	{
		value: "LC",
		name: "Party declaring the Value Added Tax (VAT)",
		description:
			"A code to identify the party who is responsible for declaring the Value Added Tax (VAT) on the sale of goods or services.",
		key: "PARTY_DECLARING_THE_VALUE_ADDED_TAX_VAT",
	},
	{
		value: "LD",
		name: "Party recovering the Value Added Tax (VAT)",
		description:
			"A code to identify the party who is eligible to recover the Value Added Tax (VAT) on the sale of goods or services.",
		key: "PARTY_RECOVERING_THE_VALUE_ADDED_TAX_VAT",
	},
	{
		value: "LE",
		name: "Person on claim",
		description: "To identify the person who is the subject of the claim.",
		key: "PERSON_ON_CLAIM",
	},
	{
		value: "LF",
		name: "Buyer's corporate office",
		description: "The identification of the buyer's corporate office.",
		key: "BUYER_S_CORPORATE_OFFICE",
	},
	{
		value: "LG",
		name: "Supplier's corporate office",
		description: "The identification of the supplier's corporate office.",
		key: "SUPPLIER_S_CORPORATE_OFFICE",
	},
	{
		value: "LH",
		name: "Liquidator",
		description: "The party responsible for settling or paying a debt.",
		key: "LIQUIDATOR",
	},
	{
		value: "LI",
		name: "Account coordinator",
		description:
			"An individual with coordination responsibilities for a specific account.",
		key: "ACCOUNT_COORDINATOR",
	},
	{
		value: "LJ",
		name: "Inspection leader",
		description: "An individual responsible for an inspection team.",
		key: "INSPECTION_LEADER",
	},
	{
		value: "LK",
		name: "Patient",
		description:
			"A person receiving or registered to receive medical treatment.",
		key: "PATIENT",
	},
	{
		value: "LL",
		name: "Patient companion",
		description: "Person accompanying the patient.",
		key: "PATIENT_COMPANION",
	},
	{
		value: "LM",
		name: "Medical treatment executant",
		description: "The party who executes a medical treatment.",
		key: "MEDICAL_TREATMENT_EXECUTANT",
	},
	{
		value: "LN",
		name: "Lender",
		description: "Party lending goods or equipment.",
		key: "LENDER",
	},
	{
		value: "LO",
		name: "Medical treatment prescriber",
		description: "The party who prescribes a medical treatment.",
		key: "MEDICAL_TREATMENT_PRESCRIBER",
	},
	{
		value: "LP",
		name: "Loading party",
		description: "Party responsible for the loading when other than carrier.",
		key: "LOADING_PARTY",
	},
	{
		value: "LQ",
		name: "Debt payment authorisation party",
		description: "A party which authorises the payment of a debt.",
		key: "DEBT_PAYMENT_AUTHORISATION_PARTY",
	},
	{
		value: "LR",
		name: "Administration centre",
		description: "Identification of an administration centre.",
		key: "ADMINISTRATION_CENTRE",
	},
	{
		value: "LS",
		name: "Product services and repairs centre",
		description: "A centre which services and repairs products.",
		key: "PRODUCT_SERVICES_AND_REPAIRS_CENTRE",
	},
	{
		value: "LT",
		name: "Secretariat",
		description: "Party is a secretariat.",
		key: "SECRETARIAT",
	},
	{
		value: "LU",
		name: "Entry point technical assessment group",
		description: "Party acts as an entry point for technical assessment.",
		key: "ENTRY_POINT_TECHNICAL_ASSESSMENT_GROUP",
	},
	{
		value: "LV",
		name: "Party assigning a status",
		description: "Party responsible for assigning a status.",
		key: "PARTY_ASSIGNING_A_STATUS",
	},
	{
		value: "MA",
		name: "Party for whom item is ultimately intended",
		description: "Party for whom item is ultimately intended.",
		key: "PARTY_FOR_WHOM_ITEM_IS_ULTIMATELY_INTENDED",
	},
	{
		value: "MAD",
		name: "Meter administrator",
		description:
			"A party responsible for keeping a register of meters and related characteristics.",
		key: "METER_ADMINISTRATOR",
	},
	{
		value: "MDR",
		name: "Metered data responsible",
		description:
			"A party responsible for the establishment and validation of metered data received from the Metered Data Collector.",
		key: "METERED_DATA_RESPONSIBLE",
	},
	{
		value: "MF",
		name: "Manufacturer of goods",
		description: "[3513] Party who manufactures the goods.",
		key: "MANUFACTURER_OF_GOODS",
	},
	{
		value: "MG",
		name: "Party designated to execute re-icing",
		description:
			"Party designated to execute re-icing, selected in the official list of mandatories competent for this kind of operation.",
		key: "PARTY_DESIGNATED_TO_EXECUTE_RE_ICING",
	},
	{
		value: "MI",
		name: "Planning schedule/material release issuer",
		description: "A party issuing a planning schedule/material release.",
		key: "PLANNING_SCHEDULE_MATERIAL_RELEASE_ISSUER",
	},
	{
		value: "MOP",
		name: "Market operator",
		description:
			"Operator of a market, e.g . In the utilities sector, the unique power exchange of trades for the actual delivery of energy that can also establish area prices for settlement and reconciliation.",
		key: "MARKET_OPERATOR",
	},
	{
		value: "MP",
		name: "Manufacturing unit",
		description:
			"A party acting as a particular production unit of a manufacturer.",
		key: "MANUFACTURING_UNIT",
	},
	{
		value: "MR",
		name: "Message recipient",
		description: "A party to receive a message or messages.",
		key: "MESSAGE_RECIPIENT",
	},
	{
		value: "MS",
		name: "Document/message issuer/sender",
		description: "[3522] Issuer of a document and/or sender of a message.",
		key: "DOCUMENT_MESSAGE_ISSUER_SENDER",
	},
	{
		value: "MT",
		name: "Party designated to execute sanitary procedures",
		description: "A party which is designated to execute sanitary procedures.",
		key: "PARTY_DESIGNATED_TO_EXECUTE_SANITARY_PROCEDURES",
	},
	{
		value: "N2",
		name: "Notify party no. 2",
		description: "[3376] The second party which is to be notified.",
		key: "NOTIFY_PARTY_NO_2",
	},
	{
		value: "NI",
		name: "Notify party",
		description: "[3180] Party to be notified. Synonym: Notify party No. 1.",
		key: "NOTIFY_PARTY",
	},
	{
		value: "OA",
		name: "Break bulk berth operator",
		description:
			"Party who offers facilities for berthing of vessels, handling and storage of break bulk cargo.",
		key: "BREAK_BULK_BERTH_OPERATOR",
	},
	{
		value: "OB",
		name: "Ordered by",
		description: "Party who issued an order.",
		key: "ORDERED_BY",
	},
	{
		value: "OC",
		name: "Party data responsible party",
		description: "The party responsible for all party data.",
		key: "PARTY_DATA_RESPONSIBLE_PARTY",
	},
	{
		value: "OD",
		name: "Equipment repair party",
		description: "A party making repairs to equipment.",
		key: "EQUIPMENT_REPAIR_PARTY",
	},
	{
		value: "OE",
		name: "Owner of property",
		description: "Party owning a property.",
		key: "OWNER_OF_PROPERTY",
	},
	{
		value: "OF",
		name: "On behalf of",
		description: "Party on behalf of which an action is executed.",
		key: "ON_BEHALF_OF",
	},
	{
		value: "OG",
		name: "Owner or lessor's surveyor",
		description: "Surveyor hired by the owner or lessor of the item.",
		key: "OWNER_OR_LESSOR_S_SURVEYOR",
	},
	{
		value: "OH",
		name: "Lessee's surveyor",
		description: "Surveyor hired by the lessee of the item.",
		key: "LESSEE_S_SURVEYOR",
	},
	{
		value: "OI",
		name: "Outside inspection agency",
		description: "Third party inspecting goods or equipment.",
		key: "OUTSIDE_INSPECTION_AGENCY",
	},
	{
		value: "OJ",
		name: "Third party",
		description: "Another party besides the two principals.",
		key: "THIRD_PARTY",
	},
	{
		value: "OK",
		name: "Receiver's sub-entity",
		description: "Identifies a sub-entity within the receiver's organization.",
		key: "RECEIVER_S_SUB_ENTITY",
	},
	{
		value: "OL",
		name: "Case of need party",
		description: "Party to be approached in case of difficulty.",
		key: "CASE_OF_NEED_PARTY",
	},
	{
		value: "OM",
		name: "Collecting bank",
		description:
			"Any bank, other than the remitting bank, involved in processing the collection.",
		key: "COLLECTING_BANK",
	},
	{
		value: "ON",
		name: "Remitting bank",
		description:
			"The bank to which the principal has entrusted the handling of a collection.",
		key: "REMITTING_BANK",
	},
	{
		value: "OO",
		name: "Order of the shipper party",
		description:
			"The owner of goods under consignment which are moving under a negotiable transport document and will only be released upon receipt of the original transport document.",
		key: "ORDER_OF_THE_SHIPPER_PARTY",
	},
	{
		value: "OP",
		name: "Operator of property or equipment",
		description:
			"(3174) The party which operates property or a unit of equipment.",
		key: "OPERATOR_OF_PROPERTY_OR_EQUIPMENT",
	},
	{
		value: "OQ",
		name: "Collection principal",
		description: "The party entrusting the handling of a collection to a bank.",
		key: "COLLECTION_PRINCIPAL",
	},
	{
		value: "OR",
		name: "Ordered bank",
		description:
			"Identifies the bank servicing the account for the ordering customer or payer.",
		key: "ORDERED_BANK",
	},
	{
		value: "OS",
		name: "Original shipper",
		description: "The original supplier of the goods.",
		key: "ORIGINAL_SHIPPER",
	},
	{
		value: "OT",
		name: "Outside test agency",
		description: "Third party testing goods, equipment or services.",
		key: "OUTSIDE_TEST_AGENCY",
	},
	{
		value: "OU",
		name: "Account owner's servicing bank on the sending side",
		description:
			"Identifies the financial institution on the sending side which services the account owner's bank account(s).",
		key: "ACCOUNT_OWNER_S_SERVICING_BANK_ON_THE_SENDING_SIDE",
	},
	{
		value: "OV",
		name: "Transport means owner",
		description:
			"Party owning the means of transport. No synonym of carrier (= CA).",
		key: "TRANSPORT_MEANS_OWNER",
	},
	{
		value: "OW",
		name: "Account owner's servicing bank on the receiving side",
		description:
			"Identifies the financial institution on the receiving side which services the account owner's bank account(s).",
		key: "ACCOUNT_OWNER_S_SERVICING_BANK_ON_THE_RECEIVING_SIDE",
	},
	{
		value: "OX",
		name: "Sender's correspondent bank",
		description:
			"The account, or branch of the sender, or another financial institution, through which the sender will reimburse the receiver.",
		key: "SENDER_S_CORRESPONDENT_BANK",
	},
	{
		value: "OY",
		name: "Ordering customer",
		description: "Identifies the originator of the instruction.",
		key: "ORDERING_CUSTOMER",
	},
	{
		value: "OZ",
		name: "Receiver's correspondent bank",
		description:
			"The branch of the receiver, or another financial institution, at which the funds will be made available to the receiver.",
		key: "RECEIVER_S_CORRESPONDENT_BANK",
	},
	{
		value: "P1",
		name: "Contact party 1",
		description: "First party to contact.",
		key: "CONTACT_PARTY_1",
	},
	{
		value: "P2",
		name: "Contact party 2",
		description: "Second party to contact.",
		key: "CONTACT_PARTY_2",
	},
	{
		value: "P3",
		name: "Contact party 3",
		description: "Third party to contact.",
		key: "CONTACT_PARTY_3",
	},
	{
		value: "P4",
		name: "Contact party 4",
		description: "Fourth party to contact.",
		key: "CONTACT_PARTY_4",
	},
	{
		value: "PA",
		name: "Party to receive inspection report",
		description: "Party to whom the inspection report should be sent.",
		key: "PARTY_TO_RECEIVE_INSPECTION_REPORT",
	},
	{
		value: "PAD",
		name: "Party Administrator",
		description: "A party responsible for maintaining party information.",
		key: "PARTY_ADMINISTRATOR",
	},
	{
		value: "PB",
		name: "Paying financial institution",
		description: "Financial institution designated to make payment.",
		key: "PAYING_FINANCIAL_INSTITUTION",
	},
	{
		value: "PC",
		name: "Actual purchaser's customer",
		description:
			"Party the purchaser within the actual message is selling the ordered goods or services to.",
		key: "ACTUAL_PURCHASER_S_CUSTOMER",
	},
	{
		value: "PD",
		name: "Purchaser's department buyer",
		description: "Purchasing department of buyer.",
		key: "PURCHASER_S_DEPARTMENT_BUYER",
	},
	{
		value: "PE",
		name: "Payee",
		description: "Identifies the credit party when other than the beneficiary.",
		key: "PAYEE",
	},
	{
		value: "PF",
		name: "Party to receive freight bill",
		description: "Party to whom the freight bill should be sent.",
		key: "PARTY_TO_RECEIVE_FREIGHT_BILL",
	},
	{
		value: "PG",
		name: "Prime contractor",
		description:
			"Party responsible for the whole project if other than the buyer.",
		key: "PRIME_CONTRACTOR",
	},
	{
		value: "PH",
		name: "Payer's financial institution",
		description:
			"Institution chosen by the payer to execute financial transactions on his behalf.",
		key: "PAYER_S_FINANCIAL_INSTITUTION",
	},
	{
		value: "PI",
		name: "Payee's company name/ID",
		description: "Receiving company name/ID (ACH transfers).",
		key: "PAYEE_S_COMPANY_NAME_ID",
	},
	{
		value: "PJ",
		name: "Party to receive correspondence",
		description:
			"Second party designated by a first party to receive certain correspondence in lieu of it being mailed directly to this first party.",
		key: "PARTY_TO_RECEIVE_CORRESPONDENCE",
	},
	{
		value: "PK",
		name: "Contact party",
		description: "Party to contact.",
		key: "CONTACT_PARTY",
	},
	{
		value: "PM",
		name: "Party to receive paper memo of invoice",
		description: "Party being informed about invoice issue (via paper).",
		key: "PARTY_TO_RECEIVE_PAPER_MEMO_OF_INVOICE",
	},
	{
		value: "PN",
		name: "Party to receive shipping notice",
		description: "The party is to be the recipient of the shipping notice.",
		key: "PARTY_TO_RECEIVE_SHIPPING_NOTICE",
	},
	{
		value: "PO",
		name: "Ordering party",
		description:
			"To be used only if ordering party and buyer are not identical.",
		key: "ORDERING_PARTY",
	},
	{
		value: "POA",
		name: "Port Authority",
		description:
			"A governmental commission in charge of the traffic and regulations of a port.",
		key: "PORT_AUTHORITY",
	},
	{
		value: "PQ",
		name: "Certifying party",
		description: "A party which certifies something.",
		key: "CERTIFYING_PARTY",
	},
	{
		value: "PR",
		name: "Payer",
		description: "[3308] Party responsible for making a payment.",
		key: "PAYER",
	},
	{
		value: "PS",
		name: "Payer's company name/ID (Check, Draft or Wire)",
		description: "Party to send cheque, draft or wire for payment.",
		key: "PAYER_S_COMPANY_NAME_ID_CHECK_DRAFT_OR_WIRE",
	},
	{
		value: "PT",
		name: "Party to receive test report",
		description: "A party which is named to be the recipient of test reports.",
		key: "PARTY_TO_RECEIVE_TEST_REPORT",
	},
	{
		value: "PW",
		name: "Despatch party",
		description:
			"[3282] Party where goods are to be, or have been, taken over by a carrier such as the place where a container is picked-up.",
		key: "DESPATCH_PARTY",
	},
	{
		value: "PX",
		name: "Party to receive all documents",
		description: "A party which is named to be the recipient of all documents.",
		key: "PARTY_TO_RECEIVE_ALL_DOCUMENTS",
	},
	{
		value: "PY",
		name: "Checking party",
		description:
			"Party or contact designated on behalf of carrier or his agent to establish the actual figures for quantities, weight, volume and/or (cube) measurements of goods or containers which are to appear in the transport contract and on which charges will be based.",
		key: "CHECKING_PARTY",
	},
	{
		value: "PZ",
		name: "Party to print some document",
		description: "The party that is to print a specific document.",
		key: "PARTY_TO_PRINT_SOME_DOCUMENT",
	},
	{
		value: "RA",
		name: "Central bank or regulatory authority",
		description:
			"Identifies central bank or regulatory authority which must be informed of certain aspects of a message.",
		key: "CENTRAL_BANK_OR_REGULATORY_AUTHORITY",
	},
	{
		value: "RB",
		name: "Receiving financial institution",
		description: "Financial institution designated to receive payment.",
		key: "RECEIVING_FINANCIAL_INSTITUTION",
	},
	{
		value: "RCA",
		name: "Reconciliation accountable",
		description:
			"A party that is financially accountable for reconciliation, e.g. for the reconciled volume of energy products for a profiled accounting point.",
		key: "RECONCILIATION_ACCOUNTABLE",
	},
	{
		value: "RCR",
		name: "Reconciliation responsible",
		description:
			"A party that is responsible for reconciliation, e.g. reconciling volumes within a metering grid area.",
		key: "RECONCILIATION_RESPONSIBLE",
	},
	{
		value: "RE",
		name: "Party to receive commercial invoice remittance",
		description:
			"Party to whom payment for a commercial invoice or bill should be remitted.",
		key: "PARTY_TO_RECEIVE_COMMERCIAL_INVOICE_REMITTANCE",
	},
	{
		value: "RF",
		name: "Received from",
		description:
			"Name of a person or department which actually delivers the goods.",
		key: "RECEIVED_FROM",
	},
	{
		value: "RH",
		name: "Seller's financial institution",
		description:
			"Financial institution designated by seller to receive payment. RDFI (ACH transfers).",
		key: "SELLER_S_FINANCIAL_INSTITUTION",
	},
	{
		value: "RI",
		name: "Reinsurance intermediary/broker",
		description: "Intermediary party between ceding company and reinsurance.",
		key: "REINSURANCE_INTERMEDIARY_BROKER",
	},
	{
		value: "RL",
		name: "Reporting carrier (Customs)",
		description: "Party who makes the cargo report to Customs.",
		key: "REPORTING_CARRIER_CUSTOMS",
	},
	{
		value: "RM",
		name: "Reporting carrier's nominated agent/representative",
		description:
			"(Customs) Agent who formally makes a cargo report to Customs on behalf of the carrier.",
		key: "REPORTING_CARRIER_S_NOMINATED_AGENT_REPRESENTATIVE",
	},
	{
		value: "RP",
		name: "Routing party",
		description: "Party responsible for the selection of the carrier(s).",
		key: "ROUTING_PARTY",
	},
	{
		value: "RS",
		name: "Party to receive statement of account",
		description: "Party to whom the statement of account should be sent.",
		key: "PARTY_TO_RECEIVE_STATEMENT_OF_ACCOUNT",
	},
	{
		value: "RV",
		name: "Receiver of cheque",
		description:
			"Identifies the party which is to receive the actual cheque, when different from the receiver of funds.",
		key: "RECEIVER_OF_CHEQUE",
	},
	{
		value: "RW",
		name: "Issuer of waybill",
		description: "Party issuing the contract (waybill) for carriage.",
		key: "ISSUER_OF_WAYBILL",
	},
	{
		value: "SB",
		name: "Sales responsibility",
		description: "A party being responsible for sales.",
		key: "SALES_RESPONSIBILITY",
	},
	{
		value: "SE",
		name: "Seller",
		description: "[3346] Party selling merchandise or services to a buyer.",
		key: "SELLER",
	},
	{
		value: "SF",
		name: "Ship from",
		description:
			"Identification of the party from where goods will be or have been shipped.",
		key: "SHIP_FROM",
	},
	{
		value: "SG",
		name: "Store group",
		description: "A chain of shops or stores.",
		key: "STORE_GROUP",
	},
	{
		value: "SI",
		name: "Shipping schedule issuer",
		description: "The party which issues a shipping schedule.",
		key: "SHIPPING_SCHEDULE_ISSUER",
	},
	{
		value: "SN",
		name: "Store keeper",
		description: "A party keeping a shop or store.",
		key: "STORE_KEEPER",
	},
	{
		value: "SO",
		name: "Sold to if different than bill to",
		description:
			"Party to whom the goods have been sold, if different to the bill to party.",
		key: "SOLD_TO_IF_DIFFERENT_THAN_BILL_TO",
	},
	{
		value: "SPC",
		name: "SOLAS verified gross mass responsible party",
		description:
			"Party responsible for declaration of the verified gross mass (weight) of a packed transport equipment according to SOLAS Chapter VI, Regulation 2, paragraphs 4-6.",
		key: "SOLAS_VERIFIED_GROSS_MASS_RESPONSIBLE_PARTY",
	},
	{
		value: "SR",
		name: "Seller agent",
		description:
			"[3254] Party representing the seller for the purpose of a trade transaction.",
		key: "SELLER_AGENT",
	},
	{
		value: "SS",
		name: "Social securities collector's office",
		description: "Party collecting social securities premiums.",
		key: "SOCIAL_SECURITIES_COLLECTOR_S_OFFICE",
	},
	{
		value: "ST",
		name: "Ship to",
		description:
			"Identification of the party to where goods will be or have been shipped.",
		key: "SHIP_TO",
	},
	{
		value: "SU",
		name: "Supplier",
		description: "Party who supplies goods and or services.",
		key: "SUPPLIER",
	},
	{
		value: "SX",
		name: "Surety for additions",
		description:
			"Natural of legal person (generally a bank of insurance company) who accepts responsibility in due legal form for the financial guarantee to Customs of the payment of additional duties or fees that become due against a particular shipment, which have not previously been covered by surety.",
		key: "SURETY_FOR_ADDITIONS",
	},
	{
		value: "SY",
		name: "Surety",
		description:
			"Natural or legal person (generally a bank or insurance company) who accepts responsibility in due legal form for the financial consequences of non-fulfillment of another's obligations to the Customs (CCC).",
		key: "SURETY",
	},
	{
		value: "SZ",
		name: "Surety for antidumping/countervailing duty",
		description:
			"Natural or legal person that has been contracted by the importer to guarantee to Customs the payment of antidumping and/or countervailing duties that become due against a particular shipment.",
		key: "SURETY_FOR_ANTIDUMPING_COUNTERVAILING_DUTY",
	},
	{
		value: "TA",
		name: "Legal receiver",
		description: "The party responsible for a receivership.",
		key: "LEGAL_RECEIVER",
	},
	{
		value: "TB",
		name: "Submitter",
		description: "To specify that the party is a submitter.",
		key: "SUBMITTER",
	},
	{
		value: "TC",
		name: "Tax collector's office",
		description: "Party collecting taxes.",
		key: "TAX_COLLECTOR_S_OFFICE",
	},
	{
		value: "TCP",
		name: "Transit charge payer",
		description:
			"Party, other than the ordering party, which has to pay the charges concerning the transit operations.",
		key: "TRANSIT_CHARGE_PAYER",
	},
	{
		value: "TCR",
		name: "Transport capacity responsible party",
		description: "Party responsible for transport capacity.",
		key: "TRANSPORT_CAPACITY_RESPONSIBLE_PARTY",
	},
	{
		value: "TD",
		name: "Party to receive technical documentation",
		description: "Party to whom technical documentation should be sent.",
		key: "PARTY_TO_RECEIVE_TECHNICAL_DOCUMENTATION",
	},
	{
		value: "TE",
		name: "Bankruptcy referee",
		description: "To specify that the party is a referee in a bankruptcy case.",
		key: "BANKRUPTCY_REFEREE",
	},
	{
		value: "TF",
		name: "Source of information",
		description: "To specify that the party is the source of information.",
		key: "SOURCE_OF_INFORMATION",
	},
	{
		value: "TG",
		name: "Judge",
		description: "To specify that the party is a judge.",
		key: "JUDGE",
	},
	{
		value: "TH",
		name: "Attorney",
		description: "To specify that the party is an attorney.",
		key: "ATTORNEY",
	},
	{
		value: "TI",
		name: "Law firm",
		description: "To specify that the party is a law firm.",
		key: "LAW_FIRM",
	},
	{
		value: "TJ",
		name: "Trustee",
		description: "To specify that the party is a trustee.",
		key: "TRUSTEE",
	},
	{
		value: "TK",
		name: "Signatory",
		description: "To specify that the party is a signatory.",
		key: "SIGNATORY",
	},
	{
		value: "TL",
		name: "Occupant",
		description: "The party is an occupant.",
		key: "OCCUPANT",
	},
	{
		value: "TM",
		name: "Co-occupant",
		description: "The party is a co-occupant.",
		key: "CO_OCCUPANT",
	},
	{
		value: "TN",
		name: "Subject of inquiry",
		description: "The party is the subject of an inquiry.",
		key: "SUBJECT_OF_INQUIRY",
	},
	{
		value: "TO",
		name: "Lessor",
		description: "The party is a lessor.",
		key: "LESSOR",
	},
	{
		value: "TP",
		name: "Owner of residence",
		description: "Identifies the owner of a residence.",
		key: "OWNER_OF_RESIDENCE",
	},
	{
		value: "TQ",
		name: "Founder",
		description: "Identifies the founder.",
		key: "FOUNDER",
	},
	{
		value: "TR",
		name: "Terminal operator",
		description:
			"A party which handles the loading and unloading of means of transport.",
		key: "TERMINAL_OPERATOR",
	},
	{
		value: "TS",
		name: "Party to receive certified test results",
		description: "Party to whom the certified test results should be sent.",
		key: "PARTY_TO_RECEIVE_CERTIFIED_TEST_RESULTS",
	},
	{
		value: "TT",
		name: "Transfer to",
		description: "The party which is the recipient of a transfer.",
		key: "TRANSFER_TO",
	},
	{
		value: "TU",
		name: "President",
		description: "Identifies the president.",
		key: "PRESIDENT",
	},
	{
		value: "TV",
		name: "Chairperson",
		description: "Identifies the chairperson.",
		key: "CHAIRPERSON",
	},
	{
		value: "TW",
		name: "Legal title holder",
		description: "Identifies the legal title holder.",
		key: "LEGAL_TITLE_HOLDER",
	},
	{
		value: "TX",
		name: "Shareholder",
		description: "Identifies a shareholder.",
		key: "SHAREHOLDER",
	},
	{
		value: "TY",
		name: "Provider",
		description: "Identifies the provider.",
		key: "PROVIDER",
	},
	{
		value: "TZ",
		name: "Military branch",
		description: "Identifies the branch of the military.",
		key: "MILITARY_BRANCH",
	},
	{
		value: "UA",
		name: "Educational institution",
		description: "Identifies a university, college or school.",
		key: "EDUCATIONAL_INSTITUTION",
	},
	{
		value: "UB",
		name: "Assignor",
		description: "Identifies the assignor.",
		key: "ASSIGNOR",
	},
	{
		value: "UC",
		name: "Ultimate consignee",
		description:
			"Party who has been designated on the invoice or packing list as the final recipient of the stated merchandise.",
		key: "ULTIMATE_CONSIGNEE",
	},
	{
		value: "UD",
		name: "Ultimate customer",
		description: "The final recipient of goods.",
		key: "ULTIMATE_CUSTOMER",
	},
	{
		value: "UE",
		name: "Advisor",
		description: "Identifies the advisor.",
		key: "ADVISOR",
	},
	{
		value: "UF",
		name: "Co-defendant",
		description: "Identifies the co-defendant.",
		key: "CO_DEFENDANT",
	},
	{
		value: "UG",
		name: "Merged company with retained identity",
		description: "Company whose identity has been retained from a merger.",
		key: "MERGED_COMPANY_WITH_RETAINED_IDENTITY",
	},
	{
		value: "UH",
		name: "Party represented",
		description: "Identifies the party represented.",
		key: "PARTY_REPRESENTED",
	},
	{
		value: "UHP",
		name: "Unexpected handling party",
		description:
			"Party authorized (during a voyage) to apply unexpected handling procedures or party having applied these procedures.",
		key: "UNEXPECTED_HANDLING_PARTY",
	},
	{
		value: "UI",
		name: "Assignee",
		description: "Identifies the assignee.",
		key: "ASSIGNEE",
	},
	{
		value: "UJ",
		name: "Key person",
		description: "Identifies the key person.",
		key: "KEY_PERSON",
	},
	{
		value: "UK",
		name: "Author",
		description: "Identifies the author.",
		key: "AUTHOR",
	},
	{
		value: "UL",
		name: "Ultimate parent company",
		description: "Identifies the ultimate parent company.",
		key: "ULTIMATE_PARENT_COMPANY",
	},
	{
		value: "UM",
		name: "Party not to be confused with",
		description: "Identifies a party not to be confused with another party.",
		key: "PARTY_NOT_TO_BE_CONFUSED_WITH",
	},
	{
		value: "UN",
		name: "Accountant",
		description: "Identifies the accountant.",
		key: "ACCOUNTANT",
	},
	{
		value: "UO",
		name: "Plaintiff",
		description: "Identifies the plaintiff.",
		key: "PLAINTIFF",
	},
	{
		value: "UP",
		name: "Unloading party",
		description: "A party to unload the goods.",
		key: "UNLOADING_PARTY",
	},
	{
		value: "UQ",
		name: "Parent company",
		description: "Identifies the parent company.",
		key: "PARENT_COMPANY",
	},
	{
		value: "UR",
		name: "Affiliated company",
		description: "Identifies the affiliated company.",
		key: "AFFILIATED_COMPANY",
	},
	{
		value: "US",
		name: "Bailiff",
		description: "Identifies the bailiff.",
		key: "BAILIFF",
	},
	{
		value: "UT",
		name: "Merged company",
		description: "Identifies the company involved in a merger.",
		key: "MERGED_COMPANY",
	},
	{
		value: "UU",
		name: "Defendant",
		description: "Identifies the defendant.",
		key: "DEFENDANT",
	},
	{
		value: "UV",
		name: "Petitioning creditor",
		description: "Identifies the petitioning creditor.",
		key: "PETITIONING_CREDITOR",
	},
	{
		value: "UW",
		name: "Guarantee agency",
		description: "Identifies the guarantee agency.",
		key: "GUARANTEE_AGENCY",
	},
	{
		value: "UX",
		name: "Organization group",
		description: "Identifies the organization group.",
		key: "ORGANIZATION_GROUP",
	},
	{
		value: "UY",
		name: "Subsidiary",
		description: "Identifies the subsidiary.",
		key: "SUBSIDIARY",
	},
	{
		value: "UZ",
		name: "Industry association",
		description: "Identifies the industry association.",
		key: "INDUSTRY_ASSOCIATION",
	},
	{
		value: "VA",
		name: "Joint owner",
		description: "Identifies the joint owner.",
		key: "JOINT_OWNER",
	},
	{
		value: "VB",
		name: "Joint venture",
		description: "Identifies the joint venture.",
		key: "JOINT_VENTURE",
	},
	{
		value: "VC",
		name: "Filing office",
		description: "Identifies the filing office.",
		key: "FILING_OFFICE",
	},
	{
		value: "VE",
		name: "Court",
		description: "Identifies the court.",
		key: "COURT",
	},
	{
		value: "VF",
		name: "Liability holder",
		description: "Identifies the liability holder.",
		key: "LIABILITY_HOLDER",
	},
	{
		value: "VG",
		name: "Local government sponsor",
		description: "Identifies the local government sponsor.",
		key: "LOCAL_GOVERNMENT_SPONSOR",
	},
	{
		value: "VH",
		name: "Mortgage company",
		description: "Identifies the mortgage company.",
		key: "MORTGAGE_COMPANY",
	},
	{
		value: "VI",
		name: "Notary public",
		description: "Identifies the notary public.",
		key: "NOTARY_PUBLIC",
	},
	{
		value: "VJ",
		name: "Officer",
		description: "Identifies the officer.",
		key: "OFFICER",
	},
	{
		value: "VK",
		name: "Publisher",
		description: "Identifies the publisher.",
		key: "PUBLISHER",
	},
	{
		value: "VL",
		name: "Party manufactured for",
		description:
			"Identifies the party for whom manufacturing of goods is done.",
		key: "PARTY_MANUFACTURED_FOR",
	},
	{
		value: "VM",
		name: "Previous owner",
		description: "Identifies the previous owner.",
		key: "PREVIOUS_OWNER",
	},
	{
		value: "VN",
		name: "Vendor",
		description: "Party vending goods or services.",
		key: "VENDOR",
	},
	{
		value: "VO",
		name: "Purchased company",
		description: "Identifies the purchased company.",
		key: "PURCHASED_COMPANY",
	},
	{
		value: "VP",
		name: "Receiver manager",
		description:
			"Manager of a business which is in receivership status and which will not be liquidated.",
		key: "RECEIVER_MANAGER",
	},
	{
		value: "VQ",
		name: "Responsible government agency",
		description: "Identifies the responsible government agency.",
		key: "RESPONSIBLE_GOVERNMENT_AGENCY",
	},
	{
		value: "VR",
		name: "Sole proprietor",
		description: "Identifies the sole proprietor.",
		key: "SOLE_PROPRIETOR",
	},
	{
		value: "VS",
		name: "Auctioneer",
		description: "Identifies the auctioneer.",
		key: "AUCTIONEER",
	},
	{
		value: "VT",
		name: "Branch",
		description: "Identifies the branch.",
		key: "BRANCH",
	},
	{
		value: "VU",
		name: "Business",
		description: "Identifies the business.",
		key: "BUSINESS",
	},
	{
		value: "VV",
		name: "Ultimate same country parent company",
		description:
			"Identifies the highest level parent company in the same country.",
		key: "ULTIMATE_SAME_COUNTRY_PARENT_COMPANY",
	},
	{
		value: "VW",
		name: "Responsible party",
		description: "Identifies the party that can be called to account.",
		key: "RESPONSIBLE_PARTY",
	},
	{
		value: "VX",
		name: "Secured party",
		description: "Identifies a party that is guaranteed against loss.",
		key: "SECURED_PARTY",
	},
	{
		value: "VY",
		name: "Other related party",
		description: "Identifies an entity as an unspecified but related party.",
		key: "OTHER_RELATED_PARTY",
	},
	{
		value: "VZ",
		name: "Co-debtor",
		description: "Identifies an entity as a joint or mutual debtor.",
		key: "CO_DEBTOR",
	},
	{
		value: "WA",
		name: "Company which holds financial interest",
		description:
			"Identifies a company which holds any financial stake in an undertaking or organization.",
		key: "COMPANY_WHICH_HOLDS_FINANCIAL_INTEREST",
	},
	{
		value: "WB",
		name: "Rating organization",
		description:
			"Identifies an organization responsible for assigning a classification or rating.",
		key: "RATING_ORGANIZATION",
	},
	{
		value: "WC",
		name: "Information reference agency",
		description: "The agency responsible for the reference of information.",
		key: "INFORMATION_REFERENCE_AGENCY",
	},
	{
		value: "WD",
		name: "Warehouse depositor",
		description: "[3004] Party depositing goods in a warehouse.",
		key: "WAREHOUSE_DEPOSITOR",
	},
	{
		value: "WE",
		name: "Compilation agency",
		description: "The agency responsible for the compilation of information.",
		key: "COMPILATION_AGENCY",
	},
	{
		value: "WF",
		name: "Information maintenance agency",
		description: "The agency responsible for the maintenance of information.",
		key: "INFORMATION_MAINTENANCE_AGENCY",
	},
	{
		value: "WG",
		name: "Information dissemination agency",
		description: "The agency responsible for the dissemination of information.",
		key: "INFORMATION_DISSEMINATION_AGENCY",
	},
	{
		value: "WH",
		name: "Warehouse keeper",
		description:
			"[3022] Party taking responsibility for goods entered into a warehouse.",
		key: "WAREHOUSE_KEEPER",
	},
	{
		value: "WI",
		name: "Inspection address",
		description: "Specifies the address for an inspection.",
		key: "INSPECTION_ADDRESS",
	},
	{
		value: "WJ",
		name: "Refusal party",
		description: "Identification of the party responsible for a refusal.",
		key: "REFUSAL_PARTY",
	},
	{
		value: "WK",
		name: "Value added network provider",
		description:
			"A party that provides telecommunications interconnectivity services in an electronic data interchange environment.",
		key: "VALUE_ADDED_NETWORK_PROVIDER",
	},
	{
		value: "WL",
		name: "Agency",
		description: "The business or establishment of an agent.",
		key: "AGENCY",
	},
	{
		value: "WM",
		name: "Works manager",
		description: "A party managing works.",
		key: "WORKS_MANAGER",
	},
	{
		value: "WN",
		name: "Party to receive order to supply",
		description:
			"Party designated by the registering party to receive a binding direction to supply something.",
		key: "PARTY_TO_RECEIVE_ORDER_TO_SUPPLY",
	},
	{
		value: "WO",
		name: "Party to receive invitation to offer",
		description: "An entity to receive an invitation to offer.",
		key: "PARTY_TO_RECEIVE_INVITATION_TO_OFFER",
	},
	{
		value: "WP",
		name: "Sub-entity",
		description: "A part into which an entity has been divided.",
		key: "SUB_ENTITY",
	},
	{
		value: "WPA",
		name: "Weighting party",
		description: "Party designated (legally accepted) to ascertain the weight.",
		key: "WEIGHTING_PARTY",
	},
	{
		value: "WQ",
		name: "Doing business as",
		description: "The name under which business is conducted.",
		key: "DOING_BUSINESS_AS",
	},
	{
		value: "WR",
		name: "Party submitting quote",
		description: "The party stating the price of something to be purchased.",
		key: "PARTY_SUBMITTING_QUOTE",
	},
	{
		value: "WS",
		name: "Wholesaler",
		description:
			"Seller of articles, often in large quantities, to be retailed by others.",
		key: "WHOLESALER",
	},
	{
		value: "WT",
		name: "Affiliated party",
		description: "A party attached or connected to another party.",
		key: "AFFILIATED_PARTY",
	},
	{
		value: "WU",
		name: "Previous name",
		description: "Name of an entity used before the current name.",
		key: "PREVIOUS_NAME",
	},
	{
		value: "WV",
		name: "Party performing task",
		description:
			"An entity responsible for performing a task to be undertaken.",
		key: "PARTY_PERFORMING_TASK",
	},
	{
		value: "WW",
		name: "Registering party",
		description: "Party performing the registration.",
		key: "REGISTERING_PARTY",
	},
	{
		value: "WX",
		name: "Inland clearance depot operator",
		description:
			"Party that offers the facility for the goods or container(s) to be cleared by customs authorities or other governmental authorities in the interior of a country.",
		key: "INLAND_CLEARANCE_DEPOT_OPERATOR",
	},
	{
		value: "WY",
		name: "Destination terminal operator",
		description:
			"Party that operates a terminal to which goods or containers are destined.",
		key: "DESTINATION_TERMINAL_OPERATOR",
	},
	{
		value: "WZ",
		name: "Departure terminal operator",
		description:
			"Party that operates a terminal from which goods or containers have departed or will depart.",
		key: "DEPARTURE_TERMINAL_OPERATOR",
	},
	{
		value: "ZZZ",
		name: "Mutually defined",
		description:
			"Party specification mutually agreed between interchanging parties.",
		key: "MUTUALLY_DEFINED",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		untdid3035: typeof untdid3035;
	}
}
registerCodelist("untdid3035", untdid3035);

export default untdid3035;
