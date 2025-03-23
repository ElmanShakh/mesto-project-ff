import { deleteMyCard, putLike, deleteLike } from "./api";
import { openPopup, closePopup } from "./modal";
export { addCard, deleteCard, likeCard, addNewCard}

const popupTypeClosePopup = document.querySelector('.popup_type_close-popup')
const confirmDeleteButton = popupTypeClosePopup.querySelector('.popup__button');
let cardToDelete;
let cardIdToDelete;
let deleteCardCallback;

function addCard(card, userId, deleteCard){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeAmount = cardElement.querySelector('.card__like-amount')

  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardLikeAmount.textContent = card.likes.length
 // удаляем только свои карточки
  if (card.owner._id !== userId) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener('click', () => {
      cardToDelete = cardElement;
      cardIdToDelete = card._id;
      deleteCardCallback = deleteCard;
      openPopup(popupTypeClosePopup);
    });
  }
  
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', () => {
    likeCard(cardLikeButton, cardLikeAmount, userId, card._id);
  });
    return cardElement;
};

confirmDeleteButton.addEventListener('click', () => {
  if (cardToDelete && cardIdToDelete && typeof deleteCardCallback === 'function') {
    deleteCardCallback(cardToDelete, cardIdToDelete);
    cardToDelete = null;
    cardIdToDelete = null;
    deleteCardCallback = null;
    closePopup(popupTypeClosePopup);
  }
});

function deleteCard(cardElement, cardId) {
  deleteMyCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error(err);
    })
}

//лайк карточки

function likeCard(likeButton, cardLikeAmount, userId, cardId) {
  const cardIsLiked = likeButton.classList.contains("card__like-button_is-active");
  const cardStatus = cardIsLiked ? deleteLike : putLike;
  cardStatus(cardId)
    .then((updatedCard) => {
      cardLikeAmount.textContent = updatedCard.likes.length; //|| "";
      if (updatedCard.likes.some(like => like._id === userId)) {
        likeButton.classList.add("card__like-button_is-active");
      } else {
        likeButton.classList.remove("card__like-button_is-active");
      }
    })
    .catch((err) => {
      console.error(err);
    })
}

function addNewCard(card, userId, deleteCard, openImage) {
  const cardElement = addCard(card, userId, deleteCard);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', () => openImage(cardImage));
  return cardElement;
}
