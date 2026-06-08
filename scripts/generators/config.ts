import type { NodePlopAPI } from "plop";
import { codelistGeneratorConfig } from "./codelist/generator";

export default function generator(plop: NodePlopAPI): void {
	plop.setGenerator("codelist", codelistGeneratorConfig);
}
