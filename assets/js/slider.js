let buttonNext = document.getElementById('trending__gifs__slider__next');
let buttonPrev = document.getElementById('trending__gifs__slider__prev');
let sliderWrapper = document.getElementById('trending__gifs__slider__wrapper');
let sliderInner = document.getElementById('trending__gifs__slider__inner');
let sliderInnerWidth;
let maxMovement;
let position = 0;
let sliderItems = document.getElementById('trending__gifs__slider__inner');
let text = document.getElementById('trending');

//EVENT LISTENERS
buttonNext.addEventListener('click', () => {
	slideNext();
});
buttonPrev.addEventListener('click', () => {
	slidePrev();
});

const slider = () => {};

const slideNext = () => {
	buttonPrev.classList.add('show');
	sliderInnerWidth = getSliderInnerWidth();
	let movement = getMovement();
	let sliderWrapperWidth = sliderWrapper.offsetWidth;
	maxMovement = sliderInnerWidth - sliderWrapperWidth;
	position += movement;
	if (maxMovement > position) {
		sliderInner.style.right = `${position}px`;
	} else {
		position = maxMovement;
		sliderInner.style.right = `${position}px`;
		buttonNext.classList.add('hide');
	}
};
const slidePrev = () => {
	buttonNext.classList.remove('hide');
	let movement = getMovement();
	position -= movement;
	if (position > 0) {
		sliderInner.style.right = `${position}px`;
	} else {
		sliderInner.style.right = `0`;
		buttonPrev.classList.remove('show');
	}
};
const getSliderInnerWidth = () => {
	let items = sliderInner.childElementCount;
	let width;
	if (screen.width > 768) {
		width = items * 357 + (items - 1) * 29;
		return width;
	} else {
		width = items * 243;
		return width;
	}
};
const getMovement = () => {
	if (screen.width > 768) {
		return 729;
	} else {
		return 243;
	}
};

const petitionTrendings = () => {
	fetch(`https://api.giphy.com/v1/trending/searches?api_key=APOUKP9u6BaOSLAVuA3AoRygic9iIIIe&`).then((response) => {
		response.json().then((trendings) => {
			const { data } = trendings;
			renderTrendingsStr(data);
		});
	});
};
const renderTrendingsStr = (trendings) => {
	text.innerHTML = '';
	let str = trendings.join(', ');
	let template = `        <h3>Trending:</h3>
    <p>${str}</p>`;
	text.insertAdjacentHTML('beforeend', template);
};
const petitionTrendingGifs = async () => {
	let response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=APOUKP9u6BaOSLAVuA3AoRygic9iIIIe&`);
	let trendings = await response.json();
	const { data } = trendings;
	renderTrendings(data);
};
const renderTrendings = (trendings) => {
	console.log(trendings);
	trendings.forEach((trending) => {
		const {
			images: {
				downsized: { url },
				preview_gif: { url: preview },
			},
			id,
			title,
			username,
		} = trending;

		let template = ` <div class="trending__gifs__slider__inner__item">
  <img src="${preview}" alt="${title}" srcset=""  onclick="searchGif('${id}')"/>
  <div class="trending__gifs__slider__item__hover">
    <div>
      <img src="./assets/images/gifIcons/icon-fav-hover.svg" alt="icon of favorites" onclick="addFavorite('${id}')" class="fav__icon"/>
      <img src="./assets/images/gifIcons/icon-download-hover.svg" alt=" icon of dowload" onclick="downloadGif('${url}','${title}')" class="download__icon"/>
      <img src="./assets/images/gifIcons/icon-max-hover.svg" alt="icon of maximixe" onclick="searchGif('${id}')" class="max__icon"/>
    </div>
  </div>
</div>`;
		sliderItems.insertAdjacentHTML('beforeend', template);
		new Gif(url, preview, id, title, username);
	});
};
petitionTrendingGifs();
petitionTrendings();
