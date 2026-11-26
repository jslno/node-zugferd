import {
	amount,
	array,
	metadata,
	nullish,
	object,
	pipe,
	text,
} from "@node-zugferd/data-types";
import { describe, expect, it } from "vitest";
import { projectSchema } from "../src/schema";
import { jsonSchema, properties, validate } from "./utils";

const schema = object({
	header: object({
		invoiceNumber: pipe(
			nullish(text()),
			metadata({ description: "Invoice number" }),
		),
		issueDate: nullish(text()),
	}),
	totals: object({
		grandTotal: nullish(amount()),
	}),
});

describe("projectSchema", () => {
	it("keeps only requested paths and preserves field semantics", () => {
		const projected = projectSchema(schema, ["header.invoiceNumber"]);
		const modelSchema = jsonSchema(projected);
		const root = properties(modelSchema);
		const header = properties(root.header!);

		expect(root).toEqual({ header: expect.any(Object) });
		expect(header.invoiceNumber).toMatchObject({
			description: "Invoice number",
			anyOf: [{ type: "string" }, { type: "null" }],
		});
		expect(header).not.toHaveProperty("issueDate");
		expect(root).not.toHaveProperty("totals");

		const accepted = validate(projected, {
			header: { invoiceNumber: "INV-1", issueDate: "2026-01-01" },
			totals: { grandTotal: 10 },
		});

		expect(accepted).toMatchObject({
			value: { header: { invoiceNumber: "INV-1" } },
		});
		expect(accepted).not.toMatchObject({
			value: { totals: expect.anything() },
		});
		expect(accepted).not.toMatchObject({
			value: { header: { issueDate: expect.anything() } },
		});

		const rejected = validate(projected, { header: { invoiceNumber: 42 } });
		expect(rejected).toMatchObject({
			issues: expect.arrayContaining([expect.anything()]),
		});
	});

	it("keeps a whole subtree when a path points at an object", () => {
		const root = properties(jsonSchema(projectSchema(schema, ["header"])));

		expect(Object.keys(root)).toEqual(["header"]);
		expect(Object.keys(properties(root.header!)).sort()).toEqual([
			"invoiceNumber",
			"issueDate",
		]);
	});

	it("merges sibling paths and lets a broader path win", () => {
		const root = properties(
			jsonSchema(
				projectSchema(schema, [
					"header.issueDate",
					"totals.grandTotal",
					"header.invoiceNumber",
				]),
			),
		);

		expect(Object.keys(root).sort()).toEqual(["header", "totals"]);
		expect(Object.keys(properties(root.header!)).sort()).toEqual([
			"invoiceNumber",
			"issueDate",
		]);
		expect(Object.keys(properties(root.totals!))).toEqual(["grandTotal"]);

		const broad = properties(
			jsonSchema(projectSchema(schema, ["header", "header.invoiceNumber"])),
		);

		expect(Object.keys(properties(broad.header!)).sort()).toEqual([
			"invoiceNumber",
			"issueDate",
		]);
	});

	it("projects nested fields inside array items through wrappers", () => {
		const lineSchema = object({
			transaction: object({
				line: array(
					object({
						position: object({
							lineId: pipe(
								nullish(text()),
								metadata({ description: "Line identifier" }),
							),
							includedNote: nullish(text()),
						}),
						item: object({
							name: nullish(text()),
							sellerAssignedId: nullish(text()),
						}),
						price: nullish(amount()),
					}),
				),
			}),
		});

		const projected = projectSchema(lineSchema, [
			"transaction.line.position.lineId",
			"transaction.line.item.name",
		]);
		const transaction = properties(jsonSchema(projected));
		const line = properties(transaction.transaction!).line!;
		const item = properties(line.items!);

		expect(Object.keys(item).sort()).toEqual(["item", "position"]);
		expect(properties(item.position!).lineId).toMatchObject({
			description: "Line identifier",
			anyOf: [{ type: "string" }, { type: "null" }],
		});
		expect(properties(item.item!).name).toMatchObject({
			anyOf: [{ type: "string" }, { type: "null" }],
		});

		const accepted = validate(projected, {
			transaction: {
				line: [
					{
						position: { lineId: "1", includedNote: "skip" },
						item: { name: "Widget", sellerAssignedId: "SKU-1" },
						price: 5,
					},
				],
			},
		});

		expect(accepted).toMatchObject({
			value: {
				transaction: {
					line: [{ position: { lineId: "1" }, item: { name: "Widget" } }],
				},
			},
		});
	});

	it("does not invent fields for unknown paths", () => {
		const projected = projectSchema(schema, ["totals.missing"]);
		const root = properties(jsonSchema(projected));

		expect(properties(root.totals!)).toEqual({});
		expect(validate(projected, { totals: { grandTotal: 10 } })).toMatchObject({
			value: { totals: {} },
		});

		expect(properties(jsonSchema(projectSchema(schema, [])))).toEqual({});
	});

	it("leaves a leaf schema intact when a path continues past it", () => {
		const header = properties(
			jsonSchema(projectSchema(schema, ["header.invoiceNumber.extra"])),
		);
		const invoiceNumber = properties(header.header!).invoiceNumber;

		expect(invoiceNumber).toMatchObject({
			anyOf: [{ type: "string" }, { type: "null" }],
		});
		expect(invoiceNumber).not.toHaveProperty("properties");
	});
});
