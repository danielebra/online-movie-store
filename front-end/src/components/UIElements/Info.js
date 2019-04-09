
// React and redux modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

class Info extends Component {

    render() {

        const { movie } = this.props;

        return (
            <div className="info">
                <div className="video-meta center">
                    <p>{movie.genre} | {movie.maturityRating}</p>
                </div>

                <div className="description">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown prin.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown prin.
                </div>
                
            </div>
        )
    }
}


export default Info;