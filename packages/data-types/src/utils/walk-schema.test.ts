import { describe, expect, it } from "vitest";
import { metadata } from "../actions";
import { pipe } from "../methods";
import {
	array,
	asArray,
	intersect,
	nullish,
	object,
	quantity,
	text,
} from "../schemas";
import { collectFieldSchemas, walkSchema } from "./walk-schema";

describe("walk-schema", () => {
	it("walks top-level fields", () => {
		const schema = object({
			name: text(),
			age: quantity(),
		});

		const paths: string[] = [];

		walkSchema(schema, ({ path }) => {
			paths.push(path.join("."));
		});

		expect(paths).toEqual(["name", "age"]);
	});

	it("walks nested object fields", () => {
		const schema = object({
			user: object({
				name: text(),
				email: text(),
			}),
		});

		const paths: string[] = [];

		walkSchema(schema, ({ path }) => {
			paths.push(path.join("."));
		});

		expect(paths).toEqual(["user", "user.name", "user.email"]);
	});

	it("walks array item fields using wildcard paths", () => {
		const schema = object({
			users: array(
				object({
					id: text(),
					name: text(),
				}),
			),
		});

		const paths: string[] = [];

		walkSchema(schema, ({ path }) => {
			paths.push(path.join("."));
		});

		expect(paths).toEqual(["users", "users.*.id", "users.*.name"]);
	});

	it("unwraps nullish and pipe schemas", () => {
		const schema = object({
			user: pipe(
				nullish(
					object({
						name: text(),
					}),
				),
			),
		});

		const paths: string[] = [];

		walkSchema(schema, ({ path }) => {
			paths.push(path.join("."));
		});

		expect(paths).toEqual(["user", "user.name"]);
	});

	it("does not emit duplicate paths from intersections", () => {
		const schema = intersect([
			object({
				user: object({
					id: text(),
				}),
			}),
			object({
				user: object({
					name: text(),
				}),
			}),
		]);

		const paths: string[] = [];

		walkSchema(schema, ({ path }) => {
			paths.push(path.join("."));
		});

		expect(paths).toEqual(["user", "user.id", "user.name"]);

		expect(new Set(paths).size).toBe(paths.length);
	});

	it("upgrades object fields to asArray paths when a later intersect option uses asArray", () => {
		const schema = intersect([
			object({
				contact: nullish(
					object({
						personName: pipe(
							text(),
							metadata({
								xpath: "/root/Contact/PersonName",
							}),
						),
						phoneNumber: text(),
					}),
				),
			}),
			object({
				contact: pipe(
					nullish(
						asArray(
							object({
								typeCode: text(),
							}),
						),
					),
					metadata({
						xpath: "/root/Contact",
					}),
				),
			}),
		]);

		const paths: string[] = [];
		walkSchema(schema, ({ path }) => {
			paths.push(path.join("."));
		});

		expect(paths).toEqual([
			"contact",
			"contact.*.personName",
			"contact.*.phoneNumber",
			"contact.*.typeCode",
		]);

		const fields = collectFieldSchemas(schema);
		expect(fields.has("contact.*.personName")).toBe(true);
		expect(fields.has("contact.personName")).toBe(false);
		expect(fields.get("contact")?.schema).toBeTruthy();
	});

	it("passes metadata to the callback", () => {
		const schema = object({
			name: pipe(
				text(),
				metadata({
					label: "Full Name",
				}),
			),
		});

		const visited: Array<{
			path: string;
			metadata: Record<string, unknown>;
		}> = [];

		walkSchema(schema, ({ path, metadata }) => {
			visited.push({
				path: path.join("."),
				metadata,
			});
		});

		expect(visited).toContainEqual({
			path: "name",
			metadata: {
				label: "Full Name",
			},
		});
	});

	it("merges nested object-to-asArray upgrades (seller.contact)", () => {
		const schema = intersect([
			object({
				transaction: object({
					contract: object({
						seller: object({
							contact: nullish(
								object({
									personName: text(),
									phoneNumber: text(),
								}),
							),
						}),
					}),
				}),
			}),
			object({
				transaction: object({
					contract: object({
						seller: object({
							contact: pipe(
								nullish(
									asArray(
										object({
											typeCode: text(),
										}),
									),
								),
								metadata({ xpath: "/Contact" }),
							),
						}),
					}),
				}),
			}),
		]);

		const paths: string[] = [];
		walkSchema(schema, ({ path }) => {
			if (path.join(".").includes("contact")) paths.push(path.join("."));
		});
		expect(paths).toEqual([
			"transaction.contract.seller.contact",
			"transaction.contract.seller.contact.*.personName",
			"transaction.contract.seller.contact.*.phoneNumber",
			"transaction.contract.seller.contact.*.typeCode",
		]);

		const fields = collectFieldSchemas(schema);
		expect(fields.has("transaction.contract.seller.contact.*.personName")).toBe(
			true,
		);
	});
});
