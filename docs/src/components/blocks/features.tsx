import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

export const Features = () => (
	<div className="py-2">
		<div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto border-r border-b bg-gradient-to-tr from-muted/10 via-muted/25 to-muted/10 backdrop-blur-lg">
			{features.map((feature) => (
				<div
					key={feature.title}
					className={cn(
						"not-prose p-4 border-t border-l",
						feature.meta?.className,
					)}
				>
					<div
						className={cn(
							!!feature.meta?.COMING_SOON && "opacity-50 pointer-events-none",
						)}
					>
						<p className="text-base font-bold mb-4">
							{feature.title}
							{!!feature.meta?.COMING_SOON && (
								<Badge variant="outline" className="ml-2">
									Coming Soon
								</Badge>
							)}
						</p>
						<p className="text-base font-normal text-muted-foreground">
							{feature.description}
						</p>
					</div>
				</div>
			))}
		</div>
	</div>
);

type Feature = {
	title: string;
	description: string;
	meta?: {
		className?: string;
		COMING_SOON?: boolean;
	};
};

const features: Feature[] = [
	{
		title: "Generate ZUGFeRD/Factur-X compliant XML",
		description:
			"Generate structured XML invoices in the Factur-X (ZUGFeRD) format, ensuring compliance with electronic invoicing regulations and smooth integration with financial systems for faster, more accurate invoicing.",
		meta: {
			className: "sm:col-span-2",
		},
	},
	{
		title: "Embed XML in PDF/A-3b",
		description:
			"Embed the XML invoice into a PDF/A-3b, making it both human-readable and machine-processable.",
	},
	{
		title: "Ensure XML Compliance",
		description:
			"Verify the generated XML against the ZUGFeRD/Factur-X schema to ensure compliance with industry standards.",
	},
	{
		title: "Parse ZUGFeRD/Factur-X Documents",
		description:
			"Extract and process ZUGFeRD/Factur-X data for seamless automation.",
		meta: {
			COMING_SOON: true,
		},
	},
	{
		title: "Easily Customizable",
		description:
			"Easily create and customize profiles to match your specific needs, whether for invoices or orders.",
	},
];
