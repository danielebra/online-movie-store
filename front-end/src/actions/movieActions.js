import { GET_MOVIES, GET_MOVIE, MOVIES_LOADING, ADD_REVIEW, NO_MOVIES_FOUND, SEARCH_MOVIES, CLEAR_SEARCH_LIST, ADD_MOVIE, FAVOURITE_MOVIE, UNFAVOURITE_MOVIE, GET_ERRORS } from './types';
import api from "../api";

// Will call this from the view later
export const getMovies = () => dispatch => {
    dispatch(setLoading());

    // Here we make an API call or whatever that you need to do
    api.get("movie/").then(res =>  {
        let movies = res.data;
        let payload = {
            movies,
            collections: []
        };

        api.get("genre/").then(res => {
            let genres = res.data;
            
            genres.forEach(genre => {
                var collection = {
                    genre: genre.name,
                    movies: movies.filter(movie => movie.genre.includes(genre.name))
                }
                if (collection.movies.length > 0)
                    payload.collections.push(collection);
            });

            if (movies.length > 0)
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
export const getMovieById = id => dispatch => {
    dispatch(setLoading());
    
    api.get("movie/").then(res =>  {

        let movie = res.data.filter(movie => movie.id == id);

        dispatch({
            type: GET_MOVIE,
            payload: movie[0]
        })
    })
};

export const addReview = (movieId, review) => dispatch => {
    
    api.post('review/', review.rating, review.text).then(res => {
        console.log(res.data);
    })
    .catch(err => {
        console.log(err.response.data);
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
    
    // api
    // .post(`movie/${movieId}/add_review`, review).then(res =>  {
    //     console.log("Success: ", res.data);
    //     // let movie = res.data.filter(movie => movie.id == id);

    //     // dispatch({
    //     //     type: ADD_REVIEW,
    //     //     payload: res.data
    //     // })
    // })
    // .catch(err => {
    //     console.log("Error: ", err.response.data);
    // })
};

export const searchMovies = query => dispatch => {
    dispatch(setLoading());
    dispatch({
        type: SEARCH_MOVIES,
        payload: query
    })
};

export const favouriteMovie = () => dispatch => {
    dispatch({
        type: FAVOURITE_MOVIE
    })
};


export const unFavouriteMovie = () => dispatch => {
    dispatch({
        type: UNFAVOURITE_MOVIE
    })
};

export const clearSearchList = () => {
    return {
        type: CLEAR_SEARCH_LIST
    }
}

export const addMovie = (movieDetails) => dispatch => {
    api.post('movie/', movieDetails)
        .then(res => {
            console.log("ADDED: ", res.data)
        })
        .catch(err => {
            dispatch({
                /*type: ADD_MOVIE,
                payload: err.response.data*/
            })
        });
};

// Set profile loading
export const setLoading = () => {
    return {
        type: MOVIES_LOADING
    }
};