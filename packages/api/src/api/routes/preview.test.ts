import { getTestInstance } from "../../test-utils/test-instance";
import { describe, expect, it } from "vitest";
import { renderer } from "../../renderer/react";

describe("preview", async () => {
	const { client, invoicer, data } = await getTestInstance();

	it("should generate preview from template", async () => {
		const r = await invoicer.api.preview({
			body: {
				data,
			},
		});

		expect(r.headers.get("Content-Type")).toEqual("text/html");
		expect(await r.text()).toEqual(
			renderer.render({
				data,
				...(await invoicer.apiContext),
			}),
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
