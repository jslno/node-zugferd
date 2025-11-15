export function formatKeys(
	keys: string | string[] | undefined,
	trimLeadingSpace: boolean = false,
): string {
	if (!keys) {
		return "";
	}

	return `${trimLeadingSpace ? "" : " "}(${Array.isArray(keys) ? keys.join(", ") : keys})`;
}
