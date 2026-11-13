/**
 * An XSD schema stored inline as source text.
 *
 * Use this form in runtimes without a filesystem, such as Cloudflare Workers
 * or the browser. The bundled Factur-X, XRechnung, and Order-X definitions use
 * it.
 */
export type InlineSchema = {
	/** Contents of the root XSD file. */
	content: string;
	/** Contents of imported or included XSD files, keyed by file name. */
	imports?: Record<string, string> | undefined;
};

/**
 * An XSD schema read from the filesystem at validation time.
 */
export type FileSchema = {
	/** Path to the root XSD file. */
	path: string;
	/** Directory used to resolve imported or included XSD files. */
	dir?: string | undefined;
};

export type SchemaMapEntry = InlineSchema | FileSchema;
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
