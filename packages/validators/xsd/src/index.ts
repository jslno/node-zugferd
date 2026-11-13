/// <reference path="./virtual-schemas.d.ts" />
import { readFileSync } from "node:fs";
import { join } from "node:path";
import schemaSources from "virtual:node-zugferd/xsd-schemas";
import type {
	InferProfileIds,
	ZugferdOptions as ZFOptions,
	ZugferdContext,
	ZugferdPlugin,
} from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { XsdValidator } from "@zugferd/xsd-validator";
import type { ResolvedXSDOptions, SchemaMapEntry, XSDOptions } from "./types";

declare module "@node-zugferd/core" {
	interface ZugferdPluginRegistry<ZugferdOpts, Options> {
		xsd: {
			creator: typeof xsd<
				ZugferdOpts extends infer R extends ZFOptions ? R : ZFOptions,
				Options extends XSDOptions ? Options : XSDOptions
			>;
		};
	}
}

const getBundledSchema = (fileName: string): SchemaMapEntry => {
	const content = schemaSources[fileName];
	if (content === undefined) {
		throw new ZugferdError(
			`The bundled XSD schema "${fileName}" is missing from this build.`,
		);
	}

	return { content, imports: schemaSources };
};

const bundledXsdPaths = {
	minimum: getBundledSchema("FACTUR-X_MINIMUM.xsd"),
	"basic-wl": getBundledSchema("FACTUR-X_BASICWL.xsd"),
	basic: getBundledSchema("FACTUR-X_BASIC.xsd"),
	"en-16931": getBundledSchema("FACTUR-X_EN16931.xsd"),
	extended: getBundledSchema("FACTUR-X_EXTENDED.xsd"),
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

	const loadSchema = (
		schema: SchemaMapEntry,
	): {
		content: string;
		loader: ((filename: string) => string) | undefined;
	} => {
		if ("content" in schema) {
			const imports = schema.imports;

			return {
				content: schema.content,
				loader: imports
					? (filename) => {
							const key = filename.replace(/\\/g, "/");
							const imported =
								imports[key] ?? imports[key.split("/").pop() ?? key];

							if (imported === undefined) {
								throw new ZugferdError(
									`XSD import "${filename}" is not present in the schema "imports" map. Add its contents to the schema entry.`,
								);
							}

							return imported;
						}
					: undefined,
			};
		}

		return {
			content: readFileSync(schema.path, "utf-8"),
			loader: schema.dir
				? (filename) => readFileSync(join(schema.dir!, filename), "utf-8")
				: undefined,
		};
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

		const { content, loader } = loadSchema(schema);
		const validator = await XsdValidator.create(content, loader);

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
