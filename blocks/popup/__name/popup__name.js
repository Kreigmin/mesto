let inputName = document.querySelector('.popup__name');
let profileName = document.querySelector('.profile__name');

editBtn.addEventListener('click', function() {
  inputName.setAttribute('value', profileName.textContent);
});

let defaultTextName = profileName.textContent;

closeBtn.addEventListener('click', function() {
  inputName.value = defaultTextName;
});

