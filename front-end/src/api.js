import axios from "axios";

export default axios.create({
  baseURL: "https://online-movie-store.netlify.com/api"
  // baseURL: "http://23.101.218.7:8080/api/"
});
