import { getToken } from './getToken'
import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL ;




axios.interceptors.request.use(config => {
    if (getToken())  config.headers.Authorization = `Bearer ${getToken()}`;
    else delete config.headers.Authorization; // remove header if no token
    return config;
  }, error => {
    return Promise.reject(error);
  });