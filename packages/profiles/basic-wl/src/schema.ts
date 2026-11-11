import "@node-zugferd/codelist-text";
import "@node-zugferd/codelist-allowance";
import "@node-zugferd/codelist-country";
import "@node-zugferd/codelist-currency";
import "@node-zugferd/codelist-charge";
import "@node-zugferd/codelist-untdid-2005";
import "@node-zugferd/codelist-untdid-5305";
import "@node-zugferd/codelist-vatex";
import "@node-zugferd/codelist-payment";
import {
	amount,
	array,
	code,
	date,
	documentReference,
	identifier,
	metadata,
	minLength,
	nullish,
	object,
	percentage,
	pipe,
	text,
	union,
} from "@node-zugferd/data-types";
import { defineProfileSchema } from "@node-zugferd/utils";

export const schema = defineProfileSchema(
	pipe(
		object({
			exchangedDocument: pipe(
				nullish(
					object({
						invoiceNotes: pipe(
							nullish(
								array(
									object({
										content: pipe(
											text(),
											metadata({
												id: "BT-22",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IncludedNote/ram:Content",
											}),
										),
										subjectCode: pipe(
											nullish(code("text")),
											metadata({
												id: "BT-21",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IncludedNote/ram:SubjectCode",
											}),
										),
									}),
								),
							),
							metadata({
								id: "BG-1",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IncludedNote",
							}),
						),
					}),
				),
				metadata({
					id: "BT-1-00",
				}),
			),
			transaction: pipe(
				nullish(
					object({
						contract: pipe(
							nullish(
								object({
									seller: pipe(
										object({
											id: pipe(
												nullish(union([text(), array(text())])),
												metadata({
													id: "BT-29",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:ID",
												}),
											),
											globalId: pipe(
												nullish(identifier({ requireSchemeId: "optional" })),
												metadata({
													id: ["BT-29-0", "BT-29-1"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:GlobalID",
												}),
											),
											organization: pipe(
												nullish(
													object({
														tradingName: pipe(
															nullish(text()),
															metadata({
																id: "BT-28",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
															}),
														),
													}),
												),
												metadata({
													id: "BT-30-00",
												}),
											),
											postalAddress: pipe(
												object({
													postCode: pipe(
														nullish(text()),
														metadata({
															id: "BT-38",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
														}),
													),
													line1: pipe(
														nullish(text()),
														metadata({
															id: "BT-35",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineOne",
														}),
													),
													line2: pipe(
														nullish(text()),
														metadata({
															id: "BT-36",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
														}),
													),
													line3: pipe(
														nullish(text()),
														metadata({
															id: "BT-162",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineThree",
														}),
													),
													city: pipe(
														nullish(text()),
														metadata({
															id: "BT-37",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CityName",
														}),
													),
													countrySubdivision: pipe(
														nullish(text()),
														metadata({
															id: "BT-39",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
														}),
													),
												}),
												metadata({
													id: "BG-5",
												}),
											),
											electronicAddress: pipe(
												nullish(identifier({ requireSchemeId: "always" })),
												metadata({
													id: ["BT-34", "BT-34-1"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:URIUniversalCommunication/ram:URIID",
												}),
											),
										}),
										metadata({
											id: "BG-4",
										}),
									),
									buyer: pipe(
										object({
											id: pipe(
												nullish(identifier({ requireSchemeId: "never" })),
												metadata({
													id: "BT-46",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:ID",
												}),
											),
											globalId: pipe(
												nullish(identifier()),
												metadata({
													id: ["BT-46-0", "BT-46-1"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:GlobalID",
												}),
											),
											postalAddress: pipe(
												object({
													postCode: pipe(
														nullish(text()),
														metadata({
															id: "BT-53",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
														}),
													),
													line1: pipe(
														nullish(text()),
														metadata({
															id: "BT-50",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineOne",
														}),
													),
													line2: pipe(
														nullish(text()),
														metadata({
															id: "BT-51",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
														}),
													),
													line3: pipe(
														nullish(text()),
														metadata({
															id: "BT-163",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineThree",
														}),
													),
													city: pipe(
														nullish(text()),
														metadata({
															id: "BT-52",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CityName",
														}),
													),
													countryCode: pipe(
														code("country"),
														metadata({
															id: "BT-55",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CountryID",
														}),
													),
													countrySubdivision: pipe(
														nullish(text()),
														metadata({
															id: "BT-54",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
														}),
													),
												}),
												metadata({
													id: "BG-8",
												}),
											),
											electronicAddress: pipe(
												nullish(identifier({ requireSchemeId: "always" })),
												metadata({
													id: ["BT-49", "BT-49-1"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:URIUniversalCommunication/ram:URIID",
												}),
											),
											taxRegistration: nullish(
												object({
													vat: pipe(
														nullish(
															object({
																id: pipe(
																	nullish(
																		identifier({ requireSchemeId: "never" }),
																	),
																	metadata({
																		id: ["BT-48", "BT-48-0"],
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
																	}),
																),
															}),
														),
														metadata({
															id: "BT-48-00",
														}),
													),
												}),
											),
										}),
										metadata({
											id: "BG-7",
										}),
									),
									sellerTaxRepresentative: pipe(
										nullish(
											object({
												name: pipe(
													text(),
													metadata({
														id: "BT-62",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:Name",
													}),
												),
												postalAddress: pipe(
													object({
														postCode: pipe(
															nullish(text()),
															metadata({
																id: "BT-67",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
															}),
														),
														line1: pipe(
															nullish(text()),
															metadata({
																id: "BT-64",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineOne",
															}),
														),
														line2: pipe(
															nullish(text()),
															metadata({
																id: "BT-65",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
															}),
														),
														line3: pipe(
															nullish(text()),
															metadata({
																id: "BT-164",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineThree",
															}),
														),
														city: pipe(
															nullish(text()),
															metadata({
																id: "BT-66",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CityName",
															}),
														),
														countryCode: pipe(
															code("country"),
															metadata({
																id: "BT-69",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CountryID",
															}),
														),
														countrySubdivision: pipe(
															nullish(text()),
															metadata({
																id: "BT-68",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
															}),
														),
													}),
													metadata({
														id: "BG-12",
													}),
												),
												taxRegistration: nullish(
													object({
														vat: pipe(
															nullish(
																object({
																	id: pipe(
																		identifier({ requireSchemeId: "never" }),
																		metadata({
																			id: ["BT-63", "BT-63-0"],
																			xpath:
																				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
																		}),
																	),
																}),
															),
															metadata({
																id: "BT-63-00",
															}),
														),
													}),
												),
											}),
										),
										metadata({
											id: "BG-11",
										}),
									),
									associatedContract: pipe(
										nullish(
											object({
												issuerAssignedId: pipe(
													nullish(documentReference()),
													metadata({
														id: "BT-12",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ContractReferencedDocument/ram:IssuerAssignedID",
													}),
												),
											}),
										),
										metadata({
											id: "BT-12-00",
										}),
									),
								}),
							),
							metadata({
								id: "BT-10-00",
							}),
						),
						delivery: pipe(
							nullish(
								object({
									recipient: pipe(
										nullish(
											object({
												locationId: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-71",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:ID",
													}),
												),
												globalLocationId: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: ["BT-71-0", "BT-71-1"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:GlobalID",
													}),
												),
												name: pipe(
													nullish(text()),
													metadata({
														id: "BT-70",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:Name",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-78",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-75",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-76",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-165",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-77",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-80",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-79",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
																}),
															),
														}),
													),
													metadata({
														id: "BG-15",
													}),
												),
											}),
										),
										metadata({
											id: "BG-13",
										}),
									),
									actualDelivery: pipe(
										nullish(
											object({
												date: pipe(
													date(),
													metadata({
														id: ["BT-72", "BT-72-00", "BT-72-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString",
													}),
												),
											}),
										),
										metadata({
											id: "BT-72-000",
										}),
									),
									despatchAdvice: pipe(
										nullish(
											object({
												issuerAssignedId: pipe(
													nullish(documentReference()),
													metadata({
														id: "BT-16",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:IssuerAssignedID",
													}),
												),
											}),
										),
										metadata({
											id: "BT-16-00",
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
									creditorReferenceId: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											id: "BT-90",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:CreditorReferenceID",
										}),
									),
									paymentReference: pipe(
										nullish(text()),
										metadata({
											id: "BT-83",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PaymentReference",
										}),
									),
									taxCurrencyCode: pipe(
										nullish(code("currency")),
										metadata({
											id: "BT-6",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxCurrencyCode",
										}),
									),
									payee: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-60",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:ID",
													}),
												),
												globalId: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: ["BT-60-0", "BT-60-1"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:GlobalID",
													}),
												),
												name: pipe(
													text(),
													metadata({
														id: "BT-59",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:Name",
													}),
												),
												organization: pipe(
													nullish(
														object({
															id: pipe(
																nullish(
																	identifier({ requireSchemeId: "optional" }),
																),
																metadata({
																	id: "BT-61",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
																}),
															),
														}),
													),
													metadata({
														id: "BT-61-00",
													}),
												),
											}),
										),
										metadata({
											id: "BG-10",
										}),
									),
									paymentMeans: pipe(
										nullish(
											object({
												typeCode: pipe(
													code("payment"),
													metadata({
														id: "BT-81",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:TypeCode",
													}),
												),
												buyerBankDetails: pipe(
													nullish(
														object({
															iban: pipe(
																nullish(
																	identifier({ requireSchemeId: "never" }),
																),
																metadata({
																	id: "BT-91",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayerPartyDebtorFinancialAccount/ram:IBANID",
																}),
															),
														}),
													),
													metadata({
														id: "BT-91-00",
													}),
												),
												creditTransfers: pipe(
													nullish(
														array(
															object({
																iban: pipe(
																	identifier({ requireSchemeId: "never" }),
																	metadata({
																		id: "BT-84",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeePartyCreditorFinancialAccount/ram:IBANID",
																	}),
																),
																proprietaryId: pipe(
																	nullish(
																		identifier({ requireSchemeId: "never" }),
																	),
																	metadata({
																		id: "BT-84-0",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeePartyCreditorFinancialAccount/ram:ProprietaryID",
																	}),
																),
															}),
														),
													),
													metadata({
														id: "BG-17",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayeePartyCreditorFinancialAccount",
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
												calculatedAmount: pipe(
													amount({ requireCurrency: "never" }),
													metadata({
														id: "BT-117",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:CalculatedAmount",
													}),
												),
												typeCode: pipe(
													text(),
													metadata({
														id: "BT-118-0",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:TypeCode",
														description:
															"Coded identification of a VAT category.",
													}),
												),
												exemptionReason: pipe(
													nullish(text()),
													metadata({
														id: "BT-120",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:ExemptionReason",
													}),
												),
												basisAmount: pipe(
													amount({ requireCurrency: "never" }),
													metadata({
														id: "BT-116",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:BasisAmount",
													}),
												),
												categoryCode: pipe(
													code("untdid5305"),
													metadata({
														id: "BT-118",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:CategoryCode",
														description:
															"Coded identification of a VAT category.",
													}),
												),
												exemptionReasonCode: pipe(
													nullish(code("vatex")),
													metadata({
														id: "BT-121",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:ExemptionReasonCode",
													}),
												),
												dueDateTypeCode: pipe(
													nullish(code("untdid2005")),
													metadata({
														id: "BT-8",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:DueDateTypeCode",
													}),
												),
												rateApplicablePercent: pipe(
													nullish(percentage()),
													metadata({
														id: "BT-119",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:RateApplicablePercent",
													}),
												),
											}),
										),
										minLength(1),
										metadata({
											id: "BG-23",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax",
										}),
									),
									invoicingPeriod: pipe(
										nullish(
											object({
												startDate: pipe(
													nullish(date()),
													metadata({
														id: ["BT-73", "BT-73-00", "BT-73-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString",
													}),
												),
												endDate: pipe(
													nullish(date()),
													metadata({
														id: ["BT-74", "BT-74-00", "BT-74-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString",
													}),
												),
											}),
										),
										metadata({
											id: "BG-14",
										}),
									),
									allowances: pipe(
										nullish(
											array(
												object({
													calculationPercent: pipe(
														nullish(percentage()),
														metadata({
															id: "BT-94",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:CalculationPercent',
														}),
													),
													basisAmount: pipe(
														nullish(amount({ requireCurrency: "never" })),
														metadata({
															id: "BT-93",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:BasisAmount',
														}),
													),
													actualAmount: pipe(
														amount({ requireCurrency: "never" }),
														metadata({
															id: "BT-92",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:ActualAmount',
														}),
													),
													reasonCode: pipe(
														nullish(code("allowance")),
														metadata({
															id: "BT-98",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:ReasonCode',
														}),
													),
													reason: pipe(
														nullish(text()),
														metadata({
															id: "BT-97",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:Reason',
														}),
													),
													categoryTradeTax: pipe(
														nullish(
															object({
																categoryCode: pipe(
																	code("untdid5305"),
																	metadata({
																		id: ["BT-95", "BT-95-0"],
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:CategoryTradeTax/ram:CategoryCode',
																	}),
																),
																rateApplicablePercent: pipe(
																	nullish(percentage()),
																	metadata({
																		id: "BT-96",
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:CategoryTradeTax/ram:RateApplicablePercent',
																	}),
																),
															}),
														),
														metadata({
															id: "BT-95-00",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-20",
											xpath:
												'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]',
										}),
									),
									charges: pipe(
										nullish(
											array(
												object({
													calculationPercent: pipe(
														nullish(percentage()),
														metadata({
															id: "BT-101",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:CalculationPercent',
														}),
													),
													basisAmount: pipe(
														nullish(amount({ requireCurrency: "never" })),
														metadata({
															id: "BT-100",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:BasisAmount',
														}),
													),
													actualAmount: pipe(
														amount({ requireCurrency: "never" }),
														metadata({
															id: "BT-99",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:ActualAmount',
														}),
													),
													reasonCode: pipe(
														nullish(code("charge")),
														metadata({
															id: "BT-105",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:ReasonCode',
														}),
													),
													reason: pipe(
														nullish(text()),
														metadata({
															id: "BT-104",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:Reason',
														}),
													),
													categoryTradeTax: pipe(
														nullish(
															object({
																categoryCode: pipe(
																	code("untdid5305"),
																	metadata({
																		id: "BT-102",
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:CategoryTradeTax/ram:CategoryCode',
																	}),
																),
																rateApplicablePercent: pipe(
																	nullish(percentage()),
																	metadata({
																		id: "BT-103",
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:CategoryTradeTax/ram:RateApplicablePercent',
																	}),
																),
															}),
														),
														metadata({
															id: "BT-102-00",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-21",
											xpath:
												'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]',
										}),
									),
									paymentTerms: pipe(
										nullish(
											object({
												description: pipe(
													nullish(text()),
													metadata({
														id: "BT-20",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:Description",
													}),
												),
												dueDate: pipe(
													nullish(date()),
													metadata({
														id: ["BT-9", "BT-9-00", "BT-9-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:DueDateDateTime/udt:DateTimeString",
													}),
												),
												mandateId: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-89",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:DirectDebitMandateID",
													}),
												),
											}),
										),
										metadata({
											id: "BT-20-00",
										}),
									),
									documentTotals: pipe(
										object({
											lineTotalAmount: pipe(
												amount({ requireCurrency: "never" }),
												metadata({
													id: "BT-106",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:LineTotalAmount",
												}),
											),
											chargeTotalAmount: pipe(
												nullish(amount({ requireCurrency: "never" })),
												metadata({
													id: "BT-108",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:ChargeTotalAmount",
												}),
											),
											allowanceTotalAmount: pipe(
												nullish(amount({ requireCurrency: "never" })),
												metadata({
													id: "BT-107",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:AllowanceTotalAmount",
												}),
											),
											taxTotalAmountAccountingCurrency: pipe(
												nullish(amount({ requireCurrency: "always" })),
												metadata({
													id: ["BT-111", "BT-111-0"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount[@currencyID=../../ram:TaxCurrencyCode]",
												}),
											),
											prepaidAmount: pipe(
												nullish(amount({ requireCurrency: "never" })),
												metadata({
													id: "BT-113",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TotalPrepaidAmount",
												}),
											),
										}),
										metadata({
											id: "BG-22",
										}),
									),
									precendingInvoices: pipe(
										nullish(
											array(
												object({
													issuerAssignedId: pipe(
														documentReference(),
														metadata({
															id: "BT-25",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument/ram:IssuerAssignedID",
														}),
													),
													issueDate: pipe(
														nullish(date()),
														metadata({
															id: ["BT-26", "BT-26-00", "BT-26-0"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-3",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument",
										}),
									),
									accounting: pipe(
										nullish(
											object({
												buyerReference: pipe(
													nullish(text()),
													metadata({
														id: "BT-19",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:ID",
													}),
												),
											}),
										),
										metadata({
											id: "BT-19-00",
										}),
									),
								}),
							),
							metadata({
								id: "BG-19",
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
