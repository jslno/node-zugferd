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
	union,
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
													}),
												),
												includedNote: pipe(
													nullish(
														object({
															content: pipe(
																nullish(text()),
																metadata({
																	id: "BT-127",
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
												}),
											),
											name: pipe(
												text(),
												metadata({
													id: "BT-153",
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
															}),
														),
														basisQuantity: pipe(
															nullish(
																union([
																	quantity(),
																	object({
																		value: quantity(),
																		unitCode: pipe(
																			nullish(code("unit")),
																			metadata({
																				id: "BT-150-1",
																			}),
																		),
																	}),
																]),
															),
															metadata({
																id: "BT-149-1",
															}),
														),
														discount: pipe(
															nullish(
																object({
																	actualAmount: pipe(
																		nullish(unitPriceAmount()),
																		metadata({
																			id: "BT-147",
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
															}),
														),
														basisQuantity: pipe(
															nullish(
																union([
																	quantity(),
																	object({
																		value: quantity(),
																		unitCode: pipe(
																			nullish(code("unit")),
																			metadata({
																				id: "BT-150",
																			}),
																		),
																	}),
																]),
															),
															metadata({
																id: "BT-149",
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
													object({
														value: quantity(),
														unitCode: pipe(
															nullish(code("unit")),
															metadata({
																id: "BT-130",
															}),
														),
													}),
													metadata({
														id: "BT-129",
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
																}),
															),
															categoryCode: pipe(
																code("untdid5305"),
																metadata({
																	id: "BT-151",
																}),
															),
															rateApplicablePercent: pipe(
																nullish(percentage()),
																metadata({
																	id: "BT-152",
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
																}),
															),
															endDate: pipe(
																nullish(date()),
																metadata({
																	id: ["BT-135", "BT-135-00", "BT-135-0"],
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
																	}),
																),
																reasonCode: pipe(
																	nullish(code("allowance")),
																	metadata({
																		id: "BT-140",
																	}),
																),
																reason: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-139",
																	}),
																),
															}),
														),
													),
													metadata({
														id: "BG-27",
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
																	}),
																),
																reasonCode: pipe(
																	nullish(code("charge")),
																	metadata({
																		id: "BT-145",
																	}),
																),
																reason: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-144",
																	}),
																),
															}),
														),
													),
													metadata({
														id: "BG-28",
													}),
												),
												itemTotals: pipe(
													nullish(
														object({
															lineTotalAmount: pipe(
																amount({ requireCurrency: "never" }),
																metadata({
																	id: "BT-131",
																}),
															),
														}),
													),
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
