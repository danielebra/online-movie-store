import React, { Component } from "react";
import "../styles/_addmovie.scss";
import { Link, withRouter } from "react-router-dom";

//Displays an add success screen
class AddSuccess extends Component {
    render(){
        return(
            <div className="top-padding">
                <div className="container center">
                    <h2>Added Successfully!</h2>
                    <li className="btn-style">
                        <Link to="/" className="waves-effect waves-light red darken-3 btn">
                            Back to Main Menu
                        </Link>
                    </li>
                </div>
            </div>
        );
    }
}
export default AddSuccess;
