import { ZugferdBuilder } from "../../../builder";
import { getBuyerTradeParty } from "./buyer";
import { getSellerTradeParty } from "./seller";
import { getSellerTaxRepresentativeTradeParty } from "./seller-tax-representative";

export const getApplicableHeaderTradeAgreement = ZugferdBuilder.createGroup(
	(builder, { input }) => {
		builder
			.assign(
				"ram:BuyerReference",
				input.tradeTransaction?.tradeAgreement?.buyerReference,
			)
			.assign("ram:SellerTradeParty", getSellerTradeParty)
			.assign("ram:BuyerTradeParty", getBuyerTradeParty)
			.assign(
				"ram:SellerTaxRepresentativeTradeParty",
				getSellerTaxRepresentativeTradeParty,
				{
					minProfile: "basic-wl",
				},
			)
			.assign(
				"ram:BuyerOrderReferencedDocument/ram:IssuerAssignedID",
				input.tradeTransaction?.tradeAgreement?.associatedOrder?.reference,
			)
			.assign(
				"ram:ContractReferencedDocument/ram:IssuerAssignedID",
				input.tradeTransaction?.tradeAgreement?.associatedContract?.reference,
				{
					minProfile: "basic-wl",
				},
			);
	},
);
