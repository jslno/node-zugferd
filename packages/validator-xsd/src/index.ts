import type { Validator } from "node-zugferd/types";
import { getAsset } from "./get-asset";
import { getXsdPath } from "./get-xsd-path";
import type { ValidateResult } from "xsd-schema-validator";

export type XsdPath = string | (() => string);
export type XsdPathMap = Record<string, XsdPath>;

export type XsdValidatorOptions = {
	xsdPathMap?: XsdPathMap;
};

export const xsdValidator = <O extends XsdValidatorOptions>(options?: O) => {
	const xsdPathMap = {
		minimum: () => getAsset("Factur-X_1.07.3_MINIMUM.xsd"),
		"basic-wl": () => getAsset("Factur-X_1.07.3_BASICWL.xsd"),
		basic: () => getAsset("Factur-X_1.07.3_BASIC.xsd"),
		en16931: () => getAsset("Factur-X_1.07.3_EN16931.xsd"),
		extended: () => getAsset("Factur-X_1.07.3_EXTENDED.xsd"),
		...(options?.xsdPathMap ?? {}),
	};

	return {
		id: "validator-xsd",
		run: async (ctx) => {
			const profile = ctx.context.options.profile;
			const xsdPath = await getXsdPath(profile.id, xsdPathMap);

			if (!xsdPath) {
				if (!ctx.context.options.strict) {
					return {
						valid: true,
					};
				}

				return {
					valid: false,
					code: "MISSING_XSD_PATH",
					messages: [`No xsd path found for profile "${profile.id}"`],
				};
			}

			let xsdValidator: any;
			try {
				xsdValidator = await import("xsd-schema-validator");
			} catch {
				throw new Error("Missing dependency `xsd-schema-validator`");
			}

			let res: ValidateResult;
			try {
				res = await xsdValidator.validateXML(ctx.xml, xsdPath);
			} catch (err) {
				if (
					!!err &&
					typeof err === "object" &&
					"valid" in err &&
					typeof err.valid === "boolean"
				) {
					const { valid, messages } = err as Error & ValidateResult;
					return {
						valid,
						messages,
					};
				}

				throw err;
			}

			const { valid, messages } = res;

			return {
				valid,
				messages,
			};
		},
	} satisfies Validator;
};
