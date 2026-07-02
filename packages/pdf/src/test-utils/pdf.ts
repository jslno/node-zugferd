export const isPdfA3b = (input: Uint8Array<ArrayBufferLike>) => {
	const text = new TextDecoder("utf-8").decode(input);

	return (
		text.includes("<pdfaid:part>3</pdfaid:part>") &&
		text.includes("<pdfaid:conformance>B</pdfaid:conformance>")
	);
};
