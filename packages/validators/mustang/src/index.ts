import { spawn } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import { platform, tmpdir } from "node:os";
import { join } from "node:path";
import type {
	InferProfileIds,
	ZugferdOptions as ZFOptions,
	ZugferdContext,
	ZugferdPlugin,
} from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { convert } from "xmlbuilder2";
import { __dirname } from "./isomorph";
import { setup } from "./setup";
import type { MustangOptions } from "./types";

declare module "@node-zugferd/core" {
	interface ZugferdPluginRegistry<ZugferdOptions, Options> {
		mustang: {
			creator: typeof mustang<
				ZugferdOptions extends infer R extends ZFOptions ? R : ZFOptions
			>;
		};
	}
}

export const mustang = <ZugferdOptions extends ZFOptions>(
	options?: MustangOptions | undefined,
) => {
	const opts = {
		tempDir: tmpdir(),
		maximumHeapSize: 1024,
		autoRun: true,
		language: "en",
		...(options ?? {}),
	} satisfies MustangOptions;

	const isSupportedProfile = (profileId: string) =>
		[
			"minimum",
			"basic-wl",
			"basic",
			"en-16931",
			"extended",
			"xrechnung",
		].includes(profileId);

	const validate = async (
		profileId: string,
		xml: string,
		ctx: ZugferdContext,
	) => {
		if (!isSupportedProfile(profileId)) {
			ctx.logger.warn(
				`The Mustang validator does not support the profile "${profileId}". Skipping validation.`,
			);
			return;
		}

		const cli = join(__dirname, "../runtime", "Mustang-CLI.jar");
		if (platform() === "darwin" && !options?.tempDir) {
			ctx.logger.warn(
				"Using the default temporary directory on macOS can potentially lead to issues, as it returns a symlink instead of an absolute path. Consider specifying a custom temporary directory in the validator config.",
			);
		}

		const tempDir = await mkdtemp(join(opts.tempDir, "node-zugferd_mustang-"));
		// TODO: support pdf validation
		const tmpFile = join(tempDir, "input.xml");
		await writeFile(tmpFile, xml, "utf-8");

		const args = [
			opts.initialHeapSize !== undefined && `-Xms${opts.initialHeapSize}m`,
			opts.maximumHeapSize !== "inherit" && `-Xmx${opts.maximumHeapSize}m`,
			"-Dfile.encoding=UTF-8",
			`-Duser.language=${opts.language}`,
			"-Dsun.stdout.encoding=UTF-8",
			"-Dsun.stderr.encoding=UTF-8",
			"-jar",
			cli,
			"--no-notices",
			"--action",
			"validate",
			`--source`,
			tmpFile,
			...(platform() === "win32" ? ["2>", "NUL"] : ["2>", "/dev/null"]),
		].filter((v): v is string => !!v);

		const { stdout, stderr } = await run(["java", ...args]);

		const result = stdout.includes("<validation") ? stdout : stderr;

		return parseValidatorResult(ctx, result);
	};

	return {
		id: "mustang",
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
				mustang: {
					async validate<
						ProfileID extends
							| InferProfileIds<ZugferdOptions>
							| { id: InferProfileIds<ZugferdOptions> },
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
mustang.setup = setup;

function arrayable<T>(value: T | T[] | undefined): T[] {
	if (!value) {
		return [];
	}

	return Array.isArray(value) ? value : [value];
}

function parseValidatorResult(ctx: ZugferdContext, output: string) {
	const out = (
		convert(output.trim(), { format: "object" }) as Record<string, any>
	)?.validation;

	if (!out) {
		throw new ZugferdError("Failed to parse Mustang validation output.");
	}

	const valid = out?.summary?.["@status"] === "valid";
	if (valid) {
		return;
	}

	const messages: string[] = [];

	const parse = (type: "xml" | "pdf") => {
		const section = out[type] ?? out;
		const invalid = section.summary?.["@status"] === "invalid";

		if (!invalid) {
			return;
		}
		if (!section?.messages) {
			return;
		}

		const msgs = arrayable(
			"#" in section.messages ? section.messages["#"] : section.messages,
		);
		for (const msg of msgs) {
			if ("error" in msg) {
				messages.push(...arrayable(msg.error).map(({ "#": m }) => m));
			}
			if ("warning" in msg) {
				const message = arrayable(msg.warning)
					.map(({ "#": m }) => m)
					.join("\n\n");
				if (message) {
					ctx.logger.warn(message);
				}
				// TODO: opts.hooks.onWarning();
			}
		}
	};

	if ("pdf" in out) {
		parse("pdf" in out ? "pdf" : "xml");
	}

	if (messages.length === 0 && out.summary["@status"] !== "invalid") return;

	throw new ZugferdError(messages.join("\n\n") || "Validation failed");
	// throw new ZugferdValidationError(messages.join("\n\n"), cause);
}

function run(cmd: [string, ...string[]], opts?: { cwd?: string }) {
	return new Promise<{ stdout: string; stderr: string; code: number | null }>(
		(resolve) => {
			const proc = spawn(cmd[0], cmd.slice(1), {
				cwd: opts?.cwd,
				stdio: ["ignore", "pipe", "pipe"],
				shell: false,
			});

			let stdout = "";
			let stderr = "";

			proc.stdout.on("data", (d) => {
				stdout += d.toString("utf-8");
			});

			proc.stderr.on("data", (d) => {
				stderr += d.toString("utf-8");
			});

			proc.on("close", (code) => {
				resolve({ stdout, stderr, code });
			});
		},
	);
}

export type * from "./types";
