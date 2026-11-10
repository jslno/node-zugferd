import { DocsLayout } from "@/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { examplesSource } from "@/lib/source";

export default function Layout({ children }: LayoutProps<"/examples">) {
	return (
		<DocsLayout tree={examplesSource.getPageTree()} {...baseOptions()}>
			{children}
		</DocsLayout>
	);
}
