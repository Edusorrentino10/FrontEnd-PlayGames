import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://play-games-api.herokuapp.com',
});
