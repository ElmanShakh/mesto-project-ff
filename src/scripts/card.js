export {  addCard, deleteCard, likeCard, addNewCard}

    
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

function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}

function addNewCard({name, link}, deleteCard, openImage) {
  const cardElement = addCard({name, link}, deleteCard);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.addEventListener('click', () => openImage(cardImage));
  return cardElement; 
}
