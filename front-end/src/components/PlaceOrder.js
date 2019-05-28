import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getMovieById, addOrder} from '../actions/movieActions';

import Loading from '../components/Templates/loading';
import M from "materialize-css";
import Info from "./UIElements/Info";

class  PlaceOrder extends Component {

  constructor() {
    super();

    this.state = {
      quantity: 1,
      totalPrice: 0,
      shippingFee: 7
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

  componentWillReceiveProps(nextProps) {

    if (nextProps.movies.movie) {
      const { quantity, shippingFee } = this.state;
      const { movie } = nextProps.movies;
      let totalPrice = (movie.price * quantity) + shippingFee;
      
      this.setState({ totalPrice });
    }
  }

  addQuantity=(e) => {
    this.setState({
      quantity: this.state.quantity+1, 
      totalPrice: (this.state.quantity+1)*this.props.movies.movie.price+this.state.shippingFee
    })
  }

  reduceQuantity=(e) => {
    if(this.state.quantity > 1){
      this.setState({
        quantity: this.state.quantity-1,  
        totalPrice: (this.state.quantity-1)*this.props.movies.movie.price+this.state.shippingFee
      })
    }
  }
  
  makeOrder=() => {
    let order = {
      quantity: this.state.quantity,
      discount_modifier: 0,
      total_cost: this.state.totalPrice,
      order_type: 'Delivery',
      user: this.props.auth.user.id,
      movie: this.props.movies.movie.id
    }
    this.props.addOrder(order)
  }

    render(){
        const { shippingFee, totalPrice } = this.state;
        const { movie, loading } = this.props.movies; // we grab the movie object and loading from movies state
        let content; // display different content depedning when the page is loading
 
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
              
              <div className="row" style={{marginTop: 50}}>
                <div className="address">
                  <h6>Shipping Address: 2/32 jone Street, Haymarket, Sydney, NSW 2000</h6>
                </div>
              
                <div className="prices">
                  <h6>Movie price: <b>${movie.price}</b></h6>
                  <h6>Shipping fee: <b>${shippingFee}</b></h6>
                </div>
              </div>

              <div className="row">
              <div className="col s5 quantityPicker"> 
                <button type="button" className="col s4 waves-effect btn red darken-3" onClick={this.reduceQuantity}>-</button>
                <input id="quantity" className="col s4 white center-align" type="text" name="quantity" value={this.state.quantity} readOnly/>
                <button className="col s4 waves-effect btn red darken-3" onClick={this.addQuantity}>+</button>
              </div>

              <div> 
                <h5 className="right-align"><font size="+5">Total: ${totalPrice}</font></h5>
              </div>  
              </div>
              
              <div className="col s4">
              <Link to={`/movie/${movie.id}`} className="waves-effect waves-light red darken-3 btn tooltipped" data-position="buttom" data-tooltip="Back to home page">Back </Link>
              </div>
              <div className="col s4">
              </div>
              <div className="col s4">
              <Link to="/order_success"><button onClick = {this.makeOrder} className="waves-effect waves-light red darken-3 btn tooltipped" data-position="buttom" data-tooltip="Place this Order">Place</button></Link>
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
  movies: state.movies,
  auth: state.auth
});

export default connect(mapStateToProps, { getMovieById, addOrder})(PlaceOrder);