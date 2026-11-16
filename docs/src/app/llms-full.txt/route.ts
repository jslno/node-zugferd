import { llms } from "@/lib/source";

export const revalidate = false;

export async function GET() {
	return new Response(await llms.full());
}
