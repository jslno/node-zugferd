"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { createRandomString } from "@/lib/utils";

export const GenerateSecret = () => {
	const [generated, setGenerated] = useState(false);

	return (
		<div className="my-2">
			<Button
				variant="outline"
				size="sm"
				disabled={generated}
				onClick={() => {
					const elements = document.getElementsByTagName("code");
					for (let i = 0; i < elements.length; i++) {
						if (elements[i].textContent === "ZUGFERD_API_SECRET=") {
							elements[i].textContent =
								`ZUGFERD_API_SECRET=${createRandomString(32)}`;
							setGenerated(true);

							setTimeout(() => {
								elements[i].textContent = "ZUGFERD_API_SECRET=";
								setGenerated(false);
							}, 7000);
						}
					}
				}}
			>
				{generated ? "Generated" : "Generate Secret"}
			</Button>
		</div>
	);
};
