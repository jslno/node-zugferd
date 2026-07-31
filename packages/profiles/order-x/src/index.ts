import { orderXBasic } from "@node-zugferd/order-x-basic";
import { base64, defineProfile } from "@node-zugferd/utils";
import { fragment } from "xmlbuilder2";
import { schema } from "./schema";

export const orderX = defineProfile({
	id: "order-x",
	dataRelationship: ["Data", "Source", "Alternative"],
	extensionSchema: {
		type: ["ORDER", "ORDER_RESPONSE", "ORDER_CHANGE"],
		version: "1.0",
		conformanceLevel: "COMFORT",
		fileName: "order-x.xml",
	},
	use: [orderXBasic],
	schema,
	build(data, { root, findNode, findAllNodes }) {
		const SCRDMCCBDACIOMessageStructure = root.first();

		if (data.exchangedDocument.effectivePeriod) {
			const exchangedDocument = findNode(
				"8",
				SCRDMCCBDACIOMessageStructure,
				(node) => node.node.nodeName === "rsm:ExchangedDocument",
				() => SCRDMCCBDACIOMessageStructure.ele("rsm:ExchangedDocument"),
			);
			const effectivePeriod = exchangedDocument.ele(
				"ram:EffectiveSpecifiedPeriod",
			);
			if (data.exchangedDocument.effectivePeriod.startDate) {
				effectivePeriod
					.ele("ram:StartDateTime")
					.ele("udt:DateTimeString")
					.txt(data.exchangedDocument.effectivePeriod.startDate.value)
					.att(
						"format",
						data.exchangedDocument.effectivePeriod.startDate.format,
					);
			}
			if (data.exchangedDocument.effectivePeriod.endDate) {
				effectivePeriod
					.ele("ram:EndDateTime")
					.ele("udt:DateTimeString")
					.txt(data.exchangedDocument.effectivePeriod.endDate.value)
					.att("format", data.exchangedDocument.effectivePeriod.endDate.format);
			}
		}

		const supplyChainTradeTransaction = findNode(
			"32",
			SCRDMCCBDACIOMessageStructure,
			(node) => node.node.nodeName === "rsm:SupplyChainTradeTransaction",
			() =>
				SCRDMCCBDACIOMessageStructure.ele("rsm:SupplyChainTradeTransaction"),
		);

		// line
		(() => {
			if (data.transaction.line?.length && data.transaction.line.length > 0) {
				const lineNodes = findAllNodes(
					supplyChainTradeTransaction,
					(node) =>
						node.node.nodeName === "ram:IncludedSupplyChainTradeLineItem",
				);
				for (let i = 0; i < data.transaction.line.length; i++) {
					const includedSupplyChainTradeLineItem = lineNodes[i];
					const line = data.transaction.line[i];
					if (!includedSupplyChainTradeLineItem || !line) continue;

					if (line.item) {
						const specifiedTradeProduct = findNode(
							`41[${i}]`,
							includedSupplyChainTradeLineItem,
							(node) => node.node.nodeName === "ram:SpecifiedTradeProduct",
							(fragment) => {
								const specifiedTradeProduct = fragment.ele(
									"ram:SpecifiedTradeProduct",
								);
								const refNode =
									findNode(
										`98[${i}]`,
										includedSupplyChainTradeLineItem,
										(node) =>
											node.node.nodeName === "ram:SubstitutedReferencedProduct",
									)?.node ??
									findNode(
										`107[${i}]`,
										includedSupplyChainTradeLineItem,
										(node) =>
											node.node.nodeName === "ram:SpecifiedLineTradeAgreement",
									)?.node ??
									null;
								includedSupplyChainTradeLineItem.node.insertBefore(
									specifiedTradeProduct.node,
									refNode,
								);
								return specifiedTradeProduct;
							},
						);

						if (line.item.description) {
							specifiedTradeProduct
								.ele("ram:Description")
								.txt(line.item.description);
						}
						if (line.item.batchId) {
							specifiedTradeProduct
								.ele("ram:BatchID")
								.txt(line.item.batchId.identifier);
						}
						if (line.item.brandName) {
							specifiedTradeProduct
								.ele("ram:BrandName")
								.txt(line.item.brandName);
						}

						if (
							line.item.attributes?.length &&
							line.item.attributes.length > 0
						) {
							for (const attribute of line.item.attributes) {
								const applicableProductCharacteristic =
									specifiedTradeProduct.ele(
										"ram:ApplicableProductCharacteristic",
									);
								if (attribute.typeCode) {
									applicableProductCharacteristic
										.ele("ram:TypeCode")
										.txt(attribute.typeCode);
								}
								applicableProductCharacteristic
									.ele("ram:Description")
									.txt(attribute.description);
								applicableProductCharacteristic
									.ele("ram:Value")
									.txt(attribute.value);
							}
						}
						if (
							line.item.classification?.length &&
							line.item.classification.length > 0
						) {
							for (const classification of line.item.classification) {
								const designatedProductClassification =
									specifiedTradeProduct.ele(
										"ram:DesignatedProductClassification",
									);
								const classCode = designatedProductClassification
									.ele("ram:ClassCode")
									.txt(classification.classCode.value)
									.att("listID", classification.classCode.listId.value);
								if (classification.classCode.listVersionId) {
									classCode.att(
										"listVersionID",
										classification.classCode.listVersionId,
									);
								}
								if (classification.className) {
									designatedProductClassification
										.ele("ram:ClassName")
										.txt(classification.className);
								}
							}
						}

						if (line.item.instances?.length && line.item.instances.length > 0) {
							for (const instance of line.item.instances) {
								const individualTradeProductInstance =
									specifiedTradeProduct.ele(
										"ram:IndividualTradeProductInstance",
									);
								if (instance.batchId) {
									individualTradeProductInstance
										.ele("ram:BatchID")
										.txt(instance.batchId.identifier);
								}
								if (instance.serialId) {
									individualTradeProductInstance
										.ele("ram:SerialID")
										.txt(instance.serialId.identifier);
								}
							}
						}

						if (line.item.packaging) {
							const applicableSupplyChainPackaging = specifiedTradeProduct.ele(
								"ram:ApplicableSupplyChainPackaging",
							);
							if (line.item.packaging.typeCode) {
								applicableSupplyChainPackaging
									.ele("ram:TypeCode")
									.txt(line.item.packaging.typeCode);
							}
							if (line.item.packaging.dimension) {
								const linearSpatialDimension =
									applicableSupplyChainPackaging.ele(
										"ram:LinearSpatialDimension",
									);
								if (line.item.packaging.dimension.width) {
									linearSpatialDimension
										.ele("ram:WidthMeasure")
										.txt(line.item.packaging.dimension.width.value.toString())
										.att(
											"unitCode",
											line.item.packaging.dimension.width.unitCode,
										);
								}
								if (line.item.packaging.dimension.length) {
									linearSpatialDimension
										.ele("ram:LengthMeasure")
										.txt(line.item.packaging.dimension.length.value.toString())
										.att(
											"unitCode",
											line.item.packaging.dimension.length.unitCode,
										);
								}
								if (line.item.packaging.dimension.height) {
									linearSpatialDimension
										.ele("ram:HeightMeasure")
										.txt(line.item.packaging.dimension.height.value.toString())
										.att(
											"unitCode",
											line.item.packaging.dimension.height.unitCode,
										);
								}
							}
						}

						if (line.item.originTradeCountry) {
							specifiedTradeProduct
								.ele("ram:OriginTradeCountry")
								.ele("ram:ID")
								.txt(line.item.originTradeCountry.value);
						}

						if (
							line.item.additionalReferencedProductDocuments?.length &&
							line.item.additionalReferencedProductDocuments.length > 0
						) {
							for (const doc of line.item
								.additionalReferencedProductDocuments) {
								const additionalReferenceReferencedDocument =
									specifiedTradeProduct.ele(
										"ram:AdditionalReferenceReferencedDocument",
									);
								if (doc.issuerAssignedId) {
									additionalReferenceReferencedDocument
										.ele("ram:IssuerAssignedID")
										.txt(doc.issuerAssignedId.identifier);
								}
								if (doc.externalDocumentLocation) {
									additionalReferenceReferencedDocument
										.ele("ram:URIID")
										.txt(doc.externalDocumentLocation);
								}
								if (doc.typeCode) {
									additionalReferenceReferencedDocument
										.ele("ram:TypeCode")
										.txt(doc.typeCode.value);
								}
								if (doc.name) {
									additionalReferenceReferencedDocument
										.ele("ram:Name")
										.txt(doc.name);
								}
								if (doc.attachedDocument) {
									additionalReferenceReferencedDocument
										.ele("ram:AttachmentBinaryObject")
										.txt(base64.encode(doc.attachedDocument.content))
										.att("mimeCode", doc.attachedDocument.mimeType)
										.att("filename", doc.attachedDocument.filename);
								}
							}
						}
					}

					if (line.substitutedItem) {
						const substitutedReferencedProduct = findNode(
							`98[${i}]`,
							includedSupplyChainTradeLineItem,
							(node) =>
								node.node.nodeName === "ram:SubstitutedReferencedProduct",
							(fragment) => {
								const substitutedReferencedProduct = fragment.ele(
									"ram:SubstitutedReferencedProduct",
								);
								const refNode =
									findNode(
										`107[${i}]`,
										includedSupplyChainTradeLineItem,
										(node) =>
											node.node.nodeName === "ram:SpecifiedLineTradeAgreement",
									)?.node ?? null;
								includedSupplyChainTradeLineItem.node.insertBefore(
									substitutedReferencedProduct.node,
									refNode,
								);
								return substitutedReferencedProduct;
							},
						);

						if (line.substitutedItem.description) {
							substitutedReferencedProduct
								.ele("ram:Description")
								.txt(line.substitutedItem.description);
						}
					}

					const specifiedLineTradeAgreement = findNode(
						`107[${i}]`,
						includedSupplyChainTradeLineItem,
						(node) => node.node.nodeName === "ram:SpecifiedLineTradeAgreement",
						(fragment) => {
							const specifiedLineTradeAgreement = fragment.ele(
								"ram:SpecifiedLineTradeAgreement",
							);
							const refNode =
								findNode(
									`207[${i}]`,
									includedSupplyChainTradeLineItem,
									(node) =>
										node.node.nodeName === "ram:SpecifiedLineTradeDelivery",
								)?.node ?? null;
							includedSupplyChainTradeLineItem.node.insertBefore(
								specifiedLineTradeAgreement.node,
								refNode,
							);
							return specifiedLineTradeAgreement;
						},
					);
					const netPriceProductTradePrice = findNode(
						`178[${i}]`,
						specifiedLineTradeAgreement,
						(node) => node.node.nodeName === "ram:NetPriceProductTradePrice",
					);

					if (line.priceDetails.quotationReference) {
						const quotationReferencedDocument = fragment().ele(
							"ram:QuotationReferencedDocument",
						);
						specifiedLineTradeAgreement.node.insertBefore(
							quotationReferencedDocument.node,
							netPriceProductTradePrice?.node ?? null,
						);
						if (line.priceDetails.quotationReference.issuerAssignedId) {
							quotationReferencedDocument
								.ele("ram:IssuerAssignedID")
								.txt(
									line.priceDetails.quotationReference.issuerAssignedId
										.identifier,
								);
						}
						if (line.priceDetails.quotationReference.lineId) {
							quotationReferencedDocument
								.ele("ram:LineID")
								.txt(line.priceDetails.quotationReference.lineId.identifier);
						}
					}

					if (
						line.priceDetails.additionalReferencedDocuments?.length &&
						line.priceDetails.additionalReferencedDocuments.length > 0
					) {
						for (const doc of line.priceDetails.additionalReferencedDocuments) {
							const additionalReferencedDocument = fragment().ele(
								"ram:AdditionalReferencedDocument",
							);
							specifiedLineTradeAgreement.node.insertBefore(
								additionalReferencedDocument.node,
								netPriceProductTradePrice?.node ?? null,
							);
							if (doc.issuerAssignedId) {
								additionalReferencedDocument
									.ele("ram:IssuerAssignedID")
									.txt(doc.issuerAssignedId.identifier);
							}
							if (doc.externalDocumentLocation) {
								additionalReferencedDocument
									.ele("ram:URIID")
									.txt(doc.externalDocumentLocation);
							}
							if (doc.lineId) {
								additionalReferencedDocument.ele("ram:LineID").txt(doc.lineId);
							}
							if (doc.typeCode) {
								additionalReferencedDocument
									.ele("ram:TypeCode")
									.txt(doc.typeCode.value);
							}
							if (doc.name) {
								additionalReferencedDocument.ele("ram:Name").txt(doc.name);
							}
							if (doc.attachedDocument) {
								additionalReferencedDocument
									.ele("ram:AttachmentBinaryObject")
									.txt(base64.encode(doc.attachedDocument.content))
									.att("mimeCode", doc.attachedDocument.mimeType)
									.att("filename", doc.attachedDocument.filename);
							}
						}
					}

					if (line.priceDetails.grossPrice) {
						const grossPriceProductTradePrice = fragment().ele(
							"ram:GrossPriceProductTradePrice",
						);
						specifiedLineTradeAgreement.node.insertBefore(
							grossPriceProductTradePrice.node,
							netPriceProductTradePrice?.node ?? null,
						);
						grossPriceProductTradePrice
							.ele("ram:ChargeAmount")
							.txt(line.priceDetails.grossPrice.chargeAmount.toString());
						if (line.priceDetails.grossPrice.basisQuantity) {
							const basisQuantity =
								grossPriceProductTradePrice.ele("ram:BasisQuantity");
							basisQuantity.txt(
								line.priceDetails.grossPrice.basisQuantity.value.toString(),
							);
							if (line.priceDetails.grossPrice.basisQuantity.unitCode) {
								basisQuantity.att(
									"unitCode",
									line.priceDetails.grossPrice.basisQuantity.unitCode,
								);
							}
						}

						if (
							line.priceDetails.grossPrice.allowances?.length &&
							line.priceDetails.grossPrice.allowances.length > 0
						) {
							for (const discount of line.priceDetails.grossPrice.allowances) {
								const appliedTradeAllowanceCharge =
									grossPriceProductTradePrice.ele(
										"ram:AppliedTradeAllowanceCharge",
									);
								appliedTradeAllowanceCharge
									.ele("ram:ChargeIndicator")
									.ele("udt:Indicator")
									.txt("false");
								appliedTradeAllowanceCharge
									.ele("ram:ActualAmount")
									.txt(discount.actualAmount.toString());
								if (discount.reasonCode) {
									appliedTradeAllowanceCharge
										.ele("ram:ReasonCode")
										.txt(discount.reasonCode.value);
								}
								if (discount.reason) {
									appliedTradeAllowanceCharge
										.ele("ram:Reason")
										.txt(discount.reason);
								}
							}
						}

						if (
							line.priceDetails.grossPrice.charges?.length &&
							line.priceDetails.grossPrice.charges.length > 0
						) {
							for (const charge of line.priceDetails.grossPrice.charges) {
								const appliedTradeAllowanceCharge =
									grossPriceProductTradePrice.ele(
										"ram:AppliedTradeAllowanceCharge",
									);
								appliedTradeAllowanceCharge
									.ele("ram:ChargeIndicator")
									.ele("udt:Indicator")
									.txt("true");
								appliedTradeAllowanceCharge
									.ele("ram:ActualAmount")
									.txt(charge.actualAmount.toString());
								if (charge.reasonCode) {
									appliedTradeAllowanceCharge
										.ele("ram:ReasonCode")
										.txt(charge.reasonCode.value);
								}
								if (charge.reason) {
									appliedTradeAllowanceCharge
										.ele("ram:Reason")
										.txt(charge.reason);
								}
							}
						}
					}

					if (line.priceDetails.catalogueReference) {
						const catalogueReferencedDocument = fragment().ele(
							"ram:CatalogueReferencedDocument",
						);
						const refNode =
							findNode(
								`199[${i}]`,
								specifiedLineTradeAgreement,
								(node) =>
									node.node.nodeName === "ram:BlanketOrderReferencedDocument",
							)?.node ?? null;
						specifiedLineTradeAgreement.node.insertBefore(
							catalogueReferencedDocument.node,
							refNode,
						);

						if (line.priceDetails.catalogueReference.issuerAssignedId) {
							catalogueReferencedDocument
								.ele("ram:IssuerAssignedID")
								.txt(line.priceDetails.catalogueReference.issuerAssignedId);
						}
						if (line.priceDetails.catalogueReference.lineId) {
							catalogueReferencedDocument
								.ele("ram:LineID")
								.txt(line.priceDetails.catalogueReference.lineId);
						}
					}

					const specifiedLineTradeDelivery = findNode(
						`207[${i}]`,
						includedSupplyChainTradeLineItem,
						(node) => node.node.nodeName === "ram:SpecifiedLineTradeDelivery",
						(fragment) => {
							const specifiedLineTradeDelivery = fragment.ele(
								"ram:SpecifiedLineTradeDelivery",
							);
							const refNode =
								findNode(
									`310[${i}]`,
									includedSupplyChainTradeLineItem,
									(node) =>
										node.node.nodeName === "ram:SpecifiedLineTradeSettlement",
								)?.node ?? null;
							includedSupplyChainTradeLineItem.node.insertBefore(
								specifiedLineTradeDelivery.node,
								refNode,
							);
							return specifiedLineTradeDelivery;
						},
					);
					if (line.delivery.packageQuantity) {
						const packageQuantity = specifiedLineTradeDelivery
							.ele("ram:PackageQuantity")
							.txt(line.delivery.packageQuantity.value.toString());
						if (line.delivery.packageQuantity.unitCode) {
							packageQuantity.att(
								"unitCode",
								line.delivery.packageQuantity.unitCode,
							);
						}
					}
					if (line.delivery.perPackageQuantity) {
						const perPackageUnitQuantity = specifiedLineTradeDelivery
							.ele("ram:PerPackageUnitQuantity")
							.txt(line.delivery.perPackageQuantity.value.toString());
						if (line.delivery.perPackageQuantity.unitCode) {
							perPackageUnitQuantity.att(
								"unitCode",
								line.delivery.perPackageQuantity.unitCode,
							);
						}
					}
					if (line.delivery.requestedPickUp) {
						const requestedDespatchSupplyChainEvent =
							specifiedLineTradeDelivery.ele(
								"ram:RequestedDespatchSupplyChainEvent",
							);
						if (line.delivery.requestedPickUp.date) {
							requestedDespatchSupplyChainEvent
								.ele("ram:OccurrenceDateTime")
								.ele("udt:DateTimeString")
								.txt(line.delivery.requestedPickUp.date.value)
								.att("format", line.delivery.requestedPickUp.date.format);
						}
						if (line.delivery.requestedPickUp.period) {
							const occurrenceSpecifiedPeriod =
								requestedDespatchSupplyChainEvent.ele(
									"ram:OccurrenceSpecifiedPeriod",
								);
							if (line.delivery.requestedPickUp.period.startDate) {
								occurrenceSpecifiedPeriod
									.ele("ram:StartDateTime")
									.ele("udt:DateTimeString")
									.txt(line.delivery.requestedPickUp.period.startDate.value)
									.att(
										"format",
										line.delivery.requestedPickUp.period.startDate.format,
									);
							}
							if (line.delivery.requestedPickUp.period.endDate) {
								occurrenceSpecifiedPeriod
									.ele("ram:EndDateTime")
									.ele("udt:DateTimeString")
									.txt(line.delivery.requestedPickUp.period.endDate.value)
									.att(
										"format",
										line.delivery.requestedPickUp.period.endDate.format,
									);
							}
						}
					}
					if (line.delivery.requestedDelivery) {
						const requestedDeliverySupplyChainEvent =
							specifiedLineTradeDelivery.ele(
								"ram:RequestedDeliverySupplyChainEvent",
							);
						if (line.delivery.requestedDelivery.date) {
							requestedDeliverySupplyChainEvent
								.ele("ram:OccurrenceDateTime")
								.ele("udt:DateTimeString")
								.txt(line.delivery.requestedDelivery.date.value)
								.att("format", line.delivery.requestedDelivery.date.format);
						}
						if (line.delivery.requestedDelivery.period) {
							const occurrenceSpecifiedPeriod =
								requestedDeliverySupplyChainEvent.ele(
									"ram:OccurrenceSpecifiedPeriod",
								);
							if (line.delivery.requestedDelivery.period.startDate) {
								occurrenceSpecifiedPeriod
									.ele("ram:StartDateTime")
									.ele("udt:DateTimeString")
									.txt(line.delivery.requestedDelivery.period.startDate.value)
									.att(
										"format",
										line.delivery.requestedDelivery.period.startDate.format,
									);
							}
							if (line.delivery.requestedDelivery.period.endDate) {
								occurrenceSpecifiedPeriod
									.ele("ram:EndDateTime")
									.ele("udt:DateTimeString")
									.txt(line.delivery.requestedDelivery.period.endDate.value)
									.att(
										"format",
										line.delivery.requestedDelivery.period.endDate.format,
									);
							}
						}
					}

					const specifiedLineTradeSettlement = findNode(
						`310[${i}]`,
						includedSupplyChainTradeLineItem,
						(node) => node.node.nodeName === "ram:SpecifiedLineTradeSettlement",
						() =>
							includedSupplyChainTradeLineItem.ele(
								"ram:SpecifiedLineTradeSettlement",
							),
					);
					const specifiedTradeSettlementLineMonetarySummation = findNode(
						`334[${i}]`,
						specifiedLineTradeSettlement,
						(node) =>
							node.node.nodeName ===
							"ram:SpecifiedTradeSettlementLineMonetarySummation",
					);

					if (line.billing.vatBreakdown) {
						const applicableTradeTax = fragment().ele("ram:ApplicableTradeTax");
						specifiedLineTradeSettlement.node.insertBefore(
							applicableTradeTax.node,
							specifiedTradeSettlementLineMonetarySummation?.node ?? null,
						);

						applicableTradeTax.ele("ram:TypeCode").txt("VAT");
						applicableTradeTax
							.ele("ram:CategoryCode")
							.txt(line.billing.vatBreakdown.categoryCode.value);
						if (
							typeof line.billing.vatBreakdown.rateApplicablePercent ===
							"number"
						) {
							applicableTradeTax
								.ele("ram:RateApplicablePercent")
								.txt(
									line.billing.vatBreakdown.rateApplicablePercent.toString(),
								);
						}
						if (
							line.billing.allowances?.length &&
							line.billing.allowances.length > 0
						) {
							for (const allowance of line.billing.allowances) {
								const specifiedTradeAllowanceCharge = fragment().ele(
									"ram:SpecifiedTradeAllowanceCharge",
								);
								specifiedLineTradeSettlement.node.insertBefore(
									specifiedTradeAllowanceCharge.node,
									specifiedTradeSettlementLineMonetarySummation?.node ?? null,
								);

								specifiedTradeAllowanceCharge
									.ele("ram:ChargeIndicator")
									.ele("udt:Indicator")
									.txt("false");

								if (typeof allowance.calculationPercent === "number") {
									specifiedTradeAllowanceCharge
										.ele("ram:CalculationPercent")
										.txt(allowance.calculationPercent.toString());
								}
								if (typeof allowance.basisAmount === "number") {
									specifiedTradeAllowanceCharge
										.ele("ram:BasisAmount")
										.txt(allowance.basisAmount.toString());
								}
								specifiedTradeAllowanceCharge
									.ele("ram:ActualAmount")
									.txt(allowance.actualAmount.toString());
								if (allowance.reasonCode) {
									specifiedTradeAllowanceCharge
										.ele("ram:ReasonCode")
										.txt(allowance.reasonCode.value);
								}
								if (allowance.reason) {
									specifiedTradeAllowanceCharge
										.ele("ram:Reason")
										.txt(allowance.reason);
								}
							}
						}

						if (
							line.billing.charges?.length &&
							line.billing.charges.length > 0
						) {
							for (const charge of line.billing.charges) {
								const specifiedTradeAllowanceCharge = fragment().ele(
									"ram:SpecifiedTradeAllowanceCharge",
								);
								specifiedLineTradeSettlement.node.insertBefore(
									specifiedTradeAllowanceCharge.node,
									specifiedTradeSettlementLineMonetarySummation?.node ?? null,
								);

								specifiedTradeAllowanceCharge
									.ele("ram:ChargeIndicator")
									.ele("udt:Indicator")
									.txt("true");

								if (typeof charge.calculationPercent === "number") {
									specifiedTradeAllowanceCharge
										.ele("ram:CalculationPercent")
										.txt(charge.calculationPercent.toString());
								}
								if (typeof charge.basisAmount === "number") {
									specifiedTradeAllowanceCharge
										.ele("ram:BasisAmount")
										.txt(charge.basisAmount.toString());
								}
								specifiedTradeAllowanceCharge
									.ele("ram:ActualAmount")
									.txt(charge.actualAmount.toString());
								if (charge.reasonCode) {
									specifiedTradeAllowanceCharge
										.ele("ram:ReasonCode")
										.txt(charge.reasonCode.value);
								}
								if (charge.reason) {
									specifiedTradeAllowanceCharge
										.ele("ram:Reason")
										.txt(charge.reason);
								}
							}
						}

						if (line.billing.accounting?.buyerReference) {
							specifiedLineTradeSettlement
								.ele("ram:ReceivableSpecifiedTradeAccountingAccount")
								.ele("ram:ID")
								.txt(line.billing.accounting.buyerReference.identifier);
						}
					}
				}
			}
		})();

		// contract
		(() => {
			const applicableHeaderTradeAgreement = findNode(
				"343",
				supplyChainTradeTransaction,
				(node) => node.node.nodeName === "ram:ApplicableHeaderTradeAgreement",
				(fragment) => {
					const applicableHeaderTradeAgreement = fragment.ele(
						"ram:ApplicableHeaderTradeAgreement",
					);
					const refNode =
						findNode(
							"642",
							supplyChainTradeTransaction,
							(node) =>
								node.node.nodeName === "ram:ApplicableHeaderTradeDelivery",
						)?.node ??
						findNode(
							"788",
							supplyChainTradeTransaction,
							(node) =>
								node.node.nodeName === "ram:ApplicableHeaderTradeSettlement",
						)?.node ??
						null;
					supplyChainTradeTransaction.node.insertBefore(
						applicableHeaderTradeAgreement.node,
						refNode,
					);
					return applicableHeaderTradeAgreement;
				},
			);

			// seller
			(() => {
				const sellerTradeParty = findNode(
					"345",
					applicableHeaderTradeAgreement,
					(node) => node.node.nodeName === "ram:SellerTradeParty",
					(fragment) => {
						const sellerTradeParty = fragment.ele("ram:SellerTradeParty");
						const refNode =
							findNode(
								"390",
								applicableHeaderTradeAgreement,
								(node) => node.node.nodeName === "ram:BuyerTradeParty",
							)?.node ?? null;
						applicableHeaderTradeAgreement.node.insertBefore(
							sellerTradeParty.node,
							refNode,
						);
						return sellerTradeParty;
					},
				);

				if (data.transaction.contract.seller.description) {
					const description = fragment().ele("ram:Description");
					description.txt(data.transaction.contract.seller.description);
					const refNode =
						findNode(
							"351",
							sellerTradeParty,
							(node) => node.node.nodeName === "ram:SpecifiedLegalOrganization",
						)?.node ??
						findNode(
							"363[0]",
							sellerTradeParty,
							(node) => node.node.nodeName === "ram:DefinedTradeContact",
						)?.node ??
						findNode(
							"373",
							sellerTradeParty,
							(node) => node.node.nodeName === "ram:PostalTradeAddress",
						)?.node ??
						findNode(
							"381",
							sellerTradeParty,
							(node) => node.node.nodeName === "ram:URIUniversalCommunication",
						)?.node ??
						findNode(
							"384[0]",
							sellerTradeParty,
							(node) =>
								node.node.nodeName === "ram:SpecifiedTaxRegistration" &&
								[...node.node.childNodes].some(
									(child) =>
										child instanceof Element &&
										child.nodeName === "ram:ID" &&
										child.getAttribute("schemeID") === "VA",
								),
						)?.node ??
						null;
					sellerTradeParty.node.insertBefore(description.node, refNode);
				}

				if (
					data.transaction.contract.seller.contact?.length &&
					data.transaction.contract.seller.contact.length > 0
				) {
					const contactNodes = findAllNodes(
						sellerTradeParty,
						(node) => node.node.nodeName === "ram:DefinedTradeContact",
					);
					for (
						let i = 0;
						i < data.transaction.contract.seller.contact.length;
						i++
					) {
						const definedTradeContact = contactNodes[i];
						const contact = data.transaction.contract.seller.contact[i];
						if (!definedTradeContact || !contact) continue;

						if (contact.typeCode) {
							const typeCode = fragment().ele("ram:TypeCode");
							typeCode.txt(contact.typeCode.value);
							const refNode =
								findNode(
									`367[${i}]`,
									definedTradeContact,
									(node) =>
										node.node.nodeName ===
										"ram:TelephoneUniversalCommunication",
								)?.node ??
								findNode(
									`371[${i}]`,
									definedTradeContact,
									(node) =>
										node.node.nodeName === "ram:EmailURIUniversalCommunication",
								)?.node ??
								null;
							definedTradeContact.node.insertBefore(typeCode.node, refNode);
						}
					}
				}

				if (
					data.transaction.contract.seller.taxRegistration?.local?.length &&
					data.transaction.contract.seller.taxRegistration.local.length > 0
				) {
					for (const taxRegistration of data.transaction.contract.seller
						.taxRegistration.local) {
						sellerTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(taxRegistration.id.identifier)
							.att("schemeID", "FC");
					}
				}
			})();

			// buyer
			(() => {
				const buyerTradeParty = findNode(
					"390",
					applicableHeaderTradeAgreement,
					(node) => node.node.nodeName === "ram:BuyerTradeParty",
					(fragment) => {
						const buyerTradeParty = fragment.ele("ram:BuyerTradeParty");
						const refNode =
							findNode(
								"517",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName === "ram:ApplicableTradeDeliveryTerms",
							)?.node ??
							findNode(
								"529",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName === "ram:BuyerOrderReferencedDocument",
							)?.node ??
							findNode(
								"534",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName === "ram:QuotationReferencedDocument",
							)?.node ??
							findNode(
								"539",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName === "ram:ContractReferencedDocument",
							)?.node ??
							findNode(
								"614",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName === "ram:BlanketOrderReferencedDocument",
							)?.node ??
							findNode(
								"619",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName === "ram:PreviousOrderReferencedDocument",
							)?.node ??
							findNode(
								"624",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName ===
									"ram:PreviousOrderChangeReferencedDocument",
							)?.node ??
							findNode(
								"629",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName ===
									"ram:PreviousOrderResponseReferencedDocument",
							)?.node ??
							null;
						applicableHeaderTradeAgreement.node.insertBefore(
							buyerTradeParty.node,
							refNode,
						);
						return buyerTradeParty;
					},
				);

				if (
					data.transaction.contract.buyer.contact?.length &&
					data.transaction.contract.buyer.contact.length > 0
				) {
					const contactNodes = findAllNodes(
						buyerTradeParty,
						(node) => node.node.nodeName === "ram:DefinedTradeContact",
					);
					for (
						let i = 0;
						i < data.transaction.contract.buyer.contact.length;
						i++
					) {
						const definedTradeContact = contactNodes[i];
						const contact = data.transaction.contract.buyer.contact[i];
						if (!definedTradeContact || !contact) continue;

						if (contact.typeCode) {
							const typeCode = fragment().ele("ram:TypeCode");
							typeCode.txt(contact.typeCode.value);
							const refNode =
								findNode(
									`412[${i}]`,
									definedTradeContact,
									(node) =>
										node.node.nodeName ===
										"ram:TelephoneUniversalCommunication",
								)?.node ??
								findNode(
									`416[${i}]`,
									definedTradeContact,
									(node) =>
										node.node.nodeName === "ram:EmailURIUniversalCommunication",
								)?.node ??
								null;
							definedTradeContact.node.insertBefore(typeCode.node, refNode);
						}
					}
				}

				if (
					data.transaction.contract.buyer.taxRegistration?.local?.length &&
					data.transaction.contract.buyer.taxRegistration.local.length > 0
				) {
					for (const taxRegistration of data.transaction.contract.buyer
						.taxRegistration.local) {
						buyerTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(taxRegistration.id.identifier)
							.att("schemeID", "FC");
					}
				}
			})();

			if (data.transaction.contract.buyerRequisitioner) {
				const buyerRequisitionerTradeParty = fragment().ele(
					"ram:BuyerRequisitionerTradeParty",
				);
				const refNode =
					findNode(
						"517",
						applicableHeaderTradeAgreement,
						(node) => node.node.nodeName === "ram:ApplicableTradeDeliveryTerms",
					)?.node ??
					findNode(
						"529",
						applicableHeaderTradeAgreement,
						(node) => node.node.nodeName === "ram:BuyerOrderReferencedDocument",
					)?.node ??
					findNode(
						"534",
						applicableHeaderTradeAgreement,
						(node) => node.node.nodeName === "ram:QuotationReferencedDocument",
					)?.node ??
					findNode(
						"539",
						applicableHeaderTradeAgreement,
						(node) => node.node.nodeName === "ram:ContractReferencedDocument",
					)?.node ??
					findNode(
						"614",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName === "ram:BlanketOrderReferencedDocument",
					)?.node ??
					findNode(
						"619",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName === "ram:PreviousOrderReferencedDocument",
					)?.node ??
					findNode(
						"624",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName ===
							"ram:PreviousOrderChangeReferencedDocument",
					)?.node ??
					findNode(
						"629",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName ===
							"ram:PreviousOrderResponseReferencedDocument",
					)?.node ??
					null;
				applicableHeaderTradeAgreement.node.insertBefore(
					buyerRequisitionerTradeParty.node,
					refNode,
				);

				if (data.transaction.contract.buyerRequisitioner.id) {
					buyerRequisitionerTradeParty
						.ele("ram:ID")
						.txt(data.transaction.contract.buyerRequisitioner.id.identifier);
				}
				if (
					data.transaction.contract.buyerRequisitioner.globalId?.length &&
					data.transaction.contract.buyerRequisitioner.globalId.length > 0
				) {
					for (const globalId of data.transaction.contract.buyerRequisitioner
						.globalId) {
						buyerRequisitionerTradeParty
							.ele("ram:GlobalID")
							.txt(globalId.identifier)
							.att("schemeID", globalId.schemeId);
					}
				}

				if (data.transaction.contract.buyerRequisitioner.name) {
					buyerRequisitionerTradeParty
						.ele("ram:Name")
						.txt(data.transaction.contract.buyerRequisitioner.name);
				}

				if (data.transaction.contract.buyerRequisitioner.organization) {
					const specifiedLegalOrganization = buyerRequisitionerTradeParty.ele(
						"ram:SpecifiedLegalOrganization",
					);
					if (data.transaction.contract.buyerRequisitioner.organization.id) {
						const id = specifiedLegalOrganization
							.ele("ram:ID")
							.txt(
								data.transaction.contract.buyerRequisitioner.organization.id
									.identifier,
							);
						if (
							data.transaction.contract.buyerRequisitioner.organization.id
								.schemeId
						) {
							id.att(
								"schemeID",
								data.transaction.contract.buyerRequisitioner.organization.id
									.schemeId,
							);
						}
					}
					if (
						data.transaction.contract.buyerRequisitioner.organization
							.tradingName
					) {
						specifiedLegalOrganization
							.ele("ram:TradingBusinessName")
							.txt(
								data.transaction.contract.buyerRequisitioner.organization
									.tradingName,
							);
					}
				}
				if (
					data.transaction.contract.buyerRequisitioner.contact?.length &&
					data.transaction.contract.buyerRequisitioner.contact.length > 0
				) {
					for (const contact of data.transaction.contract.buyerRequisitioner
						.contact) {
						const definedTradeContact = buyerRequisitionerTradeParty.ele(
							"ram:DefinedTradeContact",
						);
						if (contact.personName) {
							definedTradeContact.ele("ram:PersonName").txt(contact.personName);
						}
						if (contact.departmentName) {
							definedTradeContact
								.ele("ram:DepartmentName")
								.txt(contact.departmentName);
						}
						if (contact.typeCode) {
							definedTradeContact
								.ele("ram:TypeCode")
								.txt(contact.typeCode.value);
						}
						if (contact.phoneNumber) {
							definedTradeContact
								.ele("ram:TelephoneUniversalCommunication")
								.ele("ram:CompleteNumber")
								.txt(contact.phoneNumber);
						}
						if (contact.emailAddress) {
							definedTradeContact
								.ele("ram:EmailURIUniversalCommunication")
								.ele("ram:URIID")
								.txt(contact.emailAddress);
						}
					}
				}

				if (data.transaction.contract.buyerRequisitioner.postalAddress) {
					const postalTradeAddress = buyerRequisitionerTradeParty.ele(
						"ram:PostalTradeAddress",
					);
					if (
						data.transaction.contract.buyerRequisitioner.postalAddress.postCode
					) {
						postalTradeAddress
							.ele("ram:PostcodeCode")
							.txt(
								data.transaction.contract.buyerRequisitioner.postalAddress
									.postCode,
							);
					}
					if (
						data.transaction.contract.buyerRequisitioner.postalAddress.line1
					) {
						postalTradeAddress
							.ele("ram:LineOne")
							.txt(
								data.transaction.contract.buyerRequisitioner.postalAddress
									.line1,
							);
					}
					if (
						data.transaction.contract.buyerRequisitioner.postalAddress.line2
					) {
						postalTradeAddress
							.ele("ram:LineTwo")
							.txt(
								data.transaction.contract.buyerRequisitioner.postalAddress
									.line2,
							);
					}
					if (
						data.transaction.contract.buyerRequisitioner.postalAddress.line3
					) {
						postalTradeAddress
							.ele("ram:LineThree")
							.txt(
								data.transaction.contract.buyerRequisitioner.postalAddress
									.line3,
							);
					}
					if (data.transaction.contract.buyerRequisitioner.postalAddress.city) {
						postalTradeAddress
							.ele("ram:CityName")
							.txt(
								data.transaction.contract.buyerRequisitioner.postalAddress.city,
							);
					}
					postalTradeAddress
						.ele("ram:CountryID")
						.txt(
							data.transaction.contract.buyerRequisitioner.postalAddress
								.countryCode.value,
						);
					if (
						data.transaction.contract.buyerRequisitioner.postalAddress
							.countrySubdivision
					) {
						postalTradeAddress
							.ele("ram:CountrySubDivisionName")
							.txt(
								data.transaction.contract.buyerRequisitioner.postalAddress
									.countrySubdivision,
							);
					}
				}

				if (data.transaction.contract.buyerRequisitioner.electronicAddress) {
					buyerRequisitionerTradeParty
						.ele("ram:URIUniversalCommunication")
						.ele("ram:URIID")
						.txt(
							data.transaction.contract.buyerRequisitioner.electronicAddress
								.identifier,
						)
						.att(
							"schemeID",
							data.transaction.contract.buyerRequisitioner.electronicAddress
								.schemeId,
						);
				}

				if (
					data.transaction.contract.buyerRequisitioner.taxRegistration?.vat
						?.length &&
					data.transaction.contract.buyerRequisitioner.taxRegistration.vat
						.length > 0
				) {
					for (const taxRegistration of data.transaction.contract
						.buyerRequisitioner.taxRegistration.vat) {
						buyerRequisitionerTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(taxRegistration.id.identifier)
							.att("schemeID", "VA");
					}
				}

				if (
					data.transaction.contract.buyerRequisitioner.taxRegistration?.local
						?.length &&
					data.transaction.contract.buyerRequisitioner.taxRegistration.local
						.length > 0
				) {
					for (const taxRegistration of data.transaction.contract
						.buyerRequisitioner.taxRegistration.local) {
						buyerRequisitionerTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(taxRegistration.id.identifier)
							.att("schemeID", "FC");
					}
				}
			}

			if (data.transaction.contract.deliveryTerms) {
				const applicableTradeDeliveryTerms = findNode(
					"517",
					applicableHeaderTradeAgreement,
					(node) => node.node.nodeName === "ram:ApplicableTradeDeliveryTerms",
					(fragment) => {
						const applicableTradeDeliveryTerms = fragment.ele(
							"ram:ApplicableTradeDeliveryTerms",
						);
						const refNode =
							findNode(
								"529",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName === "ram:BuyerOrderReferencedDocument",
							)?.node ??
							findNode(
								"534",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName === "ram:QuotationReferencedDocument",
							)?.node ??
							findNode(
								"539",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName === "ram:ContractReferencedDocument",
							)?.node ??
							findNode(
								"614",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName === "ram:BlanketOrderReferencedDocument",
							)?.node ??
							findNode(
								"619",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName === "ram:PreviousOrderReferencedDocument",
							)?.node ??
							findNode(
								"624",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName ===
									"ram:PreviousOrderChangeReferencedDocument",
							)?.node ??
							findNode(
								"629",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName ===
									"ram:PreviousOrderResponseReferencedDocument",
							)?.node ??
							null;
						applicableHeaderTradeAgreement.node.insertBefore(
							applicableTradeDeliveryTerms.node,
							refNode,
						);
						return applicableTradeDeliveryTerms;
					},
				);

				if (data.transaction.contract.deliveryTerms.description) {
					const description = fragment().ele("ram:Description");
					description.txt(data.transaction.contract.deliveryTerms.description);
					const refNode =
						findNode(
							"520",
							applicableTradeDeliveryTerms,
							(node) => node.node.nodeName === "ram:FunctionCode",
						)?.node ?? null;
					applicableTradeDeliveryTerms.node.insertBefore(
						description.node,
						refNode,
					);
				}

				if (data.transaction.contract.deliveryTerms.location) {
					const relevantTradeLocation = applicableTradeDeliveryTerms.ele(
						"ram:RelevantTradeLocation",
					);

					if (data.transaction.contract.deliveryTerms.location.id) {
						relevantTradeLocation
							.ele("ram:ID")
							.txt(
								data.transaction.contract.deliveryTerms.location.id.identifier,
							);
					}
					if (data.transaction.contract.deliveryTerms.location.name) {
						relevantTradeLocation
							.ele("ram:Name")
							.txt(data.transaction.contract.deliveryTerms.location.name);
					}
				}
			}

			if (data.transaction.contract.salesOrderReference?.issuerAssignedId) {
				const sellerOrderReferencedDocument = fragment().ele(
					"ram:SellerOrderReferencedDocument",
				);
				sellerOrderReferencedDocument
					.ele("ram:IssuerAssignedID")
					.txt(data.transaction.contract.salesOrderReference.issuerAssignedId);
				const refNode =
					findNode(
						"529",
						applicableHeaderTradeAgreement,
						(node) => node.node.nodeName === "ram:BuyerOrderReferencedDocument",
					)?.node ??
					findNode(
						"534",
						applicableHeaderTradeAgreement,
						(node) => node.node.nodeName === "ram:QuotationReferencedDocument",
					)?.node ??
					findNode(
						"539",
						applicableHeaderTradeAgreement,
						(node) => node.node.nodeName === "ram:ContractReferencedDocument",
					)?.node ??
					findNode(
						"614",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName === "ram:BlanketOrderReferencedDocument",
					)?.node ??
					findNode(
						"619",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName === "ram:PreviousOrderReferencedDocument",
					)?.node ??
					findNode(
						"624",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName ===
							"ram:PreviousOrderChangeReferencedDocument",
					)?.node ??
					findNode(
						"629",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName ===
							"ram:PreviousOrderResponseReferencedDocument",
					)?.node ??
					null;
				applicableHeaderTradeAgreement.node.insertBefore(
					sellerOrderReferencedDocument.node,
					refNode,
				);
			}

			if (data.transaction.contract.requisitionReference?.issuerAssignedId) {
				const requisitionReferencedDocument = fragment().ele(
					"ram:RequisitionReferencedDocument",
				);
				requisitionReferencedDocument
					.ele("ram:IssuerAssignedID")
					.txt(data.transaction.contract.requisitionReference.issuerAssignedId);
				const refNode =
					findNode(
						"614",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName === "ram:BlanketOrderReferencedDocument",
					)?.node ??
					findNode(
						"619",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName === "ram:PreviousOrderReferencedDocument",
					)?.node ??
					findNode(
						"624",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName ===
							"ram:PreviousOrderChangeReferencedDocument",
					)?.node ??
					findNode(
						"629",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName ===
							"ram:PreviousOrderResponseReferencedDocument",
					)?.node ??
					null;
				applicableHeaderTradeAgreement.node.insertBefore(
					requisitionReferencedDocument.node,
					refNode,
				);
			}

			if (
				data.transaction.contract.additionalReferencedDocuments?.length &&
				data.transaction.contract.additionalReferencedDocuments.length > 0
			) {
				const refNode =
					findNode(
						"614",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName === "ram:BlanketOrderReferencedDocument",
					)?.node ??
					findNode(
						"619",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName === "ram:PreviousOrderReferencedDocument",
					)?.node ??
					findNode(
						"624",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName ===
							"ram:PreviousOrderChangeReferencedDocument",
					)?.node ??
					findNode(
						"629",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName ===
							"ram:PreviousOrderResponseReferencedDocument",
					)?.node ??
					null;
				for (const doc of data.transaction.contract
					.additionalReferencedDocuments) {
					const additionalReferencedDocument = fragment().ele(
						"ram:AdditionalReferencedDocument",
					);
					applicableHeaderTradeAgreement.node.insertBefore(
						additionalReferencedDocument.node,
						refNode,
					);

					if (doc.issuerAssignedId) {
						additionalReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(doc.issuerAssignedId);
					}

					if (doc.externalDocumentLocation) {
						additionalReferencedDocument
							.ele("ram:URIID")
							.txt(doc.externalDocumentLocation);
					}

					additionalReferencedDocument
						.ele("ram:TypeCode")
						.txt(doc.typeCode.value);

					if (doc.name) {
						additionalReferencedDocument.ele("ram:Name").txt(doc.name);
					}

					if (doc.attachedDocument) {
						additionalReferencedDocument
							.ele("ram:AttachmentBinaryObject")
							.txt(base64.encode(doc.attachedDocument.content))
							.att("mimeCode", doc.attachedDocument.mimeType)
							.att("filename", doc.attachedDocument.filename);
					}

					if (doc.referenceTypeCode) {
						additionalReferencedDocument
							.ele("ram:ReferenceTypeCode")
							.txt(doc.referenceTypeCode.value);
					}
				}
			}

			if (data.transaction.contract.catalogueReference?.issuerAssignedId) {
				const catalogueReferencedDocument = fragment().ele(
					"ram:CatalogueReferencedDocument",
				);
				catalogueReferencedDocument
					.ele("ram:IssuerAssignedID")
					.txt(data.transaction.contract.catalogueReference.issuerAssignedId);
				const refNode =
					findNode(
						"614",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName === "ram:BlanketOrderReferencedDocument",
					)?.node ??
					findNode(
						"619",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName === "ram:PreviousOrderReferencedDocument",
					)?.node ??
					findNode(
						"624",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName ===
							"ram:PreviousOrderChangeReferencedDocument",
					)?.node ??
					findNode(
						"629",
						applicableHeaderTradeAgreement,
						(node) =>
							node.node.nodeName ===
							"ram:PreviousOrderResponseReferencedDocument",
					)?.node ??
					null;
				applicableHeaderTradeAgreement.node.insertBefore(
					catalogueReferencedDocument.node,
					refNode,
				);
			}

			if (data.transaction.contract.projectReference) {
				const specifiedProcuringProject = applicableHeaderTradeAgreement.ele(
					"ram:SpecifiedProcuringProject",
				);
				specifiedProcuringProject
					.ele("ram:ID")
					.txt(data.transaction.contract.projectReference.id.identifier);
				specifiedProcuringProject
					.ele("ram:Name")
					.txt(data.transaction.contract.projectReference.name);
			}
		})();

		// delivery
		(() => {
			const applicableHeaderTradeDelivery = findNode(
				"642",
				supplyChainTradeTransaction,
				(node) => node.node.nodeName === "ram:ApplicableHeaderTradeDelivery",
				(fragment) => {
					const applicableHeaderTradeDelivery = fragment.ele(
						"ram:ApplicableHeaderTradeDelivery",
					);
					const refNode =
						findNode(
							"788",
							supplyChainTradeTransaction,
							(node) =>
								node.node.nodeName === "ram:ApplicableHeaderTradeSettlement",
						)?.node ?? null;
					supplyChainTradeTransaction.node.insertBefore(
						applicableHeaderTradeDelivery.node,
						refNode,
					);
					return applicableHeaderTradeDelivery;
				},
			);

			if (data.transaction.delivery.recipient) {
				const shipToTradeParty = findNode(
					"643",
					applicableHeaderTradeDelivery,
					(node) => node.node.nodeName === "ram:ShipToTradeParty",
					(fragment) => {
						const shipToTradeParty = fragment.ele("ram:ShipToTradeParty");
						const refNode =
							findNode(
								"725",
								applicableHeaderTradeDelivery,
								(node) => node.node.nodeName === "ram:ShipFromTradeParty",
							)?.node ??
							findNode(
								"766[0]",
								applicableHeaderTradeDelivery,
								(node) =>
									node.node.nodeName ===
									"ram:RequestedDeliverySupplyChainEvent",
							)?.node ??
							findNode(
								"777[0]",
								applicableHeaderTradeDelivery,
								(node) =>
									node.node.nodeName ===
									"ram:RequestedDespatchSupplyChainEvent",
							)?.node ??
							null;
						applicableHeaderTradeDelivery.node.insertBefore(
							shipToTradeParty.node,
							refNode,
						);
						return shipToTradeParty;
					},
				);

				if (data.transaction.delivery.recipient.organization) {
					const specifiedLegalOrganization = fragment().ele(
						"ram:SpecifiedLegalOrganization",
					);
					const refNode =
						findNode(
							"660[0]",
							shipToTradeParty,
							(node) => node.node.nodeName === "ram:DefinedTradeContact",
						)?.node ??
						findNode(
							"670",
							shipToTradeParty,
							(node) => node.node.nodeName === "ram:PostalTradeAddress",
						)?.node ??
						null;
					shipToTradeParty.node.insertBefore(
						specifiedLegalOrganization.node,
						refNode,
					);

					if (data.transaction.delivery.recipient.organization.id) {
						const id = specifiedLegalOrganization
							.ele("ram:ID")
							.txt(
								data.transaction.delivery.recipient.organization.id.identifier,
							);
						if (data.transaction.delivery.recipient.organization.id.schemeId) {
							id.att(
								"schemeID",
								data.transaction.delivery.recipient.organization.id.schemeId,
							);
						}
					}
					if (data.transaction.delivery.recipient.organization.tradingName) {
						specifiedLegalOrganization
							.ele("ram:TradingBusinessName")
							.txt(
								data.transaction.delivery.recipient.organization.tradingName,
							);
					}
				}

				if (
					data.transaction.delivery.recipient.contact?.length &&
					data.transaction.delivery.recipient.contact.length > 0
				) {
					const contactNodes = findAllNodes(
						shipToTradeParty,
						(node) => node.node.nodeName === "ram:DefinedTradeContact",
					);
					for (
						let i = 0;
						i < data.transaction.delivery.recipient.contact.length;
						i++
					) {
						const definedTradeContact = contactNodes[i];
						const contact = data.transaction.delivery.recipient.contact[i];
						if (!definedTradeContact || !contact) continue;

						if (contact.typeCode) {
							const typeCode = fragment()
								.ele("ram:TypeCode")
								.txt(contact.typeCode.value);
							const refNode =
								findNode(
									`664[${i}]`,
									definedTradeContact,
									(node) =>
										node.node.nodeName ===
										"ram:TelephoneUniversalCommunication",
								)?.node ??
								findNode(
									`668[${i}]`,
									definedTradeContact,
									(node) =>
										node.node.nodeName === "ram:EmailURIUniversalCommunication",
								)?.node ??
								null;
							definedTradeContact.node.insertBefore(typeCode.node, refNode);
						}
					}
				}

				if (
					data.transaction.delivery.recipient.taxRegistration?.vat?.length &&
					data.transaction.delivery.recipient.taxRegistration.vat.length > 0
				) {
					for (const taxRegistration of data.transaction.delivery.recipient
						.taxRegistration.vat) {
						shipToTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(taxRegistration.id.identifier)
							.att("schemeID", "VA");
					}
				}
				if (
					data.transaction.delivery.recipient.taxRegistration?.local?.length &&
					data.transaction.delivery.recipient.taxRegistration.local.length > 0
				) {
					for (const taxRegistration of data.transaction.delivery.recipient
						.taxRegistration.local) {
						shipToTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(taxRegistration.id.identifier)
							.att("schemeID", "FC");
					}
				}
			}

			if (data.transaction.delivery.sender) {
				const shipFromTradeParty = findNode(
					"725",
					applicableHeaderTradeDelivery,
					(node) => node.node.nodeName === "ram:ShipFromTradeParty",
					(fragment) => {
						const shipFromTradeParty = fragment.ele("ram:ShipFromTradeParty");
						const refNode =
							findNode(
								"766[0]",
								applicableHeaderTradeDelivery,
								(node) =>
									node.node.nodeName ===
									"ram:RequestedDeliverySupplyChainEvent",
							)?.node ??
							findNode(
								"777[0]",
								applicableHeaderTradeDelivery,
								(node) =>
									node.node.nodeName ===
									"ram:RequestedDespatchSupplyChainEvent",
							)?.node ??
							null;
						applicableHeaderTradeDelivery.node.insertBefore(
							shipFromTradeParty.node,
							refNode,
						);
						return shipFromTradeParty;
					},
				);

				if (data.transaction.delivery.sender.organization) {
					const specifiedLegalOrganization = fragment().ele(
						"ram:SpecifiedLegalOrganization",
					);
					const refNode =
						findNode(
							"742[0]",
							shipFromTradeParty,
							(node) => node.node.nodeName === "ram:DefinedTradeContact",
						)?.node ??
						findNode(
							"752",
							shipFromTradeParty,
							(node) => node.node.nodeName === "ram:PostalTradeAddress",
						)?.node ??
						findNode(
							"760",
							shipFromTradeParty,
							(node) => node.node.nodeName === "ram:URIUniversalCommunication",
						)?.node ??
						null;
					shipFromTradeParty.node.insertBefore(
						specifiedLegalOrganization.node,
						refNode,
					);

					if (data.transaction.delivery.sender.organization.id) {
						const id = specifiedLegalOrganization
							.ele("ram:ID")
							.txt(data.transaction.delivery.sender.organization.id.identifier);
						if (data.transaction.delivery.sender.organization.id.schemeId) {
							id.att(
								"schemeID",
								data.transaction.delivery.sender.organization.id.schemeId,
							);
						}
					}
					if (data.transaction.delivery.sender.organization.tradingName) {
						specifiedLegalOrganization
							.ele("ram:TradingBusinessName")
							.txt(data.transaction.delivery.sender.organization.tradingName);
					}
				}

				if (
					data.transaction.delivery.sender.contact?.length &&
					data.transaction.delivery.sender.contact.length > 0
				) {
					const contactNodes = findAllNodes(
						shipFromTradeParty,
						(node) => node.node.nodeName === "ram:DefinedTradeContact",
					);
					for (
						let i = 0;
						i < data.transaction.delivery.sender.contact.length;
						i++
					) {
						const definedTradeContact = contactNodes[i];
						const contact = data.transaction.delivery.sender.contact[i];
						if (!definedTradeContact || !contact) continue;

						if (contact.typeCode) {
							const typeCode = fragment()
								.ele("ram:TypeCode")
								.txt(contact.typeCode.value);
							const refNode =
								findNode(
									`747[${i}]`,
									definedTradeContact,
									(node) =>
										node.node.nodeName ===
										"ram:TelephoneUniversalCommunication",
								)?.node ??
								findNode(
									`750[${i}]`,
									definedTradeContact,
									(node) =>
										node.node.nodeName === "ram:EmailURIUniversalCommunication",
								)?.node ??
								null;
							definedTradeContact.node.insertBefore(typeCode.node, refNode);
						}
					}
				}

				if (
					data.transaction.delivery.sender.taxRegistration?.vat?.length &&
					data.transaction.delivery.sender.taxRegistration.vat.length > 0
				) {
					for (const taxRegistration of data.transaction.delivery.sender
						.taxRegistration.vat) {
						shipFromTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(taxRegistration.id.identifier)
							.att("schemeID", "VA");
					}
				}

				if (
					data.transaction.delivery.sender.taxRegistration?.local?.length &&
					data.transaction.delivery.sender.taxRegistration.local.length > 0
				) {
					for (const taxRegistration of data.transaction.delivery.sender
						.taxRegistration.local) {
						shipFromTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(taxRegistration.id.identifier)
							.att("schemeID", "FC");
					}
				}
			}
		})();

		// debit
		(() => {
			const applicableHeaderTradeSettlement = findNode(
				"788",
				supplyChainTradeTransaction,
				(node) => node.node.nodeName === "ram:ApplicableHeaderTradeSettlement",
				() =>
					supplyChainTradeTransaction.ele(
						"ram:ApplicableHeaderTradeSettlement",
					),
			);
			const specifiedTradeSettlementHeaderMonetarySummation = findNode(
				"927",
				applicableHeaderTradeSettlement,
				(node) =>
					node.node.nodeName ===
					"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
			);

			if (data.transaction.debit.invoicee) {
				const invoiceeTradeParty = fragment().ele("ram:InvoiceeTradeParty");
				applicableHeaderTradeSettlement.node.insertBefore(
					invoiceeTradeParty.node,
					specifiedTradeSettlementHeaderMonetarySummation?.node ?? null,
				);

				if (data.transaction.debit.invoicee.id) {
					invoiceeTradeParty
						.ele("ram:ID")
						.txt(data.transaction.debit.invoicee.id.identifier);
				}
				if (
					data.transaction.debit.invoicee.globalId?.length &&
					data.transaction.debit.invoicee.globalId.length > 0
				) {
					for (const globalId of data.transaction.debit.invoicee.globalId) {
						invoiceeTradeParty
							.ele("ram:GlobalID")
							.txt(globalId.identifier)
							.att("schemeID", globalId.schemeId);
					}
				}

				invoiceeTradeParty
					.ele("ram:Name")
					.txt(data.transaction.debit.invoicee.name);

				if (data.transaction.debit.invoicee.organization) {
					const specifiedLegalOrganization = invoiceeTradeParty.ele(
						"ram:SpecifiedLegalOrganization",
					);

					if (data.transaction.debit.invoicee.organization.id) {
						const id = specifiedLegalOrganization
							.ele("ram:ID")
							.txt(data.transaction.debit.invoicee.organization.id.identifier);
						if (data.transaction.debit.invoicee.organization.id.schemeId) {
							id.att(
								"schemeID",
								data.transaction.debit.invoicee.organization.id.schemeId,
							);
						}
					}

					if (data.transaction.debit.invoicee.organization.tradingName) {
						specifiedLegalOrganization
							.ele("ram:TradingBusinessName")
							.txt(data.transaction.debit.invoicee.organization.tradingName);
					}
				}

				if (
					data.transaction.debit.invoicee.contact?.length &&
					data.transaction.debit.invoicee.contact.length > 0
				) {
					for (const contact of data.transaction.debit.invoicee.contact) {
						const definedTradeContact = invoiceeTradeParty.ele(
							"ram:DefinedTradeContact",
						);

						if (contact.personName) {
							definedTradeContact.ele("ram:PersonName").txt(contact.personName);
						}
						if (contact.departmentName) {
							definedTradeContact
								.ele("ram:DepartmentName")
								.txt(contact.departmentName);
						}
						if (contact.phoneNumber) {
							definedTradeContact
								.ele("ram:TelephoneUniversalCommunication")
								.ele("ram:CompleteNumber")
								.txt(contact.phoneNumber);
						}
						if (contact.emailAddress) {
							definedTradeContact
								.ele("ram:EmailURIUniversalCommunication")
								.ele("ram:URIID")
								.txt(contact.emailAddress);
						}
					}
				}

				if (data.transaction.debit.invoicee.postalAddress) {
					const postalTradeAddress = invoiceeTradeParty.ele(
						"ram:PostalTradeAddress",
					);

					if (data.transaction.debit.invoicee.postalAddress.postCode) {
						postalTradeAddress
							.ele("ram:PostcodeCode")
							.txt(data.transaction.debit.invoicee.postalAddress.postCode);
					}

					if (data.transaction.debit.invoicee.postalAddress.line1) {
						postalTradeAddress
							.ele("ram:LineOne")
							.txt(data.transaction.debit.invoicee.postalAddress.line1);
					}

					if (data.transaction.debit.invoicee.postalAddress.line2) {
						postalTradeAddress
							.ele("ram:LineTwo")
							.txt(data.transaction.debit.invoicee.postalAddress.line2);
					}

					if (data.transaction.debit.invoicee.postalAddress.line3) {
						postalTradeAddress
							.ele("ram:LineThree")
							.txt(data.transaction.debit.invoicee.postalAddress.line3);
					}

					if (data.transaction.debit.invoicee.postalAddress.city) {
						postalTradeAddress
							.ele("ram:CityName")
							.txt(data.transaction.debit.invoicee.postalAddress.city);
					}

					postalTradeAddress
						.ele("ram:CountryID")
						.txt(
							data.transaction.debit.invoicee.postalAddress.countryCode.value,
						);

					if (
						data.transaction.debit.invoicee.postalAddress.countrySubdivision
					) {
						postalTradeAddress
							.ele("ram:CountrySubDivisionName")
							.txt(
								data.transaction.debit.invoicee.postalAddress
									.countrySubdivision,
							);
					}
				}

				if (data.transaction.debit.invoicee.electronicAddress) {
					invoiceeTradeParty
						.ele("ram:URIUniversalCommunication")
						.ele("ram:URIID")
						.txt(data.transaction.debit.invoicee.electronicAddress.identifier)
						.att(
							"schemeID",
							data.transaction.debit.invoicee.electronicAddress.schemeId,
						);
				}

				if (
					data.transaction.debit.invoicee.taxRegistration?.vat?.length &&
					data.transaction.debit.invoicee.taxRegistration.vat.length > 0
				) {
					for (const taxRegistration of data.transaction.debit.invoicee
						.taxRegistration.vat) {
						invoiceeTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(taxRegistration.id.identifier)
							.att("schemeID", "VA");
					}
				}

				if (
					data.transaction.debit.invoicee.taxRegistration?.local?.length &&
					data.transaction.debit.invoicee.taxRegistration.local.length > 0
				) {
					for (const taxRegistration of data.transaction.debit.invoicee
						.taxRegistration.local) {
						invoiceeTradeParty
							.ele("ram:SpecifiedTaxRegistration")
							.ele("ram:ID")
							.txt(taxRegistration.id.identifier)
							.att("schemeID", "FC");
					}
				}
			}

			if (data.transaction.debit.paymentMeans) {
				const specifiedTradeSettlementPaymentMeans = fragment().ele(
					"ram:SpecifiedTradeSettlementPaymentMeans",
				);

				if (data.transaction.debit.paymentMeans.typeCode) {
					specifiedTradeSettlementPaymentMeans
						.ele("ram:TypeCode")
						.txt(data.transaction.debit.paymentMeans.typeCode.value);
				}
				if (data.transaction.debit.paymentMeans.information) {
					specifiedTradeSettlementPaymentMeans
						.ele("ram:Information")
						.txt(data.transaction.debit.paymentMeans.information);
				}
			}

			if (
				data.transaction.debit.allowances?.length &&
				data.transaction.debit.allowances.length > 0
			) {
				for (const allowance of data.transaction.debit.allowances) {
					const specifiedTradeAllowanceCharge = fragment().ele(
						"ram:SpecifiedTradeAllowanceCharge",
					);
					applicableHeaderTradeSettlement.node.insertBefore(
						specifiedTradeAllowanceCharge.node,
						specifiedTradeSettlementHeaderMonetarySummation?.node ?? null,
					);

					specifiedTradeAllowanceCharge
						.ele("ram:ChargeIndicator")
						.ele("udt:Indicator")
						.txt("false");

					if (typeof allowance.calculationPercent === "number") {
						specifiedTradeAllowanceCharge
							.ele("ram:CalculationPercent")
							.txt(allowance.calculationPercent.toString());
					}

					if (typeof allowance.basisAmount === "number") {
						specifiedTradeAllowanceCharge
							.ele("ram:BasisAmount")
							.txt(allowance.basisAmount.toString());
					}

					specifiedTradeAllowanceCharge
						.ele("ram:ActualAmount")
						.txt(allowance.actualAmount.toString());

					if (allowance.reasonCode) {
						specifiedTradeAllowanceCharge
							.ele("ram:ReasonCode")
							.txt(allowance.reasonCode.value);
					}

					if (allowance.reason) {
						specifiedTradeAllowanceCharge
							.ele("ram:Reason")
							.txt(allowance.reason);
					}

					if (allowance.categoryTradeTax) {
						const categoryTradeTax = specifiedTradeAllowanceCharge.ele(
							"ram:CategoryTradeTax",
						);

						categoryTradeTax.ele("ram:TypeCode").txt("VAT");
						categoryTradeTax
							.ele("ram:CategoryCode")
							.txt(allowance.categoryTradeTax.categoryCode.value);
						if (
							typeof allowance.categoryTradeTax.rateApplicablePercent ===
							"number"
						) {
							categoryTradeTax
								.ele("ram:RateApplicablePercent")
								.txt(
									allowance.categoryTradeTax.rateApplicablePercent.toString(),
								);
						}
					}
				}
			}

			if (
				data.transaction.debit.charges?.length &&
				data.transaction.debit.charges.length
			) {
				for (const charge of data.transaction.debit.charges) {
					const specifiedTradeAllowanceCharge = fragment().ele(
						"ram:SpecifiedTradeAllowanceCharge",
					);
					applicableHeaderTradeSettlement.node.insertBefore(
						specifiedTradeAllowanceCharge.node,
						specifiedTradeSettlementHeaderMonetarySummation?.node ?? null,
					);

					specifiedTradeAllowanceCharge
						.ele("ram:ChargeIndicator")
						.ele("udt:Indicator")
						.txt("true");

					if (typeof charge.calculationPercent === "number") {
						specifiedTradeAllowanceCharge
							.ele("ram:CalculationPercent")
							.txt(charge.calculationPercent.toString());
					}

					if (typeof charge.basisAmount === "number") {
						specifiedTradeAllowanceCharge
							.ele("ram:BasisAmount")
							.txt(charge.basisAmount.toString());
					}

					specifiedTradeAllowanceCharge
						.ele("ram:ActualAmount")
						.txt(charge.actualAmount.toString());

					if (charge.reasonCode) {
						specifiedTradeAllowanceCharge
							.ele("ram:ReasonCode")
							.txt(charge.reasonCode.value);
					}

					if (charge.reason) {
						specifiedTradeAllowanceCharge.ele("ram:Reason").txt(charge.reason);
					}

					if (charge.categoryTradeTax) {
						const categoryTradeTax = specifiedTradeAllowanceCharge.ele(
							"ram:CategoryTradeTax",
						);

						categoryTradeTax.ele("ram:TypeCode").txt("VAT");
						categoryTradeTax
							.ele("ram:CategoryCode")
							.txt(charge.categoryTradeTax.categoryCode.value);
						if (
							typeof charge.categoryTradeTax.rateApplicablePercent === "number"
						) {
							categoryTradeTax
								.ele("ram:RateApplicablePercent")
								.txt(charge.categoryTradeTax.rateApplicablePercent.toString());
						}
					}
				}
			}

			if (data.transaction.debit.paymentTerms) {
				const specifiedTradePaymentTerms = fragment().ele(
					"ram:SpecifiedTradePaymentTerms",
				);
				applicableHeaderTradeSettlement.node.insertBefore(
					specifiedTradePaymentTerms.node,
					specifiedTradeSettlementHeaderMonetarySummation?.node ?? null,
				);
				specifiedTradePaymentTerms
					.ele("ram:Description")
					.txt(data.transaction.debit.paymentTerms.description);
			}
		})();
	},
	rules(data, ctx) {},
});
