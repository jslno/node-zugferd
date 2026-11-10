import { defineParser } from "../utils";

export const untdid4055 = defineParser(async (ctx) => {
	const data = await ctx.parseUnclList("4055");

	return {
		packageRoot: "./packages/codelists/untdid-4055",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
