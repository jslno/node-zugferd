"use client";

import { useTheme } from "@fumadocs/base-ui/provider/base";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return;

	return (
		<Button
			size="icon-lg"
			variant="ghost"
			onClick={() => {
				setTheme(resolvedTheme === "light" ? "dark" : "light");
			}}
		>
			{resolvedTheme === "light" ? <SunIcon /> : <MoonIcon />}
		</Button>
	);
}
