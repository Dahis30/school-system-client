export const state = () => ({
    modeSombre: false,
  });
  
  export const getters = {
    getModeSombre(state) {
      state.modeSombre = localStorage?.getItem('modeSombre') ?? false ;
      return state.modeSombre;
    },
  };
  
  export const mutations = {
    disableModeSombre(state ){
        state.modeSombre = false;
        localStorage.setItem('modeSombre', false);
    },
    enableModeSombre(state){
        state.modeSombre = true;
        localStorage.setItem('modeSombre', true);
    },
  };

  export const actions = {
    enableModeSombre({ commit }) {
      commit("enableModeSombre");
    },
    disableModeSombre({ commit }) {
      commit("disableModeSombre");
    },
  };
  