import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getOrders, getMovieById} from '../actions/movieActions';
import api from '../api';
import DatePicker from 'react-datepicker';

import OrderCard from "./UIElements/OrderCard"

import M from "materialize-css";

import Info from "./UIElements/Info";
import Reviews from "./UIElements/Reviews";
import Trailer from "./UIElements/Trailer";

class UserOrders extends Component{
    constructor() {
        super();
        this.state={
            searchDate: new Date()
        }; 
    }
    
    componentWillMount() {
        this.props.getOrders();
    }

    handleChange=(date)=>{
        this.setState({
            searchDate: date
        })
        
    }

    reformatDate=(date)=>{
        let year = date.getFullYear()
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        let dateFormat = day + "/" + month + "/" + year

        return dateFormat
   }

   isFilter=()=>{
       return this.state.searchDate===null ? false:true
   }
   
   filtering=(orders, filterDate)=>{
       return orders.filter(order => this.reformatDate(new Date(order.date.toLocaleString())) === this.reformatDate(filterDate))
   }

   orderTable=(orders)=>{
    if(this.isFilter()) {
        orders = this.filtering(orders, this.state.searchDate)
    }
    return( orders.length > 0 ? orders.map((order, index) => {
        let orderDate = new Date(order.date).toLocaleString()
     return (
         (
            <tr>
                <td>
                    {order.id}
                </td>
                <td>
                    {order.title}
                </td>

                <td>
                    {orderDate}
                </td>

                <td>
                    {order.quantity}
                </td>
                <td>
                    {order.total_cost}
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
        ))
    }) : (<div className="center">No orders</div>)
    )
}

    render(){
        let { orders } = this.props.movies;
        let orderList = "";
        console.log(this.props.movies);

        return(
            <div className="center top-padding account-details">
                <div className="container">
                    <div className="row">
                        <div className="col s12 center">
                            <h3> Order Management </h3>
                           
                            <DatePicker className="white-text" 
                                        placeholderText="Click to select a date"
                                        selected={this.state.searchDate}
                                        onChange={this.handleChange}
                                        dateFormat="dd/MM/yyyy"
                                        />

                            <form noValidate>
                                <table className="table bordered highlight centered responsive-table management-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Order ID</th>
                                            <th scope="col">Movie Title</th>  
                                            <th scope="col">Date</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">price</th>
                                            <th scope="col"><i class="material-icons previx">settings</i></th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {this.orderTable(orders) }

                                    </tbody>
                                </table>
                            </form>
                 
            <Link to="/"><button className="waves-effect waves-light red darken-3 btn">Add Movies</button></Link>
        
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