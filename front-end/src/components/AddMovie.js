import React, { Component } from "react";
import "../styles/_addmovie.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { addMovie } from "../actions/movieActions";

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
            purchase_count:"",
            stock: 0,
            selectedGenreId:""
            
        }; 
    }

    getGenreId(index){
      this.setState({selectedGenreId: index})
      console.log(index);
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
            purchase_count: this.state.purchase_count,
            stock: this.state.stock,
        }
       this.props.addMovie(movieDetails);
    }
  
  render() {
    return (
      <div className="top-padding">
        <div className="container">
          <h2 className="center-align">Add Movie</h2>
          <hr></hr>
          <br></br>
          <form>
            <ul className="flex-outer">
              <li>
                <ul class="flex-inner">
                  <li >
                    <div>
                      <label for="title">
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
                      <label for="year">
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
                      <label for="genre">
                        <font size="+1"> Movie Genre(s)</font>
                      </label>
                      <a className= 'dropdown-trigger btn' href='#' data-target='dropdown1'> Select a Genre</a>
                      <ul id="dropdown1" className='dropdown-content'>
                        {
                          this.props.movies.genres.map(genre =>
                          <li><a onClick={() => this.getGenreId(genre.id)} href="#!">{genre.name}</a></li>
                        )}
                      </ul>
                    </div>
                  </li>
                </ul>
              </li>
              <li style={{ height: 150 }}>
                <div style={{ width: "100%" }}>
                  <label for="description">
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
                  <label for="thumbnail">
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
                  <label for="trailer">
                    <font size="+1">Trailer URL</font>
                  </label>
                  <input
                    id="trailer_link"
                    type="text"
                    placeholder="Enter a URL for Trailer"
                    className="white-text" 
                    onChange={event =>this.setState({trailer : event.target.value})}
                  />
                </div>
              </li>
              <li>
                <ul class="flex-inner">
                  <li>
                    <div>
                      <label for="price">
                        <font size="+1">Movie Price</font>
                      </label>
                      <input
                        id="price"
                        type="number"
                        placeholder="Movie price"
                        className="white-text" 
                        onChange={event =>this.setState({price : event.target.value})}
                      />
                    </div>
                  </li>
                  <li>
                    <div>
                      <label for="stock">
                        <font size="+1">Movie Stock</font>
                      </label>
                      <input
                        id="number"
                        placeholder="Avaliable stock"
                        className="white-text" 
                        onChange={event =>this.setState({stock : event.target.value})}
                      />
                    </div>
                  </li>

                  <li>
                    <div>
                      <label for="maturity">
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
                <button className="waves-effect waves-light red darken-3 btn" onSubmit={this.onSubmit}>
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

export default connect(
  mapStateToProps,
  { addMovie }
)(AddMovie);
