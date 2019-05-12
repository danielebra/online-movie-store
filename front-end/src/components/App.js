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

import Login from './Auth/Login';
import Register from './Auth/Register';

import Movies from './MoviesList';
import Movie from './Movie';
import PlaceOrder from './PlaceOrder';
import 'materialize-css/dist/css/materialize.min.css';

class App extends Component {
  render() {
    return (


      <Provider store={store}>
        <Router>
          <div className="App">
            <Header/>
            <Route exact path="/" component={Movies} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/movie/:id" component={Movie} />
            <Route exact path="/placeOrder" component={PlaceOrder}/>
            <Footer/>
          </div>
        </Router>
      </Provider>

    );
  }
}

export default App;
