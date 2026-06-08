import "@node-zugferd/codelist-currency";
import "@node-zugferd/codelist-country";
import "@node-zugferd/codelist-vatex";
import "@node-zugferd/codelist-charge";
import "@node-zugferd/codelist-allowance";
import "@node-zugferd/codelist-unit";
import "@node-zugferd/codelist-text";
import "@node-zugferd/codelist-untdid-2005";
import "@node-zugferd/codelist-untdid-1001";
import "@node-zugferd/codelist-characteristic";
import "@node-zugferd/codelist-language";
import "@node-zugferd/codelist-line-status";
import "@node-zugferd/codelist-incoterms";
import "@node-zugferd/codelist-untdid-3035";
import "@node-zugferd/codelist-untdid-3139";
import "@node-zugferd/codelist-untdid-4053";
import "@node-zugferd/codelist-untdid-5305";
import "@node-zugferd/codelist-untdid-1153";
import {
	amount,
	array,
	arrayAsync,
	asArray,
	binaryObject,
	boolean,
	code,
	date,
	documentReference,
	identifier,
	literal,
	metadata,
	minLength,
	nullish,
	nullishAsync,
	object,
	objectAsync,
	percentage,
	pipe,
	pipeAsync,
	quantity,
	text,
	union,
	unitPriceAmount,
} from "@node-zugferd/data-types";
import { defineProfileSchema } from "@node-zugferd/utils";

// TODO: Cardinality upgrades from en16931 (x..1 -> x..n)
// BT-128-00
// BT-29-0
// BT-46-0
// BT-71-0
// BT-60-0
// BG-16

const processControl = pipe(
	nullish(
		object({
			testIndicator: pipe(
				nullish(boolean()),
				metadata({
					id: ["BT-X-1", "BT-X-1-00"],
				}),
			),
		}),
	),
	metadata({
		id: "BG-2",
		description:
			"A group of business terms providing information on the business process and rules applicable to the Invoice document.",
	}),
);

const exchangedDocument = pipe(
	nullish(
		object({
			name: pipe(
				nullish(text()),
				metadata({
					id: "BT-X-2",
				}),
			),
			copyIndicator: pipe(
				nullish(boolean()),
				metadata({
					id: ["BT-X-3", "BT-X-3-00"],
				}),
			),
			language: pipe(
				nullish(code("language")),
				metadata({
					id: "BT-X-4",
				}),
			),
			invoiceNotes: pipe(
				nullish(
					array(
						object({
							contentCode: pipe(
								nullish(text()),
								metadata({
									id: "BT-X-5",
								}),
							),
						}),
					),
				),
				metadata({
					id: "BG-1",
				}),
			),
			contractualDueDate: pipe(
				nullish(date()),
				metadata({
					id: ["BT-X-6", "BT-X-6-000", "BT-X-6-00", "BT-X-6-0"],
				}),
			),
		}),
	),
	metadata({
		id: "BT-1-00",
	}),
);

const transaction = pipeAsync(
	nullishAsync(
		objectAsync({
			line: pipeAsync(
				arrayAsync(
					objectAsync({
						position: pipe(
							nullish(
								object({
									parentLineId: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											id: "BT-X-304",
										}),
									),
									lineStatusCode: pipe(
										nullish(code("lineStatus")),
										metadata({
											id: "BT-X-7",
										}),
									),
									lineStatusReasonCode: pipe(
										nullish(
											union([
												literal("DETAIL"),
												literal("GROUP"),
												literal("INFORMATION"),
											]),
										),
										metadata({
											id: "BT-X-8",
										}),
									),
									//
									//
									//
									includedNote: pipe(
										nullish(
											asArray(
												object({
													contentCode: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-9",
														}),
													),
													subjectCode: pipe(
														nullish(code("text")),
														metadata({
															id: ["BT-X-10", "EXT-FR-FE-183"],
														}),
													),
												}),
											),
										),
										metadata({
											id: "BT-127-00",
										}),
									),
									//
									//
									//
								}),
							),
							metadata({
								id: "BT-126-00",
							}),
						),
						item: pipeAsync(
							objectAsync({
								id: pipe(
									nullish(identifier({ requireSchemeId: "never" })),
									metadata({
										id: "BT-X-305",
									}),
								),
								industryAssignedId: pipe(
									nullish(identifier({ requireSchemeId: "never" })),
									metadata({
										id: "BT-X-532",
									}),
								),
								modelId: pipe(
									nullish(identifier({ requireSchemeId: "never" })),
									metadata({
										id: "BT-X-533",
									}),
								),
								//
								//
								//
								batchId: pipe(
									nullish(asArray(text())),
									metadata({
										id: "BT-X-534",
									}),
								),
								//
								//
								//
								brandName: pipe(
									nullish(text()),
									metadata({
										id: "BT-X-535",
									}),
								),
								modelName: pipe(
									nullish(text()),
									metadata({
										id: "BT-X-536",
									}),
								),
								attributes: pipe(
									nullish(
										array(
											object({
												typeCode: pipe(
													nullish(code("characteristic")),
													metadata({
														id: "BT-X-11",
													}),
												),
												valueMeasure: pipe(
													nullish(
														union([
															quantity(),
															object({
																value: quantity(),
																unitCode: pipe(
																	nullish(code("unit")),
																	metadata({
																		id: "BT-X-12-0",
																	}),
																),
															}),
														]),
													),
													metadata({
														id: "BT-X-12",
													}),
												),
											}),
										),
									),
									metadata({
										id: "BG-32",
									}),
								),
								classification: pipe(
									nullish(
										object({
											className: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-13",
												}),
											),
										}),
									),
									metadata({
										id: "BT-158-00",
									}),
								),
								instances: pipe(
									nullish(
										array(
											object({
												batchId: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-X-306",
													}),
												),
												supplierAssignedSerialId: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-X-307",
													}),
												),
											}),
										),
									),
									metadata({
										id: "BG-X-84",
									}),
								),
								includedReferencedProducts: pipe(
									nullish(
										array(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-X-308",
													}),
												),
												//
												//
												//
												globalId: pipe(
													nullish(
														asArray(identifier({ requireSchemeId: "always" })),
													),
													metadata({
														id: ["BT-X-15", "BT-X-15-1"],
													}),
												),
												//
												//
												//
												sellerAssignedId: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-X-16",
													}),
												),
												buyerAssignedId: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-X-17",
													}),
												),
												industryAssignedId: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-X-309",
													}),
												),
												name: pipe(
													text(),
													metadata({
														id: "BT-X-18",
													}),
												),
												description: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-19",
													}),
												),
												unitQuantity: pipe(
													nullish(
														union([
															quantity(),
															object({
																value: quantity(),
																unitCode: pipe(
																	nullish(code("unit")),
																	metadata({
																		id: "BT-X-20-1",
																	}),
																),
															}),
														]),
													),
												),
											}),
										),
									),
									metadata({
										id: "BG-X-1",
									}),
								),
							}),
							metadata({
								id: "BG-31",
							}),
						),
						priceDetails: pipeAsync(
							objectAsync({
								deliveryTerms: pipe(
									nullish(
										object({
											typeCode: pipe(
												nullish(union([code("untdid4053"), code("incoterms")])),
												metadata({
													id: "BT-X-562",
												}),
											),
											location: pipe(
												nullish(
													object({
														countryCode: pipe(
															code("country"),
															metadata({
																id: "BT-X-565",
															}),
														),
														name: pipe(
															text(),
															metadata({
																id: "BT-X-566",
															}),
														),
													}),
												),
												metadata({
													id: "BG-X-89",
												}),
											),
										}),
									),
									metadata({
										id: "BG-X-87",
									}),
								),
								sellerOrderReferencedDocument: pipe(
									nullish(
										object({
											issuerAssignedId: pipe(
												documentReference(),
												metadata({
													id: ["BT-X-537", "EXT-FR-FE-144"],
												}),
											),
											lineId: pipe(
												nullish(documentReference()),
												metadata({
													id: ["BT-X-538", "EXT-FR-FE-145"],
												}),
											),
											date: pipe(
												nullish(date()),
												metadata({
													id: ["BT-X-539", "BT-X-539-00", "BT-X-539-0"],
												}),
											),
										}),
									),
									metadata({
										id: ["BG-X-81", "EXT-FR-FE-BG-09"],
									}),
								),
								associatedOrder: pipe(
									nullish(
										object({
											issuerAssignedId: pipe(
												nullish(documentReference()),
												metadata({
													id: ["BT-X-21", "EXT-FR-FE-135"],
												}),
											),
											date: pipe(
												nullish(date()),
												metadata({
													id: ["BT-X-22", "BT-X-22-00", "BT-X-22-0"],
												}),
											),
										}),
									),
									metadata({
										id: "BT-132-00",
									}),
								),
								quotationReferencedDocument: pipe(
									nullish(
										object({
											issuerAssignedId: pipe(
												documentReference(),
												metadata({
													id: "BT-X-310",
												}),
											),
											lineId: pipe(
												nullish(documentReference()),
												metadata({
													id: "BT-X-311",
												}),
											),
											date: pipe(
												nullish(date()),
												metadata({
													id: ["BT-X-312", "BT-X-312-00", "BT-X-312-0"],
												}),
											),
										}),
									),
									metadata({
										id: "BG-X-47",
									}),
								),
								contractReferencedDocument: pipe(
									nullish(
										object({
											issuerAssignedId: pipe(
												nullish(documentReference()),
												metadata({
													id: "BT-X-24",
												}),
											),
											lineId: pipe(
												nullish(documentReference()),
												metadata({
													id: "BT-X-25",
												}),
											),
											date: pipe(
												nullish(date()),
												metadata({
													id: ["BT-X-26", "BT-X-26-00", "BT-X-26-0"],
												}),
											),
										}),
									),
									metadata({
										id: "BG-X-2",
									}),
								),
								additionalReferencedDocuments: pipeAsync(
									nullishAsync(
										arrayAsync(
											objectAsync({
												issuerAssignedId: pipe(
													documentReference(),
													metadata({
														id: "BT-X-27",
													}),
												),
												uri: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-28",
													}),
												),
												lineId: pipe(
													nullish(documentReference()),
													metadata({
														id: "BT-X-29",
													}),
												),
												typeCode: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-30",
													}),
												),
												name: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-299",
													}),
												),
												attachedDocument: pipeAsync(
													nullishAsync(binaryObject()),
													metadata({
														id: ["BT-X-31", "BT-X-31-1", "BT-X-31-2"],
													}),
												),
												referenceTypeCode: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-32",
													}),
												),
												date: pipe(
													nullish(date()),
													metadata({
														id: ["BT-X-33", "BT-X-33-00", "BT-X-33-0"],
													}),
												),
											}),
										),
									),
									metadata({
										id: "BG-X-3",
									}),
								),
								grossPrice: pipe(
									nullish(
										object({
											//
											//
											//
											discount: pipe(
												nullish(
													asArray(
														object({
															calculationPercent: pipe(
																nullish(percentage()),
																metadata({
																	id: "BT-X-34",
																}),
															),
															basisAmount: pipe(
																nullish(unitPriceAmount()),
																metadata({
																	id: "BT-X-35",
																}),
															),
															reasonCode: pipe(
																nullish(code("allowance")),
																metadata({
																	id: "BT-X-313",
																}),
															),
															reason: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-36",
																}),
															),
														}),
													),
												),
												metadata({
													id: "BT-147-00",
												}),
											),
											//
											//
											//
											surcharges: pipe(
												nullish(
													array(
														object({
															calculationPercent: pipe(
																nullish(percentage()),
																metadata({
																	id: "BT-X-300",
																}),
															),
															basisAmount: pipe(
																nullish(unitPriceAmount()),
																metadata({
																	id: "BT-X-301",
																}),
															),
															actualAmount: pipe(
																nullish(unitPriceAmount()),
																metadata({
																	id: "BT-X-302",
																}),
															),
															reasonCode: pipe(
																nullish(code("charge")),
																metadata({
																	id: "BT-X-314",
																}),
															),
															reason: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-303",
																}),
															),
														}),
													),
												),
												metadata({
													id: "BT-X-302-00",
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
											includedTax: pipe(
												nullish(
													object({
														calculatedAmount: pipe(
															amount({ requireCurrency: "never" }),
															metadata({
																id: "BT-X-37",
															}),
														),
														// type code fixed "VAT"
														exemptionReason: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-39",
															}),
														),
														categoryCode: pipe(
															code("untdid5305"),
															metadata({
																id: "BT-X-40",
															}),
														),
														exemptionReasonCode: pipe(
															nullish(code("vatex")),
															metadata({
																id: "BT-X-41",
															}),
														),
														rateApplicablePercent: pipe(
															percentage(),
															metadata({
																id: "BT-X-42",
															}),
														),
													}),
												),
												metadata({
													id: "BG-X-4",
												}),
											),
										}),
									),
									metadata({
										id: "BT-146-00",
									}),
								),
								itemSeller: pipe(
									nullish(
										object({
											//
											//
											//
											id: pipe(
												nullish(
													asArray(identifier({ requireSchemeId: "never" })),
												),
												metadata({
													id: "BT-X-567",
												}),
											),
											globalId: pipe(
												nullish(
													asArray(identifier({ requireSchemeId: "optional" })),
												),
												metadata({
													id: ["BT-X-568", "BT-X-568-0"],
												}),
											),
											//
											//
											//
											name: pipe(
												text(),
												metadata({
													id: "BT-X-569",
												}),
											),
											roleCode: pipe(
												nullish(code("untdid3035")),
												metadata({
													id: "BT-X-570",
												}),
											),
											description: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-571",
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
																id: ["BT-X-572", "BT-X-572-0"],
															}),
														),
														tradingName: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-573",
															}),
														),
													}),
												),
												metadata({
													id: "BT-X-572-00",
												}),
											),
											//
											//
											//
											contact: pipe(
												nullish(
													asArray(
														object({
															personName: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-574",
																}),
															),
															departmentName: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-574-1",
																}),
															),
															typeCode: pipe(
																nullish(code("untdid3139")),
																metadata({
																	id: "BT-X-575",
																}),
															),
															phoneNumber: pipe(
																nullish(text()),
																metadata({
																	id: ["BT-X-576", "BT-X-576-00"],
																}),
															),
															faxNumber: pipe(
																nullish(text()),
																metadata({
																	id: ["BT-X-577", "BT-X-577-00"],
																}),
															),
															emailAddress: pipe(
																nullish(text()),
																metadata({
																	id: ["BT-X-578", "BT-X-578-00"],
																}),
															),
														}),
													),
												),
												metadata({
													id: "BG-X-91",
												}),
											),
											//
											//
											//
											postalAddress: pipe(
												object({
													postCode: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-579",
														}),
													),
													line1: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-580",
														}),
													),
													line2: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-581",
														}),
													),
													line3: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-582",
														}),
													),
													city: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-583",
														}),
													),
													countryCode: pipe(
														code("country"),
														metadata({
															id: "BT-X-584",
														}),
													),
													countrySubdivison: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-585",
														}),
													),
												}),
												metadata({
													id: "BG-X-92",
												}),
											),
											electronicAddress: pipe(
												nullish(identifier({ requireSchemeId: "always" })),
												metadata({
													id: "BT-X-586",
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
																		id: ["BT-X-587", "BT-X-587-0"],
																	}),
																),
															}),
														),
														metadata({
															id: "BT-X-587-00",
														}),
													),
													local: pipe(
														nullish(
															object({
																id: pipe(
																	nullish(
																		identifier({ requireSchemeId: "never" }),
																	),
																	metadata({
																		id: ["BT-X-588", "BT-X-588-0"],
																	}),
																),
															}),
														),
														metadata({
															id: "BT-X-588-00",
														}),
													),
												}),
											),
										}),
									),
									metadata({
										id: "BG-X-90",
									}),
								),
								customerOrderReferencedDocument: pipe(
									nullish(
										object({
											issuerAssignedId: pipe(
												documentReference(),
												metadata({
													id: "BT-X-43",
												}),
											),
											lineId: pipe(
												nullish(documentReference()),
												metadata({
													id: "BT-X-44",
												}),
											),
											date: pipe(
												nullish(date()),
												metadata({
													id: ["BT-X-45", "BT-X-45-00", "BT-X-45-0"],
												}),
											),
										}),
									),
									metadata({
										id: "BG-X-5",
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
									chargeFreeQuantity: pipe(
										nullish(
											object({
												value: quantity(),
												unitCode: pipe(
													code("unit"),
													metadata({
														id: "BT-X-46-0",
													}),
												),
											}),
										),
										metadata({
											id: "BT-X-46",
										}),
									),
									packageQuantity: pipe(
										nullish(
											object({
												value: quantity(),
												unitCode: pipe(
													code("unit"),
													metadata({
														id: "BT-X-47-0",
													}),
												),
											}),
										),
										metadata({
											id: "BT-X-47",
										}),
									),
									perPackageUnitQuantity: pipe(
										nullish(
											object({
												value: quantity(),
												unitCode: pipe(
													code("unit"),
													metadata({
														id: "BT-X-561-0",
													}),
												),
											}),
										),
										metadata({
											id: "BT-X-561",
										}),
									),
									recipient: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-X-48",
													}),
												),
												//
												//
												//
												globalId: pipe(
													nullish(
														asArray(
															identifier({ requireSchemeId: "optional" }),
														),
													),
													metadata({
														id: [
															"BT-X-49",
															"BT-X-49-0",
															"EXT-FR-FE-146",
															"EXT-FR-FE-148",
														],
													}),
												),
												//
												//
												//
												name: pipe(
													text(),
													metadata({
														id: ["BT-X-50", "EXT-FR-FE-149"],
													}),
												),
												roleCode: pipe(
													nullish(code("untdid3035")),
													metadata({
														id: "BT-X-541",
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
																	id: ["BT-X-51", "BT-X-51-0"],
																}),
															),
															tradingName: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-52",
																}),
															),
														}),
													),
													metadata({
														id: "BT-X-51-00",
													}),
												),
												//
												//
												//
												contact: pipe(
													nullish(
														asArray(
															object({
																personName: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-54",
																	}),
																),
																departmentName: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-54-1",
																	}),
																),
																typeCode: pipe(
																	nullish(code("untdid3139")),
																	metadata({
																		id: "BT-X-315",
																	}),
																),
																phoneNumber: pipe(
																	nullish(text()),
																	metadata({
																		id: ["BT-X-55", "BT-X-55-00"],
																	}),
																),
																faxNumber: pipe(
																	nullish(text()),
																	metadata({
																		id: ["BT-X-56", "BT-X-56-00"],
																	}),
																),
																emailAddress: pipe(
																	nullish(text()),
																	metadata({
																		id: ["BT-X-57", "BT-X-57-00"],
																	}),
																),
															}),
														),
													),
													metadata({
														id: "BG-X-8",
													}),
												),
												//
												//
												//
												postalAddress: pipe(
													object({
														postCode: pipe(
															nullish(text()),
															metadata({
																id: ["BT-X-58", "EXT-FR-FE-155"],
															}),
														),
														line1: pipe(
															nullish(text()),
															metadata({
																id: ["BT-X-59", "EXT-FR-FE-151"],
															}),
														),
														line2: pipe(
															nullish(text()),
															metadata({
																id: ["BT-X-60", "EXT-FR-FE-152"],
															}),
														),
														line3: pipe(
															nullish(text()),
															metadata({
																id: ["BT-X-61", "EXT-FR-FE-153"],
															}),
														),
														city: pipe(
															nullish(text()),
															metadata({
																id: ["BT-X-62", "EXT-FR-FE-154"],
															}),
														),
														countryCode: pipe(
															code("country"),
															metadata({
																id: ["BT-X-63", "EXT-FR-FE-157"],
															}),
														),
														countrySubdivision: pipe(
															nullish(text()),
															metadata({
																id: ["BT-X-64", "EXT-FR-FE-156"],
															}),
														),
													}),
													metadata({
														id: ["BG-X-9", "EXT-FR-FE-150"],
													}),
												),
												electronicAddress: pipe(
													nullish(identifier({ requireSchemeId: "always" })),
													metadata({
														id: ["BT-X-56", "BT-X-56-00", "BT-X-56-0"],
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
																			id: ["BT-X-66", "BT-X-66-0"],
																		}),
																	),
																}),
															),
															metadata({
																id: "BT-X-66-00",
															}),
														),
													}),
												),
											}),
										),
										metadata({
											id: ["BG-X-7", "EXT-FR-FE-BG-10"],
										}),
									),
									deviatingFinalRecipient: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-X-67",
													}),
												),
												//
												//
												//
												globalId: pipe(
													nullish(
														asArray(
															identifier({ requireSchemeId: "optional" }),
														),
													),
													metadata({
														id: ["BT-X-68", "BT-X-68-0"],
													}),
												),
												//
												//
												//
												name: pipe(
													text(),
													metadata({
														id: "BT-X-69",
													}),
												),
												roleCode: pipe(
													nullish(code("untdid3035")),
													metadata({
														id: "BT-X-542",
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
																	id: "BT-X-70",
																}),
															),
															tradingName: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-71",
																}),
															),
														}),
													),
													metadata({
														id: "BT-X-70-00",
													}),
												),
												//
												//
												//
												contact: pipe(
													nullish(
														asArray(
															object({
																personName: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-72",
																	}),
																),
																departmentName: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-72-1",
																	}),
																),
																typeCode: pipe(
																	nullish(code("untdid3139")),
																	metadata({
																		id: "BT-X-316",
																	}),
																),
																phoneNumber: pipe(
																	nullish(text()),
																	metadata({
																		id: ["BT-X-73", "BT-X-73-00"],
																	}),
																),
																faxNumber: pipe(
																	nullish(text()),
																	metadata({
																		id: ["BT-X-74", "BT-X-74-00"],
																	}),
																),
																emailAddress: pipe(
																	nullish(text()),
																	metadata({
																		id: ["BT-X-75", "BT-X-75-00"],
																	}),
																),
															}),
														),
													),
													metadata({
														id: "BG-X-11",
													}),
												),
												//
												//
												//
												postalAddress: pipe(
													object({
														postCode: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-76",
															}),
														),
														line1: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-77",
															}),
														),
														line2: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-78",
															}),
														),
														line3: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-79",
															}),
														),
														city: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-80",
															}),
														),
														countryCode: pipe(
															code("country"),
															metadata({
																id: "BT-X-81",
															}),
														),
														countrySubdivision: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-82",
															}),
														),
													}),
													metadata({
														id: "BG-X-12",
													}),
												),
												electronicAddress: pipe(
													nullish(identifier({ requireSchemeId: "always" })),
													metadata({
														id: ["BT-X-83", "BT-X-83-00", "BT-X-83-0"],
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
																			id: ["BT-X-84", "BT-X-84-0"],
																		}),
																	),
																}),
															),
															metadata({
																id: "BT-X-84-00",
															}),
														),
													}),
												),
											}),
										),
										metadata({
											id: "BG-X-10",
										}),
									),
									actualDelivery: pipe(
										nullish(
											object({
												deliveryTime: pipe(
													nullish(date()),
													metadata({
														id: [
															"BT-X-85",
															"BT-X-85-00",
															"BT-X-85-0",
															"EXT-FR-FE-158",
															"EXT-FR-FE-158-0",
															"EXT-FR-FE-158-1",
														],
													}),
												),
											}),
										),
										metadata({
											id: ["BT-X-85-00", "EXT-FR-FE-BG-11"],
										}),
									),
									despatchAdviceReferencedDocument: pipe(
										nullish(
											object({
												issuerAssignedId: pipe(
													documentReference(),
													metadata({
														id: ["BT-X-86", "EXT-FR-FE-142"],
													}),
												),
												lineId: pipe(
													nullish(documentReference()),
													metadata({
														id: ["BT-X-87", "EXT-FR-FE-143"],
													}),
												),
												date: pipe(
													nullish(date()),
													metadata({
														id: ["BT-X-88", "BT-X-88-00", "BT-X-88-0"],
													}),
												),
											}),
										),
										metadata({
											id: ["BG-X-13", "EXT-FR-FE-BG-08"],
										}),
									),
									receivingAdviceReferencedDocument: pipe(
										nullish(
											object({
												issuerAssignedId: pipe(
													documentReference(),
													metadata({
														id: ["BT-X-89", "EXT-FR-FE-140"],
													}),
												),
												lineId: pipe(
													nullish(documentReference()),
													metadata({
														id: ["BT-X-90", "EXT-FR-FE-141"],
													}),
												),
												date: pipe(
													nullish(date()),
													metadata({
														id: ["BT-X-91", "BT-X-91-00", "BT-X-91-0"],
													}),
												),
											}),
										),
										metadata({
											id: ["BG-X-82", "EXT-FR-FE-BG-07"],
										}),
									),
									deliveryNoteReferencedDocument: pipe(
										nullish(
											object({
												issuerAssignedId: pipe(
													documentReference(),
													metadata({
														id: "BT-X-92",
													}),
												),
												lineId: pipe(
													nullish(documentReference()),
													metadata({
														id: "BT-X-93",
													}),
												),
												date: pipe(
													nullish(date()),
													metadata({
														id: ["BT-X-94", "BT-X-94-00", "BT-X-94-0"],
													}),
												),
											}),
										),
										metadata({
											id: "BG-X-83",
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
											asArray(
												object({
													calculatedAmount: pipe(
														nullish(amount({ requireCurrency: "never" })),
														metadata({
															id: "BT-X-95",
														}),
													),
													exemptionReason: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-96",
														}),
													),
													exemptionReasonCode: pipe(
														nullish(code("vatex")),
														metadata({
															id: "BT-X-97",
														}),
													),
													dueDateTypeCode: pipe(
														nullish(code("untdid2005")),
														metadata({
															id: "BT-X-589",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-30",
										}),
									),
									itemTotals: pipe(
										nullish(
											object({
												chargeTotalAmount: pipe(
													nullish(amount({ requireCurrency: "never" })),
													metadata({
														id: "BT-X-327",
													}),
												),
												allowanceTotalAmount: pipe(
													nullish(amount({ requireCurrency: "never" })),
													metadata({
														id: "BT-X-328",
													}),
												),
												taxTotalAmount: pipe(
													nullish(amount({ requireCurrency: "optional" })),
													metadata({
														id: ["BT-X-329", "BT-X-329-0"],
													}),
												),
												taxTotalAmountInAccountingCurrency: pipe(
													nullish(amount({ requireCurrency: "optional" })),
													metadata({
														id: ["BT-X-590", "BT-X-590-0"],
													}),
												),
												grandTotalAmount: pipe(
													nullish(amount({ requireCurrency: "never" })),
													metadata({
														id: "BT-X-330",
													}),
												),
												totalAllowanceChargeAmount: pipe(
													nullish(amount({ requireCurrency: "never" })),
													metadata({
														id: "BT-X-98",
													}),
												),
											}),
										),
										metadata({
											id: "BT-131-00",
										}),
									),
									precendingInvoices: pipe(
										nullish(
											array(
												object({
													issuerAssignedId: pipe(
														documentReference(),
														metadata({
															id: ["BT-X-331", "EXT-FR-FE-136"],
														}),
													),
													lineId: pipe(
														nullish(documentReference()),
														metadata({
															id: ["BT-X-540", "EXT-FR-FE-139"],
														}),
													),
													typeCode: pipe(
														nullish(code("untdid1001")),
														metadata({
															id: ["BT-X-332", "EXT-FR-FE-137"],
														}),
													),
													date: pipe(
														nullish(date()),
														metadata({
															id: [
																"BT-X-333",
																"BT-X-333-00",
																"BT-X-333-0",
																"EXT-FR-FE-138",
															],
														}),
													),
												}),
											),
										),
										metadata({
											id: ["BG-X-48", "EXT-FR-FE-BG-06"],
										}),
									),
									//
									//
									//
									accountingReference: pipe(
										nullish(
											asArray(
												object({
													typeCode: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-99",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BT-133-00",
										}),
									),
									//
									//
									//
								}),
							),
							metadata({
								id: "BG-30-00",
							}),
						),
					}),
				),
				metadata({
					id: "BG-25",
				}),
			),
			contract: pipe(
				nullish(
					object({
						seller: pipe(
							object({
								roleCode: pipe(
									nullish(code("untdid3035")),
									metadata({
										id: "BT-X-543",
									}),
								),
								organization: pipe(
									nullish(
										object({
											postalAddress: pipe(
												nullish(
													object({
														postCode: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-100",
															}),
														),
														line1: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-101",
															}),
														),
														line2: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-102",
															}),
														),
														line3: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-103",
															}),
														),
														city: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-104",
															}),
														),
														countryCode: pipe(
															code("country"),
															metadata({
																id: "BT-X-105",
															}),
														),
														countrySubdivision: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-106",
															}),
														),
													}),
												),
												metadata({
													id: "BG-X-14",
												}),
											),
										}),
									),
									metadata({
										id: "BT-30-00",
									}),
								),
								//
								//
								//
								contact: pipe(
									nullish(
										asArray(
											object({
												typeCode: pipe(
													nullish(code("untdid3139")),
													metadata({
														id: "BT-X-317",
													}),
												),
												faxNumber: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-107", "BT-X-107-00"],
													}),
												),
											}),
										),
									),
									metadata({
										id: "BG-6",
									}),
								),
								//
								//
								//
							}),
							metadata({
								id: "BG-4",
								description:
									"A group of business terms providing information about the Seller.",
							}),
						),
						buyer: pipe(
							object({
								roleCode: pipe(
									nullish(code("untdid3035")),
									metadata({
										id: "BT-X-544",
									}),
								),
								description: pipe(
									nullish(text()),
									metadata({
										id: "BT-X-334",
									}),
								),
								organization: pipe(
									nullish(
										object({
											postalAddress: pipe(
												nullish(
													object({
														postCode: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-108",
															}),
														),
														line1: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-109",
															}),
														),
														line2: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-110",
															}),
														),
														line3: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-111",
															}),
														),
														city: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-112",
															}),
														),
														countryCode: pipe(
															code("country"),
															metadata({
																id: "BT-X-113",
															}),
														),
														countrySubdivision: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-114",
															}),
														),
													}),
												),
												metadata({
													id: "BG-X-15",
												}),
											),
										}),
									),
									metadata({
										id: "BT-47-00",
										description: "Details about the organization",
									}),
								),
								//
								//
								//
								contact: pipe(
									nullish(
										asArray(
											object({
												typeCode: pipe(
													nullish(code("untdid3139")),
													metadata({
														id: "BT-X-318",
													}),
												),
												faxNumber: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-115", "BT-X-115-00"],
													}),
												),
											}),
										),
									),
									metadata({
										id: "BG-9",
									}),
								),
								//
								//
								//
							}),
							metadata({
								id: "BG-7",
								description:
									"A group of business terms providing information about the Buyer.",
							}),
						),
						salesAgent: pipe(
							nullish(
								object({
									id: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											id: "BT-X-337",
										}),
									),
									//
									//
									//
									globalId: pipe(
										nullish(
											asArray(identifier({ requireSchemeId: "optional" })),
										),
										metadata({
											id: [
												"BT-X-338",
												"BT-X-338-0",
												"EXT-FR-FE-69",
												"EXT-FR-FE-70",
											],
										}),
									),
									//
									//
									//
									name: pipe(
										text(),
										metadata({
											id: ["BT-X-335", "EXT-FR-FE-66"],
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: ["BT-X-545", "EXT-FR-FE-68"],
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: [
															"BT-X-339",
															"BT-X-339-0",
															"EXT-FR-FE-71",
															"EXT-FR-FE-72",
														],
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-336", "EXT-FR-FE-68"],
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-355",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-356",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-357",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-358",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-359",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-360",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-361",
																}),
															),
														}),
													),
													metadata({
														id: "BG-X-53",
													}),
												),
											}),
										),
										metadata({
											id: "BG-X-50",
										}),
									),
									//
									//
									//
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-342", "EXT-FR-FE-86"],
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-343",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-347",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-344", "BT-X-344-00", "EXT-FR-FE-87"],
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-345", "BT-X-345-00"],
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-346", "BT-X-346-00", "EXT-FR-FE-88"],
														}),
													),
												}),
											),
										),
										metadata({
											id: ["BG-X-51", "EXT-FR-FE-85"],
										}),
									),
									//
									//
									//
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-348", "EXT-FR-FE-81"],
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-349", "EXT-FR-FE-78"],
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-350", "EXT-FR-FE-79"],
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-351", "EXT-FR-FE-80"],
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-352", "EXT-FR-FE-82"],
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: ["BT-X-353", "EXT-FR-FE-84"],
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-354", "EXT-FR-FE-83"],
												}),
											),
										}),
										metadata({
											id: ["BG-X-52", "EXT-FR-FE-77"],
										}),
									),
									electronicAddress: pipe(
										nullish(identifier({ requireSchemeId: "always" })),
										metadata({
											id: [
												"BT-X-341",
												"BT-X-341-00",
												"BT-X-341-0",
												"EXT-FR-FE-75",
												"EXT-FR-FE-76",
											],
										}),
									),
									taxRegistration: nullish(
										object({
											vat: pipe(
												nullish(
													object({
														id: pipe(
															nullish(identifier({ requireSchemeId: "never" })),
															metadata({
																id: [
																	"BT-X-340",
																	"BT-X-340-0",
																	"EXT-FR-FE-73",
																	"EXT-FR-FE-74",
																],
															}),
														),
													}),
												),
												metadata({
													id: "BT-X-340-00",
												}),
											),
										}),
									),
								}),
							),
							metadata({
								id: ["BG-X-49", "EXT-FR-FE-BG-03"],
							}),
						),
						buyerTaxRepresentative: pipe(
							nullish(
								object({
									id: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											id: "BT-X-364",
										}),
									),
									//
									//
									//
									globalId: pipe(
										nullish(
											asArray(identifier({ requireSchemeId: "optional" })),
										),
										metadata({
											id: ["BT-X-365", "BT-X-365-0"],
										}),
									),
									//
									//
									//
									name: pipe(
										text(),
										metadata({
											id: "BT-X-362",
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: "BT-X-546",
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: ["BT-X-366", "BT-X-366-0"],
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-363",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-382",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-383",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-384",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-385",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-386",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-387",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-388",
																}),
															),
														}),
													),
													metadata({
														id: "BG-X-57",
													}),
												),
											}),
										),
										metadata({
											id: "BG-X-58",
										}),
									),
									//
									//
									//
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-369",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-370",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-371",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-372", "BT-X-372-00"],
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-373", "BT-X-373-00"],
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-374", "BT-X-374-00"],
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-X-55",
										}),
									),
									//
									//
									//
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-375",
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-376",
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-377",
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-378",
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-379",
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: "BT-X-380",
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-381",
												}),
											),
										}),
										metadata({
											id: "BG-X-56",
										}),
									),
									electronicAddress: pipe(
										nullish(identifier({ requireSchemeId: "always" })),
										metadata({
											id: ["BT-X-368", "BT-X-368-00", "BT-X-368-0"],
										}),
									),
									taxRegistration: nullish(
										object({
											vat: pipe(
												nullish(
													object({
														id: pipe(
															nullish(identifier({ requireSchemeId: "never" })),
															metadata({
																id: ["BT-X-367", "BT-X-367-0"],
															}),
														),
													}),
												),
												metadata({
													id: "BT-X-367-00",
												}),
											),
										}),
									),
								}),
							),
							metadata({
								id: "BG-X-54",
							}),
						),
						sellerTaxRepresentative: pipe(
							nullish(
								object({
									id: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											id: "BT-X-116",
										}),
									),
									//
									//
									//
									globalId: pipe(
										nullish(
											asArray(identifier({ requireSchemeId: "optional" })),
										),
										metadata({
											id: ["BT-X-117", "BT-X-117-1"],
										}),
									),
									//
									//
									//
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: "BT-X-547",
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: ["BT-X-118", "BT-X-118-0"],
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-119",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-389",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-390",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-391",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-392",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-393",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-394",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-395",
																}),
															),
														}),
													),
													metadata({
														id: "BG-X-59",
													}),
												),
											}),
										),
										metadata({
											id: "BG-X-16",
										}),
									),
									//
									//
									//
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-120",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-121",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-319",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-122", "BT-X-122-00"],
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-123", "BT-X-123-00"],
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-124", "BT-X-124-00"],
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-X-17",
										}),
									),
									//
									//
									//
									electronicAddress: pipe(
										nullish(identifier({ requireSchemeId: "always" })),
										metadata({
											id: ["BT-X-125", "BT-X-125-00", "BT-X-125-0"],
										}),
									),
								}),
							),
							metadata({
								id: "BG-11",
								description:
									"A group of business terms providing information about the Seller's tax representative.",
							}),
						),
						deviatingEndUser: pipe(
							nullish(
								object({
									id: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											id: "BT-X-126",
										}),
									),
									//
									//
									//
									globalId: pipe(
										nullish(
											asArray(identifier({ requireSchemeId: "optional" })),
										),
										metadata({
											id: ["BT-X-127", "BT-X-127-0"],
										}),
									),
									//
									//
									//
									name: pipe(
										text(),
										metadata({
											id: "BT-X-128",
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: "BT-X-548",
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: ["BT-X-129", "BT-X-129-0"],
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-130",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-396",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-397",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-398",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-399",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-400",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-401",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-402",
																}),
															),
														}),
													),
													metadata({
														id: "BG-X-60",
													}),
												),
											}),
										),
										metadata({
											id: "BG-X-19",
										}),
									),
									//
									//
									//
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-131",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-132",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-320",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-133", "BT-X-133-00"],
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-134", "BT-X-134-00"],
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-135", "BT-X-135-00"],
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-X-20",
										}),
									),
									//
									//
									//
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-136",
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-137",
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-138",
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-139",
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-140",
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: "BT-X-141",
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-142",
												}),
											),
										}),
										metadata({
											id: "BG-X-21",
										}),
									),
									electronicAddress: pipe(
										nullish(identifier({ requireSchemeId: "always" })),
										metadata({
											id: ["BT-X-143", "BT-X-143-00", "BT-X-143-0"],
										}),
									),
									taxRegistration: nullish(
										object({
											vat: pipe(
												nullish(
													object({
														id: pipe(
															nullish(identifier({ requireSchemeId: "never" })),
															metadata({
																id: ["BT-X-144", "BT-X-144-0"],
															}),
														),
													}),
												),
												metadata({
													id: "BT-X-144-00",
												}),
											),
										}),
									),
								}),
							),
							metadata({
								id: "BG-X-18",
							}),
						),
						deliveryTerms: pipe(
							nullish(
								object({
									typeCode: pipe(
										nullish(union([code("untdid4053"), code("incoterms")])),
										metadata({
											id: "BT-X-145",
										}),
									),
									location: pipe(
										nullish(
											object({
												countryCode: pipe(
													code("country"),
													metadata({
														id: "BT-X-563",
													}),
												),
												name: pipe(
													text(),
													metadata({
														id: "BT-X-564",
													}),
												),
											}),
										),
										metadata({
											id: "BG-X-88",
										}),
									),
								}),
							),
							metadata({
								id: "BG-X-22",
							}),
						),
						sellerOrderReferencedDocument: pipe(
							nullish(
								object({
									date: pipe(
										nullish(date()),
										metadata({
											id: ["BT-X-146", "BT-X-146-00", "BT-X-146-0"],
										}),
									),
								}),
							),
							metadata({
								id: "BT-14-00",
							}),
						),
						associatedOrder: pipe(
							nullish(
								object({
									date: pipe(
										nullish(date()),
										metadata({
											id: ["BT-X-147", "BT-X-147-00", "BT-X-147-0"],
										}),
									),
								}),
							),
							metadata({
								id: "BT-13-00",
							}),
						),
						quotationReferencedDocuments: pipe(
							nullish(
								array(
									object({
										issuerAssignedId: pipe(
											documentReference(),
											metadata({
												id: "BT-X-403",
											}),
										),
										date: pipe(
											nullish(date()),
											metadata({
												id: ["BT-X-404", "BT-X-404-00", "BT-X-404-0"],
											}),
										),
									}),
								),
							),
							metadata({
								id: "BG-X-61",
							}),
						),
						associatedContract: pipe(
							nullish(
								object({
									referenceTypeCode: pipe(
										nullish(code("untdid1153")),
										metadata({
											id: ["BT-X-405", "EXT-FR-FE-01"],
										}),
									),
									date: pipe(
										nullish(date()),
										metadata({
											id: ["BT-X-148", "BT-X-148-00", "BT-X-148-0"],
										}),
									),
								}),
							),
							metadata({
								id: "BT-12-00",
							}),
						),
						additionalSupportingDocuments: pipe(
							nullish(
								array(
									object({
										date: pipe(
											nullish(date()),
											metadata({
												id: ["BT-X-149", "BT-X-149-00", "BT-X-149-0"],
											}),
										),
									}),
								),
							),
							metadata({
								id: "BG-24",
							}),
						),
						tenderOrLotReferences: pipe(
							nullish(
								asArray(
									object({
										date: pipe(
											nullish(date()),
											metadata({
												id: ["BT-X-556", "BT-X-556-00", "BT-X-556-0"],
											}),
										),
									}),
								),
							),
							metadata({
								id: "BT-17-00",
							}),
						),
						invoicedObjectIdentifier: pipe(
							nullish(
								asArray(
									object({
										date: pipe(
											nullish(date()),
											metadata({
												id: ["BT-X-557", "BT-X-557-00", "BT-X-557-0"],
											}),
										),
									}),
								),
							),
							metadata({
								id: "BT-18-00",
							}),
						),
						buyerAgent: pipe(
							nullish(
								object({
									id: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											id: "BT-X-408",
										}),
									),
									globalId: pipe(
										nullish(
											asArray(identifier({ requireSchemeId: "optional" })),
										),
										metadata({
											id: [
												"BT-X-409",
												"BT-X-409-0",
												"EXT-FR-FE-06",
												"EXT-FR-FE-07",
											],
										}),
									),
									name: pipe(
										text(),
										metadata({
											id: ["BT-X-406", "EXT-FR-FE-03"],
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: ["BT-X-549", "EXT-FR-FE-04"],
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: [
															"BT-X-410",
															"BT-X-410-0",
															"EXT-FR-FE-08",
															"EXT-FR-FE-09",
														],
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-407", "EXT-FR-FE-05"],
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-426",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-427",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-428",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-429",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-430",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-431",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-432",
																}),
															),
														}),
													),
													metadata({
														id: "BG-X-66",
													}),
												),
											}),
										),
										metadata({
											id: "BG-X-63",
										}),
									),
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-413", "EXT-FR-FE-23"],
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-414",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-415",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-416", "BT-X-416-00", "EXT-FR-FE-24"],
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-417", "BT-X-417-00"],
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-418", "BT-X-418-00"],
														}),
													),
												}),
											),
										),
										metadata({
											id: ["BG-X-64", "EXT-FR-FE-22"],
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-419", "EXT-FR-FE-18"],
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-420", "EXT-FR-FE-15"],
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-421", "EXT-FR-FE-16"],
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-422", "EXT-FR-FE-17"],
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-423", "EXT-FR-FE-19"],
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: ["BT-X-424", "EXT-FR-FE-21"],
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-425", "EXT-FR-FE-20"],
												}),
											),
										}),
										metadata({
											id: ["BG-X-65", "EXT-FR-FE-14"],
										}),
									),
									electronicAddress: pipe(
										nullish(identifier({ requireSchemeId: "always" })),
										metadata({
											id: ["BT-X-412", "BT-X-412-00", "BT-X-412-0"],
										}),
									),
									taxRegistration: nullish(
										object({
											vat: pipe(
												nullish(
													object({
														id: pipe(
															nullish(identifier({ requireSchemeId: "never" })),
															metadata({
																id: ["BT-X-411", "BT-X-411-0", "EXT-FR-FE-11"],
															}),
														),
													}),
												),
												metadata({
													id: "BT-X-411-00",
												}),
											),
										}),
									),
								}),
							),
							metadata({
								id: ["BG-X-62", "EXT-FR-FE-BG-01"],
							}),
						),
						customerOrderReferencedDocuments: pipe(
							nullish(
								array(
									object({
										issuerAssignedId: pipe(
											documentReference(),
											metadata({
												id: "BT-X-150",
											}),
										),
										date: pipe(
											nullish(date()),
											metadata({
												id: ["BT-X-151", "BT-X-151-00", "BT-X-151-0"],
											}),
										),
									}),
								),
							),
							metadata({
								id: "BG-X-23",
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
						relatedConsignment: pipe(
							nullish(
								object({
									transportMovementModeCode: pipe(
										nullish(text()),
										metadata({
											id: ["BT-X-152", "BT-X-152-00"],
										}),
									),
								}),
							),
							metadata({
								id: "BG-X-24",
							}),
						),
						recipient: pipe(
							nullish(
								object({
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: "BT-X-550",
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: ["BT-X-153", "BT-X-153-0"],
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-154",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-433",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-434",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-435",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-436",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-437",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-438",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-439",
																}),
															),
														}),
													),
													metadata({
														id: "BG-X-67",
													}),
												),
											}),
										),
										metadata({
											id: "BG-X-25",
										}),
									),
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-155",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-156",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-321",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-157", "BT-X-157-00"],
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-158", "BT-X-158-00"],
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-159", "BT-X-159-00"],
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-X-26",
										}),
									),
									electronicAddress: pipe(
										nullish(identifier({ requireSchemeId: "always" })),
										metadata({
											id: ["BT-X-160", "BT-X-160-00", "BT-X-160-0"],
										}),
									),
									taxRegistration: nullish(
										object({
											vat: pipe(
												nullish(
													object({
														id: pipe(
															nullish(identifier({ requireSchemeId: "never" })),
															metadata({
																id: ["BT-X-161", "BT-X-161-0"],
															}),
														),
													}),
												),
												metadata({
													id: "BT-X-161-00",
												}),
											),
										}),
									),
								}),
							),
							metadata({
								id: "BG-13",
							}),
						),
						finalRecipient: pipe(
							nullish(
								object({
									id: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											id: "BT-X-162",
										}),
									),
									globalId: pipe(
										nullish(
											asArray(identifier({ requireSchemeId: "optional" })),
										),
										metadata({
											id: ["BT-X-163", "BT-X-163-0"],
										}),
									),
									name: pipe(
										text(),
										metadata({
											id: "BT-X-164",
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: "BT-X-551",
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: ["BT-X-165", "BT-X-165-0"],
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-166",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-440",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-441",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-442",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-443",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-444",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-445",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-446",
																}),
															),
														}),
													),
													metadata({
														id: "BG-X-68",
													}),
												),
											}),
										),
										metadata({
											id: "BT-X-165-00",
										}),
									),
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-167",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-168",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-322",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-169", "BT-X-169-00"],
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-170", "BT-X-170-00"],
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-171", "BT-X-171-00"],
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-X-28",
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-172",
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-173",
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-174",
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-175",
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-176",
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: "BT-X-177",
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-178",
												}),
											),
										}),
										metadata({
											id: "BG-X-29",
										}),
									),
									electronicAddress: pipe(
										nullish(identifier({ requireSchemeId: "always" })),
										metadata({
											id: ["BT-X-179", "BT-X-179-00", "BT-X-179-0"],
										}),
									),
									taxRegistration: nullish(
										object({
											vat: pipe(
												nullish(
													object({
														id: pipe(
															nullish(identifier({ requireSchemeId: "never" })),
															metadata({
																id: ["BT-X-180", "BT-X-180-0"],
															}),
														),
													}),
												),
												metadata({
													id: "BT-X-180-00",
												}),
											),
										}),
									),
								}),
							),
							metadata({
								id: "BG-X-27",
							}),
						),
						deviatingSender: pipe(
							nullish(
								object({
									id: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											id: "BT-X-181",
										}),
									),
									globalId: pipe(
										nullish(
											asArray(identifier({ requireSchemeId: "optional" })),
										),
										metadata({
											id: ["BT-X-182", "BT-X-182-0"],
										}),
									),
									name: pipe(
										text(),
										metadata({
											id: "BT-X-183",
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: "BT-X-552",
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: ["BT-X-184", "BT-X-184-0"],
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-185",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-447",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-448",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-449",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-450",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-451",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-452",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-453",
																}),
															),
														}),
													),
													metadata({
														id: "BG-X-69",
													}),
												),
											}),
										),
										metadata({
											id: "BT-X-184-00",
										}),
									),
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-186",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-187",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-323",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-188", "BT-X-188-00"],
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-189", "BT-X-189-00"],
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-190", "BT-X-190-00"],
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-X-31",
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-191",
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-192",
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-193",
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-194",
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-195",
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: "BT-X-196",
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-197",
												}),
											),
										}),
										metadata({
											id: "BG-X-32",
										}),
									),
									electronicAddress: pipe(
										nullish(identifier({ requireSchemeId: "always" })),
										metadata({
											id: ["BT-X-198", "BT-X-198-00", "BT-X-198-0"],
										}),
									),
									taxRegistration: nullish(
										object({
											vat: pipe(
												nullish(
													object({
														id: pipe(
															nullish(identifier({ requireSchemeId: "never" })),
															metadata({
																id: ["BT-X-199", "BT-X-199-0"],
															}),
														),
													}),
												),
												metadata({
													id: "BT-X-199-00",
												}),
											),
										}),
									),
								}),
							),
							metadata({
								id: "BG-X-30",
							}),
						),
						despatchAdvice: pipe(
							nullish(
								object({
									date: pipe(
										nullish(date()),
										metadata({
											id: ["BT-X-200", "BT-X-200-00", "BT-X-200-0"],
										}),
									),
								}),
							),
							metadata({
								id: "BT-16-00",
							}),
						),
						associatedGoodsReceipt: pipe(
							nullish(
								object({
									date: pipe(
										nullish(date()),
										metadata({
											id: ["BT-X-201", "BT-X-201-00", "BT-X-201-0"],
										}),
									),
								}),
							),
							metadata({
								id: "BT-15-00",
							}),
						),
						deliveryNoteReferencedDocuments: pipe(
							nullish(
								array(
									object({
										issuerAssignedId: pipe(
											documentReference(),
											metadata({
												id: "BT-X-202",
											}),
										),
										date: pipe(
											nullish(date()),
											metadata({
												id: ["BT-X-203", "BT-X-203-00", "BT-X-203-0"],
											}),
										),
									}),
								),
							),
							metadata({
								id: "BT-X-202-00",
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
						sellerReferenceNumber: pipe(
							nullish(text()),
							metadata({
								id: "BT-X-204",
							}),
						),
						invoicer: pipe(
							nullish(
								object({
									id: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											id: "BT-X-205",
										}),
									),
									globalId: pipe(
										nullish(
											asArray(identifier({ requireSchemeId: "optional" })),
										),
										metadata({
											id: [
												"BT-X-206",
												"BT-X-206-0",
												"EXT-FR-FE-115",
												"EXT-FR-FE-116",
											],
										}),
									),
									name: pipe(
										text(),
										metadata({
											id: ["BT-X-207", "EXT-FR-FE-112"],
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: ["BT-X-553", "EXT-FR-FE-113"],
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: [
															"BT-X-208",
															"BT-X-208-0",
															"EXT-FR-FE-117",
															"EXT-FR-FE-118",
														],
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-209", "EXT-FR-FE-114"],
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-454",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-455",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-456",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-457",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-458",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-459",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-460",
																}),
															),
														}),
													),
													metadata({
														id: "BG-X-70",
													}),
												),
											}),
										),
										metadata({
											id: "BT-X-208-00",
										}),
									),
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-210", "EXT-FR-FE-132"],
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-211",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-324",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-212", "BT-X-212-00", "EXT-FR-FE-133"],
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-213", "BT-X-213-00"],
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-214", "BT-X-214-00", "EXT-FR-FE-134"],
														}),
													),
												}),
											),
										),
										metadata({
											id: ["BG-X-34", "EXT-FR-FE-131"],
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-215", "EXT-FR-FE-128"],
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-216", "EXT-FR-FE-124"],
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-217", "EXT-FR-FE-125"],
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-218", "EXT-FR-FE-126"],
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-219", "EXT-FR-FE-127"],
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: ["BT-X-220", "EXT-FR-FE-139"],
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-221", "EXT-FR-FE-129"],
												}),
											),
										}),
										metadata({
											id: ["BG-X-35", "EXT-FR-FE-123"],
										}),
									),
									electronicAddress: pipe(
										nullish(identifier({ requireSchemeId: "always" })),
										metadata({
											id: [
												"BT-X-222",
												"BT-X-222-00",
												"BT-X-222-0",
												"EXT-FR-FE-121",
												"EXT-FR-FE-122",
											],
										}),
									),
									taxRegistration: nullish(
										object({
											vat: pipe(
												nullish(
													object({
														id: pipe(
															nullish(identifier({ requireSchemeId: "never" })),
															metadata({
																id: [
																	"BT-X-223",
																	"BT-X-223-0",
																	"EXT-FR-FE-119",
																	"EXT-FR-FE-120",
																],
															}),
														),
													}),
												),
												metadata({
													id: "BT-X-223-00",
												}),
											),
										}),
									),
								}),
							),
							metadata({
								id: ["BG-X-33", "EXT-FR-FE-BG-05"],
							}),
						),
						invoicee: pipe(
							nullish(
								object({
									id: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											id: "BT-X-224",
										}),
									),
									globalId: pipe(
										nullish(
											asArray(identifier({ requireSchemeId: "optional" })),
										),
										metadata({
											id: [
												"BT-X-255",
												"BT-X-255-0",
												"EXT-FR-FE-92a",
												"EXT-FR-FE-92a-1",
											],
										}),
									),
									name: pipe(
										text(),
										metadata({
											id: ["BT-X-226", "EXT-FR-FE-89"],
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: ["BT-X-554", "EXT-FR-FE-90"],
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: [
															"BT-X-227",
															"BT-X-227-0",
															"EXT-FR-FE-94",
															"EXT-FR-FE-95",
														],
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-228", "EXT-FR-FE-91"],
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-461",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-462",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-463",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-464",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-465",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-466",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-467",
																}),
															),
														}),
													),
													metadata({
														id: "BG-X-71",
													}),
												),
											}),
										),
										metadata({
											id: "BT-X-227-00",
										}),
									),
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-229", "EXT-FR-FE-109"],
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-230",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-325",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-231", "BT-X-231-00", "EXT-FR-FE-110"],
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-232", "BT-X-232-00"],
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-233", "BT-X-233-00", "EXT-FR-FE-111"],
														}),
													),
												}),
											),
										),
										metadata({
											id: ["BG-X-37", "EXT-FR-FE-108"],
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-234", "EXT-FR-FE-105"],
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-235", "EXT-FR-FE-101"],
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-236", "EXT-FR-FE-102"],
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-237", "EXT-FR-FE-103"],
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-238", "EXT-FR-FE-104"],
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: ["BT-X-239", "EXT-FR-FE-107"],
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-240", "EXT-FR-FE-106"],
												}),
											),
										}),
										metadata({
											id: ["BG-X-38", "EXT-FR-FE-100"],
										}),
									),
									electronicAddress: pipe(
										nullish(identifier({ requireSchemeId: "always" })),
										metadata({
											id: [
												"BT-X-241",
												"BT-X-241-00",
												"BT-X-241-0",
												"EXT-FR-FE-98",
												"EXT-FR-FE-99",
											],
										}),
									),
									taxRegistration: nullish(
										object({
											vat: pipe(
												nullish(
													object({
														id: pipe(
															nullish(identifier({ requireSchemeId: "never" })),
															metadata({
																id: [
																	"BT-X-242",
																	"BT-X-242-0",
																	"EXT-FR-FE-96",
																	"EXT-FR-FE-97",
																],
															}),
														),
													}),
												),
												metadata({
													id: "BT-X-242-00",
												}),
											),
										}),
									),
								}),
							),
							metadata({
								id: ["BG-X-36", "EXT-FR-FE-BG-04"],
							}),
						),
						payee: pipe(
							nullish(
								object({
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: ["BT-X-468", "EXT-FR-FE-26"],
										}),
									),
									organization: pipe(
										nullish(
											object({
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-243",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-469",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-470",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-471",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-472",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-473",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-474",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-475",
																}),
															),
														}),
													),
													metadata({
														id: "BG-X-72",
													}),
												),
											}),
										),
										metadata({
											id: "BT-61-00",
										}),
									),
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-244", "EXT-FR-FE-40"],
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-245",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-326",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-246", "BT-X-246-00", "EXT-FR-FE-41"],
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-247", "BT-X-247-00"],
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-248", "BT-X-248-00", "EXT-FR-FE-42"],
														}),
													),
												}),
											),
										),
										metadata({
											id: ["BG-X-39", "EXT-FR-FE-39"],
										}),
									),
									postalAddress: pipe(
										nullish(
											object({
												postCode: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-249", "EXT-FR-FE-36"],
													}),
												),
												line1: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-250", "EXT-FR-FE-32"],
													}),
												),
												line2: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-251", "EXT-FR-FE-33"],
													}),
												),
												line3: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-252", "EXT-FR-FE-34"],
													}),
												),
												city: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-253", "EXT-FR-FE-35"],
													}),
												),
												countryCode: pipe(
													code("country"),
													metadata({
														id: ["BT-X-254", "EXT-FR-FE-38"],
													}),
												),
												countrySubdivision: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-255", "EXT-FR-FE-37"],
													}),
												),
											}),
										),
										metadata({
											id: ["BG-X-40", "EXT-FR-FE-31"],
										}),
									),
									electronicAddress: pipe(
										nullish(identifier({ requireSchemeId: "always" })),
										metadata({
											id: [
												"BT-X-256",
												"BT-X-256-00",
												"BT-X-256-0",
												"EXT-FR-FE-29",
												"EXT-FR-FE-30",
											],
										}),
									),
									taxRegistration: nullish(
										object({
											vat: pipe(
												nullish(
													object({
														id: pipe(
															nullish(identifier({ requireSchemeId: "never" })),
															metadata({
																id: ["BT-X-257", "BT-X-257-0", "EXT-FR-FE-27"],
															}),
														),
													}),
												),
												metadata({
													id: ["BT-X-257-00", "EXT-FR-FE-28"],
												}),
											),
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
						payer: pipe(
							nullish(
								object({
									id: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											id: "BT-X-478",
										}),
									),
									globalId: pipe(
										nullish(
											asArray(identifier({ requireSchemeId: "optional" })),
										),
										metadata({
											id: [
												"BT-X-479",
												"BT-X-479-0",
												"EXT-FR-FE-46",
												"EXT-FR-FE-47",
											],
										}),
									),
									name: pipe(
										text(),
										metadata({
											id: ["BT-X-476", "EXT-FR-FE-43"],
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: ["BT-X-483", "EXT-FR-FE-44"],
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: [
															"BT-X-480",
															"BT-X-480-0",
															"EXT-FR-FE-48",
															"EXT-FR-FE-49",
														],
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-477", "EXT-FR-FE-45"],
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-497",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-498",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-499",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-500",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-501",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-502",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-503",
																}),
															),
														}),
													),
													metadata({
														id: "BG-X-76",
													}),
												),
											}),
										),
										metadata({
											id: "BT-X-480-00",
										}),
									),
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-484", "EXT-FR-FE-63"],
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-485",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-486",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-487", "BT-X-487-00", "EXT-FR-FE-64"],
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-488", "BT-X-488-00"],
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-489", "BT-X-489-00", "EXT-FR-FE-65"],
														}),
													),
												}),
											),
										),
										metadata({
											id: ["BG-X-74", "EXT-FR-FE-62"],
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-490", "EXT-FR-FE-59"],
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-491", "EXT-FR-FE-55"],
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-492", "EXT-FR-FE-56"],
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-493", "EXT-FR-FE-57"],
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-494", "EXT-FR-FE-58"],
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: ["BT-X-495", "EXT-FR-FE-61"],
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-496", "EXT-FR-FE-60"],
												}),
											),
										}),
										metadata({
											id: ["BG-X-75", "EXT-FR-FE-54"],
										}),
									),
									electronicAddress: pipe(
										nullish(identifier({ requireSchemeId: "always" })),
										metadata({
											id: [
												"BT-X-482",
												"BT-X-482-00",
												"BT-X-482-0",
												"EXT-FR-FE-52",
												"EXT-FR-FE-53",
											],
										}),
									),
									taxRegistration: nullish(
										object({
											vat: pipe(
												nullish(
													object({
														id: pipe(
															nullish(identifier({ requireSchemeId: "never" })),
															metadata({
																id: [
																	"BT-X-481",
																	"BT-X-481-0",
																	"EXT-FR-FE-50",
																	"EXT-FR-FE-51",
																],
															}),
														),
													}),
												),
												metadata({
													id: "BT-X-481-00",
												}),
											),
										}),
									),
								}),
							),
							metadata({
								id: ["BG-X-73", "EXT-FR-FE-BG-02"],
							}),
						),
						currencyExchange: pipe(
							nullish(
								object({
									invoiceCurrency: pipe(
										code("currency"),
										metadata({
											id: "BT-X-258",
										}),
									),
									localCurrency: pipe(
										code("currency"),
										metadata({
											id: "BT-X-259",
										}),
									),
									// TODO: add rate data-type?
									exchangeRate: pipe(
										unitPriceAmount(),
										metadata({
											id: "BT-X-260",
										}),
									),
									exchangeRateDate: pipe(
										nullish(date()),
										metadata({
											id: ["BT-X-261", "BT-X-261-00", "BT-X-261-0"],
										}),
									),
								}),
							),
							metadata({
								id: "BG-X-41",
							}),
						),
						vatBreakdown: pipe(
							array(
								object({
									lineTotalBasisAmount: pipe(
										nullish(amount({ requireCurrency: "never" })),
										metadata({
											id: "BT-X-262",
										}),
									),
									allowanceChargeBasisAmount: pipe(
										nullish(amount({ requireCurrency: "never" })),
										metadata({
											id: "BT-X-263",
										}),
									),
								}),
							),
							minLength(1),
							metadata({
								id: "BG-23",
								description:
									"A group of business terms providing information about VAT breakdown by different categories, rates and exemption reasons",
							}),
						),
						invoicingPeriod: pipe(
							nullish(
								object({
									description: pipe(
										nullish(text()),
										metadata({
											id: "BT-X-264",
										}),
									),
								}),
							),
							metadata({
								id: "BG-14",
								description:
									"A group of business terms providing information on the invoice period.",
							}),
						),
						allowances: pipe(
							nullish(
								array(
									object({
										calculationSequence: pipe(
											nullish(identifier({ requireSchemeId: "never" })),
											metadata({
												id: "BT-X-265",
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
																id: "BT-X-267",
															}),
														),
													}),
												]),
											),
											metadata({
												id: "BT-X-266",
											}),
										),
									}),
								),
							),
							metadata({
								id: "BG-20",
							}),
						),
						charges: pipe(
							nullish(
								array(
									object({
										calculationSequence: pipe(
											nullish(identifier({ requireSchemeId: "never" })),
											metadata({
												id: "BT-X-268",
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
																id: "BT-X-270",
															}),
														),
													}),
												]),
											),
											metadata({
												id: "BT-X-269",
											}),
										),
									}),
								),
							),
							metadata({
								id: "BG-21",
							}),
						),
						logisticsServiceFees: pipe(
							nullish(
								array(
									object({
										description: pipe(
											text(),
											metadata({
												id: "BT-X-271",
											}),
										),
										feeAmount: pipe(
											amount({ requireCurrency: "never" }),
											metadata({
												id: "BT-X-272",
											}),
										),
										appliedTradeTax: pipe(
											nullish(
												array(
													object({
														// FIXED TO "VA"
														// typeCode: pipe(code(), metadata({
														//   id: "BT-X-273-0"
														// })),
														categoryCode: pipe(
															code("untdid5305"),
															metadata({
																id: "BT-X-273",
															}),
														),
														rateApplicablePercent: pipe(
															percentage(),
															metadata({
																id: "BT-X-274",
															}),
														),
													}),
												),
											),
											metadata({
												id: "BT-X-273-00",
											}),
										),
									}),
								),
							),
							metadata({
								id: "BG-X-42",
							}),
						),
						paymentTerms: pipe(
							nullish(
								asArray(
									object({
										partialPaymentAmount: pipe(
											nullish(amount({ requireCurrency: "never" })),
											metadata({
												id: "BT-X-275",
											}),
										),
										penaltyTerms: pipe(
											nullish(
												array(
													object({
														maturityReferenceDate: pipe(
															nullish(date()),
															metadata({
																id: ["BT-X-276", "BT-X-276-00", "BT-X-276-0"],
															}),
														),
														dueDatePeriodBasis: pipe(
															nullish(
																union([
																	quantity(),
																	object({
																		value: quantity(),
																		unitCode: pipe(
																			nullish(code("unit")),
																			metadata({
																				id: "BT-X-278",
																			}),
																		),
																	}),
																]),
															),
															metadata({
																id: "BT-X-277",
															}),
														),
														basisAmount: pipe(
															nullish(amount({ requireCurrency: "never" })),
															metadata({
																id: "BT-X-279",
															}),
														),
														calculationPercent: pipe(
															nullish(percentage()),
															metadata({
																id: "BT-X-280",
															}),
														),
														actualPenaltyAmount: pipe(
															nullish(amount({ requireCurrency: "never" })),
															metadata({
																id: "BT-X-281",
															}),
														),
													}),
												),
											),
											metadata({
												id: "BG-X-43",
											}),
										),
										discountTerms: pipe(
											nullish(
												array(
													object({
														maturityReferenceDate: pipe(
															nullish(date()),
															metadata({
																id: ["BT-X-282", "BT-X-282-00", "BT-X-282-0"],
															}),
														),
														dueDatePeriodBasis: pipe(
															nullish(
																union([
																	quantity(),
																	object({
																		value: quantity(),
																		unitCode: pipe(
																			nullish(code("unit")),
																			metadata({
																				id: "BT-X-284",
																			}),
																		),
																	}),
																]),
															),
															metadata({
																id: "BT-X-283",
															}),
														),
														basisAmount: pipe(
															nullish(amount({ requireCurrency: "never" })),
															metadata({
																id: "BT-X-285",
															}),
														),
														calculationPercent: pipe(
															nullish(percentage()),
															metadata({
																id: "BT-X-286",
															}),
														),
														actualDiscountAmount: pipe(
															nullish(amount({ requireCurrency: "never" })),
															metadata({
																id: "BT-X-287",
															}),
														),
													}),
												),
											),
											metadata({
												id: "BG-X-44",
											}),
										),
										payeePerPayment: pipe(
											nullish(
												array(
													object({
														id: pipe(
															nullish(identifier({ requireSchemeId: "never" })),
															metadata({
																id: "BT-X-506",
															}),
														),
														globalId: pipe(
															nullish(
																asArray(
																	identifier({ requireSchemeId: "optional" }),
																),
															),
															metadata({
																id: ["BT-X-507", "BT-X-507-0"],
															}),
														),
														name: pipe(
															text(),
															metadata({
																id: "BT-X-504",
															}),
														),
														roleCode: pipe(
															nullish(code("untdid3035")),
															metadata({
																id: "BT-X-511",
															}),
														),
														organization: pipe(
															nullish(
																object({
																	id: pipe(
																		nullish(
																			identifier({
																				requireSchemeId: "optional",
																			}),
																		),
																		metadata({
																			id: ["BT-X-508", "BT-X-508-0"],
																		}),
																	),
																	tradingName: pipe(
																		nullish(text()),
																		metadata({
																			id: "BT-X-505",
																		}),
																	),
																	postalAddress: pipe(
																		nullish(
																			object({
																				postCode: pipe(
																					nullish(text()),
																					metadata({
																						id: "BT-X-525",
																					}),
																				),
																				line1: pipe(
																					nullish(text()),
																					metadata({
																						id: "BT-X-526",
																					}),
																				),
																				line2: pipe(
																					nullish(text()),
																					metadata({
																						id: "BT-X-527",
																					}),
																				),
																				line3: pipe(
																					nullish(text()),
																					metadata({
																						id: "BT-X-528",
																					}),
																				),
																				city: pipe(
																					nullish(text()),
																					metadata({
																						id: "BT-X-529",
																					}),
																				),
																				countryCode: pipe(
																					code("country"),
																					metadata({
																						id: "BT-X-530",
																					}),
																				),
																				countrySubdivision: pipe(
																					nullish(text()),
																					metadata({
																						id: "BT-X-531",
																					}),
																				),
																			}),
																		),
																		metadata({
																			id: "BG-X-80",
																		}),
																	),
																}),
															),
															metadata({
																id: "BT-X-508-00",
															}),
														),
														//
														//
														//
														contact: pipe(
															nullish(
																asArray(
																	object({
																		personName: pipe(
																			nullish(text()),
																			metadata({
																				id: "BT-X-512",
																			}),
																		),
																		departmentName: pipe(
																			nullish(text()),
																			metadata({
																				id: "BT-X-513",
																			}),
																		),
																		typeCode: pipe(
																			nullish(code("untdid3139")),
																			metadata({
																				id: "BT-X-514",
																			}),
																		),
																		phoneNumber: pipe(
																			nullish(text()),
																			metadata({
																				id: ["BT-X-515", "BT-X-515-00"],
																			}),
																		),
																		faxNumber: pipe(
																			nullish(text()),
																			metadata({
																				id: ["BT-X-516", "BT-X-516-00"],
																			}),
																		),
																		emailAddress: pipe(
																			nullish(text()),
																			metadata({
																				id: ["BT-X-517", "BT-X-517-00"],
																			}),
																		),
																	}),
																),
															),
															metadata({
																id: "BG-X-78",
															}),
														),
														//
														//
														//
														postalAddress: pipe(
															object({
																postCode: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-518",
																	}),
																),
																line1: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-519",
																	}),
																),
																line2: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-520",
																	}),
																),
																line3: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-521",
																	}),
																),
																city: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-522",
																	}),
																),
																countryCode: pipe(
																	code("country"),
																	metadata({
																		id: "BT-X-523",
																	}),
																),
																countrySubdivision: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-524",
																	}),
																),
															}),
															metadata({
																id: "BG-X-79",
															}),
														),
														electronicAddress: pipe(
															nullish(
																identifier({ requireSchemeId: "always" }),
															),
															metadata({
																id: ["BT-X-510", "BT-X-510-00", "BT-X-510-0"],
															}),
														),
														taxRegistration: nullish(
															object({
																vat: pipe(
																	nullish(
																		object({
																			id: pipe(
																				nullish(
																					identifier({
																						requireSchemeId: "never",
																					}),
																				),
																				metadata({
																					id: ["BT-X-509", "BT-X-509-0"],
																				}),
																			),
																		}),
																	),
																	metadata({
																		id: "BT-X-509-00",
																	}),
																),
															}),
														),
													}),
												),
											),
											metadata({
												id: "BG-X-77",
											}),
										),
									}),
								),
							),
							metadata({
								id: "BT-20-00",
							}),
						),
						precendingInvoices: pipe(
							nullish(
								array(
									object({
										typeCode: pipe(
											nullish(text()),
											metadata({
												id: ["BT-X-555", "EXT-FR-FE-02"],
											}),
										),
									}),
								),
							),
							metadata({
								id: "BG-3",
								description:
									"A group of business terms providing information on one or more preceding Invoices.",
							}),
						),
						accounting: pipe(
							nullish(
								object({
									typeCode: pipe(
										nullish(text()),
										metadata({
											id: "BT-X-290",
										}),
									),
								}),
							),
							metadata({
								id: "BT-19-00",
							}),
						),
						advancePayments: pipe(
							nullish(
								array(
									object({
										paidAmount: pipe(
											amount({ requireCurrency: "never" }),
											metadata({
												id: "BT-X-291",
											}),
										),
										date: pipe(
											nullish(date()),
											metadata({
												id: ["BT-X-292", "BT-X-292-00", "BT-X-292-0"],
											}),
										),
										includedTax: pipe(
											array(
												object({
													calculatedAmount: pipe(
														amount({ requireCurrency: "never" }),
														metadata({
															id: "BT-X-293",
														}),
													),
													typeCode: pipe(
														text(),
														metadata({
															id: "BT-X-294",
														}),
													),
													exemptionReason: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-295",
														}),
													),
													categoryCode: pipe(
														nullish(code("untdid5305")),
														metadata({
															id: "BT-X-296",
														}),
													),
													exemptionReasonCode: pipe(
														nullish(code("vatex")),
														metadata({
															id: "BT-X-297",
														}),
													),
													rateApplicablePercent: pipe(
														percentage(),
														metadata({
															id: "BT-X-298",
														}),
													),
												}),
											),
											minLength(1),
											metadata({
												id: "BG-X-46",
											}),
										),
										precendingInvoice: pipe(
											nullish(
												object({
													issuerAssignedId: pipe(
														documentReference(),
														metadata({
															id: "BT-X-558",
														}),
													),
													typeCode: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-559",
														}),
													),
													date: pipe(
														nullish(date()),
														metadata({
															id: ["BT-X-560", "BT-X-560-00", "BT-X-560-0"],
														}),
													),
												}),
											),
											metadata({
												id: "BG-X-85",
											}),
										),
									}),
								),
							),
							metadata({
								id: "BG-X-45",
							}),
						),
					}),
				),
				metadata({
					id: "BG-19",
					description: "A group of business terms to specify a direct debit.",
				}),
			),
		}),
	),
	metadata({
		id: "BG-25-00",
	}),
);

export const schema = defineProfileSchema(
	pipeAsync(
		objectAsync({
			processControl,
			exchangedDocument,
			transaction,
		} as {
			processControl: typeof processControl;
			exchangedDocument: typeof exchangedDocument;
			transaction: typeof transaction;
		}),
		metadata({
			id: "BG-0",
		}),
	),
);
