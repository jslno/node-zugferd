import type {
	InferProfileIds,
	ZugferdOptions as ZFOptions,
	ZugferdContext,
	ZugferdPlugin,
} from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import type { ValidationResult } from "xrechnung-validator";
import { validate as kositValidate } from "xrechnung-validator";
import type { KositOptions, ResolvedKositOptions } from "./types";

declare module "@node-zugferd/core" {
	interface ZugferdPluginRegistry<ZugferdOpts, Options> {
		kosit: {
			creator: typeof kosit<
				ZugferdOpts extends infer R extends ZFOptions ? R : ZFOptions
			>;
		};
	}
}

/**
 * Profiles covered by the KoSIT validator configuration. KoSIT ships scenarios
 * for EN 16931 and XRechnung only; the other Factur-X profiles have no
 * matching rule set.
 */
const supportedProfiles = ["en-16931", "xrechnung"] as const;

const isSupportedProfile = (profileId: string) =>
	(supportedProfiles as readonly string[]).includes(profileId);

const isPdf = (input: string | Uint8Array) =>
	typeof input === "string"
		? input.startsWith("%PDF")
		: input.length >= 4 &&
			input[0] === 0x25 &&
			input[1] === 0x50 &&
			input[2] === 0x44 &&
			input[3] === 0x46;

const describeFailure = (result: ValidationResult) => {
	if (!result.wellFormed) {
		return "The document is not well-formed XML.";
	}
	if (!result.syntax) {
		return "The document is not a UBL or CII invoice.";
	}
	if (!result.scenario) {
		return "No KoSIT scenario matches the specification identifier (BT-24) of the document.";
	}
	return undefined;
};

const format = (code: string, text: string) => `[${code}] ${text}`;

export const kosit = <ZugferdOptions extends ZFOptions>(
	options?: KositOptions | undefined,
) => {
	const opts: ResolvedKositOptions = {
		autoRun: true,
		failOnWarnings: false,
		...(options ?? {}),
	};

	const validate = async (
		profileId: string,
		input: string | Uint8Array | ArrayBuffer,
		ctx: ZugferdContext,
	) => {
		if (!isSupportedProfile(profileId)) {
			ctx.logger.warn(
				`The KoSIT validator does not support the profile "${profileId}". Skipping validation.`,
			);
			return;
		}
		const source = input instanceof ArrayBuffer ? new Uint8Array(input) : input;
		if (isPdf(source)) {
			throw new ZugferdError(
				"The KoSIT validator checks invoice XML. Extract the XML from the PDF before validating it.",
			);
		}

		const result = await kositValidate(source);
		const messages: string[] = [];

		const failure = describeFailure(result);
		if (failure) {
			messages.push(failure);
		}
		for (const error of result.schemaErrors) {
			messages.push(
				error.line ? `Line ${error.line}: ${error.message}` : error.message,
			);
		}
		for (const error of result.errors) {
			messages.push(format(error.code, error.text));
		}

		const warnings = result.warnings.map((w) => format(w.code, w.text));
		if (opts.failOnWarnings) {
			messages.push(...warnings);
		} else if (warnings.length > 0) {
			ctx.logger.warn(warnings.join("\n\n"));
		}

		if (result.valid && messages.length === 0) {
			return;
		}
		throw new ZugferdError(messages.join("\n\n") || "Validation failed");
	};

	return {
		id: "kosit",
		version: NODE_ZUGFERD_VERSION,
		init(ctx) {
			if (opts.autoRun) {
				return {
					options: {
						hooks: {
							async afterXMLBuild({ profile, xml, context }) {
								if (isSupportedProfile(profile.id)) {
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
				kosit: {
					async validate<
						ProfileID extends
							| InferProfileIds<ZugferdOptions>
							| { id: InferProfileIds<ZugferdOptions> },
					>(profileId: ProfileID, input: string | Uint8Array | ArrayBuffer) {
						const id = typeof profileId === "string" ? profileId : profileId.id;
						return validate(id, input, ctx);
					},
				},
			};
		},
		options: opts,
	} satisfies ZugferdPlugin;
};

export type * from "./types";
