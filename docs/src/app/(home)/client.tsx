"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { AuroraBackground } from "@/components/ui/aurora-background";

export type HomeProps = {
	stars: string;
};

export const Home = ({ stars }: HomeProps) => {
	const lenis = useLenis();

	useEffect(() => {
		if (!lenis) {
			return;
		}

		const target = document.body || document.documentElement;

		const observer = new MutationObserver((mutations) => {
			const target = document.body || document.documentElement;
			mutations.forEach((mutation) => {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === "style"
				) {
					if (
						target.computedStyleMap().get("overflow")?.toString() &&
						!lenis.isStopped
					) {
						lenis.stop();
					} else if (lenis.isStopped) {
						lenis.start();
					}
				}
			});
		});

		observer.observe(target, {
			attributes: true,
			attributeFilter: ["style"],
		});

		return () => {
			observer.disconnect();
		};
	}, [lenis]);

	return (
		<>
			<ReactLenis
				options={{
					autoRaf: true,
				}}
				root
			/>
			<div className="relative h-min pb-6">
				<AuroraBackground>
					<Hero />
				</AuroraBackground>
				<Features stars={stars} />
			</div>
		</>
	);
};
Home.displayName = "Home";
