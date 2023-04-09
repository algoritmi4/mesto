import './index.css';

import FormValidator from '../components/FormValidator.js';

import Card from '../components/Card.js';

import Section from '../components/Section.js';

import PopupWithImage from '../components/PopupWithImage';

import PopupWithForm from '../components/PopupWithForm.js';

import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

import UserInfo from '../components/UserInfo.js';

import Api from '../components/Api.js';

const editButton = document.querySelector('.profile__edit-button');

const addCardButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__text_type_name');

const profileActivity = document.querySelector('.profile__text_type_activity');

const profileImage = document.querySelector('.profile__image');

const profileImageLink = document.querySelector('.profile__image-link');

let userId = null;

const formValidators = {};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'ee66554d-24d9-4a71-83ed-2d532b7c0289',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userInfo, cardsInfo]) => {
  userId = userInfo._id;
  newCard.renderItems(cardsInfo, userId);
  profileName.textContent = userInfo.name;
  profileActivity.textContent = userInfo.about;
  profileImage.src = userInfo.avatar;
})
.catch((err) => {
  alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`)
});




const handleCardClick = (name, link) => {
  picturePopup.open(name, link);
};

const createCard = (items, userId) => {
  const card = new Card(items, '#new-card', handleCardClick,{
    openPopupWithConfirmation: (card) => {
      popupWithConfirmation.open();

      popupWithConfirmation.setSubmitAction(() => {
        api.deleteCard(card._cardId)
        .then(() => {
          card._removeCardElement();
        })
      });
    }, 
    increaseLikesQuantity: (id) => {
      return api.increaseLikesQuantity(id)
    },
    decreaseLikesQuantity: (id) => {
      return api.decreaseLikesQuantity(id)
    }
  }, userId);
  
  const cardElement = card.generateCard();

  return cardElement;
};



const picturePopup = new PopupWithImage('#picture-popup');
picturePopup.setEventListeners();



const userInfo = new UserInfo('.profile__text_type_name', '.profile__text_type_activity');



const handleProfileFormSubmit = ({ name, activity }) => {
  api.saveNewUserInfo({ name, activity })
  .then(newUserInfo => {
    userInfo.setUserInfo({ name: newUserInfo.name, activity: newUserInfo.about });
  })
  .catch((err) => {
    alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`)
  })
  .finally(res => {
    document.querySelector('#profile-popup__button').textContent = 'Сохранить';
  })
};

const profilePopup = new PopupWithForm('#profile-popup', handleProfileFormSubmit);
profilePopup.setEventListeners();


const handleEditButtonClick = () => {
  profilePopup.open();

  profilePopup.setInputValues(userInfo.getUserInfo());

  formValidators['profile-popup__form'].resetValidation(true);
};

editButton.addEventListener('click', handleEditButtonClick);



const handleAddButtonClick = () => {
  cardPopup.open();

  formValidators['card-popup__form'].resetValidation(false);
};

addCardButton.addEventListener('click', handleAddButtonClick);


const handleCardFormSubmit = ({ title, picture }) => {
  Promise.all([api.getUserInfo(), api.saveNewCardInfo({ title, picture })])
  .then(([userInfo, newCardInfo]) => {
    userId = userInfo._id;

    newCard.renderItem({
      name: newCardInfo.name,
      link: newCardInfo.link,
      _id: newCardInfo._id,
      likes: [],
      owner: newCardInfo.owner
    }, userId);
  })
  .catch((err) => {
    alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`)
  })
  .finally(res => {
    document.querySelector('#card-popup__button').textContent = 'Сохранить';
  })
};

const cardPopup = new PopupWithForm('#card-popup', handleCardFormSubmit);
cardPopup.setEventListeners();



const popupWithConfirmation = new PopupWithConfirmation('#delete-popup', '#delete-popup-form');
popupWithConfirmation.setEventListeners();



const handleProfileImageFormSubmit = (inputValues) => {
  api.updateProfileImage(inputValues.link)
  .then(userInfo => {
    profileImage.src = userInfo.avatar;
  })
  .catch((err) => {
    alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`)
  })
  .finally(res => {
    document.querySelector('#profile-image-popup__button').textContent = 'Сохранить';
  })
};

const profileImagePopup = new PopupWithForm('#profile-image-popup', handleProfileImageFormSubmit);
profileImagePopup.setEventListeners();


const handleProfileImageClick = () => {
  profileImagePopup.open();

  formValidators['profile-image-popup__form'].resetValidation(false);
};

profileImageLink.addEventListener('click', handleProfileImageClick);



const newCard = new Section({
  renderer: (initialCard, userId) => {
    const cardElement = createCard(initialCard, userId);
  
    newCard.addItem(cardElement);
  }
}, '.photo-grid');



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