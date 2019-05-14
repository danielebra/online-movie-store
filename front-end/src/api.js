import axios from "axios";

export default axios.create({
  baseURL: "https://online-movie-store.netlify.com/api"
   //baseURL: "http://localhost:8000/api"
});
