import country from "@node-zugferd/codelist-country";
import { defineProfile } from "@node-zugferd/utils";
import { schema } from "./schema";

const COUNTRY_PREFIXES = new Set<string>(country.map((entry) => entry.value));

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
		const specificationIdentifier = data?.processControl
			?.applicationRecommendationInfo?.specificationIdentifier as
			| string
			| undefined;
		if (
			typeof specificationIdentifier === "string" &&
			specificationIdentifier.trim() === ""
		) {
			throw ctx.error(
				"BR-1",
				"An Invoice shall have a Specification identifier (BT-24).",
			);
		}
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
		if (!data?.transaction?.contract?.seller?.postalAddress?.countryCode) {
			throw ctx.error(
				"BR-9",
				"The Seller postal address (BG-5) shall contain a Seller country code (BT-40).",
			);
		}

		const totals = data?.transaction?.debit?.documentTotals;
		if (!hasAmount(totals?.taxBasisTotalAmount)) {
			throw ctx.error(
				"BR-13",
				"An Invoice shall have the Invoice total amount without VAT (BT-109).",
			);
		}
		if (!hasAmount(totals?.grandTotalAmount)) {
			throw ctx.error(
				"BR-14",
				"An Invoice shall have the Invoice total amount with VAT (BT-112).",
			);
		}
		if (!hasAmount(totals?.duePayableAmount)) {
			throw ctx.error(
				"BR-15",
				"An Invoice shall have the Amount due for payment (BT-115).",
			);
		}

		for (const identifier of vatIdentifiers(data)) {
			if (!hasIsoVatPrefix(identifier)) {
				throw ctx.error(
					"BR-CO-09",
					"The Seller VAT identifier (BT-31), the Seller tax representative VAT identifier (BT-63) and the Buyer VAT identifier (BT-48) shall have a prefix in accordance with ISO code ISO 3166-1 alpha-2 by which the country of issue may be identified. Nevertheless, Greece may use the prefix 'EL'.",
				);
			}
		}

		if (!hasSellerIdentifier(data?.transaction?.contract?.seller)) {
			throw ctx.error(
				"BR-CO-26",
				"In order for the buyer to automatically identify a supplier, the Seller identifier (BT-29), the Seller legal registration identifier (BT-30) and/or the Seller VAT identifier (BT-31) shall be present.",
			);
		}

		if (decimalPlaces(totals?.taxBasisTotalAmount) > 2) {
			throw ctx.error(
				"BR-DEC-12",
				"The allowed maximum number of decimals for the Invoice total amount without VAT (BT-109) is 2.",
			);
		}
		if (
			hasAmount(totals?.taxTotalAmount) &&
			decimalPlaces(totals?.taxTotalAmount) > 2
		) {
			throw ctx.error(
				"BR-DEC-13",
				"The allowed maximum number of decimals for the Invoice total VAT amount (BT-110) is 2.",
			);
		}
		if (decimalPlaces(totals?.grandTotalAmount) > 2) {
			throw ctx.error(
				"BR-DEC-14",
				"The allowed maximum number of decimals for the Invoice total amount with VAT (BT-112) is 2.",
			);
		}
		if (decimalPlaces(totals?.duePayableAmount) > 2) {
			throw ctx.error(
				"BR-DEC-18",
				"The allowed maximum number of decimals for the Amount due for payment (BT-115) is 2.",
			);
		}
	},
});

function hasAmount(value: unknown): boolean {
	return amountNumber(value) !== undefined;
}

function decimalPlaces(value: unknown): number {
	const lexical = lexicalAmount(value);
	if (lexical !== undefined) {
		const match = /^[+-]?\d+(?:\.(\d+))?$/.exec(lexical);
		return match?.[1]?.length ?? 0;
	}

	const numeric = amountNumber(value);
	if (numeric === undefined) return 0;
	const fraction = numeric.toFixed(10).split(".")[1]?.replace(/0+$/, "") ?? "";
	return fraction.length;
}

function lexicalAmount(value: unknown): string | undefined {
	if (typeof value === "string") return value.trim();
	if (isRecord(value) && typeof value.value === "string")
		return value.value.trim();
	return undefined;
}

function amountNumber(value: unknown): number | undefined {
	if (typeof value === "number") {
		return Number.isFinite(value) ? value : undefined;
	}
	if (typeof value === "string") {
		const lexical = value.trim();
		if (!/^[+-]?\d+(?:\.\d+)?$/.test(lexical)) return undefined;
		const parsed = Number(lexical);
		return Number.isFinite(parsed) ? parsed : undefined;
	}
	if (isRecord(value) && "value" in value) return amountNumber(value.value);
	return undefined;
}

function vatIdentifiers(data: unknown): string[] {
	const contract = readPath(data, ["transaction", "contract"]);
	return [
		["seller", "taxRegistration", "vat", "id"],
		["buyer", "taxRegistration", "vat", "id"],
		["sellerTaxRepresentative", "taxRegistration", "vat", "id"],
	]
		.map((path) => identifierText(readPath(contract, path)))
		.filter((identifier): identifier is string => !!identifier);
}

function hasIsoVatPrefix(identifier: string): boolean {
	const prefix = identifier.trim().slice(0, 2);
	if (!/^[A-Z]{2}$/.test(prefix)) return false;
	return prefix === "EL" || COUNTRY_PREFIXES.has(prefix);
}

function hasSellerIdentifier(seller: unknown): boolean {
	return [
		["id"],
		["globalId"],
		["organization", "id"],
		["taxRegistration", "vat", "id"],
	].some((path) => identifierPresent(readPath(seller, path)));
}

function identifierPresent(value: unknown): boolean {
	if (Array.isArray(value)) return value.some(identifierPresent);
	return identifierText(value) !== undefined;
}

function identifierText(value: unknown): string | undefined {
	if (typeof value === "string") {
		const trimmed = value.trim();
		return trimmed || undefined;
	}
	if (!isRecord(value)) return undefined;
	if (typeof value.identifier === "string") {
		const trimmed = value.identifier.trim();
		return trimmed || undefined;
	}
	if (typeof value.value === "string") {
		const trimmed = value.value.trim();
		return trimmed || undefined;
	}
	return undefined;
}

function readPath(value: unknown, path: string[]): unknown {
	let current = value;
	for (const key of path) {
		if (!isRecord(current)) return undefined;
		current = current[key];
	}
	return current;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return !!value && typeof value === "object" && !Array.isArray(value);
}
