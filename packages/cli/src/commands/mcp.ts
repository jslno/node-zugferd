import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { box, cancel, intro, isCancel, log, select } from "@clack/prompts";
import chalk from "chalk";
import { Command, Option } from "commander";
import * as z from "zod";
import { open } from "../utils/helper";

const REMOTE_MCP_URL = "https://node-zugferd.jsolano.de/mcp";

const baseMcpOptionsSchema = z.object({
	cwd: z.string().default(process.cwd()),
});

type Client = {
	label: string;
	description?: string;
	option: Option;
	handler: (
		options: z.output<typeof baseMcpOptionsSchema>,
	) => Promise<void> | void;
};

const clients = {
	cursor: {
		label: "Cursor",
		option: new Option("--cursor", "Add the MCP server to Cursor"),
		handler: async (_opts) => {
			intro("Adding node-zugferd MCP to Cursor...");

			const remoteConfig = { url: REMOTE_MCP_URL };
			const encodedRemote = (() => {
				const data = JSON.stringify(remoteConfig);
				const bytes =
					typeof data === "string" ? new TextEncoder().encode(data) : data;

				let binary = "";
				for (const byte of bytes) {
					binary += String.fromCharCode(byte);
				}
				return btoa(binary);
			})();

			const remoteDeeplink = `cursor://anysphere.cursor-deeplink/mcp/install?name=${encodeURIComponent("node-zugferd")}&config=${encodedRemote}`;

			try {
				open(remoteDeeplink);

				log.success(`✓ Opened Cursor to install the MCP server.`);
			} catch {
				process.exitCode = 1;
				log.error("Could not automatically open Cursor for MCP installation.");
				return;
			}

			log.message("", {
				spacing: 0,
			});
			box(
				chalk.gray(
					[
						"- Confirm the installation in Cursor",
						"- You can now use node-zugferd features directly in Cursor",
					].join("\n"),
				),
				"✨ Next Steps",
				{
					titlePadding: 2,
					formatBorder: (text) => chalk.gray(text),
					rounded: true,
				},
			);
		},
	},
	codex: {
		label: "Codex",
		option: new Option("--codex", "Add the MCP server to Codex"),
		handler: (_opts) => {
			intro("Adding node-zugferd MCP to Codex...");

			const cmd = `claude mcp add --transport http node-zugferd ${REMOTE_MCP_URL}`;
			try {
				execSync(cmd, { stdio: "inherit" });

				log.success(`✓ Codex MCP configured!`);
			} catch {
				process.exitCode = 1;
				log.error(
					"Could not automatically add to Codex. Please run this command manually:",
				);
				log.message(chalk.cyan(cmd) + "\n");
				return;
			}

			log.message("", {
				spacing: 0,
			});
			box(
				chalk.gray(
					[
						"- ChatGPT desktop, Codex CLI, and the IDE extension share this MCP server",
						"- Run `codex mcp list` to verify the connection",
					].join("\n"),
				),
				"✨ Next Steps",
				{
					titlePadding: 2,
					formatBorder: (text) => chalk.gray(text),
					rounded: true,
				},
			);
		},
	},
	claudeCode: {
		label: "Claude Code",
		option: new Option("--claude-code", "Add the MCP server to Claude Code"),
		handler: (_opts) => {
			intro("Adding node-zugferd MCP to Claude Code...");

			const cmd = `claude mcp add --transport http node-zugferd ${REMOTE_MCP_URL}`;
			try {
				execSync(cmd, { stdio: "inherit" });

				log.success(`✓ Claude Code MCP configured!`);
			} catch {
				process.exitCode = 1;
				log.error(
					"Could not automatically add to Claude Code. Please run this command manually:",
				);
				log.message(chalk.cyan(cmd) + "\n");
				return;
			}

			log.message("", {
				spacing: 0,
			});
			box(
				chalk.gray(
					[
						"- You can now use node-zugferd features directly in Claude Code",
					].join("\n"),
				),
				"✨ Next Steps",
				{
					titlePadding: 2,
					formatBorder: (text) => chalk.gray(text),
					rounded: true,
				},
			);
		},
	},
	openCode: {
		label: "Open Code",
		option: new Option("--open-code", "Add the MCP server to Open Code"),
		handler: (opts) => {
			intro("Adding node-zugferd MCP to Open Code...");

			const configPath = path.join(opts.cwd, "opencode.json");

			const openCodeConfig = {
				$schema: "https://opencode.ai/config.json",
				mcp: {
					servers: {
						"node-zugferd": {
							type: "remote",
							url: REMOTE_MCP_URL,
							disabled: false,
						},
					},
				},
			};

			try {
				let existingConfig: {
					mcp?: Record<string, unknown>;
					[key: string]: unknown;
				} = {};
				if (existsSync(configPath)) {
					existingConfig = JSON.parse(readFileSync(configPath, "utf-8"));
				}

				const mergedConfig = {
					...existingConfig,
					...openCodeConfig,
					mcp: {
						...(existingConfig.mcp ?? {}),
						...openCodeConfig.mcp,
						servers: {
							...(existingConfig.mcp?.servers ?? {}),
							...openCodeConfig.mcp.servers,
						},
					},
				};

				writeFileSync(configPath, JSON.stringify(mergedConfig, null, 2));
				log.step(`Open Code configuration written to ${configPath}`);
				log.success(`✓ node-zugferd MCP server added successfully!`);
			} catch {
				process.exitCode = 1;
				log.error(
					"Could not automatically write opencode.json, please add this configuration manually:",
				);
				log.message(JSON.stringify(openCodeConfig, null, 2) + "\n");
				return;
			}

			log.message("", {
				spacing: 0,
			});
			box(
				chalk.gray(
					[
						"- Restart Open Code to load the new MCP server",
						"- You can now use node-zugferd features directly in Open Code",
					].join("\n"),
				),
				"✨ Next Steps",
				{
					titlePadding: 2,
					formatBorder: (text) => chalk.gray(text),
					rounded: true,
				},
			);
		},
	},
	manual: {
		label: "Manual",
		option: new Option("--manual", "Add the MCP server to mcp.json"),
		handler: (opts) => {
			intro("node-zugferd MCP configuration...");

			const configPath = path.join(opts.cwd, "mcp.json");

			const manualConfig = {
				"node-zugferd": {
					url: REMOTE_MCP_URL,
				},
			};

			try {
				let existingConfig = {};
				if (existsSync(configPath)) {
					existingConfig = JSON.parse(readFileSync(configPath, "utf-8"));
				}

				const mergedConfig = {
					...existingConfig,
					...manualConfig,
				};

				writeFileSync(configPath, JSON.stringify(mergedConfig, null, 2));
				log.step(`MCP configuration written to ${configPath}`);
				log.success(`✓ node-zugferd MCP server added successfully!`);
			} catch {
				process.exitCode = 1;
				log.error(
					"Could not automatically write mcp.json, please add this configuration manually:",
				);
				log.message(JSON.stringify(manualConfig, null, 2) + "\n");
				return;
			}

			log.message("", {
				spacing: 0,
			});
			box(
				chalk.gray(
					[
						"- Restart your MCP client to load the new server",
						"- You can now use node-zugferd features directly in your MCP client",
					].join("\n"),
				),
				"✨ Next Steps",
				{
					titlePadding: 2,
					formatBorder: (text) => chalk.gray(text),
					rounded: true,
				},
			);
		},
	},
} satisfies Record<string, Client>;

const mcpOptionsSchema = baseMcpOptionsSchema.and(
	z.record(
		z.enum(
			Object.values(clients).map((client) => client.option.attributeName()),
		),
		z.boolean().optional(),
	),
);

async function mcpAction(options: unknown) {
	const opts = await mcpOptionsSchema.parseAsync(options);

	let selectedClient: Client | undefined;
	for (const client of Object.values(clients)) {
		if (opts[client.option.attributeName()]) {
			selectedClient = client;
			break;
		}
	}

	if (!selectedClient) {
		const selected = await select({
			message: "Select a MCP Client:",
			options: Object.values(clients).map((client) => ({
				label: client.label,
				value: client,
				hint:
					"description" in client &&
					typeof client.description === "string" &&
					!!client.description
						? client.description
						: undefined,
			})),
		});

		if (isCancel(selected)) {
			cancel("✋ Operation cancelled.");
			process.exit(1);
		}

		selectedClient = selected;
	}

	if (!selectedClient) {
		process.exitCode = 1;
		log.error("No client selected.");
		return;
	}

	await selectedClient.handler(opts);
}

export const mcp = new Command("mcp")
	.description("Add node-zugferd MCP server to MCP Clients")
	.option("--cwd", "The current working directory.")
	.action(mcpAction);

Object.values(clients).forEach((client) => mcp.addOption(client.option));
