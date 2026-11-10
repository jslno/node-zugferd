import {
	array,
	date,
	identifier,
	maxLength,
	metadata,
	minLength,
	nullish,
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
			processControl: pipe(
				object({
					businessContextInfo: pipe(
						object({
							processType: pipe(
								text(),
								metadata({
									id: "BT-23",
									xpath:
										"/rsm:CrossIndustryInvoice/rsm:ExchangedDocumentContext/ram:BusinessProcessSpecifiedDocumentContextParameter/ram:ID",
								}),
							),
						}),
						metadata({
							id: "BT-23-00",
						}),
					),
				}),
				metadata({
					id: "BG-2",
				}),
			),
			transaction: pipe(
				object({
					line: pipe(
						array(
							object({
								billing: pipe(
									nullish(
										object({
											vatBreakdown: pipe(
												object({}),
												metadata({
													id: "BG-30",
												}),
											),
											allowances: pipe(
												nullish(pipe(array(object({})), maxLength(1))),
												metadata({
													id: "BG-27",
													xpath:
														'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]',
												}),
											),
											charges: pipe(
												nullish(pipe(array(object({})), maxLength(1))),
												metadata({
													id: "BG-28",
													xpath:
														'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]',
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
					contract: pipe(
						object({
							buyerReference: pipe(
								text(),
								metadata({
									id: "BT-10",
									xpath:
										"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerReference",
								}),
							),
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
										object({
											personName: pipe(
												text(),
												metadata({
													id: "BT-41",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:PersonName",
												}),
											),
											phoneNumber: pipe(
												text(),
												metadata({
													id: ["BT-42", "BT-42-00"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
												}),
											),
											emailAddress: pipe(
												text(),
												metadata({
													id: ["BT-43", "BT-43-00"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
												}),
											),
										}),
										metadata({
											id: "BG-6",
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												text(),
												metadata({
													id: "BT-38",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
												}),
											),
											city: pipe(
												text(),
												metadata({
													id: "BT-37",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CityName",
												}),
											),
										}),
										metadata({
											id: "BG-5",
										}),
									),
								}),
								metadata({
									id: "BG-4",
								}),
							),
							buyer: pipe(
								object({
									postalAddress: pipe(
										object({
											postCode: pipe(
												text(),
												metadata({
													id: "BT-53",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
												}),
											),
											city: pipe(
												text(),
												metadata({
													id: "BT-52",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CityName",
												}),
											),
										}),
										metadata({
											id: "BG-8",
										}),
									),
								}),
								metadata({
									id: "BG-7",
								}),
							),
						}),
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
											postalAddress: pipe(
												nullish(
													object({
														postCode: pipe(
															text(),
															metadata({
																id: "BT-78",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
																description:
																	"The identifier for an addressable group of properties according to the relevant postal service.",
															}),
														),
														city: pipe(
															text(),
															metadata({
																id: "BT-77",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
																description:
																	"The common name of the city, town or village, where the deliver to address is located.",
															}),
														),
													}),
												),
												metadata({
													id: "BG-15",
													description:
														"A group of business terms providing information about the address to which goods and services invoiced were or are delivered.",
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
												nullish(date()),
												metadata({
													id: ["BT-72", "BT-72-00", "BT-72-0"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString",
													description:
														"The date on which the supply of goods or services was made or completed.",
												}),
											),
										}),
									),
									metadata({
										id: "BT-72-000",
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
								payee: pipe(
									nullish(
										object({
											id: pipe(
												nullish(identifier({ requireSchemeId: "optional" })),
												metadata({
													id: "BT-60",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:ID",
												}),
											),
										}),
									),
									metadata({
										id: "BG-10",
										description:
											"A group of business terms providing information about the Payee, i.e. the role that receives the payment.",
									}),
								),
								paymentMeans: pipe(
									object({
										buyerBankDetails: pipe(
											nullish(
												object({
													iban: pipe(
														identifier({ requireSchemeId: "never" }),
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
									}),
									metadata({
										id: "BG-16",
									}),
								),
								vatBreakdown: pipe(
									array(
										object({
											rateApplicablePercent: pipe(
												percentage(),
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
										description:
											"A group of business terms providing information about VAT breakdown by different categories, rates and exemption reasons",
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
