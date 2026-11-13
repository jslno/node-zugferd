import { DocsLayout } from "@/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { getSourcePageTree } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/examples">) {
	return (
		<DocsLayout tree={getSourcePageTree("examples")} {...baseOptions()}>
			{children}
		</DocsLayout>
	);
}
