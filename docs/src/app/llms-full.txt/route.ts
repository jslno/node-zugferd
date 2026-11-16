import { llms } from "@/lib/source";

export async function GET() {
	return new Response(await llms.full());
}
