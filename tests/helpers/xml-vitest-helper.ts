/* eslint-disable @typescript-eslint/no-explicit-any */
export function formatXmlLocation(location: string) {
	/*
	/*:
	CrossIndustryInvoice[namespace-uri()='urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100'][1]/*:
	SupplyChainTradeTransaction[namespace-uri()='urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100'][1]/*:
	ApplicableHeaderTradeSettlement[namespace-uri()='urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100'][1]/*:
	SpecifiedTradeSettlementHeaderMonetarySummation[namespace-uri()='urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100'][1]/*:
	TaxTotalAmount[namespace-uri()='urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100'][1]
	*/
	return `${location || 'UNKNOWN'}`
		.split('/*:')
		.map((part) => {
			const [tag, rest] = part.trim().split('[namespace');
			if (!tag) {
				return null;
			}
			const [, indexRaw] = `${rest || ''}`.split('][');
			const index = `${indexRaw || ''}`.split(']')[0];
			return `${tag}${index ? `[${index}]` : ''}`;
		})
		.filter((x) => !!x)
		.join('.')
		.trim();
}

export function stripXmlNamespace(subtree: any): any {
	if (typeof subtree !== 'object' || subtree === null) {
		return subtree;
	}
	if (Array.isArray(subtree)) {
		return subtree.map((v) => stripXmlNamespace(v));
	}
	return Object.fromEntries(
		Object.entries(subtree).map(([key, value]) => [
			key.split(':').pop() || key,
			stripXmlNamespace(value),
		]),
	);
}

/**
 * Retrieves a value from a JSON representation of an XML document using a dot-separated location path.
 *
 * The location path uses the format: Tag[index].ChildTag[index]...
 * - Tag names in the location do NOT include namespaces (e.g., 'TypeCode' not 'ram:TypeCode').
 * - The XML JSON tree (from xml2js) includes namespaces in keys (e.g., 'ram:TypeCode').
 * - This function ignores namespaces when matching tags.
 * - Indices are required if multiple elements exist; default is 0 if omitted.
 *
 * @param source - The XML JSON object (from xml2js)
 * @param location - The dot-separated path (e.g., 'CrossIndustryInvoice[0].TypeCode[1]')
 * @returns The value at the specified location, or undefined if not found
 */
export function getValueFromXmlJson(source: any, location: string) {
	if (!source || !location) {
		return;
	}
	let current = source;
	const parts = location.split('.');

	for (const part of parts) {
		// Extract tag and index (e.g., 'TypeCode[1]')
		const match = part.match(/^(\w+)(?:\[(\d+)])?$/);
		if (!match) {
			return;
		}
		const tag = match[1];
		const index = match[2] ? Number.parseInt(match[2], 10) : 0;

		// Find the key in current object that matches the tag (ignoring namespace)
		if (typeof current !== 'object' || current === null) {
			return;
		}
		current = current[tag];
		if (typeof current !== 'object' || current === null) {
			return;
		}

		if (!Array.isArray(current) && index === 1) {
			continue;
		}

		if (!Array.isArray(current) || current.length <= index - 1) {
			return;
		}
		current = current[index - 1];
	}
	return current;
}
