
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
                    <div className="card-top">
                        <p className="authorName"> {review.author} 
                            <span className="review right"> 
                                <i className="material-icons starr">star</i> {' '} 
                                <span className="reviewRating">{review.ratings}</span>
                            </span>
                        </p>
                    </div>
                    <div class="card-content">
                        <p>{review.description}</p>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}


export default Review;