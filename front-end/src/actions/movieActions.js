import { GET_MOVIES, GET_MOVIE, MOVIES_LOADING, NO_MOVIES_FOUND } from './types';
import api from "../api";

// Will call this from the view later
export const getMovies = () => dispatch => {
    dispatch(setLoading());

    // Here we make an API call or whatever that you need to do
    api.get("movie/").then(res =>  {
        let movies = res.data;
        let payload = [];

        api.get("genre/").then(res => {
            let genres = res.data;
            
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
                    type: NO_MOVIES_FOUND
                })
            
        })
    })
};


// Get profile by handle
export const getMovieById = (id) => dispatch => {
    dispatch(setLoading());
    
    api.get("movie/").then(res =>  {

        let movie = res.data.filter(movie => movie.id == id);

        dispatch({
            type: GET_MOVIE,
            payload: movie
        })
    })
};

// Set profile loading
export const setLoading = () => {
    return {
        type: MOVIES_LOADING
    }
};