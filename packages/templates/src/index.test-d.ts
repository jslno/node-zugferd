import { expectTypeOf, it } from "vitest";
import { templates } from "./index";
import type { Template } from "./types";

it("infers template names and props", () => {
	const plugin = templates({
		templates: {
			localized: {} as Template<{ locale: string }>,
			plain: {} as Template,
		},
		defaultTemplate: "localized",
	});

	const template = plugin.actions!().template;

	expectTypeOf(template).toBeCallableWith("localized", { locale: "en" });
	expectTypeOf(template).toBeCallableWith("plain");
	expectTypeOf(template).toBeCallableWith({ locale: "de" });

	// @ts-expect-error unknown template names are rejected
	template("missing");
	// @ts-expect-error localized requires its props
	template("localized");
	// @ts-expect-error props are checked against the selected template
	template("localized", { language: "en" });
	// @ts-expect-error default template props are inferred too
	template({ language: "de" });
});
