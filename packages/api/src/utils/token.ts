import type { ZugferdApiContext } from "../init";
import jwt from "jsonwebtoken";

export const verifyToken = (ctx: ZugferdApiContext, token: string) => {
	let isValid = true;
	try {
		jwt.verify(token, ctx.options.secret);
	} catch {
		isValid = false;
	}

	return isValid;
};

export const signToken = (ctx: ZugferdApiContext) => {
	return jwt.sign({}, ctx.options.secret, {
		expiresIn: 60, // 1 minute
	});
};
