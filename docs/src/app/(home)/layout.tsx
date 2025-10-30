import { HomeLayout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { Footer } from "@/components/footer";

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<HomeLayout {...baseOptions} className="pt-0">
			{children}
			<Footer />
		</HomeLayout>
	);
}
