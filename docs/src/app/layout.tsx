import { NavBar } from "@/components/nav-bar";
import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import type { ReactNode } from "react";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { NavProvider } from "@/components/nav-mobile";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
	title: {
		template: "%s | node-zugferd",
		default: "node-zugferd",
	},
	description: "Integrate seamless electronic invoicing in Node.js",
	metadataBase:
		process.env.NODE_ENV === "development"
			? new URL("http://localhost:3000")
			: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`),
});

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon/favicon.ico" sizes="any" />
			</head>
			<body
				className={`min-h-dvh flex flex-col ${GeistSans.variable} ${GeistMono.variable} font-sans relative`}
			>
				<RootProvider
					theme={{
						enableSystem: true,
					}}
				>
					<NavProvider>
						<NavBar />
						{children}
					</NavProvider>
				</RootProvider>
			</body>
		</html>
	);
}
