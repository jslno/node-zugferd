import { XMLParser } from "fast-xml-parser";
import path from "path";
import { z, type ZodType } from "zod";
import { createTypeAlias, printNode, zodToTs } from "zod-to-ts";
import { mkdir, writeFile } from "fs/promises";
import serialize from "serialize-javascript";
import { Biome } from "@biomejs/js-api/nodejs";
import { load as loadHTML } from "cheerio";

export const WORKSPACE_ROOT = path.resolve(__dirname, "../../");
export const PROJECT_ROOT = path.resolve(WORKSPACE_ROOT, "../../");
const BASE_PATH = "./src/codelists";

type LiteralString = "" | (string & Record<never, never>);
type Promisable<T> = T | Promise<T>;
export type Arrayable<T> = T | T[];

export const arrayable = <T>(input: Arrayable<T>): T[] => {
	return !Array.isArray(input) ? [input] : input;
};

export type Import = {
	asType?: boolean;
	path: string;
	name?: string;
	variables?: Arrayable<{
		asType?: boolean;
		name: string;
		as?: string;
	}>;
};

export type CreateParserResult<
	Definition extends ZodType<object> = ZodType<object>,
> = {
	path: string;
	source: string;
	identifier: LiteralString;
	secondaryIdentifier: LiteralString;
	destination: string;
	definition: Definition;
	imports?: Import[];
	constants?: Record<
		string,
		{
			value: unknown;
			type?: ZodType;
			asConst?: boolean;
			/**
			 * @default "before-satisfies"
			 */
			asPosition?: "before-satisfies" | "after-satisfies";
			satisfies?: string | ZodType;
			/**
			 * @default "const"
			 */
			mode?: "let" | "const";
			export?: boolean;
		}
	>;
	typeDefs?: Record<
		string,
		{
			export?: boolean;
			type: ZodType;
		}
	>;
	data: z.input<Definition>[];
	enum: {
		key?: keyof z.infer<Definition>;
		value: keyof z.infer<Definition>;
	};
	docs?: {
		path: string;
		title: string;
		description: string;
		priority?: number;
		importPath?: string;
		sidebar?: {
			disabled?: boolean;
			title?: string;
		};
		table?: {
			className?:
				| string
				| {
						root?: string;
						row?: string;
						head?: string;
						body?: string;
				  };
			columns?: Partial<
				Record<
					keyof z.infer<Definition>,
					{
						disabled?: boolean;
						label?: string;
						className?:
							| string
							| {
									col?: string;
									header?: string;
									row?: string;
							  };
						transform?: (value: any, row: z.infer<Definition>) => string;
					}
				>
			>;
		};
	};
};

const HIDE_COLUMN = {
	disabled: true,
} as const;

const CODE_COLUMN = {
	label: "Code",
	transform: (value: unknown) => `<code>${value}</code>`,
} as const;

export type ParserContext = {
	HIDE_COLUMN: typeof HIDE_COLUMN;
	CODE_COLUMN: typeof CODE_COLUMN;
	toScreamingSnakeCase: typeof toScreamingSnakeCase;
	getTextNode: typeof getTextNode;
	parseXML: typeof parseXML;
	parseUneceList: typeof parseUneceList;
	serializePath: typeof deserializePath;
	deserializePath: typeof serializePath;
};

const parseUneceList = async (url: string) => {
	const response = await fetch(url);
	const html = await response.text();

	const $ = loadHTML(html);
	const preText = $("pre").text();
	const lines = preText.split(/\r?\n/);

	const data: {
		key: string;
		name: string;
		value: string;
		description: string;
	}[] = [];
	let current = null;

	for (const line of lines) {
		const match = line.match(/^\s*([A-Z0-9]{1,3})\s{2,}(.+)/);
		if (match) {
			if (current) {
				data.push(current);
			}
			const name = match[2]?.trim();

			current = {
				key: toScreamingSnakeCase(name),
				name,
				value: match[1]?.trim(),
				description: "",
			};
		} else if (current) {
			const descLine = line.trim();
			if (descLine) {
				current.description += (current.description ? " " : "") + descLine;
			}
		}
	}

	if (current) {
		data.push(current);
	}

	return data;
};

const parseXML = <R = any>(xml: string | Buffer) => {
	const parser = new XMLParser({
		ignoreAttributes: false,
		parseTagValue: false,
		attributeNamePrefix: "@",
		textNodeName: "#",
	});

	return parser.parse(xml) as R;
};

const toScreamingSnakeCase = (input: string) => {
	return input
		.normalize("NFD")
		.replace(/([a-z0-9])([A-Z])/g, "$1_$2")
		.replace(/[\s\-]+/g, "_")
		.replace(/[^a-zA-Z0-9_]/g, "")
		.toUpperCase();
};

const getTextNode = (node: string | { "#": string }) => {
	if (typeof node === "object" && "#" in node) {
		return node["#"];
	}

	return node;
};

const deserializePath = (path: string) => {
	if (path === "") {
		path = "./";
	}
	path = path.replace(/\\/g, "/");
	return path;
};
const serializePath = (path: string) => path.replace(/\//g, "\\");

const uniqueKey = <T, K extends keyof T>(entries: T[], key: K) => {
	const set = new Set<T[K]>();
	return entries.filter((entry) => {
		if (set.has(entry[key])) {
			throw new Error(
				`Duplicate value "${String(entry[key])}" found for property "${String(key)}"`,
			);
		}
		set.add(entry[key]);
		return true;
	});
};

export const createParser = <D extends ZodType<object>>(
	parser: (ctx: ParserContext) => Promisable<
		CreateParserResult<D> & {
			definition: D;
		}
	>,
) => {
	const biome = new Biome();
	const { projectKey } = biome.openProject(PROJECT_ROOT);

	const getSource = (data: CreateParserResult<D>) => {
		return new URL(
			deserializePath(data.source.replace(`${WORKSPACE_ROOT}\\`, "")),
			"https://github.com/jslno/node-zugferd/blob/main/packages/node-zugferd/",
		).toString();
	};

	const generateTsFile = async (data: CreateParserResult<D>) => {
		const dest = path.resolve(WORKSPACE_ROOT, BASE_PATH, data.destination);
		const destDir = path.dirname(dest);

		const comment = `/**
* Automatically generated by {@link Script} on ${new Date().toUTCString()}
*
* @see {@link ${getSource(data)}|Source}
*/`;

		const exports: { asType?: boolean; name: string; priority: number }[] = [];
		const baseImports: Import[] = [
			{
				asType: true,
				name: "Script",
				path: deserializePath(path.relative(destDir, data.path)),
			},
		];

		const createEnum = data.enum.key
			? `export const ${data.secondaryIdentifier} = createEnum(${data.identifier}, {
  keyProp: "${String(data.enum.key)}",
  valueProp: "${String(data.enum.value)}",
});`
			: "";

		if (!!createEnum) {
			exports.push({
				name: data.secondaryIdentifier,
				priority: 0.8,
			});
			baseImports.push({
				path: deserializePath(
					path.relative(destDir, path.resolve(WORKSPACE_ROOT, BASE_PATH)),
				),
				variables: {
					name: "createEnum",
				},
			});
		}

		const imports = uniqueKey([...baseImports], "path")
			.map((entry) => {
				if (
					!entry.name &&
					(!entry.variables ||
						(Array.isArray(entry.variables) && entry.variables.length === 0))
				) {
					console.log(entry);
					throw new Error("Invalid import", {
						cause: entry,
					});
				}

				const variables = Array.isArray(entry.variables)
					? entry.variables
					: typeof entry.variables === "object"
						? [entry.variables]
						: [];
				const isAsType =
					(entry.asType &&
						!variables.some((variable) => variable.asType === false)) ||
					variables.every((variable) => !!variable.asType);
				const isAsVariable =
					entry.name &&
					entry.asType &&
					variables.some((variable) => !variable.asType);
				if (isAsVariable) {
					variables.push({
						name: "default",
						as: entry.name,
						asType: true,
					});
				}

				let str = `import ${isAsType ? "type " : ""}`;
				if (entry.name && !isAsVariable) {
					str += entry.name;
				}
				if (entry.name && !isAsVariable && variables.length > 0) {
					str += ", ";
				}
				if (variables.length > 0) {
					str += "{ ";
					str += variables
						.map((variable) => {
							let res = "";

							if (!isAsType && variable.asType) {
								res += "type ";
							}

							res += variable.name;

							if (variable.as) {
								res += ` as ${variable.as}`;
							}

							return res;
						})
						.join(", ");
					str += " }";
				}
				str += ` from "${entry.path}";`;

				return str;
			})
			.join("\n");

		const typeDefs = Object.entries(data.typeDefs ?? {})
			.map(([identifier, def]) => {
				const { node } = zodToTs(def.type, identifier);
				const typeAlias = createTypeAlias(
					node,
					identifier,
					def.type.description,
				);

				if (def.export) {
					exports.push({
						name: identifier,
						asType: true,
						priority: 0,
					});
				}

				return `${def.export ? "export " : ""}${printNode(typeAlias)}`;
			})
			.join("\n");

		const constants = (
			await Promise.all(
				Object.entries(data.constants ?? {}).map(
					async ([identifier, constant]) => {
						const declaration = constant.mode ?? "const";

						if (constant.export) {
							exports.push({
								name: identifier,
								priority: 0.1,
							});
						}

						let str = `${constant.export ? "export " : ""}${declaration} ${identifier}`;
						if (constant.type) {
							const { node } = zodToTs(constant.type);
							str += `: ${printNode(node)}`;
						}

						str += ` = ${serialize(constant.value)}`;

						const handleAsConst = () => {
							if (!constant.asConst) {
								return;
							}

							str += " as const";
						};
						const handleSatisfies = () => {
							if (!constant.satisfies) {
								return;
							}

							let type: string;

							if (typeof constant.satisfies === "string") {
								type = constant.satisfies;
							} else {
								const { node } = zodToTs(constant.satisfies);
								type = printNode(node);
							}

							str += ` satisfies ${type}`;
						};

						const typeOpQueue = [handleAsConst, handleSatisfies];
						if (constant.asPosition === "after-satisfies") {
							typeOpQueue.reverse();
						}
						for (const operation of typeOpQueue) {
							operation();
						}

						str += ";";

						return str;
					},
				),
			)
		).join("\n");

		const definitionIdentifier = `${data.secondaryIdentifier}Definition`;
		const definitionType = createTypeAlias(
			zodToTs(data.definition, definitionIdentifier).node,
			definitionIdentifier,
		);

		const codeMapIdentifier = `${data.secondaryIdentifier.charAt(0).toLowerCase() + data.secondaryIdentifier.slice(1)}Code`;

		exports.push(
			{
				name: definitionIdentifier,
				priority: 0,
				asType: true,
			},
			{
				name: `${data.secondaryIdentifier}Code`,
				priority: 0,
				asType: true,
			},
			{
				name: data.identifier,
				priority: 1,
			},
			{
				name: codeMapIdentifier,
				priority: 0.5,
			},
		);

		const content = `${comment}

${imports.length > 0 ? imports + "\n" : ""}
export ${printNode(definitionType)}
export type ${data.secondaryIdentifier}Code = (typeof ${data.identifier})[number]["${String(data.enum.value)}"];
${typeDefs.length > 0 ? typeDefs + "\n" : ""}
${constants.length > 0 ? constants + "\n" : ""}
${comment}
export const ${data.identifier} = ${serialize(data.definition.array().parse(data.data))} as const satisfies ${data.secondaryIdentifier}Definition[];

export const ${codeMapIdentifier} = ${data.identifier}.map(({ ${String(data.enum.value)} }) => ${String(data.enum.value)} );

${createEnum}
`;

		await mkdir(destDir, { recursive: true });

		const { content: formattedContent } = biome.formatContent(
			projectKey,
			content,
			{
				filePath: dest,
			},
		);

		await writeFile(dest, formattedContent);

		return {
			dest,
			exports: exports.sort((a, b) => b.priority - a.priority),
		};
	};

	const generateDocs = async (
		data: CreateParserResult<D>,
		exports: { asType?: boolean; name: string; priority: number }[],
	) => {
		if (!data.docs) {
			return;
		}

		const importPath = deserializePath(
			path.join("node-zugferd", data.docs.importPath ?? ""),
		);
		const dest = path.resolve(
			PROJECT_ROOT,
			path.join(
				"./docs/content/docs/",
				data.docs.path.endsWith(".mdx")
					? data.docs.path
					: `${data.docs.path}.mdx`,
			),
		);
		const destDir = path.dirname(dest);

		let imports = "";
		if (exports.length > 0) {
			imports = biome.formatContent(
				projectKey,
				`import { ${exports.map(({ name, asType }) => `${asType ? "type " : ""}${name}`).join(", ")} } from "${importPath}";`,
				{
					filePath: "imports.ts",
				},
			).content;

			imports = `\n\`\`\`ts
${imports}
\`\`\`\n`;
		}

		const columns = Array.from(
			new Set([
				...(data.docs?.table?.columns
					? Object.keys(data.docs?.table?.columns)
					: []),
				...Object.keys(data.data[0]),
			]),
		);
		const enabledColumns = data.docs.table?.columns
			? columns.filter(
					// @ts-ignore
					(key) => !data.docs?.table?.columns?.[key]?.disabled,
				)
			: columns;

		let table = "";
		if (enabledColumns.length > 0) {
			const headers = enabledColumns.map((key) => {
				// @ts-ignore
				const def = data.docs?.table?.columns?.[key];
				return {
					label: def?.label ?? String(key),
					className: {
						root:
							typeof def?.className === "object"
								? def.className.header
								: def?.className,
						col: typeof def?.className === "object" && def.className.col,
					},
				};
			});

			const rows = data.data.map((row) => {
				return enabledColumns.map((col) => {
					// @ts-ignore
					const def = data.docs?.table?.columns?.[col];
					// @ts-ignore
					const rawValue = row[col];
					const value =
						typeof def?.transform === "function"
							? def.transform(rawValue, row)
							: `${!!rawValue ? rawValue : ""}`;

					return {
						value,
						className:
							typeof def?.className === "object"
								? def.className.row
								: def?.className,
					};
				});
			});

			const colgroup = `<colgroup>
${headers
	.map(
		({ className: { col: className } }) =>
			`<col${className ? ` className="${className}"` : ""} />`,
	)
	.join("\n")}
</colgroup>`;

			const thead = `<thead${typeof data.docs?.table?.className === "object" && !!data.docs.table.className.head ? ` className="${data.docs.table.className.head}"` : ""}>
<tr>
${headers
	.map(
		({
			label,
			className: { root: className },
		}) => `<th${className ? ` className="${className}"` : ""}>
${label}
</th>`,
	)
	.join("\n")}
</tr>
</thead>`;

			const tbody = `<tbody${typeof data.docs?.table?.className === "object" && !!data.docs.table.className.body ? ` className="${data.docs.table.className.body}"` : ""}>
${rows
	.map(
		(
			cols,
		) => `<tr${typeof data.docs?.table?.className === "object" && !!data.docs.table.className.row ? ` className="${data.docs.table.className.row}"` : ""}>
${cols
	.map(
		({
			value,
			className,
		}) => `<td${className ? ` className="${className}"` : ""}>
${value}
</td>`,
	)
	.join("\n")}
</tr>`,
	)
	.join("\n")}
</tbody>`;

			table = `\n<table className="[&_*>_*]:mt-0! [&_*>_*]:mb-0!${
				(
					typeof data.docs?.table?.className === "object" &&
						!!data.docs.table.className.root
				) || typeof data.docs.table?.className === "string"
					? " " + data.docs.table.className
					: ""
			}">
${colgroup}
${thead}
${tbody}
</table>`;
		}

		const content = `---
title: ${data.docs.title}
description: ${data.docs.description}
priority: ${data.docs.priority ?? 0.6}
---

### Codelist [toc]
${imports}
<div className="w-fit">
<Link href="${getSource(data)}" rel="noreferrer noopener" target="_blank">
Source
</Link>
</div>
${table}
`;

		await mkdir(destDir, { recursive: true });

		await writeFile(dest, content);

		return dest;
	};

	return {
		generate: async () => {
			const data = await parser({
				HIDE_COLUMN,
				CODE_COLUMN,
				toScreamingSnakeCase,
				getTextNode,
				parseXML,
				parseUneceList,
				serializePath,
				deserializePath,
			});

			const { exports, dest } = await generateTsFile(data);
			const docsPath = await generateDocs(data, exports);

			return {
				file: dest,
				docs: docsPath,
				sidebar: {
					disabled: !data.docs,
					href: deserializePath(
						path.join(
							"/docs",
							(data.docs?.path.endsWith(".mdx")
								? data.docs.path.substring(0, -4)
								: data.docs?.path) ?? "",
						),
					),
					title: data.docs?.title ?? "",
					...(data.docs?.sidebar ?? {}),
				},
			};
		},
	};
};
