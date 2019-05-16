
// Action Types
import { LOGIN_USER, LOGOUT_USER, UPDATE_USER } from "../actions/types";

const initialState = {
    isAuthenticated: false,
    user: {}

    //instant login
    // isAuthenticated: true,
    // user: {
    //     first_name: 'George',
    //     last_name: 'Boi',
    //     email: 'george_is_god@uts.edu.au',
    //     mobile_number: '989898989',
    //     date_of_birth: '1999/12/01',
    //     password: 'avengersendgamespoilers',
    //     is_admin: 'true'
    // }
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
                user: action.payload
            };
        
        case LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                isAdmin: false
            };
        default:
            return state;
    }
}


