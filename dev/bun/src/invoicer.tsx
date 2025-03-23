import { api } from "@node-zugferd/api";
import { renderer } from "@node-zugferd/api/react/renderer";
import { zugferd } from "node-zugferd";
import { BASIC, type ProfileBasic } from "node-zugferd/profile";

export const invoicer = zugferd({
	profile: BASIC,
	plugins: [
		api(BASIC)(renderer, {
			template: (data: ProfileBasic) => {
				return (
					<html>
						<body>
							<h1>Test Invoice {data.number}</h1>
						</body>
					</html>
				);
			},
		}),
	],
});
