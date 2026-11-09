import { cancel, confirm, isCancel } from "@clack/prompts";
import type { Dependency } from "../../../utils/install-dependencies";
import type { Import } from "./imports";
import { createImport } from "./imports";

export type PluginOptionsOutput = {
	code: string;
};

export type Plugin = {
	id: string;
	label: string;
	description?: string | undefined;
	imports?: Import[] | undefined;
	dependencies?: Dependency[] | undefined;
	options?: PluginOptionsOutput | undefined;
	prompt?: (ctx: {
		hasDependency: (name: string) => boolean;
		depsToInstall: Dependency[];
		filesToWrite: (() => Promise<void>)[];
		imports: Import[];
		options: PluginOptionsOutput;
	}) => Promise<void> | void;
};

export const PLUGINS = new Map<string, Plugin>();

const addPlugin = (id: string, plugin: Omit<Plugin, "id">) => {
	PLUGINS.set(id, { id, ...plugin });
};

addPlugin("parser", {
	label: "Parser",
	dependencies: [
		{
			name: "@node-zugferd/parser",
		},
	],
	imports: [
		createImport({
			path: "@node-zugferd/parser",
			imports: [
				{
					name: "parser",
				},
			],
		}),
	],
});
addPlugin("xsd", {
	label: "XSD Validator",
	dependencies: [
		{
			name: "@node-zugferd/validator-xsd",
		},
	],
	imports: [
		createImport({
			path: "@node-zugferd/validator-xsd",
			imports: [
				{
					name: "xsd",
				},
			],
		}),
	],
});
addPlugin("mustang", {
	label: "Mustang Validator",
	dependencies: [
		{
			name: "@node-zugferd/validator-mustang",
		},
	],
	imports: [
		createImport({
			path: "@node-zugferd/validator-mustang",
			imports: [
				{
					name: "mustang",
				},
			],
		}),
	],
});
addPlugin("magic-bytes", {
	label: "Magic Bytes",
	dependencies: [
		{
			name: "@node-zugferd/magic-bytes",
		},
	],
	imports: [
		createImport({
			path: "@node-zugferd/magic-bytes",
			imports: [
				{
					name: "magicBytes",
				},
			],
		}),
	],
});
addPlugin("templates", {
	label: "Templates",
	dependencies: [
		{
			name: "@node-zugferd/templates",
		},
	],
	imports: [
		createImport({
			path: "@node-zugferd/templates",
			imports: [
				{
					name: "templates",
				},
			],
		}),
	],
	prompt: async ({ options, depsToInstall, hasDependency, imports }) => {
		if (!hasDependency("@node-zugferd/default-template")) {
			const answer = await confirm({
				message: "Would you like to install the default template?",
				initialValue: true,
			});
			if (isCancel(answer)) {
				cancel("✋ Operation cancelled.");
				process.exit(0);
			}
			if (answer) {
				depsToInstall.push({
					name: "@node-zugferd/default-template",
				});
				imports.push(
					createImport({
						path: "@node-zugferd/default-template",
						imports: [
							{
								name: "defaultTemplate",
							},
						],
					}),
				);

				options.code = `{
					templates: {
						default: defaultTemplate(),
					},
					defaultTemplate: "default",
				}`;
			}
		}
	},
});
addPlugin("instrumentation", {
	label: "Instrumentation",
	dependencies: [
		{
			name: "@node-zugferd/instrumentation",
		},
		{
			name: "@opentelemetry/api",
		},
	],
	imports: [
		createImport({
			path: "@node-zugferd/instrumentation",
			imports: [
				{
					name: "instrumentation",
				},
			],
		}),
	],
});
