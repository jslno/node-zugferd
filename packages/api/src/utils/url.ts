export const hasPath = (url: string): boolean => {
	try {
		return new URL(url).pathname !== "/";
	} catch (err) {
		// TODO: Custom error
		throw new Error(`Invalid base url: ${url}`);
	}
};

export const withPath = (url: string, path = "/api/zugferd") => {
	if (hasPath(url)) {
		return url;
	}
	path = path.startsWith("/") ? path : `/${path}`;
	return `${url.replace(/\/+$/, "")}${path}`;
};

export const getBaseURL = (url?: string, path?: string, request?: Request) => {
	if (url) {
		return withPath(url, path);
	}

	const fromRequest = request?.headers.get("x-forwarded-host");
	const fromRequestProto = request?.headers.get("x-forwarded-proto");
	if (fromRequest && fromRequestProto) {
		return withPath(`${fromRequestProto}://${fromRequest}`, path);
	}

	if (request) {
		const url = getOrigin(request.url);
		if (!url) {
			// TODO: Custom error
			throw new Error("Unable to retrieve the origin from the request.");
		}
		return withPath(url, path);
	}

	if (typeof window !== "undefined" && window.location) {
		return withPath(window.location.origin, path);
	}

	return undefined;
};

export const getOrigin = (url: string) => {
	try {
		return new URL(url).origin;
	} catch (err) {
		return null;
	}
};

export const getProtocol = (url: string) => {
	try {
		return new URL(url).protocol;
	} catch (err) {
		return null;
	}
};

export const getHost = (url: string) => {
	try {
		return new URL(url).host;
	} catch (err) {
		return null;
	}
};
