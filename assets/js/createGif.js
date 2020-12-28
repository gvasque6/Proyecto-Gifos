let headerCreateButton = document.getElementById('header__button__create');
let buttonInitVideo = document.getElementById('create__gif__button');
let buttonRecordingVideo = document.getElementById('recording__gif__button');
let createContainer = document.getElementById('create__gif');
let textCreateGif = document.getElementById('text_createGif');
let videoContainer = document.getElementById('stream__video');

headerCreateButton.addEventListener('click', () => {
  showCreate();
});
buttonInitVideo.addEventListener('click', () => {
  initVideo();
});

const showCreate = () => {
  event.preventDefault();
  textCreateGif.innerHTML = '';
  textCreateGif.classList.remove('hide');
  createContainer.classList.add('show--flex');
  headerCreateButton.classList.add('active');
  buttonInitVideo.classList.remove('hide');
  buttonRecordingVideo.classList.remove('show');
  if (favorites.classList.length) {
    favorites.classList.remove('show');
    headerFavButton.classList.remove('active--button');
  } else if (myGifosContainer.classList.length) {
    myGifosContainer.classList.remove('show');
    headerMyGifosButton.classList.remove('active--button');
  } else {
    sectionPrincipal.classList.add('hide');
  }
  let template = `	<h1>
    Aquí podrás <br />
    crear tus propios <span>GIFOS</span>
</h1>
<p>
    ¡Crea tu GIFO en sólo 3 pasos! <br />
    (sólo necesitas una cámara para grabar un video)
</p>`;
  textCreateGif.insertAdjacentHTML('beforeend', template);
};

const initVideo = () => {
  buttonInitVideo.classList.add('hide');
  if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: 646,
          height: 348,
        },
      })
      .then((stream) => {
        textCreateGif.classList.add('hide');
        buttonRecordingVideo.classList.add('show');
        videoContainer.srcObject = stream;
        videoContainer.play();
        buttonRecordingVideo.addEventListener('click', () => {
          recordingVideo();
        });
      })
      .catch(() => {
        textCreateGif.innerHTML = '';
        let template = `	<h1>
               Lo Sentimos, <br />
               Parece que no tienes una camara conectada </span>
            </h1>
            <p>
                Conectala e intenta de nuevo!
            </p>`;
        textCreateGif.insertAdjacentHTML('beforeend', template);
        buttonInitVideo.classList.remove('hide');
      });
  }
};
const recordingVideo = async () => {
  let x = videoContainer.srcObject;
  let y = x.getTracks();
  y.forEach((element) => {
    element.stop();
  });
};
