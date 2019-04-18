// React and redux modules
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import api from "../api";
import movie1 from "../images/movies/14546619.jpg";
import movie2 from "../images/movies/60023619.jpg";
import movie3 from "../images/movies/70011274.jpg";

import bg from "../images/bg4.jpg";
import MovieCard from "./UIElements/MovieCard";
import axios from "axios";
// Import actions here...
//import { getCurrentProfile } from "../actions/profileActions";
class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: []
    };
  }
  componentWillMount() {
    // TODO: Get all genres from API
    // TODO: Change database to handle multiple genres instead of a string (introduce a new entity)
    this.getGenres();
  }

  getGenres() {
    api.get("genre/").then(res => {
      var apiGenres = res.data;
      var myGenres = [];
      for (var i = 0; i != apiGenres.length; i++) {
        myGenres.push(apiGenres[i].name);
      }
      this.setState({ genres: myGenres });
      this.getMovies();
    });
  }
  getMovies() {
    var tempState = {
      movies: []
    };
    api.get("movie/").then(res => {
      var movies = res.data;
      console.log(movies);

      this.state.genres.forEach(function(genre) {
        var currentGenre = {
          name: genre,
          displayName: genre,
          movies: movies.filter((value, index, array) => {
            return value.genre.includes(genre);
          })
        };
        // Only display results for that genre if there are movies in it
        if (currentGenre.movies.length > 0) {
          tempState.movies.push(currentGenre);
        }
      });

      this.setState({
        movies: tempState.movies
      });
      console.log("Current State:", this.state);
    });
  }

  byGenre(item, genre) {
    return item.genre === genre;
  }
  componentDidMount() {
    //this.props.getCurrentProfile();
  }

  render() {
    return (
      <div id="moviesContainer">
        <img src={bg} className="moviesBackground" />
        <div className="row movies-list">
          <div>
            {this.state.movies.map((item, index) => {
              return (
                <div className="col s12 category">
                  <div className="movieTitle">{item.displayName}</div>
                  <ul className="categoryRow clearfix">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "normal",
                        flexWrap: "wrap"
                      }}
                    >
                      {this.state.movies[index].movies.map((item, index) => {
                        return <MovieCard key={index} movie={item} />;
                      })}
                    </div>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

// Assign prop types to props being used
Movies.propTypes = {
  /*
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
    */
};

// Map state to props so they can be used in this component
const mapStateToProps = state => ({
  /*
    auth: state.auth,
    profile: state.profile
    */
});

// Connect actions to use within redux and export component
//export default connect(mapStateToProps, { getCurrentProfile })(Movies);
export default Movies;
