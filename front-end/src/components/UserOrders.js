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
    constructor() {
        super();

        // contains a list of all users, an array to indicate which user is being edited and errors
        this.state = {
            users: [],
            isEditing: [],
            errors: {},
            usersCount: 0,
            search: '',
            newUser: {
                first_name: "",
                last_name: "",
                email: "",
                mobile_number: "",
                date_of_birth: Date,
                password: "",
                passwordConfirm: "",
                is_admin: false
            }
        }
    }

    


    render(){
        
        return(
            <div className="center top-padding account-details">
                <div className="container">
                    <div className="row">
                        <div className="col s12 center">
                            <h3> Order Management </h3>
                           
                            <form id="register" onSubmit={this.addNewUser} noValidate>
                <input className="col s4 offset-s4 white" type="text" placeholder="Enter order number"></input>
                <button className="col s1 waves-effect waves-light btn red darken-3"><i class="material-icons right">search</i></button>
                <div className="col s3"></div>
                <div className="col 3s offset-s2">
            <Link to="/"><button className="waves-effect waves-light red darken-3 btn">Add Movies</button></Link>
            </div>
            
            
        
             </form>
            </div>
          
            </div>
            </div>
            </div>
           
        )
    }
}
export default UserOrders;