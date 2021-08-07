import { KeyPress } from './KeyPress.js';

class KeyBind extends Array {
	constructor(bindingString: string) {
		if (!(typeof bindingString === 'string')) {
			throw new RangeError(`KeyBind: Constructor argument must be a string`);
		}

		super(0);

		const bindings = bindingString.trim().split(/\s+/g);

		for (const binding of bindings) {
			this.push(binding);
		}
	}

	toString(): string {
		return this.join(' ');
	}

	match(keyPresses: KeyPress[]): boolean {
		if (keyPresses.length !== this.length) {
			return false;
		}

		for (const [i, keyPress] of keyPresses.entries()) {
			const keyBind = this[i];

			if (!keyPress.match(keyBind)) {
				return false;
			}
		}

		return true;
	}
}

export { KeyBind };
