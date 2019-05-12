import { GET_MOVIES, GET_MOVIE, MOVIES_LOADING, NO_MOVIES_FOUND } from '../actions/types';

// Create a state for the reducer when the application starts up
const initialState = {
    movies: null,
    movie: null,
    loading: true
};

// The state parameter is the profile state that comes from the store
// The action is the object containing a type and payload we dispatched in our action creator above
export default function (state = initialState, action) {

    switch (action.type) {
        
        case GET_MOVIES:
            return {
                ...state,
                movies: action.payload,
                movie: null,
                loading: false
            };

        case GET_MOVIE:
            return {
                ...state,
                movie: action.payload,
                loading: false
            }
        
        case MOVIES_LOADING:
            return {
                ...state,
                loading: true
            };

        case NO_MOVIES_FOUND:
            return {
                ...state,
                movies: null,
                movie: null,
                loading: false
            }

        default:
            return state;
    }
}