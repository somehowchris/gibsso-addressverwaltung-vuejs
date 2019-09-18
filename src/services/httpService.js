import axios from 'axios';

const httpService = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

export default httpService;
