import {
	amount,
	array,
	code,
	date,
	documentReference,
	getObjectEntries,
	identifier,
	metadata,
	nullish,
	object,
	percentage,
	pipe,
	quantity,
	text,
	unitPriceAmount,
	unwrapSchema,
} from "@node-zugferd/data-types";
import type { StandardSchemaV1 } from "@standard-schema/spec";

type AnySchema = {
	readonly type?: string;
	readonly item?: AnySchema;
	readonly entries?: Record<string, AnySchema>;
	readonly wrapped?: AnySchema;
	readonly pipe?: readonly AnySchema[];
};

type Selection = true | { readonly [key: string]: Selection };

export const extractionSchema = object({
	exchangedDocument: object({
		invoiceNotes: array(
			object({
				subjectCode: pipe(
					nullish(code("text")),
					metadata({
						id: "BT-21",
						description:
							"The subject of the textual note in BT-22. To be chosen from UNTDID 4451 codes.",
					}),
				),
				content: pipe(
					text(),
					metadata({
						id: "BT-22",
						description:
							"A textual note that gives unstructured information that is relevant to the invoice as a whole.",
					}),
				),
			}),
		),
	}),
	transaction: object({
		invoiceNumber: pipe(
			nullish(text()),
			metadata({
				id: "BT-1",
				description:
					"A unique identification of the invoice. The sequential number required in Article 226(2) of the EU VAT Directive. It uniquely identifies the invoice within the seller business context.",
			}),
		),
		invoiceIssueDate: pipe(
			nullish(date()),
			metadata({
				id: "BT-2",
				description: "The date when the invoice was issued.",
			}),
		),
		invoiceTypeCode: pipe(
			nullish(code("untdid1001")),
			metadata({
				id: "BT-3",
				description:
					"A code specifying the functional type of the invoice. Common values: 380 (Commercial Invoice), 381 (Credit Note), 389 (Self-billed Invoice).",
			}),
		),
		invoiceCurrencyCode: pipe(
			nullish(code("currency")),
			metadata({
				id: "BT-5",
				description:
					"The currency in which all invoice amounts are given, except for the VAT accounting currency. Uses ISO 4217 codes (e.g. EUR, USD, GBP).",
			}),
		),
		taxCurrencyCode: pipe(
			nullish(code("currency")),
			metadata({
				id: "BT-6",
				description:
					"The currency used for VAT accounting and reporting purposes as accepted or required in the country of the seller. Uses ISO 4217 codes.",
			}),
		),
		applicableTradeTax: nullish(
			object({
				taxPointDate: pipe(
					nullish(date()),
					metadata({
						id: "BT-7",
						description:
							"The date when the VAT becomes applicable for the seller and the buyer. Also known as the tax point or time of supply.",
					}),
				),
				dueDateTypeCode: pipe(
					nullish(code("time")),
					metadata({
						id: "BT-8",
						description:
							"The code of the date when the VAT becomes applicable for the seller and the buyer. Uses UNTDID 2005 codes: 3 (Invoice date), 35 (Delivery date), 432 (Payment date).",
					}),
				),
			}),
		),
		paymentDueDate: pipe(
			nullish(date()),
			metadata({
				id: "BT-9",
				description:
					"The date when the payment is due. The payment due date reflects the net payment terms, not the early payment discount date.",
			}),
		),
		buyerReference: pipe(
			nullish(text()),
			metadata({
				id: "BT-10",
				description:
					"An identifier assigned by the buyer used for internal routing purposes.",
			}),
		),
		projectReference: pipe(
			nullish(identifier()),
			metadata({
				id: "BT-11",
				description: "The identification of the project the invoice refers to.",
			}),
		),
		contractReference: pipe(
			nullish(identifier()),
			metadata({
				id: "BT-12",
				description:
					"The identification of a contract. The contract identifier should be unique in the context of the specific trading relationship between the seller and the buyer.",
			}),
		),
		purchaseOrderReference: pipe(
			nullish(identifier()),
			metadata({
				id: "BT-13",
				description:
					"An identifier of a referenced purchase order, issued by the buyer. Used to link the invoice to a specific purchase order.",
			}),
		),
		salesOrderReference: pipe(
			nullish(identifier()),
			metadata({
				id: "BT-14",
				description:
					"An identifier of a referenced sales order, issued by the seller.",
			}),
		),
		receivingAdviceReference: pipe(
			nullish(identifier()),
			metadata({
				id: "BT-15",
				description: "An identifier of a referenced receiving advice.",
			}),
		),
		despatchAdviceReference: pipe(
			nullish(identifier()),
			metadata({
				id: "BT-16",
				description: "An identifier of a referenced despatch advice.",
			}),
		),
		tenderOrLotReference: pipe(
			nullish(identifier()),
			metadata({
				id: "BT-17",
				description:
					"The identification of the call for tender or lot the invoice relates to.",
			}),
		),
		invoicedObjectIdentifier: pipe(
			nullish(identifier()),
			metadata({
				id: "BT-18",
				description:
					"An identifier for an object on which the invoice is based, given by the seller. It may be a subscription number, meter point, vehicle, etc.",
			}),
		),
		buyerAccountingReference: pipe(
			nullish(text()),
			metadata({
				id: "BT-19",
				description:
					"A textual value that specifies where to book the relevant data into the buyer accounting system.",
			}),
		),
		paymentTerms: pipe(
			nullish(text()),
			metadata({
				id: "BT-20",
				description:
					"A textual description of the payment terms that apply to the amount due for payment.",
			}),
		),
		seller: nullish(
			object({
				name: pipe(
					nullish(text()),
					metadata({
						id: "BT-27",
						description:
							"The full formal name by which the seller is registered in the national registry of legal entities or as a taxable person or otherwise trades as a person or persons.",
					}),
				),
				globalId: pipe(
					nullish(array(identifier())),
					metadata({
						id: "BT-29",
						description:
							"An identification of the seller. A seller identifier with a scheme identifier can be used. Examples: DUNS, GLN, etc.",
					}),
				),
				organization: nullish(
					object({
						tradingName: pipe(
							nullish(text()),
							metadata({
								id: "BT-28",
								description:
									"A name by which the seller is known, other than the seller name (also known as the business name).",
							}),
						),
						id: pipe(
							nullish(identifier()),
							metadata({
								id: "BT-30",
								description:
									"An identifier issued by an official registrar that identifies the seller as a legal entity or person. In Belgium, this is typically the KBO/BCE number.",
							}),
						),
					}),
				),
				vatTaxIdentifier: pipe(
					nullish(identifier()),
					metadata({
						id: "BT-31",
						description:
							"The seller VAT identifier (also known as the seller VAT identification number). Format: country code prefix + number, e.g. DE0123456789.",
					}),
				),
				localTaxIdentifier: pipe(
					nullish(identifier()),
					metadata({
						id: "BT-32",
						description:
							"The local identification (defined by the seller address country) of the seller for tax purposes or a reference that enables the seller to state the registered tax status.",
					}),
				),
				description: pipe(
					nullish(text()),
					metadata({
						id: "BT-33",
						description:
							"Additional legal information relevant for the seller, such as share capital.",
					}),
				),
				electronicAddress: pipe(
					nullish(identifier()),
					metadata({
						id: "BT-34",
						description:
							"Identifies the seller electronic address to which the application level response to the invoice may be delivered.",
					}),
				),
				postalAddress: nullish(
					object({
						line1: pipe(
							nullish(text()),
							metadata({
								id: "BT-35",
								description:
									"The main address line in an address. Usually the street name and number.",
							}),
						),
						line2: pipe(
							nullish(text()),
							metadata({
								id: "BT-36",
								description:
									"An additional address line in an address that can be used for additional details.",
							}),
						),
						line3: pipe(
							nullish(text()),
							metadata({
								id: "BT-162",
								description:
									"An additional address line in an address that can be used for additional details.",
							}),
						),
						city: pipe(
							nullish(text()),
							metadata({
								id: "BT-37",
								description:
									"The common name of the city, town or village where the seller address is located.",
							}),
						),
						postCode: pipe(
							nullish(text()),
							metadata({
								id: "BT-38",
								description:
									"The identifier for an addressable group of properties according to the postal service.",
							}),
						),
						countrySubdivision: pipe(
							nullish(text()),
							metadata({
								id: "BT-39",
								description:
									"The subdivision of a country, such as a region, state, province, etc.",
							}),
						),
						countryCode: pipe(
							nullish(code("country")),
							metadata({
								id: "BT-40",
								description:
									"A code that identifies the country. Uses ISO 3166-1 alpha-2 codes (e.g. DE, FR, BL, NL).",
							}),
						),
					}),
				),
				contact: nullish(
					object({
						personName: pipe(
							nullish(text()),
							metadata({
								id: "BT-41",
								description:
									"A contact point for a legal entity or person. Such as a person name, a department, or office name.",
							}),
						),
						phoneNumber: pipe(
							nullish(text()),
							metadata({
								id: "BT-42",
								description: "A phone number for the contact point.",
							}),
						),
						emailAddress: pipe(
							nullish(text()),
							metadata({
								id: "BT-43",
								description: "An e-mail address for the contact point.",
							}),
						),
					}),
				),
			}),
		),
		buyer: nullish(
			object({
				name: pipe(
					nullish(text()),
					metadata({
						id: "BT-44",
						description: "The full name of the buyer.",
					}),
				),
				globalId: pipe(
					nullish(identifier()),
					metadata({
						id: "BT-46",
						description:
							"An identifier of the buyer. Can be a GLN, DUNS, or other identification scheme.",
					}),
				),
				organization: nullish(
					object({
						tradingName: pipe(
							nullish(text()),
							metadata({
								id: "BT-45",
								description:
									"A name by which the buyer is known, other than the buyer name (also known as the business name).",
							}),
						),
						id: pipe(
							nullish(identifier()),
							metadata({
								id: "BT-47",
								description:
									"An identifier issued by an official registrar that identifies the buyer as a legal entity or person.",
							}),
						),
					}),
				),
				vatTaxIdentifier: pipe(
					nullish(identifier()),
					metadata({
						id: "BT-48",
						description:
							"The buyer VAT identifier (also known as the buyer VAT identification number).",
					}),
				),
				electronicAddress: pipe(
					nullish(identifier()),
					metadata({
						id: "BT-49",
						description:
							"Identifies the buyer electronic address to which the invoice is delivered.",
					}),
				),
				postalAddress: nullish(
					object({
						line1: pipe(
							nullish(text()),
							metadata({
								id: "BT-50",
								description:
									"The main address line in an address. Usually the street name and number.",
							}),
						),
						line2: pipe(
							nullish(text()),
							metadata({
								id: "BT-51",
								description:
									"An additional address line in an address that can be used for additional details.",
							}),
						),
						line3: pipe(
							nullish(text()),
							metadata({
								id: "BT-163",
								description:
									"An additional address line in an address that can be used for additional details.",
							}),
						),
						city: pipe(
							nullish(text()),
							metadata({
								id: "BT-52",
								description:
									"The common name of the city, town or village where the buyer address is located.",
							}),
						),
						postCode: pipe(
							nullish(text()),
							metadata({
								id: "BT-53",
								description:
									"The identifier for an addressable group of properties according to the postal service.",
							}),
						),
						countrySubdivision: pipe(
							nullish(text()),
							metadata({
								id: "BT-54",
								description:
									"The subdivision of a country, such as a region, state, province, etc.",
							}),
						),
						countryCode: pipe(
							nullish(code("country")),
							metadata({
								id: "BT-55",
								description:
									"A code that identifies the country. Uses ISO 3166-1 alpha-2 codes (e.g. DE, FR, BL, NL).",
							}),
						),
					}),
				),
			}),
		),
		payee: nullish(
			object({
				name: pipe(
					nullish(text()),
					metadata({
						id: "BT-59",
						description:
							"The name of the payee. Must be used when the payee is different from the seller.",
					}),
				),
				globalId: pipe(
					nullish(identifier()),
					metadata({
						id: "BT-60",
						description: "An identifier for the payee.",
					}),
				),
				organization: nullish(
					object({
						id: pipe(
							nullish(identifier()),
							metadata({
								id: "BT-61",
								description:
									"An identifier issued by an official registrar that identifies the payee as a legal entity or person.",
							}),
						),
					}),
				),
			}),
		),
		delivery: nullish(
			object({
				name: pipe(
					nullish(text()),
					metadata({
						id: "BT-70",
						description:
							"The name of the party to which the goods and services are delivered.",
					}),
				),
				globalId: pipe(
					nullish(identifier()),
					metadata({
						id: "BT-71",
						description:
							"An identifier for the location at which the goods and services are delivered. Can be a GLN.",
					}),
				),
				actualDeliveryDate: pipe(
					nullish(date()),
					metadata({
						id: "BT-72",
						description:
							"The date on which the supply of goods or services was made or completed.",
					}),
				),
				postalAddress: nullish(
					object({
						line1: pipe(
							nullish(text()),
							metadata({
								id: "BT-75",
								description: "The main address line in a delivery address.",
							}),
						),
						city: pipe(
							nullish(text()),
							metadata({
								id: "BT-77",
								description: "The common name of the city, town or village.",
							}),
						),
						postCode: pipe(
							nullish(text()),
							metadata({
								id: "BT-78",
								description:
									"The identifier for an addressable group of properties.",
							}),
						),
						countrySubdivision: pipe(
							nullish(text()),
							metadata({
								id: "BT-79",
								description: "The subdivision of a country.",
							}),
						),
						countryCode: pipe(
							nullish(code("country")),
							metadata({
								id: "BT-80",
								description:
									"A code that identifies the country. Uses ISO 3166-1 alpha-2 codes.",
							}),
						),
					}),
				),
			}),
		),
		paymentMeans: nullish(
			object({
				typeCode: pipe(
					nullish(code("payment")),
					metadata({
						id: "BT-81",
						description:
							"The means, expressed as a code, for how a payment is expected to be or has been settled. Uses UNTDID 4461 codes. Common values: 30 (Credit transfer), 58 (SEPA credit transfer), 49 (Direct debit).",
					}),
				),
				information: pipe(
					nullish(text()),
					metadata({
						id: "BT-82",
						description:
							"The means, expressed as text, for how a payment is expected to be or has been settled.",
					}),
				),
				remittanceInformation: pipe(
					nullish(text()),
					metadata({
						id: "BT-83",
						description:
							"A textual value used to establish a link between the payment and the invoice, issued by the seller.",
					}),
				),
				creditTransfer: nullish(
					object({
						iban: pipe(
							nullish(identifier()),
							metadata({
								id: "BT-84",
								description:
									"A unique identifier of the financial payment account, at a payment service provider, to which payment should be made. Typically an IBAN.",
							}),
						),
						accountName: pipe(
							nullish(text()),
							metadata({
								id: "BT-85",
								description:
									"The name of the payment account, at a payment service provider, to which payment should be made.",
							}),
						),
						bic: pipe(
							nullish(identifier()),
							metadata({
								id: "BT-86",
								description:
									"An identifier for the payment service provider where a payment account is located. Typically a BIC or SWIFT code.",
							}),
						),
					}),
				),
			}),
		),
		allowances: nullish(
			array(
				object({
					actualAmount: pipe(
						nullish(amount()),
						metadata({
							id: "BT-92",
							description: "The amount of an allowance, without VAT.",
						}),
					),
					basisAmount: pipe(
						nullish(amount()),
						metadata({
							id: "BT-93",
							description:
								"The base amount that may be used, in conjunction with the document level allowance percentage, to calculate the document level allowance amount.",
						}),
					),
					calculationPercent: pipe(
						nullish(percentage()),
						metadata({
							id: "BT-94",
							description:
								"The percentage that may be used, in conjunction with the document level allowance base amount, to calculate the document level allowance amount.",
						}),
					),
					categoryTradeTax: nullish(
						object({
							categoryCode: pipe(
								nullish(code("untdid5305")),
								metadata({
									id: "BT-95",
									description:
										"A coded identification of what VAT category applies to the document level allowance. Uses UNTDID 5305 codes (S, Z, E, AE, K, G, O, L, M).",
								}),
							),
							rateApplicablePercent: pipe(
								nullish(percentage()),
								metadata({
									id: "BT-96",
									description:
										"The VAT rate, represented as a percentage, applicable to the document level allowance.",
								}),
							),
							reason: pipe(
								nullish(text()),
								metadata({
									id: "BT-97",
									description:
										"The reason for the document level allowance, expressed as text.",
								}),
							),
							reasonCode: pipe(
								nullish(code("allowance")),
								metadata({
									id: "BT-98",
									description:
										"The reason for the document level allowance, expressed as a code. Uses UNTDID 5189 codes.",
								}),
							),
						}),
					),
				}),
			),
		),
		monetarySummation: nullish(
			object({
				lineTotalAmount: pipe(
					nullish(amount()),
					metadata({
						id: "BT-106",
						description:
							"Sum of all invoice line net amounts in the invoice. Must equal the sum of all BT-131 values.",
					}),
				),
				allowanceTotalAmount: pipe(
					nullish(amount()),
					metadata({
						id: "BT-107",
						description:
							"Sum of all allowances on document level in the invoice.",
					}),
				),
				chargeTotalAmount: pipe(
					nullish(amount()),
					metadata({
						id: "BT-108",
						description: "Sum of all charges on document level in the invoice.",
					}),
				),
				taxBasisTotalAmount: pipe(
					nullish(amount()),
					metadata({
						id: "BT-109",
						description:
							"The total amount of the invoice without VAT. BT-106 - BT-107 + BT-108.",
					}),
				),
				taxTotalAmount: pipe(
					nullish(amount()),
					metadata({
						id: "BT-110",
						description: "The total VAT amount for the invoice.",
					}),
				),
				grandTotalAmount: pipe(
					nullish(amount()),
					metadata({
						id: "BT-112",
						description:
							"The total amount of the invoice with VAT. BT-109 + BT-110.",
					}),
				),
				prepaidAmount: pipe(
					nullish(amount()),
					metadata({
						id: "BT-113",
						description:
							"The sum of amounts which have been paid in advance. This amount is subtracted from the invoice total amount with VAT to determine the amount due for payment.",
					}),
				),
				roundingAmount: pipe(
					nullish(amount()),
					metadata({
						id: "BT-114",
						description:
							"The amount to be added to the invoice total to round the amount to be paid.",
					}),
				),
				duePayableAmount: pipe(
					nullish(amount()),
					metadata({
						id: "BT-115",
						description:
							"The outstanding amount that is requested to be paid. BT-112 - BT-113 + BT-114.",
					}),
				),
			}),
		),
		vatBreakdown: nullish(
			object({
				basisAmount: pipe(
					nullish(amount()),
					metadata({
						id: "BT-116",
						description:
							"Sum of all taxable amounts subject to a specific VAT category code and VAT category rate.",
					}),
				),
				calculatedAmount: pipe(
					nullish(amount()),
					metadata({
						id: "BT-117",
						description: "The total VAT amount for a given VAT category.",
					}),
				),
				categoryCode: pipe(
					nullish(code("untdid5305")),
					metadata({
						id: "BT-118",
						description:
							"Coded identification of a VAT category. Uses UNTDID 5305 codes: S (Standard), Z (Zero rated), E (Exempt), AE (Reverse charge), K (Intra-community), G (Export), O (Not subject to VAT).",
					}),
				),
				rateApplicablePercent: pipe(
					nullish(percentage()),
					metadata({
						id: "BT-119",
						description:
							"The VAT rate, represented as a percentage that applies for the relevant VAT category.",
					}),
				),
				exemptionReason: pipe(
					nullish(text()),
					metadata({
						id: "BT-120",
						description:
							"A textual statement of the reason why the amount is exempted from VAT or why no VAT is being charged.",
					}),
				),
				exemptionReasonCode: pipe(
					nullish(code("vatex")),
					metadata({
						id: "BT-121",
						description:
							"A coded statement of the reason for why the amount is exempted from VAT. Uses the CEF VATEX code list.",
					}),
				),
			}),
		),
		line: nullish(
			array(
				object({
					position: nullish(
						object({
							lineId: pipe(
								nullish(identifier()),
								metadata({
									id: "BT-126",
									description:
										"A unique identifier for the individual line within the invoice. Line IDs should be sequential (1, 2, 3, ...).",
								}),
							),
							includedNote: pipe(
								nullish(text()),
								metadata({
									id: "BT-127",
									description:
										"A textual note that gives unstructured information that is relevant to the invoice line.",
								}),
							),
						}),
					),
					billing: nullish(
						object({
							additionalReferencedDocument: nullish(
								object({
									issuerAssignedId: pipe(
										nullish(identifier()),
										metadata({
											id: "BT-128",
											description:
												"An identifier for an object on which the invoice line is based, given by the seller.",
										}),
									),
								}),
							),
							itemTotals: nullish(
								object({
									lineTotalAmount: pipe(
										nullish(amount()),
										metadata({
											id: "BT-131",
											description:
												"The total amount of the invoice line. This is the quantity times the price, after all allowances and charges on line level.",
										}),
									),
								}),
							),
							accountingReferenceId: pipe(
								nullish(text()),
								metadata({
									id: "BT-133",
									description:
										"A textual value that specifies where to book the relevant data into the buyer accounting system.",
								}),
							),
							vatBreakdown: nullish(
								object({
									categoryCode: pipe(
										nullish(code("untdid5305")),
										metadata({
											id: "BT-151",
											description:
												"The VAT category code for the invoiced item. Uses UNTDID 5305 codes (S, Z, E, AE, K, G, O, L, M).",
										}),
									),
									rateApplicablePercent: pipe(
										nullish(percentage()),
										metadata({
											id: "BT-152",
											description:
												"The VAT rate, represented as a percentage, applicable to the item.",
										}),
									),
								}),
							),
						}),
					),
					item: nullish(
						object({
							name: pipe(
								nullish(text()),
								metadata({
									id: "BT-153",
									description: "A name for an item.",
								}),
							),
							description: pipe(
								nullish(text()),
								metadata({
									id: "BT-153",
									description: "A name for an item.",
								}),
							),
							sellerAssignedId: pipe(
								nullish(identifier()),
								metadata({
									id: "BT-155",
									description:
										"An identifier, assigned by the seller, for the item.",
								}),
							),
							buyerAssignedId: pipe(
								nullish(identifier()),
								metadata({
									id: "BT-156",
									description:
										"An identifier, assigned by the buyer, for the item.",
								}),
							),
							globalId: pipe(
								nullish(identifier()),
								metadata({
									id: "BT-157",
									description:
										"An item identifier based on a registered scheme. Can be GTIN (EAN), ISBN, etc.",
								}),
							),
							classCode: pipe(
								nullish(array(identifier())),
								metadata({
									id: "BT-158",
									description:
										"A code for classifying the item by its type or nature. Can use CPV, UNSPSC, eCl@ss, etc.",
								}),
							),
							originTradeCountry: pipe(
								nullish(code("country")),
								metadata({
									id: "BT-159",
									description:
										"The code identifying the country from which the item originates. Uses ISO 3166-1 alpha-2 codes.",
								}),
							),
						}),
					),
					delivery: nullish(
						object({
							billedQuantity: pipe(
								nullish(quantity({ requireUnitCode: "always" })),
								metadata({
									id: ["BT-129", "BT-130"],
									description:
										"The quantity of items (goods or services) that is charged in the invoice line and the unit of measure that applies to the invoiced quantity. Uses UN/ECE Recommendation 20 codes (e.g. C62 for unit, HUR for hour, KGM for kilogram).",
								}),
							),
						}),
					),
					priceDetails: nullish(
						object({
							associatedOrder: nullish(
								object({
									lineId: pipe(
										nullish(documentReference()),
										metadata({
											id: "BT-132",
											description:
												"An identifier for a referenced line within a purchase order, issued by the buyer.",
										}),
									),
								}),
							),
							grossPrice: nullish(
								object({
									chargeAmount: pipe(
										nullish(unitPriceAmount()),
										metadata({
											id: "BT-148",
											description:
												"Item unit price before discount, not the line total.",
										}),
									),
									discount: nullish(
										object({
											actualAmount: pipe(
												nullish(unitPriceAmount()),
												metadata({
													id: "BT-147",
													description:
														"The total discount subtracted from the item gross price to calculate the item net price.",
												}),
											),
										}),
									),
								}),
							),
							netPrice: nullish(
								object({
									chargeAmount: pipe(
										nullish(unitPriceAmount()),
										metadata({
											id: "BT-146",
											description:
												"Item unit price after discount, not the line total.",
										}),
									),
									basisQuantity: pipe(
										nullish(quantity({ requireUnitCode: "optional" })),
										metadata({
											id: ["BT-149", "BT-150"],
											description:
												"The number of item units to which the price applies. For example, if the price is for a pack of 10, this value is 10. And, if applicable, the unit of measure that applies to the item price base quantity. Uses UN/ECE Recommendation 20 codes.",
										}),
									),
								}),
							),
						}),
					),
				}),
			),
		),
	}),
});

function asAnySchema(schema: unknown): AnySchema {
	return schema as AnySchema;
}

function isNullish(schema: AnySchema): boolean {
	return schema.type === "nullish" && schema.wrapped !== undefined;
}

function selectSchema(schema: AnySchema, selection: Selection): AnySchema {
	if (selection === true) return schema;

	if (schema.pipe && schema.pipe.length > 0) {
		return {
			...schema,
			pipe: [selectSchema(schema.pipe[0]!, selection), ...schema.pipe.slice(1)],
		};
	}

	if (isNullish(schema)) {
		return {
			...schema,
			wrapped: selectSchema(schema.wrapped!, selection),
		};
	}

	const core = asAnySchema(unwrapSchema(schema as never));

	if (core.type === "object") {
		const entries = getObjectEntries(schema as never) ?? {};
		const projected: Record<string, AnySchema> = {};

		for (const [key, child] of Object.entries(selection)) {
			const entry = entries[key];
			if (entry) projected[key] = selectSchema(asAnySchema(entry), child);
		}

		return object(projected as never) as unknown as AnySchema;
	}

	if (core.type === "array" && core.item) {
		return {
			...schema,
			item: selectSchema(core.item, selection),
		};
	}

	return schema;
}

export function projectSchema(
	schema: StandardSchemaV1,
	paths: readonly string[],
): StandardSchemaV1 {
	const selection: Record<string, Selection> = {};

	for (const path of paths) {
		const keys = path.split(".");
		let current = selection;

		for (let index = 0; index < keys.length; index++) {
			const key = keys[index]!;
			if (index === keys.length - 1) {
				current[key] = true;
			} else {
				if (current[key] === true) break;
				if (current[key] === undefined) current[key] = {};
				current = current[key] as Record<string, Selection>;
			}
		}
	}

	return selectSchema(asAnySchema(schema), selection) as StandardSchemaV1;
}
