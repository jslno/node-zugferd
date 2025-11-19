import { ZugferdBuilder } from "../../builder";
import { getApplicableHeaderTradeAgreement } from "./trade-agreement";
import { getApplicableHeaderTradeDelivery } from "./trade-delivery";
import { getApplicableHeaderTradeSettlement } from "./trade-settlement";

export const getSupplyChainTradeTransaction = ZugferdBuilder.createGroup(
	(builder) => {
		builder
			.assign(
				"ram:ApplicableHeaderTradeAgreement",
				getApplicableHeaderTradeAgreement,
			)
			.assign(
				"ram:ApplicableHeaderTradeDelivery",
				getApplicableHeaderTradeDelivery,
			)
			.assign(
				"ram:ApplicableHeaderTradeSettlement",
				getApplicableHeaderTradeSettlement,
			);
	},
);
