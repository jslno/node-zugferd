/* eslint-disable import/no-extraneous-dependencies */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

import { parseStringPromise } from "xml2js";
import { expect } from "vitest";

import {
	formatXmlLocation,
	getValueFromXmlJson,
	stripXmlNamespace,
} from "./xml-vitest-helper";

import { MUSTANG_JAR_PATH } from "../setup/vitest.setup-e2e";

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Formats validation errors into a human-friendly, multi-line string for test output.
 * Each error includes the message, location, and criterion for easier debugging.
 *
 * @param errors - Array of validation error objects
 * @returns A formatted string summarizing all errors
 */
function formatEInvoiceValidationErrors(
	fileName: string,
	errors?: Array<{ message: string; location: string; criterion: string }>,
	source?: any,
): string {
	if (!errors || errors.length === 0) {
		return "";
	}

	const stripped = stripXmlNamespace(source);

	return (
		"Invoice XML validation failed with the following errors:" +
		"\n" +
		"\n" +
		errors
			.map((e, i) => {
				// split on the first of the two characters
				// that appear: colon or closing square bracket (:])
				const errorName = e.message.split(/[:\]]/)[0] ?? "";
				const fullErrorName = `${errorName}${e.message.slice(
					errorName.length,
					errorName.length + 1,
				)}`;
				let errorMessage = e.message.slice(fullErrorName.length).trim();
				if (errorMessage.startsWith(".") || errorMessage.startsWith("-")) {
					errorMessage = errorMessage.slice(1);
				}
				const location = formatXmlLocation(e.location);
				const value = getValueFromXmlJson(stripped, location);
				const readableValue = JSON.stringify(value || "- not found -", null, 2)
					.split("\n")
					.join("\n     ");

				return `${i + 1}. ${fullErrorName} @ ${location}\n${errorMessage
					.split(". ")
					.map(
						(x) =>
							`${x
								.split("; ")
								.map((y) => `     ${y.trim()}`)
								.join(";\n")}`,
					)
					.join(".\n")}\n     Value: ${readableValue}\n`;
			})
			.join("\n") +
		"\n" +
		`Please check the invoice XML for more details: ${fileName}\n\n`
	);
}

/**
 * Validates the given invoice XML using the Mustang validator JAR.
 *
 * This function runs the validator via execSync. If the XML is invalid, the process
 * will exit with an error, but the error output (stdout) will still contain the XML
 * error report. We catch the error, extract the XML output, and proceed to parse it
 * so that validation results (including errors) are always available.
 *
 * @param xml - The invoice XML string to validate
 * @returns An object containing the parsed invoice, validation result, and errors
 */
const validateInvoiceXml = async (xml: string) => {
	// create a temp directory
	fs.mkdirSync(".test-temp", { recursive: true });
	// write the xml file to a temp file with a random name
	const fileName = path.join(`.test-temp/invoice-${randomUUID()}.xml`);
	fs.writeFileSync(fileName, xml);

	// use Mustang to validate the XML:
	/*
		java
		-Xmx1G
		-Dfile.encoding=UTF-8
		-jar ${MUSTANG_JAR_PATH}
		--no-notices
		--action validate
		--source invoice.xml
		2>/dev/null
	*/
	const command = `java -Xmx1G -Dfile.encoding=UTF-8 -jar ${MUSTANG_JAR_PATH} --no-notices --action validate --source ${fileName} 2>/dev/null`;

	let output: string | undefined;
	try {
		output = execSync(command, {
			encoding: "utf8",
		});
	} catch (error: unknown) {
		// If validation fails, the error output (stdout) contains the XML error report
		output =
			error && typeof error === "object" && "stdout" in error
				? (error as { stdout?: string; stderr?: string; message?: string })
						.stdout ||
					(error as { stderr?: string }).stderr ||
					(error as { message?: string }).message
				: String(error);
	}

	// parse the output as XML
	const invoice = await parseStringPromise(xml);
	const out = await parseStringPromise(output ?? "");
	const v = out.validation;
	const messages = out.validation?.xml?.pop()?.messages?.pop() as
		| Record<
				"error",
				{
					_: string;
					$: {
						type: string;
						message?: string;
						location: string;
						criterion: string;
					};
				}[]
		  >
		| undefined;

	const validationResult = {
		fileName,
		source: invoice,
		errors: messages?.error?.map(
			(e: {
				_: string;
				$: {
					type: string;
					message?: string;
					location: string;
					criterion: string;
				};
			}) => ({
				message: e._,
				location: e.$.location,
				criterion: e.$.criterion,
			}),
		),
		valid: v.summary?.pop()?.$?.status === "valid",
	};

	// unlinke the temp file if there are no errors
	if (!validationResult.errors || validationResult.errors.length === 0) {
		fs.unlinkSync(fileName);
	}

	return validationResult;
};

expect.extend({
	async toBeValidEInvoice(received: string) {
		const { source, valid, errors, fileName } =
			await validateInvoiceXml(received);

		// If validation fails, throw a readable error for Vitest
		if (!valid) {
			const formatted = formatEInvoiceValidationErrors(
				fileName,
				errors,
				source,
			);
			return {
				pass: false,
				message: () => formatted,
			};
		}

		return {
			pass: true,
			message: () => "Invoice is valid",
		};
	},
});
