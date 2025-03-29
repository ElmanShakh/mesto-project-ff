import { addCard, deleteCard, likeCard, addNewCard } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import './pages/index.css'
import { initialCards } from './scripts/cards.js';
import {enableValidation, clearValidation} from './scripts/validation.js'
import { getUserInfo, postCard, downloadCards, changeAvatar, editUserProfile} from './scripts/api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const popupTypeClosePopup = document.querySelector('.popup_type_close-popup')
const confirmDeleteButton = popupTypeClosePopup.querySelector('.popup__button');
let cardToDelete;
let cardIdToDelete;

confirmDeleteButton.addEventListener('click', () => {
  if (cardToDelete && cardIdToDelete) {
    deleteCard(cardToDelete, cardIdToDelete);  // Используем функцию deleteCard из card.js
    cardToDelete = null;
    cardIdToDelete = null;
    closePopup(popupTypeClosePopup);
  }
})

const deleteCallback = (cardElement, cardId) => {
  cardToDelete = cardElement; 
  cardIdToDelete = cardId; 
  openPopup(popupTypeClosePopup);
}

const content = document.querySelector('.content');
const cardContent = content.querySelector('.places__list');

function pushCards(cards, userId, deleteCallback, likeCard, openImage) {
  cards.forEach(cardData => {
    const cardElement = addCard(cardData, userId, deleteCallback, likeCard, openImage);
    const cardImage = cardElement.querySelector('.card__image'); 
    cardImage.addEventListener('click', (evt) => {
      openImage(evt.target);
    });
    cardContent.append(cardElement);
  });
}

// 1 задание пр6 открытие модального окна
const popup = document.querySelector('.popup');

const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка эдит у имени 
const popupTypeEdit = document.querySelector('.popup_type_edit');  // popup for editButton 

const newCardButton = document.querySelector('.profile__add-button'); // кнопка добавления карточки
const popupTypeAdd = document.querySelector('.popup_type_new-card .popup__form'); // pоpup for newCardButton

const imageButton = document.querySelectorAll('.card__image'); // кнопка добавления по фотке
const popupTypeImage = document.querySelector('.popup_type_image');

const popupImage = popupTypeImage.querySelector('.popup__image') //находим для открытия картинки при клике
const popupDescription = document.querySelector('.popup__caption') // находим для подписи

const popupForm = document.querySelector('.popup_type_edit .popup__form');  
const nameInput = popupForm.querySelector('.popup__input_type_name');  
const jobInput = popupForm.querySelector('.popup__input_type_description');

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent; // заполняем данными которые уже на сайте
  jobInput.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
  clearValidation(popupForm, validationConfig); // из валидации
})

newCardButton.addEventListener('click', () => {
  popupTypeAdd.reset();
  clearValidation(popupTypeAdd, validationConfig); // из валидации
  openPopup(addCardForm);
});  

// 1  CLOSE overlay

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close')) {
    const popupOpened = evt.target.closest('.popup');
    if (popupOpened) {
      closePopup(popupOpened); 
    }
  }
});

// Далее формы

const profileTitle = document.querySelector('.profile__title'); // это поле где надпись имя
const profileDescription = document.querySelector('.profile__description'); // это поле где надпись работа
const profileImage = document.querySelector('.profile__image')

function editProfile(evt) {
  evt.preventDefault(); 
  const submitButton = popupTypeEdit.querySelector('.popup__button');
  loadingButtonText(submitButton, true);
  const name = nameInput.value; // получаем значения
  const about = jobInput.value;
  editUserProfile(name, about)
  .then((res) =>{
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about
    closePopup(popupTypeEdit);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => loadingButtonText(submitButton, false));
}

popupForm.addEventListener('submit', editProfile);

/// добавления карточки 

const addCardForm = document.querySelector('.popup_type_new-card') 
const nameAddCardForm = addCardForm.querySelector('.popup__input_type_card-name');
const linkAddCardForm = addCardForm.querySelector('.popup__input_type_url');

function createNewCard (evt) {
  evt.preventDefault(); 
  const submitButton = addCardForm.querySelector('.popup__button')
  loadingButtonText(submitButton, true);
  const name = nameAddCardForm.value;
  const link = linkAddCardForm.value;
 
  postCard(name, link)
    .then((card) => {
    const newCard = addNewCard(card, userId, deleteCallback, likeCard, openImage );
    cardContent.prepend(newCard);
    nameAddCardForm.value=''; 
    linkAddCardForm.value = '';
    closePopup(addCardForm); 
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => loadingButtonText(submitButton, false));
}

addCardForm.addEventListener('submit', createNewCard);

// функция открытия картинки

function openImage(image) {
  popupImage.src = image.src;
  popupImage.alt = image.alt; 
  const cardTitle = image.closest('.card').querySelector('.card__title').textContent
  popupDescription.textContent = cardTitle;
  openPopup(popupTypeImage)
}

// пр7 ВАЛИДАЦИЯ 

enableValidation(validationConfig);

// пр7 api

let userId; 

Promise.all([getUserInfo(), downloadCards()])  
.then(([userInfo, cards]) => {  
  userId = userInfo._id;
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
  pushCards(cards, userId, deleteCallback, likeCard, openImage);
})
.catch((error) => {
  console.error(error);
});

// формы для пр7

// аватар

const avatarPopup = document.querySelector('.popup_type_change-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form-avatar');
const profileOverlay = document.querySelector('.profile__overlay');

profileOverlay.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig)
  openPopup(avatarPopup);
});

function updateAvatar(evt) {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector('.popup__button');
  loadingButtonText(submitButton, true)
  const avatarInput = avatarPopup.querySelector('.popup__avatar-input');
  const avatarLink = avatarInput.value;
  profileImage.style.backgroundImage = avatarLink;

  changeAvatar(avatarLink)
    .then((res) => {
      profileImage.style.backgroundImage = `url(${res.avatar})`
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => loadingButtonText(submitButton, false))
}

avatarForm.addEventListener('submit', updateAvatar);

// функция для ux кнопок

function loadingButtonText(button, isLoading) {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
}
