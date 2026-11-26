import type { ImagePart } from "@ag-ui/core";
import type {
	Awaitable,
	ZugferdOptions,
	ZugferdPlugin,
} from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { base64 } from "@node-zugferd/utils";
import type { StandardSchemaV1 } from "@standard-schema/spec";
import { PDFDocument } from "pdf-lib";
import { DEFAULT_PROMPT, DEFAULT_SYSTEM_PROMPT } from "./prompts";
import { extractionSchema, projectSchema } from "./schema";
import type { OCROptions } from "./types";
import {
	generateMessageId,
	generateRunId,
	generateThreadId,
	pdfToWebp,
} from "./utils";
import "@node-zugferd/codelist-vatex";
import "@node-zugferd/codelist-allowance";
import "@node-zugferd/codelist-payment";
import "@node-zugferd/codelist-text";
import "@node-zugferd/codelist-time";
import "@node-zugferd/codelist-currency";
import "@node-zugferd/codelist-country";
import "@node-zugferd/codelist-untdid-1001";
import "@node-zugferd/codelist-untdid-5305";

declare module "@node-zugferd/core" {
	interface ZugferdPluginRegistry<
		ZugferdOpts extends ZugferdOptions<any>,
		Options,
	> {
		ocr: {
			creator: typeof ocr<ZugferdOpts>;
		};
	}
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return (
		typeof value === "object" &&
		value !== null &&
		!Array.isArray(value) &&
		!(value instanceof Date)
	);
}

function isEmptyValue(value: unknown): boolean {
	if (value === undefined || value === null || value === "") return true;
	if (Array.isArray(value)) return value.length === 0;
	if (isRecord(value)) return Object.keys(value).length === 0;
	return false;
}

function prune(value: unknown, depth = 0): unknown {
	if (Array.isArray(value)) {
		return value
			.map((item) => prune(item, depth + 1))
			.filter((item) => !isEmptyValue(item));
	}

	if (isRecord(value)) {
		const result: Record<string, unknown> = {};

		for (const [key, item] of Object.entries(value)) {
			const pruned = prune(item, depth + 1);
			if (!isEmptyValue(pruned)) result[key] = pruned;
		}

		return result;
	}

	return value;
}

function mergeResults(
	target: Record<string, unknown>,
	source: Record<string, unknown>,
): void {
	for (const [key, value] of Object.entries(source)) {
		if (isEmptyValue(value)) continue;

		const existing = target[key];

		if (isRecord(existing) && isRecord(value)) {
			mergeResults(existing, value);
		} else if (Array.isArray(existing) && Array.isArray(value)) {
			for (const [index, item] of value.entries()) {
				const current = existing[index];
				if (isRecord(current) && isRecord(item)) {
					mergeResults(current, item);
				} else if (isEmptyValue(current) && !isEmptyValue(item)) {
					existing[index] = item;
				}
			}
		} else if (isEmptyValue(existing)) {
			target[key] = value;
		}
	}
}

export const ocr = <
	_ZugferdOpts extends ZugferdOptions<any>,
	O extends OCROptions = OCROptions,
>(
	options: O,
) => {
	const opts = {
		generateMessageId,
		generateRunId,
		generateThreadId,
		defaultSystemPrompt: DEFAULT_SYSTEM_PROMPT,
		defaultPrompt: DEFAULT_PROMPT,
		...options,
	};

	const getDefaultPrompt = async () =>
		typeof opts.defaultPrompt === "function"
			? await (opts.defaultPrompt as () => Awaitable<string>)()
			: opts.defaultPrompt;
	const getDefaultSystemPrompt = async () =>
		typeof opts.defaultSystemPrompt === "function"
			? await (opts.defaultSystemPrompt as () => Awaitable<string>)()
			: opts.defaultSystemPrompt;

	return {
		id: "ocr",
		actions: (ctx) => {
			return {
				ocr: {
					// TODO: Support extracting orders
					extract: async (
						input: string | Uint8Array | ArrayBuffer | PDFDocument,
					) => {
						let pdf: PDFDocument;
						try {
							if (input instanceof PDFDocument) {
								pdf = input;
							} else {
								pdf = await PDFDocument.load(input);
							}
						} catch (error) {
							throw new ZugferdError(
								(error as Error).message ?? "Failed to load document.",
							);
						}

						const images: ImagePart[] = (
							await pdfToWebp(await pdf.save(), opts.imageScale)
						).map((bytes) => ({
							type: "image",
							source: {
								type: "data",
								mimeType: "image/png",
								value: base64.encode(bytes),
							},
						}));

						// A single pass over the full EN 16931 schema makes vision
						// models skip large parts of it. Focused passes keep each
						// schema small and ask the model to revisit the same pages
						// for one group of fields at a time.
						const sections = [
							{
								name: "document notes and invoice header",
								paths: [
									"exchangedDocument",
									"transaction.invoiceNumber",
									"transaction.invoiceIssueDate",
									"transaction.invoiceTypeCode",
									"transaction.invoiceCurrencyCode",
									"transaction.taxCurrencyCode",
									"transaction.paymentDueDate",
								],
								instruction:
									"Capture document-level notes and the listed header fields. Use the schema descriptions to distinguish the invoice issue date, invoice type, currencies, and the net payment due date from other dates. Do not use an early-payment discount date as paymentDueDate.",
							},
							{
								name: "references and payment terms",
								paths: [
									"transaction.buyerReference",
									"transaction.projectReference",
									"transaction.contractReference",
									"transaction.purchaseOrderReference",
									"transaction.salesOrderReference",
									"transaction.receivingAdviceReference",
									"transaction.despatchAdviceReference",
									"transaction.tenderOrLotReference",
									"transaction.invoicedObjectIdentifier",
									"transaction.buyerAccountingReference",
									"transaction.paymentTerms",
								],
								instruction:
									"Capture every reference identifier shown in the document and the full payment-terms text. Preserve each identifier's own value; do not copy an invoice date or another date into an identifier field.",
							},
							{
								name: "seller, buyer, and payee",
								paths: [
									"transaction.seller",
									"transaction.buyer",
									"transaction.payee",
								],
								instruction:
									"Identify the seller, buyer, and any distinct payee. Capture party identifiers, names, addresses, contacts, and bank details under the correct party according to the schema descriptions. Only set payee when a distinct beneficiary is shown.",
							},
							{
								name: "delivery, payment instructions, and VAT",
								paths: [
									"transaction.delivery",
									"transaction.paymentMeans",
									"transaction.applicableTradeTax",
								],
								instruction:
									"Capture delivery information, payment instructions, and VAT information. Use the schema descriptions to distinguish the delivery date, tax point date, invoice date, and payment due date.",
							},
							{
								name: "allowances and totals",
								paths: [
									"transaction.allowances",
									"transaction.monetarySummation",
									"transaction.vatBreakdown",
								],
								instruction:
									"Capture all document-level allowances, charges, VAT breakdowns, and monetary totals. Use the schema descriptions to distinguish net total, VAT amount, gross total, and amount due; preserve the printed values after locale normalization.",
							},
							{
								name: "invoice line descriptions, identifiers, and quantities",
								paths: [
									"transaction.line.position",
									"transaction.line.item",
									"transaction.line.delivery",
								],
								instruction:
									"Return EVERY invoice line in document order. Capture line position identifiers, item names and descriptions, item identifiers, and billed quantities with units. Do not extract prices in this pass.",
							},
							{
								name: "invoice line item identifiers",
								paths: [
									"transaction.line.item.name",
									"transaction.line.item.sellerAssignedId",
									"transaction.line.item.buyerAssignedId",
									"transaction.line.item.globalId",
								],
								instruction:
									"Re-read the invoice line table in the same document order. Use the item name only as context. Capture the item identifiers printed in the document in the field whose schema description matches them. Do not use the line number or item name as an identifier.",
							},
							{
								name: "invoice line prices and totals",
								paths: [
									"transaction.line.position.lineId",
									"transaction.line.item.name",
									"transaction.line.delivery.billedQuantity",
									"transaction.line.priceDetails",
									"transaction.line.billing.itemTotals",
								],
								instruction:
									"Return EVERY invoice line in the same document order, using the same line count. Use line position, item name, and billed quantity only as context. Capture unit prices before and after discount and the line total from the printed line values. Do not copy a line total into a unit-price field. Copy printed values; do not calculate.",
							},
						];

						const results: Record<string, unknown> = {};

						for (const section of sections) {
							const output = await opts.adapter.generateObject({
								context: [],
								messages: [
									{
										role: "system",
										id: await opts.generateMessageId(),
										content: await getDefaultSystemPrompt(),
									},
									{
										role: "user",
										id: await opts.generateMessageId(),
										content: [
											{
												type: "text",
												text: `Focus this pass on ${section.name}. ${section.instruction}\n\nRe-read every page specifically for these fields: ${section.paths.join(", ")}. Leave fields outside this list null or absent.\n\n${await getDefaultPrompt()}`,
											},
											...images,
										],
									},
								],
								runId: await opts.generateRunId(),
								threadId: await opts.generateThreadId(),
								outputSchema: projectSchema(extractionSchema, section.paths),
								tools: [],
							});

							mergeResults(results, output as Record<string, unknown>);
						}

						return prune(results) as StandardSchemaV1.InferOutput<
							typeof extractionSchema
						>;
					},
				},
			};
		},
		options: opts as NoInfer<O>,
	} satisfies ZugferdPlugin;
};

export type * from "./types";
export { generateMessageId, generateRunId, generateThreadId };
