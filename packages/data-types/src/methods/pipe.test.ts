import { describe, expect, it, vi } from "vitest";
import { maxLength, metadata, minLength } from "../actions";
import { text } from "../schemas";
import { getMetadata } from "./get-metadata";
import { parse, parseAsync } from "./parse";
import { pipe, pipeAsync } from "./pipe";
import { safeParse } from "./safe-parse";

describe("pipe", () => {
	it("runs validations and skips metadata", () => {
		const schema = pipe(text(), metadata({ label: "ID" }), maxLength(4));

		expect(schema.pipe).toHaveLength(3);
		expect(schema.async).toBe(false);
		expect(parse(schema, "4711")).toBe("4711");
		expect(getMetadata(schema)).toEqual({ label: "ID" });
	});

	it("stops at the first schema failure", () => {
		const later = vi.fn((dataset: { value: unknown }) => dataset);
		const schema = pipe(text(), {
			kind: "transformation",
			type: "later",
			reference: later,
			async: false,
			"~run": later,
		} as never);

		expect(safeParse(schema, 1)).toMatchObject({
			typed: false,
			issues: [{ type: "string" }],
		});
		expect(later).not.toHaveBeenCalled();
	});

	it("keeps later validations unless the pipe aborts early", () => {
		const schema = pipe(text(), minLength(5), maxLength(1));

		expect(safeParse(schema, "ab").issues).toHaveLength(2);
		expect(
			safeParse(schema, "ab", { abortPipeEarly: true }).issues,
		).toHaveLength(1);
	});

	it("marks the dataset untyped when a transformation follows an issue", () => {
		const schema = pipe(text(), minLength(5), {
			kind: "transformation",
			type: "upper",
			reference: () => undefined,
			async: false,
			"~run"(dataset: { value: string }) {
				dataset.value = dataset.value.toUpperCase();
				return dataset;
			},
		} as never);

		expect(safeParse(schema, "ab")).toMatchObject({
			typed: false,
			output: "ab",
		});
	});
});

describe("pipeAsync", () => {
	it("runs async pipe items", async () => {
		const schema = pipeAsync(text(), {
			kind: "transformation",
			type: "upper",
			reference: () => undefined,
			async: true,
			async "~run"(dataset: { value: string }) {
				dataset.value = dataset.value.toUpperCase();
				return dataset;
			},
		} as never);

		expect(schema.async).toBe(true);
		await expect(parseAsync(schema, "abc")).resolves.toBe("ABC");
	});
});
