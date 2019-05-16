import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";

import { connect } from 'react-redux';
import { searchMovies } from '../../actions/movieActions';
import { logoutUser } from '../../actions/authActions';
import $ from 'jquery';
class Header extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    M.AutoInit();
    $('#search-form').submit(false);
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "300px";
  }

  closeNav() {
      document.getElementById("mySidenav").style.width = "0";
  }

  search = event => {
    event.preventDefault();

    this.setState({ search: event.target.value}, () => {
      let query = this.state.search;
      this.props.searchMovies(query.toLowerCase().trim());
    });
  }

  render() {

    const { isAuthenticated, user } = this.props.auth;

    return (
      <nav id="header">
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">
            {" "}
            MovieSpot{" "}
          </Link>
          {isAuthenticated ? (
            <div>
              <ul id="nav-mobile" className="hide-on-med-and-down left-margin">
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

              <div className="right-margin">
                <ul className="right">
                  <li> 
                    <a onClick={this.openNav} href="#!" >Hi, {user.first_name}<i className="material-icons right">menu</i></a>
                    <div id="mySidenav" className="newsidenav">
                      <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                      <Link to="/account_details">Account Details</Link>
                      <Link to="/orders">My Orders</Link> 
                      <Link to="/wishlist">Wish List</Link>
                      
                      { user.is_admin === 'true' ? (
                        <div>
                          <Link to="/add_movie">Add Movies</Link>
                          <Link to="/view_users"> View Users </Link>
                        </div>
                      ) : null }
                      
                      <a className="divider"/>
                      <a className="belowDivider" onClick={this.props.logoutUser}>Logout</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <ul id="nav-mobile" className="right right-margin hide-on-med-and-down">
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

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { searchMovies, logoutUser })(Header);