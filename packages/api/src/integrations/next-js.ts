export const toNextJsHandler = (
	api:
		| {
				handler: (request: Request) => Promise<Response>;
		  }
		| ((request: Request) => Promise<Response>),
) => {
	const handler = async (request: Request) => {
		return "handler" in api ? api.handler(request) : api(request);
	};
	return {
		GET: handler,
		POST: handler,
	};
};
