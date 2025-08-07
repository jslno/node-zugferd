import { describe, expect, it } from "vitest";
import { getTestInstance } from "../../test-utils/test-instance";
import { PDFDocument } from "pdf-lib";

describe(
	"create",
	{
		timeout: 10_000,
	},
	async () => {
		const { invoicer, client, data } = await getTestInstance({
			authorize: async (ctx) => {
				const user = ctx.getHeader("X-User");

				return user === "1";
			},
		});

		const context = (await invoicer.context);

		it("should generate valid pdf/a3-b invoice", async () => {
			const res = await client("@post/create", {
				body: {
					template: "default",
					data,
				},
				headers: {
					"X-User": "1",
				},
				onResponse: async (ctx) => {
					expect(ctx.response.headers.get("Content-Type")).toEqual(
						"application/pdf; charset=binary",
					);
				},
			});

			const pdfA = await res.data?.arrayBuffer();
			expect(pdfA).toBeDefined();
			if (!pdfA) {
				return;
			}

			const isPdfA3b = (input: ArrayBuffer) => {
				const text = new TextDecoder("utf-8").decode(input);

				return (
					text.includes("<pdfaid:part>3</pdfaid:part>") &&
					text.includes("<pdfaid:conformance>B</pdfaid:conformance>")
				);
			};

			expect(isPdfA3b(pdfA)).toBe(true);

			const doc = await PDFDocument.load(pdfA!);
			const attachments = context.pdf.getAttachments(doc);
			const facturXFile = attachments.find(
				(val) => val.name === invoicer.options.profile.documentFileName,
			);

			expect(facturXFile).toBeDefined();

			const facturX = new TextDecoder("utf-8").decode(facturXFile?.data);

			const invoice = await invoicer.create(data);

			expect(facturX).toEqual(await invoice.toXML());
		});

		it("should not generate invoice when unauthorized", async () => {
			const res = await client("@post/create", {
				body: {
					template: "default",
					data,
				},
				headers: {
					"X-User": "2",
				},
			});

			expect(res.error?.status).toEqual(401);
		});
	},
);
