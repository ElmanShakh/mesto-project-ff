import {  pushCard, addCard, deleteCard, likeCard, newCardCreate, addNewCard } from './scripts/card.js';
import { openPopup, closePopup, closePopupEsc, closePopupOveray} from './scripts/modal.js';
import './pages/index.css'


// 1 задание пр6 открытие модального окна
const popup = document.querySelector('.popup');

const editButton = document.querySelector('.profile__edit-button'); // кнопка эдит у имени
const popupTypeEdit = document.querySelector('.popup_type_edit');  // popup for editButton 

const newCardButton = document.querySelector('.profile__add-button'); // кнопка добавления карточки
const popupTypeAdd = document.querySelector('.popup_type_new-card') // pоpup for newCardButton

const imageButton = document.querySelectorAll('.card__image'); // кнопка добавления по фотке
const popupTypeImage = document.querySelector('.popup_type_image');


const popupImage = popupTypeImage.querySelector('.popup__image') //находим для открытия картинки при клике
const popupDescription = popupTypeImage.querySelector('.popup__caption') // находим для подписи

editButton.addEventListener('click', () => openPopup(popupTypeEdit)); // открытие эдит

newCardButton.addEventListener('click', () => openPopup(popupTypeAdd)); // открытие добавить 

imageButton.forEach(imageButton => {
  imageButton.addEventListener('click', (evt) => {
    openImage(evt.target); // Передаем нажатое изображение в функцию
  });
});

// 1 задание CLOSE overlay

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup__close')) {
    const popupOpened = evt.target.closest('.popup');// Нужно потом исправить
    if (popupOpened) {
      closePopup(popupOpened); 
    }
  }
});


// Далее формы

const profileTitle = document.querySelector('.profile__title'); // это поле где надпись имя
const profileDescription = document.querySelector('.profile__description'); // это поле где надпись работа

const formElement = document.querySelector('.popup__form') // получаю форму

const nameInput = formElement.querySelector('.popup__input_type_name'); // получаю элементы формы
const jobInput = formElement.querySelector('.popup__input_type_description');

nameInput.value = profileTitle.textContent; // заполняем данными которые уже на сайте
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault(); // сброс 

  const name = nameInput.value; // получаем значения
  const job = jobInput.value;
  
  profileTitle.textContent = name; // добавляем значения
  profileDescription.textContent = job;

  closePopup(popup);
}

formElement.addEventListener('submit', handleFormSubmit);


/// добавления карточки 

const addCardForm = document.querySelector('.popup_type_new-card') 

addCardForm.addEventListener('submit', newCardCreate);

// функция открытия картинки

function openImage(image) {
  popupImage.src = image.src;
  popupImage.alt = image.alt;
  popupDescription.textContent = image.alt;
  openPopup(popupTypeImage)

}

//Лайк карточки

const buttonLike = document.querySelectorAll('.card__like-button')
likeCard(buttonLike);



