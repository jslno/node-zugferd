import "./global.css";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import { GeistSans } from "geist/font/sans";
import { Provider } from "@/components/provider";
import { cn } from "@/lib/utils";

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={cn(
				"font-sans antialiased",
				GeistSans.variable,
				GeistMono.variable,
				GeistPixelSquare.variable,
			)}
			suppressHydrationWarning
		>
			<body className="flex flex-col min-h-screen">
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}

export const metadata = {
	title: "node-zugferd",
	icons: [
		{
			rel: "icon",
			url: "/icon/light.png",
			media: "(prefers-color-scheme: light)",
		},
		{
			rel: "icon",
			url: "/icon/dark.png",
			media: "(prefers-color-scheme: dark)",
		},
	],
};
