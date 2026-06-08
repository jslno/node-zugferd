import type { BaseIssue } from "./issue";

export interface UnknownDataset {
	/**
	 * Whether is's typed.
	 */
	typed?: false;
	/**
	 * The dataset value.
	 */
	value: unknown;
	/**
	 * The dataset issues.
	 */
	issues?: undefined;
}

export interface SuccessDataset<Value> {
	/**
	 * Whether is's typed.
	 */
	typed: true;
	/**
	 * The dataset value.
	 */
	value: Value;
	/**
	 * The dataset issues.
	 */
	issues?: undefined;
}

export interface PartialDataset<Value, Issue extends BaseIssue<unknown>> {
	/**
	 * Whether is's typed.
	 */
	typed: true;
	/**
	 * The dataset value.
	 */
	value: Value;
	/**
	 * The dataset issues.
	 */
	issues: [Issue, ...Issue[]];
}

export interface FailureDataset<Issue extends BaseIssue<unknown>> {
	/**
	 * Whether is's typed.
	 */
	typed: false;
	/**
	 * The dataset value.
	 */
	value: unknown;
	/**
	 * The dataset issues.
	 */
	issues: [Issue, ...Issue[]];
}

export type OutputDataset<Value, Issue extends BaseIssue<unknown>> =
	| SuccessDataset<Value>
	| PartialDataset<Value, Issue>
	| FailureDataset<Issue>;
