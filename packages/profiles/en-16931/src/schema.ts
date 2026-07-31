import {
	amount,
	array,
	arrayAsync,
	binaryObject,
	code,
	date,
	documentReference,
	identifier,
	metadata,
	minLength,
	nullish,
	nullishAsync,
	object,
	objectAsync,
	percentage,
	pipe,
	pipeAsync,
	text,
} from "@node-zugferd/data-types";
import { defineProfileSchema } from "@node-zugferd/utils";

export const schema = defineProfileSchema(
	pipeAsync(
		objectAsync({
			transaction: pipeAsync(
				nullishAsync(
					objectAsync({
						line: pipeAsync(
							arrayAsync(
								objectAsync({
									item: pipe(
										object({
											sellerAssignedId: pipe(
												nullish(identifier({ requireSchemeId: "never" })),
												metadata({
													id: "BT-155",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:SellerAssignedID",
												}),
											),
											buyerAssignedId: pipe(
												nullish(identifier({ requireSchemeId: "never" })),
												metadata({
													id: "BT-156",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:BuyerAssignedID",
												}),
											),
											description: pipe(
												nullish(text()),
												metadata({
													id: "BT-154",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:Description",
												}),
											),
											attributes: pipe(
												nullish(
													array(
														object({
															description: pipe(
																text(),
																metadata({
																	id: "BT-160",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:Description",
																}),
															),
															value: pipe(
																text(),
																metadata({
																	id: "BT-161",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:Value",
																}),
															),
														}),
													),
												),
												metadata({
													id: "BG-32",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic",
												}),
											),
											classification: pipe(
												nullish(
													object({
														classCode: pipe(
															nullish(
																array(
																	identifier({
																		requireSchemeId: "always",
																		requireSchemeVersion: "optional",
																	}),
																),
															),
															metadata({
																id: ["BT-158", "BT-158-1", "BT-158-2"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification/ram:ClassCode",
															}),
														),
													}),
												),
												metadata({
													id: "BT-158-00",
												}),
											),
											originTradeCountry: pipe(
												nullish(code("country")),
												metadata({
													id: ["BT-159", "BT-159-00"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:OriginTradeCountry/ram:ID",
												}),
											),
										}),
										metadata({
											id: "BG-31",
										}),
									),
									priceDetails: pipe(
										object({
											associatedOrder: pipe(
												nullish(
													object({
														lineId: pipe(
															nullish(documentReference()),
															metadata({
																id: "BT-132",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:LineID",
															}),
														),
													}),
												),
												metadata({
													id: "BT-132-00",
												}),
											),
										}),
										metadata({
											id: "BG-29",
										}),
									),
									billing: pipe(
										nullish(
											object({
												allowances: pipe(
													nullish(
														array(
															object({
																calculationPercent: pipe(
																	nullish(percentage()),
																	metadata({
																		id: "BT-138",
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:CalculationPercent',
																	}),
																),
																basisAmount: pipe(
																	nullish(amount({ requireCurrency: "never" })),
																	metadata({
																		id: "BT-137",
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:BasisAmount',
																	}),
																),
															}),
														),
													),
													metadata({
														id: "BG-27",
														xpath:
															'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:ChargeIndicator',
													}),
												),
												charges: pipe(
													nullish(
														array(
															object({
																calculationPercent: pipe(
																	nullish(percentage()),
																	metadata({
																		id: "BT-143",
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:CalculationPercent',
																	}),
																),
																basisAmount: pipe(
																	nullish(amount({ requireCurrency: "never" })),
																	metadata({
																		id: "BT-142",
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:BasisAmount',
																	}),
																),
																reasonCode: pipe(
																	nullish(code("charge")),
																	metadata({
																		id: "BT-145",
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:ReasonCode',
																	}),
																),
															}),
														),
													),
													metadata({
														id: "BG-28",
														xpath:
															'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]',
													}),
												),
												additionalReferencedDocument: pipe(
													nullish(
														object({
															issuerAssignedId: pipe(
																nullish(
																	identifier({ requireSchemeId: "never" }),
																),
																metadata({
																	id: "BT-128",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:AdditionalReferencedDocument/ram:IssuerAssignedID",
																}),
															),
															typeCode: pipe(
																text(),
																metadata({
																	id: "BT-128-0",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:AdditionalReferencedDocument/ram:TypeCode",
																}),
															),
															referenceTypeCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-128-1",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:AdditionalReferencedDocument/ram:ReferenceTypeCode",
																}),
															),
														}),
													),
													metadata({
														id: "BT-128-00",
													}),
												),
												accountingReference: pipe(
													nullish(
														object({
															id: pipe(
																nullish(text()),
																metadata({
																	id: "BT-133",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:ID",
																}),
															),
														}),
													),
													metadata({
														id: "BT-133-00",
													}),
												),
											}),
										),
										metadata({
											id: "BG-30-00",
										}),
									),
								}),
							),
							minLength(1),
							metadata({
								id: "BG-25",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem",
							}),
						),
						contract: pipeAsync(
							nullishAsync(
								objectAsync({
									seller: pipe(
										object({
											description: pipe(
												nullish(text()),
												metadata({
													id: "BT-33",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:Description",
												}),
											),
											contact: pipe(
												nullish(
													object({
														personName: pipe(
															nullish(text()),
															metadata({
																id: "BT-41",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:PersonName",
															}),
														),
														departmentName: pipe(
															nullish(text()),
															metadata({
																id: "BT-41-0",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
															}),
														),
														phoneNumber: pipe(
															nullish(text()),
															metadata({
																id: ["BT-42", "BT-42-00"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
															}),
														),
														emailAddress: pipe(
															nullish(text()),
															metadata({
																id: ["BT-43", "BT-43-00"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
															}),
														),
													}),
												),
												metadata({
													id: "BG-6",
												}),
											),
										}),
										metadata({
											id: "BG-4",
											description:
												"A group of business terms providing information about the Seller.",
										}),
									),
									buyer: pipe(
										object({
											organization: pipe(
												nullish(
													object({
														tradingName: pipe(
															nullish(text()),
															metadata({
																id: "BT-45",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
															}),
														),
													}),
												),
												metadata({
													id: "BT-47-00",
													description: "Details about the organization",
												}),
											),
											contact: pipe(
												nullish(
													object({
														personName: pipe(
															nullish(text()),
															metadata({
																id: "BT-56",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:PersonName",
															}),
														),
														departmentName: pipe(
															nullish(text()),
															metadata({
																id: "BT-56-0",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
															}),
														),
														phoneNumber: pipe(
															nullish(text()),
															metadata({
																id: ["BT-57", "BT-57-00"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
															}),
														),
														emailAddress: pipe(
															nullish(text()),
															metadata({
																id: ["BT-58", "BT-58-00"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
															}),
														),
													}),
												),
												metadata({
													id: "BG-9",
												}),
											),
										}),
										metadata({
											id: "BG-7",
											description:
												"A group of business terms providing information about the Buyer.",
										}),
									),
									sellerOrderReferencedDocument: pipe(
										nullish(
											object({
												issuerAssignedId: pipe(
													nullish(documentReference()),
													metadata({
														id: "BT-14",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerOrderReferencedDocument/ram:IssuerAssignedID",
													}),
												),
											}),
										),
										metadata({
											id: "BT-14-00",
										}),
									),
									additionalSupportingDocuments: pipeAsync(
										nullishAsync(
											arrayAsync(
												objectAsync({
													issuerAssignedId: pipe(
														documentReference(),
														metadata({
															id: "BT-122",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode="916"]/ram:IssuerAssignedID',
														}),
													),
													uri: pipe(
														nullish(text()),
														metadata({
															id: "BT-124",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode="916"]/ram:URIID',
														}),
													),
													name: pipe(
														nullish(text()),
														metadata({
															id: "BT-123",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode="916"]/ram:Name',
														}),
													),
													attachedDocument: pipeAsync(
														nullishAsync(binaryObject()),
														metadata({
															id: ["BT-125", "BT-125-1", "BT-125-2"],
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode="916"]/ram:AttachmentBinaryObject',
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-24",
											xpath:
												'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode="916"]',
										}),
									),
									tenderOrLotReferences: pipe(
										nullish(
											object({
												issuerAssignedId: pipe(
													nullish(documentReference()),
													metadata({
														id: "BT-17",
														xpath:
															'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode="50"]/ram:IssuerAssignedID',
													}),
												),
											}),
										),
										metadata({
											id: "BT-17-00",
										}),
									),
									invoicedObjectIdentifier: pipe(
										nullish(
											object({
												issuerAssignedId: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-18",
														xpath:
															'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode="130"]/ram:IssuerAssignedID',
													}),
												),
												// typeCode always "130" (BT-18-0)
												referenceTypeCode: pipe(
													nullish(text()),
													metadata({
														id: "BT-18-1",
														xpath:
															'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode="130"]/ram:ReferenceTypeCode',
													}),
												),
											}),
										),
										metadata({
											id: "BT-18-00",
										}),
									),
									projectReference: pipe(
										nullish(
											object({
												id: pipe(
													nullish(documentReference()),
													metadata({
														id: "BT-11",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SpecifiedProcuringProject/ram:ID",
													}),
												),
												name: pipe(
													text(),
													metadata({
														id: "BT-11-0",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SpecifiedProcuringProject/ram:Name",
													}),
												),
											}),
										),
										metadata({
											id: "BT-11-00",
										}),
									),
								}),
							),
							metadata({
								id: "BT-10-00",
								description: "Grouping of contract information",
							}),
						),
						delivery: pipe(
							nullish(
								object({
									associatedGoodsReceipt: pipe(
										nullish(
											object({
												issuerAssignedId: pipe(
													nullish(documentReference()),
													metadata({
														id: "BT-15",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:IssuerAssignedID",
													}),
												),
											}),
										),
										metadata({
											id: "BT-15-00",
										}),
									),
								}),
							),
							metadata({
								id: "BG-13-00",
							}),
						),
						debit: pipe(
							nullish(
								object({
									paymentMeans: pipe(
										nullish(
											object({
												information: pipe(
													nullish(text()),
													metadata({
														id: "BT-82",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:Information",
													}),
												),
												cardInfo: pipe(
													nullish(
														object({
															accountNumber: pipe(
																text(),
																metadata({
																	id: "BT-87",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:ApplicableTradeSettlementFinancialCard/ram:ID",
																}),
															),
															cardholderName: pipe(
																nullish(text()),
																metadata({
																	id: "BT-88",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:ApplicableTradeSettlementFinancialCard/ram:CardholderName",
																}),
															),
														}),
													),
													metadata({
														id: "BG-18",
													}),
												),
												creditTransfers: pipe(
													nullish(
														array(
															object({
																accountName: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-85",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeePartyCreditorFinancialAccount/ram:AccountName",
																	}),
																),
															}),
														),
													),
													metadata({
														id: "BG-17",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeePartyCreditorFinancialAccount",
														description:
															"A group of business terms to specify credit transfer payments.",
													}),
												),
												sellerBankDetails: pipe(
													nullish(
														object({
															bic: pipe(
																nullish(
																	identifier({ requireSchemeId: "never" }),
																),
																metadata({
																	id: "BT-86",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeeSpecifiedCreditorFinancialInstitution/ram:BICID",
																}),
															),
														}),
													),
													metadata({
														id: "BT-86-00",
													}),
												),
											}),
										),
										metadata({
											id: "BG-16",
										}),
									),
									vatBreakdown: pipe(
										array(
											object({
												taxDueDate: pipe(
													nullish(date()),
													metadata({
														id: ["BT-7", "BT-7-00", "BT-7-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:TaxPointDate/udt:DateString",
													}),
												),
											}),
										),
										minLength(1),
										metadata({
											id: "BG-23",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax",
											description:
												"A group of business terms providing information about VAT breakdown by different categories, rates and exemption reasons",
										}),
									),
									documentTotals: pipe(
										object({
											roundingAmount: pipe(
												nullish(amount({ requireCurrency: "never" })),
												metadata({
													id: "BT-114",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:RoundingAmount",
												}),
											),
										}),
										metadata({
											id: "BG-22",
											description:
												"A group of business terms providing the monetary totals for the Invoice.",
										}),
									),
								}),
							),
							metadata({
								id: "BG-19",
								description:
									"A group of business terms to specify a direct debit.",
							}),
						),
					}),
				),
				metadata({
					id: "BG-25-00",
				}),
			),
		}),
		metadata({
			id: "BG-0",
		}),
	),
);
