import './index.css';

import FormValidator from '../components/FormValidator.js';

import Card from '../components/Card.js';

import Section from '../components/Section.js';

import PopupWithImage from '../components/PopupWithImage';

import PopupWithForm from '../components/PopupWithForm.js';

import UserInfo from '../components/UserInfo.js';

const editButton = document.querySelector('.profile__edit-button');

const addCardButton = document.querySelector('.profile__add-button');

const formValidators = {};

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const createCard = (items) => {
  const card = new Card(items, '#new-card', handleCardClick);
  
  const cardElement = card.generateCard();

  return cardElement;
};

const userInfo = new UserInfo('.profile__text_type_name', '.profile__text_type_activity');

const picturePopup = new PopupWithImage('#picture-popup');
picturePopup.setEventListeners();


const handleProfileFormSubmit = ({ name, activity }) => {
  userInfo.setUserInfo({ name, activity });
};

const handleEditButtonClick = () => {
  profilePopup.open();

  profilePopup.setInputValues(userInfo.getUserInfo());

  formValidators['profile-popup__form'].resetValidation(true);
};

editButton.addEventListener('click', handleEditButtonClick);

const profilePopup = new PopupWithForm('#profile-popup', handleProfileFormSubmit);
profilePopup.setEventListeners();


const handleCardFormSubmit = ({ title, picture }) => {
  newCard.renderItem({
    name: title,
    link: picture
  });
};

const handleAddButtonClick = () => {
  cardPopup.open();

  formValidators['card-popup__form'].resetValidation(false);
};

addCardButton.addEventListener('click', handleAddButtonClick);

const cardPopup = new PopupWithForm('#card-popup', handleCardFormSubmit);
cardPopup.setEventListeners();


const handleCardClick = (name, link) => {
  picturePopup.open(name, link);
};


const newCard = new Section({
  items: initialCards,
  renderer: (initialCard) => {
    const cardElement = createCard(initialCard);
  
    newCard.addItem(cardElement);
  }
}, '.photo-grid');

newCard.renderItems();


const enableValidation = (config) => {
  const formList = document.querySelectorAll('.popup__form');
  
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);

    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;

    validator.enableValidation();
  });
};

enableValidation({
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled'
});