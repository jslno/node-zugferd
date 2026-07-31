import "@node-zugferd/codelist-currency";
import "@node-zugferd/codelist-country";
import "@node-zugferd/codelist-unit";
import "@node-zugferd/codelist-incoterms";
import "@node-zugferd/codelist-untdid-1001";
import "@node-zugferd/codelist-untdid-1225";
import "@node-zugferd/codelist-untdid-1229";
import "@node-zugferd/codelist-untdid-1373";
import "@node-zugferd/codelist-untdid-4053";
import "@node-zugferd/codelist-untdid-4055";
import "@node-zugferd/codelist-untdid-4451";
import { amount, code, metadata, nullish } from "@node-zugferd/data-types";
import { date } from "@node-zugferd/data-types";
import { literal } from "@node-zugferd/data-types";
import { identifier } from "@node-zugferd/data-types";
import { quantity } from "@node-zugferd/data-types";
import { unitPriceAmount } from "@node-zugferd/data-types";
import { array } from "@node-zugferd/data-types";
import { union } from "@node-zugferd/data-types";
import { boolean } from "@node-zugferd/data-types";
import { text } from "@node-zugferd/data-types";
import { object } from "@node-zugferd/data-types";
import { pipe } from "@node-zugferd/data-types";

export const schema = object({
	processControl: nullish(
		object({
			testIndicator: pipe(
				nullish(boolean()),
				metadata({
					xpath:
						"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocumentContext/ram:TestIndicator/udt:Indicator",
				}),
			),
			businessContextInfo: nullish(
				object({
					processType: pipe(
						nullish(text()),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocumentContext/ram:BusinessProcessSpecifiedDocumentContextParameter/ram:ID",
						}),
					),
				}),
			),
			applicationRecommendationInfo: nullish(
				object({
					specificationIdentifier: pipe(
						nullish(identifier({ requireSchemeId: "never" })),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocumentContext/ram:GuidelineSpecifiedDocumentContextParameter/ram:ID",
						}),
					),
				}),
			),
		}),
	),
	exchangedDocument: object({
		orderId: pipe(
			text(),
			metadata({
				id: "/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:ID",
			}),
		),
		name: pipe(
			nullish(text()),
			metadata({
				xpath:
					"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:Name",
			}),
		),
		orderTypeCode: pipe(
			code("untdid1001"),
			metadata({
				xpath:
					"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:TypeCode",
			}),
		),
		statusCode: pipe(
			nullish(code("untdid1373")),
			metadata({
				xpath:
					"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:StatusCode",
			}),
		),
		orderIssueDate: pipe(
			date({ inputFormats: ["102", "203"] }),
			metadata({
				xpath:
					"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:IssueDateTime/udt:DateTimeString",
			}),
		),
		copyIndicator: pipe(
			nullish(boolean()),
			metadata({
				xpath:
					"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:CopyIndicator/udt:Indicator",
			}),
		),
		purposeCode: pipe(
			nullish(code("untdid1225")),
			metadata({
				xpath:
					"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:PurposeCode",
			}),
		),
		requestedResponseCode: pipe(
			nullish(literal("AC")),
			metadata({
				xpath:
					"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:RequestedResponseTypeCode",
			}),
		),
		documentNotes: pipe(
			nullish(
				array(
					object({
						content: pipe(
							text(),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:IncludedNote/ram:Content",
							}),
						),
						subjectCode: pipe(
							nullish(code("untdid4451")),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:ExchangedDocument/ram:IncludedNote/ram:SubjectCode",
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
	}),
	transaction: object({
		line: pipe(
			nullish(
				array(
					object({
						position: object({
							lineId: pipe(
								text(),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:LineID",
								}),
							),
							lineStatusCode: pipe(
								nullish(code("untdid1229")),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:LineStatusCode",
								}),
							),
							includedNotes: pipe(
								nullish(
									array(
										object({
											content: pipe(
												text(),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:IncludedNote/ram:Content",
												}),
											),
											subjectCode: pipe(
												nullish(code("untdid4451")),
												metadata({
													xpath:
														"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:IncludedNote/ram:SubjectCode",
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
								globalId: pipe(
									nullish(identifier({ requireSchemeId: "always" })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:GlobalID",
									}),
								),
								sellerAssignedId: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:SellerAssignedID",
									}),
								),
								buyerAssignedId: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:BuyerAssignedID",
									}),
								),
								name: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:Name",
									}),
								),
							}),
						),
						substitutedItem: nullish(
							object({
								globalId: pipe(
									nullish(array(identifier({ requireSchemeId: "always" }))),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SubstitutedReferencedProduct/ram:GlobalID",
									}),
								),
								sellerAssignedId: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SubstitutedReferencedProduct/ram:SellerAssignedID",
									}),
								),
								buyerAssignedId: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SubstitutedReferencedProduct/ram:BuyerAssignedID",
									}),
								),
								name: pipe(
									nullish(text()),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SubstitutedReferencedProduct/ram:Name",
									}),
								),
							}),
						),
						priceDetails: object({
							associatedOrder: nullish(
								object({
									lineId: pipe(
										text(),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:LineID",
										}),
									),
								}),
							),
							netPrice: object({
								chargeAmount: pipe(
									unitPriceAmount(),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:ChargeAmount",
									}),
								),
								basisQuantity: pipe(
									nullish(quantity({ requireUnitCode: "optional" })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:BasisQuantity",
									}),
								),
							}),
							blanketOrderReference: nullish(
								object({
									lineId: pipe(
										text(),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BlanketOrderReferencedDocument/ram:LineID",
										}),
									),
								}),
							),
						}),
						delivery: object({
							partialDeliveryAllowed: pipe(
								nullish(boolean()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:PartialDeliveryAllowedIndicator/udt:Indicator",
								}),
							),
							requestedQuantity: pipe(
								quantity(),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:RequestedQuantity",
								}),
							),
							agreedQuantity: pipe(
								nullish(quantity()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:AgreedQuantity",
								}),
							),
						}),
						billing: object({
							itemTotals: object({
								lineTotalAmount: pipe(
									amount({ requireCurrency: "never" }),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:LineTotalAmount",
									}),
								),
							}),
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
			buyerReference: pipe(
				nullish(text()),
				metadata({
					xpath:
						"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerReference",
				}),
			),
			seller: object({
				id: pipe(
					nullish(text()),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:ID",
					}),
				),
				globalId: pipe(
					nullish(array(identifier({ requireSchemeId: "always" }))),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:GlobalID",
					}),
				),
				name: pipe(
					text(),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:Name",
					}),
				),
				organization: nullish(
					object({
						id: pipe(
							nullish(identifier({ requireSchemeId: "optional" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
							}),
						),
						tradingName: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
							}),
						),
					}),
				),
				contact: nullish(
					object({
						personName: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:PersonName",
							}),
						),
						departmentName: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
							}),
						),
						phoneNumber: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
							}),
						),
						emailAddress: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
							}),
						),
					}),
				),
				postalAddress: nullish(
					object({
						postCode: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
							}),
						),
						line1: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineOne",
							}),
						),
						line2: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
							}),
						),
						line3: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineThree",
							}),
						),
						city: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CityName",
							}),
						),
						countryCode: pipe(
							code("country"),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CountryID",
							}),
						),
						countrySubdivision: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
							}),
						),
					}),
				),
				electronicAddress: pipe(
					nullish(identifier({ requireSchemeId: "always" })),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:URIUniversalCommunication/ram:URIID",
					}),
				),
				taxRegistration: nullish(
					object({
						vat: nullish(
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
					}),
				),
			}),
			buyer: object({
				id: pipe(
					nullish(identifier({ requireSchemeId: "never" })),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:ID",
					}),
				),
				globalId: pipe(
					nullish(array(identifier({ requireSchemeId: "always" }))),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:GlobalID",
					}),
				),
				name: pipe(
					text(),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:Name",
					}),
				),
				organization: nullish(
					object({
						id: pipe(
							nullish(identifier({ requireSchemeId: "optional" })),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
							}),
						),
						tradingName: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
							}),
						),
					}),
				),
				contact: nullish(
					object({
						personName: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:PersonName",
							}),
						),
						departmentName: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
							}),
						),
						phoneNumber: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
							}),
						),
						emailAddress: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
							}),
						),
					}),
				),
				postalAddress: object({
					postCode: pipe(
						nullish(text()),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
						}),
					),
					line1: pipe(
						nullish(text()),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineOne",
						}),
					),
					line2: pipe(
						nullish(text()),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
						}),
					),
					line3: pipe(
						nullish(text()),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineThree",
						}),
					),
					city: pipe(
						nullish(text()),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CityName",
						}),
					),
					countryCode: pipe(
						code("country"),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CountryID",
						}),
					),
					countrySubdivision: pipe(
						nullish(text()),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
						}),
					),
				}),
				electronicAddress: pipe(
					nullish(identifier({ requireSchemeId: "always" })),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:URIUniversalCommunication/ram:URIID",
					}),
				),
				taxRegistration: nullish(
					object({
						vat: nullish(
							object({
								id: pipe(
									nullish(identifier({ requireSchemeId: "never" })),
									metadata({
										xpath:
											"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
									}),
								),
							}),
						),
					}),
				),
			}),
			deliveryTerms: nullish(
				object({
					deliveryCode: pipe(
						nullish(union([code("untdid4053"), code("incoterms")])),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:DeliveryTypeCode",
						}),
					),
					deliveryMode: pipe(
						nullish(code("untdid4055")),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:FunctionCode",
						}),
					),
				}),
			),
			associatedOrder: nullish(
				object({
					issuerAssignedId: pipe(
						text(),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerOrderReferencedDocument/ram:IssuerAssignedID",
						}),
					),
				}),
			),
			quotationReference: nullish(
				object({
					issuerAssignedId: pipe(
						text(),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:QuotationReferencedDocument/ram:IssuerAssignedID",
						}),
					),
				}),
			),
			contractReference: nullish(
				object({
					issuerAssignedId: pipe(
						text(),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ContractReferencedDocument/ram:IssuerAssignedID",
						}),
					),
				}),
			),
			blanketOrderReference: nullish(
				object({
					issuerAssignedId: pipe(
						text(),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BlanketOrderReferencedDocument/ram:IssuerAssignedID",
						}),
					),
				}),
			),
			previousOrderReference: nullish(
				object({
					issuerAssignedId: pipe(
						text(),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:PreviousOrderReferencedDocument/ram:IssuerAssignedID",
						}),
					),
				}),
			),
			previousOrderChangeReference: nullish(
				object({
					issuerAssignedId: pipe(
						text(),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:PreviousOrderReferencedChangeDocument/ram:IssuerAssignedID",
						}),
					),
				}),
			),
			previousOrderResponseReference: nullish(
				object({
					issuerAssignedId: pipe(
						text(),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:PreviousOrderResponseReferencedDocument/ram:IssuerAssignedID",
						}),
					),
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
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:ID",
						}),
					),
					globalId: pipe(
						nullish(array(identifier({ requireSchemeId: "always" }))),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:GlobalID",
						}),
					),
					name: pipe(
						text(),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:Name",
						}),
					),
					contact: nullish(
						object({
							personName: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:PersonName",
								}),
							),
							departmentName: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
								}),
							),
							phoneNumber: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
								}),
							),
							emailAddress: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
								}),
							),
						}),
					),
					postalAddress: object({
						postCode: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
							}),
						),
						line1: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
							}),
						),
						line2: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
							}),
						),
						line3: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
							}),
						),
						city: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
							}),
						),
						countryCode: pipe(
							code("country"),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
							}),
						),
						countrySubdivision: pipe(
							nullish(text()),
							metadata({
								xpath:
									"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
							}),
						),
					}),
					electronicAddress: pipe(
						nullish(identifier({ requireSchemeId: "always" })),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:URIUniversalCommunication/ram:URIID",
						}),
					),
				}),
			),
			sender: nullish(
				object({
					id: pipe(
						nullish(identifier({ requireSchemeId: "never" })),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:ID",
						}),
					),
					globalId: pipe(
						nullish(array(identifier({ requireSchemeId: "always" }))),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:GlobalID",
						}),
					),
					name: pipe(
						text(),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:Name",
						}),
					),
					contact: nullish(
						object({
							personName: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:PersonName",
								}),
							),
							departmentName: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
								}),
							),
							phoneNumber: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
								}),
							),
							emailAddress: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
								}),
							),
						}),
					),
					postalAddress: nullish(
						object({
							postCode: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
								}),
							),
							line1: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:LineOne",
								}),
							),
							line2: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:LineTwo",
								}),
							),
							line3: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:LineThree",
								}),
							),
							city: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:CityName",
								}),
							),
							countryCode: pipe(
								code("country"),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:CountryID",
								}),
							),
							countrySubdivision: pipe(
								nullish(text()),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
								}),
							),
						}),
					),
					electronicAddress: pipe(
						nullish(identifier({ requireSchemeId: "always" })),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:URIUniversalCommunication/ram:URIID",
						}),
					),
				}),
			),
			requestedDeliveries: pipe(
				nullish(
					array(
						object({
							date: pipe(
								nullish(date({ inputFormats: ["102", "203"] })),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:RequestedDeliverySupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString",
								}),
							),
							period: nullish(
								object({
									startDate: pipe(
										nullish(date({ inputFormats: ["102", "203"] })),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:RequestedDeliverySupplyChainEvent/ram:OccurrenceSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString",
										}),
									),
									endDate: pipe(
										nullish(date({ inputFormats: ["102", "203"] })),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:RequestedDeliverySupplyChainEvent/ram:OccurrenceSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString",
										}),
									),
								}),
							),
						}),
					),
				),
				metadata({
					xpath:
						"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:RequestedDeliverySupplyChainEvent",
				}),
			),
			requestedPickUps: pipe(
				nullish(
					array(
						object({
							date: pipe(
								nullish(date({ inputFormats: ["102", "203"] })),
								metadata({
									xpath:
										"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:RequestedDespatchSupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString",
								}),
							),
							period: nullish(
								object({
									startDate: pipe(
										nullish(date({ inputFormats: ["102", "203"] })),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:RequestedDespatchSupplyChainEvent/ram:OccurrenceSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString",
										}),
									),
									endDate: pipe(
										nullish(date()),
										metadata({
											xpath:
												"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:RequestedDespatchSupplyChainEvent/ram:OccurrenceSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString",
										}),
									),
								}),
							),
						}),
					),
				),
				metadata({
					xpath:
						"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:RequestedDespatchSupplyChainEvent",
				}),
			),
		}),
		debit: object({
			orderCurrency: pipe(
				code("currency"),
				metadata({
					xpath:
						"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:OrderCurrencyCode",
				}),
			),
			documentTotals: object({
				lineTotalAmount: pipe(
					amount({ requireCurrency: "never" }),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:LineTotalAmount",
					}),
				),
				chargeTotalAmount: pipe(
					nullish(amount({ requireCurrency: "never" })),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:ChargeTotalAmount",
					}),
				),
				allowanceTotalAmount: pipe(
					nullish(amount({ requireCurrency: "never" })),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:AllowanceTotalAmount",
					}),
				),
				taxBasisTotalAmount: pipe(
					amount({ requireCurrency: "never" }),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxBasisTotalAmount",
					}),
				),
				taxTotalAmount: pipe(
					nullish(amount({ requireCurrency: "always" })),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount",
					}),
				),
				grandTotalAmount: pipe(
					nullish(amount({ requireCurrency: "never" })),
					metadata({
						xpath:
							"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:GrandTotalAmount",
					}),
				),
			}),
			accounting: nullish(
				object({
					buyerReference: pipe(
						text(),
						metadata({
							xpath:
								"/rsm:SCRDMCCBDACIOMessageStructure/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:ID",
						}),
					),
				}),
			),
		}),
	}),
});
