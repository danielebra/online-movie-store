import React, { Component } from 'react';

// React Router
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from '../store';

// CSS
import '../styles/main.scss';
import '../styles/materialize.min.css';

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
import 'materialize-css/dist/css/materialize.min.css';
import UserOrders from './UserOrders';
import AddMovie from './AddMovie';

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
            <PrivateRoute exact path="/movie/:id" component={Movie} />
            <PrivateRoute exact path="/orderSuccess" component={OrderSuccess}/>
            <PrivateRoute exact path="/myOrders" component={UserOrders}/>
            <PrivateRoute exact path="/order/:id" component={PlaceOrder}/>
            <PrivateRoute exact path="/addMovie" component={AddMovie}/>
            <Footer/>
          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;
