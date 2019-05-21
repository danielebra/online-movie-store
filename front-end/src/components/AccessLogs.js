// React and redux modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import isEmpty from '../../isEmpty';
import { getAllAccessLogs } from '../../actions/authActions';
import update from 'react-addons-update';
import _ from 'underscore';
import TableRow from '../UIElements/TableRow';
import M from 'materialize-css';

class AccessLogs extends Component {

    constructor() {
        super();

        
        this.state = {
            users: [],
            isEditing: [],
            errors: {}
        }
    }

    
    componentWillMount() {
        this.props.getAllAccessLogs();
    }

    componentDidMount() {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});
    }

    // Called when the component receives props
    componentWillReceiveProps(nextProps) {

    }

   


    deleteLog(index) {
        
    }

    render() {
        const { logs } = this.state;
        const currentUser = JSON.parse(localStorage.user);

        return (
            <div className="center top-padding account-details">
                <div className="container">
                    <div className="row">
                        <div className="col s12 center">
                            <h3> User Management </h3>
                            
                            <form noValidate>
                                <table className="table bordered highlight centered responsive-table management-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Log ID</th>
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
                                        { logs.length > 0 ? logs.map((log, index) => {
                                            return (

                                               

                                                 (
                                                    <tr>
                                                        <td>
                                                            {log.id}
                                                        </td>
                                                        <td>
                                                            {currentUser.id}
                                                        </td>
                                                        <td>
                                                            {currentUser.first_name}
                                                        </td>

                                                        <td>
                                                            {currentUser.last_name}
                                                        </td>

                                                        <td>
                                                            {currentUser.email}
                                                        </td>
                                                        <td>
                                                            {log.status}
                                                        </td>
                                                        <td>
                                                            {currentUser.time_stamp}
                                                        </td>
                                                        <td>
                                                            <i onClick={() => this.deleteUser(index)} className="material-icons ">delete</i>
                                                        </td>

                                                    </tr>
                                                )
                                            )
                                        }) : <tr> <td colspan="7" className="center"> No access log available. </td></tr>}
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

export default connect(mapStateToProps, { getAllAccessLogs })(AccessLogs);