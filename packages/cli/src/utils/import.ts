import type { ZugferdPlugin, ZugferdProfile } from "@node-zugferd/core";
import type { Result } from "./helper";
import { tryCatch } from "./helper";
import { PLUGINS } from "../commands/init/utils/plugins";
import { PROFILES } from "../commands/init/utils/profiles";
import { fileURLToPath } from "node:url";

export type ImportPackageConfig = {
	optional?: boolean | undefined;
};

const promises = new Map<string, Promise<Result<any>>>();

export const importPackage = <R>(
	path: string,
	cfg?: ImportPackageConfig,
): Promise<Result<R>> => {
	const cached = promises.get(path);
	if (cached) {
		return cached as Promise<Result<R>>;
	}

	const promise = tryCatch(
		import(path).catch((err) => {
			if (
				!cfg?.optional &&
				"code" in err &&
				err.code === "ERR_MODULE_NOT_FOUND"
			) {
				const pm = process.env.npm_config_user_agent?.split("/", 2)[0] ?? "npm";
				const message = `Failed to import package "${path}" from "${fileURLToPath(err.url ?? "")}". Make sure the package is installed.\n\nYou can install it via:\n\n  ${pm} install ${path}\n\nor globally:\n\n  ${pm} install -g ${path}\n`;
				console.log(message);
				process.exit(1);
			}
			throw err;
		}),
	);

	promises.set(path, promise);
	return promise;
};

export const importPlugin = async <
	R extends ZugferdPlugin | ((...args: any[]) => ZugferdPlugin),
>(
	id: string,
	cfg?: ImportPackageConfig | undefined,
): Promise<Result<R>> => {
	const plugin = PLUGINS.get(id);
	if (!plugin) {
		throw new Error(`Plugin with id "${id}" not found.`);
	}
	const imp = plugin.imports?.[0];
	const namedImport = plugin.imports?.[0]?.imports?.[0];
	if (!imp || !namedImport) {
		throw new Error(`No import found for plugin "${id}".`);
	}

	return importPackage(imp.path, cfg).then((result) => {
		if (result.error) return result;
		const plugin = (result.data as any)?.[namedImport.name];
		if (!plugin) {
			result.data = null;
			// @ts-expect-error
			result.error = new Error(
				`Named import "${namedImport.name}" not found in package "${imp.path}".`,
			);
		} else {
			result.data = plugin;
		}
		return result as Result<R>;
	});
};

export const importProfile = async <R extends ZugferdProfile = ZugferdProfile>(
	id: string,
	cfg?: ImportPackageConfig | undefined,
) => {
	const profileDef = PROFILES.get(id);
	if (!profileDef) {
		throw new Error(`Profile with id "${id}" not found.`);
	}

	const imp = profileDef.imports?.[0];
	const namedImport = profileDef.imports?.[0]?.imports?.[0];
	if (!imp || !namedImport) {
		throw new Error(`No import found for profile "${id}".`);
	}

	return importPackage(imp.path, cfg).then((result) => {
		if (result.error) return result;
		const profile = (result.data as any)?.[namedImport.name];
		if (!profile) {
			result.data = null;
			// @ts-expect-error
			result.error = new Error(
				`Named import "${namedImport.name}" not found in package "${imp.path}".`,
			);
		} else {
			result.data = profile;
		}
		return result as Result<R>;
	});
};
