import { ArrowLeftIcon, ArrowRightIcon, BookIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
	return (
		<div className="grow h-full grid place-items-center">
			<div className="text-center flex flex-col gap-6">
				<div className="space-y-2.5">
					<span className="text-lg text-muted-foreground">404</span>
					<h2 className="text-4xl">This page does not exist</h2>
					<p className="text-lg text-muted-foreground">
						Sorry, we couldn't find the page you're looking for.
					</p>
				</div>
				<div className="grid grid-cols-1 divide-y space-y-4">
					<Link href="/docs" className="group text-left p-4 flex items-center">
						<div className="p-2 border rounded-xl mr-4">
							<BookIcon className="size-4" />
						</div>
						<div className="leading-none space-y-0.5">
							<p>Documentation</p>
							<span className="text-muted-foreground text-xs">
								get started, profiles and more
							</span>
						</div>
						<ArrowRightIcon className="ml-auto invisible opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible size-4 text-muted-foreground transition-all" />
					</Link>
					<Link
						href="/"
						className="group w-fit mx-auto flex items-center h-9 hover:bg-muted px-4 transition-colors text-muted-foreground hover:text-foreground"
					>
						<ArrowLeftIcon className="mr-2 invisible opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-hover:visible size-4 text-muted-foreground transition-all" />
						<span>Back to Home</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
