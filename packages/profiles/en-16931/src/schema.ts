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
												}),
											),
											buyerAssignedId: pipe(
												nullish(identifier({ requireSchemeId: "never" })),
												metadata({
													id: "BT-156",
												}),
											),
											description: pipe(
												nullish(text()),
												metadata({
													id: "BT-154",
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
																}),
															),
															value: pipe(
																text(),
																metadata({
																	id: "BT-161",
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
													id: ["BT-159-00", "BT-159"],
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
																	}),
																),
																basisAmount: pipe(
																	nullish(amount({ requireCurrency: "never" })),
																	metadata({
																		id: "BT-137",
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
																calculationPercent: pipe(
																	nullish(percentage()),
																	metadata({
																		id: "BT-143",
																	}),
																),
																basisAmount: pipe(
																	nullish(amount({ requireCurrency: "never" })),
																	metadata({
																		id: "BT-142",
																	}),
																),
															}),
														),
													),
													metadata({
														id: "BG-28",
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
																}),
															),
															typeCode: pipe(
																text(),
																metadata({
																	id: "BT-128-0",
																}),
															),
															referenceTypeCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-128-1",
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
												}),
											),
											contact: pipe(
												nullish(
													object({
														personName: pipe(
															nullish(text()),
															metadata({
																id: "BT-41",
															}),
														),
														departmentName: pipe(
															nullish(text()),
															metadata({
																id: "BT-41-0",
															}),
														),
														phoneNumber: pipe(
															nullish(text()),
															metadata({
																id: ["BT-42-00", "BT-42"],
															}),
														),
														emailAddress: pipe(
															nullish(text()),
															metadata({
																id: ["BT-43-00", "BT-43"],
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
															}),
														),
														departmentName: pipe(
															nullish(text()),
															metadata({
																id: "BT-56-0",
															}),
														),
														phoneNumber: pipe(
															nullish(text()),
															metadata({
																id: ["BT-57-00", "BT-57"],
															}),
														),
														emailAddress: pipe(
															nullish(text()),
															metadata({
																id: ["BT-58-00", "BT-58"],
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
														}),
													),
													uri: pipe(
														nullish(text()),
														metadata({
															id: "BT-124",
														}),
													),
													name: pipe(
														nullish(text()),
														metadata({
															id: "BT-123",
														}),
													),
													attachedDocument: pipeAsync(
														nullishAsync(binaryObject()),
														metadata({
															id: ["BT-125", "BT-125-1", "BT-125-2"],
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
											object({
												issuerAssignedId: pipe(
													nullish(documentReference()),
													metadata({
														id: "BT-17",
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
													}),
												),
												// typeCode always "130" (BT-18-0)
												referenceTypeCode: pipe(
													nullish(text()),
													metadata({
														id: "BT-18-1",
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
													}),
												),
												name: pipe(
													text(),
													metadata({
														id: "BT-11-0",
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
													}),
												),
												cardInfo: pipe(
													nullish(
														object({
															accountNumber: pipe(
																text(),
																metadata({
																	id: "BT-87",
																}),
															),
															cardholderName: pipe(
																nullish(text()),
																metadata({
																	id: "BT-88",
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
																	}),
																),
															}),
														),
													),
													metadata({
														id: "BG-17",
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
									documentTotals: pipe(
										object({
											roundingAmount: pipe(
												nullish(amount({ requireCurrency: "never" })),
												metadata({
													id: "BT-114",
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
