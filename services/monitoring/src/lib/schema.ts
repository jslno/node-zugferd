import * as z from "zod";

export const updateSchema = z.object({
	isUpdate: z.boolean(),
	confidence: z.number().min(0).max(1),
	zugferdVersion: z.string().nullable(),
	facturXVersion: z.string().nullable(),
	releaseDate: z.iso.date(),
	summary: z.object({
		title: z.string(),
		description: z.string(),
	}),
	changes: z.array(
		z.object({
			title: z.string(),
			shortDescription: z.string(),
			type: z.enum([
				"Added",
				"Changed",
				"Removed",
				"Fixed",
				"Deprecated",
				"Other",
			]),
		}),
	),
	affectedProfiles: z.array(z.string()),
	references: z.array(z.httpUrl()),
});

export type Update = z.output<typeof updateSchema>;
