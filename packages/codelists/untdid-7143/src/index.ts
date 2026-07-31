import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const untdid7143 = [
	{
		value: "AA",
		name: "Product version number",
		description:
			"Number assigned by manufacturer or seller to identify the release of a product.",
		key: "PRODUCT_VERSION_NUMBER",
	},
	{
		value: "AB",
		name: "Assembly",
		description: "The item number is that of an assembly.",
		key: "ASSEMBLY",
	},
	{
		value: "AC",
		name: "HIBC (Health Industry Bar Code)",
		description:
			"Article identifier used within health sector to indicate data used conforms to HIBC.",
		key: "HIBC_HEALTH_INDUSTRY_BAR_CODE",
	},
	{
		value: "AD",
		name: "Cold roll number",
		description: "Number assigned to a cold roll.",
		key: "COLD_ROLL_NUMBER",
	},
	{
		value: "AE",
		name: "Hot roll number",
		description: "Number assigned to a hot roll.",
		key: "HOT_ROLL_NUMBER",
	},
	{
		value: "AF",
		name: "Slab number",
		description:
			"Number assigned to a slab, which is produced in a particular production step.",
		key: "SLAB_NUMBER",
	},
	{
		value: "AG",
		name: "Software revision number",
		description: "A number assigned to indicate a revision of software.",
		key: "SOFTWARE_REVISION_NUMBER",
	},
	{
		value: "AH",
		name: "UPC (Universal Product Code) Consumer package code (1-5-5)",
		description:
			"An 11-digit code that uniquely identifies consumer packaging of a product; does not have a check digit.",
		key: "UPC_UNIVERSAL_PRODUCT_CODE_CONSUMER_PACKAGE_CODE_1_5_5",
	},
	{
		value: "AI",
		name: "UPC (Universal Product Code) Consumer package code (1-5-5-",
		description:
			"1) A 12-digit code that uniquely identifies the consumer packaging of a product, including a check digit.",
		key: "UPC_UNIVERSAL_PRODUCT_CODE_CONSUMER_PACKAGE_CODE_1_5_5",
	},
	{
		value: "AJ",
		name: "Sample number",
		description: "Number assigned to a sample.",
		key: "SAMPLE_NUMBER",
	},
	{
		value: "AK",
		name: "Pack number",
		description:
			"Number assigned to a pack containing a stack of items put together (e.g. cold roll sheets (steel product)).",
		key: "PACK_NUMBER",
	},
	{
		value: "AL",
		name: "UPC (Universal Product Code) Shipping container code (1-2-",
		description:
			"5-5) A 13-digit code that uniquely identifies the manufacturer's shipping unit, including the packaging indicator.",
		key: "UPC_UNIVERSAL_PRODUCT_CODE_SHIPPING_CONTAINER_CODE_1_2",
	},
	{
		value: "AM",
		name: "UPC (Universal Product Code)/EAN (European article number)",
		description:
			"Shipping container code (1-2-5-5-1) A 14-digit code that uniquely identifies the manufacturer's shipping unit, including the packaging indicator and the check digit.",
		key: "UPC_UNIVERSAL_PRODUCT_CODE_EAN_EUROPEAN_ARTICLE_NUMBER",
	},
	{
		value: "AN",
		name: "UPC (Universal Product Code) suffix",
		description:
			"A suffix used in conjunction with a higher level UPC (Universal product code) to define packing variations for a product.",
		key: "UPC_UNIVERSAL_PRODUCT_CODE_SUFFIX",
	},
	{
		value: "AO",
		name: "State label code",
		description:
			"A code which specifies the codification of the state's labelling requirements.",
		key: "STATE_LABEL_CODE",
	},
	{
		value: "AP",
		name: "Heat number",
		description:
			"Number assigned to the heat (also known as the iron charge) for the production of steel products.",
		key: "HEAT_NUMBER",
	},
	{
		value: "AQ",
		name: "Coupon number",
		description: "A number identifying a coupon.",
		key: "COUPON_NUMBER",
	},
	{
		value: "AR",
		name: "Resource number",
		description: "A number to identify a resource.",
		key: "RESOURCE_NUMBER",
	},
	{
		value: "AS",
		name: "Work task number",
		description: "A number to identify a work task.",
		key: "WORK_TASK_NUMBER",
	},
	{
		value: "AT",
		name: "Price look up number",
		description:
			"Identification number on a product allowing a quick electronic retrieval of price information for that product.",
		key: "PRICE_LOOK_UP_NUMBER",
	},
	{
		value: "AU",
		name: "NSN (North Atlantic Treaty Organization Stock Number)",
		description:
			"Number assigned under the NATO (North Atlantic Treaty Organization) codification system to provide the identification of an approved item of supply.",
		key: "NSN_NORTH_ATLANTIC_TREATY_ORGANIZATION_STOCK_NUMBER",
	},
	{
		value: "AV",
		name: "Refined product code",
		description: "A code specifying the product refinement designation.",
		key: "REFINED_PRODUCT_CODE",
	},
	{
		value: "AW",
		name: "Exhibit",
		description:
			"A code indicating that the product is identified by an exhibit number.",
		key: "EXHIBIT",
	},
	{
		value: "AX",
		name: "End item",
		description: "A number specifying an end item.",
		key: "END_ITEM",
	},
	{
		value: "AY",
		name: "Federal supply classification",
		description: "A code to specify a product's Federal supply classification.",
		key: "FEDERAL_SUPPLY_CLASSIFICATION",
	},
	{
		value: "AZ",
		name: "Engineering data list",
		description: "A code specifying the product's engineering data list.",
		key: "ENGINEERING_DATA_LIST",
	},
	{
		value: "BA",
		name: "Milestone event number",
		description: "A number to identify a milestone event.",
		key: "MILESTONE_EVENT_NUMBER",
	},
	{
		value: "BB",
		name: "Lot number",
		description: "A number indicating the lot number of a product.",
		key: "LOT_NUMBER",
	},
	{
		value: "BC",
		name: "National drug code 4-4-2 format",
		description:
			"A code identifying the product in national drug format 4-4-2.",
		key: "NATIONAL_DRUG_CODE_4_4_2_FORMAT",
	},
	{
		value: "BD",
		name: "National drug code 5-3-2 format",
		description:
			"A code identifying the product in national drug format 5-3-2.",
		key: "NATIONAL_DRUG_CODE_5_3_2_FORMAT",
	},
	{
		value: "BE",
		name: "National drug code 5-4-1 format",
		description:
			"A code identifying the product in national drug format 5-4-1.",
		key: "NATIONAL_DRUG_CODE_5_4_1_FORMAT",
	},
	{
		value: "BF",
		name: "National drug code 5-4-2 format",
		description:
			"A code identifying the product in national drug format 5-4-2.",
		key: "NATIONAL_DRUG_CODE_5_4_2_FORMAT",
	},
	{
		value: "BG",
		name: "National drug code",
		description: "A code specifying the national drug classification.",
		key: "NATIONAL_DRUG_CODE",
	},
	{
		value: "BH",
		name: "Part number",
		description: "A number indicating the part.",
		key: "PART_NUMBER",
	},
	{
		value: "BI",
		name: "Local Stock Number (LSN)",
		description: "A local number assigned to an item of stock.",
		key: "LOCAL_STOCK_NUMBER_LSN",
	},
	{
		value: "BJ",
		name: "Next higher assembly number",
		description:
			"A number specifying the next higher assembly or component into which the product is being incorporated.",
		key: "NEXT_HIGHER_ASSEMBLY_NUMBER",
	},
	{
		value: "BK",
		name: "Data category",
		description: "A code specifying a category of data.",
		key: "DATA_CATEGORY",
	},
	{
		value: "BL",
		name: "Control number",
		description: "To specify the control number.",
		key: "CONTROL_NUMBER",
	},
	{
		value: "BM",
		name: "Special material identification code",
		description: "A number to identify the special material code.",
		key: "SPECIAL_MATERIAL_IDENTIFICATION_CODE",
	},
	{
		value: "BN",
		name: "Locally assigned control number",
		description: "A number assigned locally for control purposes.",
		key: "LOCALLY_ASSIGNED_CONTROL_NUMBER",
	},
	{
		value: "BO",
		name: "Buyer's colour",
		description: "Colour assigned by buyer.",
		key: "BUYER_S_COLOUR",
	},
	{
		value: "BP",
		name: "Buyer's part number",
		description:
			"Reference number assigned by the buyer to identify an article.",
		key: "BUYER_S_PART_NUMBER",
	},
	{
		value: "BQ",
		name: "Variable measure product code",
		description: "A code assigned to identify a variable measure item.",
		key: "VARIABLE_MEASURE_PRODUCT_CODE",
	},
	{
		value: "BR",
		name: "Financial phase",
		description: "To specify as an item, the financial phase.",
		key: "FINANCIAL_PHASE",
	},
	{
		value: "BS",
		name: "Contract breakdown",
		description: "To specify as an item, the contract breakdown.",
		key: "CONTRACT_BREAKDOWN",
	},
	{
		value: "BT",
		name: "Technical phase",
		description: "To specify as an item, the technical phase.",
		key: "TECHNICAL_PHASE",
	},
	{
		value: "BU",
		name: "Dye lot number",
		description: "Number identifying a dye lot.",
		key: "DYE_LOT_NUMBER",
	},
	{
		value: "BV",
		name: "Daily statement of activities",
		description: "A statement listing activities of one day.",
		key: "DAILY_STATEMENT_OF_ACTIVITIES",
	},
	{
		value: "BW",
		name: "Periodical statement of activities within a bilaterally",
		description:
			"agreed time period Periodical statement listing activities within a bilaterally agreed time period.",
		key: "PERIODICAL_STATEMENT_OF_ACTIVITIES_WITHIN_A_BILATERALLY",
	},
	{
		value: "BX",
		name: "Calendar week statement of activities",
		description: "A statement listing activities of a calendar week.",
		key: "CALENDAR_WEEK_STATEMENT_OF_ACTIVITIES",
	},
	{
		value: "BY",
		name: "Calendar month statement of activities",
		description: "A statement listing activities of a calendar month.",
		key: "CALENDAR_MONTH_STATEMENT_OF_ACTIVITIES",
	},
	{
		value: "BZ",
		name: "Original equipment number",
		description:
			"Original equipment number allocated to spare parts by the manufacturer.",
		key: "ORIGINAL_EQUIPMENT_NUMBER",
	},
	{
		value: "CC",
		name: "Industry commodity code",
		description: "The codes given to certain commodities by an industry.",
		key: "INDUSTRY_COMMODITY_CODE",
	},
	{
		value: "CG",
		name: "Commodity grouping",
		description:
			"Code for a group of articles with common characteristics (e.g. used for statistical purposes).",
		key: "COMMODITY_GROUPING",
	},
	{
		value: "CL",
		name: "Colour number",
		description: "Code for the colour of an article.",
		key: "COLOUR_NUMBER",
	},
	{
		value: "CR",
		name: "Contract number",
		description: "Reference number identifying a contract.",
		key: "CONTRACT_NUMBER",
	},
	{
		value: "CV",
		name: "Customs article number",
		description:
			"Code defined by Customs authorities to an article or a group of articles for Customs purposes.",
		key: "CUSTOMS_ARTICLE_NUMBER",
	},
	{
		value: "DR",
		name: "Drawing revision number",
		description:
			"Reference number indicating that a change or revision has been applied to a drawing.",
		key: "DRAWING_REVISION_NUMBER",
	},
	{
		value: "DW",
		name: "Drawing",
		description: "Reference number identifying a drawing of an article.",
		key: "DRAWING",
	},
	{
		value: "EC",
		name: "Engineering change level",
		description:
			"Reference number indicating that a change or revision has been applied to an article's specification.",
		key: "ENGINEERING_CHANGE_LEVEL",
	},
	{
		value: "EF",
		name: "Material code",
		description:
			"Code defining the material's type, surface, geometric form plus various classifying characteristics.",
		key: "MATERIAL_CODE",
	},
	{
		value: "EN",
		name: "International Article Numbering Association (EAN)",
		description:
			"Number assigned to a manufacturer's product according to the International Article Numbering Association.",
		key: "INTERNATIONAL_ARTICLE_NUMBERING_ASSOCIATION_EAN",
	},
	{
		value: "FS",
		name: "Fish species",
		description: "Identification of fish species.",
		key: "FISH_SPECIES",
	},
	{
		value: "GB",
		name: "Buyer's internal product group code",
		description: "Product group code used within a buyer's internal systems.",
		key: "BUYER_S_INTERNAL_PRODUCT_GROUP_CODE",
	},
	{
		value: "GN",
		name: "National product group code",
		description:
			"National product group code. Administered by a national agency.",
		key: "NATIONAL_PRODUCT_GROUP_CODE",
	},
	{
		value: "GS",
		name: "General specification number",
		description: "The item number is a general specification number.",
		key: "GENERAL_SPECIFICATION_NUMBER",
	},
	{
		value: "HS",
		name: "Harmonised system",
		description:
			"The item number is part of, or is generated in the context of the Harmonised Commodity Description and Coding System (Harmonised System), as developed and maintained by the World Customs Organization (WCO).",
		key: "HARMONISED_SYSTEM",
	},
	{
		value: "IB",
		name: "ISBN (International Standard Book Number)",
		description: "A unique number identifying a book.",
		key: "ISBN_INTERNATIONAL_STANDARD_BOOK_NUMBER",
	},
	{
		value: "IN",
		name: "Buyer's item number",
		description: "The item number has been allocated by the buyer.",
		key: "BUYER_S_ITEM_NUMBER",
	},
	{
		value: "IS",
		name: "ISSN (International Standard Serial Number)",
		description: "A unique number identifying a serial publication.",
		key: "ISSN_INTERNATIONAL_STANDARD_SERIAL_NUMBER",
	},
	{
		value: "IT",
		name: "Buyer's style number",
		description:
			"Number given by the buyer to a specific style or form of an article, especially used for garments.",
		key: "BUYER_S_STYLE_NUMBER",
	},
	{
		value: "IZ",
		name: "Buyer's size code",
		description:
			"Code given by the buyer to designate the size of an article in textile and shoe industry.",
		key: "BUYER_S_SIZE_CODE",
	},
	{
		value: "MA",
		name: "Machine number",
		description: "The item number is a machine number.",
		key: "MACHINE_NUMBER",
	},
	{
		value: "MF",
		name: "Manufacturer's (producer's) article number",
		description: "The number given to an article by its manufacturer.",
		key: "MANUFACTURER_S_PRODUCER_S_ARTICLE_NUMBER",
	},
	{
		value: "MN",
		name: "Model number",
		description:
			"Reference number assigned by the manufacturer to differentiate variations in similar products in a class or group.",
		key: "MODEL_NUMBER",
	},
	{
		value: "MP",
		name: "Product/service identification number",
		description: "Reference number identifying a product or service.",
		key: "PRODUCT_SERVICE_IDENTIFICATION_NUMBER",
	},
	{
		value: "NB",
		name: "Batch number",
		description: "The item number is a batch number.",
		key: "BATCH_NUMBER",
	},
	{
		value: "ON",
		name: "Customer order number",
		description: "Reference number of a customer's order.",
		key: "CUSTOMER_ORDER_NUMBER",
	},
	{
		value: "PD",
		name: "Part number description",
		description:
			"Reference number identifying a description associated with a number ultimately used to identify an article.",
		key: "PART_NUMBER_DESCRIPTION",
	},
	{
		value: "PL",
		name: "Purchaser's order line number",
		description:
			"Reference number identifying a line entry in a customer's order for goods or services.",
		key: "PURCHASER_S_ORDER_LINE_NUMBER",
	},
	{
		value: "PO",
		name: "Purchase order number",
		description: "Reference number identifying a customer's order.",
		key: "PURCHASE_ORDER_NUMBER",
	},
	{
		value: "PV",
		name: "Promotional variant number",
		description: "The item number is a promotional variant number.",
		key: "PROMOTIONAL_VARIANT_NUMBER",
	},
	{
		value: "QS",
		name: "Buyer's qualifier for size",
		description: "The item number qualifies the size of the buyer.",
		key: "BUYER_S_QUALIFIER_FOR_SIZE",
	},
	{
		value: "RC",
		name: "Returnable container number",
		description: "Reference number identifying a returnable container.",
		key: "RETURNABLE_CONTAINER_NUMBER",
	},
	{
		value: "RN",
		name: "Release number",
		description:
			"Reference number identifying a release from a buyer's purchase order.",
		key: "RELEASE_NUMBER",
	},
	{
		value: "RU",
		name: "Run number",
		description:
			"The item number identifies the production or manufacturing run or sequence in which the item was manufactured, processed or assembled.",
		key: "RUN_NUMBER",
	},
	{
		value: "RY",
		name: "Record keeping of model year",
		description:
			"The item number relates to the year in which the particular model was kept.",
		key: "RECORD_KEEPING_OF_MODEL_YEAR",
	},
	{
		value: "SA",
		name: "Supplier's article number",
		description:
			"Number assigned to an article by the supplier of that article.",
		key: "SUPPLIER_S_ARTICLE_NUMBER",
	},
	{
		value: "SG",
		name: "Standard group of products (mixed assortment)",
		description:
			"The item number relates to a standard group of other items (mixed) which are grouped together as a single item for identification purposes.",
		key: "STANDARD_GROUP_OF_PRODUCTS_MIXED_ASSORTMENT",
	},
	{
		value: "SK",
		name: "SKU (Stock keeping unit)",
		description: "Reference number of a stock keeping unit.",
		key: "SKU_STOCK_KEEPING_UNIT",
	},
	{
		value: "SN",
		name: "Serial number",
		description:
			"Identification number of an item which distinguishes this specific item out of a number of identical items.",
		key: "SERIAL_NUMBER",
	},
	{
		value: "SRS",
		name: "RSK number",
		description: "Plumbing and heating.",
		key: "RSK_NUMBER",
	},
	{
		value: "SRT",
		name: "IFLS (Institut Francais du Libre Service) 5 digit product",
		description:
			"classification code 5 digit code for product classification managed by the Institut Francais du Libre Service.",
		key: "IFLS_INSTITUT_FRANCAIS_DU_LIBRE_SERVICE_5_DIGIT_PRODUCT",
	},
	{
		value: "SRU",
		name: "IFLS (Institut Francais du Libre Service) 9 digit product",
		description:
			"classification code 9 digit code for product classification managed by the Institut Francais du Libre Service.",
		key: "IFLS_INSTITUT_FRANCAIS_DU_LIBRE_SERVICE_9_DIGIT_PRODUCT",
	},
	{
		value: "SRV",
		name: "GS1 Global Trade Item Number",
		description:
			"A unique number, up to 14-digits, assigned according to the numbering structure of the GS1 system.",
		key: "GS1_GLOBAL_TRADE_ITEM_NUMBER",
	},
	{
		value: "SRW",
		name: "EDIS (Energy Data Identification System)",
		description: "European system for identification of meter data.",
		key: "EDIS_ENERGY_DATA_IDENTIFICATION_SYSTEM",
	},
	{
		value: "SRX",
		name: "Slaughter number",
		description:
			"Unique number given by a slaughterhouse to an animal or a group of animals of the same breed.",
		key: "SLAUGHTER_NUMBER",
	},
	{
		value: "SRY",
		name: "Official animal number",
		description:
			"Unique number given by a national authority to identify an animal individually.",
		key: "OFFICIAL_ANIMAL_NUMBER",
	},
	{
		value: "SRZ",
		name: "Harmonized tariff schedule",
		description:
			"The international Harmonized Tariff Schedule (HTS) to classify the article for customs, statistical and other purposes.",
		key: "HARMONIZED_TARIFF_SCHEDULE",
	},
	{
		value: "SS",
		name: "Supplier's supplier article number",
		description:
			"Article number referring to a sales catalogue of supplier's supplier.",
		key: "SUPPLIER_S_SUPPLIER_ARTICLE_NUMBER",
	},
	{
		value: "SSA",
		name: "46 Level DOT Code",
		description:
			"A US Department of Transportation (DOT) code to identify hazardous (dangerous) goods, managed by the Customs and Border Protection (CBP) agency.",
		key: "46_LEVEL_DOT_CODE",
	},
	{
		value: "SSB",
		name: "Airline Tariff 6D",
		description:
			"A US code agreed to by the airline industry to identify hazardous (dangerous) goods, managed by the Customs and Border Protection (CBP) agency.",
		key: "AIRLINE_TARIFF_6_D",
	},
	{
		value: "SSC",
		name: "Title 49 Code of Federal Regulations",
		description:
			"A US Customs and Border Protection (CBP) code used to identify hazardous (dangerous) goods.",
		key: "TITLE_49_CODE_OF_FEDERAL_REGULATIONS",
	},
	{
		value: "SSD",
		name: "International Civil Aviation Administration code",
		description:
			"A US Department of Transportation/Federal Aviation Administration code used to identify hazardous (dangerous) goods, managed by the Customs and Border Protection (CBP) agency.",
		key: "INTERNATIONAL_CIVIL_AVIATION_ADMINISTRATION_CODE",
	},
	{
		value: "SSE",
		name: "Hazardous Materials ID DOT",
		description:
			"A US Department of Transportation (DOT) code used to identify hazardous (dangerous) goods, managed by the Customs and Border Protection (CBP) agency.",
		key: "HAZARDOUS_MATERIALS_ID_DOT",
	},
	{
		value: "SSF",
		name: "Endorsement",
		description:
			"A US Customs and Border Protection (CBP) code used to identify hazardous (dangerous) goods.",
		key: "ENDORSEMENT",
	},
	{
		value: "SSG",
		name: "Air Force Regulation 71-4",
		description:
			"A department of Defense/Air Force code used to identify hazardous (dangerous) goods, managed by the Customs and Border Protection (CBP) agency.",
		key: "AIR_FORCE_REGULATION_71_4",
	},
	{
		value: "SSH",
		name: "Breed",
		description: "The breed of the item (e.g. plant or animal).",
		key: "BREED",
	},
	{
		value: "SSI",
		name: "Chemical Abstract Service (CAS) registry number",
		description:
			"A unique numerical identifier for for chemical compounds, polymers, biological sequences, mixtures and alloys.",
		key: "CHEMICAL_ABSTRACT_SERVICE_CAS_REGISTRY_NUMBER",
	},
	{
		value: "SSJ",
		name: "Engine model designation",
		description: "A name or designation to identify an engine model.",
		key: "ENGINE_MODEL_DESIGNATION",
	},
	{
		value: "SSK",
		name: "Institutional Meat Purchase Specifications (IMPS) Number",
		description:
			"A number assigned by agricultural authorities to identify and track meat and meat products.",
		key: "INSTITUTIONAL_MEAT_PURCHASE_SPECIFICATIONS_IMPS_NUMBER",
	},
	{
		value: "SSL",
		name: "Price Look-Up code (PLU)",
		description:
			"Identification number affixed to produce in stores to retrieve price information.",
		key: "PRICE_LOOK_UP_CODE_PLU",
	},
	{
		value: "SSM",
		name: "International Maritime Organization (IMO) Code",
		description:
			"An International Maritime Organization (IMO) code used to identify hazardous (dangerous) goods.",
		key: "INTERNATIONAL_MARITIME_ORGANIZATION_IMO_CODE",
	},
	{
		value: "SSN",
		name: "Bureau of Explosives 600-A (rail)",
		description:
			"A Department of Transportation/Federal Railroad Administration code used to identify hazardous (dangerous) goods.",
		key: "BUREAU_OF_EXPLOSIVES_600_A_RAIL",
	},
	{
		value: "SSO",
		name: "United Nations Dangerous Goods List",
		description: "A UN code used to classify and identify dangerous goods.",
		key: "UNITED_NATIONS_DANGEROUS_GOODS_LIST",
	},
	{
		value: "SSP",
		name: "International Code of Botanical Nomenclature (ICBN)",
		description:
			"A code established by the International Code of Botanical Nomenclature (ICBN) used to classify and identify botanical articles and commodities.",
		key: "INTERNATIONAL_CODE_OF_BOTANICAL_NOMENCLATURE_ICBN",
	},
	{
		value: "SSQ",
		name: "International Code of Zoological Nomenclature (ICZN)",
		description:
			"A code established by the International Code of Zoological Nomenclature (ICZN) used to classify and identify animals.",
		key: "INTERNATIONAL_CODE_OF_ZOOLOGICAL_NOMENCLATURE_ICZN",
	},
	{
		value: "SSR",
		name: "International Code of Nomenclature for Cultivated Plants",
		description:
			"(ICNCP) A code established by the International Code of Nomenclature for Cultivated Plants (ICNCP) used to classify and identify animals.",
		key: "INTERNATIONAL_CODE_OF_NOMENCLATURE_FOR_CULTIVATED_PLANTS",
	},
	{
		value: "SSS",
		name: "Distributor�s article identifier",
		description:
			"Identifier assigned to an article by the distributor of that article.",
		key: "DISTRIBUTOR_S_ARTICLE_IDENTIFIER",
	},
	{
		value: "SST",
		name: "Norwegian Classification system ENVA",
		description: "Product classification system used in the Norwegian market.",
		key: "NORWEGIAN_CLASSIFICATION_SYSTEM_ENVA",
	},
	{
		value: "SSU",
		name: "Supplier assigned classification",
		description: "Product classification assigned by the supplier.",
		key: "SUPPLIER_ASSIGNED_CLASSIFICATION",
	},
	{
		value: "SSV",
		name: "Mexican classification system AMECE",
		description: "Product classification system used in the Mexican market.",
		key: "MEXICAN_CLASSIFICATION_SYSTEM_AMECE",
	},
	{
		value: "SSW",
		name: "German classification system CCG",
		description: "Product classification system used in the German market.",
		key: "GERMAN_CLASSIFICATION_SYSTEM_CCG",
	},
	{
		value: "SSX",
		name: "Finnish classification system EANFIN",
		description: "Product classification system used in the Finnish market.",
		key: "FINNISH_CLASSIFICATION_SYSTEM_EANFIN",
	},
	{
		value: "SSY",
		name: "Canadian classification system ICC",
		description: "Product classification system used in the Canadian market.",
		key: "CANADIAN_CLASSIFICATION_SYSTEM_ICC",
	},
	{
		value: "SSZ",
		name: "French classification system IFLS5",
		description: "Product classification system used in the French market.",
		key: "FRENCH_CLASSIFICATION_SYSTEM_IFLS5",
	},
	{
		value: "ST",
		name: "Style number",
		description:
			"Number given to a specific style or form of an article, especially used for garments.",
		key: "STYLE_NUMBER",
	},
	{
		value: "STA",
		name: "Dutch classification system CBL",
		description: "Product classification system used in the Dutch market.",
		key: "DUTCH_CLASSIFICATION_SYSTEM_CBL",
	},
	{
		value: "STB",
		name: "Japanese classification system JICFS",
		description: "Product classification system used in the Japanese market.",
		key: "JAPANESE_CLASSIFICATION_SYSTEM_JICFS",
	},
	{
		value: "STC",
		name: "European Union dairy subsidy eligibility classification",
		description:
			"Category of product eligible for EU subsidy (applies for certain dairy products with specific level of fat content).",
		key: "EUROPEAN_UNION_DAIRY_SUBSIDY_ELIGIBILITY_CLASSIFICATION",
	},
	{
		value: "STD",
		name: "GS1 Spain classification system",
		description: "Product classification system used in the Spanish market.",
		key: "GS1_SPAIN_CLASSIFICATION_SYSTEM",
	},
	{
		value: "STE",
		name: "GS1 Poland classification system",
		description: "Product classification system used in the Polish market.",
		key: "GS1_POLAND_CLASSIFICATION_SYSTEM",
	},
	{
		value: "STF",
		name: "Federal Agency on Technical Regulating and Metrology of the",
		description:
			"Russian Federation A Russian government agency that serves as a national standardization body of the Russian Federation.",
		key: "FEDERAL_AGENCY_ON_TECHNICAL_REGULATING_AND_METROLOGY_OF_THE",
	},
	{
		value: "STG",
		name: "Efficient Consumer Response (ECR) Austria classification",
		description:
			"system Product classification system used in the Austrian market.",
		key: "EFFICIENT_CONSUMER_RESPONSE_ECR_AUSTRIA_CLASSIFICATION",
	},
	{
		value: "STH",
		name: "GS1 Italy classification system",
		description: "Product classification system used in the Italian market.",
		key: "GS1_ITALY_CLASSIFICATION_SYSTEM",
	},
	{
		value: "STI",
		name: "CPV (Common Procurement Vocabulary)",
		description:
			"Official classification system for public procurement in the European Union.",
		key: "CPV_COMMON_PROCUREMENT_VOCABULARY",
	},
	{
		value: "STJ",
		name: "IFDA (International Foodservice Distributors Association)",
		description: "International Foodservice Distributors Association (IFDA).",
		key: "IFDA_INTERNATIONAL_FOODSERVICE_DISTRIBUTORS_ASSOCIATION",
	},
	{
		value: "STK",
		name: "AHFS (American Hospital Formulary Service) pharmacologic -",
		description:
			"therapeutic classification Pharmacologic - therapeutic classification maintained by the American Hospital Formulary Service (AHFS).",
		key: "AHFS_AMERICAN_HOSPITAL_FORMULARY_SERVICE_PHARMACOLOGIC",
	},
	{
		value: "STL",
		name: "ATC (Anatomical Therapeutic Chemical) classification system",
		description:
			"Anatomical Therapeutic Chemical classification system maintained by the World Health Organisation (WHO).",
		key: "ATC_ANATOMICAL_THERAPEUTIC_CHEMICAL_CLASSIFICATION_SYSTEM",
	},
	{
		value: "STM",
		name: "CLADIMED (Classification des Dispositifs M�dicaux)",
		description:
			"A five level classification system for medical decvices maintained by the CLADIMED organisation used in the French market.",
		key: "CLADIMED_CLASSIFICATION_DES_DISPOSITIFS_M_DICAUX",
	},
	{
		value: "STN",
		name: "CMDR (Canadian Medical Device Regulations) classification",
		description:
			"system Classification system related to the Canadian Medical Device Regulations maintained by Health Canada.",
		key: "CMDR_CANADIAN_MEDICAL_DEVICE_REGULATIONS_CLASSIFICATION",
	},
	{
		value: "STO",
		name: "CNDM (Classificazione Nazionale dei Dispositivi Medici)",
		description:
			"A classification system for medical devices used in the Italian market.",
		key: "CNDM_CLASSIFICAZIONE_NAZIONALE_DEI_DISPOSITIVI_MEDICI",
	},
	{
		value: "STP",
		name: "UK DM&D (Dictionary of Medicines & Devices) standard coding",
		description:
			"scheme A classification system for medicines and devices used in the UK market.",
		key: "UK_DM_D_DICTIONARY_OF_MEDICINES_DEVICES_STANDARD_CODING",
	},
	{
		value: "STQ",
		name: "eCl@ss",
		description:
			"Standardized material and service classification and dictionary maintained by eClass e.V.",
		key: "E_CL_SS",
	},
	{
		value: "STR",
		name: "EDMA (European Diagnostic Manufacturers Association)",
		description:
			"Products Classification Classification for in vitro diagnostics medical devices maintained by the European Diagnostic Manufacturers Association.",
		key: "EDMA_EUROPEAN_DIAGNOSTIC_MANUFACTURERS_ASSOCIATION",
	},
	{
		value: "STS",
		name: "EGAR (European Generic Article Register)",
		description: "A classification system for medical devices.",
		key: "EGAR_EUROPEAN_GENERIC_ARTICLE_REGISTER",
	},
	{
		value: "STT",
		name: "GMDN (Global Medical Devices Nomenclature)",
		description:
			"Nomenclature system for identification of medical devices officially apprroved by the European Union.",
		key: "GMDN_GLOBAL_MEDICAL_DEVICES_NOMENCLATURE",
	},
	{
		value: "STU",
		name: "GPI (Generic Product Identifier)",
		description: "A drug classification system managed by Medi-Span.",
		key: "GPI_GENERIC_PRODUCT_IDENTIFIER",
	},
	{
		value: "STV",
		name: "HCPCS (Healthcare Common Procedure Coding System)",
		description:
			"A classification system used with US healthcare insurance programs.",
		key: "HCPCS_HEALTHCARE_COMMON_PROCEDURE_CODING_SYSTEM",
	},
	{
		value: "STW",
		name: "ICPS (International Classification for Patient Safety)",
		description:
			"A patient safety taxonomy maintained by the World Health Organisation.",
		key: "ICPS_INTERNATIONAL_CLASSIFICATION_FOR_PATIENT_SAFETY",
	},
	{
		value: "STX",
		name: "MedDRA (Medical Dictionary for Regulatory Activities)",
		description:
			"A medical dictionary maintained by the International Federation of Pharmaceutical Manufacturers and Associations (IFPMA).",
		key: "MED_DRA_MEDICAL_DICTIONARY_FOR_REGULATORY_ACTIVITIES",
	},
	{
		value: "STY",
		name: "Medical Columbus",
		description:
			"Medical product classification system used in the German market.",
		key: "MEDICAL_COLUMBUS",
	},
	{
		value: "STZ",
		name: "NAPCS (North American Product Classification System)",
		description:
			"Product classification system used in the North American market.",
		key: "NAPCS_NORTH_AMERICAN_PRODUCT_CLASSIFICATION_SYSTEM",
	},
	{
		value: "SUA",
		name: "NHS (National Health Services) eClass",
		description:
			"Product and Service classification system used in United Kingdom market.",
		key: "NHS_NATIONAL_HEALTH_SERVICES_E_CLASS",
	},
	{
		value: "SUB",
		name: "US FDA (Food and Drug Administration) Product Code",
		description:
			"Classification Database US FDA Product Code Classification Database contains medical device names and associated information developed by the Center for Devices and Radiological Health (CDRH).",
		key: "US_FDA_FOOD_AND_DRUG_ADMINISTRATION_PRODUCT_CODE",
	},
	{
		value: "SUC",
		name: "SNOMED CT (Systematized Nomenclature of Medicine-Clinical",
		description:
			"Terms) A medical nomenclature system developed between the NHS and the College of American Pathologists.",
		key: "SNOMED_CT_SYSTEMATIZED_NOMENCLATURE_OF_MEDICINE_CLINICAL",
	},
	{
		value: "SUD",
		name: "UMDNS (Universal Medical Device Nomenclature System)",
		description:
			"A standard international nomenclature and computer coding system for medical devices maintained by the Emergency Care Research Institute (ECRI).",
		key: "UMDNS_UNIVERSAL_MEDICAL_DEVICE_NOMENCLATURE_SYSTEM",
	},
	{
		value: "SUE",
		name: "GS1 Global Returnable Asset Identifier, non-serialised",
		description:
			"A unique, 13-digit number assigned according to the numbering structure of the GS1 system and used to identify a type of Reusable Transport Item (RTI).",
		key: "GS1_GLOBAL_RETURNABLE_ASSET_IDENTIFIER_NON_SERIALISED",
	},
	{
		value: "SUF",
		name: "IMEI",
		description:
			"The International Mobile Station Equipment Identity (IMEI) is a unique number to identify mobile phones. It includes the origin, model and serial number of the device. The structure is specified in 3GPP TS 23.003.",
		key: "IMEI",
	},
	{
		value: "SUG",
		name: "Waste Type (EMSA)",
		description:
			"Classification of waste as defined by the European Maritime Safety Agency (EMSA).",
		key: "WASTE_TYPE_EMSA",
	},
	{
		value: "SUH",
		name: "Ship's store classification type",
		description: "Classification of ship�s stores.",
		key: "SHIP_S_STORE_CLASSIFICATION_TYPE",
	},
	{
		value: "SUI",
		name: "Emergency fire code",
		description:
			"Classification for emergency response procedures related to fire.",
		key: "EMERGENCY_FIRE_CODE",
	},
	{
		value: "SUJ",
		name: "Emergency spillage code",
		description:
			"Classification for emergency response procedures related to spillage.",
		key: "EMERGENCY_SPILLAGE_CODE",
	},
	{
		value: "SUK",
		name: "IMDG packing group",
		description:
			"Packing group as defined in the International Marititme Dangerous Goods (IMDG) specification.",
		key: "IMDG_PACKING_GROUP",
	},
	{
		value: "SUL",
		name: "MARPOL Code IBC",
		description:
			"International Bulk Chemical (IBC) code defined by the International Convention for the Prevention of Pollution from Ships (MARPOL).",
		key: "MARPOL_CODE_IBC",
	},
	{
		value: "SUM",
		name: "IMDG subsidiary risk class",
		description:
			"Subsidiary risk class as defined in the International Maritime Dangerous Goods (IMDG) specification.",
		key: "IMDG_SUBSIDIARY_RISK_CLASS",
	},
	{
		value: "TG",
		name: "Transport group number",
		description:
			"(8012) Additional number to form article groups for packing and/or transportation purposes.",
		key: "TRANSPORT_GROUP_NUMBER",
	},
	{
		value: "TSN",
		name: "Taxonomic Serial Number",
		description:
			"A unique number assigned to a taxonomic entity, commonly to a species of plants or animals, providing information on their hierarchical classification, scientific name, taxonomic rank, associated synonyms and vernacular names where appropriate, data source information and data quality indicators.",
		key: "TAXONOMIC_SERIAL_NUMBER",
	},
	{
		value: "TSO",
		name: "IMDG main hazard class",
		description:
			"Main hazard class as defined in the International Maritime Dangerous Goods (IMDG) specification.",
		key: "IMDG_MAIN_HAZARD_CLASS",
	},
	{
		value: "TSP",
		name: "EU Combined Nomenclature",
		description:
			"The number is part of, or is generated in the context of the Combined Nomenclature classification, as developed and maintained by the European Union (EU).",
		key: "EU_COMBINED_NOMENCLATURE",
	},
	{
		value: "TSQ",
		name: "Therapeutic classification number",
		description: "A code to specify a product's therapeutic classification.",
		key: "THERAPEUTIC_CLASSIFICATION_NUMBER",
	},
	{
		value: "TSR",
		name: "European Waste Catalogue",
		description:
			"Waste type number according to the European Waste Catalogue (EWC).",
		key: "EUROPEAN_WASTE_CATALOGUE",
	},
	{
		value: "TSS",
		name: "Price grouping code",
		description:
			"Number assigned to identify a grouping of products based on price.",
		key: "PRICE_GROUPING_CODE",
	},
	{
		value: "TST",
		name: "UNSPSC",
		description: "The UNSPSC commodity classification system.",
		key: "UNSPSC",
	},
	{
		value: "TSU",
		name: "EU RoHS Directive",
		description:
			"European Union Directive on the restriction of hazardous substances.",
		key: "EU_RO_HS_DIRECTIVE",
	},
	{
		value: "UA",
		name: "Ultimate customer's article number",
		description:
			"Number assigned by ultimate customer to identify relevant article.",
		key: "ULTIMATE_CUSTOMER_S_ARTICLE_NUMBER",
	},
	{
		value: "UP",
		name: "UPC (Universal product code)",
		description:
			"Number assigned to a manufacturer's product by the Product Code Council.",
		key: "UPC_UNIVERSAL_PRODUCT_CODE",
	},
	{
		value: "VN",
		name: "Vendor item number",
		description:
			"Reference number assigned by a vendor/seller identifying a product/service/article.",
		key: "VENDOR_ITEM_NUMBER",
	},
	{
		value: "VP",
		name: "Vendor's (seller's) part number",
		description:
			"Reference number assigned by a vendor/seller identifying an article.",
		key: "VENDOR_S_SELLER_S_PART_NUMBER",
	},
	{
		value: "VS",
		name: "Vendor's supplemental item number",
		description:
			"The item number is a specified by the vendor as a supplemental number for the vendor's purposes.",
		key: "VENDOR_S_SUPPLEMENTAL_ITEM_NUMBER",
	},
	{
		value: "VX",
		name: "Vendor specification number",
		description:
			"The item number has been allocated by the vendor as a specification number.",
		key: "VENDOR_SPECIFICATION_NUMBER",
	},
	{
		value: "ZZZ",
		name: "Mutually defined",
		description:
			"Item type identification mutually agreed between interchanging parties.",
		key: "MUTUALLY_DEFINED",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		untdid7143: typeof untdid7143;
	}
}
registerCodelist("untdid7143", untdid7143);

export default untdid7143;
