import type { Stripe } from "stripe";
import { createApiEndpoint } from "../../api";
import type { ZugferdApiPlugin } from "../../types/plugins";

export type StripeOptions = {
	/**
	 * Your stripe instance
	 */
	stripe: Stripe;
	/**
	 * Your endpoint's unique secret
     * 
     * Create here: {@link https://dashboard.stripe.com/webhooks}
	 */
	endpointSecret: string;
};

export const stripe = <O extends StripeOptions>(options: O) => {
	return {
		id: "stripe",
		endpoints: {
			stripeWebhook: createApiEndpoint(
				"/stripe/webhook",
				{
					method: "POST",
					requireHeaders: true,
				},
				async (ctx) => {
					let event: Stripe.Event;

					try {
						const signature = ctx.headers.get("stripe-signature");
						if (!signature) {
							throw new Error("Missing signature");
						}

						event = options.stripe.webhooks.constructEvent(
							ctx.body,
							signature,
							options.endpointSecret,
						);
					} catch (err: any) {
						console.error(
							"⚠️ Webhook signature verification failed.",
							err?.message,
						);
						return ctx.error("BAD_REQUEST");
					}

					switch (event.type) {
						/**
						 * TODO: Handle events
						 * - Normalize data
						 * - Call create endpoint
						 * - Run callback (send invoice to customer, store invoice)
						 */
						default:
							console.log(`Unhandled event type ${event.type}.`);
					}

					return ctx.json(null, { status: 200 });
				},
			),
		},
	} satisfies ZugferdApiPlugin;
};
