import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/app/source";
import { SideBar } from "@/components/side-bar";
import { Footer } from "@/components/footer";
import { DocsNavBarMobile } from "@/components/nav-mobile";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocsLayout
        tree={source.pageTree}
        {...baseOptions}
        sidebar={{
          component: (
            <div className="mr-(--fd-sidebar-width)">
              <SideBar />
            </div>
          ),
        }}
      >
        <DocsNavBarMobile />
        {children}
      </DocsLayout>
      <Footer className="ml-(--fd-sidebar-width) w-[calc(100%-var(--fd-sidebar-width))]" />
    </>
  );
}
