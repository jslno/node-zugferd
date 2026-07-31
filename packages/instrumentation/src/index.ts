import type { ZugferdPlugin } from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { SpanStatusCode, trace } from "@opentelemetry/api";
import type { Span } from "@opentelemetry/api";

declare module "@node-zugferd/core" {
	interface ZugferdPluginRegistry<ZugferdOptions, Options> {
		instrumentation: {
			creator: typeof instrumentation;
		};
	}
}

const INSTRUMENTATION_SCOPE = "node_zugferd" as const;
const INSTRUMENTATION_VERSION = NODE_ZUGFERD_VERSION;

export const instrumentation = () => {
	return {
		id: "instrumentation",
		version: NODE_ZUGFERD_VERSION,
		init: () => {
			const endSpanWithError = (span: Span, err: unknown) => {
				span.recordException(err as Error);
				span.setStatus({
					code: SpanStatusCode.ERROR,
					message: String((err as Error)?.message ?? err),
				});
				span.end();
			};

			return {
				options: {
					advanced: {
						instrumentation: {
							span: (name, attributes, fn) => {
								const tracer = trace.getTracer(
									INSTRUMENTATION_SCOPE,
									INSTRUMENTATION_VERSION,
								);

								return tracer.startActiveSpan(name, { attributes }, (span) => {
									try {
										const result = fn();
										if (result instanceof Promise) {
											return result
												.then((value) => {
													span.end();
													return value;
												})
												.catch((err) => {
													endSpanWithError(span, err);
													throw err;
												});
										}
										span.end();
										return result;
									} catch (err) {
										endSpanWithError(span, err);
										throw err;
									}
								});
							},
						},
					},
				},
			};
		},
	} satisfies ZugferdPlugin;
};
