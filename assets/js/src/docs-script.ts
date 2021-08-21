import {
	bind,
	unbind,
} from '@cipscis/keybinding';

const setMessage = (message: string) => {
	return (e: Event): void => {
		const $el = document.querySelector('.js-text-message');
		if ($el) {
			$el.textContent = message;
		}
	};
};

bind('a', setMessage('You pressed the \'a\' key'));
bind('ctrl+m', setMessage('You pressed Ctrl + \'m\''), { allowInInput: true });


const konamiCode = 'up up down down left right left right b a enter';
const cheat = setMessage('Hey, stop cheating!');
bind(konamiCode, cheat);

document.querySelector('.js-unbind-sequence')?.addEventListener('click', (e) => unbind(konamiCode, cheat));

const kPress = setMessage('You pressed the \'k\' key');
document.querySelector('.js-bind')?.addEventListener('click', (e) => bind('k', kPress, { allowInInput: true }));
document.querySelector('.js-unbind')?.addEventListener('click', (e) => unbind('k', kPress));
