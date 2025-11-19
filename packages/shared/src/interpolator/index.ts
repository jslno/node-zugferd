import type { Interpolator } from "@node-zugferd/core";
import { ZugferdBuilder } from "./builder";
import { getExchangedDocumentContext } from "./groups/context";
import { getExchangedDocument } from "./groups/document";
import { getSupplyChainTradeTransaction } from "./groups/trade-transaction";

export const interpolator = ((ctx) => {
	const { result } = new ZugferdBuilder(ctx)
		.assign("rsm:ExchangedDocumentContext", getExchangedDocumentContext)
		.assign("rsm:ExchangedDocument", getExchangedDocument)
		.assign("rsm:SupplyChainTradeTransaction", getSupplyChainTradeTransaction);

	return {
		"rsm:CrossIndustryInvoice": {
			"@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
			"@xmlns:qdt": "urn:un:unece:uncefact:data:standard:QualifiedDataType:100",
			"@xmlns:udt":
				"urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100",
			"@xmlns:rsm":
				"urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100",
			"@xmlns:ram":
				"urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100",
			...result,
		},
	};
}) satisfies Interpolator;
