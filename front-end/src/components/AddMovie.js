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
            trailer: "",
            genre:"",
            price: 0,
            stock: 0,
            maturityRating: 0,
        }; 
    }
    //Sends movie details to movieActions/addMovie
   onSubmit = event => {
        event.preventDefault();
        const movieDetails = {
            title: this.state.title,
            year: this.state.year,
            description: this.state.description,
            genre: this.state.genre,
            thumbnail: this.state.thumbnail,
            trailer: this.state.trailer,
            price: this.state.price,
            maturityRating: this.state.maturityRating,
            stock: this.state.stock,
        }
        this.props.addMovie(movieDetails);
    }

    render() {
        return (
            <div className="top-padding">
                <div className="container">
                    <h2 className="center-align">Add Movie</h2>
                        <form className="col s12" onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col s6 offset-s1">
                                    <label htmlFor="title"><font size="+1">Movie Title</font></label>
                                    <input 
                                        id="title" 
                                        type="text" 
                                        placeholder="Enter title of movie" 
                                        onChange={event =>
                                            this.setState({title: event.target.value })
                                        }
                                    />
                                </div>
                                <div className="col s3 offset-s1">
                                    <label htmlFor="year"><font size="+1">Movie Year</font></label>
                                    <input 
                                        id="year" 
                                        type="text" 
                                        placeholder="Enter year of movie" 
                                        onChange={event =>
                                            this.setState({year: event.target.value })
                                        }
                                        />
                                </div>
                                <div className="row"></div>

                                <div className="row">
                                    <div className="col s12">
                                        <label htmlFor="description"><font size="+1">Description</font></label>
                                        <textarea 
                                            id="description" 
                                            type="text" 
                                            placeholder="Enter movie description"
                                            rows="5" 
                                            onChange={event =>
                                                this.setState({description: event.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s5">
                                        <label htmlFor="genre"><font size="+1">genre</font></label>
                                        <input 
                                            id="genre" 
                                            type="text" 
                                            placeholder="Enter movie genre"
                                            onChange={event =>
                                                this.setState({thumbnail: event.target.value })
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
                                            placeholder="Enter the URL for a Thumbnail"
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
                                            placeholder="Enter a URL for a Trailer"   
                                            onChange={event =>
                                                this.setState({trailer: event.target.value })
                                            } 
                                            />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s3">
                                        <label htmlFor="price"><font size="+1">Movie Price</font></label>
                                        <input 
                                            id="price" 
                                            type="text" 
                                            placeholder="Price"
                                            onChange={event =>
                                                this.setState({price: event.target.value })
                                            }
                                            />
                                    </div>
                                    <div className="col s3 offset-s1">
                                        <label htmlFor="stock"><font size="+1">Movie Stock</font></label>
                                        <input 
                                            id="stock" 
                                            type="text" 
                                            placeholder="Avaliable stock"
                                            onChange={event =>
                                                this.setState({stock: event.target.value })
                                            } 
                                            />
                                    </div>
                                    <div className="col s4 offset-s1">
                                        <label htmlFor="maturityRating"><font size="+1">Maturity Rating</font></label>
                                        <input
                                            id="maturityRating" 
                                            type="text" 
                                            placeholder="Maturity Rating" 
                                            onChange={event =>
                                                this.setState({maturitRating: event.target.value })
                                            } 
                                            />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s3 offset-s3">
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
                                </div>
                            </div>
                        </form>
                    
                </div>
            </div>


        )
    }
}
const mapStateToProps = state => ({
    movies: state.movies
  });

export default connect(mapStateToProps, {addMovie})(AddMovie);