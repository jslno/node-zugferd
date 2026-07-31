import { defineParser } from "../utils";

export const untdid1225 = defineParser(async (ctx) => {
	const data = await ctx.parseUnclList("1225");

	return {
		packageRoot: "./packages/codelists/untdid-1225",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
