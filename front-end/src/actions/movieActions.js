import { GET_MOVIES, MOVIES_LOADING } from './types';
import api from "../api";

// Will call this from the view later
export const getMovies = () => dispatch => {
    dispatch(setLoading());

    // Here we make an API call or whatever that you need to do
    api.get("movie/").then(res =>  {
        let movies = res.data;

        api.get("genre/").then(res => {
            let genres = res.data;
            let payload = [];
            
            genres.forEach(genre => {
                var collection = {
                    genre: genre.name,
                    movies: movies.filter(movie => movie.genre.includes(genre.name))
                }
                if (collection.movies.length > 0)
                    payload.push(collection);
            });

            if (payload.length > 0)
                dispatch({
                    type: GET_MOVIES,
                    payload
                })
            else
                dispatch({
                    type: GET_MOVIES,
                    payload: null
                })
            
        })
    })
}

// Set profile loading
export const setLoading = () => {
    return {
        type: MOVIES_LOADING
    }
};