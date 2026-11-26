import { readdirSync, readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { loadFixturesFromDir, validateFixtures } from "@copilotkit/aimock";
import { useAimock } from "@copilotkit/aimock/vitest";
import { zugferd } from "node-zugferd";
import { describe, expect, it } from "vitest";
import { ocr } from "../src";
import { aiSdk } from "../src/adapter/ai-sdk";

type FixtureFile = {
	fixtures: Array<{
		match?: {
			userMessage?: string;
			model?: string;
			context?: string;
		};
		response?: {
			content?: string;
			error?: unknown;
		};
	}>;
};

type ManifestCase = {
	fixture: string;
	model: string;
	imageScale?: number;
	think?: boolean;
	maxOutputTokens?: number | null;
	defaultPrompt?: string;
	expect?: unknown;
};

type Manifest = {
	name: string;
	fixturesDir: string;
	pdf: string;
	cases: ManifestCase[];
};

const here = path.dirname(fileURLToPath(import.meta.url));
const manifestsDir = path.resolve(here, "manifests");
const fixturesRoot = path.resolve(here, "fixtures");
const fixtureContext = "Invoice OCR Fixtures";
const passPromptSeparator =
	"Leave fields outside this list null or absent.\n\n";

const manifests = readdirSync(manifestsDir)
	.filter((file) => file.endsWith(".json"))
	.map(
		(file) =>
			JSON.parse(
				readFileSync(path.join(manifestsDir, file), "utf8"),
			) as Manifest,
	);

const getAimock = useAimock({ fixtures: fixturesRoot });

async function readFixtureFile(filePath: string): Promise<FixtureFile> {
	return JSON.parse(await readFile(filePath, "utf8")) as FixtureFile;
}

async function resolveDefaultPrompt(
	filePath: string,
	override: string | undefined,
): Promise<string> {
	if (override !== undefined) return override;

	const userMessage = (await readFixtureFile(filePath)).fixtures[0]?.match
		?.userMessage;
	const separatorIndex = userMessage?.indexOf(passPromptSeparator) ?? -1;

	if (separatorIndex === -1) {
		throw new Error(`Cannot derive the recorded prompt from ${filePath}`);
	}

	return userMessage!.slice(separatorIndex + passPromptSeparator.length);
}

function expectNoEmptyValues(value: unknown, label = "result"): void {
	if (value instanceof Date) return;

	if (Array.isArray(value)) {
		expect(value.length, `${label} should not be empty`).toBeGreaterThan(0);

		for (const [index, item] of value.entries()) {
			expectNoEmptyValues(item, `${label}[${index}]`);
		}

		return;
	}

	if (typeof value === "object" && value !== null) {
		const entries = Object.entries(value);
		expect(entries.length, `${label} should not be empty`).toBeGreaterThan(0);

		for (const [key, item] of entries) {
			expectNoEmptyValues(item, `${label}.${key}`);
		}

		return;
	}

	expect(
		value === null || value === undefined || value === "",
		`${label} should have a value`,
	).toBe(false);
}

describe("OCR fixtures", () => {
	it("discovers fixture recordings", () => {
		expect(manifests.length).toBeGreaterThan(0);
	});

	it.each(manifests)("$name fixture files are valid", (manifest) => {
		const errors = validateFixtures(
			loadFixturesFromDir(path.resolve(manifestsDir, manifest.fixturesDir)),
		).filter((result) => result.severity === "error");

		expect(errors.map((error) => error.message)).toEqual([]);
	});

	it.each(manifests)("$name responses are complete JSON", (manifest) => {
		const fixtureDir = path.resolve(manifestsDir, manifest.fixturesDir);
		const files = readdirSync(fixtureDir).filter((file) =>
			file.endsWith(".json"),
		);

		for (const file of files) {
			const recording = JSON.parse(
				readFileSync(path.join(fixtureDir, file), "utf8"),
			) as FixtureFile;
			const requests = new Set<string>();

			recording.fixtures.forEach((fixture, index) => {
				const label = `${file} fixture ${index + 1}`;
				const content = fixture.response?.content;
				const key = JSON.stringify([
					fixture.match?.context,
					fixture.match?.model,
					fixture.match?.userMessage,
				]);

				expect(fixture.response?.error, `${label} should not be an error`).toBe(
					undefined,
				);
				expect(
					typeof content === "string" && content.trim() !== "",
					`${label} should have response content`,
				).toBe(true);
				expect(
					() => JSON.parse(content ?? ""),
					`${label} should contain complete JSON`,
				).not.toThrow();
				expect(
					requests.has(key),
					`${label} should not duplicate a recorded request`,
				).toBe(false);

				requests.add(key);
			});
		}
	});

	describe.each(manifests)("$name fixtures", (manifest) => {
		it.each(manifest.cases)("replays $model", async (testCase) => {
			const fixtureDir = path.resolve(manifestsDir, manifest.fixturesDir);
			const fixturePath = path.join(fixtureDir, testCase.fixture);
			const pdfPath = path.resolve(manifestsDir, manifest.pdf);
			const fixture = await readFixtureFile(fixturePath);

			for (const [index, entry] of fixture.fixtures.entries()) {
				expect(
					entry.match?.context,
					`${testCase.fixture} fixture ${index + 1} should be context-scoped`,
				).toBe(fixtureContext);
			}

			const defaultPrompt = await resolveDefaultPrompt(
				fixturePath,
				testCase.defaultPrompt,
			);
			const { url, llm } = getAimock();

			llm.clearRequests();

			const provider = createOpenAICompatible({
				name: "openai-compatible",
				baseURL: url,
				headers: {
					"X-Test-Id": manifest.name,
					"X-AIMock-Context": fixtureContext,
				},
				supportsStructuredOutputs: true,
			});

			const pdf = await readFile(pdfPath);
			const result = await zugferd({
				profiles: [],
				plugins: [
					ocr({
						adapter: aiSdk({
							model: provider(testCase.model),
							reasoning: testCase.think ? undefined : "none",
							maxOutputTokens: testCase.maxOutputTokens ?? undefined,
						}),
						imageScale: testCase.imageScale ?? 1.5,
						defaultPrompt,
					}),
				],
			}).ocr.extract(pdf);

			expect(llm.getRequests()).toHaveLength(fixture.fixtures.length);
			expectNoEmptyValues(result);

			if (testCase.expect !== undefined) {
				expect(result).toMatchObject(
					testCase.expect as Record<string, unknown>,
				);
			}
		});
	});
});
