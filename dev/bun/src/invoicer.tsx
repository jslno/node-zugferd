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
		"default-de": (data) => {
			return {
				language: "ger",
				displayHeaderFooter: true,
				margin: {
					top: 60,
					bottom: 60,
				},
				header: (
					<div
						style={{
							fontSize: 24,
						}}
					>
						Seite <span className="pageNumber" /> von{" "}
						<span className="totalPages" />
					</div>
				),
				footer: (
					<p
						style={{
							fontSize: 24,
						}}
					>
						&copy; {new Date().getFullYear()} - Test
					</p>
				),
				body: <h1>Rechnung {data.number}</h1>,
			};
		},
	},
});
