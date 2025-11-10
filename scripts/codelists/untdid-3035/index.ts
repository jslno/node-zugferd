import { generator } from "../generator";

const source = "https://service.unece.org/trade/untdid/d96a/uncl/uncl3139.htm";

export default generator({
	id: "untdid-3139",
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
		description: {
			type: "string",
		},
	},
	accessorKey: "key",
	accessorValue: "value",
	exec: async (ctx) => ctx.parseUneceList(source),
});
