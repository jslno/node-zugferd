import type { Awaitable } from "@node-zugferd/core";
import type { Adapter } from "./adapter";

export type OCROptions = {
	adapter: Adapter;
	defaultSystemPrompt?: string | (() => Awaitable<string>) | undefined;
	defaultPrompt?: string | (() => Awaitable<string>) | undefined;
	/**
	 * Scale at which PDF pages are rendered before being sent to the model.
	 * `1` renders at 72 DPI. Higher values improve legibility but use more
	 * input tokens (roughly quadratic in the scale).
	 *
	 * @default 2
	 */
	imageScale?: number | undefined;
	generateMessageId?: (() => Awaitable<string>) | undefined;
	generateRunId?: (() => Awaitable<string>) | undefined;
	generateThreadId?: (() => Awaitable<string>) | undefined;
};
