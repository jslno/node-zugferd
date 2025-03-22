import { type InferSchema, type Schema } from "./schema";
import { type BaseZugferdContext } from "../init";
import { type LiteralString } from "./helper";

export type Profile = {
	id: LiteralString;
	extends?: Profile[];
	schema: Schema;
	contextParameter: LiteralString;
	xsdPath: string;
	conformanceLevel: string;
	documentFileName: string;
	mask?: Record<string, any>;
	/**
	 * @default 'INVOICE'
	 */
	documentType?: "INVOICE" | "ORDER";
	version: string;
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
