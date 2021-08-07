import { KeyBind } from './KeyBind.js';
import { KeyPress } from './KeyPress.js';

type KeybindingFn = (e: KeyboardEvent, ...otherArgs: unknown[]) => any;
type KeybindingFnWrapper = (this: any, e: KeyboardEvent, ...otherArgs: unknown[]) => void;

interface KeyBindingOptions {
	allowInInput?: boolean;
}

const bindings: Map<
	string, Map<
		KeybindingFn, KeybindingFnWrapper
	>
> = new Map();

const defaults = Object.freeze({
	allowInInput: false,
});

const createFnWrapper = (keyString: string, fn: KeybindingFn, opts: KeyBindingOptions) => {
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

const bind = (keyString: string, fn: (e: KeyboardEvent) => void, options: KeyBindingOptions) => {
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

const unbind = (keyString: string, fn: KeybindingFn) => {
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

const isInput = function ($element: Element | null) {
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

const isProtected = function ($element: Element | null) {
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
