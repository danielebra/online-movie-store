import { GET_MOVIES, GET_MOVIE,SEARCH_MOVIES_ADMIN, MOVIES_LOADING, ADD_REVIEW, NO_MOVIES_FOUND, SEARCH_MOVIES, CLEAR_SEARCH_LIST, ADD_MOVIE, FAVOURITE_MOVIE, UNFAVOURITE_MOVIE, GET_ERRORS, GET_FEEDBACK, GET_ORDER, DELETE_ORDER,UPDATE_ORDER } from './types';
import api from "../api";

// Will call this from the view later
export const getMovies = () => dispatch => {
    dispatch(setLoading());
    // Here we make an API call or whatever that you need to do
    api.get("movie/").then(res => {
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
    api.get("movie/").then(res => {

        let movie = res.data.filter(movie => movie.id == id);

        dispatch({
            type: GET_MOVIE,
            payload: movie[0]
        })
    })
};

export const addGenre = (genreName) => dispatch => {
    let data = {
        name: genreName
    }
    api.post('genre/', data).then(res => {
        console.log(res.data)
    })
        .catch(error => {
            console.log(error.response.data);
        })
}

export const editGenre = (movieId, genreId) => dispatch => {
    let data = {
        movie: movieId,
        genre: genreId
    }
    api.get(`movie/${movieId}/genres/`)
        .then(res =>{
        console.log(res.data.id, " genre id grabbed.");
        
        api.patch(`movie-genre/ ${res.data.id}/`, data)(res => {
            console.log(res.data.id);
        })
        .catch(error => {
            console.log(error.response.data);
        })
    })
    .catch(error => {
        console.log(error.response.data);
    })
        
}
export const addReview = (movieId, review) => dispatch => {

    api.post('review/', review)
        .then(res => {
        console.log(res.data);

        let reviewObject = res.data;
        let data = {
            review: res.data.id
        }

        api.post(`movie/${movieId}/add_review/`, data).then(res => {
            console.log("Success: ", res.data);

            dispatch({
                type: ADD_REVIEW,
                payload: reviewObject
            })
        })
            .catch(error => {
                console.log("Error: ", error.response.data);
            })
    })
        .catch(error =>
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        )


};


export const searchMovies = (query, admin=false) => dispatch => {
    dispatch(setLoading());
    if (admin) {
        dispatch({
            type: SEARCH_MOVIES_ADMIN,
            payload: query
        })
    } else {
        dispatch({
            type: SEARCH_MOVIES,
            payload: query
        })
    }
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

export const addMovie = (movieDetails, genreId, history) => dispatch => {
    api.post('movie/', movieDetails)
        .then(res => {
            let movie = res.data;
            console.log("ADDED: ", movie);

            let data = {
                genre: genreId
            }
            // Make a call to add_genre passing movie id and genre id
            api.post(`/movie/${movie.id}/add_genre/`, data)
                .then(res => {
                    console.log(res.data);
                    history.push('/')
                })

                .catch(error => {
                    console.log(error.response.data);
                })
        })
        .catch(error => {
            console.log(error.response.data);
        })

};

export const editMovie = updatedData => dispatch => {
    api.patch(`movie/${updatedData.id}/change/`, updatedData)
        .then(res => {
            dispatch(getMovies());
            console.log(res.data);
        })
        .catch(error => {

            console.log(error.response.data);

        }
        );
}



export const deleteMovie = movie => dispatch => {
    console.log(movie)
    api
        .delete(`movie/${movie.id}/delete/`)
        .then(res => {
            dispatch(getMovies());
            console.log(res.data);
        })
        .catch(err => {
            console.log(err.response.data);
        }
        );
}

export const getOrders = () => dispatch => {
    console.log("inside getOrders");
    dispatch(setLoading());

    api.get("order/").then(res => {
        console.log("isndie order request");

        dispatch({
            type: GET_ORDER,
            payload: res.data
        })
        console.log(res.data)
    })
};

export const addOrder = order => dispatch => {
    api
        .post('/order/', order)
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}
export const deleteOrder = order => dispatch => {
    api
        .delete(`order/${order.id}/`)
        .then(res => {
            dispatch(
                {
                    type: DELETE_ORDER,
                    payload: order
                }
            )
        }
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}
export const updateOrder = newOrder => dispatch => {
    api
    .patch(`order/${newOrder.id}/`, newOrder)
    .then(res => {
        dispatch({
            type: UPDATE_ORDER,
            payload: newOrder
        })
    } )
    .catch(err => {
        dispatch(
            {
                type: GET_ERRORS,
                payload: err.response.data
            }
        )
    }

    )
}





// Set profile loading
export const setLoading = () => {
    return {
        type: MOVIES_LOADING
    }
};