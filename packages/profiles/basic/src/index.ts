import { basicWL } from "@node-zugferd/basic-wl";
import { defineProfile } from "@node-zugferd/utils";
import { fragment } from "xmlbuilder2";
import { schema } from "./schema";

export const basic = defineProfile({
	id: "basic",
	dataRelationship: ["Alternative", "Source", "Data"],
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "BASIC",
		fileName: "factur-x.xml",
		version: "1.0",
	},
	use: [basicWL],
	schema,
	build(data, { root, findNode, getCachedNode, setCachedNode }) {
		const crossIndustryInvoice = root.first();

		if (data.transaction) {
			const supplyChainTradeTransaction = findNode(
				"BG-25-00",
				crossIndustryInvoice,
				(node) => node.node.nodeName === "rsm:SupplyChainTradeTransaction",
				() => crossIndustryInvoice.ele("rsm:SupplyChainTradeTransaction"),
			);

			if (data.transaction.line.length > 0) {
				const refNode =
					(
						getCachedNode("BT-10-00") ||
						getCachedNode("BT-13-00") ||
						getCachedNode("BG-19") ||
						setCachedNode(
							(node) =>
								node.node.nodeName === "ram:ApplicableHeaderTradeAgreement"
									? "BT-10-00"
									: node.node.nodeName === "ram:ApplicableHeaderTradeDelivery"
										? "BT-13-00"
										: "BG-19",
							supplyChainTradeTransaction.find((node) =>
								[
									"ram:ApplicableHeaderTradeAgreement",
									"ram:ApplicableHeaderTradeDelivery",
									"ram:ApplicableHeaderTradeSettlement",
								].includes(node.node.nodeName),
							),
						)
					)?.node ?? null;
				for (const line of data.transaction.line) {
					const includedSupplyChainTradeLineItem = fragment().ele(
						"ram:IncludedSupplyChainTradeLineItem",
					);
					supplyChainTradeTransaction.node.insertBefore(
						includedSupplyChainTradeLineItem.node,
						refNode,
					);

					if (line.position) {
						const associatedDocumentLineDocument =
							includedSupplyChainTradeLineItem.ele(
								"ram:AssociatedDocumentLineDocument",
							);
						associatedDocumentLineDocument
							.ele("ram:LineID")
							.txt(line.position.lineId.identifier);

						if (line.position.includedNote) {
							const includedNote =
								associatedDocumentLineDocument.ele("ram:IncludedNote");
							if (line.position.includedNote.content) {
								includedNote
									.ele("ram:Content")
									.txt(line.position.includedNote.content);
							}
						}
					}

					if (line.item) {
						const specifiedTradeProduct = includedSupplyChainTradeLineItem.ele(
							"ram:SpecifiedTradeProduct",
						);
						if (line.item.globalId) {
							specifiedTradeProduct
								.ele("ram:GlobalID")
								.txt(line.item.globalId.identifier)
								.att("schemeID", line.item.globalId.schemeId);
						}
						specifiedTradeProduct.ele("ram:Name").txt(line.item.name);
					}

					if (line.priceDetails) {
						const specifiedLineTradeAgreement =
							includedSupplyChainTradeLineItem.ele(
								"ram:SpecifiedLineTradeAgreement",
							);
						if (line.priceDetails.grossPrice) {
							const grossPriceProductTradePrice =
								specifiedLineTradeAgreement.ele(
									"ram:GrossPriceProductTradePrice",
								);
							if (
								typeof line.priceDetails.grossPrice.chargeAmount === "number"
							) {
								grossPriceProductTradePrice
									.ele("ram:ChargeAmount")
									.txt(line.priceDetails.grossPrice.chargeAmount.toString());
							}

							if (
								line.priceDetails.grossPrice.basisQuantity !== null &&
								line.priceDetails.grossPrice.basisQuantity !== undefined
							) {
								const { value, unitCode } =
									typeof line.priceDetails.grossPrice.basisQuantity === "number"
										? {
												value: line.priceDetails.grossPrice.basisQuantity,
											}
										: line.priceDetails.grossPrice.basisQuantity;
								const basisQuantity = grossPriceProductTradePrice
									.ele("ram:BasisQuantity")
									.txt(value.toString());
								if (unitCode) {
									basisQuantity.att("unitCode", unitCode);
								}
							}

							if (line.priceDetails.grossPrice.discount) {
								const discounts = Array.isArray(
									line.priceDetails.grossPrice.discount,
								)
									? (line.priceDetails.grossPrice
											.discount as (typeof line.priceDetails.grossPrice.discount)[])
									: [line.priceDetails.grossPrice.discount];
								for (const discount of discounts) {
									const appliedTradeAllowanceCharge =
										grossPriceProductTradePrice.ele(
											"ram:AppliedTradeAllowanceCharge",
										);
									appliedTradeAllowanceCharge
										.ele("ram:ChargeIndicator")
										.ele("udt:Indicator")
										.txt("false");
									if (discount.actualAmount) {
										appliedTradeAllowanceCharge
											.ele("ram:ActualAmount")
											.txt(discount.actualAmount.toString());
									}
								}
							}
						}

						if (line.priceDetails.netPrice) {
							const netPriceProductTradePrice = specifiedLineTradeAgreement.ele(
								"ram:NetPriceProductTradePrice",
							);

							netPriceProductTradePrice
								.ele("ram:ChargeAmount")
								.txt(line.priceDetails.netPrice.chargeAmount.toString());

							if (
								line.priceDetails.netPrice.basisQuantity !== null &&
								line.priceDetails.netPrice.basisQuantity !== undefined
							) {
								const { value, unitCode } =
									typeof line.priceDetails.netPrice.basisQuantity === "number"
										? {
												value: line.priceDetails.netPrice.basisQuantity,
											}
										: line.priceDetails.netPrice.basisQuantity;
								const basisQuantity = netPriceProductTradePrice
									.ele("ram:BasisQuantity")
									.txt(value.toString());
								if (unitCode) {
									basisQuantity.att("unitCode", unitCode);
								}
							}
						}
					}

					if (line.delivery) {
						const specifiedLineTradeDelivery =
							includedSupplyChainTradeLineItem.ele(
								"ram:SpecifiedLineTradeDelivery",
							);

						if (line.delivery.billedQuantity) {
							const billedQuantity = specifiedLineTradeDelivery
								.ele("ram:BilledQuantity")
								.txt(line.delivery.billedQuantity.value.toString());
							billedQuantity.att(
								"unitCode",
								line.delivery.billedQuantity.unitCode,
							);
						}
					}

					if (line.billing) {
						const specifiedLineTradeSettlement =
							includedSupplyChainTradeLineItem.ele(
								"ram:SpecifiedLineTradeSettlement",
							);

						if (
							(typeof line.billing.vatBreakdown === "object" &&
								line.billing.vatBreakdown !== null) ||
							Array.isArray(line.billing.vatBreakdown)
						) {
							for (const vatBreakdown of Array.isArray(
								line.billing.vatBreakdown,
							)
								? (line.billing
										.vatBreakdown as (typeof line.billing.vatBreakdown)[])
								: [line.billing.vatBreakdown]) {
								const applicableTradeTax = specifiedLineTradeSettlement.ele(
									"ram:ApplicableTradeTax",
								);

								applicableTradeTax
									.ele("ram:TypeCode")
									.txt(vatBreakdown.typeCode);
								applicableTradeTax
									.ele("ram:CategoryCode")
									.txt(vatBreakdown.categoryCode.value);
								if (typeof vatBreakdown.rateApplicablePercent === "number") {
									applicableTradeTax
										.ele("ram:RateApplicablePercent")
										.txt(vatBreakdown.rateApplicablePercent.toString());
								}
							}
						}

						if (line.billing.invoicePeriod) {
							const billingSpecifiedPeriod = specifiedLineTradeSettlement.ele(
								"ram:BillingSpecifiedPeriod",
							);
							if (line.billing.invoicePeriod.startDate) {
								billingSpecifiedPeriod
									.ele("ram:StartDateTime")
									.ele("udt:DateTimeString")
									.txt(line.billing.invoicePeriod.startDate.value)
									.att("format", line.billing.invoicePeriod.startDate.format);
							}

							if (line.billing.invoicePeriod.endDate) {
								billingSpecifiedPeriod
									.ele("ram:EndDateTime")
									.ele("udt:DateTimeString")
									.txt(line.billing.invoicePeriod.endDate.value)
									.att("format", line.billing.invoicePeriod.endDate.format);
							}
						}

						if (
							line.billing.allowances?.length &&
							line.billing.allowances.length > 0
						) {
							for (const allowance of line.billing.allowances) {
								const specifiedTradeAllowanceCharge =
									specifiedLineTradeSettlement.ele(
										"ram:SpecifiedTradeAllowanceCharge",
									);
								specifiedTradeAllowanceCharge
									.ele("ram:ChargeIndicator")
									.ele("udt:Indicator")
									.txt("false");

								specifiedTradeAllowanceCharge
									.ele("ram:ActualAmount")
									.txt(allowance.actualAmount.value.toString());
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
								const specifiedTradeAllowanceCharge =
									specifiedLineTradeSettlement.ele(
										"ram:SpecifiedTradeAllowanceCharge",
									);
								specifiedTradeAllowanceCharge
									.ele("ram:ChargeIndicator")
									.ele("udt:Indicator")
									.txt("true");

								specifiedTradeAllowanceCharge
									.ele("ram:ActualAmount")
									.txt(charge.actualAmount.value.toString());
								if (charge.reasonCode) {
									const reasonCode = specifiedTradeAllowanceCharge
										.ele("ram:ReasonCode")
										.txt(charge.reasonCode.value);
									if ((charge.reasonCode.codelist as string) === "untdid5153") {
										reasonCode.att("listID", "5153");
									}
								}
								if (charge.reason) {
									specifiedTradeAllowanceCharge
										.ele("ram:Reason")
										.txt(charge.reason);
								}
							}
						}

						if (line.billing.itemTotals) {
							const specifiedTradeSettlementLineMonetarySummation =
								specifiedLineTradeSettlement.ele(
									"ram:SpecifiedTradeSettlementLineMonetarySummation",
								);
							if (line.billing.itemTotals.lineTotalAmount) {
								specifiedTradeSettlementLineMonetarySummation
									.ele("ram:LineTotalAmount")
									.txt(
										line.billing.itemTotals.lineTotalAmount.value.toString(),
									);
							}
						}
					}
				}
			}
		}
	},
	rules(data, ctx) {},
});
