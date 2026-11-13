import fs from "node:fs/promises";
import path from "node:path";
import type {
	CommentDisplayPart,
	DeclarationReflection,
	ParameterReflection,
	ProjectReflection,
	SignatureReflection,
} from "typedoc";
import { ReflectionKind } from "typedoc";
import { gitConfig } from "../../../docs/src/lib/shared";
import { workspaceRoot } from "../helper";

const PAGE_KINDS = [
	{
		kind: ReflectionKind.Class,
		dir: "classes",
		heading: "Classes",
		label: "Class",
		icon: "class",
	},
	{
		kind: ReflectionKind.Function,
		dir: "functions",
		heading: "Functions",
		label: "Function",
		icon: "function",
	},
	{
		kind: ReflectionKind.Variable,
		dir: "variables",
		heading: "Variables",
		label: "Variable",
		icon: "variable",
	},
	{
		kind: ReflectionKind.Enum,
		dir: "enums",
		heading: "Enumerations",
		label: "Enumeration",
		icon: "enum",
	},
	{
		kind: ReflectionKind.Interface,
		dir: "interfaces",
		heading: "Interfaces",
		label: "Interface",
		icon: "interface",
	},
	{
		kind: ReflectionKind.TypeAlias,
		dir: "types",
		heading: "Types",
		label: "Type",
		icon: "type",
	},
] as const;

type PageKind = (typeof PAGE_KINDS)[number];

type SourceLocation = {
	relative: string;
	line: number;
};

type Page = {
	name: string;
	fileName: string;
	kind: PageKind;
	reflection: DeclarationReflection;
	exportedFrom?: SourceLocation;
};

export async function writePackageReference(options: {
	project: ProjectReflection;
	packageName: string;
	description?: string;
	outDir: string;
}) {
	const pages = collectPages(options.project);
	await fs.rm(options.outDir, { recursive: true, force: true });
	await fs.mkdir(options.outDir, { recursive: true });

	const writtenDirs: string[] = [];
	for (const kind of PAGE_KINDS) {
		const entries = pages.filter((page) => page.kind === kind);
		if (entries.length === 0) continue;
		writtenDirs.push(kind.dir);
		const dir = path.join(options.outDir, kind.dir);
		await fs.mkdir(dir, { recursive: true });
		for (const page of entries) {
			await fs.writeFile(
				path.join(dir, `${page.fileName}.mdx`),
				renderPage(page),
				"utf-8",
			);
		}
	}

	await fs.writeFile(
		path.join(options.outDir, "index.mdx"),
		renderIndex(options.packageName, options.description, pages),
		"utf-8",
	);
	await fs.writeFile(
		path.join(options.outDir, "meta.json"),
		`${JSON.stringify(
			{
				title: options.packageName,
				pages: writtenDirs.map((dir) => `...${dir}`),
			},
			null,
			2,
		)}\n`,
		"utf-8",
	);
}

function collectPages(project: ProjectReflection): Page[] {
	const modules = (project.children ?? []).filter((child) =>
		child.kindOf(ReflectionKind.Module),
	);
	const containers = modules.length > 0 ? modules : [project];
	const seen = new Set<string>();
	const used = new Map<string, number>();
	const pages: Page[] = [];

	for (const container of containers) {
		for (const child of container.children ?? []) {
			const resolved = resolveDeclaration(child);
			if (!resolved) {
				console.warn(
					`Skipping unresolved export ${child.getFriendlyFullName()}`,
				);
				continue;
			}
			const kind = PAGE_KINDS.find((entry) => resolved.kind === entry.kind);
			if (!kind) continue;
			// Entry points re-export the same declaration (package root and `./types`).
			const key = declarationKey(resolved);
			if (seen.has(key)) continue;
			seen.add(key);
			const fileName = uniqueFileName(kind.dir, child.name, used);
			pages.push({
				name: child.name,
				fileName,
				kind,
				reflection: resolved,
				exportedFrom: projectSource(child),
			});
		}
	}

	pages.sort((a, b) => a.name.localeCompare(b.name));
	return pages;
}

function resolveDeclaration(
	reflection: DeclarationReflection,
): DeclarationReflection | undefined {
	if (!reflection.isReference()) return reflection;
	const target = reflection.tryGetTargetReflectionDeep();
	if (target?.isDeclaration() && target.variant === "declaration")
		return target;
	return undefined;
}

function declarationKey(reflection: DeclarationReflection) {
	const source = reflection.sources?.[0];
	if (source?.fullFileName) {
		return `${reflection.kind}:${source.fullFileName}:${source.line}:${reflection.name}`;
	}
	return `${reflection.kind}:id:${reflection.id}`;
}

function uniqueFileName(dir: string, name: string, used: Map<string, number>) {
	const safe = name.replace(/[<>:"/\\|?*]/g, "-");
	const key = `${dir}/${safe}`;
	const count = used.get(key) ?? 0;
	used.set(key, count + 1);
	return count === 0 ? safe : `${safe}-${count + 1}`;
}

function renderIndex(
	packageName: string,
	description: string | undefined,
	pages: Page[],
) {
	const sections = PAGE_KINDS.map((kind) => {
		const entries = pages.filter((page) => page.kind === kind);
		if (entries.length === 0) return undefined;
		const links = entries
			.map((page) => `- [${page.name}](./${kind.dir}/${page.fileName})`)
			.join("\n");
		return `### ${kind.heading}\n\n${links}`;
	}).filter((section): section is string => !!section);

	return `${frontmatter({ title: packageName, description })}\n${sections.join("\n\n")}\n`;
}

function renderPage(page: Page) {
	const { reflection, kind, name } = page;
	const description = shortSummary(reflection);
	const declaration =
		reflection.kind === ReflectionKind.Function
			? undefined
			: declarationText(page);
	const body = [
		`## ${kind.label} ${inlineCode(name)}`,
		declaration ? codeBlock("ts", declaration) : undefined,
		commentBody(reflection),
		deprecatedNote(reflection),
		...memberSections(reflection),
		typeDeclaration(reflection),
		definedIn(reflection, page.exportedFrom),
	].filter((part): part is string => !!part);

	return `${frontmatter({
		icon: kind.icon,
		title: name,
		description,
	})}\n${body.join("\n\n")}\n`;
}

function declarationText(page: Page) {
	const { reflection, name } = page;
	const typeParameters = formatTypeParameters(reflection.typeParameters);
	if (reflection.kind === ReflectionKind.Class) {
		return `class ${name}${typeParameters}${heritage(reflection)}`;
	}
	if (reflection.kind === ReflectionKind.Interface) {
		return `interface ${name}${typeParameters}${heritage(reflection)}`;
	}
	if (reflection.kind === ReflectionKind.Enum) {
		const members = (reflection.children ?? [])
			.filter((child) => child.kind === ReflectionKind.EnumMember)
			.map((member) =>
				member.defaultValue
					? `${member.name} = ${member.defaultValue}`
					: member.name,
			);
		return `enum ${name} {\n${members.map((member) => `\t${member}`).join("\n")}\n}`;
	}
	if (reflection.kind === ReflectionKind.TypeAlias) {
		if (reflection.type) {
			return `type ${name}${typeParameters} = ${reflection.type.toString()}`;
		}
		return `type ${name}${typeParameters} = {\n${objectBody(reflection)}\n}`;
	}
	if (reflection.kind === ReflectionKind.Variable) {
		const keyword = reflection.flags.isConst ? "const" : "let";
		const type = reflection.type ? `: ${reflection.type.toString()}` : "";
		const value = reflection.defaultValue
			? ` = ${reflection.defaultValue}`
			: "";
		return `${keyword} ${name}${type}${value}`;
	}
	return reflection.toString();
}

function objectBody(reflection: DeclarationReflection) {
	const fields = (reflection.children ?? [])
		.filter((child) => !child.flags.isPrivate)
		.map((child) => {
			const readonly = child.flags.isReadonly ? "readonly " : "";
			const optional = child.flags.isOptional ? "?" : "";
			const type = child.type ? `: ${child.type.toString()}` : "";
			return `\t${readonly}${child.name}${optional}${type}`;
		});
	const indexes = (reflection.indexSignatures ?? []).map(
		(signature) => `\t${formatSignature(signature, { index: true })}`,
	);
	return [...fields, ...indexes].join("\n");
}

function formatSignature(
	signature: SignatureReflection,
	options?: { index?: boolean },
) {
	const typeParameters = formatTypeParameters(signature.typeParameters);
	const parameters = (signature.parameters ?? [])
		.map((parameter) => {
			const rest = parameter.flags.isRest ? "..." : "";
			const optional = parameter.flags.isOptional ? "?" : "";
			const type = parameter.type ? `: ${parameter.type.toString()}` : "";
			return `${rest}${parameter.name}${optional}${type}`;
		})
		.join(", ");
	const returns = signature.type ? `: ${signature.type.toString()}` : "";
	if (options?.index) {
		return `[${parameters}]${returns}`;
	}
	return `${signature.name}${typeParameters}(${parameters})${returns}`;
}

function heritage(reflection: DeclarationReflection) {
	const parts: string[] = [];
	if (reflection.extendedTypes?.length) {
		parts.push(
			`extends ${reflection.extendedTypes.map((type) => type.toString()).join(", ")}`,
		);
	}
	if (reflection.implementedTypes?.length) {
		parts.push(
			`implements ${reflection.implementedTypes.map((type) => type.toString()).join(", ")}`,
		);
	}
	return parts.length > 0 ? ` ${parts.join(" ")}` : "";
}

function formatTypeParameters(
	parameters: DeclarationReflection["typeParameters"],
) {
	if (!parameters?.length) return "";
	return `<${parameters
		.map((parameter) => {
			const constraint = parameter.type ? ` extends ${parameter.type}` : "";
			const fallback = parameter.default ? ` = ${parameter.default}` : "";
			const variance = parameter.varianceModifier
				? `${parameter.varianceModifier} `
				: "";
			return `${variance}${parameter.name}${constraint}${fallback}`;
		})
		.join(", ")}>`;
}

function memberSections(reflection: DeclarationReflection) {
	if (
		reflection.kind !== ReflectionKind.Class &&
		reflection.kind !== ReflectionKind.Interface &&
		reflection.kind !== ReflectionKind.Enum &&
		reflection.kind !== ReflectionKind.TypeAlias
	) {
		return signatureDetails(reflection);
	}

	const children = (reflection.children ?? []).filter(
		(child) => !child.flags.isPrivate,
	);
	const sections: Array<string | undefined> = [];

	if (reflection.kind === ReflectionKind.Enum) {
		const members = children.filter(
			(child) => child.kind === ReflectionKind.EnumMember,
		);
		if (members.length > 0) {
			sections.push(
				`### Members\n\n${members.map((member) => renderMember(member)).join("\n\n")}`,
			);
		}
		return sections;
	}

	const constructors = children.filter(
		(child) => child.kind === ReflectionKind.Constructor,
	);
	const properties = children.filter(
		(child) => child.kind === ReflectionKind.Property,
	);
	const accessors = children.filter(
		(child) => child.kind === ReflectionKind.Accessor,
	);
	const methods = children.filter(
		(child) => child.kind === ReflectionKind.Method,
	);

	if (constructors.length > 0) {
		sections.push(
			`### Constructors\n\n${constructors.map((member) => renderCallable(member)).join("\n\n")}`,
		);
	}
	if (properties.length > 0) {
		sections.push(
			`### Properties\n\n${properties.map((member) => renderMember(member)).join("\n\n")}`,
		);
	}
	if (accessors.length > 0) {
		sections.push(
			`### Accessors\n\n${accessors.map((member) => renderAccessor(member)).join("\n\n")}`,
		);
	}
	if (methods.length > 0) {
		sections.push(
			`### Methods\n\n${methods.map((member) => renderCallable(member)).join("\n\n")}`,
		);
	}
	if (reflection.indexSignatures?.length) {
		sections.push(
			`### Index Signatures\n\n${reflection.indexSignatures
				.map((signature) => renderSignature(signature))
				.join("\n\n")}`,
		);
	}
	return sections;
}

function signatureDetails(reflection: DeclarationReflection) {
	const signatures = reflection.getNonIndexSignatures();
	if (signatures.length === 0) return [];
	return [
		signatures.map((signature) => renderSignature(signature)).join("\n\n"),
	];
}

function renderCallable(reflection: DeclarationReflection) {
	const signatures = reflection.signatures ?? reflection.getAllSignatures();
	return [
		`#### ${inlineCode(reflection.name)}`,
		commentBody(reflection),
		signatures.map((signature) => renderSignature(signature)).join("\n\n"),
		definedIn(reflection),
	]
		.filter((part): part is string => !!part)
		.join("\n\n");
}

function renderMember(reflection: DeclarationReflection) {
	const type = reflection.type?.toString() ?? reflection.defaultValue ?? "";
	return [
		`#### ${inlineCode(reflection.name)}`,
		type ? codeBlock("ts", type) : undefined,
		commentBody(reflection),
		deprecatedNote(reflection),
		typeDeclaration(reflection),
		definedIn(reflection),
	]
		.filter((part): part is string => !!part)
		.join("\n\n");
}

function renderAccessor(reflection: DeclarationReflection) {
	const blocks = [reflection.getSignature, reflection.setSignature]
		.filter((signature): signature is SignatureReflection => !!signature)
		.map((signature) => renderSignature(signature));
	return [
		`#### ${inlineCode(reflection.name)}`,
		commentBody(reflection),
		...blocks,
		definedIn(reflection),
	]
		.filter((part): part is string => !!part)
		.join("\n\n");
}

function renderSignature(signature: SignatureReflection) {
	const parameters = signature.parameters ?? [];
	const returns = signature.type?.toString();
	const returnsDescription =
		tagText(signature, "@returns") ?? tagText(signature, "@return");
	return [
		codeBlock("ts", formatSignature(signature)),
		commentBody(signature),
		parameters.length > 0
			? `**Parameters**\n\n${parameters.map(renderParameter).join("\n")}`
			: undefined,
		returns ? `**Returns** ${inlineCode(returns)}` : undefined,
		returnsDescription,
	]
		.filter((part): part is string => !!part)
		.join("\n\n");
}

function renderParameter(parameter: ParameterReflection) {
	const rest = parameter.flags.isRest ? "..." : "";
	const optional = parameter.flags.isOptional ? "?" : "";
	const type = parameter.type ? `: ${parameter.type.toString()}` : "";
	const description = commentBody(parameter);
	return `- ${inlineCode(`${rest}${parameter.name}${optional}${type}`)}${
		description ? `\n  ${description}` : ""
	}`;
}

function typeDeclaration(reflection: DeclarationReflection) {
	const type = reflection.type;
	if (type?.type !== "reflection") return undefined;
	const members = (type.declaration.children ?? []).filter(
		(child) => !child.flags.isPrivate,
	);
	if (members.length === 0) return undefined;
	return `### Type Declaration\n\n${members
		.map((member) => renderMember(member))
		.join("\n\n")}`;
}

function commentBody(reflection: {
	comment?: { summary: readonly CommentDisplayPart[] };
}) {
	const text = displayParts(reflection.comment?.summary);
	return text.length > 0 ? text : undefined;
}

function shortSummary(reflection: DeclarationReflection) {
	const text = displayParts(reflection.comment?.getShortSummary(true));
	return text.length > 0 ? text : undefined;
}

function deprecatedNote(reflection: DeclarationReflection) {
	const text = displayParts(reflection.comment?.getTag("@deprecated")?.content);
	if (!text && !reflection.isDeprecated()) return undefined;
	return `> **Deprecated**${text ? `: ${text}` : ""}`;
}

function tagText(signature: SignatureReflection, tag: "@returns" | "@return") {
	const text = displayParts(signature.comment?.getTag(tag)?.content);
	return text.length > 0 ? text : undefined;
}

function projectSource(reflection: {
	sources?: { fullFileName: string; line: number }[];
}): SourceLocation | undefined {
	const source = reflection.sources?.[0];
	if (!source?.fullFileName) return undefined;
	const relative = path
		.relative(workspaceRoot, source.fullFileName)
		.replaceAll("\\", "/");
	if (
		relative.startsWith("../") ||
		relative === "node_modules" ||
		relative.startsWith("node_modules/") ||
		relative.includes("/node_modules/")
	) {
		return undefined;
	}
	return { relative, line: source.line };
}

function definedIn(
	reflection: { sources?: { fullFileName: string; line: number }[] },
	fallback?: SourceLocation,
) {
	const source = projectSource(reflection) ?? fallback;
	if (!source) return undefined;
	const file = source.relative
		.split("/")
		.map((part) => encodeURIComponent(part))
		.join("/");
	const url = `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/${file}#L${source.line}`;
	return `Defined in [${source.relative}:${source.line}](${url})`;
}

function displayParts(parts: readonly CommentDisplayPart[] | undefined) {
	if (!parts || parts.length === 0) return "";
	return parts
		.map((part) => {
			if (part.kind === "inline-tag") return part.tsLinkText || part.text;
			return part.text;
		})
		.join("")
		.trim();
}

function frontmatter(fields: {
	icon?: string;
	title: string;
	description?: string;
}) {
	const lines = ["---"];
	if (fields.icon) lines.push(`icon: ${quote(fields.icon)}`);
	lines.push(`title: ${quote(fields.title)}`);
	if (fields.description) {
		lines.push(`description: ${quote(oneLine(fields.description))}`);
	}
	lines.push("---");
	return lines.join("\n");
}

function quote(value: string) {
	return JSON.stringify(value);
}

function oneLine(value: string) {
	return value.replace(/\s+/g, " ").trim();
}

function codeBlock(lang: string, code: string) {
	return `\`\`\`${lang}\n${code}\n\`\`\``;
}

function inlineCode(code: string) {
	return `<code>${code.replace(/[^\p{L}\p{N}\s]/gu, "\\$&")}</code>`;
}
