import { describe, expect, vi } from "vitest";
import { z } from "zod";
import { useProfileTests } from "../profile.test";
import type { ExtensionSchemaFields } from "../types";
import { extendProfile } from "./extend-profile";

const mocks = vi.hoisted(() => {
	return {
		mergeSchema: vi.fn((a, b) => ({ ...a, ...b, merged: true })),
	};
});

vi.mock("./merge-schema", () => {
	return {
		mergeSchema: mocks.mergeSchema,
	};
});

describe("extendProfile", () => {
	const test = useProfileTests();

	test("should call mergeSchema when extending with a new schema", ({
		profile,
	}) => {
		extendProfile(profile, {
			schema: {
				bar: {
					type: z.string(),
				},
			},
		});

		expect(mocks.mergeSchema).toHaveBeenCalledOnce();
	});

	test("should correctly merge config values", ({ profile }) => {
		const extendedProfile = extendProfile(profile, {
			config: {
				supportsPDFA: false,
			},
		});

		expect(extendedProfile.config).toEqual({
			supportsPDFA: false,
			dataRelationship: "Alternative",
		});
	});

	test("should override id if provided", ({ profile }) => {
		const extendedProfile = extendProfile(profile, {
			id: "extended",
		});

		expect(extendedProfile.id).toEqual("extended");
	});

	test("should use new interpolate function", ({ profile }) => {
		const interpolate = vi.fn(({ input }) => input);
		const extendedProfile = extendProfile(profile, {
			interpolate,
		});

		extendedProfile.toXML({
			foo: "bar",
		});
		expect(interpolate).toHaveBeenCalledExactlyOnceWith(
			expect.objectContaining({
				input: {
					foo: "bar",
				},
			}),
		);
	});

	test("should override extensionSchema if defined", ({ profile }) => {
		const extensionSchema = {
			documentType: "INVOICE",
			conformanceLevel: "EXTENDED",
		} as const satisfies ExtensionSchemaFields;
		const extendedProfile = extendProfile(profile, {
			extensionSchema,
		});

		expect(extendedProfile.extensionSchema).toEqual(extensionSchema);
	});

	test("should handle missing config gracefully", ({ profile }) => {
		const extendedProfile = extendProfile(profile, {});
		const { toXML: _, ...originalProfile } = profile;
		expect(extendedProfile).toStrictEqual(
			expect.objectContaining(originalProfile),
		);
	});
});
