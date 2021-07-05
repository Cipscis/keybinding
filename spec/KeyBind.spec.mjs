import { KeyBind } from '../KeyBind.js';
import { KeyPress } from '../KeyPress.js';

describe('KeyBind', () => {
	it(`throws an error if a string is not passed to its constructor`, () => {
		expect(() => new KeyBind()).toThrow();
		expect(() => new KeyBind(1)).toThrow();
	});

	it(`creates an array of key binding requirements from a string`, () => {
		const keyBind = new KeyBind('ctrl+a');

		expect(keyBind.length).toBe(1);

		const keySequence = new KeyBind('k ctrl+c');

		expect(keySequence.length).toBe(2);
	});

	it(`stringifies itself`, () => {
		const keyBind = new KeyBind('ctrl+shift+a');

		expect(keyBind + '').toBe('ctrl+shift+a');

		const keySequence = new KeyBind('k ctrl+c');

		expect(keySequence + '').toBe('k ctrl+c');
	});

	it(`ignores whitespace at start or end of binding string`, () => {
		const keySequence = new KeyBind(' 	a 3  space 	');

		expect(keySequence.length).toBe(3);

		expect(keySequence + '').toBe('a 3 space');
	});

	it(`can match against an array of KeyPresses`, () => {
		let keyBind = new KeyBind('ctrl+shift+a alt+x esc');

		let keyPresses = [
			new KeyPress({
				key: 'a',
				ctrlKey: true,
				shiftKey: true,
			}),
			new KeyPress({
				key: 'x',
				altKey: true,
			}),
			new KeyPress({
				key: 'escape',
			}),
		];

		expect(keyBind.match(keyPresses)).toBe(true);
	})
});
