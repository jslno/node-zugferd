import type { InferSchema, Schema } from "./types";
import type { LiteralString } from "./types/helper";

export type InterpolateSchemaContext<S extends Schema> = Omit<
	ProfileConfig<S>,
	"interpolate"
> & {
	id: LiteralString;
	input: InferSchema<S>;
};

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

export type ProfileConfig<S extends Schema> = {
	id: LiteralString;
	/**
	 * The fields of the invoice.
	 */
	schema: S;
	interpolate: (ctx: InterpolateSchemaContext<S>) => any;
	/**
	 * PDF/A extension schema for Factur-X 1.0
	 */
	extensionSchema: ExtensionSchemaFields & {
		customFieldMap?: {
			[K in keyof Omit<ExtensionSchemaFields, "uri">]: string;
		};
	};
	dataRelationship?:
		| "Data"
		| "Source"
		| "Alternative"
		| "Supplement"
		| "Unspecified";
	contextParamter?: string;
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

export type Profile<O extends ProfileConfig<any> = ProfileConfig<any>> = O & {
	toXML: (input: InferSchema<O["schema"]>) => string;
};

export function createProfile<
	const S extends Schema,
	O extends ProfileConfig<S>,
>(
	config: O & {
		schema: S;
	},
): Profile<O> {
	return {
		...config,
		toXML: (input) => {
			const { interpolate, ...cfg } = config;
			const ast = interpolate({
				...cfg,
				input,
			});

			// TODO: Build xml
			return `${ast}`;
		},
	};
}
