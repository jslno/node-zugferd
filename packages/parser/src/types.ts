import type { ZugferdContext, ZugferdProfile } from "@node-zugferd/core";
import type { PDFDocument } from "pdf-lib";
import type {
	XMLSerializedAsObject,
	XMLSerializedAsObjectArray,
} from "xmlbuilder2/lib/interfaces";
import type { createXPath } from "./xpath";

interface BaseContext {
	pdf?: PDFDocument | undefined;
	xml: XMLSerializedAsObject | XMLSerializedAsObjectArray;
	profile: ZugferdProfile;
	context: ZugferdContext;
}

export interface MatchContext extends BaseContext {
	matchesExtensionSchemaProfile: () => boolean;
	matchesSpecificationIdentifier: (identifier: string | string[]) => boolean;
	isPdfA3Conformant: (
		levels?: "B" | "U" | "A" | ("B" | "U" | "A")[],
	) => boolean;
}

export interface ParseContext extends BaseContext {
	xpath: ReturnType<typeof createXPath>;
}

export type ProfileMapEntry = {
	match: (ctx: MatchContext) => boolean | Promise<boolean>;
	parse: (
		ctx: ParseContext,
	) => Record<string, any> | Promise<Record<string, any>>;
};

export interface ParserOptions {
	profileMap?: Record<string, ProfileMapEntry> | undefined;
	hooks?:
		| {
				beforeParse?: ((ctx: ParseContext) => void | Promise<void>) | undefined;
				afterParse?:
					| ((
							ctx: ParseContext & { data: Record<string, unknown> },
					  ) => void | Promise<void>)
					| undefined;
		  }
		| undefined;
}
