import { zugferdApi } from "./invoicer";

Bun.serve({
	fetch: zugferdApi.handler,
	port: 4000,
});

console.log("Server running on port 4000");
