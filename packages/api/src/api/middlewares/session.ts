import { verifyToken } from "../../utils/token";
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
	const isValid = verifyToken(ctx.context, token);

	if (!isValid) {
		throw ctx.error("UNAUTHORIZED");
	}
});
