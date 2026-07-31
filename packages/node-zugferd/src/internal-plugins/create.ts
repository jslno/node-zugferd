import type {
	Awaitable,
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
import type { ZugferdContext } from "@node-zugferd/core";

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
	ZugferdOptions extends ZFOptions<infer Profiles>
		? Extract<Profiles[number], { id: ProfileId }>
		: never;

export const create = <const ZugferdOptions extends ZFOptions>(
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
				config?:
					| {
							type?: InferProfileFromId<
								ZugferdOptions,
								ProfileId
							>["extensionSchema"]["type"] extends (infer T)[]
								? T & string
								: never;
							autoAttachBinaryObjects?: boolean | undefined;
					  }
					| undefined,
			) {
				const profile = ctx.getProfile(profileId, { throw: true });
				const filesToAttach = new Map<
					string,
					{
						filename: string;
						mimeType: string;
						content: Uint8Array;
					}
				>();
				const data = await parseAsync(profile.schema, input, {
					context: {
						context: ctx,
						profile,
						pdf: {
							autoAttachBinaryObjects: config?.autoAttachBinaryObjects ?? false,
							embedFile: (data) => {
								filesToAttach.set(data.filename, data);
							},
						},
					},
				});

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
					prettyPrint: ctx.options.prettyPrint ?? false,
				});
				await ctx.options.hooks?.afterXMLBuild?.({
					profile,
					xml,
					context: ctx,
				});

				const methods = {
					async toPDF(
						pdf:
							| PDFDocument
							| string
							| Uint8Array
							| ArrayBuffer
							| ((ctx: {
									data: Record<string, any>;
									xml: string;
									profile: ZugferdProfile;
									context: ZugferdContext;
							  }) => Awaitable<
									PDFDocument | string | Uint8Array | ArrayBuffer
							  >),
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
						const pdfDoc =
							typeof pdf === "function"
								? await pdf({
										data,
										xml,
										profile,
										context: ctx,
									})
								: pdf;

						const doc = await toPdfA(
							profile,
							pdfDoc,
							{
								metadata: opts.metadata,
								attachments: [
									...[...filesToAttach.values()].map((data) => ({
										filename: data.filename,
										data: data.content,
										mimeType: data.mimeType,
										dataRelationship: "Supplement" as const,
									})),
									...(opts.attachments ?? []),
									{
										filename: profile.extensionSchema.fileName,
										data: xml,
										mimeType: "application/xml",
										createdAt: new Date(),
										dataRelationship: opts.dataRelationship,
									},
								],
							},
							config,
						);

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
