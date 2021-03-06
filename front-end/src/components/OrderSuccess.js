import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import success from "../images/success.png";
import { getOrder } from "../actions/movieActions";
import { connect } from "react-redux";

class OrderSuccess extends Component {
  goToRegister = () => {
    let { user } = this.props.auth;
    //${user.first_name}/${user.email}
    this.props.history.push(`/register`);
  };

  render() {
    const {
      user,
      isAuthenticated,
      anonymousUserAuthenticated
    } = this.props.auth;

    return (
      <div className="top-padding">
        <div className="container">
          <div className="card gray">
            <div className="row" style={{ marginTop: "100px" }}>
              {anonymousUserAuthenticated ? (
                <div className="row">
                  <div className="col s1">
                    <img src={success} width="85" height="60" />
                  </div>
                  <div className="col s11">
                    <h5>
                      Your Order is successfully placed. Please register your
                      account so you can view your order.{" "}
                    </h5>
                  </div>

                  <div className="col 3s">
                    <Link to="/">
                      <button className="waves-effect waves-light red darken-3 btn">
                        Home
                      </button>
                    </Link>
                  </div>

                  <div className="col 3s">
                    <Link to="/register">
                      {" "}
                      <button className="waves-effect waves-light red darken-3 btn">
                        Register{" "}
                      </button>
                    </Link>
                  </div>
                </div>
              ) : null}

              {isAuthenticated ? (
                <div className="row">
                  <div className="col s1">
                    <img src={success} width="85" height="60" />
                  </div>
                  <div className="col s11">
                    <h5>
                      Your Order is successfully placed, go to 'My Orders' to
                      check orders
                    </h5>
                  </div>

                  <div className="col 3s">
                    <Link to="/">
                      <button className="waves-effect waves-light red darken-3 btn">
                        Home
                      </button>
                    </Link>
                  </div>

                  <div className="col 3s">
                    <Link
                      to="/orders"
                      className="waves-effect waves-light red darken-3 btn"
                    >
                      My Orders
                    </Link>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(OrderSuccess));
