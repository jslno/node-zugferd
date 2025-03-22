import type { BaseZugferdContext } from "../init";
import type { ProfileValidateHandler } from "../types";

export const validateDocumentFactory =
	(ctx: BaseZugferdContext): ProfileValidateHandler =>
	async (data) => {
		if (ctx.options.strict === false) {
			return true;
		}

		return ctx.options.profile.validate(data);
	};
