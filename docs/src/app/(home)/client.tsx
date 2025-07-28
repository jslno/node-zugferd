"use client";

import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import dynamic from "next/dynamic";

export type HomeProps = {
	stars: string;
};

const LightRays = dynamic(() => import("../../components/ui/light-rays"), {
	ssr: false,
});

export const Home = ({ stars }: HomeProps) => {
	return (
		<div className="relative h-min pb-6">
			<div className="max-h-dvh absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,rgba(79,79,79,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(79,79,79,0.1)_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]">
				<LightRays
					raysColor="#44403c"
					saturation={0.2}
					distortion={0.05}
					noiseAmount={0.15}
					lightSpread={0.35}
					mouseInfluence={0.2}
					raysSpeed={0.4}
				/>
			</div>
			<Hero />
			<Features stars={stars} />
		</div>
	);
};
Home.displayName = "Home";
