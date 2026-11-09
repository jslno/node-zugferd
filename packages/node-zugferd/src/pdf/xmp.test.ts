import type { ZugferdProfile } from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { buildXmp } from "./xmp";

const profile = {
	id: "minimum",
	dataRelationship: "Data",
	schema: {},
	build() {},
	extensionSchema: {
		uri: "urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#",
		namespace: "fx",
		type: "INVOICE",
		conformanceLevel: "MINIMUM",
		fileName: "factur-x.xml",
		version: "1.0",
	},
} as ZugferdProfile;

async function document() {
	const doc = await PDFDocument.create();
	doc.setTitle(`A & B <"'>`);
	doc.setAuthor("Ada & Bob");
	doc.setProducer("Press");
	doc.setCreator("Custom tool");
	doc.setCreationDate(new Date("2020-03-05T00:00:00.000Z"));
	doc.setModificationDate(new Date("2020-03-06T01:02:03.456Z"));
	return doc;
}

describe("buildXmp", () => {
	it("writes PDF/A identification and escaped document info", async () => {
		const xmp = buildXmp(await document(), profile);

		expect(xmp.startsWith(`<?xpacket begin="`)).toBe(true);
		expect(xmp.endsWith(`<?xpacket end="w"?>`)).toBe(true);
		expect(xmp).toContain("<pdfaid:part>3</pdfaid:part>");
		expect(xmp).toContain("<pdfaid:conformance>B</pdfaid:conformance>");
		expect(xmp).toContain("<dc:format>application/pdf</dc:format>");
		expect(xmp).toContain("<pdf:PDFVersion>1.7</pdf:PDFVersion>");
		expect(xmp).toContain("A &amp; B &lt;&quot;&apos;&gt;");
		expect(xmp).toContain("Ada &amp; Bob");
		expect(xmp).toContain("<pdf:Producer>\n            Press");
		expect(xmp).toContain("<xmp:CreatorTool>\n            Custom tool");
		expect(xmp).toContain("<xmp:CreateDate>\n            2020-03-05T00:00:00Z");
		expect(xmp).toContain("<xmp:ModifyDate>\n            2020-03-06T01:02:03Z");
	});

	it("uses the node-zugferd creator when the document has none", async () => {
		const doc = await PDFDocument.create();
		doc.setCreator("");
		const xmp = buildXmp(doc, profile);

		expect(xmp).toContain(
			`node-zugferd@v${NODE_ZUGFERD_VERSION || "1.0.0"} &lt;https://github.com/jslno/node-zugferd&gt;`,
		);
		expect(xmp).toContain("<dc:title>");
		expect(xmp).not.toContain("&amp;");
	});

	it("emits the Factur-X extension fields", async () => {
		const xmp = buildXmp(await document(), profile);

		expect(xmp).toContain(
			'xmlns:fx="urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#"',
		);
		expect(xmp).toContain("<fx:DocumentType>INVOICE</fx:DocumentType>");
		expect(xmp).toContain(
			"<fx:DocumentFileName>factur-x.xml</fx:DocumentFileName>",
		);
		expect(xmp).toContain("<fx:Version>1.0</fx:Version>");
		expect(xmp).toContain("<fx:ConformanceLevel>MINIMUM</fx:ConformanceLevel>");
	});

	it("escapes a custom namespace and selects a document type", async () => {
		const custom = {
			...profile,
			extensionSchema: {
				uri: `urn:test?"`,
				namespace: "a&b",
				fieldNameMap: {
					type: "Kind",
					fileName: "File",
					version: "Ver",
					conformanceLevel: "Level",
				},
				type: ["INVOICE", "ORDER"],
				conformanceLevel: "EN 16931",
				fileName: "factur-x.xml",
				version: "1.0",
			},
		} as ZugferdProfile;

		const chosen = buildXmp(await document(), custom, { type: "ORDER" });
		const fallback = buildXmp(await document(), custom);

		expect(chosen).toContain(`xmlns:a&amp;b="urn:test?&quot;"`);
		expect(chosen).toContain("<a&amp;b:Kind>ORDER</a&amp;b:Kind>");
		expect(fallback).toContain("<a&amp;b:Kind>INVOICE</a&amp;b:Kind>");
		expect(chosen).toContain("<a&amp;b:Level>EN 16931</a&amp;b:Level>");
	});

	it("omits extension fields that have no value", async () => {
		const sparse = {
			...profile,
			extensionSchema: {
				...profile.extensionSchema,
				version: "",
			},
		} as unknown as ZugferdProfile;
		const xmp = buildXmp(await document(), sparse);

		expect(xmp).not.toContain("DocumentVersion");
		expect(xmp).not.toContain("<fx:Version>");
		expect(xmp).toContain("<fx:DocumentType>INVOICE</fx:DocumentType>");
	});
});
