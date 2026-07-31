import { defineParser } from "../utils";

export const untdid4451 = defineParser(async (ctx) => {
	const data = await ctx.parseUnclList("4451");

	return {
		packageRoot: "./packages/codelists/untdid-4451",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
