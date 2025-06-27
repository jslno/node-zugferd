import { describe, expect } from "vitest";
import { getTestInstance } from "../../test-utils/test-instance";
import { BASIC } from "node-zugferd/profile";

describe("Origin Check", async (it) => {
	const { customFetchImpl, client } = await getTestInstance(
		{
			trustedOrigins: [
				"http://localhost:5000",
				"https://trusted.com",
				"*.my-site.com",
			],
			advanced: {
				disableCSRFCheck: false,
			},
		},
		{
			zugferdOptions: {
				profile: BASIC,
			},
		},
	);

	it("should allow trusted origins", async () => {
		const res = await client("/ok", {
			customFetchImpl,
			headers: {
				origin: "http://localhost:3000",
			},
		});

		expect(res.data?.ok).toEqual(true);
	});

	it("should not allow untrusted origins", async () => {
		const res = await client("/ok", {
			customFetchImpl,
			headers: {
				origin: "http://malicious.com",
			},
		});

		expect(res.error?.status).toBe(403);
		expect(res.error?.message).toEqual("Invalid origin");
	});
});
