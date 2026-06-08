import type { DataRelationship } from "@node-zugferd/core";

export type PDFOptions = {
	metadata?:
		| {
				producer?: string | undefined;
				creator?: string | undefined;
				title?: string | undefined;
				author?: string | undefined;
				subject?: string | undefined;
				keywords?: string | undefined;
				modifiedAt?: Date | undefined;
				createdAt?: Date | undefined;
		  }
		| undefined;
	attachments?:
		| {
				filename: string;
				mimeType?: string | undefined;
				description?: string | undefined;
				data: string | Uint8Array | ArrayBuffer;
				dataRelationship?: DataRelationship | undefined;
				createdAt?: Date | undefined;
				modifiedAt?: Date | undefined;
		  }[]
		| undefined;
};
