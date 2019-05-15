import React, { Component } from "react";
import { Link } from "react-router-dom";
import success from '../images/success.png';

class OrderSuccess extends Component {

    render(){
        return(
            <div id="movieDetails">
            <div className="container">
            <div className="card gray">
            <div className="row">
            <div className="col s1"> 
            <img  src={success} width="85" height="60" />
            </div>
            <div className="col s11">
            <h5>Your Order is successfully placed, go to 'My Orders' to check orders</h5>
            </div>
            
            <div className="col 3s offset-s2">
            <Link to="/"><button className="waves-effect waves-light red darken-3 btn">Home</button></Link>
            </div>
            
            <div className="col 3s offset-s2">
            <button className="waves-effect waves-light red darken-3 btn">My Orders</button>
            
            </div>
           </div>
            </div>
            </div>
            </div>
            
        )
        
    }
}
export default OrderSuccess;