import { PDFDocument } from "pdf-lib";
import { getTestInstance } from "../../test-utils/test-instance";
import { describe, expect, it } from "vitest";
import { APIError } from "better-call";

describe("preview", async () => {
	const { api, data } = await getTestInstance({
		authorize: async (ctx) => {
			const user = ctx.getHeader("X-User");

			return user === "1";
		},
	});

	it("should generate a pdf from a template", async () => {
		const response = await api.api.preview({
			body: {
				template: "default",
				data,
			},
			headers: {
				"X-User": "1",
			},
		});

		expect(response.headers.get("Content-Type")).toEqual(
			"application/pdf; charset=binary",
		);

		await expect(async () => {
			PDFDocument.load(await response.arrayBuffer(), {
				throwOnInvalidObject: true,
			});
		}).not.toThrow();
	});

	it("should not generate a pdf when unauthorized", async () => {
		let error: Error | null = null;
		try {
			await api.api.preview({
				body: {
					template: "default",
					data,
				},
				headers: {
					"X-User": "2",
				},
			});
		} catch (err) {
			if (err instanceof Error) {
				error = err;
			}
		}

		expect(error).toBeInstanceOf(APIError);
		expect((error as APIError).statusCode).toEqual(401);
	});
});
