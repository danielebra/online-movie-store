// React and redux modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { loginUser } from "../../actions/authActions";
import bg from "../../images/bg2.jpg";

// Custom react component/class
class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  componentWillMount() {
    if (this.props.match.params.email) {
      this.setState({ email: this.props.match.params.email});
    }
  }

  componentWillReceiveProps(nextProps) {
    
    if(nextProps.errors){
      let errors = {};
      console.log(nextProps.errors);

      Object.keys(nextProps.errors) 
        .forEach(function eachKey(key) { 
          errors[key] = nextProps.errors[key][0];
        });
      
        this.setState({ errors });
    }

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {

    const { errors } = this.state;

    return (
      <section className="auth">
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
                    { errors.email ? <span className="helper-text error"> { errors.email } </span> : null}
                    <label htmlFor="email">Email</label>
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
                    { errors.password ? <span className="helper-text error"> { errors.password } </span> : null}
                    <label htmlFor="password">Password</label>
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
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
