export class ZugferdError extends Error {
	constructor(message: string, cause?: string | undefined) {
		super(message, {
			cause,
		});
		this.name = "ZugferdError";
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
