import type { ZugferdContext } from "@node-zugferd/core";
import { NODE_ZUGFERD_VERSION } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ValidationResult } from "xrechnung-validator";
import { kosit } from ".";

const validateMock = vi.hoisted(() => vi.fn());

vi.mock("xrechnung-validator", () => ({
	validate: validateMock,
}));

const result = (
	overrides: Partial<ValidationResult> = {},
): ValidationResult => ({
	valid: true,
	wellFormed: true,
	syntax: "CII",
	scenario: "EN16931 XRechnung (CII)",
	schemaErrors: [],
	messages: [],
	errors: [],
	warnings: [],
	rules: { configuration: "v2026-08-31", xrechnung: "3.0.2" },
	...overrides,
});

const rule = (code: string, level: "error" | "warning", text: string) => ({
	code,
	level,
	originalLevel: level,
	text,
});

const context = () => {
	const afterXMLBuild = vi.fn();
	return {
		afterXMLBuild,
		ctx: {
			logger: { warn: vi.fn() },
			options: { hooks: { afterXMLBuild } },
		} as unknown as ZugferdContext,
	};
};

const validate = (
	plugin: ReturnType<typeof kosit>,
	ctx: ZugferdContext,
	profile: string,
	input: string | Uint8Array | ArrayBuffer,
) => plugin.actions(ctx).kosit.validate(profile as never, input);

describe("kosit validator plugin", () => {
	beforeEach(() => {
		validateMock.mockResolvedValue(result());
	});

	it("exposes the plugin metadata and default options", () => {
		const plugin = kosit();
		expect(plugin.id).toBe("kosit");
		expect(plugin.version).toBe(NODE_ZUGFERD_VERSION);
		expect(plugin.options).toEqual({ autoRun: true, failOnWarnings: false });
	});

	it.each(["en-16931", "xrechnung"])(
		"resolves for a valid %s document",
		async (profile) => {
			const { ctx } = context();
			await expect(
				validate(kosit(), ctx, profile, "<xml/>"),
			).resolves.toBeUndefined();
			expect(validateMock).toHaveBeenCalledWith("<xml/>");
		},
	);

	it("accepts the profile as an object", async () => {
		const { ctx } = context();
		await validate(kosit(), ctx, { id: "xrechnung" } as never, "<xml/>");
		expect(validateMock).toHaveBeenCalledOnce();
	});

	it("skips unsupported profiles with a warning", async () => {
		const { ctx } = context();
		await expect(
			validate(kosit(), ctx, "basic", "<xml/>"),
		).resolves.toBeUndefined();
		expect(validateMock).not.toHaveBeenCalled();
		expect(ctx.logger.warn).toHaveBeenCalledWith(
			'The KoSIT validator does not support the profile "basic". Skipping validation.',
		);
	});

	it("passes byte input through and converts ArrayBuffer", async () => {
		const { ctx } = context();
		const bytes = new TextEncoder().encode("<xml/>");
		await validate(kosit(), ctx, "xrechnung", bytes.buffer as ArrayBuffer);
		expect(validateMock).toHaveBeenCalledWith(new Uint8Array(bytes));
	});

	it("rejects PDF input", async () => {
		const { ctx } = context();
		await expect(
			validate(kosit(), ctx, "xrechnung", "%PDF-1.7"),
		).rejects.toThrow(ZugferdError);
		expect(validateMock).not.toHaveBeenCalled();
	});

	it("throws rule errors with their codes", async () => {
		validateMock.mockResolvedValue(
			result({
				valid: false,
				errors: [
					rule(
						"BR-DE-15",
						"error",
						'The element "Buyer reference" (BT-10) must be provided.',
					),
					rule(
						"BR-CO-15",
						"error",
						"Invoice total amount with VAT (BT-112) = ...",
					),
				],
			}),
		);
		const { ctx } = context();
		const error = await validate(kosit(), ctx, "xrechnung", "<xml/>").catch(
			(e: unknown) => e,
		);
		expect(error).toBeInstanceOf(ZugferdError);
		expect((error as Error).message).toBe(
			'[BR-DE-15] The element "Buyer reference" (BT-10) must be provided.\n\n[BR-CO-15] Invoice total amount with VAT (BT-112) = ...',
		);
	});

	it("throws schema errors with line numbers", async () => {
		validateMock.mockResolvedValue(
			result({
				valid: false,
				schemaErrors: [
					{
						message: "Element 'Quatsch': This element is not expected.",
						line: 12,
					},
				],
			}),
		);
		const { ctx } = context();
		await expect(validate(kosit(), ctx, "xrechnung", "<xml/>")).rejects.toThrow(
			"Line 12: Element 'Quatsch': This element is not expected.",
		);
	});

	it("explains when no KoSIT scenario matches", async () => {
		validateMock.mockResolvedValue(result({ valid: false, scenario: null }));
		const { ctx } = context();
		await expect(validate(kosit(), ctx, "en-16931", "<xml/>")).rejects.toThrow(
			"No KoSIT scenario matches the specification identifier (BT-24) of the document.",
		);
	});

	it("explains malformed XML", async () => {
		validateMock.mockResolvedValue(
			result({ valid: false, wellFormed: false, syntax: null, scenario: null }),
		);
		const { ctx } = context();
		await expect(validate(kosit(), ctx, "en-16931", "nope")).rejects.toThrow(
			"The document is not well-formed XML.",
		);
	});

	it("logs warnings without failing by default", async () => {
		validateMock.mockResolvedValue(
			result({
				warnings: [
					rule("BR-CL-23", "warning", "Unit code is not in the code list."),
				],
			}),
		);
		const { ctx } = context();
		await expect(
			validate(kosit(), ctx, "xrechnung", "<xml/>"),
		).resolves.toBeUndefined();
		expect(ctx.logger.warn).toHaveBeenCalledWith(
			"[BR-CL-23] Unit code is not in the code list.",
		);
	});

	it("fails on warnings when failOnWarnings is set", async () => {
		validateMock.mockResolvedValue(
			result({
				warnings: [
					rule("BR-CL-23", "warning", "Unit code is not in the code list."),
				],
			}),
		);
		const { ctx } = context();
		await expect(
			validate(kosit({ failOnWarnings: true }), ctx, "xrechnung", "<xml/>"),
		).rejects.toThrow("[BR-CL-23] Unit code is not in the code list.");
		expect(ctx.logger.warn).not.toHaveBeenCalled();
	});

	it("validates in the afterXMLBuild hook and calls the user hook", async () => {
		const { ctx, afterXMLBuild } = context();
		const init = kosit().init(ctx);
		const payload = {
			profile: { id: "xrechnung" },
			xml: "<xml/>",
			context: ctx,
		};
		await init?.options.hooks.afterXMLBuild(payload as never);
		expect(validateMock).toHaveBeenCalledWith("<xml/>");
		expect(afterXMLBuild).toHaveBeenCalledWith(payload);
	});

	it("does not validate unsupported profiles in the hook", async () => {
		const { ctx, afterXMLBuild } = context();
		const init = kosit().init(ctx);
		await init?.options.hooks.afterXMLBuild({
			profile: { id: "minimum" },
			xml: "<xml/>",
			context: ctx,
		} as never);
		expect(validateMock).not.toHaveBeenCalled();
		expect(afterXMLBuild).toHaveBeenCalledOnce();
	});

	it("registers no hook when autoRun is disabled", () => {
		const { ctx } = context();
		expect(kosit({ autoRun: false }).init(ctx)).toBeUndefined();
	});
});
