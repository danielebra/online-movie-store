/*
 * Combines together all reducers to one big object to the store
 */
import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import feedbackReducer from './feedbackReducer';

// The key is how you access the state within your components
// If you create a new reducer, you must add it here.
const rootReducer = combineReducers({
   movies: movieReducer,
   auth: authReducer,
   errors: errorsReducer,
   feedback: feedbackReducer
});

export default rootReducer;
