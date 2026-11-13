import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { data } from "./data";
import { invoicer } from "./invoicer";

async function main() {
	const invoice = await invoicer.create("basic", data);

	const locales = ["de", "en", "fr"] as const;

	await mkdir(path.join(__dirname, "out"), { recursive: true });

	await Promise.all(
		locales.map(async (locale) => {
			const dest = path.join(__dirname, "out", `invoice.${locale}.pdf`);
			const pdf = await invoice.toPDF(invoicer.template("default", { locale }));
			await writeFile(dest, await pdf.save());
		}),
	);

	console.log("🎉 Invoices generated successfully!");
	process.exit(0);
}

void main().catch((error) => {
	console.error(error);
	process.exit(1);
});
