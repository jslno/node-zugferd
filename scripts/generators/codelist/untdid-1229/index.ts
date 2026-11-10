import { defineParser } from "../utils";

export const untdid1229 = defineParser(async (ctx) => {
	const data = await ctx.parseUnclList("1229");

	return {
		packageRoot: "./packages/codelists/untdid-1229",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
