//import setAuthToken from "../utils/setAuthToken";
//import jwt_decode from 'jwt-decode';

// Action types
import { LOGIN_USER, LOGOUT_USER, GET_ERRORS, UPDATE_USER, CLEAR_ERRORS } from "./types";

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


export const loginUser = userData => dispatch => {
    api
        .post('user/auth/login/', userData)
        .then(res => {
            if (res.data['isValid']) {
                
                // set localstorage
                localStorage.setItem('user', JSON.stringify(res.data['user']));

                dispatch({
                    type: LOGIN_USER,
                    payload: res.data['user']
                })
            } else {
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

export const setCurrentUser = userData => {
    return{
        type: LOGIN_USER,
        payload: userData
    };
};

// Log user out
export const logoutUser = () => dispatch => {
    localStorage.removeItem('user');
    dispatch({
        type: LOGOUT_USER
    });
};

export const superLoginForDevelopment = () => dispatch =>  {
    let user = {
        first_name: 'George',
        last_name: 'Boi',
        email: 'george_is_god@uts.edu.au',
        mobile_number: 989898989,
        date_of_birth: 1999/99/99,
        password: 'avengersendgamespoilers',
        is_admin: 'true'
    };
    localStorage.setItem('user', JSON.stringify(user));

    dispatch({
        type: LOGIN_USER,
        payload: user
    });
}

//JSON.parse(localStorage.user)

export const editUser = updatedData => dispatch => {
    api
        .put(`user/${updatedData.id}/change/`, updatedData)
        .then(res => {
            dispatch({
                type: UPDATE_USER,
                payload: res.data['user']
            })
            dispatch({
                type: CLEAR_ERRORS
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
    );
}
