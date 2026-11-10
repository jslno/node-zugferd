export interface BaseMetadata<Input> {
	readonly kind: "metadata";
	readonly type: string;
	readonly reference: (...args: any[]) => BaseMetadata<any>;
	readonly "~types"?:
		| {
				readonly input: Input;
				readonly output: Input;
				readonly issue: never;
		  }
		| undefined;
}
