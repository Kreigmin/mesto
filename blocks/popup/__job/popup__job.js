let inputJob = document.querySelector('.popup__job');
let profileJob = document.querySelector('.profile__job').textContent;

editBtn.addEventListener('click', function() {
  inputJob.setAttribute('value', profileJob);
});
