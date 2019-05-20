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
            maturity_rating: 0,
            purchase_count:"",
            stock: 0,
            
        }; 
    }
    //Sends movie details to movieActions/addMovie
   onSubmit = event => {
        event.preventDefault();
        const movieDetails = {
            title: this.state.title,
            year: this.state.year,
            description: this.state.description,
            thumbnail: this.state.thumbnail,
            trailer_link: this.state.trailer_link,
            price: this.state.price,
            maturity_rating: this.state.maturity_rating,
            purchase_count: this.state.purchase_count,
            stock: this.state.stock,
        }
        this.props.addMovie(movieDetails);
        
        //windows.alert({title} + "Submitted");
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
                                    <div className="col s3">
                                        <label htmlFor="purchase_count"><font size="+1">Purchase Count</font></label>
                                        <input 
                                            id="purchase_count" 
                                            type="text" 
                                            placeholder="Enter current amount of purchases"
                                            onChange={event =>
                                                this.setState({purchase_count: event.target.value })
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
                                            id="trailer_link" 
                                            type="text"
                                            placeholder="Enter a URL for a Trailer"   
                                            onChange={event =>
                                                this.setState({trailer_link: event.target.value })
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
                                            placeholder="Enter Price"
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
                                            placeholder="Enter avaliable stock"
                                            onChange={event =>
                                                this.setState({stock: event.target.value })
                                            } 
                                            />
                                    </div>
                                    <div className="col s4 offset-s1">
                                        <label htmlFor="maturity"><font size="+1">Maturity Rating</font></label>
                                        <input
                                            id="maturity_rating" 
                                            type="text" 
                                            placeholder="Maturity Rating" 
                                            onChange={event =>
                                                this.setState({maturity_rating: event.target.value })
                                            } 
                                            />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s3 offset-s3">
                                        <Link to="/" className="waves-effect waves-light red darken-3 btn">
                                            Cancel
                                        </Link> 
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