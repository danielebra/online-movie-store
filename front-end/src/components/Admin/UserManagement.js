// React and redux modules
import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from '../../isEmpty';
import { getAllUsers, addUserAsAdmin, searchUser, editUserAsAdmin, deleteUserAsAdmin, clearFeedback, clearErrors } from '../../actions/authActions';
import _ from 'underscore';
import M from 'materialize-css';
import $ from 'jquery';

class UserManagement extends Component {

    constructor() {
        super();

        // contains a list of all users, an array to indicate which user is being edited and errors
        this.state = {
            users: [],
            isEditing: [],
            errors: {},
            newUserErrors: {},
            usersCount: 0,
            search: '',
            modalClosed: true,
            removed: false,
            newUser: {
                first_name: "",
                last_name: "",
                email: "",
                mobile_number: "",
                date_of_birth: Date,
                password: "",
                passwordConfirm: "",
                is_admin: false
            }
        }
    }

    // Get list of users before the component loads.
    componentWillMount() {
        this.props.getAllUsers();
    }

    // Initialising materialise JS components (selectors, modals)
    componentDidMount() {
        var elems = document.querySelectorAll('.modal');
        var options = {
            onOpenStart: () => this.modalOpening(),
            onCloseStart: () => this.modalClosing()
        }
        M.Modal.init(elems, options);

        var elemsx = document.querySelectorAll('.tooltipped');
        var instances = M.Tooltip.init(elemsx);

        M.AutoInit();
        $('#search-form').submit(false);
    }

    // Even handler called when modal opens
    modalOpening() {
        this.props.clearFeedback();
        this.setState({ 
                newUser: {
                first_name: "",
                last_name: "",
                email: "",
                mobile_number: "",
                date_of_birth: Date,
                password: "",
                passwordConfirm: "",
                is_admin: false
            } 
        });
    }

    // Event handler called when modal closed
    modalClosing() {
        this.props.clearErrors();
        this.setState({ errors: {} });
    }

    // Called when the component receives props
    componentWillReceiveProps(nextProps) {
       
        if (nextProps.auth) {
            const { user, users, userSearchList } = nextProps.auth;
            let usersToDisplay;
            let isEditing;
            
            if (userSearchList.length == 0)
                usersToDisplay = users.filter(u => u.email !== user.email);
            else
                usersToDisplay = userSearchList.filter(u => u.email !== user.email);
            
            isEditing = new Array(usersToDisplay.length).fill(false);
            this.setState({ users: usersToDisplay, isEditing, usersCount: usersToDisplay.length });
        }

        if (nextProps.errors){
          let errors = {};

            Object.keys(nextProps.errors) 
            .forEach(function eachKey(key) {
                errors[key] = nextProps.errors[key][0];
            });

            this.setState({ errors });
        }

        if (nextProps.auth.newUserErrors){
            let newUserErrors = {};
  
              Object.keys(nextProps.auth.newUserErrors) 
              .forEach(function eachKey(key) {
                newUserErrors[key] = nextProps.auth.newUserErrors[key][0];
              });
  
              this.setState({ newUserErrors });
          }
    }

    componentWillUnmount() {
        this.props.clearFeedback();
        this.props.clearErrors();
    }



    search = event => {
        event.preventDefault();
    
        this.setState({ search: event.target.value}, () => {
          let query = this.state.search;
          this.props.searchUser(query);
        });
      }


    addNewUser = event => {
        event.preventDefault();
        this.props.clearFeedback();
        
        this.setState({ newUserErrors: {} });

        if (!this.validatePassword(this.state.newUser.password, this.state.newUser.passwordConfirm))
          return false;
    
        let dob = this.formatDOB(this.state.newUser.date_of_birth);
        this.setState({ 
            newUser: { 
                ...this.state.newUser, 
                date_of_birth: dob 
            }
        });

        let first_name = this.firstUpperLetter(this.state.newUser.first_name);
        let last_name = this.firstUpperLetter(this.state.newUser.last_name);
    
        const userData = {
            first_name,
            last_name,
            email: this.state.newUser.email,
            mobile_number: this.state.newUser.mobile_number,
            date_of_birth: this.state.newUser.date_of_birth,
            password: this.state.newUser.password,
            is_admin: String(this.state.newUser.is_admin)
        };

      this.props.addUserAsAdmin(userData);
      setTimeout(() => this.closeWindow(), 300);
    }

    closeWindow() {
        if (this.props.feedback) {
            var elem = document.querySelector('.modal');
            var instance = M.Modal.getInstance(elem);
            instance.close();
        }

        if (!isEmpty(this.state.search)) {
            const { user, users } = this.props.auth;

            let usersToDisplay = users.filter(u => u.email !== user.email);
            let isEditing = new Array(usersToDisplay.length).fill(false);
            
            this.setState({ users: usersToDisplay, isEditing, usersCount: usersToDisplay.length });
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
            
            if (!isEmpty(this.state.search)) {
                setTimeout(() => {
                    const { user, users } = this.props.auth;
    
                    let usersToDisplay = users.filter(u => u.email !== user.email);
                    let isEditing = new Array(usersToDisplay.length).fill(false);
                    
                    this.setState({ users: usersToDisplay, isEditing, usersCount: usersToDisplay.length });
                }, 300);
            }
        }
    }



    firstUpperLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    
      validatePassword(password, passwordConfirm) {
        let errors = {};
    
        if (!isEmpty(password) || !isEmpty(passwordConfirm)) {
          password = password.trim();
    
          if (password.length < 6)
            errors.password = 'Password must be atleast 6 characters';
    
          if (password !== passwordConfirm.trim())
            errors.passwordConfirm = 'Password must match';
    
          if (errors.password || errors.passwordConfirm) {
            this.setState({ errors });
            return false;
          }
        }
        return true;
      }
    
      formatDOB(date) {
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
      }
      

    render() {
        const { users, isEditing, errors, usersCount, newUserErrors } = this.state;
        const { feedback } = this.props;

        return (
            <div className="center top-padding account-details">
                <div className="container">
                    <div className="row">
                        <div className="col s12 center">
                            <h3> User Management </h3>

                            <div className="right">
                                 <a className="btn-floating btn-large modal-trigger pulse addUserBtn tooltipped" data-position="left" data-tooltip="Add a user" href="#modal-add-user"><i className="material-icons">add</i></a>

                                <div id="modal-add-user" class="modal add-user-modal">
                                    <div class="modal-content">
                                        <a href="#!" class="modal-action modal-close">
                                            <i class="material-icons right modal-close-red">close</i>
                                        </a>
                                        <h3 className="modal-title add-user-modal-title">Add User</h3>
                                        <form id="register" onSubmit={this.addNewUser} noValidate>
                                            <div className="col-2">
                                                <div className="input-field col s6">
                                                <input
                                                    type="text"
                                                    id="first_name"
                                                    value={this.state.newUser.first_name}
                                                    onChange={event =>
                                                        this.setState({
                                                            newUser: {
                                                                  ...this.state.newUser,
                                                                  first_name: event.target.value
                                                            }
                                                        })
                                                      } 
                                                    className="validate"
                                                    required
                                                    aria-required=""
                                                />
                                                { newUserErrors.first_name ? <span className="helper-text error"> { newUserErrors.first_name } </span> : null}
                                                <label htmlFor="first_name">First Name</label>
                                                </div>

                                                <div className="input-field col s6">
                                                <input
                                                    type="text"
                                                    id="last_name"
                                                    value={this.state.newUser.last_name}
                                                    onChange={event =>
                                                        this.setState({
                                                            newUser: {
                                                                  ...this.state.newUser,
                                                                  last_name: event.target.value
                                                            }
                                                        })
                                                    } 
                                                    className="validate"
                                                    required
                                                    aria-required=""
                                                />
                                                { newUserErrors.last_name ? <span className="helper-text error"> { newUserErrors.last_name } </span> : null}
                                                <label htmlFor="last_name">Last Name</label>
                                                </div>
                                            </div>

                                            <div className="input-field col s12">
                                                <input
                                                type="email"
                                                id="email"
                                                value={this.state.newUser.email}
                                                onChange={event =>
                                                    this.setState({
                                                        newUser: {
                                                              ...this.state.newUser,
                                                              email: event.target.value
                                                        }
                                                    })
                                                } 
                                                className="validate"
                                                required
                                                aria-required=""
                                                />
                                                { newUserErrors.email ? <span className="helper-text error"> { newUserErrors.email } </span> : null}
                                                <label htmlFor="email">Email</label>
                                            </div>

                                            <div className="col-2">
                                                <div className="input-field col s6">
                                                <input
                                                    type="text"
                                                    id="mobile"
                                                    value={this.state.newUser.mobile_number}
                                                    onChange={event =>
                                                        this.setState({
                                                            newUser: {
                                                                  ...this.state.newUser,
                                                                  mobile_number: event.target.value
                                                            }
                                                        })
                                                    } 
                                                    className="validate"
                                                    required
                                                    aria-required=""
                                                />
                                                { newUserErrors.mobile_number ? <span className="helper-text error"> { newUserErrors.mobile_number } </span> : null}
                                                <label htmlFor="mobile">Mobile</label>
                                                </div>

                                                <div className="input-field col s6">
                                                <input
                                                    type="date"
                                                    id="dob"
                                                    onChange={event =>
                                                        this.setState({
                                                            newUser: {
                                                                  ...this.state.newUser,
                                                                  date_of_birth: event.target.value
                                                            }
                                                        })
                                                    } 
                                                    className="validate"
                                                    required
                                                    aria-required=""
                                                />
                                                { newUserErrors.date_of_birth ? <span className="helper-text error"> { newUserErrors.date_of_birth } </span> : null}
                                                <label htmlFor="dob">Date of Birth</label>
                                                </div>
                                            </div>

                                            <div className="input-field col s12">
                                                <input
                                                type="password"
                                                id="password"
                                                value={this.state.newUser.password}
                                                onChange={event =>
                                                    this.setState({
                                                        newUser: {
                                                              ...this.state.newUser,
                                                              password: event.target.value
                                                        }
                                                    })
                                                } 
                                                className="validate"
                                                />
                                                { newUserErrors.password ? <span className="helper-text error"> { newUserErrors.password } </span> : null}
                                                <label htmlFor="password">Password</label>
                                            </div>

                                            <div className="input-field col s12">
                                                <input
                                                type="password"
                                                id="password_confirm"
                                                value={this.state.newUser.passwordConfirm}
                                                onChange={event =>
                                                    this.setState({
                                                        newUser: {
                                                              ...this.state.newUser,
                                                              passwordConfirm: event.target.value
                                                        }
                                                    })
                                                } 
                                                className="validate"
                                                />
                                                { newUserErrors.passwordConfirm ? <span className="helper-text error"> { newUserErrors.passwordConfirm } </span> : null}
                                                <label htmlFor="password_confirm">Confirm Password</label>
                                            </div>

                                            <div className="input-field col s12">
                                                <label>
                                                <input type="checkbox" className="filled-in checkbox-red" 
                                                onChange={event =>
                                                    this.setState({
                                                        newUser: {
                                                              ...this.state.newUser,
                                                              is_admin: !this.state.newUser.is_admin
                                                        }
                                                    })
                                                } 
                                                />
                                                <span>Admin</span>
                                                </label>
                                            </div>

                                            <div className="input-field col s12">
                                                <button
                                                className="button-primary waves-light registerBtn"
                                                type="submit"
                                                id="register-btn-submit"
                                                >
                                                <span> Sign Up</span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <br/>

                            <div className="left">
                                <span className="helper-text margin-btn"> { usersCount == 1 ? `${usersCount} user` : `${usersCount} users` } found. </span>
                            </div>

                            <div className="row center">
                                <div className="col s12">
                                    <nav className="search-users">
                                        <div className="nav-wrapper">
                                            <form id="search-form">
                                                <div className="input-field">
                                                    <input id="search" type="search" onChange={this.search}/>
                                                    <label className="label-icon" htmlFor="search">
                                                        <i className="material-icons">search</i>
                                                    </label>
                                                </div>
                                            </form>
                                        </div>
                                    </nav>
                                </div>
                            </div>

                            <div className="left">
                                <span className="helper-text success "> { feedback } </span> 

                                { Object.keys(errors).map(function eachKey(key) {
                                    return <div className="helper-text error"> {key}: {errors[key]} </div>
                                })}
                            </div>

                            <form noValidate>
                                <table className="table bordered highlight centered responsive-table management-table">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
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
                                                            {user.id}
                                                        </td>

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
                                                            <i onClick={() => this.editUser(index)} className="material-icons pointer">save</i>
                                                        </td>

                                                        <td>
                                                            <i onClick={() => this.closeEditingMode()} className="material-icons pointer">close</i>
                                                        </td>

                                                    </tr>

                                                ) : (
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
                                                            {user.mobile_number}
                                                        </td>

                                                        <td>
                                                            {user.date_of_birth}
                                                        </td>

                                                        <td>
                                                            {user.shipping_address}
                                                        </td>

                                                        <td>
                                                            <i onClick={() => this.switchToEditingMode(index)} className="material-icons pointer">edit</i>
                                                        </td>

                                                        <td>
                                                            <i onClick={() => this.deleteUser(index)} className="material-icons pointer">delete</i>
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

export default connect(mapStateToProps, { getAllUsers, searchUser, addUserAsAdmin, editUserAsAdmin, clearErrors, deleteUserAsAdmin, clearFeedback })(UserManagement);
