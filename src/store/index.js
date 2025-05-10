import Vue from 'vue'
import Vuex from 'vuex'
import * as user from "./user";
import * as loading from "./loading";
import * as centreDeFormation from "./centreDeFormation";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...user.state(),
    ...loading.state(),
    ...centreDeFormation.state(),
  },
  getters: {
    ...user.getters,
    ...loading.getters,
    ...centreDeFormation.getters,
  },
  mutations: {
    ...user.mutations,
    ...loading.mutations,
    ...centreDeFormation.mutations,
  },
  actions: {
    ...user.actions,
    ...loading.actions,
    ...centreDeFormation.actions,
  },
  modules: {
    ...user.modules,
    ...loading.modules,
    ...centreDeFormation.modules,
  }
})
