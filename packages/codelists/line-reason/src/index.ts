import type { Codelist } from "@node-zugferd/core";
import { registerCodelist } from "@node-zugferd/data-types";

const lineReason = [
	{
		value: "DETAIL",
		name: "Regular item position (standard case)",
		key: "REGULAR_ITEM_POSITION_STANDARD_CASE",
	},
	{ value: "GROUP", name: "Subtotal or group", key: "SUBTOTAL_OR_GROUP" },
	{
		value: "INFORMATION",
		name: "For information only",
		key: "FOR_INFORMATION_ONLY",
	},
] as const satisfies Codelist;

declare module "@node-zugferd/core" {
	interface ZugferdCodelistRegistry {
		lineReason: typeof lineReason;
	}
}
registerCodelist("lineReason", lineReason);

export default lineReason;
