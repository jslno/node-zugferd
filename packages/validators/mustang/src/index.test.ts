import { EventEmitter } from "node:events";
import { readFileSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type { ZugferdContext } from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mustang } from ".";

const spawnMock = vi.hoisted(() => vi.fn());
const platformMock = vi.hoisted(() => vi.fn(() => "linux"));

vi.mock("node:child_process", () => ({
	spawn: spawnMock,
}));

vi.mock("node:os", async (importOriginal) => {
	const os = await importOriginal<typeof import("node:os")>();
	return {
		...os,
		platform: platformMock,
	};
});

const supportedProfiles = [
	"minimum",
	"basic-wl",
	"basic",
	"en-16931",
	"extended",
	"xrechnung",
	"order-x-basic",
	"order-x",
	"order-x-extended",
] as const;

type JavaCall = {
	args: string[];
	source: Uint8Array;
};

const calls: JavaCall[] = [];

const report = ({
	status,
	section = "xml",
	messages = "",
	extra = "",
}: {
	status: "valid" | "invalid";
	section?: "xml" | "pdf";
	messages?: string;
	extra?: string;
}) =>
	`<validation><${section}>${
		messages ? `<messages>${messages}</messages>` : ""
	}<summary status="${status}"/></${section}>${extra}<summary status="${status}"/></validation>`;

const context = () => {
	const warnings: string[] = [];
	const afterXMLBuild = vi.fn();
	return {
		warnings,
		afterXMLBuild,
		ctx: {
			logger: {
				warn: (message: string) => {
					warnings.push(message);
				},
			},
			options: {
				hooks: {
					afterXMLBuild,
				},
			},
		} as unknown as ZugferdContext,
	};
};

const fakeJava = (stdout: string, stderr = "") => {
	spawnMock.mockImplementation((_command: string, args: string[]) => {
		const sourceIndex = args.indexOf("--source");
		const sourcePath = args[sourceIndex + 1];
		if (!sourcePath) {
			throw new Error("Mustang was started without a source file");
		}
		calls.push({ args, source: readFileSync(sourcePath) });

		const proc = new EventEmitter() as EventEmitter & {
			stdout: EventEmitter;
			stderr: EventEmitter;
		};
		proc.stdout = new EventEmitter();
		proc.stderr = new EventEmitter();
		queueMicrotask(() => {
			if (stdout) proc.stdout.emit("data", Buffer.from(stdout));
			if (stderr) proc.stderr.emit("data", Buffer.from(stderr));
			proc.emit("close", 0);
		});
		return proc;
	});
};

describe("mustang", () => {
	let directory: string;

	beforeEach(async () => {
		directory = await mkdtemp(join(tmpdir(), "mustang-test-"));
		platformMock.mockReturnValue("linux");
		calls.length = 0;
		fakeJava(report({ status: "valid" }));
	});

	afterEach(async () => {
		await rm(directory, { recursive: true, force: true });
	});

	it("exposes the plugin id, version, and resolved options", () => {
		const plugin = mustang();

		expect(plugin.id).toBe("mustang");
		expect(plugin.version).toBe(NODE_ZUGFERD_VERSION);
		expect(plugin.options).toMatchObject({
			tempDir: tmpdir(),
			maximumHeapSize: 1024,
			autoRun: true,
			language: "en",
		});
		expect(mustang({ language: "de", autoRun: false }).options).toMatchObject({
			language: "de",
			autoRun: false,
		});
		expect(mustang.setup).toEqual(expect.any(Function));
	});

	it("validates every supported profile and skips the rest", async () => {
		const { ctx, warnings } = context();
		const validate = mustang({ tempDir: directory }).actions(ctx).mustang
			.validate;

		for (const profile of supportedProfiles) {
			await expect(validate(profile, "<invoice/>")).resolves.toBeUndefined();
		}
		await expect(
			validate({ id: "en-16931" }, "<invoice/>"),
		).resolves.toBeUndefined();
		await expect(validate("unknown", "<invoice/>")).resolves.toBeUndefined();

		expect(calls).toHaveLength(supportedProfiles.length + 1);
		expect(warnings).toEqual([
			'The Mustang validator does not support the profile "unknown". Skipping validation.',
		]);
	});

	it("writes XML and PDF inputs to the matching temporary file", async () => {
		const { ctx } = context();
		const validate = mustang({ tempDir: directory }).actions(ctx).mustang
			.validate;
		const xml = '<?xml version="1.0"?><invoice>\u20ac</invoice>';
		const pdf = Uint8Array.from([
			0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37, 0x00, 0xff,
		]);
		const pdfBuffer = new ArrayBuffer(pdf.byteLength);
		new Uint8Array(pdfBuffer).set(pdf);

		await validate("minimum", xml);
		await validate("minimum", new TextEncoder().encode("<invoice/>"));
		await validate("minimum", pdf);
		await validate("minimum", pdfBuffer);
		await validate("minimum", "%PDF-1.7\u00ff");

		const sources = calls.map((call) => {
			const file = call.args[call.args.indexOf("--source") + 1] ?? "";
			return {
				name: file.slice(file.lastIndexOf("input")),
				bytes: call.source,
			};
		});

		expect(sources.map((source) => source.name)).toEqual([
			"input.xml",
			"input.xml",
			"input.pdf",
			"input.pdf",
			"input.pdf",
		]);
		expect(sources[0]?.bytes).toEqual(Buffer.from(xml, "utf-8"));
		expect(sources[1]?.bytes).toEqual(Buffer.from("<invoice/>", "utf-8"));
		expect(sources[2]?.bytes).toEqual(Buffer.from(pdf));
		expect(sources[3]?.bytes).toEqual(Buffer.from(pdf));
		expect(sources[4]?.bytes).toEqual(Buffer.from("%PDF-1.7\u00ff", "latin1"));
		for (const call of calls) {
			const file = call.args[call.args.indexOf("--source") + 1] ?? "";
			expect(file.startsWith(directory)).toBe(true);
			expect(file.replaceAll("\\", "/")).toContain("/node-zugferd_mustang-");
		}
	});

	it("builds the Java command from the validator options and the host platform", async () => {
		const { ctx } = context();

		await mustang({
			tempDir: directory,
			language: "fr",
			initialHeapSize: 64,
			maximumHeapSize: 512,
		})
			.actions(ctx)
			.mustang.validate("basic", "<invoice/>");

		platformMock.mockReturnValue("win32");
		await mustang({ tempDir: directory, maximumHeapSize: "inherit" })
			.actions(ctx)
			.mustang.validate("basic", "<invoice/>");

		const [unix, windows] = calls.map((call) => call.args);
		expect(unix).toEqual(
			expect.arrayContaining([
				"-Xms64m",
				"-Xmx512m",
				"-Dfile.encoding=UTF-8",
				"-Duser.language=fr",
				"-Dsun.stdout.encoding=UTF-8",
				"-Dsun.stderr.encoding=UTF-8",
				"-jar",
				"--no-notices",
				"--action",
				"validate",
				"--source",
				"2>",
				"/dev/null",
			]),
		);
		expect(unix?.some((arg) => arg.endsWith("Mustang-CLI.jar"))).toBe(true);
		expect(windows).toEqual(expect.arrayContaining(["2>", "NUL"]));
		expect(windows).not.toContain("-Xms64m");
		expect(windows).not.toContain("-Xmx512m");
		expect(windows).not.toContain("-Xmx1024m");
	});

	it("warns about the default temporary directory on macOS", async () => {
		platformMock.mockReturnValue("darwin");
		const implicit = context();
		const explicit = context();

		await mustang()
			.actions(implicit.ctx)
			.mustang.validate("minimum", "<invoice/>");
		await mustang({ tempDir: directory })
			.actions(explicit.ctx)
			.mustang.validate("minimum", "<invoice/>");

		expect(implicit.warnings).toEqual([
			"Using the default temporary directory on macOS can potentially lead to issues, as it returns a symlink instead of an absolute path. Consider specifying a custom temporary directory in the validator config.",
		]);
		expect(explicit.warnings).toEqual([]);
	});

	it("resolves when Mustang reports a valid document", async () => {
		fakeJava(
			report({
				status: "valid",
				messages: "<warning>Check the payment terms</warning>",
			}),
		);
		const { ctx, warnings } = context();

		await expect(
			mustang({ tempDir: directory })
				.actions(ctx)
				.mustang.validate("en-16931", "<invoice/>"),
		).resolves.toBeUndefined();
		expect(warnings).toEqual(["Check the payment terms"]);
	});

	it("throws Mustang errors and exceptions and logs warnings", async () => {
		fakeJava(
			report({
				status: "invalid",
				messages:
					'<error type="26">Seller name is missing</error><error>Invoice number is missing</error><exception>Schema lookup failed</exception><warning>VAT rate looks unusual</warning><warning>Due date is far away</warning>',
			}),
		);
		const { ctx, warnings } = context();

		await expect(
			mustang({ tempDir: directory })
				.actions(ctx)
				.mustang.validate("extended", "<invoice/>"),
		).rejects.toThrow(
			new ZugferdError(
				"Seller name is missing\n\nInvoice number is missing\n\nSchema lookup failed",
			),
		);
		expect(warnings).toEqual([
			"VAT rate looks unusual\n\nDue date is far away",
		]);
	});

	it("reads the PDF section when Mustang returns one", async () => {
		fakeJava(
			report({
				status: "invalid",
				section: "pdf",
				messages: "<error>Not PDF/A-3</error>",
				extra:
					'<xml><messages><error>Ignored XML error</error></messages><summary status="invalid"/></xml>',
			}),
		);
		const { ctx } = context();

		await expect(
			mustang({ tempDir: directory })
				.actions(ctx)
				.mustang.validate(
					"xrechnung",
					Uint8Array.from([0x25, 0x50, 0x44, 0x46]),
				),
		).rejects.toThrow(new ZugferdError("Not PDF/A-3"));
	});

	it("uses stdout when it contains the validation report and stderr otherwise", async () => {
		const { ctx } = context();
		const validate = mustang({ tempDir: directory }).actions(ctx).mustang
			.validate;

		fakeJava(
			report({ status: "invalid", messages: "<error>From stdout</error>" }),
			report({ status: "invalid", messages: "<error>From stderr</error>" }),
		);
		await expect(validate("minimum", "<invoice/>")).rejects.toThrow(
			new ZugferdError("From stdout"),
		);

		fakeJava(
			"Picked up JAVA_TOOL_OPTIONS",
			report({ status: "invalid", messages: "<error>From stderr</error>" }),
		);
		await expect(validate("minimum", "<invoice/>")).rejects.toThrow(
			new ZugferdError("From stderr"),
		);
	});

	it("rejects output that is not a Mustang validation report", async () => {
		fakeJava("<nope/>");
		const { ctx } = context();

		await expect(
			mustang({ tempDir: directory })
				.actions(ctx)
				.mustang.validate("minimum", "<invoice/>"),
		).rejects.toThrow(
			new ZugferdError("Failed to parse Mustang validation output."),
		);
	});

	it("throws a generic failure when an invalid report has no messages", async () => {
		fakeJava(report({ status: "invalid" }));
		const { ctx } = context();

		await expect(
			mustang({ tempDir: directory })
				.actions(ctx)
				.mustang.validate("order-x", "<invoice/>"),
		).rejects.toThrow(new ZugferdError("Validation failed"));
	});

	it("validates built XML when autoRun is enabled and leaves it to the caller otherwise", async () => {
		const manual = context();
		expect(mustang({ autoRun: false }).init(manual.ctx)).toBeUndefined();

		fakeJava(
			report({ status: "invalid", messages: "<error>Broken invoice</error>" }),
		);
		const failing = context();
		const failingHooks = mustang({ tempDir: directory }).init(failing.ctx)
			?.options.hooks;
		await expect(
			failingHooks?.afterXMLBuild?.({
				profile: { id: "basic-wl" },
				xml: "<invoice/>",
				context: failing.ctx,
			} as never),
		).rejects.toThrow(new ZugferdError("Broken invoice"));
		expect(failing.afterXMLBuild).not.toHaveBeenCalled();

		fakeJava(report({ status: "valid" }));
		const passing = context();
		const passingHooks = mustang({ tempDir: directory }).init(passing.ctx)
			?.options.hooks;
		await passingHooks?.afterXMLBuild?.({
			profile: { id: "order-x-extended" },
			xml: "<invoice/>",
			context: passing.ctx,
		} as never);
		expect(passing.afterXMLBuild).toHaveBeenCalledOnce();

		const skipped = context();
		const skippedHooks = mustang({ tempDir: directory }).init(skipped.ctx)
			?.options.hooks;
		calls.length = 0;
		await skippedHooks?.afterXMLBuild?.({
			profile: { id: "unknown" },
			xml: "<invoice/>",
			context: skipped.ctx,
		} as never);
		expect(calls).toHaveLength(0);
		expect(skipped.warnings).toEqual([]);
		expect(skipped.afterXMLBuild).toHaveBeenCalledOnce();
	});
});
