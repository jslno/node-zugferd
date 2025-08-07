import { PDFDocument } from "pdf-lib";
import type { ZugferdContext } from "../init";
import { colors } from "../utils/logger";
import { XMLParser } from "fast-xml-parser";
import type { Promisable } from "../types";

export const validateDocument =
	(ctx: Promisable<ZugferdContext>) =>
	async (
		rawData: string | Uint8Array | ArrayBuffer,
	): Promise<{
		valid: boolean;
		code?: string;
		messages?: string[];
	}> => {
		const context = await ctx;

		if (!context.options.validator) {
			context.logger.debug(
				`[${validateDocument.name}] Validation disabled, skipping validation`,
			);
			return {
				valid: true,
			};
		}

		let data: Uint8Array | ArrayBuffer;

		if (typeof rawData === "string") {
			const encoder = new TextEncoder();
			data = encoder.encode(rawData);
		} else {
			data = rawData;
		}

		const xml = await parseHybridFile(context, data);

		if (!xml) {
			return {
				valid: false,
				messages: [
					`Hybrid file ${context.options.profile.documentFileName} not found`,
				],
			};
		}

		context.logger.debug(`[${validateDocument.name}] Validating`);
		const result = await context.options.validator.run({
			context,
			xml,
		});
		context.logger.debug(
			`[${validateDocument.name}] Validation result: ${result.valid ? `${colors.fg.green}\u2714${colors.reset}` : `${colors.fg.red}\u274C${colors.reset}`}`,
		);

		return result;
	};

const parseHybridFile = async (
	ctx: ZugferdContext,
	source: Uint8Array | ArrayBuffer,
) => {
	let data: Uint8Array | ArrayBuffer | undefined = source;
	try {
		const pdf = await PDFDocument.load(data);

		const doc = ctx.pdf
			.getAttachments(pdf)
			.find(({ name }) => name === ctx.options.profile.documentFileName);

		if (!doc) {
			return null;
		}

		data = doc.data;
	} catch {}

	try {
		const decoder = new TextDecoder("utf-8");
		const xml = decoder.decode(data);

		const parser = new XMLParser();
		parser.parse(xml);
		return xml;
	} catch {}

	return null;
};
