import React, { Component } from "react";

// React Router
import { BrowserRouter as Router, Route } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "../store";
import isEmpty from "../isEmpty";
// CSS
import "../styles/main.scss";
import "../styles/materialize.min.css";
import "materialize-css/dist/css/materialize.min.css";

// Components
import Header from "./Templates/Header";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Movies from "./MoviesList";
import Movie from "./Movie";
import PlaceOrder from "./PlaceOrder";
import OrderSuccess from "./OrderSuccess";
import UserOrders from "./UserOrders";
import AddMovie from "./AddMovie";
import UpdateMovie from "./UpdateMovie";
import AccountDetails from "./Edit/AccountDetails";
import UserManagement from "./Admin/UserManagement";
import { setCurrentUser } from "../actions/authActions";
import AccessLogs from "./AccessLogs";

// Check user localstorage
if (!isEmpty(localStorage.user)) {
  console.log(localStorage);
  store.dispatch(setCurrentUser(JSON.parse(localStorage.user)));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/login" component={Login} />
            <Route exact path="/login/:email" component={Login} />
            <Route exact path="/register" component={Register} />

            <Route exact path="/" component={Movies} />
            <Route exact path="/wishlist" component={Movies} />

            <Route exact path="/movie/:id" component={Movie} />
            <Route exact path="/order_success" component={OrderSuccess} />
            <Route exact path="/orders" component={UserOrders} />
            <Route exact path="/order/:id" component={PlaceOrder} />
            <Route exact path="/add_movie" component={AddMovie} />
            <Route exact path="/update_movie" component={UpdateMovie} />
            <Route exact path="/access_logs" component={AccessLogs} />
            <Route exact path="/user_management" component={UserManagement} />
            <Route exact path="/account_details" component={AccountDetails} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
