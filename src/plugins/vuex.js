import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const context = require.context("@/store", true, /Store\.js$/);
const stores = context.keys().map((f) => context(f).default);

export default new Vuex.Store({
  modules: Object.fromEntries(stores.map((s) => [s.MODULE_NAME, s.store])),
  plugins: stores.map((s) => s.plugin).filter((v) => !!v),
});
