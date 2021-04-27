//Объявление переменных 4 спринт
let editBtn = document.querySelector('.profile__edit-btn');// Выбор кнопки редактирования
let inputName = document.querySelector('.change-form__input_name_value');// Выбор поля ввода имени
let profileName = document.querySelector('.profile__name');// Выбор имени
let inputJob = document.querySelector('.change-form__input_job_value');// Выбор поля ввода профессии
let profileJob = document.querySelector('.profile__job');// Выбор профессии
let popup = document.querySelector('.popup');// Выбор pop-up'a
let closeBtn = document.querySelector('.popup__close-btn');// Выбор кнопки закрытия popup
let formElement = document.querySelector('.change-form');// Выбор формы

//Объявление переменных 5 спринт
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
const cardList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('#card').content;
// const cardElement = cardTemplate.cloneNode(true);
// const cardTitle = cardElement.querySelector('.card__title');
// const cardImage = cardElement.querySelector('.card__image');

function loadData(element) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.altImg;
  cardList.append(cardElement);
}

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
initialCards.forEach(loadData);


