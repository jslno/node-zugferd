export const toNextJsHandler = (
	api:
		| {
				apiHandler: (request: Request) => Promise<Response>;
		  }
		| ((request: Request) => Promise<Response>),
) => {
	const handler = async (request: Request) => {
		return "apiHandler" in api ? api.apiHandler(request) : api(request);
	};
	return {
		GET: handler,
		POST: handler,
	};
};
