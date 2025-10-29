import type { InferSchema, Schema } from "./schema";
import type { DeepMerge, LiteralString } from "./helper";
import type { MergeSchema } from "../utils/merge-schema";

export type InterpolateSchemaContext<S extends Schema> = Omit<
	ProfileConfig<S>,
	"interpolate"
> & {
	id: LiteralString;
	input: InferSchema<S>;
};

export type Interpolator<S extends Schema = Schema> = (
	ctx: InterpolateSchemaContext<S>,
) => Record<string, any>;

export type ExtensionSchemaFields = {
	uri?:
		| "urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#"
		| LiteralString
		| null;
	documentType?: "INVOICE" | "ORDER" | LiteralString;
	documentFileName?: "factur-x.xml" | "xrechnung.xml" | LiteralString;
	version?: "1.0" | LiteralString;
	conformanceLevel:
		| "MINIMUM"
		| "BASIC WL"
		| "BASIC"
		| "EN 16931"
		| "EXTENDED"
		| "XRECHNUNG"
		| LiteralString;
};

export type ProfileConfig<S extends Schema = any> = {
	id: LiteralString;
	/**
	 * The fields of the invoice.
	 */
	schema: S;
	interpolate: Interpolator<S>;
	/**
	 * PDF/A extension schema for Factur-X 1.0
	 */
	extensionSchema: ExtensionSchemaFields & {
		customFieldMap?: {
			[K in keyof Omit<ExtensionSchemaFields, "uri">]: string;
		};
	};
	config?: {
		dataRelationship?:
			| "Data"
			| "Source"
			| "Alternative"
			| "Supplement"
			| "Unspecified";
		supportsPDFA?: boolean;
		allowedAttachmentFormats?:
			| (
					| "PDF"
					| "TXT"
					| "GIF"
					| "TIFF"
					| "JPG"
					| "CSV"
					| "XML"
					| "JSON"
					| "XLSX"
					| "ODS"
					| LiteralString
			  )[]
			| "*";
	};
};

export type MergeProfileConfig<
	A extends ProfileConfig,
	B extends Partial<ProfileConfig>,
> = {
	id: B["id"] extends string ? B["id"] : A["id"];
	schema: B["schema"] extends infer BSchema extends Schema
		? MergeSchema<A["schema"], BSchema>
		: A["schema"];
	extensionSchema: B["extensionSchema"] extends ProfileConfig["extensionSchema"]
		? B["extensionSchema"]
		: A["extensionSchema"];
	interpolate: Interpolator<
		B["schema"] extends infer BSchema extends Schema
			? MergeSchema<A["schema"], BSchema>
			: A["schema"]
	>;
	config: B["config"] extends Record<string, any>
		? A["config"] extends Record<string, any>
			? DeepMerge<A["config"], B["config"]>
			: B["config"]
		: A["config"] extends Record<string, any>
			? A["config"]
			: never;
};
