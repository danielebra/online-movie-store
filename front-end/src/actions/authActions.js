//import setAuthToken from "../utils/setAuthToken";
//import jwt_decode from 'jwt-decode';

// Action types
import { SET_CURRENT_USER } from "./types";
import { GET_ERRORS } from "./types";

import api from "../api";


// Register
export const registerUser = (userData, history) => dispatch => {

    // if success, redirect to the account page
    api.post('register/', userData)
        .then(res => {
            console.log(res.data);
            history.push('/login');
        }) 
        .catch(err => {
            console.log(err.response.data);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};


// // Login - Get User Token
// export const loginUser = userData=> dispatch => {
//     axios
//         .post('login/', userData)
//         .then(res => {

//             // Once we get the response back, save to LocalStorage
//             const { token } = res.data;

//             // Set token to LocalStorage
//             localStorage.setItem('jwtToken', token);

//             // Set token to Auth header
//             setAuthToken(token);


//             // Set user to state

//             // decode token to get user data
//             const decoded = jwt_decode(token);

//             // Set current user
//             dispatch(setCurrentUser(decoded));

//         })
//         .catch(err =>
//             dispatch({
//                 type: GET_ERRORS,
//                 payload: err.response.data
//             })
//         );
// };

// // Set logged in user
// export const setCurrentUser = decoded => {
//     return {
//         type: SET_CURRENT_USER,
//         payload: decoded
//     }
// };


// // Log user out
// export const logoutUser = () => dispatch => {

//     // Remove token from localStorage
//     localStorage.removeItem('jwtToken');

//     // Remove account header for future requests
//     setAuthToken(false);

//     // Set current user to {} which will set isAuthenticate to false
//     dispatch(setCurrentUser({}));

// };
