import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getMovieById } from '../actions/movieActions';

import Loading from '../components/Templates/loading';
import M from "materialize-css";
import Info from "./UIElements/Info";

class  PlaceOrder extends Component {

  constructor() {
    super();

    this.state = {
      orderID: 1000000,
      date: "10-05-2019",
      quantity: 1,
      shippingAddress: "",
      shippingFee: 9,
      totalPrice: 0
    }
  }
  
  componentWillMount() {

    // Checks if url contains id then passes the id to getMovieById
    if (this.props.match.params.id) {
      this.props.getMovieById(this.props.match.params.id);
    }
  }
  
  componentDidMount() {
    M.AutoInit();
  }

  addQuantity=(e) => {
    this.setState({quantity: this.state.quantity+1, totalPrice: (this.state.quantity+1)*this.props.movies.movie.price+this.state.shippingFee})
  }

  reduceQuantity=(e) => {
    if(this.state.quantity > 1){
      this.setState({quantity: this.state.quantity-1,  totalPrice: (this.state.quantity-1)*this.props.movies.movie.price+this.state.shippingFee})
    }
  }

    render(){
        const { shippingFee, totalPrice } = this.state;
        const { movie, loading } = this.props.movies; // we grab the movie object and loading from movies state
        let content; // display different content depedning when the page is loading

        console.log(movie);

        if (movie == null || loading) { // display loading while its fetching
          content = <Loading/>

        } else {
          content = (
            <div className="row">
            <div className="col s5">
              <img className="movieDetailsImg" src={movie.thumbnail} />
            </div>
            <div className="col s7">
              <h2 className="movieTitleDetail">
                {movie.title}
                <span className="year"> ({movie.year})</span>
              </h2>
              <div id="info" className="col s12">
                  <Info movie={movie} />
              </div>
               
              <div className="row">
              <div className="col s5">
              <span className="price"><font size="+3">${movie.price}</font></span>
              </div>
              <div className="col s5 offset-s2"> 
              <button type="button" className="col s4 waves-effect btn red darken-3" onClick={this.reduceQuantity}>-</button>
              <input id="quantity" className="col s4 white center-align" type="text" name="quantity" value={this.state.quantity} readOnly/>
              <button className="col s4 waves-effect btn red darken-3" onClick={this.addQuantity}>+</button>
              </div>
              </div>
              
              <h6>Shipping Address: 2/32 jone Street, Haymarket, Sydney, NSW 2000</h6>
             
              <div className="row">
              <h5>Shipping fee: ${shippingFee}</h5>
              </div>
              <div> 
                <h5 className="right-align"><font size="+5">Total: ${totalPrice.toFixed(2)}</font></h5>
              </div>
              <div className="col s4">
              <Link to={`/movie/${movie.id}`} className="waves-effect waves-light red darken-3 btn tooltipped" data-position="buttom" data-tooltip="Back to home page">Back </Link>
              </div>
              <div className="col s4">
              </div>
              <div className="col s4">
              <Link to="/order_success"><button className="waves-effect waves-light red darken-3 btn tooltipped" data-position="buttom" data-tooltip="Place this Order">Place</button></Link>
              </div>
            </div>
          </div>
          );
        }

    return (
      <div className="top-padding">
        <div className="container">
          <h2 align = "center">ORDER PLACEMENT</h2>
          {content}
        </div>
      </div>
    );
  }
  }

  // we map redux movies state to props so we can access it via this.props.movies
const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps, { getMovieById })(PlaceOrder);