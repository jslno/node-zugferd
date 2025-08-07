import { type InferSchema, type Schema } from "./schema";
import { type ZugferdContext } from "../init";
import { type LiteralString } from "./helper";
import type { HybridConformanceCode } from "../codelists/hybrid-conformance.gen";
import type { HybridDocumentCode } from "../codelists/hybrid-document.gen";
import type { HybridVersionCode } from "../codelists/hybrid-version.gen";
import type { FilenameCode } from "../codelists/filename.gen";

export type Profile = {
	id: LiteralString;
	extends?: Profile[];
	schema: Schema;
	conformanceLevel: HybridConformanceCode;
	documentFileName: FilenameCode;
	mask?: Record<string, any>;
	/**
	 * @default "INVOICE"
	 */
	documentType?: HybridDocumentCode;
	version: HybridVersionCode;
};

export type ProfileParseHandlerContext<P extends Profile = Profile> = {
	context: ZugferdContext;
	data: InferSchema<P>;
};

export type ProfileParseHandler<P extends Profile = Profile> = (ctx: {
	context: ZugferdContext;
	data: InferSchema<P>;
}) => any;

export type ProfileContext<P extends Profile = Profile> = P & {
	parse: ProfileParseHandler<P>;
};
