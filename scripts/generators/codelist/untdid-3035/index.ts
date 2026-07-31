import { defineParser } from "../utils";

export const untdid3035 = defineParser(async (ctx) => {
	const data = await ctx.parseUnclList("3035");

	return {
		packageRoot: "./packages/codelists/untdid-3035",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
