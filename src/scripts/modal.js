export {openPopup, closePopup, closePopupEsc, closePopupOveray}

function openPopup (popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
  popup.addEventListener('click', closePopupOveray)
}

function closePopup (popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEsc);
  popup.removeEventListener('click', closePopupOveray)
}

// overlay and esc

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_is-opened');
    if (popupOpened) {
      closePopup(popupOpened); 
    }
  }
}

// Закрытие оверлэй

function closePopupOveray(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(evt.target); 
  }
}