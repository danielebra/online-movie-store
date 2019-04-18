// React and redux modules
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

class MovieCard extends Component {
  render() {
    const { movie } = this.props;

    return (
      <div>
        <Link to={`/movie/${movie.title}`}>
          <li className="movie">
            <span>
              <img src={movie.thumbnail} />
            </span>
          </li>
        </Link>
      </div>
    );
  }
}

export default MovieCard;
