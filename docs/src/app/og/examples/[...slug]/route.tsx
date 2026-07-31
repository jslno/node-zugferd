import { readFileSync } from "node:fs";
import { join } from "node:path";
import { notFound } from "next/navigation";
import { ImageResponse } from "takumi-js/response";
import { OG_BACKGROUND } from "@/lib/og-background";
import { appName } from "@/lib/shared";
import { examplesSource, getPageImage } from "@/lib/source";

export const revalidate = false;

const stylesheet = readFileSync(
	join(process.cwd(), "src/app/global.css"),
	"utf-8",
);

export async function GET(
	_req: Request,
	{ params }: RouteContext<"/og/examples/[...slug]">,
) {
	const { slug } = await params;
	const page = examplesSource.getPage(slug.slice(0, -1));
	if (!page) notFound();

	return new ImageResponse(
		<div
			tw="dark bg-neutral-950 w-full h-full relative flex flex-col overflow-hidden text-foreground"
			style={{ backgroundImage: "url(background)" }}
		>
			<div tw="flex flex-col w-full h-full px-22.5 py-15 relative justify-between">
				<div tw="flex flex-col gap-8 mb-10 text-pretty">
					<span tw="text-[72] font-bold leading-tight text-white">
						{page.data.title}
					</span>
					<span tw="text-[44] text-neutral-500 line-clamp-2 text-ellipsis overflow-hidden max-w-[95%]">
						{page.data.description}
					</span>
				</div>

				<div tw="flex items-center gap-7">
					<span tw="text-[32] font-medium opacity-90 text-white">
						{appName}
					</span>
					<div tw="flex flex-1" />
					<div tw="flex h-1 w-15 bg-teal-500 rounded-xs" />
					<span tw="text-[28] text-teal-500 font-medium opacity-80 uppercase">
						Examples
					</span>
				</div>
			</div>
		</div>,
		{
			width: 1200,
			height: 630,
			format: "webp",
			stylesheets: [stylesheet],
			images: [
				{
					src: "background",
					data: OG_BACKGROUND.buffer,
				},
			],
		},
	);
}

export function generateStaticParams() {
	return examplesSource.getPages().map((page) => ({
		lang: page.locale,
		slug: getPageImage(page, "examples").segments,
	}));
}
