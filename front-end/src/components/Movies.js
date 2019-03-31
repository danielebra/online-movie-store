
// React and redux modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import bg from '../images/bg4.jpg';

import movie1 from '../images/movies/14546619.jpg'
import movie2 from '../images/movies/60023619.jpg'
import movie3 from '../images/movies/70011274.jpg'

// Import actions here...
//import { getCurrentProfile } from "../actions/profileActions";

class Movies extends Component {

    componentDidMount() {
        //this.props.getCurrentProfile();
    }

    render() {
        return (
            <div id="moviesContainer">
                <img src={bg} className="moviesBackground"/>
                <div className="row movies-list">
                    <div className="col s12 category">
                        <div className="movieTitle">Popular Today</div>
                        <ul className="categoryRow clearfix">
                            <li className="movie">
                                <span><img src={movie3}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie1}/></span>                                    
                            </li>
                            <li className="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie3}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li className="movie">
                                <span><img src={movie3}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie3}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li className="movie">
                                <span><img src={movie3}/></span>                                    
                            </li>
                        </ul>
                    </div>

                    <div className="col s12 category">
                        <div className="movieTitle">Action Movies</div>
                        <ul className="categoryRow clearfix">
                            <li class="movie">
                                <span><img src={movie1}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie1}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie3}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie3}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li className="movie">
                                <span><img src={movie3}/></span>                                    
                            </li><li class="movie">
                                <span><img src={movie3}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                        </ul>
                    </div>

                    <div className="col s12 category">
                        <div className="movieTitle">Drama Movies</div>
                        <ul className="categoryRow clearfix">
                            <li class="movie">
                                <span><img src={movie1}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie1}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie3}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie3}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie1}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                        </ul>
                    </div>

                    <div className="col s12 category">
                        <div className="movieTitle">Horror Movies</div>
                        <ul className="categoryRow clearfix">
                            <li class="movie">
                                <span><img src={movie1}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie1}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie3}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie3}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie1}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                        </ul>
                    </div>

                    <div className="col s12 category">
                        <div className="movieTitle">Romantic Movies</div>
                        <ul className="categoryRow clearfix">
                            <li class="movie">
                                <span><img src={movie1}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie1}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie3}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie3}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie2}/></span>                                    
                            </li>
                            <li class="movie">
                                <span><img src={movie1}/></span>                                    
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
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
const mapStateToProps = (state) => ({
    /*
    auth: state.auth,
    profile: state.profile
    */
});


// Connect actions to use within redux and export component
//export default connect(mapStateToProps, { getCurrentProfile })(Movies);
export default Movies;