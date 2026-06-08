export type MustangOptions = {
	/**
	 * @default os.tmpdir()
	 */
	tempDir?: string | undefined;
	/**
	 * Initial heap size for the Java Virtual Machine in megabytes.
	 */
	initialHeapSize?: number | undefined;
	/**
	 * Maximum heap size for the Java Virtual Machine in megabytes.
	 *
	 * @default 1024 (1GB)
	 */
	maximumHeapSize?: number | "inherit" | undefined;
	/**
	 * Whether to automatically run validation after generating the XML.
	 *
	 * @default true
	 */
	autoRun?: boolean | undefined;
	/**
	 * Language for messages returned by the Mustang validator.
	 *
	 * @default "en"
	 */
	language?: "en" | "de" | "fr" | undefined;
};
