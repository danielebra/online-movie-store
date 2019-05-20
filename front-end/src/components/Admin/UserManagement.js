// React and redux modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import isEmpty from '../../isEmpty';
import { getAllUsers, editUserAsAdmin, deleteUserAsAdmin, clearFeedback } from '../../actions/authActions';
import update from 'react-addons-update';
import _ from 'underscore';
import TableRow from '../UIElements/TableRow';
import M from 'materialize-css';

class UserManagement extends Component {

    constructor() {
        super();

        // contains a list of all users, an array to indicate which user is being edited and errors
        this.state = {
            users: [],
            isEditing: [],
            errors: {}
        }
    }

    // Get list of users before the component loads.
    componentWillMount() {
        this.props.getAllUsers();
    }

    componentDidMount() {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});
    }

    // Called when the component receives props
    componentWillReceiveProps(nextProps) {

        if (nextProps.auth) {
            const { user, users } = nextProps.auth;

            // We filter out the current user that is logged in so we dont display their data
            let usersToDisplay = users.filter(u => u.email !== user.email);

            // we create an array of bools based on how many users.
            let isEditing = new Array(usersToDisplay.length).fill(false);

            this.setState({ users: usersToDisplay, isEditing });

            console.log("usersToDisplay: ", usersToDisplay.length);
            console.log("isEditing: ", isEditing.length);
        }

        if (nextProps.errors){
          let errors = {};

            Object.keys(nextProps.errors) 
            .forEach(function eachKey(key) {
                errors[key] = nextProps.errors[key][0];
            });

            this.setState({ errors });
        }
    }

    // When the edit button is pressed this function takes the index and sets it to true so that it displays the editing mode for that user
    switchToEditingMode(index) {

        // we create a new array so that there wont be more than one user on editing mode at the same time
        let arr = new Array(this.state.users.length).fill(false);
        arr[index] = true; 

        this.state.isEditing = arr;
        this.forceUpdate()
    }
    
    // called when the exit button is pressed, returns to view mode
    closeEditingMode() {
        this.props.clearFeedback();

        let arr = new Array(this.state.users.length).fill(false);
        this.state.isEditing = arr;
        this.forceUpdate()
    }

    // passes the user details to redux 
    editUser(index) {
        this.props.clearFeedback();

        this.setState({ errors: {} });
        let newUserDetails = this.state.users[index];
        
        this.props.editUserAsAdmin(newUserDetails);

        if (!this.state.errors) {
            this.closeEditingMode();
        }
    }

    deleteUser(index) {
        this.props.clearFeedback();

        if (window.confirm("Are you sure you want to delete this user?")) {
            let user = this.state.users[index];
            this.props.deleteUserAsAdmin(user);
        }
    }

    render() {
        const { users, isEditing, errors } = this.state;
        const { feedback } = this.props;

        return (
            <div className="center top-padding account-details">
                <div className="container">
                    <div className="row">
                        <div className="col s12 center">
                            <h3> User Management </h3>
                            <div className="left">
                                <span className="helper-text success margin-btn"> { feedback } </span> 

                                { Object.keys(errors).map(function eachKey(key) {
                                    return <div className="helper-text error"> {key}: {errors[key]} </div>
                                })}

                            </div>
                            <form noValidate>
                                <table className="table bordered highlight centered responsive-table management-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">First Name</th>
                                            <th scope="col">Last Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Mobile Number</th>
                                            <th scope="col">Date of Birth</th>
                                            <th scope="col">Shipping Address</th>
                                            <th scope="col" colspan="3"><i class="material-icons previx">settings</i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { users.length > 0 ? users.map((user, index) => {
                                            return (

                                               isEditing[index] ? (
                                                    <tr>
                                                    {/* { Object.keys(user).map(function eachKey(key) {
                                                        if (key == 'id' || key =='is_admin' || key=='password')
                                                            return;
                                                        console.log(typeof(key));
                                                        <TableRow index={index} isEditing={isEditing[index]} value={user.key} onChange={event => { 
                                                            user[key] = event.target.value;
                                                            this.forceUpdate();
                                                        }} />
                                                    })} */}

                                                        <td>
                                                            <div className="input-field">
                                                                <input 
                                                                    type="text" 
                                                                    value={user.first_name}
                                                                    onChange={event => {
                                                                            users[index].first_name = event.target.value;
                                                                            this.forceUpdate();
                                                                        }
                                                                    } 
                                                                    className="validate"
                                                                    required
                                                                    aria-required=""
                                                                />
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="input-field">
                                                                <input 
                                                                    type="text" 
                                                                    value={user.last_name}
                                                                    onChange={event => {
                                                                            users[index].last_name = event.target.value;
                                                                            this.forceUpdate();
                                                                        }
                                                                    } 
                                                                    className="validate"
                                                                    required
                                                                    aria-required=""
                                                                />
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="input-field">
                                                                <input 
                                                                    type="email" 
                                                                    value={user.email}
                                                                    onChange={event => {
                                                                            users[index].email = event.target.value;
                                                                            this.forceUpdate();
                                                                        }
                                                                    } 
                                                                    className="validate"
                                                                    required
                                                                    aria-required=""
                                                                />
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="input-field">
                                                                <input 
                                                                    type="text" 
                                                                    value={user.mobile_number}
                                                                    onChange={event => {
                                                                            users[index].mobile_number = event.target.value;
                                                                            this.forceUpdate();
                                                                        }
                                                                    } 
                                                                    className="validate"
                                                                    required
                                                                    aria-required=""
                                                                />
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="input-field">
                                                                <input 
                                                                    type="text" 
                                                                    value={user.date_of_birth}
                                                                    onChange={event => {
                                                                            users[index].date_of_birth = event.target.value;
                                                                            this.forceUpdate();
                                                                        }
                                                                    } 
                                                                    className="validate"
                                                                    required
                                                                    aria-required=""
                                                                />
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <div className="input-field">
                                                                <input 
                                                                    type="text" 
                                                                    value={user.shipping_address}
                                                                    onChange={event => {
                                                                            users[index].shipping_address = event.target.value;
                                                                            this.forceUpdate();
                                                                        }
                                                                    } 
                                                                    className="validate"
                                                                    required
                                                                    aria-required=""
                                                                />
                                                            </div>
                                                        </td>

                                                        <td>
                                                            <i onClick={() => this.editUser(index)} className="material-icons ">save</i>
                                                        </td>

                                                        <td>
                                                            <i onClick={() => this.closeEditingMode()} className="material-icons ">close</i>
                                                        </td>

                                                    </tr>

                                                ) : (
                                                    <tr>
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
                                                            {user.mobile_number}
                                                        </td>

                                                        <td>
                                                            {user.date_of_birth}
                                                        </td>

                                                        <td>
                                                            {user.shipping_address}
                                                        </td>

                                                        <td>
                                                            <i onClick={() => this.switchToEditingMode(index)} className="material-icons ">edit</i>
                                                        </td>

                                                        <td>
                                                            <i onClick={() => this.deleteUser(index)} className="material-icons ">delete</i>
                                                        </td>

                                                    </tr>
                                                )
                                            )
                                        }) : <tr> <td colspan="7" className="center"> No users available. </td></tr>}
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
    auth: state.auth,
    errors: state.errors,
    feedback: state.feedback
});

export default connect(mapStateToProps, { getAllUsers, editUserAsAdmin, deleteUserAsAdmin, clearFeedback })(UserManagement);

/*
<td>

                                            { isEditing ? 
                                                <div className="row updateBtns">
                                                    <div className="col s2">
                                                        <button className="button-primary cancelBtn" onClick={() => this.toggle()}>Cancel</button>
                                                    </div>

                                                    <div className="col s2">
                                                        <button className="button-primary editSubmitBtn" onClick={() => this.editUser()}>Save</button>
                                                    </div>
                                                </div>
                                            : 
                                                <a className="btn-large editBtn" onClick={() => this.toggle()}>Edit Details <i className="material-icons">Edit</i></a>
                                            }
                                                 
                                            </td>

                                            <td>
                                                 <div className="col s2">
                                                    <button className="button-primary cancelBtn" onClick={() => this.deleteUser()}>Delete</button>
                                                </div>
                                            </td>




<div id="modal-delete" class="modal">
                                                            <div class="modal-content">
                                                            <h4 className="modal-title">Are you sure you want to delete this user?</h4>
                                                            </div>
                                                            <div class="modalFooter">
                                                                <a onClick={() => this.deleteUser(index)} class="waves-effect btn-flat">Yes</a>
                                                                <a href="#!" class="modal-close waves-effect btn-flat">No</a>
                                                            </div>
                                                        </div>





                                                    

*/