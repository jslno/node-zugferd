import Link from "next/link";

export const NeedHelp = () => (
	<div className="pt-6">
		<div className="px-4 py-6 not-prose md:text-center border rounded-lg bg-gradient-to-tr from-muted/10 via-muted/25 to-muted/10 backdrop-blur-lg">
			<h3 className="text-2xl md:text-3xl leading-relaxed font-medium text-foreground">
				Need Help?
			</h3>
			<p className="text-muted-foreground">
				Don't hesitate to ask for help! You can open an{" "}
				<Link
					href="https://github.com/jslno/node-zugferd/issues/new"
					className="text-foreground font-medium underline underline-offset-4"
				>
					issue
				</Link>{" "}
				with questions
			</p>
		</div>
	</div>
);
