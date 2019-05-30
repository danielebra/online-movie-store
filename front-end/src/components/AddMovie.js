import React, { Component } from "react";
import "../styles/_addmovie.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { addMovie, getMovies, addGenre } from "../actions/movieActions";

import Loading from "../components/Templates/loading";
import M from "materialize-css";
import Info from "./UIElements/Info";

class AddMovie extends Component {
  constructor(props){
        super(props)
        this.state={
            title: "",
            year: "",
            description: "",
            thumbnail: "",
            trailer_link: "",
            price: 0,
            maturity_rating: 0,
            stock: 0,
            selectedGenreId:"",
            selectedGenreIndex: "",
            genreActive: false
        }; 
    }

    componentDidMount() {
      var elems = document.querySelectorAll('.dropdown-trigger');
      M.Dropdown.init(elems, {});
      this.props.getMovies();
    }

    toggle(){
      this.setState({genreActive : true, selectedGenreIndex: "other"})
    }

    setGenre(id, index){
      this.setState({selectedGenreId: id, selectedGenreIndex: index, genreActive: false});
    }


    //Sends movie details to movieActions/addMovie
   onSubmit = event => {
        event.preventDefault();
        const movieDetails = {
            title: this.state.title,
            year: this.state.year,
            description: this.state.description,
            thumbnail: this.state.thumbnail,
            trailer_link: this.state.trailer_link,
            price: this.state.price,
            maturity_rating: this.state.maturity_rating,
            purchase_count: 0,
            stock: this.state.stock,
        }        
        let genreId = this.state.selectedGenreId;
        console.log("hello" , genreId);
        if(genreId == "other"){
          this.props.addGenre(this.state.genreName);
          this.props.movies.genres.map(genre => {
            if(genre.name = this.state.genreName){
              genreId = genre.id;
              this.props.addMovie(movieDetails, genreId, this.props.history);
            }  
          });
        }
        else{
          console.log(genreId);
          this.props.addMovie(movieDetails, genreId, this.props.history);
        }
       }
  
  render() {

    const { genres } = this.props.movies;
    const { selectedGenreIndex } = this.state;

    return (
      <div className="top-padding">
        <div className="container">
          <h2 className="center-align">Add Movie</h2>
          <hr></hr>
          <br></br>
          <form onSubmit={this.onSubmit}>
            <ul className="flex-outer">
              <li>
                <ul className="flex-inner">
                  <li >
                    <div>
                      <label htmlFor="title">
                        <font size="+1">Movie Title</font>
                      </label>
                      <input
                        id="title"
                        type="text"
                        placeholder="Enter title of movie"
                        className="white-text" 
                        onChange={event =>this.setState({title : event.target.value})}
                      />
                    </div>
                  </li>
                  <li>
                    <div>
                      <label htmlFor="year">
                        <font size="+1">Movie Year</font>
                      </label>
                      <input
                        id="year"
                        type="number"
                        placeholder="Enter year of movie"
                        className="white-text" 
                        onChange={event =>this.setState({year : event.target.value})}
                      />
                    </div>
                  </li>
                  <li> 
                    <div>
                      <label htmlFor="genre">
                        <font size="+1">Genre</font>
                      </label>
                      </div>
                      <div>
                      <a className= 'dropdown-trigger btn' href='#' data-target='dropdown1'> { 
                          selectedGenreIndex === "" ? 'Select a Genre' :  
                          selectedGenreIndex=== "other"? 'Other' :
                          genres[selectedGenreIndex].name} </a>

                      <ul id="dropdown1" className='dropdown-content'>
                        {
                          genres.map((genre, index) => {
                            return <li onClick={() => this.setGenre(genre.id, index)}><a href="#!">{genre.name}</a></li>
                          }
                        )}
                        <li onClick={() => this.toggle()}><a href="#!">Other</a></li>
                      </ul>
                      <div id="genreLine">
                          <input
                            id="genreLine"
                            type="text"
                            placeholder="Enter new genre"
                            className={this.state.genreActive ? "show" : "hide"}
                            onChange={event =>this.setState({genreName : event.target.value})}
                          />
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li style={{ height: 150 }}>
                <div style={{ width: "100%" }}>
                  <label htmlFor="description">
                    <font size="+1">Description</font>
                  </label>
                  <textarea
                    id="description"
                    type="text"
                    placeholder="Enter movie description"
                    rows="6"
                    resize="none"
                    style={{ height: "100%", resize: "none" }}
                    className="white-text" 
                    onChange={event =>this.setState({description : event.target.value})}
                  />
                </div>
              </li>
              <li>
                <div>
                  <label htmlFor="thumbnail">
                    <font size="+1">Thumbnail URL</font>
                  </label>
                  <input
                    id="thumbnail"
                    type="text"
                    placeholder="Enter a URL for Thumbnail"
                    className="white-text" 
                    onChange={event =>this.setState({thumbnail : event.target.value})}
                  />
                </div>
              </li>
              <li>
                <div>
                  <label htmlFor="trailer">
                    <font size="+1">Trailer URL</font>
                  </label>
                  <input
                    id="trailer_link"
                    type="text"
                    placeholder="Enter a URL for Trailer"
                    className="white-text" 
                    onChange={event =>this.setState({trailer_link : event.target.value})}
                  />
                </div>
              </li>
              <li>
                <ul class="flex-inner">
                  <li>
                    <div>
                      <label htmlFor="price">
                        <font size="+1">Movie Price</font>
                      </label>
                      <input
                        id="price"
                        type="number"
                        min="0" max="1000"
                        placeholder="Movie price"
                        className="white-text" 
                        onChange={event =>this.setState({price : event.target.value})}
                      />
                    </div>
                  </li>
                  <li>
                    <div>
                      <label htmlFor="stock">
                        <font size="+1">Movie Stock</font>
                      </label>
                      <input
                        id="number"
                        min="0" max="1000"
                        placeholder="Avaliable stock"
                        className="white-text" 
                        onChange={event =>this.setState({stock : event.target.value})}
                      />
                    </div>
                  </li>

                  <li>
                    <div>
                      <label htmlFor="maturity">
                        <font size="+1">Maturity Rating</font>
                      </label>
                      <input
                        id="maturity_rating"
                        type="text"
                        placeholder="Enter maturity rating"
                        className="white-text" 
                        onChange={event =>this.setState({maturity_rating : event.target.value})}
                      />
                    </div>
                  </li>
                </ul>
              </li>
              <li className="btn-style">
                <Link to="/" className="waves-effect waves-light red darken-3 btn">
                  Cancel
                </Link>
                <button className="waves-effect waves-light red darken-3 btn">
                  Submit
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps,{addMovie, getMovies, addGenre})(AddMovie);
