import Vue from 'vue'
import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './axiosConfiguration/axios' ;
Vue.config.productionTip = false 

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
