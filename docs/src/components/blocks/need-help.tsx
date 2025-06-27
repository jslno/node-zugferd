import { CircleHelpIcon } from "lucide-react";
import Link from "next/link";

export const NeedHelp = () => (
	<div className="pt-6">
		<div className="px-4 py-6 not-prose border rounded-lg bg-gradient-to-tr from-muted/10 via-muted/25 to-muted/10 backdrop-blur-lg flex flex-col lg:flex-row gap-2 lg:gap-4">
			<div className="shrink-0 size-10 rounded-full border bg-muted/50 flex items-center justify-center">
				<CircleHelpIcon className="size-5 text-muted-foreground" />
			</div>
			<div className="space-y-2">
				<h3 className="text-xl md:text-2xl font-medium text-foreground">
					Need Help?
				</h3>
				<p className="text-muted-foreground">
					Don't hesitate to ask for help! You can open an{" "}
					<Link
						target="_blank"
						href="https://github.com/jslno/node-zugferd/issues/new"
						className="text-foreground font-medium underline underline-offset-4"
					>
						issue
					</Link>{" "}
					with questions.
				</p>
			</div>
		</div>
	</div>
);
