// React and redux modules
import React, { Component } from "react";
import { Link } from "react-router-dom";

class MovieCard extends Component {
  render() {
    const { movie } = this.props;

    return (
      <div>
        <Link to={`/movie/${movie.id}`}>
          <li className="movie">
            <span>
              <img className="movie-home-image" src={movie.thumbnail} />
            </span>
          </li>
        </Link>
      </div>
    );
  }
}

export default MovieCard;
