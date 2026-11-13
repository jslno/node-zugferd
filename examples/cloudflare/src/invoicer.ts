import { en16931 } from "@node-zugferd/en-16931";
import { xsd } from "@node-zugferd/validator-xsd";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [en16931],
	plugins: [xsd()],
	prettyPrint: process.env.NODE_ENV !== "production",
});
