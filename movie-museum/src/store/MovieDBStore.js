import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
import MovieDBService from "@/services/MovieDBService";

const MODULE_NAME = "MovieDB";

const store = {
  namespaced: true,
  state: {
    topRatedMovies: [],
  },
  actions: {
    updateTopRatedMovies({ commit }) {
      return MovieDBService.getTopRatedMovies().then((data) =>
        commit("setTopRatedMovies", data)
      );
    },
  },
  mutations: {
    setTopRatedMovies(state, movies) {
      Vue.set(state, "topRatedMovies", movies);
    },
  },
};

const plugin = (store) => {
  store.dispatch(`${MODULE_NAME}/updateTopRatedMovies`);
};

export default {
  MODULE_NAME,
  store,
  ...createNamespacedHelpers(MODULE_NAME),
  plugin,
};
