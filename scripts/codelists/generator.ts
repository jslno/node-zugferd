import { load as loadHTML } from "cheerio";
import { XMLParser } from "fast-xml-parser";

type GeneratorContext = {
	parseUneceList: typeof parseUneceList;
	parseXML: typeof parseXML;
	getTextNode: typeof getTextNode;
	toScreamingSnakeCase: typeof toScreamingSnakeCase;
};
type GeneratorFn = (
	ctx: GeneratorContext,
) => Record<string, any>[] | Promise<Record<string, any>[]>;
type GeneratorConfig = {
	id: string;
	definition: Record<
		string,
		{
			type: string;
			/**
			 * @default true
			 */
			required?: boolean | undefined;
		}
	>;
	accessorKey: string;
	accessorValue: string;
	exec: GeneratorFn;
};

export function generator(config: GeneratorConfig) {
	const ctx: GeneratorContext = {
		parseUneceList,
		parseXML,
		getTextNode,
		toScreamingSnakeCase,
	};

	return {
		...config,
		exec: config.exec.bind(null, ctx),
	};
}

export function arrayable<T>(input: T | T[]): T[] {
	return !Array.isArray(input) ? [input] : input;
}

function toScreamingSnakeCase(input: string) {
	return input
		.trim()
		.normalize("NFD")
		.replace(/([a-z0-9])([A-Z])/g, "$1_$2")
		.replace(/[\s\-\/]+/g, "_")
		.replace(/[^a-zA-Z0-9_]/g, "")
		.toUpperCase();
}

async function parseUneceList(url: string) {
	const response = await fetch(url);
	const html = await response.text();

	const $ = loadHTML(html);
	const preText = $("pre").text();
	const lines = preText.split(/\r?\n/);

	const data: {
		key: string;
		name: string;
		value: string;
		description: string;
	}[] = [];
	let current = null;

	for (const line of lines) {
		const match = line.match(/^\s*([A-Z0-9]{1,3})\s{2,}(.+)/);
		if (match) {
			if (current) {
				data.push(current);
			}
			const name = match[2]?.trim();

			current = {
				key: toScreamingSnakeCase(name),
				name,
				value: match[1]?.trim(),
				description: "",
			};
		} else if (current) {
			const descLine = line.trim();
			if (descLine) {
				current.description += (current.description ? " " : "") + descLine;
			}
		}
	}

	if (current) {
		data.push(current);
	}

	return data;
}

function parseXML<R = Record<string, any>>(xml: string | Buffer) {
	const parser = new XMLParser({
		ignoreAttributes: false,
		parseTagValue: false,
		attributeNamePrefix: "@",
		textNodeName: "#",
	});

	return parser.parse(xml) as R;
}

function getTextNode(node: string | { "#": string }): string | undefined {
	if (typeof node === "string") {
		return node;
	}

	return node?.["#"];
}
