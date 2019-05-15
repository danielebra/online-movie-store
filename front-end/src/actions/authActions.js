//import setAuthToken from "../utils/setAuthToken";
//import jwt_decode from 'jwt-decode';

// Action types
import { LOGIN_USER, LOGOUT_USER, GET_ERRORS } from "./types";

import api from "../api";

export const registerUser = (userData, history) => dispatch => {

    // if success, redirect to the login page
    api.post('register/', userData)
        .then(res => {
            history.push(`/login/${userData.email}`)
        }) 
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};


export const loginUser = userData=> dispatch => {
    api
        .post('login/', userData)
        .then(res => {
            dispatch({
                type: LOGIN_USER,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Log user out
export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT_USER
    });
};
