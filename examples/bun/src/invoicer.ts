import { basic } from "@node-zugferd/basic";
import { xsd } from "@node-zugferd/validator-xsd";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [basic],
	plugins: [xsd()],
	prettyPrint: import.meta.env.NODE_ENV !== "production",
	logger: {
		level: import.meta.env.NODE_ENV === "development" ? "debug" : "error",
	},
});
