export type KositOptions = {
	/**
	 * Whether to automatically run validation after processing the document.
	 *
	 * @default true
	 */
	autoRun?: boolean | undefined;
	/**
	 * Whether to fail on warnings.
	 *
	 * Warnings include rules that KoSIT downgrades from error to warning in its
	 * validator configuration.
	 *
	 * @default false
	 */
	failOnWarnings?: boolean | undefined;
};

export type ResolvedKositOptions = Required<{
	[K in keyof KositOptions]: Exclude<KositOptions[K], undefined>;
}>;
