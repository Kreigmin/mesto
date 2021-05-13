//Объявление переменных 4 спринт-----------------------------------------------------------------------------------------------
const editBtn = document.querySelector('.profile__edit-btn');// Выбор кнопки редактирования
const inputName = document.querySelector('.form__input_name_value');// Выбор поля ввода имени
const profileName = document.querySelector('.profile__name');// Выбор имени
const inputJob = document.querySelector('.form__input_job_value');// Выбор поля ввода профессии
const profileJob = document.querySelector('.profile__job');// Выбор профессии
const editPopup = document.querySelector('.edit-profile-popup');// Выбор pop-up'a
const closeEditBtn = document.querySelector('.close-edit-popup');// Выбор кнопки закрытия popup
const profileFormElement = document.querySelector('.profileChangeForm');// Выбор формы изменения профиля

//Объявление переменных 5 спринт-----------------------------------------------------------------------------------------------
const cardList = document.querySelector('.cards__list');//выбор списка карточек
const cardPopup = document.querySelector('.add-card-popup');//выбор popup добавления карточки
const addBtn = document.querySelector('.profile__add-btn');//выбор кнопки открытия popup добавления карточки
const closeCardBtn = document.querySelector('.close-card-popup')//выбор кнопки закрытия popup добавления карточки
const inputPlaceName = document.querySelector('.form__input_card-name_value');//выбор поля названия карточки
const inputPlaceImage = document.querySelector('.form__input_card-link_value');//выбор поля ссылки карточки
const addCardForm = document.querySelector('.addCardForm');//выбор формы добавления карточки
const imagePopup = document.querySelector('.open-image-popup');//выбор popup показа полного изображения карточки
const imageCaption = document.querySelector('.image-popup__caption');//выбор подписи изображения в popup полного изображения карточки
const popupFullImage = document.querySelector('.image-popup__full-img');//выбор изображения в popup полного изображения карточки
const closeImgPopupBtn = document.querySelector('.close-image-popup');//выбор кнопки закрытия popup полного изображения карточки
const cardTemplate = document.querySelector('.card-template').content;//выбор контента шаблона карточки

const initialCards = [//начальный массив для карточек
  {
    name: 'Байкал',
    link: './images/baikal.jfif'
  },
  {
    name: 'Домбай',
    link: './images/dombay.jfif'
  },
  {
    name: 'Вулкан Эльбрус',
    link: './images/elbrus.jfif'
  },
  {
    name: 'Озеро Эльтон',
    link: './images/elton-lake.jfif'
  },
  {
    name: 'Вулкан Казбек',
    link: './images/kazbek.jfif'
  },
  {
    name: 'Красная площадь',
    link: './images/red-square.jfif'
  }
];

//Функция открытия popup--------------------------------------------------------------------------------------------------------
const popupOpen = function(button) {
  button.classList.add('popup_opened');//добавление класса к popup
}

//Функция закрытия popup--------------------------------------------------------------------------------------------------------
const popupClose = function(button) {//объявление переменной в которой функция с двумя аргументми: Имя popup и класс
  button.classList.remove('popup_opened');//удаление класса из popup
}

//Функция закрытия popup по кнопке Escape-------------------------------------------------------------------------------------
const closePopupOnPressKey = (evt, popup) => {
  if (evt.key === 'Escape') {
    popupClose(popup);
  }
}

//Функция закрытия popup по нажатию на overlay-------------------------------------------------------------------------------------
const closePopupOnOverlay = (evt, popup) => {
  if (evt.target === evt.currentTarget) {
    popupClose(popup)
  }
}

//Функция отправки формы изменения профиля-------------------------------------------------------------------------------------
const formSubmitHandler =  function(evt) {//объявление переменной
  evt.preventDefault();//предовращение стандартного выполнения функции
  profileName.textContent = inputName.value;//запись текста в имя профиля из поля ввода имени в popup
  profileJob.textContent = inputJob.value;//запись текста в имя профиля из поля ввода профессии в popup
  popupClose(editPopup);//вызов функции закрытия popup
}



//функция инициализации карточки-----------------------------------------------------------------------------------
const getCardElement = function(name, link) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);//клонирование всего узла карточки
  const deleteCardBtn = cardElement.querySelector('.card__delete-btn');// запись в переменную кнопки удаления карточки
  const cardTitle = cardElement.querySelector('.card__title');//запись в переменную названия карточки
  const cardImage = cardElement.querySelector('.card__image');//запись в переменную изображения карточки
  const cardLike = cardElement.querySelector('.card__like');//запись в переменную кнопки лайка
  const previewImageBtn = cardElement.querySelector('.card__full-img-btn');//запись в переменную кнопки превью изображения
  cardTitle.textContent = name;//запись текста в название карточки
  cardImage.alt = name;//запись текста в альтернативное название изображения
  cardImage.src = link;//запись ссылки в изображение карточки
  cardLike.addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');//добавить или удалить класс кнопке лайка
  });
  deleteCardBtn.addEventListener('click', function() {
    const listItem = deleteCardBtn.closest('.card');//выбрать ближайший родитель кнопки удаления карточки
    listItem.remove();//удалить карточку
  });
  previewImageBtn.addEventListener('click', function() {
    popupOpen(imagePopup);//вызвать функцию открытия полного изображения карточки
    popupFullImage.src = cardImage.src;// запись ссылки из картинки карточки в изображение превью
    popupFullImage.alt = cardTitle.textContent
    imageCaption.textContent = cardTitle.textContent;//запись названия карточки в подпись изображения в превью
  });

  return cardElement;// вернуть елемент
}

//функция добавления карточки в контейнер---------------------------------------------------------------------
const renderCard = function(name, link, wrap) {
  wrap.prepend(getCardElement(name, link));//вызвать метод prepend для записи карточки в контейнер
}

//Функция отправки формы добавления карточки---------------------------------------------------------------------------------
const submitCardForm = function(evt) {// Объявление перемнной
  evt.preventDefault();//предовращение стандартного выполнения функции
  renderCard(inputPlaceName.value, inputPlaceImage.value, cardList);//вызов функции добавления карточки
  addCardForm.reset();//функция очистки формы
  popupClose(cardPopup);//вызов функции закрытия popup добавления карточки
}

//Функция скрытия ошибок при закрытии popup---------------------------------------------------------------------------------
const clearAllErrors = function() {
  const fieldList = Array.from(document.querySelectorAll('.form__fieldset'));
  fieldList.forEach((field) => {
    const inputList = Array.from(field.querySelectorAll('.form__input'));
    inputList.forEach((item) => {
      hideInputError(field, item, 'form__input_type_error', 'form__input-error_active')
    });
  });
}

// включение валидации
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});

editBtn.addEventListener('click', function() {//Слушатель при нажании открыть popup изменения профиля
  popupOpen(editPopup);//вызов функции открытия popup
  inputName.value = profileName.textContent;// Добавить имя в input при открытии
  inputJob.value = profileJob.textContent; // Добавить профессию в input при открытии
});


addBtn.addEventListener('click', function() {
  popupOpen(cardPopup);
  addCardForm.reset();//функция очистки формы.
});//Слушатель при нажании открыть popup добавления карточки

closeEditBtn.addEventListener('click', function() {//Слушатель при нажании закрыть popup изменения профиля
  clearAllErrors();
  popupClose(editPopup);//вызвать функцию закрытия popup
});

closeCardBtn.addEventListener('click', function() {//Слушатель при нажании закрыть popup добавления карточки
  clearAllErrors();
  popupClose(cardPopup);//вызвать функцию закрытия popup
});

profileFormElement.addEventListener('submit', formSubmitHandler);//Слушатель при отправке формы выполнить функцию formSubmitHandler

addCardForm.addEventListener('submit', submitCardForm);//Слушатель при отправке формы выполнить функцию submitCardForm

closeImgPopupBtn.addEventListener('click', function() {//Слушатель при нажании закрыть popup полной картинки
  popupClose(imagePopup);//вызвать функцию закрытия popup
});

//добавление начальных карточек-----------------------------------------------------------------------------------
initialCards.forEach(function(item) {
  renderCard(item.name, item.link, cardList);
});


window.addEventListener('keydown', function(evt) {
  closePopupOnPressKey(evt, editPopup);
});

window.addEventListener('keydown', function(evt) {
  closePopupOnPressKey(evt, cardPopup);
});

window.addEventListener('keydown', function(evt) {
  closePopupOnPressKey(evt, imagePopup);
});


editPopup.addEventListener('mousedown', function(evt) {
  closePopupOnOverlay(evt, editPopup);
});

cardPopup.addEventListener('mousedown', function(evt) {
  closePopupOnOverlay(evt, cardPopup);
});

imagePopup.addEventListener('mousedown', function(evt) {
  closePopupOnOverlay(evt, imagePopup);
});
