<template>
  <div id="app">
    <movie-table
      title="Top Rated Movies"
      :columns="table.columns"
      :rows="table.rows"
      @moviesChanged="updateMovies"
    ></movie-table>
    <movie-table
      v-if="favorites.length > 0"
      title="Favorite Movies"
      :columns="favoritesTable.columns"
      :rows="favoritesTable.rows"
      @moviesChanged="updateFavorites"
    ></movie-table>
  </div>
</template>

<script>
import StateEnum from "@/utils/StoreStateEnum";
import { cloneDeep } from "lodash";
import { mapState } from "vuex";
import MovieTable from "./components/MovieTable.vue";

export default {
  name: "App",
  components: { MovieTable },
  computed: {
    ...mapState({
      apiState: (state) => state.MovieDB.apiState,
      topRatedMovies: (state) => state.MovieDB.topRatedMovies,
    }),
    table() {
      return {
        columns: [
          {
            name: "Title",
            value: "title",
            sortable: true,
          },
          {
            name: "Vote Count",
            value: "vote_count",
            sortable: true,
          },
          {
            name: "Average Vote",
            value: "vote_average",
            sortable: true,
            editable: true,
          },
          {
            name: "Popularity",
            value: "popularity",
            sortable: true,
          },
          {
            name: "Poster",
            value: "poster_path",
            sortable: false,
            render: function (data) {
              return (
                "<img src=" +
                "https://image.tmdb.org/t/p/w370_and_h556_bestv2" +
                data.poster_path +
                ">"
              );
            },
          },
          {
            name: "Overview",
            value: "overview",
            sortable: false,
            width: "25%",
          },
          {
            name: "Favorite",
            value: "favorite",
            sortable: false,
            button: "Favorite",
          },
          {
            name: "Delete",
            value: "delete",
            sortable: false,
            button: "Delete",
          },
        ],
        rows: this.topRatedMovies,
      };
    },
    favoritesTable() {
      return {
        columns: [
          {
            name: "Title",
            value: "title",
            sortable: true,
          },
          {
            name: "Vote Count",
            value: "vote_count",
            sortable: true,
          },
          {
            name: "Average Vote",
            value: "vote_average",
            sortable: true,
            editable: true,
          },
          {
            name: "Popularity",
            value: "popularity",
            sortable: true,
          },
          {
            name: "Poster",
            value: "poster_path",
            sortable: false,
            render: function (data) {
              return (
                "<img src=" +
                "https://image.tmdb.org/t/p/w370_and_h556_bestv2" +
                data.poster_path +
                ">"
              );
            },
          },
          {
            name: "Overview",
            value: "overview",
            sortable: false,
            width: "25%",
          },
          {
            name: "Favorite",
            value: "favorite",
            sortable: false,
            button: "Favorite",
          },
        ],
        rows: this.favorites,
      };
    },
  },
  data() {
    return {
      movieCache: [],
      favorites: [],
    };
  },
  methods: {
    cacheMovieData() {
      this.movieCache = cloneDeep(this.topRatedMovies);
    },
    updateMovies(movies) {
      this.movieCache = movies;
      this.favorites = [];
      let tempFavorites = [];

      this.movieCache.forEach((movie) => {
        if (movie.favorite || movie.vote_average > 7) {
          tempFavorites.push(movie);
        }
      });

      this.favorites = this.resortFavs(tempFavorites);
    },
    updateFavorites(favs) {
      favs.forEach((fav) => {
        const index = this.$data.movieCache.findIndex(
          (movie) => movie.id == fav.id
        );

        this.$data.movieCache[index].favorite = fav.favorite;
      });
    },
    resortFavs(favs) {
      const sorted = favs.sort(function (a, b) {
        if (a["vote_average"] > b["vote_average"]) {
          return -1;
        }

        if (a["vote_average"] < b["vote_average"]) {
          return 1;
        }
      });

      return sorted;
    },
  },
  watch: {
    apiState(val) {
      if (!val) return;
      if (val === StateEnum.LOADED) {
        this.cacheMovieData();
        this.updateMovies(this.movieCache);
      }
    },
    movieCache(val) {
      if (!val) return;
      this.updateMovies(val);
    },
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
