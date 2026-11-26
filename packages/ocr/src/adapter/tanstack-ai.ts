import type { AnyTextAdapter, ModelMessage, UIMessage } from "@tanstack/ai";
import { chat } from "@tanstack/ai";
import type { Adapter } from "../types/adapter";

export type TanstackAiOptions = {
	model: AnyTextAdapter;
};

export const tanstackAi = (options: TanstackAiOptions) =>
	({
		id: "tanstack-ai",
		generateObject: async ({ outputSchema, messages, context, ...input }) => {
			return chat({
				adapter: options.model,
				outputSchema,
				...input,
				// AG-UI messages are accepted at runtime via convertMessagesToModelMessages.
				messages: messages as Array<UIMessage | ModelMessage>,
				systemPrompts:
					context.length > 0
						? context.map((item) => `${item.description}\n${item.value}`)
						: undefined,
			});
		},
	}) satisfies Adapter;
