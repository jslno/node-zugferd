import { basic } from "@node-zugferd/basic";
import { parser } from "@node-zugferd/parser";
import { xsd } from "@node-zugferd/validator-xsd";
import { zugferd } from "node-zugferd";

export const invoicer = zugferd({
	profiles: [basic],
	plugins: [xsd(), parser()],
	prettyPrint: process.env.NODE_ENV === "development",
});
