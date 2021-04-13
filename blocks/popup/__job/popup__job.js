let inputJob = document.querySelector('.popup__job');
let profileJob = document.querySelector('.profile__job');

editBtn.addEventListener('click', function() {
  inputJob.setAttribute('value', profileJob.textContent);
});

let defaultTextJob = profileJob.textContent;

closeBtn.addEventListener('click', function() {
  inputJob.value = defaultTextJob;
});
