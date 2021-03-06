// React and redux modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import isEmpty from "../../isEmpty";
import {
  registerUser,
  registerAnonymousUser,
  clearErrors
} from "../../actions/authActions";
import bg from "../../images/bg2.jpg";

// Custom react component/class
class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      mobile_number: "",
      date_of_birth: Date,
      password: "",
      passwordConfirm: "",
      is_admin: false,
      errors: {},
      flagged: false
    };
  }

  componentWillMount() {
    if (this.props.match.params.name && this.props.match.params.email) {
      //console.log('omg');
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      let errors = {};

      Object.keys(nextProps.errors).forEach(function eachKey(key) {
        errors[key] = nextProps.errors[key][0];
      });

      this.setState({ errors });
    }

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  onSubmit = event => {
    event.preventDefault();

    if (!this.validatePassword(this.state.password, this.state.passwordConfirm))
      return false;

    let dob = this.formatDOB(this.state.date_of_birth);
    this.setState({ date_of_birth: dob });

    let first_name = this.firstUpperLetter(this.state.first_name);
    let last_name = this.firstUpperLetter(this.state.last_name);

    const userData = {
      first_name,
      last_name,
      email: this.state.email,
      mobile_number: this.state.mobile_number,
      date_of_birth: this.state.date_of_birth,
      password: this.state.password,
      is_admin: String(this.state.is_admin)
    };

    const { anonymousUserAuthenticated, user } = this.props.auth;

    if (anonymousUserAuthenticated) {
      userData["id"] = user.id;
      userData["shipping_address"] = user.shipping_address;

      console.log(userData);
      this.props.registerAnonymousUser(userData, this.props.history);
    } else {
      this.props.registerUser(userData, this.props.history);
    }
  };

  firstUpperLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  validatePassword(password, passwordConfirm) {
    let errors = {};

    if (!isEmpty(password) || !isEmpty(passwordConfirm)) {
      password = password.trim();

      if (password.length < 6)
        errors.password = "Password must be atleast 6 characters";

      if (password !== passwordConfirm.trim())
        errors.passwordConfirm = "Password must match";

      if (errors.password || errors.passwordConfirm) {
        this.setState({ errors });
        return false;
      }
    }
    return true;
  }

  formatDOB(date) {
    let d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  render() {
    const { anonymousUserAuthenticated, user } = this.props.auth;
    const { errors, flagged } = this.state;

    // if anouymous user registered, display their email and name
    if (anonymousUserAuthenticated && !flagged) {
      this.setState({
        first_name: user.first_name,
        email: user.email,
        flagged: true
      });
    }

    return (
      <section className="auth">
        <img className="backgroundImage" alt="bg" src={bg} />
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
                        name="first_name"
                        value={this.state.first_name}
                        onChange={event => this.onChange(event)}
                        className="validate"
                        required
                      />
                      {errors.first_name ? (
                        <span className="helper-text error">
                          {" "}
                          {errors.first_name}{" "}
                        </span>
                      ) : null}
                      <label
                        className={this.state.first_name ? "active" : null}
                        id="nameLabel"
                        htmlFor="first_name"
                      >
                        First Name
                      </label>
                    </div>

                    <div className="input-field col s6">
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={this.state.last_name}
                        onChange={event => this.onChange(event)}
                        className="validate"
                        required
                      />
                      {errors.last_name ? (
                        <span className="helper-text error">
                          {" "}
                          {errors.last_name}{" "}
                        </span>
                      ) : null}
                      <label htmlFor="last_name">Last Name</label>
                    </div>
                  </div>

                  <div className="input-field col s12">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={this.state.email}
                      onChange={
                        anonymousUserAuthenticated
                          ? null
                          : event => this.onChange(event)
                      }
                      className="validate"
                      required
                    />
                    {errors.email ? (
                      <span className="helper-text error">
                        {" "}
                        {errors.email}{" "}
                      </span>
                    ) : null}
                    <label
                      className={this.state.email ? "active" : null}
                      id="emailLabel"
                      htmlFor="email"
                    >
                      Email
                    </label>
                  </div>

                  <div className="col-2">
                    <div className="input-field col s6">
                      <input
                        type="text"
                        id="mobile_number"
                        name="mobile_number"
                        value={this.state.mobile_number}
                        onChange={event => this.onChange(event)}
                        className="validate"
                        required
                      />
                      {errors.mobile_number ? (
                        <span className="helper-text error">
                          {" "}
                          {errors.mobile_number}{" "}
                        </span>
                      ) : null}
                      <label htmlFor="mobile">Mobile</label>
                    </div>

                    <div className="input-field col s6">
                      <input
                        type="date"
                        id="date_of_birth"
                        name="date_of_birth"
                        value={this.state.date_of_birth}
                        onChange={event => this.onChange(event)}
                        className="validate"
                        required
                      />
                      {errors.date_of_birth ? (
                        <span className="helper-text error">
                          {" "}
                          {errors.date_of_birth}{" "}
                        </span>
                      ) : null}
                      <label className="active" htmlFor="dob">
                        Date of Birth
                      </label>
                    </div>
                  </div>

                  <div className="input-field col s12">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={this.state.password}
                      onChange={event => this.onChange(event)}
                      className="validate"
                    />
                    {errors.password ? (
                      <span className="helper-text error">
                        {" "}
                        {errors.password}{" "}
                      </span>
                    ) : null}
                    <label htmlFor="password">Password</label>
                  </div>

                  <div className="input-field col s12">
                    <input
                      type="password"
                      id="passwordConfirm"
                      name="passwordConfirm"
                      value={this.state.passwordConfirm}
                      onChange={event => this.onChange(event)}
                      className="validate"
                    />
                    {errors.passwordConfirm ? (
                      <span className="helper-text error">
                        {" "}
                        {errors.passwordConfirm}{" "}
                      </span>
                    ) : null}
                    <label htmlFor="password_confirm">Confirm Password</label>
                  </div>

                  <div className="input-field col s12">
                    <label>
                      <input
                        type="checkbox"
                        className="filled-in checkbox-red"
                        onChange={event =>
                          this.setState({ is_admin: !this.state.is_admin })
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
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser, registerAnonymousUser, clearErrors }
)(withRouter(Register));
