import fs from "node:fs/promises";
import path from "node:path";
import type { PlopGeneratorConfig } from "plop";
import ts from "typescript";
import { __dirname } from "../helper";

// TODO: fix type declarations for arrays & tuples
// TODO: Extract type generics
// TODO: Some functions are extracted as variables
// TODO: Turn hierarchy into mermaid chart?

const basePath = path.resolve(__dirname, "../../");

const filterPackages = (pkgName: string) =>
	![
		"@node-zugferd/cli",
		"@node-zugferd/utils",
		"@node-zugferd/minimum",
		"@node-zugferd/basic",
		"@node-zugferd/basic-wl",
		"@node-zugferd/en-16931",
		"@node-zugferd/extended",
	].includes(pkgName) && !pkgName.startsWith("@node-zugferd/codelist-");

let lazyPackages: Map<string, { path: string; packageJson: any }> | null = null;
const collectPackages = async () => {
	if (lazyPackages) return lazyPackages;
	const result = new Map<string, { path: string; packageJson: any }>();
	const lookup = async (p: string) => {
		const entries = await fs.readdir(p, { withFileTypes: true });

		if (
			!entries.some((entry) => entry.isFile() && entry.name === "package.json")
		) {
			for (const dir of entries.filter((entry) => entry.isDirectory())) {
				await lookup(path.join(dir.parentPath, dir.name));
			}
			return;
		}

		const packageJsonPath = path.join(p, "package.json");
		const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));
		if (
			packageJson.private === true ||
			Object.keys(packageJson.exports ?? {}).length === 0 ||
			!filterPackages(packageJson.name)
		) {
			return;
		}
		result.set(packageJson.name, {
			path: p,
			packageJson,
		});
	};

	await lookup(path.join(basePath, "./packages"));
	lazyPackages = result;
	return lazyPackages;
};

function resolveSymbol(symbol: ts.Symbol, checker: ts.TypeChecker): ts.Symbol {
	if (symbol.flags & ts.SymbolFlags.Alias) {
		return checker.getAliasedSymbol(symbol);
	}

	return symbol;
}

function getDescription(
	symbol: ts.Symbol,
	typeChecker: ts.TypeChecker,
): string | undefined {
	const comment = ts.displayPartsToString(
		symbol.getDocumentationComment(typeChecker),
	);
	return comment.length > 0 ? comment : undefined;
}

function getJsDocTag(symbol: ts.Symbol, tagName: string): string | undefined {
	const tag = symbol.getJsDocTags().find((t) => t.name === tagName);
	if (!tag) return undefined;
	return tag.text ? ts.displayPartsToString(tag.text) : "";
}

function hasModifier(
	declaration: ts.Declaration | undefined,
	kind: ts.SyntaxKind,
): boolean {
	return (
		!!declaration &&
		ts.canHaveModifiers(declaration) &&
		!!ts.getModifiers(declaration)?.some((modifier) => modifier.kind === kind)
	);
}

function getVisibility(
	declaration: ts.Declaration | undefined,
): "public" | "protected" | "private" {
	if (hasModifier(declaration, ts.SyntaxKind.PrivateKeyword)) return "private";
	if (hasModifier(declaration, ts.SyntaxKind.ProtectedKeyword)) {
		return "protected";
	}
	return "public";
}

function getVariableDeclarationKind(
	declaration: ts.Declaration | undefined,
): "const" | "let" | "var" | undefined {
	if (!declaration || !ts.isVariableDeclaration(declaration)) return undefined;

	const declarationList = declaration.parent;
	if (!ts.isVariableDeclarationList(declarationList)) return undefined;

	if (declarationList.flags & ts.NodeFlags.Const) return "const";
	if (declarationList.flags & ts.NodeFlags.Let) return "let";
	return "var";
}

const VALID_IDENTIFIER_NAME = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

function formatPropertyName(name: string): string {
	return VALID_IDENTIFIER_NAME.test(name) ? name : JSON.stringify(name);
}

function getMemberKind(
	declaration: ts.Declaration | undefined,
): "property" | "method" | "accessor" {
	if (!declaration) return "property";
	if (
		ts.isGetAccessorDeclaration(declaration) ||
		ts.isSetAccessorDeclaration(declaration)
	) {
		return "accessor";
	}
	if (
		ts.isMethodDeclaration(declaration) ||
		ts.isMethodSignature(declaration)
	) {
		return "method";
	}
	return "property";
}

function unwrapNullableType(type: ts.Type): ts.Type | undefined {
	if (!type.isUnion()) return type;

	const nonNullish = type.types.filter(
		(member) => !(member.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)),
	);
	if (nonNullish.length !== 1) return undefined;

	return nonNullish[0];
}

function isExpandableObjectType(type: ts.Type): boolean {
	const unwrapped = unwrapNullableType(type);
	if (!unwrapped) return false;
	if (unwrapped.flags & ts.TypeFlags.Intersection) return false;
	if (!(unwrapped.flags & ts.TypeFlags.Object)) return false;
	if (unwrapped.getCallSignatures().length > 0) return false;
	if (unwrapped.getConstructSignatures().length > 0) return false;

	const symbol = unwrapped.getSymbol();
	if (symbol && symbol.getName() !== "__type") return false;

	return unwrapped.getProperties().length > 0;
}

function getExpandableObjectProperties(type: ts.Type): ts.Symbol[] {
	const unwrapped = unwrapNullableType(type);
	return unwrapped ? unwrapped.getProperties() : [];
}

const MAX_TYPE_DECLARATION_DEPTH = 3;

type AnalyzedSignature = ReturnType<typeof analyzeSignature>;

type AnalyzedMember = {
	name: string;
	kind: "property" | "method" | "accessor";
	visibility: "public" | "protected" | "private";
	static: boolean;
	type: string;
	typeString: string;
	typeDeclaration?: AnalyzedMember[];
	signatures?: AnalyzedSignature[];
	optional: boolean;
	readonly: boolean;
	description?: string;
	deprecated: boolean;
	internal: boolean;
	default?: string;
	source?: string;
	line?: number;
};

function analyzeMember(
	prop: ts.Symbol,
	typeChecker: ts.TypeChecker,
	depth = 0,
): AnalyzedMember {
	const declaration = prop.valueDeclaration ?? prop.declarations?.[0];

	const propType = declaration
		? typeChecker.getTypeOfSymbolAtLocation(prop, declaration)
		: typeChecker.getTypeOfSymbol(prop);

	const sourceFile = declaration?.getSourceFile();

	const line = declaration
		? ts.getLineAndCharacterOfPosition(sourceFile!, declaration.getStart())
				.line + 1
		: undefined;

	const optional = (prop.flags & ts.SymbolFlags.Optional) !== 0;
	const isStatic = hasModifier(declaration, ts.SyntaxKind.StaticKeyword);
	// Only class members can be "private"/"protected"; interface and
	// type-literal members are always implicitly public.
	const visibility = getVisibility(declaration);
	const kind = getMemberKind(declaration);
	// Accessors don't use the `readonly` keyword - they're only
	// read-only when there's no setter alongside the getter.
	const readonly =
		kind === "accessor"
			? !prop.declarations?.some(ts.isSetAccessorDeclaration)
			: hasModifier(declaration, ts.SyntaxKind.ReadonlyKeyword);

	const typeString = typeChecker.typeToString(
		propType,
		declaration,
		ts.TypeFormatFlags.NoTruncation,
	);

	const modifiers = [
		visibility !== "public" ? visibility : undefined,
		isStatic ? "static" : undefined,
		readonly ? "readonly" : undefined,
	]
		.filter(Boolean)
		.join(" ");

	const type = `${modifiers ? `${modifiers} ` : ""}${formatPropertyName(prop.getName())}${
		optional ? "?" : ""
	}: ${typeString}`;

	const signatures =
		kind === "method"
			? propType
					.getCallSignatures()
					.map((sig) => analyzeSignature(sig, typeChecker))
			: undefined;

	const typeDeclaration =
		kind === "property" &&
		depth < MAX_TYPE_DECLARATION_DEPTH &&
		isExpandableObjectType(propType)
			? getExpandableObjectProperties(propType).map((nestedProp) =>
					analyzeMember(nestedProp, typeChecker, depth + 1),
				)
			: undefined;

	return {
		name: prop.getName(),
		kind,
		visibility,
		static: isStatic,
		type,
		typeString,
		typeDeclaration,
		signatures,
		optional,
		readonly,
		description: getDescription(prop, typeChecker),
		deprecated: getJsDocTag(prop, "deprecated") !== undefined,
		internal: getJsDocTag(prop, "internal") !== undefined,
		default: getJsDocTag(prop, "default"),
		source: sourceFile?.fileName,
		line,
	};
}

function renderTypeDeclarationList(
	properties: AnalyzedMember[],
	indent = "",
): string {
	return properties
		.map((prop) => {
			let line = `${indent}- **${prop.readonly ? "readonly " : ""}${formatPropertyName(prop.name)}${prop.optional ? "?" : ""}**: ${inlineCode(prop.typeString)}`;
			if (prop.description) {
				line += `\n${indent}  ${prop.description}`;
			}
			if (prop.typeDeclaration) {
				line += `\n${renderTypeDeclarationList(prop.typeDeclaration, `${indent}  `)}`;
			}
			return line;
		})
		.join("\n");
}

type HierarchyChain = string[];

function getHierarchyTypeName(
	type: ts.Type,
	typeChecker: ts.TypeChecker,
): string {
	return typeChecker.typeToString(
		type,
		undefined,
		ts.TypeFormatFlags.NoTruncation |
			ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope,
	);
}

function getDirectBaseTypes(
	type: ts.Type,
	typeChecker: ts.TypeChecker,
): ts.Type[] {
	if (type.isClassOrInterface()) {
		const bases = type.getBaseTypes() ?? [];
		if (bases.length > 0) return bases;
	}

	const symbol = type.getSymbol();
	if (!symbol) return [];

	const declaredType = typeChecker.getDeclaredTypeOfSymbol(symbol);
	if (declaredType === type || !declaredType.isClassOrInterface()) return [];

	return declaredType.getBaseTypes() ?? [];
}

function getAncestorChains(
	type: ts.Type,
	typeChecker: ts.TypeChecker,
): HierarchyChain[] {
	const bases = getDirectBaseTypes(type, typeChecker);
	const selfName = getHierarchyTypeName(type, typeChecker);

	if (bases.length === 0) return [[selfName]];

	return bases.flatMap((base) =>
		getAncestorChains(base, typeChecker).map((chain) => [...chain, selfName]),
	);
}

function getHierarchyChains(
	type: ts.Type,
	typeChecker: ts.TypeChecker,
): HierarchyChain[] | undefined {
	const bases = getDirectBaseTypes(type, typeChecker);
	if (bases.length === 0) return undefined;

	return getAncestorChains(type, typeChecker);
}

function renderHierarchy(chains: HierarchyChain[]): string {
	return chains
		.map((chain) =>
			chain
				.map((name, index) => {
					const indent = "  ".repeat(index);
					const isLast = index === chain.length - 1;
					return `${indent}- ${isLast ? `**${inlineCode(name)}**` : `${inlineCode(name)}`}`;
				})
				.join("\n"),
		)
		.join("\n");
}

function analyzeParameter(param: ts.Symbol, typeChecker: ts.TypeChecker) {
	const declaration = param.valueDeclaration as
		| ts.ParameterDeclaration
		| undefined;
	const paramType = declaration
		? typeChecker.getTypeOfSymbolAtLocation(param, declaration)
		: typeChecker.getTypeOfSymbol(param);

	return {
		name: param.getName(),
		type: typeChecker.typeToString(
			paramType,
			declaration,
			ts.TypeFormatFlags.NoTruncation,
		),
		optional: !!declaration?.questionToken || !!declaration?.initializer,
		description: getDescription(param, typeChecker),
	};
}

function analyzeSignature(
	signature: ts.Signature,
	typeChecker: ts.TypeChecker,
) {
	const description = ts.displayPartsToString(
		signature.getDocumentationComment(typeChecker),
	);

	const declaration = signature.getDeclaration();
	const sourceFile = declaration?.getSourceFile();
	const line = declaration
		? ts.getLineAndCharacterOfPosition(sourceFile!, declaration.getStart())
				.line + 1
		: undefined;

	const returnTag = declaration ? ts.getJSDocReturnTag(declaration) : undefined;
	const returnDescription = returnTag
		? ts.getTextOfJSDocComment(returnTag.comment)
		: undefined;

	return {
		parameters: signature
			.getParameters()
			.map((param) => analyzeParameter(param, typeChecker)),
		return: {
			type: typeChecker.typeToString(
				signature.getReturnType(),
				declaration,
				ts.TypeFormatFlags.NoTruncation,
			),
			description: returnDescription,
		},
		description: description.length > 0 ? description : undefined,
		source: sourceFile?.fileName,
		line,
		toString: () =>
			typeChecker.signatureToString(
				signature,
				undefined,
				ts.TypeFormatFlags.NoTruncation,
			),
	};
}

function renderSignatureBlock(
	sig: AnalyzedSignature,
	fallbackSource: string,
): string {
	return [
		codeBlock("ts", sig.toString()),
		sig.description,
		sig.parameters.length > 0
			? `**Parameters**

${sig.parameters
	.map(
		(param) =>
			`- ${param.name}${param.optional ? "?" : ""}: ${inlineCode(param.type)}${
				param.description
					? `
  ${param.description}`
					: ""
			}`,
	)
	.join("\n")}`
			: undefined,
		`**Returns** ${inlineCode(sig.return.type)}`,
		sig.return.description,
		renderDefinedIn(sig.source ?? fallbackSource, sig.line),
	]
		.filter(Boolean)
		.join("\n\n");
}

type AnalyzedIndexSignature = {
	parameterName: string;
	keyType: string;
	type: string;
	readonly: boolean;
	source?: string;
	line?: number;
};

function analyzeIndexSignatures(
	type: ts.Type,
	typeChecker: ts.TypeChecker,
): AnalyzedIndexSignature[] {
	return typeChecker.getIndexInfosOfType(type).map((info) => {
		const declaration = info.declaration;
		const sourceFile = declaration?.getSourceFile();
		const line = declaration
			? ts.getLineAndCharacterOfPosition(sourceFile!, declaration.getStart())
					.line + 1
			: undefined;

		const parameterName =
			declaration?.parameters[0]?.name.getText() ??
			(info.keyType.flags & ts.TypeFlags.Number ? "index" : "key");

		return {
			parameterName,
			keyType: typeChecker.typeToString(
				info.keyType,
				declaration,
				ts.TypeFormatFlags.NoTruncation,
			),
			type: typeChecker.typeToString(
				info.type,
				declaration,
				ts.TypeFormatFlags.NoTruncation,
			),
			readonly: info.isReadonly,
			source: sourceFile?.fileName,
			line,
		};
	});
}

function renderIndexSignatures(
	indexSignatures: AnalyzedIndexSignature[],
	fallbackSource: string,
): string {
	return indexSignatures
		.map((index) =>
			[
				codeBlock(
					"ts",
					`${index.readonly ? "readonly " : ""}[${index.parameterName}: ${index.keyType}]: ${index.type}`,
				),
				renderDefinedIn(index.source ?? fallbackSource, index.line),
			]
				.filter(Boolean)
				.join("\n\n"),
		)
		.join("\n\n");
}

function splitMembers(members: AnalyzedMember[]) {
	const visible = members.filter((member) => member.visibility !== "private");
	return {
		properties: visible.filter((member) => member.kind === "property"),
		methods: visible.filter((member) => member.kind === "method"),
		accessors: visible.filter((member) => member.kind === "accessor"),
	};
}

function renderDefinedIn(source: string, line: number | undefined): string {
	return `Defined in [${path.relative(basePath, source).replace(/\\/g, "/")}${line ? `:${line}` : ""}]()`;
}

function renderProperties(
	properties: AnalyzedMember[],
	fallbackSource: string,
): string {
	return properties
		.map((prop) =>
			[
				`#### ${inlineCode(prop.name)}

${codeBlock("ts", prop.type)}`,
				prop.description,
				prop.typeDeclaration
					? `##### **Type Declaration**

${renderTypeDeclarationList(prop.typeDeclaration)}`
					: undefined,
				renderDefinedIn(prop.source ?? fallbackSource, prop.line),
			]
				.filter(Boolean)
				.join("\n\n"),
		)
		.join("\n\n");
}

function renderAccessors(
	accessors: AnalyzedMember[],
	fallbackSource: string,
): string {
	return accessors
		.map((accessor) =>
			[
				`#### ${inlineCode(accessor.name)}

${codeBlock("ts", accessor.type)}`,
				accessor.description,
				renderDefinedIn(accessor.source ?? fallbackSource, accessor.line),
			]
				.filter(Boolean)
				.join("\n\n"),
		)
		.join("\n\n");
}

function renderMethods(
	methods: AnalyzedMember[],
	fallbackSource: string,
): string {
	return methods
		.map((method) =>
			[
				`#### ${inlineCode(method.name)}`,
				method.signatures && method.signatures.length > 0
					? method.signatures
							.map((sig) =>
								renderSignatureBlock(sig, method.source ?? fallbackSource),
							)
							.join("\n")
					: undefined,
			]
				.filter(Boolean)
				.join("\n\n"),
		)
		.join("\n\n");
}

const normalizeFrontmatterValue = (str: string) =>
	`"${str.replace(/"/g, '\\"').replace(/:/g, "\:").replace(/\n/g, " ")}"`;

function codeBlock(code: string): string;
function codeBlock(lang: string, code: string): string;
function codeBlock(langOrCode: string, code_?: string): string {
	let code: string;
	let lang: string = "";
	if (!code_) {
		code = langOrCode;
	} else {
		lang = langOrCode;
		code = code_;
	}

	return `\`\`\`${lang}
${code}
\`\`\``;
}

const inlineCode = (code: string) =>
	`<code>${code.replace(/[^\p{L}\p{N}\s]/gu, "\\$&")}</code>`;

function analyzeExport(
	symbol: ts.Symbol,
	typeChecker: ts.TypeChecker,
	printer: ts.Printer,
) {
	const name = symbol.getName();

	const originalSymbol = resolveSymbol(symbol, typeChecker);

	const declaration =
		originalSymbol.valueDeclaration ?? originalSymbol.declarations?.[0];

	const source = declaration?.getSourceFile().fileName;
	const line = declaration
		? declaration
				.getSourceFile()
				.getLineAndCharacterOfPosition(declaration.getStart()).line + 1
		: undefined;

	if (!declaration || !source) {
		return {
			name,
			kind: "unknown",
			source,
			line,
		} as const;
	}

	const description =
		getDescription(originalSymbol, typeChecker) ??
		getDescription(symbol, typeChecker);
	const deprecated =
		getJsDocTag(originalSymbol, "deprecated") !== undefined ||
		getJsDocTag(symbol, "deprecated") !== undefined;
	const internal =
		getJsDocTag(originalSymbol, "internal") !== undefined ||
		getJsDocTag(symbol, "internal") !== undefined;

	const toMDXFactory =
		(
			frontmatter: {
				icon?: string | undefined;
				title: string;
				description?: string | undefined;
			},
			toMDX: (options: { inline: boolean }) => string,
		) =>
		({ inline = false }: { inline?: boolean | undefined } = {}) => {
			let str = "";
			if (!inline) {
				const { icon, title, description } = frontmatter;
				str += `---
${
	icon
		? `icon: ${normalizeFrontmatterValue(icon)}
`
		: ""
}title: ${normalizeFrontmatterValue(title)}${
					description
						? `
description: ${normalizeFrontmatterValue(description)}`
						: ""
				}
---
`;
			}
			str += `\n${toMDX({ inline })}\n`;
			return str;
		};

	// Types & Enums
	if (originalSymbol.flags & ts.SymbolFlags.TypeAlias) {
		const typeDeclaration = originalSymbol.declarations?.find(
			ts.isTypeAliasDeclaration,
		);

		if (typeDeclaration) {
			const type = typeChecker.getTypeFromTypeNode(typeDeclaration.type);

			const kind = "type";

			// Type aliases to plain object literals (e.g. `type Foo = { a: string }`)
			// get their members expanded the same way nested object properties do.
			const typeMembers = isExpandableObjectType(type)
				? getExpandableObjectProperties(type).map((prop) =>
						analyzeMember(prop, typeChecker),
					)
				: undefined;

			return {
				name,
				kind,
				type,
				typeMembers,
				description,
				deprecated,
				internal,
				toMDX: toMDXFactory(
					{
						icon: kind,
						title: name,
						description,
					},
					() =>
						[
							`## Type ${inlineCode(name)}

${codeBlock("ts", typeDeclaration.getText())}`,
							description,
							typeMembers && typeMembers.length > 0
								? `### Type Declaration

${renderTypeDeclarationList(typeMembers)}`
								: undefined,
							renderDefinedIn(source, line),
						]
							.filter(Boolean)
							.join("\n\n"),
				),
				declaration: typeDeclaration.getText(),
				source,
				line,
			} as const;
		}
	}
	if (originalSymbol.flags & ts.SymbolFlags.Interface) {
		const declaredType = typeChecker.getDeclaredTypeOfSymbol(originalSymbol);
		const { properties, methods, accessors } = splitMembers(
			declaredType
				.getProperties()
				.map((prop) => analyzeMember(prop, typeChecker)),
		);
		const interfaceDeclaration = originalSymbol.declarations?.find(
			ts.isInterfaceDeclaration,
		);
		const hierarchy = getHierarchyChains(declaredType, typeChecker);
		const indexSignatures = analyzeIndexSignatures(declaredType, typeChecker);

		const kind = "interface";
		return {
			name,
			kind,
			properties,
			methods,
			accessors,
			hierarchy,
			indexSignatures,
			description,
			deprecated,
			internal,
			toMDX: toMDXFactory(
				{
					title: name,
					description,
					icon: kind,
				},
				() =>
					[
						`## Interface ${inlineCode(name)}

${codeBlock(
	"ts",
	interfaceDeclaration
		? printer.printNode(
				ts.EmitHint.Unspecified,
				interfaceDeclaration,
				interfaceDeclaration.getSourceFile(),
			)
		: typeChecker.typeToString(
				declaredType,
				declaration,
				ts.TypeFormatFlags.NoTruncation,
			),
)}`,
						description,
						hierarchy
							? `### Hierarchy

${renderHierarchy(hierarchy)}`
							: "",
						indexSignatures.length > 0
							? `### Indexable

${renderIndexSignatures(indexSignatures, source)}`
							: undefined,
						renderDefinedIn(source, line),
						properties.length > 0
							? `### Properties

${renderProperties(properties, source)}`
							: undefined,
						accessors.length > 0
							? `### Accessors

${renderAccessors(accessors, source)}`
							: undefined,
						methods.length > 0
							? `### Methods

${renderMethods(methods, source)}`
							: undefined,
					]
						.filter(Boolean)
						.join("\n\n"),
			),
			source,
			line,
		} as const;
	}
	if (originalSymbol.flags & ts.SymbolFlags.Enum) {
		const enumDeclarations =
			originalSymbol.declarations?.filter(ts.isEnumDeclaration) ?? [];
		const members = enumDeclarations.flatMap((enumDeclaration) =>
			enumDeclaration.members.map((member) => {
				const memberSymbol = typeChecker.getSymbolAtLocation(member.name);
				const value = typeChecker.getConstantValue(member);
				const memberSourceFile = member.getSourceFile();

				return {
					name: member.name.getText(),
					value,
					declaration:
						value === undefined
							? printer
									.printNode(ts.EmitHint.Unspecified, member, memberSourceFile)
									.trim()
							: `${member.name.getText()} = ${JSON.stringify(value)}`,
					description: memberSymbol
						? getDescription(memberSymbol, typeChecker)
						: undefined,
					deprecated: memberSymbol
						? getJsDocTag(memberSymbol, "deprecated") !== undefined
						: false,
					source: memberSourceFile.fileName,
					line:
						ts.getLineAndCharacterOfPosition(
							memberSourceFile,
							member.getStart(),
						).line + 1,
				};
			}),
		);

		const kind = "enum";
		return {
			name,
			kind,
			members,
			description,
			deprecated,
			internal,
			toMDX: toMDXFactory(
				{
					title: name,
					description,
					icon: kind,
				},
				() =>
					[
						`## Enumeration ${inlineCode(name)}`,
						description,
						members.length > 0
							? members.map((member) =>
									[
										`#### ${inlineCode(member.name)}

${codeBlock("ts", member.declaration)}`,
										member.description,
										renderDefinedIn(member.source, member.line),
									]
										.filter(Boolean)
										.join("\n"),
								)
							: undefined,
						renderDefinedIn(source, line),
					]
						.filter(Boolean)
						.join("\n\n"),
			),
			source,
			line,
		} as const;
	}

	// Runtime values

	const type = typeChecker.getTypeOfSymbolAtLocation(
		originalSymbol,
		declaration,
	);
	const signatures = type.getCallSignatures();

	if (signatures.length > 0) {
		const analyzedSignatures = signatures.map((sig) =>
			analyzeSignature(sig, typeChecker),
		);

		const kind = "function";
		return {
			name,
			kind,
			signatures: analyzedSignatures,
			type,
			description,
			deprecated,
			internal,
			toMDX: toMDXFactory(
				{
					title: name,
					description,
					icon: kind,
				},
				() =>
					[
						`## Function ${inlineCode(name)}`,
						analyzedSignatures.length > 0
							? analyzedSignatures
									.map((sig) => renderSignatureBlock(sig, source))
									.join("\n")
							: undefined,
					]
						.filter(Boolean)
						.join("\n\n"),
			),
			source,
			line,
		} as const;
	}
	if (type.getConstructSignatures().length > 0) {
		const constructSignatures = type.getConstructSignatures();
		const declaredType = typeChecker.getDeclaredTypeOfSymbol(originalSymbol);

		const { properties, methods, accessors } = splitMembers(
			declaredType
				.getProperties()
				.map((prop) => analyzeMember(prop, typeChecker)),
		);
		const constructors = constructSignatures.map((sig) =>
			analyzeSignature(sig, typeChecker),
		);
		const hierarchy = getHierarchyChains(declaredType, typeChecker);
		const indexSignatures = analyzeIndexSignatures(declaredType, typeChecker);

		const kind = "class";
		return {
			name,
			kind,
			properties,
			accessors,
			methods,
			hierarchy,
			indexSignatures,
			constructors,
			type,
			description,
			deprecated,
			internal,
			toMDX: toMDXFactory(
				{
					title: name,
					description,
					icon: kind,
				},
				() =>
					[
						`## Class ${inlineCode(name)}`,
						description,
						hierarchy && hierarchy.length > 0
							? `### Hierarchy

${renderHierarchy(hierarchy)}`
							: undefined,
						indexSignatures.length > 0
							? `### Indexable

${renderIndexSignatures(indexSignatures, source)}`
							: undefined,
						renderDefinedIn(source, line),
						constructors.length > 0
							? `### Constructors

${constructors.map((constructor) => renderSignatureBlock(constructor, source))}`
							: undefined,
						properties.length > 0
							? `### Properties

${renderProperties(properties, source)}`
							: undefined,
						accessors.length > 0
							? `### Accessors

${renderAccessors(accessors, source)}`
							: undefined,
						methods.length > 0
							? `### Methods

	${renderMethods(methods, source)}`
							: undefined,
					]
						.filter(Boolean)
						.join("\n\n"),
			),
			source,
			line,
		} as const;
	}
	if (originalSymbol.flags & ts.SymbolFlags.Class) {
		const declaredType = typeChecker.getDeclaredTypeOfSymbol(originalSymbol);
		const { properties, methods, accessors } = splitMembers(
			declaredType
				.getProperties()
				.map((prop) => analyzeMember(prop, typeChecker)),
		);
		const hierarchy = getHierarchyChains(declaredType, typeChecker);
		const indexSignatures = analyzeIndexSignatures(declaredType, typeChecker);

		// We only get here when `type.getConstructSignatures()` was empty
		// (e.g. abstract classes, which can't be `new`-ed from outside).
		// The constructor declaration still exists on the class though, so
		// pull its signature straight from the AST instead.
		const constructors = (originalSymbol.declarations ?? [])
			.filter(ts.isClassLike)
			.flatMap((cls) => cls.members.filter(ts.isConstructorDeclaration))
			.map((ctorDeclaration) =>
				typeChecker.getSignatureFromDeclaration(ctorDeclaration),
			)
			.filter((sig): sig is ts.Signature => !!sig)
			.map((sig) => analyzeSignature(sig, typeChecker));

		const kind = "class";
		return {
			name,
			kind: "class",
			properties,
			methods,
			accessors,
			hierarchy,
			indexSignatures,
			constructors,
			type,
			description,
			deprecated,
			internal,
			toMDX: toMDXFactory(
				{
					title: name,
					description,
					icon: kind,
				},
				() =>
					[
						`## Class ${inlineCode(name)}`,
						description,
						hierarchy && hierarchy.length > 0
							? `### Hierarchy

${renderHierarchy(hierarchy)}`
							: undefined,
						indexSignatures.length > 0
							? `### Indexable

${renderIndexSignatures(indexSignatures, source)}`
							: undefined,
						renderDefinedIn(source, line),
						constructors.length > 0
							? `### Constructors

${constructors.map((constructor) => renderSignatureBlock(constructor, source))}`
							: undefined,
						properties.length > 0
							? `### Properties

${renderProperties(properties, source)}`
							: undefined,
						accessors.length > 0
							? `### Accessors

	${renderAccessors(accessors, source)}`
							: undefined,
						methods.length > 0
							? `### Methods

	${renderMethods(methods, source)}`
							: undefined,
					]
						.filter(Boolean)
						.join("\n\n"),
			),
			source,
			line,
		} as const;
	}
	if (originalSymbol.flags & ts.SymbolFlags.Variable) {
		const kind = "variable";
		const subkind = getVariableDeclarationKind(declaration) ?? "var";

		const value =
			ts.isVariableDeclaration(declaration) && declaration.initializer
				? declaration.initializer.getText()
				: undefined;

		return {
			name,
			kind,
			subkind,
			type,
			value,
			description,
			deprecated,
			internal,
			toMDX: toMDXFactory(
				{
					title: name,
					description,
					icon: kind,
				},
				() =>
					[
						`## Variable ${inlineCode(name)}

${codeBlock("ts", `${subkind} ${name}: ${typeChecker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation)} = ${value ?? "..."}`)}`,
						description,
						renderDefinedIn(source, line),
					]
						.filter(Boolean)
						.join("\n\n"),
			),
			source,
			line,
		} as const;
	}

	return {
		name,
		kind: "unknown",
		type,
		description,
		deprecated,
		internal,
		source,
		line,
	} as const;
}
type AnalyzedExport = ReturnType<typeof analyzeExport>;

const KIND_DIRNAME_MAP = {
	type: "types",
	interface: "interfaces",
	enum: "enums",
	class: "classes",
	function: "functions",
	variable: "variables",
};

export const apiReferenceGeneratorConfig: Partial<PlopGeneratorConfig> = {
	prompts: [
		{
			type: "list",
			name: "package",
			choices: async () => {
				const packages = await collectPackages();
				return ["*", ...packages.keys()];
			},
			default: "*",
			message: "Select a package to generate API reference for:",
		},
	],
	actions: [
		async (answers) => {
			const packages = await collectPackages();
			answers.package =
				answers.package === "*"
					? Array.from(packages.keys())
					: [answers.package];

			const filesToCreate: (() => unknown | Promise<unknown>)[] = [];
			const contentBasePath = path.join(
				basePath,
				"./docs/content/api-reference",
			);

			for (const pkgName of answers.package as string[]) {
				const href = (p: string) => {
					const [first, ...rest] = pkgName.split("/");
					const basePath = rest.length > 0 ? rest.join("/") : first;
					return "./" + path.join(basePath, p).replace(/\\/g, "/");
				};

				const { path: pkgPath, packageJson } = packages.get(pkgName)!;
				const tsConfigPath = ts.findConfigFile(
					pkgPath,
					ts.sys.fileExists,
					"tsconfig.json",
				);
				if (!tsConfigPath) {
					console.warn(
						`No tsconfig.json found for package "${pkgName}" at path "${pkgPath}".`,
					);
					continue;
				}
				const tsConfigFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
				if (tsConfigFile.error) {
					throw new Error(
						`Error reading tsconfig.json for package "${pkgName}" at path "${pkgPath}": ${tsConfigFile.error.messageText}`,
					);
				}
				const tsConfig = ts.parseJsonConfigFileContent(
					tsConfigFile.config,
					ts.sys,
					pkgPath,
				);

				const program = ts.createProgram({
					rootNames: tsConfig.fileNames,
					options: tsConfig.options,
				});
				const typeChecker = program.getTypeChecker();
				const printer = ts.createPrinter({
					newLine: ts.NewLineKind.LineFeed,
					removeComments: true,
				});

				const results: Record<
					Exclude<AnalyzedExport["kind"], "unknown">,
					AnalyzedExport[]
				> = {
					type: [],
					interface: [],
					enum: [],
					class: [],
					function: [],
					variable: [],
				};

				for (const entry of Object.values(packageJson.exports ?? {})) {
					if (
						entry &&
						typeof entry === "object" &&
						"dev-source" in entry &&
						typeof entry["dev-source"] === "string"
					) {
						const devSource = entry["dev-source"];
						const absoluteDevSource = path.join(pkgPath, devSource);

						const source = program.getSourceFile(absoluteDevSource);
						if (!source) {
							console.warn(
								`Source file "${absoluteDevSource}" not found in program for package "${pkgName}".`,
							);
							continue;
						}
						const moduleSymbol = typeChecker.getSymbolAtLocation(source);
						if (!moduleSymbol) {
							console.warn(
								`Module symbol for source file "${absoluteDevSource}" not found in program for package "${pkgName}".`,
							);
							continue;
						}
						const exports = typeChecker.getExportsOfModule(moduleSymbol);

						for (const symbol of exports) {
							const e = analyzeExport(symbol, typeChecker, printer);
							if (e.kind !== "unknown") {
								results[e.kind].push(e);
							}
						}
					}
				}

				filesToCreate.push(async () => {
					const outputBasePath = path.join(contentBasePath, pkgName);
					await fs.rm(outputBasePath, { recursive: true, force: true });
					await fs.mkdir(outputBasePath, { recursive: true });

					for (const [kind, entries] of Object.entries(results)) {
						if (entries.length === 0) continue;
						const basePath = path.join(
							outputBasePath,
							KIND_DIRNAME_MAP[kind as keyof typeof KIND_DIRNAME_MAP],
						);
						await fs.mkdir(basePath, { recursive: true });
						for (const entry of entries) {
							if (!entry.toMDX) continue;
							const filePath = path.join(basePath, `${entry.name}.mdx`);
							await fs.writeFile(filePath, entry.toMDX(), "utf-8");
						}
					}

					const pkg = packages.get(pkgName)!;
					await fs.writeFile(
						path.join(outputBasePath, "index.mdx"),
						`---
title: ${normalizeFrontmatterValue(pkgName)}${
							typeof pkg.packageJson?.description === "string"
								? `
description: ${normalizeFrontmatterValue(pkg.packageJson.description)}`
								: ""
						}
---

${[
	results.class.length > 0
		? [
				"### Classes",
				results.class
					.map(
						(c) =>
							`- [${c.name}](${href(`${KIND_DIRNAME_MAP[c.kind as keyof typeof KIND_DIRNAME_MAP]}/${c.name}`)})`,
					)
					.join("\n"),
			]
				.filter(Boolean)
				.join("\n\n")
		: undefined,
	results.function.length > 0
		? [
				"### Functions",
				results.function
					.map(
						(f) =>
							`- [${f.name}](${href(
								`${KIND_DIRNAME_MAP[f.kind as keyof typeof KIND_DIRNAME_MAP]}/${f.name}`,
							)})`,
					)
					.join("\n"),
			]
				.filter(Boolean)
				.join("\n\n")
		: undefined,
	results.variable.length > 0
		? [
				"### Variables",
				results.variable
					.map(
						(v) =>
							`- [${v.name}](${href(`${KIND_DIRNAME_MAP[v.kind as keyof typeof KIND_DIRNAME_MAP]}/${v.name}`)})`,
					)
					.join("\n"),
			]
				.filter(Boolean)
				.join("\n\n")
		: undefined,
	results.enum.length > 0
		? [
				"### Enumerations",
				results.enum
					.map(
						(e) =>
							`- [${e.name}](${href(`${KIND_DIRNAME_MAP[e.kind as keyof typeof KIND_DIRNAME_MAP]}/${e.name}`)})`,
					)
					.join("\n"),
			]
				.filter(Boolean)
				.join("\n\n")
		: undefined,
	results.interface.length > 0
		? [
				"### Interfaces",
				results.interface
					.map(
						(i) =>
							`- [${i.name}](${href(`${KIND_DIRNAME_MAP[i.kind as keyof typeof KIND_DIRNAME_MAP]}/${i.name}`)})`,
					)
					.join("\n"),
			]
				.filter(Boolean)
				.join("\n\n")
		: undefined,
	results.type.length > 0
		? [
				"### Types",
				results.type
					.map(
						(t) =>
							`- [${t.name}](${href(`${KIND_DIRNAME_MAP[t.kind as keyof typeof KIND_DIRNAME_MAP]}/${t.name}`)})`,
					)
					.join("\n"),
			]
				.filter(Boolean)
				.join("\n\n")
		: undefined,
]
	.filter((val) => !!val && (Array.isArray(val) ? val.length > 0 : true))
	.join("\n\n")}
`,
						"utf-8",
					);

					await fs.writeFile(
						path.join(outputBasePath, "meta.json"),
						JSON.stringify(
							{
								title: pkgName,
								pages: Object.values(KIND_DIRNAME_MAP).map(
									(dirname) => `...${dirname}`,
								),
							},
							null,
							2,
						),
						"utf-8",
					);
				});
			}

			filesToCreate.push(async () => {
				const metaPath = path.join(contentBasePath, "meta.json");
				let metaExists = false;
				try {
					await fs.access(metaPath, fs.constants.W_OK | fs.constants.R_OK);
					metaExists = true;
				} catch {}
				let metaContent: string;
				if (!metaExists) {
					metaContent = JSON.stringify(
						{
							pages: answers.package,
						},
						null,
						2,
					);
				} else {
					const existing = JSON.parse(await fs.readFile(metaPath, "utf-8"));
					const existingPages = Array.isArray(existing.pages)
						? existing.pages
						: [];
					metaContent = JSON.stringify(
						{
							pages: [...new Set([...existingPages, ...answers.package])],
						},
						null,
						2,
					);
				}
				await fs.writeFile(metaPath, metaContent, "utf-8");
			});

			await Promise.all(filesToCreate.map((fn) => fn()));

			return "Done!";
		},
	],
};
