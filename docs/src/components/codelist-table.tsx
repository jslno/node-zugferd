export function CodelistTable<T extends Record<string, string>>({
	items,
	fieldMap,
}: {
	items: T[];
	fieldMap?:
		| Partial<
				Record<
					keyof T,
					{
						label?: string | undefined;
						priority?: number | undefined;
						render?: ((value: string) => React.ReactNode) | undefined;
						width?: string | number | undefined;
					}
				>
		  >
		| undefined;
}) {
	const fields = Object.keys(items[0] ?? {}).sort((a, b) => {
		const aPriority =
			fieldMap?.[a as keyof T]?.priority ?? Number.MAX_SAFE_INTEGER;
		const bPriority =
			fieldMap?.[b as keyof T]?.priority ?? Number.MAX_SAFE_INTEGER;
		return aPriority - bPriority;
	});

	return (
		<table className="w-full table-fixed border-collapse wrap-anywhere">
			<colgroup>
				{fields.map((field) => (
					<col
						key={field}
						width={fieldMap?.[field as keyof T]?.width ?? undefined}
					/>
				))}
			</colgroup>
			<thead>
				<tr>
					{fields.map((field) => (
						<th key={field}>{fieldMap?.[field as keyof T]?.label ?? field}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{items.map((item, i) => (
					<tr key={i}>
						{fields.map((field) => (
							<td key={field}>
								{fieldMap?.[field as keyof T]?.render?.(
									item[field as keyof T],
								) ?? item[field as keyof T]}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
