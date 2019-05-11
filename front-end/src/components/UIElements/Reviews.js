import React, { Component } from "react";

import Review from "./Review";

class Reviews extends Component {
  render() {
    const { movie } = this.props;
    return (
      <div className="row">
        {movie.reviews.map((review, index) => {
          return <Review key={index} review={review} />;
        })}
      </div>
    );
  }
}

export default Reviews;
