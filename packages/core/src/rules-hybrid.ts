import type { PDFDocument } from "pdf-lib";
import {
	decodePDFRawStream,
	PDFArray,
	PDFDict,
	PDFHexString,
	PDFName,
	PDFRawStream,
	PDFStream,
	PDFString,
} from "pdf-lib";
import { convert } from "xmlbuilder2";
import type { ZugferdContext } from "./types/context";
import type { ZugferdProfile } from "./types/profile";

export type HybridRuleId =
	| "BR-HYBRID-01"
	| "BR-HYBRID-02"
	| "BR-HYBRID-03"
	| "BR-HYBRID-04"
	| "BR-HYBRID-05"
	| "BR-HYBRID-06"
	| "BR-HYBRID-07"
	| "BR-HYBRID-08"
	| "BR-HYBRID-09"
	| "BR-HYBRID-10"
	| "BR-HYBRID-11"
	| "BR-HYBRID-12"
	| "BR-HYBRID-13"
	| "BR-HYBRID-14"
	| "BR-HYBRID-15"
	| "BR-HYBRID-DE-01"
	| "BR-HYBRID-DE-02"
	| "BR-HYBRID-FR-01"
	| "BR-FX-DE-03"
	| "BR-FX-DE-04";

export type HybridRuleLevel = "information" | "warning" | "fatal";

export type HybridRuleIssue = {
	id: HybridRuleId;
	level: HybridRuleLevel;
	message: string;
};

const DOCUMENT_TYPES = new Set([
	"INVOICE",
	"ORDER",
	"ORDER_RESPONSE",
	"ORDER_CHANGE",
]);
const CONFORMANCE_LEVELS = new Set([
	"MINIMUM",
	"BASIC WL",
	"BASIC",
	"EN 16931",
	"COMFORT",
	"EXTENDED",
	"XRECHNUNG",
]);
const FILE_NAMES = new Set([
	"factur-x.xml",
	"xrechnung.xml",
	"order-x.xml",
	"zugferd-invoice.xml",
]);
const VERSIONS = new Set(["1.0", "1p0", "2p0", "2p1", "2p2"]);
/**
 * BR-HYBRID-04 names the URI without `:invoice:`. Section 6.3.1 of the same
 * specification, and the XMP this library writes, use the invoice URI.
 */
const SCHEMA_URIS = new Set([
	"urn:factur-x:pdfa:CrossIndustryDocument:1p0#",
	"urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#",
]);
const SCHEMA_PROPERTIES = [
	"DocumentType",
	"DocumentFileName",
	"Version",
	"ConformanceLevel",
] as const;
const PDF_A_RULES = new Set<HybridRuleId>(["BR-HYBRID-02", "BR-HYBRID-03"]);
const GERMAN_WARNING_START = Date.UTC(2025, 0, 1);

const PROFILE_ALIASES: Record<string, string> = {
	MINIMUM: "MINIMUM",
	"BASIC WL": "BASIC WL",
	BASICWL: "BASIC WL",
	BASIC: "BASIC",
	"EN 16931": "EN 16931",
	EN16931: "EN 16931",
	EXTENDED: "EXTENDED",
	XRECHNUNG: "XRECHNUNG",
	COMFORT: "COMFORT",
};

type Facts = {
	hasXml: boolean;
	part?: string;
	pdfConformance?: string;
	schemaProperties: string[];
	uris: string[];
	prefix?: string;
	documentType?: string;
	documentFileName?: string;
	version?: string;
	conformanceLevel?: string;
	embeddedName?: string;
	mimeType?: string;
	documentLevel: boolean;
	inNameTree: boolean;
	hasModDate: boolean;
	relationship?: string;
	buyerCountry?: string;
	sellerCountry?: string;
	typeCode?: string;
	issueTime?: number;
	xmlProfile?: string;
	actualDelivery: boolean;
	invoicingPeriod: boolean;
	deliveryCountry?: string;
	linePeriod: boolean;
};

export async function checkHybridRules(
	profile: ZugferdProfile,
	context: ZugferdContext,
	pdf: PDFDocument,
	data: unknown,
): Promise<HybridRuleIssue[]> {
	void context;
	await pdf.flush();
	const facts = readFacts(profile, pdf, data);
	const issues: HybridRuleIssue[] = [];
	const declaredProfile = canonicalProfile(facts.conformanceLevel);
	const xmlProfile = facts.xmlProfile;
	const relationshipProfile = declaredProfile ?? xmlProfile;

	if (!facts.hasXml) {
		issues.push(
			rule(
				"BR-HYBRID-01",
				"information",
				"A hybrid document consists of a machine readable interchange format on XML syntax and a human readable PDF envelope.",
			),
		);
	}
	if (!isPdfAEnvelope(facts.part, facts.pdfConformance)) {
		issues.push(
			rule(
				"BR-HYBRID-02",
				"fatal",
				"The PDF envelope of a hybrid document shall use PDF/A-3. PDF/A-4f is also allowed.",
			),
		);
	}
	if (
		!SCHEMA_PROPERTIES.every((name) => facts.schemaProperties.includes(name))
	) {
		issues.push(
			rule(
				"BR-HYBRID-03",
				"fatal",
				"A PDF/A extension schema (XMP) following the structure definition in the corresponding specification shall be used.",
			),
		);
	}
	if (
		facts.uris.length === 0 ||
		facts.uris.some((uri) => !SCHEMA_URIS.has(uri))
	) {
		issues.push(
			rule(
				"BR-HYBRID-04",
				"fatal",
				"The URI in the extension schema shall be urn:factur-x:pdfa:CrossIndustryDocument:1p0# or urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#.",
			),
		);
	}
	if (facts.prefix !== "fx") {
		issues.push(
			rule(
				"BR-HYBRID-05",
				"fatal",
				"The schema namespace prefix in the XMP extension schema shall be fx.",
			),
		);
	}
	if (!DOCUMENT_TYPES.has(facts.documentType ?? "")) {
		issues.push(
			rule(
				"BR-HYBRID-06",
				"fatal",
				"The fx:DocumentType in the XMP instance shall be a value from the HybridDocumentType code list.",
			),
		);
	}
	if (!CONFORMANCE_LEVELS.has(facts.conformanceLevel ?? "")) {
		issues.push(
			rule(
				"BR-HYBRID-07",
				"fatal",
				"The fx:ConformanceLevel in the XMP instance shall be a value from the HybridConformanceType code list.",
			),
		);
	}
	if (!FILE_NAMES.has(facts.documentFileName ?? "")) {
		issues.push(
			rule(
				"BR-HYBRID-08",
				"fatal",
				"The fx:DocumentFileName in the XMP instance shall be a value defined in the HybridDocumentFilename code list.",
			),
		);
	}
	if (!VERSIONS.has(facts.version ?? "")) {
		issues.push(
			rule(
				"BR-HYBRID-09",
				"fatal",
				"The fx:Version in the XMP instance shall be a value defined in the HybridDocumentVersion code list.",
			),
		);
	}
	if (facts.version !== "1.0") {
		issues.push(
			rule("BR-HYBRID-10", "warning", "The fx:Version should be 1.0."),
		);
	}
	if (
		relationshipProfile &&
		!relationshipAllowed(
			relationshipProfile,
			facts.relationship,
			country(facts.buyerCountry),
			country(facts.sellerCountry),
		)
	) {
		issues.push(
			rule(
				"BR-HYBRID-11",
				"warning",
				"The relationship between the embedded document and the PDF file should follow the table defined in the current specification.",
			),
		);
	}
	if (
		!facts.documentLevel ||
		!facts.inNameTree ||
		!facts.hasModDate ||
		facts.mimeType?.toLowerCase() !== "text/xml" ||
		!facts.embeddedName
	) {
		issues.push(
			rule(
				"BR-HYBRID-12",
				"fatal",
				"The method of embedding the XML into the PDF shall conform as defined in the current specification in order to assure easy extraction of the machine readable XML file.",
			),
		);
	}
	if (!FILE_NAMES.has(facts.embeddedName ?? "")) {
		issues.push(
			rule(
				"BR-HYBRID-13",
				"fatal",
				"The embedded file name shall be one of the values defined in the HybridDocumentFilename code list.",
			),
		);
	}
	if (
		facts.embeddedName &&
		facts.documentFileName &&
		facts.embeddedName !== facts.documentFileName
	) {
		issues.push(
			rule(
				"BR-HYBRID-14",
				"warning",
				"The embedded file name should match the fx:DocumentFileName.",
			),
		);
	}
	if (declaredProfile && xmlProfile && declaredProfile !== xmlProfile) {
		issues.push(
			rule(
				"BR-HYBRID-15",
				"warning",
				"The fx:ConformanceLevel should match the profile of the embedded XML document.",
			),
		);
	}
	if (
		domestic(facts, "DE") &&
		usesProfile(declaredProfile, xmlProfile, "MINIMUM")
	) {
		issues.push(
			rule(
				"BR-HYBRID-DE-01",
				"fatal",
				"If the Buyer Country (BT-40) is Germany and the Seller Country (BT-55) is Germany the MINIMUM profile shall not be used.",
			),
		);
	}
	if (
		domestic(facts, "DE") &&
		usesProfile(declaredProfile, xmlProfile, "BASIC WL")
	) {
		issues.push(
			rule(
				"BR-HYBRID-DE-02",
				"fatal",
				"If the Buyer Country (BT-40) is Germany and the Seller Country (BT-55) is Germany the BASIC WL profile shall not be used.",
			),
		);
	}
	if (
		domestic(facts, "FR") &&
		usesProfile(declaredProfile, xmlProfile, "XRECHNUNG")
	) {
		issues.push(
			rule(
				"BR-HYBRID-FR-01",
				"fatal",
				"If the Buyer Country (BT-40) is France and the Seller Country (BT-55) is France the XRECHNUNG profile shall not be used.",
			),
		);
	}
	if (
		country(facts.sellerCountry) === "DE" &&
		facts.typeCode !== "386" &&
		(!(facts.actualDelivery || facts.invoicingPeriod || facts.linePeriod) ||
			(!facts.actualDelivery && !facts.deliveryCountry))
	) {
		issues.push(
			rule(
				"BR-FX-DE-04",
				"warning",
				"An invoice that is not a down payment invoice (code 386) must contain BT-72, BG-14, or BG-26 on each invoice line. If BT-72 is absent, the delivery country (BT-80) must be present.",
			),
		);
	}

	if (
		domestic(facts, "DE") &&
		facts.issueTime !== undefined &&
		facts.issueTime >= GERMAN_WARNING_START
	) {
		let downgraded = false;
		for (const issue of issues) {
			if (!PDF_A_RULES.has(issue.id)) continue;
			issue.level = "warning";
			downgraded = true;
		}
		if (downgraded) {
			issues.push(
				rule(
					"BR-FX-DE-03",
					"warning",
					"Starting 2025-01-01, PDF/A technical errors on a domestic German invoice are warnings. The embedded XML is the invoice when it is valid and can be extracted.",
				),
			);
		}
	}

	return issues;
}

function readFacts(
	profile: ZugferdProfile,
	pdf: PDFDocument,
	data: unknown,
): Facts {
	const descriptions = readDescriptions(pdf);
	const fields = {
		type: profile.extensionSchema.fieldNameMap?.type ?? "DocumentType",
		fileName:
			profile.extensionSchema.fieldNameMap?.fileName ?? "DocumentFileName",
		version: profile.extensionSchema.fieldNameMap?.version ?? "Version",
		conformanceLevel:
			profile.extensionSchema.fieldNameMap?.conformanceLevel ??
			"ConformanceLevel",
	};
	const schemaPrefix = textAt(descriptions, "pdfaSchema:prefix");
	const hasFx = descriptions.some(
		(description) => typeof description["@xmlns:fx"] === "string",
	);
	const xmlns = descriptions.find(
		(description) => typeof description["@xmlns:fx"] === "string",
	)?.["@xmlns:fx"];
	const schemaUri = textAt(descriptions, "pdfaSchema:namespaceURI");
	const uris = [
		typeof xmlns === "string" ? xmlns.trim() : undefined,
		schemaUri,
	].filter((uri): uri is string => !!uri);
	const documentFileName = textAt(descriptions, `fx:${fields.fileName}`);
	const embedded = readEmbeddedFile(
		pdf,
		profile.extensionSchema.fileName,
		documentFileName,
	);
	const invoice = readInvoiceData(data, profile);

	return {
		hasXml: embedded.hasXml,
		part: textAt(descriptions, "pdfaid:part"),
		pdfConformance: textAt(descriptions, "pdfaid:conformance"),
		schemaProperties: propertyNames(descriptions),
		uris,
		prefix:
			hasFx && schemaPrefix !== undefined && schemaPrefix !== "fx"
				? schemaPrefix
				: hasFx
					? "fx"
					: schemaPrefix,
		documentType: textAt(descriptions, `fx:${fields.type}`),
		documentFileName,
		version: textAt(descriptions, `fx:${fields.version}`),
		conformanceLevel: textAt(descriptions, `fx:${fields.conformanceLevel}`),
		embeddedName: embedded.name,
		mimeType: embedded.mimeType,
		documentLevel: embedded.documentLevel,
		inNameTree: embedded.inNameTree,
		hasModDate: embedded.hasModDate,
		relationship: embedded.relationship,
		buyerCountry: invoice?.buyerCountry,
		sellerCountry: invoice?.sellerCountry,
		typeCode: invoice?.typeCode,
		issueTime: invoice?.issueTime,
		xmlProfile: invoice?.profile,
		actualDelivery: invoice?.actualDelivery ?? false,
		invoicingPeriod: invoice?.invoicingPeriod ?? false,
		deliveryCountry: invoice?.deliveryCountry,
		linePeriod: invoice?.linePeriod ?? false,
	};
}

function readDescriptions(pdf: PDFDocument): Record<string, unknown>[] {
	const metadata = pdf.catalog.get(PDFName.of("Metadata"));
	if (!metadata) return [];
	const stream = pdf.context.lookup(metadata);
	if (!(stream instanceof PDFStream)) return [];
	const bytes = streamBytes(stream);
	if (!bytes) return [];
	try {
		return descriptionsOf(
			convert(new TextDecoder().decode(bytes), { format: "object" }),
		);
	} catch {
		return [];
	}
}

function descriptionsOf(metadata: unknown): Record<string, unknown>[] {
	const root = asRecord(metadata);
	const xmp = asRecord(root?.["x:xmpmeta"]) ?? root;
	const rdf = asRecord(xmp?.["rdf:RDF"]) ?? xmp;
	const description = rdf?.["rdf:Description"];
	const list = Array.isArray(description) ? description : [description];
	return list.filter(
		(entry): entry is Record<string, unknown> =>
			!!entry && typeof entry === "object" && !Array.isArray(entry),
	);
}

function propertyNames(descriptions: Record<string, unknown>[]): string[] {
	const names: string[] = [];
	const visit = (value: unknown) => {
		if (!value || typeof value !== "object") return;
		if (Array.isArray(value)) {
			for (const entry of value) visit(entry);
			return;
		}
		for (const [key, entry] of Object.entries(value)) {
			if (key === "pdfaProperty:name") {
				const name = firstText(entry);
				if (name) names.push(name);
			} else {
				visit(entry);
			}
		}
	};
	for (const description of descriptions) visit(description);
	return names;
}

function textAt(
	descriptions: Record<string, unknown>[],
	key: string,
): string | undefined {
	for (const description of descriptions) {
		if (!(key in description)) continue;
		const text = firstText(description[key]);
		if (text) return text;
	}
	return undefined;
}

type EmbeddedFile = {
	name?: string;
	mimeType?: string;
	documentLevel: boolean;
	inNameTree: boolean;
	hasModDate: boolean;
	relationship?: string;
	hasXml: boolean;
};

function readEmbeddedFile(
	pdf: PDFDocument,
	profileName: string | undefined,
	declaredName: string | undefined,
): EmbeddedFile {
	const files = embeddedFiles(pdf);
	const selected =
		files.find((file) => file.name === profileName) ??
		files.find((file) => file.name === declaredName) ??
		(files.length === 1 ? files[0] : undefined);
	if (!selected) {
		return {
			documentLevel: false,
			inNameTree: false,
			hasModDate: false,
			hasXml: false,
		};
	}
	return selected;
}

function embeddedFiles(pdf: PDFDocument): EmbeddedFile[] {
	const associated = new Set<PDFDict>();
	const af = pdf.catalog.lookup(PDFName.of("AF"));
	if (af instanceof PDFArray) {
		for (let index = 0; index < af.size(); index++) {
			const spec = af.lookup(index);
			if (spec instanceof PDFDict) associated.add(spec);
		}
	}

	const listed = new Map<PDFDict, string>();
	const names = pdf.catalog.lookup(PDFName.of("Names"));
	if (names instanceof PDFDict) {
		const embedded = names.lookup(PDFName.of("EmbeddedFiles"));
		if (embedded instanceof PDFDict) collectNameTree(embedded, listed);
	}

	const specs = new Set<PDFDict>([...listed.keys(), ...associated]);
	const files: EmbeddedFile[] = [];
	for (const spec of specs) {
		const stream = spec.lookup(PDFName.of("EF"));
		const file =
			stream instanceof PDFDict ? stream.lookup(PDFName.of("F")) : undefined;
		const params =
			file instanceof PDFStream
				? file.dict.lookup(PDFName.of("Params"))
				: undefined;
		files.push({
			name:
				decodeObject(spec.lookup(PDFName.of("F"))) ??
				decodeObject(spec.lookup(PDFName.of("UF"))) ??
				listed.get(spec),
			mimeType:
				file instanceof PDFStream
					? decodeObject(file.dict.get(PDFName.of("Subtype")))
					: undefined,
			documentLevel: associated.has(spec),
			inNameTree: listed.has(spec),
			hasModDate:
				params instanceof PDFDict && params.has(PDFName.of("ModDate")),
			relationship: decodeObject(spec.get(PDFName.of("AFRelationship"))),
			hasXml: file instanceof PDFStream,
		});
	}
	return files;
}

function collectNameTree(node: PDFDict, listed: Map<PDFDict, string>) {
	const names = node.lookup(PDFName.of("Names"));
	if (names instanceof PDFArray) {
		for (let index = 0; index < names.size(); index += 2) {
			const spec = names.lookup(index + 1);
			if (spec instanceof PDFDict) {
				listed.set(spec, decodeObject(names.get(index)) ?? "");
			}
		}
	}
	const kids = node.lookup(PDFName.of("Kids"));
	if (kids instanceof PDFArray) {
		for (let index = 0; index < kids.size(); index++) {
			const kid = kids.lookup(index);
			if (kid instanceof PDFDict) collectNameTree(kid, listed);
		}
	}
}

type InvoiceFacts = {
	buyerCountry?: string;
	sellerCountry?: string;
	typeCode?: string;
	issueTime?: number;
	profile?: string;
	actualDelivery: boolean;
	invoicingPeriod: boolean;
	deliveryCountry?: string;
	linePeriod: boolean;
};

function readInvoiceData(data: unknown, profile: ZugferdProfile): InvoiceFacts {
	const root = asRecord(data);
	const exchanged = asRecord(root?.exchangedDocument);
	const transaction = asRecord(root?.transaction);
	const contract = asRecord(transaction?.contract);
	const seller = asRecord(asRecord(contract?.seller)?.postalAddress);
	const buyer = asRecord(asRecord(contract?.buyer)?.postalAddress);
	const delivery = asRecord(transaction?.delivery);
	const recipient = asRecord(asRecord(delivery?.recipient)?.postalAddress);
	const actualDelivery = asRecord(delivery?.actualDelivery);
	const debit = asRecord(transaction?.debit);
	const recommendation = asRecord(
		asRecord(root?.processControl)?.applicationRecommendationInfo,
	);
	const lines = listOf(transaction?.line);

	return {
		buyerCountry: coded(buyer?.countryCode),
		sellerCountry: coded(seller?.countryCode),
		typeCode: coded(exchanged?.invoiceTypeCode),
		issueTime: instant(exchanged?.invoiceIssueDate),
		profile:
			profileFromGuideline(coded(recommendation?.specificationIdentifier)) ??
			canonicalProfile(profile.extensionSchema.conformanceLevel),
		actualDelivery: actualDelivery?.date != null,
		invoicingPeriod: debit?.invoicingPeriod != null,
		deliveryCountry: coded(recipient?.countryCode),
		linePeriod:
			lines.length > 0 &&
			lines.every((line) => asRecord(line.billing)?.invoicePeriod != null),
	};
}

function profileFromGuideline(
	identifier: string | undefined,
): string | undefined {
	if (!identifier) return undefined;
	const value = identifier.trim().toLowerCase();
	if (value.includes("xrechnung")) return "XRECHNUNG";
	if (value.endsWith(":minimum")) return "MINIMUM";
	if (value.endsWith(":basicwl")) return "BASIC WL";
	if (value.endsWith(":basic")) return "BASIC";
	if (value.endsWith(":extended")) return "EXTENDED";
	if (value.endsWith(":comfort")) return "COMFORT";
	if (value === "urn:cen.eu:en16931:2017" || value.endsWith(":en16931")) {
		return "EN 16931";
	}
	return canonicalProfile(identifier);
}

function coded(value: unknown): string | undefined {
	if (typeof value === "string" || typeof value === "number") {
		const text = String(value).trim();
		return text || undefined;
	}
	const record = asRecord(value);
	if (!record) return undefined;
	return coded(record.value ?? record.identifier);
}

function instant(value: unknown): number | undefined {
	if (value instanceof Date) return timeOf(value);
	if (typeof value === "string") return invoiceTime(value);
	if (typeof value === "number") {
		const text = String(value);
		if (/^\d{6}$/.test(text) || /^\d{8}$/.test(text)) return invoiceTime(text);
		const date = new Date(value);
		return Number.isNaN(date.getTime()) ? undefined : date.getTime();
	}
	const record = asRecord(value);
	if (!record) return undefined;
	return instant(record.date ?? record.value ?? record.raw);
}

function timeOf(value: unknown): number | undefined {
	if (value instanceof Date) {
		return Number.isNaN(value.getTime()) ? undefined : value.getTime();
	}
	return typeof value === "string" ? invoiceTime(value) : undefined;
}

function invoiceTime(value: string | undefined): number | undefined {
	if (!value) return undefined;
	const digits = value.trim();
	const iso = /^\d{8}$/.test(digits)
		? `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`
		: /^\d{6}$/.test(digits)
			? `${digits.slice(0, 4)}-${digits.slice(4, 6)}-01`
			: digits;
	const time = Date.parse(`${iso}T00:00:00.000Z`);
	if (!Number.isNaN(time)) return time;
	const parsed = Date.parse(digits);
	return Number.isNaN(parsed) ? undefined : parsed;
}

function isPdfAEnvelope(
	part: string | undefined,
	conformance: string | undefined,
) {
	const level = conformance?.trim().toUpperCase();
	if (part === "3" && (level === "B" || level === "U" || level === "A")) {
		return true;
	}
	return part === "4" && level === "F";
}

function relationshipAllowed(
	profile: string,
	relationship: string | undefined,
	buyer: string | undefined,
	seller: string | undefined,
): boolean {
	if (!relationship) return false;
	const columns: ("DE" | "FR")[] =
		buyer === "DE" && seller === "DE"
			? ["DE"]
			: buyer === "FR" && seller === "FR"
				? ["FR"]
				: ["DE", "FR"];
	return columns.some((column) => columnAllows(profile, column, relationship));
}

function columnAllows(
	profile: string,
	column: "DE" | "FR",
	relationship: string,
): boolean {
	if (profile === "XRECHNUNG" && column === "FR") return false;
	if (profile === "MINIMUM" || profile === "BASIC WL") {
		return relationship === "Data";
	}
	if (profile === "XRECHNUNG") return relationship === "Alternative";
	if (column === "DE") return relationship === "Alternative";
	return (
		relationship === "Alternative" ||
		relationship === "Source" ||
		relationship === "Data"
	);
}

function usesProfile(
	declared: string | undefined,
	embedded: string | undefined,
	profile: string,
): boolean {
	return declared === profile || embedded === profile;
}

function domestic(facts: Facts, code: "DE" | "FR"): boolean {
	return (
		country(facts.buyerCountry) === code &&
		country(facts.sellerCountry) === code
	);
}

function country(value: string | undefined): string | undefined {
	const trimmed = value?.trim().toUpperCase();
	return trimmed || undefined;
}

function canonicalProfile(value: string | undefined): string | undefined {
	if (!value?.trim()) return undefined;
	const key = value
		.trim()
		.toUpperCase()
		.replace(/[_-]+/g, " ")
		.replace(/\s+/g, " ");
	return PROFILE_ALIASES[key];
}

function streamBytes(stream: PDFStream): Uint8Array | undefined {
	if (stream instanceof PDFRawStream) {
		if (stream.dict.has(PDFName.of("Filter"))) {
			try {
				return decodePDFRawStream(stream).decode();
			} catch {
				return undefined;
			}
		}
		return stream.getContents();
	}
	const unencoded = stream as PDFStream & {
		getUnencodedContents?: () => Uint8Array;
	};
	if (typeof unencoded.getUnencodedContents !== "function") return undefined;
	try {
		return unencoded.getUnencodedContents();
	} catch {
		return undefined;
	}
}

function decodeObject(value: unknown): string | undefined {
	if (value instanceof PDFName) return value.decodeText();
	if (value instanceof PDFString || value instanceof PDFHexString) {
		return value.decodeText();
	}
	return undefined;
}

function listOf(value: unknown): Record<string, unknown>[] {
	if (Array.isArray(value)) return value.filter(isRecord);
	return isRecord(value) ? [value] : [];
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
	if (!value || typeof value !== "object" || Array.isArray(value))
		return undefined;
	return value as Record<string, unknown>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return !!asRecord(value);
}

function firstText(value: unknown, depth = 0): string | undefined {
	if (depth > 20 || value == null) return undefined;
	if (
		typeof value === "string" ||
		typeof value === "number" ||
		typeof value === "boolean"
	) {
		const text = String(value).trim();
		return text || undefined;
	}
	if (Array.isArray(value)) {
		for (const entry of value) {
			const text = firstText(entry, depth + 1);
			if (text) return text;
		}
		return undefined;
	}
	if (typeof value === "object") {
		const record = value as Record<string, unknown>;
		if ("#" in record) return firstText(record["#"], depth + 1);
		for (const [key, entry] of Object.entries(record)) {
			if (key.startsWith("@")) continue;
			const text = firstText(entry, depth + 1);
			if (text) return text;
		}
	}
	return undefined;
}

function rule(
	id: HybridRuleId,
	level: HybridRuleLevel,
	message: string,
): HybridRuleIssue {
	return { id, level, message };
}
