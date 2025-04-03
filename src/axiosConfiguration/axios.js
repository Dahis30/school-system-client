import { getToken } from './getToken'
import axios from 'axios';
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL ;

 
// La configuration des requêtes qui seront envoyées par Axios dans notre projet
  axios.interceptors.request.use(config => {
    if (getToken())  config.headers.Authorization = `Bearer ${getToken()}`;
    else delete config.headers.Authorization; // remove header if no token
    return config;
  }, error => {
    return Promise.reject(error);
  });

// La Gestion des reponses des requêtes qui seront envoyées par Axios dans notre projet
  axios.interceptors.response.use(

    (response) => response
  
    , 
  
    error => {
      if(error.response){
        console.log(' here you can customize the logic of token expiration ')
        if(error.response.status == 401){
          // Si le code de statut est égal à 401, cela signifie que la session de l'utilisateur a expiré.
          // Il faut rediriger l'utilisateur vers la page de login après la suppression des données de l'utilisateur du localStorage.
          localStorage.removeItem('token');
          localStorage.removeItem('user');
  
          // Ici, on va actualiser la page pour que la fonction isUserStillConnected dans ./App.vue soit exécutée.
          location.reload();
        }else {
          // TODO : Il faut optimiser le message d'erreur (bad response) dans notre projet.
          alert('An error occurred. Please try again later.')
        }
  
  
  
  
      }
      return Promise.reject(error);
    }

  );