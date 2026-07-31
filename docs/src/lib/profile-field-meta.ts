import type { FieldMeta } from "./profile-field-utils";

export const profileFieldMetaMap = new Map([
	["BG-0", { xpath: "/rsm:CrossIndustryInvoice", businessTerm: "Invoice" }],
	[
		"BG-2",
		{
			xpath: "/rsm:CrossIndustryInvoice/rsm:ExchangedDocumentContext",
			businessTerm: "PROCESS CONTROL",
			description:
				"A group of business terms providing information on the business process and rules applicable to the Invoice document.",
		},
	],
	[
		"BT-X-1-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocumentContext/ram:TestIndicator",
			businessTerm: "Test Indicator",
			description:
				"The Indicator type may be used when implementing a new system in order to mark the invoice as „test invoice“.",
			usageNote:
				"To be used only in case of a test invoice, with Indicator = true",
		},
	],
	[
		"BT-X-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocumentContext/ram:TestIndicator/udt:Indicator",
			businessTerm: "Test Indicator, value\r\nTest Indicator, value",
		},
	],
	[
		"BT-23-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocumentContext/ram:BusinessProcessSpecifiedDocumentContextParameter",
			businessTerm: "Grouping of business context information",
		},
	],
	[
		"BT-23",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocumentContext/ram:BusinessProcessSpecifiedDocumentContextParameter/ram:ID",
			businessTerm: "Business process type",
			description:
				"Identifies the business process context in which the transaction appears, to enable the Buyer to process the Invoice in an appropriate way.",
			usageNote: "To be specifid by the Buyer.",
			cius: 'CHORUSPRO: this data makes it possible to inform the "cadre de facturation" (billing framework, which could be invoice from agent, co-contractor, subcontractor, invoicing part of a public works contract, etc.). The codes to be used are defined in the CHORUSPRO specifications: A1 (invoice deposit), A2 (prepaid invoice deposit), ... By default (in the absence of this field), the case A1 is applied.',
		},
	],
	[
		"BT-24-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocumentContext/ram:GuidelineSpecifiedDocumentContextParameter",
			businessTerm: "Grouping of application recommendation information",
		},
	],
	[
		"BT-24",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocumentContext/ram:GuidelineSpecifiedDocumentContextParameter/ram:ID",
			businessTerm: "Specification identifier",
			description:
				"An identification of the specification containing the total set of rules regarding semantic content, cardinalities and business rules to which the data contained in the instance document conforms.",
			usageNote:
				"This identifies compiance or conformance to this document. Conformant invoices specify: urn:cen.eu:en16931:2017. Invoices, compliant to a user specification may identify that user specification here. No identification scheme is to be used.",
			businessRule:
				"BR-1: An Invoice shall have a Specification identifier (BT-24).",
			cius: "For Profile EXTENDED : urn:cen.eu:en16931:2017#conformant#urn:factur-x.eu:1p0:extended",
		},
	],
	[
		"BT-1-00",
		{
			xpath: "/rsm:CrossIndustryInvoice/rsm:ExchangedDocument",
			businessTerm:
				"Grouping of characteristics that affect the entire document",
		},
	],
	[
		"BT-1",
		{
			xpath: "/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:ID",
			businessTerm: "Invoice number",
			description: "A unique identification of the Invoice.",
			usageNote:
				"The sequential number required in Article 226(2) of the directive 2006/112/EC [2], to uniquely identify the Invoice within the business context, time-frame, operating systems and records of the Seller . It may be based on one or more series of numbers, which may include alphanumeric characters. No identification scheme is to be used.",
			businessRule: "BR-2: An Invoice shall have an Invoice number (BT-1).",
			cius: "CHORUSPRO: the invoice number is limited to 20 characters",
		},
	],
	[
		"BT-X-2",
		{
			xpath: "/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:Name",
			businessTerm: "Document name",
			description:
				"Text is the actual wording of anything written or printed. This EN 16931_ Text. Type is based on the Text. Type as defined in ISO 15000-5:2014, Annex B. Line breaks in the text may be present.",
		},
	],
	[
		"BT-3",
		{
			xpath: "/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:TypeCode",
			businessTerm: "Invoice type code",
			description: "A code specifying the functional type of the Invoice.",
			usageNote:
				"Commercial invoices and credit notes are defined according the entries in UNTDID 1001 [6]. \r\nOther  entries of UNTDID 1001 [6] with specific invoices or credit notes may be used if applicable.",
			businessRule: "BR-4: An Invoice shall have an Invoice type code (BT-3).",
			cius: "The types of documents used are:\r\n380: Commercial Invoice\r\n381: Credit note\r\n384: Corrected invoice\r\n389: Self-billied invoice (created by the buyer on behalf of the supplier)\r\n261: Self billed credit note (not accepted by CHORUSPRO)\r\n386: Prepayment invoice\r\n751: Invoice information for accounting purposes (not accepted by CHORUSPRO)",
		},
	],
	[
		"BT-2-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IssueDateTime",
			businessTerm: "Invoice issue date, Content",
			description: "The date when the Invoice was issued.",
		},
	],
	[
		"BT-2",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IssueDateTime/udt:DateTimeString",
			businessTerm: "Invoice issue date",
			description: "The date when the Invoice was issued.",
			businessRule: "BR-3: An Invoice shall have an Invoice issue date (BT-2).",
			cius: "CHORUSPRO: the issue date must be before or equal to the deposit date.",
		},
	],
	[
		"BT-2-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IssueDateTime/udt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-X-3-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:CopyIndicator",
			businessTerm: "Copy Indicator",
			description:
				"Indicates if the invoice document is a copy of another invoice document.",
			usageNote: "With indicator = true, the document is a copy.",
		},
	],
	[
		"BT-X-3",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:CopyIndicator/udt:Indicator",
			businessTerm: "Copy indicator, value",
		},
	],
	[
		"BT-X-4",
		{
			xpath: "/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:LanguageID",
			businessTerm: "Invoice language code",
			description: "Indicates the language used in the invoice document.",
			usageNote:
				'Valid languages are registered with the ISO 639-2 "Codes for the representation of names of languages" Maintenance Agency.',
		},
	],
	[
		"BG-1",
		{
			xpath: "/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IncludedNote",
			businessTerm: "INVOICE NOTE",
			description:
				"A group of business terms providing textual notes that are relevant for the invoice, together with an indication of the note subject.",
		},
	],
	[
		"BT-X-5",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IncludedNote/ram:ContentCode",
			businessTerm: "Free text on header level (qualifying the content)",
			description: "A code to classify the content of the invoice note.",
			usageNote:
				"The code is bilaterally agreed on and must have the same meaning as BT-22.",
		},
	],
	[
		"BT-22",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IncludedNote/ram:Content",
			businessTerm: "Invoice note",
			description:
				"A textual note that gives unstructured information that is relevant to the Invoice as a whole.",
			usageNote:
				"Such as the reason for any correction or assignment note in case the invoice has been factored.",
		},
	],
	[
		"BT-21",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IncludedNote/ram:SubjectCode",
			businessTerm: "Invoice note subject code",
			description: "The subject of the textual note in BT-22.",
			usageNote: "To be chosen from the entries in UNTDID 4451 [6].",
			cius: "Among the list, the following codes can be used:\r\nAAI: General Information\r\nSUR: Supplier Notes\r\nREG: Regulatory information\r\nABL: Legal Information\r\nTXD: Tax Information\r\nCUS: Customs Information",
		},
	],
	[
		"BT-X-6-000",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:EffectiveSpecifiedPeriod",
			businessTerm: "Contractual due date of the invoice",
			description:
				"Indication of the due date of the invoice if this differs from the payment.",
			usageNote:
				"Information only required if the contractual due date differs from due date of the payment (i.e. for SEPA direct debit).",
		},
	],
	[
		"BT-X-6-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:EffectiveSpecifiedPeriod/ram:CompleteDateTime",
			businessTerm: "Contractual due date of the invoice",
			description:
				"Indication of the due date of the invoice if this differs from the payment.",
			usageNote:
				"Information only required if the contractual due date differs from due date of the payment (i.e. for SEPA direct debit).",
		},
	],
	[
		"BT-X-6",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:EffectiveSpecifiedPeriod/ram:CompleteDateTime/udt:DateTimeString",
			businessTerm: "Contractual due date of the invoice, value",
		},
	],
	[
		"BT-X-6-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:EffectiveSpecifiedPeriod/ram:CompleteDateTime/udt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-25-00",
		{
			xpath: "/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction",
			businessTerm: "Grouping of information about the business transaction",
		},
	],
	[
		"BG-25",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem",
			businessTerm: "INVOICE LINE",
			description:
				"A group of business terms providing information on individual Invoice lines.",
		},
	],
	[
		"BT-126-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument",
			businessTerm: "Grouping of general position information",
		},
	],
	[
		"BT-126",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:LineID",
			businessTerm: "Invoice line identifier",
			description:
				"A unique identifier for the individual line within the Invoice.",
		},
	],
	[
		"BT-X-304",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:ParentLineID",
			businessTerm: "Parent line ID",
			description:
				"The value given here refers to the superior line. In this way, a hierarchy tree of invoice items can be mapped.",
		},
	],
	[
		"BT-X-7",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:LineStatusCode",
			businessTerm: "Type of the inovice line item (Code)",
			description:
				"Indicating whether an item includes the prices which must be taken into account when calculating the invoice amount, or whether it only contains information.",
			usageNote:
				"Use codes from codelist UNTDID 1229. The following code should be applied per default: 39",
		},
	],
	[
		"BT-X-8",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:LineStatusReasonCode",
			businessTerm: "Subtype of the invoice line item",
			description:
				"Complements the type to clarify whether the invoice item is one of the following: \r\n- Detail (default positioning) \r\n- Subtotal \r\n- Solely information",
			usageNote:
				"If the LineStatusCode element is used, the LineStatusReasonCode must be filled in: DETAIL, GROUP, INFORMATION",
		},
	],
	[
		"BT-127-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:IncludedNote",
			businessTerm: "Detailed information about the free text of the line item",
		},
	],
	[
		"BT-X-9",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:IncludedNote/ram:ContentCode",
			businessTerm: "Free text on line level (code)",
			description: "A code to classify the content of the invoice note.",
			usageNote:
				"The code is agreed bilaterally and must have the same meaning as BT-127.",
		},
	],
	[
		"BT-127",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:IncludedNote/ram:Content",
			businessTerm: "Invoice line note",
			description:
				"A textual note that gives unstructured information that is relevant to the Invoice line.",
		},
	],
	[
		"BT-X-10",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:IncludedNote/ram:SubjectCode",
			businessTerm: "Invoice line note subject code",
			usageNote: "To be chosen from the entries in UNTDID 4451 [6].",
		},
	],
	[
		"BG-31",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct",
			businessTerm: "ITEM INFORMATION",
			description:
				"A group of business terms providing information about the goods and services invoiced.",
		},
	],
	[
		"BT-X-305",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ID",
			businessTerm: "Product identifier",
			description:
				"This identifier can be additionally specified to be interoperable with Order-X.",
		},
	],
	[
		"BT-157",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:GlobalID",
			businessTerm: "Item standard identifier",
			description: "An item identifier based on a registered scheme.",
			businessRule:
				"BR-64: The Item standard identifier (BT-157) shall have a Scheme identifier",
			cius: "CHORUSPRO: this field is limited to 40 characters",
		},
	],
	[
		"BT-157-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Item standard identifier",
			usageNote:
				"The identification scheme shall be identified from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-155",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:SellerAssignedID",
			businessTerm: "Item Seller's identifier",
			description: "An identifier, assigned by the Seller, for the item.",
		},
	],
	[
		"BT-156",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:BuyerAssignedID",
			businessTerm: "Item Buyer's identifier",
			description: "An identifier, assigned by the Buyer, for the item.",
		},
	],
	[
		"BT-X-532",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IndustryAssignedID",
			businessTerm: "Industry assigned product identifier",
			description: "An identifier, assigned by the Industry, for the item.",
		},
	],
	[
		"BT-X-533",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ModelID",
			businessTerm: "Model identification of the item",
			description: "A unique model identifier for this item.",
		},
	],
	[
		"BT-153",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:Name",
			businessTerm: "Item name",
			description: "A name for an item.",
		},
	],
	[
		"BT-154",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:Description",
			businessTerm: "Item description",
			description: "A description for an item.",
			usageNote:
				"The Item description allows for describing the item and its features in more detail than the Item name.",
		},
	],
	[
		"BT-X-534",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:BatchID",
			businessTerm: "Batch (lot) identification of the item",
			description: "A batch identifier for this item.",
		},
	],
	[
		"BT-X-535",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:BrandName",
			businessTerm: "Item brand name",
			description: "The brand name, expressed as text, for this item.",
		},
	],
	[
		"BT-X-536",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ModelName",
			businessTerm: "Item model name",
		},
	],
	[
		"BG-32",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic",
			businessTerm: "ITEM ATTRIBUTES",
			description:
				"A group of business terms providing information about properties of the goods and services invoiced.",
		},
	],
	[
		"BT-X-11",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:TypeCode",
			businessTerm: "Item Attribute Type (Code)",
			usageNote:
				"To ensure automated processing of the article attributes without bilateral reconciliation, only values from the code list UNTDED 6313+Factur-X-Extension should be used.",
		},
	],
	[
		"BT-160",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:Description",
			businessTerm: "Item attribute name",
			description: "The name of the attribute or property of the item.",
			usageNote: 'Such as "Colour".',
		},
	],
	[
		"BT-X-12",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:ValueMeasure",
			businessTerm: "Item Attribute Value (numerical measurand)",
		},
	],
	[
		"BT-X-12-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:ValueMeasure/@unitCode",
			businessTerm: "Unit of measure",
		},
	],
	[
		"BT-161",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:Value",
			businessTerm: "Item attribute value",
			description: "The value of the attribute or property of the item.",
			usageNote: 'Such as "Red".',
		},
	],
	[
		"BT-158-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification",
			businessTerm: "Detailed information on the item classification",
		},
	],
	[
		"BT-158",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification/ram:ClassCode",
			businessTerm: "Item classification identifier",
			description: "A code for classifying the item by its type or nature.",
			usageNote:
				"Classification codes are used to allow grouping of similar items for a various purposes e.g. public procurement (CPV), e-Commerce (UNSPSC) etc.",
		},
	],
	[
		"BT-158-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification/ram:ClassCode/@listID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Item classification identifier",
			usageNote:
				"The identification scheme shall be chosen from the entries in UNTDID 7143 [6].",
		},
	],
	[
		"BT-158-2",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification/ram:ClassCode/@listVersionID",
			businessTerm: "Scheme version identifer",
			description: "The version of the identification scheme.",
		},
	],
	[
		"BT-X-13",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification/ram:ClassName",
			businessTerm: "Classification name",
			description:
				"Name used to classify an item according to its type or nature.",
		},
	],
	[
		"BG-X-84",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IndividualTradeProductInstance",
			businessTerm: "Item (Trade Product) Instances",
		},
	],
	[
		"BT-X-306",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IndividualTradeProductInstance/ram:BatchID",
			businessTerm: "Item (Trade Product) Instances Batch ID",
			description:
				"The unique batch identifier for this trade product instance",
		},
	],
	[
		"BT-X-307",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IndividualTradeProductInstance/ram:SupplierAssignedSerialID",
			businessTerm: "Item (Trade Product) Instances Supplier Serial ID",
			description:
				"The unique supplier assigned serial identifier for this trade product instance",
		},
	],
	[
		"BT-159-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:OriginTradeCountry",
			businessTerm: "Detailed information on the item origin",
		},
	],
	[
		"BT-159",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:OriginTradeCountry/ram:ID",
			businessTerm: "Item country of origin",
			description:
				"The code identifying the country from which the item originates.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BG-X-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct",
			businessTerm: "An included product referenced from this trade product.",
		},
	],
	[
		"BT-X-308",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:ID",
			businessTerm: "ID of Included Referenced Product",
			description: "Article identifier for interoperability with Order-X",
		},
	],
	[
		"BT-X-15",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:GlobalID",
			businessTerm: "Global ID of Included Referenced Product",
			description: "An item identifier based on a registered scheme.",
		},
	],
	[
		"BT-X-15-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Item standard identifier",
			usageNote:
				"The identification scheme shall be identified from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-X-16",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:SellerAssignedID",
			businessTerm: "SellerAssignedID of Included Referenced Product",
			description: "An identifier, assigned by the Seller, for the item.",
		},
	],
	[
		"BT-X-17",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:BuyerAssignedID",
			businessTerm: "BuyerAssignedID of Included Referenced Product",
			description: "An identifier, assigned by the Buyer, for the item.",
		},
	],
	[
		"BT-X-309",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:IndustryAssignedID",
			businessTerm: "IndustryAssignedID of Included Referenced Product",
			description: "Article identifier for interoperability with Order-X",
		},
	],
	[
		"BT-X-18",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:Name",
			businessTerm: "Name of Included Referenced Product",
		},
	],
	[
		"BT-X-19",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:Description",
			businessTerm: "Description of Included Referenced Product",
			description: "A description for an item.",
			usageNote:
				"The Item description allows for describing the item and its features in more detail than the Item name.",
		},
	],
	[
		"BT-X-20",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:UnitQuantity",
			businessTerm: "UnitQuantity \r\nof Included Referenced Product",
		},
	],
	[
		"BT-X-20-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:UnitQuantity/@unitCode",
			businessTerm: "Measurement unit",
		},
	],
	[
		"BG-29",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement",
			businessTerm: "PRICE DETAILS",
			description:
				"A group of business terms providing information about the price applied for the goods and services invoiced on the Invoice line.",
		},
	],
	[
		"BG-X-87",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ApplicableTradeDeliveryTerms",
			businessTerm: "Details of the delivery conditions",
		},
	],
	[
		"BT-X-562",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:DeliveryTypeCode",
			businessTerm: "Delivery condition (Code)",
			description:
				"The code specifying the type of delivery for these trade delivery terms.",
			usageNote:
				"To be chosen from the entries in UNTDID 4053 + INCOTERMS List",
		},
	],
	[
		"BG-X-89",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:RelevantTradeLocation",
			businessTerm: "Delivery terms location",
			description:
				"A group of information elements containing information about the relevant location of the delivery terms.",
		},
	],
	[
		"BT-X-565",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:RelevantTradeLocation/ram:CountryID",
			businessTerm: "Country code of location for the delivery terms",
			description: "Country code of location for the delivery terms",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-566",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:RelevantTradeLocation/ram:Name",
			businessTerm: "Name of the relevant location for the delivery terms",
			description: "Name of the relevant location for the delivery terms",
			usageNote: "Such as port, place of delivery",
		},
	],
	[
		"BG-X-81",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument",
			businessTerm: "Details of an seller order document reference",
		},
	],
	[
		"BT-X-537",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Document number",
		},
	],
	[
		"BT-X-538",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:LineID",
			businessTerm: "Referenced position",
		},
	],
	[
		"BT-X-539-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Document date",
		},
	],
	[
		"BT-X-539",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Document date, value",
		},
	],
	[
		"BT-X-539-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-132-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument",
			businessTerm: "Details of the associated order",
		},
	],
	[
		"BT-X-21",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Order Id",
		},
	],
	[
		"BT-132",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:LineID",
			businessTerm: "Referenced purchase order line reference",
			description:
				"An identifier for a referenced line within a purchase order, issued by the Buyer.",
			usageNote:
				"The purchase order identifier is referenced on document level.",
		},
	],
	[
		"BT-X-22-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Order date",
		},
	],
	[
		"BT-X-22",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Order date, value",
		},
	],
	[
		"BT-X-22-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-X-47",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument",
			businessTerm: "Details of an quotation document reference",
		},
	],
	[
		"BT-X-310",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Document number",
		},
	],
	[
		"BT-X-311",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:LineID",
			businessTerm: "Referenced position",
		},
	],
	[
		"BT-X-312-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Document date",
		},
	],
	[
		"BT-X-312",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Document date, value",
		},
	],
	[
		"BT-X-312-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-X-2",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument",
			businessTerm: "Detailed information on the associated contract",
		},
	],
	[
		"BT-X-24",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Contract number",
		},
	],
	[
		"BT-X-25",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:LineID",
			businessTerm: "Contract position",
		},
	],
	[
		"BT-X-26-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Contract Date",
		},
	],
	[
		"BT-X-26",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Contract Date, value",
		},
	],
	[
		"BT-X-26-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-X-3",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument",
			businessTerm: "Details of an additional document reference",
		},
	],
	[
		"BT-X-27",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Document number",
		},
	],
	[
		"BT-X-28",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:URIID",
			businessTerm: "External document location",
			description:
				"The URL (Uniform Resource Locator) that identifies where the external document is located.",
			usageNote:
				"A means of locating the resource including its primary access mechanism, e.g. http://\r\nor ftp://.\r\nExternal document location shall be used if the Buyer requires additional information to support the Invoice.\r\nExternal documents do not form part of the invoice. Risks can be involved when accessing external documents.",
		},
	],
	[
		"BT-X-29",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:LineID",
			businessTerm: "Referenced position",
		},
	],
	[
		"BT-X-30",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:TypeCode",
			businessTerm: "Type of the document (code)",
		},
	],
	[
		"BT-X-299",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:Name",
			businessTerm: "Document description",
		},
	],
	[
		"BT-X-31",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:AttachmentBinaryObject",
			businessTerm: "Attached document",
			description:
				"An attached document embedded as binary object or sent together with the invoice.",
			usageNote:
				"Attached document is used when documentation shall be stored with the Invoice for future reference or audit purposes.",
		},
	],
	[
		"BT-X-31-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:AttachmentBinaryObject/@mimeCode",
			businessTerm: "Attached document Mime code",
			description: "The mime code of the attached document.",
		},
	],
	[
		"BT-X-31-2",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:AttachmentBinaryObject/@filename",
			businessTerm: "Attached document Filename",
			description: "The file name of the attached document",
		},
	],
	[
		"BT-X-32",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:ReferenceTypeCode",
			businessTerm: "Type of the document reference (code)",
		},
	],
	[
		"BT-X-33-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Document date",
		},
	],
	[
		"BT-X-33",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Document date, value",
		},
	],
	[
		"BT-X-33-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-148-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice",
			businessTerm: "Detailed information on the gross price of the item",
		},
	],
	[
		"BT-148",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:ChargeAmount",
			businessTerm: "Item gross price",
			description:
				"The unit price, exclusive of VAT, before subtracting Item price discount.",
			businessRule:
				"BR-28: The Item gross price (BT-148) shall NOT be negative.",
			cius: "The Item gross price MUST NOT be negative",
		},
	],
	[
		"BT-149-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:BasisQuantity",
			businessTerm: "Item price base quantity",
			description: "The number of item units to which the price applies.",
			cius: "Optional, if filled and if BT-148 is present (EN16931 and EXTENDED profiles), then it should be the same value than BT-149-1",
		},
	],
	[
		"BT-150-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:BasisQuantity/@unitCode",
			businessTerm: "Item price base quantity unit of measure code",
			description:
				"The unit of measure that applies to the Item price base quantity.",
			usageNote:
				"The Item price base quantity unit of measure shall be the same as the Invoiced quantity unit of measure (BT-130).",
			businessRule: "BT-130, BT-150 and BT-150-1 must be equal if stated.",
			cius: "In particular, the most common units of measurement are:\r\nLTR = litre (1 dm3)\r\nMTQ = cubic meter\r\nKGM = kilogram\r\nMTR = meter\r\nC62 = unit\r\nTNE = ton",
		},
	],
	[
		"BT-147-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]",
			businessTerm: "Price-related discounts",
			description: "Detailed information on discounts and charges",
		},
	],
	[
		"BT-147-01",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:ChargeIndicator",
			businessTerm: "Indicator for price allowance",
		},
	],
	[
		"BT-147-02",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:ChargeIndicator/udt:Indicator",
			businessTerm: "Indicator for price allowance, value",
			usageNote: "Price allowance =&gt; false",
		},
	],
	[
		"BT-X-34",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:CalculationPercent",
			businessTerm: "Discount in percent",
		},
	],
	[
		"BT-X-35",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:BasisAmount",
			businessTerm: "Discount base amount",
		},
	],
	[
		"BT-147",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:ActualAmount",
			businessTerm: "Item price discount",
			description:
				"The total discount subtracted from the Item gross price to calculate the Item net price.",
			usageNote:
				"Only applies if the discount is provided per unit and if it is not included in the Item gross price.",
		},
	],
	[
		"BT-X-313",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:ReasonCode",
			businessTerm: "Reason for the discount (code)",
			usageNote:
				"Use entries of the UNTDID 5189 code list [6]. The Invoice line level allowance reason code and the Invoice line level allowance reason shall indicate the same allowance reason.",
		},
	],
	[
		"BT-X-36",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:Reason",
			businessTerm: "Reason for the discount (free text)",
		},
	],
	[
		"BT-X-302-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]",
			businessTerm: "Price-related surcharges",
		},
	],
	[
		"BT-X-302-01",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:ChargeIndicator",
			businessTerm: "Indicator for price charge",
		},
	],
	[
		"BT-X-302-02",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:ChargeIndicator/udt:Indicator",
			businessTerm: "Indicator for price charge, value",
			usageNote: "Price charge =&gt; true",
		},
	],
	[
		"BT-X-300",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:CalculationPercent",
			businessTerm: "Charge in percent",
		},
	],
	[
		"BT-X-301",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:BasisAmount",
			businessTerm: "Charge base amount",
		},
	],
	[
		"BT-X-302",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:ActualAmount",
			businessTerm: "Charge amount",
			description:
				"The surcharge added to the gross price to calculate the net price",
			usageNote:
				"Only applies if the surcharge is given per unit and is not included in the gross price.",
		},
	],
	[
		"BT-X-314",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:ReasonCode",
			businessTerm: "Reason for the charge (code)",
			usageNote:
				"Use entries of the UNTDID 7161 code list [6]. The Invoice line charge reason code and the Invoice line charge reason shall indicate the same charge reason.",
		},
	],
	[
		"BT-X-303",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:Reason",
			businessTerm: "Reason for the charge (free text)",
		},
	],
	[
		"BT-146-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice",
			businessTerm: "Detailed information on the net price of the item",
			usageNote:
				"The net price includes all surchages and discounts, except for VAT.",
		},
	],
	[
		"BT-146",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:ChargeAmount",
			businessTerm: "Item net price",
			description:
				"The price of an item, exclusive of VAT, after subtracting item price discount.",
			usageNote:
				"The Item net price has to be equal with the Item gross price less the Item price discount.",
			businessRule:
				"BR-26: Each  Invoice  line  (BG-25)  shall  contain  the  Item  net  price (BT-146).\r\n\r\nBR-27: The Item net price (BT-146) shall NOT be negative.",
			cius: "The Item net price MUST NOT be negative",
		},
	],
	[
		"BT-149",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:BasisQuantity",
			businessTerm: "Item price base quantity",
			description: "The number of item units to which the price applies.",
			cius: "Optional, if filled and if BT-148 is present (EN16931 and EXTENDED profiles), then it should be the same value than BT-149-1",
		},
	],
	[
		"BT-150",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:BasisQuantity/@unitCode",
			businessTerm: "Item price base quantity unit of measure code",
			description:
				"The unit of measure that applies to the Item price base quantity.",
			usageNote:
				"The Item price base quantity unit of measure shall be the same as the Invoiced quantity unit of measure (BT-130).",
			businessRule: "BT-130, BT-150 and BT-150-1 must be equal if stated.",
			cius: "In particular, the most common units of measurement are:\r\nLTR = litre (1 dm3)\r\nMTQ = cubic meter\r\nKGM = kilogram\r\nMTR = meter\r\nC62 = unit\r\nTNE = ton",
		},
	],
	[
		"BG-X-4",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax",
			businessTerm: "Included tax for B2C",
		},
	],
	[
		"BT-X-37",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:CalculatedAmount",
			businessTerm: "Included tax for B2C",
		},
	],
	[
		"BT-X-38",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:TypeCode",
			businessTerm: "Type of tax (code)",
			usageNote: 'Fixed value = "VAT"',
		},
	],
	[
		"BT-X-39",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:ExemptionReason",
			businessTerm: "VAT exemption reason text",
			description:
				"A textual statement of the reason why the amount is exempted from VAT or why no VAT is being charged",
		},
	],
	[
		"BT-X-40",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:CategoryCode",
			businessTerm: "VAT category code",
			description: "Coded identification of a VAT category.",
			usageNote:
				"The following entries of UNTDID 5305 [6] are used (further clarification between brackets):\r\n- Standard rate (Liable for VAT in a standard way)\r\n- Zero rated goods (Liable for VAT with a percentage rate of zero)\r\n- Exempt from tax (VAT/IGIC/IPSI)\r\n- VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)\r\n- VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)\r\n- Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)\r\n- Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)\r\n- Canary Islands General Indirect Tax (Liable for IGIC tax)\r\n- Liable for IPSI (Ceuta/Melilla tax)",
		},
	],
	[
		"BT-X-41",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:ExemptionReasonCode",
			businessTerm: "VAT exemption reason code",
			description:
				"A coded statement of the reason for why the amount is exempted from VAT.",
			usageNote:
				"Code list issued and maintained by the Connecting Europe Facility.",
		},
	],
	[
		"BT-X-42",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:RateApplicablePercent",
			businessTerm: "VAT category rate",
			description:
				"The VAT rate, represented as percentage that applies for the relevant VAT category.",
			usageNote:
				"The VAT category code and the VAT category rate shall be consistent.",
		},
	],
	[
		"BG-X-90",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty",
			businessTerm: "Detailed information on the deviating item seller",
			description:
				"A group of business terms providing information about the Seller on line level",
		},
	],
	[
		"BT-X-567",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:ID",
			businessTerm: "Item seller identifier",
			usageNote:
				"A previously exchanged assigned identifier of the business partner.",
		},
	],
	[
		"BT-X-568",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:GlobalID",
			businessTerm: "Item seller global identifier",
			usageNote:
				"GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID",
		},
	],
	[
		"BT-X-568-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-X-569",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:Name",
			businessTerm: "Item seller name",
		},
	],
	[
		"BT-X-570",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BT-X-571",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:Description",
			businessTerm: "Seller additional legal information",
			description: "Additional legal information relevant for the Seller.",
			usageNote: "Such as share capital.",
		},
	],
	[
		"BT-X-572-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Item seller details about the organization",
		},
	],
	[
		"BT-X-572",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "ShipTo Legal ID",
			description:
				"An identifier issued by an official registrar that identifies the party as a legal entity or person.",
		},
	],
	[
		"BT-X-572-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
		},
	],
	[
		"BT-X-573",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading Business Name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-91",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information of the item seller",
		},
	],
	[
		"BT-X-574",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-574-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-575",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-576-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-576",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-577-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-577",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-578-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-578",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-X-92",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the address of item seller",
		},
	],
	[
		"BT-X-579",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-580",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-581",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-582",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-583",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-584",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-585",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-586-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-586",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Electronic address",
		},
	],
	[
		"BT-X-586-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-X-587-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID=&quot;VA&quot;]",
			businessTerm:
				"Detailed information on tax information of the seller on line item level",
		},
	],
	[
		"BT-X-587",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID=&quot;VA&quot;]/ram:ID",
			businessTerm: "VAT ID",
		},
	],
	[
		"BT-X-587-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID=&quot;VA&quot;]/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BT-X-588-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID=&quot;FC&quot;]",
			businessTerm:
				"Detailed information on tax information of the seller on line item level",
		},
	],
	[
		"BT-X-588",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID=&quot;FC&quot;]/ram:ID",
			businessTerm: "Tax ID (local)",
		},
	],
	[
		"BT-X-588-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID=&quot;FC&quot;]/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "FC = Tax identifier (local)",
		},
	],
	[
		"BG-X-5",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument",
			businessTerm: "Details on referenced customer order",
		},
	],
	[
		"BT-X-43",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Order number of the final customer",
		},
	],
	[
		"BT-X-44",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:LineID",
			businessTerm: "Order item (ultimate customer)",
		},
	],
	[
		"BT-X-45-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Document date",
		},
	],
	[
		"BT-X-45",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Document date, value",
		},
	],
	[
		"BT-X-45-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-129-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery",
			businessTerm: "Grouping of delivery details on line level",
			description: "Grouping of delivery details on line level",
		},
	],
	[
		"BT-129",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:BilledQuantity",
			businessTerm: "Invoiced quantity",
			description:
				"The quantity of items (goods or services) that is charged in the Invoice line.",
			businessRule:
				"BR-22: Each  Invoice  line  (BG-25)  shall  have  an  Invoiced  quantity (BT-129).",
			cius: "CHORUS PRO: Invoiced quantity is supported on 10 digits maximum.",
		},
	],
	[
		"BT-130",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:BilledQuantity/@unitCode",
			businessTerm: "Invoiced quantity unit of measure",
			description: "The unit of measure that applies to the invoiced quantity.",
			usageNote:
				"The unit of measure shall be chosen from the lists in UN/ECE Recommendation N°. 20 “Codes for Units of Measure Used in International Trade” [7] and UN/ECE Recommendation N° 21 “Codes for Passengers, Types of Cargo, Packages and Packaging Materials (with Complementary Codes for Package Names)” [19] applying the method described in UN/ECE Rec N° 20 Intro 2.a). Note that in most cases it is not needed for Buyers and Sellers to implement these lists fully in their software. Sellers need only to support the units needed for their goods and services; Buyers only need to verify that the units used in the Invoice are equal to the units used in other documents (such as Contract, Catalogue, Order and Despatch advice).",
			businessRule:
				"BR-23: An Invoice line (BG-25) shall have an Invoiced quantity unit of measure code (BT-130).",
			cius: "In particular, the most common units of measurement are:\r\nLTR = litre (1 dm3)\r\nMTQ = cubic meter\r\nKGM = kilogram\r\nMTR = meter\r\nC62 = unit\r\nTNE = ton",
		},
	],
	[
		"BT-X-46",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ChargeFreeQuantity",
			businessTerm: "Quantity, without charge",
		},
	],
	[
		"BT-X-46-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ChargeFreeQuantity/@unitCode",
			businessTerm: "Unit of measure",
		},
	],
	[
		"BT-X-47",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:PackageQuantity",
			businessTerm: "Package quantity",
		},
	],
	[
		"BT-X-47-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:PackageQuantity/@unitCode",
			businessTerm: "Unit of measure",
		},
	],
	[
		"BT-X-561",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:PerPackageUnitQuantity",
			businessTerm: "Number of units per package",
		},
	],
	[
		"BT-X-561-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:PerPackageUnitQuantity/@unitCode",
			businessTerm: "Unit of measure",
		},
	],
	[
		"BG-X-7",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty",
			businessTerm: "Detailed information on the deviating goods recipient",
		},
	],
	[
		"BT-X-48",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:ID",
			businessTerm: "Goods recipient identifier",
			usageNote:
				"A previously exchanged assigned identifier of the business partner.",
		},
	],
	[
		"BT-X-49",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:GlobalID",
			businessTerm: "Goods recipient global identifier",
			usageNote:
				"GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID",
		},
	],
	[
		"BT-X-49-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-X-50",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:Name",
			businessTerm: "ShipTo name",
		},
	],
	[
		"BT-X-541",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BT-X-51-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "ShipTo details about the organization",
			description: "ShipTo details about the organization",
		},
	],
	[
		"BT-X-51",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "ShipTo Legal ID",
			description:
				"An identifier issued by an official registrar that identifies the party as a legal entity or person.",
		},
	],
	[
		"BT-X-51-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Buyer legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
		},
	],
	[
		"BT-X-52",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading Business Name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-8",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information of the goods recipient",
		},
	],
	[
		"BT-X-54",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-54-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-315",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-55-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-55",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-56-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-56",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-57-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-57",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-X-9",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress",
			businessTerm:
				"Detailed information about the address of the goods recipient",
		},
	],
	[
		"BT-X-58",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-59",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-60",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-61",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-62",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-63",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-64",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-65-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-65",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Electronic address",
		},
	],
	[
		"BT-X-65-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-X-66-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm:
				"Detailed information on tax information\r\nDetailed information on tax information of the goods recipient",
			description:
				"Detailed information on tax information of the goods recipient",
		},
	],
	[
		"BT-X-66",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "VAT ID",
		},
	],
	[
		"BT-X-66-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BG-X-10",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty",
			businessTerm: "Detailed information on the deviating final recipient",
		},
	],
	[
		"BT-X-67",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:ID",
			businessTerm: "Final recipient identifier",
			usageNote:
				"A previously exchanged assigned identifier of the business partner.",
		},
	],
	[
		"BT-X-68",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:GlobalID",
			businessTerm: "Final recipient global identifier",
			usageNote:
				"GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID",
		},
	],
	[
		"BT-X-68-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-X-69",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:Name",
			businessTerm: "Final Recipient Name / Company Name",
		},
	],
	[
		"BT-X-542",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BT-X-70-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
			description: "Details about the organization",
		},
	],
	[
		"BT-X-70",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Company Registration Number",
			description:
				"An identifier issued by an official registrar that identifies the party as a legal entity or person.",
		},
	],
	[
		"BT-X-70-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Buyer legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
		},
	],
	[
		"BT-X-71",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading Business Name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-11",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information of the final goods recipient",
		},
	],
	[
		"BT-X-72",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-72-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-316",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-73-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-73",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-74-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-74",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-75-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-75",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-X-12",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress",
			businessTerm:
				"Detailed information about the address of the final goods recipient",
		},
	],
	[
		"BT-X-76",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-77",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-78",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-79",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-80",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-81",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-82",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-83-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-83",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Electronic address",
		},
	],
	[
		"BT-X-83-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-X-84-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm:
				"Detailed information on tax information of the goods recipient",
		},
	],
	[
		"BT-X-84",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "VAT ID",
		},
	],
	[
		"BT-X-84-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BT-X-85-000",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ActualDeliverySupplyChainEvent",
			businessTerm: "Detailed information about the actual delivery",
			description: "Detailed information about the actual delivery",
		},
	],
	[
		"BT-X-85-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime",
			businessTerm: "Actual Delivery Time",
			usageNote:
				"The VAT relevant date of delivery and achievement must be specified on the level of document.",
		},
	],
	[
		"BT-X-85",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString",
			businessTerm: "Actual delivery date for this line, value",
			usageNote:
				"The VAT relevant date of delivery and achievement must be specified on the level of document.",
		},
	],
	[
		"BT-X-85-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-X-13",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DespatchAdviceReferencedDocument",
			businessTerm: "Detailed information on the corresponding despatch advice",
		},
	],
	[
		"BT-X-86",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Despatch advice number",
		},
	],
	[
		"BT-X-87",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:LineID",
			businessTerm: "Despatch advice item",
		},
	],
	[
		"BT-X-88-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Document date",
		},
	],
	[
		"BT-X-88",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Document date, value",
		},
	],
	[
		"BT-X-88-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-X-82",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ReceivingAdviceReferencedDocument",
			businessTerm: "Detailed information on the corresponding goods receipt",
		},
	],
	[
		"BT-X-89",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Goods receipt number",
		},
	],
	[
		"BT-X-90",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:LineID",
			businessTerm: "Goods receipt item",
		},
	],
	[
		"BT-X-91-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Document date",
		},
	],
	[
		"BT-X-91",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Document date, value",
		},
	],
	[
		"BT-X-91-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-X-83",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DeliveryNoteReferencedDocument",
			businessTerm:
				"Detailed information about the corresponding delivery note",
		},
	],
	[
		"BT-X-92",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Delivery Note Number",
		},
	],
	[
		"BT-X-93",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:LineID",
			businessTerm: "Delivery note item",
		},
	],
	[
		"BT-X-94-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Document date",
		},
	],
	[
		"BT-X-94",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Document date, value",
		},
	],
	[
		"BT-X-94-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-30-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement",
			businessTerm: "Grouping of billing information at line level",
			description: "Grouping of billing information at line level",
		},
	],
	[
		"BG-30",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax",
			businessTerm: "LINE VAT INFORMATION",
			description:
				"A group of business terms providing information about the VAT applicable for the goods and services invoiced on the Invoice line.",
		},
	],
	[
		"BT-X-95",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:CalculatedAmount",
			businessTerm: "Tax Amount",
			usageNote: "Specification only for taxes that are not VAT",
		},
	],
	[
		"BT-151-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:TypeCode",
			businessTerm: "Invoiced item VAT category code, Content",
			description: "The VAT category code for the invoiced item.",
			usageNote:
				"For more information on the recommended codes, please refer to subclause 6.3.3.2 - Specification of VAT category codes.",
		},
	],
	[
		"BT-X-96",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:ExemptionReason",
			businessTerm: "VAT exemption reason text",
			description:
				"A textual statement of the reason why the amount is exempted from VAT or why no VAT is being charged",
			usageNote: "Specification only for taxes that are not VAT",
		},
	],
	[
		"BT-151",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:CategoryCode",
			businessTerm: "Invoiced item VAT category code",
			description: "The VAT category code for the invoiced item.",
			usageNote:
				"The following entries of UNTDID 5305 [6] are used (further clarification between brackets):\r\n- Standard rate (Liable for VAT in a standard way)\r\n- Zero rated goods (Liable for VAT with a percentage rate of zero)\r\n- Exempt from tax (VAT/IGIC/IPSI)\r\n- VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)\r\n- VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)\r\n- Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)\r\n- Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)\r\n- Canary Islands General Indirect Tax (Liable for IGIC tax)\r\n- Liable for IPSI (Ceuta/Melilla tax)",
			businessRule:
				"BR-CO-4: Each  Invoice  line  (BG-25)  shall  be  categorized  with  an Invoiced item VAT category code (BT-151).",
			cius: "The VAT category codes are as follows:\r\nS = Standard VAT rate\r\nZ = Zero rated goods\r\nE = VAT exempt\r\nAE = Reverse charge\r\nK = Intra-Community supply (specific reverse charge)\r\nG = Exempt VAT for Export outside EU\r\nO = Outside VAT scope\r\nL = Canary Islands\r\nM = Ceuta and Mellila",
		},
	],
	[
		"BT-X-97",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:ExemptionReasonCode",
			businessTerm: "VAT exemption reason code",
			description:
				"A coded statement of the reason for why the amount is exempted from VAT.",
			usageNote:
				"Code list issued and maintained by the Connecting Europe Facility. Specification only for taxes that are not VAT",
		},
	],
	[
		"BT-X-589",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:DueDateTypeCode",
			businessTerm: "Value added tax point date code",
			description:
				"The code of the date when the VAT becomes accountable for the Seller and for the Buyer.",
			usageNote:
				"The code shall distinguish between the following entries of UNTDID 2005 [6]:\r\n- Invoice docment issue date\r\n- Delivery date, actual\r\n- Payment date. The Value added tax point date code is used if the Value added tax point date is not known when the invoice is issued. The use of BT-8 / BT-X-589 and BT-7 is mutually exclusive.",
		},
	],
	[
		"BT-152",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:RateApplicablePercent",
			businessTerm: "Invoiced item VAT rate",
			description:
				"The VAT rate, represented as percentage that applies to the invoiced item.",
			cius: "The value to enter is the percentage. For example, for 20%, it must be given as 20 (and not 0.2)",
		},
	],
	[
		"BG-26",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:BillingSpecifiedPeriod",
			businessTerm: "INVOICE LINE PERIOD",
			description:
				"A group of business terms providing information about the Invoice period relevant for the Invoice line.",
			usageNote: "Is also called Invoice line delivery period.",
		},
	],
	[
		"BT-134-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:BillingSpecifiedPeriod/ram:StartDateTime",
			businessTerm: "Start of the invoice line billing period",
		},
	],
	[
		"BT-134",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:BillingSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString",
			businessTerm: "Invoice line period start date",
			description:
				"The date when the Invoice period for this Invoice line starts.",
			usageNote: "The date is the first day of the period.",
			businessRule:
				"BR-CO-20: If  Invoice  line  period  (BG-26)  is  used,  the  Invoice  line period start date (BT-134) or the Invoice line period end date (BT-135) shall be filled, or both.",
			cius: "This date must be less than or equal to the end date of the period (BT-135), if it exists",
		},
	],
	[
		"BT-134-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:BillingSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-135-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:BillingSpecifiedPeriod/ram:EndDateTime",
			businessTerm: "End of the invoice line billing period",
		},
	],
	[
		"BT-135",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:BillingSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString",
			businessTerm: "Invoice line period end date",
			description:
				"The date when the Invoice period for this Invoice line ends.",
			usageNote: "The date is the last day of the period.",
			businessRule:
				"BR-30: If both Invoice line period start date (BT-134) and Invoice line  period  end  date  (BT-135)  are  given  then  the  Invoice line period end date (BT-135) shall be later or equal to the Invoice line period start date (BT-134).\r\n\r\nBR-CO-20: If  Invoice  line  period  (BG-26)  is  used,  the  Invoice  line period start date (BT-134) or the Invoice line period end date (BT-135) shall be filled, or both.",
			cius: "This date must be greater than or equal to the period start date (BT-134), if it exists",
		},
	],
	[
		"BT-135-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:BillingSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-27",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]",
			businessTerm: "INVOICE LINE ALLOWANCES",
			description:
				"A group of business terms providing information about allowances applicable to the individual Invoice line.",
			businessRule: "ChargeIndicator=false",
			cius: "Invoice line allowancess are subject to the same VAT rate as the line they relate to. If invoice line allowances are subject to a different VAT rate, they must be treated as standalone (negative) invoice lines",
		},
	],
	[
		"BG-27-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:ChargeIndicator",
			businessTerm: "Indicator for allowance",
		},
	],
	[
		"BG-27-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:ChargeIndicator/udt:Indicator",
			businessTerm: "Indicator for price, value",
			usageNote: "Allowance =&gt; false",
		},
	],
	[
		"BT-138",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:CalculationPercent",
			businessTerm: "Invoice line allowance percentage",
			description:
				"The percentage that may be used, in conjunction with the Invoice line allowance base amount, to calculate the Invoice line allowance amount.",
			cius: "The value to enter is the percentage. For example, for 20%, it must be given as 20 (and not 0.2)",
		},
	],
	[
		"BT-137",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:BasisAmount",
			businessTerm: "Invoice line allowance base amount",
			description:
				"The base amount that may be used, in conjunction with the Invoice line allowance percentage, to calculate the Invoice line allowance amount.",
		},
	],
	[
		"BT-136",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:ActualAmount",
			businessTerm: "Invoice line allowance amount",
			description: "The amount of an allowance, without VAT.",
		},
	],
	[
		"BT-140",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:ReasonCode",
			businessTerm: "Invoice line allowance reason code",
			description:
				"The reason for the Invoice line allowance, expressed as a code.",
			usageNote:
				"Use entries of the UNTDID 5189 code list [6]. The Invoice line level allowance reason code and the Invoice line level allowance reason shall indicate the same allowance reason.",
			cius: "In particular, the following codes and reasons can be used:\r\nAA = Advertising discount\r\nABL = Packing supplement\r\nADR = Other services\r\nADT = Removal\r\nFC = transportation costs\r\nFI = Financial expenses\r\nLA = Labeling",
		},
	],
	[
		"BT-139",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:Reason",
			businessTerm: "Invoice line allowance reason",
			description:
				"The reason for the Invoice line allowance, expressed as text.",
		},
	],
	[
		"BG-28",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]",
			businessTerm: "INVOICE LINE CHARGES",
			description:
				"A group of business terms providing information about charges and taxes other than VAT applicable to the individual Invoice line.",
			usageNote:
				"All charges and taxes are assumed to be liable to the same VAT rate as the Invoice line.",
			businessRule: "ChargeIndicator=true",
			cius: "Invoice line charges are subject to the same VAT rate as that of the line to which they relate. If invoice line charges are subject to a different VAT rate, they must be treated as stand-alone invoice lines.",
		},
	],
	[
		"BG-28-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:ChargeIndicator",
			businessTerm: "Indicator for charge",
		},
	],
	[
		"BG-28-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:ChargeIndicator/udt:Indicator",
			businessTerm: "Indicator for charge, value",
			usageNote: "Charge =&gt; true",
		},
	],
	[
		"BT-143",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:CalculationPercent",
			businessTerm: "Invoice line charge percentage",
			description:
				"The percentage that may be used, in conjunction with the Invoice line charge base amount, to calculate the Invoice line charge amount.",
			cius: "The value to enter is the percentage. For example, for 20%, it must be given as 20 (and not 0.2)",
		},
	],
	[
		"BT-142",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:BasisAmount",
			businessTerm: "Invoice line charge base amount",
			description:
				"The base amount that may be used, in conjunction with the Invoice line charge percentage, to calculate the Invoice line charge amount.",
		},
	],
	[
		"BT-141",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:ActualAmount",
			businessTerm: "Invoice line charge amount",
			description: "The amount of a charge, without VAT.",
		},
	],
	[
		"BT-145",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:ReasonCode",
			businessTerm: "Invoice line charge reason code",
			description:
				"The reason for the Invoice line charge, expressed as a code.",
			usageNote:
				"Use entries of the UNTDID 7161 code list [6]. The Invoice line charge reason code and the Invoice line charge reason shall indicate the same charge reason.",
			businessRule:
				"BR-44: Each Invoice line charge (BG-28) shall have an Invoice line charge  reason  (BT-144)  or  an  Invoice  line  charge  reason code (BT-145).\r\n\r\nBR-CO-8: Invoice  line  charge  reason  code  (BT-145)  and  Invoice line charge reason (BT144) shall indicate the same type of charge reason.\r\n\r\nBR-CO-24: Each Invoice line charge (BG-28) shall contain an Invoice line  charge  reason  (BT-144)  or  an  Invoice  line  charge reason code (BT-145), or both.",
			cius: "In particular, the following codes and reasons can be used:\r\nAA = Advertising discount\r\nABL = Packing supplement\r\nADR = Other services\r\nADT = Removal\r\nFC = transportation costs\r\nFI = Financial expenses\r\nLA = Labeling",
		},
	],
	[
		"BT-144",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:Reason",
			businessTerm: "Invoice line charge reason",
			description: "The reason for the Invoice line charge, expressed as text.",
		},
	],
	[
		"BT-131-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation",
			businessTerm: "Detailed information about item totals",
		},
	],
	[
		"BT-131",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:LineTotalAmount",
			businessTerm: "Invoice line net amount",
			description: "The total amount of the Invoice line.",
			usageNote:
				"The amount is “net” without VAT, i.e. inclusive of line level allowances and charges as well as other relevant taxes.",
		},
	],
	[
		"BT-X-327",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:ChargeTotalAmount",
			businessTerm: "Total amount of line item charges",
		},
	],
	[
		"BT-X-328",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:AllowanceTotalAmount",
			businessTerm: "Total amount of line item allowances",
		},
	],
	[
		"BT-X-329",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:TaxTotalAmount[@currencyID=/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceCurrencyCode]",
			businessTerm: "Total amount of line item taxes",
		},
	],
	[
		"BT-X-329-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:TaxTotalAmount[@currencyID=/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceCurrencyCode]/@currencyID",
			businessTerm: "Invoice currency code",
		},
	],
	[
		"BT-X-590",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:TaxTotalAmount[@currencyID=/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxCurrencyCode]",
			businessTerm: "Total amount of line item taxes in accounting currency",
		},
	],
	[
		"BT-X-590-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:TaxTotalAmount[@currencyID=/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxCurrencyCode]/@currencyID",
			businessTerm: "Invoice currency code",
		},
	],
	[
		"BT-X-330",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:GrandTotalAmount",
			businessTerm: "Total line item gross amount",
		},
	],
	[
		"BT-X-98",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:TotalAllowanceChargeAmount",
			businessTerm: "Total amount of allowances / charges",
		},
	],
	[
		"BG-X-48",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument",
			businessTerm: "PRECEDING INVOICE REFERENCE",
			description:
				"A group of business terms providing information on one or more preceding Invoices.",
			usageNote:
				"To be used in case: \r\n- a preceding invoice is corrected \r\n- preceding partial invoices are refered to from a final invoice \r\n- preceding pre-payment invoices are refered to from a final invoice",
		},
	],
	[
		"BT-X-331",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Preceding Invoice reference",
			description:
				"The identification of an Invoice that was previously sent by the Seller.",
		},
	],
	[
		"BT-X-540",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument/ram:LineID",
			businessTerm: "Referenced position",
		},
	],
	[
		"BT-X-332",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument/ram:TypeCode",
			businessTerm: "Preceding incoive type code",
			usageNote:
				"Can be used in case of final invoive after prepaid invoice, in order to refernce the previous prepaid invoices.\r\nCodelist UNCL 1001 restricted like BT-3.",
		},
	],
	[
		"BT-X-333-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Preceding Invoice issue date",
		},
	],
	[
		"BT-X-333",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Preceding Invoice issue date, value",
			description: "The date when the Preceding Invoice was issued.",
			usageNote:
				"The Preceding Invoice issue date shall be provided in case the Preceding Invoice identifier is not unique.",
		},
	],
	[
		"BT-X-333-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-128-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:AdditionalReferencedDocument",
			businessTerm: "Object identifier at the invoice item level",
		},
	],
	[
		"BT-128",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:AdditionalReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Invoice line object identifier",
			description:
				"An identifier for an object on which the invoice line is based, given by the Seller.",
			usageNote:
				"It may be a subscription number, telephone number, meter point etc., as applicable.",
		},
	],
	[
		"BT-128-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:AdditionalReferencedDocument/ram:TypeCode",
			businessTerm: "Object identifier type code (fix value)",
		},
	],
	[
		"BT-128-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:AdditionalReferencedDocument/ram:ReferenceTypeCode",
			businessTerm: "Scheme identifier\r\nInvocice line object identifier",
			description:
				"The identification scheme identifier of the Invoice line object identifier.",
			usageNote:
				'If it may be not clear for the receiver what scheme is used for the identifier, a conditional scheme identifier should be used that shall be chosen from the UNTDID 1153 code list [6] entries.\r\nTypeCode = "130" invoice data sheet',
		},
	],
	[
		"BT-133-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount",
			businessTerm: "Detailed information on the accounting reference",
		},
	],
	[
		"BT-133",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:ID",
			businessTerm: "Invoice line Buyer accounting reference",
			description:
				"A textual value that specifies where to book the relevant data into the Buyer's financial accounts.",
			usageNote:
				"If required, this reference shall be provided by the Buyer to the Seller prior to the issuing of the Invoice.",
		},
	],
	[
		"BT-X-99",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:TypeCode",
			businessTerm: "Accounting reference (Code)",
		},
	],
	[
		"BT-10-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement",
			businessTerm: "Grouping of contract information",
			description: "Grouping of contract information",
		},
	],
	[
		"BT-10",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerReference",
			businessTerm: "Buyer reference",
			description:
				"An identifier assigned by the Buyer used for internal routing purposes.",
			usageNote:
				"The identifier is defined by the Buyer (e.g. contact ID, department, office id, project code), but provided by the Seller in the Invoice.",
			cius: 'CHORUS PRO: for the public sector, it is the "Service Exécutant". It is mandatory for some buyers. It must belong to the Chorus Pro repository. It is limited to 100 characters.',
		},
	],
	[
		"BG-4",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty",
			businessTerm: "SELLER",
			description:
				"A group of business terms providing information about the Seller.",
		},
	],
	[
		"BT-29",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:ID",
			businessTerm: "Seller identifier",
			description: "An identification of the Seller.",
			usageNote:
				"For many systems, the Seller identifier is a key piece of information. Multiple Seller identifiers may be assigned or specified. They may be differentiated by using various identification schemes. If no scheme is specified, it should be known by Buyer and Seller, e.g. a previously exchanged Buyer assigned identifier of the Seller.",
			businessRule:
				"BR-CO-26: In   order   for   the   buyer   to   automatically   identify   a supplier,  the  Seller  identifier  (BT-29),  the  Seller  legal registration  identifier  (BT-30)  and/or  the  Seller  VAT identifier (BT-31) shall be present.",
		},
	],
	[
		"BT-29-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:GlobalID",
			businessTerm: "Seller global identifier",
			description:
				"The identification scheme identifier of the seller is a specific identifier given to the seller by a global registration authority.",
			usageNote:
				"The seller’s global ID is a unique identifier assigned to a seller by a global registration body.",
			cius: "If the seller has a GlobalID, he can qualify it with this attribute. Otherwise, he uses the ID.",
		},
	],
	[
		"BT-29-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Seller identifier identification scheme identifier",
			description: "Scheme identifier",
			usageNote:
				"The identification scheme identifier shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
			cius: "In particular, the following codes can be used:\r\n0021 : SWIFT\r\n0060 : DUNS\r\n0088 : GLN\r\n0177 : ODETTE",
		},
	],
	[
		"BT-27",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:Name",
			businessTerm: "Seller name",
			description:
				"The full formal name by which the Seller is registered in the national registry of legal entities or as a Taxable person or otherwise trades as a person or persons.",
		},
	],
	[
		"BT-X-543",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:RoleCode",
			businessTerm: "Seller Role (code)",
			description: "A code qualifying the role of the party",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BT-33",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:Description",
			businessTerm: "Seller additional legal information",
			description: "Additional legal information relevant for the Seller.",
			usageNote: "Such as share capital.",
		},
	],
	[
		"BT-30-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
		},
	],
	[
		"BT-30",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Seller legal registration identifier",
			description:
				"An identifier issued by an official registrar that identifies the Seller as a legal entity or person.",
			usageNote:
				"If no identification scheme is specified, it must be known by Buyer and Seller.",
		},
	],
	[
		"BT-30-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Seller legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
			cius: 'For a SIREN or a SIRET, the value of this field is "0002"',
		},
	],
	[
		"BT-28",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Seller trading name",
			description:
				"A name by which the Seller is known, other than Seller name (also known as Business name).",
			usageNote: "This may be used if different from the Seller name.",
			cius: "CHORUS PRO: this field is limied to 99 characters.",
		},
	],
	[
		"BG-X-14",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress",
			businessTerm: "SELLER LEGAL ADDRESS",
			description:
				"Legal address of the seller in case the seller address is different",
		},
	],
	[
		"BT-X-100",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-101",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-102",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-103",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-104",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-105",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-106",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BG-6",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact",
			businessTerm: "SELLER CONTACT",
			description:
				"A group of business terms providing contact information about the Seller.",
		},
	],
	[
		"BT-41",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Seller contact point",
			description: "A contact point for a legal entity or person.",
			usageNote:
				"Such as person name, contact identification, department or office identification.",
		},
	],
	[
		"BT-41-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
		},
	],
	[
		"BT-X-317",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-42-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Detailed information about the seller phone number",
		},
	],
	[
		"BT-42",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Seller contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-107-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Detailed information about the seller fax number",
		},
	],
	[
		"BT-X-107",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Seller contact fax number",
			description: "A fax number for the contact point.",
		},
	],
	[
		"BT-43-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Detailed information about the seller email address",
		},
	],
	[
		"BT-43",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Seller contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-5",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress",
			businessTerm: "SELLER POSTAL ADDRESS",
			description:
				"A group of business terms providing information about the address of the Seller.",
			usageNote:
				"Sufficient components of the address are to be filled in order to comply to legal requirements.",
			businessRule:
				"BR-8: An Invoice shall contain the Seller postal address (BG-5).",
			cius: "Like any address, the fields necessary to define the address must appear. The country code is mandatory.",
		},
	],
	[
		"BT-38",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Seller post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-35",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Seller address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-36",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Seller address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-162",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Seller address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-37",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "Seller city",
			description:
				"The common name of the city, town or village, where the Seller address is located.",
		},
	],
	[
		"BT-40",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Seller country code",
			description: "A code that identifies the country.",
			usageNote:
				'If no tax representative is specified, this is the country where VAT is liable. The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-39",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Seller country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-34-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-34",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Seller electronic address",
			description:
				"Identifies the Seller's electronic address to which a business document may be delivered.",
		},
	],
	[
		"BT-34-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Seller electronic address",
			usageNote:
				"The scheme identifier shall be chosen from a list to be maintained by the Connecting Europe Facility.",
		},
	],
	[
		"BT-31-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID=&quot;VA&quot;]",
			businessTerm: "Detailed information on tax information of the seller",
		},
	],
	[
		"BT-31",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID=&quot;VA&quot;]/ram:ID",
			businessTerm: "Seller VAT identifier",
			description:
				"The Seller's VAT identifier (also known as Seller VAT identification number).",
			usageNote:
				"VAT number prefixed by a country code. A VAT registered Supplier shall include his VAT ID, except when he uses a tax representative.",
		},
	],
	[
		"BT-31-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID=&quot;VA&quot;]/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BT-32-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID=&quot;FC&quot;]",
			businessTerm: "Detailed information on tax information of the seller",
		},
	],
	[
		"BT-32",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID=&quot;FC&quot;]/ram:ID",
			businessTerm: "Seller tax registration identifier",
			description:
				"The local identification (defined by the Seller’s address) of the Seller for tax purposes or a reference that enables the Seller to state his registered tax status.",
			usageNote:
				"This information may affect how the Buyer settles the payment (such as for social security fees). E.g. in some countries, if the Seller is not registered as a tax paying entity then the Buyer is required to withhold the amount of the tax and pay it on behalf of the Seller.",
		},
	],
	[
		"BT-32-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID=&quot;FC&quot;]/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "FC = Tax identifier (local)",
		},
	],
	[
		"BG-7",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty",
			businessTerm: "BUYER",
			description:
				"A group of business terms providing information about the Buyer.",
		},
	],
	[
		"BT-46",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:ID",
			businessTerm: "Buyer identifier",
			description: "An identifier of the Buyer.",
			usageNote:
				"If no scheme is specified, it must be known by Buyer and Seller.",
		},
	],
	[
		"BT-46-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:GlobalID",
			businessTerm: "Buyer global identifier\r\nBuyer global identifier",
			description:
				"The identification scheme identifier of the seller is a specific identifier given to the seller by a global registration authority.",
			usageNote:
				"GloablID, if global identifier exists and can be stated in @schemeID, ID else\r\nThe global identifier of a buyer is the specific identification given to him by a global registry organization.",
		},
	],
	[
		"BT-46-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Buyer identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-44",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:Name",
			businessTerm: "Buyer name",
			description: "The full name of the Buyer.",
			businessRule: "BR-7: An Invoice shall contain the Buyer name (BT-44).",
			cius: "CHORUS PRO: this field is limied to 99 characters.",
		},
	],
	[
		"BT-X-544",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BT-X-334",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:Description",
			businessTerm: "Buyer additional legal information",
			description: "Additional legal information relevant for the buyer.",
			usageNote: "Such as share capital.",
		},
	],
	[
		"BT-47-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
		},
	],
	[
		"BT-47",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Buyer legal registration identifier",
			description:
				"An identifier issued by an official registrar that identifies the Buyer as a legal entity or person.",
			usageNote:
				"If no identification scheme is specified, it should be known by Buyer and Seller, e.g. the identifier that is exclusively used in the applicable legal environment.",
			cius: "CHORUSPRO: the identifier of the buyer (public entity) is mandatory and is always a SIRET number",
		},
	],
	[
		"BT-47-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Buyer legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
			cius: 'For a SIREN or a SIRET, the value of this field is "0002"',
		},
	],
	[
		"BT-45",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Buyer trading name",
			description:
				"A name by which the Buyer is known, other than Buyer name (also known as Business name).",
			usageNote: "This may be used if different from the Buyer name.",
		},
	],
	[
		"BG-X-15",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the business address",
			description:
				"Legal address of the buyerr in case the Buyer address is different",
		},
	],
	[
		"BT-X-108",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-109",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-110",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-111",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-112",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-113",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-114",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BG-9",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact",
			businessTerm: "BUYER CONTACT",
			description:
				"A group of business terms providing contact information relevant for the Buyer.",
			usageNote:
				"Contacting details can be given by the Buyer at the time of the ordering or as master data exchanged prior to ordering. It is recommended not to use contacting details for the purpose of routing the received Invoice internally by the recipient; the Buyer reference identifier should be used for this purpose.",
		},
	],
	[
		"BT-56",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Buyer contact point",
			description: "A contact point for a legal entity or person.",
			usageNote:
				"Such as person name, contact identification, department or office identification.",
		},
	],
	[
		"BT-56-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
		},
	],
	[
		"BT-X-318",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-57-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Detailed information about the buyer phone number",
		},
	],
	[
		"BT-57",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Buyer contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-115-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Detailed information about the buyer fax number",
		},
	],
	[
		"BT-X-115",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Buyer contact fax number",
			description: "A fax number for the contact point.",
		},
	],
	[
		"BT-58-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Detailed information about the buyer email address",
		},
	],
	[
		"BT-58",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Buyer contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-8",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress",
			businessTerm: "BUYER POSTAL ADDRESS",
			description:
				"A group of business terms providing information about the postal address for the Buyer.",
			usageNote:
				"Sufficient components of the address are to be filled in order to comply to legal requirements.",
			businessRule:
				"BR-10: An Invoice shall contain the Buyer postal address (BG-8).",
			cius: "Like any address, the fields necessary to define the address must appear. The country code is mandatory.",
		},
	],
	[
		"BT-53",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Buyer post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-50",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Buyer address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-51",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Buyer address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-163",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Buyer address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-52",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "Buyer city",
			description:
				"The common name of the city, town or village, where the Buyer's address is located.",
		},
	],
	[
		"BT-55",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Buyer country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-54",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Buyer country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-49-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-49",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Buyer electronic address",
			description:
				"Identifies the Buyer's electronic address to which a business document should be delivered.",
		},
	],
	[
		"BT-49-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Buyer electronic address.",
			usageNote:
				"The scheme identifier shall be chosen from a list to be maintained by the Connecting Europe Facility.",
		},
	],
	[
		"BT-48-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm: "Detailed information on buyer tax information",
		},
	],
	[
		"BT-48",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "Buyer VAT identifier",
			description:
				"The Buyer's VAT identifier (also known as Buyer VAT identification number).",
			usageNote:
				'VAT number prefixed by a country code based on EN ISO 3166-1 "Codes for the representation of names of countries and their subdivisions"',
			businessRule:
				"BR-CO-9: The    Seller    VAT    identifier    (BT-31),    the    Seller    tax representative  VAT  identifier  (BT-63)  and  the  Buyer VAT identifier (BT-48) shall have a prefix in accordance with ISO code ISO 3166-1 alpha-2 by which the country of issue may be identified. Nevertheless, Greece may use the prefix ‘EL’.",
			cius: "CHORUSPRO: If entered, ChorusPro will not integrate the VAT ID of the buyer because it is the SIRET number that is used to identify a buyer for public entities (BT-47)",
		},
	],
	[
		"BT-48-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BG-X-49",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty",
			businessTerm: "Detailed information about the sales agent",
			description:
				"A group of business terms providing information about the Sales Agent",
		},
	],
	[
		"BT-X-337",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:ID",
			businessTerm: "Sales agent identifier",
			usageNote:
				"A previously exchanged assigned identifier of the business partner.",
		},
	],
	[
		"BT-X-338",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:GlobalID",
			businessTerm: "Sales agent global identifier",
			usageNote:
				"GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID",
		},
	],
	[
		"BT-X-338-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-X-335",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:Name",
			businessTerm: "Sales agent identifier Name / Company Name",
		},
	],
	[
		"BT-X-545",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BG-X-50",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
		},
	],
	[
		"BT-X-339",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Sales Agent Registration Number",
			description:
				"An identifier issued by an official registrar that identifies the party as a legal entity or person.",
		},
	],
	[
		"BT-X-339-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Buyer legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
		},
	],
	[
		"BT-X-336",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading Business Name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-53",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the business address",
			description:
				"Legal address of the buyer in case the Sales Agent address is different",
		},
	],
	[
		"BT-X-355",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-356",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-357",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-358",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-359",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-360",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-361",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BG-X-51",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information of the deviating end user",
		},
	],
	[
		"BT-X-342",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-343",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-347",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-344-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-344",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-345-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-345",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-346-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-346",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-X-52",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the address",
		},
	],
	[
		"BT-X-348",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-349",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-350",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-351",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-352",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-353",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-354",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-341-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-341",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Electronic address",
		},
	],
	[
		"BT-X-341-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-X-340-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm: "Detailed information on tax information",
		},
	],
	[
		"BT-X-340",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "VAT ID",
		},
	],
	[
		"BT-X-340-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BG-X-54",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty",
			businessTerm: "Detailed information about the buyer tax representative",
		},
	],
	[
		"BT-X-364",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:ID",
			businessTerm: "Identifier",
			usageNote:
				"A previously exchanged assigned identifier of the business partner.",
		},
	],
	[
		"BT-X-365",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:GlobalID",
			businessTerm: "Global identifier",
			usageNote:
				"GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID",
		},
	],
	[
		"BT-X-365-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-X-362",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:Name",
			businessTerm: "Identifier Name / Company Name",
		},
	],
	[
		"BT-X-546",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BG-X-58",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
		},
	],
	[
		"BT-X-366",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Company Registration Number",
			description:
				"An identifier issued by an official registrar that identifies the party as a legal entity or person.",
		},
	],
	[
		"BT-X-366-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Buyer legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
		},
	],
	[
		"BT-X-363",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading Business Name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-57",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the business address",
		},
	],
	[
		"BT-X-382",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-383",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-384",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-385",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-386",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-387",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-388",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BG-X-55",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information of the deviating end user",
		},
	],
	[
		"BT-X-369",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-370",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-371",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-372-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-372",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-373-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-373",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-374-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-374",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-X-56",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the address",
		},
	],
	[
		"BT-X-375",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-376",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-377",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-378",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-379",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-380",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-381",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-368-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-368",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Electronic address",
		},
	],
	[
		"BT-X-368-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-X-367-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm: "Detailed information on tax information",
		},
	],
	[
		"BT-X-367",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "VAT ID",
		},
	],
	[
		"BT-X-367-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BG-11",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty",
			businessTerm: "SELLER TAX REPRESENTATIVE PARTY",
			description:
				"A group of business terms providing information about the Seller's tax representative.",
			cius: 'The "Seller Tax Representative party" block must be filled in if the seller has a tax representative.',
		},
	],
	[
		"BT-X-116",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:ID",
			businessTerm: "Identifier",
			usageNote:
				"A previously exchanged assigned identifier of the business partner.",
		},
	],
	[
		"BT-X-117",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:GlobalID",
			businessTerm: "Global identifier",
			usageNote:
				"GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID",
		},
	],
	[
		"BT-X-117-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-62",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:Name",
			businessTerm: "Seller tax representative name",
			description: "The full name of the Seller's tax representative party.",
		},
	],
	[
		"BT-X-547",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BG-X-16",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
		},
	],
	[
		"BT-X-118",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Legal registration identifier",
			description:
				"An identifier issued by an official registrar that identifies the party as a legal entity or person.",
		},
	],
	[
		"BT-X-118-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Buyer legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
		},
	],
	[
		"BT-X-119",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-59",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the business address",
		},
	],
	[
		"BT-X-389",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-390",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-391",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-392",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-393",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-394",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-395",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BG-X-17",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information",
		},
	],
	[
		"BT-X-120",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
		},
	],
	[
		"BT-X-121",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
		},
	],
	[
		"BT-X-319",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-122-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-122",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-123-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-123",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-124-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-124",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-12",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress",
			businessTerm: "SELLER TAX REPRESENTATIVE POSTAL ADDRESS",
			description:
				"A group of business terms providing information about the postal address for the tax representative party.",
			usageNote:
				"The seller tax representative name/postal address shall be provided in the invoice, if the seller has a tax representative who is liable to pay the VAT due. Sufficient components of the address are to be filled in order to comply to legal requirements.",
			businessRule:
				"BR-19: The  Seller  tax  representative  postal  address  (BG-12)  shall be provided in the Invoice, if the Seller (BG-4) has a Seller tax representative party (BG-11).",
			cius: "The address block of the Seller Tax Representative is mandatory if the supplier has a tax representative. Like any address, the fields necessary to define the address must appear. The country code is mandatory.",
		},
	],
	[
		"BT-67",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Tax representative post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-64",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Tax representative address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or the post office box.",
		},
	],
	[
		"BT-65",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Tax representative address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-164",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Tax representative address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-66",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "Tax representative city",
			description:
				"The common name of the city, town or village, where the tax representative address is located.",
		},
	],
	[
		"BT-69",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Tax representative country code",
			description: "A code that identifies the country.",
			usageNote:
				'Country where VAT is liable. The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-68",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Tax representative country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-125-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-125",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Electronic address",
		},
	],
	[
		"BT-X-125-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-63-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm: "Detailed information on tax information",
		},
	],
	[
		"BT-63",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "Seller tax representative VAT identifier",
			description:
				"The VAT identifier of the Seller's tax representative party.",
			usageNote:
				'VAT number prefixed by a country code based on EN ISO 3166-1 "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-63-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BG-X-18",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty",
			businessTerm: "Detailed information about the deviating end user",
		},
	],
	[
		"BT-X-126",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:ID",
			businessTerm: "Deviating end user identifier",
			usageNote:
				"A previously exchanged assigned identifier of the business partner.",
		},
	],
	[
		"BT-X-127",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:GlobalID",
			businessTerm: "Deviating end user global identifier",
			usageNote:
				"GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID",
		},
	],
	[
		"BT-X-127-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-X-128",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:Name",
			businessTerm: "Deviating end user identifier Name / Company Name",
		},
	],
	[
		"BT-X-548",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BG-X-19",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
		},
	],
	[
		"BT-X-129",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Company Registration Number",
			description:
				"An identifier issued by an official registrar that identifies the party as a legal entity or person.",
		},
	],
	[
		"BT-X-129-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Buyer legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
		},
	],
	[
		"BT-X-130",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading Business Name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-60",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the business address",
		},
	],
	[
		"BT-X-396",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-397",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-398",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-399",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-400",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-401",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-402",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BG-X-20",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information of the deviating end user",
		},
	],
	[
		"BT-X-131",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-132",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-320",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-133-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-133",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-134-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-134",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-135-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-135",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-X-21",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress",
			businessTerm:
				"Detailed information about the address of the deviating end user",
		},
	],
	[
		"BT-X-136",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-137",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-138",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-139",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-140",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-141",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-142",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-143-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-143",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Electronic address",
		},
	],
	[
		"BT-X-143-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-X-144-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm:
				"Detailed information on tax information of the final goods recipient\r\nDetailed information on tax information",
		},
	],
	[
		"BT-X-144",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "VAT ID",
		},
	],
	[
		"BT-X-144-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BG-X-22",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ApplicableTradeDeliveryTerms",
			businessTerm: "Details of the delivery conditions",
		},
	],
	[
		"BT-X-145",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:DeliveryTypeCode",
			businessTerm: "Delivery condition (Code)",
			description:
				"The code specifying the type of delivery for these trade delivery terms.",
			usageNote:
				"To be chosen from the entries in UNTDID 4053 + INCOTERMS List",
		},
	],
	[
		"BG-X-88",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:RelevantTradeLocation",
			businessTerm: "Delivery terms location",
			description:
				"A group of information elements containing information about the relevant location of the delivery terms.",
		},
	],
	[
		"BT-X-563",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:RelevantTradeLocation/ram:CountryID",
			businessTerm: "Country code of location for the delivery terms",
			description: "Country code of location for the delivery terms",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-564",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:RelevantTradeLocation/ram:Name",
			businessTerm: "Name of the relevant location for the delivery terms",
			description: "Name of the relevant location for the delivery terms",
			usageNote: "Such as port, place of delivery",
		},
	],
	[
		"BT-14-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerOrderReferencedDocument",
			businessTerm: "Details about the associated order confirmation",
		},
	],
	[
		"BT-14",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerOrderReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Sales order reference",
			description:
				"An identifier of a referenced sales order, issued by the Seller.",
		},
	],
	[
		"BT-X-146-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerOrderReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Details about the sales order confirmation date",
		},
	],
	[
		"BT-X-146",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Order confirmation date, value",
		},
	],
	[
		"BT-X-146-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-13-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerOrderReferencedDocument",
			businessTerm: "Details of the associated order",
		},
	],
	[
		"BT-13",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerOrderReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Purchase order reference",
			description:
				"An identifier of a referenced purchase order, issued by the Buyer.",
			cius: 'CHORUS PRO: for the public sector, this is the "Engagement Juridique" (Legal Commitment). It is mandatory for some buyers. You should refer to the ChorusPro Directory to identify these public entity buyers that make it mandatory.',
		},
	],
	[
		"BT-X-147-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerOrderReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Order Date",
		},
	],
	[
		"BT-X-147",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Order Date, value",
		},
	],
	[
		"BT-X-147-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-X-61",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:QuotationReferencedDocument",
			businessTerm: "Details on referenced quotation",
		},
	],
	[
		"BT-X-403",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:QuotationReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Quotation number",
		},
	],
	[
		"BT-X-404-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:QuotationReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Document date",
		},
	],
	[
		"BT-X-404",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:QuotationReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Document date, value",
		},
	],
	[
		"BT-X-404-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:QuotationReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote:
				"UNTDID 2379 : \r\nValue = 102 :CCYYMMDD\r\nValue = 203 :CCYYMMDDHHMM",
		},
	],
	[
		"BT-12-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ContractReferencedDocument",
			businessTerm: "Details of the associated contract",
		},
	],
	[
		"BT-12",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ContractReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Contract reference",
			description: "The identification of a contract.",
			usageNote:
				"The contract identifier should be unique in the context of the specific trading relationship and for a defined time period.",
			cius: 'CHORUSPRO : This is the "numéro de Marché" (contract number)',
		},
	],
	[
		"BT-X-405",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ContractReferencedDocument/ram:ReferenceTypeCode",
			businessTerm: "Type of contract (code)",
			usageNote: "Use codes from UNTDID 1153",
			cius: 'CHORUSPRO: To qualify a contract (CT) or a procurement contract "Marché" (BC)',
		},
	],
	[
		"BT-X-148-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Contract Date",
		},
	],
	[
		"BT-X-148",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Contract date, value",
		},
	],
	[
		"BT-X-148-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-24",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;916&quot;]",
			businessTerm: "ADDITIONAL SUPPORTING DOCUMENTS",
			description:
				"A group of business terms providing information about additional supporting documents substantiating the claims made in the Invoice.",
			usageNote:
				"The additional supporting documents can be used for both referencing a document number which is expected to be known by the receiver, an external document (referenced by a URL) or as an embedded document (such as a time report in pdf). The option to link to an external document will be needed, for example in the case of large attachments and/or when sensitive information, e.g. person-related services, has to be separated from the Invoice itself.",
			cius: 'CHORUS PRO: If the group "ADDITIONAL SUPPORTING DOCUMENTS" is filled in, one of the following two business terms must be present: Attached Document (BT-125) or External document location (URI) (BT-124)',
		},
	],
	[
		"BT-122",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;916&quot;]/ram:IssuerAssignedID",
			businessTerm: "Supporting document reference",
			description: "An identifier of the supporting document.",
		},
	],
	[
		"BT-124",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;916&quot;]/ram:URIID",
			businessTerm: "External document location",
			description:
				"The URL (Uniform Resource Locator) that identifies where the external document is located.",
			usageNote:
				"A means of locating the resource including its primary access mechanism, e.g. http://\r\nor ftp://.\r\nExternal document location shall be used if the Buyer requires additional information to support the Invoice.\r\nExternal documents do not form part of the invoice. Risks can be involved when accessing external documents.",
		},
	],
	[
		"BT-122-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;916&quot;]/ram:TypeCode",
			businessTerm: "Referenced document type",
			usageNote:
				'The code  916 "Additional supporting documents" shall be used to refer to the identification of additional supporting  documents (BT-122).',
		},
	],
	[
		"BT-123",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;916&quot;]/ram:Name",
			businessTerm: "Supporting document description",
			description: "A description of the supporting document.",
			usageNote: "Such as: timesheet, usage report etc.",
			cius: "CHORUS PRO: Chorus Pro allows only two types of attachements: main attachment and additional attachment.\r\nIn the case of a PDF / A-3 (Factur-X), only the type of complementary attachment is allowed.",
		},
	],
	[
		"BT-125",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;916&quot;]/ram:AttachmentBinaryObject",
			businessTerm: "Attached document",
			description:
				"An attached document embedded as binary object or sent together with the invoice.",
			usageNote:
				"Attached document is used when documentation shall be stored with the Invoice for future reference or audit purposes.",
			cius: "CHORUS PRO : The attachment must be contained in a ZIP file. The maximum size of the attachment is 100 MB.",
		},
	],
	[
		"BT-125-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;916&quot;]/ram:AttachmentBinaryObject/@mimeCode",
			businessTerm: "Attached document Mime code",
			description: "The mime code of the attached document.",
			usageNote:
				"Allowed mime codes:\r\n- application/pdf\r\n- image/png\r\n- image/jpeg\r\n- text/csv\r\n- application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet\r\n- application/vnd.oasis.opendocument.spreadsheet",
		},
	],
	[
		"BT-125-2",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;916&quot;]/ram:AttachmentBinaryObject/@filename",
			businessTerm: "Attached document Filename",
			description: "The file name of the attached document",
		},
	],
	[
		"BT-X-149-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;916&quot;]/ram:FormattedIssueDateTime",
			businessTerm: "Document date",
		},
	],
	[
		"BT-X-149",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;916&quot;]/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Document date, value",
		},
	],
	[
		"BT-X-149-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;916&quot;]/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-17-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;50&quot;]",
			businessTerm: "Details on tender or lot reference",
		},
	],
	[
		"BT-17",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;50&quot;]/ram:IssuerAssignedID",
			businessTerm: "Tender or lot reference",
			description:
				"The identification of the call for tender or lot the invoice relates to.",
			usageNote:
				"In some countries a reference to the call for tender that has led to the contract shall be provided.",
		},
	],
	[
		"BT-17-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;50&quot;]/ram:TypeCode",
			businessTerm: "Referenced document type",
			usageNote:
				'The code 50 "Price/sales catalogue response" shall be used to refer to the tendering or batch. (BT-17)',
		},
	],
	[
		"BT-X-556-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;50&quot;]/ram:FormattedIssueDateTime",
			businessTerm: "Document date",
		},
	],
	[
		"BT-X-556",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;50&quot;]/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Document date, value",
		},
	],
	[
		"BT-X-556-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;50&quot;]/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-18-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;130&quot;]",
			businessTerm: "Details on invoiced object identifier",
		},
	],
	[
		"BT-18",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;130&quot;]/ram:IssuerAssignedID",
			businessTerm: "Invoiced object identifier",
			description:
				"An identifier for an object on which the invoice is based, given by the Seller.",
			usageNote:
				"It may be a subscription number, telephone number, meter point, vehicle, person etc., as applicable.",
		},
	],
	[
		"BT-18-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;130&quot;]/ram:TypeCode",
			businessTerm: "Referenced document type",
			usageNote:
				'The code 130 "invoice data" shall be used to refer to the identifier of an object given by the seller (BT-18).',
		},
	],
	[
		"BT-18-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;130&quot;]/ram:ReferenceTypeCode",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Invoiced object identifier.",
			usageNote:
				"If it may be not clear for the receiver what scheme is used for the identifier, a onditional scheme identifier should be used that shall be chosen from the UNTDID 1153 code list [6] entries.",
		},
	],
	[
		"BT-X-557-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;130&quot;]/ram:FormattedIssueDateTime",
			businessTerm: "Document date",
		},
	],
	[
		"BT-X-557",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;130&quot;]/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Document date, value",
		},
	],
	[
		"BT-X-557-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;130&quot;]/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-X-62",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty",
			businessTerm: "Detailed information about the buyer agent",
		},
	],
	[
		"BT-X-408",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:ID",
			businessTerm: "Identifier",
			usageNote:
				"A previously exchanged assigned identifier of the business partner.",
		},
	],
	[
		"BT-X-409",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:GlobalID",
			businessTerm: "Global identifier",
			usageNote:
				"GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID",
		},
	],
	[
		"BT-X-409-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-X-406",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:Name",
			businessTerm: "Name / Company Name",
		},
	],
	[
		"BT-X-549",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BG-X-63",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
		},
	],
	[
		"BT-X-410",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Company Registration Number",
			description:
				"The identification scheme identifier of the Buyer Agent legal registration identifier.",
			usageNote:
				"If the identification scheme is used, it must be selected from the entries in the list published by the ISO/IEC 6523 Maintenance Agency.",
		},
	],
	[
		"BT-X-410-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Buyer Agent legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
		},
	],
	[
		"BT-X-407",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading Business Name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-66",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the business address",
		},
	],
	[
		"BT-X-426",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-427",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-428",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-429",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-430",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-431",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-432",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BG-X-64",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information of the deviating buyer agent",
		},
	],
	[
		"BT-X-413",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-414",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-415",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-416-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-416",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-417-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-417",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-418-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-418",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-X-65",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the address",
		},
	],
	[
		"BT-X-419",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-420",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-421",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-422",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-423",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-424",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-425",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-412-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-412",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Electronic address",
		},
	],
	[
		"BT-X-412-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-X-411-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm: "Detailed information on tax information",
		},
	],
	[
		"BT-X-411",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "VAT ID",
		},
	],
	[
		"BT-X-411-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BT-11-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SpecifiedProcuringProject",
			businessTerm: "Details about a project reference",
		},
	],
	[
		"BT-11",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SpecifiedProcuringProject/ram:ID",
			businessTerm: "Project reference",
			description: "The identification of the project the invoice refers to.",
		},
	],
	[
		"BT-11-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SpecifiedProcuringProject/ram:Name",
			businessTerm: "Project name",
			description: "The identification of the project the invoice refers to",
			usageNote: 'Default = "Project reference"',
		},
	],
	[
		"BG-X-23",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:UltimateCustomerOrderReferencedDocument",
			businessTerm: "Details on referenced customer order",
		},
	],
	[
		"BT-X-150",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Ultimate Customer Order number of the final customer",
		},
	],
	[
		"BT-X-151-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Document date",
		},
	],
	[
		"BT-X-151",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Document date, value",
		},
	],
	[
		"BT-X-151-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-13-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery",
			businessTerm: "Grouping of delivery details",
		},
	],
	[
		"BG-X-24",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:RelatedSupplyChainConsignment",
			businessTerm: "Related SupplyChain Consignment",
			description:
				"A consignment, at header level, related to this trade delivery.",
		},
	],
	[
		"BT-X-152-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:RelatedSupplyChainConsignment/ram:SpecifiedLogisticsTransportMovement",
			businessTerm: "Specified Logistics Transport Movement",
			description:
				"The code specifying the mode, such as air, sea, rail, road or inland waterway, for this logistics transport movement.",
		},
	],
	[
		"BT-X-152",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:RelatedSupplyChainConsignment/ram:SpecifiedLogisticsTransportMovement/ram:ModeCode",
			businessTerm: "Delivery method (Code)",
			description:
				"A logistics transport movement specified for this supply chain consignment.",
		},
	],
	[
		"BG-13",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty",
			businessTerm: "DELIVERY INFORMATION",
			description:
				"A group of business terms providing information about where and when the goods and services invoiced are delivered.",
		},
	],
	[
		"BT-71",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:ID",
			businessTerm: "Deliver to location identifier",
			description:
				"An identifier for the location at which the goods and services are delivered.",
			usageNote:
				"If no scheme is specified, it should be known by Buyer and Seller, e.g. a previously exchanged Buyer or Seller assigned identifier.",
		},
	],
	[
		"BT-71-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:GlobalID",
			businessTerm: "Deliver to location global identifier",
		},
	],
	[
		"BT-71-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Deliver to location identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-70",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:Name",
			businessTerm: "Deliver to party name",
			description:
				"The name of the party to which the goods and services are delivered.",
			usageNote:
				"Shall be used if the Deliver to party is different from the Buyer.",
		},
	],
	[
		"BT-X-550",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote:
				"To be chosen from UNTDID 3035, for instance:\r\nDL: Factor\r\nDS: Distributor\r\nMOP: Market operator",
		},
	],
	[
		"BG-X-25",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
		},
	],
	[
		"BT-X-153",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Legal registration identifier",
			description:
				"An identifier issued by an official registrar that identifies the party as a legal entity or person.",
		},
	],
	[
		"BT-X-153-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Buyer legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
		},
	],
	[
		"BT-X-154",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-67",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the business address",
		},
	],
	[
		"BT-X-433",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-434",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-435",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-436",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-437",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-438",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-439",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BG-X-26",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information",
		},
	],
	[
		"BT-X-155",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
		},
	],
	[
		"BT-X-156",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
		},
	],
	[
		"BT-X-321",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-157-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-157",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-158-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-158",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-159-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-159",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-15",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress",
			businessTerm: "DELIVER TO ADDRESS",
			description:
				"A group of business terms providing information about the address to which goods and services invoiced were or are delivered.",
			usageNote:
				"In the case of pick-up, the deliver to address is the pick-up address. Sufficient components of the address are to be filled to comply with legal requirements.",
			cius: "Like any address, the fields necessary to define the address must appear. The country code is mandatory.",
		},
	],
	[
		"BT-78",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Deliver to post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-75",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Deliver to address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number.",
		},
	],
	[
		"BT-76",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Deliver to address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-165",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Deliver to address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-77",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "Deliver to city",
			description:
				"The common name of the city, town or village, where the deliver to address is located.",
		},
	],
	[
		"BT-80",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Deliver to country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-79",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Deliver to country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-160-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-160",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Electronic address",
		},
	],
	[
		"BT-X-160-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-X-161-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm:
				"Detailed information on tax information of the goods recipient",
		},
	],
	[
		"BT-X-161",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "VAT identifier",
		},
	],
	[
		"BT-X-161-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BG-X-27",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty",
			businessTerm: "Detailed information about the final recipient",
		},
	],
	[
		"BT-X-162",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:ID",
			businessTerm: "Final recipient identifier",
		},
	],
	[
		"BT-X-163",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:GlobalID",
			businessTerm: "Final recipient global identifier",
			usageNote:
				"GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID",
		},
	],
	[
		"BT-X-163-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-X-164",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:Name",
			businessTerm: "Final Recipient Name / Company Name",
		},
	],
	[
		"BT-X-551",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BT-X-165-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
		},
	],
	[
		"BT-X-165",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Company Registration Number",
			description:
				"An identifier issued by an official registrar that identifies the party as a legal entity or person.",
		},
	],
	[
		"BT-X-165-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Buyer legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
		},
	],
	[
		"BT-X-166",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading Business Name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-68",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the business address",
		},
	],
	[
		"BT-X-440",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-441",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-442",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-443",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-444",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-445",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-446",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BG-X-28",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information",
		},
	],
	[
		"BT-X-167",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-168",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-322",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-169-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-169",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-170-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-170",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-171-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-171",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-X-29",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress",
			businessTerm:
				"Detailed information about the address of the final recipient",
		},
	],
	[
		"BT-X-172",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-173",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-174",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-175",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-176",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-177",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-178",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-179-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-179",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Electronic address",
		},
	],
	[
		"BT-X-179-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-X-180-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm: "Detailed information on tax information",
		},
	],
	[
		"BT-X-180",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "VAT ID",
		},
	],
	[
		"BT-X-180-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BG-X-30",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty",
			businessTerm: "Identification of the deviating sender",
		},
	],
	[
		"BT-X-181",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:ID",
			businessTerm: "Deviating sender identifier",
		},
	],
	[
		"BT-X-182",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:GlobalID",
			businessTerm: "Deviating sender global identifier",
			usageNote:
				"GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID",
		},
	],
	[
		"BT-X-182-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-X-183",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:Name",
			businessTerm: "Deviating sender name / company name",
		},
	],
	[
		"BT-X-552",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BT-X-184-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
		},
	],
	[
		"BT-X-184",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Company Registration Number",
			description:
				"An identifier issued by an official registrar that identifies the party as a legal entity or person.",
		},
	],
	[
		"BT-X-184-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Buyer legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
		},
	],
	[
		"BT-X-185",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading Business Name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-69",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the business address",
		},
	],
	[
		"BT-X-447",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-448",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-449",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-450",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-451",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-452",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-453",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BG-X-31",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information",
		},
	],
	[
		"BT-X-186",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-187",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-323",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-188-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-188",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-189-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-189",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-190-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-190",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-X-32",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress",
			businessTerm:
				"Detailed information about the address of the deviating sender",
		},
	],
	[
		"BT-X-191",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-192",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-193",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-194",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-195",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-196",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-197",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-198-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-198",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Electronic address",
		},
	],
	[
		"BT-X-198-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-X-199-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm: "Detailed information on tax information",
		},
	],
	[
		"BT-X-199",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "VAT ID",
		},
	],
	[
		"BT-X-199-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BT-72-000",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ActualDeliverySupplyChainEvent",
			businessTerm: "Detailed information about the actual Delivery",
		},
	],
	[
		"BT-72-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime",
			businessTerm: "Actual delivery date, Content",
			description: "The date on which the delivery is made.",
			usageNote:
				"In Germany, the date of delivery and performance is a mandatory information on invoices. This can also be indicated at item level, but must in any case be indicated here.",
		},
	],
	[
		"BT-72",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString",
			businessTerm: "Actual delivery date",
			description:
				"The date on which the supply of goods or services was made or completed.",
		},
	],
	[
		"BT-72-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-16-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DespatchAdviceReferencedDocument",
			businessTerm: "Detailed information on the corresponding despatch advice",
		},
	],
	[
		"BT-16",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Despatch advice reference",
			description: "An identifier of a referenced despatch advice.",
			cius: "CHORUS PRO : not used",
		},
	],
	[
		"BT-X-200-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Despatch advice date",
		},
	],
	[
		"BT-X-200",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Despatch advice date, value",
		},
	],
	[
		"BT-X-200-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-15-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ReceivingAdviceReferencedDocument",
			businessTerm: "Detailed information about the associated goods receipt",
		},
	],
	[
		"BT-15",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Receiving advice reference",
			description: "An identifier of a referenced receiving advice.",
		},
	],
	[
		"BT-X-201-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Goods receipt date",
		},
	],
	[
		"BT-X-201",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Goods receipt date, value",
		},
	],
	[
		"BT-X-201-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-X-202-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DeliveryNoteReferencedDocument",
			businessTerm:
				"Detailed information about the corresponding delivery note",
		},
	],
	[
		"BT-X-202",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Delivery note reference",
		},
	],
	[
		"BT-X-203-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Delivery note date",
		},
	],
	[
		"BT-X-203",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Delivery note date, value",
		},
	],
	[
		"BT-X-203-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-19",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement",
			businessTerm: "DIRECT DEBIT",
			description: "A group of business terms to specify a direct debit.",
			usageNote:
				"This group may be used to give prior notice in the invoice that payment will be made through a SEPA or other direct debit initiated by the Seller, in accordance with the rules of the SEPA or other direct debit scheme.",
			cius: "CHORUS PRO : not used",
		},
	],
	[
		"BT-90",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:CreditorReferenceID",
			businessTerm: "Bank assigned creditor identifier",
			description:
				"Unique banking reference identifier of the Payee or Seller assigned by the Payee or Seller bank.",
			usageNote:
				"Used in order to pre-notify the Buyer of a SEPA direct debit.",
			cius: "This is the ICS for SEPA direct debits",
		},
	],
	[
		"BT-83",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PaymentReference",
			businessTerm: "Remittance information",
			description:
				"A textual value used to establish a link between the payment and the Invoice, issued by the Seller.",
			usageNote:
				"Used for creditor's critical reconciliation information. This information element helps the Seller to assign an incoming payment to the relevant payment process. When specifying the textual value, which is commonly the invoice number of the invoice being paid, but may be another seller reference, the buyer should indicate this reference in his payment order when executing the payment. In a payment transaction this reference is transferred back to the Seller as Remittance Information.\r\n\r\nIn order to allow for automatic processing of cross-border SEPA payments, only Latin characters should be used in this field, with a maximum of 140 characters. Referencesection 1.4 of the SEPA credit transfer and SEPA direct debit scheme implementation guides [13] and [14] for details of the allowed characters. Other rules may apply for SEPA payments within national borders.\r\n\r\nIf remittance information is structured according to the ISO 11649:2009 standard [16] for Structured RF Creditor Reference, it shall be mapped to the Structured Remittance Information Creditor Reference field in SEPA payments messages.\r\nIf remittance information is structured according to the EACT standard for automated reconciliation [17], it shall be mapped to the Unstructured Remittance Information field in SEPA payments messages.”\r\n\r\nIf remittance information is to be mapped to the End To End Identification field or to the Structured Remittance Information Creditor Reference field in SEPA payments messages, then in addition to the Latin character set restriction, the content shall not start or end with a '/' and the content shall not contain '//'s. See reference [15].",
		},
	],
	[
		"BT-6",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxCurrencyCode",
			businessTerm: "VAT accounting currency code",
			description:
				"The currency used for VAT accounting and reporting purposes as accepted or required in the country of the Seller.",
			usageNote:
				'Shall be used in combination with the Total VAT amount in accounting currency (BT-111) when the VAT accounting currency code differs from the Invoice currency code.\r\nThe lists of valid currencies are registered with the ISO 4217 Maintenance Agency "Codes for the representation of currencies and funds". Please refer to Article 230 of the Council Directive 2006/112/EC [2] for more information.',
		},
	],
	[
		"BT-5",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceCurrencyCode",
			businessTerm: "Invoice currency code",
			description:
				"The currency in which all Invoice amounts are given, except for the Total VAT amount in accounting currency.",
			usageNote:
				'Only one currency shall be used in the Invoice, except for the Total VAT amount in accounting currency (BT-111) in accordance with article 230 of Directive 2006/112/EC on VAT.\r\nThe lists of valid currencies are registered with the ISO 4217 Maintenance Agency "Codes for the representation of currencies and funds".',
			businessRule:
				"BR-5: An Invoice shall have an Invoice currency code (BT-5).",
			cius: "CHORUS PRO: Invoices and credit notes or Chorus Pro are mono-currencies only.",
		},
	],
	[
		"BT-X-204",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceIssuerReference",
			businessTerm: "Seller reference number",
			usageNote:
				"Given seller reference number for routing purposes after biliteral agreement",
		},
	],
	[
		"BG-X-33",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty",
			businessTerm: "Deviating invoicing party",
		},
	],
	[
		"BT-X-205",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:ID",
			businessTerm: "Deviating invoicer identifier",
		},
	],
	[
		"BT-X-206",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:GlobalID",
			businessTerm: "Deviating invoicer global identifier",
			usageNote:
				"GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID",
		},
	],
	[
		"BT-X-206-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-X-207",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:Name",
			businessTerm: "Name",
		},
	],
	[
		"BT-X-553",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BT-X-208-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
		},
	],
	[
		"BT-X-208",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Company Registration Number",
			description:
				"An identifier issued by an official registrar that identifies the party as a legal entity or person.",
		},
	],
	[
		"BT-X-208-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Buyer legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
		},
	],
	[
		"BT-X-209",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading Business Name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-70",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the business address",
		},
	],
	[
		"BT-X-454",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-455",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-456",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-457",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-458",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-459",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-460",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BG-X-34",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information",
		},
	],
	[
		"BT-X-210",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-211",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-324",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-212-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-212",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-213-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-213",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-214-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-214",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-X-35",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the address",
		},
	],
	[
		"BT-X-215",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-216",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-217",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-218",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-219",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-220",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-221",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-222-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-222",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Electronic address",
		},
	],
	[
		"BT-X-222-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-X-223-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm: "Detailed information on tax information",
		},
	],
	[
		"BT-X-223",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "VAT ID",
		},
	],
	[
		"BT-X-223-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BG-X-36",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty",
			businessTerm:
				"Detailed information about the deviating invoice recipient",
		},
	],
	[
		"BT-X-224",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:ID",
			businessTerm: "Deviating invoice recipient identifier",
		},
	],
	[
		"BT-X-225",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:GlobalID",
			businessTerm: "Deviating invoice recipient global identifier",
			usageNote:
				"GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID",
		},
	],
	[
		"BT-X-225-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-X-226",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:Name",
			businessTerm: "Deviating invoice recipient name / company name",
		},
	],
	[
		"BT-X-554",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BT-X-227-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
		},
	],
	[
		"BT-X-227",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Company Registration Number",
			description:
				"An identifier issued by an official registrar that identifies the party as a legal entity or person.",
		},
	],
	[
		"BT-X-227-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Buyer legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
		},
	],
	[
		"BT-X-228",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading Business Name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-71",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the business address",
		},
	],
	[
		"BT-X-461",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-462",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-463",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-464",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-465",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-466",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-467",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BG-X-37",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information",
		},
	],
	[
		"BT-X-229",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-230",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-325",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-231-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-231",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-232-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-232",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-233-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-233",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-X-38",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the address",
		},
	],
	[
		"BT-X-234",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-235",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-236",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-237",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-238",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-239",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-240",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-241-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-241",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Electronic address",
		},
	],
	[
		"BT-X-241-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-X-242-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm: "Detailed information on tax information",
		},
	],
	[
		"BT-X-242",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "VAT ID",
		},
	],
	[
		"BT-X-242-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BG-10",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty",
			businessTerm: "PAYEE",
			description:
				"A group of business terms providing information about the Payee, i.e. the role that receives the payment.",
			usageNote:
				"The role of Payee may be fulfilled by another party then the Seller, e.g. a factoring service.",
			cius: "This group makes it possible to identify the invoices to be paid to a third-party Payee in the case of factoring.\r\nCHORUS PRO: In the event of subrogation factoring, the legal information associated with subrogation must be present in the PDF visual presentation of the invoice.\r\nIn this case, the bank identifier oresent in the invoice is the factor one.",
		},
	],
	[
		"BT-60",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:ID",
			businessTerm: "Payee identifier",
			description: "An identifier for the Payee.",
			usageNote:
				"If no scheme is specified, it should be known by Buyer and Seller, e.g. a previously exchanged Buyer or Seller assigned identifier.",
		},
	],
	[
		"BT-60-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:GlobalID",
			businessTerm: "Payee global identifier",
		},
	],
	[
		"BT-60-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Payee identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-59",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:Name",
			businessTerm: "Payee name",
			description: "The name of the Payee.",
			usageNote:
				"Shall be used when the Payee is different from the Seller (but may also be the Seller name).",
			businessRule:
				"BR-17: The Payee name (BT-59) shall be provided in the Invoice, if the Payee (BG-10) is different from the Seller (BG-4).",
			cius: "If the PAYEE party block is present, the name of the Payee is mandatory",
		},
	],
	[
		"BT-X-468",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:RoleCode",
			businessTerm: "Payee role (code)",
			description: "A code qualifying the role of the payee",
			usageNote: "To be chosen from UNTDID 3035, for instance:\r\nDL: Factor",
		},
	],
	[
		"BT-61-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
		},
	],
	[
		"BT-61",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Payee legal registration identifier",
			description:
				"An identifier issued by an official registrar that identifies the Payee as a legal entity or person.",
			usageNote:
				"If no scheme is specified, it should be known by Buyer and Seller, e.g. the identifier that is exclusively used in the applicable legal environment.",
		},
	],
	[
		"BT-61-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Payee legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
			cius: 'For a SIREN or a SIRET, the value of this field is "0002"',
		},
	],
	[
		"BT-X-243",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-72",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the business address",
		},
	],
	[
		"BT-X-469",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-470",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-471",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-472",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-473",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-474",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-475",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BG-X-39",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information",
		},
	],
	[
		"BT-X-244",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
		},
	],
	[
		"BT-X-245",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
		},
	],
	[
		"BT-X-326",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-246-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-246",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-247-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-247",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-248-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-248",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-X-40",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the payee postal address",
		},
	],
	[
		"BT-X-249",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-250",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-251",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-252",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-253",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-254",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-255",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-256-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-256",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Electronic address",
		},
	],
	[
		"BT-X-256-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-X-257-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm: "Detailed tax information",
		},
	],
	[
		"BT-X-257",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "VAT identifier",
		},
	],
	[
		"BT-X-257-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BG-X-73",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty",
			businessTerm: "Detailed information about the deviating invoice payer",
			description:
				"A group of business terms providing information about the Payer, i.e. the role that makes the payment.",
			usageNote:
				"The role of Payer may be fulfilled by another party than the Buyer, e.g. a third Party like a mother company",
		},
	],
	[
		"BT-X-478",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:ID",
			businessTerm: "Deviating invoice payer identifier",
		},
	],
	[
		"BT-X-479",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:GlobalID",
			businessTerm: "Deviating invoice payer global identifier",
			usageNote:
				"GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID",
		},
	],
	[
		"BT-X-479-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Payer identifier Scheme identifier",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-X-476",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:Name",
			businessTerm: "Name/company name of the deviating invoice payer",
		},
	],
	[
		"BT-X-483",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BT-X-480-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
		},
	],
	[
		"BT-X-480",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Company Registration Number",
			description:
				"An identifier issued by an official registrar that identifies the party as a legal entity or person.",
		},
	],
	[
		"BT-X-480-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Payer legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
		},
	],
	[
		"BT-X-477",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading Business Name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-76",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the business address",
		},
	],
	[
		"BT-X-497",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-498",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-499",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-500",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-501",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-502",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-503",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BG-X-74",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information",
		},
	],
	[
		"BT-X-484",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-485",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-486",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-487-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-487",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-488-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-488",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-489-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-489",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-X-75",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the address",
		},
	],
	[
		"BT-X-490",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-491",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-492",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-493",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-494",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-495",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-496",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-482-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-482",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Payer Electronic address",
		},
	],
	[
		"BT-X-482-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-X-481-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm: "Detailed information on tax information",
		},
	],
	[
		"BT-X-481",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "VAT ID",
		},
	],
	[
		"BT-X-481-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BG-X-41",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange",
			businessTerm:
				"Specification of the invoice currency, local currency and exchange rate",
		},
	],
	[
		"BT-X-258",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange/ram:SourceCurrencyCode",
			businessTerm: "Invoice currency",
		},
	],
	[
		"BT-X-259",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange/ram:TargetCurrencyCode",
			businessTerm: "Local currency",
		},
	],
	[
		"BT-X-260",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange/ram:ConversionRate",
			businessTerm: "Exchange rate",
		},
	],
	[
		"BT-X-261-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange/ram:ConversionRateDateTime",
			businessTerm: "Exchange rate date",
		},
	],
	[
		"BT-X-261",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange/ram:ConversionRateDateTime/udt:DateTimeString",
			businessTerm: "Exchange rate date, value",
		},
	],
	[
		"BT-X-261-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange/ram:ConversionRateDateTime/udt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-16",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans",
			businessTerm: "PAYMENT INSTRUCTIONS",
			description:
				"A group of business terms providing information about the payment.",
		},
	],
	[
		"BT-81",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:TypeCode",
			businessTerm: "Payment means type code",
			description:
				"The means, expressed as code, for how a payment is expected to be or has been settled.",
			usageNote:
				"Entries from the UNTDID 4461 code list [6] shall be used. Distinction should be made\r\nbetween SEPA and non-SEPA payments, and between credit payments, direct debits, card payments and other instruments.",
			businessRule:
				"BR-49: A  Payment  instruction  (BG-16)  shall  specify  the  Payment means type code (BT-81).",
			cius: "In particular, the following codes can be used:\r\n10: Species\r\n20: Check\r\n30: Transfer (includes SEPA transfer for CHORUSPRO)\r\n42: Payment on bank account\r\n48: Payment by credit card\r\n49: Direct debit (includes SEPA Direct Debit for CHORUSPRO)\r\n57 : Standing Agreement\r\n58: SEPA transfer (not used for CHORUSPRO: code 30)\r\n59: SEPA Direct Debit (not used for CHORUSPRO: code 49)\r\n97: Report\r\nZZZ: agreed amoung trading partners on interim basis",
		},
	],
	[
		"BT-82",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:Information",
			businessTerm: "Payment means text",
			description:
				"The means, expressed as text, for how a payment is expected to be or has been settled.",
			usageNote:
				"Such as cash, credit transfer, direct debit, credit card, etc.",
		},
	],
	[
		"BG-18",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:ApplicableTradeSettlementFinancialCard",
			businessTerm: "PAYMENT CARD INFORMATION",
			description:
				"A group of business terms providing information about card used for payment contemporaneous with invoice issuance.",
			usageNote:
				"Only used if the Buyer has opted to pay by using a payment card such as a credit or debit card.",
		},
	],
	[
		"BT-87",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:ApplicableTradeSettlementFinancialCard/ram:ID",
			businessTerm: "Payment card primary account number",
			description:
				"The Primary Account Number (PAN) of the card used for payment.",
			usageNote:
				"In accordance with card payments security standards an invoice should never include a full card primary account number. At the moment PCI Security Standards Council has defined following: The first 6 digits and last 4 digits are the maximum number of digits to be shown.",
		},
	],
	[
		"BT-88",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:ApplicableTradeSettlementFinancialCard/ram:CardholderName",
			businessTerm: "Payment card holder name",
			description: "The name of the payment card holder.",
		},
	],
	[
		"BT-91-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayerPartyDebtorFinancialAccount",
			businessTerm: "Buyer bank information",
		},
	],
	[
		"BT-91",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayerPartyDebtorFinancialAccount/ram:IBANID",
			businessTerm: "Debited account identifier",
			description: "The account to be debited by the direct debit.",
		},
	],
	[
		"BG-17",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeePartyCreditorFinancialAccount",
			businessTerm: "CREDIT TRANSFER",
			description:
				"A group of business terms to specify credit transfer payments.",
		},
	],
	[
		"BT-84",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeePartyCreditorFinancialAccount/ram:IBANID",
			businessTerm: "Payment account identifier",
			description:
				"A unique identifier of the financial payment account, at a payment service provider, to which payment should be made.",
			usageNote:
				"Such as IBAN (in case of SEPA payment) or a national account number.",
		},
	],
	[
		"BT-85",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeePartyCreditorFinancialAccount/ram:AccountName",
			businessTerm: "Payment account name",
			description:
				"The name of the payment account, at a payment service provider, to which payment should be made.",
		},
	],
	[
		"BT-84-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeePartyCreditorFinancialAccount/ram:ProprietaryID",
			businessTerm: "National account number (not SEPA)",
			usageNote: "Use IBANID when appropriate, otherwise use ProprietaryID",
		},
	],
	[
		"BT-86-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeeSpecifiedCreditorFinancialInstitution",
			businessTerm: "Seller bank information",
		},
	],
	[
		"BT-86",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeeSpecifiedCreditorFinancialInstitution/ram:BICID",
			businessTerm: "Payment service provider identifier",
			description:
				"An identifier for the payment service provider where a payment account is located.",
			usageNote:
				"Such as a BIC or a national clearing code where required. No identification scheme to be used.",
			businessRule: "Use for credit transfer",
			cius: "To be used for Credit Transfer only\r\nCHORUS PRO: Only BIC format is allowed",
		},
	],
	[
		"BG-23",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax",
			businessTerm: "VAT BREAKDOWN",
			description:
				"A group of business terms providing information about VAT breakdown by different categories, rates and exemption reasons",
		},
	],
	[
		"BT-117",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:CalculatedAmount",
			businessTerm: "VAT category tax amount",
			description: "The total VAT amount for a given VAT category.",
			usageNote:
				"Calculated by multiplying the VAT category taxable amount with the VAT category rate for the relevant VAT category.",
			businessRule: "For EXTENDED profile only, BR-CO-17 is not applied.",
		},
	],
	[
		"BT-118-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:TypeCode",
			businessTerm: "Type of tax (code)",
			description: "Coded identification of a VAT category.",
			usageNote:
				"The VAT category code and the VAT category rate shall be consistent. For more information on the recommended codes, please refer to subclause 6.3.3.2 - Specification of VAT category codes.",
		},
	],
	[
		"BT-120",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:ExemptionReason",
			businessTerm: "VAT exemption reason text",
			description:
				"A textual statement of the reason why the amount is exempted from VAT or why no VAT is being charged",
			usageNote: "Articles 226 items 11 to 15 Directive 2006/112/EC [2].",
			cius: "CHORUS PRO: this field is limited to 1024 characters",
		},
	],
	[
		"BT-116",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:BasisAmount",
			businessTerm: "VAT category taxable amount",
			description:
				"Sum of all taxable amounts subject to a specific VAT category code and VAT category rate (if the VAT category rate is applicable).",
			usageNote:
				"The sum of Invoice line net amount minus allowances plus charges on document level which are subject to a specific VAT category code and VAT category rate (if the VAT category rate is applicable).",
		},
	],
	[
		"BT-X-262",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:LineTotalBasisAmount",
			businessTerm: "Line Total Basis Amount",
			description:
				"A monetary value used as the line total basis on which this trade related tax, levy or duty is calculated",
		},
	],
	[
		"BT-X-263",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:AllowanceChargeBasisAmount",
			businessTerm: "Total amount of charges / allowances on document level",
		},
	],
	[
		"BT-118",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:CategoryCode",
			businessTerm: "VAT category code",
			description: "Coded identification of a VAT category.",
			usageNote:
				"The following entries of UNTDID 5305 [6] are used (further clarification between brackets):\r\n- Standard rate (Liable for VAT in a standard way)\r\n- Zero rated goods (Liable for VAT with a percentage rate of zero)\r\n- Exempt from tax (VAT/IGIC/IPSI)\r\n- VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)\r\n- VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)\r\n- Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)\r\n- Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)\r\n- Canary Islands General Indirect Tax (Liable for IGIC tax)\r\n- Liable for IPSI (Ceuta/Melilla tax)",
			businessRule:
				"BR-47: Each  VAT  breakdown  (BG-23)  shall  be  defined  through  a VAT category code (BT-118).\r\n\r\nFor EXTENDED profile only, BR-O-11, BR-O-12, BR-O-13 and BR-O-14 are not applied.",
			cius: "The VAT category codes are as follows:\r\nS = Standard VAT rate\r\nZ = Zero rated goods\r\nE = VAT exempt\r\nAE = Reverse charge\r\nK = Intra-Community supply (specific reverse charge)\r\nG = Exempt VAT for Export outside EU\r\nO = Outside VAT scope\r\nL = Canary Islands\r\nM = Ceuta and Mellila",
		},
	],
	[
		"BT-121",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:ExemptionReasonCode",
			businessTerm: "VAT exemption reason code",
			description:
				"A coded statement of the reason for why the amount is exempted from VAT.",
			usageNote:
				"Code list issued and maintained by the Connecting Europe Facility.",
		},
	],
	[
		"BT-7-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:TaxPointDate",
			businessTerm: "Tax due date",
			usageNote:
				"This does not apply in Germany. Use date of delivery instead.",
		},
	],
	[
		"BT-7",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:TaxPointDate/udt:DateString",
			businessTerm: "Value added tax point date",
			description:
				"The date when the VAT becomes accountable for the Seller and for the Buyer in so far as that date can be determined and differs from the date of issue of the invoice, according to the VAT directive.",
			usageNote:
				"The tax point is usually the date goods were supplied or services completed (the 'basic tax point'). There are some variations. Please refer to Article 226 (7) of the Council Directive 2006/112/EC [2] for more information.\r\nThis element is required if the Value added tax point date is different from the Invoice issue date. \r\nBoth Buyer and Seller should use the Tax Point Date when provided by the Seller. The use of BT-7 and BT-8 is mutually exclusive.",
			businessRule:
				"BR-CO-3: Value added tax point date (BT-7) and Value added tax point date code (BT-8) are mutually exclusive.",
			cius: 'This date shall not be present if the Value added tax point date is expressed in code in the "Value added tax point date code" (BT-8)',
		},
	],
	[
		"BT-7-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:TaxPointDate/udt:DateString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-8",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:DueDateTypeCode",
			businessTerm: "Value added tax point date code",
			description:
				"The code of the date when the VAT becomes accountable for the Seller and for the Buyer.",
			usageNote:
				"The code shall distinguish between the following entries of UNTDID 2005 [6]:\r\n- Invoice docment issue date\r\n- Delivery date, actual\r\n- Payment date. The Value added tax point date code is used if the Value added tax point date is not known when the invoice is issued. The use of BT-8 and BT-7 is mutually exclusive.",
			businessRule:
				"BR-CO-3: Value added tax point date (BT-7) and Value added tax point date code (BT-8) are mutually exclusive.",
			cius: 'This code can not be present if the Value added tax point date is provided directly in the "Value added tax point date" (BT-7). \r\nThis code should be selected from the following values from UNTDID 2475 (instead of UNTDID 2005 [6]):\r\n5: Date of the invoice (VAT on DEBITS)\r\n29: Delivery date (VAT on DEBITS)\r\n72: Payment date (VAT on RECEIPTS)',
		},
	],
	[
		"BT-119",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:RateApplicablePercent",
			businessTerm: "VAT category rate",
			description:
				"The VAT rate, represented as percentage that applies for the relevant VAT category.",
			usageNote:
				"The VAT category code and the VAT category rate shall be consistent.",
			businessRule:
				"BR-48: Each  VAT  breakdown  (BG-23)  shall  have  a  VAT  category rate (BT-119), except if the Invoice is not subject to VAT.",
			cius: "The value to enter is the percentage. For example, for 20%, it must be given as 20 (and not 0.2)",
		},
	],
	[
		"BG-14",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod",
			businessTerm: "INVOICING PERIOD",
			description:
				"A group of business terms providing information on the invoice period.",
			usageNote:
				"Used to indicate when the period covered by the invoice starts and when it ends. Also called delivery period.",
		},
	],
	[
		"BT-X-264",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:Description",
			businessTerm: "Invoicing period description (free text)",
		},
	],
	[
		"BT-73-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:StartDateTime",
			businessTerm: "Invoicing period start date",
		},
	],
	[
		"BT-73",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString",
			businessTerm: "Invoicing period start date",
			description: "The date when the Invoice period starts.",
			usageNote: "The initial date of delivery of goods or services.",
			businessRule:
				"BR-CO-19: If Invoicing period (BG-14) is used, the Invoicing period start date (BT-73) or the Invoicing period end date (BT-74) shall be filled, or both.",
			cius: "This date must be less than or equal to the period end date (BT-74), if it exists",
		},
	],
	[
		"BT-73-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-74-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:EndDateTime",
			businessTerm: "Invoicing period end date",
		},
	],
	[
		"BT-74",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString",
			businessTerm: "Invoicing period end date",
			description: "The date when the Invoice period ends.",
			usageNote:
				"The date on which the delivery of goods or services was completed.",
			businessRule:
				"BR-29: If  both  Invoicing  period  start  date  (BT-73)  and  Invoicing period end date (BT-74) are given then the Invoicing period end  date  (BT-74)  shall  be  later  or  equal  to  the  Invoicing period start date (BT-73).\r\n\r\nBR-CO-19: If Invoicing period (BG-14) is used, the Invoicing period start date (BT-73) or the Invoicing period end date (BT-74) shall be filled, or both.",
			cius: "This date must be greater than or equal to the period start date (BT-73), if it exists",
		},
	],
	[
		"BT-74-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-20",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]",
			businessTerm: "DOCUMENT LEVEL ALLOWANCES",
			description:
				"A group of business terms providing information about allowances applicable to the Invoice as a whole.",
			usageNote:
				"Deductions, such as withheld tax may also be specified in this group.",
		},
	],
	[
		"BG-20-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:ChargeIndicator",
			businessTerm: "Indicator for allowance",
		},
	],
	[
		"BG-20-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:ChargeIndicator/udt:Indicator",
			businessTerm: "Indicator for allowance, value",
			usageNote: "Allowance =&gt; false",
		},
	],
	[
		"BT-X-265",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:SequenceNumeric",
			businessTerm: "Calculation sequence",
		},
	],
	[
		"BT-94",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:CalculationPercent",
			businessTerm: "Document level allowance percentage",
			description:
				"The percentage that may be used, in conjunction with the document level allowance base amount, to calculate the document level allowance amount.",
		},
	],
	[
		"BT-93",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:BasisAmount",
			businessTerm: "Document level allowance base amount",
			description:
				"The base amount that may be used, in conjunction with the document level allowance percentage, to calculate the document level allowance amount.",
		},
	],
	[
		"BT-X-266",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:BasisQuantity",
			businessTerm: "Allowance / charge base quantity",
		},
	],
	[
		"BT-X-267",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:BasisQuantity/@unitCode",
			businessTerm: "Unit code",
		},
	],
	[
		"BT-92",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:ActualAmount",
			businessTerm: "Document level allowance amount",
			description: "The amount of an allowance, without VAT.",
		},
	],
	[
		"BT-98",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:ReasonCode",
			businessTerm: "Document level allowance reason code",
			description:
				"The reason for the document level allowance, expressed as a code.",
			usageNote:
				"Use entries of the UNTDID 5189 code list [6]. The Document level allowance reason code and the Document level allowance reason shall indicate the same allowance reason.",
			businessRule:
				"BR-33: Each   Document   level   allowance   (BG-20)   shall   have   a Document  level  allowance  reason  (BT-97)  or  a  Document level allowance reason code (BT-98).\r\n\r\nBR-CO-5: Document   level   allowance   reason   code   (BT-98)   and Document level allowance reason (BT-97) shall indicate the same type of allowance.\r\n\r\nBR-CO-21: Each Document level allowance (BG-20) shall contain a Document    level    allowance    reason    (BT-97)    or    a Document level allowance reason code (BT-98), or both.",
		},
	],
	[
		"BT-97",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:Reason",
			businessTerm: "Document level allowance reason",
			description:
				"The reason for the document level allowance, expressed as text.",
			businessRule:
				"BR-33: Each   Document   level   allowance   (BG-20)   shall   have   a Document  level  allowance  reason  (BT-97)  or  a  Document level allowance reason code (BT-98).\r\n\r\nBR-CO-5: Document   level   allowance   reason   code   (BT-98)   and Document level allowance reason (BT-97) shall indicate the same type of allowance.\r\n\r\nBR-CO-21: Each Document level allowance (BG-20) shall contain a Document    level    allowance    reason    (BT-97)    or    a Document level allowance reason code (BT-98), or both.",
			cius: "CHORUS PRO: this field is limited to 1024 characters",
		},
	],
	[
		"BT-95-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:CategoryTradeTax",
			businessTerm: "VAT type code for document level allowances",
			usageNote: "Value = VAT",
		},
	],
	[
		"BT-95-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:CategoryTradeTax/ram:TypeCode",
			businessTerm: "Type of tax (code)",
			usageNote: 'Fixed value = "VAT"',
		},
	],
	[
		"BT-95",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:CategoryTradeTax/ram:CategoryCode",
			businessTerm: "Document level allowance VAT category code",
			description:
				"A coded identification of what VAT category applies to the document level allowance.",
			usageNote:
				"The following entries of UNTDID 5305 [6] are used (further clarification between brackets):\r\n- Standard rate (Liable for VAT in a standard way)\r\n- Zero rated goods (Liable for VAT with a percentage rate of zero)\r\n- Exempt from tax (VAT/IGIC/IPSI)\r\n- VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)\r\n- VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)\r\n- Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)\r\n- Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)\r\n- Canary Islands General Indirect Tax (Liable for IGIC tax)\r\n- Liable for IPSI (Ceuta/Melilla tax)",
			businessRule:
				"BR-32: Each   Document   level   allowance   (BG-20)   shall   have   a Document level allowance VAT category code (BT-95).",
			cius: "The VAT category codes are as follows:\r\nS = Standard VAT rate\r\nZ = Zero rated goods\r\nE = VAT exempt\r\nAE = Reverse charge\r\nK = Intra-Community supply (specific reverse charge)\r\nG = Exempt VAT for Export outside EU\r\nO = Outside VAT scope\r\nL = Canary Islands\r\nM = Ceuta and Mellila",
		},
	],
	[
		"BT-96",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;false&quot;]/ram:CategoryTradeTax/ram:RateApplicablePercent",
			businessTerm: "Document level allowance VAT rate",
			description:
				"The VAT rate, represented as percentage that applies to the document level allowance.",
			cius: "The value to enter is the percentage. For example, for 20%, it must be given as 20 (and not 0.2)",
		},
	],
	[
		"BG-21",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]",
			businessTerm: "DOCUMENT LEVEL CHARGES",
			description:
				"A group of business terms providing information about charges and taxes other than VAT, applicable to the Invoice as a whole.",
		},
	],
	[
		"BG-21-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:ChargeIndicator",
			businessTerm: "Indicator for charge",
		},
	],
	[
		"BG-21-1",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:ChargeIndicator/udt:Indicator",
			businessTerm: "Indicator for charge, value",
			usageNote: "Charge =&gt; true",
		},
	],
	[
		"BT-X-268",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:SequenceNumeric",
			businessTerm: "Calculation sequence",
		},
	],
	[
		"BT-101",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:CalculationPercent",
			businessTerm: "Document level charge percentage",
			description:
				"The percentage that may be used, in conjunction with the document level charge base amount, to calculate the document level charge amount.",
		},
	],
	[
		"BT-100",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:BasisAmount",
			businessTerm: "Document level charge base amount",
			description:
				"The base amount that may be used, in conjunction with the document level charge percentage, to calculate the document level charge amount.",
		},
	],
	[
		"BT-X-269",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:BasisQuantity",
			businessTerm: "Allowance / charge base quantity",
		},
	],
	[
		"BT-X-270",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:BasisQuantity/@unitCode",
			businessTerm: "Price base quantity, unit",
		},
	],
	[
		"BT-99",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:ActualAmount",
			businessTerm: "Document level charge amount",
			description: "The amount of a charge, without VAT.",
		},
	],
	[
		"BT-105",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:ReasonCode",
			businessTerm: "Document level charge reason code",
			description:
				"The reason for the document level charge, expressed as a code.",
			usageNote:
				"Use entries of the UNTDID 7161 code list [6]. The Document level charge reason code and the Document level charge reason shall indicate the same charge reason.",
			businessRule:
				"BR-38: Each Document level charge (BG-21) shall have a Document level  charge  reason  (BT-104)  or  a  Document  level  charge reason code (BT-105).\r\n\r\nBR-CO-6: Document   level   charge   reason   code   (BT-105)   and Document  level  charge  reason  (BT-104)  shall  indicate the same type of charge.\r\n\r\nBR-CO-22: Each  Document  level  charge  (BG-21)  shall  contain  a Document level charge reason (BT-104) or a Document level charge reason code (BT-105), or both.",
			cius: "In particular, the following codes and reasons can be used:\r\nAA = Advertising discount\r\nABL = Packing supplement\r\nADR = Other services\r\nADT = Removal\r\nFC = transportation costs\r\nFI = Financial expenses\r\nLA = Labeling",
		},
	],
	[
		"BT-104",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:Reason",
			businessTerm: "Document level charge reason",
			description:
				"The reason for the document level charge, expressed as text.",
			businessRule:
				"BR-38: Each Document level charge (BG-21) shall have a Document level  charge  reason  (BT-104)  or  a  Document  level  charge reason code (BT-105).\r\n\r\nBR-CO-6: Document   level   charge   reason   code   (BT-105)   and Document  level  charge  reason  (BT-104)  shall  indicate the same type of charge.\r\n\r\nBR-CO-22: Each  Document  level  charge  (BG-21)  shall  contain  a Document level charge reason (BT-104) or a Document level charge reason code (BT-105), or both.",
			cius: "CHORUS PRO: this field is limited to 1024 characters",
		},
	],
	[
		"BT-102-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:CategoryTradeTax",
			businessTerm: "Detailed information on tax information",
			description: "A finite sequence of characters.",
		},
	],
	[
		"BT-102-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:CategoryTradeTax/ram:TypeCode",
			businessTerm: "Type of tax (code)",
			usageNote: 'Fixed value = "VAT"',
		},
	],
	[
		"BT-102",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:CategoryTradeTax/ram:CategoryCode",
			businessTerm: "Document level charge VAT category code",
			description:
				"A coded identification of what VAT category applies to the document level charge.",
			usageNote:
				"The following entries of UNTDID 5305 [6] are used (further clarification between brackets):\r\n- Standard rate (Liable for VAT in a standard way)\r\n- Zero rated goods (Liable for VAT with a percentage rate of zero)\r\n- Exempt from tax (VAT/IGIC/IPSI)\r\n- VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)\r\n- VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)\r\n- Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)\r\n- Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)\r\n- Canary Islands General Indirect Tax (Liable for IGIC tax)\r\n- Liable for IPSI (Ceuta/Melilla tax)",
			businessRule:
				"BR-37: Each Document level charge (BG-21) shall have a Document level charge VAT category code (BT-102).",
			cius: "The VAT category codes are as follows:\r\nS = Standard VAT rate\r\nZ = Zero rated goods\r\nE = VAT exempt\r\nAE = Reverse charge\r\nK = Intra-Community supply (specific reverse charge)\r\nG = Exempt VAT for Export outside EU\r\nO = Outside VAT scope\r\nL = Canary Islands\r\nM = Ceuta and Mellila",
		},
	],
	[
		"BT-103",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator=&quot;true&quot;]/ram:CategoryTradeTax/ram:RateApplicablePercent",
			businessTerm: "Document level charge VAT rate",
			description:
				"The VAT rate, represented as percentage that applies to the document level charge.",
			cius: "The value to enter is the percentage. For example, for 20%, it must be given as 20 (and not 0.2)",
		},
	],
	[
		"BG-X-42",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge",
			businessTerm: "Detailed information on logistics service fees",
		},
	],
	[
		"BT-X-271",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:Description",
			businessTerm: "Service fee description",
		},
	],
	[
		"BT-X-272",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:AppliedAmount",
			businessTerm: "Service fee amount",
		},
	],
	[
		"BT-X-273-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:AppliedTradeTax",
			businessTerm: "Detailed tax information",
		},
	],
	[
		"BT-X-273-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:AppliedTradeTax/ram:TypeCode",
			businessTerm: "Tax type (Code)",
		},
	],
	[
		"BT-X-273",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:AppliedTradeTax/ram:CategoryCode",
			businessTerm: "VAT category code",
			description: "Coded identification of a VAT category.",
		},
	],
	[
		"BT-X-274",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:AppliedTradeTax/ram:RateApplicablePercent",
			businessTerm: "VAT category rate",
		},
	],
	[
		"BT-20-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms",
			businessTerm: "Detailed information about payment terms",
		},
	],
	[
		"BT-20",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:Description",
			businessTerm: "Payment terms",
			description:
				"A textual description of the payment terms that apply to the amount due for payment (Including description of possible penalties).",
			usageNote: "This element may contain multiple lines and multiple terms.",
		},
	],
	[
		"BT-9-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:DueDateDateTime",
			businessTerm: "Due date",
		},
	],
	[
		"BT-9",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:DueDateDateTime/udt:DateTimeString",
			businessTerm: "Payment due date",
			description: "The date when the payment is due.",
			usageNote:
				"The payment due date reflects the due date of the net payment. For partial payments it states the first net due date. The corresponding description of more complex payment terms can be stated in BT-20 Payment terms.",
		},
	],
	[
		"BT-9-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:DueDateDateTime/udt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-89",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:DirectDebitMandateID",
			businessTerm: "Mandate reference identifier",
			description:
				"Unique identifier assigned by the Payee for referencing the direct debit mandate.",
			usageNote:
				"Used in order to pre-notify the Buyer of a SEPA direct debit.",
			cius: "This is the RUM (Unique Mandate Reference) for SEPA direct debits",
		},
	],
	[
		"BT-X-275",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PartialPaymentAmount",
			businessTerm: "Partial payment amount",
		},
	],
	[
		"BG-X-43",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms",
			businessTerm: "Detailed information about penalties",
		},
	],
	[
		"BT-X-276-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms/ram:BasisDateTime",
			businessTerm: "Maturity Reference Date",
		},
	],
	[
		"BT-X-276",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms/ram:BasisDateTime/udt:DateTimeString",
			businessTerm: "Maturity Reference Date, value",
		},
	],
	[
		"BT-X-276-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms/ram:BasisDateTime/udt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-X-277",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms/ram:BasisPeriodMeasure",
			businessTerm: "Due date period basis",
			description:
				"The period for the due date, e.g. as a number of days (15 days)",
		},
	],
	[
		"BT-X-278",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms/ram:BasisPeriodMeasure/@unitCode",
			businessTerm: "Maturity Period, Unit code",
		},
	],
	[
		"BT-X-279",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms/ram:BasisAmount",
			businessTerm: "Payment penalty base amount",
		},
	],
	[
		"BT-X-280",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms/ram:CalculationPercent",
			businessTerm: "Payment penalty percentage",
		},
	],
	[
		"BT-X-281",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms/ram:ActualPenaltyAmount",
			businessTerm: "Payment penalty amount",
		},
	],
	[
		"BG-X-44",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms",
			businessTerm: "Detailed information about payment discounts",
		},
	],
	[
		"BT-X-282-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms/ram:BasisDateTime",
			businessTerm: "Maturity Reference Date",
		},
	],
	[
		"BT-X-282",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms/ram:BasisDateTime/udt:DateTimeString",
			businessTerm: "Maturity Reference Date, value",
		},
	],
	[
		"BT-X-282-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms/ram:BasisDateTime/udt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-X-283",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms/ram:BasisPeriodMeasure",
			businessTerm: "Due date period basis",
			description:
				"The period for the due date, e.g. as a number of days (15 days)",
		},
	],
	[
		"BT-X-284",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms/ram:BasisPeriodMeasure/@unitCode",
			businessTerm: "Maturity Period, Unit code",
		},
	],
	[
		"BT-X-285",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms/ram:BasisAmount",
			businessTerm: "Payment discount base amount",
		},
	],
	[
		"BT-X-286",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms/ram:CalculationPercent",
			businessTerm: "Payment discount percentage",
		},
	],
	[
		"BT-X-287",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms/ram:ActualDiscountAmount",
			businessTerm: "Payment discount amount",
		},
	],
	[
		"BG-X-77",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty",
			businessTerm: "Deviating payee per payment",
			description:
				"Group of business terms providing information about the payee, i.e. the role that receives the payment, IN CASE OF MULTIPLE PAYEES",
			usageNote:
				"The role of beneficiary may be filled by a party other than the seller, e.g. a factoring service. THIS GROUP IS ONLY USED WHEN THERE ARE MULTIPLE BENEFICIARIES (e.g. withholding tax or split payment).",
		},
	],
	[
		"BT-X-506",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:ID",
			businessTerm: "Deviating invoice payee identifier",
		},
	],
	[
		"BT-X-507",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:GlobalID",
			businessTerm: "Deviating invoice payer global identifier",
			usageNote:
				"GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID",
		},
	],
	[
		"BT-X-507-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:GlobalID/@schemeID",
			businessTerm: "Payee scheme identifier",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.",
		},
	],
	[
		"BT-X-504",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:Name",
			businessTerm: "Name/company name of Payee",
			description: "The name of the Payee.",
			usageNote:
				"Shall be used when the Payee is different from the Seller. The Payee name may however be the same as the Seller name.",
		},
	],
	[
		"BT-X-511",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:RoleCode",
			businessTerm: "Role (code)",
			description: "A code qualifying the role",
			usageNote: "To be chosen from UNTDID 3035.",
		},
	],
	[
		"BT-X-508-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization",
			businessTerm: "Details about the organization",
		},
	],
	[
		"BT-X-508",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
			businessTerm: "Company Registration Number",
			description:
				"An identifier issued by an official registrar that identifies the party as a legal entity or person.",
		},
	],
	[
		"BT-X-508-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
			businessTerm: "Scheme identifier",
			description:
				"The identification scheme identifier of the Payee legal registration identifier.",
			usageNote:
				"If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.",
		},
	],
	[
		"BT-X-505",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
			businessTerm: "Trading Business Name",
			description:
				"A name by which the party is known, other than party name (also known as business name).",
			usageNote: "This may be used if different from the party name.",
		},
	],
	[
		"BG-X-80",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the business address",
		},
	],
	[
		"BT-X-525",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-526",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-527",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-528",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-529",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-530",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-531",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BG-X-78",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact",
			businessTerm: "Detailed contact information",
		},
	],
	[
		"BT-X-512",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:PersonName",
			businessTerm: "Name of the contact",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-513",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
			businessTerm: "Department name",
			usageNote:
				"If a contact person is indicated, either the name or the department is to be transmitted.",
		},
	],
	[
		"BT-X-514",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
			businessTerm: "Type of contact (code)",
			description: "The code specifying the type of trade contact",
			usageNote: "To be chosen from the entries of UNTDID 3139",
		},
	],
	[
		"BT-X-515-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication",
			businessTerm: "Contact telephone number",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-515",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact telephone number, value",
			description: "A phone number for the contact point.",
		},
	],
	[
		"BT-X-516-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication",
			businessTerm: "Contact point fax number",
		},
	],
	[
		"BT-X-516",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
			businessTerm: "Contact point fax number, value",
		},
	],
	[
		"BT-X-517-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication",
			businessTerm: "Contact email address",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BT-X-517",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
			businessTerm: "Contact email address, value",
			description: "An e-mail address for the contact point.",
		},
	],
	[
		"BG-X-79",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress",
			businessTerm: "Detailed information about the address",
		},
	],
	[
		"BT-X-518",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
			businessTerm: "Post code",
			description:
				"The identifier for an addressable group of properties according to the relevant postal service.",
			usageNote: "Such as a ZIP code or a post code.",
		},
	],
	[
		"BT-X-519",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineOne",
			businessTerm: "Address line 1",
			description: "The main address line in an address.",
			usageNote: "Usually the street name and number or post office box.",
		},
	],
	[
		"BT-X-520",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
			businessTerm: "Address line 2",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-521",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineThree",
			businessTerm: "Address line 3",
			description:
				"An additional address line in an address that can be used to give further details supplementing the main line.",
		},
	],
	[
		"BT-X-522",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CityName",
			businessTerm: "City",
			description: "The common name of the city, town or village.",
		},
	],
	[
		"BT-X-523",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CountryID",
			businessTerm: "Country code",
			description: "A code that identifies the country.",
			usageNote:
				'The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".',
		},
	],
	[
		"BT-X-524",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
			businessTerm: "Country subdivision",
			description: "The subdivision of a country.",
			usageNote: "Such as a region, a county, a state, a province, etc.",
		},
	],
	[
		"BT-X-510-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:URIUniversalCommunication",
			businessTerm: "Details about the electronic address",
		},
	],
	[
		"BT-X-510",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:URIUniversalCommunication/ram:URIID",
			businessTerm: "Electronic address",
		},
	],
	[
		"BT-X-510-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
			businessTerm: "Scheme identifier",
		},
	],
	[
		"BT-X-509-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedTaxRegistration",
			businessTerm: "Detailed information on tax information",
		},
	],
	[
		"BT-X-509",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
			businessTerm: "VAT ID",
		},
	],
	[
		"BT-X-509-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID",
			businessTerm: "Tax Scheme identifier",
			usageNote: "VA = VAT ID",
		},
	],
	[
		"BG-22",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation",
			businessTerm: "DOCUMENT TOTALS",
			description:
				"A group of business terms providing the monetary totals for the Invoice.",
			cius: 'CHORUS PRO: Amounts in an invoice are expressed by a figure on 19 positions.\r\nThey can not have more than two decimals. The separator is ". "',
		},
	],
	[
		"BT-106",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:LineTotalAmount",
			businessTerm: "Sum of Invoice line net amount",
			description: "Sum of all Invoice line net amounts in the Invoice.",
			businessRule:
				"For EXTENDED profile only, BR-CO-10 is replaced by BR-FXEXT-CO-10, which add a tolerance of 0,01 euro per line, document level charge and allowance in calculation.",
		},
	],
	[
		"BT-108",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:ChargeTotalAmount",
			businessTerm: "Sum of charges on document level",
			description: "Sum of all charges on document level in the Invoice.",
			usageNote:
				"Charges on line level are included in the Invoice line net amount which is summed up into the Sum of Invoice line net amount.",
			businessRule:
				"For EXTENDED profile only, BR-CO-12 is replaced by BR-FXEXT-CO-12, which add a tolerance of 0,01 euro per line, document level charge and allowance in calculation.",
		},
	],
	[
		"BT-107",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:AllowanceTotalAmount",
			businessTerm: "Sum of allowances on document level",
			description: "Sum of all allowances on document level in the Invoice.",
			usageNote:
				"Allowances on line level are included in the Invoice line net amount which is summed up into the Sum of Invoice line net amount.",
			businessRule:
				"For EXTENDED profile only, BR-CO-11 is replaced by BR-FXEXT-CO-11, which add a tolerance of 0,01 euro per line, document level charge and allowance in calculation.",
		},
	],
	[
		"BT-109",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxBasisTotalAmount",
			businessTerm: "Invoice total amount without VAT",
			description: "The total amount of the Invoice without VAT.",
			usageNote:
				"The Invoice total amount without VAT is the Sum of Invoice line net amount minus Sum of allowances on document level plus Sum of charges on document level.",
			businessRule:
				"For EXTENDED profile only, BR-CO-13 is replaced by BR-FXEXT-CO-13, which add a tolerance of 0,01 euro per line, document level charge and allowance in calculation.",
		},
	],
	[
		"BT-110",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount[@currencyID=../../ram:InvoiceCurrencyCode]",
			businessTerm: "Invoice total VAT amount",
			description: "The total VAT amount for the Invoice.",
			usageNote:
				"The Invoice total VAT amount is the sum of all VAT category tax amounts.",
		},
	],
	[
		"BT-110-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount[@currencyID=../../ram:InvoiceCurrencyCode]/@currencyID",
			businessTerm: "Invoice currency code",
		},
	],
	[
		"BT-111",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount[@currencyID=../../ram:TaxCurrencyCode]",
			businessTerm: "Invoice total VAT amount in accounting currency",
			description:
				"The VAT total amount expressed in the accounting currency accepted or required in the country of the Seller.",
			usageNote:
				"To be used when the VAT accounting currency (BT-6) differs from the Invoice currency code (BT-5) in accordance with article 230 of Directive 2006/112 / EC on VAT. The VAT amount in accounting currency is not used in the calculation of the Invoice totals.",
		},
	],
	[
		"BT-111-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount[@currencyID=../../ram:TaxCurrencyCode]/@currencyID",
			businessTerm: "VAT accounting currency code",
		},
	],
	[
		"BT-114",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:RoundingAmount",
			businessTerm: "Rounding amount",
			description:
				"The amount to be added to the invoice total to round the amount to be paid.",
			cius: "This case is not applied in France.",
		},
	],
	[
		"BT-112",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:GrandTotalAmount",
			businessTerm: "Invoice total amount with VAT",
			description: "The total amount of the Invoice with VAT.",
			usageNote:
				"The Invoice total amount with VAT is the Invoice total amount without VAT plus the Invoice total VAT amount.",
		},
	],
	[
		"BT-113",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TotalPrepaidAmount",
			businessTerm: "Paid amount",
			description: "The sum of amounts which have been paid in advance.",
			usageNote:
				"This amount is subtracted from the invoice total amount with VAT to calculate the amount due for payment.",
		},
	],
	[
		"BT-115",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:DuePayableAmount",
			businessTerm: "Amount due for payment",
			description: "The outstanding amount that is requested to be paid.",
			usageNote:
				"This amount is the Invoice total amount with VAT minus the paid amount that has been paid in advance. The amount is zero in case of a fully paid Invoice. The amount may be negative; in that case the Seller owes the amount to the Buyer.",
		},
	],
	[
		"BG-3",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument",
			businessTerm: "PRECEDING INVOICE REFERENCE",
			description:
				"A group of business terms providing information on one or more preceding Invoices.",
			usageNote:
				"To be used in case: \r\n- a preceding invoice is corrected \r\n- preceding partial invoices are refered to from a final invoice \r\n- preceding pre-payment invoices are refered to from a final invoice",
			cius: "This business group is mandatory in case of a Credit Note in order to reference the invoices it credits, unless the Credit Note refers to a period which must then be present in group BG-14.",
		},
	],
	[
		"BT-25",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Preceding Invoice reference",
			description:
				"The identification of an Invoice that was previously sent by the Seller.",
		},
	],
	[
		"BT-X-555",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument/ram:TypeCode",
			businessTerm: "Preceding incoive type code",
			usageNote: "The same rules apply as for BT-3",
		},
	],
	[
		"BT-26-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Preceding Invoice Reference",
		},
	],
	[
		"BT-26",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Preceding Invoice issue date",
			description: "The date when the Preceding Invoice was issued.",
			usageNote:
				"The Preceding Invoice issue date shall be provided in case the Preceding Invoice identifier is not unique.",
		},
	],
	[
		"BT-26-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BT-19-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount",
			businessTerm: "Detailed information about the accounting reference",
		},
	],
	[
		"BT-19",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:ID",
			businessTerm: "Buyer accounting reference",
			description:
				"A textual value that specifies where to book the relevant data into the Buyer's financial accounts.",
			cius: "CHORUS PRO: not used",
		},
	],
	[
		"BT-X-290",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:TypeCode",
			businessTerm: "Accounting reference type (Code)",
		},
	],
	[
		"BG-X-45",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment",
			businessTerm: "Included tax for advanced payment",
		},
	],
	[
		"BT-X-291",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:PaidAmount",
			businessTerm: "Advanced payment, value",
		},
	],
	[
		"BT-X-292-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:FormattedReceivedDateTime",
			businessTerm: "Date of advanced payment",
		},
	],
	[
		"BT-X-292",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:FormattedReceivedDateTime/qdt:DateTimeString",
			businessTerm: "Date of advanced payment, value",
		},
	],
	[
		"BT-X-292-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:FormattedReceivedDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
	[
		"BG-X-46",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:IncludedTradeTax",
			businessTerm: "Tax information on advanced payments",
		},
	],
	[
		"BT-X-293",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:IncludedTradeTax/ram:CalculatedAmount",
			businessTerm: "Included tax",
		},
	],
	[
		"BT-X-294",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:IncludedTradeTax/ram:TypeCode",
			businessTerm: "Type of tax (code)",
			usageNote: 'Fixed value = "VAT"',
		},
	],
	[
		"BT-X-295",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:IncludedTradeTax/ram:ExemptionReason",
			businessTerm: "VAT exemption reason text",
			description:
				"A textual statement of the reason why the amount is exempted from VAT or why no VAT is being charged",
		},
	],
	[
		"BT-X-296",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:IncludedTradeTax/ram:CategoryCode",
			businessTerm: "VAT category code",
			description: "Coded identification of a VAT category.",
			usageNote:
				"The following entries of UNTDID 5305 [6] are used (further clarification between brackets):\r\n- Standard rate (Liable for VAT in a standard way)\r\n- Zero rated goods (Liable for VAT with a percentage rate of zero)\r\n- Exempt from tax (VAT/IGIC/IPSI)\r\n- VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)\r\n- VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)\r\n- Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)\r\n- Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)\r\n- Canary Islands General Indirect Tax (Liable for IGIC tax)\r\n- Liable for IPSI (Ceuta/Melilla tax)",
		},
	],
	[
		"BT-X-297",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:IncludedTradeTax/ram:ExemptionReasonCode",
			businessTerm: "VAT exemption reason code",
			description:
				"A coded statement of the reason for why the amount is exempted from VAT.",
			usageNote:
				"Code list issued and maintained by the Connecting Europe Facility.",
		},
	],
	[
		"BT-X-298",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:IncludedTradeTax/ram:RateApplicablePercent",
			businessTerm: "VAT category rate",
			description:
				"The VAT rate, represented as percentage that applies for the relevant VAT category.",
			usageNote:
				"The VAT category code and the VAT category rate shall be consistent.",
		},
	],
	[
		"BG-X-85",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:InvoiceSpecifiedReferencedDocument",
			businessTerm: "PRECEDING INVOICE REFERENCE FOR ADVANCE PAYMENT",
			description:
				"A group of business terms providing information on the advance payment related preceding invoice. The individual invoide shall be stated so that combined payments need to be split per invoice.",
			usageNote:
				"To be used in case: \r\n- preceding partial invoices are refered to from a final invoice \r\n- preceding pre-payment invoices are refered to from a final invoice",
		},
	],
	[
		"BT-X-558",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:InvoiceSpecifiedReferencedDocument/ram:IssuerAssignedID",
			businessTerm: "Preceding Invoice reference",
			description:
				"The identification of an Invoice that was previously sent by the Seller.",
		},
	],
	[
		"BT-X-559",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:InvoiceSpecifiedReferencedDocument/ram:TypeCode",
			businessTerm: "Preceding incoive type code",
			usageNote: "The same rules apply as for BT-3",
		},
	],
	[
		"BT-X-560-00",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:InvoiceSpecifiedReferencedDocument/ram:FormattedIssueDateTime",
			businessTerm: "Preceding Invoice Reference",
		},
	],
	[
		"BT-X-560",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:InvoiceSpecifiedReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
			businessTerm: "Preceding Invoice issue date",
			description: "The date when the Preceding Invoice was issued.",
			usageNote:
				"The Preceding Invoice issue date shall be provided in case the Preceding Invoice identifier is not unique.",
		},
	],
	[
		"BT-X-560-0",
		{
			xpath:
				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:InvoiceSpecifiedReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format",
			businessTerm: "Date, format",
			usageNote: 'Only value "102"',
		},
	],
] satisfies [
	string,
	Omit<FieldMeta, "id" | "cardinality" | "dataType"> &
		Partial<Pick<FieldMeta, "id">>,
][]);
