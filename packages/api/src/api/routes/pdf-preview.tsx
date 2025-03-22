// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React from "react";
import { renderToString } from "react-dom/server";
import { createApiEndpoint } from "../call";

export const pdfPreview = createApiEndpoint(
	"/pdf-preview",
	{
		method: "GET",
	},
	async (ctx) => {
		return new Response(renderToString(<ctx.context.options.template />), {
			headers: new Headers({
				"Content-Type": "text/html",
			}),
		});
	},
);
