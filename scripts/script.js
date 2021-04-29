//Объявление переменных 4 спринт-----------------------------------------------------------------------------------------------
const editBtn = document.querySelector('.profile__edit-btn');// Выбор кнопки редактирования
const inputName = document.querySelector('.change-form__input_name_value');// Выбор поля ввода имени
const profileName = document.querySelector('.profile__name');// Выбор имени
const inputJob = document.querySelector('.change-form__input_job_value');// Выбор поля ввода профессии
const profileJob = document.querySelector('.profile__job');// Выбор профессии
const editPopup = document.querySelector('.edit-profile-popup');// Выбор pop-up'a
const closeEditBtn = document.querySelector('.close-edit-popup');// Выбор кнопки закрытия popup
const profileFormElement = document.querySelector('[name="profileChangeForm"]');// Выбор формы

//Объявление переменных 5 спринт-----------------------------------------------------------------------------------------------
const cardList = document.querySelector('.cards__list');//выбор списка карточек
const cardPopup = document.querySelector('.add-card-popup');//выбор popup добавления карточки
const addBtn = document.querySelector('.profile__add-btn');//выбор кнопки открытия popup добавления карточки
const closeCardBtn = document.querySelector('.close-card-popup')//выбор кнопки закрытия popup добавления карточки
const inputPlaceName = document.querySelector('.add-form__input_name_value');//выбор поля названия карточки
const inputPlaceImage = document.querySelector('.add-form__input_link_value');//выбор поля ссылки карточки
const addCardForm = document.querySelector('[name="addCardForm"]');//выбор формы добавления карточки
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

//Функция закрытия форм--------------------------------------------------------------------------------------------------------
const popupClose = function(variable, className) {//объявление переменной в которой функция с двумя аргументми: Имя popup и класс
  variable.classList.remove(className);//удаление класса из popup
}

//Функция отправки формы изменения профиля-------------------------------------------------------------------------------------
const formSubmitHandler =  function(evt) {//объявление переменной
  evt.preventDefault();//предовращение стандартного выполнения функции
  profileName.textContent = inputName.value;//запись текста в имя профиля из поля ввода имени в popup
  profileJob.textContent = inputJob.value;//запись текста в имя профиля из поля ввода профессии в popup
  popupClose(editPopup, 'popup_opened');//вызов функции закрытия popup
}
//Функция открытия формы изменения профиля и добавление данных в input----------------------------------------------------------
const openEditPopup = function() {//объявление переменной
  editPopup.classList.add('popup_opened');// Добавить класс
  inputName.value = profileName.textContent;// Добавить имя в input при открытии
  inputJob.value = profileJob.textContent; // Добавить профессию в input при открытии
}

//Функция открытия формы добавления карточки-----------------------------------------------------------------------------------
const openCardPopup = function() {//объявление переменной
  cardPopup.classList.add('popup_opened');//добавить класс в popup
  inputPlaceName.value = '';//очистить поле ввода имени карточки
  inputPlaceImage.value = '';//очисить поле ввода ссылки картинки
}

//Функция загрузки начальных шести карточек-----------------------------------------------------------------------------------
const loadData = function(element) {//объявление переменной
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);//клонирование всего узла карточки
  const deleteCardBtn = cardElement.querySelector('.card__delete-btn');// запись в переменную кнопки удаления карточки
  cardElement.querySelector('.card__title').textContent = element.name;// запись в название карточки из  массива
  cardElement.querySelector('.card__image').src = element.link;// запись в путь картинки карточки из массива
  cardElement.querySelector('.card__image').alt = element.name;// запись в алтернативное название картинки из массива
  cardList.append(cardElement);//добавление карточки в DOM
  cardElement.querySelector('.card__like').addEventListener('click', function(evt) {//слушатель при нажатии на кнопку лайка
    evt.target.classList.toggle('card__like_active');//добавить класс к кнопке
  });
  deleteCardBtn.addEventListener('click', function() {//слушатель при нажатии на кнопку удалить карточку
    const listItem = deleteCardBtn.closest('.card');//выбор ближайшего родителя с классом card
    listItem.remove();//удаление карточки
    openImagePopup();
  });
}
initialCards.forEach(loadData);//вызов метода forEach c функцией добавления начальных карточек для массива initialCards


//Функция  добавления карточки-----------------------------------------------------------------------------------------------
const addCard = function() {// Объявление перемнной
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);//клонирование всего узла карточки
  const deleteCardBtn = cardElement.querySelector('.card__delete-btn');// запись в переменную кнопки удаления карточки
  cardElement.querySelector('.card__title').textContent = inputPlaceName.value;// запись в название карточки из  popup
  cardElement.querySelector('.card__image').src = inputPlaceImage.value;// запись в путь картинки карточки из  popup
  cardElement.querySelector('.card__image').alt = inputPlaceName.value;// запись в алтернативное название картинки из popup
  cardList.prepend(cardElement);//добавление карточки в DOM
  cardElement.querySelector('.card__like').addEventListener('click', function(evt) {//слушатель при нажатии на кнопку лайка
    evt.target.classList.toggle('card__like_active');//добавить класс к кнопке
  });
  deleteCardBtn.addEventListener('click', function() {//слушатель при нажатии на кнопку удалить карточку
    const listItem = deleteCardBtn.closest('.card')//выбор ближайшего родителя с классом card
    listItem.remove();//удаление карточки
    openImagePopup();
  });
}
//Функция отправки формы добавления карточки---------------------------------------------------------------------------------
const submitCardForm = function(evt) {// Объявление перемнной
  evt.preventDefault();//предовращение стандартного выполнения функции
  addCard();//вызов функции добавления карточки
  openImagePopup();//вызов функции открытия popup полной картинки из карточки
  popupClose(cardPopup, 'popup_opened');//вызов функции закрытия popup добавления карточки
}

//Функция открытия окна полной картинки---------------------------------------------------------------------------------
const openImagePopup = function() {// Объявление перемнной
  document.querySelectorAll('.card__full-img-btn').forEach(function(item, index) {//вызвать метод forEach для всех кнопок
    item.addEventListener('click', function() {//слушатель при нажании
      imagePopup.classList.add('image-popup_opened');//добавить класс открытия popup
      popupFullImage.src = document.querySelectorAll('.card__image')[index].src;//в src картинки в popup добавить src картинки карточки
      imageCaption.textContent = document.querySelectorAll('.card__title')[index].textContent;//в подпись по картиной в popup добавить название карточки
    });
  });
}

editBtn.addEventListener('click', openEditPopup);//Слушатель при нажании открыть popup изменения профиля

addBtn.addEventListener('click', openCardPopup);//Слушатель при нажании открыть popup добавления карточки

closeEditBtn.addEventListener('click', function() {//Слушатель при нажании закрыть popup изменения профиля
  popupClose(editPopup, 'popup_opened');//вызвать функцию закрытия popup
});

closeCardBtn.addEventListener('click', function() {//Слушатель при нажании закрыть popup добавления карточки
  popupClose(cardPopup, 'popup_opened');//вызвать функцию закрытия popup
});
profileFormElement.addEventListener('submit', formSubmitHandler);//Слушатель при отправке формы выполнить функцию formSubmitHandler

openImagePopup();//вызвать функцию открытия popup полной картинки

addCardForm.addEventListener('submit', submitCardForm);//Слушатель при отправке формы выполнить функцию submitCardForm

closeImgPopupBtn.addEventListener('click', function() {//Слушатель при нажании закрыть popup полной картинки
  popupClose(imagePopup, 'image-popup_opened');//вызвать функцию закрытия popup
});
