import "@node-zugferd/codelist-language";
import "@node-zugferd/codelist-untdid-2005";
import "@node-zugferd/codelist-untdid-5153";
import "@node-zugferd/codelist-vat-cat";
import {
	amount,
	array,
	asArray,
	code,
	date,
	identifier,
	metadata,
	minLength,
	nullish,
	object,
	percentage,
	pipe,
	quantity,
	text,
	unitPriceAmount,
} from "@node-zugferd/data-types";

export const schema = object({
	exchangedDocument: object({
		language: pipe(
			nullish(array(code("language"))),
			metadata({
				xpath:
					"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:LanguageID",
			}),
		),
		documentNotes: pipe(
			nullish(
				array(
					object({
						contentCode: pipe(
							nullish(identifier({ requireSchemeId: "never" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:IncludedNote/ram:ContentCode",
							}),
						),
						// TODO: Add support for multiple content elements
						content: pipe(
							array(text()),
							minLength(1),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:IncludedNote/ram:Content",
							}),
						),
					}),
				),
			),
			metadata({
				xpath:
					"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:IncludedNote",
			}),
		),
		transaction: object({
			line: pipe(
				nullish(
					array(
						object({
							position: object({
								includedNotes: pipe(
									nullish(
										array(
											object({
												contentCode: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:IncludedNote/ram:ContentCode",
													}),
												),
												content: pipe(
													array(text()),
													minLength(1),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:IncludedNote/ram:Content",
													}),
												),
											}),
										),
									),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:IncludedNote",
									}),
								),
							}),
							item: nullish(
								object({
									id: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ID",
										}),
									),
									// TODO: Add support for multiple globalId elements
									globalId: pipe(
										nullish(array(identifier({ requireSchemeId: "always" }))),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:GlobalID",
										}),
									),
									industryAssignedId: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IndustryAssignedID",
										}),
									),
									modelId: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ModelID",
										}),
									),
									modelName: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ModelName",
										}),
									),
									attributes: pipe(
										nullish(
											array(
												object({
													// TODO: Add support for multiple description elements
													description: pipe(
														array(text()),
														minLength(1),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:Description",
														}),
													),
													valueMeasure: nullish(
														object({
															value: pipe(
																text(),
																metadata({
																	xpath:
																		"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:ValueMeasure",
																}),
															),
															unitCode: pipe(
																text(),
																metadata({
																	xpath:
																		"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:ValueMeasure/@unitCode",
																}),
															),
														}),
													),
													// TODO: Add support for multiple value elements
													value: pipe(
														array(text()),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:Value",
														}),
													),
												}),
											),
										),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic",
										}),
									),
									referencedProducts: pipe(
										nullish(
											array(
												object({
													id: pipe(
														nullish(identifier({ requireSchemeId: "never" })),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:ID",
														}),
													),
													globalId: pipe(
														nullish(
															array(identifier({ requireSchemeId: "always" })),
														),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:GlobalID",
														}),
													),
													sellerAssignedId: pipe(
														nullish(identifier({ requireSchemeId: "never" })),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:SellerAssignedID",
														}),
													),
													buyerAssignedId: pipe(
														nullish(identifier({ requireSchemeId: "never" })),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:BuyerAssignedID",
														}),
													),
													industryAssignedId: pipe(
														nullish(identifier({ requireSchemeId: "never" })),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:IndustryAssignedID",
														}),
													),
													name: pipe(
														nullish(text()),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:Name",
														}),
													),
													description: pipe(
														nullish(text()),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:Description",
														}),
													),
													unitQuantity: pipe(
														nullish(quantity({ requireUnitCode: "always" })),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:UnitQuantity",
														}),
													),
												}),
											),
										),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct",
										}),
									),
								}),
							),
							substitutedItem: nullish(
								object({
									id: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SubstitutedReferencedProduct/ram:ID",
										}),
									),
									industryAssignedId: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SubstitutedReferencedProduct/ram:IndustryAssignedID",
										}),
									),
								}),
							),
							priceDetails: object({
								minimumOrderableQuantity: pipe(
									nullish(quantity({ requireUnitCode: "optional" })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:MinimumProductOrderableQuantity",
									}),
								),
								maximumOrderableQuantity: pipe(
									nullish(quantity({ requireUnitCode: "optional" })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:MaximumProductOrderableQuantity",
									}),
								),
								buyerRequisitioner: nullish(
									object({
										id: pipe(
											nullish(identifier({ requireSchemeId: "never" })),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:ID",
											}),
										),
										globalId: pipe(
											nullish(array(identifier({ requireSchemeId: "always" }))),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:GlobalID",
											}),
										),
										name: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:Name",
											}),
										),
										contact: object({
											personName: pipe(
												nullish(text()),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:DefinedTradeContact/ram:PersonName",
												}),
											),
											departmentName: pipe(
												nullish(text()),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
												}),
											),
											typeCode: pipe(
												nullish(code("untdid3139")),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
												}),
											),
											phoneNumber: pipe(
												nullish(text()),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
												}),
											),
											faxNumber: pipe(
												nullish(text()),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
												}),
											),
											emailAddress: pipe(
												nullish(text()),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
												}),
											),
										}),
									}),
								),
								quotationReference: nullish(
									object({
										date: pipe(
											nullish(date({ inputFormats: ["102", "203"] })),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
											}),
										),
									}),
								),
								contractReference: nullish(
									object({
										id: pipe(
											nullish(identifier({ requireSchemeId: "never" })),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:IssuerAssignedID",
											}),
										),
										lineId: pipe(
											nullish(identifier({ requireSchemeId: "never" })),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:LineID",
											}),
										),
										date: pipe(
											nullish(date({ inputFormats: ["102", "203"] })),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
											}),
										),
									}),
								),
								additionalReferencedDocuments: pipe(
									nullish(
										array(
											object({
												date: pipe(
													nullish(date({ inputFormats: ["102", "203"] })),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
													}),
												),
											}),
										),
									),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument",
									}),
								),
								grossPrice: nullish(
									object({
										allowances: pipe(
											nullish(
												array(
													object({
														calculationPercent: pipe(
															nullish(percentage()),
															metadata({
																xpath:
																	"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:CalculationPercent",
															}),
														),
														basisAmount: pipe(
															nullish(amount({ requireCurrency: "never" })),
															metadata({
																xpath:
																	"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:BasisAmount",
															}),
														),
													}),
												),
											),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge",
											}),
										),
										charges: pipe(
											nullish(
												array(
													object({
														calculationPercent: pipe(
															nullish(percentage()),
															metadata({
																xpath:
																	"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:CalculationPercent",
															}),
														),
														basisAmount: pipe(
															nullish(amount({ requireCurrency: "never" })),
															metadata({
																xpath:
																	"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:BasisAmount",
															}),
														),
													}),
												),
											),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge",
											}),
										),
									}),
								),
								netPrice: object({
									minimumQuantity: pipe(
										nullish(quantity({ requireUnitCode: "optional" })),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:MinimumQuantity",
										}),
									),
									maximumQuantity: pipe(
										nullish(quantity({ requireUnitCode: "optional" })),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:MaximumQuantity",
										}),
									),
									includedTradeTax: pipe(
										nullish(
											array(
												object({
													calculatedAmount: pipe(
														nullish(amount({ requireCurrency: "never" })),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:CalculatedAmount",
														}),
													),
													typeCode: pipe(
														code("untdid5153"),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:TypeCode",
														}),
													),
													exemptionReason: pipe(
														nullish(text()),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:ExemptionReason",
														}),
													),
													categoryCode: pipe(
														code("untdid5305"),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:CategoryCode",
														}),
													),
													exemptionReasonCode: pipe(
														nullish(text()),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:ExemptionReasonCode",
														}),
													),
													rateApplicablePercent: pipe(
														nullish(percentage()),
														metadata({
															xpath:
																"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:RateApplicablePercent",
														}),
													),
												}),
											),
										),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax",
										}),
									),
								}),
								catalogueReference: nullish(
									object({
										date: pipe(
											nullish(date({ inputFormats: ["102", "203"] })),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:CatalogueReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
											}),
										),
									}),
								),
								ultimateCustomerOrderReferencedDocuments: pipe(
									nullish(
										array(
											object({
												issuerAssignedId: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:IssuerAssignedID",
													}),
												),
												lineId: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:LineID",
													}),
												),
												date: pipe(
													nullish(date({ inputFormats: ["102", "203"] })),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
													}),
												),
											}),
										),
									),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument",
									}),
								),
							}),
							delivery: object({
								recipient: nullish(
									object({
										id: pipe(
											nullish(identifier({ requireSchemeId: "never" })),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:ID",
											}),
										),
										globalId: pipe(
											nullish(array(identifier({ requireSchemeId: "always" }))),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:GlobalID",
											}),
										),
										name: pipe(
											text(),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:Name",
											}),
										),
										organization: nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
													}),
												),
											}),
										),
										contact: pipe(
											nullish(
												array(
													object({
														personName: pipe(
															nullish(text()),
															metadata({
																xpath:
																	"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:PersonName",
															}),
														),
														departmentName: pipe(
															nullish(text()),
															metadata({
																xpath:
																	"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
															}),
														),
														typeCode: pipe(
															code("untdid3139"),
															metadata({
																xpath:
																	"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode",
															}),
														),
														phoneNumber: pipe(
															nullish(text()),
															metadata({
																xpath:
																	"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
															}),
														),
														faxNumber: pipe(
															nullish(text()),
															metadata({
																xpath:
																	"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
															}),
														),
														emailAddress: pipe(
															nullish(text()),
															metadata({
																xpath:
																	"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
															}),
														),
													}),
												),
											),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact",
											}),
										),
										postalAddress: nullish(
											object({
												postCode: pipe(
													nullish(text()),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
													}),
												),
												line1: pipe(
													nullish(text()),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
													}),
												),
												line2: pipe(
													nullish(text()),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
													}),
												),
												line3: pipe(
													nullish(text()),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
													}),
												),
												city: pipe(
													nullish(text()),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
													}),
												),
												countryCode: pipe(
													code("country"),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
													}),
												),
												countrySubdivision: pipe(
													nullish(text()),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
													}),
												),
											}),
										),
										electronicAddress: pipe(
											nullish(identifier({ requireSchemeId: "always" })),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:URIUniversalCommunication/ram:URIID",
											}),
										),
										taxRegistration: nullish(
											object({
												vat: pipe(
													nullish(
														array(
															object({
																id: pipe(
																	identifier({ requireSchemeId: "never" }),
																	metadata({
																		xpath:
																			"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID[@schemeID='VA']",
																	}),
																),
															}),
														),
													),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='VA']",
													}),
												),
												local: pipe(
													nullish(
														array(
															object({
																id: pipe(
																	identifier({ requireSchemeId: "never" }),
																	metadata({
																		xpath:
																			"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID[@schemeID='FC']",
																	}),
																),
															}),
														),
													),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='FC']",
													}),
												),
											}),
										),
									}),
								),
								ultimateRecipient: nullish(
									object({
										id: pipe(
											nullish(identifier({ requireSchemeId: "never" })),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										globalId: pipe(
											nullish(array(identifier({ requireSchemeId: "always" }))),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										name: pipe(
											text(),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										organization: nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
													}),
												),
											}),
										),
										contact: pipe(
											nullish(
												array(
													object({
														personName: pipe(
															nullish(text()),
															metadata({
																xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
															}),
														),
														departmentName: pipe(
															nullish(text()),
															metadata({
																xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
															}),
														),
														typeCode: pipe(
															nullish(code("untdid3139")),
															metadata({
																xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
															}),
														),
														phoneNumber: pipe(
															nullish(text()),
															metadata({
																xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
															}),
														),
														faxNumber: pipe(
															nullish(text()),
															metadata({
																xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
															}),
														),
														emailAddress: pipe(
															nullish(text()),
															metadata({
																xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
															}),
														),
													}),
												),
											),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										postalAddress: nullish(
											object({
												postCode: pipe(
													nullish(text()),
													metadata({
														xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
													}),
												),
												line1: pipe(
													nullish(text()),
													metadata({
														xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
													}),
												),
												line2: pipe(
													nullish(text()),
													metadata({
														xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
													}),
												),
												line3: pipe(
													nullish(text()),
													metadata({
														xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
													}),
												),
												city: pipe(
													nullish(text()),
													metadata({
														xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
													}),
												),
												countryCode: pipe(
													code("country"),
													metadata({
														xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
													}),
												),
												countrySubdivision: pipe(
													nullish(text()),
													metadata({
														xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
													}),
												),
											}),
										),
										electronicAddress: pipe(
											nullish(identifier({ requireSchemeId: "always" })),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										taxRegistration: nullish(
											object({
												vat: pipe(
													nullish(
														array(
															object({
																id: pipe(
																	identifier({ requireSchemeId: "never" }),
																	metadata({
																		xpath:
																			"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID[@schemeID='VA']",
																	}),
																),
															}),
														),
													),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='VA']",
													}),
												),
												local: pipe(
													nullish(
														array(
															object({
																id: pipe(
																	identifier({ requireSchemeId: "never" }),
																	metadata({
																		xpath:
																			"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID[@schemeID='FC']",
																	}),
																),
															}),
														),
													),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='FC']",
													}),
												),
											}),
										),
									}),
								),
								requestedPickUp: pipe(
									nullish(
										asArray(
											object({
												unitQuantity: pipe(
													nullish(quantity({ requireUnitCode: "always" })),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:RequestedDespatchSupplyChainEvent/ram:UnitQuantity",
													}),
												),
											}),
										),
									),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:RequestedDespatchSupplyChainEvent",
									}),
								),
								requestedDelivery: pipe(
									nullish(
										asArray(
											object({
												unitQuantity: pipe(
													nullish(quantity({ requireUnitCode: "always" })),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:RequestedDeliverySupplyChainEvent/ram:UnitQuantity",
													}),
												),
											}),
										),
									),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:RequestedDeliverySupplyChainEvent",
									}),
								),
							}),
							billing: object({
								vatBreakdown: nullish(
									object({
										calculatedAmount: pipe(
											nullish(amount({ requireCurrency: "never" })),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:CalculatedAmount",
											}),
										),
										exemptionReason: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:ExemptionReason",
											}),
										),
										exemptionReasonCode: pipe(
											// TODO: Convert to codelist
											nullish(identifier({ requireSchemeId: "never" })),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:ExemptionReasonCode",
											}),
										),
									}),
								),
								itemTotals: object({
									chargeTotalAmount: pipe(
										nullish(amount({ requireCurrency: "never" })),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:ChargeTotalAmount",
										}),
									),
									allowanceTotalAmount: pipe(
										nullish(amount({ requireCurrency: "never" })),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:AllowanceTotalAmount",
										}),
									),
									taxTotalAmount: pipe(
										nullish(amount({ requireCurrency: "never" })),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:TaxTotalAmount",
										}),
									),
									totalAllowanceChargeAmount: pipe(
										nullish(amount({ requireCurrency: "never" })),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:TotalAllowanceChargeAmount",
										}),
									),
								}),
								accounting: nullish(
									object({
										typeCode: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:TypeCode",
											}),
										),
									}),
								),
							}),
						}),
					),
				),
				metadata({
					xpath:
						"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem",
				}),
			),
			contract: object({
				seller: object({
					organization: nullish(
						object({
							postalAddress: nullish(
								object({
									postCode: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
										}),
									),
									line1: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
										}),
									),
									line2: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
										}),
									),
									line3: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
										}),
									),
									city: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
										}),
									),
									countryCode: pipe(
										code("country"),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
										}),
									),
									countrySubdivision: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
										}),
									),
								}),
							),
						}),
					),
					contact: pipe(
						nullish(
							asArray(
								object({
									faxNumber: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
										}),
									),
								}),
							),
						),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact",
						}),
					),
					taxRegistration: nullish(
						object({
							// TODO: add tests for 0..n
							vat: pipe(
								nullish(asArray(object({}))),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='VA']",
								}),
							),
							local: pipe(
								nullish(asArray(object({}))),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='FC']",
								}),
							),
						}),
					),
				}),
				buyer: object({
					description: pipe(
						nullish(text()),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:Description",
						}),
					),
					organization: nullish(
						object({
							postalAddress: nullish(
								object({
									postCode: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
										}),
									),
									line1: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
										}),
									),
									line2: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
										}),
									),
									line3: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
										}),
									),
									city: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
										}),
									),
									countryCode: pipe(
										code("country"),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
										}),
									),
									countrySubdivision: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
										}),
									),
								}),
							),
						}),
					),
					contact: pipe(
						nullish(
							asArray(
								object({
									faxNumber: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
										}),
									),
								}),
							),
						),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact",
						}),
					),
					taxRegistration: nullish(
						object({
							// TODO: Add tests for 0..n
							vat: pipe(
								nullish(asArray(object({}))),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='VA']",
								}),
							),
							local: pipe(
								nullish(asArray(object({}))),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='FC']",
								}),
							),
						}),
					),
				}),
				buyerRequisitioner: nullish(
					object({
						organization: nullish(
							object({
								postalAddress: nullish(
									object({
										postCode: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											}),
										),
										line1: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											}),
										),
										line2: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											}),
										),
										line3: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											}),
										),
										city: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											}),
										),
										countryCode: pipe(
											code("country"),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											}),
										),
										countrySubdivision: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											}),
										),
									}),
								),
							}),
						),
						contact: pipe(
							nullish(
								array(
									object({
										faxNumber: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
											}),
										),
									}),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:DefinedTradeContact",
							}),
						),
						taxRegistration: nullish(
							object({
								// TODO: Add tests for 0..n
								vat: pipe(
									nullish(array(object({}))),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='VA']",
									}),
								),
								local: pipe(
									nullish(array(object({}))),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='FC']",
									}),
								),
							}),
						),
					}),
				),
				productEndUser: nullish(
					object({
						id: pipe(
							nullish(identifier({ requireSchemeId: "never" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:ID",
							}),
						),
						globalId: pipe(
							nullish(array(identifier({ requireSchemeId: "always" }))),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:GlobalID",
							}),
						),
						name: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:Name",
							}),
						),
						organization: nullish(
							object({
								id: pipe(
									identifier({ requireSchemeId: "optional" }),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
									}),
								),
								tradingName: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									}),
								),
								postalAddress: nullish(
									object({
										postCode: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											}),
										),
										line1: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											}),
										),
										line2: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											}),
										),
										line3: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											}),
										),
										city: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											}),
										),
										countryCode: pipe(
											code("country"),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											}),
										),
										countrySubdivision: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											}),
										),
									}),
								),
							}),
						),
						contact: pipe(
							nullish(
								array(
									object({
										personName: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:PersonName",
											}),
										),
										departmentName: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
											}),
										),
										typeCode: pipe(
											nullish(code("untdid3139")),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:TypeCode",
											}),
										),
										phoneNumber: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
											}),
										),
										faxNumber: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
											}),
										),
										emailAddress: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
											}),
										),
									}),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact",
							}),
						),
						postalAddress: object({
							postCode: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
								}),
							),
							line1: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:LineOne",
								}),
							),
							line2: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:LineTwo",
								}),
							),
							line3: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:LineThree",
								}),
							),
							city: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:CityName",
								}),
							),
							countryCode: pipe(
								code("country"),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:CountryID",
								}),
							),
							countrySubdivision: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
								}),
							),
						}),
						electronicAddress: pipe(
							nullish(identifier({ requireSchemeId: "always" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:URIUniversalCommunication/ram:URIID",
							}),
						),
						taxRegistration: nullish(
							object({
								vat: pipe(
									nullish(
										array(
											object({
												id: pipe(
													identifier({ requireSchemeId: "never" }),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedTaxRegistration/ram:ID[@schemeID='VA']",
													}),
												),
											}),
										),
									),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='VA']",
									}),
								),
								local: pipe(
									nullish(
										array(
											object({
												id: pipe(
													identifier({ requireSchemeId: "never" }),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedTaxRegistration/ram:ID[@schemeID='FC']",
													}),
												),
											}),
										),
									),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='FC']",
									}),
								),
							}),
						),
					}),
				),
				salesOrderReference: nullish(
					object({
						date: pipe(
							nullish(date({ inputFormats: ["102", "203"] })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
							}),
						),
					}),
				),
				associatedOrder: nullish(
					object({
						date: pipe(
							nullish(date({ inputFormats: ["102", "203"] })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
							}),
						),
					}),
				),
				quotationReference: nullish(
					object({
						date: pipe(
							nullish(date({ inputFormats: ["102", "203"] })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:QuotationReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
							}),
						),
					}),
				),
				contractReference: nullish(
					object({
						date: pipe(
							nullish(date({ inputFormats: ["102", "203"] })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
							}),
						),
					}),
				),
				requisitionReference: nullish(
					object({
						date: pipe(
							nullish(date({ inputFormats: ["102", "203"] })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:RequisitionReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
							}),
						),
					}),
				),
				additionalReferencedDocuments: pipe(
					nullish(
						array(
							object({
								date: pipe(
									nullish(date({ inputFormats: ["102", "203"] })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
									}),
								),
							}),
						),
					),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument",
					}),
				),
				buyerAgent: nullish(
					object({
						id: pipe(
							nullish(identifier({ requireSchemeId: "never" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:ID",
							}),
						),
						globalId: pipe(
							nullish(array(identifier({ requireSchemeId: "always" }))),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:GlobalID",
							}),
						),
						name: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:Name",
							}),
						),
						organization: nullish(
							object({
								id: pipe(
									identifier({ requireSchemeId: "optional" }),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
									}),
								),
								tradingName: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									}),
								),
								postalAddress: nullish(
									object({
										postCode: pipe(
											nullish(text()),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										line1: pipe(
											nullish(text()),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										line2: pipe(
											nullish(text()),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										line3: pipe(
											nullish(text()),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										city: pipe(
											nullish(text()),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										countryCode: pipe(
											code("country"),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										countrySubdivision: pipe(
											nullish(text()),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
									}),
								),
							}),
						),
						contact: pipe(
							nullish(
								array(
									object({
										personName: pipe(
											nullish(text()),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										departmentName: pipe(
											nullish(text()),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										typeCode: pipe(
											nullish(code("untdid3139")),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										phoneNumber: pipe(
											nullish(text()),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										faxNumber: pipe(
											nullish(text()),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
										emailAddress: pipe(
											nullish(text()),
											metadata({
												xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
											}),
										),
									}),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact",
							}),
						),
						postalAddress: nullish(
							object({
								postCode: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									}),
								),
								line1: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:LineOne",
									}),
								),
								line2: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									}),
								),
								line3: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:LineThree",
									}),
								),
								city: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:CityName",
									}),
								),
								countryCode: pipe(
									code("country"),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:CountryID",
									}),
								),
								countrySubdivision: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
									}),
								),
							}),
						),
						electronicAddress: pipe(
							nullish(identifier({ requireSchemeId: "always" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:URIUniversalCommunication/ram:URIID",
							}),
						),
						taxRegistration: nullish(
							object({
								vat: pipe(
									nullish(
										array(
											object({
												id: pipe(
													identifier({ requireSchemeId: "never" }),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedTaxRegistration/ram:ID[@schemeID='VA']",
													}),
												),
											}),
										),
									),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='VA']",
									}),
								),
								local: pipe(
									nullish(
										array(
											object({
												id: pipe(
													identifier({ requireSchemeId: "never" }),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedTaxRegistration/ram:ID[@schemeID='FC']",
													}),
												),
											}),
										),
									),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='FC']",
									}),
								),
							}),
						),
					}),
				),
				catalogueReference: nullish(
					object({
						date: pipe(
							nullish(date({ inputFormats: ["102", "203"] })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:CatalogueReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
							}),
						),
					}),
				),
				blanketOrderReference: nullish(
					object({
						date: pipe(
							nullish(date({ inputFormats: ["102", "203"] })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BlanketOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
							}),
						),
					}),
				),
				previousOrderReference: nullish(
					object({
						date: pipe(
							nullish(date({ inputFormats: ["102", "203"] })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:PreviousOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
							}),
						),
					}),
				),
				previousOrderChangeReference: nullish(
					object({
						date: pipe(
							nullish(date({ inputFormats: ["102", "203"] })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:PreviousOrderChangeReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
							}),
						),
					}),
				),
				previousOrderResponseReference: nullish(
					object({
						date: pipe(
							nullish(date({ inputFormats: ["102", "203"] })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:PreviousOrderResponseReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
							}),
						),
					}),
				),
				ultimateCustomerOrderReference: pipe(
					nullish(
						array(
							object({
								issuerAssignedId: pipe(
									identifier({ requireSchemeId: "never" }),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:IssuerAssignedID",
									}),
								),
								date: pipe(
									nullish(date({ inputFormats: ["102", "203"] })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
									}),
								),
							}),
						),
					),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:UltimateCustomerOrderReferencedDocument",
					}),
				),
			}),
			delivery: object({
				recipient: nullish(
					object({
						organization: nullish(
							object({
								postalAddress: nullish(
									object({
										postCode: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											}),
										),
										line1: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											}),
										),
										line2: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											}),
										),
										line3: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											}),
										),
										city: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											}),
										),
										countryCode: pipe(
											code("country"),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											}),
										),
										countrySubdivision: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											}),
										),
									}),
								),
							}),
						),
						contact: pipe(
							nullish(
								asArray(
									object({
										faxNumber: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
											}),
										),
									}),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact",
							}),
						),
						taxRegistration: nullish(
							object({
								// TODO: Add tests for 0..n
								vat: pipe(
									nullish(asArray(object({}))),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='VA']",
									}),
								),
								local: pipe(
									nullish(asArray(object({}))),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='FC']",
									}),
								),
							}),
						),
					}),
				),
				ultimateRecipient: nullish(
					object({
						id: pipe(
							nullish(identifier({ requireSchemeId: "never" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:ID",
							}),
						),
						globalId: pipe(
							nullish(array(identifier({ requireSchemeId: "always" }))),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:GlobalID",
							}),
						),
						name: pipe(
							text(),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:Name",
							}),
						),
						organization: nullish(
							object({
								id: pipe(
									nullish(identifier({ requireSchemeId: "optional" })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
									}),
								),
								tradingName: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									}),
								),
								postalAddress: nullish(
									object({
										postCode: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											}),
										),
										line1: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											}),
										),
										line2: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											}),
										),
										line3: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											}),
										),
										city: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											}),
										),
										countryCode: pipe(
											code("country"),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											}),
										),
										countrySubdivision: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											}),
										),
									}),
								),
							}),
						),
						contact: pipe(
							nullish(
								array(
									object({
										personName: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:PersonName",
											}),
										),
										departmentName: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
											}),
										),
										typeCode: pipe(
											nullish(code("untdid3139")),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode",
											}),
										),
										phoneNumber: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
											}),
										),
										faxNumber: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
											}),
										),
										emailAddress: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
											}),
										),
									}),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact",
							}),
						),
						postalAddress: object({
							postCode: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
								}),
							),
							line1: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
								}),
							),
							line2: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
								}),
							),
							line3: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
								}),
							),
							city: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
								}),
							),
							countryCode: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
								}),
							),
							countrySubdivision: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
								}),
							),
						}),
						electronicAddress: pipe(
							nullish(identifier({ requireSchemeId: "always" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:URIUniversalCommunication/ram:URIID",
							}),
						),
						taxRegistration: nullish(
							object({
								vat: pipe(
									nullish(
										array(
											object({
												id: pipe(
													identifier({ requireSchemeId: "never" }),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID[@schemeID='VA']",
													}),
												),
											}),
										),
									),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='VA']",
									}),
								),
								local: pipe(
									nullish(
										array(
											object({
												id: pipe(
													identifier({ requireSchemeId: "never" }),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID[@schemeID='FC']",
													}),
												),
											}),
										),
									),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='FC']",
									}),
								),
							}),
						),
					}),
				),
				sender: nullish(
					object({
						organization: nullish(
							object({
								postalAddress: nullish(
									object({
										postCode: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											}),
										),
										line1: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											}),
										),
										line2: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											}),
										),
										line3: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											}),
										),
										city: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											}),
										),
										countryCode: pipe(
											code("country"),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											}),
										),
										countrySubdivision: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											}),
										),
									}),
								),
							}),
						),
						contact: pipe(
							nullish(
								asArray(
									object({
										faxNumber: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
											}),
										),
									}),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact",
							}),
						),
						taxRegistration: nullish(
							object({
								vat: pipe(
									nullish(asArray(object({}))),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='VA']",
									}),
								),
								local: pipe(
									nullish(asArray(object({}))),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='FC']",
									}),
								),
							}),
						),
					}),
				),
			}),
			debit: object({
				taxCurrencyCode: pipe(
					nullish(code("currency")),
					metadata({
						xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
					}),
				),
				requestedInvoiceCurrency: pipe(
					nullish(code("currency")),
					metadata({
						xpath: "/rsm:SCRDMCCBDACIOMessageStructure",
					}),
				),
				invoicer: nullish(
					object({
						id: pipe(
							nullish(identifier({ requireSchemeId: "never" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:ID",
							}),
						),
						globalId: pipe(
							nullish(array(identifier({ requireSchemeId: "always" }))),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:GlobalID",
							}),
						),
						name: pipe(
							text(),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:Name",
							}),
						),
						organization: nullish(
							object({
								id: pipe(
									nullish(identifier({ requireSchemeId: "optional" })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
									}),
								),
								tradingName: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
									}),
								),
								postalAddress: nullish(
									object({
										postCode: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											}),
										),
										line1: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											}),
										),
										line2: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											}),
										),
										line3: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											}),
										),
										city: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											}),
										),
										countryCode: pipe(
											code("country"),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											}),
										),
										countrySubdivision: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											}),
										),
									}),
								),
							}),
						),
						contact: pipe(
							nullish(
								array(
									object({
										personName: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:PersonName",
											}),
										),
										departmentName: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
											}),
										),
										typeCode: pipe(
											nullish(code("untdid3139")),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
											}),
										),
										phoneNumber: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
											}),
										),
										faxNumber: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
											}),
										),
										emailAddress: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
											}),
										),
									}),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact",
							}),
						),
						postalAddress: nullish(
							object({
								postCode: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
									}),
								),
								line1: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:LineOne",
									}),
								),
								line2: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
									}),
								),
								line3: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:LineThree",
									}),
								),
								city: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:CityName",
									}),
								),
								countryCode: pipe(
									code("country"),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:CountryID",
									}),
								),
								countrySubdivision: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
									}),
								),
							}),
						),
						electronicAddress: pipe(
							nullish(identifier({ requireSchemeId: "always" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:URIUniversalCommunication/ram:URIID",
							}),
						),
						taxRegistration: nullish(
							object({
								vat: pipe(
									nullish(
										array(
											object({
												id: pipe(
													identifier({ requireSchemeId: "never" }),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedTaxRegistration/ram:ID[@schemeID='VA']",
													}),
												),
											}),
										),
									),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='VA']",
									}),
								),
								local: pipe(
									nullish(
										array(
											object({
												id: pipe(
													identifier({ requireSchemeId: "never" }),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedTaxRegistration/ram:ID[@schemeID='FC']",
													}),
												),
											}),
										),
									),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='FC']",
									}),
								),
							}),
						),
					}),
				),
				invoicee: nullish(
					object({
						organization: nullish(
							object({
								postalAddress: nullish(
									object({
										postCode: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
											}),
										),
										line1: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
											}),
										),
										line2: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
											}),
										),
										line3: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
											}),
										),
										city: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
											}),
										),
										countryCode: pipe(
											code("country"),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
											}),
										),
										countrySubdivision: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
											}),
										),
									}),
								),
							}),
						),
						contact: pipe(
							nullish(
								array(
									object({
										faxNumber: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
											}),
										),
									}),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact",
							}),
						),
						taxRegistration: nullish(
							object({
								// TODO: Add tests for 0..n
								vat: pipe(
									nullish(array(object({}))),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='VA']",
									}),
								),
								local: pipe(
									nullish(array(object({}))),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID='FC']",
									}),
								),
							}),
						),
					}),
				),
				paymentMeans: nullish(
					object({
						information: pipe(
							nullish(asArray(text())),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:Information",
							}),
						),
					}),
				),
				vatBreakdown: pipe(
					nullish(
						array(
							object({
								calculatedAmount: pipe(
									amount({ requireCurrency: "never" }),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:CalculatedAmount",
									}),
								),
								exemptionReason: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:ExemptionReason",
									}),
								),
								basisAmount: pipe(
									amount({ requireCurrency: "never" }),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:BasisAmount",
									}),
								),
								lineTotalBasisAmount: pipe(
									nullish(amount({ requireCurrency: "never" })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:LineTotalBasisAmount",
									}),
								),
								allowanceChargeBasisAmount: pipe(
									nullish(amount({ requireCurrency: "never" })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:AllowanceChargeBasisAmount",
									}),
								),
								categoryCode: pipe(
									code("untdid5305"),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:CategoryCode",
									}),
								),
								exemptionReasonCode: pipe(
									nullish(identifier({ requireSchemeId: "never" })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:ExemptionReasonCode",
									}),
								),
								dueDateTypeCode: pipe(
									nullish(code("untdid2005")),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:DueDateTypeCode",
									}),
								),
								rateApplicablePercent: pipe(
									nullish(percentage()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:RateApplicablePercent",
									}),
								),
							}),
						),
					),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax",
					}),
				),
				allowances: pipe(
					nullish(
						array(
							object({
								sequenceNumeric: pipe(
									nullish(unitPriceAmount()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:SequenceNumeric",
									}),
								),
								basisQuantity: pipe(
									nullish(quantity({ requireUnitCode: "optional" })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:BasisQuantity",
									}),
								),
							}),
						),
					),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge",
					}),
				),
				charges: pipe(
					nullish(
						array(
							object({
								sequenceNumeric: pipe(
									nullish(unitPriceAmount()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:SequenceNumeric",
									}),
								),
								basisQuantity: pipe(
									nullish(quantity({ requireUnitCode: "optional" })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:BasisQuantity",
									}),
								),
							}),
						),
					),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge",
					}),
				),
				logisticsServiceCharges: pipe(
					nullish(
						array(
							object({
								description: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:Description",
									}),
								),
								appliedAmount: pipe(
									amount({ requireCurrency: "never" }),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:AppliedAmount",
									}),
								),
								appliedTradeTax: pipe(
									nullish(
										array(
											object({
												categoryCode: pipe(
													code("untdid5305"),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:AppliedTradeTax/ram:CategoryCode",
													}),
												),
												rateApplicablePercent: pipe(
													nullish(percentage()),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:AppliedTradeTax/ram:RateApplicablePercent",
													}),
												),
											}),
										),
									),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:AppliedTradeTax",
									}),
								),
							}),
						),
					),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge",
					}),
				),
				paymentTerms: nullish(
					object({
						description: pipe(
							asArray(text()),
							minLength(1),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:Description",
							}),
						),
					}),
				),
				documentTotals: object({
					taxBasisTotalAmount: pipe(
						amount({ requireCurrency: "optional" }),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxBasisTotalAmount",
						}),
					),
					taxTotalAmount: pipe(
						nullish(asArray(amount({ requireCurrency: "always" }))),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount",
						}),
					),
					taxTotalAmountInAccountingCurrency: pipe(
						nullish(array(amount({ requireCurrency: "always" }))),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount",
						}),
					),
					roundingAmount: pipe(
						nullish(amount({ requireCurrency: "never" })),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:RoundingAmount",
						}),
					),
					grandTotalAmount: pipe(
						nullish(amount({ requireCurrency: "optional" })),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:GrandTotalAmount",
						}),
					),
					prepaidAmount: pipe(
						nullish(amount({ requireCurrency: "never" })),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TotalPrepaidAmount",
						}),
					),
					duePayableAmount: pipe(
						nullish(amount({ requireCurrency: "never" })),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:DuePayableAmount",
						}),
					),
				}),
				accounting: nullish(
					object({
						typeCode: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:TypeCode",
							}),
						),
					}),
				),
			}),
		}),
	}),
});
