import React, { Component } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getMovies, getMovieById, favouriteMovie, unFavouriteMovie } from '../actions/movieActions';
import Loading from './Templates/loading';

import M from "materialize-css";

import Reviews from "./UIElements/Reviews";
import Trailer from "./UIElements/Trailer";

class Movie extends Component {

  constructor() {
    super();

    this.state = {
      favourite: false,
      flagged: false
    }
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.props.getMovieById(this.props.match.params.id);
    }
  }
  
  componentDidMount() {
    M.AutoInit();
  }

  isMovieFavourite() {
    const { movie, wishList } = this.props.movies;

    if (!this.state.flagged) {
      wishList.forEach(m => {
        if (m.id == movie.id) {
          this.setState({ favourite: true });
        }
      })
      this.setState({ flagged: true });
    }
  }

  toggleFavourite() {
    const { movie } = this.props.movies;
    this.setState({ favourite: !this.state.favourite }, function() {

      if (this.state.favourite) {
        this.props.favouriteMovie();
        M.toast({html: `${movie.title} has been favourited.`, displayLength: 2000})
      
      } else {
        this.props.unFavouriteMovie();
        M.toast({html: `${movie.title} has been unfavourited.`, displayLength: 2000})

      }
    });
  }

  render() {
    const { movie, loading } = this.props.movies;
    const { favourite } = this.state;
    
    let pageContent;
    let hasReviews = false;

    if (movie == null || loading) {
      pageContent = <Loading/>

    } else {

      this.isMovieFavourite();

      if (movie.reviews.length > 0)
        hasReviews = true;

      let genres = ''
      movie.genre.forEach(genre => genres += genre + ' | ');

      pageContent = (
        <div className="row">
            <div className="col s5">
              <img className="movieDetailsImg" src={movie.thumbnail} />
            </div>

            <div className="col s7 mov">
              <h2 className="movieTitleDetail">
                {movie.title}
                <span className="year"> ({movie.year})</span>
                <i onClick={() => this.toggleFavourite()} className="small material-icons right favIcon">{ favourite ? 'favorite' : 'favorite_border'}</i>
                <br />
                <span className="price">${movie.price}</span>
              </h2>

              <div className="row">
                <Link to={`/order/${movie.id}`} className="waves-effect waves-light btn-large movieButton">
                  <i className="material-icons">shop</i> <span>Buy Now</span>
                </Link>
              </div>

              <div className="row info">
                <div className="video-meta center">
                  <p>
                    {genres} {movie.maturity_rating}
                  </p>
                </div>

                <div className="description">
                  {movie.description}
                </div>
              </div>
            </div>
          </div>
      );
    }

    return (
      <div className="top-padding">
        <div className="container">
          {pageContent}
          <div className="row details">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s6">
                  <a className="active" href="#trailer">Trailer</a>
                </li>
                <li className="tab col s6">
                  <a href="#reviews">Reviews</a>
                </li>
              </ul>
            </div>
            <div id="trailer" className="col s12">
              { movie ? <Trailer movie={movie}/> : null }
            </div>
            <div id="reviews" className="col s12">
              { hasReviews ? <Reviews movie={movie}/> : <p className="info center"> No reviews available for this movie. </p> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps, { getMovies, getMovieById, favouriteMovie, unFavouriteMovie })(withRouter(Movie));