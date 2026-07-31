import { defineProfile } from "@node-zugferd/utils";
import { schema } from "./schema";

export const minimum = defineProfile({
	id: "minimum",
	dataRelationship: "Data",
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "MINIMUM",
		fileName: "factur-x.xml",
		version: "1.0",
	},
	schema,
	build: (data, { root, setCachedNode, profile }) => {
		const crossIndustryInvoice = root.ele("rsm:CrossIndustryInvoice");
		crossIndustryInvoice
			.att(
				"xmlns:rsm",
				"urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100",
			)
			.att(
				"xmlns:qdt",
				"urn:un:unece:uncefact:data:standard:QualifiedDataType:100",
			)
			.att(
				"xmlns:ram",
				"urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100",
			)
			.att("xmlns:xs", "http://www.w3.org/2001/XMLSchema")
			.att(
				"xmlns:udt",
				"urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100",
			);
		const exchangedDocumentContext = crossIndustryInvoice.ele(
			"rsm:ExchangedDocumentContext",
		);

		if (data.processControl?.businessContextInfo) {
			const businessProcressSpecifiedDocumentContextParameter =
				exchangedDocumentContext.ele(
					"ram:BusinessProcessSpecifiedDocumentContextParameter",
				);

			if (data.processControl.businessContextInfo.processType) {
				businessProcressSpecifiedDocumentContextParameter
					.ele("ram:ID")
					.txt(data.processControl.businessContextInfo.processType);
			}
		}

		const guidelineSpecifiedDocumentContextParameter =
			exchangedDocumentContext.ele(
				"ram:GuidelineSpecifiedDocumentContextParameter",
			);
		guidelineSpecifiedDocumentContextParameter.ele("ram:ID").txt(
			data.processControl?.applicationRecommendationInfo
				?.specificationIdentifier?.identifier ??
				(() => {
					switch (profile.id) {
						case "xrechnung":
							return "urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0";
						case "extended":
							return "urn:cen.eu:en16931:2017#conformant#urn:factur-x.eu:1p0:extended";
						case "en-16931":
							return "urn:cen.eu:en16931:2017";
						case "basic":
							return "urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:basic";
						case "basic-wl":
							return "urn:factur-x.eu:1p0:basicwl";
						default:
							return "urn:factur-x.eu:1p0:minimum";
					}
				})(),
		);

		if (data.exchangedDocument) {
			const exchangedDocument = setCachedNode(
				"BT-1-00",
				crossIndustryInvoice.ele("rsm:ExchangedDocument"),
			);
			exchangedDocument
				.ele("ram:ID")
				.txt(data.exchangedDocument.invoiceNumber.identifier);
			exchangedDocument
				.ele("ram:TypeCode")
				.txt(data.exchangedDocument.invoiceTypeCode.value);
			exchangedDocument
				.ele("ram:IssueDateTime")
				.ele("udt:DateTimeString")
				.txt(data.exchangedDocument.invoiceIssueDate.value)
				.att("format", data.exchangedDocument.invoiceIssueDate.format);
		}

		if (data.transaction) {
			const supplyChainTradeTransaction = setCachedNode(
				"BG-25-00",
				crossIndustryInvoice.ele("rsm:SupplyChainTradeTransaction"),
			);

			if (data.transaction.contract) {
				const applicableHeaderTradeAgreement = setCachedNode(
					"BT-10-00",
					supplyChainTradeTransaction.ele("ram:ApplicableHeaderTradeAgreement"),
				);
				if (data.transaction.contract.buyerReference) {
					applicableHeaderTradeAgreement
						.ele("ram:BuyerReference")
						.txt(data.transaction.contract.buyerReference);
				}

				if (data.transaction.contract.seller) {
					const sellerTradeParty = setCachedNode(
						"BG-4",
						applicableHeaderTradeAgreement.ele("ram:SellerTradeParty"),
					);
					sellerTradeParty
						.ele("ram:Name")
						.txt(data.transaction.contract.seller.name);
					if (data.transaction.contract.seller.organization) {
						const specifiedLegalOrganization = setCachedNode(
							"BT-30-00",
							sellerTradeParty.ele("ram:SpecifiedLegalOrganization"),
						);
						if (data.transaction.contract.seller.organization.id) {
							const id = specifiedLegalOrganization
								.ele("ram:ID")
								.txt(
									data.transaction.contract.seller.organization.id.identifier,
								);
							if (data.transaction.contract.seller.organization.id.schemeId) {
								id.att(
									"schemeID",
									data.transaction.contract.seller.organization.id.schemeId,
								);
							}
						}
					}

					const postalTradeAddress = setCachedNode(
						"BG-5",
						sellerTradeParty.ele("ram:PostalTradeAddress"),
					);
					setCachedNode("BT-40", postalTradeAddress.ele("ram:CountryID")).txt(
						data.transaction.contract.seller.postalAddress.countryCode.value,
					);

					if (data.transaction.contract.seller.taxRegistration?.vat) {
						const taxRegistration = sellerTradeParty.ele(
							"ram:SpecifiedTaxRegistration",
						);
						if (data.transaction.contract.seller.taxRegistration.vat.id) {
							taxRegistration
								.ele("ram:ID")
								.txt(
									data.transaction.contract.seller.taxRegistration.vat.id
										.identifier,
								)
								.att("schemeID", "VA");
						}
					}
					if (data.transaction.contract.seller.taxRegistration?.local) {
						const taxRegistration = sellerTradeParty.ele(
							"ram:SpecifiedTaxRegistration",
						);
						if (data.transaction.contract.seller.taxRegistration.local.id) {
							taxRegistration
								.ele("ram:ID")
								.txt(
									data.transaction.contract.seller.taxRegistration.local.id
										.identifier,
								)
								.att("schemeID", "FC");
						}
					}
				}

				if (data.transaction.contract.buyer) {
					const buyerTradeParty = setCachedNode(
						"BG-7",
						applicableHeaderTradeAgreement.ele("ram:BuyerTradeParty"),
					);
					setCachedNode("BT-44", buyerTradeParty.ele("ram:Name")).txt(
						data.transaction.contract.buyer.name,
					);

					if (data.transaction.contract.buyer.organization) {
						const specifiedLegalOrganization = buyerTradeParty.ele(
							"ram:SpecifiedLegalOrganization",
						);
						if (data.transaction.contract.buyer.organization.id) {
							const id = specifiedLegalOrganization
								.ele("ram:ID")
								.txt(
									data.transaction.contract.buyer.organization.id.identifier,
								);
							if (data.transaction.contract.buyer.organization.id.schemeId) {
								id.att(
									"schemeID",
									data.transaction.contract.buyer.organization.id.schemeId,
								);
							}
						}
					}
				}

				if (data.transaction.contract.associatedOrder) {
					const buyerOrderReferencedDocument = setCachedNode(
						"BT-13-00",
						applicableHeaderTradeAgreement.ele(
							"ram:BuyerOrderReferencedDocument",
						),
					);
					if (data.transaction.contract.associatedOrder.issuerAssignedId) {
						buyerOrderReferencedDocument
							.ele("ram:IssuerAssignedID")
							.txt(data.transaction.contract.associatedOrder.issuerAssignedId);
					}
				}
			}

			if (data.transaction.delivery) {
				setCachedNode(
					"BG-13-00",
					supplyChainTradeTransaction.ele("ram:ApplicableHeaderTradeDelivery"),
				);
			}

			if (data.transaction.debit) {
				const applicableHeaderTradeSettlement = setCachedNode(
					"BG-19",
					supplyChainTradeTransaction.ele(
						"ram:ApplicableHeaderTradeSettlement",
					),
				);
				setCachedNode(
					"BT-5",
					applicableHeaderTradeSettlement.ele("ram:InvoiceCurrencyCode"),
				).txt(data.transaction.debit.invoiceCurrencyCode.value);

				const specifiedTradeSettlementHeaderMonetarySummation = setCachedNode(
					"BG-22",
					applicableHeaderTradeSettlement.ele(
						"ram:SpecifiedTradeSettlementHeaderMonetarySummation",
					),
				);
				setCachedNode(
					"BT-109",
					specifiedTradeSettlementHeaderMonetarySummation.ele(
						"ram:TaxBasisTotalAmount",
					),
				).txt(
					data.transaction.debit.documentTotals.taxBasisTotalAmount.value.toString(),
				);

				if (data.transaction.debit.documentTotals.taxTotalAmount) {
					specifiedTradeSettlementHeaderMonetarySummation
						.ele("ram:TaxTotalAmount")
						.txt(
							data.transaction.debit.documentTotals.taxTotalAmount.value.toString(),
						)
						.att(
							"currencyID",
							data.transaction.debit.documentTotals.taxTotalAmount.currency,
						);
				}

				setCachedNode(
					"BT-112",
					specifiedTradeSettlementHeaderMonetarySummation.ele(
						"ram:GrandTotalAmount",
					),
				).txt(
					data.transaction.debit.documentTotals.grandTotalAmount.value.toString(),
				);
				setCachedNode(
					"BT-115",
					specifiedTradeSettlementHeaderMonetarySummation.ele(
						"ram:DuePayableAmount",
					),
				).txt(
					data.transaction.debit.documentTotals.duePayableAmount.value.toString(),
				);
			}
		}
	},
	rules: (data, ctx) => {
		// if (!data?.processControl?.applicationRecommendationInfo?.specificationIdentifier) {
		//   throw ctx.error("BR-1", "An Invoice shall have a Specification identifier (BT-24).")
		// }
		if (!data?.exchangedDocument?.invoiceNumber) {
			throw ctx.error(
				"BR-2",
				"An Invoice shall have an Invoice number (BT-1).",
			);
		}
		if (!data?.exchangedDocument?.invoiceIssueDate) {
			throw ctx.error(
				"BR-3",
				"An Invoice shall have an Invoice issue date (BT-2).",
			);
		}
		if (!data?.exchangedDocument?.invoiceTypeCode) {
			throw ctx.error(
				"BR-4",
				"An Invoice shall have an Invoice type code (BT-3).",
			);
		}
		if (!data?.transaction?.debit?.invoiceCurrencyCode) {
			throw ctx.error(
				"BR-5",
				"An Invoice shall have an Invoice currency code (BT-5).",
			);
		}
		if (!data?.transaction?.contract?.buyer?.name) {
			throw ctx.error(
				"BR-7",
				"An Invoice shall contain the Buyer name (BT-44).",
			);
		}
		if (!data?.transaction?.contract?.seller?.postalAddress) {
			throw ctx.error(
				"BR-8",
				"An Invoice shall contain the Seller postal address (BG-5).",
			);
		}
	},
});
