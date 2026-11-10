import type { PDFDocument, PDFObject } from "pdf-lib";
import {
	decodePDFRawStream,
	PDFArray,
	PDFDict,
	PDFHexString,
	PDFName,
	PDFNumber,
	PDFRawStream,
	PDFRef,
	PDFStream,
	PDFString,
} from "pdf-lib";
import { convert } from "xmlbuilder2";

export type PdfA3Level = "B" | "U" | "A";

const LEVELS = new Set<PdfA3Level>(["B", "U", "A"]);
const FORBIDDEN_ACTIONS = new Set([
	"/JavaScript",
	"/Launch",
	"/Sound",
	"/Movie",
	"/ResetForm",
	"/ImportData",
]);
const FONT_FILES = ["FontFile", "FontFile2", "FontFile3"];
const PRINT_FLAG = 4;
const BLOCKED_ANNOTATION_FLAGS = 1 | 2 | 32 | 256;
const DEVICE_SPACE = /\/Device(?:Gray|RGB|CMYK)(?![A-Za-z0-9])/;
const NON_DEVICE_SPACE =
	/\/(?:ICCBased|CalGray|CalRGB|Lab|DeviceN|Separation|Pattern|Indexed)(?![A-Za-z0-9])/;
const PAINT_OPERATOR =
	/(?:^|[\s])(?:scn|SCN|sc|SC|rg|RG|k|K|g|G|Tj|TJ|'|"|f\*|B\*|b\*|f|F|B|b|S|s)(?=$|[\s])/;

const INFO_TEXT = [
	["Title", "dc:title"],
	["Author", "dc:creator"],
	["Creator", "xmp:CreatorTool"],
	["Producer", "pdf:Producer"],
] as const;

const INFO_DATES = [
	["CreationDate", "xmp:CreateDate"],
	["ModDate", "xmp:ModifyDate"],
] as const;

/**
 * Structural PDF/A-3 check over a pdf-lib document.
 * Raw XML has no PDF to test and returns true.
 * `levels` is the set of declared conformance levels that are acceptable.
 */
export function isPdfA3Conformant(
	pdf: PDFDocument | undefined,
	levels: PdfA3Level | PdfA3Level[] = ["B", "U", "A"],
): boolean {
	if (!pdf) return true;

	const allowed = new Set(Array.isArray(levels) ? levels : [levels]);
	if (!isPdfVersion17(pdf) || !trailerIsOpen(pdf)) return false;

	const descriptions = readDescriptions(pdf);
	if (!descriptions) return false;

	const level = declaredLevel(descriptions);
	if (!level || !allowed.has(level)) return false;
	if (!infoAgrees(pdf, descriptions)) return false;
	if (!outputIntentsOk(pdf)) return false;
	if (!fontsOk(pdf, level)) return false;
	if (!restrictionsOk(pdf)) return false;
	if (!annotationsOk(pdf)) return false;
	if (!embeddedFilesOk(pdf)) return false;
	if (level === "A" && !accessibilityOk(pdf)) return false;

	return true;
}

function isPdfVersion17(pdf: PDFDocument): boolean {
	const header = pdf.context.header.toString().match(/PDF-(\d+)\.(\d+)/);
	if (!header?.[1] || !header[2]) return false;

	let major = Number(header[1]);
	let minor = Number(header[2]);
	const catalogVersion = pdf.catalog.get(PDFName.of("Version"));
	if (catalogVersion instanceof PDFName) {
		const catalog = catalogVersion.decodeText().match(/(\d+)\.(\d+)/);
		if (catalog?.[1] && catalog[2]) {
			const catalogMajor = Number(catalog[1]);
			const catalogMinor = Number(catalog[2]);
			if (
				catalogMajor > major ||
				(catalogMajor === major && catalogMinor > minor)
			) {
				major = catalogMajor;
				minor = catalogMinor;
			}
		}
	}

	return major === 1 && minor === 7;
}

function trailerIsOpen(pdf: PDFDocument): boolean {
	if (pdf.context.trailerInfo.Encrypt) return false;
	const id = pdf.context.trailerInfo.ID;
	if (!(id instanceof PDFArray) || id.size() < 2) return false;
	return isByteString(id.get(0)) && isByteString(id.get(1));
}

function isByteString(value: PDFObject | undefined): boolean {
	return value instanceof PDFString || value instanceof PDFHexString;
}

function readDescriptions(
	pdf: PDFDocument,
): Record<string, unknown>[] | undefined {
	const metadata = pdf.catalog.get(PDFName.of("Metadata"));
	if (!metadata) return undefined;

	const stream = pdf.context.lookup(metadata);
	if (!(stream instanceof PDFStream)) return undefined;
	if (stream.dict.has(PDFName.of("Filter"))) return undefined;
	if (stream.dict.get(PDFName.of("Subtype"))?.toString() !== "/XML") {
		return undefined;
	}

	const bytes = readStream(stream);
	if (!bytes) return undefined;

	try {
		const parsed = convert(new TextDecoder().decode(bytes), {
			format: "object",
		});
		const descriptions = descriptionsOf(parsed);
		return descriptions.length > 0 ? descriptions : undefined;
	} catch {
		return undefined;
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

function asRecord(value: unknown): Record<string, unknown> | undefined {
	if (!value || typeof value !== "object" || Array.isArray(value)) {
		return undefined;
	}
	return value as Record<string, unknown>;
}

function declaredLevel(
	descriptions: Record<string, unknown>[],
): PdfA3Level | undefined {
	const part = firstText(findValue(descriptions, "pdfaid:part"));
	const conformance = firstText(findValue(descriptions, "pdfaid:conformance"));
	if (part !== "3") return undefined;
	if (!conformance || !LEVELS.has(conformance as PdfA3Level)) return undefined;
	return conformance as PdfA3Level;
}

function infoAgrees(
	pdf: PDFDocument,
	descriptions: Record<string, unknown>[],
): boolean {
	for (const [infoKey, xmpKey] of INFO_TEXT) {
		const info = infoString(pdf, infoKey);
		if (info === undefined) continue;
		const texts = textLeaves(findValue(descriptions, xmpKey)).map((value) =>
			value.trim(),
		);
		if (!texts.includes(info.trim())) return false;
	}

	for (const [infoKey, xmpKey] of INFO_DATES) {
		const info = infoDate(pdf, infoKey);
		if (info === undefined) continue;
		if (info === null) return false;
		const matches = textLeaves(findValue(descriptions, xmpKey)).some((value) =>
			sameSecond(info, value),
		);
		if (!matches) return false;
	}

	return true;
}

function infoDict(pdf: PDFDocument): PDFDict | undefined {
	const info = pdf.context.trailerInfo.Info;
	if (!info) return undefined;
	const dict = pdf.context.lookup(info);
	return dict instanceof PDFDict ? dict : undefined;
}

function infoString(pdf: PDFDocument, key: string): string | undefined {
	const value = infoDict(pdf)?.lookup(PDFName.of(key));
	if (value instanceof PDFString || value instanceof PDFHexString) {
		return value.decodeText();
	}
	return undefined;
}

function infoDate(pdf: PDFDocument, key: string): Date | null | undefined {
	const info = infoDict(pdf);
	if (!info?.has(PDFName.of(key))) return undefined;
	const value = info.lookup(PDFName.of(key));
	if (!(value instanceof PDFString || value instanceof PDFHexString)) {
		return null;
	}
	try {
		return value.decodeDate();
	} catch {
		return null;
	}
}

function findValue(
	descriptions: Record<string, unknown>[],
	key: string,
): unknown {
	for (const description of descriptions) {
		if (key in description) return description[key];
	}
	return undefined;
}

function firstText(value: unknown): string | undefined {
	for (const text of textLeaves(value)) {
		const trimmed = text.trim();
		if (trimmed) return trimmed;
	}
	return undefined;
}

function textLeaves(value: unknown, depth = 0): string[] {
	if (depth > 20 || value == null) return [];
	if (
		typeof value === "string" ||
		typeof value === "number" ||
		typeof value === "boolean"
	) {
		return [String(value)];
	}
	if (Array.isArray(value)) {
		return value.flatMap((entry) => textLeaves(entry, depth + 1));
	}
	if (typeof value === "object") {
		const record = value as Record<string, unknown>;
		if ("#" in record) return textLeaves(record["#"], depth + 1);
		return Object.entries(record)
			.filter(([key]) => !key.startsWith("@"))
			.flatMap(([, entry]) => textLeaves(entry, depth + 1));
	}
	return [];
}

function sameSecond(info: Date, value: string): boolean {
	const parsed = Date.parse(value.trim());
	if (Number.isNaN(parsed)) return false;
	return Math.floor(parsed / 1000) === Math.floor(info.getTime() / 1000);
}

function outputIntentsOk(pdf: PDFDocument): boolean {
	const deviceColor = documentUsesDeviceColor(pdf);
	if (deviceColor === undefined) return false;

	const intents = pdf.catalog.lookup(PDFName.of("OutputIntents"));
	if (!(intents instanceof PDFArray)) return !deviceColor;

	let matched = false;
	for (let index = 0; index < intents.size(); index++) {
		const intent = intents.lookup(index);
		if (!(intent instanceof PDFDict)) return false;
		if (intent.get(PDFName.of("S"))?.toString() !== "/GTS_PDFA1") continue;
		matched = true;
		if (!outputIntentValid(intent)) return false;
	}

	return deviceColor ? matched : true;
}

function outputIntentValid(intent: PDFDict): boolean {
	const identifier = intent.lookup(PDFName.of("OutputConditionIdentifier"));
	if (
		!(identifier instanceof PDFString || identifier instanceof PDFHexString)
	) {
		return false;
	}
	if (!identifier.decodeText().trim()) return false;

	const profile = intent.lookup(PDFName.of("DestOutputProfile"));
	if (!(profile instanceof PDFStream)) return false;
	const bytes = readStream(profile);
	return !!bytes && isOutputProfile(bytes);
}

function isOutputProfile(bytes: Uint8Array): boolean {
	if (bytes.length < 128) return false;
	const ascii = (offset: number, length: number) =>
		String.fromCharCode(...bytes.subarray(offset, offset + length));
	if (ascii(36, 4) !== "acsp") return false;

	const deviceClass = ascii(12, 4);
	if (deviceClass !== "mntr" && deviceClass !== "prtr") return false;

	const space = ascii(16, 4);
	return space === "RGB " || space === "GRAY" || space === "CMYK";
}

function documentUsesDeviceColor(pdf: PDFDocument): boolean | undefined {
	const seen = new WeakSet<PDFDict>();
	let found = false;
	for (const page of pdf.getPages()) {
		const usesDevice = nodeUsesDeviceColor(page.node, seen);
		if (usesDevice === undefined) return undefined;
		found ||= usesDevice;
	}
	return found;
}

function nodeUsesDeviceColor(
	node: PDFDict,
	seen: WeakSet<PDFDict>,
): boolean | undefined {
	if (seen.has(node)) return false;
	seen.add(node);
	return inspectNode(node, seen);
}

function inspectNode(
	node: PDFDict,
	seen: WeakSet<PDFDict>,
): boolean | undefined {
	let found = false;
	const resources = node.lookup(PDFName.of("Resources"));
	if (resources instanceof PDFDict) {
		const fromResources = resourcesUseDeviceColor(resources, seen);
		if (fromResources === undefined) return undefined;
		found ||= fromResources;
	}

	const contents = contentStreams(node);
	if (!contents) return undefined;
	for (const stream of contents) {
		const bytes = readStream(stream);
		if (!bytes) return undefined;
		if (textUsesDeviceColor(latin1(bytes))) found = true;
	}

	return found;
}

function resourcesUseDeviceColor(
	resources: PDFDict,
	seen: WeakSet<PDFDict>,
): boolean | undefined {
	let found = false;
	const colorSpaces = resources.lookup(PDFName.of("ColorSpace"));
	if (colorSpaces instanceof PDFDict) {
		for (const value of colorSpaces.values()) {
			if (colorSpaceIsDevice(resources.context.lookup(value))) found = true;
		}
	}

	const xobjects = resources.lookup(PDFName.of("XObject"));
	if (xobjects instanceof PDFDict) {
		const fromXObjects = xObjectsUseDeviceColor(xobjects, seen);
		if (fromXObjects === undefined) return undefined;
		found ||= fromXObjects;
	}

	return found;
}

function xObjectsUseDeviceColor(
	xobjects: PDFDict,
	seen: WeakSet<PDFDict>,
): boolean | undefined {
	let found = false;
	for (const value of xobjects.values()) {
		const xobj = xobjects.context.lookup(value);
		if (!(xobj instanceof PDFStream)) continue;

		const subtype = xobj.dict.get(PDFName.of("Subtype"))?.toString();
		if (subtype === "/Image") {
			if (colorSpaceIsDevice(xobj.dict.lookup(PDFName.of("ColorSpace")))) {
				found = true;
			}
			continue;
		}
		if (subtype !== "/Form") continue;
		if (seen.has(xobj.dict)) continue;

		seen.add(xobj.dict);
		const bytes = readStream(xobj);
		if (!bytes) return undefined;
		if (textUsesDeviceColor(latin1(bytes))) found = true;

		const nested = inspectNode(xobj.dict, seen);
		if (nested === undefined) return undefined;
		found ||= nested;
	}
	return found;
}

function contentStreams(node: PDFDict): PDFStream[] | undefined {
	const contents = node.lookup(PDFName.of("Contents"));
	if (!contents) return [];
	if (contents instanceof PDFStream) return [contents];
	if (!(contents instanceof PDFArray)) return undefined;

	const streams: PDFStream[] = [];
	for (let index = 0; index < contents.size(); index++) {
		const item = contents.lookup(index);
		if (item instanceof PDFStream) streams.push(item);
		else if (item) return undefined;
	}
	return streams;
}

function colorSpaceIsDevice(value: PDFObject | undefined): boolean {
	if (value instanceof PDFName) {
		const name = value.toString();
		return (
			name === "/DeviceGray" || name === "/DeviceRGB" || name === "/DeviceCMYK"
		);
	}
	if (value instanceof PDFArray) {
		for (let index = 0; index < value.size(); index++) {
			if (colorSpaceIsDevice(value.lookup(index))) return true;
		}
	}
	return false;
}

function textUsesDeviceColor(text: string): boolean {
	if (!text.trim()) return false;
	if (DEVICE_SPACE.test(text)) return true;
	return PAINT_OPERATOR.test(text) && !NON_DEVICE_SPACE.test(text);
}

function fontsOk(pdf: PDFDocument, level: PdfA3Level): boolean {
	const fonts: PDFDict[] = [];
	const seen = new WeakSet<PDFDict>();
	for (const page of pdf.getPages()) {
		if (!collectFonts(page.node, fonts, seen)) return false;
	}

	const unicode = level === "U" || level === "A";
	return fonts.every(
		(font) => fontEmbedded(font) && (!unicode || hasToUnicode(font)),
	);
}

function collectFonts(
	node: PDFDict,
	fonts: PDFDict[],
	seen: WeakSet<PDFDict>,
): boolean {
	if (seen.has(node)) return true;
	seen.add(node);

	const resources = node.lookup(PDFName.of("Resources"));
	if (resources instanceof PDFDict) {
		const fontDict = resources.lookup(PDFName.of("Font"));
		if (fontDict instanceof PDFDict) {
			for (const value of fontDict.values()) {
				const font = resources.context.lookup(value);
				if (!(font instanceof PDFDict)) return false;
				fonts.push(font);
			}
		}

		const xobjects = resources.lookup(PDFName.of("XObject"));
		if (xobjects instanceof PDFDict) {
			for (const value of xobjects.values()) {
				const xobj = resources.context.lookup(value);
				const dict =
					xobj instanceof PDFStream
						? xobj.dict
						: xobj instanceof PDFDict
							? xobj
							: undefined;
				if (dict && !collectFonts(dict, fonts, seen)) return false;
			}
		}
	}

	const annots = node.lookup(PDFName.of("Annots"));
	if (annots instanceof PDFArray) {
		for (let index = 0; index < annots.size(); index++) {
			const annot = annots.lookup(index);
			if (!(annot instanceof PDFDict)) continue;
			const appearance = annot.lookup(PDFName.of("AP"));
			if (!(appearance instanceof PDFDict)) continue;
			if (!collectAppearanceFonts(appearance, fonts, seen)) return false;
		}
	}

	return true;
}

function collectAppearanceFonts(
	appearance: PDFDict,
	fonts: PDFDict[],
	seen: WeakSet<PDFDict>,
): boolean {
	for (const key of ["N", "R", "D"]) {
		const entry = appearance.lookup(PDFName.of(key));
		if (entry instanceof PDFStream) {
			if (!collectFonts(entry.dict, fonts, seen)) return false;
			continue;
		}
		if (!(entry instanceof PDFDict)) continue;
		for (const value of entry.values()) {
			const stream = entry.context.lookup(value);
			if (
				stream instanceof PDFStream &&
				!collectFonts(stream.dict, fonts, seen)
			) {
				return false;
			}
		}
	}
	return true;
}

function fontEmbedded(font: PDFDict): boolean {
	const subtype = font.get(PDFName.of("Subtype"))?.toString();
	if (subtype === "/Type0") {
		const descendants = font.lookup(PDFName.of("DescendantFonts"));
		if (!(descendants instanceof PDFArray) || descendants.size() === 0) {
			return false;
		}
		for (let index = 0; index < descendants.size(); index++) {
			const descendant = descendants.lookup(index);
			if (!(descendant instanceof PDFDict) || !hasFontFile(descendant)) {
				return false;
			}
		}
		return true;
	}
	if (subtype === "/Type3") {
		const charProcs = font.lookup(PDFName.of("CharProcs"));
		return charProcs instanceof PDFDict && charProcs.entries().length > 0;
	}
	return hasFontFile(font);
}

function hasFontFile(font: PDFDict): boolean {
	const descriptor = font.lookup(PDFName.of("FontDescriptor"));
	if (!(descriptor instanceof PDFDict)) return false;
	return FONT_FILES.some((key) => {
		const file = descriptor.lookup(PDFName.of(key));
		return file instanceof PDFStream;
	});
}

function hasToUnicode(font: PDFDict): boolean {
	if (font.get(PDFName.of("Subtype"))?.toString() === "/Type3") return true;
	return font.lookup(PDFName.of("ToUnicode")) instanceof PDFStream;
}

function restrictionsOk(pdf: PDFDocument): boolean {
	const seen = new Set<PDFObject>();
	const accept = (dict: PDFDict) => !dictIsForbidden(dict);
	if (!visitObject(pdf.catalog, pdf.context, seen, accept)) return false;
	for (const [, object] of pdf.context.enumerateIndirectObjects()) {
		if (!visitObject(object, pdf.context, seen, accept)) return false;
	}
	return true;
}

function dictIsForbidden(dict: PDFDict): boolean {
	if (
		dict.has(PDFName.of("JS")) ||
		dict.has(PDFName.of("AA")) ||
		dict.has(PDFName.of("JavaScript")) ||
		dict.has(PDFName.of("XFA"))
	) {
		return true;
	}

	const action = dict.get(PDFName.of("S"));
	if (action instanceof PDFName && FORBIDDEN_ACTIONS.has(action.toString())) {
		return true;
	}
	if (hasForbiddenFilter(dict.lookup(PDFName.of("Filter")))) return true;
	if (dict.get(PDFName.of("Interpolate"))?.toString() === "true") return true;
	if (dict.has(PDFName.of("TR")) || dict.has(PDFName.of("TR2"))) return true;
	if (dict.get(PDFName.of("NeedAppearances"))?.toString() === "true") {
		return true;
	}
	return false;
}

function hasForbiddenFilter(filter: PDFObject | undefined): boolean {
	if (filter instanceof PDFName) {
		const name = filter.toString();
		return name === "/LZWDecode" || name === "/Crypt";
	}
	if (filter instanceof PDFArray) {
		for (let index = 0; index < filter.size(); index++) {
			if (hasForbiddenFilter(filter.lookup(index))) return true;
		}
	}
	return false;
}

function visitObject(
	object: PDFObject | undefined,
	context: PDFDocument["context"],
	seen: Set<PDFObject>,
	accept: (dict: PDFDict) => boolean,
): boolean {
	if (!object) return true;
	const resolved = object instanceof PDFRef ? context.lookup(object) : object;
	if (!resolved || seen.has(resolved)) return true;
	seen.add(resolved);

	if (resolved instanceof PDFArray) {
		for (let index = 0; index < resolved.size(); index++) {
			if (!visitObject(resolved.get(index), context, seen, accept))
				return false;
		}
		return true;
	}

	if (resolved instanceof PDFStream) {
		if (!seen.has(resolved.dict)) {
			seen.add(resolved.dict);
			if (!accept(resolved.dict)) return false;
		}
		return visitEntries(resolved.dict, context, seen, accept);
	}

	if (resolved instanceof PDFDict) {
		if (!accept(resolved)) return false;
		return visitEntries(resolved, context, seen, accept);
	}

	return true;
}

function visitEntries(
	dict: PDFDict,
	context: PDFDocument["context"],
	seen: Set<PDFObject>,
	accept: (dict: PDFDict) => boolean,
): boolean {
	for (const [, value] of dict.entries()) {
		if (!visitObject(value, context, seen, accept)) return false;
	}
	return true;
}

function annotationsOk(pdf: PDFDocument): boolean {
	for (const page of pdf.getPages()) {
		const annots = page.node.lookup(PDFName.of("Annots"));
		if (!annots) continue;
		if (!(annots instanceof PDFArray)) return false;

		for (let index = 0; index < annots.size(); index++) {
			const annot = annots.lookup(index);
			if (!(annot instanceof PDFDict)) return false;
			if (annot.get(PDFName.of("Subtype"))?.toString() === "/Popup") continue;

			const flags = annot.get(PDFName.of("F"));
			if (!(flags instanceof PDFNumber)) return false;
			const value = flags.asNumber();
			if ((value & PRINT_FLAG) === 0) return false;
			if ((value & BLOCKED_ANNOTATION_FLAGS) !== 0) return false;
		}
	}
	return true;
}

function embeddedFilesOk(pdf: PDFDocument): boolean {
	const specs = embeddedFileSpecs(pdf);
	if (!specs) return false;
	if (specs.length === 0) return true;

	const associatedFiles = pdf.catalog.lookup(PDFName.of("AF"));
	if (!(associatedFiles instanceof PDFArray)) return false;

	const associated = new Set<PDFDict>();
	for (let index = 0; index < associatedFiles.size(); index++) {
		const spec = associatedFiles.lookup(index);
		if (spec instanceof PDFDict) associated.add(spec);
	}

	return specs.every((spec) => fileSpecOk(spec, associated));
}

function embeddedFileSpecs(pdf: PDFDocument): PDFDict[] | undefined {
	if (!pdf.catalog.has(PDFName.of("Names"))) return [];
	const names = pdf.catalog.lookup(PDFName.of("Names"));
	if (!(names instanceof PDFDict) || !names.has(PDFName.of("EmbeddedFiles"))) {
		return [];
	}

	const embedded = names.lookup(PDFName.of("EmbeddedFiles"));
	if (!(embedded instanceof PDFDict) || !embedded.has(PDFName.of("Names"))) {
		return [];
	}

	const entries = embedded.lookup(PDFName.of("Names"));
	if (!(entries instanceof PDFArray)) return undefined;

	const specs: PDFDict[] = [];
	for (let index = 0; index < entries.size(); index += 2) {
		const spec = entries.lookup(index + 1);
		if (!(spec instanceof PDFDict)) return undefined;
		specs.push(spec);
	}
	return specs;
}

function fileSpecOk(spec: PDFDict, associated: Set<PDFDict>): boolean {
	if (!associated.has(spec)) return false;
	if (!spec.get(PDFName.of("F")) || !spec.get(PDFName.of("UF"))) return false;

	const relationship = spec.get(PDFName.of("AFRelationship"));
	if (!(relationship instanceof PDFName) || relationship.toString() === "/") {
		return false;
	}

	const embedded = spec.lookup(PDFName.of("EF"));
	if (!(embedded instanceof PDFDict)) return false;
	const stream = embedded.lookup(PDFName.of("F"));
	if (!(stream instanceof PDFStream)) return false;
	if (!stream.dict.get(PDFName.of("Subtype"))) return false;

	const params = stream.dict.lookup(PDFName.of("Params"));
	return params instanceof PDFDict && !!params.get(PDFName.of("ModDate"));
}

function accessibilityOk(pdf: PDFDocument): boolean {
	const markInfo = pdf.catalog.lookup(PDFName.of("MarkInfo"));
	if (!(markInfo instanceof PDFDict)) return false;
	if (markInfo.get(PDFName.of("Marked"))?.toString() !== "true") return false;
	if (!(pdf.catalog.lookup(PDFName.of("StructTreeRoot")) instanceof PDFDict)) {
		return false;
	}

	const lang = pdf.catalog.lookup(PDFName.of("Lang"));
	if (!(lang instanceof PDFString || lang instanceof PDFHexString))
		return false;
	return lang.decodeText().trim().length > 0;
}

function readStream(stream: PDFStream): Uint8Array | undefined {
	if (!(stream instanceof PDFRawStream)) {
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

	try {
		return decodePDFRawStream(stream).decode();
	} catch {
		return undefined;
	}
}

function latin1(bytes: Uint8Array): string {
	let text = "";
	for (let index = 0; index < bytes.length; index += 0x8000) {
		text += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
	}
	return text;
}
