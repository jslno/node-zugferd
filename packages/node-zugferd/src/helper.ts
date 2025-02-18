const isDate = (value: unknown): value is Date =>
	value instanceof Date && !isNaN(value.getTime());

export const dateTimeStringFormatter = (date: unknown) => {
	if (!isDate(date)) return;

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}${month}${day}`;
};

export const base64ToUint8Array = (base64: string) =>
	new Uint8Array([...atob(base64)].map((char) => char.charCodeAt(0)));
