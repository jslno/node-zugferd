import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { invoicer } from "./invoicer";

const app = new Hono();

app.use(prettyJSON()).use(cors());

app.post("/invoice/:profileId/generate", async (c) => {
	const profileId = c.req.param("profileId") as typeof invoicer.$Infer.Profile;
	if (!invoicer.$context.hasProfile(profileId)) {
		return c.json({ error: "Profile not found" }, 404);
	}

	const invoice = await invoicer.create(profileId, await c.req.json());

	if (c.req.header("Accept")?.includes("application/xml")) {
		return c.body(invoice.toXML(), 200, {
			"Content-Type": "application/xml",
			"Content-Disposition": 'inline; filename="invoice.xml"',
		});
	}

	const pdf = await (await invoice.toPDF(invoicer.template("default"))).save();

	return c.body(new Uint8Array(pdf), 200, {
		"Content-Type": "application/pdf",
		"Content-Disposition": 'inline; filename="invoice.pdf"',
	});
});

app.post("/invoice/:profileId/parse", async (c) => {
	const profileId = c.req.param("profileId") as typeof invoicer.$Infer.Profile;
	if (!invoicer.$context.hasProfile(profileId)) {
		return c.json({ error: "Profile not found" }, 404);
	}

	let input: string | Uint8Array;
	if (c.req.header("Content-Type")?.includes("application/xml")) {
		input = await c.req.text();
	} else {
		input = await c.req.bytes();
	}
	const { data } = await invoicer.parse(profileId, input);

	return c.json(data);
});

serve(
	{
		fetch: app.fetch,
		port: 3000,
	},
	(info) => {
		console.log(
			`Server is running on ${info.address === "::" ? "localhost" : info.address}:${info.port}`,
		);
	},
);
