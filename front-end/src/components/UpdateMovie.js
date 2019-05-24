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
      this.props.getMovies();
      }
      
      componentDidMount() {
        M.AutoInit();
      }

      /*componentWillReceiveProps(nextProps){
        if(nextProps.movies){
          const {movies} = nextProps;
          let allMovies = new Array(movies.length).fill(false);
          this.setState({ movies, allMovies });
          console.log("Movies are ", movies);
          console.log("Array length is", allMovies);
        }
      }*/

      getMovieList(){
        let { collections, searchList, loading, wishList, moviesList } = this.props.movies;}
        //console.log(this.props.movies);


      onSubmit(){
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
          <div className="top-padding">
            <div id="movieDetails">
              <div className="container">
                <div className="row details">
                  <h1 className="center-align"> Update/Remove Movie </h1>
                  <div className="movieList">
                    <select>
                        <option value="Error"> Select Movie to view or change </option>
                        <option value="1"> Option 1 </option>
                        <option value="2"> Option 2 </option>
                    </select>
                  </div>
                </div>
                <hr></hr>
                <h3> Movie Details</h3>
                <form className="col 10" onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col s4">
                      <label htmlFor="title"><font size="+1"> Movie Title </font></label>
                      <input 
                      id="title" 
                      type="text" 
                      placeholder="Movie Title"
                      className="white-text" 
                      onChange={event =>
                          this.setState({title: event.target.value })
                      }
                      />
                    </div>
                    
                    <div className="col s4 offset-s2">
                        <label htmlFor="year"> <font size="+1">Year</font></label>
                        <input 
                        id="year" 
                        type="text" 
                        placeholder="Movie Year" 
                        className="white-text"
                        onChange={event =>
                            this.setState({year: event.target.value })
                        }
                        />
                    </div>
                </div>
                <div className="row">
                  <div className="col s12">
                      <label htmlFor="description"> <font size="+1">Description</font></label>
                      <textarea
                      id="description" 
                      type="text" 
                      placeholder="Movie Description"
                      className="white-text"
                      onChange={event =>
                          this.setState({year: event.target.value })
                      }
                      />
                  </div>
                </div>

                <div className="row">
                  <div className="col s4">
                      <label htmlFor="thumbnail"> <font size="+1">Thumbnail URL</font></label>
                      <input 
                      id="thumbnail" 
                      type="text" 
                      placeholder="Movie Thumbnail URL"
                      className="white-text"
                      onChange={event =>
                          this.setState({year: event.target.value })
                      }
                      />
                  </div>
                  <div className="col s4 offset-s2">
                    <label htmlFor="trailer"> <font size="+1">Trailer URL </font></label>
                    <input 
                    id="trailer" 
                    type="text" 
                    placeholder="Movie Trailer URL" 
                    className="white-text"
                    onChange={event =>
                        this.setState({year: event.target.value })
                    }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col s3">
                      <label htmlFor="price"><font size="+1">Movie Price</font></label>
                      <input 
                          id="price" 
                          type="text" 
                          placeholder="Movie Price"
                          className="white-text"
                          onChange={event =>
                              this.setState({price: event.target.value })
                          }
                          />
                  </div>
                  <div className="col s3 offset-s1">
                    <label htmlFor="stock"><font size="+1">Movie Stock</font></label>
                    <input 
                        id="stock" 
                        type="text" 
                        placeholder="Avaliable Stock"
                        className="white-text"
                        onChange={event =>
                            this.setState({stock: event.target.value })
                        } 
                        />
                  </div>
                  <div className="col s4 offset-s1">
                      <label htmlFor="maturity"><font size="+1">Maturity Rating</font></label>
                      <input
                          id="maturity" 
                          type="text" 
                          placeholder="Maturity Rating" 
                          onChange={event =>
                              this.setState({maturity_rating: event.target.value })
                          } 
                          />
                  </div>
                </div>
                <div className="row">
                  <div className="col s12 center-align">
                    <button
                      className="waves-effect waves-light red darken-3 btn"
                      type="submit"
                      id="update_movies-btn"
                    >
                    Save Changes
                    </button> 
                  </div>
                </div>  
              </form> 
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