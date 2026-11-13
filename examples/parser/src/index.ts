import { readFile } from "node:fs/promises";
import path from "node:path";
import { invoicer } from "./invoicer";

// import { toInput } from "@node-zugferd/parser";

async function main() {
	const pdf = await readFile(path.join(__dirname, "basic.pdf"));
	const parsed = await invoicer.parse("basic", pdf);

	console.log(`\nInvoice #${parsed.data.exchangedDocument?.invoiceNumber}:\n`);
	console.log(JSON.stringify(parsed.data, null, 2));

	// You can also turn the parsed data back into an invoice
	// const invoice = await invoicer.create(parsed.profile.id, toInput(parsed));
}

main().catch(console.error);
