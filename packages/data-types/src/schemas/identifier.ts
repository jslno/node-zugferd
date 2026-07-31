import type { Prettify } from "@node-zugferd/core";
import type {
	BaseIssue,
	BaseSchema,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import type {
	IdentifierRegistryId,
	IdentifierRegistryValue,
} from "../storages/identifier";
import { getIdentifierScheme } from "../storages/identifier";
import { addIssue } from "../utils/add-issue";
import { getStandardProps } from "../utils/standard-props";

export type Identifier = bigint | boolean | number | string | symbol;

export interface IdentifierIssue extends BaseIssue<unknown> {
	readonly kind: "schema";
	readonly type: "identifier";
	readonly expected: string;
}

type InferIdentifierInputValue<Id> = [Id] extends [IdentifierRegistryId]
	? IdentifierRegistryValue<Id>["values"] extends Set<infer V>
		? V
		: never
	: string;

export type InferIdentifierInput<Id, Cfg extends IdentifierConfig> = Prettify<
	Cfg extends {
		requireSchemeId: "never";
		requireSchemeVersion?: "never" | undefined;
	}
		? string
		:
				| (Cfg extends { requireSchemeId: "always" } ? never : string)
				| ({
						value: string;
				  } & (Cfg extends { requireSchemeId: "always" }
						? {
								schemeId: InferIdentifierInputValue<Id>;
							}
						: Cfg extends { requireSchemeId: "never" }
							? {}
							: {
									schemeId?: InferIdentifierInputValue<Id> | undefined;
								}) &
						(Cfg extends { requireSchemeVersion: "always" }
							? {
									schemeVersion: string;
								}
							: Cfg extends { requireSchemeVersion: "optional" }
								? {
										schemeVersion?: string;
									}
								: {}))
>;

export type InferIdentifierOutput<Id, Cfg extends IdentifierConfig> = Prettify<
	[Id] extends [IdentifierRegistryId]
		? {
				identifier: string;
			} & (Cfg extends { requireSchemeId: "always" }
				? {
						schemeId: IdentifierRegistryValue<Id>["values"] extends Set<infer V>
							? V
							: never;
					}
				: {
						schemeId?:
							| (IdentifierRegistryValue<Id>["values"] extends Set<infer V>
									? V
									: never)
							| undefined;
					})
		: Cfg extends { requireSchemeId: "never" }
			? {
					identifier: string;
					schemeId?: undefined;
				}
			: {
					identifier: string;
				} & (Cfg extends { requireSchemeId: "always" }
					? {
							schemeId: string;
						}
					: {
							schemeId?: string | undefined;
						}) &
					(Cfg extends { requireSchemeVersion: "always" }
						? {
								schemeVersion: string;
							}
						: Cfg extends { requireSchemeVersion: "optional" }
							? {
									schemeVersion?: string | undefined;
								}
							: {
									schemeVersion?: undefined;
								})
>;

export interface IdentifierSchema<
	Id extends IdentifierRegistryId | undefined,
	Cfg extends IdentifierConfig,
> extends BaseSchema<
		InferIdentifierInput<Id, Cfg>,
		InferIdentifierOutput<Id, Cfg>,
		BaseIssue<unknown>
	> {
	readonly type: "identifier";
	readonly reference: typeof identifier;
	readonly registryId: [Id] extends [IdentifierRegistryId]
		? Id
		: string | undefined;
	readonly config: Cfg | undefined;
	// readonly message: Message;
}

export type IdentifierConfig = {
	/**
	 * @default "optional"
	 */
	requireSchemeId?: "always" | "optional" | "never" | undefined;
	/**
	 * @default "never"
	 */
	requireSchemeVersion?: "always" | "optional" | "never" | undefined;
};

export function identifier<const Cfg extends IdentifierConfig>(
	cfg?: Cfg | undefined,
): IdentifierSchema<undefined, Cfg>;
export function identifier<
	const Id extends IdentifierRegistryId | undefined,
	const Cfg extends Omit<IdentifierConfig, "requireSchemeId"> & {
		requireSchemeId?:
			| Exclude<IdentifierConfig["requireSchemeId"], "never">
			| undefined;
	},
>(id: Id, cfg?: Cfg | undefined): IdentifierSchema<Id, Cfg>;
export function identifier(
	idOrCfg?: IdentifierRegistryId | IdentifierConfig | undefined,
	cfg?: IdentifierConfig | undefined,
): IdentifierSchema<IdentifierRegistryId | undefined, IdentifierConfig> {
	let id: IdentifierRegistryId | undefined = undefined;
	let config: IdentifierConfig | undefined = undefined;
	if (typeof idOrCfg === "string") {
		id = idOrCfg;
	} else if (typeof idOrCfg === "object" && idOrCfg !== null) {
		config = idOrCfg;
	}
	if (typeof cfg === "object" && cfg !== null) {
		config = cfg;
	}

	return {
		kind: "schema",
		type: "identifier",
		async: false,
		reference: identifier,
		// TODO: better expects message
		expects: "(string | object)",
		config,
		registryId: id,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, cfg) {
			const value = dataset.value;

			// string form
			if (typeof value === "string") {
				if (config?.requireSchemeId === "always") {
					addIssue(this, "type", dataset, cfg);
					return dataset as any;
				}

				// @ts-expect-error
				dataset.typed = true;
				dataset.value = {
					identifier: value,
				};

				return dataset as any;
			}

			// object form
			if (!value || typeof value !== "object") {
				addIssue(this, "type", dataset, cfg);
				return dataset as any;
			}

			const hasValue = "value" in value && typeof value.value === "string";

			if (!hasValue) {
				addIssue(this, "type", dataset, cfg);
				return dataset as any;
			}

			const schemeId =
				"schemeId" in value && typeof value.schemeId === "string"
					? value.schemeId
					: undefined;

			const schemeVersion =
				"schemeVersion" in value && typeof value.schemeVersion === "string"
					? value.schemeVersion
					: undefined;

			// requireSchemeId
			if (config?.requireSchemeId === "always" && !schemeId) {
				addIssue(this, "type", dataset, cfg);
			}

			if (config?.requireSchemeId === "never" && schemeId) {
				addIssue(this, "type", dataset, cfg);
			}

			// validate registry values
			if (schemeId && id) {
				const { values } = getIdentifierScheme(id);

				if (!values.has(schemeId as any)) {
					addIssue(this, "type", dataset, cfg);
				}
			}

			// requireSchemeVersion
			if (config?.requireSchemeVersion === "always" && !schemeVersion) {
				addIssue(this, "type", dataset, cfg);
			}

			if (config?.requireSchemeVersion === "never" && schemeVersion) {
				addIssue(this, "type", dataset, cfg);
			}

			if (!dataset.issues) {
				// @ts-expect-error
				dataset.typed = true;

				dataset.value = {
					identifier: value.value,
					...(schemeId ? { schemeId } : {}),
					...(schemeVersion ? { schemeVersion } : {}),
				};
			}

			return dataset as unknown as OutputDataset<
				InferIdentifierOutput<
					IdentifierRegistryId | undefined,
					IdentifierConfig
				>,
				BaseIssue<unknown>
			>;
		},
	};
}
