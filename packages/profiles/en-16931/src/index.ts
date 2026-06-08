import { basic } from "@node-zugferd/basic";
import { base64, defineProfile } from "@node-zugferd/utils";
import { fragment } from "xmlbuilder2";
import { schema } from "./schema";

export const en16931 = defineProfile({
	id: "en-16931",
	dataRelationship: ["Alternative", "Source", "Data"],
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "EN 16931",
		fileName: "factur-x.xml",
		version: "1.0",
	},
	use: [basic],
	schema,
	build(data, { root, findNode, findAllNodes, getCachedNode, setCachedNode }) {
		const crossIndustryInvoice = root.first();

		if (data.transaction) {
			const supplyChainTradeTransaction = findNode(
				"BG-25-00",
				crossIndustryInvoice,
				(node) => node.node.nodeName === "rsm:SupplyChainTradeTransaction",
				() => crossIndustryInvoice.ele("rsm:SupplyChainTradeTransaction"),
			);

			if (data.transaction.line.length > 0) {
				const lineNodes = findAllNodes(
					supplyChainTradeTransaction,
					(node) =>
						node.node.nodeName === "ram:IncludedSupplyChainTradeLineItem",
				);

				for (let i = 0; i < data.transaction.line.length; i++) {
					const includedSupplyChainTradeLineItem = lineNodes[i];
					const line = data.transaction.line[i];
					if (!includedSupplyChainTradeLineItem || !line) continue;

					// item
					(() => {
						const specifiedTradeProduct = findNode(
							`BG-31[${i}]`,
							includedSupplyChainTradeLineItem,
							(node) => node.node.nodeName === "ram:SpecifiedTradeProduct",
							(fragment) => {
								const specifiedTradeProduct = fragment.ele(
									"ram:SpecifiedTradeProduct",
								);
								const refNode =
									findNode(
										`BG-29[${i}]`,
										includedSupplyChainTradeLineItem,
										(node) =>
											node.node.nodeName === "ram:SpecifiedLineTradeAgreement",
									)?.node ?? null;
								includedSupplyChainTradeLineItem.node.insertBefore(
									specifiedTradeProduct.node,
									refNode,
								);
								return specifiedTradeProduct;
							},
						);

						if (line.item.sellerAssignedId) {
							const refNode =
								findNode(
									`BT-153[${i}]`,
									specifiedTradeProduct,
									(node) => node.node.nodeName === "ram:Name",
								)?.node ?? null;
							const sellerAssignedId = fragment().ele("ram:SellerAssignedID");
							sellerAssignedId.txt(line.item.sellerAssignedId.identifier);
							specifiedTradeProduct.node.insertBefore(
								sellerAssignedId.node,
								refNode,
							);
						}

						if (line.item.buyerAssignedId) {
							const refNode =
								findNode(
									`BT-153[${i}]`,
									specifiedTradeProduct,
									(node) => node.node.nodeName === "ram:Name",
								)?.node ?? null;
							const buyerAssignedId = fragment().ele("ram:BuyerAssignedID");
							buyerAssignedId.txt(line.item.buyerAssignedId.identifier);
							specifiedTradeProduct.node.insertBefore(
								buyerAssignedId.node,
								refNode,
							);
						}

						if (line.item.description) {
							specifiedTradeProduct
								.ele("ram:Description")
								.txt(line.item.description);
						}

						if (
							line.item.attributes?.length &&
							line.item.attributes.length > 0
						) {
							for (const attr of line.item.attributes) {
								const applicableProductCharacteristic =
									specifiedTradeProduct.ele(
										"ram:ApplicableProductCharacteristic",
									);
								applicableProductCharacteristic
									.ele("ram:Description")
									.txt(attr.description);
								applicableProductCharacteristic
									.ele("ram:Value")
									.txt(attr.value);
							}
						}

						if (line.item.classification) {
							const designatedProductClassification = specifiedTradeProduct.ele(
								"ram:DesignatedProductClassification",
							);

							if (
								line.item.classification.classCode?.length &&
								line.item.classification.classCode.length > 0
							) {
								for (const classCode of line.item.classification.classCode) {
									const productClassificationCode =
										designatedProductClassification.ele(
											"ram:ProductClassificationCode",
										);
									productClassificationCode
										.txt(classCode.identifier)
										.att("listID", classCode.schemeId);
									if (classCode.schemeVersion) {
										productClassificationCode.att(
											"listVersionID",
											classCode.schemeVersion,
										);
									}
								}
							}
						}

						if (line.item.originTradeCountry) {
							specifiedTradeProduct
								.ele("ram:OriginTradeCountry")
								.ele("ram:ID")
								.txt(line.item.originTradeCountry);
						}
					})();

					// priceDetails
					(() => {
						const specifiedLineTradeAgreement = findNode(
							`BG-29[${i}]`,
							includedSupplyChainTradeLineItem,
							(node) =>
								node.node.nodeName === "ram:SpecifiedLineTradeAgreement",
							() => crossIndustryInvoice.ele("ram:SpecifiedLineTradeAgreement"),
						);

						if (line.priceDetails.associatedOrder) {
							const refNode =
								(
									getCachedNode(`BT-148-00[${i}]`) ||
									getCachedNode(`BT-146-00[${i}]`) ||
									setCachedNode(
										(node) =>
											node.node.nodeName === "ram:GrossPriceProductTradePrice"
												? `BT-148-00[${i}]`
												: `BT-146-00[${i}]`,
										specifiedLineTradeAgreement.find((node) =>
											[
												"ram:GrossPriceProductTradePrice",
												"ram:NetPriceProductTradePrice",
											].includes(node.node.nodeName),
										),
									)
								)?.node ?? null;
							const associatedOrder = fragment().ele(
								"ram:BuyerOrderReferencedDocument",
							);
							specifiedLineTradeAgreement.node.insertBefore(
								associatedOrder.node,
								refNode,
							);

							if (line.priceDetails.associatedOrder.lineId) {
								associatedOrder
									.ele("ram:LineID")
									.txt(line.priceDetails.associatedOrder.lineId);
							}
						}
					})();

					if (line.billing) {
						const specifiedLineTradeSettlement = findNode(
							`BG-30-00[${i}]`,
							includedSupplyChainTradeLineItem,
							(node) =>
								node.node.nodeName === "ram:SpecifiedLineTradeSettlement",
							() =>
								includedSupplyChainTradeLineItem.ele(
									"ram:SpecifiedLineTradeSettlement",
								),
						);

						if (
							line.billing.allowances?.length &&
							line.billing.allowances.length > 0
						) {
							const allowanceNodes = findAllNodes(
								specifiedLineTradeSettlement,
								(node) =>
									node.node.nodeName ===
										"ram:SpecifiedLineTradeAllowanceCharge" &&
									[...node.node.childNodes].some(
										(child) =>
											child.nodeName === "ram:ChargeIndicator" &&
											[...child.childNodes].some(
												(c) =>
													c.nodeName === "udt:Indicator" &&
													c.textContent?.trim() === "false",
											),
									),
							);
							for (let j = 0; j < line.billing.allowances.length; j++) {
								const allowance = line.billing.allowances[j];
								const allowanceNode = allowanceNodes[j];
								if (!allowanceNode || !allowance) continue;

								if (allowance.calculationPercent) {
								}

								if (allowance.basisAmount) {
								}
							}
						}

						if (
							line.billing.charges?.length &&
							line.billing.charges.length > 0
						) {
							const allowanceNodes = findAllNodes(
								specifiedLineTradeSettlement,
								(node) =>
									node.node.nodeName ===
										"ram:SpecifiedLineTradeAllowanceCharge" &&
									[...node.node.childNodes].some(
										(child) =>
											child.nodeName === "ram:ChargeIndicator" &&
											[...child.childNodes].some(
												(c) =>
													c.nodeName === "udt:Indicator" &&
													c.textContent?.trim() === "true",
											),
									),
							);
							for (let j = 0; j < line.billing.charges.length; j++) {
								const charge = line.billing.charges[j];
								const chargeNode = allowanceNodes[j];
								if (!chargeNode || !charge) continue;

								if (typeof charge.calculationPercent === "number") {
									const refNode =
										findNode(
											`BT-136[${i}][${j}]`,
											chargeNode,
											(node) => node.node.nodeName === "ram:ActualAmount",
										)?.node ?? null;
									const calculationPercent = fragment().ele(
										"ram:CalculationPercent",
									);
									calculationPercent.txt(charge.calculationPercent.toString());
									chargeNode.node.insertBefore(
										calculationPercent.node,
										refNode,
									);
								}

								if (charge.basisAmount) {
									const refNode =
										findNode(
											`BT-136[${i}][${j}]`,
											chargeNode,
											(node) => node.node.nodeName === "ram:ActualAmount",
										)?.node ?? null;
									const basisAmount = fragment().ele("ram:BasisAmount");
									basisAmount.txt(charge.basisAmount.value.toString());
									chargeNode.node.insertBefore(basisAmount.node, refNode);
								}
							}
						}

						if (line.billing.additionalReferencedDocument) {
							const additionalReferencedDocument =
								specifiedLineTradeSettlement.ele(
									"ram:AdditionalReferencedDocument",
								);

							if (line.billing.additionalReferencedDocument.issuerAssignedId) {
								additionalReferencedDocument
									.ele("ram:IssuerAssignedID")
									.txt(
										line.billing.additionalReferencedDocument.issuerAssignedId
											.identifier,
									);
							}

							additionalReferencedDocument
								.ele("ram:TypeCode")
								.txt(line.billing.additionalReferencedDocument.typeCode);

							if (line.billing.additionalReferencedDocument.referenceTypeCode) {
								additionalReferencedDocument
									.ele("ram:ReferenceTypeCode")
									.txt(
										line.billing.additionalReferencedDocument.referenceTypeCode,
									);
							}
						}

						if (line.billing.accountingReference) {
							for (const accountingReference of Array.isArray(
								line.billing.accountingReference,
							)
								? line.billing.accountingReference
								: [line.billing.accountingReference]) {
								const receivableSpecifiedTradeAccountingAccount =
									specifiedLineTradeSettlement.ele(
										"ram:ReceivableSpecifiedTradeAccountingAccount",
									);
								if (accountingReference.id) {
									receivableSpecifiedTradeAccountingAccount
										.ele("ram:ID")
										.txt(accountingReference.id);
								}
							}
						}
					}
				}
			}

			if (data.transaction.contract) {
				const applicableHeaderTradeAgreement = findNode(
					"BT-10-00",
					supplyChainTradeTransaction,
					(node) => node.node.nodeName === "ram:ApplicableHeaderTradeAgreement",
					(fragment) => {
						const applicableHeaderTradeAgreement = fragment.ele(
							"ram:ApplicableHeaderTradeAgreement",
						);
						const refNode =
							(
								getCachedNode("BG-13-00") ||
								getCachedNode("BG-19") ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:ApplicableHeaderTradeDelivery"
											? "BG-13-00"
											: "BG-19",
									supplyChainTradeTransaction.find((node) =>
										[
											"ram:ApplicableHeaderTradeDelivery",
											"ram:ApplicableHeaderTradeSettlement",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
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
						"BG-4",
						applicableHeaderTradeAgreement,
						(node) => node.node.nodeName === "ram:SellerTradeParty",
						(fragment) => {
							const sellerTradeParty = fragment.ele("ram:SellerTradeParty");
							const refNode =
								findNode(
									"BG-7",
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
						const refNode =
							findNode(
								"BG-5",
								sellerTradeParty,
								(node) => node.node.nodeName === "ram:PostalTradeAddress",
							)?.node ?? null;
						const description = fragment().ele("ram:Description");
						description.txt(data.transaction.contract.seller.description);
						sellerTradeParty.node.insertBefore(description.node, refNode);
					}

					if (data.transaction.contract.seller.contact) {
						const refNode =
							findNode(
								"BG-5",
								sellerTradeParty,
								(node) => node.node.nodeName === "ram:PostalTradeAddress",
							)?.node ?? null;
						for (const contact of Array.isArray(
							data.transaction.contract.seller.contact,
						)
							? data.transaction.contract.seller.contact
							: [data.transaction.contract.seller.contact]) {
							const definedTradeContact = fragment().ele(
								"ram:DefinedTradeContact",
							);
							sellerTradeParty.node.insertBefore(
								definedTradeContact.node,
								refNode,
							);

							if (contact.personName) {
								definedTradeContact
									.ele("ram:PersonName")
									.txt(contact.personName);
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
				})();

				// buyer
				(() => {
					const buyerTradeParty = findNode(
						"BG-7",
						applicableHeaderTradeAgreement,
						(node) => node.node.nodeName === "ram:BuyerTradeParty",
						(fragment) => {
							const buyerTradeParty = fragment.ele("ram:BuyerTradeParty");
							const refNode =
								(
									getCachedNode("BG-11") ||
									getCachedNode("BT-13-00") ||
									getCachedNode("BT-12-00") ||
									setCachedNode(
										(node) =>
											node.node.nodeName === "ram:SellerTaxRepresentativeParty"
												? "BG-11"
												: node.node.nodeName ===
														"ram:BuyerOrderReferencedDocument"
													? "BT-13-00"
													: "BT-12-00",
										applicableHeaderTradeAgreement.find((node) =>
											[
												"ram:SellerTaxRepresentativeParty",
												"ram:BuyerOrderReferencedDocument",
												"ram:ContractReferencedDocument",
											].includes(node.node.nodeName),
										),
									)
								)?.node ?? null;
							applicableHeaderTradeAgreement.node.insertBefore(
								buyerTradeParty.node,
								refNode,
							);
							return buyerTradeParty;
						},
					);

					if (data.transaction.contract.buyer.organization) {
						const specifiedLegalOrganization = findNode(
							"BT-47-00",
							buyerTradeParty,
							(node) => node.node.nodeName === "ram:SpecifiedLegalOrganization",
							(fragment) => {
								const specifiedLegalOrganization = fragment.ele(
									"ram:SpecifiedLegalOrganization",
								);
								const refNode =
									findNode(
										"BG-8",
										buyerTradeParty,
										(node) => node.node.nodeName === "ram:PostalTradeAddress",
									)?.node ?? null;
								buyerTradeParty.node.insertBefore(
									specifiedLegalOrganization.node,
									refNode,
								);
								return specifiedLegalOrganization;
							},
						);

						if (data.transaction.contract.buyer.organization.tradingName) {
							specifiedLegalOrganization
								.ele("ram:TradingBusinessName")
								.txt(data.transaction.contract.buyer.organization.tradingName);
						}
					}

					if (data.transaction.contract.buyer.contact) {
						const refNode =
							findNode(
								"BG-8",
								buyerTradeParty,
								(node) => node.node.nodeName === "ram:PostalTradeAddress",
							)?.node ?? null;
						for (const contact of Array.isArray(
							data.transaction.contract.buyer.contact,
						)
							? data.transaction.contract.buyer.contact
							: [data.transaction.contract.buyer.contact]) {
							const definedTradeContact = fragment().ele(
								"ram:DefinedTradeContact",
							);
							buyerTradeParty.node.insertBefore(
								definedTradeContact.node,
								refNode,
							);

							if (contact.personName) {
								definedTradeContact
									.ele("ram:PersonName")
									.txt(contact.personName);
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
				})();

				if (data.transaction.contract.sellerOrderReferencedDocument) {
					const sellerOrderReferencedDocument = fragment().ele(
						"ram:SellerOrderReferencedDocument",
					);
					const refNode =
						(
							getCachedNode("BT-13-00") ||
							getCachedNode("BT-12-00") ||
							setCachedNode(
								(node) =>
									node.node.nodeName === "ram:BuyerOrderReferencedDocument"
										? "BT-13-00"
										: "BT-12-00",
								applicableHeaderTradeAgreement.find((node) =>
									[
										"ram:BuyerOrderReferencedDocument",
										"ram:ContractReferencedDocument",
									].includes(node.node.nodeName),
								),
							)
						)?.node ?? null;
					applicableHeaderTradeAgreement.node.insertBefore(
						sellerOrderReferencedDocument.node,
						refNode,
					);

					if (
						data.transaction.contract.sellerOrderReferencedDocument
							.issuerAssignedId
					) {
						sellerOrderReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(
								data.transaction.contract.sellerOrderReferencedDocument
									.issuerAssignedId,
							);
					}
				}

				if (
					data.transaction.contract.additionalSupportingDocuments?.length &&
					data.transaction.contract.additionalSupportingDocuments.length > 0
				) {
					for (const doc of data.transaction.contract
						.additionalSupportingDocuments) {
						const additionalReferencedDocument =
							applicableHeaderTradeAgreement.ele(
								"ram:AdditionalReferencedDocument",
							);
						additionalReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(doc.issuerAssignedId);
						if (doc.uri) {
							additionalReferencedDocument.ele("ram:URIID").txt(doc.uri);
						}
						additionalReferencedDocument.ele("ram:TypeCode").txt("916");
						if (doc.name) {
							additionalReferencedDocument.ele("ram:Name").txt(doc.name);
						}
						if (doc.attachedDocument) {
							const attachmentBinaryObject = additionalReferencedDocument.ele(
								"ram:AttachmentBinaryObject",
							);
							attachmentBinaryObject
								.txt(base64.encode(doc.attachedDocument.content))
								.att("mimeCode", doc.attachedDocument.mimeType)
								.att("filename", doc.attachedDocument.filename);
						}
					}
				}

				if (data.transaction.contract.tenderOrLotReferences) {
					const tenderOrLotReferences = Array.isArray(
						data.transaction.contract.tenderOrLotReferences,
					)
						? data.transaction.contract.tenderOrLotReferences
						: [data.transaction.contract.tenderOrLotReferences];
					for (const tenderOrLotReference of tenderOrLotReferences) {
						const additionalReferencedDocument =
							applicableHeaderTradeAgreement.ele(
								"ram:AdditionalReferencedDocument",
							);
						if (tenderOrLotReference.issuerAssignedId) {
							additionalReferencedDocument
								.ele("ram:IssuerAssignedID")
								.txt(tenderOrLotReference.issuerAssignedId);
						}
						additionalReferencedDocument.ele("ram:TypeCode").txt("50");
					}
				}

				if (data.transaction.contract.invoicedObjectIdentifier) {
					const invoicedObjectIdentifiers = Array.isArray(
						data.transaction.contract.invoicedObjectIdentifier,
					)
						? data.transaction.contract.invoicedObjectIdentifier
						: [data.transaction.contract.invoicedObjectIdentifier];
					for (const invoicedObjectIdentifier of invoicedObjectIdentifiers) {
						const additionalReferencedDocument =
							applicableHeaderTradeAgreement.ele(
								"ram:AdditionalReferencedDocument",
							);
						if (invoicedObjectIdentifier.issuerAssignedId) {
							additionalReferencedDocument
								.ele("ram:IssuerAssignedID")
								.txt(invoicedObjectIdentifier.issuerAssignedId.identifier);
						}
						additionalReferencedDocument.ele("ram:TypeCode").txt("130");
						if (invoicedObjectIdentifier.referenceTypeCode) {
							additionalReferencedDocument
								.ele("ram:ReferenceTypeCode")
								.txt(invoicedObjectIdentifier.referenceTypeCode);
						}
					}
				}

				if (data.transaction.contract.projectReference) {
					const specifiedProcuringProject = applicableHeaderTradeAgreement.ele(
						"ram:SpecifiedProcuringProject",
					);
					if (data.transaction.contract.projectReference.id) {
						specifiedProcuringProject
							.ele("ram:ID")
							.txt(data.transaction.contract.projectReference.id);
					}
					specifiedProcuringProject
						.ele("ram:Name")
						.txt(data.transaction.contract.projectReference.name);
				}
			}

			if (data.transaction.delivery) {
				const applicableHeaderTradeDelivery = findNode(
					"BG-13-00",
					supplyChainTradeTransaction,
					(node) => node.node.nodeName === "ram:ApplicableHeaderTradeDelivery",
					(fragment) => {
						const applicableHeaderTradeDelivery = fragment.ele(
							"ram:ApplicableHeaderTradeDelivery",
						);
						const refNode =
							findNode(
								"BG-19",
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

				if (data.transaction.delivery.associatedGoodsReceipt) {
					const receivingAdviceReferencedDocument =
						applicableHeaderTradeDelivery.ele(
							"ram:ReceivingAdviceReferencedDocument",
						);
					if (
						data.transaction.delivery.associatedGoodsReceipt.issuerAssignedId
					) {
						receivingAdviceReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(
								data.transaction.delivery.associatedGoodsReceipt
									.issuerAssignedId,
							);
					}
				}
			}

			if (data.transaction.debit) {
				const applicableHeaderTradeSettlement = findNode(
					"BG-19",
					supplyChainTradeTransaction,
					(node) =>
						node.node.nodeName === "ram:ApplicableHeaderTradeSettlement",
					() =>
						supplyChainTradeTransaction.ele(
							"ram:ApplicableHeaderTradeSettlement",
						),
				);

				if (data.transaction.debit.paymentMeans) {
					const specifiedTradeSettlementPaymentMeans = findNode(
						"BG-16",
						applicableHeaderTradeSettlement,
						(node) =>
							node.node.nodeName === "ram:SpecifiedTradeSettlementPaymentMeans",
						(fragment) => {
							const specifiedTradeSettlementPaymentMeans = fragment.ele(
								"ram:SpecifiedTradeSettlementPaymentMeans",
							);
							const refNode =
								applicableHeaderTradeSettlement.find(
									(node) => node.node.nodeName === "ram:ApplicableTradeTax",
								)?.node ?? null;
							applicableHeaderTradeSettlement.node.insertBefore(
								specifiedTradeSettlementPaymentMeans.node,
								refNode,
							);
							return specifiedTradeSettlementPaymentMeans;
						},
					);

					if (data.transaction.debit.paymentMeans.information) {
						const information = fragment().ele("ram:Information");
						const refNode =
							(
								getCachedNode("BT-91-00") ||
								getCachedNode("BG-17[0]") ||
								setCachedNode(
									(node) =>
										node.node.nodeName ===
										"ram:PayerPartyDebtorFinancialAccount"
											? "BT-91-00"
											: "BG-17[0]",
									specifiedTradeSettlementPaymentMeans.find((node) =>
										[
											"ram:PayerPartyDebtorFinancialAccount",
											"ram:PayeePartyCreditorFinancialAccount",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						specifiedTradeSettlementPaymentMeans.node.insertBefore(
							information.node,
							refNode,
						);
					}

					if (data.transaction.debit.paymentMeans.cardInfo) {
						const applicableTradeSettlementFinancialCard = fragment().ele(
							"ram:ApplicableTradeSettlementFinancialCard",
						);
						const refNode =
							(
								getCachedNode("BT-91-00") ||
								getCachedNode("BG-17[0]") ||
								setCachedNode(
									(node) =>
										node.node.nodeName ===
										"ram:PayerPartyDebtorFinancialAccount"
											? "BT-91-00"
											: "BG-17[0]",
									specifiedTradeSettlementPaymentMeans.find((node) =>
										[
											"ram:PayerPartyDebtorFinancialAccount",
											"ram:PayeePartyCreditorFinancialAccount",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						specifiedTradeSettlementPaymentMeans.node.insertBefore(
							applicableTradeSettlementFinancialCard.node,
							refNode,
						);

						applicableTradeSettlementFinancialCard
							.ele("ram:ID")
							.txt(data.transaction.debit.paymentMeans.cardInfo.accountNumber);
						if (data.transaction.debit.paymentMeans.cardInfo.cardholderName) {
							applicableTradeSettlementFinancialCard
								.ele("ram:CardholderName")
								.txt(
									data.transaction.debit.paymentMeans.cardInfo.cardholderName,
								);
						}
					}

					if (
						data.transaction.debit.paymentMeans.creditTransfers?.length &&
						data.transaction.debit.paymentMeans.creditTransfers.length > 0
					) {
						const creditTransferNodes = findAllNodes(
							specifiedTradeSettlementPaymentMeans,
							(node) =>
								node.node.nodeName === "ram:PayeePartyCreditorFinancialAccount",
						);
						for (
							let i = 0;
							i < data.transaction.debit.paymentMeans.creditTransfers.length;
							i++
						) {
							const creditTransfer =
								data.transaction.debit.paymentMeans.creditTransfers[i];
							const creditTransferNode = creditTransferNodes[i];
							if (!creditTransferNode || !creditTransfer) continue;

							if (creditTransfer.accountName) {
								const accountName = fragment().ele("ram:AccountName");
								accountName.txt(creditTransfer.accountName);
								const refNode =
									findNode(
										`BT-84-0[${i}]`,
										creditTransferNode,
										(node) => node.node.nodeName === "ram:ProprietaryID",
									)?.node ?? null;
								creditTransferNode.node.insertBefore(accountName.node, refNode);
							}
						}
					}

					if (data.transaction.debit.paymentMeans.sellerBankDetails) {
						const payeeSpecifiedCreditorFinancialInstitution =
							specifiedTradeSettlementPaymentMeans.ele(
								"ram:PayeeSpecifiedCreditorFinancialInstitution",
							);
						if (data.transaction.debit.paymentMeans.sellerBankDetails.bic) {
							payeeSpecifiedCreditorFinancialInstitution
								.ele("ram:BICID")
								.txt(
									data.transaction.debit.paymentMeans.sellerBankDetails.bic
										.identifier,
								);
						}
					}
				}

				const vatBreakdownNodes = findAllNodes(
					applicableHeaderTradeSettlement,
					(node) => node.node.nodeName === "ram:ApplicableTradeTax",
				);
				for (let i = 0; i < data.transaction.debit.vatBreakdown.length; i++) {
					const vatBreakdown = data.transaction.debit.vatBreakdown[i];
					const vatBreakdownNode = vatBreakdownNodes[i];
					if (!vatBreakdownNode || !vatBreakdown) continue;

					if (vatBreakdown.taxDueDate) {
						const taxPointDate = fragment().ele("ram:TaxPointDate");
						taxPointDate
							.ele("udt:DateString")
							.txt(vatBreakdown.taxDueDate)
							.att("format", "102");
						const refNode =
							(
								getCachedNode(`BT-8[${i}]`) ||
								getCachedNode(`BT-119[${i}]`) ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:DueDateTypeCode"
											? `BT-8[${i}]`
											: `BT-119[${i}]`,
									vatBreakdownNode.find((node) =>
										[
											"ram:DueDateTypeCode",
											"ram:RateApplicablePercent",
										].includes(node.node.nodeName),
									),
								)
							)?.node ?? null;
						vatBreakdownNode.node.insertBefore(taxPointDate.node, refNode);
					}
				}

				if (data.transaction.debit.documentTotals.roundingAmount) {
					const specifiedTradeSettlementHeaderMonetarySummation = findNode(
						"BG-22",
						applicableHeaderTradeSettlement,
						(node) =>
							node.node.nodeName ===
							"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
						(fragment) => {
							const specifiedTradeSettlementHeaderMonetarySummation =
								fragment.ele(
									"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
								);
							const refNode =
								(
									getCachedNode("BG-3[0]") ||
									getCachedNode("BT-19-00") ||
									setCachedNode(
										(node) =>
											node.node.nodeName === "ram:InvoiceReferencedDocument"
												? "BG-3[0]"
												: "BT-19",
										applicableHeaderTradeSettlement.find((node) =>
											[
												"ram:InvoiceReferencedDocument",
												"ram:ReceivableSpecifiedTradeAccountingAccount",
											].includes(node.node.nodeName),
										),
									)
								)?.node ?? null;
							applicableHeaderTradeSettlement.node.insertBefore(
								specifiedTradeSettlementHeaderMonetarySummation.node,
								refNode,
							);
							return specifiedTradeSettlementHeaderMonetarySummation;
						},
					);
					const roundingAmount = fragment().ele("ram:RoundingAmount");
					roundingAmount.txt(
						data.transaction.debit.documentTotals.roundingAmount.value.toString(),
					);
					const refNode =
						findNode(
							"BT-112",
							specifiedTradeSettlementHeaderMonetarySummation,
							(node) => node.node.nodeName === "ram:GrandTotalAmount",
						)?.node ?? null;
					specifiedTradeSettlementHeaderMonetarySummation.node.insertBefore(
						roundingAmount.node,
						refNode,
					);
				}
			}
		}
	},
	rules(data, ctx) {},
});
