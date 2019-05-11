import { GET_MOVIES, MOVIES_LOADING } from '../actions/types';

// Create a state for the reducer when the application starts up
const initialState = {
    movies: null,
    loading: true
};

// The state parameter is the profile state that comes from the store
// The action is the object containing a type and payload we dispatched in our action creator above
export default function (state = initialState, action) {

    switch (action.type) {

        case MOVIES_LOADING:
            return {
                ...state,
                loading: true
            };

        case GET_MOVIES:
            return {
                ...state,
                movies: action.payload,
                loading: false
            };

        default:
            return state;
    }
}