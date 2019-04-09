import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import movie1 from '../images/movies/14546619.jpg'
import movie2 from '../images/movies/60023619.jpg'
import movie3 from '../images/movies/70011274.jpg'

import M from "materialize-css";

import Info from './UIElements/Info';
import Reviews from './UIElements/Reviews';
import Trailer from './UIElements/Trailer';

class Movie extends Component {

    componentDidMount(){
        //var elems = document.querySelectorAll('.collapsible');
        //var instances = M.Collapsible.init(elems, {});
        M.AutoInit();
        if(this.props.match.params.name){
            // This should call an api from redux to get the movie
            // this.props.getMovieByName(this.props.match.params.name);
        }

    }

    constructor() {
        super();

        this.state = {
            movie: {
                name: "The Exorcist",
                image: movie1,
                genre: "action",
                year: 1973,
                price: 23.99,
                maturityRating: 'MA',
                reviews: [
                    {
                        author: "John",
                        ratings: 3,
                        description: "This movie sucks!!" 
                    },
                    {
                        author: "Tom",
                        ratings: 10,
                        description: "Great show, highly recommended"
                    },
                    {
                        author: "Sam",
                        ratings: 10,
                        description: "When is the next session coming??" 
                    },
                    {
                        author: "Daniel",
                        ratings: 7,
                        description: "i run out of popcorn in 10 mins."
                    },
                    {
                        author: "Emanuel",
                        ratings: 3,
                        description: "Boring." 
                    }
                ]
            }
        }
    }

    render() {

        const { movie } = this.state;

        return (
            <div id="movieDetails">
                <div className="container">
                    <div class="row">
                        <div class="col s5">
                            <img className="movieDetailsImg" src={movie.image}/>
                        </div>
                        <div class="col s7 mov">
                            <h2 className="movieTitleDetail">{movie.name} 
                                <span className="year">({movie.year})</span> <br/> 
                                <span className="price">${movie.price}</span>
                            </h2>
                            <div className="container">
                                <div className="row">
                                    <a class="waves-effect waves-light btn movieBuy">Buy now</a>
                                    <a class="waves-effect waves-light btn movieBuy">+ Add to WishList</a>
                                </div>
                            </div>
                            <div className="row details">
                                <div className="col s12">
                                    <ul className="tabs">
                                        <li className="tab col s4"><a classNameName="active" href="#info">info</a></li>
                                        <li className="tab col s4"><a href="#reviews">Reviews</a></li>
                                        <li className="tab col s4"><a href="#trailer">Trailer</a></li>
                                    </ul>
                                </div>
                                <div id="info" className="col s12">
                                    <Info movie={movie}/>
                                </div>
                                <div id="reviews" className="col s12">
                                    <Reviews movie={movie}/>
                                </div>
                                <div id="trailer" className="col s12">
                                    <Trailer movie={movie}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Movie;