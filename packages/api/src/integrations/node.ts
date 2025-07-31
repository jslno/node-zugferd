import type { ZugferdApi } from "..";
import { toNodeHandler as toNode } from "better-call/node";

export const toNodeHandler = (
	api:
		| {
				handler: ZugferdApi["handler"];
		  }
		| ZugferdApi["handler"],
) => {
	return "handler" in api ? toNode(api.handler) : toNode(api);
};
