import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getMovies, searchMovies, editGenre, editMovie, deleteMovie } from '../actions/movieActions';
import Loading from '../components/Templates/loading';
import M from "materialize-css";

class UpdateMovie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moviesCount: 0,
      isEditing: [],
      search: '',
      genreName: '',
      selectedGenreId: '',
      selectedGenreName: ''
    };
  }

  componentWillMount() {
    this.props.getMovies();
  }

  search = event => {
    event.preventDefault();
    this.setState({ search: event.target.value }, () => {
      let query = this.state.search;
      this.props.searchMovies(query);
    });
  }

  setGenre(movieId, genreId) {
    console.log(genreId);
    editGenre(movieId, genreId);
  }

  //Saves changes to the database and closes editing mode
  editMovie(movie) {
    this.props.editMovie(movie);
    if (!this.state.errors) {
      this.closeEditingMode();
    }
  }
  //Deletes movie from database and refreshes state
  deleteMovie(movie) {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      this.props.deleteMovie(movie);

      if (this.state.search.length > 0) {
        setTimeout(() => {
          const { moviesList } = this.props.movies;

          let isEditing = new Array(moviesList.length).fill(false);

          this.setState({ isEditing });
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

  // Called when the exit button is pressed, Returns to view mode
  closeEditingMode(listLength) {

    let arr = new Array(listLength).fill(false);
    this.state.isEditing = arr;
    this.forceUpdate()
  }

  render() {
    let { moviesList, searchList, genres } = this.props.movies;
    let movieList = moviesList;
    if (searchList != null) {
      movieList = searchList;
    }
    let isEditing = this.state.isEditing

    if (movieList != null) {
      return (
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
                          <input id="search" type="search" onChange={this.search} />
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
                      <th scope="col">Maturity Rating</th>
                      <th scope="col" colSpan="3"><i className="material-icons previx">settings</i></th>
                    </tr>
                  </thead>
                  <tbody>
                    {movieList.length > 0 ? movieList.map((movie, index) => {
                      return (
                        //Editing Mode
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
                                  className="white-text"
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
                                  className="white-text"
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
                                  className="white-text"
                                />
                              </div>
                            </td>
                            <td>
                              <div>
                              <a className='dropdown-trigger btn' href='#' data-target='dropdown1'> {
                                  movie.genre.length == 0 ? 'Select' : movie.genre} </a>
                                <ul id="dropdown1" className='dropdown-content'> 
                                  {
                                    genres.map((genre, index) => {
                                      return <li onClick={() => console.log("aaa")/*this.setGenre(movie.id, genre.id)*/}><a href="#!">{genre.name}</a></li>
                                    })
                                  }
                                </ul>
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
                                  className="white-text"
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
                                  className="white-text"
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
                                  className="white-text"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="input-field">
                                <input
                                  type="number"
                                  value={movie.price}
                                  onChange={event => {
                                    movieList[index].price = event.target.value;
                                    this.forceUpdate();
                                  }
                                  }
                                  className="white-text"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="input-field">
                                <input
                                  type="number"
                                  value={movie.stock}
                                  onChange={event => {
                                    movieList[index].stock = event.target.value;
                                    this.forceUpdate();
                                  }
                                  }
                                  className="white-text"
                                />
                              </div>
                            </td>
                            <td>
                              <div className="input-field">
                                <input
                                  type="text"
                                  value={movie.maturity_rating}
                                  onChange={event => {
                                    movieList[index].maturity_rating = event.target.value;
                                    this.forceUpdate();
                                  }
                                  }
                                  className="white-text"
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

                        ) : ( //View Mode
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
                                <div className="size-inputs">
                                  {movie.thumbnail}
                                </div>
                              </td>
                              <td>
                                <div width="30px">
                                  {movie.trailer_link}
                                </div>
                              </td>
                              <td>
                                {movie.price}
                              </td>
                              <td>
                                {movie.stock}
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
                    ) : <tr> <td colspan="7" className="center"> No movies available. </td></tr>}
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
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

export default connect(mapStateToProps, { getMovies, searchMovies, editGenre, editMovie, deleteMovie })(UpdateMovie);
