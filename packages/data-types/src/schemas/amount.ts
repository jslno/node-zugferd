import type {
	BaseIssue,
	BaseSchema,
	ErrorMessage,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import { getCodelist } from "../storages";
import { addIssue } from "../utils/add-issue";
import { getStandardProps } from "../utils/standard-props";
import type { InferCodeValue } from "./code";

export type AmountConfig<
	Message extends ErrorMessage<AmountIssue> | undefined = any,
> = {
	requireCurrency?: "always" | "optional" | "never" | undefined;
	message?: Message | undefined;
};

export type InferAmountInput<Cfg extends AmountConfig> = Cfg extends {
	requireCurrency: "never";
}
	? string | number
	: Cfg extends { requireCurrency: "always" }
		? {
				value: string | number;
				currency: InferCodeValue<"currency">;
			}
		:
				| string
				| number
				| {
						value: string | number;
						currency?: InferCodeValue<"currency"> | undefined;
				  };

export type InferAmountOutput<Cfg extends AmountConfig> = {
	value: number;
} & (Cfg extends { requireCurrency: "always" }
	? {
			currency: InferCodeValue<"currency">;
		}
	: Cfg extends { requireCurrency: "never" }
		? {
				currency?: undefined;
			}
		: {
				currency?: InferCodeValue<"currency"> | undefined;
			});

export interface AmountIssue extends BaseIssue<unknown> {
	readonly kind: "schema";
	readonly type: "amount";
	readonly expected: "(string | number)";
}

export interface AmountSchema<Cfg extends AmountConfig>
	extends BaseSchema<
		InferAmountInput<Cfg>,
		InferAmountOutput<Cfg>,
		AmountIssue
	> {
	readonly type: "amount";
	readonly reference: typeof amount;
	readonly expects: "(string | number)";
	readonly message: Cfg["message"];
}

export function amount<
	const Message extends ErrorMessage<AmountIssue> | undefined,
	Cfg extends AmountConfig<Message>,
>(
	cfg?: (Cfg & { message?: Message | undefined }) | undefined,
): AmountSchema<Cfg>;
export function amount(
	cfg?: AmountConfig,
): AmountSchema<AmountConfig<ErrorMessage<AmountIssue> | undefined>> {
	return {
		kind: "schema",
		type: "amount",
		reference: amount,
		expects: "(string | number)",
		async: false,
		message: cfg?.message,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, config) {
			const input = dataset.value;

			const normalize = (raw: string | number) => +Number(raw).toFixed(2);

			const succeed = (value: number, currency?: string) => {
				// @ts-expect-error
				dataset.typed = true;
				dataset.value =
					currency === undefined ? { value } : { value, currency };
			};

			if (typeof input === "number" || typeof input === "string") {
				if (isNaN(Number(input)) || cfg?.requireCurrency === "always") {
					addIssue(this, "type", dataset, config);
				} else {
					succeed(normalize(input));
				}
			} else if (
				input &&
				typeof input === "object" &&
				"value" in input &&
				(typeof input.value === "number" || typeof input.value === "string")
			) {
				if (isNaN(Number(input.value))) {
					addIssue(this, "type", dataset, config);
				} else if ("currency" in input && typeof input.currency === "string") {
					const codelist = getCodelist("currency");
					const currency = input.currency;
					if (codelist && !codelist.some((c) => c.value === currency)) {
						addIssue(this, "type", dataset, config);
					} else {
						succeed(normalize(input.value), currency);
					}
				} else if (cfg?.requireCurrency === "always") {
					addIssue(this, "type", dataset, config);
				} else {
					succeed(normalize(input.value));
				}
			} else {
				addIssue(this, "type", dataset, config);
			}

			return dataset as unknown as OutputDataset<
				InferAmountOutput<AmountConfig>,
				AmountIssue
			>;
		},
	};
}
