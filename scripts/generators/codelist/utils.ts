import { load as loadHTML } from "cheerio";
import { convert } from "xmlbuilder2";

export type ParserContext = {
	parseXML: typeof parseXML;
	parseUneceList: typeof parseUneceList;
	toScreamingSnakeCase: typeof toScreamingSnakeCase;
};

export type ParserResult = {
	packageRoot: string;
	data: ({
		key: string;
		value: string;
	} & Record<string, any>)[];
};

export function defineParser<Result extends ParserResult>(
	cb: (ctx: ParserContext) => Result | Promise<Result>,
) {
	return async (): Promise<Result> => {
		const ctx: ParserContext = {
			parseXML,
			parseUneceList,
			toScreamingSnakeCase,
		};
		return await cb(ctx);
	};
}

function parseXML(xml: string) {
	return convert(xml, { format: "object" });
}

async function parseUneceList(url: string) {
	const response = await fetch(url);
	const html = await response.text();

	const $ = loadHTML(html);
	const lines = $("pre").text().split(/\r?\n/);

	const data: {
		name: string;
		value: string;
		description?: string | undefined;
	}[] = [];
	let current: (typeof data)[number] | null = null;

	for (const line of lines) {
		const match = line.match(/^\s*([A-Z0-9]{1,3})\s{2,}(.+)/);
		if (match && match[1] && match[2]) {
			if (current) {
				data.push(current);
			}
			const name = match[2].trim();
			const value = match[1].trim();

			current = {
				name,
				value,
			};
		} else if (current) {
			const descLine = line.trim();
			if (descLine) {
				current.description ||= "";
				current.description += (current.description ? " " : "") + descLine;
			}
		}
	}

	if (current) {
		data.push(current);
	}

	return data;
}

function toScreamingSnakeCase(input: string): string {
	return input
		.normalize("NFKD")
		.replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
		.replace(/([a-z\d])([A-Z])/g, "$1_$2")
		.replace(/[^a-zA-Z\d]+/g, "_")
		.replace(/_+/g, "_")
		.replace(/^_+|_+$/g, "")
		.toUpperCase();
}
