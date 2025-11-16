import { mustang } from "@node-zugferd/mustang";

export default async function globalSetup() {
	await mustang.setup();
}
