import { getRandomValues } from "uncrypto";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
	console.log(charSet)
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
