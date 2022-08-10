import { getDogsFromApi } from "./Fetch.js";
import { RANDOM_API_URL, FAVORITES_API_URL } from "./URL.js";

//*************************************************************** */

const randomDogsContainer = document.querySelector(".random-dogs-container");
const favoriteDogsSection = document.querySelector(".favorite-dogs-section");
export const favoriteDogsContainer = document.querySelector(
  ".favorite-dogs-container"
);
const form = document.querySelector("#form");
const chooseBtn = document.querySelector("#choose-btn");

// ********************************************************************************

const cleanDogs = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

// ********************************************************************************

const emptyValidation = () => {
  if (!favoriteDogsContainer.firstChild) {
    const noDogsParagraph = document.createElement("p");
    noDogsParagraph.textContent = "There is not favorite dogs yet!";

    favoriteDogsSection.insertBefore(noDogsParagraph, favoriteDogsContainer);
  }
};

// *******************************************************************************

export const showWaitMessage = () => {
  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";
  messageContainer.id = "wait-message-container";
  const waitMessage = document.createElement("p");
  waitMessage.textContent = "Wait just a few moment....";
  waitMessage.className = "message";
  waitMessage.id = "wait-message";
  messageContainer.append(waitMessage);
  chooseBtn.insertAdjacentElement("afterend", messageContainer);
};

// *******************************************************************************

export const DeleteWaitMessage = () => {
  const messageContainer = document.querySelector("#wait-message-container");
  messageContainer.remove();
};

// *******************************************************************************

export const showSuccessMessage = () => {
  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";
  messageContainer.id = "success-message-container";
  const successMessage = document.createElement("p");
  successMessage.textContent = "Image loaded successfully in favorite section!";
  successMessage.className = "message";
  successMessage.id = "success-message";
  messageContainer.append(successMessage);
  chooseBtn.insertAdjacentElement("afterend", messageContainer);
};

// *******************************************************************************

export const deleteSuccessMessage = () => {
  const messageContainer = document.querySelector("#success-message-container");
  setTimeout(() => {
    messageContainer.remove();
  }, 1500);
};

// *******************************************************************************

export const showErrorMessage = () => {
  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";
  messageContainer.id = "error-message-container";
  const errorMessage = document.createElement("p");
  errorMessage.textContent = "No image selected, try again";
  errorMessage.className = "message";
  errorMessage.id = "error-message";
  messageContainer.append(errorMessage);
  chooseBtn.insertAdjacentElement("afterend", messageContainer);
};

// *******************************************************************************

export const deleteErrorMessage = () => {
  const messageContainer = document.querySelector("#error-message-container");
  setTimeout(() => {
    messageContainer.remove();
  }, 1500);
};

// *******************************************************************************

export const renderDogs = (data, container, type) => {
  const dogs = data.map((dog) => {
    const div = document.createElement("div");
    const dogImg = document.createElement("img");
    const heartIcon = document.createElement("img");

    div.className = "img-container";
    div.id = dog.id;
    dogImg.className = "dog-img";
    heartIcon.className = "heart-icon";
    heartIcon.id = dog.id;

    if (type === "random") {
      dogImg.src = dog.url;
      heartIcon.src = "/assets/app-icons/heart-silhouette.png";
    } else if (type === "favorite") {
      dogImg.src = dog.image.url;
      heartIcon.src = "/assets/app-icons/heart-fill.png";
    } else if (type === "upload") {
      dogImg.src = dog.url;
      heartIcon.src = "/assets/app-icons/heart-fill.png";
    }

    div.append(dogImg, heartIcon);

    return div;
  });

  container.append(...dogs);
};

// ********************************************************************************

export const reRenderEliminated = (id) => {
  const node = document.getElementById(id);
  node.remove();
};

// ********************************************************************************

export const reRenderAdded = (randomId, favoriteId) => {
  const randomNode = document.getElementById(randomId);
  randomNode.id = favoriteId;
  randomNode.children[1].id = favoriteId;
  favoriteDogsContainer.append(randomNode);
};

// ********************************************************************************

export const showRandomDogs = async () => {
  cleanDogs(randomDogsContainer);
  const data = await getDogsFromApi(RANDOM_API_URL);
  renderDogs(data, randomDogsContainer, "random");
};

// ********************************************************************************

export const showFavoriteDogs = async () => {
  const data = await getDogsFromApi(FAVORITES_API_URL);
  if (data.length !== 0) {
    renderDogs(data, favoriteDogsContainer, "favorite");
  } else {
    emptyValidation();
  }
};
