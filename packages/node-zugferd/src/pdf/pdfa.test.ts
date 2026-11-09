import { inflateSync } from "node:zlib";
import type { ZugferdProfile } from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import {
	PDFArray,
	PDFDict,
	PDFDocument,
	PDFHexString,
	PDFName,
	PDFNumber,
	PDFRawStream,
	PDFString,
} from "pdf-lib";
import { describe, expect, it } from "vitest";
import { COLOR_PROFILE } from "./color-profile";
import { toPdfA } from "./pdfa";

const profile = {
	id: "minimum",
	dataRelationship: "Data",
	schema: {},
	build() {},
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "MINIMUM",
		fileName: "factur-x.xml",
		version: "1.0",
	},
} as ZugferdProfile;

async function blank() {
	const pdf = await PDFDocument.create();
	pdf.addPage();
	return pdf;
}

function decoded(stream: PDFRawStream) {
	const contents = stream.getContents();
	const filter = String(stream.dict.get(PDFName.of("Filter")));
	return filter.includes("FlateDecode") ? inflateSync(contents) : contents;
}

function bytesOf(pdf: PDFDocument, ref: unknown) {
	const stream = pdf.context.lookup(ref as never);
	expect(stream).toBeInstanceOf(PDFRawStream);
	return decoded(stream as PDFRawStream);
}

function textOf(pdf: PDFDocument, ref: unknown) {
	return new TextDecoder().decode(bytesOf(pdf, ref));
}

describe("toPdfA", () => {
	it("returns the same document and loads bytes, a buffer, or a base64 string", async () => {
		const original = await blank();
		original.setTitle("Same");
		const saved = await original.save();

		expect(await toPdfA(profile, original)).toBe(original);
		expect((await toPdfA(profile, saved)).getTitle()).toBe("Same");
		const bytes = new ArrayBuffer(saved.byteLength);
		new Uint8Array(bytes).set(saved);
		expect((await toPdfA(profile, bytes)).getPageCount()).toBe(1);
		expect(
			(
				await toPdfA(profile, Buffer.from(saved).toString("base64"))
			).getPageCount(),
		).toBe(1);
	});

	it("fills document info and embeds XMP metadata", async () => {
		const pdf = await blank();
		pdf.setTitle("Invoice");
		pdf.setAuthor("Ada");
		pdf.setCreator("");
		pdf.setCreationDate(new Date("2020-03-05T00:00:00.000Z"));
		const before = Date.now();

		await toPdfA(profile, pdf, {
			metadata: {
				producer: "Press",
				subject: "Monthly",
			},
		});

		expect(pdf.getProducer()).toBe("Press");
		expect(pdf.getSubject()).toBe("Monthly");
		expect(pdf.getCreator()).toBe(
			`node-zugferd@v${NODE_ZUGFERD_VERSION || "1.0.0"} <https://github.com/jslno/node-zugferd>`,
		);
		expect(pdf.getCreationDate()?.toISOString()).toBe(
			"2020-03-05T00:00:00.000Z",
		);
		expect(
			Math.abs(pdf.getModificationDate()!.getTime() - before),
		).toBeLessThan(2000);

		const xmp = textOf(pdf, pdf.catalog.get(PDFName.of("Metadata")));
		expect(xmp).toContain("<pdfaid:part>3</pdfaid:part>");
		expect(xmp).toContain("<fx:DocumentType>INVOICE</fx:DocumentType>");
		expect(xmp).toContain("Invoice");
		expect(xmp).toContain("Press");
		expect(xmp).toContain("2020-03-05T00:00:00Z");
	});

	it("keeps an existing creator unless metadata overrides it", async () => {
		const existing = await blank();
		existing.setCreator("Already there");
		await toPdfA(profile, existing);
		expect(existing.getCreator()).toBe("Already there");

		const override = await blank();
		override.setCreator("Already there");
		await toPdfA(profile, override, { metadata: { creator: "Override" } });
		expect(override.getCreator()).toBe("Override");
	});

	it("identifies the document from the subject present before metadata is applied", async () => {
		const pdf = await blank();
		pdf.setSubject("Invoice");
		await toPdfA(profile, pdf, { metadata: { subject: "Replaced" } });

		const hash = await crypto.subtle.digest(
			"SHA-256",
			new TextEncoder().encode("Invoice"),
		);
		const expected = [...new Uint8Array(hash)]
			.map((byte) => byte.toString(16).padStart(2, "0"))
			.join("");
		const id = pdf.context.trailerInfo.ID as PDFArray;
		const first = id.lookup(0) as PDFHexString;

		expect(first).toBeInstanceOf(PDFHexString);
		expect(first.asString().toLowerCase()).toBe(expected);
		expect(id.get(0)).toBe(id.get(1));
		expect(pdf.getSubject()).toBe("Replaced");
	});

	it("marks the catalog, adds a structure tree, and embeds the sRGB profile", async () => {
		const pdf = await toPdfA(profile, await blank());
		const markInfo = pdf.catalog.lookup(PDFName.of("MarkInfo"), PDFDict);
		const tree = pdf.catalog.lookup(PDFName.of("StructTreeRoot"), PDFDict);
		const intents = pdf.catalog.lookup(PDFName.of("OutputIntents"), PDFArray);
		const intent = pdf.context.lookup(intents.get(0)!) as PDFDict;
		const profileBytes = bytesOf(
			pdf,
			intent.get(PDFName.of("DestOutputProfile")),
		);

		expect(String(markInfo.get(PDFName.of("Marked")))).toBe("true");
		expect(String(tree.get(PDFName.of("Type")))).toBe("/StructTreeRoot");
		expect(String(intent.get(PDFName.of("S")))).toBe("/GTS_PDFA1");
		expect(
			String(intent.get(PDFName.of("OutputConditionIdentifier"))),
		).toContain("sRGB");
		expect([...profileBytes]).toEqual([...COLOR_PROFILE]);
	});

	it("sets the print flag on link annotations only", async () => {
		const pdf = await blank();
		const page = pdf.getPage(0);
		const link = pdf.context.register(
			pdf.context.obj({
				Type: "Annot",
				Subtype: "Link",
				Rect: [0, 0, 10, 10],
				F: 1,
			}),
		);
		const note = pdf.context.register(
			pdf.context.obj({
				Type: "Annot",
				Subtype: "Text",
				Rect: [0, 0, 10, 10],
				F: 2,
			}),
		);
		page.node.set(PDFName.of("Annots"), pdf.context.obj([link, note]));

		await toPdfA(profile, pdf);

		const annotations = page.node.lookup(PDFName.of("Annots"), PDFArray);
		const linkFlags = annotations.lookup(0, PDFDict).lookup(PDFName.of("F"));
		const noteFlags = annotations.lookup(1, PDFDict).lookup(PDFName.of("F"));

		expect(linkFlags).toBeInstanceOf(PDFNumber);
		expect((linkFlags as PDFNumber).asNumber()).toBe(5);
		expect((noteFlags as PDFNumber).asNumber()).toBe(2);
	});

	it("embeds string and binary attachments with their relationship", async () => {
		const createdAt = new Date("2020-03-05T00:00:00.000Z");
		const pdf = await toPdfA(profile, await blank(), {
			attachments: [
				{
					filename: "note.txt",
					data: "€",
					mimeType: "text/plain",
					description: "A note",
					dataRelationship: "Data",
					createdAt,
				},
				{
					filename: "raw.bin",
					data: Uint8Array.from([1, 2, 3]),
					dataRelationship: "NotARelationship" as "Data",
				},
			],
		});
		await pdf.flush();

		const attached = pdf.catalog.lookup(PDFName.of("AF"), PDFArray);
		expect(attached.size()).toBe(2);

		const note = attached.lookup(0, PDFDict);
		const file = note.lookup(PDFName.of("EF"), PDFDict).get(PDFName.of("F"));
		const stream = pdf.context.lookup(file!) as PDFRawStream;

		expect(note.lookup(PDFName.of("F"), PDFString).decodeText()).toBe(
			"note.txt",
		);
		expect(String(note.get(PDFName.of("AFRelationship")))).toBe("/Data");
		expect(note.lookup(PDFName.of("Desc"), PDFHexString).decodeText()).toBe(
			"A note",
		);
		expect([...decoded(stream)]).toEqual([...new TextEncoder().encode("€")]);

		const raw = attached.lookup(1, PDFDict);
		expect(String(raw.get(PDFName.of("AFRelationship")))).toBe("/Unspecified");
		expect([
			...decoded(
				raw
					.lookup(PDFName.of("EF"), PDFDict)
					.lookup(PDFName.of("F")) as PDFRawStream,
			),
		]).toEqual([1, 2, 3]);
	});
});
