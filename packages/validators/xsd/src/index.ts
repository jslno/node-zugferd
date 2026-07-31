import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import type {
	InferProfileIds,
	ZugferdOptions as ZFOptions,
	ZugferdContext,
	ZugferdPlugin,
} from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { __dirname } from "./isomorph";
import type { ResolvedXSDOptions, SchemaMapEntry, XSDOptions } from "./types";

import { XsdValidator } from "@jslno/xsd-validator";

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

const getBundledXsdPath = (fileName?: string | undefined) =>
	resolve(
		__dirname,
		...["../schemas", fileName].filter(
			(val): val is string => typeof val === "string",
		),
	);

const SCHEMA_DIR = getBundledXsdPath();
const bundledXsdPaths = {
	minimum: {
		path: getBundledXsdPath("FACTUR-X_MINIMUM.xsd"),
		dir: SCHEMA_DIR,
	},
	"basic-wl": {
		path: getBundledXsdPath("FACTUR-X_BASICWL.xsd"),
		dir: SCHEMA_DIR,
	},
	basic: {
		path: getBundledXsdPath("FACTUR-X_BASIC.xsd"),
		dir: SCHEMA_DIR,
	},
	"en-16931": {
		path: getBundledXsdPath("FACTUR-X_EN16931.xsd"),
		dir: SCHEMA_DIR,
	},
	extended: {
		path: getBundledXsdPath("FACTUR-X_EXTENDED.xsd"),
		dir: SCHEMA_DIR,
	},
} as const;

type BundledXsdPaths = typeof bundledXsdPaths;

const resolveOptions = <Opts extends XSDOptions>(
	options?: Opts,
): ResolvedXSDOptions<Opts, BundledXsdPaths> => {
	return {
		autoRun: true,
		...(options ?? {}),
		schemaMap: {
			...bundledXsdPaths,
			...(options?.schemaMap ?? {}),
		},
	} as ResolvedXSDOptions<Opts, BundledXsdPaths>;
};

export const xsd = <ZugferdOptions extends ZFOptions, Opts extends XSDOptions>(
	options?: Opts | undefined,
) => {
	const opts = resolveOptions(options);

	type SupportedProfileId =
		InferProfileIds<ZugferdOptions> extends infer R
			? R extends keyof ResolvedXSDOptions<Opts, BundledXsdPaths>["schemaMap"]
				? R extends string
					? R
					: never
				: never
			: never;

	const getSchema = (profileId: string): SchemaMapEntry => {
		return opts.schemaMap[profileId as SupportedProfileId];
	};

	const validate = async (
		profileId: string,
		input: string,
		ctx: ZugferdContext,
	) => {
		const schema = getSchema(profileId);
		if (!schema) {
			throw new ZugferdError(
				`No XSD schema found for profile "${profileId}". Please provide a custom schema file name in the plugin options.`,
			);
		}
		const xsdContent = readFileSync(schema.path, "utf-8");
		const validator = await XsdValidator.create(
			xsdContent,
			schema.dir
				? (filename) => readFileSync(join(schema.dir!, filename), "utf-8")
				: undefined,
		);

		try {
			validator.validateOrThrow(input);
		} catch (err) {
			if (err instanceof Error) {
				throw new ZugferdError(err.message);
			}

			throw err;
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
								if (getSchema(profile.id)) {
									await validate(profile.id, xml, context);
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
					async validate<
						const ProfileID extends
							| SupportedProfileId
							| { id: SupportedProfileId },
					>(profileId: ProfileID, xml: string) {
						const id = typeof profileId === "string" ? profileId : profileId.id;
						return await validate(id, xml, ctx);
					},
				},
			};
		},
		options: opts,
	} satisfies ZugferdPlugin;
};

export type * from "./types";
