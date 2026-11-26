import type { Message } from "@ag-ui/core";
import { object, text } from "@node-zugferd/data-types";
import { fakeText } from "@tanstack/ai/testing";
import { describe, expect, it, vi } from "vitest";
import type { GenerateObjectInput } from "../../src/types";

const { chat, sentinel } = vi.hoisted(() => {
	const sentinel = { extracted: true };
	return { chat: vi.fn(async () => sentinel), sentinel };
});

vi.mock("@tanstack/ai", () => ({ chat }));

import { tanstackAi } from "../../src/adapter/tanstack-ai";

const outputSchema = object({ invoiceNumber: text() });
const model = fakeText({ model: "mock-adapter" });
const messages: Message[] = [{ id: "msg", role: "user", content: "Extract." }];

function input(
	context: GenerateObjectInput<typeof outputSchema>["context"] = [],
) {
	return {
		threadId: "thread",
		runId: "run",
		messages,
		context,
		tools: [],
		state: undefined,
		forwardedProps: undefined,
		outputSchema,
	} satisfies GenerateObjectInput<typeof outputSchema>;
}

describe("tanstackAi adapter", () => {
	it("forwards the schema, messages, and context to chat", async () => {
		const adapter = tanstackAi({ model });
		const request = input([{ description: "Context", value: "Extra" }]);

		const result = await adapter.generateObject(request);

		expect(chat).toHaveBeenCalledWith(
			expect.objectContaining({
				adapter: model,
				outputSchema,
				threadId: "thread",
				runId: "run",
				messages: request.messages,
				systemPrompts: ["Context\nExtra"],
			}),
		);
		expect(result).toBe(sentinel);
	});

	it("omits system prompts when there is no context", async () => {
		const adapter = tanstackAi({ model });

		await adapter.generateObject(input());

		expect(chat).toHaveBeenCalledWith(
			expect.objectContaining({ systemPrompts: undefined }),
		);
	});
});
