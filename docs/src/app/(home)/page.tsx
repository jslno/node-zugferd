import { Home } from "./client";

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
	const stars = (await fetchGitHubStars()) ?? "0";
	return <Home stars={stars} />;
}
