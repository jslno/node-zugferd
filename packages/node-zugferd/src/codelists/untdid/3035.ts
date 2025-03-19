/**
 * @see https://service.unece.org/trade/untdid/d00a/tred/tred3035.htm
 */

export type Untdid3035Definition = {
	code: string;
	name?: string;
	description?: string;
};

export type Untdid1229Code = (typeof UNTDID_3035)[number]["code"];

export const UNTDID_3035_IDENTIFIER = "untdid.3035" as const;

export const UNTDID_3035 = [
	{
		code: "AA",
		name: "Party to be billed (AAR Accounting rule 11)",
		description:
			"Party to be billed in accordance with AAR Accounting rule 11.",
	},
	{
		code: "AB",
		name: "Buyer's agent/representative",
		description:
			"Third party who arranged the purchase of merchandise on behalf of the actual buyer.",
	},
	{
		code: "AE",
		name: "Declarant's agent/representative",
		description:
			"Any natural or legal person who makes a declaration to an official body on behalf of another natural or legal person, where legally permitted (CCC).",
	},
	{
		code: "AF",
		name: "Transit principal",
		description:
			"Natural or legal person responsible for the satisfactory performance of a Customs transit operation. Source: CCC.",
	},
	{
		code: "AG",
		name: "Agent/representative",
		description: "(3196) Party authorized to act on behalf of another party.",
	},
	{
		code: "AH",
		name: "Transit principal's agent/representative",
		description: "Agent acting on behalf of the transit principal (CCC).",
	},
	{
		code: "AI",
		name: "Successful job applicant",
		description: "Person who has been chosen for a job.",
	},
	{
		code: "AJ",
		name: "Party issuing mutually agreed codes",
		description:
			"The party which has issued all mutually agreed codes used in the message.",
	},
	{
		code: "AK",
		name: "Acknowledgement recipient",
		description: "Party to whom acknowledgement should be sent.",
	},
	{
		code: "AL",
		name: "Principal",
		description:
			"(3340) Party accepting liability for goods held or moving (e.g. transit) under a Customs authorization and - when applicable - a guarantee.",
	},
	{
		code: "AM",
		name: "Authorized official",
		description:
			"Employee of a company or firm authorized to act on behalf of that company or firm e.g. to make a Customs declaration.",
	},
	{
		code: "AN",
		name: "Approved importer",
		description:
			"Person or company which is authorised by the relevant Customs authority to import goods without payment all taxes or specific taxes at the point of entry into the country.",
	},
	{
		code: "AO",
		name: "Account of",
		description: "Party account is assigned to.",
	},
	{
		code: "AP",
		name: "Accepting party",
		description: "(3352) Party accepting goods, products, services etc.",
	},
	{
		code: "AQ",
		name: "Approved consignor",
		description:
			"Person or company approved by the relevant authority in the country to pack and export specific goods under Customs supervision.",
	},
	{
		code: "AR",
		name: "Authorized exporter",
		description:
			"Exporter authorized/approved by Customs for special Customs procedures e.g. simplified procedure.",
	},
	{
		code: "AS",
		name: "Account servicing financial institution",
		description:
			"Identifies the financial institution servicing the account(s).",
	},
	{
		code: "AT",
		name: "Authorized importer",
		description:
			"Importer authorized/approved by Customs for special Customs procedures e.g. simplified procedure.",
	},
	{
		code: "AU",
		name: "Authorized trader (transit)",
		description:
			"Trader authorized/approved by Customs for special transit procedures e.g. simplified procedure.",
	},
	{
		code: "AV",
		name: "Authorizing official",
		description:
			"Party that has delegated the authority to take a certain action on behalf of a company or agency.",
	},
	{
		code: "AW",
		name: "Applicant's bank",
		description:
			"Financial institution which is requested to issue the documentary credit.",
	},
	{
		code: "AX",
		name: "Authenticating party",
		description: "Party which certifies that a document is authentic.",
	},
	{
		code: "AY",
		name: "Animal being investigated",
		description: "Animal being investigated.",
	},
	{
		code: "AZ",
		name: "Issuing bank",
		description:
			"Financial institution which issues the documentary credit, if the applicant's bank is not acting as the issuing bank.",
	},
	{
		code: "B1",
		name: "Contact bank 1",
		description:
			"Identifies an additional bank which must be informed of certain aspects of the message.",
	},
	{
		code: "B2",
		name: "Contact bank 2",
		description:
			"Identifies an additional bank which must be informed of certain aspects of the message.",
	},
	{
		code: "BA",
		name: "Booking agent",
		description:
			"Party acting as a booking office for transport and forwarding services.",
	},
	{
		code: "BB",
		name: "Buyer's bank",
		description: "[3420] Bank employed by the buyer to make payment.",
	},
	{
		code: "BC",
		name: "Negotiating bank",
		description:
			"Financial institution to whom a negotiable documentary credit is directed.",
	},
	{
		code: "BD",
		name: "Documentary credit reimbursing bank",
		description: "Self-explanatory.",
	},
	{
		code: "BE",
		name: "Beneficiary",
		description:
			"The ultimate recipient of the funds. Normally the account owner who is reimbursed by the payor.",
	},
	{
		code: "BF",
		name: "Beneficiary's bank",
		description:
			"Identifies the account servicer for the beneficiary or the payee.",
	},
	{
		code: "BG",
		name: "Employer",
		description: "Self-explanatory.",
	},
	{
		code: "BH",
		name: "Previous employer",
		description: "Previous employer of a person(s).",
	},
	{
		code: "BI",
		name: "Buyer's financial institution",
		description: "Financial institution designated by buyer to make payment.",
	},
	{
		code: "BJ",
		name: "Release to party",
		description:
			"Party to which the goods or container(s) is (are) to be released.",
	},
	{
		code: "BK",
		name: "Financial institution",
		description: "Party acting as financial institution.",
	},
	{
		code: "BL",
		name: "Bill of lading recipient",
		description: "Party to receive B/L.",
	},
	{
		code: "BM",
		name: "Insured",
		description: "Party which is the object of an insurance contract.",
	},
	{
		code: "BN",
		name: "Insurance beneficiary",
		description: "Party which benefits from insurance coverage.",
	},
	{
		code: "BO",
		name: "Broker or sales office",
		description:
			"Party acting in the name of the seller as broker or as sales office.",
	},
	{
		code: "BP",
		name: "Building site purchaser",
		description:
			"Party at the building site responsible for the purchasing of goods and services for that particular site.",
	},
	{
		code: "BQ",
		name: "Cheque drawn bank",
		description:
			"Identifies the bank on which the cheque should be drawn, as instructed by the ordering customer.",
	},
	{
		code: "BS",
		name: "Bill and ship to",
		description: "Party receiving goods and relevant invoice.",
	},
	{
		code: "BT",
		name: "Party to be billed for other than freight (bill to)",
		description: "Party receiving invoice excluding freight costs.",
	},
	{
		code: "BU",
		name: "Service bureau",
		description:
			"Party carrying out service bureau processing work, (e.g. a payroll bureau).",
	},
	{
		code: "BV",
		name: "Member",
		description:
			"Member of a group (e.g. of a group of persons or a service scheme).",
	},
	{
		code: "BW",
		name: "Borrower",
		description: "Self explanatory.",
	},
	{
		code: "BX",
		name: "Building site engineer",
		description:
			"Party at the building site responsible for engineering matters for that particular site.",
	},
	{
		code: "BY",
		name: "Buyer",
		description: "Party to whom merchandise and/or service is sold.",
	},
	{
		code: "BZ",
		name: "Building site forwarder",
		description:
			"Party at the building site responsible for forwarding the received goods on that particular site.",
	},
	{
		code: "C1",
		name: "In care of party no. 1",
		description: "Description to be provided.",
	},
	{
		code: "C2",
		name: "In care of party no. 2",
		description: "Description to be provided.",
	},
	{
		code: "CA",
		name: "Carrier",
		description:
			"(3126) Party undertaking or arranging transport of goods between named points.",
	},
	{
		code: "CB",
		name: "Customs broker",
		description:
			"Agent or representative or a professional Customs clearing agent who deals directly with Customs on behalf of the importer or exporter (CCC).",
	},
	{
		code: "CC",
		name: "Claimant",
		description: "Party who claims goods or insurance.",
	},
	{
		code: "CD",
		name: "Agent's bank",
		description: "Bank of the agent.",
	},
	{
		code: "CE",
		name: "Ceding company",
		description: "Description to be provided.",
	},
	{
		code: "CF",
		name: "Container operator/lessee",
		description:
			" Party to whom the possession of specified property (e.g. container) has been conveyed for a period of time in return for rental payments.",
	},
	{
		code: "CG",
		name: "Carrier's agent",
		description: "Party authorized to act for or on behalf of carrier.",
	},
	{
		code: "CH",
		name: "Connecting carrier",
		description:
			"Owner or operator of a transportation conveyance to which goods in a given transaction will be transferred.",
	},
	{
		code: "CI",
		name: "Commission processor",
		description:
			"Party who provides extra treatment to goods on commission base.",
	},
	{
		code: "CJ",
		name: "Previous member",
		description: "Previous member of a group of persons or a service scheme.",
	},
	{
		code: "CK",
		name: "Empty equipment despatch party",
		description:
			"Party from whose premises empty equipment will be or has been despatched.",
	},
	{
		code: "CL",
		name: "Container location party",
		description:
			"Party from whose premises container will be or has been despatched.",
	},
	{
		code: "CM",
		name: "Customs",
		description:
			"Identification of customs authority relevant to the transaction or shipment.",
	},
	{
		code: "CN",
		name: "Consignee",
		description: "(3132) Party to which goods are consigned.",
	},
	{
		code: "CNX",
		name: "Cash pool top account servicing financial institution",
		description:
			"Identification of a financial institution servicing the top account of a cash pool.",
	},
	{
		code: "CNY",
		name: "Cash pool level account servicing financial institution",
		description:
			"Identification of a financial institution servicing the level account of a cash pool.",
	},
	{
		code: "CNZ",
		name: "Cash pool sub-account servicing financial institution",
		description:
			"Identification of a financial institution servicing the sub-account of a cash pool.",
	},
	{
		code: "CO",
		name: "Corporate office",
		description: "Identification of the Head Office within a company.",
	},
	{
		code: "COA",
		name: "Entity in which a financial interest is held",
		description: "Business in which a financial interest is held.",
	},
	{
		code: "COB",
		name: "Intermediate level parent company",
		description: "Identifies an intermediate parent company.",
	},
	{
		code: "COC",
		name: "Transshipment party",
		description: "A party responsible for transshipment.",
	},
	{
		code: "COD",
		name: "Quotation requesting party",
		description: "Party sending a request for a quotation.",
	},
	{
		code: "COE",
		name: "Party maintaining the codes used in the message",
		description: "The party which maintains the codes used in the message.",
	},
	{
		code: "COF",
		name: "Party maintaining the identifiers used in the message",
		description:
			"The party which maintains the identifiers used in the message.",
	},
	{
		code: "COG",
		name: "Dispatcher",
		description:
			"An individual responsible for sending something to a destination.",
	},
	{
		code: "COH",
		name: "Submitter of sample",
		description: "An entity responsible for the submission of a sample.",
	},
	{
		code: "COI",
		name: "Institutional provider",
		description: "The institution providing the service.",
	},
	{
		code: "COJ",
		name: "Primary health care provider",
		description:
			"Health care provider that has primary responsibility for patient.",
	},
	{
		code: "COK",
		name: "Assistant surgeon",
		description: "Physician assisting in surgery.",
	},
	{
		code: "COL",
		name: "Admitting health care provider",
		description: "Health care provider that admitted the patient.",
	},
	{
		code: "COM",
		name: "Referring health care provider",
		description:
			"Health care provider that referred patient to current provider of services.",
	},
	{
		code: "CON",
		name: "Supervising health care provider",
		description:
			"Health care provider that supervised the rendering of a service.",
	},
	{
		code: "COO",
		name: "Party providing financing",
		description: "Identifies the party providing the financing.",
	},
	{
		code: "COP",
		name: "Convoying party",
		description: "Party designated to escort the transported goods.",
	},
	{
		code: "COQ",
		name: "Nominated bank",
		description: "Identifies the nominated bank.",
	},
	{
		code: "COR",
		name: "Family member",
		description: "Identifies a family member.",
	},
	{
		code: "COS",
		name: "Co-participant",
		description: "Identifies another party who participates in an activity.",
	},
	{
		code: "COT",
		name: "Involved party",
		description: "Party which is involved in an activity.",
	},
	{
		code: "COU",
		name: "Assigner",
		description: "Identifies the entity who assigns.",
	},
	{
		code: "COV",
		name: "Registered principal",
		description:
			"An individual who is registered as a principal for an entity.",
	},
	{
		code: "COW",
		name: "Freight payer on behalf of the consignor",
		description:
			"Freight payer is a third party acting on behalf of the consignor.",
	},
	{
		code: "COX",
		name: "Freight payer on behalf of the consignee",
		description:
			"Freight payer is a third party acting on behalf of the consignee.",
	},
	{
		code: "COY",
		name: "Party responsible for disinfection",
		description: "Party responsible for performing disinfection operations.",
	},
	{
		code: "COZ",
		name: "Party responsible for refueling",
		description: "Party responsible for performing refueling operations.",
	},
	{
		code: "CP",
		name: "Party to receive certificate of compliance",
		description:
			"Party acting for or on behalf of seller in matters concerning compliance.",
	},
	{
		code: "CPA",
		name: "Advising bank",
		description:
			"Identifies the financial institution used by the issuing bank to advise the documentary credit.",
	},
	{
		code: "CPB",
		name: "Reimbursing bank",
		description:
			"Identifies the financial institution through which the reimbursement is to be effected.",
	},
	{
		code: "CPC",
		name: "Advise through bank",
		description:
			"Identifies the financial institution through which the advising bank is to advise.",
	},
	{
		code: "CPD",
		name: "Charges payer at destination",
		description:
			"Party, other than the ordering party, which has to pay the charges concerning the destination operations.",
	},
	{
		code: "CPE",
		name: "Vessel master",
		description: "Master of the conveyance.",
	},
	{
		code: "CPF",
		name: "Means of transport charterer",
		description: "Charterer of the means of transport.",
	},
	{
		code: "CPG",
		name: "Excise party",
		description: "Party to whom excise must be paid.",
	},
	{
		code: "CQ",
		name: "Cheque order",
		description:
			"Party to which the cheque will be ordered, when different from the beneficiary.",
	},
	{
		code: "CR",
		name: "Empty equipment return party",
		description:
			"Party to whose premises empty equipment will be or has been returned.",
	},
	{
		code: "CS",
		name: "Consolidator",
		description: "Party consolidating various consignments, payments etc.",
	},
	{
		code: "CT",
		name: "Consignee to be specified",
		description: "The party to be identified at a later time as the consignee.",
	},
	{
		code: "CU",
		name: "Container return company",
		description: "The company to which containers have to be returned.",
	},
	{
		code: "CV",
		name: "Consignee of vessel",
		description: "Description to be provided.",
	},
	{
		code: "CW",
		name: "Equipment owner",
		description: "Owner of equipment (container, etc.).",
	},
	{
		code: "CX",
		name: "Consignee's agent",
		description: "Party authorized to act on behalf of the consignee.",
	},
	{
		code: "CY",
		name: "Commissionable agent",
		description: "IATA cargo agent entitled to commission.",
	},
	{
		code: "CZ",
		name: "Consignor",
		description:
			"(3336) Party which, by contract with a carrier, consigns or sends goods with the carrier, or has them conveyed by him. Synonym: shipper, sender.",
	},
	{
		code: "DA",
		name: "Available with bank (documentary credits)",
		description:
			"Financial institution with whom the documentary credit is available.",
	},
	{
		code: "DB",
		name: "Distributor branch",
		description: "The affiliate of a retailer or distributor.",
	},
	{
		code: "DC",
		name: "Deconsolidator",
		description:
			"Party that splits up a large consignment composed of separate consignments of goods. The smaller consignments of goods were grouped together into that large consignment for carriage as a larger unit in order to obtain a reduced rate.",
	},
	{
		code: "DCP",
		name: "Despatch charge payer",
		description:
			"Party, other than the ordering party, which has to pay the charges concerning the despatch operations.",
	},
	{
		code: "DD",
		name: "Documentary credit account party's bank",
		description: "Bank of the documentary credit account party.",
	},
	{
		code: "DE",
		name: "Depositor",
		description: "Party depositing goods, financial payments or documents.",
	},
	{
		code: "DF",
		name: "Documentary credit applicant",
		description:
			"Party at whose request the applicant's bank/issuing bank is to issue a documentary credit.",
	},
	{
		code: "DG",
		name: "Documentary credit beneficiary",
		description:
			"Party in whose favour the documentary credit is to be issued and the party that must comply with the credit's terms and conditions.",
	},
	{
		code: "DH",
		name: "Documentary credit account party",
		description:
			"Party which is responsible for the payment settlement of the documentary credit with the applicant's bank/issuing bank, if different from the documentary credit applicant.",
	},
	{
		code: "DI",
		name: "Documentary credit second beneficiary",
		description: "Party to whom the documentary credit can be transferred.",
	},
	{
		code: "DJ",
		name: "Party according to documentary credit transaction",
		description: "Party related to documentary credit transaction.",
	},
	{
		code: "DK",
		name: "Documentary credit beneficiary's bank",
		description:
			"Financial institution with which the beneficiary of the documentary credit maintains an account.",
	},
	{
		code: "DL",
		name: "Factor",
		description:
			"Company offering a financial service whereby a firm sells or transfers title to its accounts receivable to the factoring company.",
	},
	{
		code: "DM",
		name: "Party to whom documents are to be presented",
		description: "Self explanatory.",
	},
	{
		code: "DN",
		name: "Owner of operation",
		description: "Owner of the operation.",
	},
	{
		code: "DO",
		name: "Document recipient",
		description: "(1370) Party which should receive a specified document.",
	},
	{
		code: "DP",
		name: "Delivery party",
		description:
			"(3144) Party to which goods should be delivered, if not identical with consignee.",
	},
	{
		code: "DQ",
		name: "Owner's agent",
		description: "Person acting on delegation of powers of the owner.",
	},
	{
		code: "DR",
		name: "Driver",
		description: "Person who drives a means of transport.",
	},
	{
		code: "DS",
		name: "Distributor",
		description: "Party distributing goods, financial payments or documents.",
	},
	{
		code: "DT",
		name: "Declarant",
		description:
			"(3140) Party who makes a declaration to an official body or - where legally permitted - in whose name, or on whose behalf, a declaration to an official body is made.",
	},
	{
		code: "DU",
		name: "Owner's representative",
		description:
			"Person commissioned by the owner to represent him in certain circumstances.",
	},
	{
		code: "DV",
		name: "Project management office",
		description:
			"Party commissioned by the owner to follow through the execution of all works.",
	},
	{
		code: "DW",
		name: "Drawee",
		description: "Party on whom drafts must be drawn.",
	},
	{
		code: "DX",
		name: "Engineer (construction)",
		description:
			"Party representing the contractor to advise and supervise engineering aspects of the works.",
	},
	{
		code: "DY",
		name: "Engineer, resident (construction)",
		description:
			"Party commissioned by the owner to advise and supervise engineering aspects of the works.",
	},
	{
		code: "DZ",
		name: "Architect",
		description: "Self explanatory.",
	},
	{
		code: "EA",
		name: "Architect-designer",
		description: "Designer of the construction project.",
	},
	{
		code: "EB",
		name: "Building inspectorate",
		description:
			"Party controlling the conformity of works to legal and regulation rules.",
	},
	{
		code: "EC",
		name: "Exchanger",
		description: "Party exchanging currencies or goods.",
	},
	{
		code: "ED",
		name: "Engineer, consultant",
		description: "Party providing professional engineering services.",
	},
	{
		code: "EE",
		name: "Location of goods for customs examination before clearance",
		description: "SE.",
	},
	{
		code: "EF",
		name: "Project coordination office",
		description: "Party responsible for technical coordination of works.",
	},
	{
		code: "EG",
		name: "Surveyor, topographical",
		description: "Party responsible for topographical measurements.",
	},
	{
		code: "EH",
		name: "Engineer, measurement",
		description: "Party responsible for quantity measurements.",
	},
	{
		code: "EI",
		name: "Controller, quality",
		description:
			"Party controlling the quality of goods and workmanship for the project.",
	},
	{
		code: "EJ",
		name: "Surveyor, quantity",
		description:
			"Party responsible for the quantification and valuation of the works on behalf of the contractor.",
	},
	{
		code: "EK",
		name: "Surveyor (professional), quantity",
		description:
			"Party responsible to the owner for the quantification and valuation of the works.",
	},
	{
		code: "EL",
		name: "Project",
		description:
			"Party responsible for a project, e.g. a construction project.",
	},
	{
		code: "EM",
		name: "Party to receive electronic memo of invoice",
		description: "Party being informed about invoice issue (via EDI).",
	},
	{
		code: "EN",
		name: "Tenderer",
		description: "Firm answering an invitation to tender.",
	},
	{
		code: "EO",
		name: "Owner of equipment",
		description: "Party who owns equipment.",
	},
	{
		code: "EP",
		name: "Equipment drop-off party",
		description: "The party which drops off equipment.",
	},
	{
		code: "EQ",
		name: "Empty container responsible party",
		description: "Party responsible for the empty container.",
	},
	{
		code: "ER",
		name: "Empty container return agent",
		description:
			"Party, designated by owner of containers, responsible for their collection as agreed between the owner and customer/ consignee.",
	},
	{
		code: "ES",
		name: "Contractor, lead",
		description: "Leader representing a grouping of co-contractors.",
	},
	{
		code: "ET",
		name: "Co-contractor",
		description: "Member of a grouping of co-contractors.",
	},
	{
		code: "EU",
		name: "Contractor, general",
		description:
			"Single contractor for the whole construction project, working by his own or with subcontractors.",
	},
	{
		code: "EV",
		name: "Subcontractor",
		description: "Firm carrying out a part of the works for a contractor.",
	},
	{
		code: "EW",
		name: "Subcontractor with direct payment",
		description: "Subcontractor benefiting from direct payments.",
	},
	{
		code: "EX",
		name: "Exporter",
		description:
			"(3030) Party who makes - or on whose behalf a Customs clearing agent or other authorized person makes - an export declaration. This may include a manufacturer, seller or other person. Within a Customs union, consignor may have the same meaning as exporter.",
	},
	{
		code: "EY",
		name: "Subcontractor, nominated",
		description:
			"Subcontractor authorized by the owner after having been proposed.",
	},
	{
		code: "EZ",
		name: "Operator, essential services",
		description:
			"Operator of essential services e.g. water, sewerage system, power.",
	},
	{
		code: "FA",
		name: "Operator, communication channel",
		description: "Operator of a communication channel.",
	},
	{
		code: "FB",
		name: "Nominated freight company",
		description:
			"Party nominated to act as transport company or carrier for the goods.",
	},
	{
		code: "FC",
		name: "Contractor, main",
		description:
			"Firm or grouping of co-contractors which has been awarded the contract.",
	},
	{
		code: "FD",
		name: "Buyer's parent company",
		description: "Parent company, e.g. holding company.",
	},
	{
		code: "FE",
		name: "Credit rating agency",
		description: "Self explanatory.",
	},
	{
		code: "FF",
		name: "Factor, correspondent",
		description:
			"Factoring company engaged by another factoring company to assist the letter with the services provided to the clients (sellers).",
	},
	{
		code: "FG",
		name: "Buyer as officially registered",
		description: "Buying party as officially registered with government.",
	},
	{
		code: "FH",
		name: "Seller as officially registered",
		description: "Selling party as officially registered with government.",
	},
	{
		code: "FI",
		name: "Copy message to",
		description: "Party that is to receive a copy of a message.",
	},
	{
		code: "FJ",
		name: "Trade Union",
		description: "Organisation representing employees.",
	},
	{
		code: "FK",
		name: "Previous Trade Union",
		description:
			"Employee organisation who previously represented an employee .",
	},
	{
		code: "FL",
		name: "Passenger",
		description:
			"A person conveyed by a means of transport, other than the crew.",
	},
	{
		code: "FM",
		name: "Crew member",
		description: "A person manning a means of transport.",
	},
	{
		code: "FN",
		name: "Tariff issuer",
		description: "The issuer of a tariff, e.g. a freight tariff.",
	},
	{
		code: "FO",
		name: "Party performing inspection",
		description: "Self explanatory.",
	},
	{
		code: "FP",
		name: "Freight/charges payer",
		description: "Party responsible for the payment of freight.",
	},
	{
		code: "FQ",
		name: "Container survey agent",
		description: "The container survey agency that will survey the containers.",
	},
	{
		code: "FR",
		name: "Message from",
		description: "Party where the message comes from.",
	},
	{
		code: "FS",
		name: "Party authorized to make definite a contract action",
		description:
			"Party who has the authority to make definite a contract action.",
	},
	{
		code: "FT",
		name: "Party responsible for financial settlement",
		description:
			"(3450) Party responsible for either the transfer or repatriation of the funds relating to a transaction.",
	},
	{
		code: "FU",
		name: "Hazardous material office",
		description:
			"The office responsible for providing information regarding hazardous material.",
	},
	{
		code: "FV",
		name: "Party providing government furnished property",
		description:
			"The party responsible for providing government furnished property.",
	},
	{
		code: "FW",
		name: "Freight forwarder",
		description: "Party arranging forwarding of goods.",
	},
	{
		code: "FX",
		name: "Current receiver",
		description:
			"Current receiver of the goods in a multi-step transportation process (indirect flow) involving at least one grouping centre.",
	},
	{
		code: "FY",
		name: "Current sender",
		description:
			"Current sender of the goods in a multi-step transportation process (indirect flow) involving at least one grouping centre.",
	},
	{
		code: "FZ",
		name: "Grouping centre",
		description:
			"A party in charge of groupage, including degroupage and regroupage.",
	},
	{
		code: "GA",
		name: "Road carrier",
		description: "A road carrier moving cargo.",
	},
	{
		code: "GB",
		name: "Chamber of commerce",
		description:
			"Name of the Chamber of Commerce of the town where the company is registered.",
	},
	{
		code: "GC",
		name: "Goods custodian",
		description: "(3024) Party responsible for the keeping of goods.",
	},
	{
		code: "GD",
		name: "Producer",
		description: "Party or person who has produced the produce.",
	},
	{
		code: "GE",
		name: "Registration tribunal",
		description: "Name of the tribunal where the company is registered.",
	},
	{
		code: "GF",
		name: "Slot charter party",
		description:
			"An identification code of a participant or user that books slots (space) on a ship, more likely on a long term basis on a series of sailings. He pays for the space whether he uses it or not.",
	},
	{
		code: "GG",
		name: "Warehouse",
		description: "The name of the warehouse where product is held.",
	},
	{
		code: "GH",
		name: "Applicant for job",
		description: "A person who applied for a job.",
	},
	{
		code: "GI",
		name: "Spouse",
		description: "Person is a spouse.",
	},
	{
		code: "GJ",
		name: "Mother",
		description: "Person is a mother.",
	},
	{
		code: "GK",
		name: "Father",
		description: "Person is a father.",
	},
	{
		code: "GL",
		name: "Socially insured person",
		description: "A person who is registered in a social security scheme.",
	},
	{
		code: "GM",
		name: "Inventory controller",
		description:
			"To specifically identify the party in charge of inventory control.",
	},
	{
		code: "GN",
		name: "Processor",
		description: "Party or person who has or will apply a process.",
	},
	{
		code: "GO",
		name: "Goods owner",
		description: "The party which owns the goods.",
	},
	{
		code: "GP",
		name: "Packer",
		description:
			"Party or person who has undertaken or will undertake packing.",
	},
	{
		code: "GQ",
		name: "Slaughterer",
		description:
			"Party or person who has undertaken or will undertake a slaughter.",
	},
	{
		code: "GR",
		name: "Goods releaser",
		description:
			"(3026) Party entitled to authorize release of goods from custodian.",
	},
	{
		code: "GS",
		name: "Consignor's representative",
		description: "Party authorised to represent the consignor.",
	},
	{
		code: "GT",
		name: "Rail carrier",
		description: "A carrier moving cargo, including containers, via rail.",
	},
	{
		code: "GU",
		name: "Originator of article number",
		description:
			"A code identifying the party which created a specific article number.",
	},
	{
		code: "GV",
		name: "Procurement responsibility for order",
		description:
			"A code used to identify the organization which is responsible for the procurement.",
	},
	{
		code: "GW",
		name: "Party fulfilling all operations",
		description:
			"Code indicating the fact that the party identified carries out all operations within that company's activities.",
	},
	{
		code: "GX",
		name: "Central catalogue party",
		description: "Party controlling a central catalogue.",
	},
	{
		code: "GY",
		name: "Inventory reporting party",
		description: "Party reporting inventory information.",
	},
	{
		code: "GZ",
		name: "Substitute supplier",
		description:
			"Party which may be in a position to supply products or services should the main usual supplier be unable to do so.",
	},
	{
		code: "HA",
		name: "Party which delivers consignments to the terminal",
		description: "Party which delivers consignments to a terminal.",
	},
	{
		code: "HB",
		name: "Party which picks up consignments from the terminal",
		description: "Party which picks up consignments from a terminal.",
	},
	{
		code: "HC",
		name: "Transit freight forwarder",
		description:
			"Freight forwarder to whom transit consignments are addressed, and from whom they are to be on-forwarded.",
	},
	{
		code: "HD",
		name: "Inspection and acceptance party",
		description: "The party who will perform inspection and acceptance.",
	},
	{
		code: "HE",
		name: "Transportation office",
		description: "The office that provides transportation information.",
	},
	{
		code: "HF",
		name: "Contract administration office",
		description: "The office responsible for the administration of a contract.",
	},
	{
		code: "HG",
		name: "Investigator",
		description: "A party who conducts investigations.",
	},
	{
		code: "HH",
		name: "Audit office",
		description: "The office responsible for conducting audits.",
	},
	{
		code: "HI",
		name: "Requestor",
		description: "The party requesting an action.",
	},
	{
		code: "HJ",
		name: "Foreign disclosure information office",
		description:
			"The office that reviews sensitive information for foreign disclosure.",
	},
	{
		code: "HK",
		name: "Mark-for party",
		description:
			"The party within an organization for whom the material is marked to be delivered.",
	},
	{
		code: "HL",
		name: "Party to receive reports",
		description: "The party to whom reports are to be submitted.",
	},
	{
		code: "HM",
		name: "Alternative manufacturer",
		description:
			"Party identification of an alternative manufacturer for a product.",
	},
	{
		code: "HN",
		name: "Service performer",
		description: "The party who is performing a service.",
	},
	{
		code: "HO",
		name: "Shipper's association",
		description: "An association of shippers.",
	},
	{
		code: "HP",
		name: "Final message recipient",
		description: "To identify the final recipient of the message.",
	},
	{
		code: "HQ",
		name: "Account owner",
		description: "Identifies the owner of the account.",
	},
	{
		code: "HR",
		name: "Shipping line service",
		description: "Identifies the shipping line service organization.",
	},
	{
		code: "HS",
		name: "Creditor",
		description: "Party to whom payment is due.",
	},
	{
		code: "HT",
		name: "Clearing house",
		description: "Institution through which funds will be paid.",
	},
	{
		code: "HU",
		name: "Ordering bank",
		description:
			"Bank which instructed the sender to act on the transaction(s).",
	},
	{
		code: "HV",
		name: "Receiver of funds",
		description: "Identifies the party that receives the funds.",
	},
	{
		code: "HW",
		name: "Sender of funds",
		description: "Identifies the party that sends the funds.",
	},
	{
		code: "HX",
		name: "Debtor",
		description: "Party from whom payment is due.",
	},
	{
		code: "HY",
		name: "Presenting bank",
		description: "The bank which presents documents to the drawee.",
	},
	{
		code: "HZ",
		name: "Work team",
		description: "Team responsible for performing work.",
	},
	{
		code: "I1",
		name: "Intermediary bank 1",
		description:
			"A financial institution between the ordered bank and the beneficiary's bank.",
	},
	{
		code: "I2",
		name: "Intermediary bank 2",
		description:
			"A financial institution between the ordered bank and the beneficiary's bank.",
	},
	{
		code: "IB",
		name: "Intermediary/broker",
		description: "Description to be provided.",
	},
	{
		code: "IC",
		name: "Intermediate consignee",
		description: "The intermediate consignee.",
	},
	{
		code: "ID",
		name: "Replacing manufacturer",
		description:
			"A code used to identify a party who replaces the previous party for the manufacture of an article.",
	},
	{
		code: "IE",
		name: "Non-resident third party company with whom financial account is held",
		description:
			"Identifies the non-resident third party company with whom the financial account is held.",
	},
	{
		code: "IF",
		name: "Non-resident group company with whom financial account is held",
		description:
			"Identifies the non-resident group company with whom the financial account is held.",
	},
	{
		code: "IG",
		name: "Non-resident beneficiary",
		description:
			"The ultimate non-resident recipient of the funds. Normally the account owner who is reimbursed by the payor.",
	},
	{
		code: "IH",
		name: "Resident beneficiary",
		description:
			"The ultimate resident recipient of the funds. Normally the account owner who is reimbursed by the payor.",
	},
	{
		code: "II",
		name: "Issuer of invoice",
		description: "(3028) Party issuing an invoice.",
	},
	{
		code: "IJ",
		name: "Non-resident instructing party",
		description:
			"Identifies the non-resident party originating the instruction.",
	},
	{
		code: "IL",
		name: "Resident instructing party",
		description: "Identifies the resident party originating the instruction.",
	},
	{
		code: "IM",
		name: "Importer",
		description:
			"(3020) Party who makes - or on whose behalf a Customs clearing agent or other authorized person makes - an import declaration. This may include a person who has possession of the goods or to whom the goods are consigned.",
	},
	{
		code: "IN",
		name: "Insurer",
		description: "Description to be provided.",
	},
	{
		code: "IO",
		name: "Insurance company",
		description: "Description to be provided.",
	},
	{
		code: "IP",
		name: "Insurance claim adjuster",
		description: "Description to be provided.",
	},
	{
		code: "IQ",
		name: "Domestic financial institution",
		description: "Domestic party acting as financial institution.",
	},
	{
		code: "IR",
		name: "Non-domestic financial institution",
		description: "Non-domestic party acting as financial institution.",
	},
	{
		code: "IS",
		name: "Party to receive certified inspection report",
		description: "Party (at buyer) to receive certified inspection report.",
	},
	{
		code: "IT",
		name: "Installation on site",
		description: "Description to be provided.",
	},
	{
		code: "IU",
		name: "Non-resident debtor",
		description:
			"Non-resident party who makes the payment or against whom a claim exists.",
	},
	{
		code: "IV",
		name: "Invoicee",
		description: "(3006) Party to whom an invoice is issued.",
	},
	{
		code: "IW",
		name: "Non-resident creditor",
		description:
			"Non-resident party receiving the payment or against whom a liability exists.",
	},
	{
		code: "IX",
		name: "Supplier work team",
		description: "The supplier's team responsible for performing the work.",
	},
	{
		code: "IY",
		name: "Tenant manager",
		description:
			"A code to identify the party who rents the rights to use the goodwill and facilities of an enterprise.",
	},
	{
		code: "IZ",
		name: "Party mandated to liquidate an enterprise",
		description:
			"A code to identify the party who has been legally mandated to sell off an enterprise.",
	},
	{
		code: "JA",
		name: "Certified accountant",
		description: "Code identifying the party as a certified accountant.",
	},
	{
		code: "JB",
		name: "Goods collection party",
		description: "Party that will collect or has collected the goods.",
	},
	{
		code: "JC",
		name: "Party at final place of positioning",
		description: "Identifies the party at the final place of positioning.",
	},
	{
		code: "JD",
		name: "Customs office of clearance",
		description:
			"Identifies the office where customs clearance procedures take place.",
	},
	{
		code: "JE",
		name: "Party from whom customs documents are to be picked up",
		description:
			"Identification of the party from whom customs documents are to be picked up.",
	},
	{
		code: "JF",
		name: "Party from whom non-customs documents are to be picked up",
		description:
			"Identification of the party from whom non-customs documents are to be picked up.",
	},
	{
		code: "JG",
		name: "Party to receive customs documents",
		description:
			"Identification of the party to whom customs documents are to be delivered.",
	},
	{
		code: "JH",
		name: "Party to receive non-customs documents",
		description:
			"Identification of the party to whom non-customs documents are to be delivered.",
	},
	{
		code: "LA",
		name: "Party designated to provide living animal care",
		description:
			"Party responsible to take care of transported living animals.",
	},
	{
		code: "LB",
		name: "Co-producer",
		description:
			"A code used to identify a party who participates in production.",
	},
	{
		code: "LC",
		name: "Party declaring the Value Added Tax (VAT)",
		description:
			"A code to identify the party who is responsible for declaring the Value Added Tax (VAT) on the sale of goods or services.",
	},
	{
		code: "LD",
		name: "Party recovering the Value Added Tax (VAT)",
		description:
			"A code to identify the party who is eligible to recover the Value Added Tax (VAT) on the sale of goods or services.",
	},
	{
		code: "LE",
		name: "Person on claim",
		description: "To identify the person who is the subject of the claim.",
	},
	{
		code: "LF",
		name: "Buyer's corporate office",
		description: "The identification of the buyer's corporate office.",
	},
	{
		code: "LG",
		name: "Supplier's corporate office",
		description: "The identification of the supplier's corporate office.",
	},
	{
		code: "LH",
		name: "Liquidator",
		description: "The party responsible for settling or paying a debt.",
	},
	{
		code: "LI",
		name: "Account coordinator",
		description:
			"An individual with coordination responsibilities for a specific account.",
	},
	{
		code: "LJ",
		name: "Inspection leader",
		description: "An individual responsible for an inspection team.",
	},
	{
		code: "LK",
		name: "Patient",
		description:
			"A person receiving or registered to receive medical treatment.",
	},
	{
		code: "LL",
		name: "Patient companion",
		description: "Person accompanying the patient.",
	},
	{
		code: "LM",
		name: "Medical treatment executant",
		description: "The party who executes a medical treatment.",
	},
	{
		code: "LN",
		name: "Lender",
		description: "Party lending goods or equipment.",
	},
	{
		code: "LO",
		name: "Medical treatment prescriber",
		description: "The party who prescribes a medical treatment.",
	},
	{
		code: "LP",
		name: "Loading party",
		description: "Party responsible for the loading when other than carrier.",
	},
	{
		code: "LQ",
		name: "Debt payment authorisation party",
		description: "A party which authorises the payment of a debt.",
	},
	{
		code: "LR",
		name: "Administration centre",
		description: "Identification of an administration centre.",
	},
	{
		code: "LS",
		name: "Product services and repairs centre",
		description: "A centre which services and repairs products.",
	},
	{
		code: "LT",
		name: "Secretariat",
		description: "Party is a secretariat.",
	},
	{
		code: "LU",
		name: "Entry point technical assessment group",
		description: "Party acts as an entry point for technical assessment.",
	},
	{
		code: "LV",
		name: "Party assigning a status",
		description: "Party responsible for assigning a status.",
	},
	{
		code: "MA",
		name: "Party for whom item is ultimately intended",
		description: "Self explanatory.",
	},
	{
		code: "MF",
		name: "Manufacturer of goods",
		description: "Party who manufactures the goods.",
	},
	{
		code: "MG",
		name: "Party designated to execute re-icing",
		description:
			"Party designated to execute re-icing, selected in the official list of mandatories competent for this kind of operation.",
	},
	{
		code: "MI",
		name: "Planning schedule/material release issuer",
		description: "Self explanatory.",
	},
	{
		code: "MP",
		name: "Manufacturing plant",
		description: "Self explanatory.",
	},
	{
		code: "MR",
		name: "Message recipient",
		description: "Self explanatory.",
	},
	{
		code: "MS",
		name: "Document/message issuer/sender",
		description: "Issuer of a document and/or sender of a message.",
	},
	{
		code: "MT",
		name: "Party designated to execute sanitary procedures",
		description: "Self explanatory.",
	},
	{
		code: "N1",
		name: "Notify party no. 1",
		description: "The first party which is to be notified.",
	},
	{
		code: "N2",
		name: "Notify party no. 2",
		description: "The second party which is to be notified.",
	},
	{
		code: "NI",
		name: "Notify party",
		description: "(3180) Party to be notified of arrival of goods.",
	},
	{
		code: "OA",
		name: "Break bulk berth operator",
		description:
			"Party who offers facilities for berthing of vessels, handling and storage of break bulk cargo.",
	},
	{
		code: "OB",
		name: "Ordered by",
		description: "Party who issued an order.",
	},
	{
		code: "OC",
		name: "Party data responsible party",
		description: "The party responsible for all party data.",
	},
	{
		code: "OD",
		name: "Equipment repair party",
		description: "A party making repairs to equipment.",
	},
	{
		code: "OE",
		name: "Owner of property",
		description: "Party owning a property.",
	},
	{
		code: "OF",
		name: "On behalf of",
		description: "Party on behalf of which an action is executed.",
	},
	{
		code: "OG",
		name: "Owner or lessor's surveyor",
		description: "Surveyor hired by the owner or lessor of the item.",
	},
	{
		code: "OH",
		name: "Lessee's surveyor",
		description: "Surveyor hired by the lessee of the item.",
	},
	{
		code: "OI",
		name: "Outside inspection agency",
		description: "Third party inspecting goods or equipment.",
	},
	{
		code: "OJ",
		name: "Third party",
		description: "Another party besides the two principals.",
	},
	{
		code: "OK",
		name: "Receiver's sub-entity",
		description: "Identifies a sub-entity within the receiver's organization.",
	},
	{
		code: "OL",
		name: "Case of need party",
		description: "Party to be approached in case of difficulty.",
	},
	{
		code: "OM",
		name: "Collecting bank",
		description:
			"Any bank, other than the remitting bank, involved in processing the collection.",
	},
	{
		code: "ON",
		name: "Remitting bank",
		description:
			"The bank to which the principal has entrusted the handling of a collection.",
	},
	{
		code: "OO",
		name: "Order of the shipper party",
		description:
			"The owner of goods under consignment which are moving under a negotiable transport document and will only be released upon receipt of the original transport document.",
	},
	{
		code: "OP",
		name: "Operator of property or equipment",
		description: "The party which operates property or a unit of equipment.",
	},
	{
		code: "OQ",
		name: "Collection principal",
		description: "The party entrusting the handling of a collection to a bank.",
	},
	{
		code: "OR",
		name: "Ordered bank",
		description:
			"Identifies the account servicer for the ordering customer or payor.",
	},
	{
		code: "OS",
		name: "Original shipper",
		description: "The original supplier of the goods.",
	},
	{
		code: "OT",
		name: "Outside test agency",
		description: "Third party testing goods, equipment or services.",
	},
	{
		code: "OU",
		name: "Account owner's servicing bank on the sending side",
		description:
			"Identifies the financial institution on the sending side which services the account owner's bank account(s).",
	},
	{
		code: "OV",
		name: "Owner of means of transport",
		description:
			"(3126) Party owning the means of transport. No synonym of carrier = CA.",
	},
	{
		code: "OW",
		name: "Account owner's servicing bank on the receiving side",
		description:
			"Identifies the financial institution on the receiving side which services the account owner's bank account(s).",
	},
	{
		code: "OX",
		name: "Sender's correspondent bank",
		description:
			"The account, or branch of the sender, or another financial institution, through which the sender will reimburse the receiver.",
	},
	{
		code: "OY",
		name: "Ordering customer",
		description: "Identifies the originator of the instruction.",
	},
	{
		code: "OZ",
		name: "Receiver's correspondent bank",
		description:
			"The branch of the receiver, or another financial institution, at which the funds will be made available to the receiver.",
	},
	{
		code: "P1",
		name: "Contact party 1",
		description: "First party to contact.",
	},
	{
		code: "P2",
		name: "Contact party 2",
		description: "Second party to contact.",
	},
	{
		code: "P3",
		name: "Contact party 3",
		description: "Third party to contact.",
	},
	{
		code: "P4",
		name: "Contact party 4",
		description: "Fourth party to contact.",
	},
	{
		code: "PA",
		name: "Party to receive inspection report",
		description: "Party to whom the inspection report should be sent.",
	},
	{
		code: "PB",
		name: "Paying financial institution",
		description: "Financial institution designated to make payment.",
	},
	{
		code: "PC",
		name: "Actual purchaser's customer",
		description:
			"Party the purchaser within the actual message is selling the ordered goods or services to.",
	},
	{
		code: "PD",
		name: "Purchaser's department buyer",
		description: "Purchasing department of buyer.",
	},
	{
		code: "PE",
		name: "Payee",
		description: "Identifies the credit party when other than the beneficiary.",
	},
	{
		code: "PF",
		name: "Party to receive freight bill",
		description: "Party to whom the freight bill should be sent.",
	},
	{
		code: "PG",
		name: "Prime contractor",
		description:
			"Party responsible for the whole project if other than the buyer.",
	},
	{
		code: "PH",
		name: "Payer's financial institution",
		description: "Self explanatory.",
	},
	{
		code: "PI",
		name: "Payee's company name/ID",
		description: "Receiving company name/ID (ACH transfers).",
	},
	{
		code: "PJ",
		name: "Party to receive correspondence",
		description:
			"Second party designated by a first party to receive certain correspondence in lieu of it being mailed directly to this first party.",
	},
	{
		code: "PK",
		name: "Contact party",
		description: "Party to contact.",
	},
	{
		code: "PL",
		name: "Payor",
		description:
			"Identifies the debit party when other than the ordering customer (for banking purposes).",
	},
	{
		code: "PM",
		name: "Party to receive paper memo of invoice",
		description: "Party being informed about invoice issue (via paper).",
	},
	{
		code: "PN",
		name: "Party to receive shipping notice",
		description: "The party is to be the recipient of the shipping notice.",
	},
	{
		code: "PO",
		name: "Ordering party",
		description:
			"To be used only if ordering party and buyer are not identical.",
	},
	{
		code: "PQ",
		name: "Certifying party",
		description: "Self explanatory.",
	},
	{
		code: "PR",
		name: "Payer",
		description: "(3308) Party initiating payment.",
	},
	{
		code: "PS",
		name: "Payer's company name/ID (Check, Draft or Wire)",
		description: "Self explanatory.",
	},
	{
		code: "PT",
		name: "Party to receive test report",
		description: "Self explanatory.",
	},
	{
		code: "PW",
		name: "Despatch party",
		description:
			"(3282) Party where goods are collected or taken over by the carrier (i.e. if other than consignor).",
	},
	{
		code: "PX",
		name: "Party to receive all documents",
		description: "Self explanatory.",
	},
	{
		code: "PY",
		name: "Checking party",
		description:
			"Party or contact designated on behalf of carrier or his agent to establish the actual figures for quantities, weight, volume and/or (cube) measurements of goods or containers which are to appear in the transport contract and on which charges will be based.",
	},
	{
		code: "PZ",
		name: "Party to print some document",
		description: "The party that is to print a specific document.",
	},
	{
		code: "RA",
		name: "Central bank or regulatory authority",
		description:
			"Identifies central bank or regulatory authority which must be informed of certain aspects of a message.",
	},
	{
		code: "RB",
		name: "Receiving financial institution",
		description: "Financial institution designated to receive payment.",
	},
	{
		code: "RE",
		name: "Party to receive commercial invoice remittance",
		description:
			"Party to whom payment for a commercial invoice or bill should be remitted.",
	},
	{
		code: "RF",
		name: "Received from",
		description:
			"Name of a person or department which actually delivers the goods.",
	},
	{
		code: "RH",
		name: "Seller's financial institution",
		description:
			"Financial institution designated by seller to receive payment. RDFI (ACH transfers).",
	},
	{
		code: "RI",
		name: "Reinsurance intermediary/broker",
		description: "Intermediary party between ceding company and reinsurance.",
	},
	{
		code: "RL",
		name: "Reporting carrier (Customs)",
		description: "Party who makes the cargo report to Customs.",
	},
	{
		code: "RM",
		name: "Reporting carrier's nominated agent/representative (Customs)",
		description:
			"Agent who formally makes a cargo report to Customs on behalf of the carrier.",
	},
	{
		code: "RP",
		name: "Routing party",
		description: "Party responsible for the selection of the carrier(s).",
	},
	{
		code: "RS",
		name: "Party to receive statement of account",
		description: "Party to whom the statement of account should be sent.",
	},
	{
		code: "RV",
		name: "Receiver of cheque",
		description:
			"Identifies the party which is to receive the actual cheque, when different from the receiver of funds.",
	},
	{
		code: "RW",
		name: "Issuer of waybill",
		description: "Party issuing the contract (waybill) for carriage.",
	},
	{
		code: "SB",
		name: "Sales responsibility",
		description: "Description to be provided.",
	},
	{
		code: "SE",
		name: "Seller",
		description: "(3346) Party selling merchandise to a buyer.",
	},
	{
		code: "SF",
		name: "Ship from",
		description:
			"Identification of the party from where goods will be or have been shipped.",
	},
	{
		code: "SG",
		name: "Store group",
		description: "Description to be provided.",
	},
	{
		code: "SI",
		name: "Shipping schedule issuer",
		description: "The party which issues a shipping schedule.",
	},
	{
		code: "SK",
		name: "Plant",
		description: "Self explanatory.",
	},
	{
		code: "SN",
		name: "Store keeper",
		description: "Self explanatory.",
	},
	{
		code: "SO",
		name: "Sold to if different than bill to",
		description: "Self explanatory.",
	},
	{
		code: "SR",
		name: "Seller's agent/representative",
		description:
			"(3254) Party representing the seller for the purpose of the trade transaction.",
	},
	{
		code: "SS",
		name: "Social securities collector's office",
		description: "Party collecting social securities premiums.",
	},
	{
		code: "ST",
		name: "Ship to",
		description:
			"Identification of the party to where goods will be or have been shipped.",
	},
	{
		code: "SU",
		name: "Supplier",
		description: "Party who supplies goods and/or services.",
	},
	{
		code: "SX",
		name: "Surety for additions",
		description:
			"Natural of legal person (generally a bank of insurance company) who accepts responsibility in due legal form for the financial guarantee to Customs of the payment of additional duties or fees that become due against a particular shipment, which have not previously been covered by surety.",
	},
	{
		code: "SY",
		name: "Surety",
		description:
			"Natural or legal person (generally a bank or insurance company) who accepts responsibility in due legal form for the financial consequences of non-fulfillment of another's obligations to the Customs (CCC).",
	},
	{
		code: "SZ",
		name: "Surety for antidumping/countervailing duty",
		description:
			"Natural or legal person that has been contracted by the importer to guarantee to Customs the payment of antidumping and/or countervailing duties that become due against a particular shipment.",
	},
	{
		code: "TA",
		name: "Legal receiver",
		description: "The party responsible for a receivership.",
	},
	{
		code: "TB",
		name: "Submitter",
		description: "To specify that the party is a submitter.",
	},
	{
		code: "TC",
		name: "Tax collector's office",
		description: "Party collecting taxes.",
	},
	{
		code: "TCP",
		name: "Transit charge payer",
		description:
			"Party, other than the ordering party, which has to pay the charges concerning the transit operations.",
	},
	{
		code: "TD",
		name: "Party to receive technical documentation",
		description: "Party to whom technical documentation should be sent.",
	},
	{
		code: "TE",
		name: "Bankruptcy referee",
		description: "To specify that the party is a referee in a bankruptcy case.",
	},
	{
		code: "TF",
		name: "Source of information",
		description: "To specify that the party is the source of information.",
	},
	{
		code: "TG",
		name: "Judge",
		description: "To specify that the party is a judge.",
	},
	{
		code: "TH",
		name: "Attorney",
		description: "To specify that the party is an attorney.",
	},
	{
		code: "TI",
		name: "Law firm",
		description: "To specify that the party is a law firm.",
	},
	{
		code: "TJ",
		name: "Trustee",
		description: "To specify that the party is a trustee.",
	},
	{
		code: "TK",
		name: "Signatory",
		description: "To specify that the party is a signatory.",
	},
	{
		code: "TL",
		name: "Occupant",
		description: "The party is an occupant.",
	},
	{
		code: "TM",
		name: "Co-occupant",
		description: "The party is a co-occupant.",
	},
	{
		code: "TN",
		name: "Subject of inquiry",
		description: "The party is the subject of an inquiry.",
	},
	{
		code: "TO",
		name: "Lessor",
		description: "The party is a lessor.",
	},
	{
		code: "TP",
		name: "Owner of residence",
		description: "Identifies the owner of a residence.",
	},
	{
		code: "TQ",
		name: "Founder",
		description: "Identifies the founder.",
	},
	{
		code: "TR",
		name: "Terminal operator",
		description:
			"A party which handles the loading and unloading of marine vessels.",
	},
	{
		code: "TS",
		name: "Party to receive certified test results",
		description: "Party to whom the certified test results should be sent.",
	},
	{
		code: "TT",
		name: "Transfer to",
		description: "The party which is the recipient of a transfer.",
	},
	{
		code: "TU",
		name: "President",
		description: "Identifies the president.",
	},
	{
		code: "TV",
		name: "Chairperson",
		description: "Identifies the chairperson.",
	},
	{
		code: "TW",
		name: "Legal title holder",
		description: "Identifies the legal title holder.",
	},
	{
		code: "TX",
		name: "Shareholder",
		description: "Identifies a shareholder.",
	},
	{
		code: "TY",
		name: "Provider",
		description: "Identifies the provider.",
	},
	{
		code: "TZ",
		name: "Military branch",
		description: "Identifies the branch of the military.",
	},
	{
		code: "UA",
		name: "Educational institution",
		description: "Identifies a university, college or school.",
	},
	{
		code: "UB",
		name: "Assignor",
		description: "Identifies the assignor.",
	},
	{
		code: "UC",
		name: "Ultimate consignee",
		description:
			"Party who has been designated on the invoice or packing list as the final recipient of the stated merchandise.",
	},
	{
		code: "UD",
		name: "Ultimate customer",
		description: "The final recipient of goods.",
	},
	{
		code: "UE",
		name: "Advisor",
		description: "Identifies the advisor.",
	},
	{
		code: "UF",
		name: "Co-defendant",
		description: "Identifies the co-defendant.",
	},
	{
		code: "UG",
		name: "Merged company with retained identity",
		description: "Company whose identity has been retained from a merger.",
	},
	{
		code: "UH",
		name: "Party represented",
		description: "Identifies the party represented.",
	},
	{
		code: "UHP",
		name: "Unexpected handling party",
		description:
			"Party authorized (during a voyage) to apply unexpected handling procedures or party having applied these procedures.",
	},
	{
		code: "UI",
		name: "Assignee",
		description: "Identifies the assignee.",
	},
	{
		code: "UJ",
		name: "Key person",
		description: "Identifies the key person.",
	},
	{
		code: "UK",
		name: "Author",
		description: "Identifies the author.",
	},
	{
		code: "UL",
		name: "Ultimate parent company",
		description: "Identifies the ultimate parent company.",
	},
	{
		code: "UM",
		name: "Party not to be confused with",
		description: "Identifies a party not to be confused with another party.",
	},
	{
		code: "UN",
		name: "Accountant",
		description: "Identifies the accountant.",
	},
	{
		code: "UO",
		name: "Plaintiff",
		description: "Identifies the plaintiff.",
	},
	{
		code: "UP",
		name: "Unloading party",
		description: "Description to be provided.",
	},
	{
		code: "UQ",
		name: "Parent company",
		description: "Identifies the parent company.",
	},
	{
		code: "UR",
		name: "Affiliated company",
		description: "Identifies the affiliated company.",
	},
	{
		code: "US",
		name: "Bailiff",
		description: "Identifies the bailiff.",
	},
	{
		code: "UT",
		name: "Merged company",
		description: "Identifies the company involved in a merger.",
	},
	{
		code: "UU",
		name: "Defendant",
		description: "Identifies the defendant.",
	},
	{
		code: "UV",
		name: "Petitioning creditor",
		description: "Identifies the petitioning creditor.",
	},
	{
		code: "UW",
		name: "Guarantee agency",
		description: "Identifies the guarantee agency.",
	},
	{
		code: "UX",
		name: "Organization group",
		description: "Identifies the organization group.",
	},
	{
		code: "UY",
		name: "Subsidiary",
		description: "Identifies the subsidiary.",
	},
	{
		code: "UZ",
		name: "Industry association",
		description: "Identifies the industry association.",
	},
	{
		code: "VA",
		name: "Joint owner",
		description: "Identifies the joint owner.",
	},
	{
		code: "VB",
		name: "Joint venture",
		description: "Identifies the joint venture.",
	},
	{
		code: "VC",
		name: "Filing office",
		description: "Identifies the filing office.",
	},
	{
		code: "VE",
		name: "Court",
		description: "Identifies the court.",
	},
	{
		code: "VF",
		name: "Liability holder",
		description: "Identifies the liability holder.",
	},
	{
		code: "VG",
		name: "Local government sponsor",
		description: "Identifies the local government sponsor.",
	},
	{
		code: "VH",
		name: "Mortgage company",
		description: "Identifies the mortgage company.",
	},
	{
		code: "VI",
		name: "Notary public",
		description: "Identifies the notary public.",
	},
	{
		code: "VJ",
		name: "Officer",
		description: "Identifies the officer.",
	},
	{
		code: "VK",
		name: "Publisher",
		description: "Identifies the publisher.",
	},
	{
		code: "VL",
		name: "Party manufactured for",
		description:
			"Identifies the party for whom manufacturing of goods is done.",
	},
	{
		code: "VM",
		name: "Previous owner",
		description: "Identifies the previous owner.",
	},
	{
		code: "VN",
		name: "Vendor",
		description: "Party vending goods or services.",
	},
	{
		code: "VO",
		name: "Purchased company",
		description: "Identifies the purchased company.",
	},
	{
		code: "VP",
		name: "Receiver manager",
		description:
			"Manager of a business which is in receivership status and which will not be liquidated.",
	},
	{
		code: "VQ",
		name: "Responsible government agency",
		description: "Identifies the responsible government agency.",
	},
	{
		code: "VR",
		name: "Sole proprietor",
		description: "Identifies the sole proprietor.",
	},
	{
		code: "VS",
		name: "Auctioneer",
		description: "Identifies the auctioneer.",
	},
	{
		code: "VT",
		name: "Branch",
		description: "Identifies the branch.",
	},
	{
		code: "VU",
		name: "Business",
		description: "Identifies the business.",
	},
	{
		code: "VV",
		name: "Ultimate same country parent company",
		description:
			"Identifies the highest level parent company in the same country.",
	},
	{
		code: "VW",
		name: "Responsible party",
		description: "Identifies the party that can be called to account.",
	},
	{
		code: "VX",
		name: "Secured party",
		description: "Identifies a party that is guaranteed against loss.",
	},
	{
		code: "VY",
		name: "Other related party",
		description: "Identifies an entity as an unspecified but related party.",
	},
	{
		code: "VZ",
		name: "Co-debtor",
		description: "Identifies an entity as a joint or mutual debtor.",
	},
	{
		code: "WA",
		name: "Company which holds financial interest",
		description:
			"Identifies a company which holds any financial stake in an undertaking or organization.",
	},
	{
		code: "WB",
		name: "Rating organization",
		description:
			"Identifies an organization responsible for assigning a classification or rating.",
	},
	{
		code: "WC",
		name: "Information reference agency",
		description: "The agency responsible for the reference of information.",
	},
	{
		code: "WD",
		name: "Warehouse depositor",
		description: "(3004) Party depositing goods in a warehouse.",
	},
	{
		code: "WE",
		name: "Compilation agency",
		description: "The agency responsible for the compilation of information.",
	},
	{
		code: "WF",
		name: "Information maintenance agency",
		description: "The agency responsible for the maintenance of information.",
	},
	{
		code: "WG",
		name: "Information dissemination agency",
		description: "The agency responsible for the dissemination of information.",
	},
	{
		code: "WH",
		name: "Warehouse keeper",
		description:
			"(3022) Party taking responsibility for goods entered into a warehouse.",
	},
	{
		code: "WI",
		name: "Inspection address",
		description: "Specifies the address for an inspection.",
	},
	{
		code: "WJ",
		name: "Refusal party",
		description: "Identification of the party responsible for a refusal.",
	},
	{
		code: "WK",
		name: "Value added network provider",
		description:
			"A party that provides telecommunications interconnectivity services in an electronic data interchange environment.",
	},
	{
		code: "WL",
		name: "Agency",
		description: "The business or establishment of an agent.",
	},
	{
		code: "WM",
		name: "Works manager",
		description: "Self explanatory.",
	},
	{
		code: "WN",
		name: "Party to receive order to supply",
		description:
			"Party designated by the registering party to receive a binding direction to supply something.",
	},
	{
		code: "WO",
		name: "Party to receive invitation to offer",
		description: "An entity to receive an invitation to offer.",
	},
	{
		code: "WP",
		name: "Sub-entity",
		description: "A part into which an entity has been divided.",
	},
	{
		code: "WPA",
		name: "Weighting party",
		description: "Party designated (legally accepted) to ascertain the weight.",
	},
	{
		code: "WQ",
		name: "Doing business as",
		description: "The name under which business is conducted.",
	},
	{
		code: "WR",
		name: "Party submitting quote",
		description: "The party stating the price of something to be purchased.",
	},
	{
		code: "WS",
		name: "Wholesaler",
		description:
			"Seller of articles, often in large quantities, to be retailed by others.",
	},
	{
		code: "WT",
		name: "Affiliated party",
		description: "A party attached or connected to another party.",
	},
	{
		code: "WU",
		name: "Previous name",
		description: "Name of an entity used before the current name.",
	},
	{
		code: "WV",
		name: "Party performing task",
		description:
			"An entity responsible for performing a task to be undertaken.",
	},
	{
		code: "WW",
		name: "Registering party",
		description: "Party performing the registration.",
	},
	{
		code: "XX",
		name: "No heading",
		description: "Description to be provided.",
	},
	{
		code: "ZZZ",
		name: "Mutually defined",
		description:
			"Party specification mutually agreed between interchanging parties.",
	},
] as const satisfies Untdid3035Definition[];
