import { api } from "@node-zugferd/api";
import { zugferd } from "node-zugferd";
import { BASIC } from "node-zugferd/profile";

export const invoicer = zugferd({
	profile: BASIC,
	plugins: [
		api({
			template: () => {
				return <>Test Invoice</>;
			},
		}),
	],
});
