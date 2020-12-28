modeButton = document.getElementById('page--mode');
body = document.getElementsByTagName('body');

modeButton.addEventListener('click', () => {
	changeMode();
});

const changeMode = () => {
	event.preventDefault();
	let hasClass = body.classList.toggle('nocturne');
	if (hasClass) {
		event.currentTarget.innerHTML = 'MODO DIURNO';
	} else {
		event.currentTarget.innerHTML = 'MODO NOCTURNO';
	}
};
