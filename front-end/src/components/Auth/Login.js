// React and redux modules
import React, { Component } from "react";
 import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

//import { loginUser } from "../actions/authActions";
import bg from "../../images/bg2.jpg";

// Custom react component/class
class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    
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

const mapStateToProps = state => ({
    auth: state.auth
});

export default (withRouter(Login));
