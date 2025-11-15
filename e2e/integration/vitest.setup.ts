import { mustangValidator } from "@node-zugferd/validator-mustang";

export default async function globalSetup() {
	await mustangValidator.setup();
}
