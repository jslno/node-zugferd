import { data } from "./data";
import { invoicer } from "./invoicer";

/**
 * Welcome to Cloudflare Workers!
 *
 * This is a template for a Queue consumer: a Worker that can consume from a
 * Queue: https://developers.cloudflare.com/queues/get-started/
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
export type InvoiceInput = (typeof invoicer)["$Infer"]["Input"]["En16931"];

export default {
	async fetch(_request, env): Promise<Response> {
		await env.INVOICE_QUEUE.send(data, { contentType: "v8" });
		return new Response("Queued invoice");
	},

	async queue(batch): Promise<void> {
		for (const message of batch.messages) {
			try {
				const invoice = await invoicer.create("en-16931", message.body);
				console.log(invoice.toXML());
				message.ack();
			} catch (error) {
				console.error(error);
				message.retry();
			}
		}
	},
} satisfies ExportedHandler<Env, InvoiceInput>;
