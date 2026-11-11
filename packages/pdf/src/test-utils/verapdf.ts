import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

/**
 * Resolves a veraPDF CLI binary, either from the `VERAPDF` environment
 * variable or from the PATH. Returns `undefined` when unavailable so
 * conformance tests can be skipped instead of failing — mirroring how the
 * core treats its optional XSD validator.
 */
export const findVeraPdf = async (): Promise<string | undefined> => {
	const candidate = process.env.VERAPDF;
	if (candidate) {
		try {
			await fs.access(candidate);
			return candidate;
		} catch {
			return undefined;
		}
	}

	return await new Promise((resolve) => {
		execFile("which", ["verapdf"], (error, stdout) => {
			resolve(error ? undefined : stdout.trim() || undefined);
		});
	});
};

export const validatePdfA3b = async (
	verapdf: string,
	pdf: Uint8Array,
): Promise<{ passed: boolean; output: string }> => {
	const file = path.join(
		await fs.mkdtemp(path.join(os.tmpdir(), "node-zugferd-pdf-")),
		"document.pdf",
	);
	await fs.writeFile(file, pdf);

	try {
		return await new Promise((resolve, reject) => {
			execFile(
				verapdf,
				["-f", "3b", "--format", "text", file],
				{ timeout: 120_000 },
				(error, stdout, stderr) => {
					const output = `${stdout}\n${stderr}`;
					// veraPDF exits non-zero for failed validations, only treat
					// missing PASS/FAIL output as an execution error
					if (/^(PASS|FAIL)/m.test(stdout)) {
						resolve({ passed: /^PASS/m.test(stdout), output });
					} else {
						reject(error ?? new Error(output));
					}
				},
			);
		});
	} finally {
		await fs.rm(path.dirname(file), { recursive: true, force: true });
	}
};
