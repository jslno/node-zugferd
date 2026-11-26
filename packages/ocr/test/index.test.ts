import type { ContentPart } from "@ag-ui/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { zugferd } from "node-zugferd";
import { PDFDocument } from "pdf-lib";
import { describe, expect, it, vi } from "vitest";
import { ocr } from "../src";
import type { Adapter, OCROptions } from "../src/types";
import { jsonSchema, properties, variants } from "./utils";

type GenerateObjectInput = Parameters<Adapter["generateObject"]>[0];
type ExtraOptions = Partial<Omit<OCROptions, "adapter">>;

const sectionNames = [
	"document notes and invoice header",
	"references and payment terms",
	"seller, buyer, and payee",
	"delivery, payment instructions, and VAT",
	"allowances and totals",
	"invoice line descriptions, identifiers, and quantities",
	"invoice line item identifiers",
	"invoice line prices and totals",
];

function fakeAdapter(outputs: readonly Record<string, unknown>[]) {
	const calls: GenerateObjectInput[] = [];
	const adapter: Adapter = {
		id: "fake",
		generateObject: async (input) => {
			calls.push(input as GenerateObjectInput);
			return (outputs[calls.length - 1] ?? {}) as never;
		},
	};

	return { adapter, calls };
}

function setup(
	outputs: readonly Record<string, unknown>[],
	overrides: ExtraOptions = {},
) {
	const { adapter, calls } = fakeAdapter(outputs);
	const defaultPrompt = vi.fn(async () => "PROMPT");
	const defaultSystemPrompt = vi.fn(async () => "SYSTEM");
	const plugin = ocr({
		adapter,
		defaultPrompt,
		defaultSystemPrompt,
		generateMessageId: () => "message",
		generateRunId: () => "run",
		generateThreadId: () => "thread",
		...overrides,
	});

	return {
		extract: zugferd({ profiles: [], plugins: [plugin] }).ocr.extract,
		calls,
		defaultPrompt,
		defaultSystemPrompt,
	};
}

async function onePagePdf(): Promise<Uint8Array> {
	const pdf = await PDFDocument.create();
	pdf.addPage([200, 200]);
	return pdf.save();
}

function isContentParts(content: unknown): content is ContentPart[] {
	return Array.isArray(content);
}

describe("ocr plugin", () => {
	it("runs focused passes over the pages and merges their results", async () => {
		const outputs: Record<string, unknown>[] = [
			{
				exchangedDocument: {
					invoiceNotes: [{ subjectCode: "GEN", content: "Note" }],
				},
				transaction: { invoiceNumber: "INV-1" },
			},
			{
				transaction: {
					buyerReference: "BUYER-1",
					paymentTerms: "Net 30",
				},
			},
			{
				transaction: {
					seller: { name: "Seller" },
					buyer: { name: "Buyer" },
				},
			},
			{
				transaction: {
					delivery: { actualDeliveryDate: "2026-01-02" },
					paymentMeans: { typeCode: "30" },
				},
			},
			{
				transaction: {
					allowances: [],
					monetarySummation: { grandTotalAmount: 119 },
				},
			},
			{
				transaction: {
					line: [
						{
							position: { lineId: "1" },
							item: { name: "Widget" },
						},
					],
				},
			},
			{
				transaction: {
					line: [{ item: { sellerAssignedId: "SKU-1" } }],
				},
			},
			{
				transaction: {
					line: [
						{
							position: { lineId: "1" },
							item: { name: "Widget" },
							billing: { itemTotals: { lineTotalAmount: 100 } },
						},
						{
							position: { lineId: "2" },
							item: { name: "Gadget" },
							billing: { itemTotals: { lineTotalAmount: 19 } },
						},
					],
				},
			},
		];
		const { extract, calls, defaultPrompt, defaultSystemPrompt } =
			setup(outputs);

		const result = await extract(await onePagePdf());

		expect(calls).toHaveLength(8);
		expect(defaultPrompt).toHaveBeenCalledTimes(8);
		expect(defaultSystemPrompt).toHaveBeenCalledTimes(8);

		for (const [index, call] of calls.entries()) {
			expect(call.threadId).toBe("thread");
			expect(call.runId).toBe("run");
			expect(call.messages[0]).toMatchObject({
				role: "system",
				id: "message",
				content: "SYSTEM",
			});

			const user = call.messages[1]!;
			expect(user).toMatchObject({ role: "user", id: "message" });
			if (user.role !== "user") throw new Error("Expected a user message");
			if (!isContentParts(user.content)) {
				throw new Error("Expected array content");
			}

			const content = user.content;
			const textPart = content.find((part) => part.type === "text");
			expect(textPart).toMatchObject({ type: "text" });
			if (!textPart || textPart.type !== "text") {
				throw new Error("Expected a text part");
			}

			expect(textPart.text).toContain(
				`Focus this pass on ${sectionNames[index]}.`,
			);
			expect(textPart.text).toContain("PROMPT");

			const images = content.filter((part) => part.type === "image");
			expect(images).toHaveLength(1);
			const image = images[0];
			expect(image).toMatchObject({
				type: "image",
				source: { type: "data", mimeType: "image/png" },
			});
			if (!image || image.type !== "image") {
				throw new Error("Expected an image part");
			}
			if (image.source.type !== "data") {
				throw new Error("Expected inline image data");
			}
			expect(image.source.value.length).toBeGreaterThan(0);
		}

		const firstPassTransaction = properties(
			properties(jsonSchema(calls[0]!.outputSchema)).transaction!,
		);
		expect(Object.keys(firstPassTransaction)).toEqual(
			expect.arrayContaining([
				"invoiceNumber",
				"invoiceIssueDate",
				"invoiceTypeCode",
			]),
		);
		expect(firstPassTransaction).not.toHaveProperty("buyerReference");

		const lastPassTransaction = properties(
			properties(jsonSchema(calls[7]!.outputSchema)).transaction!,
		);
		const lines = variants(lastPassTransaction.line!).find(
			(entry) => entry.type === "array",
		)!;
		expect(properties(lines.items!)).toHaveProperty("priceDetails");
		expect(lastPassTransaction).not.toHaveProperty("seller");

		expect(result.exchangedDocument?.invoiceNotes).toEqual([
			{ subjectCode: "GEN", content: "Note" },
		]);
		expect(result.transaction).toMatchObject({
			invoiceNumber: "INV-1",
			buyerReference: "BUYER-1",
			paymentTerms: "Net 30",
			seller: { name: "Seller" },
			monetarySummation: { grandTotalAmount: 119 },
			line: [
				{
					position: { lineId: "1" },
					item: { name: "Widget", sellerAssignedId: "SKU-1" },
					billing: { itemTotals: { lineTotalAmount: 100 } },
				},
				{
					position: { lineId: "2" },
					item: { name: "Gadget" },
					billing: { itemTotals: { lineTotalAmount: 19 } },
				},
			],
		});
		expect(result.transaction).not.toHaveProperty("allowances");
	});

	it("keeps the first populated value when later passes disagree", async () => {
		const outputs: Record<string, unknown>[] = [
			{ transaction: { invoiceNumber: "INV-1", buyerReference: "" } },
			{ transaction: { invoiceNumber: "INV-2", buyerReference: "BUYER-1" } },
			...Array.from({ length: 6 }, () => ({})),
		];
		const { extract } = setup(outputs);

		const result = await extract(await onePagePdf());

		expect(result.transaction?.invoiceNumber).toBe("INV-1");
		expect(result.transaction?.buyerReference).toBe("BUYER-1");
	});

	it("accepts an existing PDFDocument and string prompts", async () => {
		const pdf = await PDFDocument.create();
		pdf.addPage([200, 200]);
		const { extract, calls } = setup(
			Array.from({ length: 8 }, () => ({})),
			{ defaultPrompt: "PROMPT", defaultSystemPrompt: "SYSTEM" },
		);

		const result = await extract(pdf);

		expect(calls).toHaveLength(8);
		expect(calls[0]!.messages[0]).toMatchObject({
			role: "system",
			content: "SYSTEM",
		});
		expect(result).toEqual({});
	});

	it("keeps populated line items when a later pass contributes an empty line", async () => {
		const outputs: Record<string, unknown>[] = Array.from(
			{ length: 8 },
			() => ({}),
		);
		const line = {
			position: { lineId: "1" },
			item: { name: "Widget" },
		};
		outputs[5] = { transaction: { line: [null, line] } };
		outputs[6] = { transaction: { line: [{}, {}] } };
		const { extract } = setup(outputs);

		const result = await extract(await onePagePdf());

		expect(result.transaction?.line).toEqual([line]);
	});

	it("wraps invalid PDF input in ZugferdError before calling the adapter", async () => {
		const { extract, calls } = setup([{}]);

		await expect(extract("not a pdf")).rejects.toBeInstanceOf(ZugferdError);
		expect(calls).toHaveLength(0);
	});

	it("falls back to a generic message when PDF loading throws without one", async () => {
		const load = vi.spyOn(PDFDocument, "load").mockRejectedValueOnce({});
		const { extract, calls } = setup([{}]);

		await expect(extract(new Uint8Array())).rejects.toThrow(
			"Failed to load document.",
		);
		expect(calls).toHaveLength(0);
		load.mockRestore();
	});
});
