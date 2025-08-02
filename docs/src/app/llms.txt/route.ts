import { getLLMText } from "../docs/lib/get-llm-text";
import { source } from "../source";

export const revalidate = false;

export async function GET() {
	const scan = source.getPages().map(getLLMText);
	const scanned = await Promise.all(scan);

	return new Response(scanned.join("\n\n"));
}
