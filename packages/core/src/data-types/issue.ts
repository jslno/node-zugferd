import type { MaybeReadonly } from "../types/utils";
import type { Config } from "./config";

export interface BaseIssue<Input> extends Config<BaseIssue<Input>> {
	readonly kind: "schema" | "validation" | "transformation";
	readonly type: string;
	readonly input: Input;
	readonly expected: string | null;
	readonly received: string;
	readonly message: string;
	readonly requirement?: unknown | undefined;
	readonly path?: [IssuePathItem, ...IssuePathItem[]] | undefined;
	readonly issues?: [BaseIssue<Input>, ...BaseIssue<Input>[]] | undefined;
}

export type IssuePathItem = ArrayPathItem | ObjectPathItem | UnknownPathItem;

/**
 * Array path item interface.
 */
export interface ArrayPathItem {
	/**
	 * The path item type.
	 */
	readonly type: "array";
	/**
	 * The path item origin.
	 */
	readonly origin: "value";
	/**
	 * The path item input.
	 */
	readonly input: MaybeReadonly<unknown[]>;
	/**
	 * The path item key.
	 */
	readonly key: number;
	/**
	 * The path item value.
	 */
	readonly value: unknown;
}

/**
 * Object path item interface.
 */
export interface ObjectPathItem {
	/**
	 * The path item type.
	 */
	readonly type: "object";
	/**
	 * The path item origin.
	 */
	readonly origin: "key" | "value";
	/**
	 * The path item input.
	 */
	readonly input: Record<string, unknown>;
	/**
	 * The path item key.
	 */
	readonly key: string;
	/**
	 * The path item value.
	 */
	readonly value: unknown;
}

/**
 * Unknown path item interface.
 */
export interface UnknownPathItem {
	/**
	 * The path item type.
	 */
	readonly type: "unknown";
	/**
	 * The path item origin.
	 */
	readonly origin: "key" | "value";
	/**
	 * The path item input.
	 */
	readonly input: unknown;
	/**
	 * The path item key.
	 */
	readonly key: unknown;
	/**
	 * The path item value.
	 */
	readonly value: unknown;
}
