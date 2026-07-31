import type {
	BaseIssue,
	BaseSchema,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import { addIssue } from "../utils/add-issue";
import { getStandardProps } from "../utils/standard-props";

export interface DateIssue extends BaseIssue<unknown> {
	readonly kind: "schema";
	readonly type: "date";
	readonly expected: "(Date | number | string)";
}

export type DateInput = Date | number | string;
export type DateOutput = {
	date: Date;
	value: string;
	format: DateFormat;
};

export interface DateSchema
	extends BaseSchema<DateInput, DateOutput, DateIssue> {
	readonly type: "date";
	readonly reference: typeof date;
	readonly expects: "(Date | number | string)";
	readonly config: DateConfig;
}

const dateFormats = {
	"102": {
		matches: (value: string) => /^\d{8}$/.test(value),
		format: (date: Date) =>
			`${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`,
		parse(value: string) {
			if (!this.matches(value)) return null;
			return null;
		},
	},
	"203": {
		matches: (value: string) => /^\d{12}$/.test(value),
		format: (date: Date) =>
			`${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}${String(date.getHours()).padStart(2, "0")}${String(date.getMinutes()).padStart(2, "0")}`,
		parse(value: string) {
			if (!this.matches(value)) return null;

			const year = Number(value.slice(0, 4));
			const month = Number(value.slice(4, 6)) - 1;
			const day = Number(value.slice(6, 8));
			const hours = Number(value.slice(8, 10));
			const minutes = Number(value.slice(10, 12));

			const date = new Date(year, month, day, hours, minutes);
			return !isNaN(+date) ? date : null;
		},
	},
} satisfies Record<
	string,
	{
		format: (date: Date) => string;
		matches: (value: string) => boolean;
		parse: (value: string) => Date | null;
	}
>;

function detectFormat(value: string): DateFormat | null {
	for (const [format, { matches }] of Object.entries(dateFormats)) {
		if (matches(value)) {
			return format as DateFormat;
		}
	}

	return null;
}

export type DateFormat = keyof typeof dateFormats;
export interface DateConfig<
	InputFormats extends DateFormat[] = DateFormat[],
	OutputFormat extends InputFormats[number] = InputFormats[0],
> {
	/**
	 * @default ["102"]
	 */
	inputFormats?: InputFormats | undefined;
	outputFormat?: OutputFormat | undefined;
}

export function date<
	InputFormats extends DateFormat[] = ["102"],
	OutputFormat extends InputFormats[number] = InputFormats[number],
>(cfg?: DateConfig<InputFormats, OutputFormat> | undefined): DateSchema {
	const config = {
		inputFormats: ["102"],
		...cfg,
	} satisfies DateConfig;
	return {
		kind: "schema",
		type: "date",
		reference: date,
		expects: "(Date | number | string)",
		async: false,
		config,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, cfg) {
			if (
				dataset.value instanceof Date ||
				typeof dataset.value === "string" ||
				typeof dataset.value === "number"
			) {
				let date = new Date(dataset.value);
				if (typeof dataset.value === "string" && isNaN(+date)) {
					const format = detectFormat(dataset.value);
					if (format && config.inputFormats.includes(format as any)) {
						const { parse } = dateFormats[format];
						date = parse(dataset.value) ?? new Date(Number.NaN);
					}
				}
				if (!isNaN(+date)) {
					const formatId =
						config.outputFormat ??
						config.inputFormats[0] ??
						((): DateFormat => {
							if (config.inputFormats.includes("203" as any)) {
								if (date.getHours() !== 0 || date.getMinutes() !== 0) {
									return "203";
								}
							}
							return "102";
						})();
					const { format } = dateFormats[formatId];

					// @ts-expect-error
					dataset.typed = true;
					dataset.value = {
						date,
						value: format(date),
						format: formatId,
					};
				} else {
					addIssue(this, "type", dataset, cfg, {
						received: '"Invalid Date"',
					});
				}
			} else {
				addIssue(this, "type", dataset, cfg);
			}
			return dataset as unknown as OutputDataset<DateOutput, DateIssue>;
		},
	};
}
