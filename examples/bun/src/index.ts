import { data } from "./data";
import { invoicer } from "./invoicer";

async function main() {
	const invoice = await invoicer.create("basic", data);

	console.log(invoice.toXML());
}

void main().catch((error) => {
	console.error(error);
	process.exit(1);
});
