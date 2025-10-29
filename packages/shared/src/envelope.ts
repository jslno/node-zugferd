export type EnvelopeInput = {
	/**
	 * Message identification block
	 */
	exchangedDocumentContext: Record<string, any>;
	/**
	 * Document Header
	 */
	exchangedDocument: Record<string, any>;
	/**
	 * Supply Chain Trade Transaction block
	 */
	supplyChainTradeTransaction: Record<string, any>;
};

export const createEnvelope = (input: EnvelopeInput) => {
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
			"rsm:ExchangedDocumentContext": input.exchangedDocumentContext,
			"rsm:ExchangedDocument": input.exchangedDocument,
			"rsm:SupplyChainTradeTransaction": input.supplyChainTradeTransaction,
		},
	};
};
