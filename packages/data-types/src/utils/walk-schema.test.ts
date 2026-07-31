import { describe, expect, it } from "vitest";
import { metadata } from "../actions";
import { pipe } from "../methods";
import { array, intersect, nullish, object, quantity, text } from "../schemas";
import { walkSchema } from "./walk-schema";

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
});
