import type { InferSchema, Schema } from "./schema";
import type { LiteralString } from "./helper";

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
