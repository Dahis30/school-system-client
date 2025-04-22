import Vue from 'vue'
import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './axiosConfiguration/axios' ;
import axios from 'axios'
import "./assets/reset.css";
Vue.config.productionTip = false 

//Pour utiliser Axios globalement dans tout le projet et pouvoir l'appeler via this.$axios (ex: this.$axios.get('/user-information')),
Vue.prototype.$axios = axios 

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
