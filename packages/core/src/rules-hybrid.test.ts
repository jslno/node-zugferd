import type { ZugferdContext, ZugferdProfile } from "@node-zugferd/core";
import { AFRelationship, PDFDict, PDFDocument, PDFName } from "pdf-lib";
import { describe, expect, it } from "vitest";
import type { HybridRuleId } from "./rules-hybrid";
import { checkHybridRules } from "./rules-hybrid";

const context = {} as ZugferdContext;
const profile = {
	id: "en16931",
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "EN 16931",
		fileName: "factur-x.xml",
		version: "1.0",
		namespace: "fx",
		uri: "urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#",
	},
} as ZugferdProfile;

const SCHEMA_URI = "urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#";

type InvoiceOptions = {
	seller?: string;
	buyer?: string;
	typeCode?: string;
	issue?: string;
	guideline?: string;
	deliveryDate?: string | null;
	invoicingPeriod?: boolean;
	deliveryCountry?: string | null;
	linePeriod?: boolean;
};

type BuildOptions = {
	part?: string;
	conformance?: string;
	uri?: string;
	prefix?: string;
	documentType?: string;
	documentFileName?: string;
	version?: string;
	level?: string;
	properties?: string[] | null;
	fileName?: string;
	mimeType?: string;
	relationship?: AFRelationship;
	modificationDate?: Date | null;
	xml?: string | null;
	stripAssociatedFile?: boolean;
	stripNameTree?: boolean;
	invoice?: InvoiceOptions;
};

async function build(options: BuildOptions = {}) {
	const pdf = await PDFDocument.create();
	pdf.addPage();
	installXmp(pdf, options);
	if (options.xml !== null) {
		await pdf.attach(
			options.xml ?? "<invoice/>",
			options.fileName ?? "factur-x.xml",
			{
				mimeType: options.mimeType ?? "text/xml",
				...(options.modificationDate === null
					? {}
					: {
							modificationDate:
								options.modificationDate ??
								new Date("2024-06-01T00:00:00.000Z"),
						}),
				afRelationship: options.relationship ?? AFRelationship.Alternative,
			},
		);
	}
	if (options.stripAssociatedFile || options.stripNameTree) {
		await pdf.flush();
		if (options.stripAssociatedFile) pdf.catalog.delete(PDFName.of("AF"));
		if (options.stripNameTree) {
			const names = pdf.catalog.lookup(PDFName.of("Names"));
			if (names instanceof PDFDict) names.delete(PDFName.of("EmbeddedFiles"));
		}
	}
	return pdf;
}

function invoiceData(options: InvoiceOptions = {}) {
	return {
		...(options.guideline
			? {
					processControl: {
						applicationRecommendationInfo: {
							specificationIdentifier: { identifier: options.guideline },
						},
					},
				}
			: {}),
		exchangedDocument: {
			invoiceTypeCode: { value: options.typeCode ?? "380" },
			invoiceIssueDate: { date: codedDate(options.issue ?? "20240601") },
		},
		transaction: {
			contract: {
				seller: {
					postalAddress: { countryCode: { value: options.seller ?? "FR" } },
				},
				buyer: {
					postalAddress: { countryCode: { value: options.buyer ?? "FR" } },
				},
			},
			delivery: {
				...(options.deliveryDate === null
					? {}
					: {
							actualDelivery: {
								date: { date: codedDate(options.deliveryDate ?? "20240601") },
							},
						}),
				...(options.deliveryCountry === null
					? {}
					: {
							recipient: {
								postalAddress: {
									countryCode: { value: options.deliveryCountry ?? "FR" },
								},
							},
						}),
			},
			...(options.invoicingPeriod === false
				? {}
				: { debit: { invoicingPeriod: { startDate: {} } } }),
			line: [
				options.linePeriod === false
					? { billing: {} }
					: { billing: { invoicePeriod: { startDate: {} } } },
			],
		},
	};
}

function codedDate(value: string) {
	const iso = /^\d{8}$/.test(value)
		? `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}T00:00:00.000Z`
		: value;
	return new Date(iso);
}

function installXmp(pdf: PDFDocument, options: BuildOptions) {
	const uri = options.uri ?? SCHEMA_URI;
	const prefix = options.prefix ?? "fx";
	const properties =
		options.properties === null
			? []
			: (options.properties ?? [
					"DocumentType",
					"DocumentFileName",
					"Version",
					"ConformanceLevel",
				]);
	const schema =
		options.properties === null
			? ""
			: `<rdf:Description xmlns:pdfaExtension="http://www.aiim.org/pdfa/ns/extension/" xmlns:pdfaSchema="http://www.aiim.org/pdfa/ns/schema#" xmlns:pdfaProperty="http://www.aiim.org/pdfa/ns/property#" rdf:about="">
      <pdfaExtension:schemas><rdf:Bag><rdf:li rdf:parseType="Resource">
        <pdfaSchema:namespaceURI>${uri}</pdfaSchema:namespaceURI>
        <pdfaSchema:prefix>${prefix}</pdfaSchema:prefix>
        <pdfaSchema:property><rdf:Seq>
          ${properties
						.map(
							(name) =>
								`<rdf:li rdf:parseType="Resource"><pdfaProperty:name>${name}</pdfaProperty:name></rdf:li>`,
						)
						.join("")}
        </rdf:Seq></pdfaSchema:property>
      </rdf:li></rdf:Bag></pdfaExtension:schemas>
    </rdf:Description>`;
	const xml = `<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/" rdf:about="">
      <pdfaid:part>${options.part ?? "3"}</pdfaid:part>
      <pdfaid:conformance>${options.conformance ?? "B"}</pdfaid:conformance>
    </rdf:Description>
    ${schema}
    <rdf:Description xmlns:${prefix}="${uri}" rdf:about="">
      <${prefix}:DocumentType>${options.documentType ?? "INVOICE"}</${prefix}:DocumentType>
      <${prefix}:DocumentFileName>${options.documentFileName ?? "factur-x.xml"}</${prefix}:DocumentFileName>
      <${prefix}:Version>${options.version ?? "1.0"}</${prefix}:Version>
      <${prefix}:ConformanceLevel>${options.level ?? "EN 16931"}</${prefix}:ConformanceLevel>
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

async function issues(options?: BuildOptions) {
	return checkHybridRules(
		profile,
		context,
		await build(options),
		invoiceData(options?.invoice),
	);
}

async function ids(options?: BuildOptions): Promise<HybridRuleId[]> {
	return (await issues(options)).map((issue) => issue.id);
}

async function issue(options: BuildOptions, id: HybridRuleId) {
	return (await issues(options)).find((entry) => entry.id === id);
}

describe("hybrid business rules", () => {
	it("accepts a Factur-X document that satisfies every rule", async () => {
		expect(await issues()).toEqual([]);
	});

	it("reads create() input as well as schema output", async () => {
		const issued = new Date("2025-01-01T00:00:00.000Z");
		const found = await checkHybridRules(
			profile,
			context,
			await build({ part: "1" }),
			{
				processControl: {
					applicationRecommendationInfo: {
						specificationIdentifier: "urn:factur-x.eu:1p0:extended",
					},
				},
				exchangedDocument: {
					invoiceTypeCode: "380",
					invoiceIssueDate: issued,
				},
				transaction: {
					contract: {
						seller: { postalAddress: { countryCode: "DE" } },
						buyer: { postalAddress: { countryCode: "DE" } },
					},
				},
			},
		);
		expect(found.find((entry) => entry.id === "BR-HYBRID-02")?.level).toBe(
			"warning",
		);
		expect(found.find((entry) => entry.id === "BR-FX-DE-03")?.level).toBe(
			"warning",
		);
		expect(found.find((entry) => entry.id === "BR-HYBRID-15")?.level).toBe(
			"warning",
		);
	});

	it("accepts PDF/A-4f and the URI written in BR-HYBRID-04", async () => {
		expect(await ids({ part: "4", conformance: "F" })).not.toContain(
			"BR-HYBRID-02",
		);
		expect(
			await ids({
				uri: "urn:factur-x:pdfa:CrossIndustryDocument:1p0#",
			}),
		).not.toContain("BR-HYBRID-04");
	});

	it("reports a missing XML invoice (BR-HYBRID-01)", async () => {
		expect((await issue({ xml: null }, "BR-HYBRID-01"))?.level).toBe(
			"information",
		);
	});

	it("rejects a PDF envelope that is neither PDF/A-3 nor PDF/A-4f (BR-HYBRID-02)", async () => {
		expect((await issue({ part: "2" }, "BR-HYBRID-02"))?.level).toBe("fatal");
		expect(
			(await issue({ part: "4", conformance: "B" }, "BR-HYBRID-02"))?.level,
		).toBe("fatal");
	});

	it("requires the PDF/A extension schema structure (BR-HYBRID-03)", async () => {
		expect(
			(await issue({ properties: ["DocumentType"] }, "BR-HYBRID-03"))?.level,
		).toBe("fatal");
	});

	it("requires the Factur-X extension schema URI (BR-HYBRID-04)", async () => {
		expect(
			(await issue({ uri: "urn:example:not-factur-x" }, "BR-HYBRID-04"))?.level,
		).toBe("fatal");
	});

	it("requires the fx namespace prefix (BR-HYBRID-05)", async () => {
		expect((await issue({ prefix: "zf" }, "BR-HYBRID-05"))?.level).toBe(
			"fatal",
		);
	});

	it("requires a HybridDocumentType value (BR-HYBRID-06)", async () => {
		expect(
			(await issue({ documentType: "RECEIPT" }, "BR-HYBRID-06"))?.level,
		).toBe("fatal");
		expect(await ids({ documentType: "ORDER" })).not.toContain("BR-HYBRID-06");
	});

	it("requires a HybridConformanceType value (BR-HYBRID-07)", async () => {
		expect((await issue({ level: "COMFORTABLE" }, "BR-HYBRID-07"))?.level).toBe(
			"fatal",
		);
	});

	it("requires fx:DocumentFileName from the filename code list (BR-HYBRID-08)", async () => {
		expect(
			(
				await issue(
					{ documentFileName: "invoice.xml", fileName: "invoice.xml" },
					"BR-HYBRID-08",
				)
			)?.level,
		).toBe("fatal");
	});

	it("requires fx:Version from the version code list (BR-HYBRID-09)", async () => {
		expect((await issue({ version: "9.9" }, "BR-HYBRID-09"))?.level).toBe(
			"fatal",
		);
	});

	it("warns when fx:Version is not 1.0 (BR-HYBRID-10)", async () => {
		expect((await issue({ version: "2p0" }, "BR-HYBRID-10"))?.level).toBe(
			"warning",
		);
		expect(await ids({ version: "2p0" })).not.toContain("BR-HYBRID-09");
	});

	it("warns when the file relationship is outside the profile table (BR-HYBRID-11)", async () => {
		expect(
			(
				await issue(
					{
						relationship: AFRelationship.Source,
						invoice: { buyer: "DE", seller: "DE" },
					},
					"BR-HYBRID-11",
				)
			)?.level,
		).toBe("warning");
		expect(await ids({ relationship: AFRelationship.Source })).not.toContain(
			"BR-HYBRID-11",
		);
		expect(
			await ids({
				level: "MINIMUM",
				relationship: AFRelationship.Data,
				invoice: { guideline: "urn:factur-x.eu:1p0:minimum" },
			}),
		).not.toContain("BR-HYBRID-11");
	});

	it("requires the specified embedding method (BR-HYBRID-12)", async () => {
		expect(
			(await issue({ stripAssociatedFile: true }, "BR-HYBRID-12"))?.level,
		).toBe("fatal");
		expect(
			(await issue({ mimeType: "application/pdf" }, "BR-HYBRID-12"))?.level,
		).toBe("fatal");
		expect(
			(await issue({ modificationDate: null }, "BR-HYBRID-12"))?.level,
		).toBe("fatal");
	});

	it("requires the embedded file name from the filename code list (BR-HYBRID-13)", async () => {
		expect(
			(
				await issue(
					{ fileName: "invoice.xml", documentFileName: "invoice.xml" },
					"BR-HYBRID-13",
				)
			)?.level,
		).toBe("fatal");
	});

	it("warns when the embedded name differs from fx:DocumentFileName (BR-HYBRID-14)", async () => {
		expect(
			(await issue({ fileName: "xrechnung.xml" }, "BR-HYBRID-14"))?.level,
		).toBe("warning");
	});

	it("warns when fx:ConformanceLevel differs from the XML profile (BR-HYBRID-15)", async () => {
		expect(
			(
				await issue(
					{ invoice: { guideline: "urn:factur-x.eu:1p0:extended" } },
					"BR-HYBRID-15",
				)
			)?.level,
		).toBe("warning");
		expect(
			await ids({
				level: "EXTENDED",
				invoice: { guideline: "urn:factur-x.eu:1p0:extended" },
			}),
		).not.toContain("BR-HYBRID-15");
	});

	it("rejects MINIMUM for a domestic German invoice (BR-HYBRID-DE-01)", async () => {
		expect(
			(
				await issue(
					{
						level: "MINIMUM",
						relationship: AFRelationship.Data,
						invoice: {
							buyer: "DE",
							seller: "DE",
							guideline: "urn:factur-x.eu:1p0:minimum",
						},
					},
					"BR-HYBRID-DE-01",
				)
			)?.level,
		).toBe("fatal");
		expect(
			await ids({
				level: "MINIMUM",
				relationship: AFRelationship.Data,
				invoice: {
					buyer: "DE",
					seller: "FR",
					guideline: "urn:factur-x.eu:1p0:minimum",
				},
			}),
		).not.toContain("BR-HYBRID-DE-01");
	});

	it("rejects BASIC WL for a domestic German invoice (BR-HYBRID-DE-02)", async () => {
		expect(
			(
				await issue(
					{
						level: "BASIC WL",
						relationship: AFRelationship.Data,
						invoice: {
							buyer: "DE",
							seller: "DE",
							guideline: "urn:factur-x.eu:1p0:basicwl",
						},
					},
					"BR-HYBRID-DE-02",
				)
			)?.level,
		).toBe("fatal");
	});

	it("rejects XRECHNUNG for a domestic French invoice (BR-HYBRID-FR-01)", async () => {
		expect(
			(
				await issue(
					{
						level: "XRECHNUNG",
						invoice: {
							guideline:
								"urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0",
						},
					},
					"BR-HYBRID-FR-01",
				)
			)?.level,
		).toBe("fatal");
		expect(
			await ids({
				level: "XRECHNUNG",
				invoice: {
					buyer: "DE",
					seller: "DE",
					guideline:
						"urn:cen.eu:en16931:2017#compliant#urn:xeinkauf.de:kosit:xrechnung_3.0",
				},
			}),
		).not.toContain("BR-HYBRID-FR-01");
	});

	it("downgrades PDF/A failures to warnings for a domestic German invoice from 2025 (BR-FX-DE-03)", async () => {
		const downgraded = {
			part: "1",
			invoice: { buyer: "DE", seller: "DE", issue: "20250101" },
		};
		expect((await issue(downgraded, "BR-HYBRID-02"))?.level).toBe("warning");
		expect((await issue(downgraded, "BR-FX-DE-03"))?.level).toBe("warning");

		const before = {
			part: "1",
			invoice: { buyer: "DE", seller: "DE", issue: "20241231" },
		};
		expect((await issue(before, "BR-HYBRID-02"))?.level).toBe("fatal");
		expect(await ids(before)).not.toContain("BR-FX-DE-03");

		const schema = {
			properties: [] as string[],
			invoice: { buyer: "DE", seller: "DE", issue: "20250601" },
		};
		expect((await issue(schema, "BR-HYBRID-03"))?.level).toBe("warning");
		expect((await issue(schema, "BR-FX-DE-03"))?.level).toBe("warning");
	});

	it("warns when a German invoice has no delivery or service date (BR-FX-DE-04)", async () => {
		expect(
			(
				await issue(
					{
						invoice: {
							seller: "DE",
							buyer: "AT",
							deliveryDate: null,
							invoicingPeriod: false,
							deliveryCountry: null,
							linePeriod: false,
						},
					},
					"BR-FX-DE-04",
				)
			)?.level,
		).toBe("warning");
		expect(
			await ids({
				invoice: {
					seller: "DE",
					typeCode: "386",
					deliveryDate: null,
					invoicingPeriod: false,
					deliveryCountry: null,
					linePeriod: false,
				},
			}),
		).not.toContain("BR-FX-DE-04");
		expect(
			await ids({
				invoice: {
					seller: "DE",
					deliveryDate: null,
					invoicingPeriod: false,
					linePeriod: true,
				},
			}),
		).not.toContain("BR-FX-DE-04");
		expect(
			await ids({
				invoice: {
					seller: "DE",
					deliveryDate: null,
					invoicingPeriod: true,
					deliveryCountry: null,
					linePeriod: false,
				},
			}),
		).toContain("BR-FX-DE-04");
	});
});
