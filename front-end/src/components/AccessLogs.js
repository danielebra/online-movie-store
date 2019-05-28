// React and redux modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { getAllAccessLogs, deleteLog } from '../actions/authActions';
import update from 'react-addons-update';
import _ from 'underscore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import M from 'materialize-css';

class AccessLogs extends Component {

    constructor() {
        super();
        this.state={
            searchDate: new Date(),
        };
    }
    
    componentWillMount() {
        this.props.getAllAccessLogs();
    }

    componentDidMount() {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});
        console.log(this.state.logs)
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
   
   filtering=(logs, filterDate)=>{
       // Debuging code 
    //    console.log(this.reformatDate(filterDate));
    //    logs.forEach(log => {
    //        console.log(this.reformatDate(new Date(log.time_stamp.toLocaleString())));
    //    })
       return logs.filter(log => this.reformatDate(new Date(log.time_stamp.toLocaleString())) === this.reformatDate(filterDate))
   }

   logTable=(logs, user)=>{
       if(this.isFilter()){
           logs = this.filtering(logs, this.state.searchDate)
       }
       return( logs.length > 0 ? logs.map((log, index) => {
           let logTime = new Date(log.time_stamp).toLocaleString()
        return (
            (
               <tr>
                   <td>
                       {user.id}
                   </td>
                   <td>
                       {user.first_name}
                   </td>

                   <td>
                       {user.last_name}
                   </td>

                   <td>
                       {user.email}
                   </td>
                   <td>
                       {log.status}
                   </td>
                   <td>
                       {logTime}
                   </td>
                   <td>
                       <i  onClick={() => this.deleteLog(log)} className="material-icons pointer">delete</i>
                   </td>

               </tr>
           )
       )
    }) : <tr> <td colspan="7" className="center"> No access log available. </td></tr>)
   }

    deleteLog(log) {
        if (window.confirm("Are you sure you want to delete this log?")) {
            this.props.deleteLog(log);
            
            console.log(this.state)
        }
    }

    render() {
       
        const { logs, user } = this.props.auth;
        console.log(logs);
        return (
            <div className="center top-padding account-details">
                <div className="container">
                    <div className="row">
                        <div className="col s12 center">
                            <h3> Access Logs </h3>
                            
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
                                            <th scope="col">User ID</th>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Log Type</th>
                                            <th scope="col">Log Date</th>
                                            <th scope="col" colspan="3"><i class="material-icons previx">settings</i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.logTable(logs, user) }
                                    </tbody>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { getAllAccessLogs, deleteLog })(AccessLogs);