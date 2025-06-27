import { createClient } from "@node-zugferd/api/client";
import type { BASIC } from "node-zugferd/profile";

export const client = createClient<typeof BASIC>();
