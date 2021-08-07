const Patterns = Object.freeze({
	alt: /\balt\+/g,
	ctrl: /\b(control|ctrl|command|cmd|meta)\+/g,
	shift: /\bshift\+/g,
});

const Aliases = new Map([
	['space', ' '],
	['spacebar', ' '],

	['up', 'arrowup'],
	['right', 'arrowright'],
	['down', 'arrowdown'],
	['left', 'arrowleft'],

	['esc', 'escape'],
]);

interface KeyPressOptions {
	key: string;
	altKey?: boolean;
	metaKey?: boolean;
	ctrlKey?: boolean;
	shiftKey?: boolean;
}

interface KeyPressModifiers {
	altKey?: boolean;
	ctrlKey?: boolean;
	shiftKey?: boolean;
};

class KeyPress {
	key: string;
	modifiers: KeyPressModifiers;

	constructor(options: KeyPressOptions) {
		if (!('key' in options)) {
			throw new RangeError(`KeyPress: key is a required option`);
		}
		this.key = options.key;
		this.modifiers = {
			altKey: options.altKey || false,
			ctrlKey: options.metaKey || options.ctrlKey || false,
			shiftKey: options.shiftKey || false,
		};
	}

	match(keyString: string): boolean {
		const requiredModifiers = {
			altKey: false,
			ctrlKey: false,
			shiftKey: false,
		} as KeyPressModifiers;

		// Gather required modifiers for keyString
		if (Patterns.alt.test(keyString)) {
			requiredModifiers.altKey = true;
			keyString = keyString.replace(Patterns.alt, '');
		}

		if (Patterns.ctrl.test(keyString)) {
			requiredModifiers.ctrlKey = true;
			keyString = keyString.replace(Patterns.ctrl, '');
		}

		if (Patterns.shift.test(keyString)) {
			requiredModifiers.shiftKey = true;
			keyString = keyString.replace(Patterns.shift, '');
		}

		// Check if all keyString's required modifiers were met
		let modifier: keyof typeof requiredModifiers;
		for (modifier in requiredModifiers) {
			if (requiredModifiers[modifier] && !this.modifiers[modifier]) {
				// The modifier was required but not recorded
				return false;
			}
		}

		// Check if they keyString's key matches the key pressed
		if (keyString.toLowerCase() === this.key.toLowerCase()) {
			return true;
		}

		// Check if the keyString is an alias for a matching key
		if (Aliases.get(keyString.toLowerCase()) === this.key.toLowerCase()) {
			return true;
		}

		return false;
	}
}

export { KeyPress };
