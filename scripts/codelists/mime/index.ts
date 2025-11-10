import { readFile } from "node:fs/promises";
import path from "node:path";
import { arrayable, generator } from "../generator";

const source = path.resolve(__dirname, "./source.xml");

export default generator({
	id: "mime",
	definition: {
		value: {
			type: "string",
		},
	},
	accessorKey: "value",
	accessorValue: "value",
	exec: async (ctx) => {
		const xml = await readFile(source, "utf-8");
		const entries = arrayable(ctx.parseXML(xml).entries.entry);

		return entries.map((entry) => {
			const value = ctx.getTextNode(entry.value);

			return {
				value,
			};
		});
	},
});
