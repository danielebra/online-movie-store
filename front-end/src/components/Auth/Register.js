// React and redux modules
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

// Import actions here...
//import { getCurrentProfile } from "../actions/profileActions";

import bg from "../../images/bg2.jpg";

// Custom react component/class
class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      dob: "",
      password: "",
      passwordconfirm: "",
      errors: {}
    };
  }

  onSubmit = event => {
    event.preventDefault();

    const userData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      mobile: this.state.mobile,
      dob: this.state.dob,
      password: this.state.password,
      passwordconfirm: this.state.passwordconfirm
    };

    console.log(userData);
    //this.props.loginUser(userData);
  };

  render() {
    return (
      <section class="auth">
        <img className="backgroundImage" src={bg} />
        <div className="container box">
          <div className="row">
            <div className="col s12">
              <div className="">
                <div className="heading">
                  <h3>Register</h3>
                </div>

                <form id="register" noValidate onSubmit={this.onSubmit}>
                  <div className="col-2">
                    <div className="input-field col s6">
                      <input
                        type="text"
                        id="first_name"
                        value={this.state.firstname}
                        onChange={event =>
                          this.setState({ firstname: event.target.value })
                        }
                        className="validate"
                        required
                        aria-required=""
                      />
                      <label for="first_name">First Name</label>
                    </div>

                    <div className="input-field col s6">
                      <input
                        type="text"
                        id="last_name"
                        value={this.state.lastname}
                        onChange={event =>
                          this.setState({ lastname: event.target.value })
                        }
                        className="validate"
                        required
                        aria-required=""
                      />
                      <label for="last_name">Last Name</label>
                    </div>
                  </div>

                  <div className="input-field col s12">
                    <input
                      type="email"
                      id="email"
                      value={this.state.email}
                      onChange={event =>
                        this.setState({ email: event.target.value })
                      }
                      className="validate"
                      required
                      aria-required=""
                    />
                    <label for="email">Email</label>
                  </div>

                  <div className="col-2">
                    <div className="input-field col s6">
                      <input
                        type="text"
                        id="mobile"
                        value={this.state.mobile}
                        onChange={event =>
                          this.setState({ mobile: event.target.value })
                        }
                        className="validate"
                        required
                        aria-required=""
                      />
                      <label for="mobile">Mobile</label>
                    </div>

                    <div className="input-field col s6">
                      <input
                        type="text"
                        id="dob"
                        value={this.state.dob}
                        onChange={event =>
                          this.setState({ dob: event.target.value })
                        }
                        className="validate"
                        required
                        aria-required=""
                      />
                      <label for="dob">Date of Birth</label>
                    </div>
                  </div>

                  <div className="input-field col s12">
                    <input
                      type="password"
                      id="password"
                      value={this.state.password}
                      onChange={event =>
                        this.setState({ password: event.target.value })
                      }
                      className="validate"
                    />
                    <label for="password">Password</label>
                  </div>

                  <div className="input-field col s12">
                    <input
                      type="password"
                      id="password_confirm"
                      value={this.state.passwordconfirm}
                      onChange={event =>
                        this.setState({ passwordconfirm: event.target.value })
                      }
                      className="validate"
                    />
                    <label for="password_confirm">Confirm Password</label>
                  </div>

                  <div className="input-field col s12">
                    <button
                      className="button-primary waves-effect waves-light"
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
        </div>
      </section>
    );
  }
}

// Assign prop types to props being used
Register.propTypes = {
  /*
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
    */
};

// Map state to props so they can be used in this component
const mapStateToProps = state => ({
  /*
    auth: state.auth,
    profile: state.profile
    */
});

// Connect actions to use within redux and export component
//export default connect(mapStateToProps, { getCurrentProfile })(Register);
export default withRouter(Register);
