import { createEnvelope, type EnvelopeInput } from "./envelope";
import type {
	Interpolator,
	Schema,
	InterpolateSchemaContext,
} from "@node-zugferd/core";

export function createInterpolator<S extends Schema>(
	fn: (ctx: InterpolateSchemaContext<S>) => EnvelopeInput,
): Interpolator<S> {
	return (ctx) => {
		return createEnvelope(fn(ctx));
	};
}
