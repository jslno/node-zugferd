import { dateTimeStringFormatter } from "../../utils/helper";
import { type Schema } from "../../types/schema";
import { z } from "zod";
import { UNTDID_5305 } from "../../codelists/untdid/5305";
import { UNTDID_5189 } from "../../codelists/untdid/5189";
import { UNTDID_1153 } from "../../codelists/untdid/1153";
import { UNTDID_7161 } from "../../codelists/untdid/7161";
import { UNTDID_4451 } from "../../codelists/untdid/4451";

export const extendedSchema = {
	/**
	 * Test Indicator
	 *
	 * The Indicator type may be used when implementing a new system in order to mark the invoice as „test invoice“.
	 *
	 * To be used only in case of a test invoice, with Indicator = true
	 */
	testIndicator: {
		type: "boolean",
		description: `**Test Indicator**

The Indicator type may be used when implementing a new system in order to mark the invoice as „test invoice“.

To be used only in case of a test invoice, with Indicator = true`,
		required: false,
		xpath:
			"/rsm:CrossIndustryInvoice/rsm:ExchangedDocumentContext/ram:TestIndicator/udt:Indicator",
	},
	/**
	 * Document name
	 *
	 * Text is the actual wording of anything written or printed. This EN 16931_ Text. Type is based on the Text. Type as defined in ISO 15000-5:2014, Annex B. Line breaks in the text may be present.
	 */
	name: {
		type: "string",
		description: `**Document name**

Text is the actual wording of anything written or printed. This EN 16931_ Text. Type is based on the Text. Type as defined in ISO 15000-5:2014, Annex B. Line breaks in the text may be present.`,
		required: false,
		xpath: "/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:Name",
	},
	/**
	 * Copy Indicator
	 *
	 * Indicates if the invoice document is a copy of another invoice document.
	 *
	 * With indicator = true, the document is a copy.
	 */
	copyIndicator: {
		type: "boolean",
		description: `**Copy Indicator**

Indicates if the invoice document is a copy of another invoice document.

With indicator = true, the document is a copy.`,
		required: false,
		xpath:
			"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:CopyIndicator/udt:Indicator",
	},
	/**
	 * Invoice language code
	 *
	 * Indicates the language used in the invoice document.
	 *
	 * Valid languages are registered with the ISO 639-2 "Codes for the representation of names of languages" Maintenance Agency.
	 */
	language: {
		type: "string",
		description: `**Invoice language code**

Indicates the language used in the invoice document.

Valid languages are registered with the ISO 639-2 "Codes for the representation of names of languages" Maintenance Agency.`,
		required: false,
		xpath: "/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:LanguageID",
	},
	includedNote: {
		type: "object[]",
		required: false,
		shape: {
			/**
			 * Free text on header level (qualifying the content)
			 *
			 * A code to classify the content of the invoice note.
			 *
			 * The code is bilaterally agreed on and must have the same meaning as BT-22.
			 */
			contentCode: {
				type: "string",
				description: `**Free text on header level (qualifying the content)**

A code to classify the content of the invoice note.

The code is bilaterally agreed on and must have the same meaning as BT-22.`,
				required: false,
				xpath:
					"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IncludedNote[notes]/ram:ContentCode",
			},
		},
	},
	/**
	 * Contractual due date of the invoice
	 *
	 * Indication of the due date of the invoice if this differs from the payment.
	 *
	 * Information only required if the contractual due date differs from due date of the payment (i.e. for SEPA direct debit).
	 */
	contractualDueDate: {
		type: "date",
		description: `**Contractual due date of the invoice**

Indication of the due date of the invoice if this differs from the payment.

Information only required if the contractual due date differs from due date of the payment (i.e. for SEPA direct debit).`,
		required: false,
		xpath:
			"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:EffectiveSpecifiedPeriod/ram:CompleteDateTime/udt:DateTimeString",
		transform: {
			input: dateTimeStringFormatter,
		},
		additionalXml: {
			"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:EffectiveSpecifiedPeriod/ram:CompleteDateTime/udt:DateTimeString/@format":
				"102",
		},
	},
	transaction: {
		type: "object",
		shape: {
			tradeAgreement: {
				type: "object",
				shape: {
					seller: {
						type: "object",
						shape: {
							/**
							 * Seller Role (code)
							 *
							 * A code qualifying the role of the party
							 *
							 * To be chosen from UNTDID 3035.
							 */
							typeCode: {
								type: "string",
								description: `**Seller Role (code)**

A code qualifying the role of the party

To be chosen from UNTDID 3035.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:RoleCode",
							},

							organization: {
								type: "object",
								shape: {
									/**
									 * Seller legal address
									 *
									 * Legal address of the seller in case the seller address is different
									 */
									postalAddress: {
										type: "object",
										description: `**Seller legal address**

Legal address of the seller in case the seller address is different`,
										required: false,
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
										},
									},
								},
							},

							tradeContact: {
								type: "object",
								shape: {
									/**
									 * Type of contact (code)
									 *
									 * The code specifying the type of trade contact
									 *
									 * To be chosen from the entries of UNTDID 3139
									 */
									typeCode: {
										type: "string",
										description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
									},
									/**
									 * Seller contact fax number
									 *
									 * A fax number for the contact point.
									 */
									faxNumber: {
										type: "string",
										description: `**Seller contact fax number**

A fax number for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
									},
								},
							},
						},
					},
					buyer: {
						type: "object",
						shape: {
							/**
							 * Role (code)
							 *
							 * A code qualifying the role
							 *
							 * To be chosen from UNTDID 3035.
							 */
							typeCode: {
								type: "string",
								description: `**Role (code)**

A code qualifying the role

To be chosen from UNTDID 3035.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:RoleCode",
							},
							/**
							 * Buyer additional legal information
							 *
							 * Additional legal information relevant for the buyer.
							 *
							 * Such as share capital.
							 */
							description: {
								type: "string",
								description: `**Buyer additional legal information**

Additional legal information relevant for the buyer.

Such as share capital.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:Description",
							},
							organization: {
								type: "object",
								shape: {
									/**
									 * Detailed information about the business address
									 *
									 * Legal address of the buyerr in case the Buyer address is different
									 */
									postalAddress: {
										type: "object",
										description: `**Detailed information about the business address**

Legal address of the buyerr in case the Buyer address is different`,
										required: false,
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
										},
									},
								},
							},
							tradeContact: {
								type: "object",
								shape: {
									/**
									 * Type of contact (code)
									 *
									 * The code specifying the type of trade contact
									 *
									 * To be chosen from the entries of UNTDID 3139
									 */
									typeCode: {
										type: "string",
										description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
									},
									/**
									 * Buyer contact fax number
									 *
									 * A fax number for the contact point.
									 */
									faxNumber: {
										type: "string",
										description: `**Buyer contact fax number**

A fax number for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
									},
								},
							},
						},
					},
					/**
					 * Detailed information about the sales agent
					 *
					 * A group of business terms providing information about the Sales Agent
					 */
					salesAgent: {
						type: "object",
						description: `**Detailed information about the sales agent**

A group of business terms providing information about the Sales Agent`,
						required: false,
						shape: {
							/**
							 * Sales agent identifier
							 *
							 * A previously exchanged assigned identifier of the business partner.
							 */
							identifier: {
								type: "string",
								description: `**Sales agent identifier**

A previously exchanged assigned identifier of the business partner.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:ID",
							},
							/**
							 * Sales agent global identifier
							 *
							 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
							 */
							globalIdentifier: {
								type: "object",
								description: `**Sales agent global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
								required: false,
								shape: {
									/**
									 * Sales agent global identifier
									 *
									 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
									 */
									value: {
										type: "string",
										description: `**Sales agent global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:GlobalID",
									},
									/**
									 * Scheme identifier
									 *
									 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
									 */
									schemeIdentifier: {
										type: "string",
										description: `**Scheme identifier**

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:GlobalID/@schemeID",
									},
								},
							},
							/**
							 * Sales agent identifier Name / Company Name
							 */
							name: {
								type: "string",
								description: "Sales agent identifier Name / Company Name",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:Name",
							},
							/**
							 * Role (code)
							 *
							 * A code qualifying the role
							 *
							 * To be chosen from UNTDID 3035.
							 */
							typeCode: {
								type: "string",
								description: `**Role (code)**

A code qualifying the role

To be chosen from UNTDID 3035.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:RoleCode",
							},
							/**
							 * Details about the organization
							 */
							organization: {
								type: "object",
								description: "Details about the organization",
								required: false,
								shape: {
									/**
									 * Sales Agent Registration Number
									 *
									 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
									 */
									identifier: {
										type: "object",
										description: `**Sales Agent Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
										required: false,
										shape: {
											/**
											 * Sales Agent Registration Number
											 *
											 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
											 */
											value: {
												type: "string",
												description: `**Sales Agent Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Buyer legal registration identifier.
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

The identification scheme identifier of the Buyer legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
									/**
									 * Trading Business Name
									 *
									 * A name by which the party is known, other than party name (also known as business name).
									 *
									 * This may be used if different from the party name.
									 */
									businessName: {
										type: "string",
										description: `**Trading Business Name**

A name by which the party is known, other than party name (also known as business name).

This may be used if different from the party name.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									},
									/**
									 * Detailed information about the business address
									 *
									 * Legal address of the buyer in case the Sales Agent address is different
									 */
									postalAddress: {
										type: "object",
										description: `**Detailed information about the business address**

Legal address of the buyer in case the Sales Agent address is different`,
										required: false,
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
										},
									},
									/**
									 * Detailed contact information of the deviating end user
									 */
									tradeContact: {
										type: "object",
										description:
											"Detailed contact information of the deviating end user",
										required: false,
										shape: {
											/**
											 * Name of the contact
											 *
											 * If a contact person is indicated, either the name or the department is to be transmitted.
											 */
											name: {
												type: "string",
												description: `**Name of the contact**

If a contact person is indicated, either the name or the department is to be transmitted.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:PersonName",
											},
											/**
											 * Department name
											 *
											 * If a contact person is indicated, either the name or the department is to be transmitted.
											 */
											departmentName: {
												type: "string",
												description: `**Department name**

If a contact person is indicated, either the name or the department is to be transmitted.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
											},
											/**
											 * Type of contact (code)
											 *
											 * The code specifying the type of trade contact
											 *
											 * To be chosen from the entries of UNTDID 3139
											 */
											typeCode: {
												type: "string",
												description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:TypeCode",
											},
											/**
											 * Contact telephone number
											 *
											 * A phone number for the contact point.
											 */
											telephoneNumber: {
												type: "string",
												description: `**Contact telephone number**

A phone number for the contact point.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
											},
											/**
											 * Contact point fax number
											 */
											faxNumber: {
												type: "string",
												description: "Contact point fax number",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
											},
											/**
											 * Contact email address
											 *
											 * An e-mail address for the contact point.
											 */
											emailAddress: {
												type: "string",
												description: `**Contact email address**

An e-mail address for the contact point.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
											},
										},
									},
								},
							},
							/**
							 * Detailed information about the address
							 */
							postalAddress: {
								type: "object",
								description: "Detailed information about the address",
								shape: {
									/**
									 * Post code
									 *
									 * The identifier for an addressable group of properties according to the relevant postal service.
									 *
									 * Such as a ZIP code or a post code.
									 */
									postCode: {
										type: "string",
										description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									},
									/**
									 * Address line 1
									 *
									 * The main address line in an address.
									 *
									 * Usually the street name and number or post office box.
									 */
									line1: {
										type: "string",
										description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:LineOne",
									},
									/**
									 * Address line 2
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line2: {
										type: "string",
										description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									},
									/**
									 * Address line 3
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line3: {
										type: "string",
										description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:LineThree",
									},
									/**
									 * City
									 *
									 * The common name of the city, town or village.
									 */
									city: {
										type: "string",
										description: `**City**

The common name of the city, town or village.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:CityName",
									},
									/**
									 * Country code
									 *
									 * A code that identifies the country.
									 *
									 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										type: "string",
										description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:CountryID",
									},
									/**
									 * Country subdivision
									 *
									 * The subdivision of a country.
									 *
									 * Such as a region, a county, a state, a province, etc.
									 */
									countrySubdivision: {
										type: "string",
										description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
									},
									/**
									 * Details about the electronic address
									 */
									electronicAddress: {
										type: "object",
										description: "Details about the electronic address",
										required: false,
										shape: {
											/**
											 * Electronic address
											 */
											value: {
												type: "string",
												description: "Electronic address",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:URIUniversalCommunication/ram:URIID",
											},
											/**
											 * Scheme identifier
											 */
											schemeIdentifier: {
												type: "string",
												description: "Scheme identifier",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
											},
										},
									},
								},
							},
							/**
							 * Detailed information on tax information
							 */
							taxRegistration: {
								type: "object",
								description: "Detailed information on tax information",
								required: false,
								shape: {
									/**
									 * VAT ID
									 */
									identifier: {
										type: "string",
										description: "VAT ID",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID":
												"VA",
										},
									},
								},
							},
						},
					},
					/**
					 * Detailed information about the buyer tax representative
					 */
					buyerTaxRepresentative: {
						type: "object",
						description:
							"Detailed information about the buyer tax representative",
						required: false,
						shape: {
							/**
							 * Identifier
							 *
							 * A previously exchanged assigned identifier of the business partner.
							 */
							identifier: {
								type: "string",
								description: `**Identifier**

A previously exchanged assigned identifier of the business partner.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:ID",
							},
							/**
							 * Global identifier
							 *
							 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
							 */
							globalIdentifier: {
								type: "object",
								description: `**Global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
								required: false,
								shape: {
									/**
									 * Global identifier
									 *
									 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
									 */
									value: {
										type: "string",
										description: `**Global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:GlobalID",
									},
									/**
									 * Scheme identifier
									 *
									 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
									 */
									schemeIdentifier: {
										type: "string",
										description: `**Scheme identifier**

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:GlobalID/@schemeID",
									},
								},
							},
							/**
							 * Identifier Name / Company Name
							 */
							name: {
								type: "string",
								description: "Identifier Name / Company Name",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:Name",
							},
							/**
							 * Role (code)
							 *
							 * A code qualifying the role
							 *
							 * To be chosen from UNTDID 3035.
							 */
							typeCode: {
								type: "string",
								description: `**Role (code)**

A code qualifying the role

To be chosen from UNTDID 3035.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:RoleCode",
							},
							/**
							 * Details about the organization
							 */
							organization: {
								type: "object",
								description: "Details about the organization",
								required: false,
								shape: {
									/**
									 * Company Registration Number
									 *
									 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
									 */
									identifier: {
										type: "object",
										description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
										required: false,
										shape: {
											/**
											 * Company Registration Number
											 *
											 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
											 */
											value: {
												type: "string",
												description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Buyer legal registration identifier.
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

The identification scheme identifier of the Buyer legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
									/**
									 * Trading Business Name
									 *
									 * A name by which the party is known, other than party name (also known as business name).
									 *
									 * This may be used if different from the party name.
									 */
									businessName: {
										type: "string",
										description: `**Trading Business Name**

A name by which the party is known, other than party name (also known as business name).

This may be used if different from the party name.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									},
									/**
									 * Detailed information about the business address
									 */
									postalAddress: {
										type: "object",
										description:
											"Detailed information about the business address",
										required: false,
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
										},
									},
								},
							},
							/**
							 * Detailed contact information of the deviating end user
							 */
							tradeContact: {
								type: "object",
								description:
									"Detailed contact information of the deviating end user",
								required: false,
								shape: {
									/**
									 * Name of the contact
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									name: {
										type: "string",
										description: `**Name of the contact**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:PersonName",
									},
									/**
									 * Department name
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									departmentName: {
										type: "string",
										description: `**Department name**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
									},
									/**
									 * Type of contact (code)
									 *
									 * The code specifying the type of trade contact
									 *
									 * To be chosen from the entries of UNTDID 3139
									 */
									typeCode: {
										type: "string",
										description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
									},
									/**
									 * Contact telephone number
									 *
									 * A phone number for the contact point.
									 */
									telephoneNumber: {
										type: "string",
										description: `**Contact telephone number**

A phone number for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact point fax number
									 */
									faxNumber: {
										type: "string",
										description: "Contact point fax number",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact email address
									 *
									 * An e-mail address for the contact point.
									 */
									emailAddress: {
										type: "string",
										description: `**Contact email address**

An e-mail address for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
									},
								},
							},
							/**
							 * Detailed information about the address
							 */
							postalAddress: {
								type: "object",
								description: "Detailed information about the address",
								shape: {
									/**
									 * Post code
									 *
									 * The identifier for an addressable group of properties according to the relevant postal service.
									 *
									 * Such as a ZIP code or a post code.
									 */
									postCode: {
										type: "string",
										description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									},
									/**
									 * Address line 1
									 *
									 * The main address line in an address.
									 *
									 * Usually the street name and number or post office box.
									 */
									line1: {
										type: "string",
										description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineOne",
									},
									/**
									 * Address line 2
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line2: {
										type: "string",
										description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									},
									/**
									 * Address line 3
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line3: {
										type: "string",
										description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineThree",
									},
									/**
									 * City
									 *
									 * The common name of the city, town or village.
									 */
									city: {
										type: "string",
										description: `**City**

The common name of the city, town or village.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CityName",
									},
									/**
									 * Country code
									 *
									 * A code that identifies the country.
									 *
									 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										type: "string",
										description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CountryID",
									},
									/**
									 * Country subdivision
									 *
									 * The subdivision of a country.
									 *
									 * Such as a region, a county, a state, a province, etc.
									 */
									countrySubdivision: {
										type: "string",
										description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
									},
									/**
									 * Details about the electronic address
									 */
									electronicAddress: {
										type: "object",
										description: "Details about the electronic address",
										required: false,
										shape: {
											/**
											 * Electronic address
											 */
											value: {
												type: "string",
												description: "Electronic address",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:URIUniversalCommunication/ram:URIID",
											},
											/**
											 * Scheme identifier
											 */
											schemeIdentifier: {
												type: "string",
												description: "Scheme identifier",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
											},
										},
									},
								},
							},
							/**
							 * Detailed information on tax information
							 */
							taxRegistration: {
								type: "object",
								description: "Detailed information on tax information",
								required: false,
								shape: {
									/**
									 * VAT ID
									 */
									identifier: {
										type: "string",
										description: "VAT ID",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID":
												"VA",
										},
									},
								},
							},
						},
					},
					sellerTaxRepresentative: {
						type: "object",
						shape: {
							/**
							 * Identifier
							 *
							 * A previously exchanged assigned identifier of the business partner.
							 */
							identifier: {
								type: "string",
								description: `**Identifier**

A previously exchanged assigned identifier of the business partner.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:ID",
							},
							/**
							 * Global identifier
							 *
							 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
							 */
							globalIdentifier: {
								type: "object",
								description: `**Global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
								required: false,
								shape: {
									/**
									 * Global identifier
									 *
									 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
									 */
									value: {
										type: "string",
										description: `**Global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:GlobalID",
									},
									/**
									 * Scheme identifier
									 *
									 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
									 */
									schemeIdentifier: {
										type: "string",
										description: `**Scheme identifier**

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:GlobalID/@schemeID",
									},
								},
							},
							/**
							 * Role (code)
							 *
							 * A code qualifying the role
							 *
							 * To be chosen from UNTDID 3035.
							 */
							typeCode: {
								type: "string",
								description: `**Role (code)**

A code qualifying the role

To be chosen from UNTDID 3035.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:RoleCode",
							},
							/**
							 * Details about the organization
							 */
							organization: {
								type: "object",
								description: "Details about the organization",
								required: false,
								shape: {
									/**
									 * Legal registration identifier
									 *
									 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
									 */
									identifier: {
										type: "object",
										description: `**Legal registration identifier**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
										required: false,
										shape: {
											/**
											 * Legal registration identifier
											 *
											 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
											 */
											value: {
												type: "string",
												description: `**Legal registration identifier**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Buyer legal registration identifier.
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

The identification scheme identifier of the Buyer legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
									/**
									 * Trading name
									 *
									 * A name by which the party is known, other than party name (also known as business name).
									 *
									 * This may be used if different from the party name.
									 */
									businessName: {
										type: "string",
										description: `**Trading name**

A name by which the party is known, other than party name (also known as business name).

This may be used if different from the party name.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									},
									/**
									 * Detailed information about the business address
									 */
									postalAddress: {
										type: "object",
										description:
											"Detailed information about the business address",
										required: false,
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
										},
									},
								},
							},
							/**
							 * Detailed contact information
							 */
							tradeContact: {
								type: "object",
								description: "Detailed contact information",
								required: false,
								shape: {
									/**
									 * Name of the contact
									 */
									name: {
										type: "string",
										description: "Name of the contact",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:PersonName",
									},
									/**
									 * Department name
									 */
									departmentName: {
										type: "string",
										description: "Department name",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
									},
									/**
									 * Type of contact (code)
									 *
									 * The code specifying the type of trade contact
									 *
									 * To be chosen from the entries of UNTDID 3139
									 */
									typeCode: {
										type: "string",
										description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
									},
									/**
									 * Contact telephone number
									 *
									 * A phone number for the contact point.
									 */
									telephoneNumber: {
										type: "string",
										description: `**Contact telephone number**

A phone number for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact point fax number
									 */
									faxNumber: {
										type: "string",
										description: "Contact point fax number",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact email address
									 *
									 * An e-mail address for the contact point.
									 */
									emailAddress: {
										type: "string",
										description: `**Contact email address**

An e-mail address for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
									},
								},
							},
							postalAddress: {
								type: "object",
								shape: {
									/**
									 * Details about the electronic address
									 */
									electronicAddress: {
										type: "object",
										description: "Details about the electronic address",
										required: false,
										shape: {
											/**
											 * Electronic address
											 */
											value: {
												type: "string",
												description: "Electronic address",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:URIUniversalCommunication/ram:URIID",
											},
											/**
											 * Scheme identifier
											 */
											schemeIdentifier: {
												type: "string",
												description: "Scheme identifier",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
											},
										},
									},
								},
							},
						},
					},
					/**
					 * Detailed information about the deviating end user
					 */
					productEndUser: {
						type: "object",
						description: "Detailed information about the deviating end user",
						required: false,
						shape: {
							/**
							 * Deviating end user identifier
							 *
							 * A previously exchanged assigned identifier of the business partner.
							 */
							identifier: {
								type: "string",
								description: `**Deviating end user identifier**

A previously exchanged assigned identifier of the business partner.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:ID",
							},
							/**
							 * Deviating end user global identifier
							 *
							 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
							 */
							globalIdentifier: {
								type: "object",
								description: `**Deviating end user global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
								required: false,
								shape: {
									/**
									 * Deviating end user global identifier
									 *
									 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
									 */
									value: {
										type: "string",
										description: `**Deviating end user global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:GlobalID",
									},
									/**
									 * Scheme identifier
									 *
									 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
									 */
									schemeIdentifier: {
										type: "string",
										description: `**Scheme identifier**

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:GlobalID/@schemeID",
									},
								},
							},
							/**
							 * Deviating end user identifier Name / Company Name
							 */
							name: {
								type: "string",
								description: `Deviating end user identifier Name / Company Name`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:Name",
							},
							/**
							 * Role (code)
							 *
							 * A code qualifying the role
							 *
							 * To be chosen from UNTDID 3035.
							 */
							typeCode: {
								type: "string",
								description: `**Role (code)**

A code qualifying the role

To be chosen from UNTDID 3035.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:RoleCode",
							},
							/**
							 * Details about the organization
							 */
							organization: {
								type: "object",
								description: "Details about the organization",
								required: false,
								shape: {
									/**
									 * Company Registration Number
									 *
									 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
									 */
									identifier: {
										type: "object",
										description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
										required: false,
										shape: {
											/**
											 * Company Registration Number
											 *
											 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
											 */
											value: {
												type: "string",
												description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Buyer legal registration identifier.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

The identification scheme identifier of the Buyer legal registration identifier.`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
									/**
									 * Trading Business Name
									 *
									 * A name by which the party is known, other than party name (also known as business name).
									 *
									 * This may be used if different from the party name.
									 */
									businessName: {
										type: "string",
										description: `**Trading Business Name**

A name by which the party is known, other than party name (also known as business name).

This may be used if different from the party name.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									},
									/**
									 * Detailed information about the business address
									 */
									postalAddress: {
										type: "object",
										description:
											"Detailed information about the business address",
										required: false,
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
										},
									},
								},
							},
							/**
							 * Detailed contact information of the deviating end user
							 */
							tradeContact: {
								type: "object",
								description:
									"Detailed contact information of the deviating end user",
								required: false,
								shape: {
									/**
									 * Name of the contact
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									name: {
										type: "string",
										description: `**Name of the contact**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:PersonName",
									},
									/**
									 * Department name
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									departmentName: {
										type: "string",
										description: `**Department name**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
									},
									/**
									 * Type of contact (code)
									 *
									 * The code specifying the type of trade contact
									 *
									 * To be chosen from the entries of UNTDID 3139
									 */
									typeCode: {
										type: "string",
										description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:TypeCode",
									},
									/**
									 * Contact telephone number, value
									 *
									 * A phone number for the contact point.
									 */
									telephoneNumber: {
										type: "string",
										description: `**Contact telephone number, value**

A phone number for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact point fax number
									 */
									faxNumber: {
										type: "string",
										description: "Contact point fax number",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact email address
									 *
									 * An e-mail address for the contact point.
									 */
									emailAddress: {
										type: "string",
										description: `**Contact email address**

An e-mail address for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
									},
								},
							},
							/**
							 * Detailed information about the address of the deviating end user
							 */
							postalAddress: {
								type: "object",
								description:
									"Detailed information about the address of the deviating end user",
								shape: {
									/**
									 * Post code
									 *
									 * The identifier for an addressable group of properties according to the relevant postal service.
									 *
									 * Such as a ZIP code or a post code.
									 */
									postCode: {
										type: "string",
										description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									},
									/**
									 * Address line 1
									 *
									 * The main address line in an address.
									 *
									 * Usually the street name and number or post office box.
									 */
									line1: {
										type: "string",
										description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:LineOne",
									},
									/**
									 * Address line 2
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line2: {
										type: "string",
										description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									},
									/**
									 * Address line 3
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line3: {
										type: "string",
										description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:LineThree",
									},
									/**
									 * City
									 *
									 * The common name of the city, town or village.
									 */
									city: {
										type: "string",
										description: `**City**

The common name of the city, town or village.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:CityName",
									},
									/**
									 * Country code
									 *
									 * A code that identifies the country.
									 *
									 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										type: "string",
										description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:CountryID",
									},
									/**
									 * Country subdivision
									 *
									 * The subdivision of a country.
									 *
									 * Such as a region, a county, a state, a province, etc.
									 */
									countrySubdivision: {
										type: "string",
										description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
									},
									/**
									 * Details about the electronic address
									 */
									electronicAddress: {
										type: "object",
										description: "Details about the electronic address",
										required: false,
										shape: {
											/**
											 * Electronic address
											 */
											value: {
												type: "string",
												description: "Electronic address",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:URIUniversalCommunication/ram:URIID",
											},
											/**
											 * Scheme identifier
											 */
											schemeIdentifier: {
												type: "string",
												description: "Scheme identifier",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
											},
										},
									},
								},
							},
							/**
							 * Detailed information on tax information
							 */
							taxRegistration: {
								type: "object",
								description: "Detailed information on tax information",
								required: false,
								shape: {
									/**
									 * VAT ID
									 */
									identifier: {
										type: "string",
										description: "VAT ID",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID":
												"VA",
										},
									},
								},
							},
						},
					},
					/**
					 * Details of the delivery conditions
					 */
					tradeDeliveryTerms: {
						type: "object",
						description: "Details of the delivery conditions",
						required: false,
						shape: {
							/**
							 * Delivery condition (Code)
							 *
							 * The code specifying the type of delivery for these trade delivery terms.
							 *
							 * To be chosen from the entries in UNTDID 4053 + INCOTERMS List
							 */
							typeCode: {
								type: "string",
								description: `**Delivery condition (Code)**

The code specifying the type of delivery for these trade delivery terms.

To be chosen from the entries in UNTDID 4053 + INCOTERMS List`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:DeliveryTypeCode",
							},
						},
					},
					associatedOrderConfirmation: {
						type: "object",
						shape: {
							/**
							 * Order confirmation date
							 */
							date: {
								type: "date",
								description: "Order confirmation date",
								required: false,
								transform: {
									input: dateTimeStringFormatter,
								},
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
										"102",
								},
							},
						},
					},
					associatedOrder: {
						type: "object",
						shape: {
							/**
							 * Order Date
							 */
							date: {
								type: "date",
								description: "Order Date",
								required: false,
								transform: {
									input: dateTimeStringFormatter,
								},
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
										"102",
								},
							},
						},
					},
					/**
					 * Details on referenced quotation
					 */
					quotationReference: {
						type: "object[]",
						description: "Details on referenced quotation",
						required: false,
						group: "quotation-reference",
						shape: {
							/**
							 * Quotation number
							 */
							issuerAssignedID: {
								type: "string",
								description: "Quotation number",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:QuotationReferencedDocument[quotation-reference]/ram:IssuerAssignedID",
							},
							/**
							 * Document date
							 */
							date: {
								type: "date",
								description: "Document date",
								required: false,
								transform: {
									input: dateTimeStringFormatter,
								},
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:QuotationReferencedDocument[quotation-reference]/ram:FormattedIssueDateTime/qdt:DateTimeString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:QuotationReferencedDocument[quotation-reference]/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
										"102",
								},
							},
						},
					},
					associatedContract: {
						type: "object",
						shape: {
							/**
							 * Type of contract (code)
							 *
							 * Use codes from UNTDID 1153
							 *
							 * CHORUSPRO: To qualify a contract (CT) or a procurement contract "Marché" (BC)
							 */
							typeCode: {
								type: UNTDID_1153.map(({ code }) => code),
								description: `**Type of contract (code)**

Use codes from UNTDID 1153

CHORUSPRO: To qualify a contract (CT) or a procurement contract "Marché" (BC)`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ContractReferencedDocument/ram:ReferenceTypeCode",
							},
							/**
							 * Contract Date
							 */
							date: {
								type: "date",
								description: "Contract Date",
								required: false,
								transform: {
									input: dateTimeStringFormatter,
								},
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
										"102",
								},
							},
						},
					},
					supportingDocuments: {
						type: "object[]",
						shape: {
							/**
							 * Document date
							 */
							date: {
								type: "date",
								description: "Document date",
								required: false,
								transform: {
									input: dateTimeStringFormatter,
								},
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[supporting-documents]/ram:FormattedIssueDateTime/qdt:DateTimeString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[supporting-documents]/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
										"102",
								},
							},
						},
					},
					tenderOrLotReference: {
						type: "object[]",
						shape: {
							/**
							 * Document date
							 */
							date: {
								type: "date",
								description: "Document date",
								required: false,
								transform: {
									input: dateTimeStringFormatter,
								},
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[tender-lot-reference]/ram:FormattedIssueDateTime/qdt:DateTimeString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[tender-lot-reference]/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
										"102",
								},
							},
						},
					},
					objectIdentifier: {
						type: "object[]",
						shape: {
							/**
							 * Document date
							 */
							date: {
								type: "date",
								description: "Document date",
								transform: {
									input: dateTimeStringFormatter,
								},
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[object-identifier]/ram:FormattedIssueDateTime/qdt:DateTimeString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[object-identifier]/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
										"102",
								},
							},
						},
					},
					/**
					 * Detailed information about the buyer agent
					 */
					buyerAgent: {
						type: "object",
						description: "Detailed information about the buyer agent",
						required: false,
						shape: {
							/**
							 * Identifier
							 *
							 * A previously exchanged assigned identifier of the business partner.
							 */
							identifier: {
								type: "string",
								description: `**Identifier**

A previously exchanged assigned identifier of the business partner.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:ID",
							},
							/**
							 * Global identifier
							 *
							 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
							 */
							globalIdentifier: {
								type: "object",
								description: `**Global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
								required: false,
								shape: {
									/**
									 * Global identifier
									 *
									 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
									 */
									value: {
										type: "string",
										description: `**Global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:GlobalID",
									},
									/**
									 * Scheme identifier
									 *
									 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
									 */
									schemeIdentifier: {
										type: "string",
										description: `**Scheme identifier**

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:GlobalID/@schemeID",
									},
								},
							},
							/**
							 * Name / Company Name
							 */
							name: {
								type: "string",
								description: "Name / Company Name",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:Name",
							},
							/**
							 * Role (code)
							 *
							 * A code qualifying the role
							 *
							 * To be chosen from UNTDID 3035.
							 */
							typeCode: {
								type: "string",
								description: `**Role (code)**

A code qualifying the role

To be chosen from UNTDID 3035.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:RoleCode",
							},
							/**
							 * Details about the organization
							 */
							organization: {
								type: "object",
								description: "Details about the organization",
								required: false,
								shape: {
									/**
									 * Company Registration Number
									 *
									 * The identification scheme identifier of the Buyer Agent legal registration identifier.
									 *
									 * If the identification scheme is used, it must be selected from the entries in the list published by the ISO/IEC 6523 Maintenance Agency.
									 */
									identifier: {
										type: "object",
										description: `**Company Registration Number**

The identification scheme identifier of the Buyer Agent legal registration identifier.

If the identification scheme is used, it must be selected from the entries in the list published by the ISO/IEC 6523 Maintenance Agency.`,
										required: false,
										shape: {
											/**
											 * Company Registration Number
											 *
											 * The identification scheme identifier of the Buyer Agent legal registration identifier.
											 *
											 * If the identification scheme is used, it must be selected from the entries in the list published by the ISO/IEC 6523 Maintenance Agency.
											 */
											value: {
												type: "string",
												description: `**Company Registration Number**

The identification scheme identifier of the Buyer Agent legal registration identifier.

If the identification scheme is used, it must be selected from the entries in the list published by the ISO/IEC 6523 Maintenance Agency.`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Buyer Agent legal registration identifier.
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

The identification scheme identifier of the Buyer Agent legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
									/**
									 * Trading Business Name
									 *
									 * A name by which the party is known, other than party name (also known as business name).
									 *
									 * This may be used if different from the party name.
									 */
									businessName: {
										type: "string",
										description: `**Trading Business Name**

A name by which the party is known, other than party name (also known as business name).

This may be used if different from the party name.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									},
									/**
									 * Detailed information about the business address
									 */
									postalAddress: {
										type: "object",
										description:
											"Detailed information about the business address",
										required: false,
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
										},
									},
								},
							},
							/**
							 * Detailed contact information of the deviating buyer agent
							 */
							tradeContact: {
								type: "object",
								description:
									"Detailed contact information of the deviating buyer agent",
								required: false,
								shape: {
									/**
									 * Name of the contact
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									name: {
										type: "string",
										description: `**Name of the contact**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:PersonName",
									},
									/**
									 * Department name
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									departmentName: {
										type: "string",
										description: `**Department name**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
									},
									/**
									 * Type of contact (code)
									 *
									 * The code specifying the type of trade contact
									 *
									 * To be chosen from the entries of UNTDID 3139
									 */
									typeCode: {
										type: "string",
										description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:TypeCode",
									},
									/**
									 * Contact telephone number
									 *
									 * A phone number for the contact point.
									 */
									telephoneNumber: {
										type: "string",
										description: `**Contact telephone number**

A phone number for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact point fax number
									 */
									faxNumber: {
										type: "string",
										description: "Contact point fax number",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact email address
									 */
									emailAddress: {
										type: "string",
										description: "Contact email address",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
									},
								},
							},
							/**
							 * Detailed information about the address
							 */
							postalAddress: {
								type: "object",
								description: "Detailed information about the address",
								shape: {
									/**
									 * Post code
									 *
									 * The identifier for an addressable group of properties according to the relevant postal service.
									 *
									 * Such as a ZIP code or a post code.
									 */
									postCode: {
										type: "string",
										description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									},
									/**
									 * Address line 1
									 *
									 * The main address line in an address.
									 *
									 * Usually the street name and number or post office box.
									 */
									line1: {
										type: "string",
										description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:LineOne",
									},
									/**
									 * Address line 2
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line2: {
										type: "string",
										description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									},
									/**
									 * Address line 3
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line3: {
										type: "string",
										description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:LineThree",
									},
									/**
									 * City
									 *
									 * The common name of the city, town or village.
									 */
									city: {
										type: "string",
										description: `**City**

The common name of the city, town or village.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:CityName",
									},
									/**
									 * Country code
									 *
									 * A code that identifies the country.
									 *
									 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										type: "string",
										description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:CountryID",
									},
									/**
									 * Country subdivision
									 *
									 * The subdivision of a country.
									 *
									 * Such as a region, a county, a state, a province, etc.
									 */
									countrySubdivision: {
										type: "string",
										description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
									},
									/**
									 * Details about the electronic address
									 */
									electronicAddress: {
										type: "object",
										description: "Details about the electronic address",
										required: false,
										shape: {
											/**
											 * Electronic address
											 */
											value: {
												type: "string",
												description: "Electronic address",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:URIUniversalCommunication/ram:URIID",
											},
											/**
											 * Scheme identifier
											 */
											schemeIdentifier: {
												type: "string",
												description: "Scheme identifier",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
											},
										},
									},
									/**
									 * Detailed information on tax information
									 */
									taxRegistration: {
										type: "object",
										description: "Detailed information on tax information",
										required: false,
										shape: {
											/**
											 * VAT ID
											 */
											identifier: {
												type: "string",
												description: "VAT ID",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
												additionalXml: {
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID":
														"VA",
												},
											},
										},
									},
								},
							},
						},
					},
					/**
					 * Details on referenced customer order
					 */
					customerOrderReference: {
						type: "object[]",
						group: "customer-order-reference",
						description: "Details on referenced customer order",
						required: false,
						shape: {
							/**
							 * Ultimate Customer Order number of the final customer
							 */
							issuerAssignedID: {
								type: "string",
								description:
									"Ultimate Customer Order number of the final customer",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:IssuerAssignedID",
							},
							/**
							 * Document date
							 */
							date: {
								type: "date",
								description: "Document date",
								required: false,
								transform: {
									input: dateTimeStringFormatter,
								},
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
										"102",
								},
							},
						},
					},
				},
			},
			tradeDelivery: {
				type: "object",
				shape: {
					/**
					 * Related SupplyChain Consignment
					 *
					 * A consignment, at header level, related to this trade delivery.
					 */
					relatedConsignment: {
						type: "object",
						description: `**Related SupplyChain Consignment**

A consignment, at header level, related to this trade delivery.`,
						required: false,
						shape: {
							/**
							 * Specified Logistics Transport Movement
							 *
							 * The code specifying the mode, such as air, sea, rail, road or inland waterway, for this logistics transport movement.
							 */
							transportMovement: {
								type: "string",
								description: `**Specified Logistics Transport Movement**

The code specifying the mode, such as air, sea, rail, road or inland waterway, for this logistics transport movement.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:RelatedSupplyChainConsignment/ram:SpecifiedLogisticsTransportMovement",
							},
							/**
							 * Delivery method (Code)
							 *
							 * A logistics transport movement specified for this supply chain consignment.
							 */
							deliveryMethod: {
								type: "string",
								description: `**Delivery method (Code)**

A logistics transport movement specified for this supply chain consignment.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:RelatedSupplyChainConsignment/ram:SpecifiedLogisticsTransportMovement/ram:ModeCode",
							},
						},
					},
					shipTo: {
						type: "object",
						shape: {
							/**
							 * Role (code)
							 *
							 * A code qualifying the role
							 *
							 * To be chosen from UNTDID 3035, for instance:
							 * - DL: Factor
							 * - DS: Distributor
							 * - MOP: Market operator
							 */
							typeCode: {
								type: "string",
								description: `**Role (code)**

A code qualifying the role

To be chosen from UNTDID 3035, for instance:
- DL: Factor
- DS: Distributor
- MOP: Market operator`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:RoleCode",
							},
							/**
							 * Details about the organization
							 */
							organization: {
								type: "object",
								description: "Details about the organization",
								required: false,
								shape: {
									/**
									 * Legal registration identifier
									 *
									 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
									 */
									identifier: {
										type: "object",
										description: `**Legal registration identifier**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
										required: false,
										shape: {
											/**
											 * Legal registration identifier
											 *
											 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
											 */
											value: {
												type: "string",
												description: `**Legal registration identifier**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Buyer legal registration identifier.
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

The identification scheme identifier of the Buyer legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
									/**
									 * Trading name
									 *
									 * A name by which the party is known, other than party name (also known as business name).
									 *
									 * This may be used if different from the party name.
									 */
									tradingName: {
										type: "string",
										description: `**Trading name**

A name by which the party is known, other than party name (also known as business name).

This may be used if different from the party name.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									},
									/**
									 * Detailed information about the business address
									 */
									postalAddress: {
										type: "object",
										description:
											"Detailed information about the business address",
										required: false,
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
										},
									},
								},
							},
							/**
							 * Detailed contact information
							 */
							tradeContact: {
								type: "object",
								description: "Detailed contact information",
								required: false,
								shape: {
									/**
									 * Name of the contact
									 */
									name: {
										type: "string",
										description: "Name of the contact",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:PersonName",
									},
									/**
									 * Department name
									 */
									departmentName: {
										type: "string",
										description: "Department name",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
									},
									/**
									 * Type of contact (code)
									 *
									 * The code specifying the type of trade contact
									 *
									 * To be chosen from the entries of UNTDID 3139
									 */
									typeCode: {
										type: "string",
										description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode",
									},
									/**
									 * Contact telephone number
									 *
									 * A phone number for the contact point.
									 */
									telephoneNumber: {
										type: "string",
										description: `**Contact telephone number**

A phone number for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact point fax number
									 */
									faxNumber: {
										type: "string",
										description: "Contact point fax number",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact email address
									 *
									 * An e-mail address for the contact point.
									 */
									emailAddress: {
										type: "string",
										description: `**Contact email address**

An e-mail address for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
									},
								},
							},
							postalAddress: {
								type: "object",
								shape: {
									/**
									 * Details about the electronic address
									 */
									electronicAddress: {
										type: "object",
										description: "Details about the electronic address",
										required: false,
										shape: {
											/**
											 * Electronic address
											 */
											value: {
												type: "string",
												description: "Electronic address",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:URIUniversalCommunication/ram:URIID",
											},
											/**
											 * Scheme identifier
											 */
											schemeIdentifier: {
												type: "string",
												description: "Scheme identifier",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
											},
										},
									},
								},
							},
							/**
							 * Detailed information on tax information of the goods recipient
							 */
							taxRegistration: {
								type: "object",
								description:
									"Detailed information on tax information of the goods recipient",
								required: false,
								shape: {
									/**
									 * VAT identifier
									 */
									identifier: {
										type: "string",
										description: "VAT identifier",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID":
												"VA",
										},
									},
								},
							},
						},
					},
					/**
					 * Detailed information about the final recipient
					 */
					finalShipTo: {
						type: "object",
						description: "Detailed information about the final recipient",
						required: false,
						shape: {
							/**
							 * Final recipient identifier
							 */
							identifier: {
								type: "string",
								description: "Final recipient identifier",
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:ID",
							},
							/**
							 * Final recipient global identifier
							 *
							 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
							 */
							globalIdentifier: {
								type: "object",
								description: `**Final recipient global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
								required: false,
								shape: {
									/**
									 * Final recipient global identifier
									 *
									 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
									 */
									value: {
										type: "string",
										description: `**Final recipient global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:GlobalID",
									},
									/**
									 * Scheme identifier
									 *
									 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
									 */
									schemeIdentifier: {
										type: "string",
										description: `**Scheme identifier**

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:GlobalID/@schemeID",
									},
								},
							},
							/**
							 * Final Recipient Name / Company Name
							 */
							name: {
								type: "string",
								description: "Final Recipient Name / Company Name",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:Name",
							},
							/**
							 * Role (code)
							 *
							 * A code qualifying the role
							 *
							 * To be chosen from UNTDID 3035.
							 */
							typeCode: {
								type: "string",
								description: `**Role (code)**

A code qualifying the role

To be chosen from UNTDID 3035.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:RoleCode",
							},
							/**
							 * Details about the organization
							 */
							organization: {
								type: "object",
								description: "Details about the organization",
								required: false,
								shape: {
									/**
									 * Company Registration Number
									 *
									 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
									 */
									identifier: {
										type: "object",
										description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
										required: false,
										shape: {
											/**
											 * Company Registration Number
											 *
											 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
											 */
											value: {
												type: "string",
												description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Buyer legal registration identifier.
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

The identification scheme identifier of the Buyer legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
									/**
									 * Trading Business Name
									 *
									 * A name by which the party is known, other than party name (also known as business name).
									 *
									 * This may be used if different from the party name.
									 */
									businessName: {
										type: "string",
										description: `**Trading Business Name**

A name by which the party is known, other than party name (also known as business name).

This may be used if different from the party name.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									},
									/**
									 * Detailed information about the business address
									 */
									postalAddress: {
										type: "object",
										description:
											"Detailed information about the business address",
										required: false,
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
										},
									},
								},
							},
							/**
							 * Detailed contact information
							 */
							tradeContact: {
								type: "object",
								description: "Detailed contact information",
								required: false,
								shape: {
									/**
									 * Name of the contact
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									name: {
										type: "string",
										description: `**Name of the contact**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:PersonName",
									},
									/**
									 * Department name
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									departmentName: {
										type: "string",
										description: `**Department name**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
									},
									/**
									 * Type of contact (code)
									 *
									 * The code specifying the type of trade contact
									 *
									 * To be chosen from the entries of UNTDID 3139
									 */
									typeCode: {
										type: "string",
										description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode",
									},
									/**
									 * Contact telephone number
									 *
									 * A phone number for the contact point.
									 */
									telephoneNumber: {
										type: "string",
										description: `**Contact telephone number**

A phone number for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact point fax number
									 */
									faxNumber: {
										type: "string",
										description: "Contact point fax number",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact email address
									 *
									 * An e-mail address for the contact point.
									 */
									emailAddress: {
										type: "string",
										description: `**Contact email address**

An e-mail address for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
									},
								},
							},
							/**
							 * Detailed information about the address of the final recipient
							 */
							postalAddress: {
								type: "object",
								description:
									"Detailed information about the address of the final recipient",
								shape: {
									/**
									 * Post code
									 *
									 * The identifier for an addressable group of properties according to the relevant postal service.
									 *
									 * Such as a ZIP code or a post code.
									 */
									postCode: {
										type: "string",
										description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									},
									/**
									 * Address line 1
									 *
									 * The main address line in an address.
									 *
									 * Usually the street name and number or post office box.
									 */
									line1: {
										type: "string",
										description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
									},
									/**
									 * Address line 2
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line2: {
										type: "string",
										description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									},
									/**
									 * Address line 3
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line3: {
										type: "string",
										description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
									},
									/**
									 * City
									 *
									 * The common name of the city, town or village.
									 */
									city: {
										type: "string",
										description: `**City**

The common name of the city, town or village.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
									},
									/**
									 * Country code
									 *
									 * A code that identifies the country.
									 *
									 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										type: "string",
										description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
									},
									/**
									 * Country subdivision
									 *
									 * The subdivision of a country.
									 *
									 * Such as a region, a county, a state, a province, etc.
									 */
									countrySubdivision: {
										type: "string",
										description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
									},
									/**
									 * Details about the electronic address
									 */
									electronicAddress: {
										type: "object",
										description: "Details about the electronic address",
										required: false,
										shape: {
											/**
											 * Electronic address
											 */
											value: {
												type: "string",
												description: "Electronic address",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:URIUniversalCommunication/ram:URIID",
											},
											/**
											 * Scheme identifier
											 */
											schemeIdentifier: {
												type: "string",
												description: "Scheme identifier",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
											},
										},
									},
								},
							},
							/**
							 * Detailed information on tax information
							 */
							taxRegistration: {
								type: "object",
								description: "Detailed information on tax information",
								required: false,
								shape: {
									/**
									 * VAT ID
									 */
									identifier: {
										type: "string",
										description: "VAT ID",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID":
												"VA",
										},
									},
								},
							},
						},
					},
					/**
					 * Identification of the deviating sender
					 */
					shipFrom: {
						type: "object",
						description: "Identification of the deviating sender",
						required: false,
						shape: {
							/**
							 * Deviating sender identifier
							 */
							identifier: {
								type: "string",
								description: "Deviating sender identifier",
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:ID",
							},
							/**
							 * Deviating sender global identifier
							 *
							 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
							 */
							globalIdentifier: {
								type: "object",
								required: false,
								description: `**Deviating sender global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
								shape: {
									/**
									 * Deviating sender global identifier
									 *
									 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
									 */
									value: {
										type: "string",
										description: `**Deviating sender global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:GlobalID",
									},
									/**
									 * Scheme identifier
									 *
									 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
									 */
									schemeIdentifier: {
										type: "string",
										description: `**Scheme identifier**

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:GlobalID/@schemeID",
									},
								},
							},
							/**
							 * Deviating sender name / company name
							 */
							name: {
								type: "string",
								description: "Deviating sender name / company name",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:Name",
							},
							/**
							 * Role (code)
							 *
							 * A code qualifying the role
							 *
							 * To be chosen from UNTDID 3035.
							 */
							typeCode: {
								type: "string",
								description: `**Role (code)**

A code qualifying the role

To be chosen from UNTDID 3035.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:RoleCode",
							},
							/**
							 * Details about the organization
							 */
							organization: {
								type: "object",
								description: "Details about the organization",
								required: false,
								shape: {
									/**
									 * Company Registration Number
									 *
									 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
									 */
									identifier: {
										type: "object",
										description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
										required: false,
										shape: {
											/**
											 * Company Registration Number
											 *
											 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
											 */
											value: {
												type: "string",
												description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Buyer legal registration identifier.
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

The identification scheme identifier of the Buyer legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
									/**
									 * Trading Business Name
									 *
									 * A name by which the party is known, other than party name (also known as business name).
									 *
									 * This may be used if different from the party name.
									 */
									businessName: {
										type: "string",
										description: `**Trading Business Name**

A name by which the party is known, other than party name (also known as business name).

This may be used if different from the party name.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									},
									/**
									 * Detailed information about the business address
									 */
									postalAddress: {
										type: "object",
										description:
											"Detailed information about the business address",
										required: false,
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
										},
									},
								},
							},
							/**
							 * Detailed contact information
							 */
							tradeContact: {
								type: "object",
								description: "Detailed contact information",
								required: false,
								shape: {
									/**
									 * Name of the contact
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									name: {
										type: "string",
										description: `**Name of the contact**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:PersonName",
									},
									/**
									 * Department name
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									departmentName: {
										type: "string",
										description: `**Department name**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
									},
									/**
									 * Type of contact (code)
									 *
									 * The code specifying the type of trade contact
									 *
									 * To be chosen from the entries of UNTDID 3139
									 */
									typeCode: {
										type: "string",
										description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:TypeCode",
									},
									/**
									 * Contact telephone number
									 *
									 * A phone number for the contact point.
									 */
									telephoneNumber: {
										type: "string",
										description: `**Contact telephone number**

A phone number for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact point fax number
									 */
									faxNumber: {
										type: "string",
										description: "Contact point fax number",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact email address
									 *
									 * An e-mail address for the contact point.
									 */
									emailAddress: {
										type: "string",
										description: `**Contact email address**

An e-mail address for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
									},
								},
							},
							/**
							 * Detailed information about the address of the deviating sender
							 */
							postalAddress: {
								type: "object",
								description:
									"Detailed information about the address of the deviating sender",
								shape: {
									/**
									 * Post code
									 *
									 * The identifier for an addressable group of properties according to the relevant postal service.
									 *
									 * Such as a ZIP code or a post code.
									 */
									postCode: {
										type: "string",
										description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									},
									/**
									 * Address line 1
									 *
									 * The main address line in an address.
									 *
									 * Usually the street name and number or post office box.
									 */
									line1: {
										type: "string",
										description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:LineOne",
									},
									/**
									 * Address line 2
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line2: {
										type: "string",
										description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									},
									/**
									 * Address line 3
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line3: {
										type: "string",
										description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:LineThree",
									},
									/**
									 * City
									 *
									 * The common name of the city, town or village.
									 */
									city: {
										type: "string",
										description: `**City**

The common name of the city, town or village.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:CityName",
									},
									/**
									 * Country code
									 *
									 * A code that identifies the country.
									 *
									 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										type: "string",
										description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:CountryID",
									},
									/**
									 * Country subdivision
									 *
									 * The subdivision of a country.
									 *
									 * Such as a region, a county, a state, a province, etc.
									 */
									countrySubdivision: {
										type: "string",
										description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
									},
									/**
									 * Details about the electronic address
									 */
									electronicAddress: {
										type: "object",
										description: "Details about the electronic address",
										required: false,
										shape: {
											/**
											 * Electronic address
											 */
											value: {
												type: "string",
												description: "Electronic address",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:URIUniversalCommunication/ram:URIID",
											},
											/**
											 * Scheme identifier
											 */
											schemeIdentifier: {
												type: "string",
												description: "Scheme identifier",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
											},
										},
									},
								},
							},
							/**
							 * Detailed information on tax information
							 */
							taxRegistration: {
								type: "object",
								description: "Detailed information on tax information",
								required: false,
								shape: {
									/**
									 * VAT ID
									 */
									identifier: {
										type: "string",
										description: "VAT ID",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID":
												"VA",
										},
									},
								},
							},
						},
					},
					despatchAdvice: {
						type: "object",
						shape: {
							/**
							 * Despatch advice date
							 */
							date: {
								type: "date",
								description: "Despatch advice date",
								required: false,
								transform: {
									input: dateTimeStringFormatter,
								},
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
										"102",
								},
							},
						},
					},
					associatedGoodsReceipt: {
						type: "object",
						shape: {
							/**
							 * Goods receipt date
							 */
							date: {
								type: "date",
								description: "Goods receipt date",
								required: false,
								transform: {
									input: dateTimeStringFormatter,
								},
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
										"102",
								},
							},
							/**
							 * Detailed information about the corresponding delivery note
							 */
							deliveryNote: {
								type: "object[]",
								description:
									"Detailed information about the corresponding delivery note",
								required: false,
								group: "delivery-note",
								shape: {
									/**
									 * Delivery note reference
									 */
									issuerAssignedID: {
										type: "string",
										description: "Delivery note reference",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DeliveryNoteReferencedDocument[delivery-note]/ram:IssuerAssignedID",
									},
									/**
									 * Delivery note date
									 */
									date: {
										type: "date",
										description: "Delivery note date",
										required: false,
										transform: {
											input: dateTimeStringFormatter,
										},
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
												"102",
										},
									},
								},
							},
						},
					},
				},
			},
			tradeSettlement: {
				type: "object",
				shape: {
					/**
					 * Seller reference number
					 *
					 * Given seller reference number for routing purposes after biliteral agreement
					 */
					issuerReference: {
						type: "string",
						description: `**Seller reference number**

Given seller reference number for routing purposes after biliteral agreement`,
						required: false,
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceIssuerReference",
					},
					/**
					 * Deviating invoicing party
					 */
					invoicer: {
						type: "object",
						description: "Deviating invoicing party",
						required: false,
						shape: {
							/**
							 * Deviating invoicer identifier
							 */
							identifier: {
								type: "string",
								description: "Deviating invoicer identifier",
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:ID",
							},
							/**
							 * Deviating invoicer global identifier
							 *
							 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
							 */
							globalIdentifier: {
								type: "object",
								description: `**Deviating invoicer global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
								required: false,
								shape: {
									/**
									 * Deviating invoicer global identifier
									 *
									 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
									 */
									value: {
										type: "string",
										description: `**Deviating invoicer global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:GlobalID",
									},
									/**
									 * Scheme identifier
									 *
									 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
									 */
									schemeIdentifier: {
										type: "string",
										description: `**Scheme identifier**

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:GlobalID/@schemeID",
									},
								},
							},
							/**
							 * Name
							 */
							name: {
								type: "string",
								description: "Name",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:Name",
							},
							/**
							 * Role (code)
							 *
							 * A code qualifying the role
							 *
							 * To be chosen from UNTDID 3035.
							 */
							typeCode: {
								type: "string",
								description: `**Role (code)**

A code qualifying the role

To be chosen from UNTDID 3035.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:RoleCode",
							},
							/**
							 * Details about the organization
							 */
							organization: {
								type: "object",
								description: "Details about the organization",
								required: false,
								shape: {
									/**
									 * Company Registration Number
									 *
									 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
									 */
									identifier: {
										type: "object",
										description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
										required: false,
										shape: {
											/**
											 * Company Registration Number
											 *
											 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
											 */
											value: {
												type: "string",
												description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Buyer legal registration identifier.
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

The identification scheme identifier of the Buyer legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
									/**
									 * Trading Business Name
									 *
									 * A name by which the party is known, other than party name (also known as business name).
									 *
									 * This may be used if different from the party name.
									 */
									businessName: {
										type: "string",
										description: `**Trading Business Name**

A name by which the party is known, other than party name (also known as business name).

This may be used if different from the party name.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									},
									/**
									 * Detailed information about the business address
									 */
									postalAddress: {
										type: "object",
										description:
											"Detailed information about the business address",
										required: false,
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
										},
									},
								},
							},
							/**
							 * Detailed contact information
							 */
							tradeContact: {
								type: "object",
								description: "Detailed contact information",
								required: false,
								shape: {
									/**
									 * Name of the contact
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									name: {
										type: "string",
										description: `**Name of the contact**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:PersonName",
									},
									/**
									 * Department name
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									departmentName: {
										type: "string",
										description: `**Department name**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
									},
									/**
									 * Type of contact (code)
									 *
									 * The code specifying the type of trade contact
									 *
									 * To be chosen from the entries of UNTDID 3139
									 */
									typeCode: {
										type: "string",
										description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
									},
									/**
									 * Contact telephone number
									 *
									 * A phone number for the contact point.
									 */
									telephoneNumber: {
										type: "string",
										description: `**Contact telephone number**

A phone number for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact point fax number
									 */
									faxNumber: {
										type: "string",
										description: "Contact point fax number",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact email address
									 *
									 * An e-mail address for the contact point.
									 */
									emailAddress: {
										type: "string",
										description: `**Contact email address**

An e-mail address for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
									},
								},
							},
							/**
							 * Detailed information about the address
							 */
							postalAddress: {
								type: "object",
								description: `Detailed information about the address`,
								shape: {
									/**
									 * Post code
									 *
									 * The identifier for an addressable group of properties according to the relevant postal service.
									 *
									 * Such as a ZIP code or a post code.
									 */
									postCode: {
										type: "string",
										description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									},
									/**
									 * Address line 1
									 *
									 * The main address line in an address.
									 *
									 * Usually the street name and number or post office box.
									 */
									line1: {
										type: "string",
										description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:LineOne",
									},
									/**
									 * Address line 2
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line2: {
										type: "string",
										description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									},
									/**
									 * Address line 3
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line3: {
										type: "string",
										description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:LineThree",
									},
									/**
									 * City
									 *
									 * The common name of the city, town or village.
									 */
									city: {
										type: "string",
										description: `**City**

The common name of the city, town or village.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:CityName",
									},
									/**
									 * Country code
									 *
									 * A code that identifies the country.
									 *
									 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										type: "string",
										description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:CountryID",
									},
									/**
									 * Country subdivision
									 *
									 * The subdivision of a country.
									 *
									 * Such as a region, a county, a state, a province, etc.
									 */
									countrySubdivision: {
										type: "string",
										description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
									},
									/**
									 * Details about the electronic address
									 */
									electronicAddress: {
										type: "object",
										description: "Details about the electronic address",
										required: false,
										shape: {
											/**
											 * Electronic address
											 */
											value: {
												type: "string",
												description: "Electronic address",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:URIUniversalCommunication/ram:URIID",
											},
											/**
											 * Scheme identifier
											 */
											schemeIdentifier: {
												type: "string",
												description: "Scheme identifier",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
											},
										},
									},
								},
							},
							/**
							 * Detailed information on tax information
							 */
							taxRegistration: {
								type: "object",
								description: "Detailed information on tax information",
								required: false,
								shape: {
									/**
									 * VAT ID
									 */
									identifier: {
										type: "string",
										description: "VAT ID",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID":
												"VA",
										},
									},
								},
							},
						},
					},
					/**
					 * Detailed information about the deviating invoice recipient
					 */
					invoicee: {
						type: "object",
						description:
							"Detailed information about the deviating invoice recipient",
						required: false,
						shape: {
							/**
							 * Deviating invoice recipient identifier
							 */
							identifier: {
								type: "string",
								description: "Deviating invoice recipient identifier",
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:ID",
							},
							/**
							 * Deviating invoice recipient global identifier
							 *
							 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
							 */
							globalIdentifier: {
								type: "object",
								description: `**Deviating invoice recipient global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
								required: false,
								shape: {
									/**
									 * Deviating invoice recipient global identifier
									 *
									 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
									 */
									value: {
										type: "string",
										description: `**Deviating invoice recipient global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:GlobalID",
									},
									/**
									 * Scheme identifier
									 *
									 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
									 */
									schemeIdentifier: {
										type: "string",
										description: `**Scheme identifier**

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:GlobalID/@schemeID",
									},
								},
							},
							/**
							 * Deviating invoice recipient name / company name
							 */
							name: {
								type: "string",
								description: "Deviating invoice recipient name / company name",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:Name",
							},
							/**
							 * Role (code)
							 *
							 * A code qualifying the role
							 *
							 * To be chosen from UNTDID 3035.
							 */
							typeCode: {
								type: "string",
								description: `**Role (code)**

A code qualifying the role

To be chosen from UNTDID 3035.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:RoleCode",
							},
							/**
							 * Details about the organization
							 */
							organization: {
								type: "object",
								description: "Details about the organization",
								required: false,
								shape: {
									/**
									 * Company Registration Number
									 *
									 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
									 */
									identifier: {
										type: "object",
										description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
										required: false,
										shape: {
											/**
											 * Company Registration Number
											 *
											 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
											 */
											value: {
												type: "string",
												description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Buyer legal registration identifier.
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

The identification scheme identifier of the Buyer legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
									/**
									 * Trading Business Name
									 *
									 * A name by which the party is known, other than party name (also known as business name).
									 *
									 * This may be used if different from the party name.
									 */
									businessName: {
										type: "string",
										description: `**Trading Business Name**

A name by which the party is known, other than party name (also known as business name).

This may be used if different from the party name.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									},
									/**
									 * Detailed information about the business address
									 */
									postalAddress: {
										type: "object",
										description:
											"Detailed information about the business address",
										required: false,
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
										},
									},
								},
							},
							/**
							 * Detailed contact information
							 */
							tradeContact: {
								type: "object",
								description: "Detailed contact information",
								required: false,
								shape: {
									/**
									 * Name of the contact
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									name: {
										type: "string",
										description: `**Name of the contact**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:PersonName",
									},
									/**
									 * Department name
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									departmentName: {
										type: "string",
										description: `**Department name**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
									},
									/**
									 * Type of contact (code)
									 *
									 * The code specifying the type of trade contact
									 *
									 * To be chosen from the entries of UNTDID 3139
									 */
									typeCode: {
										type: "string",
										description: `**Type of contact (code)**
									 *
									 * The code specifying the type of trade contact
									 *
									 * To be chosen from the entries of UNTDID 3139`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
									},
									/**
									 * Contact telephone number
									 *
									 * A phone number for the contact point.
									 */
									telephoneNumber: {
										type: "string",
										description: `**Contact telephone number**

A phone number for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact point fax number
									 */
									faxNumber: {
										type: "string",
										description: "Contact point fax number",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact email address
									 *
									 * An e-mail address for the contact point.
									 */
									emailAddress: {
										type: "string",
										description: `**Contact email address**

An e-mail address for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
									},
								},
							},
							/**
							 * Detailed information about the address
							 */
							postalAddress: {
								type: "object",
								description: "Detailed information about the address",
								shape: {
									/**
									 * Post code
									 *
									 * The identifier for an addressable group of properties according to the relevant postal service.
									 *
									 * Such as a ZIP code or a post code.
									 */
									postCode: {
										type: "string",
										description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									},
									/**
									 * Address line 1
									 *
									 * The main address line in an address.
									 *
									 * Usually the street name and number or post office box.
									 */
									line1: {
										type: "string",
										description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:LineOne",
									},
									/**
									 * Address line 2
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line2: {
										type: "string",
										description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									},
									/**
									 * Address line 3
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line3: {
										type: "string",
										description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:LineThree",
									},
									/**
									 * City
									 *
									 * The common name of the city, town or village.
									 */
									city: {
										type: "string",
										description: `**City**

The common name of the city, town or village.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:CityName",
									},
									/**
									 * Country code
									 *
									 * A code that identifies the country.
									 *
									 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										type: "string",
										description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:CountryID",
									},
									/**
									 * Country subdivision
									 *
									 * The subdivision of a country.
									 *
									 * Such as a region, a county, a state, a province, etc.
									 */
									countrySubdivision: {
										type: "string",
										description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
									},
									/**
									 * Details about the electronic address
									 */
									electronicAddress: {
										type: "object",
										description: "Details about the electronic address",
										required: false,
										shape: {
											/**
											 * Electronic address
											 */
											value: {
												type: "string",
												description: "Electronic address",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:URIUniversalCommunication/ram:URIID",
											},
											/**
											 * Scheme identifier
											 */
											schemeIdentifier: {
												type: "string",
												description: "Scheme identifier",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
											},
										},
									},
								},
							},
							/**
							 * Detailed information on tax information
							 */
							taxRegistration: {
								type: "object",
								description: "Detailed information on tax information",
								required: false,
								shape: {
									/**
									 * VAT ID
									 */
									identifier: {
										type: "string",
										description: "VAT ID",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID":
												"VA",
										},
									},
								},
							},
						},
					},
					payee: {
						type: "object",
						shape: {
							/**
							 * Payee role (code)
							 *
							 * A code qualifying the role of the payee
							 *
							 * To be chosen from UNTDID 3035, for instance:
							 * - DL: Factor
							 */
							typeCode: {
								type: "string",
								description: `**Payee role (code)**

A code qualifying the role of the payee

To be chosen from UNTDID 3035, for instance:
- DL: Factor`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:RoleCode",
							},
							organization: {
								type: "object",
								shape: {
									/**
									 * Trading name
									 *
									 * A name by which the party is known, other than party name (also known as business name).
									 *
									 * This may be used if different from the party name.
									 */
									businessName: {
										type: "string",
										description: `**Trading name**

A name by which the party is known, other than party name (also known as business name).

This may be used if different from the party name.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									},
									/**
									 * Detailed information about the business address
									 */
									postalAddress: {
										type: "object",
										description:
											"Detailed information about the business address",
										required: false,
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
										},
									},
								},
							},
							/**
							 * Detailed contact information
							 */
							tradeContact: {
								type: "object",
								description: "Detailed contact information",
								required: false,
								shape: {
									/**
									 * Name of the contact
									 */
									name: {
										type: "string",
										description: "Name of the contact",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:PersonName",
									},
									/**
									 * Department name
									 */
									departmentName: {
										type: "string",
										description: "Department name",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
									},
									/**
									 * Type of contact (code)
									 *
									 * The code specifying the type of trade contact
									 *
									 * To be chosen from the entries of UNTDID 3139
									 */
									typeCode: {
										type: "string",
										description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
									},
									/**
									 * Contact telephone number
									 *
									 * A phone number for the contact point.
									 */
									telephoneNumber: {
										type: "string",
										description: `**Contact telephone number**

A phone number for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact point fax number
									 */
									faxNumber: {
										type: "string",
										description: "Contact point fax number",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact email address
									 *
									 * An e-mail address for the contact point.
									 */
									emailAddress: {
										type: "string",
										description: `**Contact email address**

An e-mail address for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
									},
								},
							},
							/**
							 * Detailed information about the payee postal address
							 */
							postalAddress: {
								type: "object",
								description:
									"Detailed information about the payee postal address",
								required: false,
								shape: {
									/**
									 * Post code
									 *
									 * The identifier for an addressable group of properties according to the relevant postal service.
									 *
									 * Such as a ZIP code or a post code.
									 */
									postCode: {
										type: "string",
										description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									},
									/**
									 * Address line 1
									 *
									 * The main address line in an address.
									 *
									 * Usually the street name and number or post office box.
									 */
									line1: {
										type: "string",
										description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineOne",
									},
									/**
									 * Address line 2
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line2: {
										type: "string",
										description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									},
									/**
									 * Address line 3
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line3: {
										type: "string",
										description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineThree",
									},
									/**
									 * City
									 *
									 * The common name of the city, town or village.
									 */
									city: {
										type: "string",
										description: `**City**

The common name of the city, town or village.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CityName",
									},
									/**
									 * Country code
									 *
									 * A code that identifies the country.
									 *
									 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										type: "string",
										description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CountryID",
									},
									/**
									 * Country subdivision
									 *
									 * The subdivision of a country.
									 *
									 * Such as a region, a county, a state, a province, etc.
									 */
									countrySubdivision: {
										type: "string",
										description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
									},
									/**
									 * Details about the electronic address
									 */
									electronicAddress: {
										type: "object",
										description: "Details about the electronic address",
										required: false,
										shape: {
											/**
											 * Electronic address
											 */
											value: {
												type: "string",
												description: "Electronic address",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:URIUniversalCommunication/ram:URIID",
											},
											/**
											 * Scheme identifier
											 */
											schemeIdentifier: {
												type: "string",
												description: "Scheme identifier",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
											},
										},
									},
								},
							},
							/**
							 * Detailed tax information
							 */
							taxRegistration: {
								type: "object",
								description: "Detailed tax information",
								required: false,
								shape: {
									/**
									 * VAT identifier
									 */
									identifier: {
										type: "string",
										description: "VAT identifier",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID":
												"VA",
										},
									},
								},
							},
						},
					},
					/**
					 * Detailed information about the deviating invoice payer
					 *
					 * A group of business terms providing information about the Payer, i.e. the role that makes the payment.
					 *
					 * The role of Payer may be fulfilled by another party than the Buyer, e.g. a third Party like a mother company
					 */
					payer: {
						type: "object",
						description: `**Detailed information about the deviating invoice payer**

A group of business terms providing information about the Payer, i.e. the role that makes the payment.

The role of Payer may be fulfilled by another party than the Buyer, e.g. a third Party like a mother company`,
						required: false,
						shape: {
							/**
							 * Deviating invoice payer identifier
							 */
							identifier: {
								type: "string",
								description: "Deviating invoice payer identifier",
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:ID",
							},
							/**
							 * Deviating invoice payer global identifier
							 *
							 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
							 */
							globalIdentifier: {
								type: "object",
								description: `**Deviating invoice payer global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
								required: false,
								shape: {
									/**
									 * Deviating invoice payer global identifier
									 *
									 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
									 */
									value: {
										type: "string",
										description: `**Deviating invoice payer global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:GlobalID",
									},
									/**
									 * Payer identifier Scheme identifier
									 *
									 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
									 */
									schemeIdentifier: {
										type: "string",
										description: `**Payer identifier Scheme identifier**

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:GlobalID/@schemeID",
									},
								},
							},
							/**
							 * Name/company name of the deviating invoice payer
							 */
							name: {
								type: "string",
								description: "Name/company name of the deviating invoice payer",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:Name",
							},
							/**
							 * Role (code)
							 *
							 * A code qualifying the role
							 *
							 * To be chosen from UNTDID 3035.
							 */
							typeCode: {
								type: "string",
								description: `**Role (code)**

A code qualifying the role

To be chosen from UNTDID 3035.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:RoleCode",
							},
							/**
							 * Details about the organization
							 */
							organization: {
								type: "object",
								description: "Details about the organization",
								required: false,
								shape: {
									/**
									 * Company Registration Number
									 *
									 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
									 */
									identifier: {
										type: "object",
										description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
										required: false,
										shape: {
											/**
											 * Company Registration Number
											 *
											 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
											 */
											value: {
												type: "string",
												description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Payer legal registration identifier.
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

The identification scheme identifier of the Payer legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
									/**
									 * Trading Business Name
									 *
									 * A name by which the party is known, other than party name (also known as business name).
									 *
									 * This may be used if different from the party name.
									 */
									businessName: {
										type: "string",
										description: `**Trading Business Name**

A name by which the party is known, other than party name (also known as business name).

This may be used if different from the party name.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									},
									/**
									 * Detailed information about the business address
									 */
									postalAddress: {
										type: "object",
										description:
											"Detailed information about the business address",
										required: false,
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
										},
									},
								},
							},
							/**
							 * Detailed contact information
							 */
							tradeContact: {
								type: "object",
								description: "Detailed contact information",
								required: false,
								shape: {
									/**
									 * Name of the contact
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									name: {
										type: "string",
										description: `**Name of the contact**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:PersonName",
									},
									/**
									 * Department name
									 *
									 * If a contact person is indicated, either the name or the department is to be transmitted.
									 */
									departmentName: {
										type: "string",
										description: `**Department name**

If a contact person is indicated, either the name or the department is to be transmitted.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
									},
									/**
									 * Type of contact (code)
									 *
									 * The code specifying the type of trade contact
									 *
									 * To be chosen from the entries of UNTDID 3139
									 */
									typeCode: {
										type: "string",
										description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
									},
									/**
									 * Contact telephone number
									 *
									 * A phone number for the contact point.
									 */
									telephoneNumber: {
										type: "string",
										description: `**Contact telephone number**

A phone number for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact point fax number
									 */
									faxNumber: {
										type: "string",
										description: "Contact point fax number",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Contact email address
									 *
									 * An e-mail address for the contact point.
									 */
									emailAddress: {
										type: "string",
										description: `**Contact email address**

An e-mail address for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
									},
								},
							},
							/**
							 * Detailed information about the address
							 */
							postalAddress: {
								type: "object",
								description: "Detailed information about the address",
								shape: {
									/**
									 * Post code
									 *
									 * The identifier for an addressable group of properties according to the relevant postal service.
									 *
									 * Such as a ZIP code or a post code.
									 */
									postCode: {
										type: "string",
										description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									},
									/**
									 * Address line 1
									 *
									 * The main address line in an address.
									 *
									 * Usually the street name and number or post office box.
									 */
									line1: {
										type: "string",
										description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:LineOne",
									},
									/**
									 * Address line 2
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line2: {
										type: "string",
										description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									},
									/**
									 * Address line 3
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line3: {
										type: "string",
										description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:LineThree",
									},
									/**
									 * City
									 *
									 * The common name of the city, town or village.
									 */
									city: {
										type: "string",
										description: `**City**

The common name of the city, town or village.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:CityName",
									},
									/**
									 * Country code
									 *
									 * A code that identifies the country.
									 *
									 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										type: "string",
										description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:CountryID",
									},
									/**
									 * Country subdivision
									 *
									 * The subdivision of a country.
									 *
									 * Such as a region, a county, a state, a province, etc.
									 */
									countrySubdivision: {
										type: "string",
										description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
									},
									/**
									 * Details about the electronic address
									 */
									electronicAddress: {
										type: "object",
										description: "Details about the electronic address",
										required: false,
										shape: {
											/**
											 * Payer Electronic address
											 */
											value: {
												type: "string",
												description: "Payer Electronic address",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:URIUniversalCommunication/ram:URIID",
											},
											/**
											 * Scheme identifier
											 */
											schemeIdentifier: {
												type: "string",
												description: "Scheme identifier",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
											},
										},
									},
								},
							},
							/**
							 * Detailed information on tax information
							 */
							taxRegistration: {
								type: "object",
								description: "Detailed information on tax information",
								required: false,
								shape: {
									/**
									 * VAT ID
									 */
									identifier: {
										type: "string",
										description: "VAT ID",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID":
												"VA",
										},
									},
								},
							},
						},
					},
					/**
					 * Specification of the invoice currency, local currency and exchange rate
					 */
					tradeCurrencyExchange: {
						type: "object",
						description:
							"Specification of the invoice currency, local currency and exchange rate",
						required: false,
						shape: {
							/**
							 * Invoice currency
							 */
							invoiceCurrency: {
								type: "string",
								description: "Invoice currency",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange/ram:SourceCurrencyCode",
							},
							/**
							 * Local currency
							 */
							localCurrency: {
								type: "string",
								description: "Local currency",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange/ram:TargetCurrencyCode",
							},
							/**
							 * Exchange rate
							 */
							exchangeRate: {
								type: "string | number",
								description: "Exchange rate",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange/ram:ConversionRate",
							},
							/**
							 * Exchange rate date
							 */
							exchangeRateDate: {
								type: "date",
								description: "Exchange rate date",
								required: false,
								transform: {
									input: dateTimeStringFormatter,
								},
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange/ram:ConversionRateDateTime/udt:DateTimeString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange/ram:ConversionRateDateTime/udt:DateTimeString/@format":
										"102",
								},
							},
						},
					},
					vatBreakdown: {
						type: "object[]",
						shape: {
							/**
							 * Line Total Basis Amount
							 *
							 * A monetary value used as the line total basis on which this trade related tax, levy or duty is calculated
							 */
							lineTotalBasisAmount: {
								type: "string | number",
								description: `**Line Total Basis Amount**

A monetary value used as the line total basis on which this trade related tax, levy or duty is calculated`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax[vat-breakdown]/ram:LineTotalBasisAmount",
							},
							/**
							 * Total amount of charges / allowances on document level
							 */
							allowanceChargeBasisAmount: {
								type: "string | number",
								description:
									"Total amount of charges / allowances on document level",
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax[vat-breakdown]/ram:AllowanceChargeBasisAmount",
							},
						},
					},
					invoicingPeriod: {
						type: "object",
						shape: {
							/**
							 * Invoicing period description (free text)
							 */
							description: {
								type: "string",
								description: "Invoicing period description (free text)",
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:Description",
							},
						},
					},
					allowances: {
						type: "object[]",
						shape: {
							/**
							 * Calculation sequence
							 */
							calculationSequence: {
								type: "string | number",
								description: "Calculation sequence",
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[allowances]/ram:SequenceNumeric",
							},
							/**
							 * Allowance / charge base quantity
							 */
							baseQuantity: {
								type: "object",
								description: "Allowance / charge base quantity",
								required: false,
								shape: {
									/**
									 * Allowance / charge base quantity
									 */
									value: {
										type: "string | number",
										description: "Allowance / charge base quantity",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[allowances]/ram:BasisQuantity",
									},
									/**
									 * Unit code
									 */
									unit: {
										type: "string",
										description: "Unit code",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[allowances]/ram:BasisQuantity/@unitCode",
									},
								},
							},
						},
					},
					charges: {
						type: "object[]",
						shape: {
							/**
							 * Calculation sequence
							 */
							calculationSequence: {
								type: "string | number",
								description: "Calculation sequence",
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[charges]/ram:SequenceNumeric",
							},
							/**
							 * Allowance / charge base quantity
							 */
							baseQuantity: {
								type: "object",
								description: "Allowance / charge base quantity",
								required: false,
								shape: {
									/**
									 * Allowance / charge base quantity
									 */
									value: {
										type: "string | number",
										description: "Allowance / charge base quantity",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[charges]/ram:BasisQuantity",
									},
									/**
									 * Unit code
									 */
									unit: {
										type: "string",
										description: "Unit code",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[charges]/ram:BasisQuantity/@unitCode",
									},
								},
							},
						},
					},
					logisticsServiceCharge: {
						type: "object[]",
						required: false,
						group: "logistics-service-charge",
						shape: {
							/**
							 * Service fee description
							 */
							description: {
								type: "string",
								description: "Service fee description",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge[logistics-service-charge]/ram:Description",
							},
							/**
							 * Service fee amount
							 */
							amount: {
								type: "string | number",
								description: "Service fee amount",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge[logistics-service-charge]/ram:AppliedAmount",
							},
							/**
							 * Detailed tax information
							 */
							tradeTax: {
								type: "object",
								description: "Detailed tax information",
								required: false,
								shape: {
									/**
									 * Tax type (Code)
									 */
									typeCode: {
										type: "string",
										description: "Tax type (Code)",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge[logistics-service-charge]/ram:AppliedTradeTax/ram:TypeCode",
									},
									/**
									 * VAT category code
									 *
									 * Coded identification of a VAT category.
									 */
									categoryCode: {
										type: "string",
										description: `**VAT category code**

Coded identification of a VAT category.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge[logistics-service-charge]/ram:AppliedTradeTax/ram:CategoryCode",
									},
									/**
									 * VAT category rate
									 */
									rateApplicablePercent: {
										type: "string | number",
										description: "VAT category rate",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge[logistics-service-charge]/ram:AppliedTradeTax/ram:RateApplicablePercent",
									},
								},
							},
						},
					},
					paymentTerms: {
						type: "object",
						shape: {
							/**
							 * Partial payment amount
							 */
							partialPaymentAmount: {
								type: "string | number",
								description: "Partial payment amount",
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PartialPaymentAmount",
							},
							/**
							 * Detailed information about penalties
							 */
							penaltyTerms: {
								type: "object[]",
								description: "Detailed information about penalties",
								required: false,
								group: "penalty-terms",
								shape: {
									/**
									 * Maturity Reference Date
									 */
									date: {
										type: "date",
										description: "Maturity Reference Date",
										required: false,
										transform: {
											input: dateTimeStringFormatter,
										},
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms[penalty-terms]/ram:BasisDateTime/udt:DateTimeString",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms[penalty-terms]/ram:BasisDateTime/udt:DateTimeString/@format":
												"102",
										},
									},
									/**
									 * Due date period basis
									 *
									 * The period for the due date, e.g. as a number of days (15 days)
									 */
									datePeriodMeasure: {
										type: "object",
										description: `**Due date period basis**

The period for the due date, e.g. as a number of days (15 days)`,
										required: false,
										shape: {
											/**
											 * Due date period basis
											 *
											 * The period for the due date, e.g. as a number of days (15 days)
											 */
											value: {
												type: "string | number",
												description: `**Due date period basis**

The period for the due date, e.g. as a number of days (15 days)`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms[penalty-terms]/ram:BasisPeriodMeasure",
											},
											/**
											 * Maturity Period, Unit code
											 */
											unit: {
												type: "string",
												description: "Maturity Period, Unit code",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms[penalty-terms]/ram:BasisPeriodMeasure/@unitCode",
											},
										},
									},
									/**
									 * Payment penalty base amount
									 */
									basisAmount: {
										type: "string | number",
										description: "Payment penalty base amount",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms[penalty-terms]/ram:BasisAmount",
									},
									/**
									 * Payment penalty percentage
									 */
									calculationPercent: {
										type: "string | number",
										description: "Payment penalty percentage",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms[penalty-terms]/ram:CalculationPercent",
									},
									/**
									 * Payment penalty amount
									 */
									penaltyAmount: {
										type: "string | number",
										description: "Payment penalty amount",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms[penalty-terms]/ram:ActualPenaltyAmount",
									},
								},
							},
							/**
							 * Detailed information about payment discounts
							 */
							discountTerms: {
								type: "object[]",
								description: "Detailed information about payment discounts",
								required: false,
								group: "discount-terms",
								shape: {
									/**
									 * Maturity Reference Date
									 */
									date: {
										type: "date",
										description: "Maturity Reference Date",
										required: false,
										transform: {
											input: dateTimeStringFormatter,
										},
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms[discount-terms]/ram:BasisDateTime/udt:DateTimeString",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms[discount-terms]/ram:BasisDateTime/udt:DateTimeString/@format":
												"102",
										},
									},
									/**
									 * Due date period basis
									 *
									 * The period for the due date, e.g. as a number of days (15 days)
									 */
									datePeriodMeasure: {
										type: "object",
										description: `**Due date period basis**

The period for the due date, e.g. as a number of days (15 days)`,
										required: false,
										shape: {
											/**
											 * Due date period basis
											 *
											 * The period for the due date, e.g. as a number of days (15 days)
											 */
											value: {
												type: "string | number",
												description: `**Due date period basis**

The period for the due date, e.g. as a number of days (15 days)`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms[discount-terms]/ram:BasisPeriodMeasure",
											},
											/**
											 * Maturity Period, Unit code
											 */
											unit: {
												type: "string",
												description: "Maturity Period, Unit code",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms[discount-terms]/ram:BasisPeriodMeasure/@unitCode",
											},
										},
									},
									/**
									 * Payment discount base amount
									 */
									basisAmount: {
										type: "string | number",
										description: "Payment discount base amount",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms[discount-terms]/ram:BasisAmount",
									},
									/**
									 * Payment discount percentage
									 */
									calculationPercent: {
										type: "string | number",
										description: "Payment discount percentage",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms/ram:CalculationPercent",
									},
									/**
									 * Payment discount amount
									 */
									discountAmount: {
										type: "string | number",
										description: "Payment discount amount",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms/ram:ActualDiscountAmount",
									},
								},
							},
							/**
							 * Deviating payee per payment
							 *
							 * Group of business terms providing information about the payee, i.e. the role that receives the payment, IN CASE OF MULTIPLE PAYEES
							 *
							 * The role of beneficiary may be filled by a party other than the seller, e.g. a factoring service. THIS GROUP IS ONLY USED WHEN THERE ARE MULTIPLE BENEFICIARIES (e.g. withholding tax or split payment).
							 */
							payee: {
								type: "object",
								description: `**Deviating payee per payment**

Group of business terms providing information about the payee, i.e. the role that receives the payment, IN CASE OF MULTIPLE PAYEES

The role of beneficiary may be filled by a party other than the seller, e.g. a factoring service. THIS GROUP IS ONLY USED WHEN THERE ARE MULTIPLE BENEFICIARIES (e.g. withholding tax or split payment).`,
								required: false,
								shape: {
									/**
									 * Deviating invoice payee identifier
									 */
									identifier: {
										type: "string",
										description: "Deviating invoice payee identifier",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:ID",
									},
									/**
									 * Deviating invoice payer global identifier
									 *
									 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
									 */
									globalIdentifier: {
										type: "object",
										description: `**Deviating invoice payer global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
										required: false,
										shape: {
											/**
											 * Deviating invoice payer global identifier
											 *
											 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
											 */
											value: {
												type: "string",
												description: `**Deviating invoice payer global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:GlobalID",
											},
											/**
											 * Payee scheme identifier
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Payee scheme identifier**

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:GlobalID/@schemeID",
											},
										},
									},
									/**
									 * Name/company name of Payee
									 *
									 * The name of the Payee.
									 *
									 * Shall be used when the Payee is different from the Seller. The Payee name may however be the same as the Seller name.
									 */
									name: {
										type: "string",
										description: `**Name/company name of Payee**

The name of the Payee.

Shall be used when the Payee is different from the Seller. The Payee name may however be the same as the Seller name.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:Name",
									},
									/**
									 * Role (code)
									 *
									 * A code qualifying the role
									 *
									 * To be chosen from UNTDID 3035.
									 */
									typeCode: {
										type: "string",
										description: `**Role (code)**

A code qualifying the role

To be chosen from UNTDID 3035.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:RoleCode",
									},
									/**
									 * Details about the organization
									 */
									organization: {
										type: "object",
										description: "Details about the organization",
										required: false,
										shape: {
											/**
											 * Company Registration Number
											 *
											 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
											 */
											identifier: {
												type: "object",
												description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
												required: false,
												shape: {
													/**
													 * Company Registration Number
													 *
													 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
													 */
													value: {
														type: "string",
														description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
													},
													/**
													 * Scheme identifier
													 *
													 * The identification scheme identifier of the Payee legal registration identifier.
													 *
													 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
													 */
													schemeIdentifier: {
														type: "string",
														description: `**Scheme identifier**

The identification scheme identifier of the Payee legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.`,
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
													},
												},
											},
											/**
											 * Trading Business Name
											 *
											 * A name by which the party is known, other than party name (also known as business name).
											 *
											 * This may be used if different from the party name.
											 */
											businessName: {
												type: "string",
												description: `**Trading Business Name**

A name by which the party is known, other than party name (also known as business name).

This may be used if different from the party name.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
											},
											/**
											 * Detailed information about the business address
											 */
											postalAddress: {
												type: "object",
												description:
													"Detailed information about the business address",
												shape: {
													/**
													 * Post code
													 *
													 * The identifier for an addressable group of properties according to the relevant postal service.
													 *
													 * Such as a ZIP code or a post code.
													 */
													postCode: {
														type: "string",
														description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
													},
													/**
													 * Address line 1
													 *
													 * The main address line in an address.
													 *
													 * Usually the street name and number or post office box.
													 */
													line1: {
														type: "string",
														description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
													},
													/**
													 * Address line 2
													 *
													 * An additional address line in an address that can be used to give further details supplementing the main line.
													 */
													line2: {
														type: "string",
														description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
													},
													/**
													 * Address line 3
													 *
													 * An additional address line in an address that can be used to give further details supplementing the main line.
													 */
													line3: {
														type: "string",
														description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
													},
													/**
													 * City
													 *
													 * The common name of the city, town or village.
													 */
													city: {
														type: "string",
														description: `**City**

The common name of the city, town or village.`,
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
													},
													/**
													 * Country code
													 *
													 * A code that identifies the country.
													 *
													 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
													 */
													countryCode: {
														type: "string",
														description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
													},
													/**
													 * Country subdivision
													 *
													 * The subdivision of a country.
													 *
													 * Such as a region, a county, a state, a province, etc.
													 */
													countrySubdivision: {
														type: "string",
														description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
													},
												},
											},
										},
									},
									/**
									 * Detailed contact information
									 */
									tradeContact: {
										type: "object",
										description: "Detailed contact information",
										required: false,
										shape: {
											/**
											 * Name of the contact
											 *
											 * If a contact person is indicated, either the name or the department is to be transmitted.
											 */
											name: {
												type: "string",
												description: `**Name of the contact**

If a contact person is indicated, either the name or the department is to be transmitted.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:PersonName",
											},
											/**
											 * Department name
											 *
											 * If a contact person is indicated, either the name or the department is to be transmitted.
											 */
											departmentName: {
												type: "string",
												description: `**Department name**

If a contact person is indicated, either the name or the department is to be transmitted.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
											},
											/**
											 * Type of contact (code)
											 *
											 * The code specifying the type of trade contact
											 *
											 * To be chosen from the entries of UNTDID 3139
											 */
											typeCode: {
												type: "string",
												description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
											},
											/**
											 * Contact telephone number
											 *
											 * A phone number for the contact point.
											 */
											telephoneNumber: {
												type: "string",
												description: `**Contact telephone number**

A phone number for the contact point.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
											},
											/**
											 * Contact point fax number
											 */
											faxNumber: {
												type: "string",
												description: "Contact point fax number",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
											},
											/**
											 * Contact email address
											 *
											 * An e-mail address for the contact point.
											 */
											emailAddress: {
												type: "string",
												description: `**Contact email address**

An e-mail address for the contact point.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
											},
										},
									},
									/**
									 * Detailed information about the address
									 */
									postalAddress: {
										type: "object",
										description: "Detailed information about the address",
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
											/**
											 * Details about the electronic address
											 */
											electronicAddress: {
												type: "object",
												description: "Details about the electronic address",
												required: false,
												shape: {
													/**
													 * Electronic address
													 */
													value: {
														type: "string",
														description: "Electronic address",
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:URIUniversalCommunication/ram:URIID",
													},
													/**
													 * Scheme identifier
													 */
													schemeIdentifier: {
														type: "string",
														description: "Scheme identifier",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
													},
												},
											},
										},
									},
									/**
									 * Detailed information on tax information
									 */
									taxRegistration: {
										type: "object",
										description: "Detailed information on tax information",
										required: false,
										shape: {
											/**
											 * VAT ID
											 */
											identifier: {
												type: "string",
												description: "VAT ID",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
												additionalXml: {
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID":
														"VA",
												},
											},
										},
									},
								},
							},
						},
					},
					precendingInvoices: {
						type: "object[]",
						shape: {
							/**
							 * Preceding incoive type code
							 *
							 * The same rules apply as for BT-3
							 */
							typeCode: {
								type: "string",
								description: `**Preceding incoive type code**

The same rules apply as for BT-3`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument[precending-invoices]/ram:TypeCode",
							},
						},
					},
					buyerAccountant: {
						type: "object",
						shape: {
							/**
							 * Accounting reference type (Code)
							 */
							typeCode: {
								type: "string",
								description: "Accounting reference type (Code)",
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:TypeCode",
							},
						},
					},
					/**
					 * Included tax for advanced payment
					 */
					advancePayment: {
						type: "object[]",
						description: "Included tax for advanced payment",
						required: false,
						group: "advance-payment",
						shape: {
							/**
							 * Advanced payment, value
							 */
							paidAmount: {
								type: "string | number",
								description: "Advanced payment, value",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment[advance-payment]/ram:PaidAmount",
							},
							/**
							 * Date of advanced payment
							 */
							date: {
								type: "date",
								description: "Date of advanced payment",
								required: false,
								transform: {
									input: dateTimeStringFormatter,
								},
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment[advance-payment]/ram:FormattedReceivedDateTime/qdt:DateTimeString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment[advance-payment]/ram:FormattedReceivedDateTime/qdt:DateTimeString/@format":
										"102",
								},
							},
							/**
							 * Tax information on advanced payments
							 */
							tradeTax: {
								type: "object[]",
								description: "Tax information on advanced payments",
								validator: z.array(z.any()).min(1),
								group: "advance-payment-trade-tax",
								shape: {
									/**
									 * Included tax
									 */
									calculatedAmount: {
										type: "string | number",
										description: "Included tax",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment[advance-payment]/ram:IncludedTradeTax[advance-payment-trade-tax]/ram:CalculatedAmount",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment[advance-payment]/ram:IncludedTradeTax[advance-payment-trade-tax]/ram:TypeCode":
												"VAT",
										},
									},
									/**
									 * VAT exemption reason text
									 *
									 * A textual statement of the reason why the amount is exempted from VAT or why no VAT is being charged
									 */
									exemptionReason: {
										type: "string",
										description: `**VAT exemption reason text**

A textual statement of the reason why the amount is exempted from VAT or why no VAT is being charged`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment[advance-payment]/ram:IncludedTradeTax[advance-payment-trade-tax]/ram:ExemptionReason",
									},
									/**
									 * VAT exemption reason code
									 *
									 * A coded statement of the reason for why the amount is exempted from VAT.
									 *
									 * Code list issued and maintained by the Connecting Europe Facility.
									 */
									exemptionReasonCode: {
										type: "string",
										description: `**VAT exemption reason code**

A coded statement of the reason for why the amount is exempted from VAT.

Code list issued and maintained by the Connecting Europe Facility.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment[advance-payment]/ram:IncludedTradeTax[advance-payment-trade-tax]/ram:ExemptionReasonCode",
									},
									/**
									 * VAT category code
									 *
									 * Coded identification of a VAT category.
									 *
									 * The following entries of UNTDID 5305 [6] are used (further clarification between brackets):
									 * - Standard rate (Liable for VAT in a standard way)
									 * - Zero rated goods (Liable for VAT with a percentage rate of zero)
									 * - Exempt from tax (VAT/IGIC/IPSI)
									 * - VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)
									 * - VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)
									 * - Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)
									 * - Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)
									 * - Canary Islands General Indirect Tax (Liable for IGIC tax)
									 * - Liable for IPSI (Ceuta/Melilla tax)
									 */
									categoryCode: {
										type: UNTDID_5305.map(({ code }) => code),
										description: `**VAT category code**

Coded identification of a VAT category.

The following entries of UNTDID 5305 [6] are used (further clarification between brackets):
- Standard rate (Liable for VAT in a standard way)
- Zero rated goods (Liable for VAT with a percentage rate of zero)
- Exempt from tax (VAT/IGIC/IPSI)
- VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)
- VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)
- Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)
- Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)
- Canary Islands General Indirect Tax (Liable for IGIC tax)
- Liable for IPSI (Ceuta/Melilla tax)`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment[advance-payment]/ram:IncludedTradeTax[advance-payment-trade-tax]/ram:CategoryCode",
									},
									/**
									 * VAT category rate
									 *
									 * The VAT rate, represented as percentage that applies for the relevant VAT category.
									 *
									 * The VAT category code and the VAT category rate shall be consistent.
									 */
									rateApplicablePercent: {
										type: "string",
										description: `**VAT category rate**

The VAT rate, represented as percentage that applies for the relevant VAT category.

The VAT category code and the VAT category rate shall be consistent.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment[advance-payment]/ram:IncludedTradeTax[advance-payment-trade-tax]/ram:RateApplicablePercent",
									},
								},
							},
							/**
							 * Precending invoice reference for advance payment
							 *
							 * A group of business terms providing information on the advance payment related preceding invoice. The individual invoide shall be stated so that combined payments need to be split per invoice.
							 *
							 * To be used in case:
							 * - preceding partial invoices are refered to from a final invoice
							 * - preceding pre-payment invoices are refered to from a final invoice
							 */
							precendingInvoice: {
								type: "object",
								description: `**Precending invoice reference for advance payment**

A group of business terms providing information on the advance payment related preceding invoice. The individual invoide shall be stated so that combined payments need to be split per invoice.

To be used in case:
- preceding partial invoices are refered to from a final invoice
- preceding pre-payment invoices are refered to from a final invoice`,
								required: false,
								shape: {
									/**
									 * Preceding Invoice reference
									 *
									 * The identification of an Invoice that was previously sent by the Seller.
									 */
									issuerAssignedID: {
										type: "string",
										description: `**Preceding Invoice reference**

The identification of an Invoice that was previously sent by the Seller.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment[advance-payment]/ram:InvoiceSpecifiedReferencedDocument/ram:IssuerAssignedID",
									},
									/**
									 * Preceding Invoice issue date
									 *
									 * The date when the Preceding Invoice was issued.
									 *
									 * The Preceding Invoice issue date shall be provided in case the Preceding Invoice identifier is not unique.
									 */
									date: {
										type: "date",
										description: `**Preceding Invoice issue date**

The date when the Preceding Invoice was issued.

The Preceding Invoice issue date shall be provided in case the Preceding Invoice identifier is not unique.`,
										required: false,
										transform: {
											input: dateTimeStringFormatter,
										},
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment[advance-payment]/ram:InvoiceSpecifiedReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment[advance-payment]/ram:InvoiceSpecifiedReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
												"102",
										},
									},
								},
							},
						},
					},
				},
			},
			line: {
				type: "object[]",
				shape: {
					/**
					 * Parent line ID
					 *
					 * The value given here refers to the superior line. In this way, a hierarchy tree of invoice items can be mapped.
					 */
					parentIdentifier: {
						type: "string",
						description: `**Parent line ID**

The value given here refers to the superior line. In this way, a hierarchy tree of invoice items can be mapped.`,
						required: false,
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:AssociatedDocumentLineDocument/ram:ParentLineID",
					},
					/**
					 * Type of the inovice line item (Code)
					 *
					 * Indicating whether an item includes the prices which must be taken into account when calculating the invoice amount, or whether it only contains information.
					 *
					 * Use codes from codelist UNTDID 1229. The following code should be applied per default: 39
					 */
					typeCode: {
						type: "string",
						description: `**Type of the inovice line item (Code)**

Indicating whether an item includes the prices which must be taken into account when calculating the invoice amount, or whether it only contains information.

Use codes from codelist UNTDID 1229. The following code should be applied per default: 39`,
						required: false,
						defaultValue: "39",
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:AssociatedDocumentLineDocument/ram:LineStatusCode",
					},
					/**
					 * Subtype of the invoice line item
					 *
					 * Complements the type to clarify whether the invoice item is one of the following:
					 * - Detail (default positioning)
					 * - Subtotal
					 * - Solely information
					 *
					 * If the LineStatusCode element is used, the LineStatusReasonCode must be filled in: DETAIL, GROUP, INFORMATION
					 */
					subTypeCode: {
						type: ["DETAIL", "GROUP", "INFORMATION"],
						description: `**Subtype of the invoice line item**

Complements the type to clarify whether the invoice item is one of the following:
- Detail (default positioning)
- Subtotal
- Solely information

If the LineStatusCode element is used, the LineStatusReasonCode must be filled in: DETAIL, GROUP, INFORMATION`,
						required: false,
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:AssociatedDocumentLineDocument/ram:LineStatusReasonCode",
					},
					/**
					 * Free text on line level (code)
					 *
					 * A code to classify the content of the invoice note.
					 *
					 * The code is agreed bilaterally and must have the same meaning as BT-127.
					 */
					noteContentCode: {
						type: "string",
						description: `**Free text on line level (code)**

A code to classify the content of the invoice note.

The code is agreed bilaterally and must have the same meaning as BT-127.`,
						required: false,
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:AssociatedDocumentLineDocument/ram:IncludedNote/ram:ContentCode",
					},
					/**
					 * Invoice line note subject code
					 *
					 * To be chosen from the entries in UNTDID 4451 [6].
					 */
					noteSubjectCode: {
						type: UNTDID_4451.map(({ code }) => code),
						description: `**Invoice line note subject code**

To be chosen from the entries in UNTDID 4451 [6].`,
						required: false,
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:AssociatedDocumentLineDocument/ram:IncludedNote/ram:SubjectCode",
					},
					tradeProduct: {
						type: "object",
						shape: {
							/**
							 * Product identifier
							 *
							 * This identifier can be additionally specified to be interoperable with Order-X.
							 */
							identifier: {
								type: "string",
								description: `**Product identifier**

This identifier can be additionally specified to be interoperable with Order-X.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:ID",
							},
							/**
							 * Industry assigned product identifier
							 *
							 * An identifier, assigned by the Industry, for the item.
							 */
							industryIdentifier: {
								type: "string",
								description: `**Industry assigned product identifier**

An identifier, assigned by the Industry, for the item.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IndustryAssignedID",
							},
							/**
							 * Model identification of the item
							 *
							 * A unique model identifier for this item.
							 */
							modelIdentifier: {
								type: "string",
								description: `**Model identification of the item**

A unique model identifier for this item.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:ModelID",
							},
							/**
							 * Batch (lot) identification of the item
							 *
							 * A batch identifier for this item.
							 */
							batchIdentifier: {
								type: "string",
								description: `**Batch (lot) identification of the item**

A batch identifier for this item.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:BatchID",
							},
							/**
							 * Item brand name
							 *
							 * The brand name, expressed as text, for this item.
							 */
							brandName: {
								type: "string",
								description: `**Item brand name**

The brand name, expressed as text, for this item.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:BrandName",
							},
							/**
							 * Item model name
							 */
							modelName: {
								type: "string",
								description: "Item model name",
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:ModelName",
							},
							attributes: {
								type: "object[]",
								shape: {
									/**
									 * Item Attribute Type (Code)
									 *
									 * To ensure automated processing of the article attributes without bilateral reconciliation, only values from the code list UNTDED 6313+Factur-X-Extension should be used.
									 */
									typeCode: {
										type: "string",
										description: `**Item Attribute Type (Code)**

To ensure automated processing of the article attributes without bilateral reconciliation, only values from the code list UNTDED 6313+Factur-X-Extension should be used.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic[line-item-attributes]/ram:TypeCode",
									},
									/**
									 * Item Attribute Value (numerical measurand)
									 */
									measureValue: {
										type: "string | number",
										description: "Item Attribute Value (numerical measurand)",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic[line-item-attributes]/ram:ValueMeasure",
									},
									/**
									 * Unit of measure
									 */
									measureUnit: {
										type: "string",
										description: "Unit of measure",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic[line-item-attributes]/ram:ValueMeasure/@unitCode",
									},
								},
							},
							classification: {
								type: "object",
								shape: {
									/**
									 * Classification name
									 *
									 * Name used to classify an item according to its type or nature.
									 */
									name: {
										type: "string",
										description: `**Classification name**

Name used to classify an item according to its type or nature.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification/ram:ClassName",
									},
								},
							},
							/**
							 * Item (Trade Product) Instances
							 */
							instances: {
								type: "object[]",
								description: "Item (Trade Product) Instances",
								group: "line-item-instances",
								required: false,
								shape: {
									/**
									 * Item (Trade Product) Instances Batch ID
									 *
									 * The unique batch identifier for this trade product instance
									 */
									batchIdentifier: {
										type: "string",
										description: `**Item (Trade Product) Instances Batch ID**

The unique batch identifier for this trade product instance`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IndividualTradeProductInstance[line-item-instances]/ram:BatchID",
									},
									/**
									 * Item (Trade Product) Instances Supplier Serial ID
									 *
									 * The unique supplier assigned serial identifier for this trade product instance
									 */
									supplierSerialIdentifier: {
										type: "string",
										description: `**Item (Trade Product) Instances Supplier Serial ID**

The unique supplier assigned serial identifier for this trade product instance`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IndividualTradeProductInstance[line-item-instances]/ram:SupplierAssignedSerialID",
									},
								},
							},
							/**
							 * An included product referenced from this trade product.
							 */
							referencedProduct: {
								type: "object[]",
								description:
									"An included product referenced from this trade product.",
								required: false,
								group: "line-item-referenced-product",
								shape: {
									/**
									 * ID of Included Referenced Product
									 *
									 * Article identifier for interoperability with Order-X
									 */
									identifier: {
										type: "string",
										description: `**ID of Included Referenced Product**

Article identifier for interoperability with Order-X`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:ID",
									},
									/**
									 * Global ID of Included Referenced Product
									 *
									 * An item identifier based on a registered scheme.
									 */
									globalIdentifier: {
										type: "object",
										description: `**Global ID of Included Referenced Product**

An item identifier based on a registered scheme.`,
										required: false,
										shape: {
											/**
											 * Global ID of Included Referenced Product
											 *
											 * An item identifier based on a registered scheme.
											 */
											value: {
												type: "string",
												description: `**Global ID of Included Referenced Product**

An item identifier based on a registered scheme.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:GlobalID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Item standard identifier
											 *
											 * The identification scheme shall be identified from the entries of the list published by the ISO/IEC 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

The identification scheme identifier of the Item standard identifier

The identification scheme shall be identified from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:GlobalID/@schemeID",
											},
										},
									},
									/**
									 * SellerAssignedID of Included Referenced Product
									 *
									 * An identifier, assigned by the Seller, for the item.
									 */
									sellerAssignedID: {
										type: "string",
										description: `**SellerAssignedID of Included Referenced Product**

An identifier, assigned by the Seller, for the item.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:SellerAssignedID",
									},
									/**
									 * BuyerAssignedID of Included Referenced Product
									 *
									 * An identifier, assigned by the Buyer, for the item.
									 */
									buyerAssignedID: {
										type: "string",
										description: `**BuyerAssignedID of Included Referenced Product**

An identifier, assigned by the Buyer, for the item.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:BuyerAssignedID",
									},
									/**
									 * IndustryAssignedID of Included Referenced Product
									 *
									 * Article identifier for interoperability with Order-X
									 */
									industryAssignedID: {
										type: "string",
										description: `**IndustryAssignedID of Included Referenced Product**

Article identifier for interoperability with Order-X`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:IndustryAssignedID",
									},
									/**
									 * Name of Included Referenced Product
									 */
									name: {
										type: "string",
										description: "Name of Included Referenced Product",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:Name",
									},
									/**
									 * Description of Included Referenced Product
									 *
									 * A description for an item.
									 *
									 * The Item description allows for describing the item and its features in more detail than the Item name.
									 */
									description: {
										type: "string",
										description: `**Description of Included Referenced Product**

A description for an item.

The Item description allows for describing the item and its features in more detail than the Item name.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:Description",
									},
									/**
									 * UnitQuantity of Included Referenced Product
									 */
									measureValue: {
										type: "string | number",
										description: "UnitQuantity of Included Referenced Product",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:UnitQuantity",
									},
									/**
									 * Measurement unit
									 */
									measureUnit: {
										type: "string",
										description: "Measurement unit",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:UnitQuantity/@unitCode",
									},
								},
							},
						},
					},
					tradeAgreement: {
						type: "object",
						shape: {
							/**
							 * Details of an seller order document reference
							 */
							sellerOrderReference: {
								type: "object",
								description: "Details of an seller order document reference",
								required: false,
								shape: {
									/**
									 * Document number
									 */
									issuerAssignedID: {
										type: "string | number",
										description: "Document number",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:IssuerAssignedID",
									},
									/**
									 * Referenced position
									 */
									lineID: {
										type: "string | number",
										description: "Referenced position",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:LineID",
									},
									/**
									 * Document date
									 */
									date: {
										type: "date",
										description: "Document date",
										required: false,
										transform: {
											input: dateTimeStringFormatter,
										},
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
												"102",
										},
									},
								},
							},
							buyerOrderReference: {
								type: "object",
								shape: {
									/**
									 * Order Id
									 */
									issuerAssignedID: {
										type: "string",
										description: "Order Id",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:IssuerAssignedID",
									},
									/**
									 * Order date
									 */
									date: {
										type: "date",
										description: "Order date",
										required: false,
										transform: {
											input: dateTimeStringFormatter,
										},
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
												"102",
										},
									},
								},
							},
							/**
							 * Details of an quotation document reference
							 */
							quotationReference: {
								type: "object",
								description: "Details of an quotation document reference",
								shape: {
									/**
									 * Document number
									 */
									issuerAssignedID: {
										type: "string",
										description: "Document number",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:IssuerAssignedID",
									},
									/**
									 * Referenced position
									 */
									lineID: {
										type: "string | number",
										description: "Referenced position",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:LineID",
									},
									/**
									 * Document date
									 */
									date: {
										type: "date",
										description: "Document date",
										required: false,
										transform: {
											input: dateTimeStringFormatter,
										},
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
												"102",
										},
									},
								},
							},
							/**
							 * Detailed information on the associated contract
							 */
							contractReference: {
								type: "object",
								description: "Detailed information on the associated contract",
								required: false,
								shape: {
									/**
									 * Contract number
									 */
									issuerAssignedID: {
										type: "string",
										description: "Contract number",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:IssuerAssignedID",
									},
									/**
									 * Contract position
									 */
									lineID: {
										type: "string | number",
										description: "Contract position",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:LineID",
									},
									/**
									 * Contract Date
									 */
									date: {
										type: "date",
										description: "Contract Date",
										required: false,
										transform: {
											input: dateTimeStringFormatter,
										},
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
												"102",
										},
									},
								},
							},
							/**
							 * Details of an additional document reference
							 */
							additionalDocument: {
								type: "object[]",
								description: "Details of an additional document reference",
								required: false,
								group: "line-item-additional-document",
								shape: {
									/**
									 * Document number
									 */
									issuerAssignedID: {
										type: "string",
										description: "Document number",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:IssuerAssignedID",
									},
									/**
									 * External document location
									 *
									 * The URL (Uniform Resource Locator) that identifies where the external document is located.
									 *
									 * A means of locating the resource including its primary access mechanism, e.g. http:// or ftp://.
									 * External document location shall be used if the Buyer requires additional information to support the Invoice.
									 * External documents do not form part of the invoice. Risks can be involved when accessing external documents.
									 */
									externalLocation: {
										type: "string",
										description: `**External document location**

The URL (Uniform Resource Locator) that identifies where the external document is located.

A means of locating the resource including its primary access mechanism, e.g. http:// or ftp://.
External document location shall be used if the Buyer requires additional information to support the Invoice.
External documents do not form part of the invoice. Risks can be involved when accessing external documents.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:URIID",
									},
									/**
									 * Referenced position
									 */
									lineID: {
										type: "string | number",
										description: "Referenced position",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:LineID",
									},
									/**
									 * Type of the document (code)
									 */
									typeCode: {
										type: "string",
										description: "Type of the document (code)",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:TypeCode",
									},
									/**
									 * Document description
									 */
									description: {
										type: "string",
										description: "Document description",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:Name",
									},
									/**
									 * Attached document
									 *
									 * An attached document embedded as binary object or sent together with the invoice.
									 *
									 * Attached document is used when documentation shall be stored with the Invoice for future reference or audit purposes.
									 */
									content: {
										// ! TODO: Add binary
										type: "string",
										description: `**Attached document**

An attached document embedded as binary object or sent together with the invoice.

Attached document is used when documentation shall be stored with the Invoice for future reference or audit purposes.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:AttachmentBinaryObject",
									},
									/**
									 * Attached document Mime code
									 *
									 * The mime code of the attached document.
									 */
									mimeCode: {
										type: "string",
										description: `**Attached document Mime code**

The mime code of the attached document.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:AttachmentBinaryObject/@mimeCode",
									},
									/**
									 * Attached document Filename
									 *
									 * The file name of the attached document
									 */
									filename: {
										type: "string",
										description: `**Attached document Filename**

The file name of the attached document`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:AttachmentBinaryObject/@filename",
									},
									/**
									 * Type of the document reference (code)
									 */
									referenceTypeCode: {
										type: "string",
										description: "Type of the document reference (code)",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:ReferenceTypeCode",
									},
									/**
									 * Document date
									 */
									date: {
										type: "date",
										description: "Document date",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:FormattedIssueDateTime/qdt:DateTimeString",
									},
								},
							},
							grossTradePrice: {
								type: "object",
								shape: {
									discounts: {
										type: "object",
										shape: {
											/**
											 * Discount in percent
											 */
											calculationPercent: {
												type: "string | number",
												description: "Discount in percent",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:CalculationPercent",
											},
											/**
											 * Discount base amount
											 */
											basisAmount: {
												type: "string | number",
												description: "Discount base amount",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:BasisAmount",
											},
											/**
											 * Reason for the discount (code)
											 *
											 * Use entries of the UNTDID 5189 code list [6]. The Invoice line level allowance reason code and the Invoice line level allowance reason shall indicate the same allowance reason.
											 */
											reasonCode: {
												type: UNTDID_5189.map(({ code }) => code),
												description: `**Reason for the discount (code)**

Use entries of the UNTDID 5189 code list [6]. The Invoice line level allowance reason code and the Invoice line level allowance reason shall indicate the same allowance reason.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:ReasonCode",
											},
											/**
											 * Reason for the discount (free text)
											 */
											reason: {
												type: "string",
												description: "Reason for the discount (free text)",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:Reason",
											},
										},
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:ChargeIndicator/udt:Indicator":
												"false",
										},
									},
									/**
									 * Price-related surcharges
									 */
									surcharges: {
										type: "object[]",
										description: "Price-related surcharges",
										sibling: (data, { line }) =>
											data.transaction.line[line]?.tradeAgreement
												?.grossTradePrice?.discounts,
										group: "line-item-surcharges",
										shape: {
											/**
											 * Charge in percent
											 */
											calculationPercent: {
												type: "string | number",
												description: "Charge in percent",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:CalculationPercent",
												additionalXml: {
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:ChargeIndicator/udt:Indicator":
														"true",
												},
											},
											/**
											 * Charge base amount
											 */
											basisAmount: {
												type: "string | number",
												description: "Charge base amount",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:BasisAmount",
												additionalXml: {
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:ChargeIndicator/udt:Indicator":
														"true",
												},
											},
											/**
											 * Charge amount
											 *
											 * The surcharge added to the gross price to calculate the net price
											 *
											 * Only applies if the surcharge is given per unit and is not included in the gross price.
											 */
											actualAmount: {
												type: "string | number",
												description: `**Charge amount**

The surcharge added to the gross price to calculate the net price

Only applies if the surcharge is given per unit and is not included in the gross price.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:ActualAmount",
												additionalXml: {
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:ChargeIndicator/udt:Indicator":
														"true",
												},
											},
											/**
											 * Reason for the charge (code)
											 *
											 * Use entries of the UNTDID 7161 code list [6]. The Invoice line charge reason code and the Invoice line charge reason shall indicate the same charge reason.
											 */
											reasonCode: {
												type: UNTDID_7161.map(({ code }) => code),
												description: `**Reason for the charge (code)**

Use entries of the UNTDID 7161 code list [6]. The Invoice line charge reason code and the Invoice line charge reason shall indicate the same charge reason.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:ReasonCode",
												additionalXml: {
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:ChargeIndicator/udt:Indicator":
														"true",
												},
											},
											/**
											 * Reason for the charge (free text)
											 */
											reason: {
												type: "string",
												description: "Reason for the charge (free text)",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:Reason",
												additionalXml: {
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:ChargeIndicator/udt:Indicator":
														"true",
												},
											},
										},
									},
								},
							},
							netTradePrice: {
								type: "object",
								shape: {
									/**
									 * Included tax for B2C
									 */
									tradeTax: {
										type: "object",
										description: "Included tax for B2C",
										required: false,
										shape: {
											/**
											 * Included tax for B2C
											 */
											calculatedAmount: {
												type: "string | number",
												description: "Included tax for B2C",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:CalculatedAmount",
											},
											/**
											 * VAT exemption reason text
											 *
											 * A textual statement of the reason why the amount is exempted from VAT or why no VAT is being charged
											 */
											exemptionReason: {
												type: "string",
												description: `**VAT exemption reason text**

A textual statement of the reason why the amount is exempted from VAT or why no VAT is being charged`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:ExemptionReason",
											},
											/**
											 * VAT exemption reason code
											 *
											 * A coded statement of the reason for why the amount is exempted from VAT.
											 *
											 * Code list issued and maintained by the Connecting Europe Facility.
											 */
											exemptionReasonCode: {
												type: "string",
												description: `**VAT exemption reason code**

A coded statement of the reason for why the amount is exempted from VAT.

Code list issued and maintained by the Connecting Europe Facility.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:ExemptionReasonCode",
											},
											/**
											 * VAT category code
											 *
											 * Coded identification of a VAT category.
											 *
											 * The following entries of UNTDID 5305 [6] are used (further clarification between brackets):
											 * - Standard rate (Liable for VAT in a standard way)
											 * - Zero rated goods (Liable for VAT with a percentage rate of zero)
											 * - Exempt from tax (VAT/IGIC/IPSI)
											 * - VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)
											 * - VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)
											 * - Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)
											 * - Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)
											 * - Canary Islands General Indirect Tax (Liable for IGIC tax)
											 * - Liable for IPSI (Ceuta/Melilla tax)
											 */
											categoryCode: {
												type: UNTDID_5305.map(({ code }) => code),
												description: `**VAT category code**

Coded identification of a VAT category.

The following entries of UNTDID 5305 [6] are used (further clarification between brackets):
- Standard rate (Liable for VAT in a standard way)
- Zero rated goods (Liable for VAT with a percentage rate of zero)
- Exempt from tax (VAT/IGIC/IPSI)
- VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)
- VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)
- Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)
- Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)
- Canary Islands General Indirect Tax (Liable for IGIC tax)
- Liable for IPSI (Ceuta/Melilla tax)`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:CategoryCode",
											},
											/**
											 * VAT category rate
											 *
											 * The VAT rate, represented as percentage that applies for the relevant VAT category.
											 *
											 * The VAT category code and the VAT category rate shall be consistent.
											 */
											rateApplicablePercent: {
												type: "string | number",
												description: `**VAT category rate**

The VAT rate, represented as percentage that applies for the relevant VAT category.

The VAT category code and the VAT category rate shall be consistent.`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:RateApplicablePercent",
											},
										},
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:TypeCode":
												"VAT",
										},
									},
								},
							},
							/**
							 * Details on referenced customer order
							 */
							customerOrderReference: {
								type: "object[]",
								description: "Details on referenced customer order",
								group: "line-item-customer-order-reference",
								required: false,
								shape: {
									/**
									 * Order number of the final customer
									 */
									issuerAssignedID: {
										type: "string",
										description: "Order number of the final customer",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument[line-item-customer-order-reference]/ram:IssuerAssignedID",
									},
									/**
									 * Order item (ultimate customer)
									 */
									lineID: {
										type: "string | number",
										description: "Order item (ultimate customer)",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument[line-item-customer-order-reference]/ram:LineID",
									},
									/**
									 * Document date
									 */
									date: {
										type: "date",
										description: "Document date",
										required: false,
										transform: {
											input: dateTimeStringFormatter,
										},
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument[line-item-customer-order-reference]/ram:FormattedIssueDateTime/qdt:DateTimeString",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument[line-item-customer-order-reference]/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
												"102",
										},
									},
								},
							},
						},
					},
					tradeDelivery: {
						type: "object",
						shape: {
							/**
							 * Quantity, without charge
							 */
							chargeFreeQuantity: {
								type: "object",
								description: "Quantity, without charge",
								required: false,
								shape: {
									/**
									 * Quantity, without charge
									 */
									value: {
										type: "string | number",
										description: "Quantity, without charge",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ChargeFreeQuantity",
									},
									/**
									 * Unit of measure
									 */
									unit: {
										type: "string",
										description: "Unit of measure",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ChargeFreeQuantity/@unitCode",
									},
								},
							},
							/**
							 * Package quantity
							 */
							packageQuantity: {
								type: "object",
								description: "Package quantity",
								required: false,
								shape: {
									/**
									 * Package quantity
									 */
									value: {
										type: "string | number",
										description: "Package quantity",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:PackageQuantity",
									},
									/**
									 * Unit of measure
									 */
									unit: {
										type: "string",
										description: "Unit of measure",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:PackageQuantity/@unitCode",
									},
								},
							},
							/**
							 * Detailed information on the deviating goods recipient
							 */
							shipTo: {
								type: "object",
								description:
									"Detailed information on the deviating goods recipient",
								required: false,
								shape: {
									/**
									 * Goods recipient identifier
									 *
									 * A previously exchanged assigned identifier of the business partner.
									 */
									identifier: {
										type: "string",
										description: `**Goods recipient identifier**

A previously exchanged assigned identifier of the business partner.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:ID",
									},
									/**
									 * Goods recipient global identifier
									 *
									 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
									 */
									globalIdentifier: {
										type: "object",
										description: `**Goods recipient global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
										required: false,
										shape: {
											/**
											 * Goods recipient global identifier
											 *
											 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
											 */
											value: {
												type: "string",
												description: `**Goods recipient global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:GlobalID",
											},
											/**
											 * Scheme identifier
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:GlobalID/@schemeID",
											},
										},
									},
									/**
									 * ShipTo name
									 */
									name: {
										type: "string",
										description: "ShipTo name",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:Name",
									},
									/**
									 * Role (code)
									 *
									 * A code qualifying the role
									 *
									 * To be chosen from UNTDID 3035.
									 */
									roleCode: {
										type: "string",
										description: `**Role (code)**

A code qualifying the role

To be chosen from UNTDID 3035.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:RoleCode",
									},
									/**
									 * ShipTo details about the organization
									 */
									organization: {
										type: "object",
										description: "ShipTo details about the organization",
										required: false,
										shape: {
											/**
											 * ShipTo Legal ID
											 *
											 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
											 */
											identifier: {
												type: "object",
												description: `**ShipTo Legal ID**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
												required: false,
												shape: {
													/**
													 * ShipTo Legal ID
													 *
													 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
													 */
													value: {
														type: "string",
														description: `**ShipTo Legal ID**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
													},
													/**
													 * Scheme identifier
													 *
													 * The identification scheme identifier of the Buyer legal registration identifier.
													 *
													 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
													 */
													schemeIdentifier: {
														type: "string",
														description: `**Scheme identifier**

The identification scheme identifier of the Buyer legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.`,
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
													},
												},
											},
											/**
											 * Trading Business Name
											 *
											 * This may be used if different from the party name.
											 */
											businessName: {
												type: "string",
												description: `**Trading Business Name**

This may be used if different from the party name.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
											},
											/**
											 * Detailed contact information of the goods recipient
											 */
											tradeContact: {
												type: "object",
												description:
													"Detailed contact information of the goods recipient",
												required: false,
												shape: {
													/**
													 * Name of the contact
													 *
													 * If a contact person is indicated, either the name or the department is to be transmitted.
													 */
													name: {
														type: "string",
														description: `**Name of the contact**

If a contact person is indicated, either the name or the department is to be transmitted.`,
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:PersonName",
													},
													/**
													 * Department name
													 *
													 * If a contact person is indicated, either the name or the department is to be transmitted.
													 */
													departmentName: {
														type: "string",
														description: `**Department name**

If a contact person is indicated, either the name or the department is to be transmitted.`,
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
													},
													/**
													 * Type of contact (code)
													 *
													 * The code specifying the type of trade contact
													 *
													 * To be chosen from the entries of UNTDID 3139
													 */
													typeCode: {
														type: "string",
														description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode",
													},
													/**
													 * Contact telephone number
													 *
													 * A phone number for the contact point.
													 */
													telephoneNumber: {
														type: "string",
														description: `**Contact telephone number**

A phone number for the contact point.`,
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
													},
													/**
													 * Contact point fax number
													 */
													faxNumber: {
														type: "string",
														description: "Contact point fax number",
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
													},
													/**
													 * Contact email address
													 *
													 * An e-mail address for the contact point.
													 */
													emailAddress: {
														type: "string",
														description: `**Contact email address**

An e-mail address for the contact point.`,
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
													},
												},
											},
										},
									},
									/**
									 * Detailed information about the address of the goods recipient
									 */
									postalAddress: {
										type: "object",
										description:
											"Detailed information about the address of the goods recipient",
										required: false,
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string | number",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: "string",
												description: `**City**

The common name of the city, town or village.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
											/**
											 * Details about the electronic address
											 */
											electronicAddress: {
												type: "object",
												description: "Details about the electronic address",
												required: false,
												shape: {
													/**
													 * Electronic address
													 */
													value: {
														type: "string",
														description: "Electronic address",
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:URIUniversalCommunication/ram:URIID",
													},
													/**
													 * Scheme identifier
													 */
													schemeIdentifier: {
														type: "string",
														description: "Scheme identifier",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
													},
												},
											},
										},
									},
									/**
									 * Detailed information on tax information of the goods recipient
									 */
									taxRegistration: {
										type: "object",
										description:
											"Detailed information on tax information of the goods recipient",
										required: false,
										shape: {
											/**
											 * VAT ID
											 */
											identifier: {
												type: "string",
												description: "VAT ID",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
												additionalXml: {
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID":
														"VA",
												},
											},
										},
									},
								},
							},
							/**
							 * Detailed information on the deviating final recipient
							 */
							deviatingShipTo: {
								type: "object",
								description:
									"Detailed information on the deviating final recipient",
								required: false,
								shape: {
									/**
									 * Final recipient identifier
									 *
									 * A previously exchanged assigned identifier of the business partner.
									 */
									identifier: {
										type: "string",
										description: `**Final recipient identifier**

A previously exchanged assigned identifier of the business partner.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:ID",
									},
									/**
									 * Final recipient global identifier
									 *
									 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
									 */
									globalIdentifier: {
										type: "object",
										description: `**Final recipient global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
										required: false,
										shape: {
											/**
											 * Final recipient global identifier
											 *
											 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
											 */
											value: {
												type: "string",
												description: `**Final recipient global identifier**

GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:GlobalID",
											},
											/**
											 * Scheme identifier
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:GlobalID/@schemeID",
											},
										},
									},
									/**
									 * Final Recipient Name / Company Name
									 */
									name: {
										type: "string",
										description: "Final Recipient Name / Company Name",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:Name",
									},
									/**
									 * Role (code)
									 *
									 * A code qualifying the role
									 *
									 * To be chosen from UNTDID 3035.
									 */
									roleCode: {
										type: "string",
										description: `**Role (code)**

A code qualifying the role

To be chosen from UNTDID 3035.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:RoleCode",
									},
									/**
									 * Details about the organization
									 */
									organization: {
										type: "object",
										description: "Details about the organization",
										required: false,
										shape: {
											/**
											 * Company Registration Number
											 *
											 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
											 */
											identifier: {
												type: "object",
												description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
												required: false,
												shape: {
													/**
													 * Company Registration Number
													 *
													 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
													 */
													value: {
														type: "string",
														description: `**Company Registration Number**

An identifier issued by an official registrar that identifies the party as a legal entity or person.`,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
													},
													/**
													 * Scheme identifier
													 *
													 * The identification scheme identifier of the Buyer legal registration identifier.
													 *
													 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
													 */
													schemeIdentifier: {
														type: "string",
														description: `**Scheme identifier**

The identification scheme identifier of the Buyer legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.`,
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
													},
												},
											},
											/**
											 * Trading Business Name
											 *
											 * A name by which the party is known, other than party name (also known as business name).
											 *
											 * This may be used if different from the party name.
											 */
											businessName: {
												type: "string",
												description: `**Trading Business Name**

A name by which the party is known, other than party name (also known as business name).

This may be used if different from the party name.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
											},
										},
									},
									/**
									 * Detailed contact information of the final goods recipient
									 */
									tradeContact: {
										type: "object",
										description:
											"Detailed contact information of the final goods recipient",
										required: false,
										shape: {
											/**
											 * Name of the contact
											 *
											 * If a contact person is indicated, either the name or the department is to be transmitted.
											 */
											name: {
												type: "string",
												description: `**Name of the contact**

If a contact person is indicated, either the name or the department is to be transmitted.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:PersonName",
											},
											/**
											 * Department name
											 *
											 * If a contact person is indicated, either the name or the department is to be transmitted.
											 */
											departmentName: {
												type: "string",
												description: `**Department name**

If a contact person is indicated, either the name or the department is to be transmitted.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
											},
											/**
											 * Type of contact (code)
											 *
											 * The code specifying the type of trade contact
											 *
											 * To be chosen from the entries of UNTDID 3139
											 */
											typeCode: {
												type: "string",
												description: `**Type of contact (code)**

The code specifying the type of trade contact

To be chosen from the entries of UNTDID 3139`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode",
											},
											/**
											 * Contact telephone number
											 *
											 * A phone number for the contact point.
											 */
											telephoneNumber: {
												type: "string",
												description: `**Contact telephone number**

A phone number for the contact point.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
											},
											/**
											 * Contact point fax number
											 */
											faxNumber: {
												type: "string",
												description: "Contact point fax number",
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
											},
											/**
											 * Contact email address
											 *
											 * An e-mail address for the contact point.
											 */
											emailAddress: {
												type: "string",
												description: `**Contact email address**

An e-mail address for the contact point.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
											},
										},
									},
									/**
									 * Detailed information about the address of the final goods recipient
									 */
									postalAddress: {
										type: "object",
										description:
											"Detailed information about the address of the final goods recipient",
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: "string",
												description: `**Post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: "string",
												description: `**Address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: "string",
												description: `**Address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: "string",
												description: `**Address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: "string",
												description: `**Country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: "string",
												description: `**Country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											},
											/**
											 * Details about the electronic address
											 */
											electronicAddress: {
												type: "object",
												description: "Details about the electronic address",
												required: false,
												shape: {
													/**
													 * Electronic address
													 */
													value: {
														type: "string",
														description: "Electronic address",
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:URIUniversalCommunication/ram:URIID",
													},
													/**
													 * Scheme identifier
													 */
													schemeIdentifier: {
														type: "string",
														description: "Scheme identifier",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
													},
												},
											},
											/**
											 * Detailed information on tax information of the final goods recipient
											 */
											taxRegistration: {
												type: "object",
												description:
													"Detailed information on tax information of the final goods recipient",
												required: false,
												shape: {
													/**
													 * VAT ID
													 */
													identifier: {
														type: "string",
														description: "VAT ID",
														required: false,
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
														additionalXml: {
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID":
																"VA",
														},
													},
												},
											},
										},
									},
								},
							},
							/**
							 * Detailed information about the actual delivery
							 */
							information: {
								type: "object",
								description: "Detailed information about the actual delivery",
								required: false,
								shape: {
									/**
									 * Actual delivery date for this line
									 *
									 * The VAT relevant date of delivery and achievement must be specified on the level of document.
									 */
									deliveryDate: {
										type: "date",
										description: `**Actual delivery date for this line**

The VAT relevant date of delivery and achievement must be specified on the level of document.`,
										required: false,
										transform: {
											input: dateTimeStringFormatter,
										},
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString/@format":
												"102",
										},
									},
								},
							},
							/**
							 * Detailed information on the corresponding despatch advice
							 */
							despatchAdvice: {
								type: "object",
								description:
									"Detailed information on the corresponding despatch advice",
								required: false,
								shape: {
									/**
									 * Despatch advice number
									 */
									issuerAssignedID: {
										type: "string",
										description: "Despatch advice number",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:IssuerAssignedID",
									},
									/**
									 * Despatch advice item
									 */
									lineID: {
										type: "string | number",
										description: "Despatch advice item",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:LineID",
									},
									/**
									 * Document date
									 */
									date: {
										type: "date",
										description: "Document date",
										transform: {
											input: dateTimeStringFormatter,
										},
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
												"102",
										},
									},
								},
							},
							/**
							 * Detailed information on the corresponding goods receipt
							 */
							receivingAdvice: {
								type: "object",
								description:
									"Detailed information on the corresponding goods receipt",
								required: false,
								shape: {
									/**
									 * Goods receipt number
									 */
									issuerAssignedID: {
										type: "string",
										description: "Goods receipt number",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:IssuerAssignedID",
									},
									/**
									 * Goods receipt item
									 */
									lineID: {
										type: "string | number",
										description: "Goods receipt item",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:LineID",
									},
									/**
									 * Document date
									 */
									date: {
										type: "date",
										description: "Document date",
										transform: {
											input: dateTimeStringFormatter,
										},
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
												"102",
										},
									},
								},
							},
							/**
							 * Detailed information about the corresponding delivery note
							 */
							deliveryNote: {
								type: "object",
								description:
									"Detailed information about the corresponding delivery note",
								required: false,
								shape: {
									/**
									 * Delivery note number
									 */
									issuerAssignedID: {
										type: "string",
										description: "Delivery note number",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:IssuerAssignedID",
									},
									/**
									 * Delivery note item
									 */
									lineID: {
										type: "string | number",
										description: "Delivery note item",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:LineID",
									},
									/**
									 * Document date
									 */
									date: {
										type: "date",
										description: "Document date",
										required: false,
										transform: {
											input: dateTimeStringFormatter,
										},
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
												"102",
										},
									},
								},
							},
						},
					},
					tradeSettlement: {
						type: "object",
						shape: {
							tradeTax: {
								type: "object",
								shape: {
									/**
									 * Tax amount
									 *
									 * Specification only for taxes that are not VAT
									 */
									calculatedAmount: {
										type: "string | number",
										description: `**Tax amount**

Specification only for taxes that are not VAT`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:CalculatedAmount",
									},
									/**
									 * VAT exemption reason text
									 *
									 * A textual statement of the reason why the amount is exempted from VAT or why no VAT is being charged
									 */
									exemptionReason: {
										type: "string",
										description: `**VAT exemption reason text**

A textual statement of the reason why the amount is exempted from VAT or why no VAT is being charged`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:ExemptionReason",
									},
									/**
									 * VAT exemption reason code
									 *
									 * A coded statement of the reason for why the amount is exempted from VAT.
									 *
									 * Code list issued and maintained by the Connecting Europe Facility.
									 */
									exemptionReasonCode: {
										type: "string",
										description: `**VAT exemption reason code**

A coded statement of the reason for why the amount is exempted from VAT.

Code list issued and maintained by the Connecting Europe Facility.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:ExemptionReasonCode",
									},
								},
							},
							monetarySummation: {
								type: "object",
								shape: {
									/**
									 * Total amount of line item charges
									 */
									chargeTotalAmount: {
										type: "string | number",
										description: "Total amount of line item charges",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:ChargeTotalAmount",
									},
									/**
									 * Total amount of line item allowances
									 */
									allowanceTotalAmount: {
										type: "string | number",
										description: "Total amount of line item allowances",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:AllowanceTotalAmount",
									},
									/**
									 * Total amount of line item taxes
									 */
									taxTotalAmount: {
										type: "string | number",
										description: "Total amount of line item taxes",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:TaxTotalAmount",
									},
									/**
									 * Total line item gross amount
									 */
									grandTotalAmount: {
										type: "string | number",
										description: "Total line item gross amount",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:GrandTotalAmount",
									},
									/**
									 * Total amount of allowances / charges
									 */
									totalAllowanceChargeAmount: {
										type: "string | number",
										description: "Total amount of allowances / charges",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:TotalAllowanceChargeAmount",
									},
								},
							},
							/**
							 * Precending invoice reference
							 *
							 * A group of business terms providing information on one or more preceding Invoices.
							 *
							 * To be used in case:
							 * - a preceding invoice is corrected
							 * - preceding partial invoices are refered to from a final invoice
							 * - preceding pre-payment invoices are refered to from a final invoice
							 */
							precendingInvoices: {
								type: "object[]",
								description: `**Precending invoice reference**

A group of business terms providing information on one or more preceding Invoices.

To be used in case:
- a preceding invoice is corrected
- preceding partial invoices are refered to from a final invoice
- preceding pre-payment invoices are refered to from a final invoice`,
								required: false,
								group: "line-item-precending-invoice",
								shape: {
									/**
									 * Preceding Invoice reference
									 *
									 * The identification of an Invoice that was previously sent by the Seller.
									 */
									issuerAssignedID: {
										type: "string",
										description: `**Preceding Invoice reference**

The identification of an Invoice that was previously sent by the Seller.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument[line-item-precending-invoice]/ram:IssuerAssignedID",
									},
									/**
									 * Referenced position
									 */
									lineID: {
										type: "string | number",
										description: "Referenced position",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument[line-item-precending-invoice]/ram:LineID",
									},
									/**
									 * Preceding incoive type code
									 *
									 * Can be used in case of final invoive after prepaid invoice, in order to refernce the previous prepaid invoices.
									 * Codelist UNCL 1001 restricted like BT-3.
									 */
									typeCode: {
										type: "string",
										description: `**Preceding incoive type code**

Can be used in case of final invoive after prepaid invoice, in order to refernce the previous prepaid invoices.
Codelist UNCL 1001 restricted like BT-3.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument[line-item-precending-invoice]/ram:TypeCode",
									},
									/**
									 * Preceding Invoice issue date
									 *
									 * The date on which the preceding Invoice was issued.
									 *
									 * The Preceding Invoice issue date shall be provided in case the Preceding Invoice identifier is not unique.
									 */
									date: {
										type: "date",
										description: `**Preceding Invoice issue date**

The date on which the preceding Invoice was issued.

The Preceding Invoice issue date shall be provided in case the Preceding Invoice identifier is not unique.`,
										required: false,
										transform: {
											input: dateTimeStringFormatter,
										},
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument[line-item-precending-invoice]/ram:FormattedIssueDateTime/qdt:DateTimeString",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument[line-item-precending-invoice]/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
												"102",
										},
									},
								},
							},
							buyerAccountant: {
								type: "object",
								shape: {
									/**
									 * Accounting reference (Code)
									 */
									typeCode: {
										type: "string",
										description: "Accounting reference (Code)",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:TypeCode",
									},
								},
							},
						},
					},
				},
			},
		},
	},
} satisfies Schema;
