// React and redux modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { loginUser, superLoginForDevelopment, clearFeedback } from "../../actions/authActions";
import bg from "../../images/bg2.jpg";
import isEmpty from "../../isEmpty";

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
      this.setState({ email: this.props.match.params.email });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
        this.props.history.push('/');
    }
}

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
      let errors = {}
      errors['email'] = nextProps.errors['email'];
      this.setState({ errors });
    }

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

  }

  validation() {
    let errors = {};

    if (isEmpty(this.state.email))
      errors['email'] = 'You must enter an email'

    if (isEmpty(this.state.password))
      errors['password'] = 'You must enter a password'

    if (errors['email'] || errors['password']) {
      this.setState({ errors });
      return false;
    }

    return true;
  }

  onSubmit = event => {
    event.preventDefault();

    this.setState({ errors: {}});

    if (!this.validation()){
      return false;
    }

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {

    const { errors } = this.state;
    const { feedback } = this.props;

    return (
      <section className="auth">
        <img className="backgroundImage" src={bg} />
        <div className="container box">
          <div className="row">
            <div className="col s12">
            <span className="helper-text success"> { !isEmpty(feedback) ? feedback : null }</span>

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
                      className="button-primary waves-light"
                      type="submit"
                      id="register-btn-submit"
                    >
                      <span> Sign In</span>
                    </button>
                  </div>
                </form>

                <div className="input-field col s12" onClick={this.props.superLoginForDevelopment}>
                    <button className="button-primary">
                      <span> Super Login for Development</span>
                    </button>
                  </div>
                  
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
  errors: state.errors,
  feedback: state.feedback
});

export default connect(mapStateToProps, { loginUser, superLoginForDevelopment, clearFeedback })(withRouter(Login));
