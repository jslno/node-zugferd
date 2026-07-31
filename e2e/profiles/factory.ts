import type { Zugferd, ZugferdOptions } from "node-zugferd";
import { describe, expect, test } from "vitest";

type Entry = {
	label: string;
	data: Record<string, any>;
	config?:
		| {
				type: string;
		  }
		| undefined;
};

export const validInvoiceTestFactory = <const Opts extends ZugferdOptions>(
	zugferd: Zugferd<Opts>,
	profile: Opts["profiles"][number]["id"],
	input: Entry[],
	cfg?: {
		skipXSDValidation?: boolean | undefined;
		skipMustangValidation?: boolean | undefined;
	},
) => {
	const invoicer: any = zugferd;

	describe.each(input)("should generate valid $label", async ({
		data,
		config,
	}) => {
		const invoice = await invoicer.create(profile, data, config);
		const xml = invoice.toXML();

		test("should not contain object string representation", () => {
			expect(xml).not.toContain("[object Object]");
		});

		test
			.skipIf(cfg?.skipXSDValidation === true)
			.concurrent("should validate against XSD schema", async () => {
				await expect(
					invoicer.xsd.validate(profile, xml),
				).resolves.not.toThrow();
			});

		test
			.skipIf(cfg?.skipMustangValidation === true)
			.concurrent("should validate against Mustang validator", async () => {
				await expect(
					invoicer.mustang.validate(profile, xml),
				).resolves.not.toThrow();
			});
	});
};
