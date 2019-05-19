// React and redux modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import isEmpty from '../../isEmpty';
import { getAllUsers } from '../../actions/authActions';
import update from 'react-addons-update';

class AllUsers extends Component {

    constructor() {
        super();

        this.state = {
            users: [],
            showFields: false,
            errors: {},
            added: false
        }
    }

    componentWillMount() {
        this.props.getAllUsers();
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.auth) {
            this.setState({ users: nextProps.auth.users });
        }

        if (nextProps.errors){
          let errors = {};

            Object.keys(nextProps.errors) 
            .forEach(function eachKey(key) {
                if (nextProps.errors[key] != "user with this email already exists.")
                    errors[key] = nextProps.errors[key][0];
            });

            this.setState({ errors });
        }
      }

    editUser() {
        this.setState({ errors: {} });

        let newUserDetails = this.state.user;

        // setting first letter of firstname and lastname to uppercase
        newUserDetails['first_name'] = this.firstUpperLetter(newUserDetails['first_name']);
        newUserDetails['last_name'] = this.firstUpperLetter(newUserDetails['last_name']);

        if (newUserDetails['password']){
            if (!this.validatePassword(newUserDetails['password']))
                return false;
        }
        this.props.editUser(newUserDetails);
        if (!this.state.errors) {
            this.toggle();
        }
    }

    firstUpperLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    toggle() {
        this.setState({ showFields: !this.state.showFields, user: {}, errors: {} });
    }

    render() {
        const allUsers = this.props.auth.users;
        const { users, showFields, errors, added } = this.state;

        if (allUsers && !added) {
            console.log(this.props.auth.users);
            //this.setState({ users: allUsers, added: true });
        }

        return (
            <div className="center top-padding account-details">
                <div className="container">
                    <div className="row">
                        <div className="col s12 center">
                            <h3> All Users</h3>
                            <form noValidate>
                                <table className="table striped bordered highlight centered responsive-table">
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

                                        { users.map((user, index) => {
                                            return (
                                                <tr>
                                                    <td>
                                                    { showFields ? (
                                                            <div className="input-field">
                                                                <input 
                                                                    type="text" 
                                                                    value={user.first_name}
                                                                    onChange={event =>
                                                                        this.setState({
                                                                            users: update(this.state.users, { index: { first_name: { $set: event.target.value }}})
                                                                        })
                                                                    } 
                                                                    className="validate"
                                                                    required
                                                                    aria-required=""
                                                                />
                                                                { errors.first_name ? <span className="helper-text error"> { errors.first_name } </span> : null}
                                                            </div>
                                                        ) : (
                                                            user.first_name
                                                        )
                                                    }
                                                    </td>
                                                    <td >
                                                    { showFields ? (
                                                            <div className="input-field">
                                                                <input 
                                                                    type="text" 
                                                                    value={user.last_name}
                                                                    onChange={event =>
                                                                        this.setState({
                                                                            users: update(users, { index: { last_name: { $set: event.target.value }}})
                                                                        })
                                                                    } 
                                                                    className="validate"
                                                                    required
                                                                    aria-required=""
                                                                />
                                                                { errors.last_name ? <span className="helper-text error"> { errors.last_name } </span> : null}
                                                            </div>
                                                        ) : (
                                                            user.last_name
                                                        )
                                                    }
                                                </td>

                                                <td>
                                                    { showFields ? (
                                                            <div className="input-field">
                                                                <input 
                                                                    type="email" 
                                                                    value={user.email}
                                                                    onChange={event =>
                                                                        this.setState({
                                                                            users: update(users, { index: { email: { $set: event.target.value }}})
                                                                        })
                                                                    } 
                                                                    className="validate"
                                                                    required
                                                                    aria-required=""
                                                                />
                                                                { errors.email ? <span className="helper-text error"> { errors.email } </span> : null}
                                                            </div>
                                                        ) : (
                                                            user.email
                                                        )
                                                    }
                                                </td>

                                                <td>
                                                    { showFields ? (
                                                            <div className="input-field">
                                                                <input 
                                                                    type="text" 
                                                                    value={user.mobile_number}
                                                                    onChange={event =>
                                                                        this.setState({
                                                                            users: update(users, { index: { mobile_number: { $set: event.target.value }}})
                                                                        })
                                                                    } 
                                                                    className="validate"
                                                                    required
                                                                    aria-required=""
                                                                />
                                                                { errors.mobile_number ? <span className="helper-text error"> { errors.mobile_number } </span> : null}
                                                            </div>
                                                        ) : (
                                                            user.mobile_number
                                                        )
                                                    }
                                                </td>

                                                <td>
                                                    { showFields ? (
                                                            <div className="input-field">
                                                                <input 
                                                                    type="text" 
                                                                    value={user.date_of_birth}
                                                                    onChange={event =>
                                                                        this.setState({
                                                                            users: update(users, { index: { date_of_birth: { $set: event.target.value }}})
                                                                        })
                                                                    } 
                                                                    className="validate"
                                                                    required
                                                                    aria-required=""
                                                                />
                                                                { errors.date_of_birth ? <span className="helper-text error"> { errors.date_of_birth } </span> : null}
                                                            </div>
                                                        ) : (
                                                            user.date_of_birth
                                                        )
                                                    }
                                                </td>

                                                <td>
                                                    { showFields ? (
                                                            <div className="input-field">
                                                                <input 
                                                                    type="text" 
                                                                    value={user.shipping_address}
                                                                    onChange={event =>
                                                                        this.setState({
                                                                            users: update(users, { index: { shipping_address: { $set: event.target.value }}})
                                                                        })
                                                                    } 
                                                                    className="validate"
                                                                    required
                                                                    aria-required=""
                                                                />
                                                                { errors.shipping_address ? <span className="helper-text error"> { errors.shipping_address } </span> : null}
                                                            </div>
                                                        ) : (
                                                            user.shipping_address
                                                        )
                                                    }
                                                    </td>

                                                    <td>
                                                        <i onClick={() => this.editUser()} className="material-icons left ic">edit</i>
                                                    </td>

                                                    <td>
                                                        <i onClick={() => this.editUser()} className="material-icons left ic">delete</i>
                                                    </td>
                                                </tr>
                                            )
                                        })}
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
    errors: state.errors
});

export default connect(mapStateToProps, { getAllUsers })(AllUsers);

/*
<td>

                                            { showFields ? 
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
*/