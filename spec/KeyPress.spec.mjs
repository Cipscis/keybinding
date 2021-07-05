import { KeyPress } from '../KeyPress.js';

describe('KeyPress', () => {
	it(`remembers the key and modifiers that were pressed`, () => {
		// ctrl+a
		const keyPress = new KeyPress('a', {
			ctrlKey: true
		});

		expect(keyPress.key).toBe('a');
		expect(keyPress.modifiers).toEqual({
			altKey: false,
			ctrlKey: true,
			shiftKey: false,
		});

		// ⌘+shift+b
		// Treated same as ctrl+shift+b
		const keyPress = new KeyPress('b', {
			shiftKey: true,
			metaKey: true,
		});

		expect(keyPress.key).toBe('b');
		expect(keyPress.modifiers).toEqual({
			altKey: false,
			ctrlKey: true,
			shiftKey: true,
		});

		// alt+c
		expect(keyPress.key).toBe('c');
		expect(keyPress.modifiers).toEqual({
			altKey: true,
			ctrlKey: false,
			shiftKey: false,
		});
	});
});
