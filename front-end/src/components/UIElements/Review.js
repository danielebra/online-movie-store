
// React and redux modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class Review extends Component {

    render() {

        const { review } = this.props;

        return (
            <div class="col s6">
                <div class="card horizontal">
                <div class="card-image">
                    {review.author[0]}
                </div>

                <div class="card-stacked">
                    <div class="card-content">
                        <p>{review.description}</p>
                    </div>
                <span className="review-stars">{review.ratings} stars</span>

                </div>
                </div>
            </div>
        )
    }
}


export default Review;