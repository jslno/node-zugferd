import type { Zugferd, ZugferdOptions } from "node-zugferd";
import { expect, it } from "vitest";

type Entry = {
	label: string;
	data: Record<string, any>;
};

export const validInvoiceTestFactory = <const Opts extends ZugferdOptions>(
	zugferd: Zugferd<Opts>,
	profile: Opts["profiles"][number]["id"],
	input: Entry[],
	fn?: (entry: Entry & { xml: string }) => void | Promise<void>,
) => {
	const invoicer: any = zugferd;

	const test = it.concurrent.each(input);
	test("should generate valid $label", async ({ label, data }) => {
		const invoice = await invoicer.create(profile, data);
		const xml = invoice.toXML();

		await fn?.({ label, data, xml });
		expect(xml).not.toContain("[object Object]");
		expect(() => invoicer.xsd.validate(profile, xml)).not.toThrow();
		await expect(
			invoicer.mustang.validate(profile, xml),
		).resolves.not.toThrow();
	});
};
