let form = document.getElementById('main__form');
let input = document.getElementById('main__input');
let suggestList = document.getElementById('suggest__list');
let suggestBar = document.querySelector('.main__suggestBar');
let gifsContainer = document.getElementById('searchResults__gifs');
let noResultsContainer = document.getElementById('searchResults__no');
let container = document.getElementById('searchResults');
let trendingText = document.getElementById('trending');
let title = document.getElementById('searchResults__title');
let button = document.getElementById('searchResults__button');
let suggest;
let limit = 12;
//EVENTS LISTENERS
form.addEventListener('submit', () => {
	submit();
});
input.addEventListener('input', () => {
	suggestPetition();
});
input.addEventListener('click', () => {
	hideSuggertBar();
});
button.addEventListener('click', () => {
	searchMore();
});

//SUGGEST PETITION
const suggestPetition = async () => {
	let value = event.target.value;

	if (value) {
		let response = await fetch(
			`https://api.giphy.com/v1/tags/related/${value}?api_key=APOUKP9u6BaOSLAVuA3AoRygic9iIIIe&`
		);
		let suggestions = await response.json();
		const { data } = suggestions;
		renderSuggestions(data);
	} else {
		suggestBar.classList.remove('show');
		input.classList.remove('active');
	}
};
//HIDDE SUGGEST BAR
const hideSuggertBar = () => {
	suggestBar.classList.remove('show');
	input.classList.remove('active');
};
//RENDER SUGGESTIONS
const renderSuggestions = (suggestions) => {
	suggestList.innerHTML = '';
	suggestions.forEach((suggest) => {
		const { name } = suggest;
		let template = `<li>
  <a href="" data-suggest="${name}"><img src="./assets/images/search/icon-search-modo-noct.svg" alt="" />${name}</a>
</li> `;
		suggestList.insertAdjacentHTML('beforeend', template);
	});
	suggestBar.classList.add('show');
	input.classList.add('active');
	//SUGGESTION LISTENER
	suggest = suggestList.querySelectorAll('a');
	suggest.forEach((data) => {
		data.addEventListener('click', () => {
			throwSearch();
		});
	});
};
//TROW SUBMIT ON CLICK
const throwSearch = () => {
	event.preventDefault();
	let button = event.target;
	let value = button.dataset.suggest;
	input.value = value;
	suggestBar.classList.remove('show');
	input.classList.remove('active');
	submit();
};
//SUBMIT
const submit = () => {
	event.preventDefault();
	hideSuggertBar();
	gifsContainer.innerHTML = '';
	let value = input.value;
	let title = `${value}`.toUpperCase();
	title.textContent = title;
	fetch(`https://api.giphy.com/v1/gifs/search?api_key=APOUKP9u6BaOSLAVuA3AoRygic9iIIIe&q=${value}&limit=${limit}`).then(
		(response) => {
			response.json().then((gifs) => {
				const { data } = gifs;
				if (allGifs.length > allGifsLimit) {
					cleanAllGifs();
				}
				if (data.length) {
					renderGifs(data);
				} else {
					showNoResults();
				}
			});
		}
	);
};
const cleanAllGifs = () => {
	allGifs.splice(25);
	limit = 12;
};
const showNoResults = () => {
	noResultsContainer.classList.add('show');
	container.classList.add('show');
	button.classList.add('hide');
};
const renderGifs = (gifs) => {
	noResultsContainer.classList.remove('show');
	trendingText.classList.add('hide');
	button.classList.remove('hide');
	gifs.forEach((gif) => {
		const {
			images: {
				downsized: { url },
				preview_gif: { url: preview },
			},
			id,
			title,
			username,
		} = gif;
		let template = ` 		<div class="searchResults__gifs__gif">
            <img
                src="${preview}"
				alt=""
				onclick="searchGif('${id}')"
            />
            <div class="searchResults__gifs__gif__hover">
                <img src="./assets/images/gifIcons/icon-fav-hover.svg" alt=""  onclick="addFavorite('${id}')" class="fav__icon" />
                <img src="./assets/images/gifIcons/icon-download-hover.svg" alt="" onclick="downloadGif('${url}','${title}')"  class="download__icon"/>
                <img src="./assets/images/gifIcons/icon-max-hover.svg" alt="" onclick="searchGif('${id}')" class="max__icon"/>
            </div>
        </div>`;
		gifsContainer.insertAdjacentHTML('beforeend', template);
		new Gif(url, preview, id, title, username);
	});
	container.classList.add('show');
};

const searchMore = () => {
	limit += 12;
	submit();
};
