// React and redux modules
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

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
