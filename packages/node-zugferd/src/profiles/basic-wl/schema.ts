import { dateTimeStringFormatter } from "../../utils/helper";
import { type Schema } from "../../types/schema";
import { UNTDID_5305 } from "../../codelists/untdid/5305";
import { UNTDID_5189 } from "../../codelists/untdid/5189";
import { UNTDID_4461 } from "../../codelists/untdid/4461";
import { UNTDID_7161 } from "../../codelists/untdid/7161";
import { UNTDID_4451 } from "../../codelists/untdid/4451";

export const basicWlSchema = {
	/**
	 * Invoice Note
	 *
	 * A group of business terms providing textual notes that are relevant for the invoice, together with an indication of the note subject.
	 */
	includedNote: {
		type: "object[]",
		description: `**Invoice Note**

A group of business terms providing textual notes that are relevant for the invoice, together with an indication of the note subject.`,
		required: false,
		group: "notes",
		shape: {
			/**
			 * Invoice note
			 *
			 * A textual note that gives unstructured information that is relevant to the Invoice as a whole.
			 *
			 * Such as the reason for any correction or assignment note in case the invoice has been factored.
			 */
			content: {
				type: "string",
				description: `**Invoice note**

A textual note that gives unstructured information that is relevant to the Invoice as a whole.

Such as the reason for any correction or assignment note in case the invoice has been factored.`,
				xpath:
					"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IncludedNote[notes]/ram:Content",
			},
			/**
			 * Invoice note subject code
			 *
			 * The subject of the textual note in BT-22.
			 *
			 * To be chosen from the entries in UNTDID 4451 [6].
			 *
			 * Among the list, the following codes can be used:
			 * - AAI: General Information
			 * - SUR: Supplier Notes
			 * - REG: Regulatory information
			 * - ABL: Legal Information
			 * - TXD: Tax Information
			 * - CUS: Customs Information
			 */
			subjectCode: {
				type: UNTDID_4451.map(({ code }) => code),
				description: `**Invoice note subject code**

The subject of the textual note in BT-22.

To be chosen from the entries in UNTDID 4451 [6].

Among the list, the following codes can be used:
- AAI: General Information
- SUR: Supplier Notes
- REG: Regulatory information
- ABL: Legal Information
- TXD: Tax Information
- CUS: Customs Information`,
				required: false,
				xpath:
					"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IncludedNote[notes]/ram:SubjectCode",
			},
		},
	},

	transaction: {
		type: "object",
		shape: {
			tradeAgreement: {
				type: "object",
				shape: {
					/**
					 * Details of the associated contract
					 */
					associatedContract: {
						type: "object",
						description: "Details of the associated contract",
						required: false,
						shape: {
							/**
							 * Contract reference
							 *
							 * The identification of a contract.
							 *
							 * The contract identifier should be unique in the context of the specific trading relationship and for a defined time period.
							 *
							 * CHORUSPRO : This is the "numéro de Marché" (contract number)
							 */
							reference: {
								type: "string",
								description: `**Contract reference**

The identification of a contract.

The contract identifier should be unique in the context of the specific trading relationship and for a defined time period.

CHORUSPRO : This is the "numéro de Marché" (contract number)`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ContractReferencedDocument/ram:IssuerAssignedID",
							},
						},
					},

					seller: {
						type: "object",
						shape: {
							/**
							 * Seller identifier
							 *
							 * An identification of the Seller.
							 *
							 * For many systems, the Seller identifier is a key piece of information. Multiple Seller identifiers may be assigned or specified. They may be differentiated by using various identification schemes. If no scheme is specified, it should be known by Buyer and Seller, e.g. a previously exchanged Buyer assigned identifier of the Seller.
							 *
							 * BR-CO-26: In   order   for   the   buyer   to   automatically   identify   a supplier,  the  Seller  identifier  (BT-29),  the  Seller  legal registration  identifier  (BT-30)  and/or  the  Seller  VAT identifier (BT-31) shall be present.
							 */
							identifier: {
								type: "string[]",
								description: `**Seller identifier**

An identification of the Seller.

For many systems, the Seller identifier is a key piece of information. Multiple Seller identifiers may be assigned or specified. They may be differentiated by using various identification schemes. If no scheme is specified, it should be known by Buyer and Seller, e.g. a previously exchanged Buyer assigned identifier of the Seller.

BR-CO-26: In   order   for   the   buyer   to   automatically   identify   a supplier,  the  Seller  identifier  (BT-29),  the  Seller  legal registration  identifier  (BT-30)  and/or  the  Seller  VAT identifier (BT-31) shall be present.`,
								required: false,
								group: "seller-id",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:ID[i]",
							},

							/**
							 * Seller global identifier
							 *
							 * The identification scheme identifier of the seller is a specific identifier given to the seller by a global registration authority.
							 *
							 * The seller’s global ID is a unique identifier assigned to a seller by a global registration body.
							 *
							 * If the seller has a GlobalID, he can qualify it with this attribute. Otherwise, he uses the ID.
							 */
							gloablIdentifier: {
								type: "object",
								description: `**Seller global identifier**

The identification scheme identifier of the seller is a specific identifier given to the seller by a global registration authority.

The seller’s global ID is a unique identifier assigned to a seller by a global registration body.

If the seller has a GlobalID, he can qualify it with this attribute. Otherwise, he uses the ID.`,
								required: false,
								shape: {
									/**
									 * Seller global identifier
									 *
									 * The identification scheme identifier of the seller is a specific identifier given to the seller by a global registration authority.
									 *
									 * The seller’s global ID is a unique identifier assigned to a seller by a global registration body.
									 *
									 * If the seller has a GlobalID, he can qualify it with this attribute. Otherwise, he uses the ID.
									 */
									value: {
										type: "string",
										description: `**Seller global identifier**

The identification scheme identifier of the seller is a specific identifier given to the seller by a global registration authority.

The seller’s global ID is a unique identifier assigned to a seller by a global registration body.

If the seller has a GlobalID, he can qualify it with this attribute. Otherwise, he uses the ID.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:GlobalID",
									},
									/**
									 * Seller identifier identification scheme identifier
									 *
									 * Scheme identifier
									 *
									 * The identification scheme identifier shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
									 *
									 * In particular, the following codes can be used:
									 * - 0021 : SWIFT
									 * - 0060 : DUNS
									 * - 0088 : GLN
									 * - 0177 : ODETTE
									 */
									schemeIdentifier: {
										type: ["0021", "0060", "0088", "0177"],
										description: `**Seller identifier identification scheme identifier**

Scheme identifier

The identification scheme identifier shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.

In particular, the following codes can be used:
- 0021 : SWIFT
- 0060 : DUNS
- 0088 : GLN
- 0177 : ODETTE`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:GlobalID/@schemeID",
									},
								},
							},
							organization: {
								type: "object",
								required: false,
								shape: {
									/**
									 * Seller trading name
									 *
									 * A name by which the Seller is known, other than Seller name (also known as Business name).
									 *
									 * This may be used if different from the Seller name.
									 *
									 * CHORUS PRO: this field is limied to 99 characters.
									 */
									tradingName: {
										type: "string",
										description: `**Seller trading name**

A name by which the Seller is known, other than Seller name (also known as Business name).

This may be used if different from the Seller name.

CHORUS PRO: this field is limied to 99 characters.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									},
								},
							},

							postalAddress: {
								type: "object",
								shape: {
									/**
									 * Seller post code
									 *
									 * The identifier for an addressable group of properties according to the relevant postal service.
									 *
									 * Such as a ZIP code or a post code.
									 */
									postCode: {
										type: "string | number",
										description: `**Seller post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									},
									/**
									 * Seller address line 1
									 *
									 * The main address line in an address.
									 *
									 * Usually the street name and number or post office box.
									 */
									line1: {
										type: "string",
										description: `**Seller address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineOne",
									},
									/**
									 * Seller address line 2
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line2: {
										type: "string",
										description: `**Seller address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									},
									/**
									 * Seller address line 3
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line3: {
										type: "string",
										description: `**Seller address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineThree",
									},
									/**
									 * Seller city
									 *
									 * The common name of the city, town or village, where the Seller address is located.
									 */
									city: {
										type: "string",
										description: `**Seller city**

The common name of the city, town or village, where the Seller address is located.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CityName",
									},
									/**
									 * Seller country subdivision
									 *
									 * The subdivision of a country.
									 *
									 * Such as a region, a county, a state, a province, etc.
									 */
									countrySubdivision: {
										type: "string",
										description: `**Seller country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
											 * Seller electronic address
											 *
											 * Identifies the Seller's electronic address to which a business document may be delivered.
											 */
											value: {
												type: "string",
												description: `**Seller electronic address**

Identifies the Seller's electronic address to which a business document may be delivered.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:URIUniversalCommunication/ram:URIID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Seller electronic address
											 *
											 * The scheme identifier shall be chosen from a list to be maintained by the Connecting Europe Facility.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

The identification scheme identifier of the Seller electronic address

The scheme identifier shall be chosen from a list to be maintained by the Connecting Europe Facility.`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
											},
										},
									},
								},
							},
						},
					},
					/**
					 * Seller Tax Representative Party
					 *
					 * A group of business terms providing information about the Seller's tax representative.
					 *
					 * The "Seller Tax Representative party" block must be filled in if the seller has a tax representative.
					 */
					sellerTaxRepresentative: {
						type: "object",
						description: `**Seller Tax Representative Party**

A group of business terms providing information about the Seller's tax representative.

The "Seller Tax Representative party" block must be filled in if the seller has a tax representative.`,
						required: false,
						shape: {
							/**
							 * Seller tax representative name
							 *
							 * The full name of the Seller's tax representative party.
							 */
							name: {
								type: "string",
								description: `**Seller tax representative name**

The full name of the Seller's tax representative party.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:Name",
							},
							/**
							 * Seller Tax Representative Postal Address
							 *
							 * A group of business terms providing information about the postal address for the tax representative party.
							 *
							 * The seller tax representative name/postal address shall be provided in the invoice, if the seller has a tax representative who is liable to pay the VAT due. Sufficient components of the address are to be filled in order to comply to legal requirements.
							 *
							 * The address block of the Seller Tax Representative is mandatory if the supplier has a tax representative. Like any address, the fields necessary to define the address must appear. The country code is mandatory.
							 *
							 * BR-19: The  Seller  tax  representative  postal  address  (BG-12)  shall be provided in the Invoice, if the Seller (BG-4) has a Seller tax representative party (BG-11).
							 */
							postalAddress: {
								type: "object",
								description: `**Seller Tax Representative Postal Address**

A group of business terms providing information about the postal address for the tax representative party.

The seller tax representative name/postal address shall be provided in the invoice, if the seller has a tax representative who is liable to pay the VAT due. Sufficient components of the address are to be filled in order to comply to legal requirements.

The address block of the Seller Tax Representative is mandatory if the supplier has a tax representative. Like any address, the fields necessary to define the address must appear. The country code is mandatory.

BR-19: The  Seller  tax  representative  postal  address  (BG-12)  shall be provided in the Invoice, if the Seller (BG-4) has a Seller tax representative party (BG-11).`,
								shape: {
									/**
									 * Tax representative post code
									 *
									 * The identifier for an addressable group of properties according to the relevant postal service.
									 *
									 * Such as a ZIP code or a post code.
									 */
									postCode: {
										type: "string",
										description: `**Tax representative post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									},
									/**
									 * Tax representative address line 1
									 *
									 * The main address line in an address.
									 *
									 * Usually the street name and number or the post office box.
									 */
									line1: {
										type: "string",
										description: `**Tax representative address line 1**

The main address line in an address.

Usually the street name and number or the post office box.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineOne",
									},
									/**
									 * Tax representative address line 2
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line2: {
										type: "string",
										description: `**Tax representative address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									},
									/**
									 * Tax representative address line 3
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line3: {
										type: "string",
										description: `**Tax representative address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineThree",
									},
									/**
									 * Tax representative city
									 *
									 * The common name of the city, town or village, where the tax representative address is located.
									 */
									city: {
										type: "string",
										description: `**Tax representative city**

The common name of the city, town or village, where the tax representative address is located.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CityName",
									},
									/**
									 * Tax representative country code
									 *
									 * A code that identifies the country.
									 *
									 * Country where VAT is liable. The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										type: "string",
										description: `**Tax representative country code**

A code that identifies the country.

Country where VAT is liable. The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CountryID",
									},
									/**
									 * Tax representative country subdivision
									 *
									 * The subdivision of a country.
									 *
									 * Such as a region, a county, a state, a province, etc.
									 */
									countrySubdivision: {
										type: "string",
										description: `**Tax representative country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
									 * Seller tax representative VAT identifier
									 *
									 * The VAT identifier of the Seller's tax representative party.
									 *
									 * VAT number prefixed by a country code based on EN ISO 3166-1 "Codes for the representation of names of countries and their subdivisions".
									 */
									vatIdentifier: {
										type: "string",
										description: `**Seller tax representative VAT identifier**

The VAT identifier of the Seller's tax representative party.

VAT number prefixed by a country code based on EN ISO 3166-1 "Codes for the representation of names of countries and their subdivisions".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedTaxRegistration[0]/ram:ID",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedTaxRegistration[0]/ram:ID/@schemeID":
												"VA",
										},
									},
								},
							},
						},
					},
					buyer: {
						type: "object",
						shape: {
							/**
							 * Buyer identifier
							 *
							 * An identifier of the Buyer.
							 *
							 * If no scheme is specified, it must be known by Buyer and Seller.
							 */
							identifier: {
								type: "string",
								description: `**Buyer identifier**

An identifier of the Buyer.

If no scheme is specified, it must be known by Buyer and Seller.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:ID",
							},
							/**
							 * Buyer global identifier
							 *
							 * The identification scheme identifier of the seller is a specific identifier given to the seller by a global registration authority.
							 *
							 * GloablID, if global identifier exists and can be stated in @schemeID, ID else
							 * The global identifier of a buyer is the specific identification given to him by a global registry organization.
							 */
							gloablIdentifier: {
								type: "object",
								description: `**Buyer global identifier**

The identification scheme identifier of the seller is a specific identifier given to the seller by a global registration authority.

GloablID, if global identifier exists and can be stated in @schemeID, ID else
The global identifier of a buyer is the specific identification given to him by a global registry organization.`,
								required: false,
								shape: {
									/**
									 * Buyer global identifier
									 *
									 * The identification scheme identifier of the seller is a specific identifier given to the seller by a global registration authority.
									 *
									 * GloablID, if global identifier exists and can be stated in @schemeID, ID else
									 * The global identifier of a buyer is the specific identification given to him by a global registry organization.
									 */
									value: {
										type: "string",
										description: `**Buyer global identifier**

The identification scheme identifier of the seller is a specific identifier given to the seller by a global registration authority.

GloablID, if global identifier exists and can be stated in @schemeID, ID else
The global identifier of a buyer is the specific identification given to him by a global registry organization.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:GlobalID",
									},
									/**
									 * Scheme identifier
									 *
									 * The identification scheme identifier of the Buyer identifier.
									 *
									 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
									 */
									schemeIdentifier: {
										type: "string",
										description: `**Scheme identifier**

The identification scheme identifier of the Buyer identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:GlobalID/@schemeID",
									},
								},
							},

							postalAddress: {
								type: "object",
								shape: {
									/**
									 * Buyer post code
									 *
									 * The identifier for an addressable group of properties according to the relevant postal service.
									 *
									 * Such as a ZIP code or a post code.
									 */
									postCode: {
										type: "string | number",
										description: `**Buyer post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									},
									/**
									 * Buyer address line 1
									 *
									 * The main address line in an address.
									 *
									 * Usually the street name and number or post office box.
									 */
									line1: {
										type: "string",
										description: `**Buyer address line 1**

The main address line in an address.

Usually the street name and number or post office box.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineOne",
									},
									/**
									 * Buyer address line 2
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line2: {
										type: "string",
										description: `**Buyer address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									},
									/**
									 * Buyer address line 3
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line3: {
										type: "string",
										description: `**Buyer address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineThree",
									},
									/**
									 * Buyer city
									 *
									 * The common name of the city, town or village, where the Buyer's address is located.
									 */
									city: {
										type: "string",
										description: `**Buyer city**

The common name of the city, town or village, where the Buyer's address is located.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CityName",
									},
									/**
									 * Buyer country code
									 *
									 * A code that identifies the country.
									 *
									 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										type: "string",
										description: `**Buyer country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CountryID",
									},
									/**
									 * Buyer country subdivision
									 *
									 * The subdivision of a country.
									 *
									 * Such as a region, a county, a state, a province, etc.
									 */
									countrySubdivision: {
										type: "string",
										description: `**Buyer country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
											 * Buyer electronic address
											 *
											 * Identifies the Buyer's electronic address to which a business document should be delivered.
											 */
											value: {
												type: "string",
												description: `**Buyer electronic address**

Identifies the Buyer's electronic address to which a business document should be delivered.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:URIUniversalCommunication/ram:URIID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Buyer electronic address.
											 *
											 * The scheme identifier shall be chosen from a list to be maintained by the Connecting Europe Facility.
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

The identification scheme identifier of the Buyer electronic address.

The scheme identifier shall be chosen from a list to be maintained by the Connecting Europe Facility.`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID",
											},
										},
									},
								},
							},
							/**
							 * Detailed information on buyer tax information
							 */
							taxRegistration: {
								type: "object",
								description: "Detailed information on buyer tax information",
								required: false,
								shape: {
									/**
									 * Buyer VAT identifier
									 *
									 * The Buyer's VAT identifier (also known as Buyer VAT identification number).
									 *
									 * VAT number prefixed by a country code based on EN ISO 3166-1 "Codes for the representation of names of countries and their subdivisions"
									 *
									 * CHORUSPRO: If entered, ChorusPro will not integrate the VAT ID of the buyer because it is the SIRET number that is used to identify a buyer for public entities (BT-47)
									 *
									 * BR-CO-9: The Seller VAT identifier (BT-31), the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48) shall have a prefix in accordance with ISO code ISO 3166-1 alpha-2 by which the country of issue may be identified. Nevertheless, Greece may use the prefix ‘EL’.
									 */
									vatIdentifier: {
										type: "string",
										description: `**Buyer VAT identifier**

The Buyer's VAT identifier (also known as Buyer VAT identification number).

VAT number prefixed by a country code based on EN ISO 3166-1 "Codes for the representation of names of countries and their subdivisions"

CHORUSPRO: If entered, ChorusPro will not integrate the VAT ID of the buyer because it is the SIRET number that is used to identify a buyer for public entities (BT-47)

BR-CO-9: The Seller VAT identifier (BT-31), the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48) shall have a prefix in accordance with ISO code ISO 3166-1 alpha-2 by which the country of issue may be identified. Nevertheless, Greece may use the prefix ‘EL’.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedTaxRegistration[0]/ram:ID",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedTaxRegistration[0]/ram:ID/@schemeID":
												"VA",
										},
									},
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
					 * Delivery Information
					 *
					 * A group of business terms providing information about where and when the goods and services invoiced are delivered.
					 */
					shipTo: {
						type: "object",
						description: `**Delivery Information**

A group of business terms providing information about where and when the goods and services invoiced are delivered.`,
						required: false,
						shape: {
							/**
							 * Deliver to location identifier
							 *
							 * An identifier for the location at which the goods and services are delivered.
							 *
							 * If no scheme is specified, it should be known by Buyer and Seller, e.g. a previously exchanged Buyer or Seller assigned identifier.
							 */
							identifier: {
								type: "string",
								description: `**Deliver to location identifier**

An identifier for the location at which the goods and services are delivered.

If no scheme is specified, it should be known by Buyer and Seller, e.g. a previously exchanged Buyer or Seller assigned identifier.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:ID",
							},
							/**
							 * Deliver to location global identifier
							 */
							globalIdentifier: {
								type: "object",
								description: "Deliver to location global identifier",
								required: false,
								shape: {
									/**
									 * Deliver to location global identifier
									 */
									value: {
										type: "string",
										description: "Deliver to location global identifier",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:GlobalID",
									},
									/**
									 * Scheme identifier
									 *
									 * The identification scheme identifier of the Deliver to location identifier.
									 *
									 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
									 */
									schemeIdentifier: {
										type: "string",
										description: `**Scheme identifier**

The identification scheme identifier of the Deliver to location identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:GlobalID/@schemeID",
									},
								},
							},
							/**
							 * Deliver to party name
							 *
							 * The name of the party to which the goods and services are delivered.
							 *
							 * Shall be used if the Deliver to party is different from the Buyer.
							 */
							name: {
								type: "string",
								description: `**Deliver to party name**

The name of the party to which the goods and services are delivered.

Shall be used if the Deliver to party is different from the Buyer.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:Name",
							},
							/**
							 * Deliver to address
							 *
							 * A group of business terms providing information about the address to which goods and services invoiced were or are delivered.
							 *
							 * In the case of pick-up, the deliver to address is the pick-up address. Sufficient components of the address are to be filled to comply with legal requirements.
							 *
							 * Like any address, the fields necessary to define the address must appear. The country code is mandatory.
							 */
							postalAddress: {
								type: "object",
								description: `**Deliver to address**

A group of business terms providing information about the address to which goods and services invoiced were or are delivered.

In the case of pick-up, the deliver to address is the pick-up address. Sufficient components of the address are to be filled to comply with legal requirements.

Like any address, the fields necessary to define the address must appear. The country code is mandatory.`,
								required: false,
								shape: {
									/**
									 * Deliver to post code
									 *
									 * The identifier for an addressable group of properties according to the relevant postal service.
									 *
									 * Such as a ZIP code or a post code.
									 */
									postCode: {
										type: "string | number",
										description: `**Deliver to post code**

The identifier for an addressable group of properties according to the relevant postal service.

Such as a ZIP code or a post code.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									},
									/**
									 * Deliver to address line 1
									 *
									 * The main address line in an address.
									 *
									 * Usually the street name and number.
									 */
									line1: {
										type: "string",
										description: `**Deliver to address line 1**

The main address line in an address.

Usually the street name and number.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
									},
									/**
									 * Deliver to address line 2
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line2: {
										type: "string",
										description: `**Deliver to address line 2**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									},
									/**
									 * Deliver to address line 3
									 *
									 * An additional address line in an address that can be used to give further details supplementing the main line.
									 */
									line3: {
										type: "string",
										description: `**Deliver to address line 3**

An additional address line in an address that can be used to give further details supplementing the main line.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
									},
									/**
									 * Deliver to city
									 *
									 * The common name of the city, town or village, where the deliver to address is located.
									 */
									city: {
										type: "string",
										description: `**Deliver to city**

The common name of the city, town or village, where the deliver to address is located.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
									},
									/**
									 * Deliver to country code
									 *
									 * A code that identifies the country.
									 *
									 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										type: "string",
										description: `**Deliver to country code**

A code that identifies the country.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
									},
									/**
									 * Deliver to country subdivision
									 *
									 * The subdivision of a country.
									 *
									 * Such as a region, a county, a state, a province, etc.
									 */
									countrySubdivision: {
										type: "string",
										description: `**Deliver to country subdivision**

The subdivision of a country.

Such as a region, a county, a state, a province, etc.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
									},
								},
							},
						},
					},
					/**
					 * Detailed information about the actual Delivery
					 */
					information: {
						type: "object",
						description: "Detailed information about the actual Delivery",
						required: false,
						shape: {
							/**
							 * Actual delivery date
							 *
							 * The date on which the supply of goods or services was made or completed.
							 *
							 * In Germany, the date of delivery and performance is a mandatory information on invoices. This can also be indicated at item level, but must in any case be indicated here.
							 */
							deliveryDate: {
								type: "date",
								description: `**Actual delivery date**

The date on which the supply of goods or services was made or completed.

In Germany, the date of delivery and performance is a mandatory information on invoices. This can also be indicated at item level, but must in any case be indicated here.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString",
								transform: {
									input: dateTimeStringFormatter,
								},
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString/@format":
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
							 * Despatch advice reference
							 *
							 * An identifier of a referenced despatch advice.
							 *
							 * CHORUS PRO : not used
							 */
							issuerAssignedID: {
								type: "string",
								description: `**Despatch advice reference**

An identifier of a referenced despatch advice.

CHORUS PRO : not used`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:IssuerAssignedID",
							},
						},
					},
				},
			},
			tradeSettlement: {
				type: "object",
				shape: {
					/**
					 * Bank assigned creditor identifier
					 *
					 * Unique banking reference identifier of the Payee or Seller assigned by the Payee or Seller bank.
					 *
					 * Used in order to pre-notify the Buyer of a SEPA direct debit.
					 *
					 * This is the ICS for SEPA direct debits
					 */
					creditorIdentifier: {
						type: "string",
						description: `**Bank assigned creditor identifier**

Unique banking reference identifier of the Payee or Seller assigned by the Payee or Seller bank.

Used in order to pre-notify the Buyer of a SEPA direct debit.

This is the ICS for SEPA direct debits`,
						required: false,
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:CreditorReferenceID",
					},
					/**
					 * Remittance information
					 *
					 * A textual value used to establish a link between the payment and the Invoice, issued by the Seller.
					 *
					 * Used for creditor's critical reconciliation information. This information element helps the Seller to assign an incoming payment to the relevant payment process. When specifying the textual value, which is commonly the invoice number of the invoice being paid, but may be another seller reference, the buyer should indicate this reference in his payment order when executing the payment. In a payment transaction this reference is transferred back to the Seller as Remittance Information.
					 *
					 * In order to allow for automatic processing of cross-border SEPA payments, only Latin characters should be used in this field, with a maximum of 140 characters. Referencesection 1.4 of the SEPA credit transfer and SEPA direct debit scheme implementation guides [13] and [14] for details of the allowed characters. Other rules may apply for SEPA payments within national borders.
					 *
					 * If remittance information is structured according to the ISO 11649:2009 standard [16] for Structured RF Creditor Reference, it shall be mapped to the Structured Remittance Information Creditor Reference field in SEPA payments messages.
					 * If remittance information is structured according to the EACT standard for automated reconciliation [17], it shall be mapped to the Unstructured Remittance Information field in SEPA payments messages.”
					 *
					 * If remittance information is to be mapped to the End To End Identification field or to the Structured Remittance Information Creditor Reference field in SEPA payments messages, then in addition to the Latin character set restriction, the content shall not start or end with a '/' and the content shall not contain '//'s. See reference [15].
					 */
					remittanceInformation: {
						type: "string",
						description: `**Remittance information**

A textual value used to establish a link between the payment and the Invoice, issued by the Seller.

Used for creditor's critical reconciliation information. This information element helps the Seller to assign an incoming payment to the relevant payment process. When specifying the textual value, which is commonly the invoice number of the invoice being paid, but may be another seller reference, the buyer should indicate this reference in his payment order when executing the payment. In a payment transaction this reference is transferred back to the Seller as Remittance Information.

In order to allow for automatic processing of cross-border SEPA payments, only Latin characters should be used in this field, with a maximum of 140 characters. Referencesection 1.4 of the SEPA credit transfer and SEPA direct debit scheme implementation guides [13] and [14] for details of the allowed characters. Other rules may apply for SEPA payments within national borders.

If remittance information is structured according to the ISO 11649:2009 standard [16] for Structured RF Creditor Reference, it shall be mapped to the Structured Remittance Information Creditor Reference field in SEPA payments messages.
If remittance information is structured according to the EACT standard for automated reconciliation [17], it shall be mapped to the Unstructured Remittance Information field in SEPA payments messages.”

If remittance information is to be mapped to the End To End Identification field or to the Structured Remittance Information Creditor Reference field in SEPA payments messages, then in addition to the Latin character set restriction, the content shall not start or end with a '/' and the content shall not contain '//'s. See reference [15].`,
						required: false,
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PaymentReference",
					},
					/**
					 * VAT accounting currency code
					 *
					 * The currency used for VAT accounting and reporting purposes as accepted or required in the country of the Seller.
					 *
					 * Shall be used in combination with the Total VAT amount in accounting currency (BT-111) when the VAT accounting currency code differs from the Invoice currency code.
					 * The lists of valid currencies are registered with the ISO 4217 Maintenance Agency ""Codes for the representation of currencies and funds"". Please refer to Article 230 of the Council Directive 2006/112/EC [2] for more information.
					 */
					vatAccountingCurrencyCode: {
						type: "string",
						description: `**VAT accounting currency code**

The currency used for VAT accounting and reporting purposes as accepted or required in the country of the Seller.

Shall be used in combination with the Total VAT amount in accounting currency (BT-111) when the VAT accounting currency code differs from the Invoice currency code.
The lists of valid currencies are registered with the ISO 4217 Maintenance Agency ""Codes for the representation of currencies and funds"". Please refer to Article 230 of the Council Directive 2006/112/EC [2] for more information.`,
						required: false,
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxCurrencyCode",
					},

					/**
					 * Payee
					 *
					 * A group of business terms providing information about the Payee, i.e. the role that receives the payment.
					 *
					 * The role of Payee may be fulfilled by another party then the Seller, e.g. a factoring service.
					 *
					 * This group makes it possible to identify the invoices to be paid to a third-party Payee in the case of factoring.
					 * CHORUS PRO: In the event of subrogation factoring, the legal information associated with subrogation must be present in the PDF visual presentation of the invoice.
					 * In this case, the bank identifier oresent in the invoice is the factor one.
					 */
					payee: {
						type: "object",
						description: `**Payee**

A group of business terms providing information about the Payee, i.e. the role that receives the payment.

The role of Payee may be fulfilled by another party then the Seller, e.g. a factoring service.

This group makes it possible to identify the invoices to be paid to a third-party Payee in the case of factoring.
CHORUS PRO: In the event of subrogation factoring, the legal information associated with subrogation must be present in the PDF visual presentation of the invoice.
In this case, the bank identifier oresent in the invoice is the factor one.`,
						required: false,
						shape: {
							/**
							 * Payee identifier
							 *
							 * If no scheme is specified, it should be known by Buyer and Seller, e.g. a previously exchanged Buyer or Seller assigned identifier.
							 */
							identifier: {
								type: "string",
								description: `**Payee identifier**

If no scheme is specified, it should be known by Buyer and Seller, e.g. a previously exchanged Buyer or Seller assigned identifier.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:ID",
							},
							/**
							 * Payee global identifier
							 */
							globalIdentifier: {
								type: "object",
								description: "Payee global identifier",
								required: false,
								shape: {
									/**
									 * Payee global identifier
									 */
									value: {
										type: "string",
										description: "Payee global identifier",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:GlobalID",
									},
									/**
									 * Scheme identifier
									 *
									 * The identification scheme identifier of the Payee identifier.
									 *
									 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
									 */
									schemeIdentifier: {
										type: "string",
										description: `**Scheme identifier**

The identification scheme identifier of the Payee identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:GlobalID/@schemeID",
									},
								},
							},
							/**
							 * Payee name
							 *
							 * The name of the Payee.
							 *
							 * Shall be used when the Payee is different from the Seller (but may also be the Seller name).
							 *
							 * If the PAYEE party block is present, the name of the Payee is mandatory
							 *
							 * BR-17: The Payee name (BT-59) shall be provided in the Invoice, if the Payee (BG-10) is different from the Seller (BG-4).
							 */
							name: {
								type: "string",
								description: `**Payee name**

The name of the Payee.

Shall be used when the Payee is different from the Seller (but may also be the Seller name).

If the PAYEE party block is present, the name of the Payee is mandatory

BR-17: The Payee name (BT-59) shall be provided in the Invoice, if the Payee (BG-10) is different from the Seller (BG-4).`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:Name",
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
									 * Payee legal registration identifier
									 *
									 * An identifier issued by an official registrar that identifies the Payee as a legal entity or person.
									 *
									 * If no scheme is specified, it should be known by Buyer and Seller, e.g. the identifier that is exclusively used in the applicable legal environment.
									 */
									registrationIdentifier: {
										type: "object",
										description: `**Payee legal registration identifier**

An identifier issued by an official registrar that identifies the Payee as a legal entity or person.

If no scheme is specified, it should be known by Buyer and Seller, e.g. the identifier that is exclusively used in the applicable legal environment.`,
										required: false,
										shape: {
											/**
											 * Payee legal registration identifier
											 *
											 * An identifier issued by an official registrar that identifies the Payee as a legal entity or person.
											 *
											 * If no scheme is specified, it should be known by Buyer and Seller, e.g. the identifier that is exclusively used in the applicable legal environment.
											 */
											value: {
												type: "string",
												description: `**Payee legal registration identifier**

An identifier issued by an official registrar that identifies the Payee as a legal entity or person.

If no scheme is specified, it should be known by Buyer and Seller, e.g. the identifier that is exclusively used in the applicable legal environment.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Payee legal registration identifier.
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
											 *
											 * For a SIREN or a SIRET, the value of this field is "0002"
											 */
											schemeIdentifier: {
												type: "string",
												description: `**Scheme identifier**

The identification scheme identifier of the Payee legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.

For a SIREN or a SIRET, the value of this field is "0002"`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
								},
							},
						},
					},
					/**
					 * Payment instructions
					 *
					 * A group of business terms providing information about the payment.
					 */
					paymentInstruction: {
						type: "object",
						description: `**Payment instructions**

A group of business terms providing information about the payment.`,
						required: false,
						shape: {
							/**
							 * Payment means type code
							 *
							 * The means, expressed as code, for how a payment is expected to be or has been settled.
							 *
							 * Entries from the UNTDID 4461 code list [6] shall be used. Distinction should be made
							 * between SEPA and non-SEPA payments, and between credit payments, direct debits, card payments and other instruments.
							 *
							 * In particular, the following codes can be used:
							 * - 10: Species
							 * - 20: Check
							 * - 30: Transfer (includes SEPA transfer for CHORUSPRO)
							 * - 42: Payment on bank account
							 * - 48: Payment by credit card
							 * - 49: Direct debit (includes SEPA Direct Debit for CHORUSPRO)
							 * - 57 : Standing Agreement
							 * - 58: SEPA transfer (not used for CHORUSPRO: code 30)
							 * - 59: SEPA Direct Debit (not used for CHORUSPRO: code 49)
							 * - 97: Report
							 * - ZZZ: agreed amoung trading partners on interim basis
							 *
							 * BR-49: A  Payment  instruction  (BG-16)  shall  specify  the  Payment means type code (BT-81).
							 */
							typeCode: {
								type: UNTDID_4461.map(({ code }) => code),
								description: `**Payment means type code**

The means, expressed as code, for how a payment is expected to be or has been settled.

Entries from the UNTDID 4461 code list [6] shall be used. Distinction should be made
between SEPA and non-SEPA payments, and between credit payments, direct debits, card payments and other instruments.

In particular, the following codes can be used:
- 10: Species
- 20: Check
- 30: Transfer (includes SEPA transfer for CHORUSPRO)
- 42: Payment on bank account
- 48: Payment by credit card
- 49: Direct debit (includes SEPA Direct Debit for CHORUSPRO)
- 57 : Standing Agreement
- 58: SEPA transfer (not used for CHORUSPRO: code 30)
- 59: SEPA Direct Debit (not used for CHORUSPRO: code 49)
- 97: Report
- ZZZ: agreed amoung trading partners on interim basis

BR-49: A  Payment  instruction  (BG-16)  shall  specify  the  Payment means type code (BT-81).`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:TypeCode",
							},

							/**
							 * Debited account identifier
							 *
							 * The account to be debited by the direct debit.
							 */
							debitedAccountIdentifier: {
								type: "string",
								description: `**Debited account identifier**

The account to be debited by the direct debit.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayerPartyDebtorFinancialAccount/ram:IBANID",
							},

							/**
							 * Credit transfer
							 *
							 * A group of business terms to specify credit transfer payments.
							 */
							transfers: {
								type: "object[]",
								description: `**Credit transfer**

A group of business terms to specify credit transfer payments.`,
								group: "transfers",
								shape: {
									/**
									 * Payment account identifier
									 *
									 * A unique identifier of the financial payment account, at a payment service provider, to which payment should be made.
									 *
									 * Such as IBAN (in case of SEPA payment) or a national account number.
									 */
									paymentAccountIdentifier: {
										type: "string",
										description: `**Payment account identifier**

A unique identifier of the financial payment account, at a payment service provider, to which payment should be made.

Such as IBAN (in case of SEPA payment) or a national account number.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeePartyCreditorFinancialAccount[transfers]/ram:IBANID",
									},
									/**
									 * National account number (not SEPA)
									 *
									 * Use IBANID when appropriate, otherwise use ProprietaryID
									 */
									nationalAccountNumber: {
										type: "string",
										description: `**National account number (not SEPA)**

Use IBANID when appropriate, otherwise use ProprietaryID`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeePartyCreditorFinancialAccount[transfers]/ram:ProprietaryID",
									},
								},
							},
						},
					},
					/**
					 * Document Level Allowances
					 *
					 * A group of business terms providing information about allowances applicable to the Invoice as a whole.
					 *
					 * Deductions, such as withheld tax may also be specified in this group.
					 */
					allowances: {
						type: "object[]",
						description: `**Document Level Allowances**

A group of business terms providing information about allowances applicable to the Invoice as a whole.

Deductions, such as withheld tax may also be specified in this group.`,
						required: false,
						group: "allowances",
						shape: {
							/**
							 * Document level allowance percentage
							 *
							 * The percentage that may be used, in conjunction with the document level allowance base amount, to calculate the document level allowance amount.
							 */
							calculationPercent: {
								type: "string | number",
								description: `**Document level allowance percentage**

The percentage that may be used, in conjunction with the document level allowance base amount, to calculate the document level allowance amount.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[allowances]/ram:CalculationPercent",
							},
							/**
							 * Document level allowance base amount
							 *
							 * The base amount that may be used, in conjunction with the document level allowance percentage, to calculate the document level allowance amount.
							 */
							basisAmount: {
								type: "string | number",
								description: `**Document level allowance base amount**

The base amount that may be used, in conjunction with the document level allowance percentage, to calculate the document level allowance amount.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[allowances]/ram:BasisAmount",
							},
							/**
							 * Document level allowance amount
							 *
							 * The amount of an allowance, without VAT.
							 */
							actualAmount: {
								type: "string | number",
								description: `**Document level allowance amount**

The amount of an allowance, without VAT.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[allowances]/ram:ActualAmount",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[allowances]/ram:ChargeIndicator/udt:Indicator":
										"false",
								},
							},
							/**
							 * Document level allowance reason code
							 *
							 * The reason for the document level allowance, expressed as a code.
							 *
							 * Use entries of the UNTDID 5189 code list [6]. The Document level allowance reason code and the Document level allowance reason shall indicate the same allowance reason.
							 *
							 * BR-33: Each Document level allowance (BG-20) shall have a Document level allowance reason  (BT-97) or a Document level allowance reason code (BT-98).
							 *
							 * BR-CO-5: Document level allowance reason code (BT-98) and Document level allowance reason (BT-97) shall indicate the same type of allowance.
							 *
							 * BR-CO-21: Each Document level allowance (BG-20) shall contain a Document level allowance reason (BT-97) or a Document level allowance reason code (BT-98), or both.
							 */
							reasonCode: {
								type: UNTDID_5189.map(({ code }) => code),
								description: `**Document level allowance reason code**

The reason for the document level allowance, expressed as a code.

Use entries of the UNTDID 5189 code list [6]. The Document level allowance reason code and the Document level allowance reason shall indicate the same allowance reason.

BR-33: Each Document level allowance (BG-20) shall have a Document level allowance reason  (BT-97) or a Document level allowance reason code (BT-98).

BR-CO-5: Document level allowance reason code (BT-98) and Document level allowance reason (BT-97) shall indicate the same type of allowance.

BR-CO-21: Each Document level allowance (BG-20) shall contain a Document level allowance reason (BT-97) or a Document level allowance reason code (BT-98), or both.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[allowances]/ram:ReasonCode",
							},
							/**
							 * Document level allowance reason
							 *
							 * The reason for the document level allowance, expressed as text.
							 *
							 * CHORUS PRO: this field is limited to 1024 characters
							 *
							 * BR-33: Each Document level allowance (BG-20) shall have a Document level allowance reason (BT-97) or a Document level allowance reason code (BT-98).
							 *
							 * BR-CO-5: Document level allowance reason code (BT-98) and Document level allowance reason (BT-97) shall indicate the same type of allowance.
							 *
							 * BR-CO-21: Each Document level allowance (BG-20) shall contain a Document level allowance reason (BT-97) or a Document level allowance reason code (BT-98), or both.
							 */
							reason: {
								type: "string",
								description: `**Document level allowance reason**

The reason for the document level allowance, expressed as text.

CHORUS PRO: this field is limited to 1024 characters

BR-33: Each Document level allowance (BG-20) shall have a Document level allowance reason (BT-97) or a Document level allowance reason code (BT-98).

BR-CO-5: Document level allowance reason code (BT-98) and Document level allowance reason (BT-97) shall indicate the same type of allowance.

BR-CO-21: Each Document level allowance (BG-20) shall contain a Document level allowance reason (BT-97) or a Document level allowance reason code (BT-98), or both.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[allowances]/ram:Reason",
							},
							/**
							 * VAT type code for document level allowances
							 */
							categoryTradeTax: {
								type: "object",
								description: "VAT type code for document level allowances",
								required: false,
								shape: {
									/**
									 * Document level allowance VAT category code
									 *
									 * A coded identification of what VAT category applies to the document level allowance.
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
									 *
									 * The VAT category codes are as follows:
									 * - S = Standard VAT rate
									 * - Z = Zero rated goods
									 * - E = VAT exempt
									 * - AE = Reverse charge
									 * - K = Intra-Community supply (specific reverse charge)
									 * - G = Exempt VAT for Export outside EU
									 * - O = Outside VAT scope
									 * - L = Canary Islands
									 * - M = Ceuta and Mellila
									 *
									 * BR-32: Each Document level allowance (BG-20) shall have a Document level allowance VAT category code (BT-95).
									 */
									categoryCode: {
										type: UNTDID_5305.map(({ code }) => code),
										description: `**Document level allowance VAT category code**

A coded identification of what VAT category applies to the document level allowance.

The following entries of UNTDID 5305 [6] are used (further clarification between brackets):
- Standard rate (Liable for VAT in a standard way)
- Zero rated goods (Liable for VAT with a percentage rate of zero)
- Exempt from tax (VAT/IGIC/IPSI)
- VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)
- VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)
- Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)
- Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)
- Canary Islands General Indirect Tax (Liable for IGIC tax)
- Liable for IPSI (Ceuta/Melilla tax)

The VAT category codes are as follows:
- S = Standard VAT rate
- Z = Zero rated goods
- E = VAT exempt
- AE = Reverse charge
- K = Intra-Community supply (specific reverse charge)
- G = Exempt VAT for Export outside EU
- O = Outside VAT scope
- L = Canary Islands
- M = Ceuta and Mellila

BR-32: Each Document level allowance (BG-20) shall have a Document level allowance VAT category code (BT-95).`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[allowances]/ram:CategoryTradeTax/ram:CategoryCode",
									},
									/**
									 * Document level allowance VAT rate
									 *
									 * The VAT rate, represented as percentage that applies to the document level allowance.
									 *
									 * The value to enter is the percentage. For example, for 20%, it must be given as 20 (and not 0.2)
									 */
									vatRate: {
										type: "string | number",
										description: `**Document level allowance VAT rate**

The VAT rate, represented as percentage that applies to the document level allowance.

The value to enter is the percentage. For example, for 20%, it must be given as 20 (and not 0.2)`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[allowances]/ram:CategoryTradeTax/ram:RateApplicablePercent",
									},
								},
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[allowances]/ram:CategoryTradeTax/ram:TypeCode":
										"VAT",
								},
							},
						},
					},
					/**
					 * Document Level Charges
					 *
					 * A group of business terms providing information about charges and taxes other than VAT, applicable to the Invoice as a whole.
					 */
					charges: {
						type: "object[]",
						description: `**Document Level Charges**

A group of business terms providing information about charges and taxes other than VAT, applicable to the Invoice as a whole.`,
						group: "charges",
						sibling: (data) =>
							data?.transaction?.tradeSettlement?.allowances || [],
						required: false,
						shape: {
							/**
							 * Document level charge percentage
							 *
							 * The percentage that may be used, in conjunction with the document level charge base amount, to calculate the document level charge amount.
							 */
							calculationPercent: {
								type: "string | number",
								description: `**Document level charge percentage**

The percentage that may be used, in conjunction with the document level charge base amount, to calculate the document level charge amount.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[charges]/ram:CalculationPercent",
							},
							/**
							 * Document level charge base amount
							 *
							 * The base amount that may be used, in conjunction with the document level charge percentage, to calculate the document level charge amount.
							 */
							basisAmount: {
								type: "string | number",
								description: `**Document level charge base amount**

The base amount that may be used, in conjunction with the document level charge percentage, to calculate the document level charge amount.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[charges]/ram:BasisAmount",
							},
							/**
							 * Document level charge amount
							 *
							 * The amount of a charge, without VAT.
							 */
							actualAmount: {
								type: "string | number",
								description: `**Document level charge amount**

The amount of a charge, without VAT.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[charges]/ram:ActualAmount",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[charges]/ram:ChargeIndicator/udt:Indicator":
										"true",
								},
							},
							/**
							 * Document level charge reason code
							 *
							 * The reason for the document level charge, expressed as a code.
							 *
							 * Use entries of the UNTDID 7161 code list [6]. The Document level charge reason code and the Document level charge reason shall indicate the same charge reason.
							 *
							 * In particular, the following codes and reasons can be used:
							 * - AA = Advertising discount
							 * - ABL = Packing supplement
							 * - ADR = Other services
							 * - ADT = Removal
							 * - FC = transportation costs
							 * - FI = Financial expenses
							 * - LA = Labeling
							 *
							 * BR-38: Each Document level charge (BG-21) shall have a Document level charge reason (BT-104) or a Document level charge reason code (BT-105).
							 *
							 * BR-CO-6: Document level charge reason code (BT-105) and Document level charge reason (BT-104) shall indicate the same type of charge.
							 *
							 * BR-CO-22: Each Document level charge (BG-21) shall contain a Document level charge reason (BT-104) or a Document level charge reason code (BT-105), or both.
							 */
							reasonCode: {
								type: UNTDID_7161.map(({ code }) => code),
								description: `**Document level charge reason code**

The reason for the document level charge, expressed as a code.

Use entries of the UNTDID 7161 code list [6]. The Document level charge reason code and the Document level charge reason shall indicate the same charge reason.

In particular, the following codes and reasons can be used:
- AA = Advertising discount
- ABL = Packing supplement
- ADR = Other services
- ADT = Removal
- FC = transportation costs
- FI = Financial expenses
- LA = Labeling

BR-38: Each Document level charge (BG-21) shall have a Document level charge reason (BT-104) or a Document level charge reason code (BT-105).

BR-CO-6: Document level charge reason code (BT-105) and Document level charge reason (BT-104) shall indicate the same type of charge.

BR-CO-22: Each Document level charge (BG-21) shall contain a Document level charge reason (BT-104) or a Document level charge reason code (BT-105), or both.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[charges]/ram:ReasonCode",
							},
							/**
							 * Document level charge reason
							 *
							 * The reason for the document level charge, expressed as text.
							 *
							 * CHORUS PRO: this field is limited to 1024 characters
							 *
							 * BR-38: Each Document level charge (BG-21) shall have a Document level  charge  reason  (BT-104)  or  a  Document  level  charge reason code (BT-105).
							 *
							 * BR-CO-6: Document   level   charge   reason   code   (BT-105)   and Document  level  charge  reason  (BT-104)  shall  indicate the same type of charge.
							 *
							 * BR-CO-22: Each  Document  level  charge  (BG-21)  shall  contain  a Document level charge reason (BT-104) or a Document level charge reason code (BT-105), or both.
							 */
							reason: {
								type: "string",
								description: `**Document level charge reason**

The reason for the document level charge, expressed as text.

CHORUS PRO: this field is limited to 1024 characters

BR-38: Each Document level charge (BG-21) shall have a Document level  charge  reason  (BT-104)  or  a  Document  level  charge reason code (BT-105).

BR-CO-6: Document   level   charge   reason   code   (BT-105)   and Document  level  charge  reason  (BT-104)  shall  indicate the same type of charge.

BR-CO-22: Each  Document  level  charge  (BG-21)  shall  contain  a Document level charge reason (BT-104) or a Document level charge reason code (BT-105), or both.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[charges]/ram:Reason",
							},
							/**
							 * Detailed information on tax information
							 *
							 * A finite sequence of characters.
							 */
							categoryTradeTax: {
								type: "object",
								description: `**Detailed information on tax information**

A finite sequence of characters.`,
								required: false,
								shape: {
									/**
									 * Document level charge VAT category code
									 *
									 * A coded identification of what VAT category applies to the document level charge.
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
									 *
									 * The VAT category codes are as follows:
									 * - S = Standard VAT rate
									 * - Z = Zero rated goods
									 * - E = VAT exempt
									 * - AE = Reverse charge
									 * - K = Intra-Community supply (specific reverse charge)
									 * - G = Exempt VAT for Export outside EU
									 * - O = Outside VAT scope
									 * - L = Canary Islands
									 * - M = Ceuta and Mellila
									 *
									 * BR-37: Each Document level charge (BG-21) shall have a Document level charge VAT category code (BT-102).
									 */
									categoryCode: {
										type: UNTDID_5305.map(({ code }) => code),
										description: `**Document level charge VAT category code**

A coded identification of what VAT category applies to the document level charge.

The following entries of UNTDID 5305 [6] are used (further clarification between brackets):
- Standard rate (Liable for VAT in a standard way)
- Zero rated goods (Liable for VAT with a percentage rate of zero)
- Exempt from tax (VAT/IGIC/IPSI)
- VAT Reverse Charge (Reverse charge VAT/IGIC/IPSI rules apply)
- VAT exempt for intra community supply of goods (VAT/IGIC/IPSI not levied due to Intra-community supply rules)
- Free export item, tax not charged (VAT/IGIC/IPSI not levied due to export outside of the EU)
- Services outside scope of tax (Sale is not subject to VAT/IGIC/IPSI)
- Canary Islands General Indirect Tax (Liable for IGIC tax)
- Liable for IPSI (Ceuta/Melilla tax)

The VAT category codes are as follows:
- S = Standard VAT rate
- Z = Zero rated goods
- E = VAT exempt
- AE = Reverse charge
- K = Intra-Community supply (specific reverse charge)
- G = Exempt VAT for Export outside EU
- O = Outside VAT scope
- L = Canary Islands
- M = Ceuta and Mellila

BR-37: Each Document level charge (BG-21) shall have a Document level charge VAT category code (BT-102).`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[charges]/ram:CategoryTradeTax/ram:CategoryCode",
									},
									/**
									 * Document level charge VAT rate
									 *
									 * The VAT rate, represented as percentage that applies to the document level charge.
									 *
									 * The value to enter is the percentage. For example, for 20%, it must be given as 20 (and not 0.2)
									 */
									vatRate: {
										type: "string | number",
										description: `**Document level charge VAT rate**

The VAT rate, represented as percentage that applies to the document level charge.

The value to enter is the percentage. For example, for 20%, it must be given as 20 (and not 0.2)`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[charges]/ram:CategoryTradeTax/ram:RateApplicablePercent",
									},
								},
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[charges]/ram:CategoryTradeTax/ram:TypeCode":
										"VAT",
								},
							},
						},
					},
					/**
					 * Detailed information about payment terms
					 */
					paymentTerms: {
						type: "object",
						description: "Detailed information about payment terms",
						required: false,
						shape: {
							/**
							 * Payment terms
							 *
							 * A textual description of the payment terms that apply to the amount due for payment (Including description of possible penalties).
							 *
							 * This element may contain multiple lines and multiple terms.
							 */
							description: {
								type: "string",
								description: `**Payment terms**

A textual description of the payment terms that apply to the amount due for payment (Including description of possible penalties).

This element may contain multiple lines and multiple terms.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:Description",
							},
							/**
							 * Payment due date
							 *
							 * The date when the payment is due.
							 *
							 * The payment due date reflects the due date of the net payment. For partial payments it states the first net due date. The corresponding description of more complex payment terms can be stated in BT-20 Payment terms.
							 */
							dueDate: {
								type: "date",
								description: `**Payment due date**

The date when the payment is due.

The payment due date reflects the due date of the net payment. For partial payments it states the first net due date. The corresponding description of more complex payment terms can be stated in BT-20 Payment terms.`,
								required: false,
								transform: {
									input: dateTimeStringFormatter,
								},
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:DueDateDateTime/udt:DateTimeString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:DueDateDateTime/udt:DateTimeString/@format":
										"102",
								},
							},
							/**
							 * Mandate reference identifier
							 *
							 * Unique identifier assigned by the Payee for referencing the direct debit mandate.
							 *
							 * Used in order to pre-notify the Buyer of a SEPA direct debit.
							 *
							 * This is the RUM (Unique Mandate Reference) for SEPA direct debits
							 */
							mandateReferenceIdentifier: {
								type: "string",
								description: `**Mandate reference identifier**

Unique identifier assigned by the Payee for referencing the direct debit mandate.

Used in order to pre-notify the Buyer of a SEPA direct debit.

This is the RUM (Unique Mandate Reference) for SEPA direct debits`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:DirectDebitMandateID",
							},
						},
					},
					monetarySummation: {
						type: "object",
						shape: {
							/**
							 * Sum of Invoice line net amount
							 *
							 * Sum of all Invoice line net amounts in the Invoice.
							 *
							 * For EXTENDED profile only, BR-CO-10 is replaced by BR-FXEXT-CO-10, which add a tolerance of 0,01 euro per line, document level charge and allowance in calculation.
							 */
							lineTotalAmount: {
								type: "string | number",
								description: `**Sum of Invoice line net amount**

Sum of all Invoice line net amounts in the Invoice.

For EXTENDED profile only, BR-CO-10 is replaced by BR-FXEXT-CO-10, which add a tolerance of 0,01 euro per line, document level charge and allowance in calculation.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:LineTotalAmount",
							},
							/**
							 * Sum of charges on document level
							 *
							 * Sum of all charges on document level in the Invoice.
							 *
							 * Charges on line level are included in the Invoice line net amount which is summed up into the Sum of Invoice line net amount.
							 *
							 * For EXTENDED profile only, BR-CO-12 is replaced by BR-FXEXT-CO-12, which add a tolerance of 0,01 euro per line, document level charge and allowance in calculation.
							 */
							chargeTotalAmount: {
								type: "string | number",
								description: `**Sum of charges on document level**

Sum of all charges on document level in the Invoice.

Charges on line level are included in the Invoice line net amount which is summed up into the Sum of Invoice line net amount.

For EXTENDED profile only, BR-CO-12 is replaced by BR-FXEXT-CO-12, which add a tolerance of 0,01 euro per line, document level charge and allowance in calculation.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:ChargeTotalAmount",
							},
							/**
							 * Sum of allowances on document level
							 *
							 * Sum of all allowances on document level in the Invoice.
							 *
							 * Allowances on line level are included in the Invoice line net amount which is summed up into the Sum of Invoice line net amount.
							 *
							 * For EXTENDED profile only, BR-CO-11 is replaced by BR-FXEXT-CO-11, which add a tolerance of 0,01 euro per line, document level charge and allowance in calculation.
							 */
							allowanceTotalAmount: {
								type: "string | number",
								description: `**Sum of allowances on document level**

Sum of all allowances on document level in the Invoice.

Allowances on line level are included in the Invoice line net amount which is summed up into the Sum of Invoice line net amount.

For EXTENDED profile only, BR-CO-11 is replaced by BR-FXEXT-CO-11, which add a tolerance of 0,01 euro per line, document level charge and allowance in calculation.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:AllowanceTotalAmount",
							},
							/**
							 * Paid amount
							 *
							 * The sum of amounts which have been paid in advance.
							 *
							 * This amount is subtracted from the invoice total amount with VAT to calculate the amount due for payment.
							 */
							paidAmount: {
								type: "string | number",
								description: `**Paid amount**

The sum of amounts which have been paid in advance.

This amount is subtracted from the invoice total amount with VAT to calculate the amount due for payment.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TotalPrepaidAmount",
							},
						},
					},
					/**
					 * Precending Invoice Reference
					 *
					 * A group of business terms providing information on one or more preceding Invoices.
					 *
					 * To be used in case:
					 * - a preceding invoice is corrected
					 * - preceding partial invoices are refered to from a final invoice
					 * - preceding pre-payment invoices are refered to from a final invoice
					 *
					 * This business group is mandatory in case of a Credit Note in order to reference the invoices it credits, unless the Credit Note refers to a period which must then be present in group BG-14.
					 */
					precendingInvoices: {
						type: "object[]",
						description: `**Precending Invoice Reference**

A group of business terms providing information on one or more preceding Invoices.

To be used in case:
- a preceding invoice is corrected
- preceding partial invoices are refered to from a final invoice
- preceding pre-payment invoices are refered to from a final invoice

This business group is mandatory in case of a Credit Note in order to reference the invoices it credits, unless the Credit Note refers to a period which must then be present in group BG-14.`,
						required: false,
						group: "precending-invoices",
						shape: {
							/**
							 * Preceding Invoice reference
							 *
							 * The identification of an Invoice that was previously sent by the Seller.
							 */
							reference: {
								type: "string",
								description: `**Preceding Invoice reference**

The identification of an Invoice that was previously sent by the Seller.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument[precending-invoices]/ram:IssuerAssignedID",
							},
							/**
							 * Preceding Invoice issue date
							 *
							 * The date when the Preceding Invoice was issued.
							 *
							 * The Preceding Invoice issue date shall be provided in case the Preceding Invoice identifier is not unique.
							 */
							issueDate: {
								type: "date",
								description: `**Preceding Invoice issue date**

The date when the Preceding Invoice was issued.

The Preceding Invoice issue date shall be provided in case the Preceding Invoice identifier is not unique.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument[precending-invoices]/ram:FormattedIssueDateTime/qdt:DateTimeString",
								transform: {
									input: dateTimeStringFormatter,
								},
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument[precending-invoices]/ram:FormattedIssueDateTime/qdt:DateTimeString/@format":
										"102",
								},
							},
						},
					},
					/**
					 * Buyer accounting reference
					 *
					 * A textual value that specifies where to book the relevant data into the Buyer's financial accounts.
					 *
					 * CHORUS PRO: not used
					 */
					buyerAccountant: {
						type: "object",
						required: false,
						shape: {
							reference: {
								type: "string",
								description: `**Buyer accounting reference**

A textual value that specifies where to book the relevant data into the Buyer's financial accounts.

CHORUS PRO: not used`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:ID",
							},
						},
					},
				},
			},
		},
	},
} satisfies Schema;
