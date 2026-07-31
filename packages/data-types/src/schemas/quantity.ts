import type {
	BaseIssue,
	BaseSchema,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import { getStandardProps } from "../utils/standard-props";
import type {
	Codelist,
	ZugferdCodelistRegistryValue,
} from "@node-zugferd/core/types";
import { getCodelist } from "../storages";
import { addIssue } from "../utils/add-issue";

type UnitCode =
	ZugferdCodelistRegistryValue<"code"> extends infer R extends Codelist
		? R[number]["value"]
		: string;

export type InferQuantityInput<Cfg extends QuantityConfig> = Cfg extends {
	requireUnitCode: "never";
}
	? string | number
	: Cfg extends { requireUnitCode: "optional" }
		?
				| string
				| number
				| {
						value: string | number;
						unitCode?: UnitCode | undefined;
				  }
		: {
				value: string | number;
				unitCode: UnitCode;
			};

export type InferQuantityOutput<Cfg extends QuantityConfig> = Cfg extends {
	requireUnitCode: "never";
}
	? { value: number; unitCode?: never }
	: Cfg extends { requireUnitCode: "optional" }
		? {
				value: number;
				unitCode?: UnitCode | undefined;
			}
		: {
				value: number;
				unitCode: UnitCode;
			};

export interface QuantitySchema<Cfg extends QuantityConfig>
	extends BaseSchema<
		InferQuantityInput<Cfg>,
		InferQuantityOutput<Cfg>,
		BaseIssue<unknown>
	> {
	readonly type: "quantity";
	readonly reference: typeof quantity;
	readonly config: QuantityConfig | undefined;
}

export type QuantityConfig = {
	/*
	 * @default "always"
	 */
	requireUnitCode?: "always" | "optional" | "never" | undefined;
};

export function quantity<const Cfg extends QuantityConfig>(
	config?: Cfg | undefined,
): QuantitySchema<Cfg>;
export function quantity(
	config_?: QuantityConfig,
): QuantitySchema<QuantityConfig> {
	const config = {
		requireUnitCode: "always",
		...config_,
	} satisfies QuantityConfig;
	return {
		kind: "schema",
		type: "quantity",
		async: false,
		reference: quantity,
		// TOOD: better expects message
		expects: "(number | object)",
		config,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, cfg) {
			let value: number | string | undefined = undefined;
			let unitCode: UnitCode | undefined = undefined;

			if (
				typeof dataset.value === "string" ||
				typeof dataset.value === "number"
			) {
				value = dataset.value;
			} else if (
				dataset.value !== null &&
				typeof dataset.value === "object" &&
				"value" in dataset.value &&
				(typeof dataset.value.value === "string" ||
					typeof dataset.value.value === "number")
			) {
				value = dataset.value.value;
				if (
					"unitCode" in dataset.value &&
					typeof dataset.value.unitCode === "string"
				) {
					const codelist = getCodelist("unit");
					if (
						codelist &&
						!codelist.some(
							(item) => item.value === (dataset.value as any).unitCode,
						)
					) {
						addIssue(this, "unitCode", dataset, cfg);
					} else {
						unitCode = dataset.value.unitCode;
					}
				}
			}

			if (value !== undefined && !Number.isNaN(Number(value))) {
				value = Number(value);

				if (config.requireUnitCode === "always" && !unitCode) {
					addIssue(this, "unitCode", dataset, cfg);
				}

				if (!dataset.issues) {
					// @ts-expect-error
					dataset.typed = true;
					dataset.value = {
						value,
						unitCode,
					};
				}
			} else {
				addIssue(this, "type", dataset, cfg);
			}

			return dataset as unknown as OutputDataset<
				InferQuantityOutput<QuantityConfig>,
				BaseIssue<unknown>
			>;
		},
	};
}
