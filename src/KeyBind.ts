import { KeyPress } from './KeyPress.js';

class KeyBind extends Array {
	/**
	 * Creates a special KeyBind array based on a string representation of a
	 *   key, key combination, or key sequence.
	 *
	 * @constructor
	 *
	 * @param {string} bindingString - A string representing a key, key combination, or key sequence. For example, 'esc' or 'Ctrl+G Ctrl+D'.
	 */
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

	/**
	 * Returns a string representation of a KeyBind.
	 *
	 * @return {string}
	 */
	toString(): string {
		return this.join(' ');
	}

	/**
	 * Checks whether or not a given set of KeyPresses matches the current
	 *   KeyBind's criteria.
	 *
	 * @param  {KeyPress[]} keyPresses - The KeyPresses to check against.
	 *
	 * @return {boolean}
	 */
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
