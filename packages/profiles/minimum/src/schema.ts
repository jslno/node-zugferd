import "@node-zugferd/codelist-untdid-1001";
import "@node-zugferd/codelist-currency";
import "@node-zugferd/codelist-country";
import {
	amount,
	code,
	date,
	documentReference,
	identifier,
	metadata,
	nullish,
	object,
	pipe,
	text,
} from "@node-zugferd/data-types";
import { defineProfileSchema } from "@node-zugferd/utils";

export const schema = defineProfileSchema(
	pipe(
		object({
			processControl: pipe(
				nullish(
					object({
						businessContextInfo: pipe(
							nullish(
								object({
									processType: pipe(
										nullish(text()),
										metadata({
											id: "BT-23",
											description:
												"A group of business terms providing information on the business process and rules applicable to the Invoice document.",
										}),
									),
								}),
							),
							metadata({
								id: "BT-23-00",
							}),
						),
						applicationRecommendationInfo: pipe(
							nullish(
								object({
									specificationIdentifier: pipe(
										nullish(
											identifier({
												requireSchemeId: "never",
											}),
										),
										metadata({
											id: "BT-24",
											description:
												"A group of business terms providing information on the business process and rules applicable to the Invoice document.",
										}),
									),
								}),
							),
							metadata({
								id: "BT-24-00",
							}),
						),
					}),
				),
				metadata({
					id: "BG-2",
					description:
						"A group of business terms providing information on the business process and rules applicable to the Invoice document.",
				}),
			),
			exchangedDocument: pipe(
				nullish(
					object({
						invoiceNumber: pipe(
							identifier({
								requireSchemeId: "never",
							}),
							metadata({
								id: "BT-1",
								description: "A unique identification of the Invoice.",
							}),
						),
						invoiceTypeCode: pipe(
							code("untdid1001"),
							metadata({
								id: "BT-3",
								description:
									"A code specifying the functional type of the Invoice.",
							}),
						),
						invoiceIssueDate: pipe(
							date(),
							metadata({
								id: ["BT-2-00", "BT-2"],
								description: "The date when the Invoice was issued.",
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
									buyerReference: pipe(
										nullish(text()),
										metadata({
											id: "BT-10",
											description:
												"An identifier assigned by the Buyer used for internal routing purposes.",
										}),
									),
									seller: pipe(
										object({
											name: pipe(
												text(),
												metadata({
													id: "BT-27",
													description:
														"The full formal name by which the Seller is registered in the national registry of legal entities or as a Taxable person or otherwise trades as a person or persons.",
												}),
											),
											organization: pipe(
												nullish(
													object({
														id: pipe(
															nullish(identifier("ISO/IEC-6523")),
															metadata({
																id: ["BT-30", "BT-30-1"],
																description:
																	"An identifier issued by an official registrar that identifies the Seller as a legal entity or person.",
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
													countryCode: pipe(
														code("country"),
														metadata({
															id: "BT-40",
															description:
																"A code that identifies the country.",
														}),
													),
												}),
												metadata({
													id: "BG-5",
													description:
														"A group of business terms providing information about the address of the Seller.",
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
																		id: ["BT-31", "BT-31-0"],
																		description:
																			"The Seller's VAT identifier (also known as Seller VAT identification number).",
																	}),
																),
															}),
														),
														metadata({
															id: "BT-31-00",
															description:
																"Detailed information on tax information of the seller",
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
																		id: ["BT-32", "BT-32-0"],
																		description:
																			"The local identification (defined by the Seller’s address) of the Seller for tax purposes or a reference that enables the Seller to state his registered tax status.",
																	}),
																),
															}),
														),
														metadata({
															id: "BT-32-00",
															description:
																"Detailed information on tax information of the seller",
														}),
													),
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
											name: pipe(
												text(),
												metadata({
													id: "BT-44",
													description: "The full name of the Buyer.",
												}),
											),
											organization: pipe(
												nullish(
													object({
														id: pipe(
															nullish(identifier("ISO/IEC-6523")),
															metadata({
																id: ["BT-47", "BT-47-1"],
																description:
																	"An identifier issued by an official registrar that identifies the Buyer as a legal entity or person.",
															}),
														),
													}),
												),
												metadata({
													id: "BT-47-00",
													description: "Details about the organization",
												}),
											),
										}),
										metadata({
											id: "BG-7",
											description:
												"A group of business terms providing information about the Buyer.",
										}),
									),
									associatedOrder: pipe(
										nullish(
											object({
												issuerAssignedId: pipe(
													nullish(documentReference()),
													metadata({
														id: "BT-13",
														description:
															"An identifier of a referenced purchase order, issued by the Buyer.",
													}),
												),
											}),
										),
										metadata({
											id: "BT-13-00",
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
							nullish(object({})),
							metadata({
								id: "BG-13-00",
							}),
						),
						debit: pipe(
							nullish(
								object({
									invoiceCurrencyCode: pipe(
										code("currency"),
										metadata({
											id: "BT-5",
											description:
												"The currency in which all Invoice amounts are given, except for the Total VAT amount in accounting currency.",
										}),
									),
									documentTotals: pipe(
										object({
											taxBasisTotalAmount: pipe(
												amount({ requireCurrency: "never" }),
												metadata({
													id: "BT-109",
													description:
														"The total amount of the Invoice without VAT.",
												}),
											),
											taxTotalAmount: pipe(
												nullish(amount({ requireCurrency: "always" })),
												metadata({
													id: ["BT-110", "BT-110-0"],
													description: "The total VAT amount for the Invoice.",
												}),
											),
											grandTotalAmount: pipe(
												amount({ requireCurrency: "never" }),
												metadata({
													id: "BT-112",
													description:
														"The total amount of the Invoice with VAT.",
												}),
											),
											duePayableAmount: pipe(
												amount({ requireCurrency: "never" }),
												metadata({
													id: "BT-115",
													description:
														"The outstanding amount that is requested to be paid.",
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
