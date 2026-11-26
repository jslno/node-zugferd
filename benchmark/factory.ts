import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
} from "@node-zugferd/core/data-types";
import type { ZugferdProfile } from "node-zugferd";
import { zugferd } from "node-zugferd";
import { PDFDocument } from "pdf-lib";
import type { BenchRunOptions } from "vitest";
import { describe, test } from "vitest";

export function benchProfile<
	S extends
		| BaseSchema<unknown, unknown, BaseIssue<unknown>>
		| BaseSchemaAsync<unknown, unknown, BaseIssue<unknown>>,
>(
	profile: ZugferdProfile<S>,
	data: Record<
		string,
		{
			input: S["~types"] extends { input: infer I } ? I : any;
			options?: BenchRunOptions | undefined;
		}
	>,
) {
	describe(profile.id, async () => {
		const invoicer = zugferd({
			profiles: [profile],
		});
		const blankPdf = await PDFDocument.create();

		test.for(
			Object.entries(data).map(([label, { input, options }]) => ({
				label,
				input,
				options,
			})),
		)("$label", async ({ label, input, options }, { bench }) => {
			await bench(label, async () => {
				const invoice = await invoicer.create(profile.id, input);
				const pdf = await invoice.toPDF(blankPdf);
				await pdf.save();
			}).run({
				time: 5_000,
				warmupTime: 1_000,
				iterations: 100,
				...(options ?? {}),
			});
		});
	});
}
