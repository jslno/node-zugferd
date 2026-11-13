import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { box, intro, isCI, isTTY, log } from "@clack/prompts";
import chalk from "chalk";
import { Command } from "commander";
import z from "zod";
import { getConfig } from "../utils/get-config";
import {
	getInstalledPackageVersion,
	getPackageInfo,
	hasDependency,
} from "../utils/get-package-info";
import { detectPackageManager } from "../utils/package-manager";

const getSystemInfo = () => {
	const cpus = os.cpus();
	return {
		platform: os.platform(),
		arch: os.arch(),
		version: os.version(),
		release: os.release(),
		cpu: {
			cores: cpus.length,
			model: cpus[0]?.model?.trim() || "Unknown",
		},
		memory: {
			total: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
			free: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
		},
	};
};

const getNodeInfo = () => ({
	version: process.version,
	env: process.env.NODE_ENV || "development",
});

const getFrameworkInfo = (projectRoot: string) => {
	const packageJsonPath = path.join(projectRoot, "package.json");

	if (!existsSync(packageJsonPath)) return null;

	try {
		const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));

		const installedFrameworks = [
			{ name: "next", packageName: "next" },
			{ name: "nuxt", packageName: "nuxt" },
			{ name: "nestjs", packageName: "@nestjs/core" },
			{ name: "@tanstack/start", packageName: "@tanstack/start" },
			{ name: "cloudflare-wrangler", packageName: "wrangler" },
			{ name: "@sveltejs/kit", packageName: "@sveltejs/kit" },
			{ name: "express", packageName: "express" },
			{ name: "fastify", packageName: "fastify" },
			{ name: "hono", packageName: "hono" },
			{ name: "@solidjs/start", packageName: "@solidjs/start" },
			{ name: "remix", packageName: "remix" },
			{ name: "qwik", packageName: "@builder.io/qwik" },
			{ name: "react-router", packageName: "react-router" },
			{ name: "astro", packageName: "astro" },
			{ name: "elysia", packageName: "elysia" },
			{ name: "electron", packageName: "electron" },
			{ name: "effect", packageName: "effect" },
			{ name: "encore", packageName: "encore.dev" },
			{ name: "nitro", packageName: "nitro" },
			{ name: "convex", packageName: "convex" },
		].filter(({ packageName }) => hasDependency(packageJson, packageName));

		if (installedFrameworks.length === 0) return null;

		return installedFrameworks;
	} catch {}
	return null;
};

const sanitizeNodeZugferdConfig = (config: any): any => {
	if (!config) return null;

	const sanitized = JSON.parse(JSON.stringify(config));
	return sanitized;
};

const getNodeZugferdInfo = async (
	projectRoot: string,
	configPath?: string,
	supressLogs = false,
) => {
	let nodeZugferdVersion = "Unknown";
	try {
		const packageInfo = getPackageInfo(projectRoot);
		const declaredVersion =
			packageInfo.dependencies?.["node-zugferd"] ||
			packageInfo.devDependencies?.["node-zugferd"] ||
			packageInfo.peerDependencies?.["node-zugferd"] ||
			packageInfo.optionalDependencies?.["node-zugferd"];
		if (declaredVersion) {
			nodeZugferdVersion =
				getInstalledPackageVersion("node-zugferd", projectRoot) ??
				declaredVersion;
		}
	} catch {}

	try {
		const origLog = console.log;
		const origInfo = console.info;
		const origWarn = console.warn;
		const origError = console.error;

		if (supressLogs) {
			console.log = console.warn = console.info = console.error = () => {};
		}

		try {
			const config = await getConfig({
				cwd: projectRoot,
				configPath,
				throw: true,
			});
			return {
				version: nodeZugferdVersion,
				config: sanitizeNodeZugferdConfig(config),
			};
		} finally {
			if (supressLogs) {
				console.log = origLog;
				console.info = origInfo;
				console.warn = origWarn;
				console.error = origError;
			}
		}
	} catch (error) {
		return {
			version: nodeZugferdVersion,
			config: null,
			error:
				error instanceof Error
					? error.message
					: "Failed to load node-zugferd config.",
		};
	}
};

const clipboardCommands: Partial<Record<NodeJS.Platform, string>> = {
	darwin: "pbcopy",
	linux: "xclip -selection clipboard",
	win32: "clip",
};

// The notice goes to stderr so stdout keeps only the info itself.
function copyToClipboard(text: string) {
	const command = clipboardCommands[os.platform()];
	if (!command) return;
	try {
		execSync(command, { input: text });
		console.error(chalk.green("✓ Copied to clipboard"));
	} catch {
		console.error(chalk.yellow("⚠ Could not copy to clipboard"));
	}
}

function formatOutput(data: any, indent = 0): string {
	const spaces = " ".repeat(indent);

	if (data === null || data === undefined) {
		return `${spaces}${chalk.gray("N/A")}`;
	}

	if (
		typeof data === "string" ||
		typeof data === "number" ||
		typeof data === "boolean"
	) {
		return `${spaces}${data}`;
	}

	if (Array.isArray(data)) {
		if (data.length === 0) {
			return `${spaces}${chalk.gray("[]")}`;
		}
		return data.map((item) => formatOutput(item, indent)).join("\n");
	}

	if (typeof data === "object") {
		const entries = Object.entries(data);
		if (entries.length === 0) {
			return `${spaces}${chalk.gray("{}")}`;
		}

		return entries
			.map(([key, value]) => {
				if (
					typeof value === "object" &&
					value !== null &&
					!Array.isArray(value)
				) {
					return `${spaces}${chalk.cyan(key)}:\n${formatOutput(value, indent + 2)}`;
				}
				return `${spaces}${chalk.cyan(key)}: ${formatOutput(value, 0)}`;
			})
			.join("\n");
	}

	return `${spaces}${JSON.stringify(data)}`;
}

const infoOptionsSchema = z.object({
	cwd: z.string().default(process.cwd()),
	config: z.string().optional(),
	json: z.boolean().default(false),
	copy: z.boolean().default(false),
});

async function infoAction(options: unknown) {
	const opts = await infoOptionsSchema.parseAsync(options);

	const projectRoot = path.resolve(opts.cwd);

	const systemInfo = getSystemInfo();
	const nodeInfo = getNodeInfo();
	const packageManager = await detectPackageManager(opts.cwd);
	const frameworks = getFrameworkInfo(projectRoot);
	const nodeZugferdInfo = await getNodeZugferdInfo(
		projectRoot,
		opts.config,
		opts.json,
	);

	const fullInfo = {
		system: systemInfo,
		node: nodeInfo,
		packageManager,
		frameworks,
		nodeZugferd: nodeZugferdInfo,
	};

	if (opts.json) {
		const jsonOutput = JSON.stringify(fullInfo, null, 2);
		console.log(jsonOutput);

		if (opts.copy) {
			copyToClipboard(jsonOutput);
		}
		return;
	}

	// Format and display output
	intro(chalk.bold("📊 node-zugferd System Information"));

	log.step(chalk.bold.white("🖥️  System Information:"));
	log.message(formatOutput(systemInfo, 2));

	log.step(chalk.bold.white("📦 Node.js:"));
	log.message(formatOutput(nodeInfo, 2));

	log.step(chalk.bold.white("📦 Package Manager:"));
	log.message(formatOutput(packageManager, 2));

	if (frameworks) {
		log.step(chalk.bold.white("🚀 Frameworks:"));
		log.message(formatOutput(frameworks, 2));
	}

	log.step(chalk.bold.white("⭐ node-zugferd:"));
	log.message(`  ${chalk.cyan("Version")}: ${nodeZugferdInfo.version}`);
	if (nodeZugferdInfo.error) {
		log.error(`  ${chalk.red("Error:")} ${nodeZugferdInfo.error}`);
	} else if (nodeZugferdInfo.config) {
		log.message(`  ${chalk.cyan("Configuration")}:`);
		log.message(formatOutput(nodeZugferdInfo.config, 4));
	}

	// Tips are for a person at a terminal, never for CI or a script.
	if (isTTY(process.stdin) && isTTY(process.stderr) && !isCI()) {
		log.message("", { spacing: 0 });
		box(
			chalk.gray(
				[
					"Use --json flag for JSON output",
					"Use --copy flag to copy output to clipboard",
					"When reporting issues, include this information",
				].join("\n"),
			),
			"💡 Tips",
			{
				rounded: true,
				formatBorder: (text) => chalk.gray(text),
			},
		);
	}

	if (opts.copy) {
		const textOutput = `
node-zugferd System Information
==============================

System Information:
${JSON.stringify(systemInfo, null, 2)}

Node.js:
${JSON.stringify(nodeInfo, null, 2)}

Package Manager:
${JSON.stringify(packageManager, null, 2)}

Frameworks:
${JSON.stringify(frameworks, null, 2)}

node-zugferd:
${JSON.stringify(nodeZugferdInfo, null, 2)}
`;

		copyToClipboard(textOutput);
	}
}

export const info = new Command("info")
	.description("Display system and node-zugferd configuration information.")
	.option("--cwd <cwd>", "The current working directory.")
	.option("--config <path>", "Path to the node-zugferd configuration file.")
	.option("-j, --json", "Output as JSON.")
	.option("-c, --copy", "Copy output to clipboard. (requires pbcopy/xclip)")
	.action(infoAction);
