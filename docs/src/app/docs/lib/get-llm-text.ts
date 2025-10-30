import { readFile } from "fs/promises";
import { remarkNpm } from "fumadocs-core/mdx-plugins";
import { fileGenerator, remarkDocGen } from "fumadocs-docgen";
import { remarkInclude } from "fumadocs-mdx/config";
import { remarkAutoTypeTable } from "fumadocs-typescript";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkStringify from "remark-stringify";

const processor = remark()
	.use(remarkMdx)
	.use(remarkInclude)
	.use(remarkGfm)
	.use(remarkAutoTypeTable)
	.use(remarkDocGen, { generators: [fileGenerator()] })
	.use(remarkNpm)
	.use(remarkStringify);

export const getLLMText = async (docPage: any) => {
	const category = [docPage.slugs[0]];

	const rawContent = await readFile(docPage.data._file.absolutePath, "utf-8");

	const processed = await processor.process({
		path: docPage.data._file.absolutePath,
		value: rawContent,
	});

	return `# ${category}: ${docPage.data.title}
URL: ${docPage.url}
Source: https://github.com/jslno/node-zugferd/blob/main/docs/content/docs/${
		docPage.path
	}

${docPage.data.description}

${processed.toString()}`;
};
