import fs from "node:fs/promises";
import path from "node:path";
import { cancel, isCancel, log, path as pathPrompt } from "@clack/prompts";
import { Command } from "commander";
import * as z from "zod";
import { tryCatch } from "../utils/helper";
import { importPackage } from "../utils/import";
import { getInvoicerInstance } from "../utils/invoicer";

const validateOptionsSchema = z.object({
	cwd: z.string().default(process.cwd()),
	profile: z.string().optional(),
	input: z.string().optional(),
});

async function validateAction(opts: z.infer<typeof validateOptionsSchema>) {
	const options = await validateOptionsSchema.parseAsync(opts);

	let inputFile: string;
	if (options.input) {
		inputFile = path.isAbsolute(options.input)
			? options.input
			: path.resolve(options.cwd, options.input);
	} else {
		const result = await pathPrompt({
			message: "Select the invoice file to validate",
			root: options.cwd,
			directory: false,
			validate: (value) =>
				value && !/\.(pdf|xml)$/i.test(value)
					? "Only PDF and XML files are supported."
					: undefined,
		});
		if (isCancel(result)) {
			cancel("✋ Operation cancelled.");
			process.exit(0);
		}
		inputFile = result;
	}

	const { data: inputContent, error } = await tryCatch(fs.readFile(inputFile));
	if (error) {
		log.error(`Failed to read file at ${inputFile}: ${error.message}`);
		process.exit(1);
	}

	let profile: string;
	let xml: string | null = null;
	if (options.profile) {
		profile = options.profile;
	} else {
		const { documentParser } = await importPackage<{
			documentParser: typeof import("@node-zugferd/parser").documentParser;
		}>("@node-zugferd/parser").then(({ data, error }) => {
			if (error) {
				log.error(
					`An error occurred while importing the parser package: ${error.message}`,
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
		xml = getXml();
		if (!xml) {
			log.error("No XML found in the input file.");
			process.exit(1);
		}
		const profileId =
			specificationIdentifierMap[
				getSpecificationIdentifier(
					xml,
				) as keyof typeof specificationIdentifierMap
			];
		if (!profileId) {
			log.error("Could not determine profile from the input file.");
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

	if (
		!invoicer.$context.hasPlugin("mustang") &&
		!invoicer.$context.hasPlugin("xsd")
	) {
		log.error("Either mustang or xsd validator must be installed.");
		process.exit(1);
	}
	let input: string | Uint8Array | ArrayBuffer = inputContent;
	let validator: "xsd" | "mustang";
	if (!invoicer.$context.hasPlugin("mustang")) {
		if (!xml) {
			log.error("No XML found in the input file.");
			process.exit(1);
		}
		input = xml;
		validator = "xsd";
	} else {
		validator = "mustang";
	}

	try {
		await (invoicer[validator] as any).validate(profile, input);
	} catch (error) {
		log.error(
			typeof error === "object" &&
				error !== null &&
				"message" in error &&
				typeof error.message === "string"
				? error.message
				: "An unknown error occurred during validation.",
		);
		process.exit(1);
	}
	log.success("✓ Validation completed successfully.");
}

export const validate = new Command("validate")
	.option("--cwd <dir>", "The current working directory.")
	.option(
		"--profile <profile>",
		"The profile to use for validating the invoice.",
	)
	.option("--input <file>", "The invoice file to validate.")
	.description("Validates a ZUGFeRD invoice.")
	.action(validateAction);
