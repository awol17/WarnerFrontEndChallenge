const axios = require("axios");

const APIUrl =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=8806289684a57014fc8d7bffd258a3f4&language=en-US&page=1";

class MovieDBService {
  getTopRatedMovies() {
    return axios.get(APIUrl).then((r) => r.data.results);
  }
}

export default new MovieDBService();
