const axios = require("axios");

const APIUrl =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=8806289684a57014fc8d7bffd258a3f4&language=en-US&page=";

class MovieDBService {
  getTopRatedMovies() {
    const p1 = axios
      .get(APIUrl + "1")
      .then((r) =>
        r.data.results.map((movie) => ({ ...movie, favorite: false }))
      );

    const p2 = axios
      .get(APIUrl + "2")
      .then((r) =>
        r.data.results.map((movie) => ({ ...movie, favorite: false }))
      );

    const p3 = axios
      .get(APIUrl + "3")
      .then((r) =>
        r.data.results.map((movie) => ({ ...movie, favorite: false }))
      );

    return Promise.all([p1, p2, p3]);
  }
}

export default new MovieDBService();
