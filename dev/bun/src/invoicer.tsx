import { api } from "@node-zugferd/api";
import { renderer, Document } from "@node-zugferd/api/react/renderer";
import { zugferd } from "node-zugferd";
import { BASIC, type ProfileBasic } from "node-zugferd/profile";

export const invoicer = zugferd({
	profile: BASIC,
	plugins: [
		api(BASIC)(renderer, {
			secret: "SECRET",
			template: {
				default: {
					language: "eng",
					component: (props: { data: ProfileBasic }) => {
						return (
							<Document>
								<h1>Test Invoice {props.data.number}</h1>
							</Document>
						);
					},
				},
			},
		}),
	],
});
