import { defineParser } from "../utils";

export const untdid2005 = defineParser(async (ctx) => {
	const data = await ctx.parseUnclList("2005");

	return {
		packageRoot: "./packages/codelists/untdid-2005",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
