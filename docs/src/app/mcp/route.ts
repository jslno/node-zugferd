import { mcpHandler } from "@/lib/mcp";

const handler = (request: Request) => mcpHandler.fetch(request);

export const GET = handler;
export const POST = handler;
export const DELETE = handler;
