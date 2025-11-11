import { exec } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { platform, tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import type { ZugferdValidator } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { getMustangCLI } from "./isomorph";
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
			const cli = await getMustangCLI();

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
			].filter(Boolean);
			const cmd = ["java", ...args].join(" ");

			try {
				const { stderr } = await promisify(exec)(cmd, {
					encoding: "utf-8",
				});
				// TODO: does mustang-cli output validation errors to stderr?
				if (!stderr) {
					return;
				}
				// TODO: parse xml
				ctx.logger.error("Validation errors:", stderr);
				throw new ZugferdError("Validation failed");
			} catch (error) {
				// TODO:
				ctx.logger.error("Validation exited unexpectedly", error);
				throw error;
			} finally {
				await rm(tempDir, { recursive: true, force: true });
			}
		},
	} satisfies ZugferdValidator;
}
mustangValidator.setup = setup;
