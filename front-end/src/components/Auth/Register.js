// React and redux modules
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// Import actions here...
import { registerUser } from "../../actions/authActions";

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
      passwordconfirm: "",
      shipping_address: "test",
      errors: {}
    };
  }

  componentDidMount() {
    // if (this.props.auth.isAuthenticated) {
    //     this.props.history.push('/dashboard');
    // }
  }

  onSubmit = event => {
    event.preventDefault();

    let d = new Date(this.state.date_of_birth);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    let newDate = [year, month, day].join('-');

    this.setState({ date_of_birth: newDate });

    const userData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      mobile_number: this.state.mobile_number,
      shipping_address: this.state.shipping_address,
      date_of_birth: this.state.date_of_birth,
      password: this.state.password,
      passwordconfirm: this.state.passwordconfirm
    };

    console.log(userData);
    this.props.registerUser(userData, this.props.history);
  };

  formatDate(date) {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

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
                        value={this.state.first_name}
                        onChange={event =>
                          this.setState({ first_name: event.target.value })
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
                        value={this.state.last_name}
                        onChange={event =>
                          this.setState({ last_name: event.target.value })
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
                        value={this.state.mobile_number}
                        onChange={event =>
                          this.setState({ mobile_number: event.target.value })
                        }
                        className="validate"
                        required
                        aria-required=""
                      />
                      <label for="mobile">Mobile</label>
                    </div>

                    <div className="input-field col s6">
                      <input
                        type="date"
                        id="dob"
                        value={this.state.date_of_birth}
                        onChange={event =>
                          this.setState({ date_of_birth: event.target.value })
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

export default connect(null, { registerUser })(withRouter(Register));
