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

export const init = (options: ZugferdOptions) => {
	const ctx: BaseZugferdContext = {
		options,
		...getInternalTools(options),
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
} & InternalTools;

export type ZugferdContext = BaseZugferdContext & {
	document: {
		create: ReturnType<typeof createDocumentFactory<ZugferdOptions>>;
		validate: ReturnType<typeof validateDocumentFactory>;
	};
};

type InternalTools = ReturnType<typeof getInternalTools>;

const getInternalTools = (_options: ZugferdOptions) => ({
	parseSchema,
	mergeSchemas,
	xml: {
		format: formatXml,
	},
	pdf: {
		addMetadata: addPdfMetadata,
		addTrailerInfoId: addPdfTrailerInfoId,
		fixLinkAnnotations: fixPdfLinkAnnotations,
		addStructTreeRoot: addPdfStructTreeRoot,
		addMarkInfo: addPdfMarkInfo,
		addICC: addPdfICC,
		getAttachments: getPdfAttachments,
	},
});
