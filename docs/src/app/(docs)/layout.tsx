import { SidebarProvider } from "@/layouts/docs/sidebar";

export default function Layout({ children }: LayoutProps<"/">) {
	return <SidebarProvider>{children}</SidebarProvider>;
}
