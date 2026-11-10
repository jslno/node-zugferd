import { defineParser } from "../utils";

export const untdid4053 = defineParser(async (ctx) => {
	const data = await ctx.parseUnclList("4053");

	return {
		packageRoot: "./packages/codelists/untdid-4053",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
