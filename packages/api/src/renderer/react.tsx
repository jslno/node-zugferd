// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React from "react";
import { renderToString } from "react-dom/server";
import type { Renderer } from "../types/renderer";

export const renderer = ((ctx) =>
	renderToString(<ctx.options.template {...ctx.data} />)) satisfies Renderer;
