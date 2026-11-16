import { base64 } from "@node-zugferd/utils";

export const toBlob = (
	input: string | Uint8Array | ArrayBuffer | Blob,
	options?: BlobPropertyBag & {
		base64DecodeString?: boolean | undefined;
	},
) => {
	if (input instanceof Blob) return input;

	if (typeof input === "string")
		return new Blob(
			[options?.base64DecodeString ? base64.decode(input) : input],
			options,
		);

	return new Blob(
		[input instanceof ArrayBuffer ? input : Uint8Array.from(input)],
		options,
	);
};
