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
	interface ZugferdPluginRegistry<ZugferdOpts, Options> {
		mustang: {
			creator: typeof mustang<
				ZugferdOpts extends infer R extends ZFOptions ? R : ZFOptions
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
			"order-x-basic",
			"order-x",
			"order-x-extended",
		].includes(profileId);

	const validate = async (
		profileId: string,
		input: string | Uint8Array | ArrayBuffer,
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
		const pdf = isPdf(input);
		const tmpFile = join(tempDir, pdf ? "input.pdf" : "input.xml");
		await writeFile(
			tmpFile,
			typeof input === "string"
				? input
				: input instanceof Uint8Array
					? input
					: new Uint8Array(input),
			typeof input === "string" ? (pdf ? "latin1" : "utf-8") : undefined,
		);

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
mustang.setup = setup;

function isPdf(input: string | Uint8Array | ArrayBuffer) {
	if (typeof input === "string") {
		return input.startsWith("%PDF");
	}

	const bytes = input instanceof Uint8Array ? input : new Uint8Array(input);
	return (
		bytes.length >= 4 &&
		bytes[0] === 0x25 &&
		bytes[1] === 0x50 &&
		bytes[2] === 0x44 &&
		bytes[3] === 0x46
	);
}

function arrayable<T>(value: T | T[] | undefined): T[] {
	if (!value) {
		return [];
	}

	return Array.isArray(value) ? value : [value];
}

function textOf(value: unknown) {
	return arrayable(value)
		.map((entry) => {
			if (typeof entry === "string") {
				return entry;
			}
			if (entry && typeof entry === "object" && "#" in entry) {
				const text = entry["#"];
				return typeof text === "string" ? text : "";
			}
			return "";
		})
		.filter((entry) => entry !== "");
}

function parseValidatorResult(ctx: ZugferdContext, output: string) {
	const out = (
		convert(output.trim(), { format: "object" }) as Record<string, any>
	)?.validation;

	if (!out) {
		throw new ZugferdError("Failed to parse Mustang validation output.");
	}

	const messages: string[] = [];

	const parse = (type: "xml" | "pdf") => {
		const section = out[type] ?? out;
		if (!section?.messages) {
			return;
		}

		const msgs = arrayable(
			"#" in section.messages ? section.messages["#"] : section.messages,
		);
		for (const msg of msgs) {
			if ("error" in msg) {
				messages.push(...textOf(msg.error));
			}
			if ("exception" in msg) {
				messages.push(...textOf(msg.exception));
			}
			if ("warning" in msg) {
				const message = textOf(msg.warning).join("\n\n");
				if (message !== "") {
					ctx.logger.warn(message);
				}
			}
		}
	};

	parse("pdf" in out ? "pdf" : "xml");

	const valid = out?.summary?.["@status"] === "valid";
	if (valid) {
		return;
	}

	if (messages.length === 0 && out.summary["@status"] !== "invalid") return;

	throw new ZugferdError(messages.join("\n\n") || "Validation failed");
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
