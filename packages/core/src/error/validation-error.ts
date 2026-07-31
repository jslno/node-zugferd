import { ZugferdError } from "./error";

export class ZugferdValidationError extends ZugferdError {
	public readonly issues: readonly unknown[];

	constructor(issues: readonly unknown[]) {
		super(
			"Validation failed with the following issues:\n" +
				issues.map((issue) => JSON.stringify(issue)).join("\n"),
		);
		this.issues = issues;
	}
}
