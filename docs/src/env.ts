import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
	server: {
		GITHUB_APP_ID: z.string().nonempty(),
		GITHUB_APP_PRIVATE_KEY: z.string().nonempty(),
	},
	runtimeEnv: {
		GITHUB_APP_ID: process.env.GITHUB_APP_ID,
		GITHUB_APP_PRIVATE_KEY: process.env.GITHUB_APP_PRIVATE_KEY,
	},
});
