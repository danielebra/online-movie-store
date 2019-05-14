import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";

import { connect } from 'react-redux';
import { searchMovies } from '../../actions/movieActions';
import $ from 'jquery';
class Header extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: true,
      search: ''
    };
  }

  componentDidMount() {
    M.AutoInit();
    $('#search-form').submit(false);
  }

  search = event => {
    event.preventDefault();

    this.setState({ search: event.target.value}, () => {
      let query = this.state.search;
      this.props.searchMovies(query.toLowerCase().trim());
    });
  }

  render() {
    return (
      <nav id="header">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            {" "}
            MovieSpot{" "}
          </Link>
          {this.state.loggedIn ? (
            <div>
              <ul id="nav-mobile" className="hide-on-med-and-down">
                <li>
                  <Link className="current first" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <nav className="search">
                    <div className="nav-wrapper">
                      <form id="search-form">
                        <div className="input-field">
                          <input id="search" type="search" onChange={this.search}/>
                          <label className="label-icon" htmlFor="search">
                            <i className="material-icons">search</i>
                          </label>
                        </div>
                      </form>
                    </div>
                  </nav>
                </li>
              </ul>

              <ul id="nav-mobile" className="right hide-on-med-and-down">
          
                <li>
                <Link to="/myOrders">My Orders</Link>
              </li>
                <li>
                  <Link to="/wishlist">Wishlist</Link>
                </li>
                <li>
                  <a href="badges.html">
                    <i className="material-icons">menu</i>
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

export default connect(null, { searchMovies })(Header);