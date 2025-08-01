export const APIFeatures = () => (
	<div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto bg-gradient-to-tr from-muted/10 via-muted/25 to-muted/10 backdrop-blur-lg border-r border-b">
		{features.map((feature) => (
			<div key={feature.title} className="not-prose p-4 border-t border-l">
				<div>
					<p className="text-base font-bold mb-4">{feature.title}</p>
					<p className="text-base font-normal text-muted-foreground">
						{feature.description}
					</p>
				</div>
			</div>
		))}
	</div>
);

type Feature = {
	title: string;
	description?: string;
};

const features: Feature[] = [
	{
		title: "Preview invoices",
		description:
			"Generate PDF previews of invoices using your configured templates.",
	},
	{
		title: "Generate invoices",
		description:
			"Produce PDF/A-3b compliant invoices from your templates using Puppeteer.",
	},
	{
		title: "Authorization",
		description:
			"Control access to API endpoints with customizable request-based authorization.",
	},
	{
		title: "And more...",
		description: "Trusted origins, RPC client, and other advanced options.",
	},
];
