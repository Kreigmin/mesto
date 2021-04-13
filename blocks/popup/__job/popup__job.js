let inputJob = document.querySelector('.popup__job');
let profileJob = document.querySelector('.profile__job');

editBtn.addEventListener('click', function() {
  inputJob.setAttribute('value', profileJob.textContent);
});

closeBtn.addEventListener('click', function() {
  let defaultTextJob = profileJob.textContent;
  inputJob.value = defaultTextJob;
});
