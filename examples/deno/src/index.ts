/// <reference types="deno" />

import { data } from "./data.ts";
import { invoicer } from "./invoicer.ts";

async function main() {
	const invoice = await invoicer.create("basic", data);

	console.log(invoice.toXML());
}

void main().catch((error) => {
	console.error(error);
	process.exit(1);
});
