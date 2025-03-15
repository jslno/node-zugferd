import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const kFormatter = (num: number) =>
	Math.abs(num) > 999
		? Math.sign(num) * parseFloat((Math.abs(num) / 1_000).toFixed(1)) + "k"
		: Math.sign(num) * Math.abs(num);
