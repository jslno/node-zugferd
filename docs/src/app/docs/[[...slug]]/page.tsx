import { source } from "@/app/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { buttonVariants } from "@/components/ui/button";
import { contents } from "@/data/sidebar-items";
import { Card, Cards } from "fumadocs-ui/components/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const { nextPage, prevPage } = getPageLinks(page.url);

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      editOnGithub={{
        owner: "jslno",
        repo: "node-zugferd",
        sha: "main",
        path: `/docs/content/docs/${page.file.path}`,
        className: buttonVariants({
          variant: "outline",
          size: "sm"
        }),
      }}
      tableOfContent={{
        style: "clerk",
        header: <div className="w-10 h-4"></div>,
      }}
      footer={{
        component: (
          <div className="mb-10">
            <Cards className="mt-auto grid grid-cols-2">
              {prevPage ? (
                <Card
                  href={prevPage.url}
                  className="flex-1 [&>p]:ml-1 [&>p]:truncate [&>p]:w-full bg-transparent hover:bg-transparent"
                  // @ts-expect-error
                  title={
                    <div className="flex items-center gap-1">
                      <ChevronLeft className="size-4" />
                      {prevPage.data.title}
                    </div>
                  }
                />
              ) : (
                <div />
              )}
              {nextPage ? (
                <Card
                  href={nextPage.url}
                  className="[&>p]:ml-1 [&>p]:truncate [&>p]:w-full bg-transparent hover:bg-transparent"
                  // @ts-expect-error
                  title={
                    <div className="flex items-center gap-1">
                      {nextPage.data.title}
                      <ChevronRight className="size-4" />
                    </div>
                  }
                />
              ) : (
                <div />
              )}
            </Cards>
          </div>
        ),
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}

function getPageLinks(path: string) {
  const current_category_index = contents.findIndex(
    (x) => x.list.find((x) => x.href === path)!
  )!;
  const current_category = contents[current_category_index];
  if (!current_category) return { nextPage: undefined, prevPage: undefined };

  // user's current page.
  const current_page = current_category.list.find((x) => x.href === path)!;

  // the next page in the array.
  let next_page = current_category.list.filter((x) => !x.group)[
    current_category.list
      .filter((x) => !x.group)
      .findIndex((x) => x.href === current_page.href) + 1
  ];
  //if there isn't a next page, then go to next cat's page.
  if (!next_page) {
    // get next cat
    let next_category = contents[current_category_index + 1];
    // if doesn't exist, return to first cat.
    if (!next_category) next_category = contents[0];

    next_page = next_category.list[0];
    if (next_page.group) {
      next_page = next_category.list[1];
    }
  }
  // the prev page in the array.
  let prev_page = current_category.list.filter((x) => !x.group)[
    current_category.list
      .filter((x) => !x.group)
      .findIndex((x) => x.href === current_page.href) - 1
  ];
  // if there isn't a prev page, then go to prev cat's page.
  if (!prev_page) {
    // get prev cat
    let prev_category = contents[current_category_index - 1];
    // if doesn't exist, return to last cat.
    if (!prev_category) prev_category = contents[contents.length - 1];
    prev_page = prev_category.list[prev_category.list.length - 1];
    if (prev_page.group) {
      prev_page = prev_category.list[prev_category.list.length - 2];
    }
  }

  const pages = source.getPages();
  let next_page2 = pages.find((x) => x.url === next_page.href);
  let prev_page2 = pages.find((x) => x.url === prev_page.href);
  if (path === "/docs/introduction") prev_page2 = undefined;
  return { nextPage: next_page2, prevPage: prev_page2 };
}
