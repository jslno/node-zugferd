import { collectFieldSchemas } from "@node-zugferd/data-types";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import { profileFieldMetaMap } from "./profile-field-meta";
import type { AnySchema, FieldCardinality } from "./profile-field-utils";
import {
	getSchemaMetadata,
	resolveFieldMeta,
	unwrapSchema,
} from "./profile-field-utils";

export type SerializedProfileField = {
	path: string;
	optional: boolean;
	cardinality: FieldCardinality;
	type?: string;
	id?: string | string[];
	businessTerm?: string;
	description?: string;
	usageNote?: string;
	businessRule?: string;
	cius?: string;
	xpath?: string;
};

function formatPathKey(pathKey: string): string {
	return pathKey.replace(/\.\*\./g, "[].").replace(/\.\*$/g, "[]");
}

function getCardinality(
	fieldSchema: AnySchema,
	unwrapped: AnySchema,
): FieldCardinality {
	const isArray = unwrapped.type === "array";
	const isOptional = fieldSchema.type === "nullish";

	if (isArray) {
		if (
			"pipe" in unwrapped &&
			Array.isArray(unwrapped.pipe) &&
			unwrapped.pipe.some((s) => s.type === "min_length")
		) {
			return "1..n";
		}
		return "0..n";
	}

	if (isOptional) return "0..1";
	return "1..1";
}

function getTypeLabel(unwrapped: AnySchema): string | undefined {
	if (
		unwrapped.type === "object" ||
		unwrapped.type === "array" ||
		unwrapped.type === "intersect" ||
		unwrapped.type === "union"
	) {
		return undefined;
	}

	switch ((unwrapped as { subType?: string }).subType ?? unwrapped.type) {
		case "identifier":
		case "code":
		case "text":
		case "quantity":
		case "percentage":
		case "date":
		case "amount":
		case "boolean":
			return unwrapped.type[0].toUpperCase() + unwrapped.type.slice(1);
		case "unit-price-amount":
			return "Unit Price Amount";
		case "binary-object":
			return "Binary Object";
		case "document-reference":
			return "Document Reference";
		case "literal":
			return unwrapped.expects;
		default:
			return unwrapped.type;
	}
}

export function serializeProfileSchema(
	schema: AnySchema,
): SerializedProfileField[] {
	const fields = collectFieldSchemas(schema);
	const result: SerializedProfileField[] = [];

	for (const [pathKey, { schema: fieldSchema }] of fields) {
		const metadata = getSchemaMetadata(fieldSchema);
		const meta = resolveFieldMeta(metadata, profileFieldMetaMap);
		const unwrapped = unwrapSchema(fieldSchema);
		const entry: SerializedProfileField = {
			path: formatPathKey(pathKey),
			optional: fieldSchema.type === "nullish",
			cardinality: getCardinality(fieldSchema, unwrapped),
		};

		const type = getTypeLabel(unwrapped);
		if (type) entry.type = type;

		if ("id" in metadata && metadata.id) entry.id = metadata.id;
		if (meta?.businessTerm) entry.businessTerm = meta.businessTerm;
		if (meta?.description) entry.description = meta.description;
		if (meta?.usageNote) entry.usageNote = meta.usageNote;
		if (meta?.businessRule) entry.businessRule = meta.businessRule;
		if (meta?.cius) entry.cius = meta.cius;
		if (meta?.xpath) entry.xpath = meta.xpath;

		result.push(entry);
	}

	return result.sort((a, b) => a.path.localeCompare(b.path));
}

export function stringifyProfileSchemaForLlm(
	schema: AnySchema,
	profileId?: string,
): string {
	const fields = serializeProfileSchema(schema);
	const header = profileId ? `Profile: ${profileId}\n\n` : "";
	return `${header}\`\`\`json\n${JSON.stringify({ fields }, null, 2)}\n\`\`\``;
}

export function getProfileKeyFromMdxNode(
	node: MdxJsxFlowElement,
): string | undefined {
	for (const attr of node.attributes) {
		if (attr.type !== "mdxJsxAttribute" || attr.name !== "profile") continue;

		if (typeof attr.value === "string") return attr.value;

		if (
			typeof attr.value === "object" &&
			attr.value !== null &&
			attr.value.type === "mdxJsxAttributeValueExpression"
		) {
			return attr.value.value.trim().replace(/[{}]/g, "").trim();
		}
	}
}
