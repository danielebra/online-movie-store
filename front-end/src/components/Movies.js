
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
    constructor(props) 
    {
        super(props)
        // TODO: Populate via API call to backend
        this.state = 
        {
            // Potential API v1
            movies: 
            {
                popular: 
                [
                    {
                        name: "The Exorcist",
                        image: movie1
                    },
                    {
                        name: "xXx",
                        image: movie2
                    },
                    {
                        name: "24",
                        image: movie3
                    }
                ],
                action: 
                [
                    {
                        name: "The Exorcist",
                        image: movie1
                    },
                    {
                        name: "xXx",
                        image: movie2
                    },
                    {
                        name: "24",
                        image: movie3
                    }
                ]
            }
            // Potential API v2 (More descriptive)
            // movies: 
            // [
            //     {
            //         name: "popular",
            //         displayName: "Popular Today",
            //         movies:
            //             [
            //                 {
            //                     name: "The Exorcist",
            //                     image: movie1
            //                 },
            //                 {
            //                     name: "xXx",
            //                     image: movie2
            //                 },
            //                 {
            //                     name: "24",
            //                     image: movie3
            //                 }
            //             ]
            //     }
            // ]
        }
    }

    componentDidMount() {
        //this.props.getCurrentProfile();
    }

    render() {
        return (
            <div id="moviesContainer">
                <img src={bg} className="moviesBackground"/>
                <div className="row movies-list">
                    <div> 
                    {
                        Object.entries(this.state.movies).map(([key, value]) => {
                            return (
                                <div className="col s12 category">
                                <div className="movieTitle">{key}</div>
                                    <ul className="categoryRow clearfix">
                                        <div style={{display: "flex", justifyContent: "space-around", flexWrap: "wrap"}}>
                                            {
                                                this.state.movies.popular.map((item, index) => {
                                                    // TODO: Make a Movie Card component

                                                    return (
                                                        <li className="movie">
                                                            <span><img src={item.image}/></span>
                                                        </li>
                                                    )
                                                })
                                            
                                            }

                                        </div>
                                    </ul>
                                </div>
                            ) })
                    }
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