const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-32',
  headers: {
    authorization: 'b3ff09f4-fec3-439f-8d16-f93d16d1cab9',
    'Content-Type': 'application/json'
  }
}

//вместо then везде
const checkingResult = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//Загрузка информации о пользователе с сервера +

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,

  })
  .then((res) => checkingResult(res))
}

// Загрузка карточек с сервера +

export const downloadCard = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
  .then((res) => checkingResult(res))
  .then((card) => {
    console.log(card)
    return card
  })
}

// Редактирование профиля +

export const editUserProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
})
  })
  .then(checkingResult);
}

//  Добавление новой карточки +

export const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
})
  })
  .then(checkingResult)
}

// Удаление карточки +

export const deleteMyCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then((res) => checkingResult(res))
}

//   Постановка и снятие лайка +

export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then(checkingResult);
}

export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE", 
    headers: config.headers,
  })
  .then(checkingResult);
}

//  Обновление аватара пользователя +

export const changeAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
})
  })
  .then(checkingResult);
}