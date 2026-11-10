export function joinExpects(values: string[], separator: "&" | "|"): string {
	const list = [...new Set(values)];

	if (list.length > 1) {
		return `(${list.join(` ${separator} `)})`;
	}

	return list[0] ?? "never";
}
