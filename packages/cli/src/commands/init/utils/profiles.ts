import type { Dependency } from "../../../utils/install-dependencies";
import type { Import } from "./imports";
import { createImport } from "./imports";

export type Profile = {
	id: string;
	label: string;
	description?: string | undefined;
	imports?: Import[] | undefined;
	dependencies?: Dependency[] | undefined;
	type: "invoice" | "order";
};

export const PROFILES = new Map<string, Profile>();

const addProfile = (
	id: string,
	profile: Omit<Profile, "id" | "type"> & Partial<Pick<Profile, "type">>,
) => {
	PROFILES.set(id, { id, type: "invoice", ...profile });
};

addProfile("minimum", {
	label: "Minimum",
	dependencies: [
		{
			name: "@node-zugferd/minimum",
		},
	],
	imports: [
		createImport({
			path: "@node-zugferd/minimum",
			imports: [
				{
					name: "minimum",
				},
			],
		}),
	],
});

addProfile("basic-wl", {
	label: "Basic WL",
	dependencies: [
		{
			name: "@node-zugferd/basic-wl",
		},
	],
	imports: [
		createImport({
			path: "@node-zugferd/basic-wl",
			imports: [
				{
					name: "basicWL",
				},
			],
		}),
	],
});

addProfile("basic", {
	label: "Basic",
	dependencies: [
		{
			name: "@node-zugferd/basic",
		},
	],
	imports: [
		createImport({
			path: "@node-zugferd/basic",
			imports: [
				{
					name: "basic",
				},
			],
		}),
	],
});

addProfile("en-16931", {
	label: "EN 16931",
	dependencies: [
		{
			name: "@node-zugferd/en-16931",
		},
	],
	imports: [
		createImport({
			path: "@node-zugferd/en-16931",
			imports: [
				{
					name: "en16931",
				},
			],
		}),
	],
});

addProfile("extended", {
	label: "Extended",
	dependencies: [
		{
			name: "@node-zugferd/extended",
		},
	],
	imports: [
		createImport({
			path: "@node-zugferd/extended",
			imports: [
				{
					name: "extended",
				},
			],
		}),
	],
});
