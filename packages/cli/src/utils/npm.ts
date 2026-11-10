export async function fetchDistTags(packageName: string) {
	const pkg = packageName.startsWith("@")
		? `@${encodeURIComponent(packageName.slice(1))}`
		: encodeURIComponent(packageName);
	try {
		const response = await fetch(
			`https://registry.npmjs.org/-/package/${pkg}/dist-tags`,
		);
		if (!response.ok) {
			return null;
		}
		const data = (await response.json()) as { latest: string } & Partial<
			Record<string, string>
		>;
		if (!data.latest) return null;

		return data;
	} catch {
		return null;
	}
}
