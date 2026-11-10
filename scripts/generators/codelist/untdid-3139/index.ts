import { defineParser } from "../utils";

export const untdid3139 = defineParser(async (ctx) => {
	const data = await ctx.parseUnclList("3139");

	return {
		packageRoot: "./packages/codelists/untdid-3139",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
