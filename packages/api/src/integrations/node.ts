import type { ZugferdApi } from "..";
import { toNodeHandler as toNode } from "better-call/node";

export const toNodeHandler = (
	api:
		| {
				apiHandler: ZugferdApi["apiHandler"];
		  }
		| ZugferdApi["apiHandler"],
) => {
	return "apiHandler" in api ? toNode(api.apiHandler) : toNode(api);
};
