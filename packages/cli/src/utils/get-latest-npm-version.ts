export const getLatestNpmVersion = async (
	packageName: string,
): Promise<string> => {
	try {
		const response = await fetch(`https://registry.npmjs.org/${packageName}`);

		if (!response.ok) {
			throw new Error(`Package not found: ${response.statusText}`);
		}

		const data = await response.json();
		return data["dist-tags"].latest; // Get the latest version from dist-tags
	} catch (err: any) {
		throw err?.message;
	}
};
