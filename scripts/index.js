const editButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('#popup');

const closeButton = document.querySelector('#popup__cross');

const userInputName = document.querySelector('#popup__input_type_name');

const userInputActivity = document.querySelector('#popup__input_type_activity');

const saveButton = document.querySelector('#popup__button');

const addButton = document.querySelector('.profile__add-button');

const userName = document.querySelector('.profile__text_type_name');

const userActivity = document.querySelector('.profile__text_type_activity');

const cardPopup = document.querySelector('#card-popup');

const cardCloseButton = document.querySelector('#card-popup__cross');

const userInputTitle = document.querySelector('#card-popup__input_type_title');

const userInputPicture = document.querySelector('#card-popup__input_type_picture');

const cardSaveButton = document.querySelector('#card-popup__button');

const cardTemplate = document.querySelector('#new-card').content.querySelector('.photo-grid__card');

const photoGrid = document.querySelector('.photo-grid');

const picturePopup = document.querySelector('.picture-popup');

const pictureCloseButton = document.querySelector('.picture-popup__cross');

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

/* Функция обьявления всех большинства констант и слушателей */
/* для метода initialCard.forEach и функции createNewCard */
function AllConsts() {

  /* Создание нового элемента страницы путем копирования template-заготовки */
  const newCard = cardTemplate.cloneNode(true);

  const newCardLike = newCard.querySelector('.photo-grid__heart');

  const newCardDelete = newCard.querySelector('.photo-grid__trash');

  const newCardImage = newCard.querySelector('.photo-grid__image');

  /* Добавим созданный элемент в начало галереи карточек */
  photoGrid.prepend(newCard);

  /* Слушатель для кнопки лайка */
  newCardLike.addEventListener('click', () => newCardLike.classList.toggle('photo-grid__heart_active'));

  /* Слушатель для кнопки удаления карточки */
  newCardDelete.addEventListener('click', () => newCard.remove());

  /* Слушатель для просмотра картинки по клику на неё */
  newCardImage.addEventListener('click', () => {
    picturePopup.classList.add('picture-popup_opened');
    picturePopup.querySelector('.picture-popup__image').src = newCardImage.src;
    picturePopup.querySelector('.picture-popup__caption').textContent = newCardImage.alt;
  });

  return newCard;
}

/* Метод для вывода массива карточек на страницу */
initialCards.forEach(data => {

  /* Обьявление функции с константами */
  const newCard = AllConsts();

  newCard.querySelector('.photo-grid__image').src = data.link;
  newCard.querySelector('.photo-grid__image').alt = data.name;
  newCard.querySelector('.photo-grid__card-title').textContent = data.name;
});

/* Функция создания новых карточек пользователем */
function createNewCard() {

  /* Обьявление функции с константами */
  const newCard = AllConsts();

  newCard.querySelector('.photo-grid__image').src = userInputPicture.value;
  newCard.querySelector('.photo-grid__image').alt = userInputTitle.value;
  newCard.querySelector('.photo-grid__card-title').textContent = userInputTitle.value;
  cardPopup.classList.remove('popup_opened');
}

/* Функция открытия попапа для создания карточки пользователем */
function cardPopupOpen() {
  cardPopup.classList.add('popup_opened');
  userInputTitle.value = '';
  userInputPicture.value = '';
}

/* Функция открытия попапа для редактирования профиля */
function popupOpen() {
  popup.classList.add('popup_opened');
  userInputName.value = userName.textContent;
  userInputActivity.value = userActivity.textContent;
}

/* Функция сохранения введенных пользователем данных профиля */
function addText() {
  userName.textContent = userInputName.value;
  userActivity.textContent = userInputActivity.value;
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', popupOpen);

addButton.addEventListener('click', cardPopupOpen);

saveButton.addEventListener('click', addText);

cardSaveButton.addEventListener('click', createNewCard);

closeButton.addEventListener('click', () => popup.classList.remove('popup_opened'));

cardCloseButton.addEventListener('click', () => cardPopup.classList.remove('popup_opened'));

pictureCloseButton.addEventListener('click', () => picturePopup.classList.remove('picture-popup_opened'));