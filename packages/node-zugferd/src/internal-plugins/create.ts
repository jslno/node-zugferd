import type {
	DataRelationship,
	InferProfileIds,
	ZugferdOptions as ZFOptions,
	ZugferdPlugin,
	ZugferdProfile,
} from "@node-zugferd/core";
import { createBuildHelper, NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import type { InferInput } from "@node-zugferd/data-types";
import { parseAsync } from "@node-zugferd/data-types";
import type { PDFDocument } from "pdf-lib";
import { create as createDocument } from "xmlbuilder2";
import { toPdfA } from "../pdf";
import type { PDFOptions } from "../pdf/types";

declare module "@node-zugferd/core" {
	interface ZugferdPluginRegistry<ZugferdOptions, Options> {
		"~create": {
			creator: typeof create<
				ZugferdOptions extends infer R extends ZFOptions ? R : ZFOptions
			>;
		};
	}
}
type InferProfileFromId<
	ZugferdOptions extends ZFOptions,
	ProfileId extends InferProfileIds<ZugferdOptions>,
> =
	NonNullable<
		Extract<ZugferdOptions["profiles"][number], { id: ProfileId }>
	> extends infer R extends ZugferdProfile
		? R
		: never;

export const create = <ZugferdOptions extends ZFOptions>(
	options: ZugferdOptions,
) => {
	return {
		id: "~create",
		version: NODE_ZUGFERD_VERSION,
		actions: (ctx) => ({
			async create<ProfileId extends InferProfileIds<ZugferdOptions>>(
				profileId: ProfileId,
				input: NonNullable<
					InferProfileFromId<ZugferdOptions, ProfileId>["$Infer"]
				>["Input"],
			) {
				const profile = ctx.getProfile(profileId, { throw: true });
				const data = await parseAsync(profile.schema, input);

				if (profile.rules) {
					const { schema, rules, ...p } = profile;
					await profile.rules(input, {
						error(id, message) {
							throw new Error(message, { cause: id });
						},
						profile: p,
					});
				}

				const root = createDocument({
					encoding: "UTF-8",
				});

				await profile.build(data, {
					root,
					profile,
					...createBuildHelper(),
				});

				const xml = root.end({
					format: "xml",
					allowEmptyTags: true,
				});
				await ctx.options.hooks?.afterXMLBuild?.({
					profile,
					xml,
					context: ctx,
				});

				const methods = {
					async toPDF(
						pdf: PDFDocument | string | Uint8Array | ArrayBuffer,
						options?:
							| (PDFOptions & {
									dataRelationship?: InferProfileFromId<
										ZugferdOptions,
										ProfileId
									>["dataRelationship"] extends Array<
										infer R extends DataRelationship
									>
										? R
										: InferProfileFromId<
													ZugferdOptions,
													ProfileId
												>["dataRelationship"] extends infer R extends
													DataRelationship
											? R
											: never;
							  })
							| undefined,
					) {
						const opts = {
							...options,
							dataRelationship: ((options?.dataRelationship ??
							Array.isArray(profile.dataRelationship))
								? profile.dataRelationship[0]
								: profile.dataRelationship) as DataRelationship,
						};
						const doc = await toPdfA(profile, pdf, {
							metadata: opts.metadata,
							attachments: [
								{
									filename: profile.extensionSchema.fileName,
									data: xml,
									mimeType: "application/xml",
									createdAt: new Date(),
									dataRelationship: opts.dataRelationship,
								},
								...(opts.attachments ?? []),
							],
						});

						return doc;
					},
					toXML: () => xml,
					toMap: () => root.end({ format: "map" }),
					toObject: () => root.end({ format: "object" }),
					toJSON: () => root.end({ format: "json" }),
					toYAML: () => root.end({ format: "yaml" }),
				};

				return methods;
			},
		}),
		$Infer: {} as {
			Profile: InferProfileIds<ZugferdOptions>;
			Input: {
				[K in ZugferdOptions["profiles"][number] as PascalCase<
					K["id"]
				>]: K["$Infer"] extends { Input: infer I }
					? I
					: InferInput<K["schema"]>;
			};
		},
	} as const satisfies ZugferdPlugin;
};

export type CreatePlugin<Opts extends ZFOptions> = ReturnType<
	typeof create<Opts>
>;

export type CreatePluginActions<Opts extends ZFOptions> = ReturnType<
	CreatePlugin<Opts>["actions"]
>;

type PascalCase<S extends string> = S extends `${infer Word}_${infer Rest}`
	? `${Capitalize<Lowercase<Word>>}${PascalCase<Rest>}`
	: S extends `${infer Word}-${infer Rest}`
		? `${Capitalize<Lowercase<Word>>}${PascalCase<Rest>}`
		: S extends `${infer Word} ${infer Rest}`
			? `${Capitalize<Lowercase<Word>>}${PascalCase<Rest>}`
			: Capitalize<Lowercase<S>>;
