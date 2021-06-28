export default class Api {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
    this._authorization = 'd4c6f8c0-4eea-4fc7-88ea-b49bfd0af7e6';
    this._contentType = 'application/json';
  }
  // lala() {
  //   console.log(this);
  // }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        authorization: this._authorization
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then((data) => {
      document.querySelector('.profile__name').textContent = data.name;
      document.querySelector('.profile__job').textContent = data.about;
      document.querySelector('.profile__avatar').src = data.avatar;
    })
    .catch((err) => {
      console.log(err);
    })
  }
  // lala() {
  //   fetch('https://mesto.nomoreparties.co/v1/cohort-25/cards', {
  //     headers: {
  //       authorization: 'd4c6f8c0-4eea-4fc7-88ea-b49bfd0af7e6'
  //     }
  //   }).then(res => res.json()).then((res) => {
  //     console.log(res);
  //   })
  // }

  // addNewCardToServer() {
  //   fetch('https://mesto.nomoreparties.co/v1/cohort-25/cards', {
  //     method: 'POST',
  //     headers: {
  //       authorization: 'd4c6f8c0-4eea-4fc7-88ea-b49bfd0af7e6',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       name: 'Архыз',
  //       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  //     })
  //   })
  // }
  // deleteCardfromServer() {
  //   fetch('https://mesto.nomoreparties.co/v1/cohort-25/cards/' + '60d9fb224a5b6302c5a09c33', {
  //     method: 'DELETE',
  //     headers:{
  //       authorization: 'd4c6f8c0-4eea-4fc7-88ea-b49bfd0af7e6',
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(res => res.json()).then((res) => {
  //     console.log(res);
  //   })
  // }

}
