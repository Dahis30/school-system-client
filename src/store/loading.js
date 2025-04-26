export const state = () => ({
    globalLoading: false,
  });
  
  export const getters = {
    getGlobalLoading(state) {
      return state.globalLoading;
    },
  };
  
  export const mutations = {
    disableGlobalLoading(state ){
        state.globalLoading = false;
    },
    enableGlobalLoading(state){
        state.globalLoading = true;
    },
  };

  export const actions = {
    enableGlobalLoading({ commit }) {
      commit("enableGlobalLoading");
    },
    disableGlobalLoading({ commit }) {
      commit("disableGlobalLoading");
    },
  };
  