let closeBtn = document.querySelector('.popup__close-btn');

closeBtn.addEventListener('click', function() {
  document.querySelector('.popup').classList.toggle('popup_opened');
});
