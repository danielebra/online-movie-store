import { GET_MOVIES, GET_MOVIE, MOVIES_LOADING, ADD_REVIEW, NO_MOVIES_FOUND, SEARCH_MOVIES, CLEAR_SEARCH_LIST, ADD_MOVIE, FAVOURITE_MOVIE, UNFAVOURITE_MOVIE, GET_ERRORS, GET_FEEDBACK } from './types';
import api from "../api";

// Will call this from the view later
export const getMovies = () => dispatch => {
    dispatch(setLoading());

    // Here we make an API call or whatever that you need to do
    api.get("movie/").then(res =>  {
        let movies = res.data;
        

        api.get("genre/").then(res => {
            let genres = res.data;

            let payload = {
                movies,
                collections: [],
                genres
            };
            
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
    
    api.post('review/', review).then(res => {
        console.log(res.data);

        let reviewObject = res.data;
        let data = {
            review: res.data.id
        }

        api.post(`movie/${movieId}/add_review/`, data).then(res =>  {
            console.log("Success: ", res.data);
    
            dispatch({
                type: ADD_REVIEW,
                payload: reviewObject
            })
        })
        .catch(err => {
            console.log("Error: ", err.response.data);
        })
    })
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
    
   
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
};

export const addMovie = (movieDetails, selectedGenreId) => dispatch => {
    api.post('movie/', movieDetails)
        .then(res => {
            console.log("ADDED: ", res.data)
            let movieId = {
                movieDetails: res.data.id
            }
            console.log(movieId);
            api.post(`movie/${movieId}/genre/`, selectedGenreId).then(res => {
                console.log("Added genre to movie");
                dispatch(getMovies());
            })
            .catch(err => {
                console.log("Error: ", err.response.data);
            })
        })
        .catch(error =>{
            console.log(error.response);
        })
    
};

export const editMovie = updatedData => dispatch => {
    api
        .patch(`movie/${updatedData.id}/change/`, updatedData)
        .then(res => {
            dispatch(getMovies());
            dispatch({
                type: GET_FEEDBACK,
                payload: `${updatedData.title} details has been updated.`
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
    );
}

export const deleteMovie = movie => dispatch => {
    console.log(movie)
    api
        .delete(`movie/${movie.id}/delete/`)
        .then(res => {
            dispatch(getMovies());
            dispatch({
                type: GET_FEEDBACK,
                payload: `${movie.title} has been deleted.`
            })
        })
        .catch(err => {
            console.log(err.response.data);
        }
    );
}

// Set profile loading
export const setLoading = () => {
    return {
        type: MOVIES_LOADING
    }
};