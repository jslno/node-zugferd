import { readFile } from "node:fs/promises";
import path from "node:path";
import { arrayable, generator } from "../generator";

const source = path.resolve(__dirname, "./source.xml");

export default generator({
	id: "vat-id",
	definition: {
		key: {
			type: "string",
		},
		name: {
			type: "string",
		},
		value: {
			type: "string",
		},
	},
	accessorKey: "key",
	accessorValue: "value",
	exec: async (ctx) => {
		const xml = await readFile(source, "utf-8");
		const entries = arrayable(ctx.parseXML(xml).entries.entry);

		return entries.map((entry) => {
			const name = ctx.getTextNode(entry.name);
			const value = ctx.getTextNode(entry.value);

			return {
				key: ctx.toScreamingSnakeCase(name!),
				name,
				value,
			};
		});
	},
});
