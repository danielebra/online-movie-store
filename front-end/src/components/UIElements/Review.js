import React, { Component } from "react";

class Review extends Component {
  render() {
    const { review } = this.props;

    return (
      <div class="col s6">
        <div class="card horizontal">
          <div class="card-image">{review.name ? review.name[0] : null}</div>

          <div class="card-stacked">
            <div className="card-top">
              <p className="authorName">
                {" "}
                {review.name}
                <span className="review right">
                  <i className="material-icons starr">star</i>{" "}
                  <span className="reviewRating">{review.rating}</span>
                </span>
              </p>
            </div>
            <div class="card-content">
              <p>{review.text}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
