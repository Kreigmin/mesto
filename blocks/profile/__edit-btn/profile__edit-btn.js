let editBtn = document.querySelector('.profile__edit-btn');

editBtn.addEventListener('click', function() {
  document.querySelector('.popup').classList.toggle('popup_opened');
});
