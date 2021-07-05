const DefaultModifiers = Object.freeze({
	altKey: false,
	ctrlKey: false,
	shiftKey: false,
});

const Patterns = Object.freeze({
	alt: /\balt\+/g,
	ctrl: /\b(control|ctrl|command|cmd|meta)\+/g,
	shift: /\bshift\+/g,
});

const Aliases = Object.freeze({
	'space': ' ',
	'spacebar': ' ',

	'up': 'arrowup',
	'right': 'arrowright',
	'down': 'arrowdown',
	'left': 'arrowleft',

	'esc': 'escape',
});

class KeyPress {
	constructor(key, modifiers) {
		modifiers = Object.assign({}, DefaultModifiers, modifiers);

		this.key = key;

		this.modifiers = {
			altKey: modifiers.altKey,
			ctrlKey: modifiers.ctrlKey || modifiers.metaKey,
			shiftKey: modifiers.shiftKey,
		};
	}

	match(keyString) {
		const requiredModifiers = Object.assign({}, DefaultModifiers);

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
		for (const modifier of requiredModifiers) {
			if (requiredModifiers[modifier] && !this.modifiers[modifier]) {
				// The modifier was required but not recorded
				return false;
			}
		}

		// Check if they keyString's key matches the key pressed
		if (keyString.toLowerCase() !== this.key.toLowerCase()) {
			return false;
		}

		return true;
	}
}

export { KeyPress };
