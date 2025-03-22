import { invoicer } from "./invoicer";

Bun.serve({
	fetch: invoicer.apiHandler,
	port: 4000,
});

console.log("Server running on port 4000");
