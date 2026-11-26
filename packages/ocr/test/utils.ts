import type {
	StandardJSONSchemaV1,
	StandardSchemaV1,
} from "@standard-schema/spec";

export type JsonSchema = {
	properties?: Record<string, JsonSchema>;
	items?: JsonSchema;
	anyOf?: JsonSchema[];
	type?: string | string[];
	description?: string;
	[key: string]: unknown;
};

type StandardSchemaWithJsonSchema = StandardSchemaV1 & StandardJSONSchemaV1;

export function jsonSchema(schema: StandardSchemaV1): JsonSchema {
	return (schema as StandardSchemaWithJsonSchema)["~standard"].jsonSchema.input(
		{
			target: "draft-2020-12",
		},
	) as JsonSchema;
}

export function properties(schema: JsonSchema): Record<string, JsonSchema> {
	return schema.properties as Record<string, JsonSchema>;
}

export function variants(schema: JsonSchema): JsonSchema[] {
	return schema.anyOf!;
}

export function validate(schema: StandardSchemaV1, value: unknown) {
	return schema["~standard"].validate(value);
}
