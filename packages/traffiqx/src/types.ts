import type { BetterFetch, FetchEsque } from "@better-fetch/fetch";
import type { StandardSchemaV1 } from "@standard-schema/spec";

export type TraffiqxAccessTokenInputContext<
	Metadata extends StandardSchemaV1<any, any>,
> = {
	meta: StandardSchemaV1.InferOutput<Metadata>;
};
export type TraffiqxAccessTokenInput<
	Metadata extends StandardSchemaV1<any, any>,
> =
	| string
	| ((
			ctx: TraffiqxAccessTokenInputContext<Metadata>,
	  ) => string | Promise<string>);

export type TraffiqxOptions<
	Provider extends TraffiqxProvider | TraffiqxProvider[],
	Metadata extends StandardSchemaV1<any, any>,
> = {
	provider: Provider;
	$fetch?: BetterFetch | undefined;
	fetch?: FetchEsque | undefined;
	accessToken?: TraffiqxAccessTokenInput<Metadata> | undefined;
	metaSchema?: Metadata | undefined;
};

export type TraffiqxProvider = {
	providerId: (string & {}) | "";
	baseUrl: string;
	headers?: Record<string, string | undefined> | undefined;
} & Record<string, any>;

export type TraffiqxStatus =
	| "inProcess"
	| "sent"
	| "error"
	| "deleted"
	| "userAction";

export type TraffiqxDocumentStatus = {
	status: TraffiqxStatus;
	error_code?: string | undefined;
	error_details?: string | undefined;
	downloaded: boolean;
};

export type TraffiqxDeliveryChannel = {
	name: string;
	address: string;
};

export type TraffiqxOutboxMetadata = {
	invoice_date: string;
	invoice_number: string;
	gross_total: number;
	currency_code: string;
	seller_name: string;
	buyer_name: string;
	invoice_type: string;
	document_format: string;
	send_date: string;
	delivery_channel: TraffiqxDeliveryChannel;
	status: TraffiqxDocumentStatus;
};

export type TraffiqxOutboxDocumentId = {
	document_id: string;
	status: TraffiqxStatus;
	downloaded: boolean;
	href: string;
};

export type TraffiqxOutboxDocumentIds = TraffiqxOutboxDocumentId[];

export type TraffiqxInboxMetadata = {
	invoice_date: string;
	invoice_number: string;
	gross_total: number;
	currency_code: string;
	seller_name: string;
	buyer_name: string;
	invoice_type: string;
	document_format: string;
	date_of_receipt: string;
	en_16931_compliant: boolean;
	downloaded: boolean;
};

export type TraffiqxInboxDocumentId = {
	document_id: string;
	downloaded: boolean;
	href: string;
};

export type TraffiqxInboxDocumentIds = TraffiqxInboxDocumentId[];

export type TraffiqxProblemDetails = {
	type: string;
	title: string;
	detail?: string | undefined;
	instance?: string | undefined;
};

export type TraffiqxUploadResult = {
	document_id: string;
	href: string;
};

export type { BetterFetch, FetchEsque };
