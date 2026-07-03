import type {
	ZugferdOptions as ZFOptions,
	ZugferdPlugin,
	ZugferdProfile,
} from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { PDFDocument, PDFName } from "pdf-lib";
import { convert } from "xmlbuilder2";
import type {
	XMLSerializedAsObject,
	XMLSerializedAsObjectArray,
} from "xmlbuilder2/lib/interfaces";
import { getAttachments, getMetadata } from "./helper";
import { defaultProfileMap } from "./profiles";
import type { ParserOptions } from "./types";
import { createXPath } from "./xpath";

declare module "@node-zugferd/core" {
	interface ZugferdPluginRegistry<ZugferdOptions, Options> {
		parser: {
			creator: typeof parser<
				ZugferdOptions extends infer R extends ZFOptions ? R : ZFOptions
			>;
		};
	}
}

export const parser = <_ZugferdOptions extends ZFOptions>(
	options?: ParserOptions | undefined,
) => {
	const opts = {
		...(options ?? {}),
		profileMap: {
			...defaultProfileMap,
			...(options?.profileMap ?? {}),
		},
		hooks: {
			...(options?.hooks ?? {}),
			beforeParse: async (ctx) => {
				if (ctx.context.hasPlugin("xsd")) {
					const xsdPlugin = ctx.context.getPlugin("xsd");
					if (xsdPlugin && xsdPlugin.options?.autoRun !== false) {
						await (xsdPlugin.actions?.(ctx.context) as any)?.xsd?.validate?.(
							ctx.profile.id,
							ctx.xml,
							ctx.context,
						);
					}
				}
				if (ctx.context.hasPlugin("mustang")) {
					const mustangPlugin = ctx.context.getPlugin("mustang");
					if (mustangPlugin && mustangPlugin.options?.autoRun !== false) {
						await (
							mustangPlugin.actions?.(ctx.context) as any
						)?.mustang?.validate?.(ctx.profile.id, ctx.xml, ctx.context);
					}
				}
				return options?.hooks?.beforeParse?.(ctx);
			},
		},
	} satisfies ParserOptions;

	return {
		id: "parser",
		version: NODE_ZUGFERD_VERSION,
		actions: (ctx) => {
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
				) => {
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
								]?.["ram:GuidelineSpecifiedDocumentContextParameter"]?.[
									"ram:ID"
								];

							if (!specificationIdentifier) return false;

							const identifiers = normalizeNode(identifier);
							return identifiers.includes(specificationIdentifier);
						},
						isPdfAConformant() {
							if (!pdfDoc) return true;

							lazyMetadata ??= getMetadata(pdfDoc);
							if (!lazyMetadata || typeof lazyMetadata !== "object")
								return false;

							const rdf = lazyMetadata?.["x:xmpmeta"]?.["rdf:RDF"];
							if (!rdf) return false;

							const descriptions = normalizeNode(rdf?.["rdf:Description"]);
							if (descriptions.length === 0) return false;

							const hasPdfAFlag = descriptions.some((desc: any) => {
								if (!desc || typeof desc !== "object") return false;

								const part = String(desc?.["pdfaid:part"]);
								const conformance = String(desc?.["pdfaid:conformance"]);

								const hasValidNamespace =
									typeof desc["@xmlns:pdfaid"] === "string";

								return (
									hasValidNamespace &&
									part === "3" &&
									["A", "B", "U"].includes(conformance)
								);
							});

							if (!hasPdfAFlag) return false;

							const pages = pdfDoc.getPages();
							if (!pages?.length) return false;

							try {
								if (pdfDoc.isEncrypted) return false;

								const form = pdfDoc.getForm();
								if (form) {
									const fields = form.getFields() ?? [];
									// TODO: Don't reject forms by default (PDF/A-3 allows them)
									if (fields.length > 0) {
										// TODO: add option whether to reject forms or not
										return false;
									}
								}

								for (const page of pages) {
									const node = page.node;

									if (!node) return false;

									const resources = node.Resources?.();
									if (!resources) return false;

									// Font and XObject dictionaries may not exist explicitly
									// so we only validate structure, not strict presence
									const hasResourceDict =
										typeof resources === "object" && resources !== null;

									if (!hasResourceDict) return false;
								}

								const outputIntentsRaw = pdfDoc.catalog.get(
									PDFName.of("OutputIntents"),
								);

								if (!outputIntentsRaw) return false;

								const outputIntents = Array.isArray(outputIntentsRaw)
									? outputIntentsRaw
									: [outputIntentsRaw];

								let hasValidICC = false;

								for (const intentRef of outputIntents) {
									if (!intentRef) continue;

									const intent = intentRef.lookup?.() ?? intentRef;

									if (!intent || typeof intent !== "object") continue;

									const destProfile = (intent as any).get?.(
										PDFName.of("DestOutputProfile"),
									);
									if (!destProfile) continue;

									const profile = destProfile.lookup?.() ?? destProfile;
									if (!profile || typeof profile !== "object") continue;

									const subtype = (profile as any).get?.(PDFName.of("Subtype"));
									const filter = (profile as any).get?.(PDFName.of("Filter"));

									const n = (profile as any).get?.(PDFName.of("N"));

									const subtypeStr = String(subtype ?? "");
									const filterStr = String(filter ?? "");

									const looksLikeICC =
										subtypeStr.includes("ICCBased") ||
										filterStr.includes("FlateDecode") ||
										n === 3 ||
										n === 4;

									if (looksLikeICC) {
										hasValidICC = true;
										break;
									}
								}

								if (!hasValidICC) return false;

								return true;
							} catch {
								return false;
							}
						},
					};
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
					throw new Error(
						"No matching profile found for the provided document.",
					);
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

				await opts.hooks.beforeParse(parseCtx);

				let result = await config.parse(parseCtx);
				result =
					(await opts.hooks.afterParse?.({
						...parseCtx,
						data: result,
					})) ?? result;

				return result;
			}

			return {
				parse,
			};
		},
	} satisfies ZugferdPlugin;
};
