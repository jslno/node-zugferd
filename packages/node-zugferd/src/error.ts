export class ZugferdError extends Error {
	constructor(
		public code: string,
		message: string,
		options?: ErrorOptions,
	) {
		super(message, options);

		this.code = code;
		this.name = "ZugferdError";
	}
}
