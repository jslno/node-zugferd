import { getTestInstance } from "../../test-utils/test-instance";
import { describe, expect, it } from "vitest";
import { renderer } from "../../renderer/react";

describe("preview", async () => {
	const { client, invoicer, data } = await getTestInstance();

	it("should generate preview from template", async () => {
		const r = await invoicer.api.preview({
			body: {
				template: "default",
				data,
			},
		});

		expect(r.headers.get("Content-Type")).toEqual("text/html");
		const ctx = await invoicer.apiContext;
		expect(await r.text()).toEqual(
			await renderer.render(
				{
					data,
					...ctx,
				},
				ctx.options.template.default.component,
			),
		);
	});

	it("should not generate preview without authorization", async () => {
		const res = await client("@post/preview", {
			body: {
				template: "default",
				data,
			},
		});

		expect(res.error?.status).toEqual(401);
	});
});
