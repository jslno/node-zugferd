import { validateHeaderName } from 'http'
import { dateTimeStringFormatter } from '../../helper'
import { Schema } from '../../types/schema'

export const extendedSchema = {
	/**
	 * Test Indicator
	 *
	 * The Indicator type may be used when implementing a new system in order to mark the invoice as „test invoice“.
	 *
	 * To be used only in case of a test invoice, with Indicator = true
	 */
	testIndicator: {
		type: 'boolean',
		required: false,
		xpath: '/rsm:CrossIndustryInvoice/rsm:ExchangedDocumentContext/ram:TestIndicator/udt:Indicator'
	},
	/**
	 * Document name
	 *
	 * Text is the actual wording of anything written or printed. This EN 16931_ Text. Type is based on the Text. Type as defined in ISO 15000-5:2014, Annex B. Line breaks in the text may be present.
	 */
	name: {
		type: 'string',
		required: false,
		xpath: '/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:Name'
	},
	/**
	 * Copy Indicator
	 *
	 * Indicates if the invoice document is a copy of another invoice document.
	 *
	 * With indicator = true, the document is a copy.
	 */
	copyIndicator: {
		type: 'boolean',
		required: false,
		xpath: '/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:CopyIndicator/udt:Indicator'
	},
	/**
	 * Invoice language code
	 *
	 * Indicates the language used in the invoice document.
	 *
	 * Valid languages are registered with the ISO 639-2 "Codes for the representation of names of languages" Maintenance Agency.
	 */
	language: {
		type: 'string',
		required: false,
		xpath: '/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:LanguageID'
	},
	includedNote: {
		type: 'object[]',
		shape: {
			/**
			 * Free text on header level (qualifying the content)
			 *
			 * A code to classify the content of the invoice note.
			 *
			 * The code is bilaterally agreed on and must have the same meaning as BT-22.
			 */
			contentCode: {
				type: 'string',
				required: false,
				xpath: '/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IncludedNote[notes]/ram:ContentCode'
			}
		}
	},
	/**
	 * Contractual due date of the invoice
	 *
	 * Indication of the due date of the invoice if this differs from the payment.
	 *
	 * Information only required if the contractual due date differs from due date of the payment (i.e. for SEPA direct debit).
	 */
	contractualDueDate: {
		type: 'date',
		required: false,
		xpath: '/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:EffectiveSpecifiedPeriod/ram:CompleteDateTime/udt:DateTimeString',
		transform: {
			input: dateTimeStringFormatter
		},
		additionalXml: {
			'/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:EffectiveSpecifiedPeriod/ram:CompleteDateTime/udt:DateTimeString/@format':
				'102'
		}
	},
	transaction: {
		type: 'object',
		shape: {
			line: {
				type: 'object[]',
				shape: {
					/**
					 * Parent line ID
					 *
					 * The value given here refers to the superior line. In this way, a hierarchy tree of invoice items can be mapped.
					 */
					parentIdentifier: {
						type: 'string',
						required: false,
						xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:AssociatedDocumentLineDocument/ram:ParentLineID'
					},
					/**
					 * Type of the inovice line item (Code)
					 *
					 * Indicating whether an item includes the prices which must be taken into account when calculating the invoice amount, or whether it only contains information.
					 *
					 * Use codes from codelist UNTDID 1229. The following code should be applied per default: 39
					 */
					typeCode: {
						type: 'string',
						required: false,
						defaultValue: '39',
						xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:AssociatedDocumentLineDocument/ram:LineStatusCode'
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
						type: ['DETAIL', 'GROUP', 'INFORMATION'],
						required: false,
						xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:AssociatedDocumentLineDocument/ram:LineStatusReasonCode'
					},
					/**
					 * Free text on line level (code)
					 *
					 * A code to classify the content of the invoice note.
					 *
					 * The code is agreed bilaterally and must have the same meaning as BT-127.
					 */
					noteContentCode: {
						type: 'string',
						required: false,
						xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:AssociatedDocumentLineDocument/ram:IncludedNote/ram:ContentCode'
					},
					/**
					 * Invoice line note subject code
					 *
					 * To be chosen from the entries in UNTDID 4451 [6].
					 */
					noteSubjectCode: {
						type: 'string',
						required: false,
						xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:AssociatedDocumentLineDocument/ram:IncludedNote/ram:SubjectCode'
					},
					tradeProduct: {
						type: 'object',
						shape: {
							/**
							 * Product identifier
							 *
							 * This identifier can be additionally specified to be interoperable with Order-X.
							 */
							identifier: {
								type: 'string',
								required: false,
								xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:ID'
							},
							/**
							 * Industry assigned product identifier
							 *
							 * An identifier, assigned by the Industry, for the item.
							 */
							industryIdentifier: {
								type: 'string',
								required: false,
								xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IndustryAssignedID'
							},
							/**
							 * Model identification of the item
							 *
							 * A unique model identifier for this item.
							 */
							modelIdentifier: {
								type: 'string',
								required: false,
								xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:ModelID'
							},
							/**
							 * Batch (lot) identification of the item
							 *
							 * A batch identifier for this item.
							 */
							batchIdentifier: {
								type: 'string',
								required: false,
								xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:BatchID'
							},
							/**
							 * Item brand name
							 *
							 * The brand name, expressed as text, for this item.
							 */
							brandName: {
								type: 'string',
								required: false,
								xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:BrandName'
							},
							/**
							 * Item model name
							 */
							modelName: {
								type: 'string',
								required: false,
								xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:ModelName'
							},
							attributes: {
								type: 'object[]',
								shape: {
									/**
									 * Item Attribute Type (Code)
									 *
									 * To ensure automated processing of the article attributes without bilateral reconciliation, only values from the code list UNTDED 6313+Factur-X-Extension should be used.
									 */
									typeCode: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic[line-item-attributes]/ram:TypeCode'
									},
									/**
									 * Item Attribute Value (numerical measurand)
									 */
									measureValue: {
										type: 'string | number',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic[line-item-attributes]/ram:ValueMeasure'
									},
									/**
									 * Unit of measure
									 */
									measureUnit: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic[line-item-attributes]/ram:ValueMeasure/@unitCode'
									}
								}
							},
							classification: {
								type: 'object',
								shape: {
									/**
									 * Classification name
									 *
									 * Name used to classify an item according to its type or nature.
									 */
									name: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification/ram:ClassName'
									}
								}
							},
							/**
							 * Item (Trade Product) Instances
							 */
							instances: {
								type: 'object[]',
								group: 'line-item-instances',
								required: false,
								shape: {
									/**
									 * Item (Trade Product) Instances Batch ID
									 *
									 * The unique batch identifier for this trade product instance
									 */
									batchIdentifier: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IndividualTradeProductInstance[line-item-instances]/ram:BatchID'
									},
									/**
									 * Item (Trade Product) Instances Supplier Serial ID
									 *
									 * The unique supplier assigned serial identifier for this trade product instance
									 */
									supplierSerialIdentifier: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IndividualTradeProductInstance[line-item-instances]/ram:SupplierAssignedSerialID'
									}
								}
							},
							/**
							 * An included product referenced from this trade product.
							 */
							referencedProduct: {
								type: 'object[]',
								required: false,
								group: 'line-item-referenced-product',
								shape: {
									/**
									 * ID of Included Referenced Product
									 *
									 * Article identifier for interoperability with Order-X
									 */
									identifier: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:ID'
									},
									/**
									 * Global ID of Included Referenced Product
									 *
									 * An item identifier based on a registered scheme.
									 */
									globalIdentifier: {
										type: 'object',
										required: false,
										shape: {
											/**
											 * Global ID of Included Referenced Product
											 *
											 * An item identifier based on a registered scheme.
											 */
											value: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:GlobalID'
											},
											/**
											 * Scheme identifier
											 *
											 * The identification scheme identifier of the Item standard identifier
											 *
											 * The identification scheme shall be identified from the entries of the list published by the ISO/IEC 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:GlobalID/@schemeID'
											}
										}
									},
									/**
									 * SellerAssignedID of Included Referenced Product
									 *
									 * An identifier, assigned by the Seller, for the item.
									 */
									sellerAssignedID: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:SellerAssignedID'
									},
									/**
									 * BuyerAssignedID of Included Referenced Product
									 *
									 * An identifier, assigned by the Buyer, for the item.
									 */
									buyerAssignedID: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:BuyerAssignedID'
									},
									/**
									 * IndustryAssignedID of Included Referenced Product
									 *
									 * Article identifier for interoperability with Order-X
									 */
									industryAssignedID: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:IndustryAssignedID'
									},
									/**
									 * Name of Included Referenced Product
									 */
									name: {
										type: 'string',
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:Name'
									},
									/**
									 * Description of Included Referenced Product
									 *
									 * A description for an item.
									 *
									 * The Item description allows for describing the item and its features in more detail than the Item name.
									 */
									description: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:Description'
									},
									/**
									 * UnitQuantity of Included Referenced Product
									 */
									measureValue: {
										type: 'string | number',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:UnitQuantity'
									},
									/**
									 * Measurement unit
									 */
									measureUnit: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct[line-item-referenced-product]/ram:UnitQuantity/@unitCode'
									}
								}
							}
						}
					},
					tradeAgreement: {
						type: 'object',
						shape: {
							/**
							 * Details of an seller order document reference
							 */
							sellerOrderReference: {
								type: 'object',
								required: false,
								shape: {
									/**
									 * Document number
									 */
									issuerAssignedID: {
										type: 'string | number',
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:IssuerAssignedID'
									},
									/**
									 * Referenced position
									 */
									lineID: {
										type: 'string | number',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:LineID'
									},
									/**
									 * Document date
									 */
									date: {
										type: 'date',
										required: false,
										transform: {
											input: dateTimeStringFormatter
										},
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString',
										additionalXml: {
											'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format':
												'102'
										}
									}
								}
							},
							buyerOrderReference: {
								type: 'object',
								shape: {
									/**
									 * Order Id
									 */
									issuerAssignedID: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:IssuerAssignedID'
									},
									/**
									 * Order date
									 */
									date: {
										type: 'date',
										required: false,
										transform: {
											input: dateTimeStringFormatter
										},
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString',
										additionalXml: {
											'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format':
												'102'
										}
									}
								}
							},
							/**
							 * Details of an quotation document reference
							 */
							quotationReference: {
								type: 'object',
								shape: {
									/**
									 * Document number
									 *
									 *
									 */
									issuerAssignedID: {
										type: 'string',
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:IssuerAssignedID'
									},
									/**
									 * Referenced position
									 */
									lineID: {
										type: 'string | number',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:LineID'
									},
									/**
									 * Document date
									 */
									date: {
										type: 'date',
										required: false,
										transform: {
											input: dateTimeStringFormatter
										},
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString',
										additionalXml: {
											'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format':
												'102'
										}
									}
								}
							},
							/**
							 * Detailed information on the associated contract
							 */
							contractReference: {
								type: 'object',
								required: false,
								shape: {
									/**
									 * Contract number
									 */
									issuerAssignedID: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:IssuerAssignedID'
									},
									/**
									 * Contract position
									 */
									lineID: {
										type: 'string | number',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:LineID'
									},
									/**
									 * Contract Date
									 */
									date: {
										type: 'date',
										required: false,
										transform: {
											input: dateTimeStringFormatter
										},
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString',
										additionalXml: {
											'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString/@format':
												'102'
										}
									}
								}
							},
							/**
							 * Details of an additional document reference
							 */
							additionalDocument: {
								type: 'object[]',
								required: false,
								group: 'line-item-additional-document',
								shape: {
									/**
									 * Document number
									 */
									issuerAssignedID: {
										type: 'string',
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:IssuerAssignedID'
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
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:URIID'
									},
									/**
									 * Referenced position
									 */
									lineID: {
										type: 'string | number',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:LineID'
									},
									/**
									 * Type of the document (code)
									 */
									typeCode: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:TypeCode'
									},
									/**
									 * Document description
									 */
									description: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:Name'
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
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:AttachmentBinaryObject'
									},
									/**
									 * Attached document Mime code
									 *
									 * The mime code of the attached document.
									 */
									mimeCode: {
										type: 'string',
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:AttachmentBinaryObject/@mimeCode'
									},
									/**
									 * Attached document Filename
									 *
									 * The file name of the attached document
									 */
									filename: {
										type: 'string',
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:AttachmentBinaryObject/@filename'
									},
									/**
									 * Type of the document reference (code)
									 */
									referenceTypeCode: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:ReferenceTypeCode'
									},
									/**
									 * Document date
									 */
									date: {
										type: 'date',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument[line-item-additional-document]/ram:FormattedIssueDateTime/qdt:DateTimeString'
									}
								}
							},
							grossTradePrice: {
								type: 'object',
								shape: {
									discounts: {
										type: 'object',
										shape: {
											/**
											 * Discount in percent
											 */
											calculationPercent: {
												type: 'string | number',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:CalculationPercent'
											},
											/**
											 * Discount base amount
											 */
											basisAmount: {
												type: 'string | number',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:BasisAmount'
											},
											/**
											 * Reason for the discount (code)
											 *
											 * Use entries of the UNTDID 5189 code list [6]. The Invoice line level allowance reason code and the Invoice line level allowance reason shall indicate the same allowance reason.
											 */
											reasonCode: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:ReasonCode'
											},
											/**
											 * Reason for the discount (free text)
											 */
											reason: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:Reason'
											}
										},
										additionalXml: {
											'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:ChargeIndicator/udt:Indicator':
												'false'
										}
									},
									/**
									 * Price-related surcharges
									 */
									surcharges: {
										type: 'object[]',
										sibling: (data, { line }) =>
											data.transaction.line[line]
												?.tradeAgreement
												?.grossTradePrice?.discounts,
										group: 'line-item-surcharges',
										shape: {
											/**
											 * Charge in percent
											 */
											calculationPercent: {
												type: 'string | number',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:CalculationPercent',
												additionalXml: {
													'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:ChargeIndicator/udt:Indicator':
														'true'
												}
											},
											/**
											 * Charge base amount
											 */
											basisAmount: {
												type: 'string | number',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:BasisAmount',
												additionalXml: {
													'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:ChargeIndicator/udt:Indicator':
														'true'
												}
											},
											/**
											 * Charge amount
											 *
											 * The surcharge added to the gross price to calculate the net price
											 *
											 * Only applies if the surcharge is given per unit and is not included in the gross price.
											 */
											actualAmount: {
												type: 'string | number',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:ActualAmount',
												additionalXml: {
													'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:ChargeIndicator/udt:Indicator':
														'true'
												}
											},
											/**
											 * Reason for the charge (code)
											 *
											 * Use entries of the UNTDID 7161 code list [6]. The Invoice line charge reason code and the Invoice line charge reason shall indicate the same charge reason.
											 */
											reasonCode: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:ReasonCode',
												additionalXml: {
													'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:ChargeIndicator/udt:Indicator':
														'true'
												}
											},
											/**
											 * Reason for the charge (free text)
											 */
											reason: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:Reason',
												additionalXml: {
													'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[line-item-surcharges]/ram:ChargeIndicator/udt:Indicator':
														'true'
												}
											}
										}
									}
								}
							},
							netTradePrice: {
								type: 'object',
								shape: {
									/**
									 * Included tax for B2C
									 */
									tradeTax: {
										type: 'object',
										required: false,
										shape: {
											/**
											 * Included tax for B2C
											 */
											calculatedAmount: {
												type: 'string | number',
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:CalculatedAmount'
											},
											/**
											 * VAT exemption reason text
											 *
											 * A textual statement of the reason why the amount is exempted from VAT or why no VAT is being charged
											 */
											exemptionReason: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:ExemptionReason'
											},
											/**
											 * VAT exemption reason code
											 *
											 * A coded statement of the reason for why the amount is exempted from VAT.
											 *
											 * Code list issued and maintained by the Connecting Europe Facility.
											 */
											exemptionReasonCode: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:ExemptionReasonCode'
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
												// ! TODO: Add correct literals
												type: 'string',
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:CategoryCode'
											},
											/**
											 * VAT category rate
											 *
											 * The VAT rate, represented as percentage that applies for the relevant VAT category.
											 *
											 * The VAT category code and the VAT category rate shall be consistent.
											 */
											rateApplicablePercent: {
												type: 'string | number',
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:RateApplicablePercent'
											}
										},
										additionalXml: {
											'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:TypeCode':
												'VAT'
										}
									}
								}
							},
							/**
							 * Details on referenced customer order
							 */
							customerOrderReference: {
								type: 'object[]',
								group: 'line-item-customer-order-reference',
								required: false,
								shape: {
									/**
									 * Order number of the final customer
									 */
									issuerAssignedID: {
										type: 'string',
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument[line-item-customer-order-reference]/ram:IssuerAssignedID'
									},
									/**
									 * Order item (ultimate customer)
									 */
									lineID: {
										type: 'string | number',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument[line-item-customer-order-reference]/ram:LineID'
									},
									/**
									 * Document date
									 */
									date: {
										type: 'date',
										required: false,
										transform: {
											input: dateTimeStringFormatter
										},
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument[line-item-customer-order-reference]/ram:FormattedIssueDateTime/qdt:DateTimeString',
										additionalXml: {
											'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument[line-item-customer-order-reference]/ram:FormattedIssueDateTime/qdt:DateTimeString/@format':
												'102'
										}
									}
								}
							}
						}
					},
					tradeDelivery: {
						type: 'object',
						shape: {
							/**
							 * Quantity, without charge
							 */
							chargeFreeQuantity: {
								type: 'object',
								required: false,
								shape: {
									/**
									 * Quantity, without charge
									 */
									value: {
										type: 'string | number',
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ChargeFreeQuantity'
									},
									/**
									 * Unit of measure
									 */
									unit: {
										type: 'string',
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ChargeFreeQuantity/@unitCode'
									}
								}
							},
							/**
							 * Package quantity
							 */
							packageQuantity: {
								type: 'object',
								required: false,
								shape: {
									/**
									 * Package quantity
									 */
									value: {
										type: 'string | number',
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:PackageQuantity'
									},
									/**
									 * Unit of measure
									 */
									unit: {
										type: 'string',
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:PackageQuantity/@unitCode'
									}
								}
							},
							/**
							 * Detailed information on the deviating goods recipient
							 */
							shipTo: {
								type: 'object',
								required: false,
								shape: {
									/**
									 * Goods recipient identifier
									 *
									 * A previously exchanged assigned identifier of the business partner.
									 */
									identifier: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:ID'
									},
									/**
									 * Goods recipient global identifier
									 *
									 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
									 */
									globalIdentifier: {
										type: 'object',
										required: false,
										shape: {
											/**
											 * Goods recipient global identifier
											 *
											 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
											 */
											value: {
												type: 'string',
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:GlobalID'
											},
											/**
											 * Scheme identifier
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:GlobalID/@schemeID'
											}
										}
									},
									/**
									 * ShipTo name
									 */
									name: {
										type: 'string',
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:Name'
									},
									/**
									 * Role (code)
									 *
									 * A code qualifying the role
									 *
									 * To be chosen from UNTDID 3035.
									 */
									roleCode: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:RoleCode'
									},
									/**
									 * ShipTo details about the organization
									 */
									organization: {
										type: 'object',
										required: false,
										shape: {
											/**
											 * ShipTo Legal ID
											 *
											 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
											 */
											identifier: {
												type: 'object',
												required: false,
												shape: {
													/**
													 * ShipTo Legal ID
													 *
													 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
													 */
													value: {
														type: 'string',
														xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID'
													},
													/**
													 * Scheme identifier
													 *
													 * The identification scheme identifier of the Buyer legal registration identifier.
													 *
													 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
													 */
													schemeIdentifier: {
														type: 'string',
														required: false,
														xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID'
													}
												}
											},
											/**
											 * Trading Business Name
											 *
											 * This may be used if different from the party name.
											 */
											businessName: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName'
											},
											/**
											 * Detailed contact information of the goods recipient
											 */
											tradeContact: {
												type: 'object',
												required: false,
												shape: {
													/**
													 * Name of the contact
													 *
													 * If a contact person is indicated, either the name or the department is to be transmitted.
													 */
													name: {
														type: 'string',
														required: false,
														xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:PersonName'
													},
													/**
													 * Department name
													 *
													 * If a contact person is indicated, either the name or the department is to be transmitted.
													 */
													departmentName: {
														type: 'string',
														required: false,
														xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName'
													},
													/**
													 * Type of contact (code)
													 *
													 * The code specifying the type of trade contact
													 *
													 * To be chosen from the entries of UNTDID 3139
													 */
													typeCode: {
														type: 'string',
														required: false,
														xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode'
													},
													/**
													 * Contact telephone number
													 *
													 * A phone number for the contact point.
													 */
													telephoneNumber: {
														type: 'string',
														required: false,
														xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber'
													},
													/**
													 * Contact point fax number
													 */
													faxNumber: {
														type: 'string',
														required: false,
														xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber'
													},
													/**
													 * Contact email address
													 *
													 * An e-mail address for the contact point.
													 */
													emailAddress: {
														type: 'string',
														required: false,
														xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID'
													}
												}
											}
										}
									},
									/**
									 * Detailed information about the address of the goods recipient
									 */
									postalAddress: {
										type: 'object',
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
												type: 'string | number',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode'
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineOne'
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo'
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineThree'
											},
											/**
											 * City
											 *
											 * The common name of the city, town or village.
											 */
											city: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CityName'
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: 'string',
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountryID'
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName'
											},
											/**
											 * Details about the electronic address
											 */
											electronicAddress: {
												type: 'object',
												required: false,
												shape: {
													/**
													 * Electronic address
													 */
													value: {
														type: 'string',
														required: false,
														xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:URIUniversalCommunication/ram:URIID'
													},
													/**
													 * Scheme identifier
													 */
													schemeIdentifier: {
														type: 'string',
														xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID'
													}
												}
											}
										}
									},
									/**
									 * Detailed information on tax information of the goods recipient
									 */
									taxRegistration: {
										type: 'object',
										required: false,
										shape: {
											/**
											 * VAT ID
											 */
											identifier: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID',
												additionalXml: {
													'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID':
														'VA'
												}
											}
										}
									}
								}
							},
							/**
							 * Detailed information on the deviating final recipient
							 */
							deviatingShipTo: {
								type: 'object',
								required: false,
								shape: {
									/**
									 * Final recipient identifier
									 *
									 * A previously exchanged assigned identifier of the business partner.
									 */
									identifier: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:ID'
									},
									/**
									 * Final recipient global identifier
									 *
									 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
									 */
									globalIdentifier: {
										type: 'object',
										required: false,
										shape: {
											/**
											 * Final recipient global identifier
											 *
											 * GlobalID, if a global identifier exists and can be determined in the @schemeID, otherwise use ID
											 */
											value: {
												type: 'string',
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:GlobalID'
											},
											/**
											 * Scheme identifier
											 *
											 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO/IEC 6523 maintenance agency.
											 */
											schemeIdentifier: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:GlobalID/@schemeID'
											}
										}
									},
									/**
									 * Final Recipient Name / Company Name
									 */
									name: {
										type: 'string',
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:Name'
									},
									/**
									 * Role (code)
									 *
									 * A code qualifying the role
									 *
									 * To be chosen from UNTDID 3035.
									 */
									roleCode: {
										type: 'string',
										required: false,
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:RoleCode'
									},
									/**
									 * Details about the organization
									 */
									organization: {
										type: 'object',
										required: false,
										shape: {
											/**
											 * Company Registration Number
											 *
											 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
											 */
											identifier: {
												type: 'object',
												required: false,
												shape: {
													/**
													 * Company Registration Number
													 *
													 * An identifier issued by an official registrar that identifies the party as a legal entity or person.
													 */
													value: {
														type: 'string',
														xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID'
													},
													/**
													 * Scheme identifier
													 *
													 * The identification scheme identifier of the Buyer legal registration identifier.
													 *
													 * If used, the identification scheme shall be chosen from the entries of the list published by the ISO 6523 maintenance agency.
													 */
													schemeIdentifier: {
														type: 'string',
														required: false,
														xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID'
													}
												}
											},
											/**
											 * Trading Business Name
											 *
											 * A name by which the party is known, other than party name (also known as business name).
											 *
											 * This may be used if different from the party name.
											 */
											businessName: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName'
											}
										}
									},
									/**
									 * Detailed contact information of the final goods recipient
									 */
									tradeContact: {
										type: 'object',
										required: false,
										shape: {
											/**
											 * Name of the contact
											 *
											 * If a contact person is indicated, either the name or the department is to be transmitted.
											 */
											name: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:PersonName'
											},
											/**
											 * Department name
											 *
											 * If a contact person is indicated, either the name or the department is to be transmitted.
											 */
											departmentName: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName'
											},
											/**
											 * Type of contact (code)
											 *
											 * The code specifying the type of trade contact
											 *
											 * To be chosen from the entries of UNTDID 3139
											 */
											typeCode: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode'
											},
											/**
											 * Contact telephone number
											 *
											 * A phone number for the contact point.
											 */
											telephoneNumber: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber'
											},
											/**
											 * Contact point fax number
											 */
											faxNumber: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber'
											},
											/**
											 * Contact email address
											 *
											 * An e-mail address for the contact point.
											 */
											emailAddress: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID'
											}
										}
									},
									/**
									 * Detailed information about the address of the final goods recipient
									 */
									postalAddress: {
										type: 'object',
										shape: {
											/**
											 * Post code
											 *
											 * The identifier for an addressable group of properties according to the relevant postal service.
											 *
											 * Such as a ZIP code or a post code.
											 */
											postCode: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode'
											},
											/**
											 * Address line 1
											 *
											 * The main address line in an address.
											 *
											 * Usually the street name and number or post office box.
											 */
											line1: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineOne'
											},
											/**
											 * Address line 2
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line2: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo'
											},
											/**
											 * Address line 3
											 *
											 * An additional address line in an address that can be used to give further details supplementing the main line.
											 */
											line3: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineThree'
											},
											/**
											 * Country code
											 *
											 * A code that identifies the country.
											 *
											 * The lists of valid countries are registered with the ISO 3166-1 Maintenance agency, "Codes for the representation of names of countries and their subdivisions".
											 */
											countryCode: {
												type: 'string',
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountryID'
											},
											/**
											 * Country subdivision
											 *
											 * The subdivision of a country.
											 *
											 * Such as a region, a county, a state, a province, etc.
											 */
											countrySubdivision: {
												type: 'string',
												required: false,
												xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName'
											},
											/**
											 * Details about the electronic address
											 */
											electronicAddress: {
												type: 'object',
												required: false,
												shape: {
													/**
													 * Electronic address
													 */
													value: {
														type: 'string',
														required: false,
														xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:URIUniversalCommunication/ram:URIID'
													},
													/**
													 * Scheme identifier
													 */
													schemeIdentifier: {
														type: 'string',
														xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:URIUniversalCommunication/ram:URIID/@schemeID'
													}
												}
											},
											/**
											 * Detailed information on tax information of the final goods recipient
											 */
											taxRegistration: {
												type: 'object',
												required: false,
												shape: {
													/**
													 * VAT ID
													 */
													identifier: {
														type: 'string',
														required: false,
														xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID',
														additionalXml: {
															'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID/@schemeID':
																'VA'
														}
													}
												}
											}
										}
									}
								}
							},
							/**
							 * Detailed information about the actual delivery
							 */
							information: {
								type: 'object',
								required: false,
								shape: {
									/**
									 * Actual delivery date for this line
									 *
									 * The VAT relevant date of delivery and achievement must be specified on the level of document.
									 */
									deliveryDate: {
										type: 'date',
										required: false,
										transform: {
											input: dateTimeStringFormatter
										},
										xpath: '/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString',
										additionalXml: {
											'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem[line]/ram:SpecifiedLineTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString/@format':
												'102'
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
} satisfies Schema
