import { defineParser } from "../utils";

export const untdid4461 = defineParser(async (ctx) => {
	const data = await ctx.parseUnclList("4461");

	return {
		packageRoot: "./packages/codelists/untdid-4461",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
