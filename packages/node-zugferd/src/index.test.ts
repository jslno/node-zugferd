import type { ZugferdProfile } from "@node-zugferd/core";
import { describe, expect, it, vi } from "vitest";
import { zugferd } from "./index";

const profile = {
	id: "minimum",
	dataRelationship: "Data",
	schema: {},
	build() {},
	extensionSchema: {
		type: "INVOICE",
		conformanceLevel: "MINIMUM",
		fileName: "factur-x.xml",
		version: "1.0",
	},
} as ZugferdProfile;

describe("spanActions", () => {
	it("wraps functions, nested objects, and arrays until they are called", async () => {
		const spans: {
			name: string;
			attr: Record<string, string | number | boolean>;
		}[] = [];
		const api = zugferd({
			profiles: [profile],
			advanced: {
				instrumentation: {
					span(name, attr, fn) {
						spans.push({ name, attr });
						return fn();
					},
				},
			},
			plugins: [
				{
					id: "demo",
					actions: () => ({
						echo: (value: string) => `echo:${value}`,
						nested: {
							ping: () => "pong",
						},
						list: [() => "zero", { run: () => "one" }],
						later: async () => "done",
						label: "static",
						empty: null,
					}),
				},
			],
		});

		expect(spans).toEqual([]);
		expect(api.label).toBe("static");
		expect(api.empty).toBeNull();

		expect(api.echo("4711")).toBe("echo:4711");
		expect(api.nested.ping()).toBe("pong");
		const [first, second] = api.list;
		if (typeof first !== "function" || !second || !("run" in second)) {
			throw new Error("spanActions did not preserve the array shape");
		}
		expect(first()).toBe("zero");
		expect(second.run()).toBe("one");
		await expect(api.later()).resolves.toBe("done");

		expect(spans).toEqual([
			{
				name: "echo",
				attr: {
					"node-zugferd.type": "action",
					"node-zugferd.context": "plugin:demo",
				},
			},
			{
				name: "nested.ping",
				attr: {
					"node-zugferd.type": "action",
					"node-zugferd.context": "plugin:demo",
				},
			},
			{
				name: "list.0",
				attr: {
					"node-zugferd.type": "action",
					"node-zugferd.context": "plugin:demo",
				},
			},
			{
				name: "list.1.run",
				attr: {
					"node-zugferd.type": "action",
					"node-zugferd.context": "plugin:demo",
				},
			},
			{
				name: "later",
				attr: {
					"node-zugferd.type": "action",
					"node-zugferd.context": "plugin:demo",
				},
			},
		]);
	});

	it("forwards thrown errors through the span", () => {
		const api = zugferd({
			profiles: [profile],
			plugins: [
				{
					id: "demo",
					actions: () => ({
						fail: () => {
							throw new Error("nope");
						},
					}),
				},
			],
		});

		expect(() => api.fail()).toThrow("nope");
	});

	it("calls the action directly when no instrumentation span is configured", () => {
		const api = zugferd({
			profiles: [profile],
			plugins: [
				{
					id: "demo",
					actions: () => ({
						echo: (value: string) => value,
					}),
				},
			],
		});

		expect(api.echo("ok")).toBe("ok");
	});

	it("keeps each plugin id on the actions it contributed", () => {
		const spans: { name: string; plugin: string | number | boolean }[] = [];
		const api = zugferd({
			profiles: [profile],
			advanced: {
				instrumentation: {
					span(name, attr, fn) {
						spans.push({
							name,
							plugin: attr["node-zugferd.context"] ?? "",
						});
						return fn();
					},
				},
			},
			plugins: [
				{
					id: "alpha",
					actions: () => ({
						group: { left: () => "L" },
					}),
				},
				{
					id: "beta",
					actions: () => ({
						group: { right: () => "R" },
					}),
				},
				{ id: "silent" },
			],
		});

		expect(api.group.left()).toBe("L");
		expect(api.group.right()).toBe("R");
		expect(spans).toEqual([
			{ name: "group.left", plugin: "plugin:alpha" },
			{ name: "group.right", plugin: "plugin:beta" },
		]);
	});

	it("merges plugin init results into the context", () => {
		const seen = vi.fn();
		const api = zugferd({
			profiles: [profile],
			plugins: [
				{
					id: "skip",
					init: () => {
						seen();
					},
				},
				{
					id: "configure",
					init: () => ({ options: { prettyPrint: true } }),
				},
			],
		});

		expect(seen).toHaveBeenCalledOnce();
		expect(
			(api.$context.options as { prettyPrint?: boolean }).prettyPrint,
		).toBe(true);
		expect(api.$context.hasProfile("minimum")).toBe(true);
		expect(api.$context.getPlugin("configure")?.id).toBe("configure");
	});
});
