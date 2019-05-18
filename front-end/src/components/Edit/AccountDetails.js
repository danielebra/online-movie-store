// React and redux modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import isEmpty from '../../isEmpty';

import { editUser } from '../../actions/authActions';

class AccountDetails extends Component {

    constructor() {
        super();

        this.state = {
            user: {},
            showFields: false,
            errors: {},
            added: false
        }
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.errors){
          let errors = {};

            Object.keys(nextProps.errors) 
            .forEach(function eachKey(key) {
                if (nextProps.errors[key] != "user with this email already exists.")
                    errors[key] = nextProps.errors[key][0];
            });

            this.setState({ errors });
        }
      }

    onSubmit() {
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

    validatePassword(password) {
        let errors = {};
    
        if (!isEmpty(password)) {
          password = password.trim();
    
          if (password.length < 6) {
            errors.password = 'Password must be atleast 6 characters';
            this.setState({ errors });
            return false;
          }
        }
        return true;
    }

    firstUpperLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    toggle() {
        this.setState({ showFields: !this.state.showFields });
    }

    render() {
        const dbUser = this.props.auth.user;
        const { user, showFields, errors, added } = this.state;

        if (dbUser && !added) {
            this.setState({ user: dbUser, added: true });
        }

        return (
            <div className="center top-padding account-details">
                <div className="container">
                    <div className="row">
                        <div className="col s12 center">
                            <h3> My Account Details</h3>
                            <form noValidate>
                                <table className="table striped bordered center">
                                    <tbody>
                                        <tr>
                                            <td>First Name</td>
                                            { showFields ? (
                                                    <div className="input-field">
                                                        <input 
                                                            type="text" 
                                                            value={user.first_name}
                                                            onChange={event =>
                                                                this.setState({
                                                                    user: {
                                                                          ...this.state.user,
                                                                          first_name: event.target.value
                                                                    }
                                                                })
                                                              } 
                                                            className="validate"
                                                            required
                                                            aria-required=""
                                                        />
                                                        { errors.first_name ? <span className="helper-text error"> { errors.first_name } </span> : null}
                                                    </div>
                                                ) : (
                                                    <td>{ user.first_name }</td>
                                                )
                                            }
                                        </tr>

                                        <tr>
                                            <td>Last Name</td>
                                            { showFields ? (
                                                    <div className="input-field">
                                                        <input 
                                                            type="text" 
                                                            value={user.last_name}
                                                            onChange={event =>
                                                                this.setState({
                                                                    user: {
                                                                          ...this.state.user,
                                                                          last_name: event.target.value
                                                                    }
                                                                })
                                                              } 
                                                            className="validate"
                                                            required
                                                            aria-required=""
                                                        />
                                                        { errors.last_name ? <span className="helper-text error"> { errors.last_name } </span> : null}
                                                    </div>
                                                ) : (
                                                    <td>{ user.last_name }</td>
                                                )
                                            }
                                        </tr>

                                        <tr>
                                            <td>Email</td>
                                            { showFields ? (
                                                    <div className="input-field">
                                                        <input 
                                                            type="email" 
                                                            value={user.email}
                                                            onChange={event =>
                                                                this.setState({
                                                                    user: {
                                                                          ...this.state.user,
                                                                          email: event.target.value
                                                                    }
                                                                })
                                                              } 
                                                            className="validate"
                                                            required
                                                            aria-required=""
                                                        />
                                                        { errors.email ? <span className="helper-text error"> { errors.email } </span> : null}
                                                    </div>
                                                ) : (
                                                    <td>{ user.email }</td>
                                                )
                                            }
                                        </tr>

                                        <tr>
                                            <td>Mobile Number</td>
                                            { showFields ? (
                                                    <div className="input-field">
                                                        <input 
                                                            type="text" 
                                                            value={user.mobile_number}
                                                            onChange={event =>
                                                                this.setState({
                                                                    user: {
                                                                          ...this.state.user,
                                                                          mobile_number: event.target.value
                                                                    }
                                                                })
                                                              } 
                                                            className="validate"
                                                            required
                                                            aria-required=""
                                                        />
                                                        { errors.mobile_number ? <span className="helper-text error"> { errors.mobile_number } </span> : null}
                                                    </div>
                                                ) : (
                                                    <td>{ user.mobile_number }</td>
                                                )
                                            }
                                        </tr>

                                        <tr>
                                            <td>Date of Birth</td>
                                            { showFields ? (
                                                    <div className="input-field">
                                                        <input 
                                                            type="text" 
                                                            value={user.date_of_birth}
                                                            onChange={event =>
                                                                this.setState({
                                                                    user: {
                                                                          ...this.state.user,
                                                                          date_of_birth: event.target.value
                                                                    }
                                                                })
                                                              } 
                                                            className="validate"
                                                            required
                                                            aria-required=""
                                                        />
                                                        { errors.date_of_birth ? <span className="helper-text error"> { errors.date_of_birth } </span> : null}
                                                    </div>
                                                ) : (
                                                    <td>{ user.date_of_birth }</td>
                                                )
                                            }
                                        </tr>

                                        <tr>
                                            <td>Shipping Address</td>
                                            { showFields ? (
                                                    <div className="input-field">
                                                        <input 
                                                            type="text" 
                                                            value={user.shipping_address}
                                                            onChange={event =>
                                                                this.setState({
                                                                    user: {
                                                                          ...this.state.user,
                                                                          shipping_address: event.target.value
                                                                    }
                                                                })
                                                              } 
                                                            className="validate"
                                                            required
                                                            aria-required=""
                                                        />
                                                        { errors.shipping_address ? <span className="helper-text error"> { errors.shipping_address } </span> : null}
                                                    </div>
                                                ) : (
                                                    <td>{ user.shipping_address }</td>
                                                )
                                            }
                                        </tr>

                                        <tr>
                                            <td>Password</td>
                                            { showFields ? (
                                                    <div className="input-field">
                                                        <input 
                                                            type="password" 
                                                            value={user.password}
                                                            onChange={event =>
                                                                this.setState({
                                                                    user: {
                                                                          ...this.state.user,
                                                                          password: event.target.value
                                                                    }
                                                                })
                                                              } 
                                                            className="validate"
                                                            required
                                                            aria-required=""
                                                        />
                                                        { errors.password ? <span className="helper-text error"> { errors.password } </span> : null}
                                                    </div>
                                                ) : (
                                                    <td>{ user.password }</td>
                                                )
                                            }
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                            { showFields ? 
                                <div className="row updateBtns">
                                    <div className="col s2">
                                        <button className="button-primary cancelBtn" onClick={() => this.toggle()}>Cancel</button>
                                    </div>

                                    <div className="col s2">
                                        <button className="button-primary editSubmitBtn" onClick={() => this.onSubmit()}>Save</button>
                                    </div>
                                </div>
                            : 
                                <a className="btn-large editBtn" onClick={() => this.toggle()}>Edit Details <i className="material-icons">edit</i></a>
                            }
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

export default connect(mapStateToProps, { editUser })(AccountDetails);
