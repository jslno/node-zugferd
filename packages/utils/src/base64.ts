export const base64 = {
	encode: (data: string | Uint8Array) => {
		const bytes =
			typeof data === "string" ? new TextEncoder().encode(data) : data;

		let binary = "";
		for (const byte of bytes) {
			binary += String.fromCharCode(byte);
		}

		return btoa(binary);
	},
	decode: (data: string) => {
		const binary = atob(data);
		return Uint8Array.from(binary, (char) => char.charCodeAt(0));
	},
};
