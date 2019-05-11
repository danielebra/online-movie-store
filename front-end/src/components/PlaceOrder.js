import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import movie1 from "../images/movies/14546619.jpg";
import movie2 from "../images/movies/60023619.jpg";
import movie3 from "../images/movies/70011274.jpg";

import M from "materialize-css";

import Info from "./UIElements/Info";
import Reviews from "./UIElements/Reviews";
import Trailer from "./UIElements/Trailer";

class  PlaceOrder extends Component {





  
  componentDidMount() {
    
    M.AutoInit();
    if (this.props.match.params.name) {
     
    }
  }

  constructor(props) {
    super(props);
    
    this.state = {
        
            movie: {
                name: "The Exorcist",
                image: movie1,
                genre: "Action, Comedy, Sc-Fi",
                year: 1973,
                price: 23.99,
                maturityRating: "MA",
            },
            orderID: 1000000,
            date: "10-05-2019",
            quantity: 1,
            shippingAddress: "",
            shippingFee: 9,
            totalPrice: 0
        
      
      }
    };
    addQuantity=(e) => {
      this.setState({quantity: this.state.quantity+1, totalPrice: (this.state.quantity+1)*this.state.movie.price+this.state.shippingFee})
      
    }
    reduceQuantity=(e) => {
      if(this.state.quantity > 1){
        this.setState({quantity: this.state.quantity-1,  totalPrice: (this.state.quantity-1)*this.state.movie.price+this.state.shippingFee})
      }
     
    }

    
    render(){
      
        const { movie, shippingFee, totalPrice } = this.state;
    return (
      <div id="movieDetails">
        <div className="container">
          <h2 align = "center">Order placement</h2>
          <div className="row">
            <div className="col s5">
              <img className="movieDetailsImg" src={this.state.movie.image} />
            </div>

            <div className="col s7">
              <h2 className="movieTitleDetail">
                {movie.name}
                <span className="year">({movie.year})</span>
                <br />
              </h2>
              <div id="info" className="col s12">
                  <Info movie={movie} />
                </div>
              <div className="col s5"> 
              <font size="+3">${movie.price} </font>
              </div>
              <div className="col s5 offset-s2"> 
              <button type="button" className="col s4 waves-effect btn red darken-3" onClick={this.reduceQuantity}>-</button>
              <input id="quantity" className="col s4 white center-align" type="text" name="quantity" value={this.state.quantity} readOnly/>
              <button className="col s4 waves-effect btn red darken-3" onClick={this.addQuantity}>+</button>
              </div>
              <label>Shipping Address<div class="white">
                <select >
                  <option value="enterAddress" disabled selected>Choose your address</option>
                  <option value="address1">address1</option>
                  <option value="address2">address2</option>
                </select>
              </div></label>
              <div className="col s12">
              <label><font size="+1">Shipping fee: ${shippingFee}</font></label>
              </div>
              <div className="col s7 offset-s5"> 
                <h5 className="right-align"><font size="+5">Total: ${totalPrice.toFixed(2)}</font></h5>
              </div>
              <div className="col s4">
              <Link to="/"><a className="waves-effect waves-light red darken-3 btn tooltipped" data-position="buttom" data-tooltip="Back to home page">Cancel</a></Link>
              </div>
              <div className="col s4">
              </div>
              <div className="col s4">
              <a className="waves-effect waves-light red darken-3 btn tooltipped" data-position="buttom" data-tooltip="Place this Order">Place</a>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
  
  
  }
  export default PlaceOrder;