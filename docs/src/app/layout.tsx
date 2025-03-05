import { NavBar } from "@/components/nav-bar";
import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

const inter = Inter({
	subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className={inter.className} suppressHydrationWarning>
			<body
				className={`${GeistSans.variable} ${GeistMono.variable} font-sans relative`}
			>
				<RootProvider
					theme={{
						enableSystem: true,
						disableTransitionOnChange: true,
						defaultTheme: "dark",
					}}
				>
					<NavBar />
					{children}
				</RootProvider>
			</body>
		</html>
	);
}
