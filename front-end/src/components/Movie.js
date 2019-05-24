import React, { Component } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { getMovies, getMovieById, favouriteMovie, unFavouriteMovie, addReview} from '../actions/movieActions';
import Loading from './Templates/loading';

import M from "materialize-css";

import Reviews from "./UIElements/Reviews";
import Trailer from "./UIElements/Trailer";

class Movie extends Component {

  constructor() {
    super();

    this.state = {
      favourite: false,
      flagged: false,
      rating: 0,
      text: '',
      errors: {}
    }
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      this.props.getMovieById(this.props.match.params.id);
    }
  }
  componentWillReceiveProps(nextProps) {
    
    if(nextProps.errors){
      let errors = {};

      Object.keys(nextProps.errors) 
        .forEach(function eachKey(key) { 
          errors[key] = nextProps.errors[key][0];
        });
      
        this.setState({ errors });
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
        M.toast({html: `<a href="/wishlist">${movie.title} has been favourited.</a>`, classes: 'fav', displayLength: 2000})
      
      } else {
        this.props.unFavouriteMovie();
        M.toast({html: `<a href="/wishlist">${movie.title} has been unfavourited.</a>`, classes: 'fav', displayLength: 2000})

      }
    });
  }

  addReview = event => {
    event.preventDefault();

    const { auth, movies } = this.props;

    let review = {
      rating: this.state.rating,
      text: this.state.text,
      name: auth.user.first_name
    }

    this.props.addReview(movies.movie.id, review);
    this.setState({
      rating: 0,
      text: ''
    });
  }

  render() {
    const { movie, loading } = this.props.movies;
    const { errors } = this.props;
    const { favourite } = this.state;
    
    let pageContent;
    let hasReviews = false;

    console.log(movie);

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
                <i onClick={() => this.toggleFavourite()} className="small material-icons right favIcon fav">{ favourite ? 'favorite' : 'favorite_border'}</i>
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
              
              <form className="center add-review" noValidate onSubmit={this.addReview}>
                <div className="input-field col s2">
                  <input 
                    type="number" 
                    id="rating"
                    value={this.state.rating == 0 ? '' : this.state.rating}
                    min="1" max="10"
                    onChange={event =>
                      this.setState({ rating: parseInt(event.target.value) })
                    } 
                    className="validate"
                    required
                    aria-required=""
                  />
                  { errors.rating ? <span className="helper-text error"> { errors.rating } </span> : null}
                  <label htmlFor="rating">Rating</label>
                </div>

                <div className="input-field col s6">
                    <input 
                      type="text" 
                      id="text"
                      value={this.state.text}
                      onChange={event =>
                        this.setState({ text: event.target.value })
                      } 
                      className="validate"
                      required
                      aria-required=""
                  />
                  { errors.text ? <span className="helper-text error"> { errors.text } </span> : null}
                  <label htmlFor="text">Text</label>
                </div>
                <div className="input-field col s4">
                  <button className="btn-large addReviewBtn"> Add a Review <i className="material-icons">add</i></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies,
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { getMovies, getMovieById, favouriteMovie, unFavouriteMovie, addReview})(withRouter(Movie));