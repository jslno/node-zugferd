import { DocsLayout } from "@/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { getSourcePageTree } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/api-reference">) {
	return (
		<DocsLayout tree={getSourcePageTree("apiReference")} {...baseOptions()}>
			{children}
		</DocsLayout>
	);
}
