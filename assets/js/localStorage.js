window.onload = () => {
	let savedFavGifs = JSON.parse(window.localStorage.getItem('favorites'));
	if (savedFavGifs) {
		allGifsLimit += savedFavGifs.length;
		savedFavGifs.forEach((gif) => {
			console.log(gif);
			const { image, preview, title, username, id, favorite } = gif;
			new Gif(image, preview, id, title, username, favorite);
			renderFavorites();
		});
	}
};
