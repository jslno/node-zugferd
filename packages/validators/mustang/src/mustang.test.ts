import type { Profile } from "@node-zugferd/core";
import { createLogger } from "@node-zugferd/core/utils";
import { EN16931_Einfach_cii } from "@node-zugferd/test-utils/invoices/xml/valid/EN16931_Einfach.cii.xml";
import { describe, expect, it } from "vitest";
import { mustangValidator } from ".";

// TODO:
describe("mustang validator", async () => {
	const validator = await mustangValidator();

	it("should catch validation errors", async () => {});

	it("should pass valid documents", async () => {
		await expect(
			validator.run(EN16931_Einfach_cii, {
				profile: {
					id: "en16931",
				} as Profile,
				logger: createLogger({
					level: "debug",
				}),
				hooks: {} as any,
				options: {} as any,
			}),
		).resolves.toHaveReturned();
	});

	it("should handle unsupported profiles gracefully", async () => {});
});
