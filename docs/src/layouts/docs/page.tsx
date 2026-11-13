import { onPageFeedbackAction } from "@/lib/github";
import type { DocsPageProps as DocsPageClientProps } from "./client";
import {
	DocsBody,
	DocsDescription,
	DocsPage as DocsPageClient,
	DocsTitle,
} from "./client";

export type DocsPageProps = Omit<DocsPageClientProps, "onSendAction">;

export function DocsPage(props: DocsPageProps) {
	return <DocsPageClient {...props} onSendAction={onPageFeedbackAction} />;
}

export { DocsBody, DocsDescription, DocsTitle };
