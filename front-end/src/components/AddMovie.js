import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getMovieById } from '../actions/movieActions';

import Loading from '../components/Templates/loading';
import M from "materialize-css";
import Info from "./UIElements/Info";

class AddMovie extends Component {


    /*constructor(props){
        super(props)
        this.state={
            title: "",
            year: "",
            description: "",
            thumbnail: "",
            trailer_link: "",
            price: 0,
            stock: 0,
            pruchase_count: 0,
            maturityRating: 0,
        };
        
    }

   onSubmit = event => {
        event.preventDefault();
        this.movieDetails = {
            title: this.state.title,
            year: this.state.year,
            description: this.state.description,
            thumbnail: this.state.thumbnail,
            trailer_link: this.state.trailer_ink,
            price: this.state.price,
            maturity_rating: this.state.maturityRating,
            pruchase_count: this.state.pruchase_count,
            stock: this.state.stock,
        }
    }*/

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    render() {
        return (
            <div id="movieDetails">
                <div className="container">
                    <h2 className="center-align">Add Movie</h2>
                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="col s6">
                                    <label for="title"><font size="+1">Movie Title</font></label>
                                    <input id="title" type="text" placeholder="Enter title of movie" className="validate white" onChange={this.onChange} />
                                </div>
                                <div class="col s3 offset-s3">
                                    <label for="year"><font size="+1">Movie Year</font></label>
                                    <input id="year" type="text" placeholder="Enter year of movie" class="validate white" onChange={this.onChange} />
                                </div>
                                <div className="row">
                                    <div class="col s12">
                                        <label for="description"><font size="+1">Description</font></label>
                                        <textarea id="description" type="text" className="validate white" placeholder="Enter movie description" rows="5" onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s5">
                                        <label for="thumbail"><font size="+1">Thumbnail URL</font></label>
                                        <input id="thumbail" type="text" placeholder="place a URL of Thumbail" class="validate white" onChange={this.onChange} />
                                    </div>

                                    <div className="col s5 offset-s2">
                                        <label for="trailer"><font size="+1">Trailer URL</font></label>
                                        <input id="trailer" type="text" placeholder="place a URL for Trailer" class="validate white" onChange={this.onChange} />

                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s3">
                                        <label for="price"><font size="+1">Movie price</font></label>
                                        <input id="price" type="text" placeholder="price" class="validate white" onChange={this.onChange} />
                                    </div>
                                    <div className="col s3 offset-s1">
                                        <label for="stock"><font size="+1">Movie stock</font></label>
                                        <input id="stock" type="text" placeholder="avaliable stock" class="validate white" onChange={this.onChange} />
                                    </div>
                                    <div className="col s4 offset-s1">
                                        <label for="maturity"><font size="+1">Maturity rating</font></label>
                                        <input id="maturity" type="text" placeholder="maturity rating" class="validate white" onChange={this.onChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s3 offset-s2">
                                        <button className="waves-effect waves-light red darken-3 btn">Cancel</button>
                                    </div>
                                    <div className="col s3 offset-s2">
                                        <button className="waves-effect waves-light red darken-3 btn">Submit</button>
                                    </div>
                                    <div className="col s2"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        )
    }
}
export default AddMovie;