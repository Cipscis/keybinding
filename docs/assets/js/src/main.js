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

const konamiCode = 'up up down down left right left right b a enter';
const cheat = setMessage('Hey, stop cheating!');

bind('a', setMessage('You pressed the \'a\' key'));
bind('m', setMessage('You pressed Ctrl + \'m\''), { allowInInput: true, requireCtrl: true });

bind(konamiCode, cheat);

document.querySelector('.js-unbind-sequence').addEventListener('click', (e) => unbindSequence(konamiCode, cheat));

const kPress = setMessage('You pressed the \'k\' key');
document.querySelector('.js-bind').addEventListener('click', (e) => bind('k', kPress, true));
document.querySelector('.js-unbind').addEventListener('click', (e) => unbind('k', kPress));
