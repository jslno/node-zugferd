import type {
	ZugferdCodelistRegistryIdentifier,
	ZugferdCodelistRegistryValue,
} from "@node-zugferd/core";
import { getStore } from "./utils";

export type CodelistStorage = Map<
	ZugferdCodelistRegistryIdentifier,
	ZugferdCodelistRegistryValue<ZugferdCodelistRegistryIdentifier>
>;

const symbol = Symbol.for("node-zugferd::storage:codelist");

export const getCodelistStore = () =>
	getStore<CodelistStorage>(symbol, new Map());

export function registerCodelist<Id extends ZugferdCodelistRegistryIdentifier>(
	id: Id,
	codelist: ZugferdCodelistRegistryValue<Id>,
) {
	const store = getCodelistStore();
	store.set(id, codelist);
}

export function getCodelist<Id extends ZugferdCodelistRegistryIdentifier>(
	id: Id,
): ZugferdCodelistRegistryValue<Id> | undefined {
	const store = getCodelistStore();
	return store.get(id) as ZugferdCodelistRegistryValue<Id> | undefined;
}
