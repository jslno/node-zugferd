import { parseXML } from "../helper";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export type ParserContext = {
	parseXML: typeof parseXML;
	parseUnclList: typeof parseUnclList;
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
			parseUnclList,
			toScreamingSnakeCase,
		};
		return await cb(ctx);
	};
}

let uncl: string | null = null;

async function getUnclSource() {
	if (!uncl) {
		uncl = await readFile(
			join(dirname(fileURLToPath(import.meta.url)), "./UNCL.22A"),
			"utf-8",
		);
	}
	return uncl;
}

async function parseUnclList(id: `${number}`) {
	const source = await getUnclSource();
	const codelists = source
		.split("-".repeat(70))
		.slice(1)
		.map((v) => v.trim());

	const codelist = codelists.find((c) =>
		(c.startsWith("*") ? c.slice(1).trim() : c).startsWith(id),
	);

	if (!codelist) {
		throw new Error(`Codelist "${id}" not found`);
	}

	const lines = codelist.replace(/\r\n/g, "\n").split("\n");

	type Entry = {
		name: string;
		value: string;
		description?: string | undefined;
	};
	const data: Entry[] = [];

	let current: Entry | null = null;

	for (const line of lines) {
		const match = line.match(/^\s{5}([A-Z0-9]{1,3})\s{2,}(.+)$/);
		if (match) {
			if (!current && typeof match[1] === "string" && match[1].endsWith(":")) {
				current = null;
				continue;
			}

			current = {
				value: match[1],
				name: match[2].trim(),
			};

			data.push(current);
		}

		if (current && !match && line.trim() !== "") {
			current.description = current.description
				? `${current.description} ${line.trim()}`
				: line.trim();
		}
	}

	if (data.length === 0) {
		throw new Error("Failed to parse codelist");
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
