import type {
	BaseIssue,
	BaseSchemaAsync,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import { addIssue } from "../utils/add-issue";
import { getStandardProps } from "../utils/standard-props";
import { getContext } from "../context";

export interface BinaryObjectSchema
	extends BaseSchemaAsync<
		| File
		| {
				// TODO: Support string
				content: Uint8Array | ArrayBuffer | Blob;
				mimeType: string;
				filename: string;
		  },
		{
			content: Uint8Array;
			mimeType: string;
			filename: string;
		},
		BaseIssue<unknown>
	> {
	readonly type: "binary_object";
	readonly reference: typeof binaryObject;
	readonly expects: "(File | { content: Uint8Array | ArrayBuffer | Blob; mimeType: string; filename: string; })";
}

export function binaryObject(): BinaryObjectSchema {
	return {
		kind: "schema",
		type: "binary_object",
		async: true,
		expects:
			"(File | { content: Uint8Array | ArrayBuffer | Blob; mimeType: string; filename: string; })",
		reference: binaryObject,
		get "~standard"() {
			return getStandardProps(this);
		},
		async "~run"(dataset, config) {
			const ctx = await getContext();
			if (
				dataset.value instanceof File ||
				(typeof dataset.value === "object" &&
					dataset.value !== null &&
					"content" in dataset.value &&
					(dataset.value.content instanceof Uint8Array ||
						dataset.value.content instanceof ArrayBuffer ||
						dataset.value.content instanceof Blob) &&
					"mimeType" in dataset.value &&
					typeof dataset.value.mimeType === "string" &&
					"filename" in dataset.value &&
					typeof dataset.value.filename === "string")
			) {
				let value: {
					content: Uint8Array;
					mimeType: string;
					filename: string;
				};
				if (dataset.value instanceof File) {
					value = {
						content: await dataset.value.bytes(),
						mimeType: dataset.value.type,
						filename: dataset.value.name,
					};
				} else {
					value = {
						content:
							dataset.value.content instanceof Blob
								? await dataset.value.content.bytes()
								: dataset.value.content instanceof ArrayBuffer
									? new Uint8Array(dataset.value.content)
									: (dataset.value.content as Uint8Array),
						mimeType: dataset.value.mimeType as string,
						filename: dataset.value.filename as string,
					};
				}

				if (ctx !== null) {
					await ctx.context.options.advanced?.handleBinaryObject?.({
						context: ctx.context,
						profile: ctx.profile,
						data: value,
					});

					if (ctx.pdf.autoAttachBinaryObjects) {
						ctx.pdf.embedFile(value);
					}
				}

				// @ts-expect-error
				dataset.typed = true;
				dataset.value = value;
			} else {
				addIssue(this, "type", dataset, config);
			}

			return dataset as unknown as OutputDataset<
				{
					content: Uint8Array;
					mimeType: string;
					filename: string;
				},
				BaseIssue<unknown>
			>;
		},
	};
}
