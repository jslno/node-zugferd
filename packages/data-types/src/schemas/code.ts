import type {
	Codelist,
	ZugferdCodelistRegistryIdentifier,
	ZugferdCodelistRegistryValue,
} from "@node-zugferd/core";
import type {
	BaseIssue,
	BaseSchema,
	OutputDataset,
} from "@node-zugferd/core/data-types";
import { getCodelist } from "../storages/codelist";
import { addIssue } from "../utils/add-issue";
import { getStandardProps } from "../utils/standard-props";

export type InferCodeValue<Id extends ZugferdCodelistRegistryIdentifier> =
	ZugferdCodelistRegistryValue<Id> extends infer R extends Codelist
		? R[number]["value"]
		: null;

export interface CodeSchema<Id extends ZugferdCodelistRegistryIdentifier>
	extends BaseSchema<
		InferCodeValue<Id>,
		InferCodeValue<Id>,
		BaseIssue<unknown>
	> {
	readonly type: "code";
	readonly reference: typeof code;
	readonly expects: `a code of the codelist ${Id}`;
	readonly codelistId: Id;
}

export function code<const Id extends ZugferdCodelistRegistryIdentifier>(
	id: Id,
): CodeSchema<Id> {
	return {
		kind: "schema",
		type: "code",
		reference: code,
		expects: `a code of the codelist ${id}`,
		async: false,
		codelistId: id,
		get "~standard"() {
			return getStandardProps(this);
		},
		"~run"(dataset, config) {
			if (typeof dataset.value === "string") {
				const codelist = getCodelist(id);
				if (!codelist) {
					throw new Error(`Codelist with id "${id}" not found in registry.`);
				}
				if (codelist.some((code) => code.value === dataset.value)) {
					// @ts-expect-error
					dataset.typed = true;
				} else {
					addIssue(this, "codelist", dataset, config, {
						received: id,
						expected: "a code of a specified codelist",
					});
				}
			} else {
				addIssue(this, "type", dataset, config);
			}

			return dataset as unknown as OutputDataset<
				InferCodeValue<Id>,
				BaseIssue<unknown>
			>;
		},
	};
}
