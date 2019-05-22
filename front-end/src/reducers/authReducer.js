
// Action Types
import { LOGIN_USER, LOGOUT_USER, UPDATE_USER, GET_ALL_USERS, CLEAR_UPDATE, GET_ALL_ACCESSLOGS } from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {},
    users: [],
    updated: false,
    logs: []
};

export default function (state = initialState, action) {

    switch (action.type) {

        case LOGIN_USER:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload
            };

        case UPDATE_USER:
            return {
                ...state,
                user: action.payload,
                updated: true
            };

        case CLEAR_UPDATE:
            return {
                ...state,
                updated: false
            };

        case LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                isAdmin: false
            };

        case GET_ALL_USERS:
            return {
                ...state,
                users: action.payload
            };

        case GET_ALL_ACCESSLOGS:
            return {
                ...state,
                logs: action.payload
            };

        default:
            return state;
    }
}


