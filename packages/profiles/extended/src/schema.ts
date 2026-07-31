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
import "@node-zugferd/codelist-untdid-5153";
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

const processControl = pipe(
	nullish(
		object({
			testIndicator: pipe(
				nullish(boolean()),
				metadata({
					id: ["BT-X-1", "BT-X-1-00"],
					xpath:
						"/rsm:CrossIndustryInvoice/rsm:ExchangedDocumentContext/ram:TestIndicator/udt:Indicator",
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
					xpath: "/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:Name",
				}),
			),
			copyIndicator: pipe(
				nullish(boolean()),
				metadata({
					id: ["BT-X-3", "BT-X-3-00"],
					xpath:
						"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:CopyIndicator/udt:Indicator",
				}),
			),
			language: pipe(
				nullish(code("language")),
				metadata({
					id: "BT-X-4",
					xpath:
						"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:LanguageID",
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
									xpath:
										"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:IncludedNote/ram:ContentCode",
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
			contractualDueDate: pipe(
				nullish(date()),
				metadata({
					id: ["BT-X-6", "BT-X-6-000", "BT-X-6-00", "BT-X-6-0"],
					xpath:
						"/rsm:CrossIndustryInvoice/rsm:ExchangedDocument/ram:EffectiveSpecifiedPeriod/ram:CompleteDateTime/udt:DateTimeString",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:ParentLineID",
										}),
									),
									lineStatusCode: pipe(
										nullish(code("lineStatus")),
										metadata({
											id: "BT-X-7",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:LineStatusCode",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:LineStatusReasonCode",
										}),
									),
									includedNote: pipe(
										nullish(
											asArray(
												object({
													contentCode: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-9",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:IncludedNote/ram:ContentCode",
														}),
													),
													subjectCode: pipe(
														nullish(code("text")),
														metadata({
															id: ["BT-X-10", "EXT-FR-FE-183"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:IncludedNote/ram:SubjectCode",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BT-127-00",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:AssociatedDocumentLineDocument/ram:IncludedNote",
										}),
									),
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
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ID",
									}),
								),
								industryAssignedId: pipe(
									nullish(identifier({ requireSchemeId: "never" })),
									metadata({
										id: "BT-X-532",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IndustryAssignedID",
									}),
								),
								modelId: pipe(
									nullish(identifier({ requireSchemeId: "never" })),
									metadata({
										id: "BT-X-533",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ModelID",
									}),
								),
								batchId: pipe(
									nullish(asArray(text())),
									metadata({
										id: "BT-X-534",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:BatchID",
									}),
								),
								brandName: pipe(
									nullish(text()),
									metadata({
										id: "BT-X-535",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:BrandName",
									}),
								),
								modelName: pipe(
									nullish(text()),
									metadata({
										id: "BT-X-536",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ModelName",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:TypeCode",
													}),
												),
												description: pipe(
													nullish(text()),
													metadata({
														id: "BT-160",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:Description",
													}),
												),
												valueMeasure: pipe(
													nullish(quantity({ requireUnitCode: "optional" })),
													metadata({
														id: "BT-X-12",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:ValueMeasure",
													}),
												),
												value: pipe(
													nullish(text()),
													metadata({
														id: "BT-161",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic/ram:Value",
													}),
												),
											}),
										),
									),
									metadata({
										id: "BG-32",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ApplicableProductCharacteristic",
									}),
								),
								classification: pipe(
									nullish(
										object({
											className: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-13",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:DesignatedProductClassification/ram:ClassName",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IndividualTradeProductInstance/ram:BatchID",
													}),
												),
												supplierAssignedSerialId: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-X-307",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IndividualTradeProductInstance/ram:SupplierAssignedSerialID",
													}),
												),
											}),
										),
									),
									metadata({
										id: "BG-X-84",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IndividualTradeProductInstance",
									}),
								),
								manufacturer: pipe(
									nullish(
										object({
											id: pipe(
												nullish(
													array(identifier({ requireSchemeId: "never" })),
												),
												metadata({
													id: "BT-X-593",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:ID",
												}),
											),
											globalId: pipe(
												nullish(
													array(identifier({ requireSchemeId: "always" })),
												),
												metadata({
													id: ["BT-X-594", "BT-X-594-0"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:GlobalID",
												}),
											),
											name: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-595",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:Name",
												}),
											),
											roleCode: pipe(
												nullish(code("untdid3035")),
												metadata({
													id: "BT-X-596",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:RoleCode",
												}),
											),
											description: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-597",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:Description",
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
																id: ["BT-X-598", "BT-X-598-0"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
															}),
														),
														tradingName: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-599",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
															}),
														),
													}),
												),
												metadata({
													id: "BT-X-598-00",
												}),
											),
											contact: pipe(
												nullish(
													object({
														personName: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-600",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:DefinedTradeContact/ram:PersonName",
															}),
														),
														departmentName: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-601",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
															}),
														),
														typeCode: pipe(
															nullish(code("untdid3139")),
															metadata({
																id: "BT-X-602",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
															}),
														),
														phoneNumber: pipe(
															nullish(text()),
															metadata({
																id: ["BT-X-603", "BT-X-603-00"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
															}),
														),
														faxNumber: pipe(
															nullish(text()),
															metadata({
																id: ["BT-X-604", "BT-X-604-00"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
															}),
														),
														emailAddress: pipe(
															nullish(text()),
															metadata({
																id: ["BT-X-605", "BT-X-605-00"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
															}),
														),
													}),
												),
												metadata({
													id: "BT-X-94",
												}),
											),
											postalAddress: pipe(
												object({
													postCode: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-606",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
														}),
													),
													line1: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-607",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:PostalTradeAddress/ram:LineOne",
														}),
													),
													line2: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-608",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
														}),
													),
													line3: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-609",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:PostalTradeAddress/ram:LineThree",
														}),
													),
													city: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-610",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:PostalTradeAddress/ram:CityName",
														}),
													),
													countryCode: pipe(
														code("country"),
														metadata({
															id: "BT-X-611",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:PostalTradeAddress/ram:CountryID",
														}),
													),
													countrySubdivision: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-612",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
														}),
													),
												}),
												metadata({
													id: "BG-X-95",
												}),
											),
											electronicAddress: pipe(
												nullish(identifier({ requireSchemeId: "always" })),
												metadata({
													id: ["BT-X-613", "BT-X-613-0"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
																		id: ["BT-X-614", "BT-X-614-0"],
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
																	}),
																),
															}),
														),
														metadata({
															id: "BT-X-614-00",
														}),
													),
													local: pipe(
														nullish(
															object({
																id: pipe(
																	nullish(
																		identifier({
																			requireSchemeId: "never",
																		}),
																	),
																	metadata({
																		id: ["BT-X-615", "BT-X-615-0"],
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:ManufacturerTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
																	}),
																),
															}),
														),
														metadata({
															id: "BT-X-615-00",
														}),
													),
												}),
											),
										}),
									),
									metadata({
										id: "BG-X-93",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:ID",
													}),
												),
												globalId: pipe(
													nullish(
														asArray(identifier({ requireSchemeId: "always" })),
													),
													metadata({
														id: ["BT-X-15", "BT-X-15-1"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:GlobalID",
													}),
												),
												sellerAssignedId: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-X-16",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:SellerAssignedID",
													}),
												),
												buyerAssignedId: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-X-17",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:BuyerAssignedID",
													}),
												),
												industryAssignedId: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-X-309",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:IndustryAssignedID",
													}),
												),
												name: pipe(
													text(),
													metadata({
														id: "BT-X-18",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:Name",
													}),
												),
												description: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-19",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:Description",
													}),
												),
												unitQuantity: pipe(
													nullish(quantity({ requireUnitCode: "optional" })),
													metadata({
														id: "BT-X-20",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct/ram:UnitQuantity",
													}),
												),
											}),
										),
									),
									metadata({
										id: "BG-X-1",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedTradeProduct/ram:IncludedReferencedProduct",
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
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:DeliveryTypeCode",
												}),
											),
											location: pipe(
												nullish(
													object({
														countryCode: pipe(
															code("country"),
															metadata({
																id: "BT-X-565",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:RelevantTradeLocation/ram:CountryID",
															}),
														),
														name: pipe(
															text(),
															metadata({
																id: "BT-X-566",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:RelevantTradeLocation/ram:Name",
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
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:IssuerAssignedID",
												}),
											),
											lineId: pipe(
												nullish(documentReference()),
												metadata({
													id: ["BT-X-538", "EXT-FR-FE-145"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:LineID",
												}),
											),
											date: pipe(
												nullish(date()),
												metadata({
													id: ["BT-X-539", "BT-X-539-00", "BT-X-539-0"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:SellerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
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
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:IssuerAssignedID",
												}),
											),
											date: pipe(
												nullish(date()),
												metadata({
													id: ["BT-X-22", "BT-X-22-00", "BT-X-22-0"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:BuyerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
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
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:IssuerAssignedID",
												}),
											),
											lineId: pipe(
												nullish(documentReference()),
												metadata({
													id: "BT-X-311",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:LineID",
												}),
											),
											date: pipe(
												nullish(date()),
												metadata({
													id: ["BT-X-312", "BT-X-312-00", "BT-X-312-0"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:QuotationReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
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
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:IssuerAssignedID",
												}),
											),
											lineId: pipe(
												nullish(documentReference()),
												metadata({
													id: "BT-X-25",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:LineID",
												}),
											),
											date: pipe(
												nullish(date()),
												metadata({
													id: ["BT-X-26", "BT-X-26-00", "BT-X-26-0"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:IssuerAssignedID",
													}),
												),
												uri: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-28",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:URIID",
													}),
												),
												lineId: pipe(
													nullish(documentReference()),
													metadata({
														id: "BT-X-29",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:LineID",
													}),
												),
												typeCode: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-30",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:TypeCode",
													}),
												),
												name: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-299",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:Name",
													}),
												),
												attachedDocument: pipeAsync(
													nullishAsync(binaryObject()),
													metadata({
														id: ["BT-X-31", "BT-X-31-1", "BT-X-31-2"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:AttachmentBinaryObject",
													}),
												),
												referenceTypeCode: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-32",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:ReferenceTypeCode",
													}),
												),
												date: pipe(
													nullish(date()),
													metadata({
														id: ["BT-X-33", "BT-X-33-00", "BT-X-33-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
													}),
												),
											}),
										),
									),
									metadata({
										id: "BG-X-3",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:AdditionalReferencedDocument",
									}),
								),
								grossPrice: pipe(
									nullish(
										object({
											discount: pipe(
												nullish(
													asArray(
														object({
															calculationPercent: pipe(
																nullish(percentage()),
																metadata({
																	id: "BT-X-34",
																	xpath:
																		'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:CalculationPercent',
																}),
															),
															basisAmount: pipe(
																nullish(unitPriceAmount()),
																metadata({
																	id: "BT-X-35",
																	xpath:
																		'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:BasisAmount',
																}),
															),
															reasonCode: pipe(
																nullish(code("allowance")),
																metadata({
																	id: "BT-X-313",
																	xpath:
																		'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:ReasonCode',
																}),
															),
															reason: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-36",
																	xpath:
																		'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:Reason',
																}),
															),
														}),
													),
												),
												metadata({
													id: "BT-147-00",
													xpath:
														'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]',
												}),
											),
											surcharges: pipe(
												nullish(
													array(
														object({
															calculationPercent: pipe(
																nullish(percentage()),
																metadata({
																	id: "BT-X-300",
																	xpath:
																		'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:CalculationPercent',
																}),
															),
															basisAmount: pipe(
																nullish(unitPriceAmount()),
																metadata({
																	id: "BT-X-301",
																	xpath:
																		'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:BasisAmount',
																}),
															),
															actualAmount: pipe(
																nullish(unitPriceAmount()),
																metadata({
																	id: "BT-X-302",
																	xpath:
																		'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:ActualAmount',
																}),
															),
															reasonCode: pipe(
																nullish(code("charge")),
																metadata({
																	id: "BT-X-314",
																	xpath:
																		'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:ReasonCode',
																}),
															),
															reason: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-303",
																	xpath:
																		'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:Reason',
																}),
															),
														}),
													),
												),
												metadata({
													id: "BT-X-302-00",
													xpath:
														'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:GrossPriceProductTradePrice/ram:AppliedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]',
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:CalculatedAmount",
															}),
														),
														// type code fixed "VAT"
														exemptionReason: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-39",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:ExemptionReason",
															}),
														),
														categoryCode: pipe(
															code("untdid5305"),
															metadata({
																id: "BT-X-40",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:CategoryCode",
															}),
														),
														exemptionReasonCode: pipe(
															nullish(code("vatex")),
															metadata({
																id: "BT-X-41",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:ExemptionReasonCode",
															}),
														),
														rateApplicablePercent: pipe(
															percentage(),
															metadata({
																id: "BT-X-42",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:NetPriceProductTradePrice/ram:IncludedTradeTax/ram:RateApplicablePercent",
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
											id: pipe(
												nullish(
													asArray(identifier({ requireSchemeId: "never" })),
												),
												metadata({
													id: "BT-X-567",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:ID",
												}),
											),
											globalId: pipe(
												nullish(
													asArray(identifier({ requireSchemeId: "optional" })),
												),
												metadata({
													id: ["BT-X-568", "BT-X-568-0"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:GlobalID",
												}),
											),
											name: pipe(
												text(),
												metadata({
													id: "BT-X-569",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:Name",
												}),
											),
											roleCode: pipe(
												nullish(code("untdid3035")),
												metadata({
													id: "BT-X-570",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:RoleCode",
												}),
											),
											description: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-571",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:Description",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
															}),
														),
														tradingName: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-573",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
															}),
														),
													}),
												),
												metadata({
													id: "BT-X-572-00",
												}),
											),
											contact: pipe(
												nullish(
													asArray(
														object({
															personName: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-574",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact/ram:PersonName",
																}),
															),
															departmentName: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-574-1",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
																}),
															),
															typeCode: pipe(
																nullish(code("untdid3139")),
																metadata({
																	id: "BT-X-575",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
																}),
															),
															phoneNumber: pipe(
																nullish(text()),
																metadata({
																	id: ["BT-X-576", "BT-X-576-00"],
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
																}),
															),
															faxNumber: pipe(
																nullish(text()),
																metadata({
																	id: ["BT-X-577", "BT-X-577-00"],
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
																}),
															),
															emailAddress: pipe(
																nullish(text()),
																metadata({
																	id: ["BT-X-578", "BT-X-578-00"],
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
																}),
															),
														}),
													),
												),
												metadata({
													id: "BG-X-91",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:DefinedTradeContact",
												}),
											),
											postalAddress: pipe(
												object({
													postCode: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-579",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
														}),
													),
													line1: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-580",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:PostalTradeAddress/ram:LineOne",
														}),
													),
													line2: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-581",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
														}),
													),
													line3: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-582",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:PostalTradeAddress/ram:LineThree",
														}),
													),
													city: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-583",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:PostalTradeAddress/ram:CityName",
														}),
													),
													countryCode: pipe(
														code("country"),
														metadata({
															id: "BT-X-584",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:PostalTradeAddress/ram:CountryID",
														}),
													),
													countrySubdivison: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-585",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID="VA"]/ram:ID',
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
																		xpath:
																			'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:ItemSellerTradeParty/ram:SpecifiedTaxRegistration[ram:ID/@schemeID="FC"]/ram:ID',
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
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:IssuerAssignedID",
												}),
											),
											lineId: pipe(
												nullish(documentReference()),
												metadata({
													id: "BT-X-44",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:LineID",
												}),
											),
											date: pipe(
												nullish(date()),
												metadata({
													id: ["BT-X-45", "BT-X-45-00", "BT-X-45-0"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
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
										nullish(quantity()),
										metadata({
											id: "BT-X-46",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ChargeFreeQuantity",
										}),
									),
									packageQuantity: pipe(
										nullish(quantity()),
										metadata({
											id: "BT-X-47",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:PackageQuantity",
										}),
									),
									perPackageUnitQuantity: pipe(
										nullish(quantity()),
										metadata({
											id: "BT-X-561",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:PerPackageUnitQuantity",
										}),
									),
									recipient: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-X-48",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:ID",
													}),
												),
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:GlobalID",
													}),
												),
												name: pipe(
													text(),
													metadata({
														id: ["BT-X-50", "EXT-FR-FE-149"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:Name",
													}),
												),
												roleCode: pipe(
													nullish(code("untdid3035")),
													metadata({
														id: "BT-X-541",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:RoleCode",
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
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
																}),
															),
															tradingName: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-52",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
																}),
															),
														}),
													),
													metadata({
														id: "BT-X-51-00",
													}),
												),
												contact: pipe(
													nullish(
														asArray(
															object({
																personName: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-54",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:PersonName",
																	}),
																),
																departmentName: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-54-1",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
																	}),
																),
																typeCode: pipe(
																	nullish(code("untdid3139")),
																	metadata({
																		id: "BT-X-315",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode",
																	}),
																),
																phoneNumber: pipe(
																	nullish(text()),
																	metadata({
																		id: ["BT-X-55", "BT-X-55-00"],
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
																	}),
																),
																faxNumber: pipe(
																	nullish(text()),
																	metadata({
																		id: ["BT-X-56", "BT-X-56-00"],
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
																	}),
																),
																emailAddress: pipe(
																	nullish(text()),
																	metadata({
																		id: ["BT-X-57", "BT-X-57-00"],
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
																	}),
																),
															}),
														),
													),
													metadata({
														id: "BG-X-8",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact",
													}),
												),
												postalAddress: pipe(
													object({
														postCode: pipe(
															nullish(text()),
															metadata({
																id: ["BT-X-58", "EXT-FR-FE-155"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
															}),
														),
														line1: pipe(
															nullish(text()),
															metadata({
																id: ["BT-X-59", "EXT-FR-FE-151"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
															}),
														),
														line2: pipe(
															nullish(text()),
															metadata({
																id: ["BT-X-60", "EXT-FR-FE-152"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
															}),
														),
														line3: pipe(
															nullish(text()),
															metadata({
																id: ["BT-X-61", "EXT-FR-FE-153"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
															}),
														),
														city: pipe(
															nullish(text()),
															metadata({
																id: ["BT-X-62", "EXT-FR-FE-154"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
															}),
														),
														countryCode: pipe(
															code("country"),
															metadata({
																id: ["BT-X-63", "EXT-FR-FE-157"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
															}),
														),
														countrySubdivision: pipe(
															nullish(text()),
															metadata({
																id: ["BT-X-64", "EXT-FR-FE-156"],
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
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
																			xpath:
																				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:ID",
													}),
												),
												globalId: pipe(
													nullish(
														asArray(
															identifier({ requireSchemeId: "optional" }),
														),
													),
													metadata({
														id: ["BT-X-68", "BT-X-68-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:GlobalID",
													}),
												),
												name: pipe(
													text(),
													metadata({
														id: "BT-X-69",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:Name",
													}),
												),
												roleCode: pipe(
													nullish(code("untdid3035")),
													metadata({
														id: "BT-X-542",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:RoleCode",
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
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
																}),
															),
															tradingName: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-71",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
																}),
															),
														}),
													),
													metadata({
														id: "BT-X-70-00",
													}),
												),
												contact: pipe(
													nullish(
														asArray(
															object({
																personName: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-72",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:PersonName",
																	}),
																),
																departmentName: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-72-1",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
																	}),
																),
																typeCode: pipe(
																	nullish(code("untdid3139")),
																	metadata({
																		id: "BT-X-316",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode",
																	}),
																),
																phoneNumber: pipe(
																	nullish(text()),
																	metadata({
																		id: ["BT-X-73", "BT-X-73-00"],
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
																	}),
																),
																faxNumber: pipe(
																	nullish(text()),
																	metadata({
																		id: ["BT-X-74", "BT-X-74-00"],
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
																	}),
																),
																emailAddress: pipe(
																	nullish(text()),
																	metadata({
																		id: ["BT-X-75", "BT-X-75-00"],
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
																	}),
																),
															}),
														),
													),
													metadata({
														id: "BG-X-11",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact",
													}),
												),
												postalAddress: pipe(
													object({
														postCode: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-76",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
															}),
														),
														line1: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-77",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
															}),
														),
														line2: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-78",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
															}),
														),
														line3: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-79",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
															}),
														),
														city: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-80",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
															}),
														),
														countryCode: pipe(
															code("country"),
															metadata({
																id: "BT-X-81",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
															}),
														),
														countrySubdivision: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-82",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
																			xpath:
																				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ActualDeliverySupplyChainEvent/ram:OccurrenceDateTime/udt:DateTimeString",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:IssuerAssignedID",
													}),
												),
												lineId: pipe(
													nullish(documentReference()),
													metadata({
														id: ["BT-X-87", "EXT-FR-FE-143"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:LineID",
													}),
												),
												date: pipe(
													nullish(date()),
													metadata({
														id: ["BT-X-88", "BT-X-88-00", "BT-X-88-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:IssuerAssignedID",
													}),
												),
												lineId: pipe(
													nullish(documentReference()),
													metadata({
														id: ["BT-X-90", "EXT-FR-FE-141"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:LineID",
													}),
												),
												date: pipe(
													nullish(date()),
													metadata({
														id: ["BT-X-91", "BT-X-91-00", "BT-X-91-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:IssuerAssignedID",
													}),
												),
												lineId: pipe(
													nullish(documentReference()),
													metadata({
														id: "BT-X-93",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:LineID",
													}),
												),
												date: pipe(
													nullish(date()),
													metadata({
														id: ["BT-X-94", "BT-X-94-00", "BT-X-94-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
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
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:CalculatedAmount",
														}),
													),
													exemptionReason: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-96",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:ExemptionReason",
														}),
													),
													exemptionReasonCode: pipe(
														nullish(code("vatex")),
														metadata({
															id: "BT-X-97",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:ExemptionReasonCode",
														}),
													),
													dueDateTypeCode: pipe(
														nullish(code("untdid2005")),
														metadata({
															id: "BT-X-589",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax/ram:DueDateTypeCode",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-30",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ApplicableTradeTax",
										}),
									),
									charges: pipe(
										nullish(
											array(
												object({
													reasonCode: pipe(
														nullish(
															union([code("charge"), code("untdid5153")]),
														),
														metadata({
															id: ["BT-145", "BT-193", "BT-193-1"],
															xpath:
																'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:ReasonCode',
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
										nullish(
											object({
												lineTotalAmount: pipe(
													nullish(amount({ requireCurrency: "never" })),
													metadata({
														id: "BT-131",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:LineTotalAmount",
													}),
												),
												chargeTotalAmount: pipe(
													nullish(amount({ requireCurrency: "never" })),
													metadata({
														id: "BT-X-327",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:ChargeTotalAmount",
													}),
												),
												allowanceTotalAmount: pipe(
													nullish(amount({ requireCurrency: "never" })),
													metadata({
														id: "BT-X-328",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:AllowanceTotalAmount",
													}),
												),
												taxTotalAmount: pipe(
													nullish(amount({ requireCurrency: "optional" })),
													metadata({
														id: ["BT-X-329", "BT-X-329-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:TaxTotalAmount[@currencyID=/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceCurrencyCode]",
													}),
												),
												taxTotalAmountInAccountingCurrency: pipe(
													nullish(amount({ requireCurrency: "optional" })),
													metadata({
														id: ["BT-X-590", "BT-X-590-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:TaxTotalAmount[@currencyID=/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxCurrencyCode]",
													}),
												),
												grandTotalAmount: pipe(
													nullish(amount({ requireCurrency: "never" })),
													metadata({
														id: "BT-X-330",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:GrandTotalAmount",
													}),
												),
												totalAllowanceChargeAmount: pipe(
													nullish(amount({ requireCurrency: "never" })),
													metadata({
														id: "BT-X-98",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:SpecifiedTradeSettlementLineMonetarySummation/ram:TotalAllowanceChargeAmount",
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
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument/ram:IssuerAssignedID",
														}),
													),
													lineId: pipe(
														nullish(documentReference()),
														metadata({
															id: ["BT-X-540", "EXT-FR-FE-139"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument/ram:LineID",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid1001")),
														metadata({
															id: ["BT-X-332", "EXT-FR-FE-137"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument/ram:TypeCode",
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
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
														}),
													),
												}),
											),
										),
										metadata({
											id: ["BG-X-48", "EXT-FR-FE-BG-06"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:InvoiceReferencedDocument",
										}),
									),
									accountingReference: pipe(
										nullish(
											asArray(
												object({
													typeCode: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-99",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:TypeCode",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BT-133-00",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem/ram:SpecifiedLineTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount",
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
				metadata({
					id: "BG-25",
					xpath:
						"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:IncludedSupplyChainTradeLineItem",
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
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:RoleCode",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
															}),
														),
														line1: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-101",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
															}),
														),
														line2: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-102",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
															}),
														),
														line3: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-103",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
															}),
														),
														city: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-104",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
															}),
														),
														countryCode: pipe(
															code("country"),
															metadata({
																id: "BT-X-105",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
															}),
														),
														countrySubdivision: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-106",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
								contact: pipe(
									nullish(
										asArray(
											object({
												typeCode: pipe(
													nullish(code("untdid3139")),
													metadata({
														id: "BT-X-317",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
													}),
												),
												faxNumber: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-107", "BT-X-107-00"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
													}),
												),
											}),
										),
									),
									metadata({
										id: "BG-6",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:DefinedTradeContact",
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
								roleCode: pipe(
									nullish(code("untdid3035")),
									metadata({
										id: "BT-X-544",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:RoleCode",
									}),
								),
								description: pipe(
									nullish(text()),
									metadata({
										id: "BT-X-334",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:Description",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
															}),
														),
														line1: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-109",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
															}),
														),
														line2: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-110",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
															}),
														),
														line3: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-111",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
															}),
														),
														city: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-112",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
															}),
														),
														countryCode: pipe(
															code("country"),
															metadata({
																id: "BT-X-113",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
															}),
														),
														countrySubdivision: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-114",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
								contact: pipe(
									nullish(
										asArray(
											object({
												typeCode: pipe(
													nullish(code("untdid3139")),
													metadata({
														id: "BT-X-318",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
													}),
												),
												faxNumber: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-115", "BT-X-115-00"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
													}),
												),
											}),
										),
									),
									metadata({
										id: "BG-9",
										xpath:
											"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:DefinedTradeContact",
									}),
								),
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:ID",
										}),
									),
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:GlobalID",
										}),
									),
									name: pipe(
										text(),
										metadata({
											id: ["BT-X-335", "EXT-FR-FE-66"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:Name",
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: ["BT-X-545", "EXT-FR-FE-68"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:RoleCode",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-336", "EXT-FR-FE-68"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-355",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-356",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-357",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-358",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-359",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-360",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-361",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-342", "EXT-FR-FE-86"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:PersonName",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-343",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-347",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:TypeCode",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-344", "BT-X-344-00", "EXT-FR-FE-87"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-345", "BT-X-345-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-346", "BT-X-346-00", "EXT-FR-FE-88"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
														}),
													),
												}),
											),
										),
										metadata({
											id: ["BG-X-51", "EXT-FR-FE-85"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:DefinedTradeContact",
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-348", "EXT-FR-FE-81"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-349", "EXT-FR-FE-78"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:LineOne",
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-350", "EXT-FR-FE-79"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:LineTwo",
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-351", "EXT-FR-FE-80"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:LineThree",
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-352", "EXT-FR-FE-82"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:CityName",
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: ["BT-X-353", "EXT-FR-FE-84"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:CountryID",
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-354", "EXT-FR-FE-83"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SalesAgentTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:ID",
										}),
									),
									globalId: pipe(
										nullish(
											asArray(identifier({ requireSchemeId: "optional" })),
										),
										metadata({
											id: ["BT-X-365", "BT-X-365-0"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:GlobalID",
										}),
									),
									name: pipe(
										text(),
										metadata({
											id: "BT-X-362",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:Name",
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: "BT-X-546",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:RoleCode",
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: ["BT-X-366", "BT-X-366-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-363",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-382",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-383",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-384",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-385",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-386",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-387",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-388",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-369",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:PersonName",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-370",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-371",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-372", "BT-X-372-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-373", "BT-X-373-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-374", "BT-X-374-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-X-55",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:DefinedTradeContact",
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-375",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-376",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineOne",
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-377",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-378",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:LineThree",
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-379",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CityName",
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: "BT-X-380",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CountryID",
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-381",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerTaxRepresentativeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:ID",
										}),
									),
									globalId: pipe(
										nullish(
											asArray(identifier({ requireSchemeId: "optional" })),
										),
										metadata({
											id: ["BT-X-117", "BT-X-117-1"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:GlobalID",
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: "BT-X-547",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:RoleCode",
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: ["BT-X-118", "BT-X-118-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-119",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-389",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-390",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-391",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-392",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-393",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-394",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-395",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-120",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:PersonName",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-121",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-319",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-122", "BT-X-122-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-123", "BT-X-123-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-124", "BT-X-124-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-X-17",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:DefinedTradeContact",
										}),
									),
									electronicAddress: pipe(
										nullish(identifier({ requireSchemeId: "always" })),
										metadata({
											id: ["BT-X-125", "BT-X-125-00", "BT-X-125-0"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerTaxRepresentativeTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:ID",
										}),
									),
									globalId: pipe(
										nullish(
											asArray(identifier({ requireSchemeId: "optional" })),
										),
										metadata({
											id: ["BT-X-127", "BT-X-127-0"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:GlobalID",
										}),
									),
									name: pipe(
										text(),
										metadata({
											id: "BT-X-128",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:Name",
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: "BT-X-548",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:RoleCode",
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: ["BT-X-129", "BT-X-129-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-130",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-396",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-397",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-398",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-399",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-400",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-401",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-402",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
									contact: pipe(
										nullish(
											asArray(
												object({
													personName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-131",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:PersonName",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-132",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-320",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:TypeCode",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-133", "BT-X-133-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-134", "BT-X-134-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-135", "BT-X-135-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-X-20",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:DefinedTradeContact",
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-136",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-137",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:LineOne",
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-138",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:LineTwo",
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-139",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:LineThree",
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-140",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:CityName",
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: "BT-X-141",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:CountryID",
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-142",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ProductEndUserTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:DeliveryTypeCode",
										}),
									),
									location: pipe(
										nullish(
											object({
												countryCode: pipe(
													code("country"),
													metadata({
														id: "BT-X-563",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:RelevantTradeLocation/ram:CountryID",
													}),
												),
												name: pipe(
													text(),
													metadata({
														id: "BT-X-564",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ApplicableTradeDeliveryTerms/ram:RelevantTradeLocation/ram:Name",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:SellerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
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
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:QuotationReferencedDocument/ram:IssuerAssignedID",
											}),
										),
										date: pipe(
											nullish(date()),
											metadata({
												id: ["BT-X-404", "BT-X-404-00", "BT-X-404-0"],
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:QuotationReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
											}),
										),
									}),
								),
							),
							metadata({
								id: "BG-X-61",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:QuotationReferencedDocument",
							}),
						),
						associatedContract: pipe(
							nullish(
								object({
									referenceTypeCode: pipe(
										nullish(code("untdid1153")),
										metadata({
											id: ["BT-X-405", "EXT-FR-FE-01"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ContractReferencedDocument/ram:ReferenceTypeCode",
										}),
									),
									date: pipe(
										nullish(date()),
										metadata({
											id: ["BT-X-148", "BT-X-148-00", "BT-X-148-0"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:ContractReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
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
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode=&quot;916&quot;]/ram:FormattedIssueDateTime/qdt:DateTimeString",
											}),
										),
									}),
								),
							),
							metadata({
								id: "BG-24",
								xpath:
									'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode="916"]',
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
												xpath:
													'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode="50"]/ram:FormattedIssueDateTime/qdt:DateTimeString',
											}),
										),
									}),
								),
							),
							metadata({
								id: "BT-17-00",
								xpath:
									'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode="50"]',
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
												xpath:
													'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode="130"]/ram:FormattedIssueDateTime/qdt:DateTimeString',
											}),
										),
									}),
								),
							),
							metadata({
								id: "BT-18-00",
								xpath:
									'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:AdditionalReferencedDocument[ram:TypeCode="130"]',
							}),
						),
						buyerAgent: pipe(
							nullish(
								object({
									id: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											id: "BT-X-408",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:ID",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:GlobalID",
										}),
									),
									name: pipe(
										text(),
										metadata({
											id: ["BT-X-406", "EXT-FR-FE-03"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:Name",
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: ["BT-X-549", "EXT-FR-FE-04"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:RoleCode",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-407", "EXT-FR-FE-05"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-426",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-427",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-428",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-429",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-430",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-431",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-432",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:PersonName",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-414",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-415",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:TypeCode",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-416", "BT-X-416-00", "EXT-FR-FE-24"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-417", "BT-X-417-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-418", "BT-X-418-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
														}),
													),
												}),
											),
										),
										metadata({
											id: ["BG-X-64", "EXT-FR-FE-22"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:DefinedTradeContact",
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-419", "EXT-FR-FE-18"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-420", "EXT-FR-FE-15"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:LineOne",
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-421", "EXT-FR-FE-16"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:LineTwo",
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-422", "EXT-FR-FE-17"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:LineThree",
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-423", "EXT-FR-FE-19"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:CityName",
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: ["BT-X-424", "EXT-FR-FE-21"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:CountryID",
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-425", "EXT-FR-FE-20"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:BuyerAgentTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
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
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:IssuerAssignedID",
											}),
										),
										date: pipe(
											nullish(date()),
											metadata({
												id: ["BT-X-151", "BT-X-151-00", "BT-X-151-0"],
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:UltimateCustomerOrderReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
											}),
										),
									}),
								),
							),
							metadata({
								id: "BG-X-23",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeAgreement/ram:UltimateCustomerOrderReferencedDocument",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:RelatedSupplyChainConsignment/ram:SpecifiedLogisticsTransportMovement/ram:ModeCode",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:RoleCode",
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: ["BT-X-153", "BT-X-153-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-154",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-433",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-434",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-435",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-436",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-437",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-438",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-439",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:PersonName",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-156",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-321",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-157", "BT-X-157-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-158", "BT-X-158-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-159", "BT-X-159-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-X-26",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:DefinedTradeContact",
										}),
									),
									electronicAddress: pipe(
										nullish(identifier({ requireSchemeId: "always" })),
										metadata({
											id: ["BT-X-160", "BT-X-160-00", "BT-X-160-0"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:ID",
										}),
									),
									globalId: pipe(
										nullish(
											asArray(identifier({ requireSchemeId: "optional" })),
										),
										metadata({
											id: ["BT-X-163", "BT-X-163-0"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:GlobalID",
										}),
									),
									name: pipe(
										text(),
										metadata({
											id: "BT-X-164",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:Name",
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: "BT-X-551",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:RoleCode",
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: ["BT-X-165", "BT-X-165-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-166",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-440",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-441",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-442",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-443",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-444",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-445",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-446",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:PersonName",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-168",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-322",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TypeCode",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-169", "BT-X-169-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-170", "BT-X-170-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-171", "BT-X-171-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-X-28",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:DefinedTradeContact",
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-172",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-173",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineOne",
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-174",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineTwo",
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-175",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:LineThree",
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-176",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CityName",
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: "BT-X-177",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountryID",
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-178",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:UltimateShipToTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:ID",
										}),
									),
									globalId: pipe(
										nullish(
											asArray(identifier({ requireSchemeId: "optional" })),
										),
										metadata({
											id: ["BT-X-182", "BT-X-182-0"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:GlobalID",
										}),
									),
									name: pipe(
										text(),
										metadata({
											id: "BT-X-183",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:Name",
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: "BT-X-552",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:RoleCode",
										}),
									),
									organization: pipe(
										nullish(
											object({
												id: pipe(
													nullish(identifier({ requireSchemeId: "optional" })),
													metadata({
														id: ["BT-X-184", "BT-X-184-0"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-185",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-447",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-448",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-449",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-450",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-451",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-452",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-453",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:PersonName",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-187",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-323",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:TypeCode",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-188", "BT-X-188-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-189", "BT-X-189-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-190", "BT-X-190-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
														}),
													),
												}),
											),
										),
										metadata({
											id: "BG-X-31",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:DefinedTradeContact",
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-191",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-192",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:LineOne",
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-193",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:LineTwo",
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-194",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:LineThree",
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-195",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:CityName",
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: "BT-X-196",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:CountryID",
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: "BT-X-197",
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ShipFromTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DespatchAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:ReceivingAdviceReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
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
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:IssuerAssignedID",
											}),
										),
										date: pipe(
											nullish(date()),
											metadata({
												id: ["BT-X-203", "BT-X-203-00", "BT-X-203-0"],
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DeliveryNoteReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
											}),
										),
									}),
								),
							),
							metadata({
								id: "BT-X-202-00",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeDelivery/ram:DeliveryNoteReferencedDocument",
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
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceIssuerReference",
							}),
						),
						invoicer: pipe(
							nullish(
								object({
									id: pipe(
										nullish(identifier({ requireSchemeId: "never" })),
										metadata({
											id: "BT-X-205",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:ID",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:GlobalID",
										}),
									),
									name: pipe(
										text(),
										metadata({
											id: ["BT-X-207", "EXT-FR-FE-112"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:Name",
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: ["BT-X-553", "EXT-FR-FE-113"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:RoleCode",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-209", "EXT-FR-FE-114"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-454",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-455",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-456",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-457",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-458",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-459",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-460",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:PersonName",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-211",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-324",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-212", "BT-X-212-00", "EXT-FR-FE-133"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-213", "BT-X-213-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-214", "BT-X-214-00", "EXT-FR-FE-134"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
														}),
													),
												}),
											),
										),
										metadata({
											id: ["BG-X-34", "EXT-FR-FE-131"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:DefinedTradeContact",
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-215", "EXT-FR-FE-128"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-216", "EXT-FR-FE-124"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:LineOne",
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-217", "EXT-FR-FE-125"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-218", "EXT-FR-FE-126"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:LineThree",
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-219", "EXT-FR-FE-127"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:CityName",
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: ["BT-X-220", "EXT-FR-FE-139"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:CountryID",
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-221", "EXT-FR-FE-129"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
												}),
											),
										}),
										metadata({
											id: ["BG-X-35", "EXT-FR-FE-123"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:PostalTradeAddress",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoicerTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:ID",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:GlobalID",
										}),
									),
									name: pipe(
										text(),
										metadata({
											id: ["BT-X-226", "EXT-FR-FE-89"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:Name",
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: ["BT-X-554", "EXT-FR-FE-90"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:RoleCode",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-228", "EXT-FR-FE-91"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-461",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-462",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-463",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-464",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-465",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-466",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-467",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:PersonName",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-230",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-325",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-231", "BT-X-231-00", "EXT-FR-FE-110"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-232", "BT-X-232-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-233", "BT-X-233-00", "EXT-FR-FE-111"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
														}),
													),
												}),
											),
										),
										metadata({
											id: ["BG-X-37", "EXT-FR-FE-108"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:DefinedTradeContact",
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-234", "EXT-FR-FE-105"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-235", "EXT-FR-FE-101"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:LineOne",
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-236", "EXT-FR-FE-102"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-237", "EXT-FR-FE-103"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:LineThree",
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-238", "EXT-FR-FE-104"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:CityName",
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: ["BT-X-239", "EXT-FR-FE-107"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:CountryID",
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-240", "EXT-FR-FE-106"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:RoleCode",
										}),
									),
									organization: pipe(
										nullish(
											object({
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: "BT-X-243",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-469",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-470",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-471",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-472",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-473",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-474",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-475",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:PersonName",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-245",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-326",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-246", "BT-X-246-00", "EXT-FR-FE-41"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-247", "BT-X-247-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-248", "BT-X-248-00", "EXT-FR-FE-42"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
														}),
													),
												}),
											),
										),
										metadata({
											id: ["BG-X-39", "EXT-FR-FE-39"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:DefinedTradeContact",
										}),
									),
									postalAddress: pipe(
										nullish(
											object({
												postCode: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-249", "EXT-FR-FE-36"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
													}),
												),
												line1: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-250", "EXT-FR-FE-32"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineOne",
													}),
												),
												line2: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-251", "EXT-FR-FE-33"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
													}),
												),
												line3: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-252", "EXT-FR-FE-34"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineThree",
													}),
												),
												city: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-253", "EXT-FR-FE-35"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CityName",
													}),
												),
												countryCode: pipe(
													code("country"),
													metadata({
														id: ["BT-X-254", "EXT-FR-FE-38"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CountryID",
													}),
												),
												countrySubdivision: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-255", "EXT-FR-FE-37"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayeeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:ID",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:GlobalID",
										}),
									),
									name: pipe(
										text(),
										metadata({
											id: ["BT-X-476", "EXT-FR-FE-43"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:Name",
										}),
									),
									roleCode: pipe(
										nullish(code("untdid3035")),
										metadata({
											id: ["BT-X-483", "EXT-FR-FE-44"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:RoleCode",
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
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
													}),
												),
												tradingName: pipe(
													nullish(text()),
													metadata({
														id: ["BT-X-477", "EXT-FR-FE-45"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
													}),
												),
												postalAddress: pipe(
													nullish(
														object({
															postCode: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-497",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
																}),
															),
															line1: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-498",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
																}),
															),
															line2: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-499",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
																}),
															),
															line3: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-500",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
																}),
															),
															city: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-501",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
																}),
															),
															countryCode: pipe(
																code("country"),
																metadata({
																	id: "BT-X-502",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
																}),
															),
															countrySubdivision: pipe(
																nullish(text()),
																metadata({
																	id: "BT-X-503",
																	xpath:
																		"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:PersonName",
														}),
													),
													departmentName: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-485",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
														}),
													),
													typeCode: pipe(
														nullish(code("untdid3139")),
														metadata({
															id: "BT-X-486",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:TypeCode",
														}),
													),
													phoneNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-487", "BT-X-487-00", "EXT-FR-FE-64"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
														}),
													),
													faxNumber: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-488", "BT-X-488-00"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
														}),
													),
													emailAddress: pipe(
														nullish(text()),
														metadata({
															id: ["BT-X-489", "BT-X-489-00", "EXT-FR-FE-65"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
														}),
													),
												}),
											),
										),
										metadata({
											id: ["BG-X-74", "EXT-FR-FE-62"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:DefinedTradeContact",
										}),
									),
									postalAddress: pipe(
										object({
											postCode: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-490", "EXT-FR-FE-59"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
												}),
											),
											line1: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-491", "EXT-FR-FE-55"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:LineOne",
												}),
											),
											line2: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-492", "EXT-FR-FE-56"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:LineTwo",
												}),
											),
											line3: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-493", "EXT-FR-FE-57"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:LineThree",
												}),
											),
											city: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-494", "EXT-FR-FE-58"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:CityName",
												}),
											),
											countryCode: pipe(
												code("country"),
												metadata({
													id: ["BT-X-495", "EXT-FR-FE-61"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:CountryID",
												}),
											),
											countrySubdivision: pipe(
												nullish(text()),
												metadata({
													id: ["BT-X-496", "EXT-FR-FE-60"],
													xpath:
														"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:PayerTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
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
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange/ram:SourceCurrencyCode",
										}),
									),
									localCurrency: pipe(
										code("currency"),
										metadata({
											id: "BT-X-259",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange/ram:TargetCurrencyCode",
										}),
									),
									// TODO: add rate data-type?
									exchangeRate: pipe(
										unitPriceAmount(),
										metadata({
											id: "BT-X-260",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange/ram:ConversionRate",
										}),
									),
									exchangeRateDate: pipe(
										nullish(date()),
										metadata({
											id: ["BT-X-261", "BT-X-261-00", "BT-X-261-0"],
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:TaxApplicableTradeCurrencyExchange/ram:ConversionRateDateTime/udt:DateTimeString",
										}),
									),
								}),
							),
							metadata({
								id: "BG-X-41",
							}),
						),
						paymentMeans: pipe(
							nullish(
								object({
									buyerBankDetails: pipe(
										nullish(
											object({
												accountName: pipe(
													nullish(text()),
													metadata({
														id: "BT-216",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayerPartyDebtorFinancialAccount/ram:AccountName",
													}),
												),
											}),
										),
										metadata({
											id: "BT-215-00",
										}),
									),
									paymentServiceProvider: pipe(
										nullish(
											object({
												bic: pipe(
													nullish(identifier({ requireSchemeId: "never" })),
													metadata({
														id: "BT-215",
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementPaymentMeans/ram:PayerSpecifiedDebtorFinancialInstitution/ram:BICID",
													}),
												),
											}),
										),
										metadata({
											id: "BT-215-00",
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
									lineTotalBasisAmount: pipe(
										nullish(amount({ requireCurrency: "never" })),
										metadata({
											id: "BT-X-262",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:LineTotalBasisAmount",
										}),
									),
									allowanceChargeBasisAmount: pipe(
										nullish(amount({ requireCurrency: "never" })),
										metadata({
											id: "BT-X-263",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ApplicableTradeTax/ram:AllowanceChargeBasisAmount",
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
									description: pipe(
										nullish(text()),
										metadata({
											id: "BT-X-264",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:BillingSpecifiedPeriod/ram:Description",
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
												xpath:
													'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:SequenceNumeric',
											}),
										),
										basisQuantity: pipe(
											nullish(quantity({ requireUnitCode: "optional" })),
											metadata({
												id: ["BT-X-266", "BT-X-267"],
												xpath:
													'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="false"]/ram:BasisQuantity',
											}),
										),
										categoryTradeTax: pipe(
											object({
												exemptionReason: pipe(
													nullish(text()),
													metadata({
														id: ["BT-173", "EXT-FR-FE-187"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:CategoryTradeTax/ram:ExemptionReason",
													}),
												),
												exemptionReasonCode: pipe(
													nullish(code("vatex")),
													metadata({
														id: ["BT-174", "EXT-FR-FE-188"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:CategoryTradeTax/ram:ExemptionReasonCode",
													}),
												),
											}),
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
										calculationSequence: pipe(
											nullish(identifier({ requireSchemeId: "never" })),
											metadata({
												id: "BT-X-268",
												xpath:
													'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:SequenceNumeric',
											}),
										),
										basisQuantity: pipe(
											nullish(quantity({ requireUnitCode: "optional" })),
											metadata({
												id: ["BT-X-269", "BT-X-270"],
												xpath:
													'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:BasisQuantity',
											}),
										),
										reasonCode: pipe(
											nullish(union([code("charge"), code("untdid5153")])),
											metadata({
												id: ["BT-105", "BT-177", "BT-177-1"],
												xpath:
													'/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge[ram:ChargeIndicator/udt:Indicator="true"]/ram:ReasonCode',
												description:
													"The reason for the document level charge, expressed as a code.",
											}),
										),
										categoryTradeTax: pipe(
											object({
												exemptionReason: pipe(
													nullish(text()),
													metadata({
														id: ["BT-175", "EXT-FR-FE-189"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:CategoryTradeTax/ram:ExemptionReason",
													}),
												),
												exemptionReasonCode: pipe(
													nullish(code("vatex")),
													metadata({
														id: ["BT-176", "EXT-FR-FE-190"],
														xpath:
															"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeAllowanceCharge/ram:CategoryTradeTax/ram:ExemptionReasonCode",
													}),
												),
											}),
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
						logisticsServiceFees: pipe(
							nullish(
								array(
									object({
										description: pipe(
											text(),
											metadata({
												id: "BT-X-271",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:Description",
											}),
										),
										feeAmount: pipe(
											amount({ requireCurrency: "never" }),
											metadata({
												id: "BT-X-272",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:AppliedAmount",
											}),
										),
										appliedTradeTax: pipe(
											nullish(
												array(
													object({
														exemptionReason: pipe(
															nullish(text()),
															metadata({
																id: "BT-X-591",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:AppliedTradeTax/ram:ExemptionReason",
															}),
														),
														categoryCode: pipe(
															code("untdid5305"),
															metadata({
																id: "BT-X-273",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:AppliedTradeTax/ram:CategoryCode",
															}),
														),
														exemptionReasonCode: pipe(
															nullish(code("vatex")),
															metadata({
																id: "BT-X-592",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:AppliedTradeTax/ram:ExemptionReasonCode",
															}),
														),
														rateApplicablePercent: pipe(
															percentage(),
															metadata({
																id: "BT-X-274",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:AppliedTradeTax/ram:RateApplicablePercent",
															}),
														),
													}),
												),
											),
											metadata({
												id: "BT-X-273-00",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge/ram:AppliedTradeTax",
											}),
										),
									}),
								),
							),
							metadata({
								id: "BG-X-42",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedLogisticsServiceCharge",
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
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PartialPaymentAmount",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms/ram:BasisDateTime/udt:DateTimeString",
															}),
														),
														dueDatePeriodBasis: pipe(
															nullish(
																quantity({ requireUnitCode: "optional" }),
															),
															metadata({
																id: "BT-X-277",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms/ram:BasisPeriodMeasure",
															}),
														),
														basisAmount: pipe(
															nullish(amount({ requireCurrency: "never" })),
															metadata({
																id: "BT-X-279",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms/ram:BasisAmount",
															}),
														),
														calculationPercent: pipe(
															nullish(percentage()),
															metadata({
																id: "BT-X-280",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms/ram:CalculationPercent",
															}),
														),
														actualPenaltyAmount: pipe(
															nullish(amount({ requireCurrency: "never" })),
															metadata({
																id: "BT-X-281",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms/ram:ActualPenaltyAmount",
															}),
														),
													}),
												),
											),
											metadata({
												id: "BG-X-43",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentPenaltyTerms",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms/ram:BasisDateTime/udt:DateTimeString",
															}),
														),
														dueDatePeriodBasis: pipe(
															nullish(
																quantity({ requireUnitCode: "optional" }),
															),
															metadata({
																id: "BT-X-283",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms/ram:BasisPeriodMeasure",
															}),
														),
														basisAmount: pipe(
															nullish(amount({ requireCurrency: "never" })),
															metadata({
																id: "BT-X-285",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms/ram:BasisAmount",
															}),
														),
														calculationPercent: pipe(
															nullish(percentage()),
															metadata({
																id: "BT-X-286",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms/ram:CalculationPercent",
															}),
														),
														actualDiscountAmount: pipe(
															nullish(amount({ requireCurrency: "never" })),
															metadata({
																id: "BT-X-287",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms/ram:ActualDiscountAmount",
															}),
														),
													}),
												),
											),
											metadata({
												id: "BG-X-44",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:ApplicableTradePaymentDiscountTerms",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:ID",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:GlobalID",
															}),
														),
														name: pipe(
															text(),
															metadata({
																id: "BT-X-504",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:Name",
															}),
														),
														roleCode: pipe(
															nullish(code("untdid3035")),
															metadata({
																id: "BT-X-511",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:RoleCode",
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
																			xpath:
																				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
																		}),
																	),
																	tradingName: pipe(
																		nullish(text()),
																		metadata({
																			id: "BT-X-505",
																			xpath:
																				"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:TradingBusinessName",
																		}),
																	),
																	postalAddress: pipe(
																		nullish(
																			object({
																				postCode: pipe(
																					nullish(text()),
																					metadata({
																						id: "BT-X-525",
																						xpath:
																							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:PostcodeCode",
																					}),
																				),
																				line1: pipe(
																					nullish(text()),
																					metadata({
																						id: "BT-X-526",
																						xpath:
																							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineOne",
																					}),
																				),
																				line2: pipe(
																					nullish(text()),
																					metadata({
																						id: "BT-X-527",
																						xpath:
																							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineTwo",
																					}),
																				),
																				line3: pipe(
																					nullish(text()),
																					metadata({
																						id: "BT-X-528",
																						xpath:
																							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:LineThree",
																					}),
																				),
																				city: pipe(
																					nullish(text()),
																					metadata({
																						id: "BT-X-529",
																						xpath:
																							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CityName",
																					}),
																				),
																				countryCode: pipe(
																					code("country"),
																					metadata({
																						id: "BT-X-530",
																						xpath:
																							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountryID",
																					}),
																				),
																				countrySubdivision: pipe(
																					nullish(text()),
																					metadata({
																						id: "BT-X-531",
																						xpath:
																							"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedLegalOrganization/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
														contact: pipe(
															nullish(
																asArray(
																	object({
																		personName: pipe(
																			nullish(text()),
																			metadata({
																				id: "BT-X-512",
																				xpath:
																					"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:PersonName",
																			}),
																		),
																		departmentName: pipe(
																			nullish(text()),
																			metadata({
																				id: "BT-X-513",
																				xpath:
																					"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:DepartmentName",
																			}),
																		),
																		typeCode: pipe(
																			nullish(code("untdid3139")),
																			metadata({
																				id: "BT-X-514",
																				xpath:
																					"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:TypeCode",
																			}),
																		),
																		phoneNumber: pipe(
																			nullish(text()),
																			metadata({
																				id: ["BT-X-515", "BT-X-515-00"],
																				xpath:
																					"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:TelephoneUniversalCommunication/ram:CompleteNumber",
																			}),
																		),
																		faxNumber: pipe(
																			nullish(text()),
																			metadata({
																				id: ["BT-X-516", "BT-X-516-00"],
																				xpath:
																					"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:FaxUniversalCommunication/ram:CompleteNumber",
																			}),
																		),
																		emailAddress: pipe(
																			nullish(text()),
																			metadata({
																				id: ["BT-X-517", "BT-X-517-00"],
																				xpath:
																					"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact/ram:EmailURIUniversalCommunication/ram:URIID",
																			}),
																		),
																	}),
																),
															),
															metadata({
																id: "BG-X-78",
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:DefinedTradeContact",
															}),
														),
														postalAddress: pipe(
															object({
																postCode: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-518",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:PostcodeCode",
																	}),
																),
																line1: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-519",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineOne",
																	}),
																),
																line2: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-520",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineTwo",
																	}),
																),
																line3: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-521",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:LineThree",
																	}),
																),
																city: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-522",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CityName",
																	}),
																),
																countryCode: pipe(
																	code("country"),
																	metadata({
																		id: "BT-X-523",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CountryID",
																	}),
																),
																countrySubdivision: pipe(
																	nullish(text()),
																	metadata({
																		id: "BT-X-524",
																		xpath:
																			"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:PostalTradeAddress/ram:CountrySubDivisionName",
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
																xpath:
																	"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:URIUniversalCommunication/ram:URIID",
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
																					xpath:
																						"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty/ram:SpecifiedTaxRegistration/ram:ID",
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
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms/ram:PayeeTradeParty",
											}),
										),
									}),
								),
							),
							metadata({
								id: "BT-20-00",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradePaymentTerms",
							}),
						),
						financialAdjustments: pipe(
							nullish(
								array(
									object({
										reason: pipe(
											text(),
											metadata({
												id: "BT-180",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedFinancialAdjustment/ram:Reason",
											}),
										),
										actualAmount: pipe(
											amount({ requireCurrency: "never" }),
											metadata({
												id: "BT-179",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedFinancialAdjustment/ram:ActualAmount",
											}),
										),
									}),
								),
							),
							metadata({
								id: "BG-34",
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedFinancialAdjustment",
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
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:InvoiceReferencedDocument/ram:TypeCode",
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
									typeCode: pipe(
										nullish(text()),
										metadata({
											id: "BT-X-290",
											xpath:
												"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:ReceivableSpecifiedTradeAccountingAccount/ram:TypeCode",
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
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:PaidAmount",
											}),
										),
										date: pipe(
											nullish(date()),
											metadata({
												id: ["BT-X-292", "BT-X-292-00", "BT-X-292-0"],
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:FormattedReceivedDateTime/qdt:DateTimeString",
											}),
										),
										includedTax: pipe(
											array(
												object({
													calculatedAmount: pipe(
														amount({ requireCurrency: "never" }),
														metadata({
															id: "BT-X-293",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:IncludedTradeTax/ram:CalculatedAmount",
														}),
													),
													typeCode: pipe(
														text(),
														metadata({
															id: "BT-X-294",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:IncludedTradeTax/ram:TypeCode",
														}),
													),
													exemptionReason: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-295",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:IncludedTradeTax/ram:ExemptionReason",
														}),
													),
													categoryCode: pipe(
														nullish(code("untdid5305")),
														metadata({
															id: "BT-X-296",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:IncludedTradeTax/ram:CategoryCode",
														}),
													),
													exemptionReasonCode: pipe(
														nullish(code("vatex")),
														metadata({
															id: "BT-X-297",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:IncludedTradeTax/ram:ExemptionReasonCode",
														}),
													),
													rateApplicablePercent: pipe(
														percentage(),
														metadata({
															id: "BT-X-298",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:IncludedTradeTax/ram:RateApplicablePercent",
														}),
													),
												}),
											),
											minLength(1),
											metadata({
												id: "BG-X-46",
												xpath:
													"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:IncludedTradeTax",
											}),
										),
										precendingInvoice: pipe(
											nullish(
												object({
													issuerAssignedId: pipe(
														documentReference(),
														metadata({
															id: "BT-X-558",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:InvoiceSpecifiedReferencedDocument/ram:IssuerAssignedID",
														}),
													),
													typeCode: pipe(
														nullish(text()),
														metadata({
															id: "BT-X-559",
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:InvoiceSpecifiedReferencedDocument/ram:TypeCode",
														}),
													),
													date: pipe(
														nullish(date()),
														metadata({
															id: ["BT-X-560", "BT-X-560-00", "BT-X-560-0"],
															xpath:
																"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment/ram:InvoiceSpecifiedReferencedDocument/ram:FormattedIssueDateTime/qdt:DateTimeString",
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
								xpath:
									"/rsm:CrossIndustryInvoice/rsm:SupplyChainTradeTransaction/ram:ApplicableHeaderTradeSettlement/ram:SpecifiedAdvancePayment",
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
