import { ImageResponse } from "@vercel/og";
import { z } from "zod";

export const runtime = "edge";

const ogSchema = z.object({
	heading: z.string(),
	mode: z.string(),
	type: z.string(),
});

export const GET = async (req: Request) => {
	try {
		const geist = await fetch(
			new URL("../../../assets/Geist.tff", import.meta.url),
		).then((res) => res.arrayBuffer());
		const geistMono = await fetch(
			new URL("../../../assets/GeistMono.tff", import.meta.url),
		).then((res) => res.arrayBuffer());
		const url = new URL(req.url);
		const urlParamsValues = Object.fromEntries(url.searchParams);
		const validParams = ogSchema.parse(urlParamsValues);
		const { heading, type } = validParams;
		const trueHeading =
			heading.length > 140 ? `${heading.substring(0, 140)}...` : heading;
		const paint = "#fff";
		const fontSize = trueHeading.length > 100 ? "30px" : "60px";

		return new ImageResponse(
			<div
				tw="flex w-full relative flex-col p-9"
				style={{
					color: paint,
					backgroundColor: "transparent",
					border: "1px solid rgba(255, 255, 255, 0.1)",
					boxShadow: "0 -20px 80px -20px rgba(28, 12, 12, 0.1) inset",
					background: "#0a0505",
				}}
			>
				<div
					tw={`relative flex flex-col w-full h-full border-2 border-[${paint}]/20 p-8}`}
				>
					<div tw="flex flex-col flex-1 py-10">
						<div tw="flex flex-col items-center justify-center grow">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="100"
								height="100"
								viewBox="0 0 24 24"
								fill="none"
								stroke={paint}
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								style={{ transform: "rotate(45deg)" }}
							>
								<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
							</svg>
							<div tw="text-[50px] font-bold relative flex items-center leading-[1.1] tracking-tighter mt-6">
								node-zugferd
							</div>
						</div>
					</div>
					<div tw="flex items-end w-full justify-between">
						<div tw="flex flex-col relative">
							{type === "documentation" && (
								<div
									style={{ fontFamily: "GeistMono", fontWeight: "normal" }}
									tw="relative flex mt-10 text-xl uppercase font-bold gap-2 items-center"
								>
									Documentation
								</div>
							)}
							<div
								tw="flex max-w-[70%] mt-5 tracking-tighter leading-[1.1] text-[30px] font-bold"
								style={{
									fontWeight: "bold",
									marginLeft: "-3px",
									fontSize,

									fontFamily: "GeistMono",
								}}
							>
								{trueHeading}
							</div>
						</div>
						<div tw="flex gap-2 items-center text-xl">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1.2em"
								height="1.2em"
								viewBox="0 0 24 24"
							>
								<path
									fill="currentColor"
									d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
								></path>
							</svg>
							<span
								style={{
									fontFamily: "GeistSans",
								}}
								tw="flex ml-2"
							>
								github.com/jslno/node-zugferd
							</span>
						</div>
					</div>
				</div>
			</div>,
			{
				width: 1200,
				height: 630,
				fonts: [
					{
						name: "Geist",
						data: geist,
						weight: 400,
						style: "normal",
					},
					{
						name: "GeistMono",
						data: geistMono,
						weight: 700,
						style: "normal",
					},
				],
			},
		);
	} catch (err) {
		console.error(err);
		return new Response("Failed to generate the opengraph image", {
			status: 500,
		});
	}
};
