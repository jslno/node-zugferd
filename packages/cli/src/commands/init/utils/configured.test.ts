import { describe, expect, it } from "vitest";
import { remainingPlugins, remainingProfiles } from "./configured";

describe("remaining catalog", () => {
	it("drops profiles and plugins that are already on the instance", () => {
		const profiles = remainingProfiles({
			profiles: [{ id: "minimum" }, { id: "xrechnung" }],
		});
		const profileIds = profiles.map((profile) => profile.id);

		expect(profileIds).not.toContain("minimum");
		expect(profileIds).toContain("basic");
		expect(profileIds).not.toContain("xrechnung");

		const plugins = remainingPlugins({
			plugins: [{ id: "~create" }, { id: "parser" }],
		});
		const pluginIds = plugins.map((plugin) => plugin.id);

		expect(pluginIds).not.toContain("parser");
		expect(pluginIds).toContain("xsd");
		expect(pluginIds).toContain("mustang");
	});
});
