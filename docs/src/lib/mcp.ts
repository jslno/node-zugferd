import { createMcpHandler, McpServer } from "@modelcontextprotocol/server";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { registerSearchTool, registerSourceTools } from "fumadocs-core/mcp";
import { search } from "@/lib/search";
import { llms, source } from "@/lib/source";

export const mcpHandler = createMcpHandler(() => {
	const mcp = new McpServer(
		{
			name: "node-zugferd",
			title: "node-zugferd MCP",
			description: "node-zugferd MCP server",
			version: NODE_ZUGFERD_VERSION,
			icons: [
				{
					src: "https://node-zugferd.jsolano.de/icon/dark.png",
					mimeType: "image/png",
					theme: "dark",
				},
				{
					src: "https://node-zugferd.jsolano.de/icon/light.png",
					mimeType: "image/png",
					theme: "light",
				},
			],
			websiteUrl: "https://node-zugferd.jsolano.de",
		},
		// the tools never change, a stream to watch them would hold a serverless function open
		{ capabilities: { tools: { listChanged: false } } },
	);

	registerSearchTool(mcp, search);
	registerSourceTools(mcp, source, llms);

	return mcp;
});
