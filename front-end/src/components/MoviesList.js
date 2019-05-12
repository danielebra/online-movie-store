// React and redux modules
import React, { Component } from "react";
import background from "../images/bg4.jpg";
import MovieCard from "./UIElements/MovieCard";
import Loading from './Templates/loading';

// Redux
import { connect } from 'react-redux';

// ACTIONS
import { getMovies } from '../actions/movieActions';

class MoviesList extends Component {
  componentWillMount() {
    this.props.getMovies();
  }

  render() {
    // If loading is true or there are no movies then show loading, otherwise iterate through each movie and display it.
    let { collections, searchList, loading } = this.props.movies;
    let pageContent;
    
    if (collections == null || loading) {
      pageContent = <Loading/>

    } else {
      if (searchList != null) {
        if (searchList.length > 0) {
          collections = searchList;
        }
      }
      
      pageContent = (
        collections.map((item, index) => {
          return (
            <div className="col s12 category" key={index}>
              <div className="movieTitle">{item.genre}</div>
              <ul className="categoryRow clearfix">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "normal",
                    flexWrap: "wrap"
                  }}
                >
                  {collections[index].movies.map((item, index) => {
                    return <MovieCard key={index} movie={item}/>
                  })}
                </div>
              </ul>
            </div>
          );
        })
      )
    }

    return (
      <div id="moviesContainer">
        <img src={background} className="moviesBackground" />
        <div className="row movies-list">
          <div>
            {pageContent}
          </div>
        </div>
      </div>
    );
  }
}

// Map state to props so they can be used in this component
const mapStateToProps = state => ({
    movies: state.movies
});

// Connect actions to use within react and export component
export default connect(mapStateToProps, { getMovies })(MoviesList);