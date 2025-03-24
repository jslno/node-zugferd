import { createApiMiddleware } from "../call";
import jwt from "jsonwebtoken";

export const sessionMiddleware = createApiMiddleware(async (ctx) => {
	const bearer = ctx.getHeader("Authorization");
	if (
		!bearer ||
		(!bearer.startsWith("Bearer ") && !bearer.startsWith("bearer "))
	) {
		throw ctx.error("UNAUTHORIZED");
	}

	const token = bearer.substring(7);

	let isValid = true;
	try {
		jwt.verify(token, ctx.context.options.secret);
	} catch {
		isValid = false;
	}

	if (!isValid) {
		throw ctx.error("UNAUTHORIZED");
	}
});
