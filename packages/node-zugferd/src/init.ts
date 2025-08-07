import {
	formatXml,
	mergeSchemas,
	parseSchema,
} from "./formatter/xml/formatter";
import {
	addPdfMetadata,
	addPdfTrailerInfoId,
	fixPdfLinkAnnotations,
	addPdfStructTreeRoot,
	addPdfMarkInfo,
	addPdfICC,
	getPdfAttachments,
} from "./formatter/pdf";
import { type ZugferdOptions } from "./types/options";
import { createLogger } from "./utils/logger";
import { getTextNode, parseXml } from "./formatter/xml";

export const init = async (options: ZugferdOptions) => {
	const logger = createLogger(options?.logger);

	if (options.strict === false) {
		logger.warn(
			"Validation disabled (strict: false). The generated XML will not be checked against the XSD schema and may be non-compliant.",
		);
	}

	const context: ZugferdContext = {
		options,
		logger,
		...getInternalTools({
			options,
			logger,
		}),
	};

	typeof options.validator === "object"
		? await options.validator.init?.(context)
		: null;

	return context;
};

export type ZugferdContext = {
	options: ZugferdOptions;
	logger: ReturnType<typeof createLogger>;
} & InternalTools;

type InternalTools = ReturnType<typeof getInternalTools>;

export type InternalContext = {
	options: ZugferdOptions;
	logger: ReturnType<typeof createLogger>;
};

const getInternalTools = (ctx: InternalContext) => ({
	parseSchema: parseSchema.bind(null, ctx),
	mergeSchemas,
	xml: {
		format: formatXml.bind(null, ctx),
		parse: parseXml.bind(null, ctx),
		getTextNode,
	},
	pdf: {
		addMetadata: addPdfMetadata.bind(null, ctx),
		addTrailerInfoId: addPdfTrailerInfoId.bind(null, ctx),
		fixLinkAnnotations: fixPdfLinkAnnotations.bind(null, ctx),
		addStructTreeRoot: addPdfStructTreeRoot.bind(null, ctx),
		addMarkInfo: addPdfMarkInfo.bind(null, ctx),
		addICC: addPdfICC.bind(null, ctx),
		getAttachments: getPdfAttachments.bind(null, ctx),
	},
});
