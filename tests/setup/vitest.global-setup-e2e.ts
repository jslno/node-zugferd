/* eslint-disable import/no-extraneous-dependencies */
import fs from 'node:fs';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

import type { TestProject } from 'vitest/node';

process.env.VITEST = 'true';

const MUSTANG_JAR_PATH = 'node_modules/Mustang/Mustang-CLI.jar';

export default async function globalSetup(project: TestProject) {
	// eslint-disable-next-line no-console
	console.log('Starting Global Test Setup...');
	const start = Date.now();

	await Promise.all([
		(async () => {
			console.log('We need java to check the xml e-invoices.');
			console.log('Checking if java is installed...');
			// now check that java is installed
			const javaVersion = execSync('java -version', {
				encoding: 'utf8',
			});
			console.log(`Java version: ${javaVersion}`);

			// check if the file already exists
			if (fs.existsSync(MUSTANG_JAR_PATH)) {
				console.log(`File already exists at ${MUSTANG_JAR_PATH}`);
				return;
			}

			// make sure the directory exists
			fs.mkdirSync(path.dirname(MUSTANG_JAR_PATH), { recursive: true });

			// download the Mustang CLI and save it to node_modules/Mustang/Mustang-CLI.jar
			const response = await fetch(
				'https://www.mustangproject.org/deploy/Mustang-CLI-2.17.0.jar',
				{
					method: 'GET',
				},
			);

			if (!response.ok) {
				throw new Error(
					`Failed to download file: ${response.status} ${response.statusText}`,
				);
			}

			const arrayBuffer = await response.arrayBuffer();
			const uint8 = new Uint8Array(arrayBuffer);

			await writeFile(MUSTANG_JAR_PATH, uint8);
			console.log(`File downloaded to ${MUSTANG_JAR_PATH}`);
		})(),
	]);

	// eslint-disable-next-line no-console
	console.log(`...took ${Date.now() - start}ms\n\n`);

	project.provide('globalSetup', {
		MUSTANG_JAR_PATH,
	});

	return async () => {
		// no-op
	};
}

declare module 'vitest' {
	export interface ProvidedContext {
		globalSetup: {
			MUSTANG_JAR_PATH: string;
		};
	}
}
