export { pushCard, addCard, deleteCard, likeCard, newCardCreate, addNewCard}
import { initialCards } from './cards.js'
import { closePopup } from './modal.js';

const content = document.querySelector('.content');
const cardContent = content.querySelector('.places__list');

function pushCard() {
  initialCards.forEach(({name, link, alt}) => {
    cardContent.append(addCard({name, link, alt}, deleteCard));
  });
};

function addCard({name, link, alt}, deleteCard){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = alt;
  

  cardDeleteButton.addEventListener('click', () => deleteCard(cardElement));
  return cardElement;
};
  
function deleteCard(cardElement) {
  cardElement.remove();
};

//лайк карточки


function likeCard(buttonLike) {
  buttonLike.forEach(buttonLike => {
    buttonLike.addEventListener('click', function(evt) {
      if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
      }
    })
  })
}

const addCardForm = document.querySelector('.popup_type_new-card') // получаем форму

const nameAddCardForm = document.querySelector('.popup__input_type_card-name'); // получаем как в предыдущей функции поля
const linkAddCardForm = document.querySelector('.popup__input_type_url');

function newCardCreate(evt) {
  evt.preventDefault(); 

  const name = nameAddCardForm.value;
  const link = linkAddCardForm.value;

  const newCard = addNewCard({name: name, link: link}, deleteCard );
  cardContent.prepend(newCard);

  nameAddCardForm.value='';
  linkAddCardForm.value = '';

  closePopup(addCardForm);
}

function addNewCard({name, link}, deleteCard) {
  const cardElement = addCard({name, link}, deleteCard);
  const buttonLike = cardElement.querySelectorAll('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  likeCard(buttonLike);
  cardImage.addEventListener('click', () => openImage(cardImage));
  return cardElement; 
}



pushCard();
