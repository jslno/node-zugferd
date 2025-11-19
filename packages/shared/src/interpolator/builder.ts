import type { InterpolateSchemaContext } from "@node-zugferd/core";
import { ZugferdError } from "@node-zugferd/core/error";
import { type AssignOptions, assign } from "../utils/assign";

const SUPPORTED_PROFILES = [
	"minimum",
	"basic-wl",
	"basic",
	"en16931",
	"xrechnung",
	"extended",
] as const;
type SupportedProfile = (typeof SUPPORTED_PROFILES)[number];

type Group = (ctx: InterpolateSchemaContext) => Record<string, any>;
type BuilderAssignOptions = AssignOptions & {
	minProfile?: SupportedProfile | undefined;
};

export class ZugferdBuilder {
	result: Record<string, any> = {};

	constructor(protected context: InterpolateSchemaContext) {
		if (!ZugferdBuilder.supportsProfile(context.id)) {
			throw new ZugferdError(`Unsupported profile "${context.id}".`);
		}
	}

	private shouldAssignForProfile(minProfile: SupportedProfile) {
		return (
			SUPPORTED_PROFILES.indexOf(this.context.id as SupportedProfile) >=
			SUPPORTED_PROFILES.indexOf(minProfile)
		);
	}

	runIfMinProfile(minProfile: SupportedProfile, cb: (builder: this) => void) {
		if (this.shouldAssignForProfile(minProfile)) {
			cb(this);
		}
		return this;
	}

	assign(group: Group, options?: BuilderAssignOptions | undefined): this;
	assign(
		path: string,
		value: string | number | boolean | object | undefined | null | Group,
		options?: BuilderAssignOptions | undefined,
	): this;
	assign(
		pathOrGroup: string | Group,
		value:
			| string
			| number
			| boolean
			| object
			| undefined
			| null
			| Group
			| BuilderAssignOptions,
		options?: BuilderAssignOptions | undefined,
	) {
		if (
			options?.minProfile &&
			!this.shouldAssignForProfile(options.minProfile)
		) {
			return this;
		}
		if (arguments.length === 2 && typeof value === "object" && value !== null) {
			options = value as BuilderAssignOptions | undefined;
			value = undefined;
		}
		if (typeof pathOrGroup === "function") {
			pathOrGroup(this.context);
		} else if (value !== undefined) {
			if (typeof value === "function") {
				value = (value as Group)(this.context);
			}
			assign(
				this.result,
				pathOrGroup,
				value instanceof ZugferdBuilder ? value.result : value,
				options,
			);
		}
		return this;
	}

	static factory(ctx: InterpolateSchemaContext) {
		return () => new ZugferdBuilder(ctx);
	}

	static supportsProfile(profile: string): profile is SupportedProfile {
		return SUPPORTED_PROFILES.includes(profile as SupportedProfile);
	}

	static createGroup(
		cb: (builder: ZugferdBuilder, ctx: InterpolateSchemaContext) => void,
	) {
		return (ctx: InterpolateSchemaContext) => {
			if (!this.supportsProfile(ctx.id)) {
				throw new ZugferdError(`Unsupported profile "${ctx.id}".`);
			}
			const builder = new ZugferdBuilder(ctx);
			cb(builder, ctx);
			return builder.result;
		};
	}
}
