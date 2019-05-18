import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getMovies, getMovieById } from '../actions/movieActions';
import Loading from '../components/Templates/loading';
import M from "materialize-css";
import Info from "./UIElements/Info";

class UpdateMovie extends Component{
    componentWillMount() {
        if (this.props.match.params.id) {
          this.props.getMovieById(this.props.match.params.id);
        }
      }
      
      componentDidMount() {
        M.AutoInit();
      }
    
      render() {
        let { collections, searchList, loading } = this.props.movies;
        let pageContent;
        
        if (loading) {
            pageContent = <Loading/>
        
        } else if (!loading && collections == null) {
        pageContent = <p className="center"> No movies available.</p>

        } else {
            if (searchList != null) {
                if (searchList.length > 0) {
                collections = searchList;
                }
            }
        }
        return(
            <div id="movieDetails">
            <div className="container">
              {pageContent}
              <div className="row details">
                    <h1> Fuck you.jpeg </h1>
              </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    movies: state.movies
  });
  
  export default connect(mapStateToProps, { getMovies, getMovieById })(UpdateMovie);