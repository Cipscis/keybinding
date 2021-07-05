import { KeyBind } from './KeyBind.js';
import { KeyPress } from './KeyPress.js';

const bindings = {
	// [keyString]: [
	// 	{
	// 		fn,
	// 		fnWrapper,
	// 	},
	// ]
};

const defaults = Object.freeze({
	allowInInput: false,
});

const createFnWrapper = (keyString, fn, opts) => {
	const options = Object.assign({}, defaults, opts);

	const keyBind = new KeyBind(keyString);
	const keyLog = [];

	return function (e) {
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
			fn.apply(this, arguments);
		}
	};
};

const bind = (keyString, fn, options) => {
	if (!(keyString in bindings)) {
		bindings[keyString] = [];
	}

	const keyStringBindings = bindings[keyString];

	if (keyStringBindings.find((el) => el.fn === fn)) {
		// Do nothing - this binding already exists
		return;
	}

	const fnWrapper = createFnWrapper(keyString, fn, options);

	document.addEventListener('keydown', fnWrapper);
	keyStringBindings.push({
		fn,
		fnWrapper,
	});
};

const unbind = (keyString, fn) => {
	const keyStringBindings = bindings[keyString];

	if (!keyStringBindings) {
		return;
	}

	const bindingIndex = keyStringBindings.findIndex((el) => el.fn === fn);
	const binding = keyStringBindings[bindingIndex];

	document.removeEventListener('keydown', binding.fnWrapper);
	keyStringBindings.splice(bindingIndex, 1);
};

const isInput = function ($element) {
	const nodeName = $element.nodeName.toLowerCase();

	let isInput = false;

	if (['textarea', 'select'].includes(nodeName)) {
		isInput = true;
	} else if (nodeName === 'input') {
		isInput = true;

		const inputType = ($element.attributes.type?.value || 'text').toLowerCase();

		if (['button', 'checkbox', 'color', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'].includes(inputType)) {
			isInput = false;
		}
	} else if ($element.isContentEditable) {
		isInput = true;
	}

	return isInput;
};

const isProtected = function ($element) {
	const nodeName = $element.nodeName.toLowerCase();

	let isProtected = false;

	if (nodeName === 'input') {
		const inputType = ($element.attributes.type?.value || 'text').toLowerCase();

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
