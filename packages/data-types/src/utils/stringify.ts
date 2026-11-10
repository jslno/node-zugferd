export function stringify(input: unknown): string {
	const type = typeof input;
	if (type === "string") {
		return `"${input}"`;
	}
	if (type === "number" || type === "bigint" || type === "boolean") {
		return `${input}`;
	}
	if (type === "object" || type === "function") {
		return (input && Object.getPrototypeOf(input)?.constructor?.name) ?? "null";
	}
	return type;
}
