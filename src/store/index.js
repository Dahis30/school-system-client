import Vue from 'vue'
import Vuex from 'vuex'
import * as user from "./user";
import * as loading from "./loading";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...user.state(),
    ...loading.state(),
  },
  getters: {
    ...user.getters,
    ...loading.getters,
  },
  mutations: {
    ...user.mutations,
    ...loading.mutations,
  },
  actions: {
    ...user.actions,
    ...loading.actions,
  },
  modules: {
    ...user.modules,
    ...loading.modules,
  }
})
