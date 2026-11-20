import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
} from "@node-zugferd/core/data-types";
import type {
	MarkOptional,
	XMLBuilder,
	ZugferdProfile,
	ZugferdProfileBuildContext,
	ZugferdProfileRulesContext,
} from "@node-zugferd/core/types";
import type {
	InferInput,
	InferOutput,
	MergeProfileInput,
} from "@node-zugferd/data-types";
import { intersect, intersectAsync } from "@node-zugferd/data-types";

function schemaIsAsync(schema: ProfileSchemaType): boolean {
	if (schema.async) {
		return true;
	}

	if (schema.type === "intersect" && "options" in schema) {
		return (schema.options as ProfileSchemaType[]).some(schemaIsAsync);
	}

	return false;
}

export type ProfileSchemaType =
	| BaseSchema<unknown, unknown, BaseIssue<unknown>>
	| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>;

type ParentProfile = {
	readonly schema: ZugferdProfile["schema"];
	readonly build: ZugferdProfile["build"];
	readonly rules?: ZugferdProfile["rules"];
};

type ParentProfileInput<P> = P extends {
	readonly $Infer: { readonly Input: infer Input };
}
	? Input
	: P extends { readonly schema: infer Schema extends ProfileSchemaType }
		? InferInput<Schema>
		: never;

type ParentProfileOutput<P> = P extends {
	readonly $Infer: { readonly Output: infer Output };
}
	? Output
	: P extends { readonly schema: infer Schema extends ProfileSchemaType }
		? InferOutput<Schema>
		: never;

type MergeProfileInputsIntersect<
	Use extends readonly ParentProfile[],
	LocalInput,
> = Use extends readonly [
	infer Head extends ParentProfile,
	...infer Rest extends readonly ParentProfile[],
]
	? Rest extends readonly []
		? MergeProfileInput<ParentProfileInput<Head>, LocalInput>
		: MergeProfileInput<
				ParentProfileInput<Head>,
				MergeProfileInputsIntersect<Rest, LocalInput>
			>
	: LocalInput;

type MergeProfileOutputs<
	Use extends readonly ParentProfile[],
	LocalOutput,
> = Use extends readonly [
	infer Head extends ParentProfile,
	...infer Rest extends readonly ParentProfile[],
]
	? Rest extends readonly []
		? ParentProfileOutput<Head> & LocalOutput
		: ParentProfileOutput<Head> & MergeProfileOutputs<Rest, LocalOutput>
	: LocalOutput;

type MergedProfileInput<
	Use extends readonly ParentProfile[],
	S extends ProfileSchemaType,
> = MergeProfileInputsIntersect<Use, InferInput<S>>;

type MergedProfileOutput<
	Use extends readonly ParentProfile[],
	S extends ProfileSchemaType,
> = MergeProfileOutputs<Use, InferOutput<S>>;

export type { MergedProfileInput, MergedProfileOutput };

type ProfileData<Output> = Output & Record<string, any>;

export type CompactProfileSchema<Input, Output> =
	| BaseSchema<Input, Output, BaseIssue<unknown>>
	| BaseSchemaAsync<Input, Output, BaseIssue<unknown>>;

export type DefinedProfile<
	Id extends string,
	DataRelationship extends ZugferdProfile["dataRelationship"],
	Input,
	Output,
	ExtensionSchema extends ZugferdProfile["extensionSchema"],
	SupportsPDF extends boolean = true,
> = {
	readonly id: Id;
	readonly use?: readonly ParentProfile[];
	readonly build: (
		data: ProfileData<Output>,
		ctx: ZugferdProfileBuildContext,
	) => void | Promise<void>;
	readonly rules?: (
		data: ProfileData<Output>,
		ctx: ZugferdProfileRulesContext,
	) => void | Promise<void>;
	readonly schema: CompactProfileSchema<Input, Output>;
	readonly $Infer: {
		readonly Input: Input;
		readonly Output: Output;
	};
} & (SupportsPDF extends true
	? {
			readonly dataRelationship: DataRelationship;
			readonly extensionSchema: Omit<
				Required<MarkOptional<ExtensionSchema, "uri" | "fieldNameMap">>,
				"uri" | "namespace" | "fieldNameMap"
			> & {
				uri?: string;
				namespace?: string;
				fieldNameMap?: Record<keyof ExtensionSchema, string>;
			};
			readonly supportsPDF?: SupportsPDF | undefined;
		}
	: {
			readonly dataRelationship: undefined;
			readonly extensionSchema: undefined;
			readonly supportsPDF: SupportsPDF;
		});

type ZugferdProfileInputBase<_Input, Output, SupportsPDF extends boolean> = {
	build: (
		data: ProfileData<Output>,
		ctx: ZugferdProfileBuildContext,
	) => void | Promise<void>;
	rules?: (
		data: ProfileData<Output>,
		ctx: ZugferdProfileRulesContext,
	) => void | Promise<void>;
} & (SupportsPDF extends true
	? {
			extensionSchema: MarkOptional<
				ZugferdProfile["extensionSchema"],
				"uri" | "namespace" | "fieldNameMap"
			>;
		}
	: {});

export type ZugferdProfileInput<
	S extends ProfileSchemaType,
	Use extends readonly ParentProfile[] | undefined,
	SupportsPDF extends boolean = true,
> = Omit<
	ZugferdProfile<S, SupportsPDF>,
	"build" | "rules" | "extensionSchema" | "dataRelationship"
> &
	ZugferdProfileInputBase<
		Use extends readonly ParentProfile[]
			? MergedProfileInput<Use, S>
			: InferInput<S>,
		Use extends readonly ParentProfile[]
			? MergedProfileOutput<Use, S>
			: InferOutput<S>,
		SupportsPDF
	> &
	(SupportsPDF extends true
		? {
				dataRelationship: ZugferdProfile["dataRelationship"];
			}
		: {
				dataRelationship?: undefined;
				extensionSchema?: undefined;
			}) & {
		use?: Use | undefined;
	};

type DefineProfileImpl = ZugferdProfileInput<
	| BaseSchema<unknown, unknown, BaseIssue<unknown>>
	| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
	readonly ParentProfile[] | undefined,
	boolean
> & {
	schema: ProfileSchemaType;
};

export function defineProfileSchema<const S extends ProfileSchemaType>(
	schema: S,
): CompactProfileSchema<InferInput<S>, InferOutput<S>> {
	return schema as CompactProfileSchema<InferInput<S>, InferOutput<S>>;
}

export function defineProfile<
	const Id extends string,
	const DataRelationship extends ZugferdProfile["dataRelationship"],
	const Schema extends ProfileSchemaType,
	const ExtensionSchema extends ZugferdProfile["extensionSchema"],
	const Input extends InferInput<Schema> = InferInput<Schema>,
	const Output extends InferOutput<Schema> = InferOutput<Schema>,
>(
	profile: ZugferdProfileInput<Schema, undefined> & {
		id: Id;
		dataRelationship: DataRelationship;
		extensionSchema: ExtensionSchema;
		schema: Schema;
		use?: undefined;
	},
): DefinedProfile<Id, DataRelationship, Input, Output, ExtensionSchema>;

export function defineProfile<
	const Id extends string,
	const DataRelationship extends ZugferdProfile["dataRelationship"],
	const Schema extends ProfileSchemaType,
	const ExtensionSchema extends ZugferdProfile["extensionSchema"],
	const Use extends readonly ParentProfile[],
	const Input extends MergedProfileInput<Use, Schema> = MergedProfileInput<
		Use,
		Schema
	>,
	const Output extends MergedProfileOutput<Use, Schema> = MergedProfileOutput<
		Use,
		Schema
	>,
>(
	profile: ZugferdProfileInput<Schema, Use> & {
		id: Id;
		dataRelationship: DataRelationship;
		extensionSchema: ExtensionSchema;
		schema: Schema;
		use: Use;
	},
): DefinedProfile<Id, DataRelationship, Input, Output, ExtensionSchema>;

export function defineProfile<
	const Id extends string,
	const Schema extends ProfileSchemaType,
	const Input extends InferInput<Schema> = InferInput<Schema>,
	const Output extends InferOutput<Schema> = InferOutput<Schema>,
>(
	profile: ZugferdProfileInput<Schema, undefined, false> & {
		id: Id;
		schema: Schema;
		use?: undefined;
	},
): DefinedProfile<
	Id,
	never,
	Input,
	Output,
	ZugferdProfile["extensionSchema"],
	false
>;

export function defineProfile<
	const Id extends string,
	const Schema extends ProfileSchemaType,
	const Use extends readonly ParentProfile[],
	const Input extends MergedProfileInput<Use, Schema> = MergedProfileInput<
		Use,
		Schema
	>,
	const Output extends MergedProfileOutput<Use, Schema> = MergedProfileOutput<
		Use,
		Schema
	>,
>(
	profile: ZugferdProfileInput<Schema, Use, false> & {
		id: Id;
		schema: Schema;
		use: Use;
	},
): DefinedProfile<
	Id,
	never,
	Input,
	Output,
	ZugferdProfile["extensionSchema"],
	false
>;

export function defineProfile(
	profile: DefineProfileImpl & { id: string; schema: ProfileSchemaType },
): any {
	const extensionSchema =
		"extensionSchema" in profile ? profile.extensionSchema : undefined;
	const { use, schema, build, rules, ...input } = profile;

	const mergedSchemas = use ? [...use.map((p) => p.schema), schema] : undefined;

	const mergedSchema = mergedSchemas
		? mergedSchemas.some(schemaIsAsync)
			? intersectAsync(mergedSchemas)
			: intersect(mergedSchemas)
		: schema;

	return {
		...input,
		schema: mergedSchema,
		...(profile.supportsPDF === false
			? { dataRelationship: undefined, extensionSchema: undefined }
			: {}),
		...(extensionSchema
			? {
					extensionSchema: {
						...extensionSchema,
						uri:
							extensionSchema.uri ??
							"urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#",
						namespace: extensionSchema.namespace ?? "fx",
						fieldNameMap: {
							type: extensionSchema.fieldNameMap?.type ?? "DocumentType",
							fileName:
								extensionSchema.fieldNameMap?.fileName ?? "DocumentFileName",
							version: extensionSchema.fieldNameMap?.version ?? "Version",
							conformanceLevel:
								extensionSchema.fieldNameMap?.conformanceLevel ??
								"ConformanceLevel",
						},
					},
				}
			: {}),
		async build(
			data: Record<string, unknown>,
			ctx: ZugferdProfileBuildContext,
		) {
			const context = ctx;
			if (use) {
				for (const parent of use) {
					await parent.build(data, context);
				}
			}
			await build(data, context);
		},
		async rules(
			data: Record<string, unknown>,
			ctx: Parameters<NonNullable<DefineProfileImpl["rules"]>>[1],
		) {
			if (use) {
				await Promise.all(use.map((parent) => parent.rules?.(data, ctx)));
			}
			await rules?.(data, ctx);
		},
		$Infer: {},
	};
}

export type { XMLBuilder };
