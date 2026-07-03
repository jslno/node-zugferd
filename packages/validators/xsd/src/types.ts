export type XSDOptions = {
	/**
	 * Whether to automatically run validation after processing the document.
	 *
	 * @default true
	 */
	autoRun?: boolean | undefined;
	xsdPathMap?: Record<string, string> | undefined;
};

export type ResolvedXSDOptions<
	Opts extends XSDOptions = XSDOptions,
	BundledXsdPaths extends Record<string, string> = Record<string, string>,
> = Omit<Opts, "autoRun" | "xsdPathMap"> & {
	autoRun: boolean;
	xsdPathMap: BundledXsdPaths &
		(Opts["xsdPathMap"] extends Record<string, string>
			? Opts["xsdPathMap"]
			: {});
};
