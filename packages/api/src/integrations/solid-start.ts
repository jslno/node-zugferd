export const toSolidStartHandler = (
	api:
		| {
				handler: (request: Request) => Promise<Response>;
		  }
		| ((request: Request) => Promise<Response>),
) => {
	const handler = async (event: { request: Request }) => {
		return "handler" in api ? api.handler(event.request) : api(event.request);
	};
	return {
		GET: handler,
		POST: handler,
	};
};
