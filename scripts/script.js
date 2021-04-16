//Объявление переменных
let editBtn = document.querySelector('.profile__edit-btn');// Выбор кнопки редактирования
let inputName = document.querySelector('.change-form__input_name_value');// Выбор поля ввода имени
let profileName = document.querySelector('.profile__name');// Выбор имени
let inputJob = document.querySelector('.change-form__input_job_value');// Выбор поля ввода профессии
let profileJob = document.querySelector('.profile__job');// Выбор профессии
let popup = document.querySelector('.popup');// Выбор pop-up'a
let closeBtn = document.querySelector('.popup__close-btn');// Выбор кнопки закрытия popup
let formElement = document.querySelector('.change-form');// Выбор формы

//Функция открытия popup и добавление данных в input
function popupOpen() {
  popup.classList.add('popup_opened');// Добавить класс
  inputName.value = profileName.textContent;// Добавить имя в input при открытии
  inputJob.value = profileJob.textContent; // Добавить профессию в input при открытии
}

//Функция закрытия popup
function popupClose() {
  popup.classList.remove('popup_opened');
}

//Функция отправки формы
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupClose();
}

editBtn.addEventListener('click', popupOpen);// открытие формы и добавление данных в input
closeBtn.addEventListener('click', popupClose);// закрытие формы
formElement.addEventListener('submit', formSubmitHandler);// отправка формы

