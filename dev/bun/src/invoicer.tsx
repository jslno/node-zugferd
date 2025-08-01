import { api } from "@node-zugferd/api";
import { reactRenderer } from "@node-zugferd/api/react/renderer";
import { zugferd } from "node-zugferd";
import { BASIC } from "node-zugferd/profile";

export const invoicer = zugferd({
	profile: BASIC,
	logger: {
		level: "debug",
	},
});

export const zugferdApi = api({
	invoicer,
	renderer: reactRenderer(),
	templates: {
		default: (data) => {
			return {
				language: "eng",
				body: <h1>Invoice {data.number}</h1>,
			};
		},
	},
});
