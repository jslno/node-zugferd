import "@node-zugferd/codelist-unit";
import "@node-zugferd/codelist-allowance";
import "@node-zugferd/codelist-charge";
import "@node-zugferd/codelist-untdid-5305";
import {
	amount,
	array,
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
import { defineProfileSchema } from "@node-zugferd/utils";

export const schema = defineProfileSchema(
	pipe(
		object({
			transaction: pipe(
				nullish(
					object({
						line: pipe(
							array(
								object({
									position: pipe(
										nullish(
											object({
												lineId: pipe(
													identifier({ requireSchemeId: "never" }),
													metadata({
														id: "BT-126",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:LineID",
													}),
												),
												includedNote: pipe(
													nullish(
														object({
															content: pipe(
																nullish(text()),
																metadata({
																	id: "BT-127",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:IncludedNote/ram:Content",
																}),
															),
														}),
													),
													metadata({
														id: "BT-127-00",
													}),
												),
											}),
										),
										metadata({
											id: "BT-126-00",
										}),
									),
									item: pipe(
										object({
											globalId: pipe(
												nullish(identifier({ requireSchemeId: "always" })),
												metadata({
													id: ["BT-157", "BT-157-1"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:GlobalID",
												}),
											),
											name: pipe(
												text(),
												metadata({
													id: "BT-153",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:Name",
												}),
											),
										}),
										metadata({
											id: "BG-31",
										}),
									),
									priceDetails: pipe(
										object({
											grossPrice: pipe(
												nullish(
													object({
														chargeAmount: pipe(
															nullish(unitPriceAmount()),
															metadata({
																id: "BT-148",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:ChargeAmount",
															}),
														),
														basisQuantity: pipe(
															nullish(
																quantity({ requireUnitCode: "optional" }),
															),
															metadata({
																id: "BT-149-1",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:BasisQuantity",
															}),
														),
														discount: pipe(
															nullish(
																object({
																	actualAmount: pipe(
																		nullish(unitPriceAmount()),
																		metadata({
																			id: "BT-147",
																			xpath:
																				'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:ActualAmount',
																		}),
																	),
																}),
															),
															metadata({
																id: "BT-147-00",
															}),
														),
													}),
												),
												metadata({
													id: "BT-148-00",
												}),
											),
											netPrice: pipe(
												nullish(
													object({
														chargeAmount: pipe(
															unitPriceAmount(),
															metadata({
																id: "BT-146",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:ChargeAmount",
															}),
														),
														basisQuantity: pipe(
															nullish(
																quantity({ requireUnitCode: "optional" }),
															),
															metadata({
																id: "BT-149",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:BasisQuantity",
															}),
														),
													}),
												),
												metadata({
													id: "BT-146-00",
												}),
											),
										}),
										metadata({
											id: "BG-29",
										}),
									),
									delivery: pipe(
										nullish(
											object({
												billedQuantity: pipe(
													quantity({ requireUnitCode: "always" }),
													metadata({
														id: ["BT-129", "BT-130"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:BilledQuantity",
													}),
												),
											}),
										),
										metadata({
											id: "BT-129-00",
										}),
									),
									billing: pipe(
										nullish(
											object({
												vatBreakdown: pipe(
													nullish(
														object({
															typeCode: pipe(
																text(),
																metadata({
																	id: "BT-151-0",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:TypeCode",
																}),
															),
															categoryCode: pipe(
																code("untdid5305"),
																metadata({
																	id: "BT-151",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:CategoryCode",
																}),
															),
															rateApplicablePercent: pipe(
																nullish(percentage()),
																metadata({
																	id: "BT-152",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:RateApplicablePercent",
																}),
															),
														}),
													),
													metadata({
														id: "BG-30",
													}),
												),
												invoicePeriod: pipe(
													nullish(
														object({
															startDate: pipe(
																nullish(date()),
																metadata({
																	id: ["BT-134", "BT-134-00", "BT-134-0"],
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:BillingSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString",
																}),
															),
															endDate: pipe(
																nullish(date()),
																metadata({
																	id: ["BT-135", "BT-135-00", "BT-135-0"],
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:BillingSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString",
																}),
															),
														}),
													),
													metadata({
														id: "BG-26",
													}),
												),
												allowances: pipe(
													nullish(
														array(
															object({
																actualAmount: pipe(
																	amount({ requireCurrency: "never" }),
																	metadata({
																		id: "BT-136",
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:ActualAmount',
																	}),
																),
																reasonCode: pipe(
																	nullish(code("allowance")),
																	metadata({
																		id: "BT-140",
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:ReasonCode',
																	}),
																),
																reason: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-139",
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:Reason',
																	}),
																),
															}),
														),
													),
													metadata({
														id: "BG-27",
														xpath:
															'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]',
													}),
												),
												charges: pipe(
													nullish(
														array(
															object({
																actualAmount: pipe(
																	amount({ requireCurrency: "never" }),
																	metadata({
																		id: "BT-141",
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:ActualAmount',
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
																reason: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-144",
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:Reason',
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
												itemTotals: pipe(
													object({
														lineTotalAmount: pipe(
															amount({ requireCurrency: "never" }),
															metadata({
																id: "BT-131",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:LineTotalAmount",
															}),
														),
													}),
													metadata({
														id: "BT-131-00",
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
