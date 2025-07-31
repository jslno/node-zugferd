import { createClient } from "@node-zugferd/api/client";
import type { zugferdApi } from "./invoicer";

export const client = createClient<typeof zugferdApi>();
