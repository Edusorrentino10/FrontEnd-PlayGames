import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-play-games.herokuapp.com',
});
