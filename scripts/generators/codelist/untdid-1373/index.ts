import { defineParser } from "../utils";

export const untdid1373 = defineParser(async (ctx) => {
	const data = await ctx.parseUnclList("1373");

	return {
		packageRoot: "./packages/codelists/untdid-1373",
		data: data.map((entry) => ({
			...entry,
			key: ctx.toScreamingSnakeCase(entry.name),
		})),
	};
});
