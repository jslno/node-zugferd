import "@node-zugferd/codelist-untdid-1153";
import "@node-zugferd/codelist-untdid-3139";
import "@node-zugferd/codelist-untdid-4461";
import "@node-zugferd/codelist-untdid-5189";
import "@node-zugferd/codelist-untdid-5305";
import "@node-zugferd/codelist-untdid-7143";
import "@node-zugferd/codelist-untdid-7161";
import {
	array,
	arrayAsync,
	asArray,
	binaryObject,
	code,
	date,
	identifier,
	maxLength,
	metadata,
	nullish,
	nullishAsync,
	object,
	objectAsync,
	percentage,
	pipe,
	pipeAsync,
	quantity,
	text,
	unitPriceAmount,
} from "@node-zugferd/data-types";
import { defineProfileSchema } from "@node-zugferd/utils";

const exchangedDocument = object({
	effectivePeriod: nullish(
		object({
			startDate: pipe(
				nullish(date()),
				metadata({
					xpath:
						"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:EffectiveSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString",
				}),
			),
			endDate: pipe(
				nullish(date()),
				metadata({
					xpath:
						"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:EffectiveSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString",
				}),
			),
		}),
	),
});

const transaction = objectAsync({
	line: pipeAsync(
		nullishAsync(
			arrayAsync(
				objectAsync({
					item: nullishAsync(
						objectAsync({
							description: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:Description",
								}),
							),
							batchId: pipe(
								nullish(identifier({ requireSchemeId: "never" })),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:BatchID",
								}),
							),
							brandName: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:BrandName",
								}),
							),
							attributes: pipe(
								nullish(
									array(
										object({
											typeCode: pipe(
												nullish(text()),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:TypeCode",
												}),
											),
											description: pipe(
												text(),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:Description",
												}),
											),
											value: pipe(
												text(),
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
							classification: pipe(
								nullish(
									array(
										object({
											classCode: object({
												value: pipe(
													text(),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification/ram:ClassCode",
													}),
												),
												listId: pipe(
													code("untdid7143"),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification/ram:ClassCode/@listID",
													}),
												),
												listVersionId: pipe(
													nullish(text()),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification/ram:ClassCode/@listVersionID",
													}),
												),
											}),
											className: pipe(
												nullish(text()),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification/ram:ClassName",
												}),
											),
										}),
									),
								),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification",
								}),
							),
							instances: pipe(
								nullish(
									array(
										object({
											batchId: pipe(
												nullish(identifier({ requireSchemeId: "never" })),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IndividualTradeProductInstance/ram:BatchID",
												}),
											),
											serialId: pipe(
												nullish(identifier({ requireSchemeId: "never" })),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IndividualTradeProductInstance/ram:SerialID",
												}),
											),
										}),
									),
								),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IndividualTradeProductInstance",
								}),
							),
							packaging: nullishAsync(
								objectAsync({
									typeCode: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableSupplychainPackaging/ram:TypeCode",
										}),
									),
									dimension: nullish(
										object({
											width: pipe(
												nullish(quantity({ requireUnitCode: "always" })),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableSupplychainPackaging/ram:LinearSpatialDimension/ram:WidthMeasure",
												}),
											),
											length: pipe(
												nullish(quantity({ requireUnitCode: "always" })),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableSupplychainPackaging/ram:LinearSpatialDimension/ram:LengthMeasure",
												}),
											),
											height: pipe(
												nullish(quantity({ requireUnitCode: "always" })),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableSupplychainPackaging/ram:LinearSpatialDimension/ram:HeightMeasure",
												}),
											),
										}),
									),
								}),
							),
							originTradeCountry: pipe(
								nullish(code("country")),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:OriginTradeCountry/ram:ID",
								}),
							),
							additionalReferencedProductDocuments: pipeAsync(
								nullishAsync(
									arrayAsync(
										objectAsync({
											issuerAssignedId: pipe(
												nullish(identifier({ requireSchemeId: "never" })),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:AdditionalReferenceReferencedDocument/ram:IssuerAssignedID",
												}),
											),
											externalDocumentLocation: pipe(
												nullish(text()),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:AdditionalReferenceReferencedDocument/ram:URIID",
												}),
											),
											typeCode: pipe(
												nullish(code("untdid1001")),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:AdditionalReferenceReferencedDocument/ram:TypeCode",
												}),
											),
											name: pipe(
												nullish(text()),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:AdditionalReferenceReferencedDocument/ram:Name",
												}),
											),
											attachedDocument: pipeAsync(
												nullishAsync(binaryObject()),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:AdditionalReferenceReferencedDocument/ram:AttachmentBinaryObject",
												}),
											),
										}),
									),
								),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:AdditionalReferenceReferencedDocument",
								}),
							),
						}),
					),
					substitutedItem: nullish(
						object({
							description: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SubstitutedReferencedProduct/ram:Description",
								}),
							),
						}),
					),
					priceDetails: objectAsync({
						quotationReference: nullish(
							object({
								issuerAssignedId: pipe(
									nullish(identifier({ requireSchemeId: "never" })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:IssuerAssignedID",
									}),
								),
								lineId: pipe(
									nullish(identifier({ requireSchemeId: "never" })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:LineID",
									}),
								),
							}),
						),
						additionalReferencedDocuments: pipeAsync(
							nullishAsync(
								arrayAsync(
									objectAsync({
										issuerAssignedId: pipe(
											nullish(identifier({ requireSchemeId: "never" })),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:IssuerAssignedID",
											}),
										),
										externalDocumentLocation: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:URIID",
											}),
										),
										lineId: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:LineID",
											}),
										),
										typeCode: pipe(
											nullish(code("untdid1001")),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:TypeCode",
											}),
										),
										name: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:Name",
											}),
										),
										attachedDocument: pipeAsync(
											nullishAsync(binaryObject()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:AttachmentBinaryObject",
											}),
										),
										referenceTypeCode: pipe(
											nullish(code("untdid1153")),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:ReferenceTypeCode",
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
								chargeAmount: pipe(
									unitPriceAmount(),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:ChargeAmount",
									}),
								),
								basisQuantity: pipe(
									nullish(quantity({ requireUnitCode: "optional" })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:BasisQuantity",
									}),
								),
								allowances: pipe(
									nullish(
										array(
											object({
												actualAmount: pipe(
													unitPriceAmount(),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:ActualAmount",
													}),
												),
												reasonCode: pipe(
													nullish(code("untdid5189")),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:ReasonCode",
													}),
												),
												reason: pipe(
													nullish(text()),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:Reason",
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
												actualAmount: pipe(
													unitPriceAmount(),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:ActualAmount",
													}),
												),
												reasonCode: pipe(
													nullish(code("untdid7161")),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:ReasonCode",
													}),
												),
												reason: pipe(
													nullish(text()),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge/ram:Reason",
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
						catalogueReference: nullish(
							object({
								issuerAssignedId: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:CatalogueReferencedDocument/ram:IssuerAssignedID",
									}),
								),
								lineId: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:CatalogueReferencedDocument/ram:LineID",
									}),
								),
							}),
						),
					}),
					delivery: object({
						packageQuantity: pipe(
							nullish(quantity({ requireUnitCode: "optional" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:PackageQuantity",
							}),
						),
						perPackageQuantity: pipe(
							nullish(quantity({ requireUnitCode: "optional" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:PerPackageUnitQuantity",
							}),
						),
						requestedPickUp: nullish(
							object({
								date: pipe(
									nullish(date({ inputFormats: ["102", "203"] })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:RequestedDespatchSupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString",
									}),
								),
								period: nullish(
									object({
										startDate: pipe(
											nullish(date({ inputFormats: ["102", "203"] })),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:RequestedDespatchSupplyChainEvent/ram:OccurrenceSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString",
											}),
										),
										endDate: pipe(
											nullish(date({ inputFormats: ["102", "203"] })),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:RequestedDespatchSupplyChainEvent/ram:OccurrenceSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString",
											}),
										),
									}),
								),
							}),
						),
						requestedDelivery: nullish(
							object({
								date: pipe(
									nullish(date({ inputFormats: ["102", "203"] })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:RequestedDeliverySupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString",
									}),
								),
								period: nullish(
									object({
										startDate: pipe(
											nullish(date({ inputFormats: ["102", "203"] })),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:RequestedDeliverySupplyChainEvent/ram:OccurrenceSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString",
											}),
										),
										endDate: pipe(
											nullish(date({ inputFormats: ["102", "203"] })),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:RequestedDeliverySupplyChainEvent/ram:OccurrenceSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString",
											}),
										),
									}),
								),
							}),
						),
					}),
					billing: object({
						vatBreakdown: nullish(
							object({
								categoryCode: pipe(
									code("untdid5305"),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:CategoryCode",
									}),
								),
								rateApplicablePercent: pipe(
									nullish(percentage()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:RateApplicablePercent",
									}),
								),
							}),
						),
						allowances: pipe(
							nullish(
								array(
									object({
										calculationPercent: pipe(
											nullish(percentage()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:CalculationPercent",
											}),
										),
										basisAmount: pipe(
											nullish(unitPriceAmount()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:BasisAmount",
											}),
										),
										actualAmount: pipe(
											unitPriceAmount(),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:ActualAmount",
											}),
										),
										reasonCode: pipe(
											nullish(code("untdid5189")),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:ReasonCode",
											}),
										),
										reason: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:Reason",
											}),
										),
									}),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge",
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
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:CalculationPercent",
											}),
										),
										basisAmount: pipe(
											nullish(unitPriceAmount()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:BasisAmount",
											}),
										),
										actualAmount: pipe(
											unitPriceAmount(),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:ActualAmount",
											}),
										),
										reasonCode: pipe(
											nullish(code("untdid7161")),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:ReasonCode",
											}),
										),
										reason: pipe(
											nullish(text()),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:Reason",
											}),
										),
									}),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge",
							}),
						),
						accounting: nullish(
							object({
								buyerReference: pipe(
									identifier({ requireSchemeId: "never" }),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:ID",
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
	contract: objectAsync({
		seller: object({
			description: pipe(
				nullish(text()),
				metadata({
					xpath:
						"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:Description",
				}),
			),
			contact: pipe(
				nullish(
					asArray(
						object({
							typeCode: pipe(
								nullish(code("untdid3139")),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
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
					vat: pipe(
						nullish(pipe(asArray(object({})), maxLength(2))),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration",
						}),
					),
					local: pipe(
						nullish(
							pipe(
								array(
									object({
										id: pipe(
											identifier({ requireSchemeId: "never" }),
											metadata({
												xpath:
													"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
											}),
										),
									}),
								),
								maxLength(2),
							),
						),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration",
						}),
					),
				}),
			),
		}),
		buyer: object({
			contact: pipe(
				nullish(
					asArray(
						object({
							typeCode: pipe(
								nullish(code("untdid3139")),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
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
					vat: pipe(
						nullish(asArray(object({}))),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedTaxRegistration",
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
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
										}),
									),
								}),
							),
						),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedTaxRegistration",
						}),
					),
				}),
			),
		}),
		buyerRequisitioner: pipe(
			nullish(
				object({
					id: pipe(
						nullish(identifier({ requireSchemeId: "never" })),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:ID",
						}),
					),
					globalId: pipe(
						nullish(array(identifier({ requireSchemeId: "always" }))),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:GlobalID",
						}),
					),
					name: pipe(
						nullish(text()),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:Name",
						}),
					),
					organization: nullish(
						object({
							id: pipe(
								nullish(identifier({ requireSchemeId: "optional" })),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
								}),
							),
							tradingName: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
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
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:DefinedTradeContact/ram:PersonName",
										}),
									),
									departmentName: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
										}),
									),
									typeCode: pipe(
										nullish(code("untdid3139")),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
										}),
									),
									phoneNumber: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
										}),
									),
									emailAddress: pipe(
										nullish(text()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
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
					postalAddress: nullish(
						object({
							postCode: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
								}),
							),
							line1: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:PostalTradeAddress/ram:LineOne",
								}),
							),
							line2: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
								}),
							),
							line3: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:PostalTradeAddress/ram:LineThree",
								}),
							),
							city: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:PostalTradeAddress/ram:CityName",
								}),
							),
							countryCode: pipe(
								code("country"),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:PostalTradeAddress/ram:CountryID",
								}),
							),
							countrySubdivision: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
								}),
							),
						}),
					),
					electronicAddress: pipe(
						nullish(identifier({ requireSchemeId: "always" })),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:URIUniversalCommunication/ram:URIID",
						}),
					),
					taxRegistration: nullish(
						object({
							vat: pipe(
								nullish(
									pipe(
										array(
											object({
												id: pipe(
													identifier({ requireSchemeId: "never" }),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
													}),
												),
											}),
										),
										maxLength(2),
									),
								),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:SpecifiedTaxRegistration",
								}),
							),
							local: pipe(
								nullish(
									pipe(
										array(
											object({
												id: pipe(
													identifier({ requireSchemeId: "never" }),
													metadata({
														xpath:
															"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
													}),
												),
											}),
										),
										maxLength(2),
									),
								),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerRequisitionerTradeParty/ram:SpecifiedTaxRegistration",
								}),
							),
						}),
					),
				}),
			),
		),
		deliveryTerms: nullish(
			object({
				description: pipe(
					nullish(text()),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:Description",
					}),
				),
				location: nullish(
					object({
						id: pipe(
							nullish(identifier({ requireSchemeId: "never" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:RelevantTradeLocation/ram:ID",
							}),
						),
						name: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:RelevantTradeLocation/ram:Name",
							}),
						),
					}),
				),
			}),
		),
		salesOrderReference: nullish(
			object({
				issuerAssignedId: pipe(
					text(),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerOrderReferencedDocument/ram:IssuerAssignedID",
					}),
				),
			}),
		),
		requisitionReference: nullish(
			object({
				issuerAssignedId: pipe(
					text(),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:RequisitionReferencedDocument/ram:IssuerAssignedID",
					}),
				),
			}),
		),
		additionalReferencedDocuments: pipeAsync(
			nullishAsync(
				arrayAsync(
					objectAsync({
						issuerAssignedId: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument/ram:IssuerAssignedID",
							}),
						),
						externalDocumentLocation: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument/ram:URIID",
							}),
						),
						typeCode: pipe(
							code("untdid1001"),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument/ram:TypeCode",
							}),
						),
						name: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument/ram:Name",
							}),
						),
						attachedDocument: pipeAsync(
							nullishAsync(binaryObject()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument/ram:AttachmentBinaryObject",
							}),
						),
						referenceTypeCode: pipe(
							nullish(code("untdid1153")),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument/ram:ReferenceTypeCode",
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
		catalogueReference: nullish(
			object({
				issuerAssignedId: pipe(
					text(),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:CatalogueReferencedDocument/ram:IssuerAssignedID",
					}),
				),
			}),
		),
		projectReference: nullish(
			object({
				id: pipe(
					identifier({ requireSchemeId: "never" }),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SpecifiedProcuringProject/ram:ID",
					}),
				),
				name: pipe(
					text(),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SpecifiedProcuringProject/ram:Name",
					}),
				),
			}),
		),
	}),
	delivery: object({
		recipient: nullish(
			object({
				organization: nullish(
					object({
						id: pipe(
							nullish(identifier({ requireSchemeId: "optional" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
							}),
						),
						tradingName: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
							}),
						),
					}),
				),
				contact: pipe(
					nullish(
						asArray(
							object({
								typeCode: pipe(
									nullish(code("untdid3139")),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode",
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
						vat: pipe(
							nullish(
								pipe(
									array(
										object({
											id: pipe(
												identifier({ requireSchemeId: "never" }),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
												}),
											),
										}),
									),
									maxLength(2),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration",
							}),
						),
						local: pipe(
							nullish(
								pipe(
									array(
										object({
											id: pipe(
												identifier({ requireSchemeId: "never" }),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
												}),
											),
										}),
									),
									maxLength(2),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration",
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
						id: pipe(
							nullish(identifier({ requireSchemeId: "optional" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
							}),
						),
						tradingName: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
							}),
						),
					}),
				),
				contact: pipe(
					nullish(
						asArray(
							object({
								typeCode: pipe(
									nullish(code("untdid3139")),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:TypeCode",
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
							nullish(
								pipe(
									array(
										object({
											id: pipe(
												identifier({ requireSchemeId: "never" }),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
												}),
											),
										}),
									),
									maxLength(2),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedTaxRegistration",
							}),
						),
						local: pipe(
							nullish(
								pipe(
									array(
										object({
											id: pipe(
												identifier({ requireSchemeId: "never" }),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
												}),
											),
										}),
									),
									maxLength(2),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedTaxRegistration",
							}),
						),
					}),
				),
			}),
		),
	}),
	debit: object({
		invoicee: nullish(
			object({
				id: pipe(
					nullish(identifier({ requireSchemeId: "never" })),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:ID",
					}),
				),
				globalId: pipe(
					nullish(array(identifier({ requireSchemeId: "always" }))),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:GlobalID",
					}),
				),
				name: pipe(
					text(),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:Name",
					}),
				),
				organization: nullish(
					object({
						id: pipe(
							nullish(identifier({ requireSchemeId: "optional" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
							}),
						),
						tradingName: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
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
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:PersonName",
									}),
								),
								departmentName: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
									}),
								),
								typeCode: pipe(
									nullish(code("untdid3139")),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
									}),
								),
								phoneNumber: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
									}),
								),
								emailAddress: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
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
				postalAddress: nullish(
					object({
						postCode: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
							}),
						),
						line1: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:LineOne",
							}),
						),
						line2: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
							}),
						),
						line3: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:LineThree",
							}),
						),
						city: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:CityName",
							}),
						),
						countryCode: pipe(
							code("country"),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:CountryID",
							}),
						),
						countrySubdivision: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
							}),
						),
					}),
				),
				electronicAddress: pipe(
					nullish(identifier({ requireSchemeId: "always" })),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:URIUniversalCommunication/ram:URIID",
					}),
				),
				taxRegistration: nullish(
					object({
						vat: pipe(
							nullish(
								pipe(
									array(
										object({
											id: pipe(
												identifier({ requireSchemeId: "never" }),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
												}),
											),
										}),
									),
									maxLength(2),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedTaxRegistration",
							}),
						),
						local: pipe(
							nullish(
								pipe(
									array(
										object({
											id: pipe(
												identifier({ requireSchemeId: "never" }),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
												}),
											),
										}),
									),
									maxLength(2),
								),
							),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedTaxRegistration",
							}),
						),
					}),
				),
			}),
		),
		paymentMeans: nullish(
			object({
				typeCode: pipe(
					nullish(code("untdid4461")),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:TypeCode",
					}),
				),
				information: pipe(
					nullish(text()),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:Information",
					}),
				),
			}),
		),
		allowances: pipe(
			nullish(
				array(
					object({
						calculationPercent: pipe(
							nullish(percentage()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:CalculationPercent",
							}),
						),
						basisAmount: pipe(
							nullish(unitPriceAmount()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:BasisAmount",
							}),
						),
						actualAmount: pipe(
							unitPriceAmount(),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:ActualAmount",
							}),
						),
						reasonCode: pipe(
							nullish(code("untdid5189")),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:ReasonCode",
							}),
						),
						reason: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:Reason",
							}),
						),
						categoryTradeTax: nullish(
							object({
								categoryCode: pipe(
									code("untdid5305"),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:CategoryTradeTax/ram:CategoryCode",
									}),
								),
								rateApplicablePercent: pipe(
									nullish(percentage()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:CategoryTradeTax/ram:RateApplicablePercent",
									}),
								),
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
						calculationPercent: pipe(
							nullish(percentage()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:CalculationPercent",
							}),
						),
						basisAmount: pipe(
							nullish(unitPriceAmount()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:BasisAmount",
							}),
						),
						actualAmount: pipe(
							unitPriceAmount(),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:ActualAmount",
							}),
						),
						reasonCode: pipe(
							nullish(code("untdid7161")),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:ReasonCode",
							}),
						),
						reason: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:Reason",
							}),
						),
						categoryTradeTax: nullish(
							object({
								categoryCode: pipe(
									code("untdid5305"),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:CategoryTradeTax/ram:CategoryCode",
									}),
								),
								rateApplicablePercent: pipe(
									nullish(percentage()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:CategoryTradeTax/ram:RateApplicablePercent",
									}),
								),
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
		paymentTerms: nullish(
			object({
				description: pipe(
					text(),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:Description",
					}),
				),
			}),
		),
	}),
});

export const schema = defineProfileSchema(
	objectAsync({
		exchangedDocument,
		transaction,
	} as {
		exchangedDocument: typeof exchangedDocument;
		transaction: typeof transaction;
	}),
);
