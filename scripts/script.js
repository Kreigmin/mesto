//Открытие popup
let editBtn = document.querySelector('.profile__edit-btn');

editBtn.addEventListener('click', function() {
  document.querySelector('.popup').classList.toggle('popup_opened');
});

//Закрытие popup
let closeBtn = document.querySelector('.popup__close-btn');

closeBtn.addEventListener('click', function() {
  document.querySelector('.popup').classList.toggle('popup_opened');
});

//Начальный текст в input
let inputName = document.querySelector('.popup__name');
let profileName = document.querySelector('.profile__name');

editBtn.addEventListener('click', function() {
  inputName.setAttribute('value', profileName.textContent);
});

closeBtn.addEventListener('click', function() {
  let defaultTextName = profileName.textContent;
  inputName.value = defaultTextName;
});

let inputJob = document.querySelector('.popup__job');
let profileJob = document.querySelector('.profile__job');

editBtn.addEventListener('click', function() {
  inputJob.setAttribute('value', profileJob.textContent);
});

closeBtn.addEventListener('click', function() {
  let defaultTextJob = profileJob.textContent;
  inputJob.value = defaultTextJob;
});

//Отправка и закрытие формы
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
});
