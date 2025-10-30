import type {
	InterpolateSchemaContext,
	Interpolator,
	Schema,
} from "@node-zugferd/core";
import { createEnvelope, type EnvelopeInput } from "./envelope";

export function createInterpolator<S extends Schema>(
	fn: (ctx: InterpolateSchemaContext<S>) => EnvelopeInput,
): Interpolator<S> {
	return (ctx) => {
		return createEnvelope(fn(ctx));
	};
}
