export class ZugferdError extends Error {
	constructor(message: string, options?: { cause?: unknown | undefined }) {
		super(message, options);
		this.name = "ZugferdError";
	}
}
