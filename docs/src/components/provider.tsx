"use client";

import { RootProvider } from "@fumadocs/base-ui/provider/next";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { CustomSearchDialog } from "@/components/search-dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getQueryClient } from "@/lib/query-client";

export function Provider({ children }: { children?: React.ReactNode }) {
	const [queryClient] = useState(getQueryClient);

	return (
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<RootProvider search={{ SearchDialog: CustomSearchDialog }}>
					{children}
				</RootProvider>
			</TooltipProvider>
		</QueryClientProvider>
	);
}
