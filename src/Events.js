import {
  showRandomDogs,
  reRenderEliminated,
  reRenderAdded,
  renderDogs,
  favoriteDogsContainer,
  showWaitMessage,
  DeleteWaitMessage,
  showSuccessMessage,
  deleteSuccessMessage,
  showErrorMessage,
  deleteErrorMessage,
} from "./UI.js";
import {
  saveFavoritesToApi,
  deleteFavoritesToApi,
  uploadDogToApi,
} from "./Fetch.js";
import { FAVORITES_API_URL, DELETE_API_URL, UPLOAD_API_URL } from "./URL.js";

//************************************************************ */

const main = document.querySelector("main");
const randomButton = document.querySelector("#random-btn");
const inputFile = document.querySelector("#file");
const previewImg = document.querySelector("#preview-img");
const uploadButton = document.querySelector("#submit-btn");

//************************************************************* */

const toggleFavorite = async (event) => {
  if (event.target.className === "heart-icon") {
    if (
      event.target.parentElement.parentElement.id === "random-dogs-container"
    ) {
      const randomId = event.target.id;
      event.target.src = "./assets/app-icons/heart-fill.png";
      // const favoriteId = await saveFavoritesToApi(FAVORITES_API_URL, randomId);
      const favoriteId = await saveFavoritesToApi("/favourites", randomId);
      reRenderAdded(randomId, favoriteId);
    } else if (
      event.target.parentElement.parentElement.id === "favorite-dogs-container"
    ) {
      reRenderEliminated(event.target.parentElement.id);
      await deleteFavoritesToApi(DELETE_API_URL(event.target.id));
    }
  }
};

//******************************************************************************** */

const uploadDog = async () => {
  console.log("Espere un momento....");
  showWaitMessage();

  const form = document.querySelector("#form");
  const formData = new FormData(form);

  const data = await uploadDogToApi(UPLOAD_API_URL, formData);
  if (data.status >= 400 && data.status < 500) {
    console.log("Selecciona un archivo válido");
    DeleteWaitMessage();
    showErrorMessage();
    deleteErrorMessage();
    return;
  } else if (data.status >= 500 && data.status < 600) {
    console.log(
      "Ha ocurrido un problema con la carga, vuelve a intentarlo mas tarde"
    );
    return;
  }
  const randomId = data.id;
  // const favoriteId = await saveFavoritesToApi(FAVORITES_API_URL, randomId);
  const favoriteId = await saveFavoritesToApi("favourites", randomId);

  renderDogs([data], favoriteDogsContainer, "upload");
  reRenderAdded(randomId, favoriteId);
  form.reset();
  previewImg.style.display = "none";
  DeleteWaitMessage();
  showSuccessMessage();
  deleteSuccessMessage();
};

//******************************************************************************** */

const displayImage = () => {
  const file = inputFile.files[0];
  const url = URL.createObjectURL(file);
  previewImg.src = url;
  previewImg.style.display = "block";
};

//******************************************************************************** */

export const initEvents = () => {
  main.addEventListener("click", toggleFavorite);
  randomButton.addEventListener("click", showRandomDogs);
  inputFile.addEventListener("change", displayImage);
  uploadButton.addEventListener("click", uploadDog);
};
