import type {
	BaseIssue,
	BaseSchema,
	BaseSchemaAsync,
} from "@node-zugferd/core/data-types";
import type { ZugferdProfile } from "node-zugferd";
import { zugferd } from "node-zugferd";
import { PDFDocument } from "pdf-lib";
import type { BenchOptions } from "vitest";
import { bench, describe } from "vitest";

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
			options?: BenchOptions | undefined;
		}
	>,
) {
	describe(profile.id, async () => {
		const invoicer = zugferd({
			profiles: [profile],
		});
		const blankPdf = await PDFDocument.create();

		for (const [label, { input, options }] of Object.entries(data)) {
			bench(
				label,
				async () => {
					const invoice = await invoicer.create(profile.id, input);
					const pdf = await invoice.toPDF(blankPdf);
					await pdf.save();
				},
				options,
			);
		}
	});
}
