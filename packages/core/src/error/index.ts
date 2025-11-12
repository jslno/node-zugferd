export class ZugferdError extends Error {
	constructor(message: string, cause?: unknown | undefined) {
		super(message, {
			cause,
		});
		this.name = "ZugferdError";
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export class ZugferdValidationError extends ZugferdError {
	constructor(message: string, cause?: unknown | undefined) {
		super(message, cause);
		this.name = "ZugferdValidationError";
	}
}
