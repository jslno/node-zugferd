import type { SVGProps } from "react";
import { useId } from "react";

const NodeZugferd = (props: SVGProps<SVGSVGElement>) => {
	const id = useId();

	return (
		<svg
			width="1em"
			height="1em"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g clipPath={`url(#${id})`}>
				<path
					d="M0.4395 12.75C6.40997 12.75 11.25 17.59 11.25 23.5605C11.25 23.8061 11.0471 24 10.8015 24H4C1.79086 24 0 22.2091 0 20V13.1986C0 12.953 0.193921 12.75 0.4395 12.75ZM23.5605 12.75C23.8061 12.75 24 12.953 24 13.1986V20C24 22.2091 22.2091 24 20 24H13.1985C12.9529 24 12.7502 23.8061 12.75 23.5605C12.75 17.59 17.59 12.75 23.5605 12.75ZM10.8015 0C11.0471 0 11.25 0.193922 11.25 0.4395C11.25 6.40997 6.40997 11.25 0.439406 11.25C0.193881 11.25 0 11.0471 0 10.8016V4C0 1.79086 1.79086 0 4 0H10.8015ZM24 10.8015C24 11.0471 23.8061 11.25 23.5605 11.25C17.59 11.25 12.75 6.40997 12.75 0.439406C12.75 0.193881 12.9529 0 13.1984 0H20C22.2091 0 24 1.79086 24 4V10.8015Z"
					fill="currentColor"
				/>
			</g>
			<defs>
				<clipPath id={id}>
					<rect width={24} height={24} fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};

export { NodeZugferd };
