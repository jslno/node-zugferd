import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid7161 = [
	{
		value: "AA",
		name: "Advertising",
		description: "The service of providing advertising.",
		key: "ADVERTISING",
	},
	{
		value: "AAA",
		name: "Telecommunication",
		description:
			"The service of providing telecommunication activities and/or faclities.",
		key: "TELECOMMUNICATION",
	},
	{
		value: "AAC",
		name: "Technical modification",
		description: "The service of making technical modifications to a product.",
		key: "TECHNICAL_MODIFICATION",
	},
	{
		value: "AAD",
		name: "Job-order production",
		description: "The service of producing to order.",
		key: "JOB_ORDER_PRODUCTION",
	},
	{
		value: "AAE",
		name: "Outlays",
		description:
			"The service of providing money for outlays on behalf of a trading partner.",
		key: "OUTLAYS",
	},
	{
		value: "AAF",
		name: "Off-premises",
		description:
			"The service of providing services outside the premises of the provider.",
		key: "OFF_PREMISES",
	},
	{
		value: "AAH",
		name: "Additional processing",
		description: "The service of providing additional processing.",
		key: "ADDITIONAL_PROCESSING",
	},
	{
		value: "AAI",
		name: "Attesting",
		description: "The service of certifying validity.",
		key: "ATTESTING",
	},
	{
		value: "AAS",
		name: "Acceptance",
		description: "The service of accepting goods or services.",
		key: "ACCEPTANCE",
	},
	{
		value: "AAT",
		name: "Rush delivery",
		description: "The service to provide a rush delivery.",
		key: "RUSH_DELIVERY",
	},
	{
		value: "AAV",
		name: "Special construction",
		description: "The service of providing special construction.",
		key: "SPECIAL_CONSTRUCTION",
	},
	{
		value: "AAY",
		name: "Airport facilities",
		description: "The service of providing airport facilities.",
		key: "AIRPORT_FACILITIES",
	},
	{
		value: "AAZ",
		name: "Concession",
		description:
			"The service allowing a party to use another party's facilities.",
		key: "CONCESSION",
	},
	{
		value: "ABA",
		name: "Compulsory storage",
		description: "The service provided to hold a compulsory inventory.",
		key: "COMPULSORY_STORAGE",
	},
	{
		value: "ABB",
		name: "Fuel removal",
		description: "Remove or off-load fuel from vehicle, vessel or craft.",
		key: "FUEL_REMOVAL",
	},
	{
		value: "ABC",
		name: "Into plane",
		description:
			"Service of delivering goods to an aircraft from local storage.",
		key: "INTO_PLANE",
	},
	{
		value: "ABD",
		name: "Overtime",
		description:
			"The service of providing labour beyond the established limit of working hours.",
		key: "OVERTIME",
	},
	{
		value: "ABF",
		name: "Tooling",
		description: "The service of providing specific tooling.",
		key: "TOOLING",
	},
	{
		value: "ABK",
		name: "Miscellaneous",
		description: "Miscellaneous services.",
		key: "MISCELLANEOUS",
	},
	{
		value: "ABL",
		name: "Additional packaging",
		description: "The service of providing  additional packaging.",
		key: "ADDITIONAL_PACKAGING",
	},
	{
		value: "ABN",
		name: "Dunnage",
		description:
			"The service of providing additional padding materials required to secure and protect a cargo within a shipping container.",
		key: "DUNNAGE",
	},
	{
		value: "ABR",
		name: "Containerisation",
		description: "The service of packing items into a container.",
		key: "CONTAINERISATION",
	},
	{
		value: "ABS",
		name: "Carton packing",
		description: "The service of packing items into a carton.",
		key: "CARTON_PACKING",
	},
	{
		value: "ABT",
		name: "Hessian wrapped",
		description: "The service of hessian wrapping.",
		key: "HESSIAN_WRAPPED",
	},
	{
		value: "ABU",
		name: "Polyethylene wrap packing",
		description: "The service of packing in polyethylene wrapping.",
		key: "POLYETHYLENE_WRAP_PACKING",
	},
	{
		value: "ACF",
		name: "Miscellaneous treatment",
		description: "Miscellaneous treatment service.",
		key: "MISCELLANEOUS_TREATMENT",
	},
	{
		value: "ACG",
		name: "Enamelling treatment",
		description: "The service of providing enamelling treatment.",
		key: "ENAMELLING_TREATMENT",
	},
	{
		value: "ACH",
		name: "Heat treatment",
		description: "The service of treating with heat.",
		key: "HEAT_TREATMENT",
	},
	{
		value: "ACI",
		name: "Plating treatment",
		description: "The service of providing plating treatment.",
		key: "PLATING_TREATMENT",
	},
	{
		value: "ACJ",
		name: "Painting",
		description: "The service of painting.",
		key: "PAINTING",
	},
	{
		value: "ACK",
		name: "Polishing",
		description: "The service of polishing.",
		key: "POLISHING",
	},
	{
		value: "ACL",
		name: "Priming",
		description: "The service of priming.",
		key: "PRIMING",
	},
	{
		value: "ACM",
		name: "Preservation treatment",
		description: "The service of preservation treatment.",
		key: "PRESERVATION_TREATMENT",
	},
	{
		value: "ACS",
		name: "Fitting",
		description: "Fitting service.",
		key: "FITTING",
	},
	{
		value: "ADC",
		name: "Consolidation",
		description:
			"The service of consolidating multiple consignments into one shipment.",
		key: "CONSOLIDATION",
	},
	{
		value: "ADE",
		name: "Bill of lading",
		description: "The service of providing a bill of lading document.",
		key: "BILL_OF_LADING",
	},
	{
		value: "ADJ",
		name: "Airbag",
		description: "The service of surrounding a product with an air bag.",
		key: "AIRBAG",
	},
	{
		value: "ADK",
		name: "Transfer",
		description: "The service of transferring.",
		key: "TRANSFER",
	},
	{
		value: "ADL",
		name: "Slipsheet",
		description: "The service of securing a stack of products on a slipsheet.",
		key: "SLIPSHEET",
	},
	{
		value: "ADM",
		name: "Binding",
		description: "Binding service.",
		key: "BINDING",
	},
	{
		value: "ADN",
		name: "Repair or replacement of broken returnable package",
		description:
			"The service of repairing or replacing a broken returnable package.",
		key: "REPAIR_OR_REPLACEMENT_OF_BROKEN_RETURNABLE_PACKAGE",
	},
	{
		value: "ADO",
		name: "Efficient logistics",
		description: "A code indicating efficient logistics services.",
		key: "EFFICIENT_LOGISTICS",
	},
	{
		value: "ADP",
		name: "Merchandising",
		description:
			"A code indicating that merchandising services are in operation.",
		key: "MERCHANDISING",
	},
	{
		value: "ADQ",
		name: "Product mix",
		description:
			"A code indicating that product mixing services are in operation.",
		key: "PRODUCT_MIX",
	},
	{
		value: "ADR",
		name: "Other services",
		description:
			"A code indicating that other non-specific services are in operation.",
		key: "OTHER_SERVICES",
	},
	{
		value: "ADT",
		name: "Pick-up",
		description: "The service of picking up or collection of goods.",
		key: "PICK_UP",
	},
	{
		value: "ADW",
		name: "Chronic illness",
		description: "The special services provided due to chronic illness.",
		key: "CHRONIC_ILLNESS",
	},
	{
		value: "ADY",
		name: "New product introduction",
		description:
			"A service provided by a buyer when introducing a new product from a suppliers range to the range traded by the buyer.",
		key: "NEW_PRODUCT_INTRODUCTION",
	},
	{
		value: "ADZ",
		name: "Direct delivery",
		description: "Direct delivery service.",
		key: "DIRECT_DELIVERY",
	},
	{
		value: "AEA",
		name: "Diversion",
		description: "The service of diverting deliverables.",
		key: "DIVERSION",
	},
	{
		value: "AEB",
		name: "Disconnect",
		description: "The service is a disconnection.",
		key: "DISCONNECT",
	},
	{
		value: "AEC",
		name: "Distribution",
		description: "Distribution service.",
		key: "DISTRIBUTION",
	},
	{
		value: "AED",
		name: "Handling of hazardous cargo",
		description: "A service for handling hazardous cargo.",
		key: "HANDLING_OF_HAZARDOUS_CARGO",
	},
	{
		value: "AEF",
		name: "Rents and leases",
		description: "The service of renting and/or leasing.",
		key: "RENTS_AND_LEASES",
	},
	{
		value: "AEH",
		name: "Location differential",
		description: "Delivery to a different location than previously contracted.",
		key: "LOCATION_DIFFERENTIAL",
	},
	{
		value: "AEI",
		name: "Aircraft refueling",
		description: "Fuel being put into the aircraft.",
		key: "AIRCRAFT_REFUELING",
	},
	{
		value: "AEJ",
		name: "Fuel shipped into storage",
		description: "Fuel being shipped into a storage system.",
		key: "FUEL_SHIPPED_INTO_STORAGE",
	},
	{
		value: "AEK",
		name: "Cash on delivery",
		description: "The provision of a cash on delivery (COD) service.",
		key: "CASH_ON_DELIVERY",
	},
	{
		value: "AEL",
		name: "Small order processing service",
		description: "A service related to the processing of small orders.",
		key: "SMALL_ORDER_PROCESSING_SERVICE",
	},
	{
		value: "AEM",
		name: "Clerical or administrative services",
		description: "The provision of clerical or administrative services.",
		key: "CLERICAL_OR_ADMINISTRATIVE_SERVICES",
	},
	{
		value: "AEN",
		name: "Guarantee",
		description: "The service of providing a guarantee.",
		key: "GUARANTEE",
	},
	{
		value: "AEO",
		name: "Collection and recycling",
		description: "The service of collection and recycling products.",
		key: "COLLECTION_AND_RECYCLING",
	},
	{
		value: "AEP",
		name: "Copyright fee collection",
		description: "The service of collecting copyright fees.",
		key: "COPYRIGHT_FEE_COLLECTION",
	},
	{
		value: "AES",
		name: "Veterinary inspection service",
		description: "The service of providing veterinary inspection.",
		key: "VETERINARY_INSPECTION_SERVICE",
	},
	{
		value: "AET",
		name: "Pensioner service",
		description: "Special service when the subject is a pensioner.",
		key: "PENSIONER_SERVICE",
	},
	{
		value: "AEU",
		name: "Medicine free pass holder",
		description: "Special service when the subject holds a medicine free pass.",
		key: "MEDICINE_FREE_PASS_HOLDER",
	},
	{
		value: "AEV",
		name: "Environmental protection service",
		description: "The provision of an environmental protection service.",
		key: "ENVIRONMENTAL_PROTECTION_SERVICE",
	},
	{
		value: "AEW",
		name: "Environmental clean-up service",
		description: "The provision of an environmental clean-up service.",
		key: "ENVIRONMENTAL_CLEAN_UP_SERVICE",
	},
	{
		value: "AEX",
		name: "National cheque processing service outside account area",
		description:
			"Service of processing a national cheque outside the ordering customer's bank trading area.",
		key: "NATIONAL_CHEQUE_PROCESSING_SERVICE_OUTSIDE_ACCOUNT_AREA",
	},
	{
		value: "AEY",
		name: "National payment service outside account area",
		description:
			"Service of processing a national payment to a beneficiary holding an account outside the trading area of the ordering customer's bank.",
		key: "NATIONAL_PAYMENT_SERVICE_OUTSIDE_ACCOUNT_AREA",
	},
	{
		value: "AEZ",
		name: "National payment service within account area",
		description:
			"Service of processing a national payment to a beneficiary holding an account within the trading area of the ordering customer's bank.",
		key: "NATIONAL_PAYMENT_SERVICE_WITHIN_ACCOUNT_AREA",
	},
	{
		value: "AJ",
		name: "Adjustments",
		description: "The service of making adjustments.",
		key: "ADJUSTMENTS",
	},
	{
		value: "AU",
		name: "Authentication",
		description: "The service of authenticating.",
		key: "AUTHENTICATION",
	},
	{
		value: "CA",
		name: "Cataloguing",
		description: "The provision of cataloguing services.",
		key: "CATALOGUING",
	},
	{
		value: "CAB",
		name: "Cartage",
		description: "Movement of goods by heavy duty cart or vehicle.",
		key: "CARTAGE",
	},
	{
		value: "CAD",
		name: "Certification",
		description: "The service of certifying.",
		key: "CERTIFICATION",
	},
	{
		value: "CAE",
		name: "Certificate of conformance",
		description: "The service of providing a certificate of conformance.",
		key: "CERTIFICATE_OF_CONFORMANCE",
	},
	{
		value: "CAF",
		name: "Certificate of origin",
		description: "The service of providing a certificate of origin.",
		key: "CERTIFICATE_OF_ORIGIN",
	},
	{
		value: "CAI",
		name: "Cutting",
		description: "The service of cutting.",
		key: "CUTTING",
	},
	{
		value: "CAJ",
		name: "Consular service",
		description: "The service provided by consulates.",
		key: "CONSULAR_SERVICE",
	},
	{
		value: "CAK",
		name: "Customer collection",
		description: "The service of collecting goods by the customer.",
		key: "CUSTOMER_COLLECTION",
	},
	{
		value: "CAL",
		name: "Payroll payment service",
		description: "Provision of a payroll payment service.",
		key: "PAYROLL_PAYMENT_SERVICE",
	},
	{
		value: "CAM",
		name: "Cash transportation",
		description: "Provision of a cash transportation service.",
		key: "CASH_TRANSPORTATION",
	},
	{
		value: "CAN",
		name: "Home banking service",
		description: "Provision of a home banking service.",
		key: "HOME_BANKING_SERVICE",
	},
	{
		value: "CAO",
		name: "Bilateral agreement service",
		description:
			"Provision of a service as specified in a bilateral special agreement.",
		key: "BILATERAL_AGREEMENT_SERVICE",
	},
	{
		value: "CAP",
		name: "Insurance brokerage service",
		description: "Provision of an insurance brokerage service.",
		key: "INSURANCE_BROKERAGE_SERVICE",
	},
	{
		value: "CAQ",
		name: "Cheque generation",
		description: "Provision of a cheque generation service.",
		key: "CHEQUE_GENERATION",
	},
	{
		value: "CAR",
		name: "Preferential merchandising location",
		description:
			"Service of assigning a preferential location for merchandising.",
		key: "PREFERENTIAL_MERCHANDISING_LOCATION",
	},
	{
		value: "CAS",
		name: "Crane",
		description: "The service of providing a crane.",
		key: "CRANE",
	},
	{
		value: "CAT",
		name: "Special colour service",
		description:
			"Providing a colour which is different from the default colour.",
		key: "SPECIAL_COLOUR_SERVICE",
	},
	{
		value: "CAU",
		name: "Sorting",
		description: "The provision of sorting services.",
		key: "SORTING",
	},
	{
		value: "CAV",
		name: "Battery collection and recycling",
		description: "The service of collecting and recycling batteries.",
		key: "BATTERY_COLLECTION_AND_RECYCLING",
	},
	{
		value: "CAW",
		name: "Product take back fee",
		description:
			"The fee the consumer must pay the manufacturer to take back the product.",
		key: "PRODUCT_TAKE_BACK_FEE",
	},
	{
		value: "CAX",
		name: "Quality control released",
		description:
			"Informs the stockholder it is free to distribute the quality controlled passed goods.",
		key: "QUALITY_CONTROL_RELEASED",
	},
	{
		value: "CAY",
		name: "Quality control held",
		description:
			"Instructs the stockholder to withhold distribution of the goods until the manufacturer has completed a quality control assessment.",
		key: "QUALITY_CONTROL_HELD",
	},
	{
		value: "CAZ",
		name: "Quality control embargo",
		description:
			"Instructs the stockholder to withhold distribution of goods which have failed quality control tests.",
		key: "QUALITY_CONTROL_EMBARGO",
	},
	{
		value: "CD",
		name: "Car loading",
		description: "Car loading service.",
		key: "CAR_LOADING",
	},
	{
		value: "CG",
		name: "Cleaning",
		description: "Cleaning service.",
		key: "CLEANING",
	},
	{
		value: "CS",
		name: "Cigarette stamping",
		description: "The service of providing cigarette stamping.",
		key: "CIGARETTE_STAMPING",
	},
	{
		value: "CT",
		name: "Count and recount",
		description: "The service of doing a count and recount.",
		key: "COUNT_AND_RECOUNT",
	},
	{
		value: "DAB",
		name: "Layout/design",
		description: "The service of providing layout/design.",
		key: "LAYOUT_DESIGN",
	},
	{
		value: "DAC",
		name: "Assortment allowance",
		description:
			"Allowance given when a specific part of a suppliers assortment is purchased by the buyer.",
		key: "ASSORTMENT_ALLOWANCE",
	},
	{
		value: "DAD",
		name: "Driver assigned unloading",
		description: "The service of unloading by the driver.",
		key: "DRIVER_ASSIGNED_UNLOADING",
	},
	{
		value: "DAF",
		name: "Debtor bound",
		description:
			"A special allowance or charge applicable to a specific debtor.",
		key: "DEBTOR_BOUND",
	},
	{
		value: "DAG",
		name: "Dealer allowance",
		description:
			"An allowance offered by a party dealing a certain brand or brands of products.",
		key: "DEALER_ALLOWANCE",
	},
	{
		value: "DAH",
		name: "Allowance transferable to the consumer",
		description:
			"An allowance given by the manufacturer which should be transfered to the consumer.",
		key: "ALLOWANCE_TRANSFERABLE_TO_THE_CONSUMER",
	},
	{
		value: "DAI",
		name: "Growth of business",
		description:
			"An allowance or charge related to the growth of business over a pre-determined period of time.",
		key: "GROWTH_OF_BUSINESS",
	},
	{
		value: "DAJ",
		name: "Introduction allowance",
		description:
			"An allowance related to the introduction of a new product to the range of products traded by a retailer.",
		key: "INTRODUCTION_ALLOWANCE",
	},
	{
		value: "DAK",
		name: "Multi-buy promotion",
		description:
			"A code indicating special conditions related to a multi- buy promotion.",
		key: "MULTI_BUY_PROMOTION",
	},
	{
		value: "DAL",
		name: "Partnership",
		description:
			"An allowance or charge related to the establishment and on-going maintenance of a partnership.",
		key: "PARTNERSHIP",
	},
	{
		value: "DAM",
		name: "Return handling",
		description: "An allowance or change related to the handling of returns.",
		key: "RETURN_HANDLING",
	},
	{
		value: "DAN",
		name: "Minimum order not fulfilled charge",
		description:
			"Charge levied because the minimum order quantity could not be fulfilled.",
		key: "MINIMUM_ORDER_NOT_FULFILLED_CHARGE",
	},
	{
		value: "DAO",
		name: "Point of sales threshold allowance",
		description:
			"Allowance for reaching or exceeding an agreed sales threshold at the point of sales.",
		key: "POINT_OF_SALES_THRESHOLD_ALLOWANCE",
	},
	{
		value: "DAP",
		name: "Wholesaling discount",
		description:
			"A special discount related to the purchase of products through a wholesaler.",
		key: "WHOLESALING_DISCOUNT",
	},
	{
		value: "DAQ",
		name: "Documentary credits transfer commission",
		description: "Fee for the transfer of transferable documentary credits.",
		key: "DOCUMENTARY_CREDITS_TRANSFER_COMMISSION",
	},
	{
		value: "DL",
		name: "Delivery",
		description: "The service of providing delivery.",
		key: "DELIVERY",
	},
	{
		value: "EG",
		name: "Engraving",
		description: "The service of providing engraving.",
		key: "ENGRAVING",
	},
	{
		value: "EP",
		name: "Expediting",
		description: "The service of expediting.",
		key: "EXPEDITING",
	},
	{
		value: "ER",
		name: "Exchange rate guarantee",
		description: "The service of guaranteeing exchange rate.",
		key: "EXCHANGE_RATE_GUARANTEE",
	},
	{
		value: "FAA",
		name: "Fabrication",
		description: "The service of providing fabrication.",
		key: "FABRICATION",
	},
	{
		value: "FAB",
		name: "Freight equalization",
		description: "The service of load balancing.",
		key: "FREIGHT_EQUALIZATION",
	},
	{
		value: "FAC",
		name: "Freight extraordinary handling",
		description: "The service of providing freight's extraordinary handling.",
		key: "FREIGHT_EXTRAORDINARY_HANDLING",
	},
	{
		value: "FC",
		name: "Freight service",
		description:
			"The service of moving goods, by whatever means, from one place to another.",
		key: "FREIGHT_SERVICE",
	},
	{
		value: "FH",
		name: "Filling/handling",
		description: "The service of providing filling/handling.",
		key: "FILLING_HANDLING",
	},
	{
		value: "FI",
		name: "Financing",
		description: "The service of providing financing.",
		key: "FINANCING",
	},
	{
		value: "GAA",
		name: "Grinding",
		description: "The service of grinding.",
		key: "GRINDING",
	},
	{
		value: "HAA",
		name: "Hose",
		description: "The service of providing a hose.",
		key: "HOSE",
	},
	{
		value: "HD",
		name: "Handling",
		description: "Handling service.",
		key: "HANDLING",
	},
	{
		value: "HH",
		name: "Hoisting and hauling",
		description: "The service of hoisting and hauling.",
		key: "HOISTING_AND_HAULING",
	},
	{
		value: "IAA",
		name: "Installation",
		description: "The service of installing.",
		key: "INSTALLATION",
	},
	{
		value: "IAB",
		name: "Installation and warranty",
		description: "The service of installing and providing warranty.",
		key: "INSTALLATION_AND_WARRANTY",
	},
	{
		value: "ID",
		name: "Inside delivery",
		description: "The service of providing delivery inside.",
		key: "INSIDE_DELIVERY",
	},
	{
		value: "IF",
		name: "Inspection",
		description: "The service of inspection.",
		key: "INSPECTION",
	},
	{
		value: "IR",
		name: "Installation and training",
		description: "The service of providing installation and training.",
		key: "INSTALLATION_AND_TRAINING",
	},
	{
		value: "IS",
		name: "Invoicing",
		description: "The service of providing an invoice.",
		key: "INVOICING",
	},
	{
		value: "KO",
		name: "Koshering",
		description: "The service of preparing food in accordance with Jewish law.",
		key: "KOSHERING",
	},
	{
		value: "L1",
		name: "Carrier count",
		description: "The service of counting by the carrier.",
		key: "CARRIER_COUNT",
	},
	{
		value: "LA",
		name: "Labelling",
		description: "Labelling service.",
		key: "LABELLING",
	},
	{
		value: "LAA",
		name: "Labour",
		description: "The service to provide required labour.",
		key: "LABOUR",
	},
	{
		value: "LAB",
		name: "Repair and return",
		description: "The service of repairing and returning.",
		key: "REPAIR_AND_RETURN",
	},
	{
		value: "LF",
		name: "Legalisation",
		description: "The service of legalising.",
		key: "LEGALISATION",
	},
	{
		value: "MAE",
		name: "Mounting",
		description: "The service of mounting.",
		key: "MOUNTING",
	},
	{
		value: "MI",
		name: "Mail invoice",
		description: "The service of mailing an invoice.",
		key: "MAIL_INVOICE",
	},
	{
		value: "ML",
		name: "Mail invoice to each location",
		description: "The service of mailing an invoice to each location.",
		key: "MAIL_INVOICE_TO_EACH_LOCATION",
	},
	{
		value: "NAA",
		name: "Non-returnable containers",
		description: "The service of providing non-returnable containers.",
		key: "NON_RETURNABLE_CONTAINERS",
	},
	{
		value: "OA",
		name: "Outside cable connectors",
		description: "The service of providing outside cable connectors.",
		key: "OUTSIDE_CABLE_CONNECTORS",
	},
	{
		value: "PA",
		name: "Invoice with shipment",
		description: "The service of including the invoice with the shipment.",
		key: "INVOICE_WITH_SHIPMENT",
	},
	{
		value: "PAA",
		name: "Phosphatizing (steel treatment)",
		description: "The service of phosphatizing the steel.",
		key: "PHOSPHATIZING_STEEL_TREATMENT",
	},
	{
		value: "PC",
		name: "Packing",
		description: "The service of packing.",
		key: "PACKING",
	},
	{
		value: "PL",
		name: "Palletizing",
		description: "The service of palletizing.",
		key: "PALLETIZING",
	},
	{
		value: "RAB",
		name: "Repacking",
		description: "The service of repacking.",
		key: "REPACKING",
	},
	{
		value: "RAC",
		name: "Repair",
		description: "The service of repairing.",
		key: "REPAIR",
	},
	{
		value: "RAD",
		name: "Returnable container",
		description: "The service of providing returnable containers.",
		key: "RETURNABLE_CONTAINER",
	},
	{
		value: "RAF",
		name: "Restocking",
		description: "The service of restocking.",
		key: "RESTOCKING",
	},
	{
		value: "RE",
		name: "Re-delivery",
		description: "The service of re-delivering.",
		key: "RE_DELIVERY",
	},
	{
		value: "RF",
		name: "Refurbishing",
		description: "The service of refurbishing.",
		key: "REFURBISHING",
	},
	{
		value: "RH",
		name: "Rail wagon hire",
		description: "The service of providing rail wagons for hire.",
		key: "RAIL_WAGON_HIRE",
	},
	{
		value: "RV",
		name: "Loading",
		description: "The service of loading goods.",
		key: "LOADING",
	},
	{
		value: "SA",
		name: "Salvaging",
		description: "The service of salvaging.",
		key: "SALVAGING",
	},
	{
		value: "SAA",
		name: "Shipping and handling",
		description: "The service of shipping and handling.",
		key: "SHIPPING_AND_HANDLING",
	},
	{
		value: "SAD",
		name: "Special packaging",
		description: "The service of special packaging.",
		key: "SPECIAL_PACKAGING",
	},
	{
		value: "SAE",
		name: "Stamping",
		description: "The service of stamping.",
		key: "STAMPING",
	},
	{
		value: "SAI",
		name: "Consignee unload",
		description: "The service of unloading by the consignee.",
		key: "CONSIGNEE_UNLOAD",
	},
	{
		value: "SG",
		name: "Shrink-wrap",
		description: "The service of shrink-wrapping.",
		key: "SHRINK_WRAP",
	},
	{
		value: "SH",
		name: "Special handling",
		description: "The service of special handling.",
		key: "SPECIAL_HANDLING",
	},
	{
		value: "SM",
		name: "Special finish",
		description: "The service of providing a special finish.",
		key: "SPECIAL_FINISH",
	},
	{
		value: "SU",
		name: "Set-up",
		description: "The service of setting-up.",
		key: "SET_UP",
	},
	{
		value: "TAB",
		name: "Tank renting",
		description: "The service of providing tanks for hire.",
		key: "TANK_RENTING",
	},
	{
		value: "TAC",
		name: "Testing",
		description: "The service of testing.",
		key: "TESTING",
	},
	{
		value: "TT",
		name: "Transportation - third party billing",
		description:
			"The service of providing third party billing for transportation.",
		key: "TRANSPORTATION_THIRD_PARTY_BILLING",
	},
	{
		value: "TV",
		name: "Transportation by vendor",
		description: "The service of providing transportation by the vendor.",
		key: "TRANSPORTATION_BY_VENDOR",
	},
	{
		value: "V1",
		name: "Drop yard",
		description: "The service of delivering goods at the yard.",
		key: "DROP_YARD",
	},
	{
		value: "V2",
		name: "Drop dock",
		description: "The service of delivering goods at the dock.",
		key: "DROP_DOCK",
	},
	{
		value: "WH",
		name: "Warehousing",
		description: "The service of storing and handling of goods in a warehouse.",
		key: "WAREHOUSING",
	},
	{
		value: "XAA",
		name: "Combine all same day shipment",
		description: "The service of combining all shipments for the same day.",
		key: "COMBINE_ALL_SAME_DAY_SHIPMENT",
	},
	{
		value: "YY",
		name: "Split pick-up",
		description: "The service of providing split pick-up.",
		key: "SPLIT_PICK_UP",
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
		untdid7161: typeof untdid7161;
	}
}
registerCodelist("untdid7161", untdid7161);

export default untdid7161;
