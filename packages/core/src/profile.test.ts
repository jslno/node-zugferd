import { describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { createProfile, type Profile } from "./profile";
import type { ProfileConfig } from "./types";

const mocks = vi.hoisted(() => {
	return {
		XMLBuilder: {
			build: vi.fn((input) => JSON.stringify(input)),
		},
	};
});
vi.mock("fast-xml-parser", () => {
	class XMLBuilder {
		build = mocks.XMLBuilder.build;
	}

	return { XMLBuilder };
});

export const useProfileTests = () => {
	const interpolate = vi.fn(({ input }) => input);
	const config = {
		id: "profile",
		schema: {
			foo: {
				type: z.string(),
			},
		},
		interpolate,
		extensionSchema: {
			conformanceLevel: "MINIMUM",
		},
		config: {
			supportsPDFA: true,
			dataRelationship: "Alternative",
		},
	} as const satisfies ProfileConfig;

	return it.extend({
		interpolate: async (
			{ onTestFinished },
			use: (value: typeof interpolate) => void,
		) => {
			onTestFinished(() => {
				interpolate.mockRestore();
			});

			await use(interpolate);
		},
		profile: async ({}, use: (value: Profile<typeof config>) => void) => {
			await use(createProfile(config));
		},
	});
};

describe("createProfile", () => {
	const test = useProfileTests();

	test("should create a valid Profile object", ({ profile }) => {
		expect(profile).toHaveProperty("toXML");
		expect(profile.toXML).toBeTypeOf("function");
	});

	test("should call interpolate and xml builder inside toXML", async ({
		profile,
		interpolate,
	}) => {
		const input: typeof profile.$Input = {
			foo: "bar",
		};

		const result = await profile.toXML(input);

		expect(interpolate).toHaveBeenCalledExactlyOnceWith(
			expect.objectContaining({ input }),
		);
		expect(mocks.XMLBuilder.build).toHaveBeenCalledOnce();
		expect(result).toBe(
			JSON.stringify({
				"?xml": {
					"@version": "1.0",
					"@encoding": "UTF-8",
				},
				...input,
			}),
		);
	});
});
