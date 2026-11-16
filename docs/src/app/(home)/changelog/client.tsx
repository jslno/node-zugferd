"use client";

export function FormatDate({ date }: { date: string }) {
	return new Date(date).toLocaleDateString(undefined, {
		dateStyle: "medium",
	});
}
