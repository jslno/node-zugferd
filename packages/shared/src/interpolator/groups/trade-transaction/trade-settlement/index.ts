import { ZugferdBuilder } from "../../../builder";

export const getApplicableHeaderTradeSettlement = ZugferdBuilder.createGroup(
	(builder, { input }) => {
		builder
			.assign(
				"ram:InvoiceCurrencyCode",
				input.tradeTransaction?.tradeSettlement?.invoiceCurrencyCode,
			)
			//#region Monetary summation
			.assign(
				"ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxBasisTotalAmount",
				input.tradeTransaction?.tradeSettlement?.monetarySummation
					.taxBasisTotalAmount,
			)
			.assign(
				"ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount",
				{
					"#": input.tradeTransaction?.tradeSettlement?.monetarySummation
						.taxTotalAmount,
					"@currencyID":
						input.tradeTransaction?.tradeSettlement?.monetarySummation
							.currencyCode ??
						input.tradeTransaction?.tradeSettlement?.invoiceCurrencyCode,
				},
			)
			.assign(
				"ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:GrandTotalAmount",
				input.tradeTransaction?.tradeSettlement?.monetarySummation
					.grandTotalAmount,
			)
			.assign(
				"ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:DuePayableAmount",
				input.tradeTransaction?.tradeSettlement?.monetarySummation
					.duePayableAmount,
			);
		//#endregion
	},
);
