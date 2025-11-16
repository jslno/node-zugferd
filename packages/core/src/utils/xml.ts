import type { X2jOptions, XmlBuilderOptions } from "fast-xml-parser";
import { XMLBuilder, XMLParser } from "fast-xml-parser";

export function parseXML(
	xml: string | Uint8Array<ArrayBufferLike>,
	options?: X2jOptions | undefined,
): Record<string, any> | undefined {
	const parser = new XMLParser({
		ignoreDeclaration: true,
		ignoreAttributes: false,
		attributeNamePrefix: "@",
		textNodeName: "#",
		...options,
	});
	return parser.parse(xml) ?? undefined;
}

export function formatXML(
	tree: Record<string, any>,
	options?: XmlBuilderOptions | undefined,
): string {
	const builder = new XMLBuilder({
		ignoreAttributes: false,
		attributeNamePrefix: "@",
		textNodeName: "#",
		suppressBooleanAttributes: false,
		suppressEmptyNode: true,
		suppressUnpairedNode: false,
		...options,
	});
	return builder.build(tree);
}
