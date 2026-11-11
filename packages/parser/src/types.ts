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
	/** When true, decode XML entities in string values (`&amp;` → `&`). Default false. */
	decodeEntities?: boolean | undefined;
}

export type ProfileMapEntry = {
	match: (ctx: MatchContext) => boolean | Promise<boolean>;
	parse: (
		ctx: ParseContext,
	) => Record<string, any> | Promise<Record<string, any>>;
};

export type ParserHooks = {
	beforeParse?: ((ctx: ParseContext) => void | Promise<void>) | undefined;
	afterParse?:
		| ((
				ctx: ParseContext & { data: Record<string, unknown> },
		  ) => void | Promise<void>)
		| undefined;
};

export interface ParserOptions {
	/**
	 * Check Business Rules Hybrid.
	 *
	 * Note: This is only applicable for the following profiles:
	 * - minimum
	 * - basic-wl
	 * - basic
	 * - en-16931
	 * - extended
	 * - xrechnung
	 *
	 * Defaults to `true`.
	 */
	checkHybridRules?: boolean | undefined;
	profileMap?: Record<string, ProfileMapEntry> | undefined;
	/**
	 * Decode XML entities in parsed string/identifier values (`&amp;` → `&`).
	 * Defaults to `false`.
	 */
	decodeEntities?: boolean | undefined;
	hooks?: ParserHooks | undefined;
}
