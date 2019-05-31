import { GET_MOVIES, GET_MOVIE, SEARCH_MOVIES_ADMIN, ADD_REVIEW, MOVIES_LOADING, NO_MOVIES_FOUND, SEARCH_MOVIES, CLEAR_SEARCH_LIST, FAVOURITE_MOVIE, UNFAVOURITE_MOVIE, GET_ORDER, DELETE_ORDER } from '../actions/types';

/* The movies state contains the following:
    - collections: an array  containing a genre and a list of movies in that genre
    - movie: contains a single movie when a user click on the home page.
    - searchList: returns a search results from the search query
    - moviesList: contains a list of all movies
    - loading: will be activated when fetching the database or performing some action.
*/
const initialState = {
    collections: null,
    movie: null,
    searchList: null,
    moviesList: null,
    loading: true,
    wishList: [],
    genres: [],
    orders:[]
};

// The state parameter is the movies state that comes from the store
// The action is the object containing a type and payload we dispatched in the action creator
export default function (state = initialState, action) {
    let list, movies;

    if (localStorage.wishlist)
        state.wishList = JSON.parse(localStorage.wishlist);

    switch (action.type) {

        case GET_MOVIES:
            let data = null;
            if (action.payload.collections.length > 0)
                data = action.payload.collections;
            
            return {
                ...state,
                collections: data,
                moviesList: action.payload.movies,
                genres: action.payload.genres,
                searchList: null,
                movie: null,
                loading: false
            };

        case GET_MOVIE:
            return {
                ...state,
                movie: action.payload,
                loading: false
            };

        case GET_ORDER:
            console.log("get order map reducer");
            console.log(action.payload);

            return {
            ...state,
            orders: action.payload,
            loading: false
            };
        case DELETE_ORDER:
            return{
                ...state,
                orders: state.orders.filter(order => order.id !==action.payload.id)
            }

        case ADD_REVIEW:
            state.movie.reviews.push(action.payload);
            return {
                ...state
            }

        case FAVOURITE_MOVIE:
            list = [...state.wishList, state.movie];
            localStorage.setItem('wishlist', JSON.stringify(list));

            console.log(list);

            return {
                ...state,
                wishList: list
            };
        
        case UNFAVOURITE_MOVIE:
            list = state.wishList.filter(movie => movie.id !== state.movie.id);
            localStorage.setItem('wishlist', JSON.stringify(list));

            console.log(list);

            return {
                ...state,
                wishList: list
            };

        case SEARCH_MOVIES_ADMIN:
            if (state.moviesList == null)
                return {
                    ...state,
                    loading: false
                };

            movies = state.moviesList.filter(movie => movie.genre[0].toLowerCase().includes(action.payload.toLowerCase()));

            if (movies.length == 0) {
                movies = state.moviesList.filter(movie => movie.title.toLowerCase().includes(action.payload.toLowerCase()))
            }

            return {
                ...state,
                searchList: movies
            }

        case SEARCH_MOVIES:

            if (state.collections == null)
                return {
                    ...state,
                    loading: false
                };

            movies = state.collections.filter(movie => movie.genre.toLowerCase() == action.payload);
            
            if (movies.length == 0) {
                state.moviesList.forEach(movie => {
                    if (movie.title.toLowerCase().includes(action.payload)) {
                        let added = false;
                        let movieGenre = movie.genre[0];

                        movies.forEach((m, index) => {
                            if (m.genre == movieGenre) {
                                movies[index].movies.push(movie);
                                added = true;
                            }
                        });

                        if (!added)
                            movies.push({genre: movieGenre, movies: [movie]});
                    }
                });
            }

            return {
                ...state,
                searchList: movies,
                loading: false
            };

        case CLEAR_SEARCH_LIST:
            return {
                ...state,
                searchList: null
            };
        
        case MOVIES_LOADING:
            return {
                ...state,
                loading: true
            };

        case NO_MOVIES_FOUND:
            return {
                ...state,
                collections: null,
                movie: null,
                loading: false
            }
        

        default:
            return state;
    }
}