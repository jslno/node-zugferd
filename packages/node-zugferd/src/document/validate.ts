import type { BaseZugferdContext } from "../init";
import type { ProfileValidateHandler } from "../types";
import { colors } from "../utils/logger";

export const validateDocumentFactory =
	(ctx: BaseZugferdContext): ProfileValidateHandler =>
	async (data) => {
		if (ctx.options.strict === false) {
			ctx.logger.debug(
				`[${validateDocumentFactory.name}] Strict mode disabled, skipping validation`,
			);
			return true;
		}

		ctx.logger.debug(`[${validateDocumentFactory.name}] Validating`);
		const result = await ctx.options.profile.validate(data);
		ctx.logger.debug(
			`[${validateDocumentFactory.name}] Validation result: ${result ? `${colors.fg.green}\u2714${colors.reset}` : `${colors.fg.red}\u274C${colors.reset}`}`,
		);

		return result;
	};
