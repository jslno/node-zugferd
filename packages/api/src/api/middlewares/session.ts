import { verifyToken } from "../../utils/token";
import { createApiMiddleware } from "../call";

export const sessionMiddleware = createApiMiddleware(async (ctx) => {
	const bearer =
		ctx.getHeader("Authorization") || ctx.getHeader("authorization");
	if (!bearer || !bearer.toUpperCase().startsWith("BEARER ")) {
		throw ctx.error("UNAUTHORIZED");
	}

	const token = bearer.substring(7);
	const isValid = verifyToken(ctx.context, token);

	if (!isValid) {
		throw ctx.error("UNAUTHORIZED");
	}
});
