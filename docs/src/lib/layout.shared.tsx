import type { BaseLayoutProps } from "@fumadocs/base-ui/layouts/shared";
import { gitConfig } from "./shared";

export function baseOptions(): BaseLayoutProps {
	return {
		nav: {
			// JSX supported
		},
		githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
	};
}
