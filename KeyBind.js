class KeyBind extends Array {
	constructor(bindingString) {
		if (!(typeof bindingString === 'string')) {
			throw new RangeError(`KeyBind: Constructor argument must be a string`);
		}

		super(0);

		const bindings = bindingString.trim().split(/\s+/g);

		for (const binding of bindings) {
			this.push(binding);
		}
	}

	toString() {
		return this.join(' ');
	}
}

export { KeyBind };
