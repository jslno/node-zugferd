"use client";

import { PixelBlast } from "@/components/pixel-blast";
import { useTheme } from "@fumadocs/base-ui/provider/base";

export function HomeBackground() {
	const { resolvedTheme } = useTheme();

	return (
		<PixelBlast
			variant="square"
			pixelSize={4}
			enableRipples={false}
			edgeFade={0.25}
			patternDensity={0.75}
			color={resolvedTheme === "dark" ? "#042f2e" : "#d4d4d4"}
			speed={0.25}
			liquid={false}
			autoPauseOffscreen
			transparent
		/>
	);
}
