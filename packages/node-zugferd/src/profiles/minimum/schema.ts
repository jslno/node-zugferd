import { dateTimeStringFormatter } from "../../utils/helper";
import { type Schema } from "../../types/schema";
import { UNTDID_1001 } from "../../codelists/untdid/1001.gen";
import { CURRENCY_CODES } from "../../codelists/currency-codes.gen";
import { ISO_6523 } from "../../codelists/iso/6523.gen";
import { ISO_3166 } from "../../codelists/iso/3166";

export const minimumSchema = {
	/**
	 * Business process type
	 *
	 * Identifies the business process context in which the transaction appears, to enable the Buyer to process the Invoice in an appropriate way.
	 *
	 * To be specifid by the Buyer.
	 *
	 * CHORUSPRO: this data makes it possible to inform the "cadre de facturation" (billing framework, which could be invoice from agent, co-contractor, subcontractor, invoicing part of a public works contract, etc.). The codes to be used are defined in the CHORUSPRO specifications: A1 (invoice deposit), A2 (prepaid invoice deposit), ... By default (in the absence of this field), the case A1 is applied.
	 */
	businessProcessType: {
		key: "BT-23",
		type: "string",
		required: false,
		description: `**Business process type**

Identifies the business process context in which the transaction appears, to enable the Buyer to process the Invoice in an appropriate way.

To be specifid by the Buyer.

CHORUSPRO: this data makes it possible to inform the "cadre de facturation" (billing framework, which could be invoice from agent, co-contractor, subcontractor, invoicing part of a public works contract, etc.). The codes to be used are defined in the CHORUSPRO specifications: A1 (invoice deposit), A2 (prepaid invoice deposit), ... By default (in the absence of this field), the case A1 is applied.`,
		xpath:
			"/rsm:CrossIndustryInvoice/rsm:ExchangedDocumentContext/ram:BusinessProcessSpecifiedDocumentContextParameter/ram:ID",
	},
	/**
	 * Specification Identifier
	 *
	 * A specification identifier containing the entire set of rules regarding semantic content, cardinalities, and business rules to which the data contained in the invoice conforms.
	 *
	 * Note: This declares conformity to the respective document.
	 *
	 * For the reference to the EU standard, "urn:cen.eu:en16931:2017" must be specified.
	 *
	 * Invoices that are compliant with CIUS XRechnung should specify "urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0" here.
	 *
	 * Invoices that comply with the XRechnung extension should specify "urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0#conformant#urn:xeinkauf.de:kosit:extension:xrechnung_3.0" here. No schema is required.
	 */
	specificationIdentifier: {
		key: "BT-24",
		type: "string",
		required: false,
		defaultValue: "urn:factur-x.eu:1p0:minimum",
		description: `**Specification Identifier**
A specification identifier containing the entire set of rules regarding semantic content, cardinalities, and business rules to which the data contained in the invoice conforms.

Note: This declares conformity to the respective document. 

For the reference to the EU standard, "urn:cen.eu:en16931:2017" must be specified. 

Invoices that are compliant with CIUS XRechnung should specify "urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0" here. 

Invoices that comply with the XRechnung extension should specify "urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0#conformant#urn:xeinkauf.de:kosit:extension:xrechnung_3.0" here. No schema is required.`,
		xpath:
			"/rsm:CrossIndustryInvoice/rsm:ExchangedDocumentContext/ram:GuidelineSpecifiedDocumentContextParameter/ram:ID",
	},
	/**
	 * Invoice number
	 *
	 * A unique identification of the Invoice.
	 *
	 * The sequential number required in Article 226(2) of the directive 2006/112/EC [2], to uniquely identify the Invoice within the business context, time-frame, operating systems and records of the Seller . It may be based on one or more series of numbers, which may include alphanumeric characters. No identification scheme is to be used.
	 *
	 * CHORUSPRO: the invoice number is limited to 20 characters
	 *
	 * BR-2: An Invoice shall have an Invoice number (BT-1).
	 */
	number: {
		key: "BT-1",
		type: "string",
		description: `**Invoice number**

A unique identification of the Invoice.

The sequential number required in Article 226(2) of the directive 2006/112/EC [2], to uniquely identify the Invoice within the business context, time-frame, operating systems and records of the Seller . It may be based on one or more series of numbers, which may include alphanumeric characters. No identification scheme is to be used.

CHORUSPRO: the invoice number is limited to 20 characters

BR-2: An Invoice shall have an Invoice number (BT-1).`,
		xpath: "/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:ID",
	},
	/**
	 * Invoice type code
	 *
	 * A code specifying the functional type of the Invoice.
	 *
	 * Commercial invoices and credit notes are defined according the entries in UNTDID 1001 [6]. Other  entries of UNTDID 1001 [6] with specific invoices or credit notes may be used if applicable.
	 *
	 * The types of documents used are:
	 * - 380: Commercial Invoice
	 * - 381: Credit note
	 * - 384: Corrected invoice
	 * - 389: Self-billied invoice (created by the buyer on behalf of the supplier)
	 * - 261: Self billed credit note (not accepted by CHORUSPRO)
	 * - 386: Prepayment invoice
	 * - 751: Invoice information for accounting purposes (not accepted by CHORUSPRO)
	 *
	 * BR-4: An Invoice shall have an Invoice type code (BT-3).
	 */
	typeCode: {
		key: "BT-3",
		type: UNTDID_1001.map(({ code }) => code),
		description: `**Invoice type code**

A code specifying the functional type of the Invoice.

Commercial invoices and credit notes are defined according the entries in UNTDID 1001 [6]. Other  entries of UNTDID 1001 [6] with specific invoices or credit notes may be used if applicable.

The types of documents used are:
- 380: Commercial Invoice
- 381: Credit note
- 384: Corrected invoice
- 389: Self-billied invoice (created by the buyer on behalf of the supplier)
- 261: Self billed credit note (not accepted by CHORUSPRO)
- 386: Prepayment invoice
- 751: Invoice information for accounting purposes (not accepted by CHORUSPRO)

BR-4: An Invoice shall have an Invoice type code (BT-3).`,
		xpath: "/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:TypeCode",
	},
	/**
	 * Invoice issue date
	 *
	 * The date when the Invoice was issued.
	 *
	 * CHORUSPRO: the issue date must be before or equal to the deposit date.
	 */
	issueDate: {
		key: "BT-2",
		type: "date",
		description: `**Invoice issue date**

The date when the Invoice was issued.

CHORUSPRO: the issue date must be before or equal to the deposit date.`,
		xpath:
			"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IssueDateTime/udt:DateTimeString",
		additionalXml: {
			format: {
				key: "BT-2-0",
				type: "string",
				xpath:
					"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IssueDateTime/udt:DateTimeString/@format",
				defaultValue: "102",
			},
		},
		transform: {
			input: dateTimeStringFormatter,
		},
	},

	/**
	 * Grouping of information about the business transaction
	 */
	transaction: {
		key: "BG-25-00",
		type: "object",
		description: "Grouping of information about the business transaction",
		required: false,
		shape: {
			/**
			 * Grouping of contract information
			 */
			tradeAgreement: {
				key: "BT-10-00",
				type: "object",
				description: "Grouping of contract information",
				required: false,
				shape: {
					/**
					 * Buyer reference
					 *
					 * An identifier assigned by the Buyer used for internal routing purposes.
					 *
					 * The identifier is defined by the Buyer (e.g. contact ID, department, office id, project code), but provided by the Seller in the Invoice.
					 *
					 * CHORUS PRO: for the public sector, it is the "Service Exécutant". It is mandatory for some buyers. It must belong to the Chorus Pro repository. It is limited to 100 characters.
					 */
					buyerReference: {
						key: "BT-10",
						type: "string",
						description: `**Buyer reference**

An identifier assigned by the Buyer used for internal routing purposes.

The identifier is defined by the Buyer (e.g. contact ID, department, office id, project code), but provided by the Seller in the Invoice.

CHORUS PRO: for the public sector, it is the "Service Exécutant". It is mandatory for some buyers. It must belong to the Chorus Pro repository. It is limited to 100 characters.`,
						required: false,
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerReference",
					},
					/**
					 * A group of business terms providing information about the Seller.
					 */
					seller: {
						key: "BG-4",
						type: "object",
						description:
							"A group of business terms providing information about the Seller.",
						shape: {
							/**
							 * Seller name
							 *
							 * The full formal name by which the Seller is registered in the national registry of legal entities or as a Taxable person or otherwise trades as a person or persons.
							 */
							name: {
								key: "BT-27",
								type: "string",
								description: `**Seller name**

The full formal name by which the Seller is registered in the national registry of legal entities or as a Taxable person or otherwise trades as a person or persons.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:Name",
							},

							/**
							 * Details about the organization
							 */
							organization: {
								key: "BT-30-00",
								type: "object",
								description: "Details about the organization",
								required: false,
								shape: {
									/**
									 * Seller legal registration identifier
									 *
									 * An identifier issued by an official registrar that identifies the Seller as a legal entity or person.
									 *
									 * If no identification scheme is specified, it must be known by Buyer and Seller.
									 */
									registrationIdentifier: {
										key: "BT-30",
										type: "object",
										description: `**Seller legal registration identifier**

An identifier issued by an official registrar that identifies the Seller as a legal entity or person.

If no identification scheme is specified, it must be known by Buyer and Seller.`,
										required: false,
										shape: {
											/**
											 * Seller legal registration identifier
											 *
											 * An identifier issued by an official registrar that identifies the Seller as a legal entity or person.
											 *
											 * If no identification scheme is specified, it must be known by Buyer and Seller.
											 */
											value: {
												type: "string",
												description: `**Seller legal registration identifier**

An identifier issued by an official registrar that identifies the Seller as a legal entity or person.

If no identification scheme is specified, it must be known by Buyer and Seller.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Seller legal registration identifier.
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
											 *
											 * For a SIREN or a SIRET, the value of this field is "0002"
											 */
											schemeIdentifier: {
												type: ISO_6523.map(({ code }) => code),
												description: `**Scheme identifier**

The identification scheme identifier of the Seller legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.

For a SIREN or a SIRET, the value of this field is "0002"`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
								},
							},

							/**
							 * Seller Address
							 *
							 * A group of business terms providing information about the address of the Seller.
							 *
							 * Sufficient components of the address are to be filled in order to comply to legal requirements.
							 *
							 * Like any address, the fields necessary to define the address must appear. The country code is mandatory.
							 *
							 * BR-8: An Invoice shall contain the Seller postal address (BG-5).
							 */
							postalAddress: {
								key: "BG-5",
								type: "object",
								description: `**Seller Address**

A group of business terms providing information about the address of the Seller.

Sufficient components of the address are to be filled in order to comply to legal requirements.

Like any address, the fields necessary to define the address must appear. The country code is mandatory.

BR-8: An Invoice shall contain the Seller postal address (BG-5).`,
								shape: {
									/**
									 * Seller country code
									 *
									 * A code that identifies the country.
									 *
									 * If no tax representative is specified, this is the country where VAT is liable. The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										key: "BT-40",
										type: ISO_3166.map(({ code }) => code.alpha2),
										description: `**Seller country code**

A code that identifies the country.

If no tax representative is specified, this is the country where VAT is liable. The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CountryID",
									},
								},
							},

							/**
							 * Detailed information on tax information of the seller
							 */
							taxRegistration: {
								key: "seller-tax-registration",
								type: "object",
								description:
									"Detailed information on tax information of the seller",
								required: false,
								shape: {
									/**
									 * Seller VAT identifier
									 *
									 * The Seller's VAT identifier (also known as Seller VAT identification number).
									 *
									 * VAT number prefixed by a country code. A VAT registered Supplier shall include his VAT ID, except when he uses a tax representative.
									 */
									vatIdentifier: {
										key: "BT-31",
										type: "string",
										description: `**Seller VAT identifier**

The Seller's VAT identifier (also known as Seller VAT identification number).

VAT number prefixed by a country code. A VAT registered Supplier shall include his VAT ID, except when he uses a tax representative.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[0]/ram:ID",
										additionalXml: {
											schemeID: {
												key: "BT-31-0",
												type: "string",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[0]/ram:ID/@schemeID",
												defaultValue: "VA",
											},
										},
									},
									/**
									 * Seller tax registration identifier
									 *
									 * The local identification (defined by the Seller’s address) of the Seller for tax purposes or a reference that enables the Seller to state his registered tax status.
									 *
									 * This information may affect how the Buyer settles the payment (such as for social security fees). E.g. in some countries, if the Seller is not registered as a tax paying entity then the Buyer is required to withhold the amount of the tax and pay it on behalf of the Seller.
									 */
									localIdentifier: {
										key: "BT-32",
										type: "string",
										required: false,
										description: `**Seller tax registration identifier**

The local identification (defined by the Seller’s address) of the Seller for tax purposes or a reference that enables the Seller to state his registered tax status.

This information may affect how the Buyer settles the payment (such as for social security fees). E.g. in some countries, if the Seller is not registered as a tax paying entity then the Buyer is required to withhold the amount of the tax and pay it on behalf of the Seller.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[1]/ram:ID",
										additionalXml: {
											schemeID: {
												key: "BT-32-0",
												type: "string",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[1]/ram:ID/@schemeID",
												defaultValue: "FC",
											},
										},
									},
								},
							},
						},
					},
					/**
					 * A group of business terms providing information about the Buyer.
					 */
					buyer: {
						key: "BG-7",
						type: "object",
						description:
							"A group of business terms providing information about the Buyer.",
						shape: {
							/**
							 * Buyer name
							 *
							 * The full name of the Buyer.
							 *
							 * CHORUS PRO: this field is limied to 99 characters.
							 *
							 * BR-7: An Invoice shall contain the Buyer name (BT-44).
							 */
							name: {
								key: "BT-44",
								type: "string",
								description: `**Buyer name**

The full name of the Buyer.

CHORUS PRO: this field is limied to 99 characters.

BR-7: An Invoice shall contain the Buyer name (BT-44).`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:Name",
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
									 * Buyer legal registration identifier
									 *
									 * An identifier issued by an official registrar that identifies the Buyer as a legal entity or person.
									 *
									 * If no identification scheme is specified, it should be known by Buyer and Seller, e.g. the identifier that is exclusively used in the applicable legal environment.
									 *
									 * CHORUSPRO: the identifier of the buyer (public entity) is mandatory and is always a SIRET number
									 */
									registrationIdentifier: {
										type: "object",
										description: `**Buyer legal registration identifier**

An identifier issued by an official registrar that identifies the Buyer as a legal entity or person.

If no identification scheme is specified, it should be known by Buyer and Seller, e.g. the identifier that is exclusively used in the applicable legal environment.

CHORUSPRO: the identifier of the buyer (public entity) is mandatory and is always a SIRET number`,
										required: false,
										shape: {
											/**
											 * Buyer legal registration identifier
											 *
											 * An identifier issued by an official registrar that identifies the Buyer as a legal entity or person.
											 *
											 * If no identification scheme is specified, it should be known by Buyer and Seller, e.g. the identifier that is exclusively used in the applicable legal environment.
											 *
											 * CHORUSPRO: the identifier of the buyer (public entity) is mandatory and is always a SIRET number
											 */
											value: {
												type: "string",
												description: `**Buyer legal registration identifier**

An identifier issued by an official registrar that identifies the Buyer as a legal entity or person.

If no identification scheme is specified, it should be known by Buyer and Seller, e.g. the identifier that is exclusively used in the applicable legal environment.

CHORUSPRO: the identifier of the buyer (public entity) is mandatory and is always a SIRET number`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Buyer legal registration identifier.
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
											 *
											 * For a SIREN or a SIRET, the value of this field is "0002"
											 */
											schemeIdentifier: {
												type: ISO_6523.map(({ code }) => code),
												description: `**Scheme identifier**

The identification scheme identifier of the Buyer legal registration identifier.

If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.

For a SIREN or a SIRET, the value of this field is "0002"`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
											},
										},
									},
								},
							},
						},
					},
					/**
					 * Details of the associated order
					 */
					associatedOrder: {
						key: "BT-13-00",
						type: "object",
						description: "Details of the associated order",
						required: false,
						shape: {
							/**
							 * Purchase order reference
							 *
							 * An identifier of a referenced purchase order, issued by the Buyer.
							 *
							 * CHORUS PRO: for the public sector, this is the "Engagement Juridique" (Legal Commitment). It is mandatory for some buyers. You should refer to the ChorusPro Directory to identify these public entity buyers that make it mandatory.
							 */
							purchaseOrderReference: {
								key: "BT-13",
								type: "string",
								description: `**Purchase order reference**

An identifier of a referenced purchase order, issued by the Buyer.

CHORUS PRO: for the public sector, this is the "Engagement Juridique" (Legal Commitment). It is mandatory for some buyers. You should refer to the ChorusPro Directory to identify these public entity buyers that make it mandatory.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerOrderReferencedDocument/ram:IssuerAssignedID",
							},
						},
					},
				},
			},
			/**
			 * Grouping of delivery details
			 */
			tradeDelivery: {
				key: "BG-13-00",
				type: "object",
				description: "Grouping of delivery details",
				xpath:
					"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery",
				defaultValue: [],
				required: false,
				shape: {},
			},
			/**
			 * Direct Debit
			 *
			 * A group of business terms to specify a direct debit.
			 *
			 * This group may be used to give prior notice in the invoice that payment will be made through a SEPA or other direct debit initiated by the Seller, in accordance with the rules of the SEPA or other direct debit scheme.
			 *
			 * CHORUS PRO : not used
			 */
			tradeSettlement: {
				key: "BG-19",
				type: "object",
				description: `**Direct Debit**

A group of business terms to specify a direct debit.

This group may be used to give prior notice in the invoice that payment will be made through a SEPA or other direct debit initiated by the Seller, in accordance with the rules of the SEPA or other direct debit scheme.

CHORUS PRO : not used`,
				shape: {
					/**
					 * Invoice currency code
					 *
					 * The currency in which all Invoice amounts are given, except for the Total VAT amount in accounting currency.
					 *
					 * Only one currency shall be used in the Invoice, except for the Total VAT amount in accounting currency (BT-111) in accordance with article 230 of Directive 2006/112/EC on VAT.
					 * The lists of valid currencies are registered with the ISO 4217 Maintenance Agency "Codes for the representation of currencies and funds".
					 *
					 * CHORUS PRO: Invoices and credit notes or Chorus Pro are mono-currencies only.
					 *
					 * BR-5: An Invoice shall have an Invoice currency code (BT-5).
					 */
					currencyCode: {
						key: "BT-5",
						type: CURRENCY_CODES.map(({ code }) => code),
						description: `**Invoice currency code**

The currency in which all Invoice amounts are given, except for the Total VAT amount in accounting currency.

Only one currency shall be used in the Invoice, except for the Total VAT amount in accounting currency (BT-111) in accordance with article 230 of Directive 2006/112/EC on VAT.
The lists of valid currencies are registered with the ISO 4217 Maintenance Agency "Codes for the representation of currencies and funds".

CHORUS PRO: Invoices and credit notes or Chorus Pro are mono-currencies only.

BR-5: An Invoice shall have an Invoice currency code (BT-5).`,
						xpath:
							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceCurrencyCode",
					},

					/**
					 * Document Totals
					 *
					 * A group of business terms providing the monetary totals for the Invoice.
					 *
					 * CHORUS PRO: Amounts in an invoice are expressed by a figure on 19 positions.
					 * They can not have more than two decimals. The separator is ". "
					 */
					monetarySummation: {
						key: "BG-22",
						type: "object",
						description: `**Document Totals**

A group of business terms providing the monetary totals for the Invoice.

CHORUS PRO: Amounts in an invoice are expressed by a figure on 19 positions.
They can not have more than two decimals. The separator is ". "`,
						shape: {
							/**
							 * Invoice total amount without VAT
							 *
							 * The total amount of the Invoice without VAT.
							 *
							 * The Invoice total amount without VAT is the Sum of Invoice line net amount minus Sum of allowances on document level plus Sum of charges on document level.
							 *
							 * For EXTENDED profile only, BR-CO-13 is replaced by BR-FXEXT-CO-13, which add a tolerance of 0,01 euro per line, document level charge and allowance in calculation.
							 */
							taxBasisTotalAmount: {
								key: "BT-109",
								type: "string | number",
								description: `**Invoice total amount without VAT**

The total amount of the Invoice without VAT.

The Invoice total amount without VAT is the Sum of Invoice line net amount minus Sum of allowances on document level plus Sum of charges on document level.

For EXTENDED profile only, BR-CO-13 is replaced by BR-FXEXT-CO-13, which add a tolerance of 0,01 euro per line, document level charge and allowance in calculation.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxBasisTotalAmount",
							},
							/**
							 * Invoice total VAT amount
							 *
							 * The total VAT amount for the Invoice.
							 *
							 * The Invoice total VAT amount is the sum of all VAT category tax amounts.
							 */
							taxTotal: {
								key: "BT-110",
								type: "object",
								description: `**Invoice total VAT amount**

The total VAT amount for the Invoice.

The Invoice total VAT amount is the sum of all VAT category tax amounts.`,
								shape: {
									/**
									 * Invoice total VAT amount
									 *
									 * The total VAT amount for the Invoice.
									 *
									 * The Invoice total VAT amount is the sum of all VAT category tax amounts.
									 */
									amount: {
										type: "string | number",
										description: `**Invoice total VAT amount**

The total VAT amount for the Invoice.

The Invoice total VAT amount is the sum of all VAT category tax amounts.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount[0]",
									},
									/**
									 * Invoice currency code
									 */
									currencyCode: {
										type: CURRENCY_CODES.map(({ code }) => code),
										description: "Invoice currency code",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount[0]/@currencyID",
									},
								},
							},
							/**
							 * Invoice total amount with VAT
							 *
							 * The total amount of the Invoice with VAT.
							 *
							 * The Invoice total amount with VAT is the Invoice total amount without VAT plus the Invoice total VAT amount.
							 */
							grandTotalAmount: {
								key: "BT-112",
								type: "string | number",
								description: `**Invoice total amount with VAT**

The total amount of the Invoice with VAT.

The Invoice total amount with VAT is the Invoice total amount without VAT plus the Invoice total VAT amount.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:GrandTotalAmount",
							},
							/**
							 * Amount due for payment
							 *
							 * The outstanding amount that is requested to be paid.
							 *
							 * This amount is the Invoice total amount with VAT minus the paid amount that has been paid in advance. The amount is zero in case of a fully paid Invoice. The amount may be negative; in that case the Seller owes the amount to the Buyer.
							 */
							duePayableAmount: {
								key: "BT-115",
								type: "string | number",
								description: `**Amount due for payment**

The outstanding amount that is requested to be paid.

This amount is the Invoice total amount with VAT minus the paid amount that has been paid in advance. The amount is zero in case of a fully paid Invoice. The amount may be negative; in that case the Seller owes the amount to the Buyer.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:DuePayableAmount",
							},
						},
					},
				},
			},
		},
	},
} satisfies Schema;
