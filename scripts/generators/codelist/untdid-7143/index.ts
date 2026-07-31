import { defineParser } from "../utils";

export const untdid7143 = defineParser(async (ctx) => {
	const data = await ctx.parseUnclList("7143");

	return {
		packageRoot: "./packages/codelists/untdid-7143",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
