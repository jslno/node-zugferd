import type { SVGProps } from "react";

const NodeZugferd = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="1em"
		height="1em"
		fill="none"
		{...props}
	>
		<path
			fill="currentColor"
			d="M23 6.207V21a2 2 0 0 1-2 2H6.207a.5.5 0 0 1-.353-.854L22.146 5.854a.5.5 0 0 1 .854.353ZM1 17.793V3a2 2 0 0 1 2-2h14.793a.5.5 0 0 1 .353.854L1.854 18.146A.5.5 0 0 1 1 17.793Z"
		/>
	</svg>
);

export { NodeZugferd };
