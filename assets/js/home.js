let headerHomeButton = document.getElementById('header_logo');
headerHomeButton.addEventListener('click', () => {
	sectionPrincipal.classList.remove('hide');
	if (favorites.classList.length) {
		favorites.classList.remove('show');
		headerFavButton.classList.remove('active--button');
	} else if (myGifosContainer.classList.length) {
		myGifosContainer.classList.remove('show');
		headerMyGifosButton.classList.remove('active--button');
	} else {
		createContainer.classList.remove('show--flex');
		headerCreateButton.classList.remove('active');
	}
});
