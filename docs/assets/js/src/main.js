import {
	bind,
	unbind,

	bindSequence,
	unbindSequence,
} from '/keybinding.js';

const setMessage = (message) => {
	return (e) => {
		e.preventDefault();

		const $el = document.querySelector('.js-text-message');
		$el.textContent = message;
	};
};

const konamiCode = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a' ,'enter'];
const cheat = setMessage('Hey, stop cheating!');

bind('a', setMessage('You pressed the \'a\' key'));
bind('m', setMessage('You pressed Ctrl + \'m\''), true, true);

bindSequence(konamiCode, cheat);

document.querySelector('.js-unbind-sequence').addEventListener('click', (e) => unbindSequence(konamiCode, cheat));

const kPress = setMessage('You pressed the \'k\' key');
document.querySelector('.js-bind').addEventListener('click', (e) => bind('k', kPress, true));
document.querySelector('.js-unbind').addEventListener('click', (e) => unbind('k', kPress));
