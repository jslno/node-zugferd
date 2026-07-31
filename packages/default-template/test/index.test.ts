import { describe, test } from "vitest";
import { invoicer } from "./invoicer";
import { data } from "./data";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

describe("default-template", () => {
	test("generate invoice", async () => {
		const invoice = await invoicer.create("en-16931", data);

		const pdf = await (
			await invoice.toPDF(
				invoicer.template({
					locale: "de",
				}),
			)
		).save();

		await writeFile(
			join(dirname(fileURLToPath(import.meta.url)), "invoice.pdf"),
			pdf,
		);
	});
});
