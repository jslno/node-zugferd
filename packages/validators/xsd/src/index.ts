import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type {
	InferProfileIds,
	ZugferdOptions as ZFOptions,
	ZugferdContext,
	ZugferdPlugin,
} from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { parseXml, parseXsd, validate as xsdValidate } from "xml-xsd-engine";
import { __dirname } from "./isomorph";
import type { ResolvedXSDOptions, XSDOptions } from "./types";

declare module "@node-zugferd/core" {
	interface ZugferdPluginRegistry<ZugferdOptions, Options> {
		xsd: {
			creator: typeof xsd<
				ZugferdOptions extends infer R extends ZFOptions ? R : ZFOptions,
				Options extends XSDOptions ? Options : XSDOptions
			>;
		};
	}
}

const getBundledXsdPath = (fileName: string) =>
	resolve(__dirname, "../schemas", fileName);

const bundledXsdPaths = {
	minimum: getBundledXsdPath("FACTUR-X_MINIMUM.xsd"),
	"basic-wl": getBundledXsdPath("FACTUR-X_BASIC-WL.xsd"),
	basic: getBundledXsdPath("FACTUR-X_BASIC.xsd"),
	"en-16931": getBundledXsdPath("FACTUR-X_EN16931.xsd"),
	extended: getBundledXsdPath("FACTUR-X_EXTENDED.xsd"),
	xrechnung: getBundledXsdPath("CrossIndustryInvoice_100pD22B.xsd"),
} as const;

type BundledXsdPaths = typeof bundledXsdPaths;

const resolveOptions = <Opts extends XSDOptions>(
	options?: Opts,
): ResolvedXSDOptions<Opts, BundledXsdPaths> => {
	return {
		autoRun: true,
		...(options ?? {}),
		xsdPathMap: {
			...bundledXsdPaths,
			...(options?.xsdPathMap ?? {}),
		},
	} as ResolvedXSDOptions<Opts, BundledXsdPaths>;
};

export const xsd = <ZugferdOptions extends ZFOptions, Opts extends XSDOptions>(
	options?: Opts | undefined,
) => {
	const opts = resolveOptions(options);

	type SupportedProfileId =
		InferProfileIds<ZugferdOptions> extends infer R
			? R extends keyof ResolvedXSDOptions<Opts, BundledXsdPaths>["xsdPathMap"]
				? R extends string
					? R
					: never
				: never
			: never;

	const getXsdPath = (profileId: string) => {
		return opts.xsdPathMap[profileId as SupportedProfileId];
	};

	const validate = (profileId: string, input: string, ctx: ZugferdContext) => {
		const xsdPath = getXsdPath(profileId);
		if (!xsdPath) {
			throw new ZugferdError(
				`No XSD schema found for profile "${profileId}". Please provide a custom schema file name in the plugin options.`,
			);
		}
		const xsdContent = readFileSync(xsdPath, "utf-8");
		const schema = parseXsd(xsdContent);
		const xml = parseXml(input);
		const result = xsdValidate(xml, schema);

		if (!result.valid) {
			throw new ZugferdError(
				result.errors.map((err) => err.message).join("\n\n"),
			);
		}
	};

	return {
		id: "xsd",
		version: NODE_ZUGFERD_VERSION,
		init(ctx) {
			if (opts.autoRun) {
				return {
					options: {
						hooks: {
							async afterXMLBuild({ profile, xml, context }) {
								if (getXsdPath(profile.id)) {
									validate(profile.id, xml, context);
								}
								await ctx.options.hooks?.afterXMLBuild?.({
									profile,
									xml,
									context,
								});
							},
						},
					},
				};
			}
		},
		actions(ctx) {
			return {
				xsd: {
					validate<
						const ProfileID extends
							| SupportedProfileId
							| { id: SupportedProfileId },
					>(profileId: ProfileID, xml: string) {
						const id = typeof profileId === "string" ? profileId : profileId.id;
						return validate(id, xml, ctx);
					},
				},
			};
		},
		options: opts,
	} satisfies ZugferdPlugin;
};

export type * from "./types";
