let downloadGif = (url, nombre) => {
	fetch(url).then((img) => {
		return img.blob().then((file) => {
			let a = document.createElement('a');
			a.href = URL.createObjectURL(file);
			a.download = nombre;
			a.click();
		});
	});
};
