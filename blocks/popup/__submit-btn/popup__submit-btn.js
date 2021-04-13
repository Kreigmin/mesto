let formElement = document.querySelector('.popup__container');
let submitBtn = document.querySelector('.popup__submit-btn');

function formSubmitHandler(evt) {
  evt.preventDefault();
  let kak = profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
}

formElement.addEventListener('submit', formSubmitHandler);
submitBtn.addEventListener('click', function() {
  document.querySelector('.popup').classList.toggle('popup_opened');
})
