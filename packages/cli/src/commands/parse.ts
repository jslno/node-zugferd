import { Command } from "commander";
import { cancel, isCancel, path as pathPrompt } from "@clack/prompts";
import * as z from "zod";
import path from "node:path";
import fs from "node:fs/promises";
import { tryCatch } from "../utils/helper";
import { importPackage } from "../utils/import";
import { getInvoicerInstance } from "../utils/invoicer";

const parseOptionsSchema = z.object({
	cwd: z.string().default(process.cwd()),
	profile: z.string().optional(),
	input: z.string().optional(),
	output: z.string().optional(),
	minify: z.boolean().default(false),
});

async function parseAction(opts: z.infer<typeof parseOptionsSchema>) {
	const options = await parseOptionsSchema.parseAsync(opts);

	let inputFile: string;
	if (options.input) {
		inputFile = path.isAbsolute(options.input)
			? options.input
			: path.resolve(options.cwd, options.input);
	} else {
		const result = await pathPrompt({
			message: "Select the invoice file to parse",
			root: options.cwd,
			directory: false,
		});
		if (isCancel(result)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}
		inputFile = result;
	}

	const { data: inputContent, error } = await tryCatch(fs.readFile(inputFile));
	if (error) {
		console.error(`Failed to read file at ${inputFile}: ${error.message}`);
		process.exit(1);
	}

	let profile: string;
	if (options.profile) {
		profile = options.profile;
	} else {
		const { documentParser } = await importPackage<{
			documentParser: typeof import("@node-zugferd/parser").documentParser;
		}>("@node-zugferd/parser").then(({ data, error }) => {
			if (error) {
				console.error(
					"An error occurred while importing the parser package:",
					error,
				);
				process.exit(1);
			}
			return data;
		});
		const { getSpecificationIdentifier, getXml } =
			await documentParser(inputContent);
		const specificationIdentifierMap = {
			"urn:factur-x.eu:1p0:minimum": "minimum",
			"urn:factur-x.eu:1p0:basicwl": "basic-wl",
			"urn:cen.eu:en16931:2017#compliant#urn:factur-x.eu:1p0:basic": "basic",
			"urn:cen.eu:en16931:2017": "en-16931",
			"urn:cen.eu:en16931:2017#conformant#urn:factur-x.eu:1p0:extended":
				"extended",
		};
		const xml = getXml();
		if (!xml) {
			console.log("No XML found in the input file.");
			process.exit(1);
		}
		const profileId =
			specificationIdentifierMap[
				getSpecificationIdentifier(
					xml,
				) as keyof typeof specificationIdentifierMap
			];
		if (!profileId) {
			console.log("Could not determine profile from the input file.");
			process.exit(1);
		}
		profile = profileId;
	}

	const invoicer = await getInvoicerInstance({
		profiles: [profile],
		plugins: [
			{
				id: "parser",
				path: "@node-zugferd/parser",
				$Infer: {} as typeof import("@node-zugferd/parser").parser,
			},
			{
				id: "mustang",
				path: "@node-zugferd/validator-mustang",
				optional: true,
				$Infer: {} as typeof import("@node-zugferd/validator-mustang").mustang,
			},
			{
				id: "xsd",
				path: "@node-zugferd/validator-xsd",
				optional: true,
				$Infer: {} as typeof import("@node-zugferd/validator-xsd").xsd,
			},
		],
	});

	const result = JSON.stringify(
		await invoicer.parse(profile, inputContent),
		null,
		options.minify ? 0 : 2,
	);

	if (options.output) {
		const outputFile = path.resolve(options.cwd, options.output);
		const { error } = await tryCatch(fs.writeFile(outputFile, result, "utf-8"));
		if (error) {
			console.error(`Failed to write file at ${outputFile}: ${error.message}`);
			process.exit(1);
		}
		console.log(`Parsed invoice written to "${outputFile}".`);
	} else {
		console.log(result);
	}
}

export const parse = new Command("parse")
	.option("-c, --cwd <dir>", "The current working directory.")
	.option(
		"-p, --profile <profile>",
		"The profile to use for parsing the invoice.",
	)
	.option("-i, --input <file>", "The invoice file to parse.")
	.option("-o, --output <file>", "The output file to write the JSON to.")
	.option("--minify", "Minify the output JSON.")
	.description("Parses an ZUGFeRD invoice and outputs it as JSON.")
	.action(parseAction);
