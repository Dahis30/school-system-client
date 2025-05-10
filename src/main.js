import Vue from 'vue'
import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './axiosConfiguration/axios' ;
import axios from 'axios'
import "./assets/reset.css";
import ConfiramationButton from '@/components/Global/ConfiramationButton'
import CancelButton from '@/components/Global/CancelButton'


Vue.config.productionTip = false 

//Pour utiliser Axios globalement dans tout le projet et pouvoir l'appeler via this.$axios (ex: this.$axios.get('/user-information')),
Vue.prototype.$axios = axios 


// "Ici, nous allons essayer de définir des components globalement afin de pouvoir les utiliser ensuite dans toutes les vues du projet, sans avoir besoin de les importer à chaque fois.
Vue.component('ConfiramationButton', ConfiramationButton)
Vue.component('CancelButton', CancelButton)


new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
