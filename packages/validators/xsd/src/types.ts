export type SchemaMapEntry = {
	path: string;
	dir?: string | undefined;
};
export type SchemaMap = Record<string, SchemaMapEntry>;

export type XSDOptions = {
	/**
	 * Whether to automatically run validation after processing the document.
	 *
	 * @default true
	 */
	autoRun?: boolean | undefined;
	schemaMap?: SchemaMap | undefined;
};

export type ResolvedXSDOptions<
	Opts extends XSDOptions = XSDOptions,
	BundledXsdPaths extends SchemaMap = SchemaMap,
> = Omit<Opts, "autoRun" | "schemaMap"> & {
	autoRun: boolean;
	schemaMap: BundledXsdPaths &
		(Opts["schemaMap"] extends SchemaMap ? Opts["schemaMap"] : {});
};
