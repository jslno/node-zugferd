import path from "path";
import { afterEach, beforeEach, describe, expect, it, test } from "vitest";
import fs from "fs/promises";
import { getConfig } from "./get-config";
import { MINIMUM } from "node-zugferd/profile/minimum";

type TmpDirFixture = {
	tmpdir: string;
};

export const createTempDir = async () => {
	const tmpdir = path.join(process.cwd(), "test", "getConfig_test-");
	return await fs.mkdtemp(tmpdir);
};

export const tmpdirTest = test.extend<TmpDirFixture>({
	tmpdir: async ({}, use) => {
		const dir = await createTempDir();

		await use(dir);

		await fs.rm(dir, { recursive: true });
	},
});

let tmpDir = ".";

describe("getConfig", async () => {
	beforeEach(async () => {
		const tmp = path.join(process.cwd(), "getConfig_test-");
		tmpDir = await fs.mkdtemp(tmp);
	});

	afterEach(async () => {
		await fs.rm(tmpDir, { recursive: true });
	});

	it("should resolve resolver type alias", async () => {
		const invoicerPath = path.join(tmpDir, "server", "invoicer");
		await fs.mkdir(invoicerPath, { recursive: true });

		await fs.writeFile(
			path.join(tmpDir, "tsconfig.json"),
			`{
                "compilerOptions": {
                    /* Path Aliases */
                    "baseUrl": ".",
                    "paths": {
                        "@profiles/*": ["../node_modules/node-zugferd/dist/profile/*"]
                    },
					"strict": true,
					"module": "Node16",
					"moduleResolution": "node16"
                }
            }`,
		);

		await fs.writeFile(
			path.join(invoicerPath, "invoicer.ts"),
			`import { zugferd } from "node-zugferd";
            import { MINIMUM } from "@profiles/minimum";
            
            export const invoicer = zugferd({
                profile: MINIMUM,
            });`,
		);

		const config = await getConfig({
			cwd: tmpDir,
			configPath: "server/invoicer/invoicer.ts",
		});

		expect(config).not.toBe(null);
	});

	it("should resolve direct alias", async () => {
		const invoicerPath = path.join(tmpDir, "server", "invoicer");
		await fs.mkdir(invoicerPath, { recursive: true });

		await fs.writeFile(
			path.join(tmpDir, "tsconfig.json"),
			`{
                "compilerOptions": {
                    /* Path Aliases */
                    "baseUrl": ".",
                    "paths": {
                        "@profile": ["../node_modules/node-zugferd/dist/profile/minimum"]
                    },
					"strict": true,
					"module": "Node16",
					"moduleResolution": "node16"
                }
            }`,
		);

		await fs.writeFile(
			path.join(invoicerPath, "invoicer.ts"),
			`import { zugferd } from "node-zugferd";
            import { MINIMUM } from "@profile";
            
            export const invoicer = zugferd({
                profile: MINIMUM,
            });`,
		);

		const config = await getConfig({
			cwd: tmpDir,
			configPath: "server/invoicer/invoicer.ts",
		});

		expect(config).not.toBe(null);
	});

	it("should resolve resolver type alias with relative path", async () => {
		const invoicerPath = path.join(tmpDir, "test", "server", "invoicer");
		await fs.mkdir(invoicerPath, { recursive: true });

		await fs.writeFile(
			path.join(tmpDir, "tsconfig.json"),
			`{
                "compilerOptions": {
                    /* Path Aliases */
                    "baseUrl": "./test",
                    "paths": {
                        "@profiles/*": ["../../node_modules/node-zugferd/dist/profile/*"]
                    },
					"strict": true,
					"module": "Node16",
					"moduleResolution": "node16"
                }
            }`,
		);

		await fs.writeFile(
			path.join(invoicerPath, "invoicer.ts"),
			`import { zugferd } from "node-zugferd";
            import { MINIMUM } from "@profiles/minimum";
            
            export const invoicer = zugferd({
                profile: MINIMUM,
            });`,
		);

		const config = await getConfig({
			cwd: tmpDir,
			configPath: "test/server/invoicer/invoicer.ts",
		});

		expect(config).not.toBe(null);
	});

	it("should resolve direct alias with relative path", async () => {
		const invoicerPath = path.join(tmpDir, "test", "server", "invoicer");
		await fs.mkdir(invoicerPath, { recursive: true });

		await fs.writeFile(
			path.join(tmpDir, "tsconfig.json"),
			`{
                "compilerOptions": {
                    /* Path Aliases */
                    "baseUrl": "./test",
                    "paths": {
                        "@profile": ["../../node_modules/node-zugferd/dist/profile/minimum"]
                    },
					"strict": true,
					"module": "Node16",
					"moduleResolution": "node16"
                }
            }`,
		);

		await fs.writeFile(
			path.join(invoicerPath, "invoicer.ts"),
			`import { zugferd } from "node-zugferd";
            import { MINIMUM } from "@profile";
            
            export const invoicer = zugferd({
                profile: MINIMUM,
            });`,
		);

		const config = await getConfig({
			cwd: tmpDir,
			configPath: "test/server/invoicer/invoicer.ts",
		});

		expect(config).not.toBe(null);
	});

	it("should resolve with relative import", async () => {
		const invoicerPath = path.join(tmpDir, "server", "invoicer");
		await fs.mkdir(invoicerPath, { recursive: true });

		await fs.writeFile(
			path.join(tmpDir, "tsconfig.json"),
			`{
                "compilerOptions": {
					"strict": true,
					"module": "Node16",
					"moduleResolution": "node16"
                }
            }`,
		);

		await fs.writeFile(
			path.join(invoicerPath, "options.ts"),
			`import type { ZugferdOptions } from "node-zugferd/types";
			import { MINIMUM } from "node-zugferd/profile/minimum";

			export const options = {
				profile: MINIMUM,
			} as const satisfies ZugferdOptions;`,
		);

		await fs.writeFile(
			path.join(invoicerPath, "invoicer.ts"),
			`import { zugferd } from "node-zugferd";
            import { options } from "./options";
            
            export const invoicer = zugferd(options);`,
		);

		const config = await getConfig({
			cwd: tmpDir,
			configPath: "server/invoicer/invoicer.ts",
		});

		expect(config).not.toBe(null);
	});

	it("should error with invalid alias", async () => {
		const invoicerPath = path.join(tmpDir, "server", "invoicer");
		await fs.mkdir(invoicerPath, { recursive: true });

		await fs.writeFile(
			path.join(tmpDir, "tsconfig.json"),
			`{
                "compilerOptions": {
					/* Path Aliases */
					"baseUrl": ".",
					"paths": {
						"@profiles/*": ["./PathIsInvalid/*"]
					},
					"strict": true,
					"module": "Node16",
					"moduleResolution": "node16"
                }
            }`,
		);

		await fs.writeFile(
			path.join(invoicerPath, "invoicer.ts"),
			`import { zugferd } from "node-zugferd";
            import { MINIMUM } from "@profiles/minimum";
            
            export const invoicer = zugferd({
                profile: MINIMUM,
            });`,
		);

		await expect(() =>
			getConfig({
				cwd: tmpDir,
				configPath: "/server/invoicer/invoicer.ts",
			}),
		).rejects.toThrowError();
	});

	it("should resolve js config", async () => {
		const invoicerPath = path.join(tmpDir, "server", "invoicer");
		await fs.mkdir(invoicerPath, { recursive: true });

		await fs.writeFile(
			path.join(invoicerPath, "invoicer.js"),
			`import { zugferd } from "node-zugferd";
            import { MINIMUM } from "node-zugferd/profile/minimum";

            export const invoicer = zugferd({
                profile: MINIMUM,
            });`,
		);
		const config = await getConfig({
			cwd: tmpDir,
			configPath: "server/invoicer/invoicer.js",
		});

		expect(config).not.toBe(null);
		expect(config?.profile.id).toBe(MINIMUM.id);
	});
});
