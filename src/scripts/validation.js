export {enableValidation, clearValidation, validationConfig}

const popupForm = document.querySelector('.popup__form') 
const formInput = popupForm.querySelector('.popup__input')

const showInputError = (popupForm, formInput, errorMessage, config) => {
  const formError = popupForm.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(config.inputErrorClass)
  formError.classList.add(config.errorClass)
  formError.textContent = errorMessage;
}

const hideInputError = (popupForm, formInput, config) => {
  const formError = popupForm.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(config.inputErrorClass)
  formError.classList.remove(config.errorClass)
  formError.textContent = '';
}

const isValid = (popupForm, formInput, config) => {
  if (formInput.validity.patternMismatch) {
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  } else {
    formInput.setCustomValidity("");
  }
  if (!formInput.validity.valid) {
    showInputError(popupForm, formInput, formInput.validationMessage, config);
  } else {
    hideInputError(popupForm,formInput, config);
  }
}

const setEventListeners = (popupForm, config) => {
  const inputList = Array.from(popupForm.querySelectorAll(config.inputSelector));
  const buttonElement = popupForm.querySelector(config.submitButtonSelector)
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(popupForm, formInput, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((popupForm) => {
    setEventListeners(popupForm, config );
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  })
};


const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

const clearValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity('');
    hideInputError(formElement, inputElement, config);
  });
  toggleButtonState(inputList, buttonElement, config);
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};