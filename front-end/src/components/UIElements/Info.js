// React and redux modules
import React, { Component } from "react";

class Info extends Component {
  render() {
    const { movie } = this.props;

    return (
      <div className="info">
        <div className="video-meta center">
          <p>
            {movie.genre[0]} | {movie.maturityRating}
          </p>
        </div>

        <div className="description">
          {movie.description}
        </div>
      </div>
    );
  }
}

export default Info;
