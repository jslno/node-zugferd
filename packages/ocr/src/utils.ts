import { createCanvas } from "@napi-rs/canvas";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

export function generateMessageId(): string {
	return `msg-${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

export function generateRunId(): string {
	return `run-${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

export function generateThreadId(): string {
	return `thread-${Date.now()}-${Math.random().toString(36).substring(7)}`;
}

// TODO: Add option to use webp
export async function pdfToWebp(data: Uint8Array, scale = 2) {
	const document = await pdfjs.getDocument({
		data,
	}).promise;

	const images: Uint8Array[] = [];

	for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber++) {
		const page = await document.getPage(pageNumber);
		const viewport = page.getViewport({ scale });

		const canvas = createCanvas(
			Math.ceil(viewport.width),
			Math.ceil(viewport.height),
		);

		const context = canvas.getContext("2d");

		await page.render({
			canvas: canvas as any,
			canvasContext: context as any,
			viewport,
		}).promise;

		images.push(canvas.toBuffer("image/png"));
	}

	return images;
}
