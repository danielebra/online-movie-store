import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { addMovie } from '../actions/movieActions';

import Loading from '../components/Templates/loading';
import M from "materialize-css";
import Info from "./UIElements/Info";

class AddMovie extends Component {
    constructor(props){
        super(props)
        this.state={
            title: "",
            year: "",
            description: "",
            thumbnail: "",
            trailer_link: "",
            price: 0,
            stock: 0,
            purchase_count: 0,
            maturityRating: 0,
        }; 
    }
    //Sends movie details to get 
   onSubmit = event => {
        event.preventDefault();
        const movieDetails = {
            title: this.state.title,
            year: this.state.year,
            description: this.state.description,
            thumbnail: this.state.thumbnail,
            trailer_link: this.state.trailer_ink,
            price: this.state.price,
            maturity_rating: this.state.maturityRating,
            purchase_count: this.state.purchase_count,
            stock: this.state.stock,
        }
        this.props.addMovie(movieDetails);
    }

    render() {
        return (
            <div class="top-padding">
                <div className="container">
                    <h2 className="center-align">Add Movie</h2>
                    <div className="row">
                        <form className="col s12" onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col s6">
                                    <label htmlFor="title"><font size="+1">Movie Title</font></label>
                                    <input 
                                        id="title" 
                                        type="text" 
                                        placeholder="Enter title of movie" 
                                        className="validate white" 
                                        onChange={event =>
                                            this.setState({title: event.target.value })
                                        }
                                    />
                                </div>
                                <div className="col s3 offset-s3">
                                    <label htmlFor="year"><font size="+1">Movie Year</font></label>
                                    <input 
                                        id="year" 
                                        type="text" 
                                        placeholder="Enter year of movie" 
                                        className="validate white" 
                                        onChange={event =>
                                            this.setState({year: event.target.value })
                                        }
                                        />
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <label htmlFor="description"><font size="+1">Description</font></label>
                                        <textarea 
                                            id="description" 
                                            type="text" 
                                            placeholder="Enter movie description" 
                                            className="validate white" 
                                            rows="5" 
                                            onChange={event =>
                                                this.setState({description: event.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s5">
                                        <label htmlFor="thumbnail"><font size="+1">Thumbnail URL</font></label>
                                        <input 
                                            id="thumbail" 
                                            type="text" 
                                            placeholder="place a URL of Thumbail" 
                                            className="validate white" 
                                            onChange={event =>
                                                this.setState({thumbnail: event.target.value })
                                            } 
                                            />
                                    </div>

                                    <div className="col s5 offset-s2">
                                        <label htmlFor="trailer"><font size="+1">Trailer URL</font></label>
                                        <input 
                                            id="trailer" 
                                            type="text"
                                            placeholder="place a URL for Trailer" 
                                            className="validate white" 
                                            onChange={event =>
                                                this.setState({trailer: event.target.value })
                                            } 
                                            />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s3">
                                        <label htmlFor="price"><font size="+1">Movie price</font></label>
                                        <input 
                                            id="price" 
                                            type="text" 
                                            placeholder="price" 
                                            className="validate white" 
                                            onChange={event =>
                                                this.setState({price: event.target.value })
                                            }
                                            />
                                    </div>
                                    <div className="col s3 offset-s1">
                                        <label htmlFor="stock"><font size="+1">Movie stock</font></label>
                                        <input 
                                            id="stock" 
                                            type="text" 
                                            placeholder="avaliable stock" 
                                            className="validate white" 
                                            onChange={event =>
                                                this.setState({stock: event.target.value })
                                            } 
                                            />
                                    </div>
                                    <div className="col s4 offset-s1">
                                        <label htmlFor="maturity"><font size="+1">Maturity rating</font></label>
                                        <input className="validate white"
                                            id="maturity" 
                                            type="text" 
                                            placeholder="maturity rating" 
                                            onChange={event =>
                                                this.setState({maturity_rating: event.target.value })
                                            } 
                                            />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s3 offset-s2">
                                        <button className="waves-effect waves-light red darken-3 btn">Cancel</button>
                                    </div>
                                    <div className="col s3 offset-s2">
                                        <button className="waves-effect waves-light red darken-3 btn" 
                                            id="add-movie-submit-btn"
                                            type ="submit"
                                        >
                                            <span> Submit </span>
                                        </button>
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
const mapStateToProps = state => ({
    movies: state.movies
  });

export default connect(mapStateToProps, {addMovie})(AddMovie);