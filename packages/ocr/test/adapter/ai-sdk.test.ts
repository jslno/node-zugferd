import type { Message } from "@ag-ui/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { object, text } from "@node-zugferd/data-types";
import { MockLanguageModelV4 } from "ai/test";
import { describe, expect, it } from "vitest";
import { aiSdk } from "../../src/adapter/ai-sdk";
import type { GenerateObjectInput } from "../../src/types";

const outputSchema = object({ invoiceNumber: text() });

type GenerateResult = Awaited<ReturnType<MockLanguageModelV4["doGenerate"]>>;
type GenerateInput = GenerateObjectInput<typeof outputSchema>;

const baseInput: GenerateInput = {
	threadId: "thread",
	runId: "run",
	messages: [{ id: "msg", role: "user", content: "Extract." }],
	context: [],
	tools: [],
	state: undefined,
	forwardedProps: undefined,
	outputSchema,
};

const defaultUsage: GenerateResult["usage"] = {
	inputTokens: {
		total: 7163,
		noCache: undefined,
		cacheRead: undefined,
		cacheWrite: undefined,
	},
	outputTokens: { total: 1029, text: 1, reasoning: 1028 },
};

const mockResult = (
	content: string,
	finishReason: "stop" | "length" = "stop",
	usage: GenerateResult["usage"] = defaultUsage,
): GenerateResult => ({
	content: content ? [{ type: "text", text: content }] : [],
	finishReason: { unified: finishReason, raw: finishReason },
	usage,
	warnings: [],
});

function generate(
	result: GenerateResult,
	options: Partial<Parameters<typeof aiSdk>[0]> = {},
	input: Partial<GenerateInput> = {},
	supportedUrls: Record<string, RegExp[]> = {},
) {
	const model = new MockLanguageModelV4({ doGenerate: result, supportedUrls });
	const promise = aiSdk({ model, ...options }).generateObject({
		...baseInput,
		...input,
	});

	return { promise, model };
}

function firstCall(model: MockLanguageModelV4) {
	const call = model.doGenerateCalls[0];
	if (!call) throw new Error("Expected the model to be called once");
	return call;
}

describe("aiSdk adapter", () => {
	it("returns the structured output from a completed generation", async () => {
		const { promise, model } = generate(
			mockResult('{"invoiceNumber":"471102"}'),
		);

		await expect(promise).resolves.toEqual({ invoiceNumber: "471102" });

		const call = firstCall(model);
		expect(call.responseFormat).toMatchObject({ type: "json" });
		expect(JSON.stringify(call.responseFormat)).toContain("invoiceNumber");
	});

	it("reports a token limit instead of a missing output", async () => {
		const { promise } = generate(mockResult("", "length"));

		await expect(promise).rejects.toBeInstanceOf(ZugferdError);
		await expect(promise).rejects.toThrow(/token limit/);
		await expect(promise).rejects.toThrow(/input: 7163/);
		await expect(promise).rejects.toThrow(/output: 1029/);
	});

	it("reports unknown token usage with placeholders", async () => {
		const { promise } = generate(
			mockResult("", "length", {
				inputTokens: {
					total: undefined,
					noCache: undefined,
					cacheRead: undefined,
					cacheWrite: undefined,
				},
				outputTokens: {
					total: undefined,
					text: undefined,
					reasoning: undefined,
				},
			}),
		);

		await expect(promise).rejects.toBeInstanceOf(ZugferdError);
		await expect(promise).rejects.toThrow(/input: \?/);
		await expect(promise).rejects.toThrow(/output: \?/);
		await expect(promise).rejects.toThrow(/reasoning: \?/);
	});

	it("forwards reasoning and output token limits to the model", async () => {
		const { promise, model } = generate(
			mockResult('{"invoiceNumber":"471102"}'),
			{ reasoning: "low", maxOutputTokens: 321 },
		);

		await promise;

		expect(firstCall(model)).toMatchObject({
			reasoning: "low",
			maxOutputTokens: 321,
		});
	});

	it("converts context, system messages, and user media into model messages", async () => {
		/* cSpell:disable-next-line */
		const documentUrl = "data:application/pdf;base64,JVBERi0xLjQK";
		const messages = [
			{ id: "system", role: "system", content: "System rules" },
			{ id: "developer", role: "developer", content: "Developer rules" },
			{
				id: "user",
				role: "user",
				content: [
					{ type: "text", text: "Extract." },
					{
						type: "image",
						source: {
							type: "data",
							value: "aW1hZ2U=",
							mimeType: "image/png",
						},
						metadata: { filename: "page.png" },
					},
					{
						type: "document",
						source: {
							type: "url",
							value: documentUrl,
						},
					},
					{
						type: "video",
						source: { type: "file", value: "clip-1", provider: "vendor" },
						metadata: { filename: "clip.mp4" },
					},
				],
			},
		] as Message[];

		const { promise, model } = generate(
			mockResult('{"invoiceNumber":"471102"}'),
			{},
			{ messages, context: [{ description: "Context", value: "Extra" }] },
		);

		await promise;

		const prompt = firstCall(model).prompt;
		expect(prompt[0]).toEqual({
			role: "system",
			content: "Context\nExtra\n\nSystem rules\n\nDeveloper rules",
		});

		const user = prompt[1];
		expect(user?.role).toBe("user");
		if (user?.role !== "user") throw new Error("Expected a user message");

		expect(user.content).toMatchObject([
			{ type: "text", text: "Extract." },
			{
				type: "file",
				data: { type: "data", data: "aW1hZ2U=" },
				mediaType: "image/png",
				filename: "page.png",
			},
			{
				type: "file",
				data: { type: "data" },
				mediaType: "application/pdf",
			},
			{
				type: "file",
				data: { type: "reference", reference: { vendor: "clip-1" } },
				mediaType: "video",
				filename: "clip.mp4",
			},
		]);

		const documentPart = user.content[2] as {
			data: { data: Uint8Array };
		};
		expect(documentPart.data.data.length).toBeGreaterThan(0);
	});

	it("falls back to about:blank for malformed media URLs", async () => {
		const messages = [
			{
				id: "user",
				role: "user",
				content: [
					{
						type: "image",
						source: { type: "url", value: "not a url", mimeType: "image/jpeg" },
					},
				],
			},
		] as Message[];

		const { promise, model } = generate(
			mockResult('{"invoiceNumber":"471102"}'),
			{},
			{ messages },
			{ "*": [/^about:/] },
		);

		await promise;

		const user = firstCall(model).prompt[0];
		if (user?.role !== "user") throw new Error("Expected a user message");
		const image = user.content[0] as {
			data: { url: URL; originalUrl: string };
		};

		expect(image.data.originalUrl).toBe("not a url");
		expect(image.data.url.toString()).toBe("about:blank");
	});

	it("rejects file media without a provider id", async () => {
		const messages = [
			{
				id: "user",
				role: "user",
				content: [{ type: "image", source: { type: "file", value: "asset" } }],
			},
		] as Message[];

		const { promise } = generate(
			mockResult('{"invoiceNumber":"471102"}'),
			{},
			{ messages },
		);

		await expect(promise).rejects.toThrow(/require a provider id/);
	});

	it("converts tool calls and tool results with their original outputs", async () => {
		const toolCall = (id: string, args: string) => ({
			id,
			type: "function" as const,
			function: { name: "lookup", arguments: args },
		});
		const messages = [
			{
				id: "assistant",
				role: "assistant",
				content: "Checking",
				toolCalls: [
					toolCall("call-1", '{"id":1}'),
					toolCall("call-2", "not json"),
					toolCall("call-3", "{}"),
					toolCall("call-4", "{}"),
					toolCall("call-5", "not json"),
					toolCall("call-6", "{}"),
				],
			},
			{
				id: "result-1",
				role: "tool",
				toolCallId: "call-1",
				content: '{"ok":true}',
			},
			{
				id: "result-2",
				role: "tool",
				toolCallId: "call-2",
				content: "",
				error: "boom",
			},
			{
				id: "result-3",
				role: "tool",
				toolCallId: "call-3",
				content: "plain",
				error: "boom",
			},
			{
				id: "result-4",
				role: "tool",
				toolCallId: "call-4",
				content: [
					{ type: "text", text: "part" },
					{
						type: "image",
						source: { type: "data", value: "Yg==", mimeType: "image/png" },
					},
				],
				error: "oops",
			},
			{
				id: "result-5",
				role: "tool",
				toolCallId: "call-5",
				content: "not json",
			},
			{
				id: "result-6",
				role: "tool",
				toolCallId: "call-6",
				content: [
					{ type: "text", text: "part" },
					{
						type: "image",
						source: { type: "data", value: "Yg==", mimeType: "image/png" },
						metadata: { filename: "image.png" },
					},
				],
			},
		] as Message[];

		const { promise, model } = generate(
			mockResult('{"invoiceNumber":"471102"}'),
			{},
			{ messages },
		);

		await promise;

		const prompt = firstCall(model).prompt;
		const assistant = prompt.find((message) => message.role === "assistant");
		expect(assistant).toMatchObject({
			role: "assistant",
			content: [
				{ type: "text", text: "Checking" },
				{
					type: "tool-call",
					toolCallId: "call-1",
					toolName: "lookup",
					input: { id: 1 },
				},
				{
					type: "tool-call",
					toolCallId: "call-2",
					toolName: "lookup",
					input: "not json",
				},
				{
					type: "tool-call",
					toolCallId: "call-3",
					toolName: "lookup",
					input: {},
				},
				{
					type: "tool-call",
					toolCallId: "call-4",
					toolName: "lookup",
					input: {},
				},
				{
					type: "tool-call",
					toolCallId: "call-5",
					toolName: "lookup",
					input: "not json",
				},
				{
					type: "tool-call",
					toolCallId: "call-6",
					toolName: "lookup",
					input: {},
				},
			],
		});

		const toolResults = prompt.flatMap((message) =>
			message.role === "tool" ? message.content : [],
		);

		expect(toolResults).toHaveLength(6);
		expect(toolResults).toMatchObject([
			{
				type: "tool-result",
				toolCallId: "call-1",
				toolName: "lookup",
				output: { type: "json", value: { ok: true } },
			},
			{
				type: "tool-result",
				toolCallId: "call-2",
				output: { type: "error-text", value: "boom" },
			},
			{
				type: "tool-result",
				toolCallId: "call-3",
				output: {
					type: "content",
					value: [
						{ type: "text", text: "boom" },
						{ type: "text", text: "plain" },
					],
				},
			},
			{
				type: "tool-result",
				toolCallId: "call-4",
				output: {
					type: "content",
					value: [
						{ type: "text", text: "oops" },
						{ type: "text", text: "part" },
						{
							type: "file",
							data: { type: "data", data: "Yg==" },
							mediaType: "image/png",
						},
					],
				},
			},
			{
				type: "tool-result",
				toolCallId: "call-5",
				output: { type: "text", value: "not json" },
			},
			{
				type: "tool-result",
				toolCallId: "call-6",
				output: {
					type: "content",
					value: [
						{ type: "text", text: "part" },
						{
							type: "file",
							data: { type: "data", data: "Yg==" },
							mediaType: "image/png",
							filename: "image.png",
						},
					],
				},
			},
		]);
	});

	it("throws when a tool result has no matching tool call", async () => {
		const messages = [
			{ id: "result", role: "tool", toolCallId: "missing", content: "x" },
		] as Message[];

		const { promise } = generate(
			mockResult('{"invoiceNumber":"471102"}'),
			{},
			{ messages },
		);

		await expect(promise).rejects.toThrow(
			/Missing tool name for tool call id "missing"/,
		);
	});

	it("flushes reasoning into the next assistant message and at the end", async () => {
		const messages = [
			{ id: "reasoning-1", role: "reasoning", content: "think-one" },
			{ id: "assistant-1", role: "assistant", content: "Answer" },
			{ id: "assistant-2", role: "assistant", content: "Plain" },
			{ id: "assistant-3", role: "assistant", content: "" },
			{
				id: "activity",
				role: "activity",
				activityType: "progress",
				content: {},
			},
			{ id: "reasoning-2", role: "reasoning", content: "think-two" },
		] as Message[];

		const { promise, model } = generate(
			mockResult('{"invoiceNumber":"471102"}'),
			{},
			{ messages },
		);

		await promise;

		expect(firstCall(model).prompt).toMatchObject([
			{
				role: "assistant",
				content: [
					{ type: "reasoning", text: "think-one" },
					{ type: "text", text: "Answer" },
				],
			},
			{
				role: "assistant",
				content: [{ type: "text", text: "Plain" }],
			},
			{
				role: "assistant",
				content: [{ type: "reasoning", text: "think-two" }],
			},
		]);
	});
});
