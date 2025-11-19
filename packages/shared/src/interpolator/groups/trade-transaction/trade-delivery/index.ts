import { ZugferdBuilder } from "../../../builder";

export const getApplicableHeaderTradeDelivery = ZugferdBuilder.createGroup(
	(builder, { input }) => {
		builder.assign("ram:ApplicableHeaderTradeDelivery", {});
	},
);
