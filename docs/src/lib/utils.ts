import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getRandomValues } from "uncrypto";
import { InViewVariant } from "@/components/ui/in-view";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const kFormatter = (num: number) =>
	Math.abs(num) > 999
		? Math.sign(num) * parseFloat((Math.abs(num) / 1_000).toFixed(1)) + "k"
		: Math.sign(num) * Math.abs(num);

const alphabet = "abcdefghijklmnopqrstuvwxyz";

export const createRandomString = (
	len: number,
	charSet: string = alphabet + alphabet.toUpperCase() + "-_",
) => {
	if (len <= 0) {
		throw new Error("Length must be a positive integer");
	}

	const charSetLength = charSet.length;
	const charArray = new Uint8Array(len);
	getRandomValues(charArray);

	let result = "";
	for (let i = 0; i < len; i++) {
		const index = charArray[i] % charSetLength;
		result += charSet[index];
	}

	return result;
};

export const slideInUp: InViewVariant = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0 },
};

export const fadeIn: InViewVariant = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
};
