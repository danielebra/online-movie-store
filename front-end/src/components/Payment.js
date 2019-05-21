import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getMovies } from '../actions/movieActions';

import OrderCard from "./UIElements/OrderCard"

import M from "materialize-css";

import Info from "./UIElements/Info";
import Reviews from "./UIElements/Reviews";
import Trailer from "./UIElements/Trailer";
class Payment extends Component{




    render()
    {
        return(
            
             <div className="purchase">
               <div className="container">
                 <form action="/action_page.php"></form>
                       <Link to="/payment"><h1>Payment page</h1></Link>
                       <h3>Billing Details</h3>
                       <label for="fname">Full Name</label>
                       <input type="text" id="fname" name="firstname" placeholder="Joe" />
                       <label for="email"><i class="fa fa-envelope"></i> Email</label>
                       <input type="text" id="email" name="email" placeholder="joe@example.com" />
                       <label for="adr"><i class="fa fa-address-card-o"></i> Address</label>
                       <input type="text" id="adr" name="address" placeholder="Pitt Street" />
                       <label for="city"> City</label>
                       <input type="text" id="city" name="city" placeholder="Sydney" />
                       <label for="state"> State</label>
                       <input type="text" id="city" name="state" placeholder="NSW" />
                       <label for="zip"> ZIP</label>
                       <input type="text" id="city" name="city" placeholder="2000" />
                       
                    

         
                       <h3>Payment</h3>
         <label>Accepted Cards</label><br></br>
         
          <label for="cname">Name on Card</label>
          <input type="text" id="cname" name="cardname" placeholder="Joe Joe" />
          <label for="ccnum">Credit card number</label>
          <input type="text" id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444" />
          <label for="expmonth">Exp Month</label>
          <input type="text" id="expmonth" name="expmonth" placeholder="September"></input>

          <div className="row">
            
              <label for="expyear">Exp Year</label>
              <input type="text" id="expyear" name="expyear" placeholder="2018" />
            
              <label for="cvv">CVV</label>
              <input type="text" id="cvv" name="cvv" placeholder="352" />
              <input type="checkbox" check="checked" name="sameadr" />
        <input type="submit" value="Pay" class="btn"></input>
            </div>
          </div>
        </div>
       
       )
    }
}

export default Payment;