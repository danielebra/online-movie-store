import { GET_MOVIES, GET_MOVIE, MOVIES_LOADING, NO_MOVIES_FOUND, SEARCH_MOVIES, CLEAR_SEARCH_LIST, FAVOURITE_MOVIE, UNFAVOURITE_MOVIE } from '../actions/types';

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
    isFavourite: false
};

// The state parameter is the movies state that comes from the store
// The action is the object containing a type and payload we dispatched in the action creator
export default function (state = initialState, action) {

    switch (action.type) {
        
        case GET_MOVIES:
            return {
                ...state,
                collections: action.payload.collections,
                moviesList: action.payload.movies,
                searchList: null,
                movie: null,
                loading: false
            };

        case GET_MOVIE:

            let fav = false;
            
            state.wishList.forEach(m => {
                if (m.id == action.payload.id)
                    fav = true;
            })

            return {
                ...state,
                movie: action.payload,
                isFavourite: fav,
                loading: false
            };

        case FAVOURITE_MOVIE:
            return {
                ...state,
                wishList: [...state.wishList, state.movie]
            };
        
        case UNFAVOURITE_MOVIE:
            return {
                ...state,
                wishList: state.wishList.filter(movie => movie.id !== state.movie.id)
            };

        case SEARCH_MOVIES:

            if (state.collections == null)
                return {
                    ...state,
                    loading: false
                };

            let movies = state.collections.filter(movie => movie.genre.toLowerCase() == action.payload);
            
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