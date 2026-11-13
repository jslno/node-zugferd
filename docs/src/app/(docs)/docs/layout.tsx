import { DocsLayout } from "@/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { getSourcePageTree } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/docs">) {
	return (
		<DocsLayout tree={getSourcePageTree("docs")} {...baseOptions()}>
			{children}
		</DocsLayout>
	);
}
