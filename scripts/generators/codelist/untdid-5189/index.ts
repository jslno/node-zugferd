import { defineParser } from "../utils";

export const untdid5189 = defineParser(async (ctx) => {
	const data = await ctx.parseUnclList("5189");

	return {
		packageRoot: "./packages/codelists/untdid-5189",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
