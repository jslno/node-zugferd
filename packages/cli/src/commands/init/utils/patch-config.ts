import { parseSync } from "@babel/core";
import { formatContent } from "../../../utils/format";
import type { Import } from "./imports";
import { createImport, processImports } from "./imports";
import type { Plugin } from "./plugins";
import { PLUGINS } from "./plugins";
import type { Profile } from "./profiles";
import { PROFILES } from "./profiles";

type AstNode = {
	type: string;
	start: number | null;
	end: number | null;
	[key: string]: unknown;
};

type Edit = {
	start: number;
	end: number;
	text: string;
};

type ImportEntry = {
	name: string;
	alias?: string | undefined;
};

const SKIP_KEYS = new Set([
	"loc",
	"leadingComments",
	"trailingComments",
	"innerComments",
	"extra",
	"range",
	"comments",
	"tokens",
	"errors",
]);

export async function patchConfig(
	source: string,
	{
		imports: imports_ = [],
		plugins = [],
		profiles = [],
		cwd = process.cwd(),
		filePath = "invoicer.ts",
	}: {
		imports?: Import[] | undefined;
		plugins?: Plugin[] | undefined;
		profiles?: Profile[] | undefined;
		cwd?: string | undefined;
		filePath?: string | undefined;
	},
) {
	const file = parseSource(source, filePath);
	const call = chooseZugferdCall(file);
	const objectNode = objectArgument(call);
	const edits: Edit[] = [];

	const profileNames = profiles.map(bindingName);
	if (profileNames.length > 0) {
		const profileArray = arrayProperty(objectNode, "profiles");
		if (profileArray) {
			edits.push(appendToArray(source, profileArray, profileNames));
		} else {
			edits.push(
				appendProperty(
					source,
					objectNode,
					"profiles",
					`[${profileNames.join(", ")}]`,
				),
			);
		}
	}

	const pluginCalls = plugins.map(pluginCall);
	if (pluginCalls.length > 0) {
		const pluginArray = arrayProperty(objectNode, "plugins");
		if (pluginArray) {
			edits.push(appendToArray(source, pluginArray, pluginCalls));
		} else {
			edits.push(
				appendProperty(
					source,
					objectNode,
					"plugins",
					`[${pluginCalls.join(", ")}]`,
				),
			);
		}
	}

	edits.push(
		...importEdits(
			source,
			file,
			processImports([
				...imports_,
				...profiles.flatMap((profile) => profile.imports ?? []),
				...plugins.flatMap((plugin) => plugin.imports ?? []),
			]),
		),
	);

	if (edits.length === 0) return source;
	return formatContent(applyEdits(source, edits), { cwd, filePath });
}

export function catalogIdsFromSource(source: string, filePath = "invoicer.ts") {
	const file = parseSource(source, filePath);
	const objectNode = objectArgument(chooseZugferdCall(file));
	const bindings = collectBindings(file);
	return {
		profiles: idsInArray(objectNode, "profiles", bindings, "profile"),
		plugins: idsInArray(objectNode, "plugins", bindings, "plugin"),
	};
}

function idsInArray(
	objectNode: AstNode,
	key: string,
	bindings: Map<string, { path: string }>,
	kind: "profile" | "plugin",
) {
	const array = arrayProperty(objectNode, key);
	if (!array) return [];
	const ids: string[] = [];
	for (const element of (array.elements as (AstNode | null)[]) ?? []) {
		if (!element) continue;
		const local = elementName(element);
		if (!local) continue;
		const binding = bindings.get(local);
		if (!binding) continue;
		const id = catalogIdForPath(binding.path, kind);
		if (id) ids.push(id);
	}
	return ids;
}

function catalogIdForPath(modulePath: string, kind: "profile" | "plugin") {
	const catalog = kind === "profile" ? PROFILES.values() : PLUGINS.values();
	for (const item of catalog) {
		if (item.imports?.some((itemImport) => itemImport.path === modulePath)) {
			return item.id;
		}
	}
	return undefined;
}

function parseSource(source: string, filePath: string) {
	const ast = parseSync(source, {
		filename: filePath,
		sourceType: "module",
		parserOpts: {
			plugins: ["typescript", "jsx"],
		},
	});
	if (!ast) throw new Error("Couldn't parse the zugferd config.");
	return ast as unknown as AstNode;
}

function chooseZugferdCall(file: AstNode) {
	const calls: { node: AstNode; exported: boolean }[] = [];
	walk(file, [], (node, ancestors) => {
		if (!isZugferdCall(node)) return;
		calls.push({
			node,
			exported: ancestors.some(
				(ancestor) =>
					ancestor.type === "ExportNamedDeclaration" ||
					ancestor.type === "ExportDefaultDeclaration",
			),
		});
	});
	const exported = calls.filter((call) => call.exported);
	if (exported.length === 1) return exported[0]!.node;
	if (exported.length === 0 && calls.length === 1) return calls[0]!.node;
	if (calls.length === 0) {
		throw new Error(
			"Couldn't update the zugferd config because no zugferd() call was found.",
		);
	}
	throw new Error(
		"Couldn't update the zugferd config because more than one zugferd() call was found.",
	);
}

function isZugferdCall(node: AstNode) {
	if (node.type !== "CallExpression") return false;
	const callee = node.callee as AstNode | undefined;
	return callee?.type === "Identifier" && callee.name === "zugferd";
}

function objectArgument(call: AstNode) {
	const arg = (call.arguments as AstNode[] | undefined)?.[0];
	if (!arg || arg.type !== "ObjectExpression") {
		throw new Error(
			"Couldn't update the zugferd config because zugferd() was not called with an object literal.",
		);
	}
	return arg;
}

function arrayProperty(objectNode: AstNode, name: string) {
	const prop = objectProperty(objectNode, name);
	if (!prop) return null;
	const value = prop.value as AstNode | undefined;
	if (value?.type !== "ArrayExpression") {
		throw new Error(
			`Couldn't update the zugferd config because \`${name}\` is not an array literal.`,
		);
	}
	return value;
}

function objectProperty(objectNode: AstNode, name: string) {
	for (const prop of (objectNode.properties as AstNode[]) ?? []) {
		if (prop.type !== "ObjectProperty" || prop.computed) continue;
		const key = prop.key as AstNode | undefined;
		const keyName =
			key?.type === "Identifier"
				? (key.name as string)
				: key?.type === "StringLiteral"
					? (key.value as string)
					: undefined;
		if (keyName === name) return prop;
	}
	return null;
}

function elementName(element: AstNode) {
	if (element.type === "Identifier") return element.name as string;
	if (element.type !== "CallExpression") return undefined;
	const callee = element.callee as AstNode | undefined;
	if (callee?.type === "Identifier") return callee.name as string;
	return undefined;
}

function bindingName(item: { imports?: Import[] | undefined }) {
	const entry = item.imports?.[0]?.imports?.[0];
	const name = entry?.alias || entry?.name;
	if (!name) {
		throw new Error("Missing import name for a zugferd config entry.");
	}
	return name;
}

function pluginCall(plugin: Plugin) {
	const name = bindingName(plugin);
	const args = plugin.options?.code.trim() ?? "";
	return args.length > 0 ? `${name}(${args})` : `${name}()`;
}

function appendToArray(source: string, arrayNode: AstNode, elements: string[]) {
	if (arrayNode.end == null) {
		throw new Error("Couldn't update the zugferd config.");
	}
	const close = arrayNode.end - 1;
	const text = elements.join(",\n");
	const existing = ((arrayNode.elements as (AstNode | null)[]) ?? []).filter(
		(element): element is AstNode => Boolean(element),
	);
	if (existing.length === 0) {
		return { start: close, end: close, text: `\n${text},\n` };
	}
	const last = existing[existing.length - 1]!;
	if (last.end == null) {
		throw new Error("Couldn't update the zugferd config.");
	}
	const between = source.slice(last.end, close);
	return {
		start: close,
		end: close,
		text: between.includes(",") ? `\n${text},` : `,\n${text}`,
	};
}

function appendProperty(
	source: string,
	objectNode: AstNode,
	key: string,
	value: string,
) {
	if (objectNode.end == null) {
		throw new Error("Couldn't update the zugferd config.");
	}
	const close = objectNode.end - 1;
	const line = `${key}: ${value},`;
	const props = ((objectNode.properties as AstNode[]) ?? []).filter(
		(prop) =>
			prop.type === "ObjectProperty" ||
			prop.type === "ObjectMethod" ||
			prop.type === "SpreadElement",
	);
	if (props.length === 0) {
		return { start: close, end: close, text: `\n${line}\n` };
	}
	const last = props[props.length - 1]!;
	if (last.end == null) {
		throw new Error("Couldn't update the zugferd config.");
	}
	const between = source.slice(last.end, close);
	return {
		start: close,
		end: close,
		text: between.includes(",") ? `\n${line}` : `,\n${line}`,
	};
}

function importEdits(source: string, file: AstNode, imports: Import[]) {
	const program = file.program as AstNode | undefined;
	const body = (program?.body as AstNode[]) ?? [];
	const declarations = body.filter(
		(statement) => statement.type === "ImportDeclaration",
	);
	const locals = new Map<string, { path: string; imported: string }>();
	for (const declaration of declarations) {
		if (declaration.importKind === "type") continue;
		const modulePath = (declaration.source as AstNode | undefined)?.value;
		if (typeof modulePath !== "string") continue;
		for (const specifier of (declaration.specifiers as AstNode[]) ?? []) {
			if (
				specifier.type !== "ImportSpecifier" ||
				specifier.importKind === "type"
			) {
				continue;
			}
			const local = (specifier.local as AstNode | undefined)?.name;
			const importedNode = specifier.imported as AstNode | undefined;
			const imported =
				importedNode?.type === "Identifier"
					? (importedNode.name as string)
					: (importedNode?.value as string | undefined);
			if (typeof local !== "string" || !imported) continue;
			locals.set(local, { path: modulePath, imported });
		}
	}

	const pending = new Map<string, ImportEntry[]>();
	for (const item of imports) {
		for (const entry of item.imports ?? []) {
			const local = entry.alias || entry.name;
			const existing = locals.get(local);
			if (existing) {
				if (existing.path === item.path && existing.imported === entry.name) {
					continue;
				}
				throw new Error(`Conflicting imports for variable "${local}".`);
			}
			const entries = pending.get(item.path) ?? [];
			entries.push(entry);
			pending.set(item.path, entries);
			locals.set(local, { path: item.path, imported: entry.name });
		}
	}

	const edits: Edit[] = [];
	const newLines: string[] = [];
	for (const [modulePath, entries] of pending) {
		const declaration = declarations.find((candidate) => {
			if (candidate.importKind === "type") return false;
			if ((candidate.source as AstNode | undefined)?.value !== modulePath) {
				return false;
			}
			return ((candidate.specifiers as AstNode[]) ?? []).some(
				(specifier) => specifier.type === "ImportSpecifier",
			);
		});
		if (declaration) {
			edits.push(insertNamedSpecifiers(source, declaration, entries));
			continue;
		}
		newLines.push(
			createImport({ path: modulePath, imports: entries }).toString(),
		);
	}

	if (newLines.length > 0) {
		let lastEnd = 0;
		for (const declaration of declarations) {
			if (typeof declaration.end === "number") {
				lastEnd = Math.max(lastEnd, declaration.end);
			}
		}
		edits.push({
			start: lastEnd,
			end: lastEnd,
			text:
				lastEnd === 0 ? `${newLines.join("\n")}\n` : `\n${newLines.join("\n")}`,
		});
	}

	return edits;
}

function insertNamedSpecifiers(
	source: string,
	declaration: AstNode,
	entries: ImportEntry[],
) {
	const specifiers = ((declaration.specifiers as AstNode[]) ?? []).filter(
		(specifier) => specifier.type === "ImportSpecifier",
	);
	const last = specifiers[specifiers.length - 1];
	const sourceNode = declaration.source as AstNode | undefined;
	if (!last || last.end == null || sourceNode?.start == null) {
		throw new Error("Couldn't update an import in the zugferd config.");
	}
	const region = source.slice(last.end, sourceNode.start);
	const brace = region.lastIndexOf("}");
	if (brace < 0) {
		throw new Error("Couldn't update an import in the zugferd config.");
	}
	const close = last.end + brace;
	const between = source.slice(last.end, close);
	const text = entries
		.map((entry) =>
			entry.alias ? `${entry.name} as ${entry.alias}` : entry.name,
		)
		.join(", ");
	return {
		start: close,
		end: close,
		text: between.includes(",") ? ` ${text}` : `, ${text}`,
	};
}

function collectBindings(file: AstNode) {
	const program = file.program as AstNode | undefined;
	const bindings = new Map<string, { path: string }>();
	for (const statement of (program?.body as AstNode[]) ?? []) {
		if (
			statement.type !== "ImportDeclaration" ||
			statement.importKind === "type"
		) {
			continue;
		}
		const modulePath = (statement.source as AstNode | undefined)?.value;
		if (typeof modulePath !== "string") continue;
		for (const specifier of (statement.specifiers as AstNode[]) ?? []) {
			if (specifier.importKind === "type") continue;
			if (specifier.type !== "ImportSpecifier") continue;
			const local = (specifier.local as AstNode | undefined)?.name;
			if (typeof local === "string") bindings.set(local, { path: modulePath });
		}
	}
	return bindings;
}

function applyEdits(source: string, edits: Edit[]) {
	const sorted = [...edits].sort((a, b) => b.start - a.start || b.end - a.end);
	let result = source;
	for (const edit of sorted) {
		result = result.slice(0, edit.start) + edit.text + result.slice(edit.end);
	}
	return result;
}

function walk(
	node: AstNode,
	ancestors: AstNode[],
	visit: (node: AstNode, ancestors: AstNode[]) => void,
) {
	visit(node, ancestors);
	const next = [...ancestors, node];
	for (const key of Object.keys(node)) {
		if (SKIP_KEYS.has(key)) continue;
		const value = node[key];
		if (Array.isArray(value)) {
			for (const child of value) {
				if (isNode(child)) walk(child, next, visit);
			}
			continue;
		}
		if (isNode(value)) walk(value, next, visit);
	}
}

function isNode(value: unknown): value is AstNode {
	return (
		!!value &&
		typeof value === "object" &&
		typeof (value as AstNode).type === "string"
	);
}
