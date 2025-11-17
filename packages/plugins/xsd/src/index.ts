import { closeSync, openSync, readSync } from "node:fs";
import { resolve } from "node:path";
import type { ZugferdContext, ZugferdPlugin } from "@node-zugferd/core";
import { ZugferdValidationError } from "@node-zugferd/core/error";
import { readFile } from "fs/promises";
import {
	ParseOption,
	XmlDocument,
	XmlParseError,
	XmlValidateError,
	XsdValidator,
	xmlRegisterInputProvider,
} from "libxml2-wasm";
import { __dirname } from "./isomorph";

export type XSDConfig = {
	/**
	 * Automatically run validation after building the XML.
	 *
	 * @default true
	 */
	autoRun?: boolean | undefined;
};

export function xsd(config?: XSDConfig | undefined) {
	xmlRegisterInputProvider({
		match(filename) {
			if (filename.endsWith(".xsd")) {
				return true;
			}
			return false;
		},
		close(fd) {
			try {
				closeSync(fd);
				return true;
			} catch {
				return false;
			}
		},
		open(filename) {
			return openSync(resolve(__dirname, "../schemas", filename), "r");
		},
		read(fd, buf) {
			return readSync(fd, buf);
		},
	});

	const runValidate = async (xml: string, ctx: ZugferdContext) => {
		if (
			![
				"minimum",
				"basic-wl",
				"basic",
				"en16931",
				"extended",
				"xrechnung",
			].includes(ctx.profile.id)
		) {
			ctx.logger.warn(
				`The XSD validator does not support the profile "${ctx.profile.id}". Skipping validation.`,
			);
			return;
		}

		const xsdFile = resolve(__dirname, `../schemas/${ctx.profile.id}.xsd`);
		try {
			const doc = XmlDocument.fromString(xml, {
				encoding: "utf-8",
			});
			const xsdDoc = XmlDocument.fromBuffer(await readFile(xsdFile), {
				url: xsdFile,
				option: ParseOption.XML_PARSE_XINCLUDE,
			});
			const validator = XsdValidator.fromDoc(xsdDoc);

			validator.validate(doc);
		} catch (err) {
			if (err instanceof XmlValidateError || err instanceof XmlParseError) {
				ctx.logger.error("XSD Validation Errors:", err.details);
				throw new ZugferdValidationError(err.message, err.details);
			}
			throw new ZugferdValidationError(
				"An unknown error occured during XSD validation",
				err,
			);
		}
	};

	return {
		id: "xsd",
		init: () => {
			return {
				actions: {
					validateXSD: () => {
						// TODO:
					},
				},
			};
		},
		hooks: {
			xml: {
				build: {
					after: config?.autoRun !== false ? runValidate : undefined,
				},
			},
		},
	} satisfies ZugferdPlugin;
}
