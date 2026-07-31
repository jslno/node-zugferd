import { defineParser } from "../utils";

export const untdid7161 = defineParser(async (ctx) => {
	const data = await ctx.parseUnclList("7161");

	return {
		packageRoot: "./packages/codelists/untdid-7161",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
