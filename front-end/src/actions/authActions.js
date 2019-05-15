//import setAuthToken from "../utils/setAuthToken";
//import jwt_decode from 'jwt-decode';

// Action types
import { LOGIN_USER, LOGOUT_USER, GET_ERRORS } from "./types";

import api from "../api";

export const registerUser = (userData, history) => dispatch => {

    // if success, redirect to the login page
    api.post('user/', userData)
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
        .post('user/auth/login/', userData)
        .then(res => {
            if (res.data['isValid']) {
                console.log("SUCCESS: ", res.data);
                dispatch({
                    type: LOGIN_USER,
                    payload: userData
                })
            } else {
                console.log("INVALID EMAIL/PASS: ", res.data);
                dispatch({
                    type: GET_ERRORS,
                    payload: res.data
                })
            }
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
        );
};

// Log user out
export const logoutUser = () => dispatch => {
    dispatch({
        type: LOGOUT_USER
    });
};
