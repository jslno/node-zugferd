import { describe, it, expect } from "vitest";
import { EXTENDED } from "../../profiles";
import { zugferd } from "../../zugferd";
import type { ProfileExtended } from "../../profiles/extended";

describe("XML Formatter", () => {
	describe("CategoryTradeTax element ordering", () => {
		it("should generate valid XML with charges containing categoryTradeTax", async () => {
			const invoicer = zugferd({ profile: EXTENDED, strict: true });

			const data = {
				issueDate: new Date("2024-11-26"),
				number: "INV-2024-001",
				typeCode: "380",
				transaction: {
					line: [
						{
							identifier: "ITEM-001",
							tradeProduct: { name: "Test Product" },
							tradeAgreement: {
								grossTradePrice: { chargeAmount: 100 },
								netTradePrice: { chargeAmount: 100 },
							},
							tradeDelivery: {
								billedQuantity: { amount: 1, unitMeasureCode: "C62" },
							},
							tradeSettlement: {
								tradeTax: {
									typeCode: "VAT",
									categoryCode: "S",
									rateApplicablePercent: 19,
								},
								monetarySummation: { lineTotalAmount: 100 },
							},
						},
					],
					tradeAgreement: {
						seller: {
							name: "Test Seller GmbH",
							postalAddress: {
								line1: "Test Street 1",
								city: "Berlin",
								postCode: "10115",
								countryCode: "DE",
							},
							taxRegistration: { vatIdentifier: "DE123456789" },
						},
						buyer: {
							name: "Test Buyer",
							postalAddress: {
								line1: "Buyer Street 1",
								city: "Munich",
								postCode: "80331",
								countryCode: "DE",
							},
						},
					},
					tradeDelivery: {
						information: { deliveryDate: new Date("2024-11-25") },
					},
					tradeSettlement: {
						currencyCode: "EUR",
						vatBreakdown: [
							{
								calculatedAmount: 20.88,
								typeCode: "VAT",
								basisAmount: 109.9,
								categoryCode: "S",
								rateApplicablePercent: 19,
							},
						],
						charges: [
							{
								actualAmount: 9.9,
								reason: "Shipping",
								categoryTradeTax: {
									typeCode: "VAT",
									categoryCode: "S",
									vatRate: 19,
								},
							},
						],
						monetarySummation: {
							lineTotalAmount: 100,
							chargeTotalAmount: 9.9,
							allowanceTotalAmount: 0,
							taxBasisTotalAmount: 109.9,
							taxTotal: { amount: 20.88, currencyCode: "EUR" },
							grandTotalAmount: 130.78,
							duePayableAmount: 130.78,
						},
					},
				},
			};

			const invoice = invoicer.create(data as ProfileExtended);

			// This should not throw - XSD validation should pass
			const xml = await invoice.toXML();

			// Verify TypeCode comes before CategoryCode in CategoryTradeTax
			const categoryTradeTaxMatch = xml.match(
				/<ram:CategoryTradeTax>([\s\S]*?)<\/ram:CategoryTradeTax>/,
			);
			expect(categoryTradeTaxMatch).toBeTruthy();

			const categoryTradeTaxContent = categoryTradeTaxMatch![1];
			const typeCodeIndex = categoryTradeTaxContent.indexOf("<ram:TypeCode>");
			const categoryCodeIndex =
				categoryTradeTaxContent.indexOf("<ram:CategoryCode>");

			expect(typeCodeIndex).toBeGreaterThan(-1);
			expect(categoryCodeIndex).toBeGreaterThan(-1);
			expect(typeCodeIndex).toBeLessThan(categoryCodeIndex);
		});

		it("should generate valid XML with allowances containing categoryTradeTax", async () => {
			const invoicer = zugferd({ profile: EXTENDED, strict: true });

			const data = {
				issueDate: new Date("2024-11-26"),
				number: "INV-2024-002",
				typeCode: "380",
				transaction: {
					line: [
						{
							identifier: "ITEM-001",
							tradeProduct: { name: "Test Product" },
							tradeAgreement: {
								grossTradePrice: { chargeAmount: 100 },
								netTradePrice: { chargeAmount: 100 },
							},
							tradeDelivery: {
								billedQuantity: { amount: 1, unitMeasureCode: "C62" },
							},
							tradeSettlement: {
								tradeTax: {
									typeCode: "VAT",
									categoryCode: "S",
									rateApplicablePercent: 19,
								},
								monetarySummation: { lineTotalAmount: 100 },
							},
						},
					],
					tradeAgreement: {
						seller: {
							name: "Test Seller GmbH",
							postalAddress: {
								line1: "Test Street 1",
								city: "Berlin",
								postCode: "10115",
								countryCode: "DE",
							},
							taxRegistration: { vatIdentifier: "DE123456789" },
						},
						buyer: {
							name: "Test Buyer",
							postalAddress: {
								line1: "Buyer Street 1",
								city: "Munich",
								postCode: "80331",
								countryCode: "DE",
							},
						},
					},
					tradeDelivery: {
						information: { deliveryDate: new Date("2024-11-25") },
					},
					tradeSettlement: {
						currencyCode: "EUR",
						vatBreakdown: [
							{
								calculatedAmount: 17.1,
								typeCode: "VAT",
								basisAmount: 90,
								categoryCode: "S",
								rateApplicablePercent: 19,
							},
						],
						allowances: [
							{
								actualAmount: 10,
								reason: "Discount",
								categoryTradeTax: {
									typeCode: "VAT",
									categoryCode: "S",
									vatRate: 19,
								},
							},
						],
						monetarySummation: {
							lineTotalAmount: 100,
							chargeTotalAmount: 0,
							allowanceTotalAmount: 10,
							taxBasisTotalAmount: 90,
							taxTotal: { amount: 17.1, currencyCode: "EUR" },
							grandTotalAmount: 107.1,
							duePayableAmount: 107.1,
						},
					},
				},
			};

			const invoice = invoicer.create(data as ProfileExtended);

			// This should not throw - XSD validation should pass
			const xml = await invoice.toXML();

			// Verify TypeCode comes before CategoryCode in CategoryTradeTax
			const categoryTradeTaxMatch = xml.match(
				/<ram:CategoryTradeTax>([\s\S]*?)<\/ram:CategoryTradeTax>/,
			);
			expect(categoryTradeTaxMatch).toBeTruthy();

			const categoryTradeTaxContent = categoryTradeTaxMatch![1];
			const typeCodeIndex = categoryTradeTaxContent.indexOf("<ram:TypeCode>");
			const categoryCodeIndex =
				categoryTradeTaxContent.indexOf("<ram:CategoryCode>");

			expect(typeCodeIndex).toBeGreaterThan(-1);
			expect(categoryCodeIndex).toBeGreaterThan(-1);
			expect(typeCodeIndex).toBeLessThan(categoryCodeIndex);
		});
	});
});
