import type { XMLBuilder } from "@node-zugferd/core";
import { minimum } from "@node-zugferd/minimum";
import { defineProfile } from "@node-zugferd/utils";
import { fragment } from "xmlbuilder2";
import { schema } from "./schema";

export const basicWL = defineProfile({
	id: "basic-wl",
	dataRelationship: "Data",
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "BASIC WL",
		fileName: "factur-x.xml",
		version: "1.0",
	},
	use: [minimum],
	schema,
	build(data, { root, findNode, getCachedNode, setCachedNode }) {
		const crossIndustryInvoice = root.first();
		let supplyChainTradeTransaction: XMLBuilder | null | undefined = null;

		if (data.exchangedDocument) {
			const exchangedDocument = findNode(
				"BT-1-00",
				crossIndustryInvoice,
				(node) => node.node.nodeName === "rsm:ExchangedDocument",
				(fragment) => {
					const exchangedDocument = fragment.ele("rsm:ExchangedDocument");
					supplyChainTradeTransaction = findNode(
						"BG-25-00",
						crossIndustryInvoice,
						(node) => node.node.nodeName === "rsm:SupplyChainTradeTransaction",
					);
					crossIndustryInvoice.node.insertBefore(
						exchangedDocument.node,
						supplyChainTradeTransaction?.node ?? null,
					);
					return exchangedDocument;
				},
			);

			if (
				data.exchangedDocument.invoiceNotes?.length &&
				data.exchangedDocument.invoiceNotes.length > 0
			) {
				for (const invoiceNote of data.exchangedDocument.invoiceNotes) {
					const note = exchangedDocument.ele("ram:IncludedNote");
					note.ele("ram:Content").txt(invoiceNote.content);
					if (invoiceNote.subjectCode) {
						note.ele("ram:SubjectCode").txt(invoiceNote.subjectCode);
					}
				}
			}
		}

		if (data.transaction) {
			supplyChainTradeTransaction ??= findNode(
				"BG-25-00",
				crossIndustryInvoice,
				(node) => node.node.nodeName === "rsm:SupplyChainTradeTransaction",
				() => crossIndustryInvoice.ele("rsm:SupplyChainTradeTransaction"),
			);

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
								supplyChainTradeTransaction!.find(
									(node) =>
										node.node.nodeName ===
											"ram:ApplicableHeaderTradeDelivery" ||
										node.node.nodeName ===
											"ram:ApplicableHeaderTradeSettlement",
								)
							)?.node ?? null;
						supplyChainTradeTransaction!.node.insertBefore(
							applicableHeaderTradeAgreement.node,
							refNode,
						);
						return applicableHeaderTradeAgreement;
					},
				);

				if (data.transaction.contract.seller) {
					const sellerTradeParty = findNode(
						"BG-4",
						supplyChainTradeTransaction,
						(node) => node.node.nodeName === "ram:SellerTradeParty",
						(fragment) => {
							const sellerTradeParty = fragment.ele("ram:SellerTradeParty");
							const refNode =
								(
									getCachedNode("BG-7") ||
									getCachedNode("BT-13-00") ||
									applicableHeaderTradeAgreement.find(
										(node) =>
											node.node.nodeName === "ram:BuyerTradeParty" ||
											node.node.nodeName === "ram:BuyerOrderReferencedDocument",
									)
								)?.node ?? null;
							applicableHeaderTradeAgreement.node.insertBefore(
								sellerTradeParty.node,
								refNode,
							);
							return sellerTradeParty;
						},
					);

					if (
						data.transaction.contract.seller.id &&
						(Array.isArray(data.transaction.contract.seller.id)
							? data.transaction.contract.seller.id.length > 0
							: true)
					) {
						const refNode =
							(
								getCachedNode("BT-29-0") ||
								getCachedNode("BT-27") ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:GlobalID" ? "BT-29-0" : "BT-27",
									sellerTradeParty.find((node) => {
										return (
											node.node.nodeName === "ram:GlobalID" ||
											node.node.nodeName === "ram:Name"
										);
									}),
								)
							)?.node ?? null;
						const ids = Array.isArray(data.transaction.contract.seller.id)
							? data.transaction.contract.seller.id
							: [data.transaction.contract.seller.id];
						for (const value of ids) {
							const id = fragment().ele("ram:ID");
							id.txt(value);
							sellerTradeParty.node.insertBefore(id.node, refNode);
						}
					}

					if (data.transaction.contract.seller.globalId) {
						const refNode =
							findNode(
								"BT-27",
								sellerTradeParty,
								(node) => node.node.nodeName === "ram:Name",
							)?.node ?? null;
						const globalId = fragment()
							.ele("ram:GlobalID")
							.txt(data.transaction.contract.seller.globalId.identifier);
						if (data.transaction.contract.seller.globalId.schemeId) {
							globalId.att(
								"schemeID",
								data.transaction.contract.seller.globalId.schemeId,
							);
						}
						sellerTradeParty.node.insertBefore(globalId.node, refNode);
					}

					if (data.transaction.contract.seller.organization) {
						const specifiedLegalOrganization = findNode(
							"BT-30-00",
							sellerTradeParty,
							(node) => node.node.nodeName === "ram:SpecifiedLegalOrganization",
							(fragment) => {
								const specifiedLegalOrganization = fragment.ele(
									"ram:SpecifiedLegalOrganization",
								);
								const refNode =
									(
										getCachedNode("BG-5") ||
										setCachedNode(
											(node) =>
												node.node.nodeName === "ram:PostalTradeAddress"
													? "BG-5"
													: undefined,
											sellerTradeParty.find(
												(node) =>
													node.node.nodeName === "ram:PostalTradeAddress" ||
													node.node.nodeName === "ram:SpecifiedTaxRegistration",
											),
										)
									)?.node ?? null;
								sellerTradeParty.node.insertBefore(
									specifiedLegalOrganization.node,
									refNode,
								);
								return specifiedLegalOrganization;
							},
						);

						if (data.transaction.contract.seller.organization.tradingName) {
							specifiedLegalOrganization
								.ele("ram:TradingBusinessName")
								.txt(data.transaction.contract.seller.organization.tradingName);
						}
					}

					const postalTradeAddress = findNode(
						"BG-5",
						sellerTradeParty,
						(node) => node.node.nodeName === "ram:PostalTradeAddress",
						(fragment) => {
							const postalTradeAddress = fragment.ele("ram:PostalTradeAddress");
							const refNode =
								sellerTradeParty.find((node) => {
									return (
										node.node.nodeName === "ram:SpecifiedTaxRegistration" ||
										node.node.nodeName === "ram:URIUniversalCommunication"
									);
								})?.node ?? null;
							sellerTradeParty.node.insertBefore(
								postalTradeAddress.node,
								refNode,
							);
							return postalTradeAddress;
						},
					);
					const countryId = findNode(
						"BT-40",
						postalTradeAddress,
						(node) => node.node.nodeName === "ram:CountryID",
					);

					if (data.transaction.contract.seller.postalAddress.postCode) {
						const postCode = fragment().ele("ram:PostcodeCode");
						postCode.txt(
							data.transaction.contract.seller.postalAddress.postCode,
						);
						postalTradeAddress.node.insertBefore(
							postCode.node,
							countryId?.node ?? null,
						);
					}

					if (data.transaction.contract.seller.postalAddress.line1) {
						const line = fragment().ele("ram:LineOne");
						line.txt(data.transaction.contract.seller.postalAddress.line1);
						postalTradeAddress.node.insertBefore(
							line.node,
							countryId?.node ?? null,
						);
					}
					if (data.transaction.contract.seller.postalAddress.line2) {
						const line = fragment().ele("ram:LineTwo");
						line.txt(data.transaction.contract.seller.postalAddress.line2);
						postalTradeAddress.node.insertBefore(
							line.node,
							countryId?.node ?? null,
						);
					}
					if (data.transaction.contract.seller.postalAddress.line2) {
						const line = fragment().ele("ram:LineThree");
						line.txt(data.transaction.contract.seller.postalAddress.line2);
						postalTradeAddress.node.insertBefore(
							line.node,
							countryId?.node ?? null,
						);
					}

					if (data.transaction.contract.seller.postalAddress.city) {
						const cityName = fragment().ele("ram:CityName");
						cityName.txt(data.transaction.contract.seller.postalAddress.city);
						postalTradeAddress.node.insertBefore(
							cityName.node,
							countryId?.node ?? null,
						);
					}

					if (
						data.transaction.contract.seller.postalAddress.countrySubdivision
					) {
						postalTradeAddress
							.ele("ram:CountrySubDivisionName")
							.txt(
								data.transaction.contract.seller.postalAddress
									.countrySubdivision,
							);
					}

					if (data.transaction.contract.seller.electronicAddress) {
						const refNode =
							sellerTradeParty.find((node) => {
								return node.node.nodeName === "ram:SpecifiedTaxRegistration";
							})?.node ?? null;

						const uriUniversalCommunication = fragment().ele(
							"ram:URIUniversalCommunication",
						);
						const uriid = uriUniversalCommunication.ele("ram:URIID");
						uriid.txt(
							data.transaction.contract.seller.electronicAddress.identifier,
						);
						uriid.att(
							"schemeID",
							data.transaction.contract.seller.electronicAddress.schemeId,
						);
						sellerTradeParty.node.insertBefore(
							uriUniversalCommunication.node,
							refNode,
						);
					}
				}

				if (data.transaction.contract.buyer) {
					const buyerTradeParty = findNode(
						"BG-7",
						applicableHeaderTradeAgreement,
						(node) => node.node.nodeName === "ram:BuyerTradeParty",
						(fragment) => {
							const buyerTradeParty = fragment.ele("ram:BuyerTradeParty");
							const refNode =
								findNode(
									"BT-13-00",
									applicableHeaderTradeAgreement,
									(node) =>
										node.node.nodeName === "ram:BuyerOrderReferencedDocument",
								)?.node ?? null;
							applicableHeaderTradeAgreement.node.insertBefore(
								buyerTradeParty.node,
								refNode,
							);
							return buyerTradeParty;
						},
					);

					if (
						data.transaction.contract.buyer.id &&
						(Array.isArray(data.transaction.contract.buyer.id)
							? data.transaction.contract.buyer.id.length > 0
							: true)
					) {
						const refNode =
							(
								getCachedNode("BT-46-0") ||
								getCachedNode("BT-44") ||
								setCachedNode(
									(node) =>
										node.node.nodeName === "ram:GlobalID" ? "BT-46-0" : "BT-44",
									buyerTradeParty.find((node) => {
										return (
											node.node.nodeName === "ram:GlobalID" ||
											node.node.nodeName === "ram:Name"
										);
									}),
								)
							)?.node ?? null;
						const ids = Array.isArray(data.transaction.contract.buyer.id)
							? data.transaction.contract.buyer.id
							: [data.transaction.contract.buyer.id];
						for (const value of ids) {
							const id = fragment().ele("ram:ID");
							id.txt(value.identifier);
							buyerTradeParty.node.insertBefore(id.node, refNode);
						}
					}

					if (data.transaction.contract.buyer.globalId) {
						const refNode =
							findNode(
								"BT-44",
								buyerTradeParty,
								(node) => node.node.nodeName === "ram:Name",
							)?.node ?? null;
						const globalId = fragment().ele("ram:GlobalID");
						globalId.txt(data.transaction.contract.buyer.globalId.identifier);
						if (data.transaction.contract.buyer.globalId.schemeId) {
							globalId.att(
								"schemeID",
								data.transaction.contract.buyer.globalId.schemeId,
							);
						}
						buyerTradeParty.node.insertBefore(globalId.node, refNode);
					}

					const postalTradeAddress = (() => {
						const postalTradeAddress = fragment().ele("ram:PostalTradeAddress");
						const refNode =
							findNode(
								"BT-49-00",
								buyerTradeParty,
								(node) =>
									node.node.nodeName === "ram:URIUniversalCommunication",
							)?.node ?? null;
						buyerTradeParty.node.insertBefore(postalTradeAddress.node, refNode);
						return postalTradeAddress;
					})();

					if (data.transaction.contract.buyer.postalAddress.postCode) {
						const postcodeCode = postalTradeAddress.ele("ram:PostcodeCode");
						postcodeCode.txt(
							data.transaction.contract.buyer.postalAddress.postCode,
						);
					}

					if (data.transaction.contract.buyer.postalAddress.line1) {
						const line = postalTradeAddress.ele("ram:LineOne");
						line.txt(data.transaction.contract.buyer.postalAddress.line1);
					}
					if (data.transaction.contract.buyer.postalAddress.line2) {
						const line = postalTradeAddress.ele("ram:LineTwo");
						line.txt(data.transaction.contract.buyer.postalAddress.line2);
					}
					if (data.transaction.contract.buyer.postalAddress.line3) {
						const line = postalTradeAddress.ele("ram:LineThree");
						line.txt(data.transaction.contract.buyer.postalAddress.line3);
					}

					if (data.transaction.contract.buyer.postalAddress.city) {
						const line = postalTradeAddress.ele("ram:CityName");
						line.txt(data.transaction.contract.buyer.postalAddress.city);
					}

					postalTradeAddress
						.ele("ram:CountryID")
						.txt(data.transaction.contract.buyer.postalAddress.countryCode);

					if (
						data.transaction.contract.buyer.postalAddress.countrySubdivision
					) {
						postalTradeAddress
							.ele("ram:CountrySubDivisionName")
							.txt(
								data.transaction.contract.buyer.postalAddress
									.countrySubdivision,
							);
					}

					if (data.transaction.contract.buyer.electronicAddress) {
						const uriid = buyerTradeParty
							.ele("ram:URIUniversalCommunication")
							.ele("ram:URIID");
						uriid.txt(
							data.transaction.contract.buyer.electronicAddress.identifier,
						);
						uriid.att(
							"schemeID",
							data.transaction.contract.buyer.electronicAddress.schemeId,
						);
					}

					if (data.transaction.contract.buyer.taxRegistration?.vat) {
						const taxRegistration = buyerTradeParty.ele(
							"ram:SpecifiedTaxRegistration",
						);
						if (data.transaction.contract.buyer.taxRegistration.vat.id) {
							const id = taxRegistration.ele("ram:ID");
							id.txt(
								data.transaction.contract.buyer.taxRegistration.vat.id
									.identifier,
							);
							id.att("schemeID", "VA");
						}
					}
				}

				if (data.transaction.contract.sellerTaxRepresentative) {
					const sellerTaxRepresentative = (() => {
						const sellerTaxRepresentative = fragment().ele(
							"ram:SellerTaxRepresentativeTradeParty",
						);
						const refNode =
							findNode(
								"BT-13-00",
								applicableHeaderTradeAgreement,
								(node) =>
									node.node.nodeName === "ram:BuyerOrderReferencedDocument",
							)?.node ?? null;
						applicableHeaderTradeAgreement.node.insertBefore(
							sellerTaxRepresentative.node,
							refNode,
						);
						return sellerTaxRepresentative;
					})();
					sellerTaxRepresentative
						.ele("ram:Name")
						.txt(data.transaction.contract.sellerTaxRepresentative.name);

					const postalAddress = sellerTaxRepresentative.ele(
						"ram:PostalTradeAddress",
					);

					if (
						data.transaction.contract.sellerTaxRepresentative.postalAddress
							.postCode
					) {
						postalAddress
							.ele("ram:PostcodeCode")
							.txt(
								data.transaction.contract.sellerTaxRepresentative.postalAddress
									.postCode,
							);
					}
					if (
						data.transaction.contract.sellerTaxRepresentative.postalAddress
							.line1
					) {
						postalAddress
							.ele("ram:LineOne")
							.txt(
								data.transaction.contract.sellerTaxRepresentative.postalAddress
									.line1,
							);
					}
					if (
						data.transaction.contract.sellerTaxRepresentative.postalAddress
							.line2
					) {
						postalAddress
							.ele("ram:LineTwo")
							.txt(
								data.transaction.contract.sellerTaxRepresentative.postalAddress
									.line2,
							);
					}
					if (
						data.transaction.contract.sellerTaxRepresentative.postalAddress
							.line3
					) {
						postalAddress
							.ele("ram:LineThree")
							.txt(
								data.transaction.contract.sellerTaxRepresentative.postalAddress
									.line3,
							);
					}
					if (
						data.transaction.contract.sellerTaxRepresentative.postalAddress.city
					) {
						postalAddress
							.ele("ram:CityName")
							.txt(
								data.transaction.contract.sellerTaxRepresentative.postalAddress
									.city,
							);
					}
					postalAddress
						.ele("ram:CountryID")
						.txt(
							data.transaction.contract.sellerTaxRepresentative.postalAddress
								.countryCode,
						);
					if (
						data.transaction.contract.sellerTaxRepresentative.postalAddress
							.countrySubdivision
					) {
						postalAddress
							.ele("ram:CountrySubDivisionName")
							.txt(
								data.transaction.contract.sellerTaxRepresentative.postalAddress
									.countrySubdivision,
							);
					}

					if (
						data.transaction.contract.sellerTaxRepresentative.taxRegistration
							?.vat
					) {
						const specifiedTaxRegistration = sellerTaxRepresentative.ele(
							"ram:SpecifiedTaxRegistration",
						);
						specifiedTaxRegistration
							.ele("ram:ID")
							.txt(
								data.transaction.contract.sellerTaxRepresentative
									.taxRegistration.vat.id.identifier,
							)
							.att("schemeID", "VA");
					}
				}

				if (data.transaction.contract.associatedContract) {
					const contractReferencedDocument = applicableHeaderTradeAgreement.ele(
						"ram:ContractReferencedDocument",
					);
					if (data.transaction.contract.associatedContract.issuerAssignedId) {
						contractReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(
								data.transaction.contract.associatedContract.issuerAssignedId,
							);
					}
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
								supplyChainTradeTransaction!,
								(node) =>
									node.node.nodeName === "ram:ApplicableHeaderTradeSettlement",
							)?.node ?? null;
						supplyChainTradeTransaction!.node.insertBefore(
							applicableHeaderTradeDelivery.node,
							refNode,
						);
						return applicableHeaderTradeDelivery;
					},
				);

				if (data.transaction.delivery.recipient) {
					const shipToTradeParty = applicableHeaderTradeDelivery.ele(
						"ram:ShipToTradeParty",
					);
					if (data.transaction.delivery.recipient.locationId) {
						shipToTradeParty
							.ele("ram:ID")
							.txt(data.transaction.delivery.recipient.locationId.identifier);
					}
					if (data.transaction.delivery.recipient.globalLocationId) {
						const globalId = shipToTradeParty
							.ele("ram:GlobalID")
							.txt(
								data.transaction.delivery.recipient.globalLocationId.identifier,
							);
						if (data.transaction.delivery.recipient.globalLocationId.schemeId) {
							globalId.att(
								"schemeID",
								data.transaction.delivery.recipient.globalLocationId.schemeId,
							);
						}
					}
					if (data.transaction.delivery.recipient.name) {
						shipToTradeParty
							.ele("ram:Name")
							.txt(data.transaction.delivery.recipient.name);
					}
					if (data.transaction.delivery.recipient.postalAddress) {
						const postalTradeAddress = shipToTradeParty.ele(
							"ram:PostalTradeAddress",
						);
						if (data.transaction.delivery.recipient.postalAddress.postCode) {
							postalTradeAddress
								.ele("ram:PostcodeCode")
								.txt(
									data.transaction.delivery.recipient.postalAddress.postCode,
								);
						}
						if (data.transaction.delivery.recipient.postalAddress.line1) {
							postalTradeAddress
								.ele("ram:LineOne")
								.txt(data.transaction.delivery.recipient.postalAddress.line1);
						}
						if (data.transaction.delivery.recipient.postalAddress.line2) {
							postalTradeAddress
								.ele("ram:LineTwo")
								.txt(data.transaction.delivery.recipient.postalAddress.line2);
						}
						if (data.transaction.delivery.recipient.postalAddress.line3) {
							postalTradeAddress
								.ele("ram:LineThree")
								.txt(data.transaction.delivery.recipient.postalAddress.line3);
						}
						if (data.transaction.delivery.recipient.postalAddress.city) {
							postalTradeAddress
								.ele("ram:CityName")
								.txt(data.transaction.delivery.recipient.postalAddress.city);
						}
						postalTradeAddress
							.ele("ram:CountryID")
							.txt(
								data.transaction.delivery.recipient.postalAddress.countryCode,
							);
						if (
							data.transaction.delivery.recipient.postalAddress
								.countrySubdivision
						) {
							postalTradeAddress
								.ele("ram:CountrySubDivisionName")
								.txt(
									data.transaction.delivery.recipient.postalAddress
										.countrySubdivision,
								);
						}
					}
				}

				if (data.transaction.delivery.actualDelivery) {
					const actualDeliverySupplyChainEvent =
						applicableHeaderTradeDelivery.ele(
							"ram:ActualDeliverySupplyChainEvent",
						);
					actualDeliverySupplyChainEvent
						.ele("ram:OccurrenceDateTime")
						.ele("udt:DateTimeString")
						.txt(data.transaction.delivery.actualDelivery.date)
						.att("format", "102");
				}

				if (data.transaction.delivery.despatchAdvice) {
					const despatchAdviceReferencedDocument =
						applicableHeaderTradeDelivery.ele(
							"ram:DespatchAdviceReferencedDocument",
						);
					if (data.transaction.delivery.despatchAdvice.issuerAssignedId) {
						despatchAdviceReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(data.transaction.delivery.despatchAdvice.issuerAssignedId);
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
						supplyChainTradeTransaction!.ele(
							"ram:ApplicableHeaderTradeSettlement",
						),
				);

				if (data.transaction.debit.creditorReferenceId) {
					const creditorReferenceId = fragment().ele("ram:CreditorReferenceID");
					creditorReferenceId.txt(
						data.transaction.debit.creditorReferenceId.identifier,
					);
					const refNode =
						findNode(
							"BT-5",
							applicableHeaderTradeSettlement,
							(node) => node.node.nodeName === "ram:InvoiceCurrencyCode",
						)?.node ?? null;
					applicableHeaderTradeSettlement.node.insertBefore(
						creditorReferenceId.node,
						refNode,
					);
				}

				if (data.transaction.debit.paymentReference) {
					const paymentReference = fragment().ele("ram:PaymentReference");
					paymentReference.txt(data.transaction.debit.paymentReference);
					const refNode =
						findNode(
							"BT-5",
							applicableHeaderTradeSettlement,
							(node) => node.node.nodeName === "ram:InvoiceCurrencyCode",
						)?.node ?? null;
					applicableHeaderTradeSettlement.node.insertBefore(
						paymentReference.node,
						refNode,
					);
				}

				if (data.transaction.debit.taxCurrencyCode) {
					const taxCurrencyCode = fragment().ele("ram:TaxCurrencyCode");
					taxCurrencyCode.txt(data.transaction.debit.taxCurrencyCode);
					const refNode =
						findNode(
							"BT-5",
							applicableHeaderTradeSettlement,
							(node) => node.node.nodeName === "ram:InvoiceCurrencyCode",
						)?.node ?? null;
					applicableHeaderTradeSettlement.node.insertBefore(
						taxCurrencyCode.node,
						refNode,
					);
				}

				if (data.transaction.debit.payee) {
					const payeeTradeParty = (() => {
						const payeeTradeParty = fragment().ele("ram:PayeeTradeParty");
						const refNode =
							findNode(
								"BG-22",
								applicableHeaderTradeSettlement,
								(node) =>
									node.node.nodeName ===
									"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
							)?.node ?? null;
						applicableHeaderTradeSettlement.node.insertBefore(
							payeeTradeParty.node,
							refNode,
						);
						return payeeTradeParty;
					})();

					if (data.transaction.debit.payee.id) {
						payeeTradeParty
							.ele("ram:ID")
							.txt(data.transaction.debit.payee.id.identifier);
					}
					if (data.transaction.debit.payee.globalId) {
						const globalId = payeeTradeParty
							.ele("ram:GlobalID")
							.txt(data.transaction.debit.payee.globalId.identifier);
						if (data.transaction.debit.payee.globalId.schemeId) {
							globalId.att(
								"schemeID",
								data.transaction.debit.payee.globalId.schemeId,
							);
						}
					}

					payeeTradeParty
						.ele("ram:Name")
						.txt(data.transaction.debit.payee.name);

					if (data.transaction.debit.payee.organization) {
						const specifiedLegalOrganization = payeeTradeParty.ele(
							"ram:SpecifiedLegalOrganization",
						);
						if (data.transaction.debit.payee.organization.id) {
							const id = specifiedLegalOrganization
								.ele("ram:ID")
								.txt(data.transaction.debit.payee.organization.id.identifier);
							if (data.transaction.debit.payee.organization.id.schemeId) {
								id.att(
									"schemeID",
									data.transaction.debit.payee.organization.id.schemeId,
								);
							}
						}
					}
				}

				if (data.transaction.debit.paymentMeans) {
					const specifiedTradeSettlementPaymentMeans = (() => {
						const specifiedTradeSettlementPaymentMeans = fragment().ele(
							"ram:SpecifiedTradeSettlementPaymentMeans",
						);
						const refNode =
							findNode(
								"BG-22",
								applicableHeaderTradeSettlement,
								(node) =>
									node.node.nodeName ===
									"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
							)?.node ?? null;
						applicableHeaderTradeSettlement.node.insertBefore(
							specifiedTradeSettlementPaymentMeans.node,
							refNode,
						);
						return specifiedTradeSettlementPaymentMeans;
					})();

					specifiedTradeSettlementPaymentMeans
						.ele("ram:TypeCode")
						.txt(data.transaction.debit.paymentMeans.typeCode);

					if (data.transaction.debit.paymentMeans.buyerBankDetails) {
						const payerPartyDebtorFinancialAccount =
							specifiedTradeSettlementPaymentMeans.ele(
								"ram:PayerPartyDebtorFinancialAccount",
							);
						if (data.transaction.debit.paymentMeans.buyerBankDetails.iban) {
							payerPartyDebtorFinancialAccount
								.ele("ram:IBANID")
								.txt(
									data.transaction.debit.paymentMeans.buyerBankDetails.iban
										.identifier,
								);
						}
					}

					if (
						data.transaction.debit.paymentMeans.creditTransfers?.length &&
						data.transaction.debit.paymentMeans.creditTransfers.length > 0
					) {
						for (const creditTransfer of data.transaction.debit.paymentMeans
							.creditTransfers) {
							const payeePartyCreditorFinancialAccount =
								specifiedTradeSettlementPaymentMeans.ele(
									"ram:PayeePartyCreditorFinancialAccount",
								);
							payeePartyCreditorFinancialAccount
								.ele("ram:IBANID")
								.txt(creditTransfer.iban.identifier);
							if (creditTransfer.proprietaryId) {
								payeePartyCreditorFinancialAccount
									.ele("ram:ProprietaryID")
									.txt(creditTransfer.proprietaryId.identifier);
							}
						}
					}
				}

				(() => {
					const refNode =
						findNode(
							"BG-22",
							applicableHeaderTradeSettlement,
							(node) =>
								node.node.nodeName ===
								"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
						)?.node ?? null;
					for (const vatBreakdown of data.transaction.debit.vatBreakdown) {
						const applicableTradeTax = fragment().ele("ram:ApplicableTradeTax");

						applicableTradeTax
							.ele("ram:CalculatedAmount")
							.txt(vatBreakdown.calculatedAmount.value.toString());
						applicableTradeTax.ele("ram:TypeCode").txt(vatBreakdown.typeCode);
						if (vatBreakdown.exemptionReason) {
							applicableTradeTax
								.ele("ram:ExemptionReason")
								.txt(vatBreakdown.exemptionReason);
						}
						applicableTradeTax
							.ele("ram:BasisAmount")
							.txt(vatBreakdown.basisAmount.value.toString());
						applicableTradeTax
							.ele("ram:CategoryCode")
							.txt(vatBreakdown.categoryCode);
						if (vatBreakdown.exemptionReasonCode) {
							applicableTradeTax
								.ele("ram:ExemptionReasonCode")
								.txt(vatBreakdown.exemptionReasonCode);
						}
						if (vatBreakdown.dueDateTypeCode) {
							applicableTradeTax
								.ele("ram:DueDateTypeCode")
								.txt(vatBreakdown.dueDateTypeCode);
						}
						if (typeof vatBreakdown.rateApplicablePercent === "number") {
							applicableTradeTax
								.ele("ram:RateApplicablePercent")
								.txt(vatBreakdown.rateApplicablePercent.toString());
						}
						applicableHeaderTradeSettlement.node.insertBefore(
							applicableTradeTax.node,
							refNode,
						);
					}
				})();

				if (data.transaction.debit.invoicingPeriod) {
					const billingSpecifiedPeriod = (() => {
						const billingSpecifiedPeriod = fragment().ele(
							"ram:BillingSpecifiedPeriod",
						);
						const refNode =
							findNode(
								"BG-22",
								applicableHeaderTradeSettlement,
								(node) =>
									node.node.nodeName ===
									"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
							)?.node ?? null;
						applicableHeaderTradeSettlement.node.insertBefore(
							billingSpecifiedPeriod.node,
							refNode,
						);
						return billingSpecifiedPeriod;
					})();

					if (data.transaction.debit.invoicingPeriod.startDate) {
						billingSpecifiedPeriod
							.ele("ram:StartDateTime")
							.ele("udt:DateTimeString")
							.txt(data.transaction.debit.invoicingPeriod.startDate)
							.att("format", "102");
					}

					if (data.transaction.debit.invoicingPeriod.endDate) {
						billingSpecifiedPeriod
							.ele("ram:EndDateTime")
							.ele("udt:DateTimeString")
							.txt(data.transaction.debit.invoicingPeriod.endDate)
							.att("format", "102");
					}
				}

				if (
					data.transaction.debit.allowances?.length &&
					data.transaction.debit.allowances.length > 0
				) {
					const refNode =
						findNode(
							"BG-22",
							applicableHeaderTradeSettlement,
							(node) =>
								node.node.nodeName ===
								"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
						)?.node ?? null;

					for (const allowance of data.transaction.debit.allowances) {
						const specifiedTradeAllowanceCharge = fragment().ele(
							"ram:SpecifiedTradeAllowanceCharge",
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
						if (allowance.basisAmount) {
							specifiedTradeAllowanceCharge
								.ele("ram:BasisAmount")
								.txt(allowance.basisAmount.value.toString());
						}
						specifiedTradeAllowanceCharge
							.ele("ram:ActualAmount")
							.txt(allowance.actualAmount.value.toString());
						if (allowance.reasonCode) {
							specifiedTradeAllowanceCharge
								.ele("ram:ReasonCode")
								.txt(allowance.reasonCode);
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
								.txt(allowance.categoryTradeTax.categoryCode);
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
						applicableHeaderTradeSettlement.node.insertBefore(
							specifiedTradeAllowanceCharge.node,
							refNode,
						);
					}
				}

				if (
					data.transaction.debit.charges?.length &&
					data.transaction.debit.charges.length > 0
				) {
					const refNode =
						findNode(
							"BG-22",
							applicableHeaderTradeSettlement,
							(node) =>
								node.node.nodeName ===
								"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
						)?.node ?? null;

					for (const charge of data.transaction.debit.charges) {
						const specifiedTradeAllowanceCharge = fragment().ele(
							"ram:SpecifiedTradeAllowanceCharge",
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
						if (charge.basisAmount) {
							specifiedTradeAllowanceCharge
								.ele("ram:BasisAmount")
								.txt(charge.basisAmount.value.toString());
						}
						specifiedTradeAllowanceCharge
							.ele("ram:ActualAmount")
							.txt(charge.actualAmount.value.toString());
						if (charge.reasonCode) {
							specifiedTradeAllowanceCharge
								.ele("ram:ReasonCode")
								.txt(charge.reasonCode);
						}
						if (charge.reason) {
							specifiedTradeAllowanceCharge
								.ele("ram:Reason")
								.txt(charge.reason);
						}
						if (charge.categoryTradeTax) {
							const categoryTradeTax = specifiedTradeAllowanceCharge.ele(
								"ram:CategoryTradeTax",
							);
							categoryTradeTax.ele("ram:TypeCode").txt("VAT");
							categoryTradeTax
								.ele("ram:CategoryCode")
								.txt(charge.categoryTradeTax.categoryCode);
							if (
								typeof charge.categoryTradeTax.rateApplicablePercent ===
								"number"
							) {
								categoryTradeTax
									.ele("ram:RateApplicablePercent")
									.txt(
										charge.categoryTradeTax.rateApplicablePercent.toString(),
									);
							}
						}
						applicableHeaderTradeSettlement.node.insertBefore(
							specifiedTradeAllowanceCharge.node,
							refNode,
						);
					}
				}

				if (data.transaction.debit.paymentTerms) {
					const refNode =
						findNode(
							"BG-22",
							applicableHeaderTradeSettlement,
							(node) =>
								node.node.nodeName ===
								"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
						)?.node ?? null;
					for (const paymentTerms of Array.isArray(
						data.transaction.debit.paymentTerms,
					)
						? data.transaction.debit.paymentTerms
						: [data.transaction.debit.paymentTerms]) {
						const specifiedTradePaymentTerms = fragment().ele(
							"ram:SpecifiedTradePaymentTerms",
						);
						applicableHeaderTradeSettlement.node.insertBefore(
							specifiedTradePaymentTerms.node,
							refNode,
						);

						if (paymentTerms.description) {
							specifiedTradePaymentTerms
								.ele("ram:Description")
								.txt(paymentTerms.description);
						}

						if (paymentTerms.dueDate) {
							specifiedTradePaymentTerms
								.ele("ram:DueDateDateTime")
								.ele("udt:DateTimeString")
								.txt(paymentTerms.dueDate)
								.att("format", "102");
						}

						if (paymentTerms.mandateId) {
							specifiedTradePaymentTerms
								.ele("ram:DirectDebitMandateID")
								.txt(paymentTerms.mandateId.identifier);
						}
					}
				}

				(() => {
					const specifiedTradeSettlementHeaderMonetarySummation = findNode(
						"BG-22",
						applicableHeaderTradeSettlement,
						(node) =>
							node.node.nodeName ===
							"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
						(fragment) =>
							applicableHeaderTradeSettlement.ele(
								"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
							),
					);

					(() => {
						const refNode =
							findNode(
								"BT-109",
								specifiedTradeSettlementHeaderMonetarySummation,
								(node) => node.node.nodeName === "ram:TaxBasisTotalAmount",
							)?.node ?? null;
						const lineTotalAmount = fragment()
							.ele("ram:LineTotalAmount")
							.txt(
								data.transaction.debit.documentTotals.lineTotalAmount.value.toString(),
							);
						specifiedTradeSettlementHeaderMonetarySummation.node.insertBefore(
							lineTotalAmount.node,
							refNode,
						);
					})();

					if (data.transaction.debit.documentTotals.chargeTotalAmount) {
						const refNode =
							findNode(
								"BT-109",
								specifiedTradeSettlementHeaderMonetarySummation,
								(node) => node.node.nodeName === "ram:TaxBasisTotalAmount",
							)?.node ?? null;
						const chargeTotalAmount = fragment()
							.ele("ram:ChargeTotalAmount")
							.txt(
								data.transaction.debit.documentTotals.chargeTotalAmount.value.toString(),
							);
						specifiedTradeSettlementHeaderMonetarySummation.node.insertBefore(
							chargeTotalAmount.node,
							refNode,
						);
					}

					if (data.transaction.debit.documentTotals.allowanceTotalAmount) {
						const refNode =
							findNode(
								"BT-109",
								specifiedTradeSettlementHeaderMonetarySummation,
								(node) => node.node.nodeName === "ram:TaxBasisTotalAmount",
							)?.node ?? null;
						const allowanceTotalAmount = fragment()
							.ele("ram:AllowanceTotalAmount")
							.txt(
								data.transaction.debit.documentTotals.allowanceTotalAmount.value.toString(),
							);
						specifiedTradeSettlementHeaderMonetarySummation.node.insertBefore(
							allowanceTotalAmount.node,
							refNode,
						);
					}

					if (
						data.transaction.debit.documentTotals
							.taxTotalAmountAccountingCurrency
					) {
						const refNode =
							findNode(
								"BT-112",
								specifiedTradeSettlementHeaderMonetarySummation,
								(node) => node.node.nodeName === "ram:GrandTotalAmount",
							)?.node ?? null;
						const taxTotalAmount = fragment().ele("ram:TaxTotalAmount");
						taxTotalAmount
							.txt(
								data.transaction.debit.documentTotals.taxTotalAmountAccountingCurrency.value.toString(),
							)
							.att(
								"currencyID",
								data.transaction.debit.documentTotals
									.taxTotalAmountAccountingCurrency.currency,
							);
						specifiedTradeSettlementHeaderMonetarySummation.node.insertBefore(
							taxTotalAmount.node,
							refNode,
						);
					}

					if (data.transaction.debit.documentTotals.prepaidAmount) {
						const refNode =
							findNode(
								"BT-115",
								specifiedTradeSettlementHeaderMonetarySummation,
								(node) => node.node.nodeName === "ram:DuePayableAmount",
							)?.node ?? null;
						const totalPrepaidAmount = fragment()
							.ele("ram:TotalPrepaidAmount")
							.txt(
								data.transaction.debit.documentTotals.prepaidAmount.value.toString(),
							);
						specifiedTradeSettlementHeaderMonetarySummation.node.insertBefore(
							totalPrepaidAmount.node,
							refNode,
						);
					}
				})();

				if (
					data.transaction.debit.precendingInvoices?.length &&
					data.transaction.debit.precendingInvoices.length > 0
				) {
					for (const precendingInvoice of data.transaction.debit
						.precendingInvoices) {
						const invoiceReferencedDocument =
							applicableHeaderTradeSettlement.ele(
								"ram:InvoiceReferencedDocument",
							);
						invoiceReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(precendingInvoice.issuerAssignedId);
						if (precendingInvoice.issueDate) {
							invoiceReferencedDocument
								.ele("ram:FormattedIssueDateTime")
								.ele("qdt:DateTimeString")
								.txt(precendingInvoice.issueDate)
								.att("format", "102");
						}
					}
				}

				if (data.transaction.debit.accounting) {
					const receivableSpecifiedTradeAccountingAccount =
						applicableHeaderTradeSettlement.ele(
							"ram:ReceivableSpecifiedTradeAccountingAccount",
						);
					if (data.transaction.debit.accounting.buyerReference) {
						receivableSpecifiedTradeAccountingAccount
							.ele("ram:ID")
							.txt(data.transaction.debit.accounting.buyerReference);
					}
				}
			}
		}
	},
	rules(data, ctx) {},
});
