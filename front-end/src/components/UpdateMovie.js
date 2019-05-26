import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getMovies, searchMovies, editMovie, deleteMovie } from '../actions/movieActions';
import Loading from '../components/Templates/loading';
import M from "materialize-css";

class UpdateMovie extends Component{
  constructor(props){
    super(props)
    this.state={
        moviesCount :0,
        isEditing: [],
        search:''
    }; 
  }
  
    componentWillMount() {
      this.props.getMovies();
      }

      setMovie(index){
        console.log(this.moviesList[index])
        this.setState({selectedMovie: index})
      }

      search = event => {
        event.preventDefault();
    
        this.setState({ search: event.target.value}, () => {
          let query = this.state.search;
          this.props.searchMovies(query);
        });
      }

      editMovie(movie) {
        
        this.props.editMovie(movie);

        if (!this.state.errors) {
            this.closeEditingMode();
        }

    }
      deleteMovie(movie) {
        if (window.confirm("Are you sure you want to delete this movie?")) {
            this.props.deleteMovie(movie);
            
            if (this.state.search.length > 0) {
                setTimeout(() => {
                    const { moviesList } = this.props.movies;

                    let isEditing = new Array(moviesList.length).fill(false);
                    
                    this.setState({isEditing});
                }, 300);
            }
        }
    }

      switchToEditingMode(listLength, index) {

        // we create a new array so that there wont be more than one user on editing mode at the same time
        let arr = new Array(listLength).fill(false);
        arr[index] = true; 

        this.state.isEditing = arr;
        this.forceUpdate()
    }
    
    // called when the exit button is pressed, returns to view mode
    closeEditingMode(listLength) {
        //this.props.clearFeedback();
        
        let arr = new Array(listLength).fill(false);
        this.state.isEditing = arr;
        this.forceUpdate()
    }
      onSubmit(){
      }

      render() {
        let { moviesList, searchList } = this.props.movies;
        let movieList = moviesList;
        if(searchList != null){
          if(searchList.length > 0){
            movieList = searchList
            console.log(movieList);
          }
        }  
        let isEditing = this.state.isEditing
        
        if(movieList != null){
          return(
            <div className="top-padding">
              <div id="movieDetails">
                <div className="container">
                  <div className="row details">
                    <h1 className="center-align"> Update/Remove Movie </h1>
                   
                  </div>
                  <div className="row center">
                      <div className="col s12">
                          <nav className="search-users">
                              <div className="nav-wrapper">
                                  <form id="search-form">
                                      <div className="input-field">
                                          <input id="search" type="search" onChange={this.search}/>
                                          <label className="label-icon" htmlFor="search">
                                              <i className="material-icons">search</i>
                                          </label>
                                      </div>
                                  </form>
                              </div>
                          </nav>
                      </div>
                  </div>
                            
                  <h3> Movie Details</h3>
                  <form className="col 10" onSubmit={this.onSubmit}>

            
                    <table className="table bordered highlight centered responsive-table management-table">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Title</th>
                          <th scope="col">Year</th>
                          <th scope="col">Genre</th>
                          <th scope="col">Description</th>
                          <th scope="col">Thumbnail URL</th>
                          <th scope="col">Trailer Link</th>
                          <th scope="col">Price</th>
                          <th scope="col">Stock</th>
                          <th scope="col">Purchased Amount</th>
                          <th scope="col">Maturity Rating</th>
                          <th scope="col" colspan="3"><i class="material-icons previx">settings</i></th>
                        </tr>
                      </thead>
                      <tbody>
                        { movieList.length > 0 ? movieList.map((movie, index) => {
                            return (
                              isEditing[index] ? (
                                <tr>
                                    <td>
                                        <div className="input-field">
                                            <input 
                                                type="text" 
                                                value={movie.id}
                                                onChange={event => {
                                                        movieList[index].id = event.target.value;
                                                        this.forceUpdate();
                                                    }
                                                } 
                                                className="validate"
                                                required
                                                aria-required=""
                                            />
                                        </div>
                                    </td>

                                    <td>
                                        <div className="input-field">
                                            <input 
                                                type="text" 
                                                value={movie.title}
                                                onChange={event => {
                                                        movieList[index].title = event.target.value;
                                                        this.forceUpdate();
                                                    }
                                                } 
                                                className="validate"
                                                required
                                                aria-required=""
                                            />
                                        </div>
                                    </td>

                                    <td>
                                        <div className="input-field">
                                            <input 
                                                type="text" 
                                                value={movie.year}
                                                onChange={event => {
                                                      movieList[index].year = event.target.value;
                                                        this.forceUpdate();
                                                    }
                                                } 
                                                className="validate"
                                                required
                                                aria-required=""
                                            />
                                        </div>
                                    </td>

                                    <td>
                                        <div className="input-field">
                                            <input 
                                                type="email" 
                                                value={movie.genre}
                                                onChange={event => {
                                                  movieList[index].genre = event.target.value;
                                                        this.forceUpdate();
                                                    }
                                                } 
                                                className="validate"
                                                required
                                                aria-required=""
                                            />
                                        </div>
                                    </td>

                                    <td>
                                        <div className="input-field">
                                            <input 
                                                type="text" 
                                                value={movie.description}
                                                onChange={event => {
                                                    movieList[index].description = event.target.value;
                                                    this.forceUpdate();
                                                  }
                                                } 
                                                className="validate"
                                                required
                                                aria-required=""
                                            />
                                        </div>
                                    </td>

                                    <td>
                                        <div className="input-field">
                                            <input 
                                                type="text" 
                                                value={movie.thumbnail}
                                                onChange={event => {
                                                    movieList[index].thumbnail = event.target.value;
                                                    this.forceUpdate();
                                                  }
                                                } 
                                                className="validate"
                                                required
                                                aria-required=""
                                            />
                                        </div>
                                    </td>

                                    <td>
                                        <div className="input-field">
                                            <input 
                                                type="text" 
                                                value={movie.trailer_link}
                                                onChange={event => {
                                                    movieList[index].trailer_link = event.target.value;
                                                    this.forceUpdate();
                                                  }
                                                } 
                                                className="validate"
                                                required
                                                aria-required=""
                                            />
                                        </div>
                                    </td>

                                    <td>
                                        <i onClick={() => this.editMovie(movieList[index])} className="material-icons pointer">save</i>
                                    </td>

                                    <td>
                                        <i onClick={() => this.closeEditingMode(movieList.length)} className="material-icons pointer">close</i>
                                    </td>

                                </tr>

                            ) : (
                                    <tr className="min-width">
                                      <td>
                                        {movie.id}
                                      </td>
                                      <td>
                                       {movie.title}
                                     </td>
                                     <td>
                                       {movie.year}
                                     </td>
                                     <td>
                                       {movie.genre}
                                     </td>
                                     
                                      <td>
                                      <div className="size-inputs">
                                        {movie.description}
                                        </div>
                                      </td>
                                     <td>
                                       
                                        {movie.thumbnail}
                                       
                                     </td>
                                     <td>
                                       {movie.trailer_link}
                                     </td>
                                     <td>
                                       {movie.price}
                                     </td>
                                     <td>
                                       {movie.stock}
                                     </td>
                                     <td>
                                       0
                                     </td>
                                     <td>
                                       {movie.maturity_rating}
                                     </td>
                                     <td>
                                      <i onClick={() => this.switchToEditingMode(movieList.length, index)} className="material-icons pointer">edit</i>
                                    </td>
                                    <td>
                                        <i onClick={() => this.deleteMovie(movie)} className="material-icons pointer">delete</i>
                                    </td>
                                    </tr>
                            )
                          )
                            }   
                          ): <tr> <td colspan="7" className="center"> No movies available. </td></tr>}
                        } 
                        
                      </tbody>
                    </table> 
                  </form>
                </div>
              </div>
            </div>
          )
      }
      else{
        return(
          <div className="top-padding">
            <div id="movieDetails">
              <div className="container">
                <div className="row details">
                  <h1 className="center-align"> Update/Remove Movie </h1>
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
}

const mapStateToProps = state => ({
    movies: state.movies
  });
  
  export default connect(mapStateToProps, { getMovies, searchMovies, editMovie, deleteMovie })(UpdateMovie);