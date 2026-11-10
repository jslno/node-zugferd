import type { BaseTransformation } from "../types/transformation";
import type { ArrayInput } from "./types";

type ArrayAction<TInput extends ArrayInput> = (
	itemA: TInput[number],
	itemB: TInput[number],
) => number;

export interface SortItemsAction<TInput extends ArrayInput>
	extends BaseTransformation<TInput, TInput, never> {
	readonly type: "sort_items";
	readonly reference: typeof sortItems;
	readonly operation: ArrayAction<TInput> | undefined;
}

export function sortItems<TInput extends ArrayInput>(
	operation?: ArrayAction<TInput>,
): SortItemsAction<TInput>;
export function sortItems(
	operation?: ArrayAction<unknown[]>,
): SortItemsAction<unknown[]> {
	return {
		kind: "transformation",
		type: "sort_items",
		reference: sortItems,
		async: false,
		operation,
		"~run"(dataset) {
			dataset.value = dataset.value.sort(this.operation);
			return dataset;
		},
	};
}
