export const state = () => ({
    centreDeFormation: null,
  });
  
  export const getters = {
    getCentreDeFormation(state) {
      state.centreDeFormation = localStorage.getItem('centreDeFormation') ;
      return state.centreDeFormation;
    },
  };
  
  export const mutations = {
    saveCentreDeFormation(state, item) {
      state.centreDeFormation = item;
      localStorage.setItem('centreDeFormation', item);
    },
    clearCentreDeFormation(state) {
      state.centreDeFormation = null;
      localStorage.removeItem('centreDeFormation');
    },
  };

  export const actions = {
    saveCentreDeFormation({ commit }, centreDeFormation) {
      commit("saveCentreDeFormation", centreDeFormation);
    },
    clearCentreDeFormation({ commit }) {
      commit("clearCentreDeFormation");
    },
  };
  