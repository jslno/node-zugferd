import type { PDFDocument } from "@cantoo/pdf-lib";
import type {
	Awaitable,
	InterpolateSchemaContext,
	Profile,
	ToPDFaOptions,
	ZugferdContext,
} from "..";
import type { Logger } from "../utils/logger";
import type { ZugferdPlugin } from "./plugins";

export type ZugferdOptions<P extends Profile = Profile> = {
	profile: P;
	plugins?: ZugferdPlugin[] | undefined;
	hooks?: ZugferdHooks | undefined;
	logger?: Logger | undefined;
	xml?:
		| {
				/**
				 * @default "compact"
				 */
				format?: "compact" | "pretty";
		  }
		| undefined;
	pdfa?:
		| {
				xmp?:
					| {
							/**
							 * @default "compact"
							 */
							format?: "compact" | "pretty";
					  }
					| undefined;
		  }
		| undefined;
};

export type ZugferdHooks = {
	xml?:
		| {
				interpolate?:
					| {
							before?:
								| ((ctx: InterpolateSchemaContext) => Awaitable<{
										context: InterpolateSchemaContext;
								  } | void>)
								| undefined;
							after?:
								| ((
										tree: Record<string, any>,
										ctx: ZugferdContext,
								  ) => Awaitable<{ tree: Record<string, any> } | void>)
								| undefined;
					  }
					| undefined;
				build?:
					| {
							before?:
								| ((
										tree: Record<string, any> | undefined,
										ctx: ZugferdContext,
								  ) => Awaitable<{ tree: Record<string, any> } | void>)
								| undefined;
							after?:
								| ((
										xml: string,
										ctx: ZugferdContext,
								  ) => Awaitable<string | void>)
								| undefined;
					  }
					| undefined;
		  }
		| undefined;
	pdfa?:
		| {
				before?:
					| ((
							xml: string,
							ctx: {
								document: PDFDocument;
								profile: Profile;
								context: ZugferdContext;
							},
					  ) => Awaitable<{
							document?: PDFDocument | undefined;
							options?: ToPDFaOptions | undefined;
					  } | void>)
					| undefined;
				after?:
					| ((
							pdfa: PDFDocument,
							ctx: {
								profile: Profile;
								context: ZugferdContext;
							},
					  ) => Awaitable<PDFDocument | void>)
					| undefined;
		  }
		| undefined;
};
