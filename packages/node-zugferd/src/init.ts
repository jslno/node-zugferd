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
import { createDocumentFactory } from "./document/create";
import { validateDocumentFactory } from "./document/validate";
import { createLogger } from "./utils/logger";

export const init = (options: ZugferdOptions) => {
	const logger = createLogger(options?.logger);

	if (options.strict === false) {
		logger.warn(
			"Validation disabled (strict: false). The generated XML will not be checked against the XSD schema and may be non-compliant.",
		);
	}

	const ctx = {
		options,
		logger,
		...getInternalTools({
			options,
			logger,
		}),
	};

	const context: ZugferdContext = {
		...ctx,
		document: {
			create: createDocumentFactory(ctx, options),
			validate: validateDocumentFactory(ctx),
		},
	};

	return context;
};

export type BaseZugferdContext = {
	options: ZugferdOptions;
	logger: ReturnType<typeof createLogger>;
} & InternalTools;

export type ZugferdContext = BaseZugferdContext & {
	document: {
		create: ReturnType<typeof createDocumentFactory<ZugferdOptions>>;
		validate: ReturnType<typeof validateDocumentFactory>;
	};
};

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
