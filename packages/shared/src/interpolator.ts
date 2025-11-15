import type { Interpolator } from "@node-zugferd/core";
import { createEnvelope } from "./envelope";
import { assign } from "./utils/assign";

export function interpolator(): Interpolator {
	return (ctx) => {
		const input: Record<string, any> = ctx.input;

		//#region ExchangedDocumentContext
		const buildExchangedDocumentContext = () => {
			const result: Record<string, any> = {};

			assign(
				result,
				"ram:BusinessProcessSpecifiedDocumentContextParameter/ram:ID",
				input.context?.businessProcessType,
			);
			assign(
				result,
				"ram:GuidelineSpecifiedDocumentContextParameter/ram:ID",
				input.context?.specificationIdentifier,
			);

			return result;
		};
		//#endregion

		//#region ExchangedDocument
		const buildExchangedDocument = () => {
			const result: Record<string, any> = {};

			assign(result, "ram:ID", input.document?.number);
			assign(result, "ram:TypeCode", input.document?.typeCode);
			assign(
				result,
				"ram:IssueDateTime/udt:DateTimeString",
				{
					"#": input.document!.issueDate,
					"@format": "102",
				},
				{
					condition: input.document?.issueDate !== undefined,
				},
			);

			return result;
		};
		//#endregion

		//#region SupplyChainTradeTransaction
		const buildSupplyChainTradeTransaction = () => {
			const result: Record<string, any> = {};

			//#region Trade agreement
			assign(
				result,
				"ram:ApplicableHeaderTradeAgreement/ram:BuyerReference",
				input.tradeTransaction?.tradeAgreement?.buyerReference,
			);

			//#region Seller
			assign(
				result,
				"ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:Name",
				input.tradeTransaction?.tradeAgreement?.seller.name,
			);

			//#region Seller organization
			assign(
				result,
				"ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
				input.tradeTransaction?.tradeAgreement?.seller.organization
					?.legalRegistrationID?.value,
			);
			assign(
				result,
				"ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
				input.tradeTransaction?.tradeAgreement?.seller.organization
					?.legalRegistrationID?.schemeID,
			);
			//#endregion

			//#region Seller postal address
			assign(
				result,
				"ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:PostalTradeAddress/ram:CountryID",
				input.tradeTransaction?.tradeAgreement?.seller.postalAddress
					?.countryCode,
			);
			//#endregion

			//#region Seller tax information
			assign(
				result,
				"ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration",
				{
					"ram:ID": {
						"#": input.tradeTransaction?.tradeAgreement!.seller.taxInformation!
							.vatID,
						"@schemeID": "VA",
					},
				},
				{
					array: true,
					condition:
						input.tradeTransaction?.tradeAgreement?.seller.taxInformation
							?.vatID !== undefined,
				},
			);
			assign(
				result,
				"ram:ApplicableHeaderTradeAgreement/ram:SellerTradeParty/ram:SpecifiedTaxRegistration",
				{
					"ram:ID": {
						"#": input.tradeTransaction?.tradeAgreement!.seller.taxInformation!
							.localID,
						"@schemeID": "FC",
					},
				},
				{
					array: true,
					condition:
						input.tradeTransaction?.tradeAgreement?.seller.taxInformation
							?.localID !== undefined,
				},
			);
			//#endregion

			//#endregion

			//#region Buyer
			assign(
				result,
				"ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:Name",
				input.tradeTransaction?.tradeAgreement?.buyer.name,
			);

			//#region Buyer organization
			assign(
				result,
				"ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:ID",
				input.tradeTransaction?.tradeAgreement?.buyer.organization
					?.legalRegistrationID?.value,
			);
			assign(
				result,
				"ram:ApplicableHeaderTradeAgreement/ram:BuyerTradeParty/ram:SpecifiedLegalOrganization/ram:ID/@schemeID",
				input.tradeTransaction?.tradeAgreement?.buyer.organization
					?.legalRegistrationID?.schemeID,
			);
			//#endregion

			//#endregion

			//#region Associated Order
			assign(
				result,
				"ram:ApplicableHeaderTradeAgreement/ram:BuyerOrderReferencedDocument/ram:IssuerAssignedID",
				input.tradeTransaction?.tradeAgreement?.associatedOrder
					?.purchaseOrderReference,
			);
			//#endregion

			//#endregion

			//#region Trade delivery
			assign(
				result,
				"ram:ApplicableHeaderTradeDelivery",
				{},
				{
					condition: input.tradeTransaction?.tradeDelivery !== undefined,
				},
			);
			//#endregion

			//#region Trade settlement
			assign(
				result,
				"ram:ApplicableHeaderTradeSettlement/ram:InvoiceCurrencyCode",
				input.tradeTransaction?.tradeSettlement?.invoiceCurrencyCode,
			);

			//#region Monetary summation
			assign(
				result,
				"ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxBasisTotalAmount",
				input.tradeTransaction?.tradeSettlement?.monetarySummation
					.taxBasisTotalAmount,
			);
			assign(
				result,
				"ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:TaxTotalAmount",
				{
					"#": input.tradeTransaction?.tradeSettlement?.monetarySummation
						.taxTotalAmount,
					"@currencyID":
						input.tradeTransaction?.tradeSettlement?.monetarySummation
							.currencyCode ??
						input.tradeTransaction?.tradeSettlement?.invoiceCurrencyCode,
				},
			);
			assign(
				result,
				"ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:GrandTotalAmount",
				input.tradeTransaction?.tradeSettlement?.monetarySummation
					.grandTotalAmount,
			);
			assign(
				result,
				"ram:ApplicableHeaderTradeSettlement/ram:SpecifiedTradeSettlementHeaderMonetarySummation/ram:DuePayableAmount",
				input.tradeTransaction?.tradeSettlement?.monetarySummation
					.duePayableAmount,
			);
			//#endregion

			//#endregion

			return result;
		};
		//#endregion

		return createEnvelope({
			exchangedDocumentContext: buildExchangedDocumentContext(),
			exchangedDocument: buildExchangedDocument(),
			supplyChainTradeTransaction: buildSupplyChainTradeTransaction(),
		});
	};
}
