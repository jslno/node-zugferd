import { type InferSchema, type Schema } from "./schema";
import { type BaseZugferdContext } from "../init";
import { type LiteralString } from "./helper";
import type { HybridConformanceCode } from "../codelists/hybrid-conformance.gen";
import type { HybridDocumentCode } from "../codelists/hybrid-document.gen";
import type { HybridVersionCode } from "../codelists/hybrid-version.gen";
import type { FilenameCode } from "../codelists/filename.gen";

export type Profile = {
	id: LiteralString;
	extends?: Profile[];
	schema: Schema;
	xsdPath?: string | (() => Promise<string> | string);
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
	context: BaseZugferdContext;
	data: InferSchema<P>;
};

export type ProfileParseHandler<P extends Profile = Profile> = (ctx: {
	context: BaseZugferdContext;
	data: InferSchema<P>;
}) => any;

export type ProfileValidateHandler = (
	data: string | Buffer | { file: string },
) => Promise<boolean>;

export type ProfileContext<P extends Profile = Profile> = P & {
	parse: ProfileParseHandler<P>;
	validate: ProfileValidateHandler;
};
