import { cookies } from "next/headers";
import { SidebarProvider } from "@/layouts/docs/sidebar";
import { SIDEBAR_COOKIE_NAME } from "@/lib/sidebar-cookie";

export default async function Layout({ children }: LayoutProps<"/">) {
	const cookieStore = await cookies();
	const defaultCollapsed =
		cookieStore.get(SIDEBAR_COOKIE_NAME)?.value === "true";

	return (
		<SidebarProvider defaultCollapsed={defaultCollapsed}>
			{children}
		</SidebarProvider>
	);
}
