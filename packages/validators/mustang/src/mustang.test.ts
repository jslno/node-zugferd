import type { Profile } from "@node-zugferd/core";
import { ZugferdValidationError } from "@node-zugferd/core/error";
import { createLogger } from "@node-zugferd/core/utils";
import { facturXInvalidXMLEncodingAttribute } from "@node-zugferd/test-utils/invoices/xml/invalid/factur-x-invalid-xml-encoding-attribute.xml";
import { EN16931_Einfach_cii } from "@node-zugferd/test-utils/invoices/xml/valid/EN16931_Einfach.cii.xml";
import { describe, expect, it } from "vitest";
import { mustangValidator } from ".";

describe("mustang validator", async () => {
	const validator = await mustangValidator();

	it("should catch validation errors", async () => {
		await expect(
			validator.run(facturXInvalidXMLEncodingAttribute, {
				profile: {
					id: "en16931",
				} as Profile,
				logger: createLogger({
					level: "debug",
				}),
				hooks: {} as any,
				options: {} as any,
			}),
		).rejects.toThrowError(ZugferdValidationError);
	});

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
		).resolves.toBeUndefined();
	});

	it("should handle unsupported profiles gracefully", async () => {
		await expect(
			validator.run(EN16931_Einfach_cii, {
				profile: {
					id: "unsupported-profile",
				} as Profile,
				logger: createLogger({
					level: "debug",
				}),
				hooks: {} as any,
				options: {} as any,
			}),
		).resolves.toBeUndefined();
	});
});
