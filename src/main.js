import Vue from 'vue'
import App from './App.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './axiosConfiguration/axios' ;
import axios from 'axios'
import "./assets/reset.css";
import ConfiramationButton from '@/components/Global/Button/ConfiramationButton'
import CancelButton from '@/components/Global/Button/CancelButton'
import AddButton from '@/components/Global/Button/AddButton'
import DeleteButton from '@/components/Global/Button/DeleteButton'
import UpdateOperation from '@/components/Global/Button/operationsButton/UpdateOperation.vue'
import DeleteOperation from '@/components/Global/Button/operationsButton/DeleteOperation.vue'
import AddOperation from '@/components/Global/Button/operationsButton/AddOperation.vue'
import ShowMoreOperation from '@/components/Global/Button/operationsButton/ShowMoreOperation.vue'
import ConfirmationDialog from '@/components/Global/Dialogs/ConfirmationDialog.vue'
import PrivateLoading from '@/components/Loading/PrivateLoading.vue'


Vue.config.productionTip = false 

//Pour utiliser Axios globalement dans tout le projet et pouvoir l'appeler via this.$axios (ex: this.$axios.get('/user-information')),
Vue.prototype.$axios = axios 


// "Ici, nous allons essayer de définir des components globalement afin de pouvoir les utiliser ensuite dans toutes les vues du projet, sans avoir besoin de les importer à chaque fois.
Vue.component('ConfiramationButton', ConfiramationButton)
Vue.component('CancelButton', CancelButton)
Vue.component('AddButton', AddButton)
Vue.component('DeleteButton', DeleteButton)
Vue.component('UpdateOperation', UpdateOperation)
Vue.component('DeleteOperation', DeleteOperation)
Vue.component('AddOperation', AddOperation)
Vue.component('ShowMoreOperation', ShowMoreOperation)
Vue.component('ConfirmationDialog', ConfirmationDialog)
Vue.component('PrivateLoading', PrivateLoading)





new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
