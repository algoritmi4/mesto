let editButton = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');

let closeButton = document.querySelector('.popup__cross');

let userName = document.querySelector('.profile__text_type_name');

let userActivity = document.querySelector('.profile__text_type_activity');

let userInputs = document.querySelectorAll('.popup__input');

let saveButton = document.querySelector('.popup__button');

function popupOpen() {
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
  userInputs[0].value = userName.textContent;
  userInputs[1].value = userActivity.textContent;
}

editButton.addEventListener('click', popupOpen);

closeButton.addEventListener('click', popupClose);

userInputs[0].value = userName.textContent;

userInputs[1].value = userActivity.textContent;

function addText() {
  userName.textContent = userInputs[0].value;
  userActivity.textContent = userInputs[1].value;
  popup.classList.remove('popup_opened');
}

saveButton.addEventListener('click', addText);