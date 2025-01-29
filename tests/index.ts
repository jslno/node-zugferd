import { zugferd } from '../src'
import { EXTENDED } from '../src/profiles'

const invoicer = zugferd({
	profile: EXTENDED
})

invoicer
	.create({
		businessProcessType: 'BUSINESS PROCESS TYPE',
		copyIndicator: true,
		testIndicator: false,
		language: 'DE',
		name: 'NAME',
		number: 'INV-001',
		typeCode: '384',
		issueDate: new Date(),
		includedNote: [
			{
				content: '123',
				contentCode: 'CONTENT CODE',
				subjectCode: 'TXD'
			},
			{
				content: '456',
				subjectCode: 'REG'
			}
		],
		transaction: {
			tradeAgreement: {
				buyerReference: 'buyerReference',
				associatedOrder: {
					purchaseOrderReference: 'purchaseOrderReference'
				},
				associatedContract: {
					reference: 'associatedContractReference'
				},
				associatedOrderConfirmation: {
					salesOrderReference: 'SALES ORDER REFERENCES'
				},

				seller: {
					identifier: ['ID1', 'ID2'],
					gloablIdentifier: {
						value: 'GLOBALIDENTIFIER',
						schemeIdentifier: '0088'
					},
					name: 'Lieferant GmbH',
					organization: {
						registrationIdentifier: {
							value: 'registrationIdentifier',
							schemeIdentifier: 'schemeID'
						},
						tradingName: 'TRADING NAME'
					},
					postalAddress: {
						postCode: 'POSTCODE',
						line1: 'LINE1',
						line2: 'LINE2',
						line3: 'LINE3',
						city: 'CITY',
						countrySubdivision: 'SUBDIVISION',
						countryCode: 'DE',
						electronicAddress: {
							schemeIdentifier: 'SCHEME',
							value: 'ELECTRONIC_ADDRESS'
						}
					},
					taxRegistration: {
						vatIdentifier: 'DE123456789',
						localIdentifier: '123/123/123/123'
					},
					description: 'DESCRIPTION',
					tradeContact: {
						name: 'NAME',
						departmentName: 'DEPT NAME',
						emailAddress: 'EXAMPLE@EXAMPLE.COM',
						phoneNumber: '+49123123123123'
					}
				},
				sellerTaxRepresentative: {
					name: 'NAME',
					postalAddress: {
						countryCode: 'DE',
						postCode: 'POSTCODE',
						line1: 'LINE1',
						line2: 'LINE2',
						line3: 'LINE3',
						countrySubdivision: 'SUBDIVISION',
						city: 'CITY',
					},
					taxRegistration: {
						vatIdentifier: 'VATIDENTIFIER'
					}
				},
				buyer: {
					identifier: 'ID',
					gloablIdentifier: {
						schemeIdentifier: 'SCHEME',
						value: 'GLOBALID'
					},
					name: 'Kunden AG Frankreich',
					organization: {
						registrationIdentifier: {
							value: 'registrationIdentifier',
							schemeIdentifier: 'schemeID'
						}
					},
					postalAddress: {
						countryCode: 'DE',
						postCode: 'POSTCODE',
						line1: 'LINE1',
						line2: 'LINE2',
						line3: 'LINE3',
						countrySubdivision: 'SUBDIVISION',
						city: 'CITY',
						electronicAddress: {
							schemeIdentifier: 'SCHEME',
							value: 'ELECTRONIC_ADDRESS'
						}
					},
					taxRegistration: {
						vatIdentifier: 'VAT_ID'
					},
					tradingName: 'BUYER TRADING NAME',
					tradeContact: {
						name: 'B CONTACT NAME',
						departmentName: 'B DEPT NAME',
						emailAddress: 'EXAMPLE@EXAMPLE.COM',
						phoneNumber: '+49123123123123'
					}
				},
				supportingDocuments: [
					{
						filename: 'FILENAME',
						mimeCode: 'application/pdf',
						reference: 'REF',
						content: 'CONTENT',
						description: 'DESC',
						externalLocation: 'HTTP://EXAMPLE.COM'
					}
				],
				tenderOrLotReference: [
					{
						reference: 'TENDER OR LOT REF'
					}
				],
				objectIdentifier: [
					{
						reference: 'IDENTIFIER',
						referenceTypeCode: 'REF TYPE CODE'
					}
				],
				project: {
					reference: 'PROJECT REF',
					name: 'PROJECT NAME'
				}
			},
			tradeDelivery: {
				shipTo: {
					identifier: 'IDENTIFIER',
					globalIdentifier: {
						value: 'GLOBALID',
						schemeIdentifier: 'SCHEMEID'
					},
					name: 'SHIPTONAME',
					postalAddress: {
						countryCode: 'DE',
						city: 'CITY',
						countrySubdivision: 'COUNTRYSUBDIVISION',
						postCode: 'POSTCODE',
						line1: 'LINE1',
						line2: 'LINE2',
						line3: 'LINE3'
					}
				},
				information: {
					deliveryDate: new Date()
				},
				despatchAdvice: {
					issuerAssignedID: 'DESPATCH ADVICE REF'
				},
				associatedGoodsReceipt: {
					reference: 'ASSOCIATED GOODS RECEIPT REF'
				}
			},
			tradeSettlement: {
				currencyCode: 'EUR',
				vatAccountingCurrencyCode: 'EUR',
				creditorIdentifier: 'CREDITOR IDENTIFIER',
				monetarySummation: {
					taxBasisTotalAmount: '198.00',
					taxTotal: {
						currencyCode: 'EUR',
						amount: '37.62'
					},
					grandTotalAmount: '235.62',
					duePayableAmount: '235.62',
					lineTotalAmount: '198.00',
					allowanceTotalAmount: '100',
					chargeTotalAmount: '500',
					paidAmount: 3,
					roundingAmount: 5
				},
				vatBreakdown: [
					{
						calculatedAmount: '37.62',
						typeCode: 'TYPE CODE',
						exemptionReasonText: 'EXEMPTION REASON TEXT',
						basisAmount: '37.62',
						categoryCode: 'S',
						dueDateTypeCode: '5',
						exemptionReasonCode: 'EXEMPTION REASON CODE',
						rateApplicablePercent: '19',
						taxDueDate: new Date()
					}
				],
				payee: {
					name: 'PAYEE NAME',
					globalIdentifier: {
						value: 'GLOBALID',
						schemeIdentifier: 'SCHEMEID'
					},
					identifier: 'ID',
					organization: {
						registrationIdentifier: {
							value: 'REGID',
							schemeIdentifier: 'SCHEMEID'
						}
					}
				},
				invoicingPeriod: {
					startDate: new Date(),
					endDate: new Date()
				},
				paymentInstruction: {
					typeCode: '30',
					transfers: [
						{
							paymentAccountIdentifier: 'PAYMENT ACCOUNT ID',
							accountName: 'PAYMENT ACCOUNT NAME',
							nationalAccountNumber: 'NATACCOUNTNUMBER'
						}
					],
					information: 'INFORMATION',
					debitedAccountIdentifier: 'DEBITED ACCOUNT ID',
					cardInformation: {
						primaryAccountNumber: 'PAN',
						holderName: 'CARD HOLDER NAME'
					},
					sellerBankInformation: {
						serviceProdiverIdentifier: 'SERVICE PROVIDER ID'
					}
				},
				remittanceInformation: 'REMITTANCE INFO',
				allowances: [
					{
						calculationPercent: '10',
						actualAmount: '50',
						basisAmount: '30',
						categoryTradeTax: {
							categoryCode: 'S',
							vatRate: '20'
						},
						reason: 'REASON TEXT',
						reasonCode: 'REASON CODE'
					}
				],
				charges: [
					{
						calculationPercent: '5',
						actualAmount: '5',
						basisAmount: '3',
						reason: 'REASON',
						reasonCode: 'LA',
						categoryTradeTax: {
							categoryCode: 'Z',
							vatRate: '0'
						}
					}
				],
				paymentTerms: {
					description: 'PAYMENT TERMS',
					dueDate: new Date(),
					mandateReferenceIdentifier: 'MANDATE REFERENCE ID'
				},
				buyerAccountant: {
					reference: 'BUYER ACCOUNTANT REFERENCE'
				},
				precendingInvoices: [
					{
						reference: 'INVOICE REF #1',
						issueDate: new Date()
					},
					{
						reference: 'INVOICE REF #2',
						issueDate: new Date()
					}
				]
			},
			line: [
				{
					identifier: 'LINE ID',
					note: 'NOTE',
					tradeProduct: {
						globalIdentifier: {
							value: 'PRODUCT ID',
							schemeIdentifier: 'PRODUCT SCHEME'
						},
						sellerAssignedID: 'SELLER ASSIGNED ID',
						buyerAssignedID: 'BUYER ASSIGNED ID',
						name: 'PRODUCT NAME',
						description: 'PRODUCT DESCRIPTION',
						attributes: [
							{
								name: 'Colour',
								value: 'Red'
							}
						],
						classification: {
							identifier: [
								{
									value: 'ID VAL #1',
									schemeIdentifier: 'SCHEME ID #1',
									schemeVersionIdentifier: 'SCHEME VER ID #1'
								},
								{
									value: 'ID VAL #2',
									schemeIdentifier: 'SCHEME ID #2',
									schemeVersionIdentifier: 'SCHEME VER ID #2'
								}
							]
						},
						origin: {
							countryCode: 'DE'
						}
					},
					tradeAgreement: {
						grossTradePrice: {
							chargeAmount: 200,
							basisQuantity: {
								amount: 12,
								unitMeasureCode: 'C62'
							},
							discounts: {
								actualAmount: 0
							},
							surcharges: [
								{
									actualAmount: 100,
									reason: 'SURCHARGE TEST #1'
								},
								{
									actualAmount: 500,
									reason: 'SURCHARGE TEST #2'
								}
							]
						},
						netTradePrice: {
							chargeAmount: 200,
							basisQuantity: {
								amount: 12,
								unitMeasureCode: 'C62'
							}
						},
						buyerOrderReference: {
							issuerAssignedID: 'ASSOCIATED BUYER ORDER REF',
							date: new Date(),
							lineID: '0'
						},
						sellerOrderReference: {
							issuerAssignedID: 'ASSOCIATED SELLER ORDER REF',
							date: new Date(),
							lineID: '1'
						},
						quotationReference: {
							issuerAssignedID: 'QUOTATION REF',
							date: new Date(),
							lineID: '1'
						},
						contractReference: {
							issuerAssignedID: 'CONTRACT REF'
						}
					},
					tradeDelivery: {
						billedQuantity: {
							amount: 12,
							unitMeasureCode: 'C62'
						},
						chargeFreeQuantity: {
							value: 100,
							unit: 'UNIT'
						},
						packageQuantity: {
							value: 100,
							unit: 'UNIT'
						},
						shipTo: {
							name: 'NAME',
							globalIdentifier: {
								value: 'GLOBAL ID',
								schemeIdentifier: 'SCHEMEID'
							},
							identifier: 'IDENTIFIER',
							roleCode: 'ROLE',
							organization: {
								businessName: 'BUSINESS NAME',
								identifier: {
									value: 'IDENTIFIER',
									schemeIdentifier: 'SCHEMEID'
								},
								tradeContact: {
									name: 'NAME',
									departmentName: 'DEPT NAME',
									typeCode: 'TYPE CODE',
									telephoneNumber: '+49123123123123',
									emailAddress: 'example@example.com',
									faxNumber: '+491231231231231/0'
								}
							}
						},
						deviatingShipTo: {
							name: 'NAME',
							tradeContact: {
								name: 'NAME',
								departmentName: 'DEPT NAME',
								typeCode: 'TYPE CODE',
								telephoneNumber: '+49123123123',
								faxNumber: '+49123123123123/0',
								emailAddress: 'example@example.com'
							},
							postalAddress: {
								countryCode: 'DE'
							}
						},
						information: {
							deliveryDate: new Date(),
						},
						despatchAdvice: {
							issuerAssignedID: 'DESPATCH ADVICE REF'
						},
					},
					tradeSettlement: {
						tradeTax: {
							categoryCode: 'S',
							typeCode: 'TYPE CODE',
							rateApplicablePercent: 'RATE APPLICABLE PERCENT'
						},
						linePeriod: {
							startDate: new Date(),
							endDate: new Date()
						},
						allowances: [
							{
								actualAmount: 300,
								basisAmount: 280,
								reason: 'REASON',
								reasonCode: 'AA'
							}
						],
						charges: [
							{
								actualAmount: 200,
								basisAmount: 180,
								reason: 'REASON #1',
								reasonCode: 'LA'
							},
							{
								actualAmount: 100,
								basisAmount: 80,
								reason: 'REASON #2',
								reasonCode: 'ADT'
							}
						],
						monetarySummation: {
							lineTotalAmount: 400
						},
						buyerAccountant: {
							reference: 'LINE BUYER ACCOUNTANT REFERENCE'
						},
						objectIdentifier: {
							typeCode: '130',
							referenceTypeCode: 'REFERENCE TYPE CODE',
							issuerAssignedID: 'ISSUER ASSIGNED ID'
						}
					}
				}
			]
		}
	})
	.then(console.log)
	.catch(console.error)
