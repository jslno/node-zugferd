import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";

async function fetchGitHubStars() {
	try {
		const res = await fetch("https://api.github.com/repos/jslno/node-zugferd", {
			next: {
				revalidate: 60,
			},
		});
		if (!res?.ok) {
			return null;
		}
		const json = await res.json();
		return parseInt(json.stargazers_count).toLocaleString();
	} catch {
		return null;
	}
}

export default async function HomePage() {
	const stars = await fetchGitHubStars() ?? "0";
	return (
		<div className="relative h-min pb-6">
			<div className="max-h-dvh absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,rgba(79,79,79,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(79,79,79,0.1)_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
			<Hero />
			<Features stars={stars} />
		</div>
	);
}
