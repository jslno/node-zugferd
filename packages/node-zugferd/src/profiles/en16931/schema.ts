import z from "zod";
import { type Schema } from "../../types/schema";
import { dateTimeStringFormatter } from "../../utils/helper";
import { UNTDID_1153 } from "../../codelists/untdid/1153.gen";
import { UNTDID_7143 } from "../../codelists/untdid/7143.gen";
import { ISO_3166 } from "../../codelists/iso/3166";

export const en16931Schema = {
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
							 * Seller additional legal information
							 *
							 * Additional legal information relevant for the Seller.
							 *
							 * Such as share capital.
							 */
							description: {
								type: "string",
								description: `**Seller additional legal information**

Additional legal information relevant for the Seller.

Such as share capital.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:Description",
							},
							/**
							 * Seller Contact
							 *
							 * A group of business terms providing contact information about the Seller.
							 */
							tradeContact: {
								type: "object",
								description: `**Seller Contact**

A group of business terms providing contact information about the Seller.`,
								required: false,
								shape: {
									/**
									 * Seller contact point
									 *
									 * A contact point for a legal entity or person.
									 *
									 * Such as person name, contact identification, department or office identification.
									 */
									name: {
										type: "string",
										description: `**Seller contact point**

A contact point for a legal entity or person.

Such as person name, contact identification, department or office identification.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:PersonName",
									},
									/**
									 * Department name
									 */
									departmentName: {
										type: "string",
										description: "Department name",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
									},
									/**
									 * Seller contact telephone number
									 *
									 * A phone number for the contact point.
									 */
									phoneNumber: {
										type: "string",
										description: `**Seller contact telephone number**

A phone number for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Seller contact email address
									 *
									 * An e-mail address for the contact point.
									 */
									emailAddress: {
										type: "string",
										description: `**Seller contact email address**

An e-mail address for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
									},
								},
							},
						},
					},
					buyer: {
						type: "object",
						shape: {
							/**
							 * Buyer trading name
							 *
							 * A name by which the Buyer is known, other than Buyer name (also known as Business name).
							 *
							 * This may be used if different from the Buyer name.
							 */
							tradingName: {
								type: "string",
								description: `**Buyer trading name**

A name by which the Buyer is known, other than Buyer name (also known as Business name).

This may be used if different from the Buyer name.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
							},
							/**
							 * Buyer Contact
							 *
							 * A group of business terms providing contact information relevant for the Buyer.
							 *
							 * Contacting details can be given by the Buyer at the time of the ordering or as master data exchanged prior to ordering. It is recommended not to use contacting details for the purpose of routing the received Invoice internally by the recipient; the Buyer reference identifier should be used for this purpose.
							 */
							tradeContact: {
								type: "object",
								description: `**Buyer Contact**

A group of business terms providing contact information relevant for the Buyer.

Contacting details can be given by the Buyer at the time of the ordering or as master data exchanged prior to ordering. It is recommended not to use contacting details for the purpose of routing the received Invoice internally by the recipient; the Buyer reference identifier should be used for this purpose.`,
								required: false,
								shape: {
									/**
									 * Buyer contact point
									 *
									 * A contact point for a legal entity or person.
									 *
									 * Such as person name, contact identification, department or office identification.
									 */
									name: {
										type: "string",
										description: `**Buyer contact point**

A contact point for a legal entity or person.

Such as person name, contact identification, department or office identification.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:PersonName",
									},
									/**
									 * Department name
									 */
									departmentName: {
										type: "string",
										description: "Department name",
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
									},
									/**
									 * Buyer contact telephone number
									 *
									 * A phone number for the contact point.
									 */
									phoneNumber: {
										type: "string",
										description: `**Buyer contact telephone number**

A phone number for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
									},
									/**
									 * Buyer contact email address
									 *
									 * An e-mail address for the contact point.
									 */
									emailAddress: {
										type: "string",
										description: `**Buyer contact email address**

An e-mail address for the contact point.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
									},
								},
							},
						},
					},
					/**
					 * Details about the associated order confirmation
					 */
					associatedOrderConfirmation: {
						type: "object",
						description: "Details about the associated order confirmation",
						required: false,
						shape: {
							/**
							 * Sales order reference
							 *
							 * An identifier of a referenced sales order, issued by the Seller.
							 */
							salesOrderReference: {
								type: "string",
								description: `**Sales order reference**

An identifier of a referenced sales order, issued by the Seller.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerOrderReferencedDocument/ram:IssuerAssignedID",
							},
						},
					},
					/**
					 * Additional Supporting Documents
					 *
					 * A group of business terms providing information about additional supporting documents substantiating the claims made in the Invoice.
					 *
					 * The additional supporting documents can be used for both referencing a document number which is expected to be known by the receiver, an external document (referenced by a URL) or as an embedded document (such as a time report in pdf). The option to link to an external document will be needed, for example in the case of large attachments and/or when sensitive information, e.g. person-related services, has to be separated from the Invoice itself.
					 *
					 * CHORUS PRO: If the group "ADDITIONAL SUPPORTING DOCUMENTS" is filled in, one of the following two business terms must be present: Attached Document (BT-125) or External document location (URI) (BT-124)
					 */
					supportingDocuments: {
						type: "object[]",
						group: "supporting-documents",
						description: `**Additional Supporting Documents**

A group of business terms providing information about additional supporting documents substantiating the claims made in the Invoice.

The additional supporting documents can be used for both referencing a document number which is expected to be known by the receiver, an external document (referenced by a URL) or as an embedded document (such as a time report in pdf). The option to link to an external document will be needed, for example in the case of large attachments and/or when sensitive information, e.g. person-related services, has to be separated from the Invoice itself.

CHORUS PRO: If the group "ADDITIONAL SUPPORTING DOCUMENTS" is filled in, one of the following two business terms must be present: Attached Document (BT-125) or External document location (URI) (BT-124)`,
						required: false,
						shape: {
							/**
							 * Supporting document reference
							 *
							 * An identifier of the supporting document.
							 */
							reference: {
								type: "string",
								description: `**Supporting document reference**

An identifier of the supporting document.`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[supporting-documents]/ram:IssuerAssignedID",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[supporting-documents]/ram:TypeCode":
										"916",
								},
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
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[supporting-documents]/ram:URIID",
							},
							/**
							 * Supporting document description
							 *
							 * A description of the supporting document.
							 *
							 * Such as: timesheet, usage report etc.
							 *
							 * CHORUS PRO: Chorus Pro allows only two types of attachements: main attachment and additional attachment.
							 * In the case of a PDF / A-3 (Factur-X), only the type of complementary attachment is allowed.
							 */
							description: {
								type: "string",
								description: `**Supporting document description**

A description of the supporting document.

Such as: timesheet, usage report etc.

CHORUS PRO: Chorus Pro allows only two types of attachements: main attachment and additional attachment.
In the case of a PDF / A-3 (Factur-X), only the type of complementary attachment is allowed.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[supporting-documents]/ram:Name",
							},
							/**
							 * Attached document
							 *
							 * An attached document embedded as binary object or sent together with the invoice.
							 *
							 * Attached document is used when documentation shall be stored with the Invoice for future reference or audit purposes.
							 *
							 * CHORUS PRO : The attachment must be contained in a ZIP file. The maximum size of the attachment is 100 MB.
							 */
							content: {
								// ! TODO: Allow Binary
								type: "string",
								description: `**Attached document**

An attached document embedded as binary object or sent together with the invoice.

Attached document is used when documentation shall be stored with the Invoice for future reference or audit purposes.

CHORUS PRO : The attachment must be contained in a ZIP file. The maximum size of the attachment is 100 MB.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[supporting-documents]/ram:AttachmentBinaryObject",
							},
							/**
							 * Attached document Mime code
							 *
							 * The mime code of the attached document.
							 *
							 * Allowed mime codes:
							 * - application/pdf
							 * - image/png
							 * - image/jpeg
							 * - text/csv
							 * - application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet
							 * - application/vnd.oasis.opendocument.spreadsheet
							 */
							mimeCode: {
								type: [
									"application/pdf",
									"image/png",
									"image/jpeg",
									"text/csv",
									"application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet",
									"application/vnd.oasis.opendocument.spreadsheet",
								],
								description: `**Attached document Mime code**

The mime code of the attached document.

Allowed mime codes:
- application/pdf
- image/png
- image/jpeg
- text/csv
- application/vnd.openxmlformatsofficedocument.spreadsheetml.sheet
- application/vnd.oasis.opendocument.spreadsheet`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[supporting-documents]/ram:AttachmentBinaryObject/@mimeCode",
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
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[supporting-documents]/ram:AttachmentBinaryObject/@filename",
							},
						},
					},
					/**
					 * Details on tender or lot reference
					 */
					tenderOrLotReference: {
						type: "object[]",
						required: false,
						description: "Details on tender or lot reference",
						validator: z.array(z.any()).max(1),
						sibling: (data) =>
							data.transaction.tradeAgreement.supportingDocuments,
						group: "tender-lot-reference",
						shape: {
							/**
							 * Tender or lot reference
							 *
							 * The identification of the call for tender or lot the invoice relates to.
							 *
							 * In some countries a reference to the call for tender that has led to the contract shall be provided.
							 */
							reference: {
								type: "string",
								description: `**Tender or lot reference**

The identification of the call for tender or lot the invoice relates to.

In some countries a reference to the call for tender that has led to the contract shall be provided.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[tender-lot-reference]/ram:IssuerAssignedID",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[tender-lot-reference]/ram:TypeCode":
										"50",
								},
							},
						},
					},
					/**
					 * Details on invoiced object identifier
					 */
					objectIdentifier: {
						type: "object[]",
						required: false,
						sibling: (data) => [
							...data.transaction.tradeAgreement.tenderOrLotReference,
							...data.transaction.tradeAgreement.supportingDocuments,
						],
						validator: z.array(z.any()).max(1),
						group: "object-identifier",
						shape: {
							/**
							 * Invoiced object identifier
							 *
							 * An identifier for an object on which the invoice is based, given by the Seller.
							 *
							 * It may be a subscription number, telephone number, meter point, vehicle, person etc., as applicable.
							 */
							reference: {
								type: "string",
								description: `**Invoiced object identifier**

An identifier for an object on which the invoice is based, given by the Seller.

It may be a subscription number, telephone number, meter point, vehicle, person etc., as applicable.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[object-identifier]/ram:IssuerAssignedID",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[object-identifier]/ram:TypeCode":
										"130",
								},
							},
							/**
							 * Scheme identifier
							 *
							 * The identification scheme identifier of the Invoiced object identifier.
							 *
							 * If it may be not clear for the receiver what scheme is used for the identifier, a onditional scheme identifier should be used that shall be chosen from the UNTDID 1153 code list [6] entries.
							 */
							referenceTypeCode: {
								type: UNTDID_1153.map(({ code }) => code),
								description: `**Scheme identifier**

The identification scheme identifier of the Invoiced object identifier.

If it may be not clear for the receiver what scheme is used for the identifier, a onditional scheme identifier should be used that shall be chosen from the UNTDID 1153 code list [6] entries.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[object-identifier]/ram:ReferenceTypeCode",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[object-identifier]/ram:TypeCode":
										"130",
								},
							},
						},
					},
					/**
					 * Details about a project reference
					 */
					project: {
						type: "object",
						description: "Details about a project reference",
						required: false,
						shape: {
							/**
							 * Project reference
							 *
							 * The identification of the project the invoice refers to.
							 */
							reference: {
								type: "string",
								description: `**Project reference**

The identification of the project the invoice refers to.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SpecifiedProcuringProject/ram:ID",
							},
							/**
							 * Project name
							 *
							 * The identification of the project the invoice refers to
							 */
							name: {
								type: "string",
								description: `**Project name**

The identification of the project the invoice refers to`,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SpecifiedProcuringProject/ram:Name",
							},
						},
					},
				},
			},
			tradeDelivery: {
				type: "object",
				shape: {
					/**
					 * Detailed information about the associated goods receipt
					 */
					associatedGoodsReceipt: {
						type: "object",
						description:
							"Detailed information about the associated goods receipt",
						required: false,
						shape: {
							/**
							 * Receiving advice reference
							 *
							 * An identifier of a referenced receiving advice.
							 */
							reference: {
								type: "string",
								description: `**Receiving advice reference**

An identifier of a referenced receiving advice.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:IssuerAssignedID",
							},
						},
					},
				},
			},
			tradeSettlement: {
				type: "object",
				shape: {
					paymentInstruction: {
						type: "object",
						required: false,
						shape: {
							/**
							 * Payment means text
							 *
							 * The means, expressed as text, for how a payment is expected to be or has been settled.
							 *
							 * Such as cash, credit transfer, direct debit, credit card, etc.
							 */
							information: {
								type: "string",
								description: `**Payment means text**

The means, expressed as text, for how a payment is expected to be or has been settled.

Such as cash, credit transfer, direct debit, credit card, etc.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:Information",
							},
							/**
							 * Payment Card Information
							 *
							 * A group of business terms providing information about card used for payment contemporaneous with invoice issuance.
							 *
							 * Only used if the Buyer has opted to pay by using a payment card such as a credit or debit card.
							 */
							cardInformation: {
								type: "object",
								description: `**Payment Card Information**

A group of business terms providing information about card used for payment contemporaneous with invoice issuance.

Only used if the Buyer has opted to pay by using a payment card such as a credit or debit card.`,
								required: false,
								shape: {
									/**
									 * Payment card primary account number
									 *
									 * The Primary Account Number (PAN) of the card used for payment.
									 *
									 * In accordance with card payments security standards an invoice should never include a full card primary account number. At the moment PCI Security Standards Council has defined following: The first 6 digits and last 4 digits are the maximum number of digits to be shown.
									 */
									primaryAccountNumber: {
										type: "string",
										description: `**Payment card primary account number**

The Primary Account Number (PAN) of the card used for payment.

In accordance with card payments security standards an invoice should never include a full card primary account number. At the moment PCI Security Standards Council has defined following: The first 6 digits and last 4 digits are the maximum number of digits to be shown.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:ApplicableTradeSettlementFinancialCard/ram:ID",
									},
									/**
									 * Payment card holder name
									 *
									 * The name of the payment card holder.
									 */
									holderName: {
										type: "string",
										description: `**Payment card holder name**

The name of the payment card holder.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:ApplicableTradeSettlementFinancialCard/ram:CardholderName",
									},
								},
							},
							transfers: {
								type: "object[]",
								required: false,
								shape: {
									/**
									 * Payment account name
									 *
									 * The name of the payment account, at a payment service provider, to which payment should be made.
									 */
									accountName: {
										type: "string",
										description: `**Payment account name**

The name of the payment account, at a payment service provider, to which payment should be made.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeePartyCreditorFinancialAccount[transfers]/ram:AccountName",
									},
								},
							},
							/**
							 * Seller bank information
							 */
							sellerBankInformation: {
								type: "object",
								description: "Seller bank information",
								required: false,
								shape: {
									/**
									 * Payment service provider identifier
									 *
									 * An identifier for the payment service provider where a payment account is located.
									 *
									 * Such as a BIC or a national clearing code where required. No identification scheme to be used.
									 *
									 * To be used for Credit Transfer only
									 * CHORUS PRO: Only BIC format is allowed
									 *
									 * Use for credit transfer
									 */
									serviceProdiverIdentifier: {
										type: "string",
										description: `**Payment service provider identifier**

An identifier for the payment service provider where a payment account is located.

Such as a BIC or a national clearing code where required. No identification scheme to be used.

To be used for Credit Transfer only
CHORUS PRO: Only BIC format is allowed

Use for credit transfer`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeeSpecifiedCreditorFinancialInstitution/ram:BICID",
									},
								},
							},
						},
					},
					vatBreakdown: {
						type: "object[]",
						required: false,
						shape: {
							/**
							 * Value added tax point date
							 *
							 * This does not apply in Germany. Use date of delivery instead.
							 *
							 * The date when the VAT becomes accountable for the Seller and for the Buyer in so far as that date can be determined and differs from the date of issue of the invoice, according to the VAT directive.
							 *
							 * The tax point is usually the date goods were supplied or services completed (the 'basic tax point'). There are some variations. Please refer to Article 226 (7) of the Council Directive 2006/112/EC [2] for more information.
							 * This element is required if the Value added tax point date is different from the Invoice issue date.
							 * Both Buyer and Seller should use the Tax Point Date when provided by the Seller. The use of BT-7 and BT-8 is mutually exclusive.
							 *
							 * This date shall not be present if the Value added tax point date is expressed in code in the "Value added tax point date code" (BT-8)
							 *
							 * BR-CO-3: Value added tax point date (BT-7) and Value added tax point date code (BT-8) are mutually exclusive.
							 */
							taxDueDate: {
								type: "date",
								description: `**Value added tax point date**

This does not apply in Germany. Use date of delivery instead.

The date when the VAT becomes accountable for the Seller and for the Buyer in so far as that date can be determined and differs from the date of issue of the invoice, according to the VAT directive.

The tax point is usually the date goods were supplied or services completed (the 'basic tax point'). There are some variations. Please refer to Article 226 (7) of the Council Directive 2006/112/EC [2] for more information.
This element is required if the Value added tax point date is different from the Invoice issue date.
Both Buyer and Seller should use the Tax Point Date when provided by the Seller. The use of BT-7 and BT-8 is mutually exclusive.

This date shall not be present if the Value added tax point date is expressed in code in the "Value added tax point date code" (BT-8)

BR-CO-3: Value added tax point date (BT-7) and Value added tax point date code (BT-8) are mutually exclusive.`,
								required: false,
								transform: {
									input: dateTimeStringFormatter,
								},
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax[vat-breakdown]/ram:TaxPointDate/udt:DateString",
								additionalXml: {
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax[vat-breakdown]/ram:TaxPointDate/udt:DateString/@format":
										"102",
								},
							},
						},
					},
					monetarySummation: {
						type: "object",
						shape: {
							/**
							 * Rounding amount
							 *
							 * The amount to be added to the invoice total to round the amount to be paid.
							 *
							 * This case is not applied in France.
							 */
							roundingAmount: {
								type: "string | number",
								description: `**Rounding amount**

The amount to be added to the invoice total to round the amount to be paid.

This case is not applied in France.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:RoundingAmount",
							},
						},
					},
				},
			},
			line: {
				type: "object[]",
				shape: {
					tradeProduct: {
						type: "object",
						shape: {
							/**
							 * Item Seller's identifier
							 *
							 * An identifier, assigned by the Seller, for the item.
							 */
							sellerAssignedID: {
								type: "string",
								description: `**Item Seller's identifier**

An identifier, assigned by the Seller, for the item.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:SellerAssignedID",
							},
							/**
							 * Item Buyer's identifier
							 *
							 * An identifier, assigned by the Buyer, for the item.
							 */
							buyerAssignedID: {
								type: "string",
								description: `**Item Buyer's identifier**

An identifier, assigned by the Buyer, for the item.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:BuyerAssignedID",
							},
							/**
							 * Item description
							 *
							 * A description for an item.
							 *
							 * The Item description allows for describing the item and its features in more detail than the Item name.
							 */
							description: {
								type: "string",
								description: `**Item description**

A description for an item.

The Item description allows for describing the item and its features in more detail than the Item name.`,
								required: false,
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:Description",
							},
							/**
							 * Item attributes
							 *
							 * A group of business terms providing information about properties of the goods and services invoiced.
							 */
							attributes: {
								type: "object[]",
								description: `**Item attributes**

A group of business terms providing information about properties of the goods and services invoiced.`,
								group: "line-item-attributes",
								required: false,
								shape: {
									/**
									 * Item attribute name
									 *
									 * The name of the attribute or property of the item.
									 *
									 * Such as "Colour".
									 */
									name: {
										type: "string",
										description: `**Item attribute name**

The name of the attribute or property of the item.

Such as "Colour".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic[line-item-attributes]/ram:Description",
									},
									/**
									 * Item attribute value
									 *
									 * The value of the attribute or property of the item.
									 *
									 * Such as "Red".
									 */
									value: {
										type: "string",
										description: `**Item attribute value**

The value of the attribute or property of the item.

Such as "Red".`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic[line-item-attributes]/ram:Value",
									},
								},
							},
							/**
							 * Detailed information on the item classification
							 */
							classification: {
								type: "object",
								description: "Detailed information on the item classification",
								required: false,
								shape: {
									/**
									 * Item classification identifier
									 *
									 * A code for classifying the item by its type or nature.
									 *
									 * Classification codes are used to allow grouping of similar items for a various purposes e.g. public procurement (CPV), e-Commerce (UNSPSC) etc.
									 */
									identifier: {
										type: "object[]",
										description: `**Item classification identifier**

A code for classifying the item by its type or nature.

Classification codes are used to allow grouping of similar items for a various purposes e.g. public procurement (CPV), e-Commerce (UNSPSC) etc.`,
										group: "line-item-classification-identifier",
										required: false,
										shape: {
											/**
											 * Item classification identifier
											 *
											 * A code for classifying the item by its type or nature.
											 *
											 * Classification codes are used to allow grouping of similar items for a various purposes e.g. public procurement (CPV), e-Commerce (UNSPSC) etc.
											 */
											value: {
												type: "string",
												description: `**Item classification identifier**

A code for classifying the item by its type or nature.

Classification codes are used to allow grouping of similar items for a various purposes e.g. public procurement (CPV), e-Commerce (UNSPSC) etc.`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification/ram:ClassCode[line-item-classification-identifier]",
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Item classification identifier
											 *
											 * The identification scheme shall be chosen from the entries in UNTDID 7143 [6].
											 */
											schemeIdentifier: {
												type: UNTDID_7143.map(({ code }) => code),
												description: `**Scheme identifier**

The identification scheme identifier of the Item classification identifier

The identification scheme shall be chosen from the entries in UNTDID 7143 [6].`,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification/ram:ClassCode[line-item-classification-identifier]/@listID",
											},
											/**
											 * Scheme version identifer
											 *
											 * The version of the identification scheme.
											 */
											schemeVersionIdentifier: {
												type: "string",
												description: `**Scheme version identifer**

The version of the identification scheme.`,
												required: false,
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification/ram:ClassCode[line-item-classification-identifier]/@listVersionID",
											},
										},
									},
								},
							},
							/**
							 * Detailed information on the item origin
							 */
							origin: {
								type: "object",
								description: "Detailed information on the item origin",
								required: false,
								shape: {
									/**
									 * Item country of origin
									 *
									 * The code identifying the country from which the item originates.
									 *
									 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
									 */
									countryCode: {
										type: ISO_3166.map(({ code }) => code.alpha2),
										description: `**Item country of origin**

The code identifying the country from which the item originates.

The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:OriginTradeCountry/ram:ID",
									},
								},
							},
						},
					},
					tradeAgreement: {
						type: "object",
						shape: {
							/**
							 * Details of the associated order
							 */
							buyerOrderReference: {
								type: "object",
								description: "Details of the associated order",
								required: false,
								shape: {
									/**
									 * Referenced purchase order line reference
									 *
									 * An identifier for a referenced line within a purchase order, issued by the Buyer.
									 *
									 * The purchase order identifier is referenced on document level.
									 */
									lineID: {
										type: "string | number",
										description: `**Referenced purchase order line reference**

An identifier for a referenced line within a purchase order, issued by the Buyer.

The purchase order identifier is referenced on document level.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:LineID",
									},
								},
							},
						},
					},
					tradeSettlement: {
						type: "object",
						shape: {
							allowances: {
								type: "object[]",
								required: false,
								shape: {
									/**
									 * Invoice line allowance base amount
									 *
									 * The base amount that may be used, in conjunction with the Invoice line allowance percentage, to calculate the Invoice line allowance amount.
									 */
									basisAmount: {
										type: "string | number",
										required: false,
										description: `**Invoice line allowance base amount**

The base amount that may be used, in conjunction with the Invoice line allowance percentage, to calculate the Invoice line allowance amount.`,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[line-allowances]/ram:BasisAmount",
									},
								},
							},
							charges: {
								type: "object[]",
								required: false,
								shape: {
									/**
									 * Invoice line charge base amount
									 *
									 * The base amount that may be used, in conjunction with the Invoice line charge percentage, to calculate the Invoice line charge amount.
									 */
									basisAmount: {
										type: "string | number",
										description: `**Invoice line charge base amount**

The base amount that may be used, in conjunction with the Invoice line charge percentage, to calculate the Invoice line charge amount.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[line-charges]/ram:BasisAmount",
									},
								},
							},
							/**
							 * Object identifier at the invoice item level
							 */
							objectIdentifier: {
								type: "object",
								description: "Object identifier at the invoice item level",
								required: false,
								shape: {
									/**
									 * Invoice line object identifier
									 *
									 * An identifier for an object on which the invoice line is based, given by the Seller.
									 *
									 * It may be a subscription number, telephone number, meter point etc., as applicable.
									 */
									issuerAssignedID: {
										type: "string",
										description: `**Invoice line object identifier**

An identifier for an object on which the invoice line is based, given by the Seller.

It may be a subscription number, telephone number, meter point etc., as applicable.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:AdditionalReferencedDocument/ram:IssuerAssignedID",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:AdditionalReferencedDocument/ram:TypeCode":
												"130",
										},
									},
									/**
									 * Scheme identifier
									 * Invocice line object identifier
									 *
									 * The identification scheme identifier of the Invoice line object identifier.
									 *
									 * If it may be not clear for the receiver what scheme is used for the identifier, a conditional scheme identifier should be used that shall be chosen from the UNTDID 1153 code list [6] entries.
									 */
									referenceTypeCode: {
										type: UNTDID_1153.map(({ code }) => code),
										description: `**Scheme identifier**
Invocice line object identifier

The identification scheme identifier of the Invoice line object identifier.

If it may be not clear for the receiver what scheme is used for the identifier, a conditional scheme identifier should be used that shall be chosen from the UNTDID 1153 code list [6] entries.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:AdditionalReferencedDocument/ram:ReferenceTypeCode",
										additionalXml: {
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:AdditionalReferencedDocument/ram:TypeCode":
												"130",
										},
									},
								},
							},
							/**
							 * Detailed information on the accounting reference
							 */
							buyerAccountant: {
								type: "object",
								description: "Detailed information on the accounting reference",
								required: false,
								shape: {
									/**
									 * Invoice line Buyer accounting reference
									 *
									 * A textual value that specifies where to book the relevant data into the Buyer's financial accounts.
									 *
									 * If required, this reference shall be provided by the Buyer to the Seller prior to the issuing of the Invoice.
									 */
									reference: {
										type: "string",
										description: `**Invoice line Buyer accounting reference**

A textual value that specifies where to book the relevant data into the Buyer's financial accounts.

If required, this reference shall be provided by the Buyer to the Seller prior to the issuing of the Invoice.`,
										required: false,
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:ID",
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
