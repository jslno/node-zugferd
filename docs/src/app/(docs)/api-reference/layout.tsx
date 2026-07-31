import { DocsLayout } from "@/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { apiReferenceSource } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/api-reference">) {
	return (
		<DocsLayout tree={apiReferenceSource.getPageTree()} {...baseOptions()}>
			{children}
		</DocsLayout>
	);
}
