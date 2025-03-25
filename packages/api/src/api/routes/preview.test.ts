import { getTestInstance } from "../../test-utils/test-instance";
import { describe, expect, it } from "vitest";
import { renderToString } from "react-dom/server";
import { signToken } from "../../utils/token";

describe("preview", async () => {
	const { client, invoicer, data } = await getTestInstance();

	it("should generate preview from template", async () => {
		const ctx = await invoicer.apiContext;
		const token = signToken(ctx);
		const res = await client("@post/preview", {
			body: {
				data,
			},
			auth: {
				type: "Bearer",
				token,
			},
			onResponse: async (ctx) => {
				expect(ctx.response.headers.get("Content-Type")).toEqual("text/html");
			},
		});

		expect(res.data).toEqual(
			"<!DOCTYPE html>" + renderToString(ctx.options.template({ data })),
		);
	});

	it("should not generate preview without authorization", async () => {
		const res = await client("@post/preview", {
			body: {
				data,
			},
		});

		expect(res.error?.status).toEqual(401);
	});
});
