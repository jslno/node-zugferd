export type ImportInput = (
	| {
			default: ImportEntry;
			imports?: never;
	  }
	| {
			default?: Omit<ImportEntry, "asType"> | undefined;
			imports?: ImportEntry[] | undefined;
	  }
) & {
	path: string;
};

export interface Import {
	default: ImportEntry | null;
	imports: ImportEntry[] | null;
	path: string;
	hasImports: boolean;
	hasNamedImports: boolean;
	hasDefaultImport: boolean;
	allImportsAreTypes: boolean;
	toString(): string;
}

type ImportEntry = {
	name: string;
	alias?: string | undefined;
	asType?: boolean | undefined;
};

export function createImport({
	path,
	default: defaultImport,
	imports,
}: ImportInput): Import {
	const hasDefaultImport = !!defaultImport;
	const hasNamedImports = !!imports && imports.length > 0;

	return {
		path,
		hasDefaultImport,
		hasNamedImports,
		hasImports: hasDefaultImport || hasNamedImports,
		allImportsAreTypes:
			(!hasNamedImports &&
				defaultImport &&
				"asType" in defaultImport &&
				defaultImport.asType === true) ||
			(!hasDefaultImport && !!imports && imports.every((imp) => imp.asType)),
		default: defaultImport ?? null,
		imports: hasNamedImports ? imports : null,
		toString() {
			const format = ({ name, alias, asType = false }: ImportEntry) =>
				`${asType && !this.allImportsAreTypes ? "type " : ""}${name}${alias ? ` as ${alias}` : ""}`.trim();
			return `import${
				this.hasImports
					? ` ${this.allImportsAreTypes ? "type " : ""}${[
							defaultImport ? format(defaultImport) : undefined,
							!!imports && imports.length > 0
								? `{ ${[...imports]
										.sort((a, b) =>
											(b.alias || a.name).localeCompare(b.alias || b.name),
										)
										.map(format)
										.join(", ")} }`
								: undefined,
						]
							.filter(Boolean)
							.join(", ")} from`
					: ""
			} "${path}";`;
		},
	};
}

function mergeImports(a: Import, ...b: Import[]): Import {
	let defaultImport: ImportEntry | undefined;
	const named = new Map<string, ImportEntry>();

	for (const imp of [a, ...b]) {
		if (imp.default) {
			if (!defaultImport) {
				defaultImport = { ...imp.default };
			} else {
				const same =
					defaultImport.name === imp.default.name &&
					defaultImport.alias === imp.default.alias &&
					defaultImport.asType === imp.default.asType;

				if (!same) {
					throw new Error(`Conflicting default imports for "${imp.path}".`);
				}
			}
		}

		for (const entry of imp.imports ?? []) {
			const key = `${entry.name}:${entry.alias ?? ""}`;

			const existing = named.get(key);

			if (!existing) {
				named.set(key, { ...entry });
			} else if (existing.asType && !entry.asType) {
				existing.asType = false;
			}
		}
	}

	return createImport({
		path: a.path,
		default: defaultImport,
		imports: named.size > 0 ? [...named.values()] : undefined,
	});
}

const checkConflictingImports = (imports: Import[]) => {
	const seen = new Set<string>();

	for (const entry of imports) {
		for (const imp of [entry.default, ...(entry.imports ?? [])].filter(
			(v): v is ImportEntry => !!v,
		)) {
			const key = `${imp.asType ? "type:" : ""}${imp.alias || imp.name}`;
			if (seen.has(key)) {
				throw new Error(
					`Conflicting imports for variable "${imp.alias || imp.name}" from "${entry.path}".`,
				);
			}
			seen.add(key);
		}
	}
};

export function processImports(imports: Import[]) {
	const result: Import[] = [];

	const groupedImports = imports.reduce(
		(acc, imp) => {
			acc[imp.path] = [...(acc[imp.path] ?? []), imp];
			return acc;
		},
		{} as Record<string, Import[]>,
	);

	for (const group of Object.values(groupedImports)) {
		if (group.length === 0) continue;

		const merged =
			group.length > 1 ? mergeImports(group[0]!, ...group.slice(1)) : group[0]!;

		const shouldSplit =
			merged.default &&
			merged.imports &&
			merged.imports.length > 0 &&
			(merged.default.name === "*" ||
				(merged.default.asType && !merged.imports.every((i) => i.asType)));

		if (shouldSplit) {
			result.push(
				createImport({
					path: merged.path,
					default: merged.default ?? undefined,
				}),
			);

			result.push(
				createImport({
					path: merged.path,
					imports: merged.imports ?? undefined,
				}),
			);

			continue;
		}

		result.push(merged);
	}

	checkConflictingImports(result);
	return result.sort((a, b) => a.path.localeCompare(b.path));
}
