import { XMLParser, type X2jOptions } from "fast-xml-parser";
import type { InternalContext } from "../../init";
import defu from "defu";

export const parseXml = <R = any>(
	ctx: InternalContext,
	xml: string | Buffer,
	options?: X2jOptions,
) => {
	ctx.logger.debug(`[${parseXml.name}] Formatting XML started`);

	const parser = new XMLParser(
		defu(
			{
				ignoreAttributes: false,
				attributeNamePrefix: "@",
				textNodeName: "#",
			},
			options,
		),
	);

	const result = parser.parse(xml) as R;

	ctx.logger.debug(`[${parseXml.name}] Parsing XML finished`);

	return result;
};

export const getTextNode = (node: string | { "#": string } | undefined) => {
	if (!node) {
		return;
	}

	if (typeof node === "object" && "#" in node) {
		return node["#"];
	}

	return node;
};
