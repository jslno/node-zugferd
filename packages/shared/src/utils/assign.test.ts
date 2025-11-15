import { describe, expect, it } from "vitest";
import { assign } from "./assign";

describe("assign", () => {
	it("should assign values to the target object based on the provided key paths", () => {
		const target: Record<string, any> = {};

		assign(target, "a/b/c", 1);
		assign(target, "a/b/d", 2);
		assign(target, "a/e", 3);
		assign(target, "f", 4);

		expect(target).toMatchObject({
			a: {
				b: {
					c: 1,
					d: 2,
				},
				e: 3,
			},
			f: 4,
		});
	});

	it("should handle array assignments correctly", () => {
		const target: Record<string, any> = {};

		assign(target, "a/b", 1, {
			array: true,
		});
		assign(target, "a/b", 2, {
			array: true,
		});
		assign(target, "a/b", 3, {
			array: true,
		});

		expect(target).toMatchObject({
			a: {
				b: [1, 2, 3],
			},
		});
	});

	it("should respect the customCondition parameter", () => {
		const target: Record<string, any> = {};

		assign(target, "a/b", 1, {
			condition: false,
		});
		assign(target, "a/c", 2, {
			condition: true,
		});
		assign(target, "a/d", 3);

		expect(target).toMatchObject({
			a: {
				c: 2,
				d: 3,
			},
		});
	});

	it("should overwrite existing values when not using array option", () => {
		const target: Record<string, any> = {};

		assign(target, "a/b", 1);
		assign(target, "a/b", 2);

		expect(target).toMatchObject({
			a: {
				b: 2,
			},
		});
	});

	it("should merge objects when both existing and new values are objects", () => {
		const target: Record<string, any> = {};

		assign(target, "a/b", { x: 1, y: 2 });
		assign(target, "a/b", { y: 3, z: 4 });

		expect(target).toMatchObject({
			a: {
				b: {
					x: 1,
					y: 3,
					z: 4,
				},
			},
		});
	});
});
