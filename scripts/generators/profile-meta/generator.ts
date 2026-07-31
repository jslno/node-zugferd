import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { PlopGeneratorConfig } from "plop";
import serializeJS from "serialize-javascript";
import type { XMLSerializedAsObject } from "xmlbuilder2/lib/interfaces";
import { __dirname, formatContent, parseXML, workspaceRoot } from "../helper";

export const profileMetaGeneratorConfig: Partial<PlopGeneratorConfig> = {
	prompts: [],
	actions: [
		async (answers) => {
			const result = parseXML(
				await readFile(
					path.resolve(__dirname, "./profile-meta/output.xml"),
					"utf-8",
				),
			);
			if (!result || Array.isArray(result)) {
				throw new Error("Unexpected XML structure");
			}

			const entries = (
				(result.entries as XMLSerializedAsObject).entry as {
					"@id": string;
					"@xpath": string;
					businessTerm: string;
					description?: string | undefined;
					usageNote?: string | undefined;
					businessRule?: string | undefined;
					cius?: string | undefined;
				}[]
			).map(({ "@id": id, "@xpath": xpath, ...entry }) => [
				id,
				{
					xpath,
					...entry,
				},
			]);

			answers.path = path.resolve(
				workspaceRoot,
				"docs/src/lib/profile-field-meta.ts",
			);
			answers.content = serializeJS(entries, {
				ignoreFunction: true,
				isJSON: true,
				unsafe: true,
			});
			return "Preprocessing done successfully";
		},
		{
			type: "add",
			path: "{{path}}",
			templateFile: "./profile-meta/template.hbs",
			force: true,
		},
		async (answers) => {
			const filePath = answers.path as string;
			const content = new TextDecoder().decode(await readFile(filePath));
			const formatted = formatContent(content, {
				filePath,
			}).content;
			await writeFile(filePath, formatted);
			return `Profile meta created successfully!`;
		},
	],
};
