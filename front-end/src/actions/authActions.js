//import setAuthToken from "../utils/setAuthToken";
//import jwt_decode from 'jwt-decode';

// Action types
import {
  LOGIN_USER,
  LOGOUT_USER,
  NEW_USER_ERRORS,
  CLEAR_NEW_USER_ERRORS,
  CLEAR_SEARCH_USER,
  GET_ERRORS,
  SEARCH_USER,
  UPDATE_USER,
  CLEAR_ERRORS,
  GET_ALL_USERS,
  GET_FEEDBACK,
  CLEAR_FEEDBACK,
  CLEAR_UPDATE,
  GET_ALL_ACCESSLOGS,
  DELETE_LOG,
  SET_ANONYMOUS_USER
} from "./types";

import api from "../api";

export const storeAnonymousUser = userData => dispatch => {
  api
    .post("user/", userData)
    .then(res => {
      dispatch({
        type: SET_ANONYMOUS_USER,
        payload: res.data
      });
      dispatch({
        type: GET_FEEDBACK,
        payload: `Your details has been recorded ${userData.first_name}.`
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const registerUser = (userData, history) => dispatch => {
  // if success, redirect to the login page
  api
    .post("user/", userData)
    .then(res => {
      history.push(`/login/${userData.email}`);
      dispatch({
        type: GET_FEEDBACK,
        payload: "You have successfully registered. Please login."
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const registerAnonymousUser = (updatedData, history) => dispatch => {
  api
    .patch(`user/${updatedData.id}/change/`, updatedData)
    .then(res => {
      history.push(`/login/${updatedData.email}`);
      dispatch({
        type: GET_FEEDBACK,
        payload: "You have successfully registered. Please login."
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loginUser = userData => dispatch => {
  api
    .post("user/auth/login/", userData)
    .then(res => {
      console.log(res.data);

      if (res.data["user"]) {
        // set localstorage
        localStorage.setItem("user", JSON.stringify(res.data["user"]));
        let logStatus = {
          status: "Logged In"
        };
        api.post(`user/${JSON.parse(localStorage.user).id}/log/`, logStatus);

        dispatch({
          type: LOGIN_USER,
          payload: res.data["user"]
        });
        dispatch({
          type: CLEAR_FEEDBACK
        });
      } else {
        dispatch({
          type: GET_ERRORS,
          payload: res.data
        });
      }
    })
    .catch(err => {
      console.log("error ", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const setCurrentUser = userData => {
  return {
    type: LOGIN_USER,
    payload: userData
  };
};

// Log user out
export const logoutUser = (message, history) => dispatch => {
  let logStatus = {
    status: "Logged Out"
  };

  api.post(`user/${JSON.parse(localStorage.user).id}/log/`, logStatus);
  localStorage.removeItem("user");
  history.push(`/login`);

  dispatch({
    type: GET_FEEDBACK,
    payload: message
  });
  dispatch({
    type: LOGOUT_USER
  });
};

export const superLoginForDevelopment = () => dispatch => {
  let user = {
    email: "george@bmw.m3",
    password: "avengersEndGameSpoilers"
  };
  dispatch(loginUser(user));
};

export const editUser = updatedData => dispatch => {
  api
    .patch(`user/${updatedData.id}/change/`, updatedData)
    .then(res => {
      localStorage.setItem("user", JSON.stringify(updatedData));

      dispatch({
        type: UPDATE_USER,
        payload: updatedData
      });

      dispatch({
        type: CLEAR_ERRORS
      });

      dispatch({
        type: GET_FEEDBACK,
        payload: `${
          updatedData.first_name
        } your details has been updated successfully.`
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const searchUser = query => dispatch => {
  dispatch({
    type: SEARCH_USER,
    payload: query
  });
};

export const clearSearch = () => dispatch => {
  dispatch({
    type: CLEAR_SEARCH_USER
  });
};

export const addUserAsAdmin = userData => dispatch => {
  api
    .post("user/", userData)
    .then(res => {
      dispatch(getAllUsers());

      dispatch({
        type: CLEAR_NEW_USER_ERRORS
      });

      dispatch({
        type: GET_FEEDBACK,
        payload: `You have successfully registered ${userData.first_name}.`
      });
    })
    .catch(err => {
      dispatch({
        type: NEW_USER_ERRORS,
        payload: err.response.data
      });
    });
};

export const editUserAsAdmin = updatedData => dispatch => {
  api
    .patch(`user/${updatedData.id}/change/`, updatedData)
    .then(res => {
      dispatch(getAllUsers());

      dispatch({
        type: CLEAR_ERRORS
      });

      dispatch({
        type: GET_FEEDBACK,
        payload: `${updatedData.first_name} details has been updated.`
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteUserAsAdmin = user => dispatch => {
  api
    .delete(`user/${user.id}/delete/`)
    .then(res => {
      dispatch(getAllUsers());
      dispatch({
        type: GET_FEEDBACK,
        payload: `${user.first_name}'s account has been deleted.`
      });
    })
    .catch(err => {
      console.log(err.response.data);
    });
};

export const deleteUser = user => dispatch => {
  api
    .delete(`user/${user.id}/delete/`)
    .then(res => {
      console.log(res.data);
      let message = `${user.first_name} your account has been deleted!`;

      dispatch(logoutUser(message));
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteLog = log => dispatch => {
  api
    .delete(`logs/${log.id}/`)
    .then(res => {
      dispatch({
        type: DELETE_LOG,
        payload: log
      });
      console.log(res.data);
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const clearFeedback = () => {
  return {
    type: CLEAR_FEEDBACK
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const clearUpdate = () => {
  return {
    type: CLEAR_UPDATE
  };
};

export const getAllUsers = () => dispatch => {
  api
    .get("user/")
    .then(res => {
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response.data);
    });
};

export const getAllAccessLogs = () => dispatch => {
  api
    .get(`user/${JSON.parse(localStorage.user).id}/logs/`)
    .then(res => {
      dispatch({
        type: GET_ALL_ACCESSLOGS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response.data);
    });
};
