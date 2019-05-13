import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getMovies } from '../actions/movieActions';

import OrderCard from "./UIElements/OrderCard"

import M from "materialize-css";

import Info from "./UIElements/Info";
import Reviews from "./UIElements/Reviews";
import Trailer from "./UIElements/Trailer";

class UserOrders extends Component{



    render(){

        return(
            <div id="movieDetails">
                 <div className="container">
            <div className="row">
                <input className="col s4 offset-s4 white" type="text" placeholder="Enter order number"></input>
                <button className="col s1 waves-effect waves-light btn red darken-3"><i class="material-icons right">search</i></button>
                <div className="col s3"></div>
            </div>
            <OrderCard/>
            </div>
            </div>
           
        )
    }
}
export default UserOrders;