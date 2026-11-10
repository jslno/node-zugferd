import { defineParser } from "../utils";

export const untdid5153 = defineParser(async (ctx) => {
	const data = await ctx.parseUnclList("5153");

	return {
		packageRoot: "./packages/codelists/untdid-5153",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
