import { describe, expect, it } from "vitest";
import { getTestInstance } from "../test-utils/test-instance";

describe("disabled paths", async () => {
	const { client, data } = await getTestInstance({
		disabledPaths: ["/preview"],
	});

	it("should return 404 for disabled paths", async () => {
		const { error } = await client("@post/preview", {
			body: {
				template: "default",
				data,
			},
		});
		expect(error?.status).toBe(404);
	});
});
