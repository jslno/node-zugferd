import type { ContentPart, Message, PartSource } from "@ag-ui/core";
import { ZugferdError } from "@node-zugferd/core/error";
import type {
	AssistantContent,
	FilePart,
	LanguageModel,
	ModelMessage,
	ToolResultPart,
	UserContent,
} from "ai";
import { generateText, Output } from "ai";
import type { Adapter } from "../types";

export type AiSdkOptions = {
	model: LanguageModel;
	reasoning?: "none" | "minimal" | "low" | "medium" | "high" | "xhigh" | "max";
	maxOutputTokens?: number | undefined;
};

const DEFAULT_MEDIA_TYPE = {
	image: "image",
	document: "application/pdf",
	audio: "audio",
	video: "video",
} as const;

type MediaPart = Extract<
	ContentPart,
	{ type: "image" | "document" | "audio" | "video" }
>;

type TaggedFileData = Extract<FilePart["data"], { type: string }>;

function convertPartSource(source: PartSource): TaggedFileData {
	switch (source.type) {
		case "data":
			return { type: "data", data: source.value };
		case "url": {
			try {
				return {
					type: "url",
					url: new URL(source.value),
					originalUrl: source.value,
				};
			} catch {
				return {
					type: "url",
					url: new URL("about:blank"),
					originalUrl: source.value,
				};
			}
		}
		case "file": {
			if (!source.provider) {
				throw new Error(
					"AG-UI file sources require a provider id to convert for the AI SDK",
				);
			}

			return {
				type: "reference",
				reference: { [source.provider]: source.value },
			};
		}
	}
}

function mediaTypeFor(part: MediaPart): string {
	return part.source.mimeType ?? DEFAULT_MEDIA_TYPE[part.type];
}

function filenameFor(part: MediaPart): string | undefined {
	const filename = part.metadata?.filename;
	return typeof filename === "string" ? filename : undefined;
}

function convertMediaPart(part: MediaPart): FilePart {
	return {
		type: "file",
		data: convertPartSource(part.source),
		mediaType: mediaTypeFor(part),
		...(filenameFor(part) ? { filename: filenameFor(part) } : {}),
	};
}

function convertUserContent(content: string | ContentPart[]): UserContent {
	if (typeof content === "string") {
		return content;
	}

	return content.map((part) => {
		switch (part.type) {
			case "text":
				return { type: "text" as const, text: part.text };
			case "image":
			case "document":
			case "audio":
			case "video":
				return convertMediaPart(part);
		}
	});
}

function convertToolResultOutput(
	content: string | ContentPart[],
	error: string | undefined,
): ToolResultPart["output"] {
	const hasContent =
		typeof content === "string" ? content.length > 0 : content.length > 0;

	if (error && !hasContent) {
		return { type: "error-text", value: error };
	}

	if (typeof content === "string") {
		if (error) {
			return {
				type: "content",
				value: [
					{ type: "text", text: error },
					{ type: "text", text: content },
				],
			};
		}

		try {
			return { type: "json", value: JSON.parse(content) };
		} catch {
			return { type: "text", value: content };
		}
	}

	const value: Extract<ToolResultPart["output"], { type: "content" }>["value"] =
		[];

	if (error) {
		value.push({ type: "text", text: error });
	}

	for (const part of content) {
		switch (part.type) {
			case "text":
				value.push({ type: "text", text: part.text });
				break;
			case "image":
			case "document":
			case "audio":
			case "video":
				value.push({
					type: "file",
					data: convertPartSource(part.source),
					mediaType: mediaTypeFor(part),
					...(filenameFor(part) ? { filename: filenameFor(part) } : {}),
				});
				break;
		}
	}

	return { type: "content", value };
}

function parseToolCallInput(argumentsJson: string): unknown {
	try {
		return JSON.parse(argumentsJson);
	} catch {
		return argumentsJson;
	}
}

function convertMessages(
	messages: Message[],
	context: Array<{ description: string; value: string }>,
): {
	instructions: string | undefined;
	messages: ModelMessage[];
} {
	const instructionParts: string[] = [];

	if (context.length > 0) {
		instructionParts.push(
			...context.map((item) => `${item.description}\n${item.value}`),
		);
	}

	const modelMessages: ModelMessage[] = [];
	const toolNames = new Map<string, string>();
	let pendingReasoning: string[] = [];

	const flushReasoning = (parts: Exclude<AssistantContent, string>) => {
		for (const text of pendingReasoning) {
			parts.push({ type: "reasoning", text });
		}
		pendingReasoning = [];
	};

	for (const message of messages) {
		switch (message.role) {
			case "system":
			case "developer":
				instructionParts.push(message.content);
				break;

			case "user":
				modelMessages.push({
					role: "user",
					content: convertUserContent(message.content),
				});
				break;

			case "assistant": {
				const parts: Exclude<AssistantContent, string> = [];
				flushReasoning(parts);

				if (message.content) {
					parts.push({ type: "text", text: message.content });
				}

				for (const toolCall of message.toolCalls ?? []) {
					toolNames.set(toolCall.id, toolCall.function.name);
					parts.push({
						type: "tool-call",
						toolCallId: toolCall.id,
						toolName: toolCall.function.name,
						input: parseToolCallInput(toolCall.function.arguments),
					});
				}

				if (parts.length === 0) {
					break;
				}

				modelMessages.push({
					role: "assistant",
					content:
						parts.length === 1 && parts[0]?.type === "text"
							? parts[0].text
							: parts,
				});
				break;
			}

			case "tool": {
				const toolName = toolNames.get(message.toolCallId);
				if (!toolName) {
					throw new Error(
						`Missing tool name for tool call id "${message.toolCallId}"`,
					);
				}

				modelMessages.push({
					role: "tool",
					content: [
						{
							type: "tool-result",
							toolCallId: message.toolCallId,
							toolName,
							output: convertToolResultOutput(message.content, message.error),
						},
					],
				});
				break;
			}

			case "reasoning":
				pendingReasoning.push(message.content);
				break;

			case "activity":
				// Progress-only; not part of the model prompt.
				break;
		}
	}

	if (pendingReasoning.length > 0) {
		const parts: Exclude<AssistantContent, string> = [];
		flushReasoning(parts);
		modelMessages.push({
			role: "assistant",
			content: parts,
		});
	}

	return {
		instructions:
			instructionParts.length > 0 ? instructionParts.join("\n\n") : undefined,
		messages: modelMessages,
	};
}

export const aiSdk = (options: AiSdkOptions) =>
	({
		id: "ai-sdk",
		generateObject: async ({ outputSchema, messages, context }) => {
			const converted = convertMessages(messages, context);

			const result = await generateText({
				model: options.model,
				output: Output.object({ schema: outputSchema }),
				instructions: converted.instructions,
				messages: converted.messages,
				reasoning: options.reasoning,
				maxOutputTokens: options.maxOutputTokens,
			});

			if (result.finishReason === "length") {
				const { inputTokens, outputTokens, outputTokenDetails } = result.usage;
				throw new ZugferdError(
					`The model stopped before completing the output because it reached its token limit (input: ${inputTokens ?? "?"}, output: ${outputTokens ?? "?"}, reasoning: ${outputTokenDetails?.reasoningTokens ?? "?"}). Increase the model's context length or max output tokens.`,
				);
			}

			try {
				return result.output;
			} catch (error) {
				throw new ZugferdError(
					`The model did not generate any output (finish reason: ${result.finishReason}).`,
					{ cause: error },
				);
			}
		},
	}) satisfies Adapter;
