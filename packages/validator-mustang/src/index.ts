import type { Validator } from "node-zugferd/types";
import { init } from "./init";
import os from "os";
import { randomUUID } from "crypto";
import path from "path";
import { mkdir, unlink, writeFile } from "fs/promises";
import type { Stream } from "stream";
import { execSync } from "child_process";

export type MustangValidatorOptions = {
	mustangJarPath?: string;
	/**
	 * @default os.tmpdir()
	 */
	tempDir?: string;
	/**
	 * @default "node-zugferd-"
	 */
	tempFilePrefix?: string;
};

export const mustangValidator = <O extends MustangValidatorOptions>(
	options?: O,
) => {
	const opts = {
		tempDir: os.tmpdir(),
		tempFilePrefix: "node-zugferd-",
		mustangJarPath: "node_modules/@node-zugferd/validator-mustang/Mustang.jar",
		...options,
	};

	const createTmpFile = async (
		content:
			| string
			| NodeJS.ArrayBufferView
			| Iterable<string | NodeJS.ArrayBufferView>
			| AsyncIterable<string | NodeJS.ArrayBufferView>
			| Stream,
	) => {
		const filename = `${opts.tempFilePrefix}${Date.now()}-${randomUUID()}.xml`;
		const filePath = path.join(opts.tempDir, filename);
		await mkdir(path.dirname(filePath), { recursive: true });
		await writeFile(filePath, content);
		return filePath;
	};

	return {
		id: "validator-mustang",
		init: (ctx) => init(ctx, opts),
		run: async (ctx) => {
			const tmpFile = path.resolve(await createTmpFile(ctx.xml));
			const cmd = `java -Xmx1G -Dfile.encoding=UTF-8 -jar "${opts.mustangJarPath}" --no-notices --action validate --source "${tmpFile}"`;

			let output: string | undefined;
			try {
				output = execSync(cmd, {
					encoding: "utf-8",
					stdio: ["ignore", "pipe", "pipe"],
				});
			} catch (error) {
				output =
					error && typeof error === "object" && "stdout" in error
						? (error as { stdout?: string; stderr?: string; message?: string })
								.stdout ||
							(error as { stderr?: string }).stderr ||
							(error as { message?: string }).message
						: String(error);
			}

			await unlink(tmpFile);

			if (output === undefined) {
				return {
					valid: false,
					code: "UNKNOWN",
				};
			}

			const validation = (ctx.context.xml.parse(output) as any).validation;
			const valid = validation.summary["@status"] !== "invalid";
			const messages = validation.xml.messages.error.map((msg: any) =>
				ctx.context.xml.getTextNode(msg),
			);

			return {
				valid,
				messages: !valid ? messages : undefined,
			};
		},
	} satisfies Validator;
};
