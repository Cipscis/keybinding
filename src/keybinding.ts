import { KeyBind } from 'KeyBind';
import { KeyPress } from 'KeyPress';

type KeybindingFn = (e: KeyboardEvent, ...otherArgs: unknown[]) => any;
type KeybindingFnWrapper = (this: any, e: KeyboardEvent, ...otherArgs: unknown[]) => void;

interface KeyBindingOptions {
	allowInInput?: boolean;
}

const bindings: Map<string, Map<KeybindingFn, KeybindingFnWrapper>> = new Map();

const defaults = Object.freeze({
	allowInInput: false,
});

/**
 * Creates a wrapper for a callback function, which handles recording and
 *   checking keypresses so it can be bound directly to the 'keydown' event and
 *   decide when the callback should be invoked.
 *
 * @param {string} keyString - A string representing the key, key combination,
 *   or key sequence the callback should to be bound to. For example, 'esc' or
 *   'Ctrl+G Ctrl+D'.
 * @param {function} fn - The function to be bound.
 * @param {Object} options - Options to configure behaviour of the key binding.
 * @param {boolean} options.allowInInput - If set to true, the key binding will remain active while keyboard focus is in an element that can receive keyboard input, such as <input type="text">.
 *
 * @return {function}
 */
const createFnWrapper = (keyString: string, fn: KeybindingFn, opts: KeyBindingOptions): KeybindingFnWrapper => {
	const options = Object.assign({}, defaults, opts);

	const keyBind = new KeyBind(keyString);
	const keyLog = [] as KeyPress[];

	const fnWrapper: KeybindingFnWrapper = function (this: any, e: KeyboardEvent, ...otherArgs: unknown[]) {
		// Ignore modifier keys
		if (['Alt', 'Control', 'Meta', 'Shift'].includes(e.key)) {
			return;
		}

		// Don't check key if focus is in a prohibited place
		if ((!options.allowInInput) && isInput(document.activeElement)) {
			return;
		}

		if (isProtected(document.activeElement)) {
			return;
		}

		const keyPress = new KeyPress(e);
		keyLog.push(keyPress);

		if (keyLog.length > keyBind.length) {
			keyLog.shift();
		}

		if (keyBind.match(keyLog)) {
			// Clear keyLog and call function

			keyLog.splice(0);
			fn.apply(this, [e, ...otherArgs]);
		}
	};

	return fnWrapper;
};

/**
 * Binds an event to a key, key combination, or key sequence.
 *
 * @param {string} keyString - A string representing the key, key combination, or key sequence to be bound to. For example, 'esc' or 'Ctrl+G Ctrl+D'.
 * @param {function} fn - The function to be bound. When called, behaves as though it had been bound by document.addEventListener.
 * @param {Object} options - Options to configure behaviour of the key binding.
 * @param {boolean} options.allowInInput - If set to true, the key binding will remain active while keyboard focus is in an element that can receive keyboard input, such as <input type="text">.
 *
 * @return {void}
 */
const bind = (keyString: string, fn: (e: KeyboardEvent) => void, options: KeyBindingOptions): void => {
	if (!bindings.has(keyString)) {
		bindings.set(keyString, new Map());
	}

	const keyStringBindings = bindings.get(keyString) as Map<KeybindingFn, KeybindingFnWrapper>;

	if (keyStringBindings.has(fn)) {
		// Do nothing - this binding already exists
		return;
	}

	const fnWrapper = createFnWrapper(keyString, fn, options);

	document.addEventListener('keydown', fnWrapper);
	keyStringBindings.set(fn, fnWrapper);
};

/**
 * Unbind an event from a key, key combination, or key sequence.
 *
 * @param {string} keyString - A string representing the key, key combination, or key sequence to unbind from. For example, 'esc' or 'Ctrl+G Ctrl+D'.
 * @param {function} fn - The function to be unbound.
 *
 * @return {void}
 */
const unbind = (keyString: string, fn: KeybindingFn): void => {
	const keyStringBindings = bindings.get(keyString);

	if (!keyStringBindings) {
		return;
	}

	const fnWrapper = keyStringBindings.get(fn);

	if (fnWrapper) {
		document.removeEventListener('keydown', fnWrapper);
		keyStringBindings.delete(fn);
	}
};

/**
 * Check if a given HTMLElement is able to receive keyboard input.
 *
 * @param  {Element | null} $element - The element to check. If it is not an
 *   HTMLElement, the function will return false.
 *
 * @return {boolean}
 */
const isInput = function ($element: Element | null): boolean {
	let isInput = false;

	if ($element instanceof HTMLElement) {
		if ($element instanceof HTMLTextAreaElement || $element instanceof HTMLSelectElement) {
			isInput = true;
		} else if ($element instanceof HTMLInputElement) {
			isInput = true;

			const inputType = ($element.type || 'text').toLowerCase();

			if (['button', 'checkbox', 'color', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'].includes(inputType)) {
				isInput = false;
			}
		} else if ($element.isContentEditable) {
			isInput = true;
		}
	}

	return isInput;
};

/**
 * Check if keyboard input to an HTMLElement should never be tracked.
 *
 * @param  {Element | null} $element - The element to check. If it is not an
 *   HTMLElement, the function will return false.
 *
 * @return {boolean}
 */
const isProtected = function ($element: Element | null): boolean {
	let isProtected = false;

	if ($element instanceof HTMLInputElement) {
		const inputType = ($element.type || 'text').toLowerCase();

		if (inputType === 'password') {
			isProtected = true;
		}
	}

	return isProtected;
};

export {
	bind,
	unbind,
};
