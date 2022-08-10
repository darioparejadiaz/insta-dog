import { API_KEY } from "./URL.js";
import { axiosApi } from "./URL.js";

//************************************************************ */

export const getDogsFromApi = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-api-key": API_KEY,
    },
  });
  const data = await response.json();

  if (response.status >= 200 && response.status < 300)
    console.log("Descargando fotos de la nube");
  return data;
};

//************************************************************ */

export const saveFavoritesToApi = async (url, id) => {
  // const response = await fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'x-api-key': API_KEY,
  //   },
  //   body: JSON.stringify({
  //     image_id: id,
  //   }),
  // });
  // const data = await response.json();

  const { data, status } = await axiosApi.post(url, {
    image_id: id,
  });

  if (status === 200) console.log("Foto guardada en favoritos");

  return data.id;
};

//************************************************************ */

export const deleteFavoritesToApi = async (url) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "x-api-key": API_KEY,
    },
  });
  if (response.status === 200) console.log("Foto eliminada de favoritos");
};

//************************************************************ */

export const uploadDogToApi = async (url, formData) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,
    },
    body: formData,
  });
  const data = await response.json();

  if (response.status >= 200 && response.status < 300)
    console.log("Foto subida a la nube");

  return data;
};
