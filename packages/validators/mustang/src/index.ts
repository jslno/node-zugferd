import { exec } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { platform, tmpdir } from "node:os";
import path, { join } from "node:path";
import { promisify } from "node:util";
import type { ZugferdValidator } from "@node-zugferd/core";
import { ZugferdError, ZugferdValidationError } from "@node-zugferd/core/error";
import { XMLParser } from "fast-xml-parser";
import { __dirname } from "./isomorph";
import { setup } from "./setup";

export type MustangValidatorConfig = {
	/**
	 * @default os.tmpdir()
	 */
	temporaryDirectory?: string | undefined;
	/**
	 * Initial heap size for the Java Virtual Machine in megabytes.
	 */
	initialHeapSize?: number | undefined;
	/**
	 * Maximum heap size for the Java Virtual Machine in megabytes.
	 *
	 * @default 1000 (1 GB)
	 */
	maximumHeapSize?: number | "inherit" | undefined;
};

export function mustangValidator(config?: MustangValidatorConfig | undefined) {
	return {
		id: "mustang",
		run: async (xml, ctx) => {
			if (
				![
					"minimum",
					"basic-wl",
					"basic",
					"en16931",
					"extended",
					"xrechnung",
				].includes(ctx.profile.id)
			) {
				ctx.logger.warn(
					`The Mustang validator does not support the profile "${ctx.profile.id}". Skipping validation.`,
				);
				return;
			}
			const cli = join(__dirname, "../runtime", "Mustang-CLI.jar");

			if (platform() === "darwin" && !config?.temporaryDirectory) {
				ctx.logger.warn(
					"Using the default temporary directory on macOS can potentially lead to issues, as it returns a symlink instead of an absolute path. Consider specifying a custom temporary directory in the validator config.",
				);
			}

			const tempDir = await mkdtemp(
				path.join(
					config?.temporaryDirectory ?? tmpdir(),
					"node-zugferd_mustang-",
				),
			);
			const tmpFile = path.join(tempDir, "input.xml");
			await writeFile(tmpFile, xml, "utf-8");

			const args = [
				config?.initialHeapSize !== undefined &&
					`-Xms${config.initialHeapSize}m`,
				config?.maximumHeapSize !== "inherit" &&
					`-Xmx${config?.maximumHeapSize ?? "1000"}m`,
				"-Dfile.encoding=UTF-8",
				`-jar "${cli}"`,
				"--no-notices",
				"--action validate",
				`--source "${tmpFile}"`,
				platform() === "win32" ? "2> NUL" : "2> /dev/null",
			].filter(Boolean);
			const cmd = ["java", ...args].join(" ");

			try {
				await promisify(exec)(cmd, {
					encoding: "utf-8",
				});
			} catch (error: any) {
				if ("stdout" in error && typeof error.stdout === "string") {
					return await parseMustangResult(error.stdout);
				}
				ctx.logger.error("Validation exited unexpectedly", error);
				throw new ZugferdError("Validation exited unexpectedly", error);
			} finally {
				await rm(tempDir, { recursive: true, force: true });
			}
		},
	} satisfies ZugferdValidator;
}
mustangValidator.setup = setup;

function parseMustangResult(output: string) {
	const parser = new XMLParser({
		ignoreDeclaration: true,
		ignoreAttributes: false,
		attributeNamePrefix: "@",
		textNodeName: "#",
	});

	const out = parser.parse(output.trim())?.validation;

	if (!out) {
		throw new ZugferdError("Failed to parse Mustang validation output.");
	}

	const valid = out?.summary?.["@status"] === "valid";
	if (valid) {
		return;
	}

	const messages: string[] = [];
	const cause: any = {};
	const xmlInvalid = out?.xml?.summary?.["@status"] === "invalid";
	const pdfInvalid = out?.pdf?.summary?.["@status"] === "invalid";

	const parse = (type: "xml" | "pdf") => {
		if (!out[type]?.messages) {
			return;
		}
		const errors = Array.isArray(out[type].messages.error || [])
			? out[type].messages.error || []
			: [out[type].messages.error];
		const notices = Array.isArray(out[type].messages.notice || [])
			? out[type].messages.notice || []
			: [out[type].messages.notice];

		if (errors.length > 0) {
			(cause.errors ||= []).push(
				...errors.map((e: any) => {
					const message = e["#"];
					messages.push(message);
					return {
						code: e["@type"],
						message,
					};
				}),
			);
		}

		if (notices.length > 0) {
			(cause.notices ||= []).push(
				...notices.map((n: any) => {
					const message = n["#"];
					messages.push(message);
					return {
						code: n["@type"],
						message,
						location: n["@location"],
					};
				}),
			);
		}
	};

	if (xmlInvalid) {
		parse("xml");
	}

	if (pdfInvalid) {
		parse("pdf");
	}

	throw new ZugferdValidationError(messages.join("\n\n"), cause);
}
