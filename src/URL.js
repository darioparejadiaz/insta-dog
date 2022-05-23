// export const API_KEY = '74291f5c-f2c0-4bb3-b397-5da07912d951';
// export const RANDOM_API_URL =
//   'https://api.thecatapi.com/v1/images/search?limit=6';
// export const FAVORITES_API_URL = 'https://api.thecatapi.com/v1/favourites';
// export const UPLOAD_API_URL = 'https://api.thecatapi.com/v1/images/upload';
// export const DELETE_API_URL = id =>
//   `https://api.thecatapi.com/v1/favourites/${id}`;

export const axiosApi = axios.create({
  baseURL: 'https://api.thedogapi.com/v1',
});
axiosApi.defaults.headers.common['x-api-key'] =
  '497fc881-7f5d-4ea4-a645-2485db4ca59b';

export const API_KEY = '497fc881-7f5d-4ea4-a645-2485db4ca59b';
export const RANDOM_API_URL =
  'https://api.thedogapi.com/v1/images/search?limit=6';
export const FAVORITES_API_URL = 'https://api.thedogapi.com/v1/favourites';
export const UPLOAD_API_URL = 'https://api.thedogapi.com/v1/images/upload';
export const DELETE_API_URL = id =>
  `https://api.thedogapi.com/v1/favourites/${id}`;
