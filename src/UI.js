import { getCatsFromApi } from './Fetch.js';
import { RANDOM_API_URL, FAVORITES_API_URL } from './URL.js';

//*************************************************************** */

const randomCatsContainer = document.querySelector('.random-cats-container');
const favoriteCatsSection = document.querySelector('.favorite-cats-section');
export const favoriteCatsContainer = document.querySelector(
  '.favorite-cats-container'
);
const form = document.querySelector('#form');
const chooseBtn = document.querySelector('#choose-btn');

// ********************************************************************************

const cleanCats = container => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

// ********************************************************************************

const emptyValidation = () => {
  if (!favoriteCatsContainer.firstChild) {
    const noCatsParagraph = document.createElement('p');
    noCatsParagraph.textContent = 'There is not favorite cats yet!';

    favoriteCatsSection.insertBefore(noCatsParagraph, favoriteCatsContainer);
  }
};

// *******************************************************************************

export const showWaitMessage = () => {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'message-container';
  messageContainer.id = 'wait-message-container';
  const waitMessage = document.createElement('p');
  waitMessage.textContent = 'Wait just a few moment....';
  waitMessage.className = 'message';
  waitMessage.id = 'wait-message';
  messageContainer.append(waitMessage);
  chooseBtn.insertAdjacentElement('afterend', messageContainer);
};

// *******************************************************************************

export const DeleteWaitMessage = () => {
  const messageContainer = document.querySelector('#wait-message-container');
  messageContainer.remove();
};

// *******************************************************************************

export const showSuccessMessage = () => {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'message-container';
  messageContainer.id = 'success-message-container';
  const successMessage = document.createElement('p');
  successMessage.textContent = 'Image loaded successfully in favorite section!';
  successMessage.className = 'message';
  successMessage.id = 'success-message';
  messageContainer.append(successMessage);
  chooseBtn.insertAdjacentElement('afterend', messageContainer);
};

// *******************************************************************************

export const deleteSuccessMessage = () => {
  const messageContainer = document.querySelector('#success-message-container');
  setTimeout(() => {
    messageContainer.remove();
  }, 1500);
};

// *******************************************************************************

export const showErrorMessage = () => {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'message-container';
  messageContainer.id = 'error-message-container';
  const errorMessage = document.createElement('p');
  errorMessage.textContent = 'No image selected, try again';
  errorMessage.className = 'message';
  errorMessage.id = 'error-message';
  messageContainer.append(errorMessage);
  chooseBtn.insertAdjacentElement('afterend', messageContainer);
};

// *******************************************************************************

export const deleteErrorMessage = () => {
  const messageContainer = document.querySelector('#error-message-container');
  setTimeout(() => {
    messageContainer.remove();
  }, 1500);
};

// *******************************************************************************

export const renderCats = (data, container, type) => {
  const cats = data.map(cat => {
    const div = document.createElement('div');
    const catImg = document.createElement('img');
    const heartIcon = document.createElement('img');

    div.className = 'img-container';
    div.id = cat.id;
    catImg.className = 'cat-img';
    heartIcon.className = 'heart-icon';
    heartIcon.id = cat.id;

    if (type === 'random') {
      catImg.src = cat.url;
      heartIcon.src = './assets/heart-silhouette.png';
    } else if (type === 'favorite') {
      catImg.src = cat.image.url;
      heartIcon.src = './assets/heart-fill.png';
    } else if (type === 'upload') {
      catImg.src = cat.url;
      heartIcon.src = './assets/heart-fill.png';
    }

    div.append(catImg, heartIcon);

    return div;
  });

  container.append(...cats);
};

// ********************************************************************************

export const reRenderEliminated = id => {
  const node = document.getElementById(id);
  node.remove();
};

// ********************************************************************************

export const reRenderAdded = (randomId, favoriteId) => {
  const randomNode = document.getElementById(randomId);
  randomNode.id = favoriteId;
  randomNode.children[1].id = favoriteId;
  favoriteCatsContainer.append(randomNode);
};

// ********************************************************************************

export const showRandomCats = async () => {
  cleanCats(randomCatsContainer);
  const data = await getCatsFromApi(RANDOM_API_URL);
  renderCats(data, randomCatsContainer, 'random');
};

// ********************************************************************************

export const showFavoriteCats = async () => {
  const data = await getCatsFromApi(FAVORITES_API_URL);
  if (data.length !== 0) {
    renderCats(data, favoriteCatsContainer, 'favorite');
  } else {
    emptyValidation();
  }
};
