// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

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

pushCard();





