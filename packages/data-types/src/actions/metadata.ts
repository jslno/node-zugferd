import type { BaseMetadata } from "../types/metadata";

export interface MetadataAction<Input, Metadata extends Record<string, unknown>>
	extends BaseMetadata<Input> {
	readonly type: "metadata";
	readonly reference: typeof metadata;
	readonly metadata: Metadata;
}

export function metadata<
	Input,
	const TMetadata extends Record<string, unknown>,
>(meta: TMetadata): MetadataAction<Input, TMetadata> {
	return {
		kind: "metadata",
		type: "metadata",
		reference: metadata,
		metadata: meta,
	};
}
