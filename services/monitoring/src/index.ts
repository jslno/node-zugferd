import { env } from "cloudflare:workers";
import { Readable } from "node:stream";
import { extractUpdate } from "./lib/extract";
import { createIssue } from "./lib/github";
import {
	matchesAllowedSenders,
	parseEmail,
	parseEmailsFromHeader,
} from "./lib/mail";

export type EmailJobsQueuePayload = {
	messageId: string;
	from: string;
	date: string | null;
	subject: string;
	body: string;
};

export interface Env extends Cloudflare.Env {
	EMAIL_JOBS: Queue<EmailJobsQueuePayload>;
}

const CONFIDENCE_THRESHOLD = Number(env.CONFIDENCE_THRESHOLD);

export default {
	async email(message, env, ctx): Promise<void> {
		const from = message.headers.get("From");
		if (!from) return;
		const messageId = message.headers.get("Message-ID");
		if (!messageId) return;
		const senders = parseEmailsFromHeader(from);
		const sender = [...senders.values()].find((sender) =>
			matchesAllowedSenders(sender),
		);
		if (!sender) return;

		const parsedEmail = await parseEmail(
			Readable.from({
				async *[Symbol.asyncIterator]() {
					const reader = message.raw.getReader();

					try {
						while (true) {
							const { done, value } = await reader.read();

							if (done) return;
							yield value;
						}
					} finally {
						reader.releaseLock();
					}
				},
			}),
		);

		if (!parsedEmail.subject || !parsedEmail.text) {
			console.error("Email has no subject or body");
			return;
		}

		await env.EMAIL_JOBS.send({
			messageId,
			from: sender,
			date: parsedEmail.date?.toISOString() ?? null,
			subject: parsedEmail.subject,
			body: parsedEmail.text,
		});
	},
	async queue(batch, env, ctx): Promise<void> {
		for (const message of batch.messages) {
			try {
				const { output: extractedUpdate } = await extractUpdate(
					env,
					message.body,
				);

				if (
					!extractedUpdate.isUpdate ||
					extractedUpdate.confidence < CONFIDENCE_THRESHOLD
				) {
					message.ack();
					continue;
				}

				await createIssue(message.body.messageId, extractedUpdate);
				message.ack();
			} catch (error) {
				console.error("Failed to process email:", error);
				message.retry({
					delaySeconds: 60 * 60 * 3, // 3 hours
				});
			}
		}
	},
} satisfies ExportedHandler<Env, EmailJobsQueuePayload>;
