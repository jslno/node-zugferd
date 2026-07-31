import type { Dependency } from "../../../utils/install-dependencies";
import type { Import } from "./imports";
import { createImport } from "./imports";

export type Plugin = {
	id: string;
	label: string;
	description?: string | undefined;
	imports?: Import[] | undefined;
	dependencies?: Dependency[] | undefined;
	// TODO:
	arguments?: never;
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
