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
  alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
});




const handleCardClick = (name, link) => {
  picturePopup.open(name, link);
};

const handleLikesCondition = (card, likesObject) => {
  card.handleLikesQuantity(likesObject.likes);

  card.toggleHeartState();
}

const createCard = (items, userId) => {
  const card = new Card(items, '#new-card', handleCardClick,{
    openPopupWithConfirmation: (card) => {
      popupWithConfirmation.open();

      popupWithConfirmation.setSubmitAction(() => {
        api.deleteCard(card.cardId)
        .then(() => {
          card.removeCardElement();

          popupWithConfirmation.close();
        })
        .catch((err) => {
          alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
        })
      });
    }, 
    increaseLikesQuantity: (id) => {
      return api.increaseLikesQuantity(id)
      .then(likesObject => {
        handleLikesCondition(card, likesObject)
      })
      .catch((err) => {
        alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
      })
    },
    decreaseLikesQuantity: (id) => {
      return api.decreaseLikesQuantity(id)
      .then(likesObject => {
        handleLikesCondition(card, likesObject)
      })
      .catch((err) => {
        alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
      })
    }
  }, userId);
  
  const cardElement = card.generateCard();

  return cardElement;
};



const picturePopup = new PopupWithImage('#picture-popup');
picturePopup.setEventListeners();



const userInfo = new UserInfo('.profile__text_type_name', '.profile__text_type_activity', '.profile__image');



const handleProfileFormSubmit = ({ name, activity }) => {
  api.saveNewUserInfo({ name, activity })
  .then(newUserInfo => {
    userInfo.setUserInfo({ name: newUserInfo.name, activity: newUserInfo.about });

    profilePopup.close();
  })
  .catch((err) => {
    alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
  })
  .finally(res => {
    profilePopup.changeButtonText(profilePopup.button);
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
  api.saveNewCardInfo({ title, picture })
  .then((newCardInfo) => {
    newCard.renderItem(newCardInfo, userId);

    cardPopup.close();
  })
  .catch((err) => {
    alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
  })
  .finally(res => {
    cardPopup.changeButtonText(cardPopup.button);
  })
};

const cardPopup = new PopupWithForm('#card-popup', handleCardFormSubmit);
cardPopup.setEventListeners();



const popupWithConfirmation = new PopupWithConfirmation('#delete-popup', '#delete-popup-form');
popupWithConfirmation.setEventListeners();



const handleProfileImageFormSubmit = (inputValues) => {
  api.updateProfileImage(inputValues.link)
  .then(newUserInfo => {
    userInfo.setUserAvatar(newUserInfo.avatar);

    profileImagePopup.close();
  })
  .catch((err) => {
    alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
  })
  .finally(res => {
    profileImagePopup.changeButtonText(profileImagePopup.button);
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