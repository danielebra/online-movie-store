// React and redux modules
import React, { Component } from "react";
import background from "../images/bg4.jpg";
import MovieCard from "./UIElements/MovieCard";
import Loading from "./Templates/loading";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getMovies } from "../actions/movieActions";

class MoviesList extends Component {
  constructor() {
    super();

    this.state = {
      wishListActive: false
    };
  }

  componentWillMount() {
    this.props.getMovies();
    if (window.location.pathname == "/wishlist") {
      this.setState({ wishListActive: true });
    }
  }

  render() {
    // If loading is true or there are no movies then show loading, otherwise iterate through each movie and display it.
    let {
      collections,
      searchList,
      loading,
      wishList,
      moviesList
    } = this.props.movies;
    let { user } = this.props.auth;
    let { wishListActive } = this.state;
    let pageContent;

    if (loading) {
      pageContent = <Loading />;
    } else if (wishListActive && wishList.length == 0) {
      pageContent = (
        <p className="center"> You don't have any favourite movies. </p>
      );
    } else if (!loading && collections == null && moviesList == null) {
      pageContent = (
        <p className="center"> No movies available for {user.first_name}.</p>
      );
    } else {
      if (searchList != null) {
        if (searchList.length > 0) {
          collections = searchList;
        }
      }

      if (wishListActive || (moviesList && collections == null)) {
        let wishListTitle = `${user.first_name}'s Wish List`;
        console.log(wishListActive);
        console.log(wishList);

        pageContent = (
          <div className="col s12 category">
            <div className="movieTitle">
              {wishListActive ? wishListTitle : "Movies"}{" "}
            </div>
            <ul className="categoryRow clearfix">
              <div
                style={{
                  display: "flex",
                  justifyContent: "normal",
                  flexWrap: "wrap"
                }}
              >
                {wishListActive
                  ? wishList.map((item, index) => {
                      return <MovieCard key={index} movie={item} />;
                    })
                  : moviesList.map((item, index) => {
                      return <MovieCard key={index} movie={item} />;
                    })}
              </div>
            </ul>
          </div>
        );
      } else {
        pageContent = collections.map((item, index) => {
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
                    return <MovieCard key={index} movie={item} />;
                  })}
                </div>
              </ul>
            </div>
          );
        });
      }
    }

    return (
      <div id="moviesContainer">
        <img src={background} className="moviesBackground" />
        <div className="row movies-list">
          <div>{pageContent}</div>
        </div>
      </div>
    );
  }
}

// Map state to props so they can be used in this component
const mapStateToProps = state => ({
  movies: state.movies,
  auth: state.auth
});

// Connect actions to use within react and export component
export default connect(
  mapStateToProps,
  { getMovies }
)(withRouter(MoviesList));
