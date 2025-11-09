import type { LiteralString } from "./helper";
import type { InferSchema, Schema } from "./schema";

export type InterpolateSchemaContext<S extends Schema = any> = Omit<
	ProfileConfig<S>,
	"interpolate"
> & {
	id: LiteralString;
	// TODO: infer output type
	input: InferSchema<S>;
};

export type Interpolator<S extends Schema = Schema> = (
	ctx: InterpolateSchemaContext<S>,
) => Record<string, any>;

export type ExtensionSchemaFields = {
	uri?:
		| "urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#"
		| LiteralString
		| null
		| undefined;
	documentType?: "INVOICE" | "ORDER" | LiteralString | undefined;
	documentFileName?:
		| "factur-x.xml"
		| "xrechnung.xml"
		| LiteralString
		| undefined;
	version?: "1.0" | LiteralString | undefined;
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
		customFieldMap?:
			| {
					[K in keyof Omit<ExtensionSchemaFields, "uri">]: string;
			  }
			| undefined;
	};
	config?:
		| {
				dataRelationship?:
					| "Data"
					| "Source"
					| "Alternative"
					| "Supplement"
					| "Unspecified"
					| undefined;
				supportsPDFA?: boolean | undefined;
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
					| "*"
					| undefined;
		  }
		| undefined;
};
