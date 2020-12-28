let headerMyGifosButton = document.getElementById('header__myGifos__button');
let myGifosContainer = document.getElementById('myGifos');

headerMyGifosButton.addEventListener('click', () => {
  showMyGifos();
});

const showMyGifos = () => {
  event.preventDefault();
  myGifosContainer.classList.add('show');
  headerMyGifosButton.classList.add('active--button');
  if (favorites.classList.length) {
    favorites.classList.remove('show');
    headerFavButton.classList.remove('active--button');
  } else if (createContainer.classList.length) {
    createContainer.classList.remove('show--flex');
    headerCreateButton.classList.remove('active');
  } else {
    sectionPrincipal.classList.add('hide');
  }
  revokepermissions();
};
const revokepermissions = async () => {
  const videoPermision = await navigator.permissions.query({ name: 'camera' });
  console.log(videoPermision);
};
