import Vue from 'vue'
import Vuex from 'vuex'
import * as user from "./user";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...user.state(),
  },
  getters: {
    ...user.getters,
  },
  mutations: {
    ...user.mutations,
  },
  actions: {
    ...user.actions,
  },
  modules: {
    ...user.modules,
  }
})
