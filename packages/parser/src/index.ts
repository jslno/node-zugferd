import type {
	ZugferdOptions as ZFOptions,
	ZugferdContext,
	ZugferdPlugin,
	ZugferdProfile,
} from "@node-zugferd/core";
import { checkHybridRules, NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { PDFDocument } from "pdf-lib";
import { convert, create } from "xmlbuilder2";
import type {
	XMLSerializedAsObject,
	XMLSerializedAsObjectArray,
} from "xmlbuilder2/lib/interfaces";
import { getAttachments, getMetadata } from "./helper";
import type { ParserOutput } from "./output";
import { isPdfA3Conformant as documentIsPdfA3 } from "./pdfa";
import { defaultProfileMap } from "./profiles";
import { toInput } from "./to-input";
import type { MatchContext, ParserOptions } from "./types";
import { createXPath } from "./xpath";

const HYBRID_PROFILE_IDS = new Set([
	"minimum",
	"basic-wl",
	"basic",
	"en-16931",
	"extended",
	"xrechnung",
]);

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
		checkHybridRules: options?.checkHybridRules ?? true,
		decodeEntities: options?.decodeEntities ?? false,
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
		pdf = await PDFDocument.load(input, { updateMetadata: false });
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
		): Promise<{
			profile: ZugferdProfile;
			data: Record<string, any>;
		}> {
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
					isPdfA3Conformant(
						levels: "B" | "U" | "A" | ("B" | "U" | "A")[] = ["B", "U", "A"],
					) {
						return documentIsPdfA3(pdfDoc, levels);
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
				pdf = await PDFDocument.load(input, { updateMetadata: false });
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
				decodeEntities: opts.decodeEntities,
			};

			await opts.hooks?.beforeParse?.(parseCtx);

			let result = await config.parse(parseCtx);

			if (
				(!ctx.hasPlugin("mustang") ||
					ctx.getPlugin("mustang")?.options?.autoRun === false) &&
				opts.checkHybridRules &&
				pdf &&
				HYBRID_PROFILE_IDS.has(profile.id)
			) {
				await checkHybridRules(
					profile,
					ctx,
					pdf,
					toInput(profile.schema, result),
				);
			}

			result =
				(await opts.hooks?.afterParse?.({
					...parseCtx,
					data: result,
				})) ?? result;

			return {
				profile,
				data: result,
			};
		},
	};
};

export { type ParserOutput } from "./output";
export { toInput } from "./to-input";

export type InferParserOutput<
	ZugferdOptions extends ZFOptions,
	ProfileID extends ZugferdOptions["profiles"][number]["id"],
> = ParserOutput<
	Extract<ZugferdOptions["profiles"][number], { id: ProfileID }>["schema"]
>;

export interface ParserPlugin<Options extends ZFOptions> {
	id: "parser";
	version: string;
	actions: (ctx: ZugferdContext) => {
		parse: {
			(
				input: string | Uint8Array | ArrayBuffer,
			): Promise<{
				profile: ZugferdProfile;
				data: Record<string, any>;
			}>;
			<ProfileId extends Options["profiles"][number]["id"]>(
				profile: ProfileId,
				input: string | Uint8Array | ArrayBuffer,
			): Promise<{
				profile: Extract<Options["profiles"][number], { id: ProfileId }>;
				data: InferParserOutput<Options, ProfileId>;
			}>;
		};
	};
}

export const parser = <ZugferdOptions extends ZFOptions>(
	options?: ParserOptions | undefined,
): ParserPlugin<ZugferdOptions> => {
	const opts = normalizeOptions(options);

	return {
		id: "parser",
		version: NODE_ZUGFERD_VERSION,
		actions: (ctx) => {
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
