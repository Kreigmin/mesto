let inputName = document.querySelector('.popup__name');
let profileName = document.querySelector('.profile__name');

editBtn.addEventListener('click', function() {
  inputName.setAttribute('value', profileName.textContent);
});

closeBtn.addEventListener('click', function() {
  let defaultTextName = profileName.textContent;
  inputName.value = defaultTextName;
});

