
// Action Types
import { LOGIN_USER, LOGOUT_USER, CLEAR_SEARCH_USER, SEARCH_USER, UPDATE_USER, GET_ALL_USERS, CLEAR_UPDATE, GET_ALL_ACCESSLOGS } from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {},
    users: [],
    userSearchList: [],
    updated: false
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

        case SEARCH_USER:
            
            let query = action.payload;
            let user;

            if (isNaN(query)) {
                query = query.toLowerCase().trim();
                
                user = state.users.filter(user => {
                    if (user.first_name.toLowerCase().includes(query) || user.last_name.toLowerCase().includes(query))
                        return user;
                });

            } else {
                user = state.users.filter(user => user.mobile_number.includes(query));
            }

            return {
                ...state,
                userSearchList: user
            };

        case CLEAR_SEARCH_USER:
            return {
                ...state,
                userSearchList: []
            }
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
            }

        default:
            return state;
    }
}


