import type { NodePlopAPI } from "plop";
import { apiReferenceGeneratorConfig } from "./api-reference/generator";
import { codelistGeneratorConfig } from "./codelist/generator";
import { profileMetaGeneratorConfig } from "./profile-meta/generator";

export default function generator(plop: NodePlopAPI): void {
	plop.setGenerator("api-reference", apiReferenceGeneratorConfig);
	plop.setGenerator("codelist", codelistGeneratorConfig);
	plop.setGenerator("profile-meta", profileMetaGeneratorConfig);
}
