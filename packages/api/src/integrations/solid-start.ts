export const toSolidStartHandler = (
	api:
		| {
				apiHandler: (request: Request) => Promise<Response>;
		  }
		| ((request: Request) => Promise<Response>),
) => {
	const handler = async (event: { request: Request }) => {
		return "apiHandler" in api
			? api.apiHandler(event.request)
			: api(event.request);
	};
	return {
		GET: handler,
		POST: handler,
	};
};
