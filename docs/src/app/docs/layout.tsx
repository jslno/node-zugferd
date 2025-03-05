import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/app/source";
import { SideBar } from "@/components/side-bar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
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
      {children}
    </DocsLayout>
  );
}
