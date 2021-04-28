<template>
  <div id="app">Welcome to the Movie Museum!</div>
</template>

<script>
import MovieDBStore from "@/store/MovieDBStore";

export default {
  name: "App",
  components: {},
  computed: {
    ...MovieDBStore.mapState({
      topRatedMovies: MovieDBStore.topRatedMovies,
    }),
  },
  methods: {
    ...MovieDBStore.mapActions({
      updateTopRatedMovies: MovieDBStore.updateTopRatedMovies,
    }),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
