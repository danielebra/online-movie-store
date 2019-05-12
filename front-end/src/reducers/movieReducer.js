import { GET_MOVIES, GET_MOVIE, MOVIES_LOADING, NO_MOVIES_FOUND, SEARCH_MOVIES, CLEAR_SEARCH_LIST } from '../actions/types';

// Create a state for the reducer when the application starts up
const initialState = {
    collections: null,
    movie: null,
    searchList: null,
    moviesList: null,
    loading: true
};

// The state parameter is the profile state that comes from the store
// The action is the object containing a type and payload we dispatched in our action creator above
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
            return {
                ...state,
                movie: action.payload,
                loading: false
            };

        case SEARCH_MOVIES:
            
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