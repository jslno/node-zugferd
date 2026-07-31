import { RootProvider } from "@fumadocs/base-ui/provider/next";
import "./global.css";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import { GeistSans } from "geist/font/sans";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const inter = Inter({
	subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={cn(
				inter.className,
				"font-sans",
				GeistSans.variable,
				GeistMono.variable,
				GeistPixelSquare.variable,
			)}
			suppressHydrationWarning
		>
			<body className="flex flex-col min-h-screen">
				<TooltipProvider>
					<RootProvider>{children}</RootProvider>
				</TooltipProvider>
			</body>
		</html>
	);
}
