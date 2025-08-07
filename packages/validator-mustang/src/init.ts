import type { ZugferdContext } from "node-zugferd/types";
import type { MustangValidatorOptions } from ".";
import { run } from "./run";
import { existsSync } from "fs";
import { downloadMustangJar } from "./download-mustang-jar";

export const init = async (
	ctx: ZugferdContext,
	options: MustangValidatorOptions & {
		mustangJarPath: string;
	},
) => {
	const javaVersion = await checkJavaVersion();
	if (!javaVersion) {
		throw Error("Java is not installed");
	}

	if (existsSync(options.mustangJarPath)) {
		ctx.logger.info(
			`Skipping Mustang installation. File already exists at ${options.mustangJarPath}`,
		);
		return;
	}

	await downloadMustangJar(options.mustangJarPath);
};

const checkJavaVersion = async () => {
	try {
		const version = await run("java -version");
		return version;
	} catch {}

	return null;
};
