#!/usr/bin/env tsx

import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { LLMock } from "@copilotkit/aimock";
import { zugferd } from "node-zugferd";
import { ocr } from "../../src";
import { aiSdk } from "../../src/adapter/ai-sdk";
import { DEFAULT_PROMPT } from "../../src/prompts";

const DEFAULT_BASE_URL = "http://127.0.0.1:1234/v1";
const DEFAULT_MODELS = ["zai-org/glm-4.6v-flash"];
const FIXTURE_CONTEXT = "Invoice OCR Fixtures";

const FIXTURES_DIR = "../../test/fixtures";
const MANIFESTS_DIR = "../../test/manifests";
const FIXTURES = ["simple.pdf", "credit-note.pdf"];

type RecordingCase = {
	fixture: string;
	model: string;
	imageScale: number;
	think: boolean;
	maxOutputTokens: number | null;
	defaultPrompt: string;
	expect?: unknown;
};

type ExistingManifest = {
	cases?: Array<{ fixture?: string; expect?: unknown }>;
};

type RecordedFixture = {
	match?: {
		userMessage?: string;
		model?: string;
		context?: string;
	};
	response?: {
		content?: string;
		error?: unknown;
	};
};

type RecordedFixtureFile = {
	fixtures: RecordedFixture[];
};

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const baseDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

const toPosix = (value: string) => value.split(path.sep).join("/");

const fixtureFileName = (model: string) =>
	`${model.replace(/[<>:"/\\|?*\x00-\x1F]/g, "__")}.json`;

function isCompleteFixture(fixture: RecordedFixture): boolean {
	const content = fixture.response?.content;

	if (fixture.response?.error !== undefined) return false;
	if (typeof content !== "string" || content.trim() === "") return false;

	try {
		JSON.parse(content);
		return true;
	} catch {
		return false;
	}
}

async function keepCompleteFixtures(filePath: string): Promise<number> {
	const recording = JSON.parse(
		await readFile(filePath, "utf8"),
	) as RecordedFixtureFile;
	const complete = new Map<string, RecordedFixture>();

	for (const fixture of recording.fixtures) {
		if (!isCompleteFixture(fixture)) continue;

		const key = JSON.stringify([
			fixture.match?.context,
			fixture.match?.model,
			fixture.match?.userMessage,
		]);
		complete.set(key, fixture);
	}

	const fixtures = [...complete.values()];
	await writeFile(
		filePath,
		`${JSON.stringify({ ...recording, fixtures }, null, 2)}\n`,
	);

	return fixtures.length;
}

async function main() {
	const { values: args } = parseArgs({
		args: process.argv.slice(2),
		options: {
			baseUrl: { type: "string", default: DEFAULT_BASE_URL },
			model: { type: "string", multiple: true, default: DEFAULT_MODELS },
			imageScale: { type: "string", default: "1.5" },
			maxOutputTokens: { type: "string", default: "2048" },
			think: { type: "boolean", default: false },
		},
	});

	const mock = new LLMock();

	await mock.start();

	try {
		mock.enableRecording({
			providers: {
				openai: args.baseUrl,
			},
			fixturePath: path.resolve(baseDir, FIXTURES_DIR),
			upstreamTimeoutMs: 600_000,
			bodyTimeoutMs: 600_000,
		});

		for (const fixture of FIXTURES) {
			const baseName = path.basename(fixture, path.extname(fixture));
			console.info(`Generating fixture for ${baseName}`);

			const provider = createOpenAICompatible({
				name: "openai-compatible",
				baseURL: mock.url,
				headers: {
					"X-Test-Id": baseName,
					"X-AIMock-Context": FIXTURE_CONTEXT,
				},
				supportsStructuredOutputs: true,
			});
			const sourcePath = path.resolve(baseDir, fixture);
			const fixturesDir = path.resolve(baseDir, FIXTURES_DIR, baseName);
			const manifestsDir = path.resolve(baseDir, MANIFESTS_DIR);
			const manifestPath = path.join(manifestsDir, `${baseName}.json`);
			const source = await readFile(sourcePath);
			const defaultPrompt = args.think
				? DEFAULT_PROMPT
				: `/no_think\n${DEFAULT_PROMPT}`;

			let existingManifest: ExistingManifest = {};
			try {
				existingManifest = JSON.parse(
					await readFile(manifestPath, "utf8"),
				) as ExistingManifest;
			} catch {
				existingManifest = {};
			}

			const cases: RecordingCase[] = [];

			for (const model of args.model) {
				const invoicer = zugferd({
					profiles: [],
					plugins: [
						ocr({
							adapter: aiSdk({
								model: provider(model),
								reasoning: args.think ? undefined : "none",
								maxOutputTokens: Number(args.maxOutputTokens),
							}),
							imageScale: Number(args.imageScale),
							defaultPrompt,
						}),
					],
				});

				const start = performance.now();
				await invoicer.ocr.extract(source);
				const end = performance.now();

				console.info(
					`Generated fixture for ${baseName} with model ${model} in ${end - start}ms`,
				);

				const fileName = fixtureFileName(model);
				const previous = existingManifest.cases?.find(
					(entry) => entry.fixture === fileName,
				);

				const recordedPath = path.join(fixturesDir, fileName);
				await rename(path.join(fixturesDir, "openai.json"), recordedPath);
				const completeCount = await keepCompleteFixtures(recordedPath);

				console.info(`Kept ${completeCount} complete fixtures in ${fileName}`);

				cases.push({
					fixture: fileName,
					model,
					imageScale: Number(args.imageScale),
					think: args.think,
					maxOutputTokens: args.think ? null : Number(args.maxOutputTokens),
					defaultPrompt,
					...(previous?.expect === undefined
						? {}
						: { expect: previous.expect }),
				});
			}

			await mkdir(manifestsDir, { recursive: true });
			await writeFile(
				manifestPath,
				`${JSON.stringify(
					{
						name: baseName,
						fixturesDir: toPosix(path.relative(manifestsDir, fixturesDir)),
						pdf: toPosix(path.relative(manifestsDir, sourcePath)),
						cases,
					},
					null,
					2,
				)}\n`,
			);
		}

		console.log("Finished generating fixtures");

		mock.disableRecording();
	} finally {
		await mock.stop();
	}
}

void main().catch((error) => {
	console.error(error);
	process.exit(1);
});
