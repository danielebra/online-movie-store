import React, { Component } from 'react';

// React Router
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from '../store';
import isEmpty from '../isEmpty';
// CSS
import '../styles/main.scss';
import '../styles/materialize.min.css';
import 'materialize-css/dist/css/materialize.min.css';

// Components
import Header from './Templates/Header'
import Footer from './Templates/Footer'

import PrivateRoute from './Templates/PrivateRoute';

import Login from './Auth/Login';
import Register from './Auth/Register';
import Movies from './MoviesList';
import Movie from './Movie';
import PlaceOrder from './PlaceOrder';
import OrderSuccess from './OrderSuccess';
import UserOrders from './UserOrders';
import AddMovie from './AddMovie';
import AccountDetails from './Edit/AccountDetails';
import UserManagement from './Admin/UserManagement';
import { setCurrentUser } from '../actions/authActions';

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
            <Header/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/login/:email" component={Login} />
            <Route exact path="/register" component={Register} />

            <PrivateRoute exact path="/" component={Movies} />
            <PrivateRoute exact path="/wishlist" component={Movies} />
            
            <PrivateRoute exact path="/movie/:id" component={Movie} />
            <PrivateRoute exact path="/order_success" component={OrderSuccess}/>
            <PrivateRoute exact path="/orders" component={UserOrders}/>
            <PrivateRoute exact path="/order/:id" component={PlaceOrder}/>
            <PrivateRoute exact path="/add_movie" component={AddMovie}/>

            <PrivateRoute exact path="/account_details" component={AccountDetails}/>
            <PrivateRoute exact path="/user_management" component={UserManagement}/>

          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;
