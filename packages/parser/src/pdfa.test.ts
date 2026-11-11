import {
	AFRelationship,
	PDFArray,
	PDFDict,
	PDFDocument,
	PDFHexString,
	PDFName,
	PDFNumber,
	PDFString,
	rgb,
} from "pdf-lib";
import { describe, expect, it } from "vitest";
import type { PdfA3Level } from "./pdfa";
import { isPdfA3Conformant } from "./pdfa";

describe("isPdfA3Conformant", () => {
	it("accepts XML with no PDF", () => {
		expect(isPdfA3Conformant(undefined)).toBe(true);
	});

	it("rejects a plain PDF", async () => {
		const pdf = await PDFDocument.create();
		pdf.addPage();

		expect(isPdfA3Conformant(pdf)).toBe(false);
	});

	it("accepts PDF/A-3b and rejects other declared levels", async () => {
		const pdf = await conformant();

		expect(isPdfA3Conformant(pdf)).toBe(true);
		expect(isPdfA3Conformant(pdf, "B")).toBe(true);
		expect(isPdfA3Conformant(pdf, ["A"])).toBe(false);
		expect(isPdfA3Conformant(pdf, "U")).toBe(false);
	});

	it("rejects a document identified as PDF/A-2", async () => {
		const pdf = await conformant("B", { part: "2" });

		expect(isPdfA3Conformant(pdf)).toBe(false);
	});

	it("rejects device color without a valid output intent", async () => {
		const pdf = await conformant();
		pdf.catalog.delete(PDFName.of("OutputIntents"));
		pdf.getPage(0).drawRectangle({
			x: 0,
			y: 0,
			width: 10,
			height: 10,
			color: rgb(0, 0, 0),
		});

		expect(isPdfA3Conformant(pdf)).toBe(false);

		installOutputIntent(pdf);
		expect(isPdfA3Conformant(pdf)).toBe(true);
	});

	it("rejects an output profile that is not a monitor or printer profile", async () => {
		const pdf = await conformant("B", { profile: iccProfile("scnr") });

		expect(isPdfA3Conformant(pdf)).toBe(false);
	});

	it("rejects a font that is not embedded", async () => {
		const pdf = await conformant();
		addType1Font(pdf, { embed: false });

		expect(isPdfA3Conformant(pdf)).toBe(false);
	});

	it("accepts an embedded font at level B", async () => {
		const pdf = await conformant();
		addType1Font(pdf, { embed: true });

		expect(isPdfA3Conformant(pdf)).toBe(true);
	});

	it("requires ToUnicode for level U", async () => {
		const pdf = await conformant("U");
		const font = addType1Font(pdf, { embed: true });

		expect(isPdfA3Conformant(pdf)).toBe(false);

		font.set(
			PDFName.of("ToUnicode"),
			/* cSpell:disable-next-line */
			pdf.context.register(pdf.context.stream("begincmap\nendcmap\n")),
		);
		expect(isPdfA3Conformant(pdf)).toBe(true);
	});

	it("rejects XMP that disagrees with the document info dictionary", async () => {
		const pdf = await conformant("B", { title: "Other" });

		expect(isPdfA3Conformant(pdf)).toBe(false);
	});

	it("requires PDF/A-3 file-specification entries on embedded files", async () => {
		const pdf = await conformant();
		await pdf.attach(Uint8Array.from([1, 2, 3]), "note.txt", {
			mimeType: "text/plain",
			afRelationship: AFRelationship.Data,
			modificationDate: new Date("2020-03-05T00:00:00.000Z"),
		});
		await pdf.flush();

		expect(isPdfA3Conformant(pdf)).toBe(true);

		const associated = pdf.catalog.lookup(PDFName.of("AF"), PDFArray);
		associated.lookup(0, PDFDict).delete(PDFName.of("AFRelationship"));

		expect(isPdfA3Conformant(pdf)).toBe(false);
	});

	it("rejects JavaScript actions", async () => {
		const pdf = await conformant();
		const action = pdf.context.register(
			pdf.context.obj({
				Type: "Action",
				S: "JavaScript",
				JS: "app.alert(1)",
			}),
		);
		pdf.catalog.set(PDFName.of("OpenAction"), action);

		expect(isPdfA3Conformant(pdf)).toBe(false);
	});

	it("requires the print flag on annotations", async () => {
		const pdf = await conformant();
		const link = pdf.context.obj({
			Type: "Annot",
			Subtype: "Link",
			Rect: [0, 0, 10, 10],
			F: 1,
		});
		pdf
			.getPage(0)
			.node.set(
				PDFName.of("Annots"),
				pdf.context.obj([pdf.context.register(link)]),
			);

		expect(isPdfA3Conformant(pdf)).toBe(false);

		link.set(PDFName.of("F"), PDFNumber.of(4));
		expect(isPdfA3Conformant(pdf)).toBe(true);
	});

	it("requires mark info, a structure tree, and a language for level A", async () => {
		const pdf = await conformant("A");

		expect(isPdfA3Conformant(pdf)).toBe(false);

		pdf.catalog.set(PDFName.of("MarkInfo"), pdf.context.obj({ Marked: true }));
		pdf.catalog.set(
			PDFName.of("StructTreeRoot"),
			pdf.context.obj({ Type: "StructTreeRoot" }),
		);
		pdf.catalog.set(PDFName.of("Lang"), PDFString.of("en-US"));

		expect(isPdfA3Conformant(pdf, "A")).toBe(true);
	});
});

async function conformant(
	conformance: PdfA3Level = "B",
	overrides?: { part?: string; title?: string; profile?: Uint8Array },
) {
	const pdf = await PDFDocument.create();
	pdf.addPage();
	const stamp = new Date("2020-03-05T00:00:00.000Z");
	pdf.setTitle("Invoice");
	pdf.setAuthor("Ada");
	pdf.setCreationDate(stamp);
	pdf.setModificationDate(stamp);
	installTrailerId(pdf);
	installXmp(pdf, conformance, overrides);
	installOutputIntent(pdf, overrides?.profile);
	return pdf;
}

function installTrailerId(pdf: PDFDocument) {
	pdf.context.trailerInfo.ID = pdf.context.obj([
		PDFHexString.of("ab".repeat(16)),
		PDFHexString.of("cd".repeat(16)),
	]);
}

function installXmp(
	pdf: PDFDocument,
	conformance: PdfA3Level,
	overrides?: { part?: string; title?: string },
) {
	const title = overrides?.title ?? pdf.getTitle() ?? "";
	const author = pdf.getAuthor() ?? "";
	const creator = pdf.getCreator() ?? "";
	const producer = pdf.getProducer() ?? "";
	const created = iso(pdf.getCreationDate());
	const modified = iso(pdf.getModificationDate());
	const part = overrides?.part ?? "3";
	/* cSpell:disable-next-line */
	const xml = `<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/" rdf:about="">
      <pdfaid:part>${part}</pdfaid:part>
      <pdfaid:conformance>${conformance}</pdfaid:conformance>
    </rdf:Description>
    <rdf:Description xmlns:dc="http://purl.org/dc/elements/1.1/" rdf:about="">
      <dc:title><rdf:Alt><rdf:li xml:lang="x-default">${escapeXml(title)}</rdf:li></rdf:Alt></dc:title>
      <dc:creator><rdf:Seq><rdf:li>${escapeXml(author)}</rdf:li></rdf:Seq></dc:creator>
    </rdf:Description>
    <rdf:Description xmlns:pdf="http://ns.adobe.com/pdf/1.3/" rdf:about="">
      <pdf:Producer>${escapeXml(producer)}</pdf:Producer>
    </rdf:Description>
    <rdf:Description xmlns:xmp="http://ns.adobe.com/xap/1.0/" rdf:about="">
      <xmp:CreatorTool>${escapeXml(creator)}</xmp:CreatorTool>
      <xmp:CreateDate>${created}</xmp:CreateDate>
      <xmp:ModifyDate>${modified}</xmp:ModifyDate>
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;

	pdf.catalog.set(
		PDFName.of("Metadata"),
		pdf.context.register(
			pdf.context.stream(xml, { Type: "Metadata", Subtype: "XML" }),
		),
	);
}

function installOutputIntent(pdf: PDFDocument, profile = iccProfile()) {
	const streamRef = pdf.context.register(pdf.context.stream(profile));
	const intent = pdf.context.register(
		pdf.context.obj({
			Type: "OutputIntent",
			S: "GTS_PDFA1",
			OutputConditionIdentifier: PDFString.of("sRGB"),
			DestOutputProfile: streamRef,
		}),
	);
	pdf.catalog.set(PDFName.of("OutputIntents"), pdf.context.obj([intent]));
}

function iccProfile(deviceClass = "mntr", colorSpace = "RGB "): Uint8Array {
	const bytes = new Uint8Array(128);
	bytes.set([0, 0, 0, 128], 0);
	bytes.set(codes(deviceClass), 12);
	bytes.set(codes(colorSpace), 16);
	bytes.set(codes("acsp"), 36);
	return bytes;
}

function codes(value: string): number[] {
	return [...value].map((char) => char.charCodeAt(0));
}

function addType1Font(pdf: PDFDocument, options: { embed: boolean }) {
	const font = pdf.context.obj({
		Type: "Font",
		Subtype: "Type1",
		BaseFont: "Fake",
	});
	if (options.embed) {
		const file = pdf.context.register(
			pdf.context.stream(Uint8Array.from([0, 1, 2, 3])),
		);
		font.set(
			PDFName.of("FontDescriptor"),
			pdf.context.register(
				pdf.context.obj({
					Type: "FontDescriptor",
					FontName: "Fake",
					FontFile: file,
					Flags: 32,
				}),
			),
		);
	}

	const resources = pdf
		.getPage(0)
		.node.lookup(PDFName.of("Resources"), PDFDict);
	const existing = resources.lookup(PDFName.of("Font"));
	const fonts = existing instanceof PDFDict ? existing : pdf.context.obj({});
	fonts.set(PDFName.of("F1"), pdf.context.register(font));
	resources.set(PDFName.of("Font"), fonts);
	return font;
}

function iso(date: Date | undefined) {
	return date ? date.toISOString().replace(/\.\d{3}Z$/, "Z") : "";
}

function escapeXml(value: string) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}
