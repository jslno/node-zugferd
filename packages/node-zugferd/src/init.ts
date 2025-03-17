import { formatXml, mergeSchemas, parseSchema } from "./formatter/xml/formatter";
import {
	addPdfMetadata,
	addPdfTrailerInfoId,
	fixPdfLinkAnnotations,
	addPdfStructTreeRoot,
	addPdfMarkInfo,
	addPdfICC,
} from "./formatter/pdf";
import { type ZugferdOptions } from "./types/options";

export const init = (options: ZugferdOptions) => {
	const ctx: ZugferdContext = {
		options,
		...getInternalTools(options),
	};

	return ctx;
};

export type ZugferdContext = {
	options: ZugferdOptions;
} & InternalTools;

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
	},
});
