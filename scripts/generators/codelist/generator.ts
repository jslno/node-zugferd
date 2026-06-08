import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ActionType, PlopGeneratorConfig } from "plop";
import serializeJS from "serialize-javascript";
import { formatContent, workspaceRoot } from "../helper";
import { allowance } from "./allowance";
import { characteristic } from "./characteristic";
import { charge } from "./charge";
import { country } from "./country";
import { currency } from "./currency";
import { eas } from "./eas";
import { icd } from "./icd";
import { incoterms } from "./incoterms";
import { item } from "./item";
import { language } from "./language";
import { lineReason } from "./line-reason";
import { lineStatus } from "./line-status";
import { payment } from "./payment";
import { text } from "./text";
import { time } from "./time";
import { transport } from "./transport";
import { unit } from "./unit";
import { untdid1001 } from "./untdid-1001";
import { untdid1153 } from "./untdid-1153";
import { untdid2005 } from "./untdid-2005";
import { untdid3035 } from "./untdid-3035";
import { untdid3139 } from "./untdid-3139";
import { untdid4053 } from "./untdid-4053";
import { untdid5305 } from "./untdid-5305";
import { vatCat } from "./vat-cat";
import { vatex } from "./vatex";

const codelistGeneratorMap = {
	allowance,
	characteristic,
	charge,
	country,
	currency,
	eas,
	icd,
	incoterms,
	item,
	language,
	lineReason,
	lineStatus,
	payment,
	text,
	time,
	transport,
	unit,
	untdid1001,
	untdid1153,
	untdid2005,
	untdid3035,
	untdid3139,
	untdid4053,
	untdid5305,
	vatCat,
	vatex,
};

export const codelistGeneratorConfig: Partial<PlopGeneratorConfig> = {
	prompts: [
		{
			type: "list",
			name: "codelist",
			choices: ["all", ...Object.keys(codelistGeneratorMap)],
		},
	],
	actions: (answers) => {
		if (!answers) return [];
		const codelists: (keyof typeof codelistGeneratorMap)[] =
			answers.codelist === "all"
				? Object.keys(codelistGeneratorMap)
				: [answers.codelist];

		return codelists.flatMap((codelist) => [
			async (answers) => {
				const result = await codelistGeneratorMap[codelist]();

				const packageRoot = path.resolve(workspaceRoot, result.packageRoot);
				const filePath = path.resolve(packageRoot, "src/index.ts");
				const content = serializeJS(result.data, {
					ignoreFunction: true,
					isJSON: true,
					unsafe: true,
				});

				answers.codelist = codelist;
				answers.path = filePath;
				answers.content = content;

				return `Codelist "${codelist}" parsed successfully`;
			},
			{
				type: "add",
				path: "{{path}}",
				templateFile: "./codelist/template.hbs",
				force: true,
			} satisfies ActionType,
			async (answers) => {
				const filePath = answers.path as string;
				const content = new TextDecoder().decode(await readFile(filePath));
				const formatted = formatContent(content, {
					filePath,
				}).content;
				await writeFile(filePath, formatted);
				return `Codelist "${answers.codelist}" created successfully!`;
			},
		]);
	},
};
