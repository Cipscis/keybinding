const keys = (function () {
	const bindings = {};
	/*
	{
		[keyString]: [
			{
				fn: fnA,
				fnWrapper: fnWrapperA
			},
			{
				fn: fnB,
				fnWrapper: fnWrapperB
			}
		]
	}
	*/

	const defaults = Object.freeze({
		allowInInput: false,
		requireCtrl: false,
	});

	const aliases = Object.freeze({
		'spacebar': ' ',
		 'up': 'arrowup',
		 'right': 'arrowright',
		 'down': 'arrowdown',
		 'left': 'arrowleft',
	});

	const module = {
		_isFocusOnInput: function () {
			// Check if the current active element is an input that accepts keypresses

			const $activeEl = document.activeElement;
			const isFocusOnInput = module._isInput($activeEl);

			return isFocusOnInput;
		},

		_isFocusOnProtectedElement: function () {
			// Check if the current active element is protected, so keypresses shouldn't be recorded

			const $activeEl = document.activeElement;
			const isFocusOnProtectedElement = module._isProtectedElement($activeEl);

			return isFocusOnProtectedElement;
		},

		_isInput: function ($element) {
			const nodeName = $element.nodeName.toLowerCase();
			const isInput = (['input', 'textarea', 'select'].includes(nodeName));

			if (nodeName === 'input') {
				const inputType = ($element.attributes.type?.value || 'text').toLowerCase();

				if (['color', 'radio', 'checkbox'].includes(inputType)) {
					isInput = false;
				}
			} else if ($element.isContentEditable) {
				isInput = true;
			}

			return isInput;
		},

		_isProtectedElement: function ($element) {
			const nodeName = $element.nodeName.toLowerCase();

			let isProtectedElement = false;

			if (nodeName === 'input') {
				const inputType = ($element.attributes.type?.value || 'text').toLowerCase();

				if (inputType === 'password') {
					isProtectedElement = true;
				}
			}

			return isProtectedElement;
		},

		_matchKey: function (key, keyToMatch) {
			key = key.toLowerCase();
			keyToMatch = keyToMatch.toLowerCase();

			if (key === keyToMatch) {
				return true;
			}

			const alias = aliases[key];
			if (alias === keyToMatch) {
				return true;
			}

			return false;
		},

		_bindFn: function (key, fn, fnWrapper) {
			document.addEventListener('keydown', fnWrapper);
			if (!bindings[key]) {
				bindings[key] = [];
			}

			bindings[key].push({
				fn: fn,
				fnWrapper: fnWrapper
			});
		},

		unbind: function (key, fn) {
		},

		bind: function (keyString, fn, opts) {
			if (typeof keyString !== 'string') {
				throw new TypeError('The key parameter to bind must be a string.');
			} else {
				keyString = keyString.toLowerCase();
			}

			const options = Object.assign({}, defaults, opts);

			const keys = keyString.trim().split(/\s+/);

			const keysPressed = [];

			if (keys.length > 0) {
				// Record as many of the past keys pressed as required for the sequence

				const fnWrapper = function (event) {
					// Don't check key if focus is on an input element,
					// unless it is allowed or requires Ctrl
					if (!(options.allowInInput || options.requireCtrl) && module._isFocusOnInput()) {
						return;
					}

					// Never record keypresses while focus is in a protected element
					if (module._isFocusOnProtectedElement()) {
						return;
					}

					// Some behaviour, like selecting an autocomplete result, can
					// fire a keydown event with no key
					const key = event.key?.toLowerCase();

					// Don't check key presses if focus is on an input element
					if (module._isFocusOnInput()) {
						return;
					}

					if (!module._matchKey(key, 'shift')) {
						// Ignore shift, as it's used as a modifier
						keysPressed.push(key);
					}
					if (keysPressed.length > keys.length) {
						keysPressed.shift();
					}

					if (key && module._matchKey(key, keys[keys.length-1])) {
						if (!options.requireCtrl || event.ctrlKey) {
							// When the final key is pressed, check if the whole sequence matches
							let i;
							for (i = 0; i < keys.length; i++) {
								if (!module._matchKey(keys[i], keysPressed[i])) {
									break;
								}
							}

							// i only reaches keys.length if the break; line was never executed
							if (i === keys.length) {
								if (fn.apply(this, arguments) === false) {
									// Implement jQuery-like shorthand of return false;
									event.preventDefault();
									event.stopPropagation();
								}
							}
						}
					}
				};

				module._bindFn(keyString, fn, fnWrapper);
			}
		},

		unbind: function (keyString, fn) {
			const binding = bindings[key];
			if (binding) {
				// Find index
				let index;
				for (index = 0; index < binding.length; index++) {
					if (binding[index].fn === fn) {
						break;
					}
				}

				if (index < binding.length) {
					document.removeEventListener('keydown', binding[index].fnWrapper);
					binding.splice(index, 1);
				}
			}
		},
	};

	return {
		bind: module.bind,
		unbind: module.unbind,

		bindSequence: module.bindSequence,
		unbindSequence: module.unbindSequence,
	};
})();

export const {
	bind,
	unbind,

	bindSequence,
	unbindSequence,
} = keys;
