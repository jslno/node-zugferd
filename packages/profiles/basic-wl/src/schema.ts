import "@node-zugferd/codelist-text";
import "@node-zugferd/codelist-allowance";
import "@node-zugferd/codelist-country";
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
													description: "An identification of the Seller.",
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
																description:
																	"A name by which the Seller is known, other than Seller name (also known as Business name).",
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
															description:
																"The identifier for an addressable group of properties according to the relevant postal service.",
														}),
													),
													line1: pipe(
														nullish(text()),
														metadata({
															id: "BT-35",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineOne",
															description:
																"The main address line in an address.",
														}),
													),
													line2: pipe(
														nullish(text()),
														metadata({
															id: "BT-36",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
															description:
																"An additional address line in an address that can be used to give further details supplementing the main line.",
														}),
													),
													line3: pipe(
														nullish(text()),
														metadata({
															id: "BT-162",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:LineThree",
															description:
																"An additional address line in an address that can be used to give further details supplementing the main line.",
														}),
													),
													city: pipe(
														nullish(text()),
														metadata({
															id: "BT-37",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CityName",
															description:
																"The common name of the city, town or village, where the Seller address is located.",
														}),
													),
													countrySubdivision: pipe(
														nullish(text()),
														metadata({
															id: "BT-39",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
															description: "The subdivision of a country.",
														}),
													),
												}),
												metadata({
													id: "BG-5",
													description:
														"A group of business terms providing information about the address of the Seller.",
												}),
											),
											electronicAddress: pipe(
												nullish(identifier({ requireSchemeId: "always" })),
												metadata({
													id: ["BT-34", "BT-34-1"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:URIUniversalCommunication/ram:URIID",
													description:
														"Identifies the Seller's electronic address to which a business document may be delivered.",
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
											id: pipe(
												nullish(identifier({ requireSchemeId: "never" })),
												metadata({
													id: "BT-46",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:ID",
													description: "An identifier of the Buyer.",
												}),
											),
											globalId: pipe(
												nullish(identifier()),
												metadata({
													id: ["BT-46-0", "BT-46-1"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:GlobalID",
													description:
														"The identification scheme identifier of the seller is a specific identifier given to the seller by a global registration authority.",
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
															description:
																"The identifier for an addressable group of properties according to the relevant postal service.",
														}),
													),
													line1: pipe(
														nullish(text()),
														metadata({
															id: "BT-50",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineOne",
															description:
																"The main address line in an address.",
														}),
													),
													line2: pipe(
														nullish(text()),
														metadata({
															id: "BT-51",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
															description:
																"An additional address line in an address that can be used to give further details supplementing the main line.",
														}),
													),
													line3: pipe(
														nullish(text()),
														metadata({
															id: "BT-163",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:LineThree",
															description:
																"An additional address line in an address that can be used to give further details supplementing the main line.",
														}),
													),
													city: pipe(
														nullish(text()),
														metadata({
															id: "BT-52",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CityName",
															description:
																"The common name of the city, town or village, where the Seller address is located.",
														}),
													),
													countryCode: pipe(
														code("country"),
														metadata({
															id: "BT-55",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CountryID",
															description:
																"A code that identifies the country.",
														}),
													),
													countrySubdivision: pipe(
														nullish(text()),
														metadata({
															id: "BT-54",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
															description: "The subdivison of a country.",
														}),
													),
												}),
												metadata({
													id: "BG-8",
													description:
														"A group of business terms providing information about the postal address for the Buyer.",
												}),
											),
											electronicAddress: pipe(
												nullish(identifier({ requireSchemeId: "always" })),
												metadata({
													id: ["BT-34", "BT-34-1"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:URIUniversalCommunication/ram:URIID",
													description:
														"Identifies the Buyer's electronic address to which a business document should be delivered.",
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
															description:
																"Detailed information on buyer tax information.",
														}),
													),
												}),
											),
										}),
										metadata({
											id: "BG-7",
											description:
												"A group of business terms providing information about the Buyer.",
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
														description:
															"The full name of the Seller's tax representative party.",
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
																description:
																	"The identifier for an addressable group of properties according to the relevant postal service.",
															}),
														),
														line1: pipe(
															nullish(text()),
															metadata({
																id: "BT-64",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineOne",
																description:
																	"The main address line in an address.",
															}),
														),
														line2: pipe(
															nullish(text()),
															metadata({
																id: "BT-65",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
																description:
																	"An additional address line in an address that can be used to give further details supplementing the main line.",
															}),
														),
														line3: pipe(
															nullish(text()),
															metadata({
																id: "BT-164",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineThree",
																description:
																	"An additional address line in an address that can be used to give further details supplementing the main line.",
															}),
														),
														city: pipe(
															nullish(text()),
															metadata({
																id: "BT-66",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CityName",
																description:
																	"The common name of the city, town or village, where the tax representative address is located.",
															}),
														),
														countryCode: pipe(
															code("country"),
															metadata({
																id: "BT-69",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CountryID",
																description:
																	"A code that identifies the country.",
															}),
														),
														countrySubdivision: pipe(
															nullish(text()),
															metadata({
																id: "BT-68",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
																description: "The subdivison of a country.",
															}),
														),
													}),
													metadata({
														id: "BG-12",
														description:
															"A group of business terms providing information about the postal address for the tax representative party.",
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
											description:
												"A group of business terms providing information about the Seller's tax representative.",
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
								description: "Grouping of contract information",
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
																	description:
																		"The identifier for an addressable group of properties according to the relevant postal service.",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-75",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
																	description:
																		"The main address line in an address.",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-76",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
																	description:
																		"An additional address line in an address that can be used to give further details supplementing the main line.",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-165",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
																	description:
																		"An additional address line in an address that can be used to give further details supplementing the main line.",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-77",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
																	description:
																		"The common name of the city, town or village, where the deliver to address is located.",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-80",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
																	description:
																		"A code that identifies the country.",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-79",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
																	description: "The subdivision of a country.",
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
													date(),
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
									despatchAdvice: pipe(
										nullish(
											object({
												issuerAssignedId: pipe(
													nullish(documentReference()),
													metadata({
														id: "BT-16",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:IssuerAssignedID",
														description:
															"An identifier of a referenced despatch advice.",
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
											description:
												"Unique banking reference identifier of the Payee or Seller assigned by the Payee or Seller bank.",
										}),
									),
									paymentReference: pipe(
										nullish(text()),
										metadata({
											id: "BT-83",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PaymentReference",
											description:
												"A textual value used to establish a link between the payment and the Invoice, issued by the Seller.",
										}),
									),
									taxCurrencyCode: pipe(
										nullish(code("currency")),
										metadata({
											id: "BT-6",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxCurrencyCode",
											description:
												"The currency used for VAT accounting and reporting purposes as accepted or required in the country of the Seller.",
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
											description:
												"A group of business terms providing information about the Payee, i.e. the role that receives the payment.",
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
														description:
															"The means, expressed as code, for how a payment is expected to be or has been settled.",
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
																	description:
																		"The account to be debited by the direct debit.",
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
																		description:
																			"A unique identifier of the financial payment account, at a payment service provider, to which payment should be made.",
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
														description:
															"A group of business terms to specify credit transfer payments.",
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
														description:
															"The total VAT amount for a given VAT category.",
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
														description:
															"A textual statement of the reason why the amount is exempted from VAT or why no VAT is being charged",
													}),
												),
												basisAmount: pipe(
													amount({ requireCurrency: "never" }),
													metadata({
														id: "BT-116",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:BasisAmount",
														description:
															"Sum of all taxable amounts subject to a specific VAT category code and VAT category rate (if the VAT category rate is applicable).",
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
														description:
															"A coded statement of the reason for why the amount is exempted from VAT.",
													}),
												),
												dueDateTypeCode: pipe(
													nullish(code("untdid2005")),
													metadata({
														id: "BT-8",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:DueDateTypeCode",
														description:
															"The code of the date when the VAT becomes accountable for the Seller and for the Buyer.",
													}),
												),
												rateApplicablePercent: pipe(
													nullish(percentage()),
													metadata({
														id: "BT-119",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:RateApplicablePercent",
														description:
															"The VAT rate, represented as percentage that applies for the relevant VAT category.",
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
									invoicingPeriod: pipe(
										nullish(
											object({
												startDate: pipe(
													nullish(date()),
													metadata({
														id: ["BT-73", "BT-73-00", "BT-73-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:StartDateTime/udt:DateTimeString",
														description:
															"The date when the Invoice period starts.",
													}),
												),
												endDate: pipe(
													nullish(date()),
													metadata({
														id: ["BT-74", "BT-74-00", "BT-74-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:EndDateTime/udt:DateTimeString",
														description:
															"The date when the Invoice period ends.",
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
													calculationPercent: pipe(
														nullish(percentage()),
														metadata({
															id: "BT-94",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:CalculationPercent',
															description:
																"The percentage that may be used, in conjunction with the document level allowance base amount, to calculate the document level allowance amount.",
														}),
													),
													basisAmount: pipe(
														nullish(amount({ requireCurrency: "never" })),
														metadata({
															id: "BT-93",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:BasisAmount',
															description:
																"The base amount that may be used, in conjunction with the document level allowance percentage, to calculate the document level allowance amount.",
														}),
													),
													actualAmount: pipe(
														amount({ requireCurrency: "never" }),
														metadata({
															id: "BT-92",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:ActualAmount',
															description:
																"The amount of an allowance, without VAT.",
														}),
													),
													reasonCode: pipe(
														nullish(code("allowance")),
														metadata({
															id: "BT-98",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:ReasonCode',
															description:
																"The reason for the document level allowance, expressed as a code.",
														}),
													),
													reason: pipe(
														nullish(text()),
														metadata({
															id: "BT-97",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:Reason',
															description:
																"The reason for the document level allowance, expressed as text.",
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
																		description:
																			"A coded identification of what VAT category applies to the document level allowance.",
																	}),
																),
																rateApplicablePercent: pipe(
																	nullish(percentage()),
																	metadata({
																		id: "BT-96",
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:CategoryTradeTax/ram:RateApplicablePercent',
																		description:
																			"The VAT rate, represented as percentage that applies to the document level allowance.",
																	}),
																),
															}),
														),
														metadata({
															id: "BT-95-00",
															description: "A finite sequence of characters.",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-20",
											xpath:
												'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]',
											description:
												"A group of business terms providing information about allowances applicable to the Invoice as a whole.",
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
															description:
																"The percentage that may be used, in conjunction with the document level charge base amount, to calculate the document level charge amount.",
														}),
													),
													basisAmount: pipe(
														nullish(amount({ requireCurrency: "never" })),
														metadata({
															id: "BT-100",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:BasisAmount',
															description:
																"The base amount that may be used, in conjunction with the document level charge percentage, to calculate the document level charge amount.",
														}),
													),
													actualAmount: pipe(
														amount({ requireCurrency: "never" }),
														metadata({
															id: "BT-99",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:ActualAmount',
															description:
																"The amount of a charge, without VAT.",
														}),
													),
													reasonCode: pipe(
														nullish(code("charge")),
														metadata({
															id: "BT-105",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:ReasonCode',
															description:
																"The reason for the document level charge, expressed as a code.",
														}),
													),
													reason: pipe(
														nullish(text()),
														metadata({
															id: "BT-104",
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:Reason',
															description:
																"The reason for the document level charge, expressed as text.",
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
																		description:
																			"A coded identification of what VAT category applies to the document level charge.",
																	}),
																),
																rateApplicablePercent: pipe(
																	nullish(percentage()),
																	metadata({
																		id: "BT-103",
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:CategoryTradeTax/ram:RateApplicablePercent',
																		description:
																			"The VAT rate, represented as percentage that applies to the document level charge.",
																	}),
																),
															}),
														),
														metadata({
															id: "BT-102-00",
															description: "A finite sequence of characters.",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-21",
											xpath:
												'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]',
											description:
												"A group of business terms providing information about charges and taxes other than VAT, applicable to the Invoice as a whole.",
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
														description:
															"A textual description of the payment terms that apply to the amount due for payment (Including description of possible penalties).",
													}),
												),
												dueDate: pipe(
													nullish(date()),
													metadata({
														id: ["BT-9", "BT-9-00", "BT-9-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:DueDateDateTime/udt:DateTimeString",
														description: "The date when the payment is due.",
													}),
												),
												mandateId: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-89",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:DirectDebitMandateID",
														description:
															"Unique identifier assigned by the Payee for referencing the direct debit mandate.",
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
													description:
														"Sum of all Invoice line net amounts in the Invoice.",
												}),
											),
											chargeTotalAmount: pipe(
												nullish(amount({ requireCurrency: "never" })),
												metadata({
													id: "BT-108",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:ChargeTotalAmount",
													description:
														"Sum of all charges on document level in the Invoice.",
												}),
											),
											allowanceTotalAmount: pipe(
												nullish(amount({ requireCurrency: "never" })),
												metadata({
													id: "BT-107",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:AllowanceTotalAmount",
													description:
														"Sum of all allowances on document level in the Invoice.",
												}),
											),
											taxTotalAmountAccountingCurrency: pipe(
												nullish(amount({ requireCurrency: "always" })),
												metadata({
													id: ["BT-111", "BT-111-0"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount[@currencyID=../../ram:TaxCurrencyCode]",
													description:
														"The VAT total amount expressed in the accounting currency accepted or required in the country of the Seller.",
												}),
											),
											prepaidAmount: pipe(
												nullish(amount({ requireCurrency: "never" })),
												metadata({
													id: "BT-113",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TotalPrepaidAmount",
													description:
														"The sum of amounts which have been paid in advance.",
												}),
											),
										}),
										metadata({
											id: "BG-22",
											description:
												"A group of business terms providing the monetary totals for the Invoice.",
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
															description:
																"The identification of an Invoice that was previously sent by the Seller.",
														}),
													),
													issueDate: pipe(
														nullish(date()),
														metadata({
															id: ["BT-26", "BT-26-00", "BT-26-0"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
															description:
																"The date when the Preceding Invoice was issued.",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-3",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument",
											description:
												"A group of business terms providing information on one or more preceding Invoices.",
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
														description:
															"A textual value that specifies where to book the relevant data into the Buyer's financial accounts.",
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
