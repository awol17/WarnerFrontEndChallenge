import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
import MovieDBService from "@/services/MovieDBService";
import StateEnum from "@/utils/StoreStateEnum";

const MODULE_NAME = "MovieDB";

const store = {
  namespaced: true,
  state: {
    apiState: StateEnum.INIT,
    topRatedMovies: [],
  },
  actions: {
    loadTopRatedMovies({ commit }) {
      commit("setApiState", StateEnum.ERROR);
      return MovieDBService.getTopRatedMovies().then((data) => {
        let movies = [...data[0], ...data[1], ...data[2]];
        commit("setTopRatedMovies", movies);
      });
    },
  },
  mutations: {
    setApiState(state, apiState) {
      Vue.set(state, "apiState", apiState);
    },
    setTopRatedMovies(state, movies) {
      Vue.set(state, "topRatedMovies", movies);
      Vue.set(state, "apiState", StateEnum.LOADED);
    },
  },
};

const plugin = (store) => {
  store.dispatch(`${MODULE_NAME}/loadTopRatedMovies`);
};

export default {
  MODULE_NAME,
  ...createNamespacedHelpers(MODULE_NAME),
  store,
  plugin,
};
