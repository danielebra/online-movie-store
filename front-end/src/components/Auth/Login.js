// React and redux modules
import React, { Component } from "react";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

import { Link, withRouter } from "react-router-dom";

// Import actions here...
//import { getCurrentProfile } from "../actions/profileActions";

import bg from "../../images/bg2.jpg";

// Custom react component/class
class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(userData);
    //this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <section class="auth">
        <img className="backgroundImage" src={bg} />
        <div className="container box">
          <div className="row">
            <div className="col s12">
              <div className="">
                <div className="heading">
                  <h3>Login</h3>
                </div>

                <form id="login" noValidate onSubmit={this.onSubmit}>
                  <div className="input-field col s12">
                    <input
                      type="email"
                      id="email"
                      className="validate"
                      value={this.state.email}
                      onChange={event =>
                        this.setState({ email: event.target.value })
                      }
                      required
                      aria-required=""
                    />
                    <label for="email">Email</label>
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

                  <div className="right no-account">
                    <Link to="/register">
                      <span> Don't have an account? </span>
                    </Link>
                  </div>

                  <div className="input-field col s12">
                    <button
                      className="button-primary waves-effect waves-light"
                      type="submit"
                      id="register-btn-submit"
                    >
                      <span> Sign In</span>
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
Login.propTypes = {
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
//export default connect(mapStateToProps, { getCurrentProfile })(Login);
export default withRouter(Login);
