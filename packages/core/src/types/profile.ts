import type { XMLBuilder } from "xmlbuilder2/lib/interfaces";
import type { BuildHelper } from "../build-helper";
import type { BaseIssue, BaseSchema, BaseSchemaAsync } from "../data-types";
import type { ZugferdOptions } from "./options";

type SchemaOutput<
	S extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
> = S extends
	| BaseSchema<unknown, infer Output, BaseIssue<unknown>>
	| BaseSchemaAsync<unknown, infer Output, BaseIssue<unknown>>
	? Output
	: NonNullable<S["~types"]>["output"];

type ExtensionSchemaType =
	| "INVOICE"
	| "ORDER"
	| "ORDER_RESPONSE"
	| "ORDER_CHANGE";
type ExtensionSchema = {
	type: ExtensionSchemaType | ExtensionSchemaType[];
	conformanceLevel:
		| "MINIMUM"
		| "BASIC WL"
		| "BASIC"
		| "EN 16931"
		| "COMFORT"
		| "EXTENDED"
		| "XRECHNUNG";
	fileName: "factur-x.xml" | "xrechnung.xml" | "order-x.xml";
	version: "1.0" | "1p0" | "2p0" | "2p1" | "2p2";
};

export type DataRelationship =
	| "Alternative"
	| "Source"
	| "Data"
	| "Supplement"
	| "Unspecified";

export type ZugferdProfileRulesContext = {
	profile: Omit<ZugferdProfile, "schema" | "rules">;
	error: (
		id: `BR-${number}`,
		message: string,
	) => {
		id: `BR-${number}`;
		message: string;
	};
};

export type ZugferdProfileBuildContext = {
	root: XMLBuilder;
	profile: Omit<ZugferdProfile, "schema" | "rules">;
} & BuildHelper;

export type InferProfileIds<Opts> =
	Opts extends ZugferdOptions<infer Profiles> ? Profiles[number]["id"] : never;

export interface ZugferdProfile<
	Schema extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>> = any,
> {
	id: string;
	schema:
		| Schema
		| (<Ctx extends { profile: Omit<ZugferdProfile, "schema" | "rules"> }>(
				ctx: Ctx,
		  ) => Schema);
	dataRelationship:
		| Exclude<DataRelationship, "Supplement" | "Unspecified">
		| [
				Exclude<DataRelationship, "Supplement" | "Unspecified">,
				...Exclude<DataRelationship, "Supplement" | "Unspecified">[],
		  ];
	extensionSchema: {
		uri?: string | undefined;
		namespace?: string | undefined;
		fieldNameMap?: Record<keyof ExtensionSchema, string> | undefined;
	} & ExtensionSchema;
	build: (
		data: SchemaOutput<Schema> & Record<string, any>,
		ctx: ZugferdProfileBuildContext,
	) => void | Promise<void>;
	rules?:
		| ((
				data: SchemaOutput<Schema> & Record<string, any>,
				ctx: ZugferdProfileRulesContext,
		  ) => void | Promise<void>)
		| undefined;
	readonly $Infer?:
		| {
				readonly Input: unknown;
				readonly Output: unknown;
		  }
		| undefined;
}

export type { XMLBuilder };
