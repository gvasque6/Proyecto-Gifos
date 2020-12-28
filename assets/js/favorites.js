let searchResults = document.getElementById('searchResults');
let sectionPrincipal = document.getElementById('home');
let favorites = document.getElementById('favorites');
let favoritesResults = document.getElementById('favorites__results');
let favoritesContainer = document.getElementById('favorites__results__gifs');
let headerFavButton = document.getElementById('header__fav__button');
let favoriteButton = document.getElementById('favorites__results__button');
this.noResultsFavContainer = document.getElementById('favorites__noResults');
let favoritesLimit = 8;

//EVENT LISTENER
headerFavButton.addEventListener('click', () => {
	hideContainers();
});
favoriteButton.addEventListener('click', () => {
	handleClick();
});
const hideContainers = () => {
	event.preventDefault();
	favoritesLimit = 8;
	favorites.classList.add('show');
	headerFavButton.classList.add('active--button');
	if (createContainer.classList.length) {
		createContainer.classList.remove('show--flex');
		headerCreateButton.classList.remove('active');
	} else if (myGifosContainer.classList.length) {
		myGifosContainer.classList.remove('show');
		headerMyGifosButton.classList.remove('active--button');
	} else {
		sectionPrincipal.classList.add('hide');
	}
	hasFavorites();
};
const hasFavorites = () => {
	let hasChilds = favoritesContainer.hasChildNodes();
	if (hasChilds) {
		noResultsFavContainer.classList.add('hide');
		favoritesResults.classList.add('show');
	}
};

const handleClick = () => {
	console.log(favoritesLimit);
	favoritesLimit += 8;
	renderFavorites();
};
const addFavorite = (id) => {
	let button = event.target;
	let atribute = button.getAttribute('src');

	button.src = './assets/images/gifIcons/icon-fav-active.svg';

	let filter = allGifs.filter((gif, i) => {
		return gif.id === id;
	});
	filter[0].addFavorite();
	renderFavorites();
};
const renderFavorites = () => {
	favoritesContainer.innerHTML = '';
	let favorites = allGifs.filter((gif) => {
		return gif.favorite === true;
	});
	window.localStorage.setItem('favorites', JSON.stringify(favorites));
	favorites.forEach(async (gif, i) => {
		const { preview, id, image, title } = gif;
		if (i < favoritesLimit) {
			let template = `<div class="favorites__results__gifs__gif">
                <img src="${preview}" alt=""  onclick="searchGif('${id}')"/>
                <div class="favorites__results__gifs__gif__hover">
					<img src="./assets/images/gifIcons/icon-trash-hover.svg" alt="" onclick="removeFavorite('${id}')" class="fav__icon" />
                    <img
                        src="./assets/images/gifIcons/icon-download-hover.svg"
                        alt=""
						class="download__icon"
						onclick="dowloadGif(${image},${title})"
					/>
                    <img src="./assets/images/gifIcons/icon-max-hover.svg" alt="" onclick="searchGif('${id}')" class="max__icon" />
                </div>
            </div>`;
			favoritesContainer.insertAdjacentHTML('beforeend', template);
		}
	});

	if (favorites.length > 8) {
		favoriteButton.classList.add('show');
	}
	hasFavorites();
};
const removeFavorite = (id) => {
	let filter = allGifs.filter((gif, i) => {
		return gif.id === id;
	});
	filter[0].removeFavorite();
	renderFavorites();
};
