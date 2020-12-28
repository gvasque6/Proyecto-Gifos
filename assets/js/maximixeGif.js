modal = document.getElementById('modal');
modalContainer = document.getElementById('modal__content');
body = document.getElementsByTagName('body')[0];

const searchGif = (id) => {
	let gif = allGifs.filter((gif) => {
		return gif.id === id;
	});
	maximixeGif(gif[0]);
};
const maximixeGif = (gif) => {
	modalContainer.innerHTML = '';
	const { username, title, image, id, favorite } = gif;
	let src;
	if (!favorite) {
		src = './assets/images/gifIcons/icon-fav-hover.svg';
	} else {
		src = './assets/images/gifIcons/icon-fav-active.svg';
	}
	let template = `	<img src="./assets/images/search/close.svg" alt="close icon" id="close-modal"/><div class="modal__content__card">
        <div class="modal__content__card__image">
            <img
                src="${image}"
                alt="${title}"
            />
        </div>
        <div class="modal__content__card__info">
            <div class="modal__content__card__info__text">
                <p>${username}</p>
                <h3>${title}</h3>
            </div>
            <div class="modal__content__card__info__images">
                <img src="${src}" class="fav__icon" onclick="addFavorite('${id}')"/>
                <img
                    src="./assets/images/gifIcons/icon-download-hover.svg"
                    alt="icono de descarga"
                    class="download__icon"
                    onclick="downloadGif('${image}','${title}')"
                />
            </div>
        </div>
    </div>`;
	modalContainer.insertAdjacentHTML('beforeend', template);
	modal.classList.add('modal--show');
	body.style.overflow = 'hidden';
	let button = document.getElementById('close-modal');
	button.addEventListener('click', () => {
		closeModal();
	});
};
const closeModal = () => {
	modal.classList.remove('modal--show');
	body.removeAttribute('style');
};
