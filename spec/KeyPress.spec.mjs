import { KeyPress } from '../dist/KeyPress.js';

describe('KeyPress', () => {
	it(`remembers the key and modifiers that were pressed`, () => {
		// ctrl+a
		let keyPress = new KeyPress({
			key: 'a',
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
		keyPress = new KeyPress({
			key: 'b',
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
		keyPress = new KeyPress({
			key: 'c',
			altKey: true,
		});

		expect(keyPress.key).toBe('c');
		expect(keyPress.modifiers).toEqual({
			altKey: true,
			ctrlKey: false,
			shiftKey: false,
		});
	});

	it(`can match against a keystring`, () => {
		let keyPress;

		keyPress = new KeyPress({
			key: 'a',
			ctrlKey: true,
			shiftKey: true,
		});

		expect(keyPress.match('a')).toBe(true);
		expect(keyPress.match('ctrl+a')).toBe(true);
		expect(keyPress.match('ctrl+shift+a')).toBe(true);
		expect(keyPress.match('alt+a')).toBe(false);
	});

	it(`can match using aliases`, () => {
		let keyPress;

		// Space
		keyPress = new KeyPress({ key: ' ' });

		expect(keyPress.match(' ')).toBe(true);
		expect(keyPress.match('space')).toBe(true);
		expect(keyPress.match('spacebar')).toBe(true);

		// Arrows
		keyPress = new KeyPress({ key: 'arrowup' });

		expect(keyPress.match('arrowup')).toBe(true);
		expect(keyPress.match('up')).toBe(true);

		keyPress = new KeyPress({ key: 'arrowright' });

		expect(keyPress.match('arrowright')).toBe(true);
		expect(keyPress.match('right')).toBe(true);

		keyPress = new KeyPress({ key: 'arrowdown' });

		expect(keyPress.match('arrowdown')).toBe(true);
		expect(keyPress.match('down')).toBe(true);

		keyPress = new KeyPress({ key: 'arrowleft' });

		expect(keyPress.match('arrowleft')).toBe(true);
		expect(keyPress.match('left')).toBe(true);

		// Escape
		keyPress = new KeyPress({ key: 'Escape' });

		expect(keyPress.match('escape')).toBe(true);
		expect(keyPress.match('esc')).toBe(true);
	});

	it(`can match modifiers using aliases`, () => {
		let keyPress = new KeyPress({
			key: 'a',
			ctrlKey: true,
		});

		// Ctrl/command key
		expect(keyPress.match('control+a')).toBe(true);
		expect(keyPress.match('ctrl+a')).toBe(true);
		expect(keyPress.match('command+a')).toBe(true);
		expect(keyPress.match('cmd+a')).toBe(true);
		expect(keyPress.match('meta+a')).toBe(true);
	});
});
