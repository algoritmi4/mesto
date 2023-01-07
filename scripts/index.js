let editButton = document.querySelector('.profile__edit-button');

let popup = document.querySelector('.popup');

let closeButton = document.querySelector('.popup__cross');

let userName = document.querySelector('.profile__text_type_name');

let userActivity = document.querySelector('.profile__text_type_activity');

let userInputName = document.getElementById('popup__input_type_name');

let userInputActivity = document.getElementById('popup__input_type_activity');

let saveButton = document.querySelector('.popup__button');

function popupOpen() {
  popup.classList.add('popup_opened');
  userInputName.value = userName.textContent;
  userInputActivity.value = userActivity.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function addText() {
  userName.textContent = userInputName.value;
  userActivity.textContent = userInputActivity.value;
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpen);

closeButton.addEventListener('click', popupClose);

saveButton.addEventListener('click', addText);