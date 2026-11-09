import type { OutputDataset } from "@node-zugferd/core/data-types";
import { describe, expect, it } from "vitest";
import { maxLength } from "../actions/max-length";
import type { StringIssue } from "../schemas";
import { text } from "../schemas";
import { addIssue } from "./add-issue";

type Dataset = OutputDataset<unknown, StringIssue>;

describe("addIssue", () => {
	const schema = text();

	it("builds the default message and marks a schema untyped", () => {
		const dataset = { typed: true, value: 1 } as Dataset;

		addIssue(schema, "type", dataset, {});

		expect(dataset.typed).toBe(false);
		expect(dataset.issues?.[0]).toMatchObject({
			kind: "schema",
			type: "string",
			input: 1,
			expected: "string",
			received: "1",
			message: "Invalid type: Expected string but received 1",
			requirement: undefined,
			path: undefined,
		});
	});

	it("keeps a validation typed and accepts a message override", () => {
		const dataset = { typed: true, value: "abcd" } as Dataset;

		addIssue(
			maxLength(3, "custom"),
			"length",
			dataset,
			{},
			{
				expected: "<3",
				received: "4",
			},
		);

		expect(dataset.typed).toBe(true);
		expect(dataset.issues?.[0]).toMatchObject({
			expected: "<3",
			received: "4",
			message: "custom",
		});
	});

	it("uses a config message and a message function", () => {
		const dataset = { typed: true, value: 1 } as Dataset;

		addIssue(schema, "type", dataset, {
			message: (issue) => `from-config:${issue.received}`,
		});

		expect(dataset.issues?.[0]?.message).toBe("from-config:1");
	});
});
