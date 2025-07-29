"use client";
import { ReactNode, useRef, useState } from "react";
import {
	motion,
	useInView,
	Variant,
	Transition,
	UseInViewOptions,
} from "motion/react";
import { slideInUp } from "@/lib/utils";

export type InViewVariant = {
	hidden: Variant;
	visible: Variant;
};

export type InViewProps = {
	children: ReactNode;
	variants?: InViewVariant;
	transition?: Transition;
	viewOptions?: UseInViewOptions;
	as?: React.ElementType;
	once?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export function InView({
	children,
	variants = slideInUp,
	transition,
	viewOptions,
	as = "div",
	once,
	...props
}: InViewProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, viewOptions);

	const [isViewed, setIsViewed] = useState(false);

	const MotionComponent = motion[as as keyof typeof motion] as typeof as;

	return (
		<MotionComponent
			ref={ref}
			initial="hidden"
			onAnimationComplete={() => {
				if (once) setIsViewed(true);
			}}
			animate={isInView || isViewed ? "visible" : "hidden"}
			variants={variants}
			transition={transition}
			{...props}
		>
			{children}
		</MotionComponent>
	);
}
