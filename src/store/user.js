export const state = () => ({
    user: null,
    userIsConnected : false ,
  });
  
  export const getters = {
    getUser(state) {
      state.user = localStorage.getItem('user') ;
      return state.user;
    },
  };
  
  export const mutations = {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
    clearToken(){
      localStorage.removeItem('token');
    }
  };

  export const actions = {
    saveUser({ commit }, user) {
      commit("setUser", user);
    },
    clearUserInformation({ commit }) {
      commit("clearUser");
    },
    clearCurrentToken({ commit }) {
      commit("clearToken");
    },
  };
  