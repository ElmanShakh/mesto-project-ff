import { addCard, deleteCard, likeCard, addNewCard,  } from './scripts/card.js';
import { openPopup, closePopup } from './scripts/modal.js';
import './pages/index.css'
export {openImage}
import { initialCards } from './scripts/cards.js';

    const content = document.querySelector('.content');
    const cardContent = content.querySelector('.places__list');
    
    function pushCard() {
      initialCards.forEach(({name, link, alt}) => {
        cardContent.append(addCard({name, link, alt}, deleteCard));
      });
    };

pushCard();

// 1 задание пр6 открытие модального окна
const popup = document.querySelector('.popup');

const profileEditButton = document.querySelector('.profile__edit-button'); // кнопка эдит у имени 
const popupTypeEdit = document.querySelector('.popup_type_edit');  // popup for editButton 

const newCardButton = document.querySelector('.profile__add-button'); // кнопка добавления карточки
const popupTypeAdd = document.querySelector('.popup_type_new-card') // pоpup for newCardButton

const imageButton = document.querySelectorAll('.card__image'); // кнопка добавления по фотке
const popupTypeImage = document.querySelector('.popup_type_image');

const popupImage = popupTypeImage.querySelector('.popup__image') //находим для открытия картинки при клике
const popupDescription = document.querySelector('.popup__caption') // находим для подписи

profileEditButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent; // заполняем данными которые уже на сайте
  jobInput.value = profileDescription.textContent;
  openPopup(popupTypeEdit);
})

newCardButton.addEventListener('click', () => openPopup(popupTypeAdd)); // открытие добавить 

imageButton.forEach(imageButton => {
  imageButton.addEventListener('click', (evt) => {
    openImage(evt.target); // Передаем нажатое изображение в функцию
  });
});

// 1  CLOSE overlay

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

const popupForm = document.querySelector('.popup__form') // получаю форму popupForm

const nameInput = popupForm.querySelector('.popup__input_type_name'); // получаю элементы формы
const jobInput = popupForm.querySelector('.popup__input_type_description');


function editProfile(evt) {
  evt.preventDefault(); // сброс 

  const name = nameInput.value; // получаем значения
  const job = jobInput.value;
  
  profileTitle.textContent = name; // добавляем значения
  profileDescription.textContent = job;

  closePopup(popup);
}

popupForm.addEventListener('submit', editProfile);

/// добавления карточки 

const addCardForm = document.querySelector('.popup_type_new-card') 
const nameAddCardForm = document.querySelector('.popup__input_type_card-name'); // получаем как в предыдущей функции поля
const linkAddCardForm = document.querySelector('.popup__input_type_url');

function createNewCard (evt) {
  evt.preventDefault(); 

  const name = nameAddCardForm.value;
  const link = linkAddCardForm.value;

  const newCard = addNewCard({name: name, link: link}, deleteCard );
  cardContent.prepend(newCard); 

  nameAddCardForm.value=''; 
  linkAddCardForm.value = '';

  closePopup(addCardForm);
}

addCardForm.addEventListener('submit', createNewCard);

// функция открытия картинки

function openImage(image) {
  popupImage.src = image.src;
  popupImage.alt = image.alt; 
  const cardTitle = image.closest('.card').querySelector('.card__title').textContent
  popupDescription.textContent = cardTitle; //тут другое
  openPopup(popupTypeImage)
}

cardContent.addEventListener('click', likeCard);
