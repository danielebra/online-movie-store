import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getOrders, getMovieById} from '../actions/movieActions';
import api from '../api';

import OrderCard from "./UIElements/OrderCard"

import M from "materialize-css";

import Info from "./UIElements/Info";
import Reviews from "./UIElements/Reviews";
import Trailer from "./UIElements/Trailer";

class UserOrders extends Component{
    constructor() {
        super();
        
    }
    //state = {
     //  orders:[]
    //}
    componentWillMount() {
       /* api.get("order/").then(res =>  {
            console.log("isndie order request");
            let order = res.data;
            this.setState({orders:res.data});
        }); */
        this.props.getOrders();

      }
    


    render(){
        const { orders } = this.props.movies;
        console.log(this.props.movies)
        const orderList = (orders.length)?(
            orders.map(order => {
                
                return(
                <tr>
                <td>
                    {order.id}
                </td>
                <td>
                    title
                </td>

                <td>
                    {order.date}
                </td>

                <td>
                    {order.quantity}
                </td>
                <td>
                    {order.total_cost}
                </td>
                <td>
                    {order.movie}
                </td> 
                <td>
                    <td>
                        <i  className="material-icons pointer">edit</i>
                    </td>
                    <td>
                    <i  className="material-icons pointer">delete</i>
                    </td>
                </td>
            </tr>
            )})
        ):(<div className="center">No orders</div>);
        return(
            <div className="center top-padding account-details">
                <div className="container">
                    <div className="row">
                        <div className="col s12 center">
                            <h3> Order Management </h3>
                           
                            <form id="register"  noValidate>
                <input className="col s4 offset-s4 white" type="text" placeholder="Enter order number"></input>
                <button className="col s1 waves-effect waves-light btn red darken-3"><i className="material-icons right">search</i></button>
                <div className="col s3"></div>
                <div className="col 3s offset-s2">
                <form noValidate>
                                <table className="table bordered highlight centered responsive-table management-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Order ID</th>
                                            <th scope="col">Movie Title</th>  
                                            <th scope="col">Date</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">price</th>
                                            <th scope="col">Movie ID</th>
                                            <th scope="col"><i class="material-icons previx">settings</i></th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderList}
                                    </tbody>
                                </table>
                            </form>
                 
            <Link to="/"><button className="waves-effect waves-light red darken-3 btn">Add Movies</button></Link>
            </div>
            
            
        
             </form>
            </div>
          
            </div>
            </div>
            </div>
           
        )
    }
}

const mapStateToProps = state => ({
    movies: state.movies
});

// Connect actions to use within react and export component
export default connect(mapStateToProps, { getOrders,getMovieById })(withRouter(UserOrders));