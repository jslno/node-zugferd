import type { XsdPathMap } from ".";

export const getXsdPath = (profileId: string, map: XsdPathMap) => {
	const xsdPath = map[profileId];
	if (!xsdPath) {
		return null;
	}

	if (typeof xsdPath === "function") {
		return xsdPath();
	}

	return xsdPath;
};
