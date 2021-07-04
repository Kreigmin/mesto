export default class Api {
  constructor({baseUrl, authorization, contentType}) {
    this._baseUrl = baseUrl;
    this._authorization = authorization;
    this._contentType = contentType;

  }

  // method which requests profile data from server and set them
  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        authorization: this._authorization
      }
    })
    .then(res => {
      if (res.ok) {// response status check, if status 200 Ok => return promise
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  // method which requests initial data of cards
  // getCards() {
  //   return fetch(this._baseUrl + '/cards', {
  //     headers: {
  //       authorization: this._authorization
  //     }
  //   })
  //   .then(res => {
  //     if(res.ok) {// response status check, if status 200 Ok => return promise
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }


  // // method which send new profile data to server
  // sendProfileDataToServer(profileName, profileJob) {
  //   return fetch(this._baseUrl + '/users/me', {
  //     method: 'PATCH',
  //     headers: {
  //       authorization: this._authorization,
  //       'Content-Type': this._contentType
  //     },
  //     body: JSON.stringify({
  //       name: profileName,
  //       about: profileJob
  //     })
  //   })
  //   .then(res => {
  //     if (res.ok) {// response status check, if status 200 Ok => return promise
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }

  // // method which send new card data to server
  // addNewCardToServer(cardName, cardLink) {
  //   return fetch(this._baseUrl + '/cards', {
  //     method: 'POST',
  //     headers: {
  //       authorization: this._authorization,
  //       'Content-Type': this._contentType
  //     },
  //     body: JSON.stringify({
  //       name: cardName,
  //       link: cardLink
  //     })
  //   })
  //   .then(res => {
  //     if(res.ok) {// response status check, if status 200 Ok => return promise
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }

  // // method which delete card
  // deleteCard(idCard) {
  //   return fetch(this._baseUrl + '/cards/' + idCard, {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: this._authorization,
  //       'Content-Type': this._contentType
  //     }
  //   })
  //   .then(res => {
  //     if(res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }

  // sendLikeToServer(cardId, likes) {
  //   return fetch(this._baseUrl + '/cards/likes/' + cardId, {
  //     method: 'PUT',
  //     headers: {
  //       authorization: this._authorization,
  //       'Content-Type': this._contentType
  //     },
  //     body: JSON.stringify({
  //       likes: likes
  //     })
  //   })
  //   .then(res => {
  //     if(res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }

  // deleteLike(idCard) {
  //   return fetch(this._baseUrl + '/cards/likes/' + idCard, {
  //     method: 'DELETE',
  //     headers: {
  //       authorization: this._authorization,
  //       'Content-Type': this._contentType
  //     }
  //   })
  //   .then(res => {
  //     if(res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }

  // changeAvatar(avatarLink) {
  //   return fetch(this._baseUrl + '/users/me/avatar', {
  //     method: 'PATCH',
  //     headers: {
  //       authorization: this._authorization,
  //       'Content-Type': this._contentType
  //     },
  //     body: JSON.stringify({
  //       avatar: avatarLink
  //     })
  //   })
  //   .then(res => {
  //     if(res.ok) {
  //       return res.json();
  //     }
  //     return Promise.reject(`Ошибка: ${res.status}`);
  //   })
  //   .then((profile) => {
  //     this._profileAvatar.style.backgroundImage = `url(${profile.avatar})`;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }

}
