import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { isLocalhost } from "./serviceWorker";

const initialState = {};
const middleware = [thunk];
var store = createStore(rootReducer, initialState);
// Localhost machines assumes Redux Dev Tools is available
if (isLocalhost) {
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}

export default store;
