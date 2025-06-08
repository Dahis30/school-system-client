import Vue from 'vue'
import Vuex from 'vuex'
import * as user from "./user";
import * as loading from "./loading";
import * as centreDeFormation from "./centreDeFormation";
import * as modeSombre from "./modeSombre";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ...user.state(),
    ...loading.state(),
    ...centreDeFormation.state(),
    ...modeSombre.state(),
  },
  getters: {
    ...user.getters,
    ...loading.getters,
    ...centreDeFormation.getters,
    ...modeSombre.getters,
  },
  mutations: {
    ...user.mutations,
    ...loading.mutations,
    ...centreDeFormation.mutations,
    ...modeSombre.mutations,
  },
  actions: {
    ...user.actions,
    ...loading.actions,
    ...centreDeFormation.actions,
    ...modeSombre.actions,
  },
  modules: {
    ...user.modules,
    ...loading.modules,
    ...centreDeFormation.modules,
    ...modeSombre.modules,
  }
})
