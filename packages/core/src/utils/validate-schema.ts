import { ZugferdError } from "../error";
import type { InferSchema, Schema } from "../types";

function getCurrentPath(
	currentPath: string,
	fieldName: string,
	index?: number | undefined,
): string {
	return currentPath
		? `${currentPath}.${fieldName}${index !== undefined ? `[${index}]` : ""}`
		: fieldName;
}

// TODO: Infer output type
// TODO: Validate concurrently with queue to improve performance
export async function validateSchema(
	schema: Schema,
	input: InferSchema<Schema>,
) {
	const validate = async (
		schema: Schema,
		input: Record<string, any>,
		currentPath: string = "",
	) => {
		const result: Record<string, any> = {};
		for (const [fieldName, field] of Object.entries(schema)) {
			const value = input[fieldName];
			if ((value === undefined || value === null) && field.required === false) {
				continue;
			}
			if (typeof field.type === "object" && "~standard" in field.type) {
				const res = await field.type["~standard"].validate(value);
				if (res.issues) {
					throw new ZugferdError(
						`Invalid value for field "${getCurrentPath(currentPath, fieldName)}"${field.key ? ` (${field.key})` : ""}: ${res.issues.map((issue) => issue.message).join(", ")}`,
					);
				}
				result[fieldName] = res.value;
			} else if (field.type === "object" || field.type === "object[]") {
				if (!field.shape) {
					continue;
				}
				if (field.type === "object[]") {
					if (!Array.isArray(value)) {
						throw new ZugferdError(
							`Expected field "${getCurrentPath(currentPath, fieldName)}" (${field.key}) to be an array.`,
						);
					}
					for (let i = 0; i < value.length; i++) {
						(result[fieldName] ||= []).push(
							await validate(
								field.shape,
								value[i] || {},
								getCurrentPath(currentPath, fieldName, i),
							),
						);
					}
				} else {
					result[fieldName] = await validate(
						field.shape,
						value || {},
						getCurrentPath(currentPath, fieldName),
					);
				}
			} else if (Array.isArray(field.type)) {
				if (!field.type.includes(value)) {
					throw new ZugferdError(
						`Invalid value for field "${getCurrentPath(currentPath, fieldName)}"${field.key ? ` (${field.key})` : ""}: ${JSON.stringify(value)}`,
					);
				}
				result[fieldName] = value;
			} else {
				throw new ZugferdError(
					`Invalid field type for field "${getCurrentPath(currentPath, fieldName)}"${field.key ? ` (${field.key})` : ""}.`,
				);
			}
		}

		return result;
	};

	return validate(schema, input);
}
