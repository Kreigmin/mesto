//Объявление переменных 4 спринт
const editBtn = document.querySelector('.profile__edit-btn');// Выбор кнопки редактирования
const inputName = document.querySelector('.change-form__input_name_value');// Выбор поля ввода имени
const profileName = document.querySelector('.profile__name');// Выбор имени
const inputJob = document.querySelector('.change-form__input_job_value');// Выбор поля ввода профессии
const profileJob = document.querySelector('.profile__job');// Выбор профессии
const editPopup = document.querySelector('.edit-profile-popup');// Выбор pop-up'a
const closeEditBtn = document.querySelector('.close-edit-popup');// Выбор кнопки закрытия popup
const profileFormElement = document.querySelector('[name="profileChangeForm"]');// Выбор формы

//Объявление переменных 5 спринт
const cardList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.card-template').content;
const cardPopup = document.querySelector('.add-card-popup');
const addBtn = document.querySelector('.profile__add-btn');
const closeCardBtn = document.querySelector('.close-card-popup')
const inputPlaceName = document.querySelector('.add-form__input_name_value');
const inputPlaceImage = document.querySelector('.add-form__input_job_value');
const addCardForm = document.querySelector('[name="addCardForm"]');


const initialCards = [
  {
    name: 'Байкал',
    link: './images/baikal.jfif',
    altImg: 'Озеро Байкал'
  },
  {
    name: 'Домбай',
    link: './images/dombay.jfif',
    altImg: 'Горный хребет Домбай'
  },
  {
    name: 'Вулкан Эльбрус',
    link: './images/elbrus.jfif',
    altImg: 'Стратовулкан Эльбрус'
  },
  {
    name: 'Озеро Эльтон',
    link: './images/elton-lake.jfif',
    altImg: 'Озеро Эльтон'
  },
  {
    name: 'Вулкан Казбек',
    link: './images/kazbek.jfif',
    altImg: 'Стратовулкан Казбек'
  },
  {
    name: 'Красная площадь',
    link: './images/red-square.jfif',
    altImg: 'Красная площадь'
  }
];


//Функция добавления начальных шести карточек
const loadData = function(element) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteCardBtn = cardElement.querySelector('.card__delete-btn');
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.altImg;
  cardElement.querySelector('.card__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  });
  deleteCardBtn.addEventListener('click', function() {
    const listItem = deleteCardBtn.closest('.card')
    console.log(listItem);
    listItem.remove();
  });
  cardList.append(cardElement);
}

//Функция открытия формы изменения профиля и добавление данных в input
const openEditPopup = function() {
  editPopup.classList.add('popup_opened');// Добавить класс
  inputName.value = profileName.textContent;// Добавить имя в input при открытии
  inputJob.value = profileJob.textContent; // Добавить профессию в input при открытии
}

//Функция открытия формы добавления карточки
const openCardPopup = function() {
  cardPopup.classList.add('popup_opened');
  inputPlaceName.value = '';
  inputPlaceImage.value = '';
}

//Функция закрытия форм
const popupClose = function(variable) {
  variable.classList.remove('popup_opened');
}

//Функция отправки формы изменения профиля
const formSubmitHandler =  function(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupClose(editPopup);
}



//Функция отправки формы добавления карточки
const submitCardForm = function(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.cloneNode(true);
  const deleteCardBtn = cardElement.querySelector('.card__delete-btn');
  cardElement.querySelector('.card__title').textContent = inputPlaceName.value;
  cardElement.querySelector('.card__image').src = inputPlaceImage.value;
  cardElement.querySelector('.card__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  });
  deleteCardBtn.addEventListener('click', function() {
    const listItem = deleteCardBtn.closest('.card')
    console.log(listItem);
    listItem.remove();
  });
  cardList.prepend(cardElement);
  popupClose(cardPopup);
}






initialCards.forEach(loadData);
editBtn.addEventListener('click', openEditPopup);
addBtn.addEventListener('click', openCardPopup);
closeEditBtn.addEventListener('click', function() {
  popupClose(editPopup);
});
closeCardBtn.addEventListener('click', function() {
  popupClose(cardPopup);
});
profileFormElement.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', submitCardForm);
