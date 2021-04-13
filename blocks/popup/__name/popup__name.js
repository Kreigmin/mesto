let inputName = document.querySelector('.popup__name');
let profileName = document.querySelector('.profile__name').textContent;

editBtn.addEventListener('click', function() {
  inputName.setAttribute('value', profileName);
});

