import { describe, it, beforeEach, expect } from "vitest";
import { zugferd } from "../packages/node-zugferd/src";
import { BASIC } from "../packages/node-zugferd/src/profiles/basic/index";

import "./helpers/e-invoice-vitest-helper";

describe("Basic", () => {
	let invoicer: any;

	beforeEach(() => {
		invoicer = zugferd({
			profile: BASIC,
			strict: false,
		});
	});

	it("basic invoice should generate valid XML", async () => {
		const allowanceTotal = 7 + 3;
		const lineTotal = 100;
		const paidAmount = 5;

		const netTotal = lineTotal - allowanceTotal;
		const taxTotal = netTotal * 0.19;

		const xml = await invoicer
			.create({
				number: "1234567890",
				typeCode: "380",
				issueDate: new Date(),
				transaction: {
					tradeSettlement: {
						monetarySummation: {
							lineTotalAmount: lineTotal.toFixed(2),
							taxBasisTotalAmount: (lineTotal - allowanceTotal).toFixed(2),
							allowanceTotalAmount: allowanceTotal.toFixed(2),
							taxTotal: {
								amount: taxTotal.toFixed(2),
								currencyCode: "EUR",
							},
							paidAmount: paidAmount.toFixed(2),
							grandTotalAmount: (netTotal + taxTotal).toFixed(2),
							duePayableAmount: (netTotal + taxTotal - paidAmount).toFixed(2),
						},
						allowances: [
							{
								actualAmount: "7.00",
								reasonCode: "95",
								reason: "Discount",
								categoryTradeTax: {
									categoryCode: "S",
									rateApplicablePercent: "19.00",
								},
							},
							{
								actualAmount: "3.00",
								reasonCode: "95",
								reason: "Coupon",
								categoryTradeTax: {
									categoryCode: "S",
									rateApplicablePercent: "19.00",
								},
							},
						],
					},
					line: [
						{
							identifier: "1",
							tradeProduct: {
								name: "Item 1",
							},
							tradeAgreement: {
								netTradePrice: {
									chargeAmount: "100.00",
								},
							},
							tradeDelivery: {
								billedQuantity: {
									amount: "1",
									unitMeasureCode: "C62",
								},
							},
							tradeSettlement: {
								tradeTax: {
									typeCode: "VAT",
									categoryCode: "S",
									rateApplicablePercent: "19.00",
								},
								monetarySummation: {
									lineTotalAmount: "100.00",
								},
							},
						},
					],
				},
			})
			.toXML();

		(expect(xml) as any).toBeValidEInvoice();
	});
});
