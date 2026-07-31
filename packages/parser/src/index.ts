import type {
	ZugferdOptions as ZFOptions,
	ZugferdPlugin,
	ZugferdProfile,
} from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import {
	PDFArray,
	PDFDict,
	PDFDocument,
	PDFHexString,
	PDFName,
	PDFNumber,
	PDFRef,
	PDFStream,
	PDFString,
} from "pdf-lib";
import { convert, create } from "xmlbuilder2";
import type {
	XMLSerializedAsObject,
	XMLSerializedAsObjectArray,
} from "xmlbuilder2/lib/interfaces";
import { getAttachments, getMetadata } from "./helper";
import { defaultProfileMap } from "./profiles";
import type { MatchContext, ParserOptions } from "./types";
import { createXPath } from "./xpath";
import type { ZugferdContext } from "@node-zugferd/core";

declare module "@node-zugferd/core" {
	interface ZugferdPluginRegistry<ZugferdOptions, Options> {
		parser: {
			creator: typeof parser<
				ZugferdOptions extends infer R extends ZFOptions ? R : ZFOptions
			>;
		};
	}
}

const normalizeOptions = (options: ParserOptions | undefined) => {
	return {
		...(options ?? {}),
		profileMap: {
			...defaultProfileMap,
			...(options?.profileMap ?? {}),
		},
		hooks: {
			...(options?.hooks ?? {}),
			beforeParse: async (ctx) => {
				let xml: string;
				const getXml = () => xml ?? (xml = create(ctx.xml).toString());
				if (ctx.context.hasPlugin("xsd")) {
					const xsdPlugin = ctx.context.getPlugin("xsd");
					if (xsdPlugin && xsdPlugin.options?.autoRun !== false) {
						await (xsdPlugin.actions?.(ctx.context) as any)?.xsd?.validate?.(
							ctx.profile.id,
							getXml(),
							ctx.context,
						);
					}
				}
				if (ctx.context.hasPlugin("mustang")) {
					const mustangPlugin = ctx.context.getPlugin("mustang");
					if (mustangPlugin && mustangPlugin.options?.autoRun !== false) {
						await (
							mustangPlugin.actions?.(ctx.context) as any
						)?.mustang?.validate?.(ctx.profile.id, getXml(), ctx.context);
					}
				}
				return options?.hooks?.beforeParse?.(ctx);
			},
		},
	} satisfies ParserOptions;
};

export const documentParser = async (
	input: string | Uint8Array | ArrayBuffer,
) => {
	let pdf: PDFDocument | null = null;
	let attachments: ReturnType<typeof getAttachments> | null = null;
	try {
		pdf = await PDFDocument.load(input);
		attachments = getAttachments(pdf);
	} catch {}

	return {
		input,
		pdf,
		attachments,
		getXml: (
			opts?:
				| (
						| {
								profile: string;
								context: ZugferdContext;
								fileName?: never;
						  }
						| {
								profile?: ZugferdProfile | undefined;
								context?: ZugferdContext | undefined;
								fileName?: never;
						  }
						| {
								fileName?:
									| "factur-x.xml"
									| "order-x.xml"
									| "xrechnung.xml"
									| ("factur-x.xml" | "order-x.xml" | "xrechnung.xml")[]
									| undefined;
								context?: ZugferdContext | undefined;
								profile?: never;
						  }
				  )
				| undefined,
		) => {
			let xml: string | Uint8Array | ArrayBuffer | null = null;
			if (pdf) {
				const profile = opts?.profile
					? typeof opts.profile === "string"
						? opts.context.getProfile(opts.profile)
						: opts.profile
					: null;
				const fallbackFileNames = [
					"factur-x.xml",
					"xrechnung.xml",
					"order-x.xml",
				];
				const fileNames =
					!!profile || !!opts?.fileName
						? profile?.extensionSchema.fileName
							? [profile.extensionSchema.fileName]
							: opts?.fileName
								? Array.isArray(opts.fileName)
									? opts.fileName
									: [opts.fileName]
								: fallbackFileNames
						: fallbackFileNames;
				xml =
					attachments?.find((attachment) => fileNames.includes(attachment.name))
						?.data ?? null;
			} else {
				xml = input;
			}

			if (!xml) return null;
			return typeof xml === "string" ? xml : new TextDecoder().decode(xml);
		},
		getSpecificationIdentifier(
			xml: string | XMLSerializedAsObject | XMLSerializedAsObjectArray,
		) {
			const xmlObject: any =
				typeof xml === "string" ? convert(xml, { format: "object" }) : xml;
			const specificationIdentifier: string =
				xmlObject?.["rsm:CrossIndustryInvoice"]?.[
					"rsm:ExchangedDocumentContext"
				]?.["ram:GuidelineSpecifiedDocumentContextParameter"]?.["ram:ID"];

			if (
				!specificationIdentifier ||
				typeof specificationIdentifier !== "string"
			) {
				return null;
			}

			return specificationIdentifier;
		},
		async parse(
			ctx: ZugferdContext,
			opts: ParserOptions,
			profileOrInput: string | Uint8Array | ArrayBuffer,
			input_?: string | Uint8Array | ArrayBuffer | undefined,
		): Promise<Record<string, any>> {
			opts.profileMap = {
				...defaultProfileMap,
				...(opts.profileMap ?? {}),
			};

			const normalizeNode = <T>(node: T): T[] => {
				if (!node) return [];
				return Array.isArray(node) ? node : [node];
			};

			const resolveXmlForProfile = (
				candidateProfile: ZugferdProfile,
				pdfDoc: PDFDocument | undefined,
				pdfAttachments: ReturnType<typeof getAttachments> | undefined,
				rawInput: string | Uint8Array | ArrayBuffer,
			): string | null => {
				if (pdfDoc) {
					const file = pdfAttachments?.find(
						(attachment) =>
							attachment.name === candidateProfile.extensionSchema.fileName,
					);
					return file ? new TextDecoder().decode(file.data) : null;
				}

				return typeof rawInput === "string"
					? rawInput
					: new TextDecoder().decode(rawInput);
			};

			let lazyXml: XMLSerializedAsObject | XMLSerializedAsObjectArray | null =
				null;
			const createBaseContext = (
				profile: ZugferdProfile,
				pdfDoc: PDFDocument | undefined,
				xmlString: string,
			) => {
				lazyXml ??= convert(xmlString, { format: "object" });
				return {
					pdf: pdfDoc,
					xml: lazyXml,
					profile,
					context: ctx,
				};
			};

			let lazyMetadata: any | null = null;
			const createMatchContext = (
				candidateProfile: ZugferdProfile,
				pdfDoc: PDFDocument | undefined,
				xmlString: string,
			): MatchContext => {
				return {
					...createBaseContext(candidateProfile, pdfDoc, xmlString),
					matchesExtensionSchemaProfile() {
						if (!pdfDoc) return true;
						lazyMetadata ??= getMetadata(pdfDoc);
						if (!lazyMetadata) return false;

						const descriptions = normalizeNode(
							lazyMetadata["x:xmpmeta"]?.["rdf:RDF"]?.["rdf:Description"],
						);

						return descriptions.some((description: any) => {
							const namespace =
								candidateProfile.extensionSchema.namespace ?? "fx";
							const uri =
								candidateProfile.extensionSchema.uri ??
								"urn:factur-x:pdfa:CrossIndustryDocument:invoice:1p0#";
							const conformanceLevelKey = `${namespace}:${candidateProfile.extensionSchema.fieldNameMap?.conformanceLevel ?? "ConformanceLevel"}`;

							if (
								!(`@xmlns:${namespace}` in description) ||
								description[`@xmlns:${namespace}`] !== uri
							) {
								return false;
							}

							if (
								!(conformanceLevelKey in description) ||
								description[conformanceLevelKey] !==
									candidateProfile.extensionSchema.conformanceLevel
							) {
								return false;
							}

							return true;
						});
					},
					matchesSpecificationIdentifier(identifier: string | string[]) {
						const xmlObject: any = this.xml;
						const specificationIdentifier =
							xmlObject?.["rsm:CrossIndustryInvoice"]?.[
								"rsm:ExchangedDocumentContext"
							]?.["ram:GuidelineSpecifiedDocumentContextParameter"]?.["ram:ID"];

						if (!specificationIdentifier) return false;

						const identifiers = normalizeNode(identifier);
						return identifiers.includes(specificationIdentifier);
					},
					async isPdfA3Conformant(
						levels_: "B" | "U" | "A" | ("B" | "U" | "A")[] = ["B", "U", "A"],
					) {
						const levels = new Set(
							Array.isArray(levels_) ? [...levels_] : [levels_],
						);
						if (!pdfDoc) return true;
						const bytes = await pdfDoc.save();

						type RuleIdentifier = {
							specification: string;
							clause: string;
						};
						type Rule<Args = any> = {
							id: RuleIdentifier;
							description: string;
							test: (args: Args) => boolean;
							errorMsg: string | ((args: Args) => string);
							getArgs?: (() => Args | Promise<Args>) | undefined;
							references?: RuleIdentifier[] | undefined;
						};

						const addRule = <Args>(type: "B" | "U" | "A", data: Rule<Args>) => {
							rules[type].push(data);
						};
						const rules: Record<"B" | "U" | "A", {}[]> = {
							B: [],
							U: [],
							A: [],
						};

						const loadLazyObject = {};
						const lazyRuleObjects = {};

						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.3",
							},
							description:
								"The file trailer dictionary shall contain the ID keyword whose value shall be File Identifiers as defined in ISO 32000-1:2008, 14.4",
							getArgs: () => {
								let lastID: string[] | null = null;
								const idRef = pdfDoc.context.trailerInfo.ID;

								if (idRef) {
									const idArray = pdfDoc.context.lookup(idRef);
									if (idArray instanceof PDFArray) {
										for (let i = 0; i < idArray.size(); i++) {
											const element = idArray.get(i);
											if (
												element instanceof PDFHexString ||
												element instanceof PDFString
											) {
												(lastID ??= []).push(element.toString());
											}
										}
									}
								}
								return { lastID };
							},
							test: ({ lastID }) => lastID != null && lastID.length > 0,
							errorMsg: "Missing or empty ID in the document trailer",
							references: [
								{
									specification: "ISO 32000-1:2008",
									clause: "14.4",
								},
							],
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.3",
							},
							description:
								"The keyword Encrypt shall not be used in the trailer dictionary",
							getArgs: () => ({
								isEncrypted: pdfDoc.context.trailerInfo.Encrypt !== undefined,
							}),
							test: ({ isEncrypted }) => !isEncrypted,
							errorMsg: "Encrypt keyword is present in the trailer dictionary",
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.6",
							},
							description:
								"Hexadecimal strings shall contain an even number of non-white-space characters",
							getArgs: () => {
								let oddHexCount = 0;
								let inHexString = false;
								let currentHexCount = 0;
								let failedHexLength = 0;

								for (let i = 0; i < bytes.length; i++) {
									const byte = bytes[i];

									if (!inHexString) {
										if (byte === 0x3c /* < */) {
											if (i + 1 < bytes.length && bytes[i + 1] === 0x3c) {
												i++;
											} else {
												inHexString = true;
												currentHexCount = 0;
											}
										}
									} else {
										if (byte === 0x3e /* > */) {
											if (currentHexCount % 2 !== 0) {
												oddHexCount++;
												failedHexLength = currentHexCount;
											}
											inHexString = false;
										} else {
											const isWhitespace =
												byte === 0x00 ||
												byte === 0x09 ||
												byte === 0x0a ||
												byte === 0x0c ||
												byte === 0x0d ||
												byte === 0x20;

											if (!isWhitespace) {
												currentHexCount++;
											}
										}
									}
								}

								return {
									oddHexCount,
									hexCount: failedHexLength,
								};
							},
							test: ({ oddHexCount }) => oddHexCount === 0,
							errorMsg: ({ hexCount }) =>
								`A hexadecimal string contains odd number (${hexCount}) of non-white-space characters`,
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.6",
							},
							description:
								"A hexadecimal string is written as a sequence of hexadecimal digits (0–9 and either A–F or a–f)",
							test: () => {
								let containsOnlyHex = true;
								let inHexString = false;

								for (let i = 0; i < bytes.length; i++) {
									const byte = bytes[i]!;

									if (!inHexString) {
										if (byte === 0x3c /* < */) {
											if (i + 1 < bytes.length && bytes[i + 1] === 0x3c) {
												i++;
											} else {
												inHexString = true;
											}
										}
									} else {
										if (byte === 0x3e /* > */) {
											inHexString = false;
										} else {
											const isWhitespace =
												byte === 0x00 ||
												byte === 0x09 ||
												byte === 0x0a ||
												byte === 0x0c ||
												byte === 0x0d ||
												byte === 0x20;

											if (!isWhitespace) {
												const isHexDigit =
													(byte >= 0x30 && byte <= 0x39) || // '0'-'9'
													(byte >= 0x41 && byte <= 0x46) || // 'A'-'F'
													(byte >= 0x61 && byte <= 0x66); // 'a'-'f'

												if (!isHexDigit) {
													containsOnlyHex = false;
													break;
												}
											}
										}
									}
								}

								return containsOnlyHex;
							},
							errorMsg:
								"Hexadecimal string contains non-white-space characters outside the range 0 to 9, A to F or a to f",
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.7.1",
							},
							description:
								"The value of the Length key specified in the stream dictionary shall match the number of bytes in the file following the LINE FEED (0x0A) character after the stream keyword and preceding the EOL marker before the endstream keyword",
							getArgs: () => {
								let isLengthValid = true;
								let expectedLength = 0;
								let actualLength = 0;

								const indirectObjects =
									pdfDoc.context.enumerateIndirectObjects();

								for (const [_ref, pdfObject] of indirectObjects) {
									if (pdfObject instanceof PDFStream) {
										const lengthObj = pdfDoc.context.lookup(
											pdfObject.dict.get(PDFName.of("Length")),
										);

										if (lengthObj instanceof PDFNumber) {
											expectedLength = lengthObj.asNumber();

											actualLength = pdfObject.getContents().length;

											const rawContents = (pdfObject as any).contents;
											if (rawContents instanceof Uint8Array) {
												actualLength = rawContents.length;
											}

											if (expectedLength !== actualLength) {
												isLengthValid = false;
												break;
											}
										}
									}
								}

								return {
									isLengthValid,
									expectedLength,
									actualLength,
								};
							},
							test: ({ isLengthValid }) => isLengthValid,
							errorMsg: ({ expectedLength, actualLength }) =>
								`Actual length of the stream (${actualLength} byte(s)) does not match the value of the Length key in the Stream dictionary (${expectedLength} byte(s))`,
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.7.1",
							},
							description:
								"The stream keyword shall be followed either by a CARRIAGE RETURN (0x0D) and LINE FEED (0x0A) character sequence or by a single LINE FEED (0x0A) character. The endstream keyword shall be preceded by an EOL marker",
							test: () => {
								let isStreamStructureValid = true;

								const streamMarker = new Uint8Array([
									115, 116, 114, 101, 97, 109,
								]);
								const endstreamMarker = new Uint8Array([
									101, 110, 100, 115, 116, 114, 101, 97, 109,
								]);

								for (let i = 0; i < bytes.length; i++) {
									if (i <= bytes.length - streamMarker.length) {
										let matchStream = true;
										for (let j = 0; j < streamMarker.length; j++) {
											if (bytes[i + j] !== streamMarker[j]) {
												matchStream = false;
												break;
											}
										}

										if (matchStream) {
											const nextIndex = i + streamMarker.length;

											const isCRLF =
												bytes[nextIndex] === 0x0d &&
												bytes[nextIndex + 1] === 0x0a;
											const isLF = bytes[nextIndex] === 0x0a;

											if (!isCRLF && !isLF) {
												isStreamStructureValid = false;
												break;
											}
										}
									}

									if (i <= bytes.length - endstreamMarker.length) {
										let matchEndstream = true;
										for (let j = 0; j < endstreamMarker.length; j++) {
											if (bytes[i + j] !== endstreamMarker[j]) {
												matchEndstream = false;
												break;
											}
										}

										if (matchEndstream) {
											const prevByte = bytes[i - 1];
											const hasValidLeadingEOL =
												prevByte === 0x0a || prevByte === 0x0d;

											if (!hasValidLeadingEOL) {
												isStreamStructureValid = false;
												break;
											}
										}
									}
								}

								return isStreamStructureValid;
							},
							errorMsg:
								"Extra spacings or missing EOL characters around keywords 'stream' and 'endstream'",
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.7.1",
							},
							description:
								"A stream dictionary shall not contain the F, FFilter, or FDecodeParms keys",
							getArgs: () => {
								let containsForbiddenExternalKeys = false;
								let forbiddenKeyFound = "";

								const indirectObjects =
									pdfDoc.context.enumerateIndirectObjects();

								for (const [ref, pdfObject] of indirectObjects) {
									if (pdfObject instanceof PDFStream) {
										const dict = pdfObject.dict;

										if (dict.has(PDFName.of("F"))) {
											containsForbiddenExternalKeys = true;
											forbiddenKeyFound = "F";
											break;
										}
										if (dict.has(PDFName.of("FFilter"))) {
											containsForbiddenExternalKeys = true;
											forbiddenKeyFound = "FFilter";
											break;
										}
										if (dict.has(PDFName.of("FDecodeParms"))) {
											containsForbiddenExternalKeys = true;
											forbiddenKeyFound = "FDecodeParms";
											break;
										}
									}
								}

								return {
									containsForbiddenExternalKeys,
									forbiddenKey: forbiddenKeyFound,
								};
							},
							test: ({ containsForbiddenExternalKeys }) =>
								!containsForbiddenExternalKeys,
							errorMsg: ({ forbiddenKey }) =>
								`A stream object dictionary contains ${forbiddenKey} key(s)`,
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.7.2",
							},
							description:
								"All standard stream filters listed in ISO 32000-1:2008, 7.4, Table 6 may be used, with the exception of LZWDecode. In addition, the Crypt filter shall not be used unless the value of the Name key in the decode parameters dictionary is Identity. Filters that are not listed in ISO 32000-1:2008, 7.4, Table 6 shall not be used",
							getArgs: () => {
								let isValidFilter = true;
								let failedFilterName = "";

								const allowedFilters = new Set([
									"ASCIIHexDecode",
									"ASCII85Decode",
									"FlateDecode",
									"RunLengthDecode",
									"CCITTFaxDecode",
									"JBIG2Decode",
									"DCTDecode",
									"JPXDecode",
								]);

								const checkFilter = (
									filterName: string,
									decodeParmsObj: any,
								): boolean => {
									if (allowedFilters.has(filterName)) {
										return true;
									}

									if (filterName === "Crypt") {
										if (decodeParmsObj instanceof PDFDict) {
											const nameKey = pdfDoc.context.lookup(
												decodeParmsObj.get(PDFName.of("Name")),
											);
											if (
												nameKey instanceof PDFName &&
												nameKey.asString() === "Identity"
											) {
												return true;
											}
										}
									}

									return false;
								};

								const indirectObjects =
									pdfDoc.context.enumerateIndirectObjects();

								for (const [_ref, pdfObject] of indirectObjects) {
									if (pdfObject instanceof PDFStream) {
										const dict = pdfObject.dict;
										const filterObj = pdfDoc.context.lookup(
											dict.get(PDFName.of("Filter")),
										);
										const decodeParmsObj = pdfDoc.context.lookup(
											dict.get(PDFName.of("DecodeParms")),
										);

										if (filterObj instanceof PDFName) {
											const filterName = filterObj.asString();
											if (!checkFilter(filterName, decodeParmsObj)) {
												isValidFilter = false;
												failedFilterName = filterName;
												break;
											}
										} else if (filterObj instanceof PDFArray) {
											for (let i = 0; i < filterObj.size(); i++) {
												const currentFilter = pdfDoc.context.lookup(
													filterObj.get(i),
												);

												if (currentFilter instanceof PDFName) {
													const filterName = currentFilter.asString();

													let specificDecodeParm = undefined;
													if (decodeParmsObj instanceof PDFArray) {
														specificDecodeParm = pdfDoc.context.lookup(
															decodeParmsObj.get(i),
														);
													} else if (
														decodeParmsObj instanceof PDFDict &&
														i === 0
													) {
														specificDecodeParm = decodeParmsObj;
													}

													if (!checkFilter(filterName, specificDecodeParm)) {
														isValidFilter = false;
														failedFilterName = filterName;
														break;
													}
												}
											}
											if (!isValidFilter) break;
										}
									}
								}

								return {
									isValidFilter,
									internalRepresentation: failedFilterName,
								};
							},
							test: ({ isValidFilter }) => isValidFilter,
							errorMsg: ({ internalRepresentation }) =>
								`Unknown or not permitted Stream filter ${internalRepresentation} is used`,
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.8",
							},
							description:
								"Font names, names of colourants in Separation and DeviceN colour spaces, and structure type names, after expansion of character sequences escaped with a NUMBER SIGN (0x23), if any, shall be valid UTF-8 character sequences",
							getArgs: () => {
								let isValidUtf8 = true;
								let failedValue = "";

								const checkNameValue = (pdfName: PDFName): boolean => {
									const rawString = pdfName.asString();
									const bytes: number[] = [];

									for (let i = 0; i < rawString.length; i++) {
										if (rawString[i] === "#" && i + 2 < rawString.length) {
											const hex = rawString.substring(i + 1, i + 3);
											const byteValue = parseInt(hex, 16);
											if (!isNaN(byteValue)) {
												bytes.push(byteValue);
												i += 2;
												continue;
											}
										}
										bytes.push(rawString.charCodeAt(i));
									}

									try {
										const decoder = new TextDecoder("utf-8", { fatal: true });
										decoder.decode(new Uint8Array(bytes));
										return true;
									} catch (e) {
										failedValue = rawString;
										return false;
									}
								};

								const indirectObjects =
									pdfDoc.context.enumerateIndirectObjects();

								for (const [_ref, pdfObject] of indirectObjects) {
									if (pdfObject instanceof PDFDict) {
										const type = pdfDoc.context.lookup(
											pdfObject.get(PDFName.of("Type")),
										);
										if (type instanceof PDFName && type.asString() === "Font") {
											const baseFont = pdfDoc.context.lookup(
												pdfObject.get(PDFName.of("BaseFont")),
											);
											if (
												baseFont instanceof PDFName &&
												!checkNameValue(baseFont)
											) {
												isValidUtf8 = false;
												break;
											}
											const fontName = pdfDoc.context.lookup(
												pdfObject.get(PDFName.of("FontName")),
											);
											if (
												fontName instanceof PDFName &&
												!checkNameValue(fontName)
											) {
												isValidUtf8 = false;
												break;
											}
										}

										const sKey = pdfDoc.context.lookup(
											pdfObject.get(PDFName.of("S")),
										);
										if (sKey instanceof PDFName) {
											const objType = pdfDoc.context.lookup(
												pdfObject.get(PDFName.of("Type")),
											);
											if (
												objType instanceof PDFName &&
												objType.asString() === "StructElem"
											) {
												if (!checkNameValue(sKey)) {
													isValidUtf8 = false;
													break;
												}
											}
										}

										for (const key of pdfObject.keys()) {
											const colorSpace = pdfDoc.context.lookup(
												pdfObject.get(key),
											);
											if (
												colorSpace instanceof PDFArray &&
												colorSpace.size() > 1
											) {
												const csType = pdfDoc.context.lookup(colorSpace.get(0));
												if (csType instanceof PDFName) {
													if (csType.asString() === "Separation") {
														const colorantName = pdfDoc.context.lookup(
															colorSpace.get(1),
														);
														if (
															colorantName instanceof PDFName &&
															!checkNameValue(colorantName)
														) {
															isValidUtf8 = false;
															break;
														}
													} else if (csType.asString() === "DeviceN") {
														const colorantNames = pdfDoc.context.lookup(
															colorSpace.get(1),
														);
														if (colorantNames instanceof PDFArray) {
															for (let i = 0; i < colorantNames.size(); i++) {
																const nameItem = pdfDoc.context.lookup(
																	colorantNames.get(i),
																);
																if (
																	nameItem instanceof PDFName &&
																	!checkNameValue(nameItem)
																) {
																	isValidUtf8 = false;
																	break;
																}
															}
														}
													}
												}
											}
										}
										if (!isValidUtf8) break;
									}
								}

								return {
									isValidUtf8,
									unicodeValue: failedValue,
								};
							},
							test: ({ isValidUtf8 }) => isValidUtf8,
							errorMsg: ({ unicodeValue }) =>
								`The name value ${unicodeValue} does not represent a correct UTF-8 character sequence`,
							references: [
								{
									specification: "ISO 32000-1:2008",
									clause: "7.3.5",
								},
							],
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.9",
							},
							description:
								"The object number and generation number shall be separated by a single white-space character. The generation number and obj keyword shall be separated by a single white-space character. The object number and endobj keyword shall each be preceded by an EOL marker. The obj and endobj keywords shall each be followed by an EOL marker",
							test: () => {
								let spacingCompliesPDFA = true;

								const isEOL = (b: number) => b === 0x0a || b === 0x0d;

								const isWhitespace = (b: number) =>
									b === 0x00 ||
									b === 0x09 ||
									b === 0x0a ||
									b === 0x0c ||
									b === 0x0d ||
									b === 0x20;

								for (let i = 0; i < bytes.length; i++) {
									if (
										bytes[i] === 111 && // 'o'
										bytes[i + 1] === 98 && // 'b'
										bytes[i + 2] === 106 // 'j'
									) {
										if (bytes[i - 1] !== 0x20) {
											spacingCompliesPDFA = false;
											break;
										}

										let idx = i - 2;
										while (
											idx >= 0 &&
											!!bytes[idx] &&
											bytes[idx]! >= 0x30 &&
											bytes[idx]! <= 0x39
										) {
											idx--;
										}

										if (bytes[idx] !== 0x20) {
											spacingCompliesPDFA = false;
											break;
										}

										idx--;
										while (
											idx >= 0 &&
											!!bytes[idx] &&
											bytes[idx]! >= 0x30 &&
											bytes[idx]! <= 0x39
										) {
											idx--;
										}

										if (idx >= 0 && !!bytes[idx] && !isEOL(bytes[idx]!)) {
											spacingCompliesPDFA = false;
											break;
										}

										const nextByte = bytes[i + 3];
										const nextNextByte = bytes[i + 4];

										if (nextByte === 0x0d && nextNextByte === 0x0a) {
											if (!bytes[i + 5] || isWhitespace(bytes[i + 5]!)) {
												spacingCompliesPDFA = false;
												break;
											}
										} else if (nextByte === 0x0a || nextByte === 0x0d) {
											if (!bytes[i + 4] || isWhitespace(bytes[i + 4]!)) {
												spacingCompliesPDFA = false;
												break;
											}
										} else {
											spacingCompliesPDFA = false;
											break;
										}
									}

									if (
										bytes[i] === 101 && // 'e'
										bytes[i + 1] === 110 && // 'n'
										bytes[i + 2] === 100 && // 'd'
										bytes[i + 3] === 111 && // 'o'
										bytes[i + 4] === 98 && // 'b'
										bytes[i + 5] === 106 // 'j'
									) {
										if (!bytes[i - 1] || !isEOL(bytes[i - 1]!)) {
											spacingCompliesPDFA = false;
											break;
										}
										if (
											!bytes[i - 2] ||
											(isWhitespace(bytes[i - 2]!) &&
												!(bytes[i - 2] === 0x0d && bytes[i - 1] === 0x0a))
										) {
											spacingCompliesPDFA = false;
											break;
										}

										const afterEndobj = bytes[i + 6];
										if (!afterEndobj || !isEOL(afterEndobj)) {
											spacingCompliesPDFA = false;
											break;
										}
									}
								}

								return spacingCompliesPDFA;
							},
							errorMsg:
								"Extra spacings or missing EOL characters around indirect object/generation number or keywords 'obj' and 'endobj'",
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.10",
							},
							description:
								"The value of the F key in the Inline Image dictionary shall not be LZW, LZWDecode, Crypt, a value not listed in ISO 32000-1:2008, Table 6, or an array containing any such value",
							getArgs: () => {
								let isValidInlineFilter = true;
								let failedFilterName = "";

								const allowedInlineFilters = new Set([
									"ASCIIHexDecode",
									"AHx",
									"ASCII85Decode",
									"A85",
									"FlateDecode",
									"Fl",
									"RunLengthDecode",
									"RL",
									"CCITTFaxDecode",
									"CCF",
									"DCTDecode",
									"DCT",
								]);

								const validateToken = (token: string): boolean => {
									const cleanToken = token.startsWith("/")
										? token.substring(1)
										: token;
									return allowedInlineFilters.has(cleanToken);
								};

								const pages = pdfDoc.getPages();

								for (const page of pages) {
									const contentStream = (page as any).getContentStream();
									if (!contentStream) continue;

									const streamText = new TextDecoder().decode(
										contentStream.toUint8Array(),
									);

									const biMatches = [...streamText.matchAll(/\bBI\b/g)];

									for (const match of biMatches) {
										const startIndex = match.index!;
										const idIndex = streamText.indexOf("ID", startIndex);

										if (idIndex !== -1) {
											const dictSection = streamText.substring(
												startIndex,
												idIndex,
											);

											const filterRegex =
												/\/(?:Filter|F)\s+([^\s/\[\]]+|\[[^\]]+\])/g;
											let filterMatch;

											while (
												(filterMatch = filterRegex.exec(dictSection)) !==
													null &&
												filterMatch.length > 1
											) {
												const filterValue = filterMatch[1]!.trim();

												if (filterValue.startsWith("[")) {
													const tokens = filterValue
														.replace(/[\[\]]/g, "")
														.split(/\s+/);
													for (const token of tokens) {
														if (token && !validateToken(token)) {
															isValidInlineFilter = false;
															failedFilterName = token.startsWith("/")
																? token.substring(1)
																: token;
															break;
														}
													}
												} else {
													if (!validateToken(filterValue)) {
														isValidInlineFilter = false;
														failedFilterName = filterValue.startsWith("/")
															? filterValue.substring(1)
															: filterValue;
														break;
													}
												}
											}
										}
										if (!isValidInlineFilter) break;
									}
									if (!isValidInlineFilter) break;
								}

								return {
									isValidInlineFilter,
									internalRepresentation: failedFilterName,
								};
							},
							test: ({ isValidInlineFilter }) => isValidInlineFilter,
							errorMsg: ({ internalRepresentation }) =>
								`Inline image uses not permitted or unknown filter ${internalRepresentation}`,
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.3",
							},
							description:
								"No keys other than UR3 and DocMDP shall be present in a permissions dictionary (ISO 32000-1:2008, 12.8.4, Table 258)",
							getArgs: () => {
								const entries: string[] = [];
								const pdfContext = pdfDoc.context;

								const catalogRef = pdfContext.trailerInfo.Root;

								if (catalogRef) {
									const catalog = pdfContext.lookup(catalogRef);

									if (catalog instanceof PDFDict) {
										const perms = pdfContext.lookup(
											catalog.get(PDFName.of("Perms")),
										);

										if (perms instanceof PDFDict) {
											const keys = perms.keys();
											const allKeys: string[] = [];

											for (const pdfName of keys) {
												allKeys.push(pdfName.asString());
											}

											entries.push(...allKeys);
										}
									}
								}

								return {
									entries: [...new Set(entries)],
								};
							},
							test: ({ entries }) => {
								if (!entries) return true;
								const filtered = entries.filter(
									(elem) => elem !== "UR3" && elem !== "DocMDP",
								);
								return filtered.length === 0;
							},
							errorMsg: ({ entries }) => {
								const forbidden = entries
									.filter((elem) => elem !== "UR3" && elem !== "DocMDP")
									.toString();
								return `The document permissions dictionary contains key(s) ${forbidden} other than UR3 and DocMDP`;
							},
							references: [
								{
									specification: "ISO 32000-1:2008",
									clause: "12.8.4",
								},
							],
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.12",
							},
							description: "",
							getArgs: () => {
								let permsContainDocMDP = false;
								let forbiddenKey: string | null = null;
								const pdfContext = pdfDoc.context;

								const catalogRef = pdfContext.trailerInfo.Root;
								if (catalogRef) {
									const catalog = pdfContext.lookup(catalogRef);
									if (catalog instanceof PDFDict) {
										const perms = pdfContext.lookup(
											catalog.get(PDFName.of("Perms")),
										);
										if (
											perms instanceof PDFDict &&
											perms.has(PDFName.of("DocMDP"))
										) {
											permsContainDocMDP = true;
										}
									}
								}

								if (permsContainDocMDP) {
									const indirectObjects = pdfContext.enumerateIndirectObjects();

									outer: for (const [_ref, pdfObject] of indirectObjects) {
										if (pdfObject instanceof PDFDict) {
											const typeKey = pdfContext.lookup(
												pdfObject.get(PDFName.of("Type")),
											);

											if (
												typeKey instanceof PDFName &&
												typeKey.asString() === "SigRef"
											) {
												for (const key of [
													"DigestLocation",
													"DigestMethod",
													"DigestValue",
												]) {
													if (pdfObject.has(PDFName.of(key))) {
														forbiddenKey = key;
														break outer;
													}
												}
											}
										}
									}
								}

								return {
									permsContainDocMDP,
									forbiddenKey,
								};
							},
							test: ({ permsContainDocMDP, forbiddenKey }) =>
								!permsContainDocMDP || forbiddenKey === null,
							errorMsg: ({ forbiddenKey }) =>
								`The Signature References dictionary contains ${forbiddenKey ?? ""} key(s) in presence of DocMDP entry in the permissions dictionary`,
							references: [
								{
									specification: "ISO 32000-1:2008",
									clause: "12.8.1",
								},
							],
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.13",
							},
							description:
								"A conforming file shall not contain any integer greater than 2147483647. A conforming file shall not contain any integer less than -2147483648",
							getArgs: () => {
								let outOfRangeValue: number | null = null;

								const checkNumber = (pdfObj: any): boolean => {
									if (pdfObj instanceof PDFNumber) {
										const val = pdfObj.asNumber();

										if (Number.isInteger(val)) {
											if (val > 2_147_483_647 || val < -2_147_483_648) {
												outOfRangeValue = val;
												return false;
											}
										}
									}
									return true;
								};

								const traverse = (obj: any): boolean => {
									const resolved = pdfDoc.context.lookup(obj);

									if (resolved instanceof PDFNumber) {
										return checkNumber(resolved);
									}

									if (
										resolved instanceof PDFDict ||
										resolved instanceof PDFStream
									) {
										const dict =
											resolved instanceof PDFStream ? resolved.dict : resolved;
										const values = dict.values();
										for (const val of values) {
											if (!traverse(val)) return false;
										}
									}

									if (resolved instanceof PDFArray) {
										for (let i = 0; i < resolved.size(); i++) {
											if (!traverse(resolved.get(i))) return false;
										}
									}

									return true;
								};

								const indirectObjects =
									pdfDoc.context.enumerateIndirectObjects();

								for (const [_ref, pdfObject] of indirectObjects) {
									if (!traverse(pdfObject)) {
										break;
									}
								}

								return {
									intValue:
										outOfRangeValue === null ? Number.NaN : outOfRangeValue,
								};
							},
							test: ({ intValue }) => Number.isNaN(intValue),
							errorMsg: ({ intValue }) =>
								`Integer value ${intValue} out of range`,
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.13",
							},
							description:
								"A conforming file shall not contain any real number outside the range of +/-3.403 x 10^38",
							getArgs: () => {
								let outOfRangeValue: number | null = null;
								const maxReal = 3.403e38;
								const minReal = -3.403e38;

								const checkNumber = (pdfObj: any): boolean => {
									if (pdfObj instanceof PDFNumber) {
										const val = pdfObj.asNumber();

										if (val > maxReal || val < minReal) {
											outOfRangeValue = val;
											return false;
										}
									}
									return true;
								};

								const traverse = (obj: any): boolean => {
									const resolved = pdfDoc.context.lookup(obj);

									if (resolved instanceof PDFNumber) {
										return checkNumber(resolved);
									}

									if (
										resolved instanceof PDFDict ||
										resolved instanceof PDFStream
									) {
										const dict =
											resolved instanceof PDFStream ? resolved.dict : resolved;
										const values = dict.values();
										for (const val of values) {
											if (!traverse(val)) return false;
										}
									}

									if (resolved instanceof PDFArray) {
										for (let i = 0; i < resolved.size(); i++) {
											if (!traverse(resolved.get(i))) return false;
										}
									}

									return true;
								};

								const indirectObjects =
									pdfDoc.context.enumerateIndirectObjects();

								for (const [_ref, pdfObject] of indirectObjects) {
									if (!traverse(pdfObject)) {
										break;
									}
								}

								return {
									realValue:
										outOfRangeValue === null ? Number.NaN : outOfRangeValue,
								};
							},
							test: ({ realValue }) => Number.isNaN(realValue),
							errorMsg: ({ realValue }) =>
								`Real value ${realValue} out of range`,
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.13",
							},
							description:
								"A conforming file shall not contain any string longer than 32767 bytes",
							getArgs: () => {
								let value = Number.NaN;

								const checkStringLength = (pdfObj: any): boolean => {
									if (
										pdfObj instanceof PDFString ||
										pdfObj instanceof PDFHexString
									) {
										const byteLength = pdfObj.asBytes().length;

										if (byteLength > 32_767) {
											value = byteLength;
											return false;
										}
									}
									return true;
								};

								const traverse = (obj: any): boolean => {
									const resolved = pdfDoc.context.lookup(obj);

									if (
										resolved instanceof PDFString ||
										resolved instanceof PDFHexString
									) {
										return checkStringLength(resolved);
									}

									if (
										resolved instanceof PDFDict ||
										resolved instanceof PDFStream
									) {
										const dict =
											resolved instanceof PDFStream ? resolved.dict : resolved;
										const values = dict.values();
										for (const val of values) {
											if (!traverse(val)) return false;
										}
									}

									if (resolved instanceof PDFArray) {
										for (let i = 0; i < resolved.size(); i++) {
											if (!traverse(resolved.get(i))) return false;
										}
									}

									return true;
								};

								const indirectObjects =
									pdfDoc.context.enumerateIndirectObjects();

								for (const [_ref, pdfObject] of indirectObjects) {
									if (!traverse(pdfObject)) {
										break;
									}
								}

								return { value };
							},
							test: ({ value }) => Number.isNaN(value),
							errorMsg: ({ value }) =>
								`String length (${value}) exceeded 32767`,
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.13",
							},
							description:
								"A conforming file shall not contain any name longer than 127 bytes",
							getArgs: () => {
								let value = Number.NaN;

								const checkNameLength = (pdfObj: any): boolean => {
									if (pdfObj instanceof PDFName) {
										const byteLength = pdfObj.asBytes().length;

										if (byteLength > 127) {
											value = byteLength;
											return false;
										}
									}
									return true;
								};

								const traverse = (obj: any): boolean => {
									const resolved = pdfDoc.context.lookup(obj);

									if (
										resolved instanceof PDFDict ||
										resolved instanceof PDFStream
									) {
										const dict =
											resolved instanceof PDFStream ? resolved.dict : resolved;

										for (const key of dict.keys()) {
											if (!checkNameLength(key)) return false;
										}

										for (const val of dict.values()) {
											if (!traverse(val)) return false;
										}
									}

									if (resolved instanceof PDFArray) {
										for (let i = 0; i < resolved.size(); i++) {
											if (!traverse(resolved.get(i))) return false;
										}
									}

									return true;
								};

								const indirectObjects =
									pdfDoc.context.enumerateIndirectObjects();

								for (const [_ref, pdfObject] of indirectObjects) {
									if (!traverse(pdfObject)) {
										break;
									}
								}

								return {
									value,
								};
							},
							test: ({ value }) => Number.isNaN(value),
							errorMsg: ({ value }) => `Name length (${value}) exceeded 127`,
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.13",
							},
							description:
								"A conforming file shall not contain any real number closer to zero than +/-1.175 x 10^(-38)",
							getArgs: () => {
								let value = Number.NaN;
								const maxTooClose = 1.175e-38;
								const minTooClose = -1.175e-38;

								const checkDistance = (pdfObj: any): boolean => {
									if (pdfObj instanceof PDFNumber) {
										const val = pdfObj.asNumber();

										if (val !== 0.0) {
											if (val > minTooClose && val < maxTooClose) {
												value = val;
												return false;
											}
										}
									}
									return true;
								};

								const traverse = (obj: any): boolean => {
									const resolved = pdfDoc.context.lookup(obj);

									if (resolved instanceof PDFNumber) {
										return checkDistance(resolved);
									}

									if (
										resolved instanceof PDFDict ||
										resolved instanceof PDFStream
									) {
										const dict =
											resolved instanceof PDFStream ? resolved.dict : resolved;
										const values = dict.values();
										for (const val of values) {
											if (!traverse(val)) return false;
										}
									}

									if (resolved instanceof PDFArray) {
										for (let i = 0; i < resolved.size(); i++) {
											if (!traverse(resolved.get(i))) return false;
										}
									}

									return true;
								};

								const indirectObjects =
									pdfDoc.context.enumerateIndirectObjects();

								for (const [_ref, pdfObject] of indirectObjects) {
									if (!traverse(pdfObject)) {
										break;
									}
								}

								return { value };
							},
							test: ({ value }) => Number.isNaN(value),
							errorMsg: ({ value }) =>
								`Non-zero real value ${value} is too close to 0.0`,
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.13",
							},
							description:
								"A conforming file shall not contain more than 8388607 indirect objects",
							getArgs: () => ({
								nrIndirects: pdfDoc.context.enumerateIndirectObjects().length,
							}),
							test: ({ nrIndirects }) => nrIndirects <= 8_388_607,
							errorMsg: ({ nrIndirects }) =>
								`Number of indirect objects in a PDF file (${nrIndirects}) exceeded 8,388,607`,
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.13",
							},
							description:
								"A conforming file shall not nest q/Q pairs by more than 28 nesting levels",
							getArgs: () => {
								let nestingLevel = 0;
								const pages = pdfDoc.getPages();

								for (const page of pages) {
									const contentStream = (page as any).getContentStream();
									if (!contentStream) continue;

									const streamText = new TextDecoder().decode(
										contentStream.toUint8Array(),
									);

									const tokenRegex = /\b([qQ])\b/g;
									let currentLevel = 0;
									let match;

									while ((match = tokenRegex.exec(streamText)) !== null) {
										const operator = match[1];

										if (operator === "q") {
											currentLevel++;
											if (currentLevel > nestingLevel) {
												nestingLevel = currentLevel;
											}
										} else if (operator === "Q") {
											currentLevel = Math.max(0, currentLevel - 1);
										}
									}
								}

								return {
									nestingLevel,
								};
							},
							test: ({ nestingLevel }) => nestingLevel <= 28,
							errorMsg: ({ nestingLevel }) =>
								`Depth of graphics state nesting of q/Q operators (${nestingLevel}) exceeded 28`,
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.13",
							},
							description:
								"A conforming file shall not contain a DeviceN colour space with more than 32 colourants",
							getArgs: () => {
								let maxComponentsFound = 0;

								const checkColorSpaceArray = (arrayObj: PDFArray) => {
									if (arrayObj.size() > 1) {
										const firstElem = pdfDoc.context.lookup(arrayObj.get(0));

										if (
											firstElem instanceof PDFName &&
											firstElem.asString() === "DeviceN"
										) {
											const colourantsArray = pdfDoc.context.lookup(
												arrayObj.get(1),
											);

											if (colourantsArray instanceof PDFArray) {
												const size = colourantsArray.size();
												if (size > maxComponentsFound) {
													maxComponentsFound = size;
												}
											}
										}
									}
								};

								const traverse = (obj: any): boolean => {
									const resolved = pdfDoc.context.lookup(obj);

									if (resolved instanceof PDFArray) {
										checkColorSpaceArray(resolved);
										for (let i = 0; i < resolved.size(); i++) {
											traverse(resolved.get(i));
										}
									} else if (
										resolved instanceof PDFDict ||
										resolved instanceof PDFStream
									) {
										const dict =
											resolved instanceof PDFStream ? resolved.dict : resolved;
										for (const val of dict.values()) {
											traverse(val);
										}
									}

									return true;
								};

								const indirectObjects =
									pdfDoc.context.enumerateIndirectObjects();

								for (const [_ref, pdfObject] of indirectObjects) {
									traverse(pdfObject);
								}

								return {
									nrComponents: maxComponentsFound,
								};
							},
							test: ({ nrComponents }) => nrComponents <= 32,
							errorMsg: ({ nrComponents }) =>
								`Number of DeviceN components (${nrComponents}) exceeded 32`,
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.1.13",
							},
							description:
								"The size of any of the page boundaries described in ISO 32000-1:2008, 14.11.2 shall not be less than 3 units in either direction, nor shall it be greater than 14 400 units in either direction",
							getArgs: () => {
								let top = 100;
								let bottom = 0;
								let right = 100;
								let left = 0;

								let isBoxOutOfRange = false;

								const boundaryNames = [
									"MediaBox",
									"CropBox",
									"BleedBox",
									"TrimBox",
									"ArtBox",
								];

								const pages = pdfDoc.getPages();

								for (const page of pages) {
									const pageDict = page.node;

									for (const boxName of boundaryNames) {
										const boxArray = pageDict.get(PDFName.of(boxName));

										if (boxArray instanceof PDFArray && boxArray.size() === 4) {
											const leftNum = pdfDoc.context.lookup(boxArray.get(0));
											const bottomNum = pdfDoc.context.lookup(boxArray.get(1));
											const rightNum = pdfDoc.context.lookup(boxArray.get(2));
											const topNum = pdfDoc.context.lookup(boxArray.get(3));

											if (
												leftNum instanceof PDFNumber &&
												bottomNum instanceof PDFNumber &&
												rightNum instanceof PDFNumber &&
												topNum instanceof PDFNumber
											) {
												const l = leftNum.asNumber();
												const b = bottomNum.asNumber();
												const r = rightNum.asNumber();
												const t = topNum.asNumber();

												const width = Math.abs(r - l);
												const height = Math.abs(t - b);

												if (
													width < 3 ||
													width > 14400 ||
													height < 3 ||
													height > 14400
												) {
													isBoxOutOfRange = true;
													left = l;
													bottom = b;
													right = r;
													top = t;
													break;
												}
											}
										}
									}
									if (isBoxOutOfRange) break;
								}

								return {
									top,
									bottom,
									right,
									left,
								};
							},
							test: ({ top, bottom, right, left }) =>
								Math.abs(top - bottom) >= 3 &&
								Math.abs(top - bottom) <= 14400 &&
								Math.abs(right - left) >= 3 &&
								Math.abs(right - left) <= 14400,
							errorMsg: ({ top, right, bottom, left }) =>
								`One of the page boundaries is out of range (valid range: 3 - 14400, height = ${Math.abs(top - bottom)}, width = ${Math.abs(right - left)})`,
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.2.2",
							},
							description: "",
							getArgs: () => {
								let hasInvalidOperator = false;
								let failedOperatorName = "";

								// 1. Offizielle Liste aller gültigen Operatoren aus ISO 32000-1:2008
								const validOperators = new Set([
									"b",
									"B",
									"b*",
									"B*",
									"BDC",
									"BI",
									"BMC",
									"BT",
									"BX",
									"c",
									"cm",
									"CS",
									"cs",
									"d",
									"d0",
									"d1",
									"Do",
									"DP",
									"EI",
									"EMC",
									"ET",
									"EX",
									"f",
									"F",
									"f*",
									"G",
									"g",
									"gs",
									"h",
									"i",
									"ID",
									"j",
									"J",
									"K",
									"k",
									"l",
									"m",
									"M",
									"MP",
									"n",
									"q",
									"Q",
									"re",
									"RG",
									"rg",
									"ri",
									"s",
									"S",
									"sc",
									"SC",
									"scn",
									"SCN",
									"sh",
									"T*",
									"Tc",
									"Td",
									"TD",
									"Tf",
									"Tj",
									"TJ",
									"TL",
									"Tm",
									"Tr",
									"Ts",
									"Tw",
									"Ty",
									"v",
									"w",
									"W",
									"W*",
									"y",
									"'",
									'"',
								]);

								const pages = pdfDoc.getPages();

								for (const page of pages) {
									const contentStream = (page as any).getContentStream();
									if (!contentStream) continue;

									let streamText = new TextDecoder().decode(
										contentStream.toUint8Array(),
									);

									streamText = streamText.replace(/\([^)]*\)/g, " "); // Literal strings
									streamText = streamText.replace(/<[^>]*>/g, " "); // Hex strings
									streamText = streamText.replace(/%[^\r\n]*/g, " "); // Comments

									const tokens = streamText.match(/[a-zA-Z*01']+|"/g);

									if (tokens) {
										for (const token of tokens) {
											if (
												!token ||
												token.startsWith("/") ||
												!isNaN(Number(token))
											) {
												continue;
											}

											if (!validOperators.has(token)) {
												hasInvalidOperator = true;
												failedOperatorName = token;
												break;
											}
										}
									}
									if (hasInvalidOperator) break;
								}

								return {
									hasInvalidOperator,
									failedOperatorName,
								};
							},
							test: ({ hasInvalidOperator }) => !hasInvalidOperator,
							errorMsg: ({ failedOperatorName }) =>
								`A content stream contains operator ${failedOperatorName} not defined in ISO 32000-1`,
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.2.2",
							},
							description:
								"A content stream that references other objects, such as images and fonts that are necessary to fully render or process the stream, shall have an explicitly associated Resources dictionary as described in ISO 32000-1:2008, 7.8.3",
							getArgs: () => {
								const missingLocalResources: string[] = [];
								const pages = pdfDoc.getPages();

								for (const page of pages) {
									const pageDict = page.node;

									const hasLocalResources = pageDict.has(
										PDFName.of("Resources"),
									);
									const localResourceKeys = new Set<string>();

									if (hasLocalResources) {
										const localResources = pdfDoc.context.lookup(
											pageDict.get(PDFName.of("Resources")),
										);
										if (localResources instanceof PDFDict) {
											for (const typeKey of localResources.keys()) {
												const subDict = pdfDoc.context.lookup(
													localResources.get(typeKey),
												);
												if (subDict instanceof PDFDict) {
													for (const resKey of subDict.keys()) {
														localResourceKeys.add(resKey.asString());
													}
												}
											}
										}
									}

									const contentStream = (page as any).getContentStream();
									if (!contentStream) continue;

									let streamText = new TextDecoder().decode(
										contentStream.toUint8Array(),
									);

									streamText = streamText.replace(/\([^)]*\)/g, " ");
									streamText = streamText.replace(/<[^>]*>/g, " ");
									streamText = streamText.replace(/%[^\r\n]*/g, " ");

									const resourceRegex = /\/([a-zA-Z0-9_.-]+)/g;
									let match;

									while (
										(match = resourceRegex.exec(streamText)) !== null &&
										match.length > 1
									) {
										const resourceName = match[1]!;

										if (
											resourceName === "DeviceRGB" ||
											resourceName === "DeviceGray" ||
											resourceName === "DeviceCMYK" ||
											resourceName === "Pattern"
										) {
											continue;
										}

										if (!localResourceKeys.has(resourceName)) {
											if (!missingLocalResources.includes(resourceName)) {
												missingLocalResources.push(resourceName);
											}
										}
									}
								}

								return {
									inheritedResourceNames: missingLocalResources,
								};
							},
							test: ({ inheritedResourceNames }) =>
								inheritedResourceNames.length === 0,
							errorMsg: ({ inheritedResourceNames }) =>
								`A content stream refers to resource(s) ${inheritedResourceNames.join(", ")} not defined in an explicitly associated Resources dictionary`,
							references: [
								{
									specification: "ISO 32000-1:2008",
									clause: "14.11.5",
								},
							],
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.2.3",
							},
							description:
								'The profile stream that is the value of the DestOutputProfile key shall either be an output profile (Device Class = "prtr") or a monitor profile (Device Class = "mntr"). The profiles shall have a colour space of either "GRAY", "RGB", or "CMYK"',
							getArgs: () => {
								let deviceClass = "prtr";
								let colorSpace = "RGB ";
								let version = 4.0;

								const pdfContext = pdfDoc.context;
								const catalogRef = pdfContext.trailerInfo.Root;

								if (catalogRef) {
									const catalog = pdfContext.lookup(catalogRef);

									if (catalog instanceof PDFDict) {
										const outputIntents = pdfContext.lookup(
											catalog.get(PDFName.of("OutputIntents")),
										);

										if (outputIntents instanceof PDFArray) {
											for (let i = 0; i < outputIntents.size(); i++) {
												const intent = pdfContext.lookup(outputIntents.get(i));

												if (intent instanceof PDFDict) {
													const profileStream = pdfContext.lookup(
														intent.get(PDFName.of("DestOutputProfile")),
													);

													if (profileStream instanceof PDFStream) {
														const profileBytes = profileStream.getContents();

														if (profileBytes && profileBytes.length >= 128) {
															const decoder = new TextDecoder("ascii");

															deviceClass = decoder.decode(
																profileBytes.subarray(12, 16),
															);

															colorSpace = decoder.decode(
																profileBytes.subarray(16, 20),
															);

															const majorVersion = profileBytes[8];
															const minorVersion =
																(profileBytes[9]! >> 4) * 10 +
																(profileBytes[9]! & 0x0f);
															version = parseFloat(
																`${majorVersion}.${minorVersion}`,
															);
															break;
														}
													}
												}
											}
										}
									}
								}

								return {
									deviceClass,
									colorSpace,
									version,
								};
							},
							test: ({ deviceClass, colorSpace, version }) =>
								(deviceClass === "prtr" || deviceClass === "mntr") &&
								(colorSpace === "RGB " ||
									colorSpace === "CMYK" ||
									colorSpace === "GRAY") &&
								version < 5.0,
							errorMsg: ({ colorSpace, deviceClass, version }) =>
								`The embedded PDF/A Output Intent colour profile has invalid header (Device Class = ${deviceClass}, color space = ${colorSpace}, version = ${version})`,
							references: [
								{
									specification: "ISO 32000-1:2008",
									clause: "14.11.5",
								},
							],
						});
						addRule("B", {
							id: {
								specification: "ISO_19005_3",
								clause: "6.2.3",
							},
							description:
								"If a file's OutputIntents array contains more than one entry, as might be the case where a file is compliant with this part of ISO 19005 and at the same time with PDF/X-4 or PDF/E-1, then all entries that contain a DestOutputProfile key shall have as the value of that key the same indirect object, which shall be a valid ICC profile stream",
							getArgs: () => {
								let sameOutputProfileIndirect = true;
								const profileRefs: string[] = [];

								const pdfContext = pdfDoc.context;
								const catalogRef = pdfContext.trailerInfo.Root;

								if (catalogRef) {
									const catalog = pdfContext.lookup(catalogRef);

									if (catalog instanceof PDFDict) {
										const outputIntents = pdfContext.lookup(
											catalog.get(PDFName.of("OutputIntents")),
										);

										if (outputIntents instanceof PDFArray) {
											for (let i = 0; i < outputIntents.size(); i++) {
												const intent = pdfContext.lookup(outputIntents.get(i));

												if (intent instanceof PDFDict) {
													const profileRaw = intent.get(
														PDFName.of("DestOutputProfile"),
													);

													if (profileRaw instanceof PDFRef) {
														const refString = `${profileRaw.objectNumber} ${profileRaw.generationNumber} R`;
														profileRefs.push(refString);
													}
												}
											}

											if (profileRefs.length > 1) {
												const firstRef = profileRefs[0];
												for (let i = 1; i < profileRefs.length; i++) {
													if (profileRefs[i] !== firstRef) {
														sameOutputProfileIndirect = false;
														break;
													}
												}
											}
										}
									}
								}

								return {
									sameOutputProfileIndirect,
									outputProfileIndirects: profileRefs,
								};
							},
							test: ({ sameOutputProfileIndirect }) =>
								sameOutputProfileIndirect,
							errorMsg: ({ outputProfileIndirects }) =>
								`File's OutputIntents array contains output intent dictionaries with non-matching destination output profiles (indirect keys ${outputProfileIndirects.join(", ")})`,
						});

						return false;
					},
				};
				// 	isPdfA3Conformant(
				// 		levels_: "B" | "U" | "A" | ("B" | "U" | "A")[] = ["B", "U", "A"],
				// 	) {
				// 		const levels = new Set(
				// 			Array.isArray(levels_) ? [...levels_] : [levels_],
				// 		);
				// 		if (!pdfDoc) return true;

				// 		lazyMetadata ??= getMetadata(pdfDoc);
				// 		if (!lazyMetadata || typeof lazyMetadata !== "object") return false;

				// 		const rdf = lazyMetadata?.["x:xmpmeta"]?.["rdf:RDF"];
				// 		if (!rdf) return false;

				// 		const descriptions = normalizeNode(rdf?.["rdf:Description"]);
				// 		if (descriptions.length === 0) return false;

				// 		const hasPdfAFlag = descriptions.some((desc: any) => {
				// 			if (!desc || typeof desc !== "object") return false;

				// 			const part = String(desc?.["pdfaid:part"]);
				// 			const conformance = String(desc?.["pdfaid:conformance"]);

				// 			const hasValidNamespace =
				// 				typeof desc["@xmlns:pdfaid"] === "string";

				// 			return (
				// 				hasValidNamespace &&
				// 				part === "3" &&
				// 				["A", "B", "U"].includes(conformance)
				// 			);
				// 		});

				// 		if (!hasPdfAFlag) return false;

				// 		const pages = pdfDoc.getPages();
				// 		if (!pages?.length) return false;

				// 		try {
				// 			if (pdfDoc.isEncrypted) return false;

				// 			const form = pdfDoc.getForm();
				// 			if (form) {
				// 				const fields = form.getFields() ?? [];
				// 				// TODO: Don't reject forms by default (PDF/A-3 allows them)
				// 				if (fields.length > 0) {
				// 					// TODO: add option whether to reject forms or not
				// 					return false;
				// 				}
				// 			}

				// 			for (const page of pages) {
				// 				const node = page.node;

				// 				if (!node) return false;

				// 				const resources = node.Resources?.();
				// 				if (!resources) return false;

				// 				// Font and XObject dictionaries may not exist explicitly
				// 				// so we only validate structure, not strict presence
				// 				const hasResourceDict =
				// 					typeof resources === "object" && resources !== null;

				// 				if (!hasResourceDict) return false;
				// 			}

				// 			const outputIntentsRaw = pdfDoc.catalog.get(
				// 				PDFName.of("OutputIntents"),
				// 			);

				// 			if (!outputIntentsRaw) return false;

				// 			const outputIntents = Array.isArray(outputIntentsRaw)
				// 				? outputIntentsRaw
				// 				: [outputIntentsRaw];

				// 			let hasValidICC = false;

				// 			for (const intentRef of outputIntents) {
				// 				if (!intentRef) continue;

				// 				const intent = intentRef.lookup?.() ?? intentRef;

				// 				if (!intent || typeof intent !== "object") continue;

				// 				const destProfile = (intent as any).get?.(
				// 					PDFName.of("DestOutputProfile"),
				// 				);
				// 				if (!destProfile) continue;

				// 				const profile = destProfile.lookup?.() ?? destProfile;
				// 				if (!profile || typeof profile !== "object") continue;

				// 				const subtype = (profile as any).get?.(PDFName.of("Subtype"));
				// 				const filter = (profile as any).get?.(PDFName.of("Filter"));

				// 				const n = (profile as any).get?.(PDFName.of("N"));

				// 				const subtypeStr = String(subtype ?? "");
				// 				const filterStr = String(filter ?? "");

				// 				const looksLikeICC =
				// 					subtypeStr.includes("ICCBased") ||
				// 					filterStr.includes("FlateDecode") ||
				// 					n === 3 ||
				// 					n === 4;

				// 				if (looksLikeICC) {
				// 					hasValidICC = true;
				// 					break;
				// 				}
				// 			}

				// 			if (!hasValidICC) return false;

				// 			return true;
				// 		} catch {
				// 			return false;
				// 		}
				// 	},
				// };
			};

			let profile: ZugferdProfile | null = null;
			let input: string | Uint8Array | ArrayBuffer;
			const explicitProfile = input_ !== undefined;

			if (explicitProfile) {
				if (typeof profileOrInput !== "string") {
					throw new TypeError("Profile identifier must be a string.");
				}
				profile = ctx.getProfile(profileOrInput);
				input = input_;
				if (!profile) {
					throw new Error(
						`No profile found with identifier ${profileOrInput}.`,
					);
				}
			} else {
				input = profileOrInput;
			}

			let pdf: PDFDocument | undefined = undefined;
			let attachments: ReturnType<typeof getAttachments> | undefined =
				undefined;
			let xml: string | null = null;
			try {
				pdf = await PDFDocument.load(input);
				attachments = getAttachments(pdf);
			} catch {}

			if (!profile) {
				for (const profileId in opts.profileMap) {
					const candidateProfile = ctx.getProfile(profileId);
					if (!candidateProfile) continue;

					const config =
						opts.profileMap[profileId as keyof typeof opts.profileMap];
					if (!config) continue;

					const candidateXml = resolveXmlForProfile(
						candidateProfile,
						pdf,
						attachments,
						input,
					);
					if (!candidateXml) continue;

					console.log({
						profileId,
						match: await config.match(
							createMatchContext(candidateProfile, pdf, candidateXml),
						),
					});
					if (
						await config.match(
							createMatchContext(candidateProfile, pdf, candidateXml),
						)
					) {
						profile = candidateProfile;
						xml = candidateXml;
						break;
					}
				}
			} else {
				xml = resolveXmlForProfile(profile, pdf, attachments, input);
			}

			if (!profile) {
				throw new Error("No matching profile found for the provided document.");
			}
			if (!xml) {
				throw new TypeError(
					"Input must be a string, Uint8Array, or ArrayBuffer.",
				);
			}

			const config =
				opts.profileMap[profile.id as keyof typeof opts.profileMap];
			if (!config?.match || !config.parse) {
				throw new Error(
					`No parser configuration found for profile ${profile.id}.`,
				);
			}

			if (explicitProfile) {
				if (!(await config.match(createMatchContext(profile, pdf, xml)))) {
					throw new Error(`Document does not match profile ${profile.id}.`);
				}
			}

			const parseCtx = {
				...createBaseContext(profile, pdf, xml),
				xpath: createXPath(xml),
			};

			await opts.hooks?.beforeParse?.(parseCtx);

			let result = await config.parse(parseCtx);
			result =
				(await opts.hooks?.afterParse?.({
					...parseCtx,
					data: result,
				})) ?? result;

			return result;
		},
	};
};

export const parser = <_ZugferdOptions extends ZFOptions>(
	options?: ParserOptions | undefined,
) => {
	const opts = normalizeOptions(options);

	return {
		id: "parser",
		version: NODE_ZUGFERD_VERSION,
		actions: (ctx) => {
			// TODO: Infer return type
			async function parse(
				input: string | Uint8Array | ArrayBuffer,
			): Promise<any>;
			async function parse(
				profile: string,
				input: string | Uint8Array | ArrayBuffer,
			): Promise<any>;
			async function parse(
				profileOrInput: string | Uint8Array | ArrayBuffer,
				input_?: string | Uint8Array | ArrayBuffer | undefined,
			): Promise<any> {
				const input = input_ ?? profileOrInput;
				const { parse } = await documentParser(input);

				return parse(ctx, opts, profileOrInput, input_);
			}

			return {
				parse,
			};
		},
	} satisfies ZugferdPlugin;
};
