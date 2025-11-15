import { MINIMUM } from "@node-zugferd/minimum";
import { MINIMUM_Buchungshilfe } from "@node-zugferd/test-utils/invoices/valid/MINIMUM_Buchungshilfe";
import { mustangValidator } from "@node-zugferd/validator-mustang";
import { createZugferd } from "node-zugferd";
import { describe, expect, it } from "vitest";

describe("vanilla-node", () => {
	const zugferd = createZugferd({
		profile: MINIMUM,
		validator: mustangValidator(),
	});

	it("should create a valid minimum invoice", async () => {
		const invoice = zugferd.create(MINIMUM_Buchungshilfe);

		await expect(invoice.toXML()).resolves.toBeTypeOf("string");
	});
});
