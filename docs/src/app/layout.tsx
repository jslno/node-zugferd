import { RootProvider } from "@fumadocs/base-ui/provider/next";
import "./global.css";
import { Geist, Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
	subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={cn(inter.className, "font-sans", geist.variable)}
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
